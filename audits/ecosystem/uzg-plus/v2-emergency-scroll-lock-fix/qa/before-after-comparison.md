# Before / after comparison — P0 emergency fix

**Sprint:** LANE01-CLAC1-V2-EMERGENCY-SCROLL-LOCK-AND-ENTA-BLANK-FIX-2026-05-03T07-00Z

## Code diff (the actual fix)

```
$ git show 001bba1f -- apps/uzg-pwa/src/components/media/MediaLightbox.jsx | head -40
```

| Line | Before (Sprint Fix-3 keystone PR #114) | After (this P0 fix PR #120) |
|---|---|---|
| useEffect body lock guard | (none) | `if (!state?.isOpen) return undefined` |
| useEffect deps array | `[]` (mount once) | `[state?.isOpen]` (re-run on open/close) |
| Effect side effect timing | runs once on app mount, never undoes | runs only while lightbox visible |
| Body scroll baseline | `'hidden'` from app startup | `''` (browser default = scrollable) |

## Production CSS bundle hash diff

| Bundle | Pre-fix | Post-fix |
|---|---|---|
| CSS | `index-CdN8fmH-.css` (or earlier Sprint 3B era) | `index-BiG9q8R8.css` (NEW) |
| JS | (Sprint 3B era hash) | `index-CXBNUJnE.js` (NEW) |
| ErrorBoundary CSS marker | absent | `error-boundary-fallback` (3 hits) |

## NTS-reported pre-fix symptoms

| Page | Pre-fix |
|---|---|
| `/dashboard` | scroll locked — only 1 viewport visible, cannot scroll feed |
| `/enta` | blank page — no Wheel hero, no content visible |
| `/chat` | scroll locked |
| `/wallet` | scroll locked |
| All other pages | scroll locked |

## Expected post-fix (NTS verify in real browser)

| Page | Post-fix expected |
|---|---|
| `/dashboard` | scroll works; feed reveals more posts on scroll |
| `/enta` | renders Wheel hero (or ErrorBoundary fallback if Wheel still throws on edge case); rest of dashboard visible regardless |
| `/chat` | inbox list scrolls |
| `/wallet` | wallet sections scroll |
| `/enta/onboarding` | wizard intact (Sprint 3A files unchanged) |
| All other pages | scroll works |

## Lightbox behavior preserved (regression check)

The fix MUST NOT remove the lightbox functionality — only un-leak the body lock when lightbox is closed.

| Scenario | Behavior |
|---|---|
| App mount, no lightbox open | body scrollable (was: locked → fixed) |
| Tap image in feed → lightbox opens | body locks (effect fires on `state.isOpen=true`) |
| Close lightbox via Esc / click-outside / X button | body lock releases (cleanup fires on `state.isOpen=false`) |
| Open lightbox 2nd time | body locks again |
| App-level navigate while lightbox open | provider tree persists, lightbox stays open or closes per route guard; cleanup fires either way |

## Rollback plan if NTS verify still fails

```bash
# Step 1 — revert this fix
gh pr revert 120 --merge --admin

# Step 2 — if root cause is elsewhere, escalate
# Possible alternate suspects:
# - Another useEffect with body.style.overflow somewhere else
# - Touch-action CSS rule blocking scroll on mobile
# - position:fixed on .v2-shell or .app-shell intercepting scroll
# - Service worker / runtime cache serving stale CSS bundle
```
