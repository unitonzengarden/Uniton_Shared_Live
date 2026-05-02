# **TAO BAZI ROADMAP v1.0**

## **Build sequence for TAO V1 (Bazi / Tứ Trụ) + TAO V3 (Phong Thủy) module — UZG+ ecosystem**

---

**Document ID:** TAO_BAZI_ROADMAP_v1
**Version:** 1.1 (school decision lock)
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge)
**Authority Level:** Tier 3 — extends SPEC, sequenced execution
**Parent docs:**
- `TAO_ZIWEI_CANON_OFFICIAL_v1.md`
- `TAO_BAZI_SYSTEM_LAW_v1.md`
- `TAO_BAZI_SYSTEM_ARCHITECTURE_v1.md`
- `TAO_BAZI_IMPLEMENTATION_SPEC_v1.md`
- `TAO_BAZI_UI_UX_CANON_v1.md`
- `TAO_BAZI_PHONGTHUY_REFERENCE_v1.md`
**Sibling roadmap:** `TAO_ZIWEI_ROADMAP_v1.md`
**Companion task map:** `TAO_BAZI_BUILD_TASK_MAP_v1.md` (planned, ships when this Roadmap NTS-approved)
**Status:** ⏳ DRAFT — pending NTS approval
**Issued by:** CLA-2 (Lane_02)

---

## **§0 — PURPOSE**

Document này khóa **trình tự build** TAO V1 (Bazi) + TAO V3 (Phong Thủy) module: phase nào trước, phase nào sau, từng phase ship gì, dependency giữa các phase, và sync points với TAO V2 (Tử Vi) parallel build.

Roadmap không phải task list (đó là `TAO_BAZI_BUILD_TASK_MAP_v1`), mà là **sequence-level plan**.

Roadmap respect 3 nguyên tắc:
1. **Foundation trước, surface sau** — engine + data model + audit trước UI
2. **Reuse trước duplicate** — leverage shared calendar engine từ TAO V2
3. **MVP-first, expansion-later** — Phase 1 ship Bazi 4-pillar + Cung Mệnh basic; advanced features (Phi Tinh full, compatibility) defer

---

# **PHASE 0 — FOUNDATION (Documentation lock)**

**Status:** ✅ Mostly DONE (2026-04-29)

## **§0.1 — Deliverables completed**

- ✅ `TAO_ZIWEI_CANON_OFFICIAL_v1.md` (shared with TAO V2)
- ✅ `TAO_BAZI_PHONGTHUY_REFERENCE_v1.md` (Tier 3 — formulas)
- ✅ `TAO_BAZI_SYSTEM_LAW_v1.md` (Tier 2 — operational law)
- ✅ `TAO_BAZI_UI_UX_CANON_v1.md` (Tier 2 — UI surfaces)
- ✅ `TAO_BAZI_SYSTEM_ARCHITECTURE_v1.md` (Tier 2 — layers)
- ✅ `TAO_BAZI_IMPLEMENTATION_SPEC_v1.md` (Tier 2 — build detail)
- ✅ `TAO_BAZI_ROADMAP_v1.md` (this doc)

## **§0.2 — Pending**

- ⏳ NTS approval of all 6 docs above
- ⏳ `TAO_BAZI_BUILD_TASK_MAP_v1.md` (Tier 3 — task IDs T-BAZI-XXX, T-PT-XXX) — ships after NTS approves Roadmap

## **§0.3 — Exit criteria**

Phase 0 → Phase 1 transition allowed when:
- All 6 docs above NTS-approved
- TAO V2 Phase 0 also complete (so Bazi can leverage same calendar engine)
- BUILD_TASK_MAP shipped

---

# **PHASE 1 — BAZI CORE MVP (Engine + minimal surface)**

**Goal:** Working 4-pillar Bazi engine + Day Master analysis + minimal UI. No Useful God advanced reading yet, no compatibility yet, no Phong Thủy yet.

**Estimated effort:** 2-3 weeks (CLAC-2 implementation + CLA-2 review)

**Dependencies:** TAO V2 Phase 1 must ship first (because Bazi reuses calendar engine).

## **§1.1 — Phase 1.1 — Bazi engine core**

- T-BAZI-001 — Pillar Construction Engine (4 pillars from calendar)
  - Year pillar with Tết Nguyên Đán boundary (VN-school, same as Tử Vi)
  - Month pillar with lunar month boundary (VN-school, same as Tử Vi)
  - Day pillar (reuse calendar)
  - Hour pillar (with Tý phase)
- T-BAZI-002 — Day Master Engine (lookup)
- T-BAZI-003 — Hidden Stems Engine (Tàng Can lookup)
- T-BAZI-004 — Element Distribution Engine

