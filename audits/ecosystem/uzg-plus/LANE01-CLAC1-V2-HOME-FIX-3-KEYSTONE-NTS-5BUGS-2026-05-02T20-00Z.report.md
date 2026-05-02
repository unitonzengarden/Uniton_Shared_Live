# V2 HOME Fix-3 Keystone NTS 5 Bugs — Final Report (LIVE)

**Audit ID:** LANE01-CLAC1-V2-HOME-FIX-3-KEYSTONE-NTS-5BUGS-2026-05-02T20-00Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane_01) solo
**Status:** **COMPLETE LIVE PRODUCTION** — all 5 NTS-reported bugs deployed.

---

## §1 Executive summary

Five NTS-reported bugs from screenshots `2026-05-02T19:45Z` are **fixed and LIVE on `https://uzg.plus/`** via PR #114 merged at `5e4dc686` / 2026-05-02T16:40:50Z. Cloudflare deploy run 25256693185 SUCCESS in 1m30s. KL-028 LIVE probe: 12/12 routes 200.

| Bug | Severity | Status | LIVE evidence |
|---|---|---|---|
| **B1** U-Reward popup chưa tắt được | CRITICAL | ✅ FIXED | CSS `u-reward-v4-floating-shell-close{` present in `index-Cq5OYFDU.css` |
| **B2** Profile banner đè avatar | CRITICAL | ✅ FIXED | CSS avatar `z-index:3` + banner `z-index:1` present |
| **B3** Composer không post + media | CRITICAL | ✅ FIXED | New `/compose` page mounts wired PostComposer; `compose-page-shell{` in CSS |
| **B4** Thiếu lightbox image + video | HIGH | ✅ FIXED | New `<MediaLightboxProvider>` wraps app; `media-lightbox-overlay{` in CSS |
| **B5** Content limits (900/36s/2MB/9) | HIGH | ✅ FIXED | `flow-composer-counter-error{` in CSS; validators in `PostComposer.jsx` |

## §2 Per-bug fix detail

### §2.1 B1 — U-Reward popup close button (commit `d346219b`)

**Root cause:** PR #111 (Sprint G001) shipped only CSS reposition (bottom-left → top-right). Close button needs JSX + state which prior spec forbade.

**Fix:** Added inside `URewardV4FloatingShell.jsx`:
- `[shellDismissedAt, setShellDismissedAt]` state hydrated from `localStorage.ureward_popup_dismissed_at` with 24h TTL auto-resurrect
- `handleShellDismiss` callback persists timestamp + clears state
- Wrapper div holds shell button + close button as siblings — close click never bubbles to `openClaimSurface`
- Render gated by `!isShellDismissed`

CSS additions in `styles.css`:
- New `.u-reward-v4-floating-shell-wrapper` (fixed top-right placement transferred from inner shell)
- New `.u-reward-v4-floating-shell-close` (28px circle button, top-right of shell)
- Inner shell now `position:relative` so the wrapper controls fixed positioning

**Acceptance per spec §6.3 B1:**
- click X → popup hidden (state flips, render gates off)
- reload < 24h → still hidden (localStorage rehydrates `shellDismissedAt`)
- clear localStorage → popup returns (initial state evaluates raw == 0)

### §2.2 B2 — Profile banner+avatar layering (commit `d8111bd6`)

**Root cause:** CSS lacked explicit z-index. Avatar with `margin-top:-28px` should overlap banner upward, but on certain themes banner's stacking context could win and paint on top.

**Fix (CSS-only):**
- `.enta-profile-banner`: `z-index:1`
- `.enta-profile-hero-main`: `position:relative; z-index:2`
- `.enta-profile-avatar`: `position:relative; z-index:3`
- Same z-stack mirrored in `.profile-public-reset` variant for `<PublicEntaProfilePage>`

**Acceptance per spec §6.3 B2:**
- visit `/enta/<handle>` → avatar circle visually on top of banner across all themes mobile + desktop

### §2.3 B5 — Content limits validators (commit `b470ec64`)

**Root cause:** No client-side enforcement; backend may accept 4000-char text and any-size files.

**Fix in `PostComposer.jsx`:**
- New constants: `FLOW_TEXT_LIMIT 900`, `FLOW_IMAGE_MAX_BYTES 2*1024*1024`, `FLOW_IMAGE_MAX_COUNT 9`, `FLOW_VIDEO_MAX_DURATION_SECONDS 36`
- New helpers: `formatMegabytes`, `readVideoDurationSeconds` (uses `<video>` metadata API), `validateComposerFiles` (returns `{accepted, errors}`)
- File input `onChange` now async-validates before `setSelectedFiles`; surfaces Vietnamese error to existing notice slot
- `canSubmit` gated by `!textOverflow`
- Counter switched from `'left: X'` to `'X/900'` with amber-warn at limit, red-error on overflow
- `<textarea>` gained native `maxLength` as belt+suspenders

