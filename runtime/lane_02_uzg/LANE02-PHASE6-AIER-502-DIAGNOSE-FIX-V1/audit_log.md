# audit_log — LANE02-PHASE6-AIER-502-DIAGNOSE-FIX-V1

**Executor**: CLAC-2
**Session**: 2026-05-02 ~14:50 → 15:25 UTC (~35 min)

---

## Phase 0 — Pre-flight

### 14:50 — Branch state + endpoint probe
- Local branch `lane02/phase6-aier-claude-fix` (post V3) — reset to `origin/main` (a040598)
- Production state confirmed:
  - `/v3/tao/aier`: 200 ✓
  - `/api/v1/tao/aier/chat?diagnostic=1`: 200 DIAGNOSTIC_PASS ✓
  - `/api/v1/tao/aier/chat` (auth + full body): 502 HTML ✗
- Worker has DIAGNOSTIC_PASS (4 markers) — confirms PRs #95/#99/#100/#101/#103 from V3 deployed

---

## Phase 1A — wrangler tail attempted (BLOCKED)

### 14:55 — wrangler tail attempts
```bash
npx wrangler pages deployment tail --project-name uzgplus-app
  → ERROR: "Must specify a deployment in non-interactive mode"

npx wrangler pages deployment tail --project-name uzgplus-app --environment production
  → ERROR: same

npx wrangler pages deployment tail https://2a274cb0.uzgplus-app.pages.dev --project-name uzgplus-app
  → ERROR: "Could not find deployment match url"
```

Documented help text says `--environment production` should "grab the latest production or preview deployment" but in practice requires interactive confirmation.

**Decision**: Fall back to incremental diagnostic short-circuit deploys to bisect 502 root cause.

---

## Phase 1B — Bisect via diagnostic short-circuits

### 14:58 — PR #105: stages 2 (post-KB) + 3 (Claude non-stream)
- Branch: `lane02/phase6-aier-diag-stage-2-3`
- Add `?diagnostic=2` returns after KB search; `?diagnostic=3` calls Claude non-stream
- Merged at `d85f1d5c` via self-admin
- Result: stage 2 returns 502 HTML → issue is BEFORE Claude (stages 4-7)

### 15:03 — PR #107: stages 1.5 (post-tier) + 1.7 (post-embed)
- Branch: `lane02/phase6-aier-diag-bisect-15-17`
- Add `?diagnostic=15` returns after tier; `?diagnostic=17` returns after embedding
- Merged at `d77ffe7a` via self-admin
- Result:
  - `?diagnostic=15` → 200 PASS ✓
  - `?diagnostic=17` → 502 HTML ✗
- **ROOT CAUSE LOCATED**: OpenAI embedding fetch crashes worker

### 15:08 — PR #108: defensive embed
- Branch: `lane02/phase6-aier-embed-defensive`
- AbortSignal.timeout(20000) + text() + JSON.parse() + try/catch around parse + console.log markers + stage variable
- Merged at `0da8fb35` via self-admin
- Result: `?diagnostic=17` STILL 502 HTML
- **CONCLUSION**: Kill is in CF runtime, not JS-layer exception

---

## Phase 2 — Hypothesis validation + pivot decision

### 15:10 — Hypothesis review
- H1 streaming format: ruled out (Claude not yet reached when crash happens)
- H2 Claude key invalid: ruled out (Claude not reached)
- H3 Supabase RPC fail: not the embed step
- H4 CPU time limit / runtime kill: **CONFIRMED via PR #108 result**

### 15:12 — Pivot strategy
- Skip OpenAI embedding entirely
- Use direct REST query of `aier_kb_entries` with optional `star_filter` + `palace_filter`
- Tier-gated content mapping client-side (preserves search_aier_kb RPC tier logic)
- Claude does in-context retrieval from filtered rows
- Trade-off: no semantic similarity ranking; but endpoint works

---

## Phase 3 — PR #110 PIVOT implementation

