# **TAO ZIWEI BUILD TASK MAP v1.0**

## **Executable task list for TAO V2 (Tử Vi) module — UZG+ ecosystem**

---

**Document ID:** TAO_ZIWEI_BUILD_TASK_MAP_v1
**Version:** 1.0
**Effective Date:** 2026-04-25
**Authority Level:** Tier 3 (extends Roadmap, ships task IDs for CLAC-2 / Codex)
**Parent docs:** All 6 prior TAO docs (Canon, LAW, Architecture, SPEC, UI/UX, Roadmap)
**Status:** PROPOSED — awaiting NTS approval

---

## **Purpose**

Document này là **task ID registry** cho TAO V2 build. Mỗi task có:
- T-ID (executable)
- Source: which SPEC section / Architecture component / UI surface
- Phase mapping (Phase 1.x / 2.x / 3.x / 4.x)
- Acceptance criteria summary
- Estimated complexity (S / M / L)
- Dependency on prior tasks
- Executor (CLAC-2 default for Desktop stream)

Task này KHÔNG phải task prompt đầy đủ. Khi NTS sẵn sàng dispatch, CLA-2 sẽ ship full task prompt theo `LAW_N5_TASK_PROMPT_v2_2026-04-25.md` + `TASK_PROMPT_TEMPLATE_v2.2_2026-04-25.md` cho từng T-ID.

---

# **TASK MAP**

## **PHASE 1 TASKS — Core MVP**

### **T-TAO-001 — Calendar Normalization Engine**
- **Phase:** 1.1
- **Source:** SPEC Part 1 §3.7 + Appendix C (timezone gates)
- **Scope:** Implement solar→lunar conversion + Can-Chi mapping + leap month policy + timezone resolver
- **AC summary:**
  - Convert solar datetime to lunar with leap_month_flag
  - Output Can-Chi for year/month/day/hour
  - Handle hour Tý phase (early/late) per Appendix C §C.3
  - Pass NTS audit case calendar conversion
- **Complexity:** L (high — many edge cases)
- **Dependency:** None
- **Executor:** CLAC-2

### **T-TAO-002 — Input Validation + ENTA Binding**
- **Phase:** 1.1
- **Source:** SPEC Part 2 §3.0-3.8 + Architecture §2
- **Scope:** Input validation gate + reuse ENTA profile if exists + confidence scoring
- **AC summary:**
  - Reject invalid input with clear error per LAW 2
  - Reuse ENTA profile per LAW 3 (no duplicate input)
  - Score input confidence
- **Complexity:** M
- **Dependency:** T-TAO-001 (uses calendar normalization)
- **Executor:** CLAC-2

### **T-TAO-003 — Palace + Cục Mapping**
- **Phase:** 1.2
- **Source:** SPEC Part 3-5 (PHẦN 4-6 V3)
- **Scope:** An 12 cung địa chi, an thiên can cho 12 cung, an Mệnh + Thân, xác định Cục
- **AC summary:**
  - 12 palaces correctly placed
  - Mệnh + Thân match NTS audit case
  - Cục determined correctly per Can year + Mệnh palace
- **Complexity:** M
- **Dependency:** T-TAO-001, T-TAO-002
- **Executor:** CLAC-2

### **T-TAO-004 — 14 Main Stars Placement**
- **Phase:** 1.2
- **Source:** SPEC Part 6 (PHẦN 7 V3)
- **Scope:** An sao Tử Vi from Cục + birth day, an vòng Tử Vi (6 stars), an vòng Thiên Phủ (8 stars)
- **AC summary:**
  - All 14 main stars placed
  - Match NTS test case §7.9
  - Cross-validation against lyso.vn + tuviglobal
- **Complexity:** L
- **Dependency:** T-TAO-003
- **Executor:** CLAC-2

### **T-TAO-005 — Auxiliary Stars (minimal set)**
- **Phase:** 1.2
- **Source:** SPEC Part 7 (PHẦN 8 V3) + Appendix E
- **Scope:** Minimal aux stars: Văn Xương, Văn Khúc, Tả Phụ, Hữu Bật, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp
- **AC summary:**
  - All 8 minimal aux stars placed
  - Match audit case
- **Complexity:** M
- **Dependency:** T-TAO-004
- **Executor:** CLAC-2

### **T-TAO-006 — Lộc Tồn Ring**
- **Phase:** 1.2
- **Source:** SPEC Part 8 (PHẦN 9.1 V3)
- **Scope:** An vòng Lộc Tồn (12 stars) theo Can year
- **AC summary:**
  - Lộc Tồn ring placed per Can year
  - Bác Sĩ + 11 followers correct
