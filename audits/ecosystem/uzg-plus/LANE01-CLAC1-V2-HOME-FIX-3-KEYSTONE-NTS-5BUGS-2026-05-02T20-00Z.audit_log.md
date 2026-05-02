# Audit Log — V2 HOME Fix-3 Keystone NTS 5 Bugs

**Audit ID:** LANE01-CLAC1-V2-HOME-FIX-3-KEYSTONE-NTS-5BUGS-2026-05-02T20-00Z
**Executor:** CLAC1 (Lane_01) solo
**Sprint type:** Logic-authorized batch fix (5 NTS-reported bugs)

---

## Timeline

### T+00:00 — Sprint kickoff
- Read spec issued by CLA Lane_01 with NTS direct mandate "OK Fix-3 + 5 bugs cụ thể từ screenshots 2026-05-02T19:45Z".
- Logic edits AUTHORIZED for V2 frontend only. V2 backend immutable.
- 5 bugs in priority order (lowest risk first per spec §5): B1 → B2 → B5 → B3 → B4.

### T+00:05 — Phase 1 Discovery
- Switched to fresh `feat/v2-home-fix-3-keystone-nts-5bugs` branch off `main` (commit `83159535`).
- Reverted local untracked artifacts (`.claude/scheduled_tasks.lock`, `apps/uzg-pwa/public/runtime/training-studio-sources.json`).
- Component grep for each bug:
  - B1 → `apps/uzg-pwa/src/components/layout/URewardV4FloatingShell.jsx` (6,247 lines)
  - B2 → `apps/uzg-pwa/src/components/profile/ProfileHero.jsx` (122 lines) + `styles.css:19577-19642`
  - B3 → `/compose` route renders `<PlusPage>`. Real composer is `<PostComposer>` at `apps/uzg-pwa/src/components/flow/PostComposer.jsx` (718 lines, **already wired** to V2 endpoints `createFlowPost`, `uploadFlowComposerAttachments`, `fetchFlowComposerContext`).
  - B4 → no lightbox component exists. Build new under `apps/uzg-pwa/src/components/media/MediaLightbox.jsx`.
  - B5 → `PostComposer.jsx` constants + handlers. Current `FLOW_TEXT_LIMIT = 4000`, file slice limit 4. Need 900 / 9 / 2 MB / 36 s.

### T+00:25 — Wrote `evidence/PLAN.md`
Documented per-bug component paths + fix approaches + risk assessment + acceptance criteria.

### T+00:30 — Round 1 B1 popup close button
- Added `[shellDismissedAt, setShellDismissedAt]` state with localStorage hydration + 24h TTL auto-resurrect.
- Added `handleShellDismiss` `useCallback` that sets state + persists timestamp.
- Wrapped existing shell `<button>` + new close `<button>` in a sibling-pair `<div class="u-reward-v4-floating-shell-wrapper">` — stops X click bubbling to `openClaimSurface`.
- Render gated by `!isShellDismissed`.
- CSS: new `.u-reward-v4-floating-shell-wrapper` (fixed top-right placement transferred from inner shell), new `.u-reward-v4-floating-shell-close` (28px circle button), inner shell now `position:relative`.
- Build: PASS. KL-05 mirror synced.
- Commit `d346219b`.

### T+01:15 — Round 2 B2 banner+avatar layering
- Pure CSS: `.enta-profile-banner` got `z-index:1`; `.enta-profile-hero-main` got `position:relative; z-index:2`; `.enta-profile-avatar` got `position:relative; z-index:3`.
- Same z-stack mirrored in `.profile-public-reset` variant for `<PublicEntaProfilePage>`.
- Build: PASS. KL-05 mirror synced.
- Commit `d8111bd6`.

### T+01:30 — Round 3 B5 content limits
- `FLOW_TEXT_LIMIT 4000 → 900`.
- New constants: `FLOW_IMAGE_MAX_BYTES`, `FLOW_IMAGE_MAX_COUNT`, `FLOW_VIDEO_MAX_DURATION_SECONDS`.
- New helpers: `formatMegabytes`, `readVideoDurationSeconds` (`HTMLVideoElement` metadata API), `validateComposerFiles` (returns `{accepted, errors}`).
- File input `onChange` is now `async` and validates rawFiles before `setSelectedFiles`. Vietnamese error strings populate existing `setError` notice.
- `canSubmit` gates on `!textOverflow`.
- Counter switched from `'left: X'` to `'X/900'` with amber-warn + red-error class states.
- `<textarea maxLength={FLOW_TEXT_LIMIT}>` belt+suspenders.
- New CSS `.flow-composer-counter` + `-warn` + `-error`.
- Build: PASS. KL-05 mirror synced.
- Commit `b470ec64`.

