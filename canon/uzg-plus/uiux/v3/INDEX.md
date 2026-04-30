# UZG+ V3 PWA OS — Canon Index

**Status:** 🔒 LOCKED v1.0
**Date:** 2026-04-30
**Approver:** NTS (verbatim approval 2026-04-30)
**Promoted by:** CLAC1 (Lane_01 dispatch via `LANE01-UZG-PLUS-V3-CANON-PROMOTE-AND-LOCK-V1`)
**Source:** `UZGPLUS/.lane_01/Canon/PWA_OS_V3_Oficial/` (NTS staging area)
**Authority:** `AMD_NTS_FULL_TECH_AUTONOMY` + `R-AUTH-01` (NTS canon approver)

---

## File registry

### UI Canon Layer (9 files)

| # | File | Tier | Purpose |
|---|---|---|---|
| 1 | [UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1.md](UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1.md) | T3 | OS architecture + 4 phần cố định (Foundation principles) |
| 2 | [UZG_PLUS_V3_UIUX_HOME_SOCIAL_CANON_v1.md](UZG_PLUS_V3_UIUX_HOME_SOCIAL_CANON_v1.md) | T4 | HOME / Value Stream module |
| 3 | [UZG_PLUS_V3_UIUX_CHAT_CANON_v1.md](UZG_PLUS_V3_UIUX_CHAT_CANON_v1.md) | T4 | CHAT / Telegram pattern module |
| 4 | [UZG_PLUS_V3_UIUX_WALLET_CANON_v1.md](UZG_PLUS_V3_UIUX_WALLET_CANON_v1.md) | T4 | WALLET / Binance-clean module |
| 5 | [UZG_PLUS_V3_UIUX_ENTA_CANON_v1.md](UZG_PLUS_V3_UIUX_ENTA_CANON_v1.md) | T4 | ENTA / Identity spine module |
| 6 | [UZG_PLUS_V3_UIUX_PLUS_HUB_CANON_v1.md](UZG_PLUS_V3_UIUX_PLUS_HUB_CANON_v1.md) | T4 | PLUS Hub / Springboard module |
| 7 | [UZG_PLUS_V3_UIUX_UREWARD_CANON_v1.md](UZG_PLUS_V3_UIUX_UREWARD_CANON_v1.md) | T4 | U-Reward / Connect-to-Earn module |
| 8 | [UZG_PLUS_V3_UIUX_TAO_CANON_v1.md](UZG_PLUS_V3_UIUX_TAO_CANON_v1.md) | T4 | TAO / Bazi+Tử Vi+Phong Thủy module |
| 9 | [UZG_PLUS_V3_UIUX_REDLINES_MASTER_v1.md](UZG_PLUS_V3_UIUX_REDLINES_MASTER_v1.md) | T3 | Cross-cutting redlines (~223) |

### UX Flow Layer (5 files)

| # | File | Tier | Purpose |
|---|---|---|---|
| 10 | [UZG_PLUS_V3_UX_HOME_FLOW_SPEC_v1.md](UZG_PLUS_V3_UX_HOME_FLOW_SPEC_v1.md) | T4 | HOME user journeys + state machines |
| 11 | [UZG_PLUS_V3_UX_CHAT_FLOW_SPEC_v1.md](UZG_PLUS_V3_UX_CHAT_FLOW_SPEC_v1.md) | T4 | CHAT user journeys + state machines |
| 12 | [UZG_PLUS_V3_UX_WALLET_FLOW_SPEC_v1.md](UZG_PLUS_V3_UX_WALLET_FLOW_SPEC_v1.md) | T4 | WALLET user journeys + state machines |
| 13 | [UZG_PLUS_V3_UX_ENTA_PLUS_TAO_FLOW_SPEC_v1.md](UZG_PLUS_V3_UX_ENTA_PLUS_TAO_FLOW_SPEC_v1.md) | T4 | ENTA + PLUS + TAO combined flows |
| 14 | [UZG_PLUS_V3_UX_UREWARD_FLOW_SPEC_v1.md](UZG_PLUS_V3_UX_UREWARD_FLOW_SPEC_v1.md) | T4 | U-Reward user journeys + state machines |

### Language OS Layer (1 file)

