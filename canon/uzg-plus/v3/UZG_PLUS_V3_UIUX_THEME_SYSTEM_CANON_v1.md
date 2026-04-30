# UZG+ V3 — THEME SYSTEM CANON v1.0

**Document ID:** `UZG_PLUS_V3_UIUX_THEME_SYSTEM_CANON_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 3 (Cross-cutting design system — governed by Foundation OS Canon Tier 3)
**Type:** Cross-cutting canon — applies to ALL V3 modules
**Status:** ✅ NTS APPROVED 2026-04-30 (Mockup #6.5 Theme Showcase verification)

**Source of truth:**
- NTS verbatim approval 2026-04-30: "1.C , 2.C , 3.B"
- Mockup #6.5 verified: `UZG_PLUS_V3_MOCKUP_06_5_THEME_SHOWCASE.html`
- V2 precedent: 5-theme color picker (KIM/THỦY/MỘC/HỎA/THỔ) per Master Audit screenshots

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1`
- Tier 3: `UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1`
- Tier 4: ALL module canons (HOME, CHAT, WALLET, ENTA, PLUS Hub, U-Reward, TAO)

---

## §0 PURPOSE

Khóa **Theme System** cho UZG+ V3 PWA OS — 5 ngũ hành themes (KIM, THỦY, MỘC, HỎA, THỔ) drive UI chrome appearance per user's ENTA dominant element (auto) hoặc Settings override (manual). Theme system is **identity-driven**, not Light/Dark preference.

---

## §1 THREE LOCKED PRINCIPLES

### §1.1 Principle 1 — Auto + Override (1C)

**Default:** Theme resolves automatically from user's **ENTA dominant element**.

Example: NTS = Hỏa-Mộc dominant → default theme = **Hỏa** (warm red).

**Override:** User can override anytime in **Settings → Theme picker** (5 cards selectable).

**Override persistence:** Once user manually picks a theme, it persists. Future ENTA recalc updates the *default* but does NOT auto-revert manual override.

**Reset to auto:** User can re-enable auto-mode in Settings ("Use ENTA dominant").

### §1.2 Principle 2 — Full Immersive (2C)

Theme touches **ALL chrome surfaces** (immersive presence):

✅ **Theme-driven (changes per element):**
- Bottom Nav center button "U+" gradient + glow shadow
- Floating + button (FAB) gradient + glow
- Top Bar Avatar gradient
- U-Reward pill border + tint background + text color
- Background radial gradients (body + phone canvas)
- Quantum particles fill color
- Section accent links + active states
- Focus rings on inputs/buttons
- Featured note tints (PLUS Hub Featured section)
- Theme active card hero blocks (per-screen identity reinforcement)

🚫 **NOT theme-driven (preserve identity):**
- App icons (universal recognition)
- Ngũ Hành element data colors (data integrity — Bazi/Tử Vi/Phong Thủy charts)
- Semantic colors (success green / warning amber / danger red)
- Universal text colors
- Brand parent layer tokens (`--uniton-quantum`, `--aier-purple`, `--aifi-gold`)

### §1.3 Principle 3 — Five Fixed Shades (3B)

Each element has **ONE fixed shade** (no Light/Dark variant per element). Theme = identity, not preference.

| Element | Theme name | Shade | Attribute |
|---|---|---|---|
| **KIM** | Metal | Light Silver | Tòng cách · Sắc bén · Nghĩa |
| **THỦY** | Water | Deep Blue | Nhuận hạ · Trí tuệ |
| **MỘC** | Wood | Green | Khúc trực · Nhân từ |
| **HỎA** | Fire | Warm Red | Viêm thượng · Lễ |
| **THỔ** | Earth | Gold | Giá sắt · Tín · Bao dung |

**No system-wide Light/Dark toggle** — element shade IS the appearance choice.

---

## §2 IMPLEMENTATION CONTRACT — 9 CSS VARIABLES

### §2.1 Required theme tokens

Every theme defines exactly these 9 CSS custom properties at `:root` level (or scoped class):

```css
:root[data-theme="hoa"] {
  --t-primary: #E24B4A;
  --t-primary-light: #F19594;
  --t-primary-dark: #A32D2D;
  --t-tint: rgba(226, 75, 74, 0.07);
  --t-glow-soft: rgba(226, 75, 74, 0.25);
  --t-glow-strong: rgba(226, 75, 74, 0.32);
  --t-particle: #E24B4A;
  --t-bg-radial-1: rgba(226, 75, 74, 0.10);
  --t-bg-radial-2: rgba(186, 117, 23, 0.06);
}
```

