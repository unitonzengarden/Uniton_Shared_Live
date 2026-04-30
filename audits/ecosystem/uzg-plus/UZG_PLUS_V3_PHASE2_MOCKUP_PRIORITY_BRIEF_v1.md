# UZG+ V3 PHASE 2 MOCKUP PRIORITY BRIEF v1.0

**Authored:** 2026-04-30 by CLA Lane_01 / CLAC-1 (Claude Opus 4.7) under task `LANE01-UZG-PLUS-PHASE2-MOCKUP-PRIORITY-BRIEF-V1`
**Source SHAs:** `Uniton_Shared@2ef71e96` (this synthesis) · canon `9501835` (Phase 1 Dev1 PR #29) · audit `uiux-audit/` from Cursor Phase 1 task
**Companion docs:** [`canon/uzg-plus/uiux/INDEX.md`](../../canon/uzg-plus/uiux/INDEX.md) · [`uiux-audit/UZG_PLUS_V2_UX_GAP_ANALYSIS_v1.md`](uiux-audit/UZG_PLUS_V2_UX_GAP_ANALYSIS_v1.md) · [`UZG_PLUS_V2_MASTER_AUDIT_v1_2.md`](UZG_PLUS_V2_MASTER_AUDIT_v1_2.md) · [`CANON_V2_RECONCILIATION_PROPOSAL.md`](CANON_V2_RECONCILIATION_PROPOSAL.md)
**Status:** PUBLISHED 2026-04-30

---

## §1 Executive Summary

The Top 10 V3 priorities from UX Gap Analysis §9 split cleanly: **5 are mockup-ready right now** (full canon coverage from Phase 1 Dev1 output), **3 are blocked** waiting on PLUS Hub + ENTA Module Tier 4 canon that CLA Lane_01 must author next, **2 are non-mockup work** (string-pack Thai, responsive CSS pass on admin). Sprint 1 should bundle the 4 quick wins (P2/P3/P4/P10) since they ship without waiting for Tier 4 canon and unblock measurable user-facing improvements within 2 weeks. Sprint 2 owns the ENTA + Onboarding mockups (P1, P8) once ENTA Module canon authored. Sprint 3 owns the heavy mini-app mockups (P5 Governance, P7 Marketplace, P6 AIER unified UX) once PLUS Hub canon authored. The 8-canon Tier 4 backlog has clear dependencies — **PLUS Hub and ENTA are critical-path; HOME/CHAT/U-Reward/TAO/WALLET/REDLINES_MASTER are parallel-trackable** once Sprint 2 begins.

---

## §2 Method

This brief is a synthesis of two parallel Phase 1 outputs:

- **Dev1 (CLAC1) canon** — 5 governance docs in `canon/uzg-plus/uiux/` defining UI/UX standards (principles, IA, design system, components, page templates).
- **Cursor audit** — 4 docs in `audits/ecosystem/uzg-plus/uiux-audit/` capturing V2 production reality (routes, flows, modules, gaps).

Synthesis steps:

1. Read every Top 10 priority entry from UX Gap Analysis §9 + the supporting gap descriptions (G01..G53).
2. For each priority, identify which IA Spec section addresses the surface in question, which components are needed, which page template applies, and which design tokens are foundational.
3. Compute a coverage verdict: COMPLETE (all four references resolve cleanly), PARTIAL (some pieces present, others need additional canon), GAP (Tier 4 module canon must be authored first).
4. Sequence priorities into 3 sprints based on (a) coverage verdict, (b) dependency on Tier 4 canon, (c) effort estimate from gap analysis.
5. Cross-cut: enumerate the 8 Tier 4 module canons CLA Lane_01 must author and map each to which priorities depend on it.
6. Provide an entry checklist for Phase 2 mockup work to begin.

This brief makes **NO new canon claims**. Every recommendation cites existing canon § or audit G## by reference.

---

## §3 Top 10 V3 Priorities — Coverage Matrix

Each priority below maps to (1) IA Spec section, (2) components needed, (3) page template, (4) design tokens, plus a coverage verdict, mockup approach, complexity estimate, and dependency note.

---

### Priority 1 — Public ENTA profiles (`/enta/:handle` guest variant)

**Severity:** P0 · **Quick win:** YES · **User impact:** HIGH · **Effort:** MEDIUM
**Supporting gaps:** G01 (ENTA profiles not public), G06 (member AIER < public UDNA), G27 (udna-public visually disconnected)

| Canon reference | Coverage |
|---|---|
| **IA Spec** Doc 2 §3.1 (Identity module) + §3.3 (Wisdom AI / ENTA dashboard) + §4.1 (ENTA root surfaces) + §9.1 (public/unauth routes) | ✅ defined |
| **Components needed** Doc 4: UzgAvatar (§3.10), UzgCard variant=`feature` (§4.3), UzgPageShell (§5.1), UzgHeader (§5.2), UzgEntaCard (§5.9), UzgEmptyState (§4.9), UzgTag/Pill (§3.8) | ✅ all 7 specced |
| **Page template** Doc 5 §3.4 Detail+Action (sticky-action variant on member; §3.1 Landing variant on guest) | ✅ template exists |
| **Design tokens** Doc 3 §3.6 (`color-module-identity` jade) + §11 imagery rules + §12.1 ENTA visualisation orb | ✅ tokens defined |

**Coverage verdict:** **GAP** — IA + components + template + tokens all defined, BUT the *content of the public-safe profile* (what fields render for guests vs members, ENTA archetype display rules, public-flow-posts rendering) requires **ENTA Module Tier 4 canon** that CLA Lane_01 must author. Without that, mockup risks inventing public ENTA semantics.

**Mockup approach:** HTML (with React if interactive ENTA orb mock needed) — split the profile route into guest variant (`/p/enta/:handle` or guest-mode at `/enta/:handle`) showing public-safe fields only, member variant adds interaction CTAs (follow, message, view full QOT trail).

**Complexity:** MEDIUM (3-5 screens: guest-state, member-state, mobile guest, mobile member, possibly 0-state if no posts).

**Dependency:** Blocks on **ENTA Module Tier 4 canon** (priority for CLA1 authoring next).

---

### Priority 2 — Resolve `/aier/:slug` URL semantic collision

**Severity:** P0 · **Quick win:** YES · **User impact:** HIGH · **Effort:** LOW
**Supporting gaps:** G03 (URL semantic flips across auth boundary), G06 (member AIER < UDNA gateway)

| Canon reference | Coverage |
|---|---|
| **IA Spec** Doc 2 §6 (URL canonicalisation rules) + §6.3 (reserved top-level paths includes `/aier/*`) + §3.5 (Marketplace module sub-routes) | ✅ defined |
| **Components needed** none — pure routing decision (no UI surface change) | N/A |
| **Page template** none — routing rule, not page-level | N/A |
| **Design tokens** none | N/A |

**Coverage verdict:** **COMPLETE** — IA Spec §6 already mandates explicit guest-vs-member URL namespacing. Recommendation here is to apply it: namespace public udna-public AIER under `/p/aier/:id` (matches IA Spec §6.1 user-scoped `/me` segment pattern), keep member `/aier/marketplace` for the authenticated experience.

**Mockup approach:** SVG/diagram only — produce a URL-routing decision diagram showing: guest hits `/aier/marketplace` → 301 to `/p/aier/marketplace` (or render unified component with member-detection). No component-level mockup needed.

**Complexity:** SMALL (1 diagram + 1 redirect rule table).

**Dependency:** None. Can ship Sprint 1.

---

### Priority 3 — Fix Thai language coverage (complete TH string-pack)

**Severity:** P0 · **Quick win:** YES · **User impact:** HIGH · **Effort:** MEDIUM
**Supporting gaps:** G15 (Thai partial coverage), G45 (admin VN/EN gaps), G53 (VN diacritic missing)

| Canon reference | Coverage |
|---|---|
| **IA Spec** Doc 2 §6.2 (`?lang=vi\|en\|th\|fil` query parameter) | ✅ defined |
| **Components needed** none new — existing components already accept i18n via Doc 4 §6.1 cross-cutting requirement (i18n hook, Vietnamese DEFAULT, English alternative) | ✅ all 45 components inherit i18n |
| **Page template** none — string-pack work, not page-level | N/A |
| **Design tokens** Doc 3 §4.1 typography (Be Vietnam Pro + Lora — both diacritic-safe) + §4.5 bilingual considerations (Vietnamese ~10% wider than English) | ✅ defined |

**Coverage verdict:** **COMPLETE** — canon explicitly addresses bilingual/multilingual concerns. This is **NOT a mockup task**; it's a string-pack engineering task for Lane_03 implementation, plus a translator pass.

**Mockup approach:** N/A — pure i18n work. Recommendation: dispatch separate `LANE03-I18N-TH-COMPLETE-V1` task to Lane_03 for engineering execution (string-pack inventory + translator brief + CI test for parity).

**Complexity:** SMALL (mockup-wise — 0 screens). MEDIUM (engineering-wise — string-pack + translation effort, but that's not in this brief's scope).

**Dependency:** None for mockup. For shipping: needs translator-vendor or i18n contributor.

---

### Priority 4 — Add 404 page + Help page

**Severity:** P1 · **Quick win:** YES · **User impact:** MEDIUM · **Effort:** LOW
**Supporting gaps:** G02 (no 404, silent redirect to /login), G05 (Help unmounted)

| Canon reference | Coverage |
|---|---|
| **IA Spec** Doc 2 §9.1 (public routes — `/about`, `/help`, `/privacy`, `/terms` are public) + §6.3 reserved paths | ✅ defined |
| **Components needed** Doc 4: UzgEmptyState full-page variant (§4.9), UzgButton (§3.1), UzgLink (§3.15), UzgPageShell (§5.1), UzgHeader (§5.2) | ✅ all 5 specced |
| **Page template** Doc 5 §3.8 Empty/404/Error template (centered illustration + heading + single CTA) | ✅ template exists |
| **Design tokens** Doc 3 §11.2 illustration (organic, hand-drawn, ≤3 colors) + §6 layout grid + §3 neutral palette | ✅ defined |

**Coverage verdict:** **COMPLETE** — full canon coverage. This is the cleanest Sprint 1 candidate.

**Mockup approach:** HTML — 2 page mockups (404 + Help home). Help home should establish a help-content pattern that future help pages can follow (FAQ list + search + contact link).

**Complexity:** SMALL (2 screens + 1 mobile variant per = 4 mockups total, all using the same template).

**Dependency:** None.

---

### Priority 5 — Build member governance UI (`/governance/proposals` + voting + delegation)

**Severity:** P0 · **Quick win:** NO · **User impact:** HIGH · **Effort:** HIGH
**Supporting gaps:** G04 (no member governance UI)

| Canon reference | Coverage |
|---|---|
| **IA Spec** Doc 2 §3.7 (Governance module skeleton: `/governance`, `/governance/proposal/<id>`, `/governance/proposal/<id>/vote`, `/governance/propose`, `/governance/my-votes`, `/governance/laws`, `/governance/canon`) + §9.3 tier-gates (Builder+ to author proposal, Explorer+ to vote) | ✅ skeleton defined |
| **Components needed** Doc 4: UzgGovernanceProposalCard (§5.12), UzgPageShell + UzgHeader (§5.1, §5.2), UzgTabs (§4.4) for active/passed/failed, UzgDataTable (§4.12), UzgPagination (§4.13), UzgModal (§4.6) for vote-confirm, UzgFormGroup + UzgInputField (§4.1, §4.2) for proposal author | ✅ 9 components specced |
| **Page template** Doc 5 §4.7 Governance Landing + §3.3 List+Filter (proposals browser) + §3.4 Detail+Action (proposal detail) + §3.6 Form-multi-step-wizard (propose-new) | ✅ 4 templates apply |
| **Design tokens** Doc 3 §3.6 `color-module-governance` (#56524E gravity grey) | ✅ defined |

**Coverage verdict:** **GAP** — IA Spec §3.7 skeleton + components + templates all present, but the *governance product itself* (what proposals look like, voting power calc, delegation rules, quorum thresholds, proposal lifecycle, tier-gate exact thresholds) requires **PLUS Hub Module Tier 4 canon** because governance is a mini-app within the Plus Hub per NTS later spec.

**Mockup approach:** React (interactive vote action + delegation flow). Multiple screens: governance landing → proposals list → proposal detail → vote modal → delegate flow → my-votes record → propose-new wizard.

**Complexity:** LARGE (full module — 8+ screens including mobile variants).

**Dependency:** Blocks on **PLUS Hub Module Tier 4 canon** (governance mini-app spec). Sprint 3.

---

### Priority 6 — Resolve member AIER UX vs UDNA gateway (unify visual hierarchy)

**Severity:** P0 · **Quick win:** NO · **User impact:** MEDIUM · **Effort:** MEDIUM
**Supporting gaps:** G06 (member AIER < public UDNA), G03 (URL semantic flip — partial overlap with P2)

| Canon reference | Coverage |
|---|---|
| **IA Spec** Doc 2 §3.5 (Marketplace module + AIER mint/marketplace existing routes) | ✅ partial — AIER lives under Marketplace per IA |
| **Components needed** Doc 4: UzgMarketplaceListingCard (§5.11) [exists for listings], UzgCard variant=`feature` (§4.3), UzgTabs (§4.4) for the 8 udna sections (S1–S8), UzgPageShell + UzgHeader (§5.1, §5.2) | ✅ components present |
| **Page template** Doc 5 §3.4 Detail+Action (extends to member-only actions: mint, license, delegate) + §4.5 Marketplace Landing | ✅ templates present |
| **Design tokens** Doc 3 §3.6 `color-module-marketplace` (amber) | ✅ defined |

**Coverage verdict:** **PARTIAL** — components exist; what's missing is the *visual-hierarchy reconciliation* spec describing how the udna-public S1–S8 structure adapts when extended with member-only actions. This is a design-system extension, not a Tier 4 module canon. CLA Lane_01 can address this with a one-page "AIER Detail Pattern" addendum to the Component Library or as a sub-section of PLUS Hub Module canon.

**Mockup approach:** HTML — 2 screens (guest AIER detail with S1–S8, member AIER detail with same S1–S8 + appended member-action panel). Possibly 1 third screen showing the unified routing decision (overlap with P2).

**Complexity:** MEDIUM (3-5 screens with mobile variants).

**Dependency:** Soft-blocks on **PLUS Hub Module Tier 4 canon** (AIER as marketplace mini-app); could ship Sprint 2 with explicit "AIER detail-pattern addendum" if PLUS Hub canon delayed.

---

### Priority 7 — Build creator marketplace (`/marketplace/{courses,workshops,services}`)

**Severity:** P0 · **Quick win:** NO · **User impact:** HIGH · **Effort:** HIGH
**Supporting gaps:** G22 (Marketplace structural gap), G23 (no marketplace search/filter)

| Canon reference | Coverage |
|---|---|
| **IA Spec** Doc 2 §3.5 Marketplace module (sub-routes `/marketplace`, `/marketplace/listing/<id>`, `/marketplace/listing/<id>/buy`, `/marketplace/my-library`, `/marketplace/creator/<handle>`, `/marketplace/creator/me`) | ✅ skeleton defined |
| **Components needed** Doc 4: UzgMarketplaceListingCard (§5.11), UzgSearchBar (§4.17), UzgTag filter chips (§3.8), UzgDropdown sort (§4.14), UzgPagination (§4.13), UzgRangeSlider for price filter (§4.18), UzgFormGroup + UzgFileUpload for creator submission (§4.16) | ✅ 7 components specced |
| **Page template** Doc 5 §4.5 Marketplace Landing + §3.3 List+Filter (browser) + §3.4 Detail+Action (listing detail) + §3.6 Form-wizard (creator submission) | ✅ 4 templates apply |
| **Design tokens** Doc 3 §3.6 `color-module-marketplace` (amber) | ✅ defined |

**Coverage verdict:** **GAP** — IA + components + templates all present, but the *creator economy semantics* (commission split using `circle_business_commission` data model, course vs workshop vs service product types, instructor profile structure, refund policy, royalty distribution) requires **PLUS Hub Module Tier 4 canon** because marketplace is a mini-app per the same NTS later spec referenced in P5.

**Mockup approach:** React (interactive filtering + creator dashboard). Multiple screens: marketplace landing → category browse → listing detail → purchase flow → creator dashboard → creator submission wizard.

**Complexity:** LARGE (full module — 8+ screens).

**Dependency:** Blocks on **PLUS Hub Module Tier 4 canon** (marketplace mini-app spec). Sprint 3.

---

### Priority 8 — Onboarding 0-to-1 walkthrough (first-run wizard + persistent checklist)

**Severity:** P1 · **Quick win:** YES · **User impact:** HIGH · **Effort:** MEDIUM
**Supporting gaps:** G40 (no cohesive 0-to-1 walkthrough), G26 (onboarding feedback missing), G39 (activation banner insufficient)

| Canon reference | Coverage |
|---|---|
| **IA Spec** Doc 2 §8 (7-day progressive onboarding flow — Day 0 Identity → Day 1 Wallet → Day 2-3 Community + Quantum Social → Day 4-5 Wisdom AI → Day 6-7 Retreat + Marketplace + Governance) | ✅ defined |
| **Components needed** Doc 4: UzgEmptyState (§4.9), UzgButton (§3.1), UzgLink for skip (§3.15), UzgPageShell (§5.1), UzgFormGroup + UzgInputField (§4.1, §4.2), UzgEntaCard for archetype reveal (§5.9) | ✅ 6 components specced |
| **Page template** Doc 5 §3.7 Onboarding Wizard (full-screen modal-style overlay, step content, skip-able per P5 Progressive Disclosure) | ✅ template exists |
| **Design tokens** Doc 3 §9.5 motion choreography (sequential reveals 100ms stagger) + §11.2 hand-drawn illustration | ✅ defined |

**Coverage verdict:** **PARTIAL** — IA Spec §8 + onboarding template + components all present. The blocker is the *ENTA archetype gentle-test* used in Day 0 (5 archetypes per Doc 1 §5.3 motifs). The archetype taxonomy + selection UX requires **ENTA Module Tier 4 canon** to define what the 5 archetypes actually are and how the gentle-test routes users to one.

**Mockup approach:** React (multi-step wizard with state persistence). 5-7 screens: welcome → handle setup → archetype gentle-test → first wisdom prompt → first community circle suggestion → wallet intro → completion.

**Complexity:** MEDIUM (5-7 screens, mobile primary).

**Dependency:** Blocks on **ENTA Module Tier 4 canon** for archetype semantics. Sprint 2 once ENTA canon authored.

---

### Priority 9 — Mobile responsive admin surfaces

**Severity:** P1 · **Quick win:** NO · **User impact:** MEDIUM · **Effort:** MEDIUM
**Supporting gaps:** G17 (admin desktop-only)

| Canon reference | Coverage |
|---|---|
| **IA Spec** Doc 2 §9.4 (admin gated) + §6.3 reserved `/admin/*` (Lane_03 territory per LAW Lane_03 §2.1.4) | ✅ defined |
| **Components needed** Doc 4: UzgDataTable (§4.12 — mobile collapse to card-list rule), UzgPageShell mobile variant (§5.1), UzgBottomNav (§5.3) — even admin gets bottom-nav on mobile, UzgDropdown for moderation actions (§4.14) | ✅ all specced |
| **Page template** Doc 5 §6 breakpoint behavior rules (mobile: single column, sticky CTAs at bottom, tables collapse to card-list) + §8.3 Card-grid → card-list transformation | ✅ rules defined |
| **Design tokens** Doc 3 §6.1 container widths + §7 radii + §3 neutral palette | ✅ defined |

**Coverage verdict:** **COMPLETE** — canon explicitly addresses mobile admin via Doc 4 §4.12 mobile-collapse rule + Doc 5 §6 breakpoint rules. This is **NOT a mockup task**; it's a CSS pass on existing admin pages.

**Mockup approach:** Sketch only — annotate existing admin desktop screenshots with the mobile collapse pattern (table → cards, sticky-action-bar). No interactive mockup needed since the visual transformation is defined in canon. Lane_03 implementation task can pick this up directly.

**Complexity:** SMALL (mockup-wise — 2-3 annotated sketches). MEDIUM (engineering-wise — but that's not in mockup scope).

**Dependency:** None for mockup. For shipping: Lane_03 territory; can dispatch as `LANE03-ADMIN-MOBILE-RESPONSIVE-V1` task.

---

### Priority 10 — Surface journey gate denials (replace silent redirects with friendly toasts)

**Severity:** P1 · **Quick win:** YES · **User impact:** MEDIUM · **Effort:** LOW
**Supporting gaps:** G33 (journey gate silent redirects), G43 (AdminGuard silent denial)

| Canon reference | Coverage |
|---|---|
| **IA Spec** Doc 2 §9 auth boundary semantics + §3.1 (Identity routes) | ✅ defined |
| **Components needed** Doc 4: UzgToast (§4.8 — variants success/error/warning/info; max 2 visible at once per P4 cognitive load) | ✅ specced |
| **Page template** none — toast is overlay-pattern not page-level | N/A |
| **Design tokens** Doc 3 §3.3 semantic colors (warning amber, info slate) + §9.1 motion duration `motion-duration-fast` (200ms) + §9.4 reduce-motion compliance | ✅ defined |

**Coverage verdict:** **COMPLETE** — UzgToast spec exists with all states + accessibility. This is mostly an *IA decision* (which toast message for which gate denial) plus a *string library* (~12 toast messages). No new mockup needed; can be a toast-message-table addendum.

**Mockup approach:** Sketch + table — annotated toast-trigger map (which gate → which message → which toast variant + duration). Possibly 1-2 hero-screenshots showing the toast in context.

**Complexity:** SMALL (1 reference table + 2 in-context screenshots).

**Dependency:** None. Sprint 1 candidate.

---

## §4 Mockup Sequencing Recommendation

Rationale-based ordering of the 10 priorities into 3 sprints (~2 weeks each).

### Sprint 1 — Quick wins (Week 1-2): 4 priorities

Goals: Ship measurable user-facing improvements. Build mockup-team momentum. Validate Phase 2 tooling (Claude Artifacts workflow) with low-stakes work.

| Priority | Why Sprint 1 |
|---|---|
| **P4** Add 404 + Help pages | COMPLETE coverage; smallest scope; cleanest pattern test |
| **P10** Journey gate friendly toasts | COMPLETE coverage; SMALL complexity; immediate UX win |
| **P2** Resolve `/aier/:slug` URL collision | COMPLETE coverage; LOW effort; eliminates major confusion source |
| **P3** Thai i18n string-pack | COMPLETE coverage; non-mockup but dispatch to Lane_03 in parallel; unblocks SE Asia segment |

**Output:** 2 page mockups (404, Help) + 1 toast-message reference table + 1 URL-routing decision diagram. Plus Lane_03 dispatch for Thai.

**Dependency check:** None. All four can start Day 1 of Sprint 1 once this brief approved.

### Sprint 2 — ENTA + Onboarding (Week 3-4): 3 priorities

Goals: Activate the public-discovery loop (Priority 1) and the 0-to-1 funnel (Priority 8). Both require ENTA Module Tier 4 canon, so this sprint cannot start until that canon authored.

| Priority | Why Sprint 2 |
|---|---|
| **P1** Public ENTA profiles | Blocked on ENTA Module canon — once authored, mockup is MEDIUM scope |
| **P8** Onboarding wizard | Blocked on ENTA archetype semantics from same ENTA canon — chained dependency |
| **P9** Mobile responsive admin (sketch + dispatch) | COMPLETE coverage; can ship sketch + Lane_03 dispatch in parallel |

**Output:** 5 ENTA profile mockups (guest, member, mobile, 0-state) + 5-7 onboarding wizard mockups + 2 admin responsive sketches.

**Dependency check:** ENTA Module Tier 4 canon **MUST be authored before Sprint 2 starts.** Suggest CLA Lane_01 author it during Sprint 1 (parallel-track).

### Sprint 3 — Heavy mini-apps (Week 5-6): 3 priorities

Goals: Build the two big mini-apps that currently have major Whitepaper-vs-V2 gaps (Governance + Marketplace) and reconcile member AIER UX. All three require PLUS Hub Module Tier 4 canon.

| Priority | Why Sprint 3 |
|---|---|
| **P5** Member governance UI | Blocked on PLUS Hub canon — LARGE scope, full module |
| **P7** Creator marketplace | Blocked on PLUS Hub canon — LARGE scope, full module |
| **P6** Member AIER UX unification | Soft-blocks on PLUS Hub canon (AIER as marketplace mini-app); MEDIUM scope |

**Output:** 8+ governance mockups + 8+ marketplace mockups + 3-5 AIER unified mockups.

**Dependency check:** PLUS Hub Module Tier 4 canon **MUST be authored before Sprint 3 starts.** Suggest CLA Lane_01 author it during Sprint 2.

### Sprint totals

- Sprint 1: P4, P10, P2, P3 = **4 priorities** (3 mockup-bearing + 1 dispatch)
- Sprint 2: P1, P8, P9 = **3 priorities** (2 full mockup + 1 sketch+dispatch)
- Sprint 3: P5, P7, P6 = **3 priorities** (3 full mockup, all LARGE)

**Total: 10 priorities across 3 sprints.** AC-05 satisfied.

---

## §5 Canon Gaps Requiring CLA Lane_01 Authoring Before Mockup

Cross-cut analysis of which Top 10 priorities cannot start mockup until CLA Lane_01 authors specific Tier 4 module canon.

| Priority | Tier 4 canon dependency | Sprint blocked if not authored |
|---|---|---|
| **P1** Public ENTA | **ENTA Module Tier 4 canon** — defines public-safe profile fields, archetype taxonomy, public-flow-posts rendering rules | Sprint 2 |
| **P5** Member governance | **PLUS Hub Module Tier 4 canon** — governance is a mini-app per NTS later spec; needs proposal lifecycle, voting power calc, delegation rules, quorum, tier-gate thresholds | Sprint 3 |
| **P6** Member AIER UX | **PLUS Hub Module Tier 4 canon** — AIER as marketplace mini-app with member-only action panel pattern | Sprint 3 (soft-block; could ship Sprint 2 with addendum) |
| **P7** Creator marketplace | **PLUS Hub Module Tier 4 canon** — creator economy semantics (commission split, course/workshop/service types, refund policy, royalty distribution) | Sprint 3 |
| **P8** Onboarding wizard | **ENTA Module Tier 4 canon** — archetype gentle-test (5 archetypes per Doc 1 §5.3) | Sprint 2 |

### Priorities that do NOT block on Tier 4 canon

| Priority | Status | Why |
|---|---|---|
| **P2** AIER URL collision | COMPLETE | Pure routing decision; IA Spec §6 already covers |
| **P3** Thai i18n | COMPLETE | String-pack work; canon already addresses bilingual |
| **P4** 404 + Help | COMPLETE | Doc 5 §3.8 template + components all present |
| **P9** Mobile admin | COMPLETE | Doc 4 §4.12 mobile-collapse + Doc 5 §6 rules |
| **P10** Journey gate toasts | COMPLETE | UzgToast spec + IA auth boundary semantics |

### Authoring order recommendation for CLA Lane_01

1. **PRIORITY** — Author **ENTA Module Tier 4 canon** during Sprint 1 (~2 weeks). Unblocks Sprint 2 (P1, P8).
2. **NEXT** — Author **PLUS Hub Module Tier 4 canon** during Sprint 2 (~2 weeks). Unblocks Sprint 3 (P5, P7, P6).

These two are critical-path. The other 6 Tier 4 canons (HOME/CHAT/WALLET/U-Reward/TAO/REDLINES_MASTER) are parallel-trackable since none of them block Top 10 priorities directly — they enable broader Phase 3 implementation but not Phase 2 mockups.

---

## §6 Quick Wins Parallel Track

The UX Gap Analysis §9 flagged **6 of the Top 10 as quick wins**: P1, P2, P3, P4, P8, P10. Of these, **4 can ship immediately** (P2, P3, P4, P10 — COMPLETE coverage); **2 are blocked on canon** (P1 ENTA, P8 Onboarding — both depend on ENTA Module Tier 4).

### Phase 0 cleanup PR proposal (separate from V3 PWA OS rebuild)

Bundle the 4 immediate quick wins into a single "V3 Phase 0" delivery that ships **before** the full PWA OS rebuild begins:

| QW | Deliverable | Owner | Effort |
|---|---|---|---|
| P4 | 404 + Help pages | Dev1 mockup → Lane_03 implement | 1 week mockup + 1 week implement |
| P10 | Journey gate toasts | Dev1 mockup-table → Lane_03 implement | 3 days mockup + 1 week implement |
| P2 | AIER URL routing | Dev1 diagram → Lane_03 redirect rule | 2 days diagram + 2 days implement |
| P3 | Thai i18n string-pack | Lane_03 direct (no mockup) | 1-2 weeks (translator-dependent) |

**Estimated total:** ~3-4 weeks parallel work, with shipping cadence: P10 first (smallest), then P2 (low-risk routing change), then P4 (visible UX polish), then P3 (when translator ready).

**Dispatch order recommendation:**

1. `LANE01-V3-QW-P10-JOURNEY-GATE-TOASTS-V1` (Dev1 mockup-table dispatch)
2. `LANE03-V3-QW-P2-AIER-URL-ROUTING-V1` (Lane_03 routing change)
3. `LANE01-V3-QW-P4-404-HELP-MOCKUP-V1` (Dev1 mockup + Lane_03 implement)
4. `LANE03-I18N-TH-COMPLETE-V1` (Lane_03 string-pack — no Dev1 mockup needed)

These four can ship as a coherent "V3 Phase 0" while CLA1 authors Tier 4 canon for the heavier Sprint 2/3 work.

---

## §7 Module Canon Tier 4 Authoring Backlog

CLA Lane_01 must author 8 Tier 4 module canons in chat to fully unblock Phase 2 + future Phase 3 implementation. Each is a standalone document defining the module's product semantics (what it does, what data it shows, what user actions are possible, what tier-gates apply, what cross-cuts to other modules exist).

| # | Tier 4 Canon | Top 10 priorities depending on it | Other dependencies | Critical path? |
|---|---|---|---|---|
| 1 | **ENTA Module Canon** | P1 (Public ENTA), P8 (Onboarding archetype) | UDNA gateway disambiguation; ENTA orb 3D renderer (Lane_02 owned content) | **YES — Sprint 2 blocker** |
| 2 | **PLUS Hub Module Canon** | P5 (Governance), P7 (Marketplace), P6 (AIER UX) | Mini-app boundary spec; tier-gate thresholds; commission split data model | **YES — Sprint 3 blocker** |
| 3 | **HOME/Social Module Canon** | (indirect) Sprint 2/3 community feed surface | Quantum Social user-surface gap (G31, Master Audit Quick Win #1) | NO — parallel-trackable |
| 4 | **CHAT Module Canon** | (indirect) chat-on-marketplace integration in P7 | DM v2 (currently P2 deferred per IA Spec §3.2) | NO — parallel-trackable |
| 5 | **WALLET Module Canon** | (indirect) wallet payment in P7 marketplace flow + retreat booking | Phase 3 implementation depends; Wallet+UZGFi most mature root per Master Audit | NO — V2 wallet works; canon documents existing |
| 6 | **U-Reward Module Canon** | (indirect) Connect-to-Earn loop visibility (G25) | 14 reward action types per V5 reward stack; missions/quiz/check-in flows | NO — parallel-trackable |
| 7 | **TAO Module Canon** | (indirect) Practice tracker in `/wisdom/practice` (IA Spec §3.3) | TAO calendar engine + Bazi pillar — Lane_02 owned content per LAW-NTS-LANE-2 | NO — Lane_02 author scope, not CLA1 |
| 8 | **REDLINES_MASTER aggregate** | (cross-cut) all mini-app boundaries | All 7 above docs must exist before this aggregate | NO — author last, after others |

### Critical-path summary

- **PLUS Hub Module canon** unblocks 3 Top 10 priorities (P5, P6, P7) — highest dependency-fanout.
- **ENTA Module canon** unblocks 2 Top 10 priorities (P1, P8) — second-highest fanout.
- Together, these 2 canons unblock **5 of 10 priorities**. Authoring them first is the leverage move.

### Authoring order (CLA Lane_01 recommended sequence)

1. **ENTA Module canon** (during Sprint 1) → unblocks Sprint 2
2. **PLUS Hub Module canon** (during Sprint 2) → unblocks Sprint 3
3. Parallel after Sprint 3 begins: HOME/Social + WALLET (these document existing surfaces)
4. Then: U-Reward + CHAT
5. TAO Module canon — Lane_02 author scope per LAW-NTS-LANE-2; CLA1 coordinates only
6. **REDLINES_MASTER aggregate** authored last — synthesises mini-app boundaries across all 7

---

## §8 Phase 2 Entry Checklist

Before NTS + CLA start authoring mockups (Phase 2), all the following must be true:

```
☐ 1. ENTA Module Tier 4 canon authored (unblocks P1, P8 — Sprint 2 prerequisite)
☐ 2. PLUS Hub Module Tier 4 canon authored (unblocks P5, P6, P7 — Sprint 3 prerequisite)
☐ 3. This brief reviewed and approved by NTS
☐ 4. Phase 2 mockup tooling decided (Claude Artifacts vs file-based React vs Figma)
☐ 5. Phase 2 sprint board created (3 sprints, 10 priorities, ownership per sprint)
☐ 6. Cursor credentialed Playwright re-run executed (LANE01-UZG-PLUS-V2-AUTHENTICATED-SCREENSHOTS-V1) — provides Phase 2 visual baseline
☐ 7. AIER glyph library — Lane_02 confirms ownership of custom UZG glyph assets per Doc 3 §10.4
☐ 8. Mockup-to-implementation handoff format decided (PNG + spec MD vs interactive HTML vs Figma export)
☐ 9. Sprint 1 quick-wins dispatched (4 tasks: P4, P10, P2, P3 per §6 dispatch order)
☐ 10. Phase 0 cleanup PR target shipping date set (recommend: 4 weeks from Sprint 1 start)
```

**Item count: 10** (target ≥5 per AC-08 satisfied with margin).

### Items NTS / CLA1 can resolve themselves (sovereign decisions)

- Items 3, 4, 5, 8, 10 — purely strategic decisions

### Items requiring task dispatch

- Items 1, 2 — CLA1 authors in chat (no Dev1 dispatch needed for canon writing)
- Item 6 — Cursor task dispatch (already drafted as `LANE01-UZG-PLUS-V2-AUTHENTICATED-SCREENSHOTS-V1`, halted on credentials per prior verify)
- Item 7 — Lane_02 confirmation (handoff via `MSG-L01-L02-*` or direct chat)
- Item 9 — Dev1 + Lane_03 task dispatches per §6

---

## §9 Honest Disclosures

What this brief CANNOT do:

- **Cannot predict mockup user-test outcomes** — sprint sequencing assumes mockup quality is sufficient; real user testing in Phase 3 may reveal that priority order needs revision.
- **Cannot estimate exact effort** beyond audit-provided LOW/MEDIUM/HIGH labels — actual mockup person-hours depend on Claude Artifacts iteration cadence, which is unproven for this team.
- **Cannot detect canon-vs-audit contradictions** that didn't surface in source docs — if a gap exists between Cursor's audit and Dev1's canon that wasn't captured in either, this brief inherits the gap.

Assumptions made:

- **PLUS Hub mini-app spec presumed** — P5, P6, P7 dependency analysis assumes NTS's later spec for governance + marketplace + AIER as PLUS Hub mini-apps. If NTS rules differently (e.g. governance is its own top-level module, not a mini-app), Sprint 3 sequencing changes.
- **ENTA archetype taxonomy presumed** — Doc 1 §5.3 mentions "5 archetypes" without naming them. P1 + P8 dependency assumes CLA1's ENTA Module canon will define the 5 names + selection-test logic.
- **Wallet not in Top 10** — Wallet is the most mature module (Master Audit §4) and has no Top 10 entry. WALLET Module canon is therefore parallel-trackable, but if NTS decides V3 redesigns wallet UX (despite V2 maturity), the priority order shifts.

Pending NTS decisions surfaced:

- **Tier-gate exact thresholds** (Doc 2 §9.3 lists Builder+/Sovereign-only capabilities but specific feature-by-feature gate lists need PLUS Hub canon to lock)
- **Onboarding skip vs enforce balance** — Doc 1 P5 (Progressive Disclosure) says skippable; some onboarding designs prefer "soft-required" first 3 steps with skip on optional 4-7. NTS to decide.
- **Multilingual scope for V3** — Thai is P0 (P3) but Doc 2 §6.2 query param lists `vi|en` only; if Thai/Filipino/etc. all V3-supported, Doc 2 may need a §6.2 update.

Tier 4 canon priority-order risk:

- **PLUS Hub has 3 dependent priorities** (P5, P6, P7) — if PLUS Hub canon ships before ENTA Module canon, Sprint 3 starts before Sprint 2 finishes. Recommend CLA1 author **ENTA first** despite PLUS Hub having higher dependency-fanout, because Sprint 2 has tighter critical-path (Sprint 1 ships in 2 weeks; Sprint 2 must be ready immediately after).

---

## §10 Cross-references — this brief vs prior LANE01 deliverables

This synthesis sits in a chain of Lane_01 governance deliverables. Each prior deliverable contributes a specific lens; this brief reconciles all of them for Phase 2.

| Source deliverable | What it contributes to this brief | Citation density |
|---|---|---|
| `canon/uzg-plus/uiux/UZG_PLUS_UIUX_DESIGN_PRINCIPLES_CANON_v1.md` | 7 ranked principles + 15 anti-patterns; informs every priority's "why this matters" framing | §3 (every priority) |
| `canon/uzg-plus/uiux/UZG_PLUS_UIUX_INFORMATION_ARCHITECTURE_SPEC_v1.md` | 7×6 module/root matrix + URL canonicalisation; primary source for IA Spec section refs | §3 (10/10 priorities) |
| `canon/uzg-plus/uiux/UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1.md` | 38 color tokens + typography + sacred geometry; primary source for design-token refs | §3 (5 priorities reference module-accent colors) |
| `canon/uzg-plus/uiux/UZG_PLUS_UIUX_COMPONENT_LIBRARY_SPEC_v1.md` | 45 components specced; primary source for component refs | §3 (every priority lists ≥5 components) |
| `canon/uzg-plus/uiux/UZG_PLUS_UIUX_PAGE_TEMPLATES_SPEC_v1.md` | 21 templates; primary source for page-template refs | §3 (10/10 priorities) |
| `audits/ecosystem/uzg-plus/uiux-audit/UZG_PLUS_V2_UX_GAP_ANALYSIS_v1.md` §9 | Top 10 priority list verbatim; supporting gaps G01..G53 | §3 + §6 (every priority cites G##) |
| `audits/ecosystem/uzg-plus/uiux-audit/UZG_PLUS_V2_USER_FLOW_AUDIT_v1.md` | 12 flows (6 Roots + 6 cross-cut); informs flow-level dependency analysis | §3 (P5, P7, P8 flow-level citations) |
| `audits/ecosystem/uzg-plus/uiux-audit/UZG_PLUS_V2_MODULE_INVENTORY_v1.md` | 7-module mapping vs V2 reality; supplies module-state context for §3 | §3 (P5, P7 cite module gaps) |
| `audits/ecosystem/uzg-plus/uiux-audit/UZG_PLUS_V2_ROUTE_INVENTORY_v1.md` | 93 V2 routes baseline; informs URL routing decisions in P2 | §3 P2 (`/aier/:slug` resolution) |
| `audits/ecosystem/uzg-plus/UZG_PLUS_V2_MASTER_AUDIT_v1_2.md` | DEC-04, DEC-05, 6 Roots status, 16 functional domains, 5 Quick Wins | §3 (cross-cut), §6 quick wins map to Master Audit §8 |
| `audits/ecosystem/uzg-plus/CANON_V2_RECONCILIATION_PROPOSAL.md` | DEC-04 4 tiers, DEC-05 7 modules verbatim, 6 Roots disambiguation | §3 (membership tier-gate references) |

### Forward-references — what this brief enables

| Future deliverable | What it inherits from this brief |
|---|---|
| ENTA Module Tier 4 canon (CLA1 to author) | §5 dependency map + §3 P1 + P8 specifications |
| PLUS Hub Module Tier 4 canon (CLA1 to author) | §5 dependency map + §3 P5 + P6 + P7 specifications |
| Phase 0 cleanup PR (Sprint 1 quick-wins) | §6 dispatch order + §3 P2/P3/P4/P10 mockup approaches |
| Phase 2 sprint board | §4 sprint sequencing |
| Phase 3 implementation backlog (Lane_03) | §3 component lists per priority + §7 Tier 4 canon order |
| Cursor credentialed Playwright re-run | §8 entry checklist item 6 — provides Phase 2 visual baseline |

---

## §11 Sign-off

**Authored:** CLA Lane_01 / CLAC-1 (Claude Opus 4.7) on 2026-04-30
**Awaiting:** NTS approval per R-AUTH-01 (canon-author gate); Phase 2 mockup work is downstream of this approval.
**Effective:** immediately upon NTS approval; until then, treat as PROPOSED MOCKUP SEQUENCE for review.

This brief is the bridge between Phase 1 (canon + audit) and Phase 2 (interactive mockups). Without it, Phase 2 risks redesigning surfaces without canonical alignment. With it, every mockup has a documented canon citation and a known dependency state.

**Signal back to NTS:** when this brief is approved, the next two CLA1 authoring tasks (in chat, not Dev1 dispatch) are:

1. ENTA Module Tier 4 canon
2. PLUS Hub Module Tier 4 canon

These two unblock 5 of 10 Top 10 priorities and are the only critical-path canon work for Phase 2 to commence.

End of brief.
