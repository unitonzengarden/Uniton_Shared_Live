# DIAGNOSE_FIX_REPORT_v1 — LANE02-PHASE6-AIER-502-DIAGNOSE-FIX-V1

**Status**: TBD post final smoke
**Executor**: CLAC-2
**Date**: 2026-05-02

---

## Section A — Phase 1 wrangler tail attempt

Tried multiple invocations:
```
npx wrangler pages deployment tail --project-name uzgplus-app
  → "Must specify a deployment in non-interactive mode"
npx wrangler pages deployment tail --project-name uzgplus-app --environment production
  → "Must specify a deployment in non-interactive mode"
npx wrangler pages deployment tail https://2a274cb0.uzgplus-app.pages.dev --project-name uzgplus-app
  → "Could not find deployment match url"
```

The `--environment production` is documented to grab "the latest production deployment" but the runtime requires interactive confirmation that's not available in headless CLI.

**Fallback**: incremental diagnostic short-circuit deploys (PR #105/#107/#108) to bisect 502 root cause via response code progression, since wrangler tail unreachable.

---

## Section B — Phase 1 + 2: Bisect 502 root cause

### Bisect strategy

Insert short-circuit endpoints at various points in handler that return 200 JSON early. Comparing which return 200 vs 502 isolates which step causes the worker crash.

| Stage | Inserted After | Tests |
|---|---|---|
| `?diagnostic=1` | env validation | Auth + body + env |
| `?diagnostic=15` | tier resolution | Tier query |
| `?diagnostic=17` | OpenAI embedding | Embedding step |
| `?diagnostic=2` | KB RPC search | KB search |
| `?diagnostic=3` | Claude non-stream | Claude API |

### Bisect run 1 (PR #105 — stage 2 + 3 deployed)

| Diag | Status | Result |
|---|---|---|
| `?diagnostic=2` | 502 HTML | Issue is BEFORE Claude (stages 4-7) |

### Bisect run 2 (PR #107 — stage 1.5 + 1.7 added)

| Diag | Status | Result |
|---|---|---|
| `?diagnostic=15` (post-tier) | **200 JSON ✓** | Tier query OK |
| `?diagnostic=17` (post-embed) | **502 HTML ❌** | **Embed kills worker** |
| `?diagnostic=2` (post-KB) | 502 HTML ❌ | (consistent — anything after embed) |

**ROOT CAUSE IDENTIFIED**: OpenAI embedding fetch + response handling crashes CF Workers, bypassing `try/catch`.

---

## Section C — Phase 3: Defensive embed fix (PR #108)

### Fix code

```javascript
// 5. Embed message — defensive against CF Workers crash
let embedding
let embedStage = 'init'
try {
  embedStage = 'pre_fetch'
  console.log('[aier-chat] embed_pre_fetch message_len=' + message.length)
  
  const embResp = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + openaiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ model: 'text-embedding-3-small', input: message }),
    signal: AbortSignal.timeout(20000),  // surface hangs as catchable AbortError
  })
  
  embedStage = 'post_fetch_status_' + embResp.status
  console.log('[aier-chat] embed_post_fetch status=' + embResp.status)
  
  if (!embResp.ok) {
    let errDetail = ''
    try { errDetail = await embResp.text() } catch (_) { errDetail = '<read-text-failed>' }
    return json(502, { code: 'EMBEDDING_FAILED', status: embResp.status, detail: errDetail.slice(0, 300) })
  }
  
  embedStage = 'pre_text'
  const embText = await embResp.text()  // text() instead of .json()
  embedStage = 'post_text_len_' + embText.length
  console.log('[aier-chat] embed_post_text len=' + embText.length)
  
  let embJson
  try {
    embJson = JSON.parse(embText)  // separate try/catch around parse
    embedStage = 'post_parse'
  } catch (parseErr) {
    return json(502, { code: 'EMBEDDING_PARSE_FAILED', parse_error: parseErr?.message, text_preview: embText.slice(0, 200) })
  }
  
  embedding = embJson?.data?.[0]?.embedding
  if (!Array.isArray(embedding) || embedding.length !== 1536) {
    return json(502, { code: 'EMBEDDING_SHAPE', actual_len: embedding?.length, json_keys: Object.keys(embJson || {}) })
  }
  console.log('[aier-chat] embed_done dim=' + embedding.length)
} catch (e) {
  return json(502, { code: 'EMBEDDING_ERROR', message: e?.message, name: e?.name, stage: embedStage, stack: e?.stack?.slice(0, 400) })
}
```

### Defenses applied

1. **AbortSignal.timeout(20000)** — surfaces network hangs as catchable AbortError, prevents indefinite waits that may exceed CF wall-clock.

2. **text() + JSON.parse() instead of .json()** — different code path; if CF's `.json()` has a bug parsing 1536-element float array, manual `JSON.parse` may avoid it.

3. **Separate try/catch around JSON.parse** — surfaces parse failures with specific error code + text preview.

4. **`console.log` markers at each stage** — appear in CF Workers logs accessible via `wrangler tail` (when fixed) or CF dashboard.

5. **`stage` tracking variable** — returned in error JSON, tells exactly which step failed.

6. **Detailed error context** — `e?.name`, `e?.stack`, status codes, text previews.

---

## Section D — Phase 4: Smoke 5/5 (TBD)

(Pending PR #108 deploy completion + verification)

If `?diagnostic=17` returns:
- **200 STAGE_17_PASS** → embed fix works → run smoke 5/5 → expect PASS
- **502 JSON with EMBEDDING_*** → know exact failure → targeted next fix
- **502 HTML still** → CF kills beyond JS layer → need alt approach (skip embed, use Gemini, or Postgres FTS)

---

## Section E — Phase 5: Ledger + ship (TBD)

Append:
- `runtime/lane_02_uzg/LANE02-PHASE6-AIER-CHAT-WIRE-V1/snapshot_v3.json` — flip if 5/5 PASS
- `notifications/NOTIFICATION_LEDGER.md` — V502 row

---

## Section F — Constraints honored

- ZERO modifications V2 backend ngoài route handler ADD V3 + sequential fixes ✅
- ZERO modifications Lane_01 namespace ✅
- ZERO secrets paste in commits/runtime/chat ✅
- Self-merge --admin only on Lane_02 PRs ✅
- Append-only ledger updates ✅

---

## Section G — Lessons learned (for future Phase 6.x)

1. **CF Pages Functions has opaque 502 modes** that bypass JavaScript try/catch — likely CPU/wall-clock kills.
2. **`wrangler pages deployment tail` requires interactive deployment ID** — non-trivial in headless CLI.
3. **Bisect via diagnostic short-circuit** is the practical fallback for opaque CF errors.
4. **Heavy JSON parse in worker (1536-element arrays)** is borderline expensive on CF Workers. May need streaming parse or smaller dimensions.
5. **OpenAI embedding from CF Workers** has at least one failure mode — investigate `dimensions` param or alternative providers.