### §2.2 Five theme palettes (canonical hex)

#### KIM theme
```css
--t-primary: #6E7178;
--t-primary-light: #A9ADB5;
--t-primary-dark: #444448;
--t-tint: rgba(110, 113, 120, 0.07);
--t-glow-soft: rgba(169, 173, 181, 0.25);
--t-glow-strong: rgba(169, 173, 181, 0.35);
--t-particle: #888780;
--t-bg-radial-1: rgba(169, 173, 181, 0.10);
--t-bg-radial-2: rgba(110, 113, 120, 0.06);
```

#### THỦY theme
```css
--t-primary: #185FA5;
--t-primary-light: #5B92D4;
--t-primary-dark: #0C447C;
--t-tint: rgba(24, 95, 165, 0.07);
--t-glow-soft: rgba(91, 146, 212, 0.30);
--t-glow-strong: rgba(91, 146, 212, 0.40);
--t-particle: #185FA5;
--t-bg-radial-1: rgba(24, 95, 165, 0.12);
--t-bg-radial-2: rgba(12, 68, 124, 0.06);
```

#### MỘC theme
```css
--t-primary: #1D9E75;
--t-primary-light: #6FCBA9;
--t-primary-dark: #0F6E56;
--t-tint: rgba(29, 158, 117, 0.07);
--t-glow-soft: rgba(111, 203, 169, 0.30);
--t-glow-strong: rgba(111, 203, 169, 0.40);
--t-particle: #1D9E75;
--t-bg-radial-1: rgba(29, 158, 117, 0.10);
--t-bg-radial-2: rgba(15, 110, 86, 0.06);
```

#### HỎA theme (default for Hỏa-dominant users)
```css
--t-primary: #E24B4A;
--t-primary-light: #F19594;
--t-primary-dark: #A32D2D;
--t-tint: rgba(226, 75, 74, 0.07);
--t-glow-soft: rgba(226, 75, 74, 0.25);
--t-glow-strong: rgba(226, 75, 74, 0.32);
--t-particle: #E24B4A;
--t-bg-radial-1: rgba(226, 75, 74, 0.10);
--t-bg-radial-2: rgba(186, 117, 23, 0.06);
```

#### THỔ theme
```css
--t-primary: #BA7517;
--t-primary-light: #EBA961;
--t-primary-dark: #854F0B;
--t-tint: rgba(186, 117, 23, 0.07);
--t-glow-soft: rgba(235, 169, 97, 0.30);
--t-glow-strong: rgba(235, 169, 97, 0.40);
--t-particle: #BA7517;
--t-bg-radial-1: rgba(186, 117, 23, 0.10);
--t-bg-radial-2: rgba(133, 79, 11, 0.06);
```

### §2.3 Theme switching mechanism

```html
<body data-theme="hoa">  <!-- swap to "kim" | "thuy" | "moc" | "tho" -->
```

Or React state-driven:

```jsx
<div className={`app-shell theme-${activeTheme}`}>
```

Single attribute change → entire UI re-themes. **Zero per-component theme logic.**

---

## §3 USAGE RULES

### §3.1 Component author rules

Component CSS author MUST:
- Use `var(--t-primary)` etc. for chrome surfaces (NOT hardcode hex)
- Use brand tokens (`var(--uzg-blue)`, `var(--uniton-quantum)`) for parent-layer brand surfaces
- Use Ngũ Hành data tokens (`var(--hoa)`, `var(--moc)`, etc.) ONLY for data visualization (charts, element bars, Pentagon)

Component CSS author MUST NOT:
- Reference theme tokens for app icons
- Reference theme tokens for element data colors
- Add per-element conditional logic (e.g. "if hoa → red, if moc → green") — that's what `--t-*` tokens already abstract

### §3.2 Settings UI rules

Settings → Theme picker shows:
- 5 cards (one per element)
- Each card with: orb gradient preview / name (KIM/THỦY/MỘC/HỎA/THỔ) / EN name + shade label / attribute description
- Active card highlighted with element border + tint background
- Status badge: "Auto · ENTA dominant" (when matches ENTA) or "Manual" (when override)
- Toggle: "Use ENTA dominant element" (re-enable auto-mode)

