# UZG+ UI/UX DESIGN SYSTEM CANON v1.0

**Authored:** 2026-04-30 by CLA Lane_01 (Claude Opus 4.7)
**Authority:** AMD_NTS_FULL_TECH_AUTONOMY + canon-author NTS approval pending per R-AUTH-01
**Scope:** Design tokens — color, typography, spacing, layout grid, radius, shadow, motion, iconography, imagery
**Status:** PUBLISHED 2026-04-30
**Prerequisites:** [`UZG_PLUS_UIUX_DESIGN_PRINCIPLES_CANON_v1.md`](UZG_PLUS_UIUX_DESIGN_PRINCIPLES_CANON_v1.md) · [`UZG_PLUS_UIUX_INFORMATION_ARCHITECTURE_SPEC_v1.md`](UZG_PLUS_UIUX_INFORMATION_ARCHITECTURE_SPEC_v1.md)

---

## §1 PURPOSE

This document defines the **design tokens** (visual + interaction primitives) for UZG+ PWA OS. These tokens are the source of truth for every component, page, and theme variant. Implementation (CSS variables, Tailwind config, design-tool tokens) MUST derive from these definitions, not the other way around.

Tokens are organized as:

- §3 Color
- §4 Typography
- §5 Spacing
- §6 Layout grid
- §7 Border radius
- §8 Shadow / elevation
- §9 Motion / animation
- §10 Iconography
- §11 Imagery
- §12 Sacred geometry (UZG+ specific)
- §13 Theme — light + dark + auto

---

## §2 NAMING CONVENTION

All tokens follow the pattern:

```
<category>-<variant>-<modifier>
```

Examples:
- `color-primary-500` (color, primary scale, weight 500)
- `space-md` (space, medium)
- `radius-sm` (radius, small)
- `motion-duration-fast` (motion, duration, fast)

In CSS variables: `--uzg-<category>-<variant>-<modifier>`. In Tailwind config keys: kebab-case matching.

---

## §3 COLOR PALETTE

### 3.1 Brand colors (Primary — zen / spiritual)

The UZG+ brand color sits at the intersection of jade green (East-Asian wisdom tradition) and earth ochre (groundedness). It is **NOT** crypto-purple, **NOT** Web3 cyan, **NOT** SaaS blue.

Primary scale (jade-tinted, low-saturation):

| Token | Hex | Usage |
|---|---|---|
| `color-primary-50` | `#F1F7F4` | lightest surface, subtle backgrounds |
| `color-primary-100` | `#DCEAE2` | hover backgrounds on primary surface |
| `color-primary-200` | `#B8D5C5` | borders, dividers |
| `color-primary-300` | `#8FBBA3` | secondary actions, ghost-button border |
| `color-primary-400` | `#5E997D` | iconography, ENTA accents |
| `color-primary-500` | `#3F7D60` | DEFAULT primary — buttons, links, brand |
| `color-primary-600` | `#326450` | hover state on primary buttons |
| `color-primary-700` | `#264C3D` | pressed state |
| `color-primary-800` | `#1B362C` | dark theme primary |
| `color-primary-900` | `#10211C` | text on light primary surfaces |

### 3.2 Brand colors (Secondary — earth ochre)

| Token | Hex | Usage |
|---|---|---|
| `color-secondary-50` | `#FBF6EE` | lightest |
| `color-secondary-100` | `#F4E7CE` | subtle highlight |
| `color-secondary-200` | `#E9CFA0` | borders on secondary surfaces |
| `color-secondary-300` | `#D9B16A` | tags, badges (Sovereign tier) |
| `color-secondary-400` | `#C49645` | secondary CTAs |
| `color-secondary-500` | `#A57A2C` | DEFAULT secondary |
| `color-secondary-600` | `#825F22` | hover |
| `color-secondary-700` | `#5F4519` | pressed |
| `color-secondary-800` | `#3F2E12` | dark theme |
| `color-secondary-900` | `#241A0B` | dark text on secondary surfaces |

