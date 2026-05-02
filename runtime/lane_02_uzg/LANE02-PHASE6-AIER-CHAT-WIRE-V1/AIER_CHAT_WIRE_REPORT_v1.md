# AIER_CHAT_WIRE_REPORT_v1 — LANE02-PHASE6-AIER-CHAT-WIRE-V1

**Status**: `PARTIAL`
**Date**: 2026-05-02
**Repo**: `unitonzengarden/uzgplus-app` (D:\UZG\Projects-v2\uzgplus)
**Worker bundle**: `public/_worker.js` source-of-truth (committed; `dist/_worker.js` is build output, gitignored)

---

## Section A — Worker route pattern verified

Worker uses **registry-based route table + dispatcher chain** (NOT switch/case, NOT external router):

1. **Route table** (`API_ROUTES`) at line ~584-1900: object map keyed by pathname. Entries describe metadata:
   ```js
   '/api/v1/path': {
     methods: ['POST'],
     module: 'human-readable',
     auth: 'authenticated|public|admin|adminprivate|...',
     apiOwner: 'cloudflare-worker',
     dbOwner: '...',
     authOwner: '...',
     migrationWave: <int>,
     migrated: true|false,
   }
   ```

2. **`resolveApiRoute(pathname)`** (line 47653) — looks up route in table, returns `{route, routePath}`.

3. **`handleApi(request, env)`** (line 47710) — middleware: 404 if no route, 405 if method mismatch, then calls `handleMigratedRoute()`.

4. **`handleMigratedRoute(route, request, env)`** (line ~47486 pre-edit / 47710 post-edit) — dispatcher: chain of `if (pathname === '...' && method === '...') return handleX(request, env)`.

5. **Helpers reused**:
   - `json(status, payload, headers)` — line 2327 (status FIRST arg)
   - `decodeJwtPayload(token)` — line 2409
   - `hasBearerToken(request)` — line 2344
   - Existing precedent for chat: `handleAitaoChat()` (line 46831) handles `/api/v1/aitao/chat` and `/api/v1/admin-private/aitao/chat`.

**Decision**: Pattern is **ADD-friendly** — adding a route = (a) one entry in table + (b) one if-line in dispatcher + (c) new handler function. NO modifications to existing routes or core logic.

---

## Section B — Endpoint added

### B.1 Route registry (line 1814)

```js
'/api/v1/tao/aier/chat': {
  methods: ['POST'],
  module: 'AIER TAO chat (KB-grounded RAG)',
  auth: 'authenticated',
  apiOwner: 'cloudflare-worker',
  dbOwner: 'supabase + aier_kb_entries (HNSW pgvector 1536) + openai embeddings + anthropic claude',
  authOwner: 'worker + supabase-rbac',
  migrationWave: 6,
  migrated: true,
},
```

Inserted between `/api/v1/aitao/chat` (line 1804-1813) and `/api/v1/admin/uzgfi/marketplace` (line ~1824).

### B.2 Dispatcher line (line 47847)

```js
if (pathname === '/api/v1/tao/aier/chat' && request.method === 'POST') return handleTaoAierChat(request, env)
```

Inserted between `handleAitaoChat` dispatch (`/api/v1/aitao/chat`) and `handleAdminProtectedRead` (`/api/v1/admin/uzgfi/overview`).

### B.3 Handler function (line 47497-47700)

`async function handleTaoAierChat(request, env)` — pipeline:

1. **Auth** — extract `Bearer <token>` header, `decodeJwtPayload(token)` → `claims.sub` = user_id. Returns 401 `AUTH_REQUIRED`/`AUTH_INVALID` if missing/invalid.

2. **Body parsing** — `{message, chart_id, module='ziwei', star_filter=null, palace_filter=null}`. Returns 400 `BAD_BODY` / `MESSAGE_REQUIRED` on errors.

3. **Env validation** — `SUPABASE_URL/VITE_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`. Returns 500 `*_ENV_MISSING` if any absent.

4. **Tier resolution** — fetch `/rest/v1/memberships?user_id=eq.X&select=tier_id,member_tiers(slug)&limit=1`. Best-effort; falls back to `'explorer'` if no row or query fails.

