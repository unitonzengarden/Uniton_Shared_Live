# UZG+ UI/UX Canon — INDEX

**Version:** v1.0 (2026-04-30)
**Authority:** AMD_NTS_FULL_TECH_AUTONOMY + canon-author NTS approval pending per R-AUTH-01
**Authored:** CLA Lane_01 (Claude Opus 4.7)
**Status:** PUBLISHED 2026-04-30 — 5 documents canonical for UZG+ PWA OS UI/UX

This index aggregates the 5 governance documents defining UZG+ PWA OS UI/UX standards. These specs are the **source of truth** for all UI/UX implementation work — Phase 2 mockups (built via Claude Artifacts) and Phase 3 production code MUST conform.

---

## §1 5-Document Canon (read in order)

| # | Document | Lines | Sub-sections | Purpose |
|---|---|---|---|---|
| 1 | [UZG_PLUS_UIUX_DESIGN_PRINCIPLES_CANON_v1.md](UZG_PLUS_UIUX_DESIGN_PRINCIPLES_CANON_v1.md) | 230 | 9 | **WHY** — top-level design philosophy. 7 ranked principles + 15 anti-patterns + voice + visual identity + hierarchy of needs |
| 2 | [UZG_PLUS_UIUX_INFORMATION_ARCHITECTURE_SPEC_v1.md](UZG_PLUS_UIUX_INFORMATION_ARCHITECTURE_SPEC_v1.md) | 570 | 13 | **WHERE** — IA: 7 Modules × 6 Roots matrix, URL canonicalisation, mobile + desktop nav, 7-day onboarding, auth + tier gates, search architecture |
| 3 | [UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1.md](UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1.md) | 511 | 16 | **HOW IT LOOKS** — design tokens: color (jade primary + earth secondary + 4 tier accents + 7 module accents) · typography (Be Vietnam Pro + Lora) · spacing 4px base · grid · radius · shadow · motion · iconography · imagery · sacred geometry · light + dark theme |
| 4 | [UZG_PLUS_UIUX_COMPONENT_LIBRARY_SPEC_v1.md](UZG_PLUS_UIUX_COMPONENT_LIBRARY_SPEC_v1.md) | 520 | 10 | **WHAT** — 45 components: 15 Atomic + 18 Molecular + 12 Organism. Per-component contract: variants · props · states · accessibility · mobile-vs-desktop · anti-patterns. Naming convention `Uzg<Domain?><ComponentName>` |
| 5 | [UZG_PLUS_UIUX_PAGE_TEMPLATES_SPEC_v1.md](UZG_PLUS_UIUX_PAGE_TEMPLATES_SPEC_v1.md) | 391 | 10 | **HOW IT COMPOSES** — 21 page templates: 8 generic patterns + 7 module landings + 6 root dashboards. Selection decision tree + responsive pattern library + breakpoint rules |

**Total:** 2222 lines of canonical UI/UX specification.

---

## §2 Quick Reference — what to read for what

| If you need to… | Read |
|---|---|
| Decide a UX pattern that respects user sovereignty | Doc 1 §2 (P1) + §3 anti-patterns |
| Understand the 7 Whitepaper Modules and their routes | Doc 2 §3 |
| Understand 6 Roots and how they overlay on Modules | Doc 2 §4 + §5 (matrix) |
| Pick a button color | Doc 3 §3 (jade primary, ochre secondary, semantic, neutral) |
| Pick a typography size | Doc 3 §4.2 type ramp |
| Build a new card-listing page | Doc 4 (UzgCard) + Doc 5 §3.3 (List+Filter) |
| Build the Wallet landing | Doc 5 §4.6 |
| Build an ENTA dashboard | Doc 5 §5.1 (+ Lane_02 owns 3D renderer) |
| Spec a new component | Doc 4 §1 (template) + §2 naming convention + §6 cross-cutting |
| Decide a sticky CTA pattern on mobile | Doc 5 §8.1 |
| Verify accessibility compliance | Doc 1 §2 (P6) + per-component "Accessibility" section in Doc 4 |
| Implement dark mode | Doc 3 §13 |
| Localise for Vietnamese | Doc 1 §4.3 + Doc 3 §4.5 + R-LANG-01..03 in [LAW-NTS-LANE-2_v1.md](../../../laws/LAW-NTS-LANE-2_v1.md) §14 |

---

## §3 Canonical Anchors

These external sources informed the canon and are referenced throughout:

### From Whitepaper / Reconciliation