### 3.3 Semantic colors

#### Success (jade-aligned with primary)

| Token | Hex | Usage |
|---|---|---|
| `color-success-50` | `#EEF8F1` | success toast bg |
| `color-success-500` | `#2E8559` | success icons + text |
| `color-success-700` | `#1C5238` | success on dark |

#### Error (warm red, not crypto-red)

| Token | Hex | Usage |
|---|---|---|
| `color-error-50` | `#FBEFEF` | error toast bg |
| `color-error-500` | `#B83A3A` | error icons + text |
| `color-error-700` | `#7A2424` | error on dark |

#### Warning (warm amber)

| Token | Hex | Usage |
|---|---|---|
| `color-warning-50` | `#FCF5E7` | warning toast bg |
| `color-warning-500` | `#C68A1F` | warning icons + text |
| `color-warning-700` | `#7E5614` | warning on dark |

#### Info (cool slate)

| Token | Hex | Usage |
|---|---|---|
| `color-info-50` | `#EEF2F7` | info toast bg |
| `color-info-500` | `#3F6499` | info icons + text |
| `color-info-700` | `#243E62` | info on dark |

### 3.4 Neutrals (warm grey, not pure black/white)

| Token | Hex | Usage |
|---|---|---|
| `color-neutral-0` | `#FFFFFF` | pure white (avoid for backgrounds — use 50) |
| `color-neutral-50` | `#FAF9F7` | DEFAULT page background (light theme) |
| `color-neutral-100` | `#F2F0EC` | card backgrounds |
| `color-neutral-200` | `#E5E2DC` | borders, dividers |
| `color-neutral-300` | `#CFCBC2` | disabled state |
| `color-neutral-400` | `#A5A097` | placeholder text |
| `color-neutral-500` | `#7B7670` | secondary text |
| `color-neutral-600` | `#56524E` | body text |
| `color-neutral-700` | `#3E3B38` | headings |
| `color-neutral-800` | `#272524` | primary text |
| `color-neutral-900` | `#171615` | strongest emphasis |
| `color-neutral-1000` | `#000000` | pure black (avoid — use 900) |

### 3.5 Membership tier accent colors (per DEC-04)

Each tier has a single accent color used sparingly for tier-card borders, tier badges, tier-gated CTAs.

| Tier | Token | Hex | Note |
|---|---|---|---|
| Explorer (Free) | `color-tier-explorer` | `#7B7670` | neutral-500 (no premium accent) |
| Seeker ($9) | `color-tier-seeker` | `#5E997D` | primary-400 (jade entry-tier) |
| Builder ($39) | `color-tier-builder` | `#A57A2C` | secondary-500 (ochre — productive tier) |
| Sovereign ($69) | `color-tier-sovereign` | `#603A8E` | restrained royal — NOT crypto-purple |

### 3.6 Module accent colors

Each of 7 Modules has a single accent for module-specific iconography + page headers.

| Module | Token | Hex | Note |
|---|---|---|---|
| Identity | `color-module-identity` | `#5E997D` | primary-400 jade |
| Community | `color-module-community` | `#3F6499` | info-500 slate (connection) |
| Wisdom AI | `color-module-wisdom` | `#603A8E` | royal (depth) |
| Retreat | `color-module-retreat` | `#A57A2C` | secondary-500 earth |
| Marketplace | `color-module-marketplace` | `#C68A1F` | warning-500 amber (commerce) |
| Wallet | `color-module-wallet` | `#2E8559` | success-500 (value) |
| Governance | `color-module-governance` | `#56524E` | neutral-600 (gravity) |

### 3.7 Color usage rules

