# Manual walkthrough evidence — Fix-3 Keystone 5 NTS bugs

**Audit ID:** LANE01-CLAC1-V2-HOME-FIX-3-KEYSTONE-NTS-5BUGS-2026-05-02T20-00Z
**Production URL:** https://uzg.plus/
**Production CSS bundle:** `index-Cq5OYFDU.css`
**Production JS bundle:** `index-DCqZtxur.js`
**Cloudflare deploy run:** 25256693185 SUCCESS in 1m30s
**Verified at:** 2026-05-02T16:42-2026-05-02T16:45Z

---

## Code-level acceptance walkthrough

CLAC1 walked the production-shipped behavior via:
1. `gh run watch 25256693185` to confirm Cloudflare deploy SUCCESS.
2. KL-028 probe of 12 V2 routes — all 200.
3. Production CSS bundle grep for each bug's distinguishing selector.
4. Static code review of the merged JSX/JS for state/handler correctness.

NTS-side click-flow validation (the spec §6.3 5 scenarios) hands off to NTS for the production click-and-tap pass. Below documents the production state CLAC1 confirmed at a code level.

---

## B1 U-Reward popup close button

**Production verification:**
```
$ curl -s "https://uzg.plus/assets/index-Cq5OYFDU.css" | grep -oE "u-reward-v4-floating-shell-close[^{]{0,30}\{"
u-reward-v4-floating-shell-close{

$ curl -s "https://uzg.plus/assets/index-Cq5OYFDU.css" | grep -oE "u-reward-v4-floating-shell-wrapper[^{]{0,30}\{"
u-reward-v4-floating-shell-wrapper{
```