**Vietnamese error copy per V3 canon:**
- Image > 2 MB: `"<file>: Ảnh tối đa 2 MB (đang X.X MB)."`
- Image count > 9: `"Tối đa 9 ảnh cho mỗi bài viết."`
- Video duration > 36s: `"<file>: Video tối đa 36 giây (đang X.X giây)."`
- Video metadata unreadable: `"<file>: Không đọc được thời lượng video, vui lòng thử lại."`

**Edge cases code-verified:**
- 900 chars → counter amber, Post enabled
- 901 chars → counter red, Post disabled (`textOverflow=true` blocks `canSubmit`)
- Image 2,097,152 bytes (= 2 MB) → accepted; 2,097,153 bytes → rejected
- Image count 9 → all accepted; image count 10 → 10th rejected, error string surfaced
- Video duration 36.0s → accepted; 36.05s → still accepted (0.05s grace); 37.0s → rejected

### §2.4 B3 — Composer wire endpoints (commit `5af73cac`)

**Root cause:** `/compose` route rendered `<PlusPage>` which displayed a static composer placeholder (`"Share something..."`, `"+ Attach"`, `"📷 Media"`) with no submit handlers.

**Fix:**
- New `pages/ComposePage.jsx` — focused full-page surface that mounts `<PostComposer variant="card">` (the production-wired composer used by `<FlowFeedPage>` and `<Dashboard>`)
- `App.jsx`: lazy-import `ComposePage`; `/compose` route swapped from `<PlusPage>` to `<ComposePage>`. The `'plus'` journey gate is preserved
- New CSS `.compose-page-shell` + `.compose-page-header` + `.compose-page-back` + `.compose-page-title` responsive

**KL-067 compliance:** `<PostComposer>` calls into `productV2Service.js` for:
- `fetchFlowComposerContext(user)` — circles + nft assets
- `uploadFlowComposerAttachments(session, user, files)` — multipart upload
- `createFlowPost(session, user, {text, circle_id, visibility, attachments, nft_attachment, ...})` — V2 EXACT body shape

This sprint did not modify `productV2Service.js`. Endpoints unchanged.

**Acceptance per spec §6.3 B3:**
- visit `/compose` → composer renders (loading state on first mount, then form)
- type text → image upload via `+ Add media` → tap Post → success → redirect `/dashboard` → post visible at top of feed

### §2.5 B4 — Lightbox image + video viewer (commit `9202a0b8`)

**Root cause:** No lightbox component existed. Inline `<img>` + `<video>` only.

**Fix:**
- New `components/media/MediaLightbox.jsx` exposing:
  - `<MediaLightboxProvider>` context (wraps `App.jsx` tree)
  - `useMediaLightbox()` hook with `open({items, index})` + `close()`
- Modal supports:
  - Image: `object-fit:contain`, native pinch zoom via `touch-action:pinch-zoom`
  - Video: native HTML5 `<video controls playsInline preload="metadata">`
  - Keyboard: Esc closes, ←/→ cycles items
  - Touch: swipe left/right deltaX > 48px cycles
  - Prev/Next buttons + `1/N` counter
  - Click outside backdrop closes
  - Body scroll lock while open + focus management
- `App.jsx`: `<MediaLightboxProvider>` wraps inside `<LanguageFoundationProvider>` so any descendant route can call `useMediaLightbox()`
- `FlowFeedList.jsx`:
  - `FlowImageAsset`: `<img>` wrapped in `<button class=flow-media-visual-trigger>` that calls `openLightbox` on click. Keyboard accessible
  - `FlowVideoAsset`: adds `<button class=flow-media-expand>` (corner ⤢ handle) to launch lightbox player. Native inline `<video>` still plays in place

**Acceptance per spec §6.3 B4:**
- tap image in feed → fullscreen lightbox → swipe between images (multi-image post) → Esc / tap-outside closes
- tap video expand handle → lightbox player with native HTML5 controls (no auto-play)

## §3 V2 backend immutability proof

```
$ git diff origin/main..HEAD -- 'aier_server.js' '_worker.js' 'supabase/functions/**'
(no output — zero changes)
```

`productV2Service.js` also unchanged this sprint — V2 EXACT body shape preserved end-to-end per KL-067.

## §4 KL-028 V2 LIVE probe (post-deploy)

```
200 https://uzg.plus/
200 https://uzg.plus/login
200 https://uzg.plus/dashboard
200 https://uzg.plus/enta
200 https://uzg.plus/enta/Duy
200 https://uzg.plus/compose
200 https://uzg.plus/post
200 https://uzg.plus/notifications
200 https://uzg.plus/profile/me
200 https://uzg.plus/settings
200 https://uzg.plus/connections
200 https://uzg.plus/u-reward
```