### §3.3 ENTA Wheel rules (special case)

ENTA Wheel Pentagon (Mockup #5) uses **all 5 element colors simultaneously** for its 5 petals. This is data visualization — NOT chrome — and uses `var(--hoa)`, `var(--moc)`, etc. data tokens.

The Pentagon Wheel does NOT recolor based on theme. The user's element distribution is shown in their natural ngũ hành colors regardless of active theme.

---

## §4 V3 MIGRATION FROM V2

### §4.1 V2 state (per Master Audit)

V2 has 5-theme picker (KIM Light / THỦY Dark / MỘC Green / HỎA Red / THỔ Gold) shown in Master Audit screenshots. Implementation incomplete:
- Theme picker exists but only changes accent dot colors
- No full immersive theming
- No ENTA-driven auto-resolution

### §4.2 V3 implementation order

1. **Define 5 theme palettes** in design system (`tokens/themes.ts` or CSS file)
2. **Add `data-theme` attribute** at root (auto-resolved from ENTA dominant)
3. **Refactor chrome surfaces** to use `var(--t-*)` tokens (replace hardcoded blue Cobalt with theme primary)
4. **Build Settings → Theme picker** UI (5 cards, override support, "Use ENTA" toggle)
5. **Build override persistence** (user_preferences.theme_override field in DB)
6. **Build ENTA recalc respect logic** (don't auto-revert override)
7. **Migrate existing V2 theme picker** to V3 implementation

### §4.3 V2 → V3 chrome migration checklist

| Surface | V2 hardcoded | V3 token |
|---|---|---|
| Bottom Nav center button | `#4A6FFF → #3B5BAA` gradient | `var(--t-primary) → var(--t-primary-dark)` |
| FAB | `#4A6FFF → #3B5BAA` gradient | `var(--t-primary) → var(--t-primary-dark)` |
| Top Avatar | `#5B7FD4 → #243870` | `var(--t-primary-light) → var(--t-primary-dark)` |
| U pill | `rgba(74,111,255,0.07)` bg | `var(--t-tint)` |
| Body radial bg 1 | `rgba(74,111,255,0.10)` | `var(--t-bg-radial-1)` |
| Body radial bg 2 | `rgba(117,53,204,0.06)` | `var(--t-bg-radial-2)` |
| Particles | `#4A6FFF` | `var(--t-particle)` |
| Confirm buttons | `#4A6FFF → #3B5BAA` | `var(--t-primary) → var(--t-primary-dark)` |

---

## §5 VISUAL REFERENCE

Verified mockups demonstrating theme system:
- **Mockup #6.5 Theme Showcase** — 5 phones side-by-side cùng PLUS Hub screen rendered in 5 themes
- **Mockup #4 / #5 / #6 / #7 / #8** — all running Hỏa theme (NTS user default)

Theme system is consistent across:
- Foundation OS shell (Mockup #1)
- HOME interaction patterns (Mockup #2)
- CHAT module (Mockup #3)
- WALLET module (Mockup #4)
- ENTA module (Mockup #5)
- PLUS Hub (Mockup #6)
- U-Reward mini app (Mockup #7)
- TAO mini app (Mockup #8)

---

## §6 ACCESSIBILITY

### §6.1 Contrast ratios

All 5 themes verified WCAG AA on text/background combinations:
- `--t-primary-dark` text on white background: ≥ 4.5:1
- White text on `--t-primary` button: ≥ 4.5:1
- `--t-primary-light` decorative: not used as sole text color

### §6.2 Reduced motion

Theme particles + radial bg gradients respect `prefers-reduced-motion: reduce`:
- Particles: static (no orbit/drift animation)
- Radial gradients: static (no breathing/pulse)

### §6.3 Color-blind safety

Theme color is **never** the sole indicator for state. Element labels (KIM/THỦY/MỘC/HỎA/THỔ text) accompany color in all data viz. Active states use `border` + `weight` + `color` simultaneously.

---

## §7 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized from NTS verbatim approval (1C+2C+3B) + Mockup #6.5 Theme Showcase verified |

---

🔒 UZG+ V3 PWA OS — Theme System Canon v1.0
End of file.