- **Background colors:** never use semantic colors (success/error/warning/info) as page backgrounds. Use neutral.
- **Text on color:** color-neutral-900 on light bg, color-neutral-50 on dark bg. Verify contrast ≥ 4.5:1.
- **Brand color ratio:** primary used on ≤ 20% of pixels per page (it punches harder when restrained).
- **Color blind safety:** never use color alone to convey state. Always pair with icon, text, or position.
- **Dark mode:** see §13 — all tokens have dark-mode pairings.

---

## §4 TYPOGRAPHY

### 4.1 Type families

UZG+ uses **two** typefaces, no more:

1. **Sans-serif (UI + body):** `"Be Vietnam Pro"` (free, Vietnamese-native, OFL license) → fallback `"Inter", system-ui, sans-serif`
2. **Serif (display headings + spiritual emphasis):** `"Lora"` (free, Vietnamese diacritic safe, OFL) → fallback `Georgia, serif`

**Why these:**
- Be Vietnam Pro is designed for Vietnamese diacritics from the ground up (no awkward đ, ơ, ư collisions)
- Lora has full diacritic coverage and a calm, reading-oriented feel suited to wisdom content
- Both are free / open-source / self-hostable (no Google Fonts CDN runtime dependency for P3 PWA-first)

### 4.2 Type ramp (mobile-first; desktop scales 1.125×)

| Token | Mobile size / line-height | Desktop size / line-height | Weight | Family | Usage |
|---|---|---|---|---|---|
| `text-display-1` | 40 / 48 | 48 / 56 | 700 | Lora | hero headlines |
| `text-display-2` | 32 / 40 | 36 / 44 | 700 | Lora | section heroes |
| `text-h1` | 28 / 36 | 32 / 40 | 600 | Be Vietnam Pro | page titles |
| `text-h2` | 22 / 30 | 24 / 32 | 600 | Be Vietnam Pro | section titles |
| `text-h3` | 18 / 26 | 20 / 28 | 600 | Be Vietnam Pro | subsection |
| `text-h4` | 16 / 24 | 16 / 24 | 600 | Be Vietnam Pro | minor headings |
| `text-body-lg` | 17 / 26 | 18 / 28 | 400 | Be Vietnam Pro | featured paragraphs |
| `text-body` | 15 / 24 | 16 / 26 | 400 | Be Vietnam Pro | DEFAULT body |
| `text-body-sm` | 14 / 22 | 14 / 22 | 400 | Be Vietnam Pro | dense lists |
| `text-caption` | 13 / 20 | 13 / 20 | 400 | Be Vietnam Pro | metadata, labels |
| `text-overline` | 11 / 16 | 11 / 16 | 600 | Be Vietnam Pro | uppercase tags, eyebrows |
| `text-button` | 15 / 24 | 16 / 24 | 600 | Be Vietnam Pro | button labels |
| `text-mono` | 14 / 22 | 14 / 22 | 400 | `JetBrains Mono` | code, hashes, IDs |

### 4.3 Letter spacing (tracking)

- Display + h1: `-0.02em` (tight)
- h2-h4: `-0.01em`
- Body: `0`
- Overline / button: `+0.05em` (looser, all-caps comfort)
- Mono: `0`

### 4.4 Vertical rhythm

Line-height pairs follow a 4px baseline grid. Heading + paragraph spacing = `space-md` (16px) by default; `space-lg` (24px) between unrelated sections.

### 4.5 Bilingual considerations

- Vietnamese text is ~10% wider than English at same point size (diacritic-stack height + accent overhang). UI components MUST allow `min-height` to flex; never hardcode pixel heights for text containers.
- Avoid all-caps for Vietnamese (diacritics conflict with cap-height); use small-caps or sentence case.
- Line breaks: Vietnamese phrasing prefers shorter lines than English (50-60ch optimal vs 60-75ch for English).

---

## §5 SPACING

Base unit: **4px**. All spacing tokens are multiples of 4.