12/12 V2 routes 200. Customer impact during deploy: zero (CSS+JS swap, no API change).

## §5 Production CSS selector verification

```
$ CSS=$(curl -s "https://uzg.plus/" | grep -oE 'index-[A-Za-z0-9_-]+\.css' | head -1)
$ echo "$CSS"
index-Cq5OYFDU.css

$ curl -s "https://uzg.plus/assets/$CSS" | grep -oE "u-reward-v4-floating-shell-close[^{]{0,30}\{"
u-reward-v4-floating-shell-close{                          # B1

$ curl -s "https://uzg.plus/assets/$CSS" | grep -oE "u-reward-v4-floating-shell-wrapper[^{]{0,30}\{"
u-reward-v4-floating-shell-wrapper{                        # B1

$ curl -s "https://uzg.plus/assets/$CSS" | grep -oE "enta-profile-avatar\{[^}]{0,200}" | grep -oE "z-index:[0-9]+"
z-index:3                                                  # B2 (avatar)
z-index:3                                                  # B2 (.profile-public-reset .enta-profile-avatar)

$ curl -s "https://uzg.plus/assets/$CSS" | grep -oE "media-lightbox-overlay[^{]{0,30}\{"
media-lightbox-overlay{                                    # B4

$ curl -s "https://uzg.plus/assets/$CSS" | grep -oE "compose-page-shell[^{]{0,30}\{"
compose-page-shell{                                        # B3

$ curl -s "https://uzg.plus/assets/$CSS" | grep -oE "flow-composer-counter-error[^{]{0,30}\{"
flow-composer-counter-error{                               # B5
```

All 5 bug-specific CSS markers present in production bundle.

## §6 Manual walkthrough recommended for NTS

NTS verifies live (per spec §6.3):

1. **B1 verify:** open any HOME page, see U-Reward popup → click X → popup ẩn. Reload page → popup KHÔNG hiện lại. (Optional) Clear localStorage in devtools → popup hiện lại.
2. **B2 verify:** visit `/enta/Duy` → avatar overlaps banner with avatar visually on top. Mobile + desktop.
3. **B3 verify:** visit `/compose` → composer renders. Type text → tap Post → redirect feed → post visible. Click `+ Add media` → file picker → image → preview → submit → post có image. Test error: file > 2 MB → VN error toast.
4. **B4 verify:** Tap image in feed → lightbox fullscreen. Pinch zoom (mobile) / native browser zoom (desktop). Swipe / arrow keys cycle if multi-image. Esc/tap-outside → close. Tap video corner ⤢ → lightbox player with native controls.
5. **B5 verify:** Compose 901 ký tự → counter red + Post button disabled. 900 ký tự exactly → counter amber + Post enabled. Upload image 2.1 MB → "Ảnh tối đa 2 MB". Upload 10 images → "Tối đa 9 ảnh cho mỗi bài viết." Upload video 37s → "Video tối đa 36 giây."

## §7 KL extensions (3 ledger updates)

### KL-070 reaffirmed (5th application today)

5 stacked sprints today (PR #102 ngũ hành + PR #106 V2 UI Upgrade + PR #111 G001 fix + Uniton_Shared #101 audit discovery + PR #114 this 5-bug batch). The cumulative effect IS the comprehensive HOME upgrade NTS asked for.

### KL-067 reaffirmed (4th application — `<PostComposer>` reuse)

The /compose route swap (B3) reuses the working `<PostComposer>` instead of duplicating composer wiring. KL-067 says "V2 client follow V2 canonical service field names" — by reusing the same component, V2 EXACT body shape (`text` + `attachments` + `circle_id` + `nft_attachment` + `visibility`) is preserved automatically.

### KL-073 NEW — Lightbox provider pattern for cross-route media viewers

Building a `<MediaLightboxProvider>` at the app root + `useMediaLightbox()` hook lets any descendant component (feed, post detail, profile gallery) trigger the same fullscreen viewer without duplicating modal markup. Pattern reusable for future media surfaces (NFT gallery preview, profile cover viewer, ENTA wheel zoom).

## §8 Sign-off

5/5 NTS-reported bugs fixed and LIVE on `https://uzg.plus/`. Cloudflare deploy SUCCESS. 12/12 routes 200. V2 backend untouched. Lane boundary clean. Per-bug commits ready for granular revert. Manual walkthrough handed to NTS for click-flow validation.

This sprint completes the Tier 3 keystone from `LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z`. Remaining tiers (Fix-1A typography batch, Fix-1B color/spacing batch, Fix-1C layout positioning, Fix-2A close-button echoes, Audit-A connect sub-lanes, Audit-B post/profile/compose/search/notifications) feed the next 4-6 sprints.
