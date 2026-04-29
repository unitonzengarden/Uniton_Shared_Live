# UZG+ Canon V2 Reconciliation Proposal

**Authored:** 2026-04-29 by CLAC-1 (Lane_01) under `LANE01-CANON-V2-RECONCILIATION-V1`
**Status:** PROPOSAL — awaiting NTS canon-approval gate (R-AUTH-01: canon changes are NTS-only)
**Scope:** UZG+ ecosystem — reconcile project-knowledge "canon claims" against repo whitepaper + V2 implementation reality
**Inputs:**
- Cursor audit `audits/ecosystem/uzg-plus/LANE01-UZG-PLUS-AUDIT-AND-SYSTEM-MAP-V1_REPORT.md` (PR #14, merge `e4bd080`)
- Whitepaper `C:\workspace\UZGPLUS\docs\UZG+ WHITEPAPER - OFFICAL.md` v1.0 (1,874 lines)
- `C:\workspace\UZGPLUS\UZG_PLUS_PRODUCT_MAP.md`
- `C:\workspace\UZGPLUS\UZG_PLUS_MODULE_ROADMAP.md`
- `C:\workspace\UZGPLUS\UNITON_MASTER_CANON.md` (March 2026 conflict matrix)
- 96 V2 migrations under `C:\workspace\UZGPLUS\supabase\migrations\` (sampled)
- `supabase/functions/reward_emit/index.ts` (V5 reward stack)

**Boundary:** This is a **proposal only**. No canon files modified. NTS approves and dispatches a separate canon-edit task per `R-AUTH-01`.

**Three-way drift identified.** The "canon claim" pillar of the dispatch refers to project-knowledge / NTS mental model rather than the repo whitepaper, which itself differs from V2 implementation. All six sections below report the three sources side-by-side.

---

## §1 Membership tier naming

| Source | Claim |
|---|---|
| Project knowledge | **6 tiers**: Free / Standard / Premium / Business / Enterprise / Ambassador |
| Whitepaper §4.2 | Mentions `membership` as a sub-component of the **Identity** module — does **not** enumerate tiers by name |
| Module Roadmap §2 | Lists `Membership` as a Phase 1 — Foundation module — does **not** enumerate tiers |
| V2 reality (migration `20260319234501_v2_p4_membership_usd_credit_canon.sql`) | **4 tiers** in `member_tiers` table: **Explorer** (free / 365d) · **Seeker** ($9 / 30d) · **Builder** ($39 / 30d) · **Sovereign** ($69 / 30d) — schema is catalog-driven (priority_rank, code, name) so tiers are data, not code |

**Drift:** project knowledge ↔ whitepaper ↔ V2 implementation are mutually inconsistent.

**Recommended canon update:**

> **Membership** in UZG+ is **catalog-driven** via `public.member_tiers` (priority_rank, code, name, monthly_price, duration_days). The currently-canonical tier list, locked in migration `20260319234501_v2_p4_membership_usd_credit_canon.sql`, is **4 tiers**:
> 1. `explorer` — Explorer (free, 365 days)
> 2. `seeker` — Seeker ($9/mo, 30 days)
> 3. `builder` — Builder ($39/mo, 30 days)
> 4. `sovereign` — Sovereign ($69/mo, 30 days)
>
> The legacy "6 tiers (Free/Standard/Premium/Business/Enterprise/Ambassador)" project-knowledge claim is **retired**. Future tier additions/changes flow through `member_tiers` migrations + canon refresh, not by amending hardcoded names elsewhere.

---

## §2 Seven Core Modules naming

| Source | Set |
|---|---|
| Project knowledge | **6 abbreviations**: EX (Experience) · GV (Governance) · ID (Identity) · SY (System) · TT (Truth/Trust) · VL (Value/Wallet) |
| Whitepaper §4.2 | **7 modules**: Identity · Community · Wisdom AI · Retreat · Marketplace · Wallet · Governance |
| Product map §3-§8 | **6 systems by layer**: ENTA Network · Wallet · Community · Knowledge · Governance · Economic (+ Intelligence cross-cutting) |
| V2 reality (16 functional domains in `supabase/migrations/`) | Identity / ENTA · Wallet / U / UZG · Treasury / UZGFi / Burn · Reward V5 economy · Membership / activation · Energy / mission engine · Circle / business · Notifications · RBAC / Admin · AIER mint / license / agent · AI / wisdom / training · QOT (MVP) · Quantum Network / Brain · Social brain / harmony · Network / evolution / autopilot · Audit (cross-cutting) |

**Drift:** abbreviation set EX/GV/ID/SY/TT/VL has **no echo** in the repo whitepaper, product map, or migrations. `Retreat`, `Community`, `Wisdom AI`, `Marketplace` from the whitepaper are **not** in the abbreviation set. The product map introduces `ENTA Network` and `Knowledge` which the whitepaper subsumes under `Identity` and `Wisdom AI`.

**Recommended canon update:**

> **The seven canonical UZG+ modules are the whitepaper §4.2 list, verbatim:**
>
> 1. **Identity** — profile, membership, reputation, activity history
> 2. **Community** — circles, discussions, social interaction
> 3. **Wisdom AI** — personal energy mapping, guidance, knowledge synthesis
> 4. **Retreat** — physical retreat network, events, workshops
> 5. **Marketplace** — creator economy (courses, workshops, services)
> 6. **Wallet** — U token, UZG token, in-app payments
> 7. **Governance** — proposals, voting, decentralised coordination
>
> The abbreviation set EX/GV/ID/SY/TT/VL is **retired**. Product-map alternatives (`ENTA Network`, `Knowledge`, `Economic`) map to whitepaper modules as follows: `ENTA Network` is the substrate (not a module — it's the connective tissue across Identity + Community); `Knowledge` ≈ Wisdom AI; `Economic` ≈ Wallet + Marketplace.

---

## §3 Roadmap phases

| Source | Phase count | Names |
|---|---|---|
| Project knowledge | **6 phases** | Identity → Connect-to-Earn → Circle Business → Wallet → AIER → AIFI |
| Whitepaper §9 | **3 phases** | Foundation · Platform · Global Network |
| Module Roadmap §1-§4 | **3 phases** | Foundation Systems · Network Systems · Intelligence & Civilization Systems |
| V2 migrations (sampled) | **8 phases** | `phase0` financial schema · `phase1` wallet core · `phase2` unified wallet · `phase3` UZGFi ops · `phase4` ENTA economy · `phase5` super-app payments · `p4` membership canon · `p5` business commission · `p6` notification lock · `p7` QOT system lock |

**Drift:** four sources, four different counts. The 6-phase project-knowledge list is **not** in any repo document. Whitepaper §9 + Module Roadmap §1-§4 agree on 3 strategic phases. V2 migrations use a finer 8-phase build sequence that does NOT map cleanly to the strategic 3.

**Recommended canon update — dual roadmap:**

> UZG+ uses **two complementary phase axes**:
>
> **A. Strategic phases (whitepaper §9, public-facing)** — three:
> 1. **Foundation** — wisdom system, initial community, first retreats, experience pilots
> 2. **Platform** — UZG Super App, token economy, creator marketplace, Wisdom AI integration
> 3. **Global Network** — retreat-node expansion, AI ecosystem scale, decentralised governance rollout
>
> **B. Build phases (internal, V2 migrations)** — eight (P0–P7):
> - `phase0` financial schema stabilisation
> - `phase1` wallet core
> - `phase2` unified wallet
> - `phase3` UZGFi operations
> - `phase4` ENTA economy engine
> - `phase5` super-app payments
> - `p6` notification lock
> - `p7` QOT system lock
>
> The legacy 6-phase project-knowledge sequence (Identity → Connect-to-Earn → Circle Business → Wallet → AIER → AIFI) is **retired**. AIER and AIFI tracks are separate apps in the ecosystem (per ecosystem-poll roster aier-ops, aifi-life, aier-life-super), not phases of UZG+.

---

## §4 Connect-to-Earn

**Status in repo:** the phrase **"Connect-to-Earn" does NOT appear verbatim** in `uzgplus-app` (Cursor audit §8 disclosure 4). The semantics live in `supabase/functions/reward_emit/index.ts` + the V5 reward stack.

**Action types implemented (verified in `reward_emit/index.ts`):**

| # | actionType | category | Source |
|---|---|---|---|
| 1 | `online_active` | online | online presence reward |
| 2 | `post_created` | interaction | flow_posts table |
| 3 | `comment_created` | interaction | flow_comments table |
| 4 | `reaction_added` | interaction | flow_reactions table |
| 5 | `circle_joined` | interaction | circles table |
| 6 | `user_followed` | interaction | follow events |
| 7 | `daily_checkin` | mission | daily check-in module |
| 8 | `lucky_spin` | mission | gamification — lucky spin |
| 9 | `chest_loot` | mission | gamification — chest reward |
| 10 | `quiz_answer` | mission | quiz engine |
| 11 | `mission_balance` | mission | balance-mission rewards |
| 12 | `mission_activity` | mission | activity-mission rewards |
| 13 | `mission_diversity` | mission | diversity-mission rewards |
| 14 | `promotion_claim` | promotion | promotion campaign claims |

**Note:** the dispatch task prompt cited "12 action types" — actual implementation has **14** (the 3 mission_* sub-types and `promotion_claim` were not in the dispatch list).

**Recommended canon update:**

> **"Connect-to-Earn"** is the umbrella canon term for the UZG+ V5 reward stack — the mechanism by which user activity becomes U-token emission. The phrase is intentionally **not** baked into the codebase; the implementation uses semantic action codes.
>
> **Implementation reference:** `supabase/functions/reward_emit/index.ts` — 14 action types across 4 categories (online · interaction · mission · promotion). Emission caps + multipliers live in `public.u_emission_daily`. RLS policies enforce read-only public visibility.
>
> Future reward action additions land in the `reward_emit` config block + a migration that updates the action-type whitelist; canon does not need to enumerate every action.

---

## §5 Six Roots — implementation status & gap matrix

| # | Root | Canon claim (project knowledge) | V2 reality (audit + migration) | Gap | Priority |
|---|---|---|---|---|---|
| 1 | **ENTA** | "Identity & Energy base" | **PRESENT** — full DB + 10+ frontend pages + 3D visualisation under `src/modules/enta`, `src/services/enta`, `src/components/enta`. Identity domain in migrations. | None | — |
| 2 | **QOT** | "Truth / provenance layer" | **MVP_PRESENT** — `qot_nodes` MVP table + `v2_p7_qot_system_lock` migration | UZG+ ↔ AIER Code `qot_lineage` **bridge not visible** at uzgplus-app source surface (see §6 below) | **P1** |
| 3 | **Quantum Social Network** | "Interaction signal layer" | **BACKEND_PRESENT_NO_USER_SURFACE** — `social_brain`, `autopilot`, `evolution`, `universe` migrations shipped | **No end-user dashboard.** Backend is admin/service-tier only. | **P1 product gap** |
| 4 | **Circle Business** | "Community Business OS" | **PRESENT** — P5 commission ladder shipped (`v2_p5_business_sales_attribution_engine.sql` + `commission_ladder_v2`), settlement + circle_wallet + payment_trace_receiver migrations | None | — |
| 5 | **Wallet + UZGFi** | "Value circulation layer" | **PRESENT** — most mature module; phases 0-5 + global credit + treasury realign + USD-credit canon (P4) | None | — |
| 6 | **Membership** | "Governance / access (6 tiers)" | **TIER_CAPABLE** — catalog-driven `member_tiers` table; 4 tiers currently canonical (Explorer/Seeker/Builder/Sovereign per §1 above) | Tier names enumerated in V2 differ from project-knowledge "6 tiers" | **P2 doc** |

**Recommended canon update:**

> Add a **§6.1 Implementation Status Matrix** to the canon Roots section, with the table above as the authoritative status snapshot.
>
> Tag `Quantum_Social_Network` = `BACKEND_PRESENT_NO_USER_SURFACE_PHASE` and add an explicit "open-items" callout: a user-facing surface for the Quantum Social Network primitives is a known product gap. Until shipped, treat the brain as **infrastructure**, not a feature.
>
> Tag `QOT` = `MVP_PRESENT_BRIDGE_TBD` — see §6 below.

---

## §6 AIER Bridge & QOT Cross-System

**Audit finding:** Cursor §8 disclosure 7 reports that the QOT cross-system bridge between UZG+ `qot_nodes` and AIER Code `qot_lineage` **is not visible at the source-code surface in `uzgplus-app`**. The MVP `qot_nodes` table exists but its bridge to the AIER Code provenance layer is unaccounted for.

**Three candidate locations for the bridge:**

| # | Location | Rationale | How to verify |
|---|---|---|---|
| 1 | **AIER Code repo (`Uniton_Shared/services/`)** | Plausible if the bridge is a write-from-AIER-Code-side service that pushes lineage records to UZG+ via API | grep `Uniton_Shared` for `qot_bridge`, `qot_lineage_push`, `uzgplus_api_qot` (none currently visible) |
| 2 | **AIER Ops repo (`Uniton_OS`)** | Plausible if the bridge is operationally owned (Lane_03 territory) | gh api `unitonzengarden/Uniton_OS` (currently inaccessible from PAT — KF-01 from prior task) |
| 3 | **Standalone microservice (TBD)** | Plausible if the bridge runs as an Edge Function or external worker outside both repos | Requires NTS to disclose deployment surface |

**Recommended canon update + follow-up dispatch:**

> Add a **canon section "QOT Cross-System Bridge — TBD"** acknowledging:
> - UZG+ `qot_nodes` (MVP) and AIER Code `qot_lineage` are independent provenance layers today.
> - A canonical bridge between them is **declared intent**, not yet **observable implementation**.
> - The bridge is a P0 architectural item: without it, "truth/provenance" claims that span UZG+ and AIER Code are unsupported by the runtime.
>
> **Recommended next dispatch:** `LANE01-QOT-BRIDGE-LOCATE-AND-AUDIT-V1` — read-only audit explicitly targeting the QOT bridge across the three candidate locations. Output: bridge_present (yes/no/partial) + location + schema match between `qot_nodes` and `qot_lineage`. Honest disclosure if absent.

---

## §7 Cross-cutting reconciliation: U / UZG tokenomics conflicts

The existing `UNITON_MASTER_CANON.md` (March 2026) already documents 5 conflicts (C001-C005). Re-stating them here for completeness — these reconcilations are **out of scope of this proposal** but should be the next reconciliation pass after NTS approves §1–§6:

| ID | Conflict | Status |
|---|---|---|
| C001 | U total supply: 36.9T (canon) vs 369T (whitepaper) | **OPEN** — needs lock |
| C002 | Conversion: 1000 U = 1 UZG (canon) vs dynamic (whitepaper) | **OPEN** — needs single rule |
| C003 | Treasury: 40/20/20/20 vs 30/25/20/15/10 vs 30/25/25/20 | **OPEN** — needs domain split |
| C004 | AIER distribution: 60/40 vs 70/20/10 (+ platform 60/40) | **OPEN** — needs revenue/emission split |
| C005 | Missing `docs/tokenomics/` folder | **OPEN** — easy fix |

**Recommendation:** Defer to a separate dispatch (`LANE01-CANON-V2-TOKENOMICS-RECONCILIATION-V1`) authored after this one is approved, scoped to C001-C005 + reward base values + buyback policy.

---

## §8 Summary table — drift severity

| Section | Drift severity | Affected canon | Recommended action |
|---|---|---|---|
| §1 Membership tier naming | **HIGH** (3-way mismatch) | Project knowledge "6 tiers" (legacy) | Adopt 4 catalog tiers from V2 P4 migration; retire 6-tier list |
| §2 Seven Core Modules | **HIGH** (abbreviations not in repo) | Project knowledge "EX/GV/ID/SY/TT/VL" | Adopt whitepaper §4.2 verbatim 7 modules; retire abbreviations |
| §3 Roadmap phases | **HIGH** (4 sources, 3 counts) | Project knowledge "6 phases" | Adopt dual roadmap (3 strategic + 8 build); retire 6-phase list |
| §4 Connect-to-Earn | **MEDIUM** (semantic match, name not in repo) | Phrase usage | Define umbrella term in canon, reference 14 action types |
| §5 Six Roots status | **MEDIUM** (2/6 have flagged gaps) | Implementation status of Roots | Add §6.1 status matrix; tag Quantum Social NO_USER_SURFACE; tag QOT BRIDGE_TBD |
| §6 QOT Bridge | **HIGH** (architectural unknown) | Provenance claim | Acknowledge TBD; dispatch separate locate-and-audit task |

---

## §9 Approval gate

Per `R-AUTH-01`: this proposal is **not self-approving**. Sections §1-§6 each touch canonical structure (module names, phase counts, root naming) and therefore require NTS approval before any canon file is amended.

**NTS decision per section:** approve / amend / reject / defer.

**Approve-all path:** NTS dispatches `LANE01-CANON-V2-EDIT-AND-LOCK-V1` referencing this proposal as input. That edit task can self-merge under AMD with the proposal as authority anchor.

---

## §10 Closing

This proposal does **not** modify any canon file. It only:
1. Surfaces three-way drift between project-knowledge claims, whitepaper, and V2 implementation.
2. Recommends specific canon updates per section.
3. Flags the QOT bridge as an architectural unknown deserving its own audit.
4. Defers tokenomics conflicts (C001-C005) to a follow-up reconciliation.

**Expected post-approval impact:** the legacy "6 tiers / EX-GV-ID-SY-TT-VL / 6 phases" mental model gets retired in favour of: 4 catalog tiers, 7 whitepaper modules, dual roadmap (3 strategic / 8 build). Future audits anchor on the same set of facts.

---

**END CANON_V2_RECONCILIATION_PROPOSAL.md**

🔒 Reconciliation only. No canon files modified. NTS approval required before any canon edit.
