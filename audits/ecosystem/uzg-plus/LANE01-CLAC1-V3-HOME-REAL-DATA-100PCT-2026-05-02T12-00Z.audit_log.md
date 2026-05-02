# Audit Log — V3 HOME ENDGAME real V2 data 100%

**Audit ID:** LANE01-CLAC1-V3-HOME-REAL-DATA-100PCT-2026-05-02T12-00Z
**Executor:** CLAC1 solo (Lane_01)
**Models:** Sonnet 4.6 (primary, no escalation needed)
**Started:** 2026-05-02T12:00Z
**Completed:** 2026-05-02T13:25Z (approx)
**Duration:** ~85 min (within estimate)

---

## §1 Timeline

| Time (UTC) | Action |
|---|---|
| 12:00 | Sprint task issued (NTS frustration: V3 HOME crash on production) |
| 12:02 | Branch `fix/lane01/v3-home-real-data-endgame` from main |
| 12:05 | Read `useFeed.ts`, `types/feed.ts`, `v2ExpressClient.ts` — found `.length` access on `page.posts` |
| 12:08 | Read `V2_FLOW_HOME_EXACT_v1.md` §3 — V2 returns `data.items` + `meta.has_more` (NOT `data.posts`) |
| 12:10 | **ROOT CAUSE IDENTIFIED FROM SOURCE READING**: V3 maps `data.posts` (undefined), V2 returns `data.items` |
| 12:12 | Built cURL script `curl-v2-flow-feed.mjs` to verify response shape live |
| 12:14 | cURL confirmed: V2 returns ENTA gate 409 for sovereign user (without ENTA Root) |
| 12:15 | Searched `productV2Service.js` — found canonical mapper at line 22322 reading `response.data.data.items` + `meta.has_more` |
| 12:17 | Searched `FlowFeedList.jsx` — found V2 frontend item field shape (FLAT `author_*`, `text`, `media`) |
| 12:20 | All field-level mismatches catalogued. Fix design: rewrite `fetchFeed` mapper + add `mapV2ItemToFeedPost` |
| 12:22 | Updated `types/feed.ts` — `V2FeedResponse` matches V2 actual; NEW `V2FeedItemRaw` |
| 12:25 | Updated `lib/v2ExpressClient.ts` — `fetchFeed` sends `page` + `page_size`, calls mapper |
| 12:28 | Updated `hooks/useFeed.ts` — defensive `Array.isArray` guards |
| 12:30 | KL-05 mirror to src/ tree (3 files byte-identical) |
| 12:32 | Build PASS (V3 bundle 850.74 KB, +2.46 KB delta) |
| 12:34 | Sprint 5.11 + Phase 6.1 regression: 27/27 PASS |
| 12:38 | Authored `tests/lane01/audit/02-home-real-data.audit.spec.js` (2 tests) |
| 12:42 | Committed + pushed branch |
| 12:45 | PR #96 created |
| 12:47 | PR #96 self-merged --admin at `00942a96` |
| 12:50 | KL-028 probe `/v3/home` 200 ✓ |
| 12:52 | Authenticated Playwright on production: PRIMARY PASS, SECONDARY FAIL (URL has `limit=20`) |
| 12:54 | Investigation: production bundle still has OLD code |
| 12:56 | Discovery: `gh run list` shows Cloudflare deploy FAILED for PR #96 — "Invalid commit message" |
| 12:58 | KL-064 NEW: complex commit message rejected by Cloudflare Pages API |
| 13:00 | Created `chore/lane01/redeploy-trigger` branch with simple commit `chore: redeploy trigger` |
| 13:02 | PR #97 created + self-merged at `bc2953f6` |
| 13:18 | Cloudflare deploy SUCCESS in 1m27s — bundle hash `main-D8KCrac_.js` |
| 13:19 | Verified production bundle has `page_size`, `data.items` strings |
| 13:21 | AC-3 5x consecutive Playwright on production: **5/5 PASS** ✓ |
| 13:23 | Audit branch + 3 DOT files authored |
| 13:25 | Audit PR + self-merge |

## §2 Decisions

### D-1: Source reading FIRST before cURL

V3 source + V2 audit text reveal the mismatch (data.posts vs data.items, cursor vs page) without needing cURL. cURL just confirms the audit. Saved 5+ min.

### D-2: Read V2's own consumer code as canonical mapper reference

V2 audit text says "data: { items: [...] }" but doesn't show item field names. To get item shape, I read V2's OWN consumer:
- `productV2Service.js:22322-22384` — V2 service mapper (`response.data.data.items` + `meta.has_more`)
- `FlowFeedList.jsx:1218+` — V2 frontend item field reads (FLAT `author_avatar_url`, `text`, `media`)

This is **KL-066 NEW**: V2's own consumer code is the most reliable canonical reference for response shape, more authoritative than audit summaries.

### D-3: Mapper function vs inline transformation

Wrote a dedicated `mapV2ItemToFeedPost` function (instead of inline transformation in `fetchFeed`) because:
- Testable in isolation
- Documents the V2 → V3 contract explicitly
- Future endpoint mapping changes are localized
- Defensive: handles all V2 fields gracefully