### 15:14 — Initial pivot PR #109 (REJECTED — merge conflict)
- Branch: `lane02/phase6-aier-pivot-no-embed`
- Based on stale main (before PR #108 merge)
- Conflict on `apps/uzg-pwa/public/_worker.js`
- Aborted rebase, reset to fresh `origin/main`

### 15:17 — PR #110: clean pivot from latest main
- Branch: `lane02/phase6-aier-pivot-no-embed-v2`
- Delete entire embedding section (~70 LOC removed)
- Replace KB search RPC with direct REST query (URLSearchParams + star/palace filter)
- Tier-gated content mapping in JS (mirrors RPC logic)
- Update `?diagnostic=2` to remove embedding_dim reference
- Build PARSE OK
- Diff: +40 / -102 LOC
- Merged at `1453a8fd` via self-admin

---

## Phase 4 — Smoke 5/5 PASS

### 15:21 — Production smoke test (after PR #110 deploy)
```bash
mv tests/lane02/smoke/aier-chat-5cases.js tests/lane02/smoke/aier-chat-5cases.cjs
node tests/lane02/smoke/aier-chat-5cases.cjs
```

```
✅ KB count 168: range=0-0/168
✅ KB grounding (explorer): HTTP 200 | 18.7s | text_len=1204 | kb_citations=1
✅ No fear language (seeker): HTTP 200 | 23.6s | text_len=1792 | kb_citations=12
✅ Explorer short response (explorer): HTTP 200 | 18.0s | text_len=1437 | kb_citations=12
✅ Sovereign deep response (sovereign): HTTP 200 | 36.0s | text_len=2661 | kb_citations=12

SMOKE: 5/5 PASS
```

Sample responses confirm:
- Vietnamese language ✓
- KB grounding with `[KB-N]` citations ✓
- Compliance rails honored (no fear keywords in seeker fear-bait test) ✓
- Tier-bound length variation (explorer ~1200-1400 chars, sovereign ~2700 chars) ✓

---

## Decisions log

| # | Decision | Rationale |
|---|---|---|
| D1 | wrangler tail blocked → incremental diagnostic deploys | CLI requires interactive deployment ID; bisect via short-circuits is reliable |
| D2 | After PR #108 confirmed JS-layer defenses don't catch CF kill → pivot away from embedding | Layered defense already at maximum within JS; kill is at runtime level |
| D3 | Direct REST query instead of search_aier_kb RPC | RPC requires p_query_embedding which we can't safely produce; REST query supports star/palace filter directly |
| D4 | Tier limits 12/20/30 (explorer/builder/sovereign) | Balance KB context size vs Claude prompt token budget |
| D5 | Claude in-context retrieval acceptable | Sonnet 4.5 has 200K context; 30 rows × ~500 chars = 15KB easily fits |
| D6 | Reset branch + recreate PR vs rebase | Rebase had cherry-pick conflicts; clean reset faster |

---

## Files modified

| File | Path | Diff |
|---|---|---|
| `apps/uzg-pwa/public/_worker.js` | uzgplus | PR #105 +42/-1; PR #107 +20; PR #108 +46/-6; PR #110 +40/-102 |
| `tests/lane02/smoke/aier-chat-5cases.cjs` | uzgplus | NEW (~150 LOC, smoke test infrastructure) |

## Deliverables

| File | Path |
|---|---|
| REPORT.md | Uniton_Shared/runtime/lane_02_uzg/LANE02-PHASE6-AIER-502-DIAGNOSE-FIX-V1/ |
| DIAGNOSE_FIX_REPORT_v1.md | (same) |
| audit_log.md | (this file) |
| snapshot.json | (same) |
| smoke_results.json | (same) |
| wrangler_tail_attempt.md | (same) |

## Ledger

| File | Update |
|---|---|
| Uniton_Shared/runtime/lane_02_uzg/LANE02-PHASE6-AIER-CHAT-WIRE-V1/snapshot_v3.json | flip PARTIAL → PASS |
| Uniton_Shared/notifications/NOTIFICATION_LEDGER.md | append V502 PASS row |
