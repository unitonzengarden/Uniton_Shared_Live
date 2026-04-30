# UZG+ UI/UX COMPONENT LIBRARY SPEC v1.0

**Authored:** 2026-04-30 by CLA Lane_01 (Claude Opus 4.7)
**Authority:** AMD_NTS_FULL_TECH_AUTONOMY + canon-author NTS approval pending per R-AUTH-01
**Scope:** Component inventory + per-component spec — Atomic / Molecular / Organism levels
**Status:** PUBLISHED 2026-04-30
**Prerequisites:** [`UZG_PLUS_UIUX_DESIGN_PRINCIPLES_CANON_v1.md`](UZG_PLUS_UIUX_DESIGN_PRINCIPLES_CANON_v1.md) · [`UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1.md`](UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1.md)

---

## §1 PURPOSE

This document defines **WHAT components exist** in the UZG+ component library and the contract each component upholds (props, states, accessibility, mobile-vs-desktop behavior). The library is organised in three levels following Atomic Design (Brad Frost):

- **Atomic** — irreducible primitives (Button, Input, Avatar, Icon, …)
- **Molecular** — small clusters (InputField, Card, Tab, …)
- **Organism** — page-level structural pieces (Header, BottomNav, Sidebar, …)

Each component spec includes:

- **Purpose** — what problem it solves
- **Variants** — which forms it takes
- **Props** — input contract (descriptive, not TypeScript)
- **States** — default / hover / active / disabled / error / loading / empty
- **Accessibility** — keyboard, ARIA, screen reader
- **Mobile vs desktop** — breakpoint behavior
- **Anti-pattern** — what NOT to do with this component

---

## §2 NAMING CONVENTION

```
Uzg<Domain?><ComponentName>
```

- All component names PascalCase, prefixed `Uzg`
- Optional Domain segment for module-specific components: `UzgWalletBalanceCard`, `UzgEntaOrb`
- Atomic primitives: no Domain (`UzgButton`, `UzgInput`)

File structure: `src/components/<level>/<ComponentName>/index.tsx`

---

## §3 ATOMIC COMPONENTS (15)

### 3.1 UzgButton

**Purpose:** Primary clickable action.

**Variants:** `primary` (filled jade) · `secondary` (filled ochre) · `ghost` (outlined) · `text` (no border) · `destructive` (filled error-red — for irreversible actions only)

**Props:**
- `variant`
- `size`: `sm` (32px height) / `md` (40px DEFAULT) / `lg` (48px)
- `iconStart?`, `iconEnd?`
- `loading` (replaces label with spinner)
- `disabled`
- `fullWidth` (mobile-friendly)
- `onClick`

**States:** default · hover (bg darken 1 step) · active (bg darken 2 steps) · disabled (opacity 0.5, cursor not-allowed) · loading (spinner, label hidden, click blocked)

**Accessibility:**
- `<button type="button">` semantic
- Min 44×44 touch target via padding (even at `sm` size)
- Loading state announced via `aria-live="polite"` ("Loading…")
- Disabled buttons MUST also be `aria-disabled="true"`
- Focus ring uses `color-primary-300` 2px outset

**Mobile vs desktop:** identical spec; `fullWidth=true` typical on mobile forms.

**Anti-pattern:** Don't use `destructive` for routine deletions — only true irreversibles. Don't put 3+ buttons in a row at mobile widths (use overflow menu).

### 3.2 UzgIconButton

**Purpose:** Icon-only clickable action (header back, close modal, like reaction).

**Props:** `icon`, `label` (REQUIRED — for ARIA), `size` (`sm`/`md`/`lg`), `variant` (`solid`/`ghost`)

**Accessibility:** `aria-label={label}` REQUIRED. Without it, fails P6.

**Anti-pattern:** Never deploy without `label`.

### 3.3 UzgInput

**Purpose:** Single-line text input.

**Props:**
- `type`: `text` / `email` / `password` / `number` / `tel` / `url` / `search`
- `value`, `onChange`, `placeholder`, `disabled`, `readOnly`, `autoFocus`
- `inputMode` (mobile keyboard hint: numeric, decimal, …)
- `autoComplete` token (per browser autofill spec)

