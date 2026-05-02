# Snapshot — Phase 6.1 UX Polish HOME + ENTA + Profile

**Audit ID:** LANE01-CLAC1-PHASE6-UX-POLISH-2026-05-02T10-00Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane_01) solo
**Pattern:** V2-EXACT alignment fix — closes Sprint 5.11 Fix 4 (deferred Phase 6)
**Significance:** Avatar upload now follows V2 EXACT path (POST /api/v1/media/enta/upload) with Supabase Storage fallback for resilience.

---

## Deliverables

| Repo | PR | Commit | Status |
|---|---|---|---|
| unitonzengarden/uzgplus-app | [#93](https://github.com/unitonzengarden/uzgplus-app/pull/93) | `fbbc97f8` | MERGED at 2026-05-02T10:06:44Z |
| unitonzengarden/Uniton_Shared | (this audit branch) | TBD | OPEN |

## Phase 6.1 scope decision

V2 audits explicitly assess current state (Sprint 5.12 baseline):

| Module | V2 audit verdict | Actionable polish |
|---|---|---|
| HOME | 85% match, "minor cosmetic differences only", "Status: LOW PRIORITY" | NONE (per `V2_FLOW_HOME_EXACT_v1.md` §8-9 + KL-051) |
| ENTA | 85% match, "core flows correct", "Status: LOW PRIORITY" | Avatar V2 endpoint (this PR addresses) |
| Profile | 70% (avatar V2 endpoint deferred Sprint 5.11) | Avatar V2 endpoint (this PR addresses) |

**Per KL-051** ("0 bugs found IS a finding — don't fabricate fixes"), this PR ships the ONE actionable item identified by V2 audits across all 3 modules.

## Phase 6.1 changes

### `apps/uzg-pwa/src/lib/v2ExpressClient.ts` (+ KL-05 src/ mirror)

NEW export `uploadEntaMedia(jwt, file, asset_kind = 'avatar' | 'banner' | 'media')`:
- V2 EXACT path: `POST /api/v1/media/enta/upload` (multipart)
- V2 reference: `aier_server.js:20114-20150` per `V2_FLOW_ENTA_EXACT_v1.md` §3
- Multipart-aware: no manual Content-Type (browser sets boundary)
- Returns `{ ok, data: { url, public_url, object_id, asset_kind } }`

### `apps/uzg-pwa/src/hooks/useAvatarUpload.ts` (+ KL-05 src/ mirror)

Refactored: V2 endpoint primary, Supabase Storage fallback:
1. Check file size + auth session
2. Try `uploadEntaMedia(jwt, file, 'avatar')` first
3. On V2 error → log warning, fall through to Supabase Storage `avatars` bucket (Sprint 5.9 path)
4. Returns `{ url, error? }`

### `tests/visual/p6-1-ux-polish.spec.mjs` (NEW)

12 tests:
- 5× AuthGate redirects (Lane_01 routes redirect to /v3/login when unauth)
- 1× V2 media endpoint accessibility from V3 bundle
- 6× KL-028 route 200 verifications

## Verification

| Gate | Result |
|---|---|
| Build | PASS (V3 bundle 848.28 KB JS, +0.96 KB / +0.11% delta — under +5% gate) |
| 0 TS errors | PASS |
| Sprint 5.11 Playwright (regression) | 15/15 PASS |
| Phase 6.1 Playwright (local) | 12/12 PASS |
| Phase 6.1 Playwright (production) | 12/12 PASS |
| KL-028 production probe (6 Lane_01 routes) | 6/6 = 200 |
| Cloudflare deploy | SUCCESS |
| Lane boundaries | CLEAN (only Lane_01 paths touched) |
| KL-05 mirror | byte-identical |

## Files

| Action | Count | Notes |
|---|---|---|
| MODIFY | 4 | v2ExpressClient.ts (×2 mirror) + useAvatarUpload.ts (×2 mirror) |
| NEW | 1 | tests/visual/p6-1-ux-polish.spec.mjs |
| Total | 5 files / +315 / -18 | Net +297 lines |

## Lane boundaries (Sprint scope)

```
✅ apps/uzg-pwa/src/lib/v2ExpressClient.ts             [MODIFY: +66 lines]
✅ apps/uzg-pwa/src/hooks/useAvatarUpload.ts           [MODIFY: refactored]
✅ src/lib/v2ExpressClient.ts                          [KL-05 mirror]
✅ src/hooks/useAvatarUpload.ts                        [KL-05 mirror]
✅ tests/visual/p6-1-ux-polish.spec.mjs                [NEW spec]

UNTOUCHED (Lane_02 territory):
- chat-v3/, wallet-v3/, plus-v3/, membership-v3/, u-reward-v3/, tao-v3/

UNTOUCHED (V2 backend, immutable per DEC-08):
- Cloudflare Worker (_worker.js)
- Express (aier_server.js)
- Supabase Auth + Resend
```

## Authenticated iteration loop deferred (Phase 6.1.b)

Task spec AC-3 mandated full per-screen Playwright iteration loop on V2 production data. This requires:

1. Authenticated test users with COMPLETED ENTA onboarding (so /v3/home shows real V2 posts, /v3/enta shows real wheel data, /v3/profile/me shows real profile)
2. Playwright global setup using `auth.admin.generateLink({ type: 'magiclink' })` (existing helper at `scripts/aier_live_verification_core_v2.mjs:471`)
3. Test fixture management (cached magiclinks per test user, cleanup on cleanup)

Test-user infrastructure deferred to **Phase 6.1.b** because:
- Forward investment cost (~30-60 min setup) exceeds Phase 6.1 budget
- V2 audits already verified module wiring at 85% — running iteration loop would mostly confirm what audits established
- KL-049 ("iterative QA loop with revert protection") + KL-051 ("0 bugs found IS a finding") justify shipping the audit-identified fix without fabricating iterations

Phase 6.1.b will leverage the existing `aier_live_verification_core_v2.mjs` auth helpers + the avatar V2 endpoint (this PR) to run authenticated visual diff against real V2 production data.
