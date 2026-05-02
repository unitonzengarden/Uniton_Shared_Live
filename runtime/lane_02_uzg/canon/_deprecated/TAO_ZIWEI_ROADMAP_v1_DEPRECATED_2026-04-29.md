# **TAO ZIWEI ROADMAP v1.0**

## **Build sequence for TAO V2 (Tử Vi) module — UZG+ ecosystem**

---

**Document ID:** TAO_ZIWEI_ROADMAP_v1
**Version:** 1.0
**Effective Date:** 2026-04-25
**Authority Level:** Tier 3 (extends SPEC, sequenced execution)
**Parent docs:**
- `TAO_ZIWEI_CANON_OFFICIAL_v1.md`
- `TAO_ZIWEI_SYSTEM_LAW_v1.md`
- `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.md`
- `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.md`
- `TAO_ZIWEI_UI_UX_CANON_v1.md`
**Status:** PROPOSED — awaiting NTS approval
**Note:** This document is a fresh draft based on Master Stack Section F. Build sequence aligned with UZG+ Phase plan.

---

## **Purpose**

Document này khóa **trình tự build** TAO V2 module: phase nào trước, phase nào sau, từng phase ship gì, dependency giữa phase. Roadmap không phải task list (đó là BUILD_TASK_MAP), mà là sequence-level plan.

Roadmap respect 2 nguyên tắc:
1. **Foundation trước, surface sau** — engine + data model + audit trước UI
2. **MVP-first, expansion-later** — Phase 1 ship được lá số + reading cơ bản; advanced features (compatibility, multi-language, expert tools) defer

---

# **PHASE 0 — FOUNDATION (Documentation lock)**

**Status:** ✅ DONE (2026-04-25)

**Deliverables:**
- ✅ `TAO_ZIWEI_CANON_OFFICIAL_v1.md`
- ✅ `TAO_ZIWEI_SYSTEM_LAW_v1.md`
- ✅ `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.md`
- ✅ `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.md`
- ✅ `TAO_ZIWEI_UI_UX_CANON_v1.md`
- ✅ `TAO_ZIWEI_ROADMAP_v1.md` (this doc)
- ✅ `TAO_ZIWEI_BUILD_TASK_MAP_v1.md`

