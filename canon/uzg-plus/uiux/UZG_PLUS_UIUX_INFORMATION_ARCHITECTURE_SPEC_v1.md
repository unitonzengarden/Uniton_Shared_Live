# UZG+ UI/UX INFORMATION ARCHITECTURE SPEC v1.0

**Authored:** 2026-04-30 by CLA Lane_01 (Claude Opus 4.7)
**Authority:** AMD_NTS_FULL_TECH_AUTONOMY + canon-author NTS approval pending per R-AUTH-01
**Scope:** Site map, navigation structure, URL canonicalisation, onboarding flow, auth boundary
**Status:** PUBLISHED 2026-04-30
**Prerequisite:** [`UZG_PLUS_UIUX_DESIGN_PRINCIPLES_CANON_v1.md`](UZG_PLUS_UIUX_DESIGN_PRINCIPLES_CANON_v1.md)

---

## §1 PURPOSE

This document defines **WHERE** things live in UZG+. It is the source of truth for:

- Top-level navigation (the 7 Modules per Whitepaper §4.2 / DEC-05)
- The 6 Roots user-journey layer (orthogonal to Modules)
- The 7×6 mapping matrix
- Canonical URL structure
- Mobile vs desktop navigation patterns
- Onboarding flow
- Authentication / membership-tier gates
- Search + discovery architecture

---

## §2 TWO ORTHOGONAL AXES

UZG+ has two simultaneous IA axes that must coexist:

```
                  HORIZONTAL = Features (what can I do?)
                  ────────────────────────────────────►
                  Identity  Community  Wisdom AI  Retreat  Marketplace  Wallet  Governance
                  ┌─────────┬──────────┬──────────┬────────┬────────────┬────────┬───────────┐
V    ENTA         │         │          │          │        │            │        │           │
E    ────────────►│         │          │          │        │            │        │           │
R    QOT          │         │          │          │        │            │        │           │
T    ────────────►│         │          │          │        │            │        │           │
I    Quantum Soc. │         │          │          │        │            │        │           │
C    ────────────►│         │          │          │        │            │        │           │
A    Circle Biz.  │         │          │          │        │            │        │           │
L    ────────────►│         │          │          │        │            │        │           │
     Wallet+UZGFi │         │          │          │        │            │        │           │
=    ────────────►│         │          │          │        │            │        │           │
     Membership   │         │          │          │        │            │        │           │
ROOTS            └─────────┴──────────┴──────────┴────────┴────────────┴────────┴───────────┘
(user state)
```

- **Horizontal (Modules):** the 7 Whitepaper §4.2 modules. This is the **top-level navigation** — what tabs the user sees in the bottom-tab on mobile / sidebar on desktop.
- **Vertical (Roots):** the 6 user-state layers. Roots are NOT in top-nav; they surface as **dashboards** + **per-module views** that filter the module by Root context.

**Rationale:** Modules answer *"what can I do?"* (feature). Roots answer *"where am I in my journey?"* (state). Both are needed; navigation collapses cleanly to Modules because users navigate by intent, not state.

---

## §3 7 MODULES — TOP-LEVEL NAVIGATION

Per Whitepaper §4.2 verbatim (DEC-05 locked 2026-04-29). Order below = canonical nav order on bottom-tab + sidebar.

### 3.1 Identity (`/identity`)

**Purpose:** Profile, membership status, reputation, activity history.

**Key sub-features:**
- Profile (avatar, bio, ENTA snapshot)
- Membership tier (current tier per DEC-04: Explorer / Seeker / Builder / Sovereign)
- Activity history (posts, comments, reactions, missions completed, governance votes cast)
- Reputation graph (community endorsements + Wisdom AI signals)
- Settings (privacy, notifications, language, theme)

**Sub-routes:**
- `/identity` → user dashboard (own profile)
- `/identity/u/<handle>` → public profile by handle
- `/identity/membership` → tier overview + upgrade flow
- `/identity/activity` → full activity log
- `/identity/settings` → settings hub
- `/identity/settings/privacy` · `/notifications` · `/language` · `/theme`

### 3.2 Community (`/community`)

**Purpose:** Circles, discussions, social interaction.

**Key sub-features:**
- Feed (posts from followed circles + people)
- Circles (browse, join, manage)
- Discussions (post detail, threaded comments)
- Reactions (UZG canonical reaction set — not generic emoji)
- Following (people, circles)
- Direct messages (P2 — out of v1)