5. **Embedding** — POST `https://api.openai.com/v1/embeddings` with `model: 'text-embedding-3-small'` (1536 dims, matches KB index). Returns 502 `EMBEDDING_FAILED`/`EMBEDDING_SHAPE`/`EMBEDDING_ERROR` on failure.

6. **KB search** — POST `${SUPABASE_URL}/rest/v1/rpc/search_aier_kb` with body:
   ```json
   {
     "p_query_embedding": [..1536 floats..],
     "p_match_count": 5|6|8 (tier-dependent),
     "p_tier": "explorer|seeker|builder|sovereign",
     "p_star_filter": null | "Tử Vi" | ...,
     "p_palace_filter": null | "Mệnh" | ...
   }
   ```
   Param names use `p_` prefix per migration `20260502093001_lane02_aier_kb_rag_v1.sql:144-149`. Returns 502 `KB_SEARCH_FAILED` with hint about migration apply if RPC missing.

7. **Grounded prompt** — inline system prompt builder (no import to avoid bundling complexity). Embeds top-K KB rows as `[KB-N] subject (depth, sim): content`, then compliance rails (LAW 4 no determinism, LAW 5 no fear, REDLINE 1 no death prediction, REDLINE 3 no thầy phán tone, cultural framing mandatory).

8. **Claude streaming** — POST `https://api.anthropic.com/v1/messages` with:
   - `model: 'claude-sonnet-4-6'`
   - `max_tokens`: explorer=1500, seeker=2000, builder=2500, sovereign=4000
   - `stream: true`
   - `system`: grounded prompt
   - `messages: [{ role: 'user', content: message }]`
   - Returns 502 `CLAUDE_FAILED` if request rejected.

9. **SSE pass-through** — returns Anthropic stream body directly with custom headers:
   - `content-type: text/event-stream; charset=utf-8`
   - `x-aier-tier: <tierSlug>`
   - `x-aier-module: <moduleName>`
   - `x-aier-kb-citations: <count>`
   - `x-aier-chart-id: <chartId or empty>`

---

## Section C — Hook unflagged + new code summary

`src/hooks/useAierTaoChat.ts` — full rewrite (135 LOC vs 78 original).

### C.1 Backward-compat signature

Old: `useAierTaoChat(): UseAierTaoChatReturn`
New: `useAierTaoChat(options?: UseAierTaoChatOptions = {}): UseAierTaoChatReturn`

Existing caller `src/pages/v3/V3TaoAierPage.jsx:8` calls `useAierTaoChat()` (no args) — **still works** because options default to `{}`.

New consumers can pass `{ chartId, module, starFilter, palaceFilter }`.

### C.2 Branch logic

```ts
const isReal = TAO_DATA_SOURCE.aierTao === 'real';
const send = (text) => isReal ? sendReal(text) : sendMock(text);
```

- `sendMock` — preserved original `setTimeout(800ms)` + `pickResponse(text)` from canned `MOCK_AIER_TAO_CHAT_RESPONSES`.
- `sendReal` — new: `supabase.auth.getSession()` → bearer token → `fetch('/api/v1/tao/aier/chat', POST)` → `response.body.getReader()` → SSE delta parser → progressive `setMessages` updates.

### C.3 SSE delta parser

Parses Anthropic stream events `data: {"type":"content_block_delta","delta":{"text":"..."}}`. Accumulates `delta.text` into the last assistant message in state. Handles `[DONE]` sentinel and JSON parse errors gracefully (skip line).

### C.4 Return shape changes

- `source: 'mock' | 'real'` (was `'mock'` only)
- `deferred: typeof TAO_BACKEND_LANE02_DEFERRED | null` (null when real)
- NEW: `error: string | null` — exposes API error to UI

`V3TaoAierPage.jsx` destructures `{messages, isTyping, send, source, deferred}` — all preserved. New `error` prop is opt-in.

---

## Section D — TAO_DATA_SOURCE flag flipped

`src/data/v3-tao-data-layer.ts:33`:

