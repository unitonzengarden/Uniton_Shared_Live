# UZG+ UI/UX PAGE TEMPLATES SPEC v1.0

**Authored:** 2026-04-30 by CLA Lane_01 (Claude Opus 4.7)
**Authority:** AMD_NTS_FULL_TECH_AUTONOMY + canon-author NTS approval pending per R-AUTH-01
**Scope:** Page-level layout patterns, 7 module landing templates, 6 root dashboards
**Status:** PUBLISHED 2026-04-30
**Prerequisites:** [`UZG_PLUS_UIUX_DESIGN_PRINCIPLES_CANON_v1.md`](UZG_PLUS_UIUX_DESIGN_PRINCIPLES_CANON_v1.md) · [`UZG_PLUS_UIUX_INFORMATION_ARCHITECTURE_SPEC_v1.md`](UZG_PLUS_UIUX_INFORMATION_ARCHITECTURE_SPEC_v1.md) · [`UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1.md`](UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1.md) · [`UZG_PLUS_UIUX_COMPONENT_LIBRARY_SPEC_v1.md`](UZG_PLUS_UIUX_COMPONENT_LIBRARY_SPEC_v1.md)

---

## §1 PURPOSE

This document defines **HOW components compose into pages**. Templates are reusable layout patterns: each new page in UZG+ should match exactly one template (or document a justified deviation).

Templates are organised in three groups:

- §3 **Generic templates** (8) — apply across modules
- §4 **7 Module landing pages** — each Whitepaper module has a canonical landing template
- §5 **6 Root dashboards** — each Root has a canonical dashboard template

---

## §2 TEMPLATE NAMING

```
template-<group>-<name>
```

Examples: `template-generic-list-filter`, `template-module-wallet-landing`, `template-root-enta-dashboard`.

---

## §3 GENERIC TEMPLATES (8)

### 3.1 Landing / Marketing

**Purpose:** Public homepage `/` for unauthenticated visitors.

**Layout regions (mobile, top to bottom):**
- Hero block (full-bleed image + headline + sub + primary CTA)
- "What is UZG+" section (3-column grid → stacks on mobile)
- 7 Modules teaser (carousel on mobile, grid on desktop)
- Testimonial / quote rotation
- Founder note / mission statement
- Footer (links + language toggle + sign-in)

**Components:** `UzgPageShell` (no bottomNav for unauth) · custom hero · `UzgCard` for each teaser · `UzgButton` (primary).

**Mobile breakpoint:** all sections stack; carousel for module teasers; reduce image fidelity on slow network.

**Desktop:** 12-column grid; max-width 1280px centered.

**Used by:** `/`

### 3.2 Dashboard (signed-in home)

**Purpose:** Personal home for an authenticated user.

**Layout regions:**
- Greeting / time-context line ("Good morning, [Name]")
- ENTA snapshot card (linked to dashboard)
- Wallet balance summary (3 tokens horizontal scroll on mobile)
- "Today" suggestions (Wisdom prompt + retreat reminder + active proposal)
- Recent activity (last 5 from QOT trail)

**Components:** `UzgEntaCard` · `UzgWalletBalanceCard` (×3) · `UzgCard` for suggestions · feed-style activity list.

**Used by:** `/identity` (signed-in default route)

### 3.3 List + Filter

**Purpose:** Browse a collection of items with filters and sorting.

**Layout regions:**
- Header with title + search input
- Filter chip row (horizontal scroll on mobile) + sort dropdown
- Result count + active filter pills (removable)
- List/grid of items (cards)
- Pagination at bottom

**Components:** `UzgSearchBar` · `UzgTag` (filter chips) · `UzgDropdown` (sort) · `UzgCard` (item) · `UzgPagination` · `UzgEmptyState` (when no results).

**Mobile:** filter chips horizontal scroll; sort dropdown moves to a bottom-sheet drawer trigger.

**Used by:** `/community/circles`, `/community/people`, `/marketplace`, `/retreat`, `/governance` active proposals.

### 3.4 Detail + Action

**Purpose:** Single-item detail view with primary action.

