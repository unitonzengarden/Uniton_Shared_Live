# Forensic audit — Bug A scroll lock + Bug B /enta blank root cause

**Sprint:** LANE01-CLAC1-V2-EMERGENCY-SCROLL-LOCK-AND-ENTA-BLANK-FIX-2026-05-03T07-00Z
**Auditor:** CLAC1 (Lane_01)
**Date:** 2026-05-03
**Method:** Code review + production CSS bundle grep + git diff history

---

## §1 Bug A — Scroll lock root cause CONFIRMED

### §1.1 Symptom (NTS-reported)
After Sprint 3A + 3B deploy, all V2 routes (uzg.plus/dashboard, /enta, /chat, /wallet, /settings, /compose) became un-scrollable. User saw the topmost viewport content but could not scroll down to reveal more.

### §1.2 Hypothesis search

Initial hypotheses considered:
- H1: `body { overflow: hidden }` global rule added by Sprint 3A/3B CSS — REJECTED (no such rule in styles.css; production CSS body rules only set background)
- H2: `.app-shell { height: 100vh; overflow: hidden }` — REJECTED (existing rule uses `min-height: 100vh` which allows scroll)
- H3: Sprint 3A `.enta-onboarding-shell { min-height: 100vh }` leaks to non-onboarding pages — REJECTED (CSS class scoped, only mounts on /enta/onboarding)
- H4: Sprint 3B `.enta-identity-hero` block contains scroll-blocking rule — REJECTED (no overflow / no fixed positioning)
- **H5: `MediaLightboxOverlay` body scroll lock useEffect leaks** — CONFIRMED ✓

### §1.3 Root cause source code