- **DEC-04 (4 Membership tiers):** Explorer (Free 365d) · Seeker ($9 30d) · Builder ($39 30d) · Sovereign ($69 30d). Sourced from V2 P4 migration `20260319234501_v2_p4_membership_usd_credit_canon.sql`. See [`Reconciliation Proposal §1`](../../../audits/ecosystem/uzg-plus/CANON_V2_RECONCILIATION_PROPOSAL.md).
- **DEC-05 (7 Modules verbatim Whitepaper §4.2):** Identity / Community / Wisdom AI / Retreat / Marketplace / Wallet / Governance.
- **6 Roots:** ENTA / QOT / Quantum Social / Circle Business / Wallet+UZGFi / Membership. Status per Master Audit v1.2 §4.
- **DEC-03 (QOT disambiguation):** UZG+ `qot_nodes` (content provenance, tree) ≠ AIER Code `qot_lineage` (BLOCH event log, sequence). No bridge.

### From Master Audit v1.2

- **16 functional domains** in V2 implementation map to 7 Modules as sub-features (see Doc 2 §3 sub-routes).
- **5 Quick Wins** from Implementation Priority Matrix — 2 are user-surface gaps that this canon addresses (#1 Quantum Social user surface in Doc 5 §5.3, #3 QOT trail user surface in Doc 5 §5.2).

### From Lane LAWs

- **R-LANG-01..03** (Vietnamese-first + canon library + diacritics): inherited from [LAW-NTS-LANE-2_v1.md](../../../laws/LAW-NTS-LANE-2_v1.md) §14.
- **R-AUTH-01** (NTS-only canon approval): canon docs await NTS approval gate.
- **R-LANE-02-02** (UZG terminology rename = NTS approval): UI copy must respect.

---

## §4 What This Canon Does NOT Decide

These are intentionally left open for Phase 2 (mockups via Claude Artifacts) and Phase 3 (implementation):

- **Exact CSS variable / Tailwind config export format** — Doc 3 §14 reserved.
- **Exact illustration style** — Doc 3 §11.2 sets direction (organic, hand-drawn, ≤3 colors); detailed style guide TBD.
- **Specific Phosphor icon picks per component** — Doc 4 names categories, not every glyph.
- **Animation timing per micro-interaction** — Doc 3 §9 sets duration scale; per-interaction choice belongs to mockups.
- **Storybook + visual regression tooling** — Doc 4 §8 reserved for Phase 2.
- **Interactive prototype** — out of canon scope; built later via Claude Artifacts.
- **Per-page exact copy / wording** — Doc 1 §4 sets voice + tone; per-page copy handled in implementation with Lane_02 Language OS review.

---

## §5 How This Canon Updates

Any change to the 5 docs requires:

1. CLA1 author proposed update PR
2. PR labelled `canon-update`
3. NTS review per R-AUTH-01 (canon-only approver)
4. Self-merge after NTS approval
5. Bump version in each doc's frontmatter (v1.0 → v1.1 minor; → v2.0 major)
6. Update this INDEX with new line counts + summary

Sub-document line counts are maintenance-only; treat as advisory not normative.

---

## §6 Phase 2 Next Steps (recommended)

1. **CLA1 ingest** all 5 docs into project knowledge "UZG+ Lane1" — canonical context for any future UI/UX dispatch.
2. **Reconcile with Dev2 audit** — running parallel: `LANE01-UZG-PLUS-V2-USER-FLOW-AUDIT-V1` (Cursor). Map current V2 user flows against Doc 2 IA Spec; identify gaps.
3. **Mockup phase** — NTS + CLA build interactive mockups via Claude Artifacts using these specs as foundation. Recommended order:
   - Mockup 1: Identity dashboard (`/identity`) — covers Doc 5 §3.2 + §4.1
   - Mockup 2: Wallet landing (`/wallet`) — covers Doc 5 §4.6 (most mature module per Master Audit)
   - Mockup 3: Community feed (`/community`) — covers Doc 5 §4.2
   - Mockup 4: Onboarding wizard — covers Doc 5 §3.7 + IA Spec §8 (7-day progressive)
4. **Lane_03 implementation backlog** — once mockups locked, Lane_03 picks up component-level engineering tasks per Doc 4 §7 maturity map.

---

## §7 Sign-off

**Authored:** CLA Lane_01 (Claude Opus 4.7) on 2026-04-30
**Awaiting:** NTS canon-approval gate per R-AUTH-01
**Effective:** immediately upon NTS approval; until then, treat as PROPOSED CANON
**Sibling LAWs:** [LAW-NTS-LANE-1_v1.md](../../../laws/LAW-NTS-LANE-1_v1.md) (governance) · [LAW-NTS-LANE-2_v1.md](../../../laws/LAW-NTS-LANE-2_v1.md) (Lane_02 owns Language OS + UI components per design system) · [LAW-NTS-LANE-3_v1.md](../../../laws/LAW-NTS-LANE-3_v1.md) (Lane_03 owns admin UI + backend implementation) · [LAW-NTS-LANE-4_v1.md](../../../laws/LAW-NTS-LANE-4_v1.md) (Lane_04 owns real-user testing + social validation)

End of INDEX.