**Layout regions:**
- Header with back + title + share icon-button
- Hero (image + title + meta — author/date/price/etc.)
- Body (description, sections, related links)
- Sticky action bar at bottom on mobile (full-width primary CTA — Buy / Vote / Book / Send)
- Related items section

**Components:** `UzgIconButton` (back, share) · custom hero composition · `UzgButton` (sticky CTA on mobile).

**Mobile sticky-action:** primary CTA pinned to bottom above bottom-nav, full-width, with safe-area padding.

**Used by:** `/marketplace/listing/<id>`, `/retreat/<id>`, `/governance/proposal/<id>`, `/community/circles/<id>/post/<id>`.

### 3.5 Form (single-step)

**Purpose:** Single-page form (settings update, send transfer, post reaction).

**Layout regions:**
- Header with back + title
- Form body (`UzgFormGroup` + `UzgInputField` repeating)
- Helper text / contextual notes
- Submit button (full-width on mobile, right-aligned on desktop)

**Components:** `UzgFormGroup` · `UzgInputField` · `UzgButton`.

**Used by:** `/identity/settings/*`, `/wallet/send`, simple reaction modals.

### 3.6 Form (multi-step wizard)

**Purpose:** Multi-step structured form (booking, onboarding, propose-new).

**Layout regions:**
- Header with progress indicator (e.g., "Step 2 of 4")
- Step body (single `UzgFormGroup` per step)
- Footer with Back + Next buttons (Submit on final step)

**Components:** custom progress bar · `UzgFormGroup` · `UzgButton` (×2).

**Behavior:** each step validates before allowing Next. Back never loses entered data. URL reflects step (`?step=2`) for deep-link / refresh resilience.

**Used by:** `/retreat/<id>/book`, `/marketplace/listing/<id>/buy` (if multi-step), `/governance/propose`.

### 3.7 Onboarding wizard

**Purpose:** First-time user 6-Roots progressive intro (per IA Spec §8).

**Layout regions:**
- Full-screen modal-style overlay
- Step content (illustration + headline + body + single CTA)
- "Skip onboarding" link discreetly bottom (per P5 Progressive Disclosure)

**Components:** custom illustration slot · `UzgButton` (primary) · `UzgLink` (skip).

**Behavior:** non-blocking — user can skip at any point. State stored in `localStorage` + server-synced for cross-device continuation.

**Used by:** triggered first time at `/identity` for new accounts.

### 3.8 Empty / 404 / Error

**Purpose:** Page-level fallback.

**Layout regions:**
- Centered illustration (organic, hand-drawn)
- Heading: "This page wandered off the path" / "We couldn't load this" / etc.
- Single CTA: "Go home" or "Try again"

**Components:** `UzgEmptyState` (full-page variant) · `UzgButton`.

**Used by:** `/404`, `/500`, network-error fallback, true empty list states.

---

## §4 7 MODULE LANDING TEMPLATES

Each Module has one canonical landing page that anchors the module experience. These are **distinct from generic List+Filter** because they include module-specific introductory content.

### 4.1 Identity Landing (`/identity`)

Same as **Generic Dashboard (§3.2)**. Personal home is the Identity landing.

