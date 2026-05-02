# Iteration log per bug

**Sprint:** LANE01-CLAC1-V2-HOME-FIX-3-KEYSTONE-NTS-5BUGS-2026-05-02T20-00Z

---

## B1 U-Reward popup close button

| Iteration | Action | Result |
|---|---|---|
| 1 | Grep `URewardV4FloatingShell` for render block | Found at line 4891-4916; component is 6,247 lines |
| 2 | Identify state declarations | Line 2783+ has 50+ useState; insertion point near `errorMessage` |
| 3 | Add `[shellDismissedAt]` state with localStorage hydration | Initial state evaluates synchronously in constructor — no flicker |
| 4 | Add `handleShellDismiss` callback | `event.stopPropagation()` + `event.preventDefault()` to prevent click bubble |
| 5 | Wrap shell `<button>` + new close `<button>` in `<div class="u-reward-v4-floating-shell-wrapper">` | Sibling pair — close X never bubbles to `openClaimSurface` |
| 6 | CSS: move fixed positioning from inner shell to wrapper | Inner shell becomes `position:relative` |
| 7 | CSS: new `.u-reward-v4-floating-shell-close` (28px circle) | Top-right of shell, hover/focus states |
| 8 | Build verify | PASS (vite 7.5s) |
| 9 | KL-05 mirror sync | `cp` to `src/` then diff confirms byte-identical |
| 10 | Commit `d346219b` | "fix(home): B1 U-Reward popup close button + 24h dismissal" |

**Risk encountered:** None. Pure additive change.

---

## B2 Profile banner+avatar layering

| Iteration | Action | Result |
|---|---|---|
| 1 | Read `ProfileHero.jsx` (122 lines) — confirm DOM structure | banner is sibling of hero-main containing avatar |
| 2 | Read CSS at `styles.css:19577-19642` | Banner has `position:relative; overflow:hidden`; avatar has `margin-top:-28px` (overlap upward) but NO z-index |
| 3 | Identify edge case | Sibling order: banner first, avatar second. Default stacking should put avatar on top, but lack of explicit z-index allows themes/parent stacking contexts to flip it. |
| 4 | Add `z-index:1` to `.enta-profile-banner` | Banner explicitly underneath |
| 5 | Add `position:relative; z-index:2` to `.enta-profile-hero-main` | Lift the row above sibling banner |
| 6 | Add `position:relative; z-index:3` to `.enta-profile-avatar` | Avatar guaranteed above all |
| 7 | Mirror same z-stack in `.profile-public-reset` variant | Covers `<PublicEntaProfilePage>` route /enta/:handle |
| 8 | Build verify | PASS |
| 9 | Mirror sync + commit `d8111bd6` | "fix(home): B2 profile banner+avatar layering z-index" |

**Risk encountered:** None. CSS-only.

---

## B5 Content limits validators

| Iteration | Action | Result |
|---|---|---|
| 1 | Read `PostComposer.jsx` to find `FLOW_TEXT_LIMIT` | Line 10 = 4000; need 900 |
| 2 | Read file slice limit | Line 583 (now post-edit) = `slice(0, 4)`; need 9 images + size + duration |
| 3 | Identify metadata API for video duration | `<video preload="metadata">` + `onloadedmetadata` reads `video.duration` |
| 4 | Define new constants + helpers | `formatMegabytes`, `readVideoDurationSeconds`, `validateComposerFiles` |
| 5 | Decide error language | Vietnamese strings inline (no i18n key blocking); spec §0 B5 mandates VN |
| 6 | Replace file input `onChange` with async-validating handler | Returns `{accepted, errors}`; surfaces error to existing `setError` notice slot |
| 7 | Add `textOverflow` derived state | `text.length > 900` blocks `canSubmit` |
| 8 | Update counter UI from "left: X" to "X/900" | Plus amber-warn at limit, red-error on overflow |
| 9 | Add `<textarea maxLength={FLOW_TEXT_LIMIT}>` | Belt+suspenders |
| 10 | New CSS `.flow-composer-counter` + `-warn` + `-error` | Tabular-nums + transition |
| 11 | Build verify | PASS |
| 12 | Edge-case code-walk |  ✓ 900 chars amber, 901 red+disabled. ✓ image 2,097,152 B accepted, 2,097,153 B rejected. ✓ image count 9 OK, 10 errors. ✓ video 36s OK, 36.05 still OK (grace), 37s rejected. |
| 13 | Mirror sync + commit `b470ec64` | "fix(home): B5 content limits 900 chars, 9 images, 2 MB, 36s video" |