**Sub-routes:**
- `/community` → main feed
- `/community/circles` → circle browser
- `/community/circles/<circleId>` → circle home
- `/community/circles/<circleId>/post/<postId>` → post detail
- `/community/people` → people discovery
- `/community/messages` → DM inbox (P2)

### 3.3 Wisdom AI (`/wisdom`)

**Purpose:** Personal energy mapping, guidance, knowledge synthesis.

**Key sub-features:**
- Wisdom chat (Gemini-backed; topics curated to UZG+ canon)
- ENTA dashboard (user's ENTA visualization, energy patterns)
- QOT trail (`/qot/me` — user's content provenance trail) — Quick Win #3
- Knowledge library (UZG terminology, canon excerpts)
- Personal practice tracker (TAO calendar + Bazi pillar — Lane_02 owned)

**Sub-routes:**
- `/wisdom` → wisdom chat hub
- `/wisdom/enta` → ENTA dashboard
- `/wisdom/qot` → QOT trail view
- `/wisdom/qot/me` → user's own QOT trail (Quick Win #3)
- `/wisdom/library` → knowledge library
- `/wisdom/practice` → daily practice tracker (TAO + Bazi)

### 3.4 Retreat (`/retreat`)

**Purpose:** Physical retreat network, events, workshops.

**Key sub-features:**
- Browse retreats (geo + date filter)
- Retreat detail (venue, schedule, facilitators, capacity)
- Booking flow (stripe / U-token / mixed payment via Wallet)
- My retreats (upcoming + past)
- Facilitator profile (linked to Identity)

**Sub-routes:**
- `/retreat` → retreat browser
- `/retreat/<retreatId>` → retreat detail
- `/retreat/<retreatId>/book` → booking flow
- `/retreat/my` → my retreats
- `/retreat/facilitator/<handle>` → facilitator profile

### 3.5 Marketplace (`/marketplace`)

**Purpose:** Creator economy — courses, workshops, services.

**Key sub-features:**
- Browse listings (category + creator filter)
- Listing detail (description, creator, price, reviews)
- Purchase flow
- My library (purchased content)
- Creator dashboard (own listings, earnings)
- AIER Mint / Marketplace ([already LIVE at `/aier/marketplace`])

**Sub-routes:**
- `/marketplace` → marketplace browser
- `/marketplace/listing/<listingId>` → listing detail
- `/marketplace/listing/<listingId>/buy` → purchase flow
- `/marketplace/my-library` → purchased content
- `/marketplace/creator/<handle>` → creator profile + listings
- `/marketplace/creator/me` → creator dashboard (own)
- `/aier/mint` → AIER mint flow (existing)
- `/aier/marketplace` → AIER marketplace (existing)

### 3.6 Wallet (`/wallet`)

**Purpose:** U token, UZG token, in-app payments.

**Key sub-features:**
- Balance overview (U + UZG + USD-credit)
- Transactions (history, filter, search)
- Send (P2P transfer with confirmation)
- Receive (deposit address / handle)
- Swap (U ↔ UZG ↔ USD-credit)
- UZGFi operations (treasury view — admin only)
- Reward V5 visibility (action-type breakdown for past 30 days)

**Sub-routes:**
- `/wallet` → balance overview
- `/wallet/u` → U-token detail
- `/wallet/uzg` → UZG-token detail
- `/wallet/credit` → USD-credit detail
- `/wallet/transactions` → transaction history
- `/wallet/send` → send flow
- `/wallet/receive` → receive flow
- `/wallet/swap` → swap flow
- `/wallet/rewards` → reward V5 breakdown
- `/wallet/uzgfi` → UZGFi ops (admin gated)

### 3.7 Governance (`/governance`)

**Purpose:** Proposals, voting, decentralised coordination.

**Key sub-features:**
- Active proposals (browse + filter by status)
- Proposal detail (description, votes, comments, history)
- Vote cast (with confirmation)
- Propose new (membership-tier gated — Builder + above)
- Governance history (own voting record)
- LAW + canon viewer (read-only — links to Uniton_Shared mirror)

**Sub-routes:**
- `/governance` → active proposals
- `/governance/proposal/<proposalId>` → proposal detail
- `/governance/proposal/<proposalId>/vote` → vote flow
- `/governance/propose` → propose new (gated)
- `/governance/my-votes` → own voting record
- `/governance/laws` → LAW viewer (Uniton_Shared mirror)
- `/governance/canon` → canon library viewer

---

## §4 6 ROOTS — USER-STATE LAYER

The Roots are **not** a top-nav. They surface in three ways:

1. **Dashboards** — each Root has a dedicated dashboard accessed from `/identity` (the user's personal hub).
2. **Per-module Root filters** — within each Module, content can be filtered/scoped by Root context (e.g., Marketplace filtered by ENTA-aligned creators).
3. **Onboarding journey** — a new user is walked through the 6 Roots in canonical order over the first 7 days.

### 4.1 ENTA (Energy Network — Identity base)

**Status (Master Audit v1.2 §4):** PRESENT — full DB + 10+ frontend pages + 3D visualization.

**User surfaces:**
- `/identity` shows ENTA snapshot card
- `/wisdom/enta` is the dedicated ENTA dashboard (3D visualization, energy patterns, pattern history)

**Module overlap:** Identity (primary), Wisdom AI (visualization)

### 4.2 QOT (Quantum Object Trail — provenance)

**Status:** MVP_PRESENT (DEC-03 canonical disambiguation: UZG+ `qot_nodes` content provenance, NOT AIER Code's `qot_lineage` event log).

**User surfaces:**
- `/wisdom/qot` is QOT trail view
- `/wisdom/qot/me` is user's own provenance trail (Quick Win #3 — currently MISSING per Master Audit §10)

**Module overlap:** Wisdom AI (primary), Community (post-level QOT badges)

### 4.3 Quantum Social Network (signal layer)

**Status:** BACKEND_PRESENT_NO_USER_SURFACE (Quick Win #1 — currently MISSING per Master Audit §10).

**User surfaces (proposed for V3):**
- `/community/quantum` — Quantum Social dashboard (social predictions, harmony scoring made visible)
- Per-post Quantum Signal indicators in feed

**Module overlap:** Community (primary), Wisdom AI (signal interpretation)

### 4.4 Circle Business OS

**Status:** PRESENT — P5 commission ladder shipped.

**User surfaces:**
- `/community/circles/<circleId>` includes Business tab if circle is business-mode
- `/marketplace/creator/me` includes Circle Business dashboard if user is on a business circle
- `/wallet/uzgfi` shows commission settlement

**Module overlap:** Community (primary), Marketplace (creator economy), Wallet (settlement)

### 4.5 Wallet + UZGFi (value circulation)

**Status:** PRESENT — most mature module. Phases 0-5 + global credit + treasury realign + USD-credit canon.

**User surfaces:**
- All `/wallet/*` routes
- `/marketplace/listing/<id>/buy` → wallet payment
- `/retreat/<id>/book` → wallet payment

**Module overlap:** Wallet (primary), Marketplace (purchase), Retreat (booking)

### 4.6 Membership (governance / access)

**Status:** PRESENT — DEC-04 4 catalog tiers locked.

**User surfaces:**
- `/identity/membership` — current tier + upgrade
- Tier-gated UI throughout (e.g., Governance propose-new requires Builder+)
- Membership card visible on `/identity` dashboard

**Module overlap:** Identity (primary), Governance (capability gating)

---

## §5 7 MODULES × 6 ROOTS MAPPING MATRIX

Cell content = primary Root surface within that Module. Empty = Root has no surface in that Module.

| Module ↓ / Root → | ENTA | QOT | Quantum Social | Circle Business | Wallet+UZGFi | Membership |
|---|---|---|---|---|---|---|
| **Identity** | ENTA card on profile | QOT badges on activity | — | Business badge if any | Membership card | Tier badge on profile |
| **Community** | — | QOT badges per post | Quantum Signal per post | Business circles | — | Tier-gated circles |
| **Wisdom AI** | ENTA dashboard | QOT trail (`/qot/me`) | Signal interpretation | — | — | Tier-gated wisdom depth |
| **Retreat** | ENTA-aligned filter | — | — | Business venue tag | Wallet pay | Tier discount |
| **Marketplace** | ENTA-aligned creators | QOT badges on listings | Quantum-recommended | Creator dashboard | Wallet pay + earn | Tier discount + creator gate |
| **Wallet** | — | — | — | Commission settlement | All routes | Tier card |
| **Governance** | — | QOT-anchored proposals | — | — | UZG-token vote weight | Tier-gated proposal authoring |

**Reading the matrix:**
- A Module is fully realised when it surfaces ≥ 3 of the 6 Roots.
- A Root is fully realised when it surfaces in ≥ 4 of the 7 Modules.
- Currently: Wallet+UZGFi root spans 4 modules ✅; Quantum Social spans 1 module ❌ (Quick Win #1 gap confirmed).

---

## §6 URL STRUCTURE — canonical rules

### 6.1 Path conventions

- All paths lowercase, hyphenated (`/my-library`, not `/myLibrary` or `/my_library`)
- Module names singular noun (`/identity`, not `/identities`)
- IDs always come after the entity name (`/community/circles/<circleId>` ✅, not `/community/<circleId>`)
- Action verbs as final segment (`/buy`, `/vote`, `/send`)
- User-scoped views use `/me` segment (`/qot/me`, `/marketplace/creator/me`)
- Deep linking: every detail page MUST be shareable via URL (no detail-only-as-modal)

### 6.2 Query parameters

- `?filter=<facet>` for list filtering
- `?sort=<field>` for list sorting
- `?page=<n>` for pagination
- `?lang=vi|en` for explicit language override
- All other state lives in URL where practical (deep-linkable)

### 6.3 Reserved top-level paths

These are reserved and MUST NOT be used as Module names:
- `/api/*` — backend API
- `/_next/*` — framework internals (Next.js if used)
- `/auth/*` — auth callbacks
- `/admin/*` — RBAC-gated admin (Lane_03 territory)
- `/aier/*` — AIER mint + marketplace (existing)

---

## §7 NAVIGATION PATTERNS

### 7.1 Mobile (≤ 480px) — primary surface

```
┌──────────────────────────────┐
│  ▒▒  Header                  │  ← page-specific header (back, title, action)
├──────────────────────────────┤
│                              │
│         Page content         │
│                              │
│                              │
│                              │
├──────────────────────────────┤
│  🏠   👥   🤖   🏔   🛒   💰  │  ← bottom-tab (5 of 7 modules)
└──────────────────────────────┘
```

**Bottom-tab on mobile shows 5 of 7 modules:**
- Identity (Home) · Community · Wisdom AI · Marketplace · Wallet
- Retreat + Governance accessed via "More" overflow OR contextual entry from related modules
- Rationale: Miller's Law (max 7±2); 5 visible + 2 in overflow = 7 total accessible

### 7.2 Tablet (480-768px)

Same as mobile but bottom-tab expands to 6 visible modules; Governance still in overflow.

### 7.3 Desktop (≥ 768px) — sidebar left

```
┌─────────┬────────────────────────────────────┐
│ UZG+    │  Top header (search, profile, ...)│
│         ├────────────────────────────────────┤
│ 🏠 Home │                                    │
│ 👥 Comm │                                    │
│ 🤖 Wisd │         Page content              │
│ 🏔 Retr │                                    │
│ 🛒 Mark │                                    │
│ 💰 Wall │                                    │
│ ⚖ Gov  │                                    │
│         │                                    │
│ ⚙ Sett │                                    │
└─────────┴────────────────────────────────────┘
```

All 7 modules + Settings always visible on desktop sidebar.

---

## §8 ONBOARDING FLOW

A new user (just signed up) is walked through 6 Roots over time. The product paces this — not a 6-step monolithic onboarding, but a **7-day progressive unfold**.

### 8.1 Day 0 — Identity

- Set handle, avatar, language preference
- Choose initial ENTA archetype (5 archetypes — gentle, no test required)
- Membership starts as Explorer (free) by default
- Single CTA: "Welcome, [Name]" → enters `/community` feed

### 8.2 Day 1 — Wallet introduction

- First-time visit to `/wallet` shows guided tour overlay
- Explains U token, UZG token, USD-credit
- Reward V5 explained: "Activity here earns U tokens — see /wallet/rewards"

### 8.3 Day 2-3 — Community + Quantum Social

- Suggests joining 3 starter circles based on initial archetype
- First post creates first QOT entry (badge appears on `/identity/activity`)

### 8.4 Day 4-5 — Wisdom AI

- Prompts first Wisdom chat session
- Introduces TAO calendar + Bazi pillar (Lane_02 owned)
- ENTA dashboard becomes navigable

### 8.5 Day 6-7 — Retreat + Marketplace + Governance

- Browse retreats nearby
- Explore marketplace
- View first governance proposal (read-only at Explorer tier)

### 8.6 Skip-able

Per design principle P5 (Progressive Disclosure), the entire onboarding is skippable at any stage. A sovereign user can self-direct.

---

## §9 AUTHENTICATION + MEMBERSHIP-TIER GATES

### 9.1 Public (no auth needed)

- `/` (landing/marketing page)
- `/about`, `/help`, `/privacy`, `/terms`
- `/governance/laws`, `/governance/canon` (read-only LAW + canon viewer)
- `/auth/sign-in`, `/auth/sign-up`

### 9.2 Authenticated (any tier, including Explorer)

- All `/identity/*` (own data)
- All `/community/*` (read + interact)
- All `/wisdom/*` (basic chat + own ENTA + own QOT)
- All `/retreat/*` (browse + book if Wallet has funds)
- All `/marketplace/*` (browse + buy if funds)
- All `/wallet/*` (own balances + transactions)
- `/governance` (read), `/governance/proposal/<id>` (read), `/governance/my-votes`

### 9.3 Membership-tier gated

| Capability | Min tier required |
|---|---|
| Vote on governance proposals | Explorer (Free, all auth users) |
| Author governance proposal | Builder ($39/mo) |
| Wisdom AI advanced (>10 sessions/day) | Seeker ($9/mo) |
| Marketplace creator listing publish | Seeker |
| Retreat host listing | Builder |
| Sovereign-only ENTA tuning controls | Sovereign ($69/mo) |

### 9.4 Admin gated (Lane_03 RBAC)

- `/admin/*` — admin allowlist hardcoded (`unitonzengarden@gmail.com`, `baothybiz@gmail.com`)
- `/wallet/uzgfi` — UZGFi treasury operations (admin only)

---

## §10 SEARCH + DISCOVERY

### 10.1 Global search

Triggered by `Cmd/Ctrl + K` (desktop) or search icon in header (mobile). Searches across:

- Profiles (handle, name)
- Circles
- Posts (last 30 days indexed)
- Marketplace listings
- Retreats
- Wisdom library entries
- Governance proposals
- LAW + canon docs

Results grouped by type. Each result shows source Module badge.

### 10.2 Per-module discovery

Each Module has its own discovery surface:
- `/community/people` — people discovery
- `/community/circles` — circle browser
- `/marketplace` — listing browser
- `/retreat` — retreat browser
- `/governance` — active proposals

### 10.3 Recommendation surfaces

Powered by Quantum Social signal layer (when shipped):
- "Circles you might join"
- "Listings aligned with your ENTA"
- "Retreats your circle members attended"
- Wisdom AI: "Topics suggested for you"

---

## §11 SITEMAP DIAGRAM

```
/
├── identity/
│   ├── (own profile dashboard)
│   ├── u/<handle>
│   ├── membership
│   ├── activity
│   └── settings/
│       ├── privacy
│       ├── notifications
│       ├── language
│       └── theme
├── community/
│   ├── (feed)
│   ├── circles/
│   │   └── <circleId>/
│   │       └── post/<postId>
│   ├── people
│   └── messages (P2)
├── wisdom/
│   ├── (chat)
│   ├── enta
│   ├── qot/
│   │   └── me
│   ├── library
│   └── practice
├── retreat/
│   ├── (browse)
│   ├── <retreatId>/
│   │   └── book
│   ├── my
│   └── facilitator/<handle>
├── marketplace/
│   ├── (browse)
│   ├── listing/<listingId>/
│   │   └── buy
│   ├── my-library
│   └── creator/
│       ├── <handle>
│       └── me
├── wallet/
│   ├── (balance overview)
│   ├── u, uzg, credit
│   ├── transactions
│   ├── send, receive, swap
│   ├── rewards
│   └── uzgfi (admin)
├── governance/
│   ├── (active proposals)
│   ├── proposal/<proposalId>/
│   │   └── vote
│   ├── propose (Builder+)
│   ├── my-votes
│   ├── laws
│   └── canon
├── aier/
│   ├── mint (existing)
│   └── marketplace (existing)
├── admin/* (RBAC)
├── api/*
└── auth/*
```

---

## §12 CHANGES LOG

**v1.0 (2026-04-30):** Initial publish. 7 Modules per Whitepaper §4.2 verbatim (DEC-05). 6 Roots per Master Audit §4. Mapping matrix locked. URL canonicalisation rules defined. Mobile-first navigation pattern. 7-day progressive onboarding.

---

## §13 END

When in doubt, return to **§2 two orthogonal axes**: Modules answer "what can I do?", Roots answer "where am I in my journey?". Both are the IA. Don't collapse them prematurely.

End of file.
