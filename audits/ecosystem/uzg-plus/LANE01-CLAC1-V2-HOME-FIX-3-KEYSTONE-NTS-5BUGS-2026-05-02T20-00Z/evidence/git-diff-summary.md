# Git diff summary — PR #114 (this sprint)

**PR:** https://github.com/unitonzengarden/uzgplus-app/pull/114
**Merge commit:** `5e4dc686ae75197fb28aac4351070306cc51bda9`
**Merged at:** 2026-05-02T16:40:50Z
**Cloudflare deploy run:** 25256693185 (SUCCESS in 1m30s)

## Per-bug commits (granular history)

```
$ git log --oneline 83159535..5e4dc686 --no-merges
9202a0b8 fix(home): B4 media lightbox for image + video viewers
5af73cac fix(home): B3 dedicated /compose page wires real PostComposer
b470ec64 fix(home): B5 content limits 900 chars, 9 images, 2 MB, 36s video
d8111bd6 fix(home): B2 profile banner+avatar layering z-index
d346219b fix(home): B1 U-Reward popup close button + 24h dismissal
```

## Files changed in PR #114

```
$ git diff 5e4dc686^1..5e4dc686 --stat
 apps/uzg-pwa/src/App.jsx                                  |   15 +-
 apps/uzg-pwa/src/components/flow/FlowFeedList.jsx         |   74 +-
 apps/uzg-pwa/src/components/flow/PostComposer.jsx         |  138 +-
 apps/uzg-pwa/src/components/layout/URewardV4FloatingShell.jsx | 108 +-
 apps/uzg-pwa/src/components/media/MediaLightbox.jsx       |  256 +  (NEW)
 apps/uzg-pwa/src/pages/ComposePage.jsx                    |   79 +  (NEW)
 apps/uzg-pwa/src/styles.css                               |  398 +-
 src/App.jsx                                               |  129 +-  (KL-05 mirror)
 src/components/flow/FlowFeedList.jsx                      |  124 +-  (KL-05 mirror)
 src/components/flow/PostComposer.jsx                      |  138 +-  (KL-05 mirror)
 src/components/layout/URewardV4FloatingShell.jsx          |  108 +-  (KL-05 mirror)
 src/components/media/MediaLightbox.jsx                    |  256 +   (KL-05 mirror)
 src/pages/ComposePage.jsx                                 |   79 +   (KL-05 mirror)
 src/styles.css                                            | 3480 +- (KL-05 mirror, was drifted before reconcile)
 14 files changed, 4901 insertions(+), 481 deletions(-)
```

The `src/styles.css` 3480-line delta reflects both this sprint's CSS additions PLUS reconciling the pre-existing drift between `apps/uzg-pwa/src/styles.css` and the root `src/styles.css` mirror per KL-05. Same byte-identical content now in both trees.

## Per-bug attribution

| Bug | Commit | File(s) primarily touched |
|---|---|---|
| B1 popup close button | `d346219b` | `URewardV4FloatingShell.jsx` (state + JSX) + `styles.css` (wrapper + close button) |
| B2 banner+avatar layering | `d8111bd6` | `styles.css` (z-index 1/2/3 stacking) |
| B5 content limits | `b470ec64` | `PostComposer.jsx` (constants + validators + counter UI) + `styles.css` (counter states) |
| B3 dedicated /compose page | `5af73cac` | `pages/ComposePage.jsx` (NEW) + `App.jsx` (route swap) + `styles.css` (page surface) |
| B4 media lightbox | `9202a0b8` | `components/media/MediaLightbox.jsx` (NEW) + `App.jsx` (provider mount) + `FlowFeedList.jsx` (image/video click bind) + `styles.css` (modal) |

## V2 backend untouched proof

```
$ git diff 5e4dc686^1..5e4dc686 -- 'aier_server.js' '_worker.js' 'supabase/functions/**'
(no output — zero changes)

$ git diff 5e4dc686^1..5e4dc686 -- 'apps/uzg-pwa/src/services/productV2Service.js'
(no output — zero changes)
```

Lane boundary: zero Lane_02 namespace edits, zero `/v3/*` route changes.
