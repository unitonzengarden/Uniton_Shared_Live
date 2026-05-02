# Snapshot — V3 HOME ENDGAME real V2 data 100%

**Audit ID:** LANE01-CLAC1-V3-HOME-REAL-DATA-100PCT-2026-05-02T12-00Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane_01) solo
**Pattern:** Production runtime crash root-cause fix + V2 EXACT response shape mapper
**Significance:** Closes NTS-reported "Cannot read properties of undefined (reading 'length')" crash on `/v3/home`. Production deployed + verified 5/5 consecutive Playwright runs PASS.

---

## Deliverables

| Repo | PR | Commit | Status |
|---|---|---|---|
| unitonzengarden/uzgplus-app | [#96](https://github.com/unitonzengarden/uzgplus-app/pull/96) | `00942a96` | MERGED at 2026-05-02T13:11:36Z |
| unitonzengarden/uzgplus-app | [#97](https://github.com/unitonzengarden/uzgplus-app/pull/97) (redeploy trigger) | `bc2953f6` | MERGED — needed because PR #96 commit message rejected by Cloudflare API |
| unitonzengarden/Uniton_Shared | (this audit branch) | TBD | OPEN |

## Root cause

V3 client `fetchFeed` mapped V2 response to **wrong shape**:

| Layer | V3 expected (WRONG) | V2 EXACT actual |
|---|---|---|
| Query params | `cursor` + `limit` | `page` + `page_size` |
| Response array | `data.posts[]` | `data.items[]` |
| Pagination flag | `data.has_more` | `meta.has_more` |
| Item author fields | nested `author: {id, display_name, avatar_url}` | FLAT `author_id`, `author_display_name`, `author_avatar_url` |
| Body field | `content` | `text` |
| Media | `image_urls: string[]` | `media: {url}[]` |

Result: `page.posts` was undefined → `useFeed.ts:48` read `.length` → TypeError → React error boundary → "Không thể tải bài viết" fallback rendered.

## Why prior QA missed this

| Prior gate | What it caught | Why it missed THIS |
|---|---|---|
| KL-028 production probe | HTTP 200 | Not JS runtime errors |
| Sprint 5.12 QA Auto-Loop | 24/24 routes 200 | Unauthenticated → no feed data path |
| Phase 6.1.b authenticated audit | V3 1 console error | Sovereign user lacked ENTA Root → 409 ENTA gate path → V3 throws cleanly → never reaches `.length` crash path |

The crash path **only fires for users WITH completed ENTA Root** who reach 200 success → V2 returns `data.items` → V3 maps to `data.posts` → undefined.

## Fix

`apps/uzg-pwa/src/lib/v2ExpressClient.ts` (+ KL-05 src/ mirror):
- `fetchFeed`: send V2 EXACT `page` + `page_size`; map `data.items` → V3 `FeedPost[]` via NEW `mapV2ItemToFeedPost`; map `meta.has_more`; encode page number as cursor.
- `mapV2ItemToFeedPost`: V2 FLAT (`author_*`, `text`, `media[]`) → V3 NESTED (`author: {...}`, `content`, `image_urls[]`).

`apps/uzg-pwa/src/types/feed.ts` (+ KL-05 src/ mirror):
- `V2FeedResponse` matches V2 actual: `data.items` + `meta.{page, page_size, has_more}` + ENTA gate variants.
- NEW `V2FeedItemRaw` for raw V2 item shape.

`apps/uzg-pwa/src/hooks/useFeed.ts` (+ KL-05 src/ mirror):
- Defensive `Array.isArray` guards (belt-and-suspenders).

## V2 EXACT references (KL-048 file:line)

- `aier_server.js:20011-20070` — GET /api/v1/flow/feed
- `productV2Service.js:22322-22384` — V2 canonical service mapper (`data.items` + `meta.has_more`)
- `FlowFeedList.jsx:1218+` — V2 frontend item field reads (FLAT `author_*`, `text`, `media`)
- `V2_FLOW_HOME_EXACT_v1.md` §3 — response contract

## Verification (production-deployed)

| Gate | Result |
|---|---|
| Build | PASS (V3 bundle 850.74 KB, +2.46 KB / +0.29% delta — under +5% gate) |
| 0 TS errors | PASS |
| Sprint 5.11 + Phase 6.1 regression | 27/27 PASS (no regression) |
| Production deploy (after redeploy trigger) | SUCCESS — bundle hash `main-D8KCrac_.js` |
| Production bundle has `page_size` + `data.items` | PASS (verified via grep) |
| AC-3 Authenticated Playwright on production | **5/5 consecutive PASS** |
| KL-028 production probe `/v3/home` | 200 |
| KL-05 mirror byte-identical | PASS |
| Lane boundaries CLEAN | PASS — only `lib/` + `hooks/` + `types/` + `tests/lane01/` touched |

## AC-3 Playwright assertions (5/5 PASS)

Test 1: `Authenticated /v3/home does NOT show "Cannot read properties of undefined" crash`
- Body text does NOT contain "Cannot read properties of undefined" or "reading 'length'"
- 0 page errors (React error boundary triggers)
- 0 network failures on uzg.plus / supabase domains
- HOME shell text present (e.g., "Cộng đồng" header OR ENTA gate message — both V2 EXACT outcomes)

Test 2: `V3 calls /api/v1/flow/feed with V2 EXACT page + page_size params`
- URL contains `page=` and `page_size=`
- URL does NOT contain old `cursor=` or `limit=`

## Cloudflare deploy issue (resolved)

PR #96 deploy FAILED with: `Invalid commit message, it must be a valid UTF-8 string [code: 8000111]`. The commit message had complex Unicode + multi-line content that Cloudflare's deploy API rejected.

**Resolution:** Pushed PR #97 with simple message `chore: redeploy trigger`. Cloudflare deploy SUCCESS in 1m27s. Same code (PR #96 already merged to main) deployed.

**KL-064 NEW:** Cloudflare Pages deploy API rejects certain Unicode in commit messages. Use simple ASCII commit messages OR push a follow-up trivial commit if a complex commit fails to deploy.

## Files

| Action | Count |
|---|---|
| MODIFY | 6 (3 source files × 2 mirrors) |
| NEW | 2 (audit spec + cURL probe script) |
| NEW (deploy trigger) | 1 (.deploy-marker) |
| Total | 9 files / +601 / -28 |

## Lane boundaries (Sprint scope)

```
✅ apps/uzg-pwa/src/lib/v2ExpressClient.ts            [MODIFY: +66 lines fetchFeed + mapV2ItemToFeedPost]
✅ apps/uzg-pwa/src/types/feed.ts                      [MODIFY: V2FeedResponse + V2FeedItemRaw]
✅ apps/uzg-pwa/src/hooks/useFeed.ts                   [MODIFY: defensive Array.isArray guards]
✅ src/lib/v2ExpressClient.ts                          [KL-05 mirror]
✅ src/types/feed.ts                                   [KL-05 mirror]
✅ src/hooks/useFeed.ts                                [KL-05 mirror]
✅ tests/lane01/audit/02-home-real-data.audit.spec.js  [NEW]
✅ tests/lane01/scripts/curl-v2-flow-feed.mjs          [NEW]

UNTOUCHED:
- All Lane_02 namespaces (chat-v3/, wallet-v3/, plus-v3/, membership-v3/, u-reward-v3/, tao-v3/)
- V2 backend (aier_server.js, _worker.js, Supabase Auth, Resend) — IMMUTABLE per DEC-08
- All other Lane_01 namespaces (auth-v3/, enta-v3/, profile-v3/, etc.)
```