### D-4: Defensive guards in useFeed.ts

Added `Array.isArray(page?.posts) ? page.posts : []` even though the mapper guarantees array. Belt-and-suspenders against future shape drift. Code comment explains why.

### D-5: KL-05 mirror after every change

Both `apps/uzg-pwa/src/` and `src/` trees mirrored byte-identical. Verified via `diff` post-mirror.

### D-6: Defensive against Cloudflare commit-message rejection

When PR #96 deploy failed with "Invalid commit message", I diagnosed via `gh run view --log-failed`, then pushed PR #97 with simple message to retrigger deploy on the same code. Did NOT amend or rewrite history. Did NOT panic. Just shipped a trivial `.deploy-marker` file with `chore: redeploy trigger` commit.

### D-7: Self-merge --admin (consistent with prior sprints)

PR #96 + PR #97 both self-merged --admin per AMD_NTS_FULL_TECH_AUTONOMY.

### D-8: Don't fabricate failure if AC-3 PASSES on production after redeploy

Per KL-051: 5/5 PASS on production after the deploy issue was resolved is the truth. The deploy issue was an INFRASTRUCTURE problem (Cloudflare API), not a code problem. Documenting both transparently.

## §3 Risks resolved

| Risk | Resolution |
|---|---|
| Crash on production for ENTA-onboarded users | Fixed via root-cause mapper rewrite |
| ENTA gate path renders incorrectly | Verified — V3 catch block sets V2's exact message text |
| Sprint 5.11 / Phase 6.1 regression | 27/27 PASS post-fix |
| Bundle bloat from mapper | +2.46 KB / +0.29% (under +5% gate) |
| Cloudflare deploy failure | Resolved via PR #97 simple-message redeploy |
| Lane_02 territory edit | Avoided — only Lane_01 paths touched |
| V2 backend modification | None — V3 client-only fix |

## §4 NOTES

### Why every prior QA missed this crash

Three QA gates ran against this code path before NTS reported the crash:

1. **KL-028 production probe (Sprint 5.12 + Phase 6.1):** HTTP 200 OK only. Doesn't catch JS runtime errors. Bundle loads, app boots, error boundary catches throw, fallback renders. HTTP layer never sees the failure.

2. **Sprint 5.12 unauthenticated audit:** All routes redirected to `/v3/login` because no auth session. Never reached `useFeed` → never called `fetchFeed` → never triggered the crash path.

3. **Phase 6.1.b authenticated audit (Lane_02 sovereign user):** User had no ENTA Root → V2 returned 409 ENTA_ROOT_REQUIRED → V3 client throws (`!res.ok` triggers throw in `request<T>`) → useFeed catches → renders error message ("Complete ENTA Root..."). The `.length` crash path is downstream of the success branch, so this user NEVER hit it.

The crash path requires a user with **completed ENTA Root** who reaches the V2 200 success branch → V2 returns `data.items[]` → V3 maps to undefined `data.posts` → reads `.length` → throws. This subset of users wasn't represented in any QA test fixture.

**KL-065 NEW** captures this lesson: Authenticated probe + completed-state test user + pageerror capture together are needed to detect runtime crashes that depend on specific successful API states.

### Cloudflare deploy commit-message issue

The PR #96 commit message was structured per the task spec template (multi-line, Vietnamese context, code blocks, references). Cloudflare Pages deploy API rejected it with `Invalid commit message [code: 8000111]`. This is a Cloudflare-side API limitation; the message IS valid UTF-8 in git's view.

Workaround documented as **KL-064 NEW**: push a follow-up trivial commit with simple ASCII message to retrigger deploy. The actual code change is preserved on main; only the deploy trigger needs the simple message.

Future Lane_01 commits should consider keeping commit messages shorter / simpler to avoid retrigger overhead.

## §5 Lessons learned

### KL-064 NEW — Cloudflare Pages deploy API commit message validation
Use simple ASCII commit messages for code that needs to deploy. If a complex commit fails, push a trivial follow-up commit to retrigger deploy.

### KL-065 NEW — Runtime crash detection requires authenticated + completed-state + pageerror capture
HTTP probe alone insufficient. Authenticated unauthenticated user gets gated. Authenticated completed-state user reaches the success path where shape mismatch crashes happen. Capture pageerror events to detect React error boundary throws.

### KL-066 NEW — V2 own consumer code is canonical mapper reference
V2's `productV2Service.js` + `FlowFeedList.jsx` field reads are more authoritative than audit summary text. When wiring V3 against V2, READ V2's own consumer to know the exact field names.

### Sprint efficiency

ENDGAME HOME completed in ~85 min vs spec estimate 3-5h. Efficiency from:
1. Source reading FIRST (10 min) revealed root cause before any cURL
2. KL-066: V2 consumer code told me item shape immediately
3. Mapper function approach was straightforward + testable
4. Cloudflare deploy issue identified within 5 min via `gh run view --log-failed`
5. Trivial redeploy commit fixed the deploy without rewriting history

No Opus 4.7 escalation needed. Sonnet 4.6 sufficient for mechanical pattern matching + V2 EXACT alignment.