- **Complexity:** S
- **Dependency:** T-TAO-005
- **Executor:** CLAC-2

### **T-TAO-007 — Tứ Hóa Natal**
- **Phase:** 1.2
- **Source:** SPEC Part 9 (PHẦN 10.1-10.4 V3)
- **Scope:** Compute natal Tứ Hóa (Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ) per Can year
- **AC summary:**
  - 4 Tứ Hóa markers placed correctly
  - Match audit case
- **Complexity:** S
- **Dependency:** T-TAO-004
- **Executor:** CLAC-2

### **T-TAO-008 — Chart Object Schema + Storage**
- **Phase:** 1.3
- **Source:** SPEC Part 11 (PHẦN 12 V3)
- **Scope:** Implement chart_metadata + natal_chart + cycle_layers + validation as JSONB in Supabase + auxiliary normalized tables
- **AC summary:**
  - Chart object validates against JSON schema
  - Round-trip Supabase storage works
  - Audit log + version field present
- **Complexity:** M
- **Dependency:** T-TAO-001 through T-TAO-007
- **Executor:** CLAC-2

### **T-TAO-009 — Test Set + Regression CI**
- **Phase:** 1.4
- **Source:** SPEC Part 12 (PHẦN 13.3 V3)
- **Scope:** NTS audit case as fixture + 3 cross-source comparison + CI workflow
- **AC summary:**
  - NTS case 100% match
  - Cross-source diff <5% on 3 reference charts
  - CI runs regression on every formula_version bump
- **Complexity:** M
- **Dependency:** T-TAO-008
- **Executor:** CLAC-2

### **T-TAO-010 — TAO Overview Surface (UI)**
- **Phase:** 1.5
- **Source:** UI/UX §2.1 + §3-4
- **Scope:** Build TAO Overview React surface in `apps/tao/ui/overview/`
- **AC summary:**
  - Renders ENTA-aware preview if chart exists
  - "Tạo lá số" CTA if no chart
  - Membership status indicator
  - QOT trace icon
  - Passes redline checklist (UI/UX §5)
- **Complexity:** M
- **Dependency:** T-TAO-008 (needs chart API)
- **Executor:** CLAC-2

### **T-TAO-011 — Natal Chart Surface (UI)**
- **Phase:** 1.5
- **Source:** UI/UX §2.2
- **Scope:** Build Natal Chart visualization (12 cung grid, stars, rings overlay toggle)
- **AC summary:**
  - All 14 main stars + auxiliary visible
  - Tap palace → bottom sheet with detail
  - Ring overlay toggle works
  - Tứ Hóa markers with explanation
  - Visual passes UI/UX §3.1 palette + typography
- **Complexity:** L
- **Dependency:** T-TAO-008
- **Executor:** CLAC-2

### **T-TAO-012 — Phase 1 Integration + Acceptance**
- **Phase:** 1.5
- **Source:** Architecture §10 (integration points)
- **Scope:** End-to-end test: PLUS Hub → TAO → create chart → view Natal → QOT trace works
- **AC summary:**
  - Full flow works in dev environment
  - Free tier shows sample chart
  - Member tier creates personal chart
  - Phase 1 redline checklist passes
- **Complexity:** M
- **Dependency:** T-TAO-001 through T-TAO-011
- **Executor:** CLAC-2 + CLA-2 review

---

## **PHASE 2 TASKS — Reading + AIER**

### **T-TAO-013 — Life Reading Engine**
- **Phase:** 2.1
- **Source:** SPEC reading sections + UI/UX §2.3
- **Scope:** Reading engine consumes chart_object → produces reading_object with 7 sections
- **AC summary:**
  - All 7 sections grounded on palace + star evidence
  - No deterministic language (LAW 4)
  - QOT trace per section
- **Complexity:** L
- **Dependency:** Phase 1 done
- **Executor:** CLAC-2

### **T-TAO-014 — Annual / Cycle Reading Engine**
- **Phase:** 2.2
- **Source:** SPEC Part 10 (PHẦN 11 V3) + Appendix B
- **Scope:** Compute lưu niên overlay + đại vận transition + timeline windows
- **AC summary:**
  - Lưu niên Tứ Hóa correct for current year
  - Timeline view shows windows (no "lucky/unlucky day")
  - Transition alerts when applicable
- **Complexity:** L
- **Dependency:** T-TAO-013
- **Executor:** CLAC-2