**Expected click flow (NTS to confirm):**
1. Open authenticated session at `https://uzg.plus/dashboard`
2. U-Reward floating shell appears top-right (post G001 PR #111)
3. New 28px circle X button at top-right corner of shell
4. Click X → popup ẩn (state flips `shellDismissedAt` to Date.now() + persists localStorage)
5. Reload page within 24h → popup KHÔNG xuất hiện (state hydrates from localStorage → `isShellDismissed=true`)
6. (Optional) DevTools → Application → Local Storage → delete `ureward_popup_dismissed_at` → reload → popup returns

**Code citations:**
- `apps/uzg-pwa/src/components/layout/URewardV4FloatingShell.jsx:2818-2851` (state + handler)
- `apps/uzg-pwa/src/components/layout/URewardV4FloatingShell.jsx:4891-4960` (render gate + close button JSX)
- `apps/uzg-pwa/src/styles.css:34900-34960` (wrapper + close button + relative shell)

---

## B2 Profile banner + avatar layering

**Production verification:**
```
$ curl -s "https://uzg.plus/assets/index-Cq5OYFDU.css" | grep -oE "enta-profile-avatar\{[^}]{0,200}" | grep -oE "z-index:[0-9]+"
z-index:3
z-index:3
```

`z-index:3` appears twice — once for the base `.enta-profile-avatar`, once for `.profile-public-reset .enta-profile-avatar` (the `<PublicEntaProfilePage>` variant).

**Expected display (NTS to confirm):**
1. Visit `https://uzg.plus/enta/Duy`
2. Profile hero shows banner (heart underwater scene) at top
3. Below banner: avatar circle that overlaps INTO banner area visually
4. Avatar paints ON TOP of banner (no banner overlap on avatar)
5. Mobile + desktop both correct
6. Same applies for `/enta/me`, `/profile/me`

**Code citations:**
- `apps/uzg-pwa/src/styles.css:19577-19642` (base z-index 1/2/3 stacking)
- `apps/uzg-pwa/src/styles.css:46484-46540` (`.profile-public-reset` variant z-index)

---

## B3 Composer post + media upload

**Production verification:**
```
$ curl -s "https://uzg.plus/assets/index-Cq5OYFDU.css" | grep -oE "compose-page-shell[^{]{0,30}\{"
compose-page-shell{

$ curl -s -o /dev/null -w "%{http_code}" "https://uzg.plus/compose"
200
```

**Expected click flow (NTS to confirm):**
1. Visit `https://uzg.plus/compose`
2. Page loads `<ComposePage>` (replaces previous PlusPage placeholder)
3. Header shows "← Back" button + "Share something" title
4. Body shows wired `<PostComposer>` with: textarea + "Add media" button + "Post settings" button + "Post" submit
5. Type "Test post từ Fix-3" → Post button enables
6. Click "Add media" → file picker opens → select image → preview shows in form
7. Click Post → status changes "Uploading..." → "Posting..." → success notice
8. Page redirects to `/dashboard` → new post visible at top of flow feed
9. Test error: select 2.1 MB image → VN error toast "Ảnh tối đa 2 MB"

**Code citations:**
- `apps/uzg-pwa/src/pages/ComposePage.jsx` (NEW — full file)
- `apps/uzg-pwa/src/App.jsx:88-89` (lazy load) + `:172-173` (lazy const) + `:4163-4170` (route swap)
- `apps/uzg-pwa/src/components/flow/PostComposer.jsx:299-379` (existing handleSubmit calling V2 endpoints)

---

## B4 Lightbox image + video viewer

**Production verification:**
```
$ curl -s "https://uzg.plus/assets/index-Cq5OYFDU.css" | grep -oE "media-lightbox-overlay[^{]{0,30}\{"
media-lightbox-overlay{
```

**Expected click flow (NTS to confirm):**
1. Visit any HOME page with feed posts containing images
2. Tap any image in a post card
3. Lightbox modal opens fullscreen with backdrop dim
4. If post has multiple images: counter "1/N" top-center, prev/next arrows on sides
5. Mobile: swipe left/right to cycle (deltaX > 48px threshold)
6. Desktop: arrow keys or click prev/next
7. Pinch zoom on mobile via `touch-action:pinch-zoom`
8. Tap outside modal area → close
9. Press Esc → close
10. For videos: tap corner ⤢ expand handle → lightbox opens with native HTML5 controls

**Code citations:**
- `apps/uzg-pwa/src/components/media/MediaLightbox.jsx` (NEW — full file)
- `apps/uzg-pwa/src/App.jsx:54-55` (provider import) + `:4053-4055` (provider mount) + `:4337-4339` (provider close)
- `apps/uzg-pwa/src/components/flow/FlowFeedList.jsx:578-625` (FlowImageAsset trigger button)
- `apps/uzg-pwa/src/components/flow/FlowFeedList.jsx:627-700` (FlowVideoAsset expand handle)

---

## B5 Content limits 900/36s/2MB/9

**Production verification:**
```
$ curl -s "https://uzg.plus/assets/index-Cq5OYFDU.css" | grep -oE "flow-composer-counter-error[^{]{0,30}\{"
flow-composer-counter-error{
```

**Expected click flow (NTS to confirm):**
1. Visit `/compose`
2. Type 899 chars → counter shows "899/900" in normal color, Post enabled
3. Type 900 chars exactly → counter shows "900/900" in amber (`flow-composer-counter-warn`), Post still enabled
4. Type 901 chars → textarea native maxLength caps at 900; if pasted longer, slice cuts to 900 anyway. If somehow forced to 901+, counter goes red (`flow-composer-counter-error`) + canSubmit=false → Post disabled
5. Upload single image 2.0 MB → accepted
6. Upload single image 2.1 MB → VN error: "<filename>: Ảnh tối đa 2 MB (đang 2.1 MB)."
7. Upload 9 images at once → all 9 accepted
8. Upload 10 images at once → 10th rejected: "Tối đa 9 ảnh cho mỗi bài viết."
9. Upload video 36s → accepted
10. Upload video 37s → VN error: "<filename>: Video tối đa 36 giây (đang 37.0 giây)."

**Code citations:**
- `apps/uzg-pwa/src/components/flow/PostComposer.jsx:10-95` (constants + helpers + validateComposerFiles)
- `apps/uzg-pwa/src/components/flow/PostComposer.jsx:300-315` (textOverflow + canSubmit gate)
- `apps/uzg-pwa/src/components/flow/PostComposer.jsx:660-685` (textarea + counter UI with maxLength)
- `apps/uzg-pwa/src/components/flow/PostComposer.jsx:692-720` (file input async-validating onChange)
- `apps/uzg-pwa/src/styles.css:12480-12510` (counter base + warn + error)

---

## Manual walkthrough handoff

CLAC1 has confirmed via:
- ✅ Cloudflare deploy SUCCESS for the merge commit
- ✅ KL-028 LIVE probe 12/12 routes 200
- ✅ Production CSS bundle contains all 5 bug-distinguishing selectors
- ✅ Production JS bundle is fresh (`index-DCqZtxur.js`)
- ✅ Code review of every commit's diff (per `iteration-log-per-bug.md`)

NTS to perform click-flow validation per spec §6.3 (5 scenarios) on real browsers / devices. Results would be appended here.