**States:** default · focus (border `color-primary-500`, `shadow-inset-1`) · disabled · readonly · error (border `color-error-500`)

**Accessibility:** always associate with `<UzgLabel>` via id/htmlFor. `aria-invalid` true on error. `aria-describedby` for error or helper text.

### 3.4 UzgTextarea

**Purpose:** Multi-line text input.

**Props:** same as Input, plus `rows`, `autoResize` (grows with content).

**Anti-pattern:** Don't use for emails / single-line content.

### 3.5 UzgToggle (Switch)

**Purpose:** Binary on/off setting.

**Props:** `checked`, `onChange`, `label`, `description?`

**Accessibility:** `role="switch"`, `aria-checked`. Label clickable + announces state.

**Anti-pattern:** Don't use for actions that take effect on a different button click; toggles imply immediate effect.

### 3.6 UzgCheckbox

**Purpose:** Multi-select item or single boolean opt-in.

**Props:** `checked`, `indeterminate`, `onChange`, `label`, `description?`

**Accessibility:** native `<input type="checkbox">` underneath custom visual.

### 3.7 UzgRadio

**Purpose:** Mutually exclusive choice in a `RadioGroup`.

**Props:** `value`, `name`, `label`. Must be inside `<UzgRadioGroup>`.

### 3.8 UzgTag (Pill)

**Purpose:** Compact label — categorisation, filter chips, status badges.

**Variants:** `neutral` · `primary` · `success` · `warning` · `error` · `info` · `tier-explorer/seeker/builder/sovereign`

**Props:** `variant`, `size` (`sm`/`md`), `iconStart?`, `removable` (renders × button), `onRemove?`

**Accessibility:** Removable tags announce "Press delete to remove" via `aria-keyshortcuts="Delete"`.

### 3.9 UzgBadge

**Purpose:** Small notification indicator (count or dot) attached to another element.

**Variants:** `dot` (no count, just presence indicator) · `count` (numeric) · `text` (short label)

**Props:** `variant`, `count`, `max` (default 99 → "99+"), `color` (semantic token)

**Accessibility:** count announced via `aria-label="3 unread notifications"`.

### 3.10 UzgAvatar

**Purpose:** User identity image.

**Variants:** `image` (uploaded photo) · `initials` (monogram fallback) · `enta-state` (renders ENTA orb instead of photo for spiritual-context use)

**Props:** `src?`, `name` (REQUIRED for fallback initials + alt text), `size` (`xs`/`sm`/`md`/`lg`/`xl`/`2xl`), `shape` (`circle`/`organic` — organic uses one of 5 organic shape masks per design principle §5.3)

**Accessibility:** `alt={name}` always set.

### 3.11 UzgIcon

**Purpose:** Render a single icon glyph.

**Props:** `name` (Phosphor icon name OR custom UZG glyph name), `size`, `color`, `weight` (`light`/`regular`/`bold` — DEFAULT `regular` per §10.3)

**Accessibility:** decorative icons get `aria-hidden="true"`; meaningful icons get `aria-label`.

### 3.12 UzgSpinner

**Purpose:** Loading indicator (indeterminate).

**Variants:** `inline` (16px, in buttons) · `block` (24-48px, in content areas)

**Accessibility:** `role="status"` + `aria-live="polite"` + visually-hidden "Loading…" text.

**Reduce-motion:** spinner replaced by static "loading" dots that pulse opacity instead of rotate.

### 3.13 UzgTooltip

**Purpose:** Hover/focus contextual hint.

**Props:** `content`, `placement` (`top`/`bottom`/`left`/`right`), `delay` (default 400ms)

**Accessibility:** `role="tooltip"`, associated via `aria-describedby` on trigger. Triggered by hover OR focus (keyboard parity).

**Anti-pattern:** Don't use for critical info — tooltips are easy to miss. Critical info goes inline.

### 3.14 UzgDivider

**Purpose:** Visual separator between content blocks.

**Variants:** `horizontal` (DEFAULT) · `vertical`

**Props:** `inset` (offset from edge — for nested lists), `subtle` (lighter color)

### 3.15 UzgLink

**Purpose:** Inline navigation link (not a button).