**Module-accent color:** `color-module-identity` (#5E997D jade).

### 4.2 Community Landing (`/community`)

**Layout regions:**
- Header (search + new-post icon-button)
- Feed (vertical scroll of `UzgFeedItem`)
- Right sidebar (desktop only): "Suggested circles" + "People to follow"

**Components:** `UzgSearchBar` · `UzgFeedItem` (repeating) · `UzgCard` (suggestions).

**Empty state:** new user with no follows → empty state directs to `/community/circles` (browse circles).

**Module-accent:** `color-module-community` (#3F6499 slate).

### 4.3 Wisdom AI Landing (`/wisdom`)

**Layout regions:**
- Header
- Wisdom chat input ("Ask UZG+ Wisdom…") prominent at top
- Recent conversations list (with timestamps + quick-resume)
- Three quick-entry cards: ENTA dashboard / QOT trail / Practice tracker

**Components:** `UzgInput` (large, search-style) · `UzgCard` (for each entry) · conversation list cards.

**Module-accent:** `color-module-wisdom` (#603A8E royal).

### 4.4 Retreat Landing (`/retreat`)

**Layout regions:**
- Header
- Hero block: "Find your retreat" with date + location filter chips
- Featured retreats carousel
- Browse list (List+Filter pattern below the fold)

**Components:** custom date+location filter (bottom-sheet on mobile) · `UzgRetreatCard` (carousel + grid).

**Module-accent:** `color-module-retreat` (#A57A2C earth).

### 4.5 Marketplace Landing (`/marketplace`)

**Layout regions:**
- Header
- Category chip row (Wisdom / Workshops / Services / AIER / etc.)
- Featured listings carousel
- Browse list (List+Filter pattern below)

**Components:** category chips (`UzgTag` row) · `UzgMarketplaceListingCard` (carousel + grid).

**Module-accent:** `color-module-marketplace` (#C68A1F amber).

### 4.6 Wallet Landing (`/wallet`)

**Layout regions:**
- Header (transaction-history icon-button)
- 3 balance cards horizontal (U / UZG / USD-credit) — full-width carousel on mobile, side-by-side on desktop
- Quick actions row: Send · Receive · Swap · Rewards
- Recent transactions list (last 10)

**Components:** `UzgWalletBalanceCard` (×3) · `UzgIconButton` row · transaction list.

**Module-accent:** `color-module-wallet` (#2E8559 success-green).

### 4.7 Governance Landing (`/governance`)

**Layout regions:**
- Header (propose-new icon-button — gated by tier)
- Active proposals list (`UzgGovernanceProposalCard` repeating)
- "My voting record" link card
- Quick links: LAW viewer / Canon library

**Components:** `UzgGovernanceProposalCard` (repeating) · `UzgCard` (links).

**Tier gate:** propose-new icon-button visually disabled if user tier < Builder, with `UzgTooltip` explaining requirement.

**Module-accent:** `color-module-governance` (#56524E gravity grey).

---

## §5 6 ROOT DASHBOARDS

Each Root has a dedicated dashboard accessed from `/identity` user hub OR via deep link.

### 5.1 ENTA Dashboard (`/wisdom/enta`)

**Purpose:** User's energy network visualisation + history.

**Layout regions:**
- Header
- 3D ENTA orb visualisation (full-width, ~50vh on mobile, ~60vh on desktop)
- Energy band indicators (concentric ring summary below the 3D)
- Pattern history timeline (scrollable)
- "Tune" controls (Sovereign-tier gated per IA Spec §9.3)

**Components:** custom 3D renderer slot (Lane_02 owned) · `UzgRangeSlider` for tuning · timeline list.

**Reduce-motion:** 3D becomes static rendered image; rings still animate gently.

### 5.2 QOT Trail Dashboard (`/wisdom/qot/me`)

**Purpose:** User's content provenance trail (Quick Win #3 — currently MISSING).

**Layout regions:**
- Header
- Spiral-visualisation of own QOT lineage (full-width, ~40vh)
- Filter chips: All / Posts / Comments / Reactions
- List of node entries (each linkable to source post)

**Components:** custom spiral renderer · `UzgTag` (filter chips) · list with `UzgFeedItem` per entry.

### 5.3 Quantum Social Dashboard (`/community/quantum`)

**Purpose:** Surface social predictions + harmony scoring (Quick Win #1 — currently MISSING).

**Layout regions:**
- Header
- Network graph (nodes = circles + people you connect to, edges = signal strength) — full-width, ~50vh
- Top-3 harmony insights cards
- "Suggested signal" recommendations list

**Components:** custom force-directed graph · `UzgCard` (insight cards) · suggestion list.

### 5.4 Circle Business Dashboard

**Purpose:** Business-mode circle owner overview (commission + activity + members).

**Surfaces at:** `/community/circles/<id>` (Business tab) + `/marketplace/creator/me`.

**Layout regions:**
- Header (period selector — last 7 / 30 / 90 days)
- KPI row: Members / Active / Commission earned / Pending settlement
- Commission ladder visualisation (P5 system)
- Member activity table

**Components:** `UzgDataTable` · custom KPI cards · period dropdown.

### 5.5 Wallet+UZGFi Dashboard

**Purpose:** Mature wallet experience (already PRESENT in V2 per Master Audit).

**Surfaces at:** `/wallet` (covered by §4.6 Wallet Landing).

**Additional admin-only surface:** `/wallet/uzgfi` — treasury operations dashboard.

### 5.6 Membership Dashboard (`/identity/membership`)

**Purpose:** View current tier, see benefits, upgrade/downgrade.

**Layout regions:**
- Header
- Current tier card (`UzgMembershipCard` large variant) + days remaining
- 4-tier comparison grid (Explorer / Seeker / Builder / Sovereign per DEC-04)
- Benefit-by-benefit comparison table
- Upgrade CTA (or downgrade with confirmation modal)

**Components:** `UzgMembershipCard` · comparison `UzgDataTable` · `UzgButton` (CTA).

---

## §6 BREAKPOINT BEHAVIOR — universal rules

Every template MUST satisfy:

| Breakpoint | Behavior |
|---|---|
| ≤ 480px (mobile) | Single column. Bottom-nav fixed. Sticky CTAs at bottom (above nav, with safe-area padding). Hero images max 50vh. |
| 481-768px (tablet) | Two-column where applicable. Bottom-nav present (5 visible tabs). Larger touch targets preserved. |
| 769-1280px (desktop) | Three-column with sidebar left + main + optional right rail. Sidebar replaces bottom-nav. Hover states active. |
| ≥ 1281px (wide) | Same as desktop; max-width 1280px content centered. Avoid stretching content beyond. |

---

## §7 PAGE TEMPLATE SELECTION GUIDE

When designing a new page, use this decision tree:

1. **Public unauthenticated marketing?** → §3.1 Landing/Marketing
2. **Logged-in personal hub?** → §3.2 Dashboard (or §4.1 Identity Landing)
3. **Browsing collection of items?** → §3.3 List+Filter (+ optionally §4.x for module landing)
4. **Viewing a single item with primary action?** → §3.4 Detail+Action
5. **Editing/sending data?** → §3.5 Form (single) or §3.6 Form (wizard) if 3+ steps
6. **First-time user intro?** → §3.7 Onboarding wizard
7. **Error / 404 / empty?** → §3.8 Empty/Error
8. **Module-specific landing?** → §4.x (one of the 7 module templates)
9. **Root-specific dashboard?** → §5.x (one of the 6 root dashboards)

If your page doesn't fit any template, it's likely a sub-template of one of these. Document the deviation in the page-level component file with a comment referencing this canon.

---

## §8 RESPONSIVE PATTERN LIBRARY (cross-cutting)

### 8.1 Sticky-action-bar (mobile primary CTA)

When a Detail+Action page has a clear primary CTA, that CTA appears in a sticky bar at the bottom on mobile (above bottom-nav, with safe-area padding for iOS notch). On desktop, the CTA appears inline within the action sidebar.

### 8.2 Drawer-sheet for filters (mobile)

When List+Filter has > 3 filter dimensions, a "Filters" button opens a bottom-sheet drawer on mobile (instead of cramming filters horizontally). On desktop, filters are a left-rail panel.

### 8.3 Card-grid → card-list transformation

DataTable becomes a list of cards on mobile (each row → card with labelled fields). Maintain sort/filter affordances above.

### 8.4 Sticky header on scroll

Page headers (`UzgHeader`) become sticky on scroll for List + Detail templates, providing fast back-navigation.

---

## §9 CHANGES LOG

**v1.0 (2026-04-30):** Initial publish. 8 generic templates + 7 module landings + 6 root dashboards = **21 page templates** specified. Decision tree for template selection. Responsive pattern library defined.

---

## §10 END

When in doubt, return to **§7 selection guide**: a page is one template; deviations are documented, not invented.

End of file.