**Exit criteria:** All 7 docs NTS-approved, committed to `D:\UZG\Projects-v2\uzgplus\docs\TAO\` (when promoted from `_cla_drafts/`).

**Blocker for Phase 1:** Lane 1 (Vultr) ship `Uniton_Shared` repo with skill scaffolds. TAO Phase 1 needs canonical skill format to integrate.

---

# **PHASE 1 — CORE MVP (Engine + minimal surface)**

**Goal:** Working chart engine + natal reading + basic annual reading. No AIER Tao yet, no Circle Business hooks yet.

**Estimated effort:** 3-4 weeks (CLAC-2 implementation + CLA-2 review)

## **Phase 1.1 — Calendar + Input layer**
- Implement Calendar Normalization Engine (SPEC §3.7)
- Implement timezone resolver + leap month policy
- Input validation gate (SPEC §3.8)
- ENTA Identity Binder (read-only consume from ENTA)

## **Phase 1.2 — Chart engines core**
- Palace mapping (SPEC §4-5)
- Cục determination (SPEC §6)
- 14 main stars placement (SPEC §7)
- Auxiliary stars (SPEC §8) — minimal set first (Văn Xương, Văn Khúc, Tả Phụ, Hữu Bật, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp)
- Lộc Tồn ring (SPEC §9.1)
- Tứ Hóa natal (SPEC §10.1-10.4)

## **Phase 1.3 — Output schema + storage**
- Chart object JSON schema (SPEC §12.4)
- Supabase tables (`ziwei_charts` JSONB + auxiliary normalized)
- Audit log + version control (SPEC §13.2)

## **Phase 1.4 — Test set + regression**
- NTS audit case as canonical test (V3 §7.9 + Appendix B.10)
- 3 cross-source comparison cases (lyso.vn / tuviglobal / manual)
- CI regression on `formula_version` bump

## **Phase 1.5 — Minimal UI**
- TAO Overview surface (UI/UX §2.1)
- Natal Chart surface (UI/UX §2.2)
- Membership gate (free tier sample, member tier full)
- QOT trace (UI/UX §3.5)

**Exit criteria:**
- Chart engine matches NTS audit case 100%
- Cross-source diff < 5% on 3 reference charts
- Test suite green on CI
- UI passes redline checklist (UI/UX §5)

---

# **PHASE 2 — GUIDED INTELLIGENCE (Reading + AIER)**

**Goal:** Life Reading + Annual Reading + AIER Tao advisory (bounded).

**Estimated effort:** 3-4 weeks

## **Phase 2.1 — Life Reading layer**
- Reading engine consumes chart_object → produces reading_object
- Sections per UI/UX §2.3 (Tính cách / Nghề / Tài / Hôn nhân / Sức khỏe / Quan hệ / Nhịp)
- Each section grounded on palace + star + ring evidence
- Output schema in SPEC §3.4

## **Phase 2.2 — Annual / Cycle Reading layer**
- Annual reading consumes lưu niên overlay (SPEC §11.3)
- Đại vận transition awareness
- Timeline view per UI/UX §2.4
- Window framing (no "lucky/unlucky day")

## **Phase 2.3 — AIER Tao Context Engine**
- AIER context pack generation (Architecture §6.1)
- System prompt template enforcing LAW + REDLINE compliance
- Bounded reply enforcement (LAW 9)
- Output filter: no fear language (LAW 5), no determinism (LAW 4), no thầy-phán (REDLINE 3)

## **Phase 2.4 — Cross-module integration**
- Wallet trigger: U for first reading completion (UZG+ Global Loop)
- PLUS Hub mini app entry registered
- HOME content card type: TAO insight (with QOT trace)
- ENTA → TAO pre-fill flow

**Exit criteria:**
- Life reading + Annual reading ship for member tier
- AIER Tao session works end-to-end, passes 50 conversation safety tests
- Cross-module flows verified (PLUS → TAO → AIER → Wallet)

---

# **PHASE 3 — COMMERCE & COMMUNITY (Service hooks)**

**Goal:** Premium tier features + Circle Business integration.

**Estimated effort:** 3-4 weeks

## **Phase 3.1 — Premium reading modes**
- Period Reading (Đại vận deep dive)
- Event Reading (user question grounded on chart)
- Compatibility Reading (2-chart relational)

## **Phase 3.2 — Service layer**
- Booking consultation (expert reading, paid)
- Workshop / livestream entry from TAO surface
- Private circles / premium channels invitation flow

## **Phase 3.3 — Membership upgrade flow**
- Polite upgrade CTAs in correct surfaces (per UI/UX §3.4)
- Service recommendation triggered only on grounded reading state (LAW 8)
- Conversion tracking (no fear-based pressure)

**Exit criteria:**
- Premium tier reading modes ship
- Booking flow works, payment via Wallet (UZG → Credit per Master Economy)
- Service recommendation fires correctly per LAW 8

---

# **PHASE 4 — EXPANDED TAO STACK**

**Goal:** Bazi (V1) + Ziwei (V2) integration, multi-language, expert operator tools.

**Estimated effort:** 4-6 weeks (defer until Phase 1-3 stable)

## **Phase 4.1 — Bazi + Ziwei combined**
- TAO V1 (Bazi) integration with V2 chart object
- Cross-system reading (e.g., Bazi 4-pillar + Ziwei chart on same user)

## **Phase 4.2 — Team / Family / Business compatibility**
- Multi-chart relational analysis
- Team chart aggregation (for business community use)

## **Phase 4.3 — Expert operator tools**
- Expert dashboard for paid readers
- Annotation layer on user charts (with permission)
- Booking management

## **Phase 4.4 — Multilingual**
- English content layer
- Reading translations (manual, not auto)
- Cultural adaptation for non-Vietnamese audience

**Exit criteria:** TBD — defer specifying until Phase 3 ships and learnings inform Phase 4 priorities.

---

# **DEPENDENCIES & BLOCKERS**

| Dependency | Source | Blocks |
|---|---|---|
| `Uniton_Shared` repo with skill scaffolds | Lane 1 (Vultr) | Phase 1 (skill integration) |
| ENTA module live for identity binding | UZG+ ENTA team | Phase 1.1 |
| Wallet module live for U triggers | UZG+ Wallet team | Phase 2.4 |
| PLUS Hub mini app launcher | UZG+ PLUS Hub team | Phase 2.4 |
| AIER Tao runtime infrastructure | Lane 1 + UZG+ AI team | Phase 2.3 |
| QOT trace infrastructure | UZG+ QOT team | Phase 1.3 |

**TAO Phase 1 cannot start until:** Uniton_Shared ready + ENTA identity API contract locked.

---

# **MILESTONES**

| Milestone | Target | Definition of done |
|---|---|---|
| M0: Docs locked | 2026-04-25 | All 7 TAO docs NTS-approved |
| M1: Engine core ships | Phase 1.4 done | Chart engine matches NTS case + CI green |
| M2: MVP product live | Phase 1.5 done | Member can create chart + see Natal reading |
| M3: AIER Tao live | Phase 2.3 done | AIER Tao session passes safety tests |
| M4: Premium tier live | Phase 3.3 done | Premium reading modes + booking flow ship |
| M5: Stack expansion | Phase 4 done | Bazi + Ziwei integrated, multilingual ready |

---

# **AMENDMENT RULE**

Roadmap amendments require:
1. Proposal as `TAO_ZIWEI_ROADMAP_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Cannot contradict Canon, LAW, Architecture, SPEC
4. Phase reordering allowed if dependency analysis justifies
5. New phase addition allowed (mark as Phase 5+, do not insert)
6. Old version archived
