# Snapshot — V3 HOME Social ENDGAME-2 — HONEST PARTIAL

**Audit ID:** LANE01-CLAC1-V3-HOME-SOCIAL-ENDGAME-XCOM-GRADE-2026-05-02T13-30Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane_01) solo
**Status:** **HONEST PARTIAL** — 1 of 11 sub-modules addressed (composer createPost field mapping). 10 sub-modules deferred per spec §12 mandate.
**Significance:** Closes composer "Add text, media..." validation bug (same V3↔V2 field-mismatch class as ENDGAME-1 read crash). Ships unblocked posting capability. Does NOT claim ENDGAME social-network completeness.

---

## Honest assessment per spec §16

> "Nếu AC-1 dù 1/18 fail sau hết rounds → HONEST FAIL report + handoff blocker."

The spec defined 11 sub-modules + AC-1 18-step user journey as the success criterion. Single-session execution **cannot** complete the spec's 12-20h estimated scope. This audit reports **HONEST PARTIAL**: 1 critical bug fix shipped, 10 sub-modules require dedicated follow-up sprints with full execution time.

## Deliverables

| Repo | PR | Commit | Status |
|---|---|---|---|
| unitonzengarden/uzgplus-app | [#98](https://github.com/unitonzengarden/uzgplus-app/pull/98) | `dd7191a6` | MERGED at 2026-05-02T13:58:07Z |
| unitonzengarden/Uniton_Shared | (this audit branch) | TBD | OPEN |

## Sub-module status

| # | Sub-module | Spec § | Status | Note |
|---|---|---|---|---|
| A | Feed core polish | §4.A | DONE (Sprint ENDGAME-1) | Crash fixed, V2 EXACT mapper applied |
| B | Post component X.com-grade | §4.B | DEFERRED | Requires ENTA ring + QOT trace + animations |
| C | 5 Ngũ Hành Reactions | §4.C | DEFERRED | UZG+ DNA core; needs full design + V2 schema map |
| D | Composer X.com-grade | §4.D | **PARTIAL — createPost field mapping FIXED this sprint**; media upload + poll + QOT context selector + drafts deferred |
| E | Post Detail full-screen | §4.E | DEFERRED | Requires GET /api/v1/posts/:postId wire + new route |
| F | Image/Video Lightbox | §4.F | DEFERRED | Requires gesture handling + zoom |
| G | Comments System | §4.G | DEFERRED | Requires comments thread + composer + endpoints |
| H | Share/Quote | §4.H | DEFERRED | Requires action sheet + quote post compose |
| I | User Profile Mini View | §4.I | DEFERRED | Requires profile preview sheet + ENTA bridge |
| J | Connect 4 trust levels | §4.J | DEFERRED | Requires action sheet + V2 connect endpoints |
| K | Notifications | §4.K | DEFERRED | Requires bell overlay + Realtime channel |
| L | Suggested Resonance | §4.L | DEFERRED | Requires interleaved card design + connect flow |

**1 sub-module addressed (D partial). 10 sub-modules deferred.**

## What shipped this sprint (PR #98)

`apps/uzg-pwa/src/lib/v2ExpressClient.ts` (+ KL-05 src/ mirror):
- `createPost`: rewrote to map V3 ComposePayload → V2 EXACT body shape per `productV2Service.js:20246-20320` (KL-066 canonical service reference).
- V3 previously sent `{ content, image_urls, post_type }` → V2 read undefined `text` and empty `attachments` → returned 400 validation error "Add text, media, an NFT attachment, or a shared source before posting."
- Fix: V2 EXACT body shape `{ text, circle_id, visibility, attachments[{url,type}], nft_attachment, parent_qot_id, repost_of_post_id }`.

`tests/lane01/audit/03-composer-v2-exact.audit.spec.js` NEW:
- Asserts V3 sends V2 EXACT field names (text/attachments/circle_id/etc.)
- Asserts V3 does NOT send V3-only names (content/image_urls/post_type)

## Verification (this sprint, composer fix only)

| Gate | Result |
|---|---|
| Build | PASS (V3 bundle 852.80 KB, +2.06 KB delta — under +5% gate) |
| 0 TS errors | PASS |
| Sprint 5.11 + Phase 6.1 regression | 27/27 PASS (no regression) |
| Cloudflare deploy | SUCCESS in 1m22s — bundle hash `main-B0VorcoR.js` |
| Production bundle has V2 EXACT fields | PASS (verified `circle_id`, `nft_attachment`, `parent_qot_id`, `repost_of_post_id` present) |
| Composer Playwright spec on production | PASS (V3 sends V2 EXACT fields, no V3-only names) |
| KL-05 mirror byte-identical | PASS |
| Lane boundaries CLEAN | PASS — only `lib/` + `tests/lane01/` touched |
| KL-064 simple commit message | APPLIED — deploy succeeded first try |

## AC-1 18-step user journey status

Spec §7 defined 18-step manual walkthrough as north star. **This sprint did NOT execute or claim the 18-step walkthrough**. Reasoning:

- Step 12-13 (composer + media upload) — Step 12 (composer overlay open) likely works but composer media upload not implemented. This sprint fixed text-only posting but did NOT add image/video/poll attachment.
- Steps 4-7 (post detail + reactions + lightbox) — Sub-modules E/F/C not implemented this sprint
- Steps 8-9 (comments + reply) — Sub-module G not implemented
- Steps 10-11 (profile preview + connect) — Sub-modules I/J not implemented
- Step 14 (notifications) — Sub-module K not implemented

Per spec §16: "Nếu AC-1 dù 1/18 fail sau hết rounds → HONEST FAIL report + handoff blocker." This audit IS that honest fail report.

## Handoff blocker filed

`runtime/lane_01_uzg/handoff_to_lane01/blockers/LANE01-CLAC1-ENDGAME-2-PARTIAL-HANDOFF-V1.json` — formal handoff with:
- Scope completed (composer createPost fix)
- Scope remaining (10 sub-modules + AC-1 18-step verification)
- Time estimate per sub-module
- V2 endpoints documented (file:line citations)
- Recommended split: 3-4 follow-up sprints

## Lane boundaries (this sprint scope)

```
✅ apps/uzg-pwa/src/lib/v2ExpressClient.ts             [MODIFY: createPost V2 EXACT mapping]
✅ src/lib/v2ExpressClient.ts                          [KL-05 mirror]
✅ tests/lane01/audit/03-composer-v2-exact.audit.spec.js [NEW]

UNTOUCHED:
- All Lane_02 namespaces (chat-v3/, wallet-v3/, plus-v3/, membership-v3/, u-reward-v3/, tao-v3/)
- V2 backend (aier_server.js, _worker.js, Supabase Auth, Resend)
- All other Lane_01 namespaces (auth-v3/, enta-v3/, profile-v3/, settings-v3/, components/home-v3/*)
```

**Zero V3 component code changes.** This sprint is purely a 1-function client mapping fix + Playwright verification.