## **§1.2 — Phase 1.2 — Bazi analysis layer**

- T-BAZI-005 — Day Master Strength Engine (composite seasonal + element)
- T-BAZI-006 — Ten Gods Engine (Thập Thần)
- T-BAZI-007 — Twelve Stages Engine (per stem)
- T-BAZI-008 — Pillar Relations Engine (hợp/khắc/hình/xung/hại/phá)

## **§1.3 — Phase 1.3 — Output schema + storage**

- T-BAZI-009 — Bazi Chart Object schema + Supabase storage
- T-BAZI-010 — Audit log + version control hooks

## **§1.4 — Phase 1.4 — Test set + regression**

- T-BAZI-011 — NTS Bazi audit case as canonical fixture
- T-BAZI-012 — Cross-source comparison (Joey Yap + VN tools) — 50 random cases
- T-BAZI-013 — CI regression on `formula_version` bump
- T-BAZI-014 — LAW 3 cross-engine integrity test (ALL 4 pillars Bazi = ALL 4 pillars Tử Vi, full alignment)

## **§1.5 — Phase 1.5 — Minimal UI**

- T-BAZI-015 — Bazi Overview surface (UI/UX §2.1)
- T-BAZI-016 — 4 Pillars Chart surface (UI/UX §2.2)
- T-BAZI-017 — Day Master Analysis surface (UI/UX §2.3, Member-gated)

## **§1.6 — Exit criteria**

- Bazi engine matches NTS audit case 100%
- Cross-source diff < 5% on 50 reference charts
- Test suite green on CI
- LAW 3 integrity tests pass (Bazi-Tử Vi pillars consistent)
- UI passes redline checklist (UI/UX §6)

---

# **PHASE 2 — BAZI ADVANCED + PHONG THỦY BASICS**

**Goal:** Useful God reading + Luck Pillars timeline + Phong Thủy Cung Mệnh + Bát Trạch.

**Estimated effort:** 3-4 weeks

## **§2.1 — Phase 2.1 — Useful God + Luck Pillars**

- T-BAZI-018 — Useful God Engine (Dụng Thần selection rules)
- T-BAZI-019 — Cùng Thông seasonal adjustment (advanced opt-in)
- T-BAZI-020 — Luck Pillars Engine (Đại Vận 8-cycle)
- T-BAZI-021 — Useful God Reading surface (Premium-gated)
- T-BAZI-022 — Luck Pillars Timeline surface (Premium-gated)

## **§2.2 — Phase 2.2 — Phong Thủy basics**

- T-PT-001 — Cung Mệnh Engine (year + gender → trigram)
- T-PT-002 — Bát Trạch Engine (8-direction matrix)
- T-PT-003 — Phong Thủy Profile schema + storage
- T-PT-004 — Phong Thủy Overview surface (free)
- T-PT-005 — Bát Trạch Profile surface (Member-gated)

## **§2.3 — Phase 2.3 — Cross-module integration**

- T-BAZI-023 — Bazi → ENTA element upgrade flow (per ARCH §11.2)
- T-BAZI-024 — Bazi → Lịch Vạn Niên enhanced day energy (per FORMULA_REF §15)
- T-PT-006 — Phong Thủy → ENTA awareness
- T-BAZI-025 — Wallet U-reward trigger on first Bazi reading

## **§2.4 — Exit criteria**

- Useful God reading ships for Premium tier
- Luck Pillars timeline functional
- Phong Thủy basic profile (Cung Mệnh + Bát Trạch) works for Member tier
- ENTA upgrade chain working end-to-end
- Lịch Vạn Niên day energy enhanced when user has Bazi

---

# **PHASE 3 — RESIDENCE + AIER ADVISORY**

**Goal:** Residence Mapping for Phong Thủy + AIER Bazi/Phong Thủy chat sessions.

**Estimated effort:** 3-4 weeks

## **§3.1 — Phase 3.1 — Residence data layer**

- T-PT-007 — Residence input form + privacy consent flow (per LAW 12)
- T-PT-008 — Encryption-at-rest infrastructure (AES-256 for address + floor plan)
- T-PT-009 — Residence audit log + access control
- T-PT-010 — Right-to-be-forgotten DELETE flow
- T-PT-011 — Direction Utilities (compass to direction)

## **§3.2 — Phase 3.2 — Residence Mapping surface**

- T-PT-012 — Residence Mapping UI (Member tier with residence opt-in)
- T-PT-013 — Privacy badges UX (lock icons, edit/delete buttons)
- T-PT-014 — Floor plan visualization (basic)