| Token | Value | Common usage |
|---|---|---|
| `space-0` | 0 | no spacing |
| `space-xxs` | 2px | icon-text gap, tight clusters |
| `space-xs` | 4px | tight padding, between related items |
| `space-sm` | 8px | label-to-input, small gaps |
| `space-md` | 16px | DEFAULT, between paragraphs, card padding |
| `space-lg` | 24px | between sections, card-to-card |
| `space-xl` | 32px | major sections |
| `space-2xl` | 48px | hero margins |
| `space-3xl` | 64px | page-level top/bottom |
| `space-4xl` | 96px | rare — landing page section breaks |

**Rule:** never use values not in the scale. If a layout "needs" 14px or 18px, change the design — not the scale.

---

## §6 LAYOUT GRID

### 6.1 Container widths

| Breakpoint | Width | Columns | Gutter |
|---|---|---|---|
| Mobile (≤ 480px) | full-bleed | 4 | `space-md` (16px) |
| Tablet (481-768px) | full-bleed | 8 | `space-md` (16px) |
| Desktop (769-1280px) | max 1200px centered | 12 | `space-lg` (24px) |
| Wide (≥ 1281px) | max 1280px centered | 12 | `space-lg` (24px) |

### 6.2 Page padding (margin from viewport edge)

| Breakpoint | Page padding |
|---|---|
| Mobile | `space-md` (16px) |
| Tablet | `space-lg` (24px) |
| Desktop | `space-xl` (32px) |
| Wide | `space-xl` (32px) — content stays at 1280px max |

### 6.3 Component grid

Within a page, components compose on a 4-column (mobile) / 8-column (tablet) / 12-column (desktop) grid using gutter from §6.1.

**Column-span rules:**
- Card: full-width on mobile, 4-of-8 on tablet, 6-of-12 on desktop (typical)
- Hero block: full-width
- Sidebar (desktop only): 3-of-12; main content 9-of-12

---

## §7 BORDER RADIUS

UZG+ uses softer, more organic radii than typical SaaS. Avoid sharp 0px or "fully square" except for hard-data tables.

| Token | Value | Usage |
|---|---|---|
| `radius-none` | 0 | data tables, full-bleed images, dividers |
| `radius-xs` | 2px | rare — micro-elements |
| `radius-sm` | 4px | tags, pills, small chips |
| `radius-md` | 8px | DEFAULT — buttons, inputs, cards |
| `radius-lg` | 12px | larger cards, modals |
| `radius-xl` | 16px | hero blocks, prominent surfaces |
| `radius-2xl` | 24px | featured spiritual content cards |
| `radius-full` | 9999px | avatars, circular badges, ENTA orbs |

**Rule:** within a single page, use no more than 3 different radii. Mixing too many feels chaotic.

---

## §8 SHADOW / ELEVATION

UZG+ shadows are **soft and warm-toned**, not hard-edged crisp drop-shadows. Each shadow uses `rgba(23, 22, 21, …)` (warm dark, not pure black).

| Token | Value | Usage |
|---|---|---|
| `shadow-0` | none | flat surfaces, cards on coloured bg |
| `shadow-1` | `0 1px 2px rgba(23,22,21,0.04), 0 1px 3px rgba(23,22,21,0.06)` | resting cards |
| `shadow-2` | `0 2px 4px rgba(23,22,21,0.06), 0 4px 8px rgba(23,22,21,0.08)` | hover state |
| `shadow-3` | `0 4px 8px rgba(23,22,21,0.08), 0 8px 16px rgba(23,22,21,0.10)` | dropdowns, popovers |
| `shadow-4` | `0 8px 16px rgba(23,22,21,0.10), 0 16px 32px rgba(23,22,21,0.12)` | modals, drawers |
| `shadow-5` | `0 16px 32px rgba(23,22,21,0.12), 0 32px 64px rgba(23,22,21,0.16)` | rare — splash, full-screen overlays |

**Inset variants** for inputs (focused state):

- `shadow-inset-1`: `inset 0 1px 2px rgba(23,22,21,0.06)` — input focus

