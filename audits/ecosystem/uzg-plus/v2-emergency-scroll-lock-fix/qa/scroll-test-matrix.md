# Scroll test matrix — code-level + production CSS verification

**Sprint:** LANE01-CLAC1-V2-EMERGENCY-SCROLL-LOCK-AND-ENTA-BLANK-FIX-2026-05-03T07-00Z

**Honest scope:** CLAC1 cannot run real browser scroll tests in this session. The matrix below documents the EXPECTED behavior post-fix (testable by NTS in a real browser) plus the CODE-LEVEL evidence that the fix removes the leak.

| Page | Pre-fix behavior (NTS reported) | Post-fix expected | Code-level evidence |
|---|---|---|---|
| `/dashboard` | scroll locked | scrolls full feed | MediaLightbox useEffect now gated on `state?.isOpen` — body.style.overflow only set when lightbox visible |
| `/enta` | blank page | renders Wheel hero + scrolls down to counters + identity panels | (1) scroll lock fix above (2) ErrorBoundary wrapping Wheel block (defense in depth) |
| `/enta/onboarding` | wizard renders (this surface was OK pre-fix because wizard is full-page overlay, scroll lock irrelevant) | unchanged | wizard files Sprint 3A intact |
| `/chat` | scroll locked | inbox list scrolls | scroll lock fix |
| `/wallet` | scroll locked | wallet sections scroll | scroll lock fix |
| `/settings` | scroll locked | settings panels scroll | scroll lock fix |
| `/compose` | scroll locked | composer scrolls (long form) | scroll lock fix |
| `/profile/me` | scroll locked | profile scrolls | scroll lock fix |

## Pre/post fix comparison via diff

```
$ git show 001bba1f -- apps/uzg-pwa/src/components/media/MediaLightbox.jsx
@@ -75,11 +75,17 @@
   useEffect(() => {
     if (typeof document === 'undefined') return undefined
+    if (!state?.isOpen) return undefined
     const previous = document.body.style.overflow
     document.body.style.overflow = 'hidden'
     return () => {
       document.body.style.overflow = previous
     }
-  }, [])
+  }, [state?.isOpen])
```

The 2-line patch (gate condition + dependency) moves the body lock from "always on" to "only while lightbox open".

## NTS verification protocol

For each row in the table:
1. Open the URL in a real browser
2. Wait for content to render (typically 2-3s)
3. Attempt scroll down (touch swipe / mouse wheel / keyboard PageDown)
4. Verify scrollY > 0 after scroll attempt (DevTools console: `window.scrollY`)
5. Mark PASS / FAIL

Optional: open lightbox via tapping a feed image post-fix → verify body lock activates while lightbox open → close → verify body lock releases (cleanup).