## **§3.3 — Phase 3.3 — AIER Bazi/Phong Thủy advisor**

- T-BAZI-026 — AIER Bazi Context Engine (context pack for Bazi)
- T-BAZI-027 — AIER Bazi system prompt template enforcing LAW + REDLINE
- T-BAZI-028 — Output filter (no thầy-phán, no fortune claims)
- T-BAZI-029 — 50 conversation safety tests (Bazi advisor)
- T-PT-015 — AIER Phong Thủy Context Engine
- T-PT-016 — AIER Phong Thủy system prompt + output filter
- T-PT-017 — 50 conversation safety tests (Phong Thủy advisor)

## **§3.4 — Exit criteria**

- Residence Mapping ships for Member tier
- LAW 12 compliance verified (encryption, deletion, audit)
- AIER Bazi advisor passes 50 safety tests
- AIER Phong Thủy advisor passes 50 safety tests
- AIER context pack expanded to handle Bazi + Phong Thủy contexts

---

# **PHASE 4 — PREMIUM FEATURES**

**Goal:** Phi Tinh + Compatibility + Annual Bazi reading.

**Estimated effort:** 3-4 weeks

## **§4.1 — Phase 4.1 — Cửu Cung Phi Tinh**

- T-PT-018 — Flying Stars Engine (period base + annual + monthly)
- T-PT-019 — Lo Shu sequence implementation
- T-PT-020 — Phi Tinh chart visualization (9-palace grid)
- T-PT-021 — Phi Tinh basic surface (Member-gated)
- T-PT-022 — Phi Tinh full surface with residence (Premium-gated)
- T-PT-023 — Daily flying star alerts (Premium + residence required)

## **§4.2 — Phase 4.2 — Bazi compatibility**