**Dark mode adjustments:** in dark theme, shadows become subtle highlights (lighter rgba) on the upper edge instead of darker drops.

---

## §9 MOTION / ANIMATION

### 9.1 Duration scale

| Token | Value | Usage |
|---|---|---|
| `motion-duration-instant` | 0ms | reduce-motion fallback |
| `motion-duration-xfast` | 100ms | hover states, micro-tweaks |
| `motion-duration-fast` | 200ms | DEFAULT — most transitions |
| `motion-duration-normal` | 300ms | page section reveals |
| `motion-duration-slow` | 500ms | full page transitions, modals |
| `motion-duration-xslow` | 800ms | onboarding gestures, hero animations |

### 9.2 Easing curves

| Token | Bezier | Usage |
|---|---|---|
| `motion-ease-linear` | `linear` | rare — only for continuous animations like spinners |
| `motion-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | DEFAULT — natural decelerate, feels organic |
| `motion-ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` | exit animations |
| `motion-ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | symmetric transitions |
| `motion-ease-spiritual` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | gentle overshoot for ENTA + sacred geometry reveals |

### 9.3 Transform-only rule

Animations MUST use `transform` and `opacity` only (compositor layer). Never animate `width`, `height`, `top`, `left`, `padding`, `margin` — these trigger layout reflow.

### 9.4 Reduce-motion compliance

`@media (prefers-reduced-motion: reduce)` MUST set:
- All `animation` to `0.01ms`
- All `transition` to `0.01ms`
- Disable parallax, autoplay, scroll-linked effects

### 9.5 Choreography

Sequential reveals use staggered delay = `motion-duration-xfast` (100ms) per item, max 5 items. Beyond 5 items, fade in as a group.

---

## §10 ICONOGRAPHY

### 10.1 Icon system

Primary library: **Phosphor Icons (Regular weight)** — open-source, geometric, calm. Falls back to custom UZG+ glyphs for sacred-geometry primitives.

### 10.2 Icon sizes

| Token | Size | Usage |
|---|---|---|
| `icon-xs` | 12px | inline with caption text |
| `icon-sm` | 16px | inline with body text |
| `icon-md` | 20px | DEFAULT — buttons, list items |
| `icon-lg` | 24px | bottom-tab nav |
| `icon-xl` | 32px | feature cards |
| `icon-2xl` | 48px | empty states, hero icons |

### 10.3 Stroke width

Phosphor Regular = 1.5px stroke. Avoid the Bold variant (too aggressive for UZG+ aesthetic). Light variant acceptable for ambient decorative icons.

### 10.4 Custom UZG+ glyphs (sacred geometry)

For ENTA, QOT, Quantum Social, Membership tier, Module-specific iconography — use custom-drawn glyphs based on:
- Mandala primitives (radial symmetry)
- Lotus / seed / sprout (organic growth)
- Trail / lineage spirals (QOT)
- Network nodes + edges (Quantum Social)
- Tier badge geometry (concentric circles for tier rank)

Lane_02 owns the canonical glyph library; this canon defines visual language only.

---

## §11 IMAGERY

### 11.1 Photography

- **Real, not stock.** Photos depict actual UZG+ retreats, real practitioners, authentic locations.
- **Vietnamese / South-East Asian context first.** Imagery reflects the primary user culture.
- **Natural light, no over-saturation.** Calm tones, not Instagram-filter pop.
- **People shown contextually.** Hands holding tea, faces in meditation, walking on a path — not headshot grids.
- **Aspect ratios:** 4:3 hero, 1:1 avatars, 16:9 video poster, 3:4 portrait card.

### 11.2 Illustration

- **Hand-drawn or vector.** Never 3D-render-stock-art-metaverse.
- **Organic, botanical, calligraphic.** Sketched leaves, ink-brush strokes, line-art mandalas.
- **Limited palette per illustration.** ≤ 3 colors from §3 palette.

### 11.3 Avatars