**Props:** `href`, `external` (renders external icon, opens in new tab with `rel="noopener noreferrer"`)

**Accessibility:** Underlined by default (per WCAG). Color contrast preserved on hover (no "lift the underline only" hover — too subtle for accessibility).

---

## §4 MOLECULAR COMPONENTS (18)

### 4.1 UzgInputField

**Purpose:** Composed input — label + input + helper-text + error.

**Composition:** `UzgLabel` + `UzgInput` + (helper OR error text)

**Props:** all `UzgInput` props plus `label`, `helperText?`, `errorText?`, `required`

**Accessibility:** label + input linked via id/for; error linked via aria-describedby.

### 4.2 UzgFormGroup

**Purpose:** Logical grouping of related InputFields.

**Props:** `legend` (renders as section heading), children

**Accessibility:** `<fieldset>` + `<legend>` semantic.

### 4.3 UzgCard

**Purpose:** Contained surface holding related content.

**Variants:** `default` (raised with shadow-1) · `flat` (no shadow, only border) · `interactive` (hover shadow upgrade) · `feature` (with optional accent border using a module-accent color)

**Props:** `variant`, `padding` (`none`/`sm`/`md`/`lg`), `clickable` (renders as button if true), `onClick?`

**Accessibility:** if `clickable=true`, must be `<button>` semantically — NOT a div with onClick.

### 4.4 UzgTabs

**Purpose:** Horizontal tabbed sections.

**Props:** `tabs[]` (id, label, icon?, badge?), `activeTab`, `onChange`, `variant` (`underline`/`pill`)

**Accessibility:** `role="tablist"` + `role="tab"` + `role="tabpanel"`. Arrow-key navigation between tabs. Active tab `aria-selected="true"`.

### 4.5 UzgAccordion

**Purpose:** Stacked collapsible sections.

**Props:** `items[]` (id, title, content), `allowMultiple` (default false — only one open at a time)

**Accessibility:** `aria-expanded`, `aria-controls`. Smooth height transition respects reduce-motion.

### 4.6 UzgModal

**Purpose:** Dismissable overlay focused dialog.

**Variants:** `default` (centered, max 480px wide) · `confirm` (small, with primary + secondary action) · `fullscreen` (mobile only)

**Props:** `open`, `onClose`, `title`, `size`, `closeOnBackdrop` (default true), `closeOnEsc` (default true)

**Accessibility:** focus trap, focus restored on close, `role="dialog"`, `aria-modal="true"`, `aria-labelledby` linked to title.

**Anti-pattern:** Never auto-open on page load. Never modal-on-modal (max 1 modal at a time). Never confirm-shame.

### 4.7 UzgDrawer (Sheet)

**Purpose:** Slide-in panel from a screen edge.

**Variants:** `bottom-sheet` (mobile DEFAULT) · `right-drawer` (desktop)

**Props:** same as Modal plus `side` (`top`/`right`/`bottom`/`left`), `dismissible` (drag-to-dismiss on mobile)

### 4.8 UzgToast (Alert)

**Purpose:** Transient feedback notification.

**Variants:** `success` · `error` · `warning` · `info`

**Props:** `variant`, `message`, `action?` (single button), `duration` (default 5000ms; 0 = manual dismiss only)

**Accessibility:** `role="status"` for non-error, `role="alert"` for error. Stack max 2 visible at once (P4 cognitive load).

### 4.9 UzgEmptyState

**Purpose:** Placeholder when a list/section has no data.

**Composition:** illustration (organic, hand-drawn) + heading + description + single CTA

**Props:** `illustration` (predefined: `seedling`/`empty-cup`/`empty-path`), `title`, `description`, `actionLabel?`, `onAction?`

**Anti-pattern:** Empty states without CTAs are dead-ends. Always offer one next action.

### 4.10 UzgErrorState

**Purpose:** Displayed when a fetch / action fails.

**Composition:** error illustration + heading + technical detail (collapsible) + retry button

**Props:** `error` (Error or string), `onRetry?`

### 4.11 UzgLoadingState (Skeleton)

**Purpose:** Placeholder UI during initial fetch.

**Variants:** `skeleton-card`, `skeleton-list`, `skeleton-page` — each pre-shaped to match the eventual content layout.