- T-BAZI-030 — Compatibility Engine (2-chart relational analysis)
- T-BAZI-031 — Pillar interaction map visualization
- T-BAZI-032 — Compatibility Reading surface (Premium)
- T-BAZI-033 — Shared link consent flow (for partner's chart)

## **§4.3 — Phase 4.3 — Annual Bazi reading**

- T-BAZI-034 — Lưu niên pillar interaction with natal pillars
- T-BAZI-035 — Annual Bazi reading surface (Premium)

## **§4.4 — Exit criteria**

- Phi Tinh charts work for both basic period awareness (Member) and full residence-specific (Premium)
- Compatibility check ships with proper REDLINE 4 framing (relational tendency, not verdict)
- Annual Bazi reading available for Premium users

---

# **PHASE 5 — INTEGRATION & POLISH**

**Goal:** Combined Bazi + Tử Vi reading mode + service hooks + Vạn Niên deep integration.

**Estimated effort:** 3-4 weeks

## **§5.1 — Phase 5.1 — Combined Bazi + Tử Vi reading**

- T-BAZI-036 — Combined Reading Engine (per ARCH §11.4)
- T-BAZI-037 — Cross-module reconciliation framing (avoid contradictions)
- T-BAZI-038 — Combined Reading surface (Premium)

## **§5.2 — Phase 5.2 — Service hooks**

- T-BAZI-039 — Booking expert Bazi consultation (Circle Business integration)
- T-PT-024 — Booking expert Phong Thủy on-site visit
- T-PT-025 — Vendor verification system for Phong Thủy products (if marketplace launches)

## **§5.3 — Phase 5.3 — Polish**

- T-BAZI-040 — Performance optimization (caching, latency)
- T-PT-026 — Accessibility audit
- T-BAZI-041 — i18n preparation (Vietnamese-first, English Phase 2)

## **§5.4 — Exit criteria**

- Combined Bazi + Tử Vi reading available with reconciliation framing
- Service booking flow works for both Bazi consultation and Phong Thủy visit
- All performance budgets met (per ARCH §13)
- Accessibility WCAG 2.1 AA compliant

---

# **PHASE 6 — EXPANSION (deferred)**

**Goal:** Multilingual, expert tools, advanced research features.

**Estimated effort:** 4-6 weeks (defer until Phase 1-5 stable)

## **§6.1 — Phase 6.1 — Multilingual**

- English content layer
- Reading translations (manual, not auto)
- Cultural adaptation

## **§6.2 — Phase 6.2 — Expert operator tools**

- Expert dashboard for paid Bazi readers
- Annotation layer on user charts (with consent)
- Expert booking management

## **§6.3 — Phase 6.3 — Advanced research features**

- Multi-chart family analysis (parent + children)
- Business team Bazi analysis
- Long-term forecasting beyond 8 đại vận

**Exit criteria:** TBD — defer specifying until Phase 5 ships and learnings inform Phase 6 priorities.

---

# **DEPENDENCIES & BLOCKERS**

| Dependency | Source | Blocks |
|---|---|---|
| TAO V2 (Tử Vi) Phase 1 | TAO V2 build team | Bazi Phase 1 (shared calendar engine) |
| `Uniton_Shared` repo with skill scaffolds | Lane 1 (Vultr) | Bazi Phase 1 |
| ENTA module live | UZG+ ENTA team | Bazi Phase 1.1 (identity binding) |
| Wallet module live | UZG+ Wallet team | Phase 2.3 (U-reward trigger) |
| PLUS Hub mini app launcher | UZG+ PLUS Hub team | Phase 1.5 (UI entry) |
| AIER Tao runtime infrastructure | Lane 1 + UZG+ AI team | Phase 3.3 |
| QOT trace infrastructure | UZG+ QOT team | Phase 1.3 |
| Encryption service (AES-256) | UZG+ security team | Phase 3.1 (residence data) |

**TAO V1/V3 Phase 1 cannot start until:** TAO V2 Phase 1 done + Uniton_Shared ready + ENTA live + Encryption service operational.

---

# **PARALLELISM WITH TAO V2 (TỬ VI)**

TAO V1 (Bazi) and TAO V2 (Tử Vi) build can parallel after Phase 0 docs lock + calendar engine ships:

```
Calendar Engine (T-TAO-001 + T-TAO-002 + T-TAO-003 from Tử Vi roadmap)
        ↓
        ├──── Tử Vi Phase 1.2-1.5 (palace + stars + UI)
        └──── Bazi Phase 1.1-1.5 (pillars + analysis + UI)
        
        Then both modules can develop independently.
```

**Sync points:**
- Calendar engine shared throughout (any version bump affects both)
- ENTA module integration (single integration point benefits both)
- AIER advisor wrapper (single wrapper supports both AIER Bazi + AIER Tử Vi)
- Lịch Vạn Niên integration (both modules contribute to enhanced day energy)

---

# **MILESTONES**

| Milestone | Target | Definition of done |
|---|---|---|
| M0: Docs locked | 2026-04-29 → NTS approval target | All 6 TAO V1/V3 docs NTS-approved |
| M1: Bazi engine ships | Phase 1.4 done | Bazi engine matches NTS audit case + CI green |
| M2: Bazi MVP product live | Phase 1.5 done | Member can create Bazi chart + see Day Master |
| M3: Phong Thủy basic live | Phase 2.2 done | Member can see Cung Mệnh + Bát Trạch |
| M4: Useful God + Luck Pillars live | Phase 2.4 done | Premium can see advanced Bazi readings |
| M5: Residence + AIER live | Phase 3.4 done | Member can opt-in residence; AIER Bazi/PT chat works |
| M6: Premium features live | Phase 4.4 done | Phi Tinh + Compatibility + Annual Bazi ship |
| M7: Combined reading + service | Phase 5.4 done | Bazi + Tử Vi combined reading + booking flow |
| M8: Expansion | Phase 6 done | Multilingual + expert tools ready |

---

# **RISK & MITIGATION**

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Bazi-Tử Vi divergence at month boundary confuses users | High | Medium | UI/UX explicit explanation; both shown clearly with note |
| Useful God selection algorithm produces inconsistent results across edge cases | Medium | High | 50+ case validation, document edge cases, allow user override with note |
| Residence data privacy concern from users | Medium | High | LAW 12 strict compliance; clear consent flow; deletion right always visible |
| Phong Thủy product upsell pressure from business team | Medium | High | LAW 6 + REDLINE 5 gate at review; no exceptions |
| AIER context pack too large with all 3 modules | Low | Medium | Compress chart summaries; token-budget gate |
| Period 9 (Cửu Tử) era hype distracts from neutral framing | Medium | Medium | UI/UX neutral language enforcement; education-first |

---

# **AMENDMENT RULE**

Roadmap amendments require:
1. Proposal as `TAO_BAZI_ROADMAP_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Cannot contradict Canon, SYSTEM_LAW, ARCHITECTURE, SPEC
4. Phase reordering allowed if dependency analysis justifies
5. New phase addition allowed (Phase 7+, do not insert)
6. Old version archived

---

# **VERSION LOG**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-29 | Initial — TAO V1 + V3 build sequence |
| v1.1 | 2026-04-29 | NTS school lock: T-BAZI-001 description updated to VN-school (Tết year + lunar month). T-BAZI-014 LAW 3 integrity test now requires ALL pillars match. |

---

# **SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.1 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ awaiting | — |
| Effective | — | ⏳ pending | — |

**END — TAO_BAZI_ROADMAP_v1**