| # | File | Tier | Purpose |
|---|---|---|---|
| 15 | [UZG_PLUS_V3_LANGUAGE_OS_MAPPING_v1.md](UZG_PLUS_V3_LANGUAGE_OS_MAPPING_v1.md) | T4 | UI strings × LANG_OS resolver mapping (14 domains) |

---

## Authority hierarchy

1. **Tier 3** (T3) — Cross-cutting; override module canons on conflicts:
   - `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1.md`
   - `UZG_PLUS_V3_UIUX_REDLINES_MASTER_v1.md`
2. **Tier 4** (T4) — Module-specific; governed by Tier 3 above

When two T4 specs disagree → escalate to T3. When T3 disagrees with NTS verbatim instruction → NTS verbatim wins (R-AUTH-01).

---

## Canon amendment record

- **2026-04-30:** Initial promotion — all 15 files locked at v1.0.
- **2026-04-30 (later same day):** Foundation OS Canon amended v1.0 → v1.1. Locks Mockup #1 design pattern (8 reaction icons, transparent style, X.com feed pattern, quantum aesthetic guardrails, ENTA = Entanglement, U-Reward pill style, Bottom Nav center). 12-row summary in §A1.12. Audit: `LANE01-UZG-PLUS-V3-FOUNDATION-CANON-AMEND-V1-1`. NTS approval verbatim 2026-04-30.
- **Pending NTS approval:** LANG_OS canon amendment to add 2 new domains (`plus`, `ureward`) — proposal in `UZG_PLUS_V3_LANGUAGE_OS_MAPPING_v1.md` §1.

---

## Read order

For new contributors (Lane_01 / Lane_02 / Lane_03 / Lane_04 / Cursor / Codex), read in this order:

1. **Foundation** — `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1.md` (architecture + 4 fixed parts)
2. **Redlines** — `UZG_PLUS_V3_UIUX_REDLINES_MASTER_v1.md` (~223 cross-cutting rules)
3. **7 module UI canons:**
   1. HOME → 2. CHAT → 3. WALLET → 4. ENTA → 5. PLUS → 6. UREWARD → 7. TAO
4. **5 UX flow specs** (same module order):
   1. HOME flow → 2. CHAT flow → 3. WALLET flow → 4. ENTA+PLUS+TAO combined → 5. UREWARD flow
5. **Language OS Mapping** — `UZG_PLUS_V3_LANGUAGE_OS_MAPPING_v1.md` (last; references all upstream)

---

## Cross-repo replication

This canon set is replicated to two locations for cross-Lane access:

| Repo | Path | Role |
|---|---|---|
| `unitonzengarden/Uniton_Shared` | `canon/uzg-plus/uiux/v3/` | **Primary canon** (source of truth) |
| `unitonzengarden/uzgplus-app` | `docs/canon/v3/` | **Reference mirror** (read-only for Cursor / Codex frontend impl) |

Both copies must remain byte-identical. Discrepancy = INC-class incident → halt + investigate.

---

## Lock status

🔒 **LOCKED v1.0** — 2026-04-30

Modifications require:
- NTS verbatim approval (R-AUTH-01)
- Canon amendment record entry above
- New version (v1.1, v2.0, etc.)
- Audit log entry in `audits/ecosystem/uzg-plus/canon-promotion/`
- Re-replication to both repos (Uniton_Shared primary + uzgplus-app mirror) in lock-step

---

## Phase 2 dependency note

This canon set unblocks **Phase 2 mockup work** per [LANE01-UZG-PLUS-PHASE2-MOCKUP-PRIORITY-BRIEF-V1](../../../../audits/ecosystem/uzg-plus/UZG_PLUS_V3_PHASE2_MOCKUP_PRIORITY_BRIEF_v1.md) §7. Specifically:

- **ENTA Module canon authored** (v3 §5) → unblocks priority P1 (Public ENTA) + P8 (Onboarding archetype)
- **PLUS Hub Module canon authored** (v3 §6) → unblocks P5 (Governance) + P6 (AIER UX) + P7 (Marketplace)

5 of 10 Top 10 V3 priorities now mockup-ready. Phase 2 sprint board can be created.

---

End of INDEX.