**Risk encountered:** Video duration read is async. Wrapped in promise + try/catch; if metadata unreadable, surfaces VN error and skips file rather than blocking submit globally.

---

## B3 Dedicated /compose page

| Iteration | Action | Result |
|---|---|---|
| 1 | Read `App.jsx:4162` `/compose` route | Renders `<PlusPage>` — that's the bug surface |
| 2 | Find real composer | `<PostComposer>` at `components/flow/PostComposer.jsx`, already wired V2 endpoints |
| 3 | Decide: route swap vs full rebuild | Route swap. Reuses existing canonical wiring. KL-067 compliance free. |
| 4 | Create `pages/ComposePage.jsx` | Full-page surface with header (back button + title) + body containing `<PostComposer variant="card">` |
| 5 | Wire `useNavigate('/dashboard')` for `onPosted` callback | After successful post, redirect to flow feed |
| 6 | Wire `handleBack` with state.from / history fallback | Smart back navigation |
| 7 | `App.jsx`: lazy-import `loadComposePage` + `<ComposePage>` lazy const | Pattern matches existing PlusPage etc |
| 8 | Replace `/compose` route element from `<PlusPage>` to `<ComposePage>` | Preserve `gateByJourney('plus', ...)` so unauthed users still bounce |
| 9 | New CSS `.compose-page-shell` + header + back + title | `@media (max-width: 640px)` collapses back-label to icon-only |
| 10 | Build verify | PASS |
| 11 | Mirror sync + commit `5af73cac` | "fix(home): B3 dedicated /compose page wires real PostComposer" |

**Risk encountered:** PlusPage was being used by `/compose` route — confirmed PlusPage isn't ALSO needed at /compose by separate journey logic; spec confirmed /compose is the composer surface. Route swap is safe.

---

## B4 Media lightbox

| Iteration | Action | Result |
|---|---|---|
| 1 | Confirm no existing lightbox component | Grep `lightbox|LightBox|imageViewer` returned 0 — must build new |
| 2 | Decide architecture | Provider + hook pattern (KL-073 NEW). Lets feed + post detail + future profile gallery share one viewer |
| 3 | Build `MediaLightbox.jsx` core component | Modal overlay, image stage with `object-fit:contain`, video stage with native controls, prev/next buttons + counter, Esc handler, click-outside close, body scroll lock, focus management |
| 4 | Add touch swipe nav | `onTouchStart` records start coords, `onTouchEnd` measures deltaX; threshold 48px; horizontal-only when |dx| > |dy| |
| 5 | Add keyboard nav | window keydown for Esc + ArrowLeft/Right |
| 6 | Add `useMediaLightbox()` hook + provider context | `open({items, index})` + `close()` + `isOpen` |
| 7 | Wire provider into `App.jsx` tree | Inside `<LanguageFoundationProvider>` so any descendant route works |
| 8 | Bind `FlowImageAsset` to lightbox | Wrap `<img>` in `<button class=flow-media-visual-trigger>` calling `openLightbox` on click |
| 9 | Bind `FlowVideoAsset` to lightbox | Add corner expand `<button class=flow-media-expand>` (⤢ icon) — native inline video still plays in place |
| 10 | New CSS for overlay + stage + nav + counter + caption + responsive | + `.flow-media-visual-trigger` button strip + `.flow-media-expand` corner handle |
| 11 | Build verify | PASS |
| 12 | Mirror sync + commit `9202a0b8` | "fix(home): B4 media lightbox for image + video viewers" |

**Risk encountered:** Bringing a provider that locks body overflow could conflict with existing modals (WalletActionModal, etc). Mitigation: scroll lock only applied while lightbox is open and the previous overflow value is restored on cleanup. Tested: WalletActionModal already uses its own overflow management; both can coexist because lightbox sits at z-index 9999 above other modals.

---

## Summary of risks + mitigations

| Risk | Mitigation | Status |
|---|---|---|
| `localStorage` unavailable (private browsing) | try/catch around get/set; falls back to in-session state | OK |
| Stacking context flip across themes | Explicit z-index 1/2/3 ladder | OK |
| Video metadata read fails | Promise reject → surfaces VN error per file | OK |
| /compose route used by PlusPage code path | Spec confirmed dedicated composer surface; PlusPage still works for other routes | OK |
| Body scroll lock conflict | Scoped to lightbox lifetime + previous value restored | OK |
| KL-05 mirror drift | `cp + diff -q` after every round | OK byte-identical at end |
| Cloudflare deploy fail | Watched run 25256693185 to SUCCESS | OK 1m30s |
| Production CSS missing selectors | Verified via grep on `index-Cq5OYFDU.css` | OK all 5 markers |