### T+02:15 — Round 4 B3 dedicated /compose page
- New `pages/ComposePage.jsx` — focused full-page surface mounting `<PostComposer variant="card">` with `useNavigate('/dashboard')` redirect on `onPosted`.
- `App.jsx`: lazy-imported `ComposePage`; `/compose` route swapped from `<PlusPage>` to `<ComposePage>`. `gateByJourney('plus', ...)` preserved.
- New CSS `.compose-page-shell` + `.compose-page-header` + `.compose-page-back` + `.compose-page-title` with `@media (max-width: 640px)` responsive.
- KL-067 compliance: did not modify `productV2Service.js`. V2 EXACT body shape preserved.
- Build: PASS. KL-05 mirror synced.
- Commit `5af73cac`.

### T+03:00 — Round 5 B4 media lightbox
- New `components/media/MediaLightbox.jsx` exposes `<MediaLightboxProvider>` context + `useMediaLightbox()` hook.
- Modal supports image (`object-fit:contain`, `touch-action:pinch-zoom`), video (native HTML5 controls), keyboard nav (Esc/arrows), swipe nav (touch deltaX > 48px), prev/next buttons + `1/N` counter, click-outside backdrop closes, body scroll lock, focus management.
- `App.jsx`: imported `MediaLightboxProvider` + wrapped inside `<LanguageFoundationProvider>` so any descendant route can call `useMediaLightbox()`.
- `FlowFeedList.jsx`: `FlowImageAsset` wraps `<img>` in `<button class=flow-media-visual-trigger>` calling `openLightbox`. `FlowVideoAsset` adds corner `<button class=flow-media-expand>` (⤢) launching the lightbox player; native inline `<video>` still plays in place.
- New CSS `.media-lightbox-overlay` + stage + nav + counter + caption + responsive `@media (max-width: 640px)` tweaks. New `.flow-media-visual-trigger` + `.flow-media-expand`.
- Build: PASS. KL-05 mirror synced.
- Commit `9202a0b8`.

### T+04:00 — Phase 3 deploy + verify
- `git push -u origin feat/v2-home-fix-3-keystone-nts-5bugs` SUCCESS.
- `gh pr create --title "v2 home fix-3 keystone live 5 nts bugs popup close profile avatar composer lightbox content limits"` (simple ASCII per KL-064) → PR #114.
- `gh pr merge 114 --admin --merge` → MERGED at `5e4dc686` / 2026-05-02T16:40:50Z.
- `gh run watch 25256693185 --exit-status` → SUCCESS in 1m30s.
- KL-028 LIVE probe 12/12 routes 200.
- Production CSS bundle `index-Cq5OYFDU.css` confirmed contains all 5 bug markers via grep.

### T+04:15 — Audit deliverables
- Wrote 3 DOT files: snapshot + report + audit_log (this file).
- Wrote `evidence/PLAN.md`, `evidence/kl-028-probe-LIVE.txt`.
- Will commit + push + open audit PR + self-merge.

---

## Decisions log

| Decision | Rationale |
|---|---|
| Order B1 → B2 → B5 → B3 → B4 | Spec §5 lowest risk first. CSS-only B1+B2 first builds confidence; B5 validators are localized; B3 is route+page swap; B4 is new component (highest risk). |
| Reuse `<PostComposer>` for B3 | KL-067 — the working composer already exists with V2 EXACT body shape. Wrapping it in a new page is a route swap, not duplication. |
| Lightbox via context provider (B4) | Lets feed + post detail + profile gallery share one viewer without duplicate modal markup. KL-073 NEW pattern. |
| 24h TTL on B1 dismissal | Per spec §0 B1 acceptance "reload page → popup KHÔNG hiện lại trong 24h". 86,400,000 ms threshold. Auto-resurrect after to balance dismiss vs business goal of surfacing rewards. |
| Video duration via `<video>` metadata API (B5) | Browser-native, no library. `HTMLVideoElement.preload='metadata'` + `onloadedmetadata` reads duration before upload. Falls back to error message if metadata unreadable. |
| Vietnamese error strings inline (B5) | Spec §0 B5 requires Vietnamese to match V3 canon. Hard-coded strings rather than i18n keys to avoid blocking on translation file edits this sprint. |
| z-index choices for B2 (1/2/3) | Avatar must beat banner across all themes. 1-2-3 stacking is canonical and fits inside any parent stacking context. |
| Per-bug commits | Spec §5 + §7 AC-7 require granular history for revert. 5 commits = 5 cleanly revertable changes. |
| Self-merge `--admin` | NTS-authorized AMD_NTS_FULL_TECH_AUTONOMY for Lane_01 audits. PR title kept simple ASCII per KL-064. |
| Audit branch in Uniton_Shared, code in uzgplus-app | Standard split. Audit deliverables separate from app PRs. |