- Default avatar = monogram (initials) over neutral-100 or primary-100 background, with one of 5 organic-shape masks (no perfect circle for the default).
- User-uploaded avatars cropped to circular at runtime.
- ENTA-state visualisations are **separate** from avatars (avatar = identity static; ENTA = dynamic state).

### 11.4 No-go

- ❌ Stock-photo executives shaking hands
- ❌ AI-generated "diverse hands holding glowing crypto coin"
- ❌ Metaverse 3D headshots
- ❌ Skeuomorphic faux-3D buttons / icons
- ❌ Abstract gradient blobs ("acid wash" trend)

---

## §12 SACRED GEOMETRY (UZG+ specific motifs)

### 12.1 ENTA visualisation

ENTA dashboards (`/wisdom/enta`) use **3D-rendered mandala primitives** — orbs orbiting a central point, with concentric rings indicating energy bands. Lane_02 owns the renderer; design tokens here govern color palette + motion only:

- Orb base: `color-primary-400` (jade)
- Ring weights: 1px (low energy) to 4px (peak)
- Orbit duration: `motion-duration-xslow` (800ms) per cycle

### 12.2 QOT trail visualisation

QOT (`/wisdom/qot/me`) renders as a **spiral lineage** — root post at center, descendants spiralling outward chronologically.

- Trail line: `color-primary-300` 1px solid
- Node dots: `color-primary-500` 8px diameter
- Active node: `color-primary-500` 12px with `shadow-2`

### 12.3 Quantum Social network graph

`/community/quantum` renders as a **force-directed network graph** — nodes = users/circles, edges = signal weight.

- Node baseline: `color-info-400` (slate)
- Edge: `color-neutral-300` 1px (weak) to `color-primary-500` 2px (strong)
- High-signal cluster halos: `color-primary-100` low-opacity glow

### 12.4 Membership tier badge

Concentric circles indicating tier rank (1-4):

```
Explorer:    ◯
Seeker:      ◎
Builder:     ◉
Sovereign:   ⊛  (with subtle inner mandala)
```

Each rendered with the tier-accent color from §3.5.

### 12.5 Module glyph framing

Each Module's icon sits inside a soft circular frame using the module-accent color from §3.6 at 20% opacity.

---

## §13 THEME — light / dark / auto

### 13.1 Light theme (DEFAULT)

- Background: `color-neutral-50` (#FAF9F7 — warm off-white)
- Surface: `color-neutral-0` to `color-neutral-100`
- Text: `color-neutral-800` body, `color-neutral-700` heading
- Brand: `color-primary-500`

### 13.2 Dark theme

Dark mode is **NOT** "invert everything". UZG+ dark theme is its own designed palette using warm dark tones.

- Background: `#1B1A19` (warm dark, not pure black)
- Surface: `#272524` (color-neutral-800)
- Elevated surface: `#3E3B38` (color-neutral-700)
- Text: `color-neutral-100` body, `color-neutral-50` heading
- Brand: `color-primary-300` (lighter jade for contrast on dark)

### 13.3 Auto theme

`prefers-color-scheme` honored by default. Manual override available in `/identity/settings/theme` with options: Light · Dark · Auto.

### 13.4 Theme transition

When user toggles theme, transition `motion-duration-normal` (300ms) `motion-ease-out`. Never instant flip — gives the eye time to adjust.

---

## §14 TOKEN EXPORT REFERENCE

This section is reserved for implementation. CSS-variable export, Tailwind config, design-tool token format are decided in Phase 2 implementation, not this canon. The names + values above are authoritative; implementation MUST conform.

---

## §15 CHANGES LOG

**v1.0 (2026-04-30):** Initial publish. Color palette + typography + spacing + grid + radius + shadow + motion + iconography + imagery + sacred geometry + theme — all locked v1.

---

## §16 END

When in doubt, return to **§3.7 brand color ratio**: primary used on ≤ 20% of pixels per page. Restraint is the design.

End of file.
