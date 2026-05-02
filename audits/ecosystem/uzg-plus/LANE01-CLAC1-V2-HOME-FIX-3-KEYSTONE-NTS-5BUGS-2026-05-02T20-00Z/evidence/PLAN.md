# Fix-3 Keystone — PLAN per-bug

**Sprint:** LANE01-CLAC1-V2-HOME-FIX-3-KEYSTONE-NTS-5BUGS-2026-05-02T20-00Z
**Branch:** `feat/v2-home-fix-3-keystone-nts-5bugs`

## Component discovery

| Bug | Component path | Size | Approach |
|---|---|---|---|
| B1 popup | `src/components/layout/URewardV4FloatingShell.jsx` | 6,247 lines | Add close button JSX + state + localStorage 24h TTL near render block (line 4891-4916) |
| B2 banner+avatar | `src/components/profile/ProfileHero.jsx` (122) + `src/styles.css:19577-19642` | small | CSS-only: add `position: relative; z-index: 2;` to `.enta-profile-avatar`. Currently avatar is sibling of banner with `margin-top: -28px` for upward overlap — but no z-index → banner's stacking context wins on some browsers/themes. |
| B3 composer | `src/components/flow/PostComposer.jsx` (718) — already wired V2 endpoints (`createFlowPost`, `uploadFlowComposerAttachments`, `fetchFlowComposerContext`). Issue: `/compose` route renders `<PlusPage>` not `<PostComposer>`. | medium | Create new `src/pages/ComposePage.jsx` rendering `<PostComposer variant="card">` standalone, wire to `/compose` route in App.jsx |
| B4 lightbox | NONE — does not exist. Build `src/components/media/MediaLightbox.jsx` | new | Modal: image fullscreen + zoom + swipe + Esc/click-outside close + video player |
| B5 limits | `src/components/flow/PostComposer.jsx` constants + handlers | small | Change `FLOW_TEXT_LIMIT 4000 → 900`. Change `slice(0, 4) → slice(0, 9)`. Add image size 2MB check + video duration 36s check. VN error messages. |

## V2 endpoints reference

Already exist in `src/services/productV2Service.js`:
- `fetchFlowComposerContext(user)` — composer context
- `uploadFlowComposerAttachments(session, user, files)` — multipart upload, returns `[{url, type, ...}]`
- `createFlowPost(session, user, {text, circle_id, visibility, attachments, nft_attachment, ...})` — submit post

V2 EXACT body shape (KL-067):
```js
{
  text: string,                  // up to 900 chars (per B5)
  circle_id: string|null,
  visibility: 'public'|'private'|'circle',
  attachments: Array<{url, type, ...}>,  // up to 9 images per B5
  nft_attachment: {id, asset_code}|null,
  parent_qot_id: string|null,
  repost_of_post_id: string|null,
}
```

## Order of execution (lowest risk → highest)

1. **Round 1 — B1 popup close button** (~30 min)
   - Modify `URewardV4FloatingShell.jsx` at top of component: add `[dismissed, setDismissed] = useState(...)` initialized from `localStorage.ureward_popup_dismissed_at`
   - Add `useEffect` to persist on dismiss
   - Add `<button className="u-reward-v4-floating-shell-close" onClick={...}>×</button>` as sibling of shell button
   - Wrap shell render in `!dismissed && (...)`
   - Add CSS `.u-reward-v4-floating-shell-close` styling
   - Test: button appears, click → ẩn, reload trong 24h → vẫn ẩn

2. **Round 2 — B2 banner+avatar layering** (~15 min — pure CSS)
   - Edit `styles.css:19615-19624` `.enta-profile-avatar`: add `position: relative; z-index: 2;`
   - Edit `.enta-profile-banner`: ensure `z-index: 1;`
   - Edit `.enta-profile-hero-main`: ensure no negative z-context

3. **Round 3 — B5 content limits** (~45 min)
   - Edit `PostComposer.jsx`:
     - Line 10: `FLOW_TEXT_LIMIT = 4000 → 900`
     - Line 583 file slice: `slice(0, 4) → slice(0, 9)`
     - Add image size validation `if (file.size > 2*1024*1024) reject`
     - Add video duration validation via `<video>` metadata read
     - VN error messages for each
   - Add `appT` translations to language data

4. **Round 4 — B3 composer page** (~45 min)
   - Create `src/pages/ComposePage.jsx`: full-screen card with `<PostComposer variant="card" allowInlineCollapse={false}>` consuming `user`, `session` props
   - Edit `App.jsx:4162` `/compose` route: replace `<PlusPage>` with `<ComposePage>`
   - Test: navigate `/compose` → composer renders + post works

5. **Round 5 — B4 lightbox** (~60 min)
   - Create `src/components/media/MediaLightbox.jsx`: modal with image/video, prev/next, zoom (pinch on mobile, scroll on desktop), close on Esc/click-outside
   - Mount listener in feed post images / video thumbnails
   - CSS for fullscreen modal

## Per-round commit pattern

After each round:
```bash
git add -p apps/uzg-pwa/src/<files>
git commit -m "fix(home): B<N> <description>"
git push origin feat/v2-home-fix-3-keystone-nts-5bugs
```

KL-049 revert protection: each commit independently revertable.

## Risk assessment

| Bug | Risk | Mitigation |
|---|---|---|
| B1 | LOW | Pure JSX add + state — won't break existing behavior |
| B2 | VERY LOW | CSS-only, no logic |
| B3 | MEDIUM | New page + route change. Test build before deploy. |
| B4 | MEDIUM | New component listening on existing DOM. Isolate behind feature flag if breaking. |
| B5 | LOW-MEDIUM | Existing handlers gain validation. Edge cases: exact-limit, +1 over. |

## Acceptance per round

- B1: NTS opens popup → click X → popup hides → reload 1h later → still hidden → clear localStorage → popup returns
- B2: NTS visits `/enta/Duy` → avatar overlaps banner with avatar ON TOP visually
- B3: NTS visits `/compose` → composer renders → types text → upload image → click Post → success → redirect feed → post visible
- B4: NTS taps image in feed → lightbox fullscreen → swipe between images → tap outside → close
- B5: NTS types 901 chars → counter red + Post disabled. Upload 2.1MB image → VN error toast. Upload 10 images → VN error. Upload 37s video → VN error.

## Lane boundary

- Touch: `apps/uzg-pwa/src/components/layout/URewardV4FloatingShell.jsx`, `apps/uzg-pwa/src/components/profile/ProfileHero.jsx` (maybe), `apps/uzg-pwa/src/styles.css`, `apps/uzg-pwa/src/components/flow/PostComposer.jsx`, `apps/uzg-pwa/src/components/media/MediaLightbox.jsx` (NEW), `apps/uzg-pwa/src/pages/ComposePage.jsx` (NEW), `apps/uzg-pwa/src/App.jsx`
- DON'T touch: `aier_server.js`, `_worker.js`, supabase functions, Lane_02 namespaces, /v3/* routes