```diff
- aierTao: 'mock',     // Lane_02 DDL pending (TAO_BACKEND_LANE02_DEFERRED)
+ aierTao: 'real',     // LANE02-PHASE6-AIER-CHAT-WIRE-V1 — wired to /api/v1/tao/aier/chat (search_aier_kb RPC + Claude Sonnet 4.6 streaming)
```

Other modules unchanged: `bazi: 'real'` ✅, `ziwei: 'real'` ✅, `phongthuy: 'mock'`, `vannien: 'mock'` (out of scope this task).

---

## Section E — Smoke test results

Per Q3=(b) policy: KB RAG + endpoint shape locally; full Claude streaming on CF Pages preview deploy after migration applied.

| Case | Description | Local result | Reason |
|---|---|---|---|
| Pre-flight 1 | KB table reachable | ✅ PASS | REST `aier_kb_entries?limit=1` → `Content-Range: 0-0/168` (matches spec §2.1 "168 entries") |
| Pre-flight 2 | `search_aier_kb` RPC reachable | ❌ FAIL | PostgREST 404 `PGRST202`: "Could not find the function public.search_aier_kb in the schema cache" — **migration not applied to live DB** |
| Build | V3 vite build | ✅ PASS | 597 modules transformed, 3.62s, no TS/JS errors. Bundle: `dist-v3/assets/main-C8ySxEn7.js 851KB / gzip 255KB` |
| Worker syntax | `node --check public/_worker.js` | ✅ PASS | No syntax errors. File 1921458 bytes (was 1912602; +8856 bytes for 3 inserts). |
| Case 1 | KB grounding (citations returned) | 🟡 BLOCKED | Requires Case Pre-flight 2 + Claude streaming. Will run on preview after migration. |
| Case 2 | KB count = 168 | ✅ PASS | Pre-flight 1 confirms via REST. |
| Case 3 | No fear-based language compliance | 🟡 BLOCKED | Requires Claude reply. Defer to preview. |
| Case 4 | Tier Explorer = short response | 🟡 BLOCKED | Requires Claude reply. Defer to preview. |
| Case 5 | Tier Sovereign = deep response | 🟡 BLOCKED | Requires Claude reply. Defer to preview. |

**Local count**: 1/5 confirmed PASS (Case 2). 4/5 blocked on backend dep.

---

## Section F — Deployment status

**Preview deploy**: Not initiated by CLAC-2 from this session. Triggered automatically by `git push` to feature branch (CF Pages auto-build + auto-deploy).

**Migration apply**: BLOCKED — Lane_02 forbidden from running migrations against production Supabase per task §7. Escalated to Lane_01 via `handoff_to_lane01/LANE02-TO-LANE01-AIER-CHAT-ROUTE-ESCALATION.json`.

**Pages env vars** (per task §2.1, not changed by this task):
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SUPABASE_PUBLISHABLE_KEY` ✅
- `OPENAI_API_KEY` ✅ (used by AITAO already)
- `ANTHROPIC_API_KEY` ✅ (per spec; not used by other endpoints — first consumer is `/api/v1/tao/aier/chat`)

**Production /v3/tao/aier route**: Unchanged. Still LIVE. Will switch from mock → real automatically once `aierTao: 'real'` ships AND CF Pages deploy AND migration applied.

---

## Section G — Constraints honored

- 🚫 Did NOT modify existing routes in `_worker.js` — only ADD ✅
- 🚫 Did NOT modify Lane_01 zone (`auth-v3/`, `enta-v3/`, `home-v3/`, `settings-v3/`, `profile-v3/`) ✅
- 🚫 Did NOT modify Supabase Auth provider settings ✅
- 🚫 Did NOT modify Resend integration ✅
- 🚫 Did NOT modify Cloudflare Workers/Pages production env (no deploy) ✅
- 🚫 Did NOT run migrations against production Supabase ✅ (escalated)
- 🚫 Did NOT paste actual secrets into commit ✅
- 🚫 Did NOT touch `tests/lane02/` (CURSOR-2 Track A territory) ✅
- ✅ ADD-only in worker
- ✅ EDIT only Lane_02 hook + flag
- ✅ ADD runtime Lane_02 zone deliverables (this dir)
- ✅ ASCII commit message will be used
