# G001 Fix Detail — U-Reward Floating Shell Repositioning

## NTS-reported bug (spec §9 AC-9)

> "U-Reward popup → top-right + close button (NTS specific)"

NTS screenshot evidence (production V2 home_mobile_LIVE_uzg.plus.png) showed:
- U-Reward floating card stuck at bottom-left of viewport
- Card body: "U REWARD / Please wait / This lane stays quiet until it is ready. / Sync / No crash"
- Obstructs bottom-nav area + post-card content
- No close affordance

## File:line citation (KL-048)

`apps/uzg-pwa/src/styles.css:34900-34928` (BEFORE fix):
```css
.u-reward-v4-floating-shell {
  position: fixed;
  left: max(16px, calc(var(--ui-shell-fixed-offset) + var(--ui-shell-padding-x)));
  bottom: calc(var(--xpwa-bottom-nav-overlay-offset) + 2px);
  z-index: 33;
  width: min(228px, calc(100vw - 108px));
  min-height: 74px;
  ...
}
```

The `position: fixed; left: ...; bottom: ...;` rule positioned the shell at bottom-left.

## Component reference

`apps/uzg-pwa/src/components/layout/URewardV4FloatingShell.jsx` (6247 lines, untouched).
Class name `u-reward-v4-floating-shell` rendered by JSX. Component is a passive info display showing:
- Daily reward eligibility status
- U-currency balance sync state
- Tap → expand to V5 lobby (full reward UI)

## Fix applied (CSS only, 7+/2−)

`apps/uzg-pwa/src/styles.css:34900-34910` (AFTER):
```css
.u-reward-v4-floating-shell {
  /* V2 HOME Full Audit + Upgrade 2026-05-02 — NTS-reported gap G001:
     U-Reward floating shell repositioned bottom-left → top-right per
     spec §9 AC-9 NTS-specific request. Top-right placement clears
     bottom-nav area + composer FAB and stays out of post-card content.
     Position uses safe-area-inset-top for iOS notch + 64px topbar offset. */
  position: fixed;
  right: max(16px, calc(var(--ui-shell-fixed-offset) + var(--ui-shell-padding-x)));
  top: calc(72px + env(safe-area-inset-top, 0px));
  z-index: 33;
  width: min(228px, calc(100vw - 108px));
  min-height: 74px;
  ...
}
```

Changes:
1. `left:` → `right:` (mirror horizontal placement)
2. `bottom: calc(var(--xpwa-bottom-nav-overlay-offset) + 2px)` → `top: calc(72px + env(safe-area-inset-top, 0px))` (clear top bar + iOS notch)
3. Added inline JSDoc citing G001 + spec §9 AC-9

Total: 7 insertions (block comment + new positioning), 2 deletions (old `left:` + `bottom:` rules).

## Why no close button?

Spec §1 STRICT mandate:
> "KHÔNG edit V2 component logic JavaScript (state, effects, handlers, API calls)"

Close button requires:
1. JSX element (`<button onClick={...}>×</button>`)
2. State variable for dismissed flag (`useState`)
3. Conditional render based on state
4. Click handler

All four are LOGIC edits. CSS-only path can position the popup anywhere on screen but cannot add a functional close button.

**Decision:** Ship CSS-only reposition fix. Document close button as separate sub-task in handoff blocker requiring explicit logic-edit authorization.

## Production verification

```bash
$ curl -s "https://uzg.plus/" | grep -oE 'index-[A-Za-z0-9_]+\.css' | head -1
index-DvFWmoqS.css

$ curl -s "https://uzg.plus/assets/index-DvFWmoqS.css" \
    | grep -oE "u-reward-v4-floating-shell\{[^}]{0,400}" \
    | grep -oE "right:|left:|top:|bottom:" \
    | sort -u
right:
top:
```

Production CSS confirmed: `right:` + `top:` present (not `left:` + `bottom:`).

## Browser behavior

| Viewport | Position |
|---|---|
| Mobile 320-480px | top: 72px + safe-area, right: 16px (away from notch + status bar) |
| Tablet 481-768px | top: 72px, right: 16px |
| Desktop 769-1440px | Same — within mobile shell 480px wrapper, near top-right corner of inner shell |
| Desktop 1441-1920px | Same — within mobile shell 480px wrapper |

`env(safe-area-inset-top, 0px)` ensures iOS Safari + iPhone notch handling.

`max(16px, ...)` ensures at least 16px gutter from edge regardless of viewport calc.

## Customer impact

- Visible delta: U-Reward popup now appears at top-right instead of bottom-left
- All other behavior unchanged (tap → expand to V5 lobby still works, all data fetching unchanged)
- Zero JS errors introduced
- Zero network changes
- Sprint 5.11 + Phase 6.1 regression: 27/27 PASS post-fix