`apps/uzg-pwa/src/components/media/MediaLightbox.jsx` (introduced Sprint Fix-3 keystone PR #114, May 2):

```js
function MediaLightboxOverlay({ state, onClose, onIndexChange }) {
  // ... refs ...

  // Lock body scroll while the lightbox is open so background pages
  // don't scroll under the user's swipe gestures.
  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'        // <--- ALWAYS RUNS ON MOUNT
    return () => {
      document.body.style.overflow = previous
    }
  }, [])                                            // <--- empty deps array

  // ... more hooks ...

  if (!state?.isOpen || !current) return null      // <--- early return AFTER hooks
  // ... render lightbox markup ...
}
```

**Why it failed:**
1. `<MediaLightboxProvider>` is mounted at the App.jsx tree root (wraps every route).
2. The provider always renders `<MediaLightboxOverlay state={state} ...>` as a sibling of `{children}`.
3. When `<MediaLightboxOverlay>` first mounts (on the user's first page load), it executes all hooks unconditionally per React's rules-of-hooks.
4. The `useEffect(() => { document.body.style.overflow = 'hidden' }, [])` fires once on that first mount and locks body scroll.
5. The early return `if (!state?.isOpen) return null` only suppresses the markup — it does NOT prevent the hook side effects.
6. The cleanup function only fires when `<MediaLightboxOverlay>` unmounts — which never happens during normal app usage because it's part of the always-on provider tree.
7. Result: body scroll is locked from app startup until a hard navigate / refresh, regardless of whether the lightbox is ever opened.

### §1.4 Fix applied

```js
useEffect(() => {
  if (typeof document === 'undefined') return undefined
  if (!state?.isOpen) return undefined          // <--- early-out unless open
  const previous = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  return () => {
    document.body.style.overflow = previous
  }
}, [state?.isOpen])                             // <--- depend on state.isOpen
```

Now the effect:
- On first mount with `state.isOpen=false` → early return, no body change
- When user opens lightbox → `state.isOpen=true` → effect fires → body locks
- When user closes lightbox → `state.isOpen=false` → cleanup runs → body restored
- When `<MediaLightboxOverlay>` unmounts → cleanup runs (defensive)

Same fix applied to the focus-management useEffect (lines 87-96) which had the same pattern.

### §1.5 Why this slipped past Sprint Fix-3 keystone QA

Sprint Fix-3 keystone (PR #114, May 2) declared AC-7 PASS for "console + network clean LIVE" but did not test scroll behavior on routes other than `/post` (the lightbox's primary use case). Because users were not yet attempting heavy scroll on /dashboard or /enta in CLAC1's verification, the regression went undetected for ~24 hours until NTS attempted a real session.

## §2 Bug B — /enta blank page

### §2.1 Symptom (NTS-reported)
NTS opens `uzg.plus/enta` (logged-in user with entaRoot) → page renders blank. Wheel hero from Sprint 3B (PR #118) does not appear.

### §2.2 Hypothesis ranking

H6 (most likely): **Consequence of Bug A scroll lock** — When body scroll is locked from app startup, the topmost viewport renders the topbar + first 100vh of /enta content. The Wheel hero block is positioned below the topbar + ENTA topline header. If those upper elements push the hero below the fold, and scroll is locked, the user perceives "blank" because the visible viewport contains only header chrome.

H7 (defense-in-depth): **EntaWheelHero component crash on edge-case data** — If `result?.flow_energy?.element_percentages` returns an unexpected shape (e.g., object with all-zero values, NaN, or string keys), the segment math could throw inside `useMemo(() => buildSegments(elements), [elements])`. Without an error boundary, a throw inside any component during ENTAShell render bubbles to the route renderer and the whole tree blanks. This is a classic React "white screen of death" pattern.

### §2.3 Cannot conclusively distinguish H6 from H7 without browser DevTools

CLAC1 lacks an authenticated browser harness in this session — cannot capture the JS console errors that would distinguish "page rendered fine but content is below fold" (H6) from "component crashed during render" (H7).

**Pragmatic decision:** apply both fixes:
1. **Fix Bug A** (scroll lock root cause) — H6 resolves automatically because user can now scroll down to the Wheel hero
2. **Fix defense-in-depth** for H7 — wrap `<EntaWheelHero>` mount in `<ErrorBoundary>` so any future throw inside the wheel render leaves the rest of /enta visible

### §2.4 Fixes applied

**New file `apps/uzg-pwa/src/components/ui/ErrorBoundary.jsx`:**
- Generic React class component (boundaries must be class components)
- `getDerivedStateFromError` + `componentDidCatch` capture the throw
- Renders a localized Vietnamese fallback (`khu vực này tạm thời không hiển thị`) with a retry button instead of blank page

**`apps/uzg-pwa/src/components/enta/ENTAShell.jsx` — wrap the Wheel hero block:**
```jsx
<ErrorBoundary label="enta-identity-hero">
  <div className="enta-identity-hero" aria-label="ENTA wheel hero">
    <EntaWheelHero ... />
  </div>
</ErrorBoundary>
```

Now if the wheel ever throws (NaN, missing fields, browser API gap), only that block fails; the topbar + identity intro counters + ProfileIdentityPanel + EntaPersonalCorePanel + EntaNotificationsPanel below all continue to render.

**`apps/uzg-pwa/src/styles.css` — `.error-boundary-fallback` styling:**
- Soft red border + background to signal "something's wrong here, but the page is alive"
- Vietnamese copy (V3 canon language)

## §3 Lane boundary check

The fix touches:
- `components/media/MediaLightbox.jsx` (Sprint Fix-3 keystone B4 file) — patched useEffect dependencies
- `components/enta/ENTAShell.jsx` (existing V2 file) — wrapped one block in ErrorBoundary
- `components/ui/ErrorBoundary.jsx` (NEW)
- `styles.css` — added `.error-boundary-fallback` block

**NOT touched:**
- `apps/uzg-pwa/src/services/productV2Service.js` (V2 EXACT body shape preserved per KL-067)
- `aier_server.js`, `_worker.js`, `supabase/functions/*` (V2 backend immutable)
- Sprint 3A files: `useEntaWizardState.js`, `EntaOnboardingShell.jsx`, `WizardStepIndicator.jsx`, `Step1BirthData.jsx`, `Step2Calculating.jsx`, `StepPlaceholder.jsx`, `EntaOnboardingPage.jsx` — wizard logic intact
- Sprint 3B files: `EntaWheelHero.jsx`, `Step3ResultReveal.jsx` — Wheel SVG geometry intact (only the dashboard mount was wrapped in ErrorBoundary)
- V3 deprecated tree (`apps/uzg-pwa/src/components/enta-v3/*`) untouched
- Lane_02 namespaces untouched

## §4 Build + production verification

```
$ npx vite build
✓ built in 7.59s

$ grep -c "error-boundary-fallback" dist/assets/index-HyjO8hj6.css
1

$ git diff main..HEAD --stat
 .../components/enta/ENTAShell.jsx                     |  41 ++++++--
 .../components/media/MediaLightbox.jsx                |  31 ++++--
 apps/uzg-pwa/src/components/ui/ErrorBoundary.jsx       |  60 ++++++++++++ (NEW)
 apps/uzg-pwa/src/styles.css                            |  29 ++++++
 (+ KL-05 mirror in src/)
```

After PR #120 merge (`001bba1f` / 2026-05-03T00:28:43Z) and Cloudflare deploy run 25265628575 SUCCESS:

```
$ curl -s "https://uzg.plus/" | grep -oE 'index-[A-Za-z0-9_-]+\.css' | head -1
index-BiG9q8R8.css

$ curl -s "https://uzg.plus/assets/index-BiG9q8R8.css" | grep -oE 'error-boundary-fallback' | head -3
error-boundary-fallback
error-boundary-fallback
error-boundary-fallback

$ # No global body{ overflow:hidden } rule:
$ curl -s "https://uzg.plus/assets/index-BiG9q8R8.css" | grep -oE 'body\{[^}]*overflow:hidden[^}]*' | head -3
(empty — confirms the global body has no overflow:hidden)

$ # MediaLightbox CSS still bundles overlay class:
$ curl -s "https://uzg.plus/assets/index-BiG9q8R8.css" | grep -oE 'media-lightbox-overlay' | head -2
media-lightbox-overlay
```

KL-028 LIVE probe 12/12 routes 200 (homepage / login / dashboard / enta / enta/onboarding / enta/me / chat / wallet / settings / connections / compose / profile/me / u-reward).

## §5 What CLAC1 cannot verify in this session (KL-077 honest partial)

- Cannot execute Playwright authenticated test on production
- Cannot capture browser screenshots
- Cannot read browser DevTools Console JS errors on /enta to disambiguate H6 vs H7 (both fixes are applied defensively, so this gap is not blocking)
- Cannot directly verify scroll behavior in a real browser

**Mitigation:** the fix is mechanically obvious from the React rules-of-hooks. The body scroll lock leak in MediaLightbox is a well-known pattern bug that can be reasoned about purely from source code. The fix has been verified to ship to production via CSS marker grep + chunk hash change. NTS click-flow verification handed off as the final confirmation.