**Anti-pattern:** Don't combine spinner + skeleton — choose one (spinner for short wait < 1s, skeleton for longer).

### 4.12 UzgDataTable

**Purpose:** Tabular data display (admin + transactions + governance lists).

**Props:** `columns[]` (id, label, sortable, width), `data[]`, `onSort`, `onRowClick?`, `emptyState?`

**Accessibility:** `<table>` + `<th scope="col">` semantic; sort buttons announce state via aria-sort.

**Mobile:** tables MUST collapse to card-list on ≤ 480px (each row becomes a card; columns become labelled fields).

### 4.13 UzgPagination

**Purpose:** Navigate paged data.

**Props:** `currentPage`, `totalPages`, `onChange`, `siblingCount` (default 1 — pages adjacent to current shown)

**Mobile:** show only Prev / Next + page indicator "5 of 23" — no per-page numeric buttons.

### 4.14 UzgDropdown (Menu)

**Purpose:** Action list triggered by a button.

**Props:** `trigger` (button element), `items[]` (id, label, icon?, danger?, divider?, onClick), `placement`

**Accessibility:** `role="menu"` + `role="menuitem"`. Arrow key navigation, Esc to close.

### 4.15 UzgDatePicker

**Purpose:** Pick a date or date range.

**Variants:** `single` · `range`

**Props:** `value`, `onChange`, `min?`, `max?`, `disabledDates?`, `format` (locale-aware)

**Mobile:** uses native `<input type="date">` for OS-level picker. Custom calendar UI desktop only.

**Bilingual:** Vietnamese month names + EN translations honored per `?lang` setting.

### 4.16 UzgFileUpload

**Purpose:** Single-file or multi-file upload control.

**Props:** `accept` (mime types), `multiple`, `maxSize`, `onUpload`, `preview` (default true for images)

**Accessibility:** drag-and-drop ALSO accessible via keyboard "Upload" button.

### 4.17 UzgSearchBar

**Purpose:** Inline search input with auto-suggest.

**Props:** `value`, `onChange`, `onSubmit`, `suggestions[]?`, `placeholder`, `loading`

**Accessibility:** `role="combobox"` + `aria-autocomplete="list"`. Esc clears.

### 4.18 UzgRangeSlider

**Purpose:** Numeric range selector (price filter, ENTA energy band).

**Props:** `min`, `max`, `step`, `value` (number or [min,max] for range), `onChange`

**Accessibility:** Native `<input type="range">` per thumb; ARIA labels for both ends.

---

## §5 ORGANISM COMPONENTS (12)

### 5.1 UzgPageShell

**Purpose:** Outermost page wrapper providing header + main + footer + nav.

**Composition:** `UzgHeader` + `<main>` + `UzgBottomNav` (mobile) OR `UzgSidebar` (desktop)

**Props:** `title` (page title rendered in header), `actions[]?` (header right-side action buttons), `back?` (renders back button), `bottomNav` (default `true`)

**Accessibility:** `<main>` landmark wraps content. Page title tied to document.title.

### 5.2 UzgHeader

**Purpose:** Top of page — back, title, actions, search.

**Variants:** `mobile` (compact, fixed) · `desktop` (taller, with global search center)

**Props:** `title`, `back?`, `actions[]?`, `searchVisible?`, `notificationsVisible?` (badge with count)

### 5.3 UzgBottomNav (mobile only)

**Purpose:** Primary module navigation on mobile.

**Composition:** 5 visible `UzgNavTab` items (per IA Spec §7.1: Home / Community / Wisdom / Marketplace / Wallet) + "More" overflow.

**Accessibility:** `role="navigation"` + `aria-label="Primary"`. Active tab aria-current="page".

### 5.4 UzgSidebar (desktop ≥ 768px)

**Purpose:** Persistent left-hand module navigation.

**Composition:** 7 module items + Settings + collapse toggle.

**Behavior:** collapsible to icon-only width (60px); state persisted in user settings.

### 5.5 UzgGlobalSearch

**Purpose:** Cmd/Ctrl+K command-palette style search.

**Composition:** modal-overlay search + grouped results by Module type + keyboard navigation.

**Props:** `open`, `onClose` — usually controlled via global hotkey.