### **T-TAO-015 — AIER Tao Context Engine**
- **Phase:** 2.3
- **Source:** Architecture §6 + LAW SECTION C
- **Scope:** Generate AIER context pack + system prompt template + output filter
- **AC summary:**
  - Context pack includes chart + reading + history + governance rules
  - System prompt enforces LAW + REDLINE
  - Output filter blocks fear language, determinism, thầy-phán tone
  - 50 conversation safety tests pass
- **Complexity:** L
- **Dependency:** T-TAO-013, T-TAO-014
- **Executor:** CLAC-2 + CLA-2 prompt engineering

### **T-TAO-016 — Cross-Module Integration**
- **Phase:** 2.4
- **Source:** Architecture §10
- **Scope:** Wire Wallet U trigger + PLUS Hub mini app + HOME content card + ENTA pre-fill
- **AC summary:**
  - U credited on first reading completion
  - PLUS Hub registers TAO mini app
  - HOME shows TAO insight cards (with QOT)
  - ENTA → TAO pre-fill works
- **Complexity:** M
- **Dependency:** T-TAO-015
- **Executor:** CLAC-2 + cross-team coordination

---

## **PHASE 3 TASKS — Commerce**

### **T-TAO-017 — Period + Event + Compatibility Readings**
- **Phase:** 3.1
- **Source:** SPEC §3.3 + UI/UX
- **Scope:** Premium reading modes
- **Complexity:** L
- **Dependency:** Phase 2 done
- **Executor:** CLAC-2

### **T-TAO-018 — Booking + Service Hooks**
- **Phase:** 3.2
- **Source:** Architecture §7 + LAW 8
- **Scope:** Booking consultation, workshops, premium channels
- **Complexity:** L
- **Dependency:** T-TAO-017
- **Executor:** CLAC-2 + cross-team

### **T-TAO-019 — Membership Upgrade Flow**
- **Phase:** 3.3
- **Source:** UI/UX §3.4 + LAW 7
- **Scope:** Polite upgrade CTAs + entitlement enforcement + conversion tracking
- **Complexity:** M
- **Dependency:** T-TAO-018
- **Executor:** CLAC-2

---

## **PHASE 4 TASKS — Expansion**

Phase 4 tasks deferred until Phase 3 ships. Will define T-TAO-020+ at that time.

---

# **TASK GRAPH (dependency view)**

```
T-001 (Calendar) ──┬──> T-002 (Input) ──> T-003 (Palace+Cục)
                   │                       │
                   │                       v
                   │                      T-004 (14 main stars) ──┬──> T-005 (Aux stars)
                   │                                              │      │
                   │                                              │      v
                   │                                              │     T-006 (Lộc Tồn ring)
                   │                                              │      │
                   │                                              v      v
                   │                                             T-007 (Tứ Hóa)
                   │                                              │
                   │                                              v
                   └─────────────────────────────────────────────> T-008 (Schema+Storage)
                                                                   │
                                                                   v
                                                                  T-009 (Test+CI)
                                                                   │
                                                                   ├──> T-010 (Overview UI)
                                                                   │      │
                                                                   └──> T-011 (Natal UI)
                                                                          │
                                                                          v
                                                                         T-012 (Phase 1 Integration)
                                                                          │
        ┌─────────────────────────────────────────────────────────────────┘
        │
        v
       T-013 (Life Reading) ──> T-014 (Annual Reading) ──> T-015 (AIER Tao) ──> T-016 (Cross-module)
                                                                                  │
        ┌─────────────────────────────────────────────────────────────────────────┘
        v
       T-017 (Premium Readings) ──> T-018 (Booking) ──> T-019 (Membership Upgrade)
```

---

# **DISPATCH PROTOCOL**

When NTS approves dispatch of any T-TAO-XXX:
1. CLA-2 runs `LAW_N5` mandatory search gate
2. CLA-2 generates full task prompt per `TASK_PROMPT_TEMPLATE_v2.2`
3. NTS reviews task prompt
4. NTS pastes task prompt into CLAC-2 thread on Desktop
5. CLAC-2 executes per `LAW_N5 v2.0` (16-item self-check, QA gate, audit log, etc.)
6. CLAC-2 reports back to NTS
7. CLA-2 verifies + reports to NTS

---

# **AMENDMENT RULE**

Task map amendments require:
1. Proposal as `TAO_ZIWEI_BUILD_TASK_MAP_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Cannot contradict any prior TAO doc
4. New tasks numbered sequentially (T-TAO-020+), no insertion
5. Old version archived