## Verification matrix

| Gate | Result |
|---|---|
| HOME_FULL_GAP_LIST.md gap IDs cleared | B1=G002 cleared, B2=new gap, B3+B5=related to G011/G013 keystone, B4=new gap |
| `npx vite build` after each round | PASS |
| KL-05 dual-tree mirror byte-identical post each round | PASS |
| Per-bug commits granular | 5 commits |
| `git push -u origin feat/v2-home-fix-3-keystone-nts-5bugs` | SUCCESS |
| PR #114 self-merged `--admin` | SUCCESS at `5e4dc686` |
| Cloudflare deploy run 25256693185 | SUCCESS in 1m30s |
| KL-028 V2 LIVE probe | 12/12 routes 200 |
| Production CSS bundle | `index-Cq5OYFDU.css` |
| Production JS bundle | `index-DCqZtxur.js` |
| All 5 bug CSS markers in production | PASS |
| V2 backend untouched | PASS (zero `aier_server.js` / Worker / supabase fn changes) |
| `productV2Service.js` untouched | PASS |
| Lane boundary clean | PASS (no Lane_02 / `/v3/*` edits) |
| KL-070 stacked sprint pattern | 5th application today |
| KL-067 reaffirmed | 4th application |
| KL-073 NEW documented | YES |

## Cumulative HOME upgrade across 5 stacked sprints today

| # | Sprint | PR | Visible delta |
|---|---|---|---|
| 1 | Phase 6 ENDGAME-2-A1 | uzgplus-app #102 | V3 5 ngũ hành component shipped |
| 2 | V2 UI Upgrade LIVE | uzgplus-app #106 | V2 fonts + mobile shell + neutral canvas |
| 3 | V2 HOME G001 | uzgplus-app #111 | U-Reward popup top-right |
| 4 | V2 HOME Audit Discovery | Uniton_Shared #101 | (audit-only inventory) |
| 5 | **V2 HOME Fix-3 Keystone (this)** | uzgplus-app #114 | **5 NTS bugs fixed: popup close, profile avatar, composer page, lightbox, content limits** |

## Time accounting

| Phase | Estimated | Actual |
|---|---|---|
| Phase 1 Discovery + PLAN.md | 15-20 min | ~25 min |
| Round 1 B1 popup close | 30-45 min | ~40 min |
| Round 2 B2 banner+avatar | 30-45 min | ~15 min (CSS-only, smaller than estimated) |
| Round 3 B5 content limits | 45-60 min | ~50 min |
| Round 4 B3 compose page | 60-90 min | ~45 min (PostComposer reuse cut work) |
| Round 5 B4 lightbox | 60-90 min | ~50 min |
| Phase 3 deploy + LIVE QA | 45-60 min | ~15 min |
| 3 DOT + audit | 30-45 min | ~25 min |
| **Total** | 5-7 hours | **~4 hours** in single session |

Single-session completion (no honest partial deferral) because:
1. PostComposer was already V2-wired — Round 4 B3 was a route swap not full rebuild.
2. B2 was pure CSS — much smaller than estimated.
3. Build cycle short (vite build 7-8s) so per-round verify was fast.
4. KL-05 mirror handled via simple `cp` — no parallel diff resolution needed.

## Next sprints (CLA dispatch from HOME_FULL_GAP_LIST.md)

After this Fix-3 keystone, remaining queue:
- **Fix-1A** Typography batch (~30 min, NO logic auth)
- **Fix-1B** Color/Spacing batch (~45 min, NO logic auth)
- **Fix-1C** Layout positioning batch (~45 min, NO logic auth)
- **Fix-2A** U-Reward close button — DONE this sprint as B1, mark cleared
- **Fix-2B** Profile preview sheet on tap avatar (~1 h, logic auth)
- **Fix-2C** Connect 4 trust levels UI (~2-3 h, logic auth)
- **Audit-A** Connect sub-lanes capture (~1 h)
- **Audit-B** Post + Profile + Compose + Search + Notifications capture (~2 h)

NTS punch-list now 5/6 cleared (G001 + B1 + B2 + B3 + B4 + B5). Only "5 ngũ hành reactions chuẩn V3 inside V2 HOME feed" remains, awaiting Tier 3-extended feed wiring.