**Accessibility:** focus trap, Esc closes, arrow navigation through results.

### 5.6 UzgFeedItem (Community post)

**Purpose:** Single post in Community feed.

**Composition:** Avatar + author + timestamp + content + reactions + comments link + QOT badge.

**Props:** `post` (id, author, content, createdAt, reactions, commentCount, qotId?)

### 5.7 UzgWalletBalanceCard

**Purpose:** Balance display for U / UZG / USD-credit.

**Composition:** token icon + name + balance + 24h-change + quick actions (Send / Receive / Swap).

**Props:** `token` (`U`/`UZG`/`credit`), `balance`, `change24h?`, `onSend?`, `onReceive?`, `onSwap?`

### 5.8 UzgMembershipCard (Tier card)

**Purpose:** Display current membership tier; offer upgrade.

**Composition:** tier badge (per §12.4 Design System) + tier name + days remaining + upgrade CTA.

**Props:** `tier` (`explorer`/`seeker`/`builder`/`sovereign`), `daysRemaining?`, `onUpgrade?`

### 5.9 UzgEntaCard

**Purpose:** ENTA snapshot displayed on profile + wisdom dashboard.

**Composition:** small ENTA orb visualisation + key metrics + "Open dashboard" link.

### 5.10 UzgRetreatCard

**Purpose:** Retreat listing card for retreat browser + saved.

**Composition:** hero image + retreat name + date + facilitator + price + "Book" CTA.

### 5.11 UzgMarketplaceListingCard

**Purpose:** Marketplace listing display.

**Composition:** hero image + title + creator + price + tier-discount badge if applicable.

### 5.12 UzgGovernanceProposalCard

**Purpose:** Governance proposal summary in active-proposals list.

**Composition:** proposal title + status badge (Active/Passed/Failed) + voting timeline + vote count + "Vote" CTA (gated).

---

## §6 CROSS-CUTTING REQUIREMENTS

### 6.1 All components MUST

- Pass WCAG 2.2 AA contrast on all states
- Support keyboard interaction (Tab, Enter, Space, Esc, arrows where applicable)
- Provide `data-testid` slot for QA targeting (Cursor / Lane_03 testing standard)
- Render correctly under `prefers-reduced-motion`
- Render correctly under `prefers-color-scheme: dark`
- Render correctly at `360px × 640px` minimum viewport
- Localise via i18n hook (Vietnamese DEFAULT, English alternative)

### 6.2 No component MAY

- Hard-code color values (must use Design System tokens)
- Hard-code px sizes (must use Design System spacing/radius/typography tokens)
- Use `outline: none` without visible focus alternative
- Auto-trigger sounds without user gesture
- Render inside `<button>` if it itself contains interactive children (a11y violation)
- Block scroll on document body without restoring on unmount (modal/drawer cleanup)

---

## §7 COMPONENT MATURITY MAP (V3 build order)

Phase 1 (foundation — must ship first): all Atomic + Card + InputField + Modal + Toast + EmptyState + LoadingState + PageShell + Header + BottomNav + Sidebar.

Phase 2 (feature parity): Tabs + Accordion + DataTable + Pagination + Dropdown + DatePicker + SearchBar + GlobalSearch + Feed + WalletBalance + MembershipCard.

Phase 3 (specialised): EntaCard + RetreatCard + MarketplaceListingCard + GovernanceProposalCard + RangeSlider + FileUpload + Drawer + ErrorState.

Total: **45 components** specced (15 Atomic + 18 Molecular + 12 Organism).

---

## §8 STORYBOOK / DOCUMENTATION

Phase 2 implementation (out of canon scope): each component MUST have a Storybook entry covering all variants + states. Visual regression via Chromatic or equivalent. Snapshot per breakpoint (360, 768, 1280).

---

## §9 CHANGES LOG

**v1.0 (2026-04-30):** Initial publish. 45 components defined across 3 levels. Naming convention locked. Cross-cutting requirements specified. Maturity-map build order assigned for Phase 2.

---

## §10 END

When in doubt, return to **§6.2 hard-code prohibitions**: a token value (color, space, radius, motion) MUST come from the Design System Canon. The component library is the consumer; never the source.

End of file.
