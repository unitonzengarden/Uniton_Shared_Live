# **TAO BAZI BUILD TASK MAP v1.0**

## **Executable task list for TAO V1 (Bazi / Tứ Trụ) + TAO V3 (Phong Thủy) module — UZG+ ecosystem**

---

**Document ID:** TAO_BAZI_BUILD_TASK_MAP_v1
**Version:** 1.1 (school decision lock)
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge)
**Authority Level:** Tier 3 — extends Roadmap, ships task IDs for CLAC-2 / Codex
**Parent docs:**
- `TAO_BAZI_ROADMAP_v1.md` (build sequence)
- `TAO_BAZI_IMPLEMENTATION_SPEC_v1.md` (build detail)
- `TAO_BAZI_PHONGTHUY_REFERENCE_v1.md` (formulas)
- `TAO_BAZI_SYSTEM_ARCHITECTURE_v1.md` (engine boundaries)
- `TAO_BAZI_SYSTEM_LAW_v1.md` (constraints)
- `TAO_BAZI_UI_UX_CANON_v1.md` (UI surfaces)
**Sibling task map:** `TAO_ZIWEI_BUILD_TASK_MAP_v1.md`
**Status:** ⏳ DRAFT — awaiting NTS approval (after Roadmap approved)
**Issued by:** CLA-2 (Lane_02)

---

## **Purpose**

Document này là **task ID registry** cho TAO V1 (Bazi) + TAO V3 (Phong Thủy) build. Mỗi task có:
- T-ID (executable)
- Source: which SPEC section / Architecture component / UI surface
- Phase mapping (Phase 1.x / 2.x / ... / 6.x per Roadmap)
- Acceptance criteria summary
- Estimated complexity (S / M / L)
- Dependency on prior tasks
- Executor (CLAC-2 default for Desktop stream)

Task này KHÔNG phải task prompt đầy đủ. Khi NTS sẵn sàng dispatch, CLA-2 sẽ ship full task prompt theo `LAW_N5_TASK_PROMPT.md` + `TASK_PROMPT_TEMPLATE_v2.2` cho từng T-ID.

---

## **§0 — TASK ID NAMING CONVENTION**

Task IDs use 2 prefixes:

- **T-BAZI-XXX** — tasks specifically for Bazi (TAO V1) module
- **T-PT-XXX** — tasks specifically for Phong Thủy (TAO V3) module
- **T-BAZIPT-XXX** — tasks spanning both (e.g., shared infrastructure)

Sequential numbering within each prefix. No insertion — new tasks always at the end.

For LANE_02 dispatch (per `LANE02_PROJECT_INSTRUCTIONS_v2_0`):
```
LANE02-AC-<T-ID>-V<N>
```
Example: `LANE02-AC-T-BAZI-001-V1`

---

# **PHASE 1 TASKS — Bazi Core MVP**

## **T-BAZI-001 — Pillar Construction Engine**

- **Phase:** 1.1
- **Source:** SPEC §2.1 + FORMULA_REFERENCE §3
- **Scope:** Implement 4-pillar construction with Tết Nguyên Đán year boundary + lunar month boundary + Tý phase hour rollover (VN-school per NTS lock 2026-04-29)
- **AC summary:**
  - Year pillar uses Tết Nguyên Đán boundary (mùng 1 tháng Giêng âm lịch) — same as Tử Vi V2
  - Month pillar uses lunar month boundary (mùng 1 of each lunar month) — same as Tử Vi V2
  - Day pillar uses calendar engine output (JDN-based)
  - Hour pillar applies Tý phase rollover (early Tý 23:00-23:59 → next day's Can; late Tý 00:00-00:59 stays)
  - Hour missing → return null (no silent default)
  - Leap month: use same Can-Chi as preceding regular month, flag `is_leap_month: true` in metadata
  - All 4 pillars must match Tử Vi V2 pillars for same person (LAW 3 full alignment)
  - Pass NTS audit case calendar pillars 100%
- **Complexity:** M (lower than v1.0 — boundaries simpler since no tiết khí computation)
- **Dependency:** TAO V2 calendar engine (T-TAO-001) ready
- **Executor:** CLAC-2

## **T-BAZI-002 — Day Master Engine**

- **Phase:** 1.1
- **Source:** SPEC §2.2 + FORMULA_REFERENCE §1.2-1.3
- **Scope:** Day Master derivation (lookup) + element + polarity
- **AC summary:**
  - Day master = pillars.day.can
  - Element correctly derived (Mộc/Hỏa/Thổ/Kim/Thủy)
  - Polarity correctly derived (Dương/Âm)
  - All 10 stems handled
- **Complexity:** S
- **Dependency:** T-BAZI-001
- **Executor:** CLAC-2

## **T-BAZI-003 — Hidden Stems Engine (Tàng Can)**

- **Phase:** 1.1
- **Source:** SPEC §2.3 + FORMULA_REFERENCE §4
- **Scope:** Extract main + mid + residual hidden stems from each Chi
- **AC summary:**
  - All 12 chi mapped correctly
  - Main hidden stem always present
  - Mid + residual present where canonical (e.g., Sửu has 3, Tý has 1)
  - Output structure consistent across pillars
- **Complexity:** S (pure lookup)
- **Dependency:** T-BAZI-001
- **Executor:** CLAC-2

## **T-BAZI-004 — Element Distribution Engine**

- **Phase:** 1.1
- **Source:** SPEC §2.6
- **Scope:** Count + weight elements across visible + hidden stems
- **AC summary:**
  - Visible stems weighted 1.0
  - Branch element weighted 0.5
  - Main hidden 0.7, mid 0.2, residual 0.1
  - 5-element histogram output
- **Complexity:** M
- **Dependency:** T-BAZI-002, T-BAZI-003
- **Executor:** CLAC-2

## **T-BAZI-005 — Day Master Strength Engine**

- **Phase:** 1.2
- **Source:** SPEC §2.7 + FORMULA_REFERENCE §7
- **Scope:** Composite strength scoring (seasonal + element distribution)
- **AC summary:**
  - 5-state seasonal score correct (Vượng/Tướng/Hưu/Tù/Tử)
  - Element distribution scoring with proper weights
  - 5-level output: rất nhược / nhược / cân bằng / vượng / rất vượng
  - Match canonical examples for known charts
- **Complexity:** L (composite logic)
- **Dependency:** T-BAZI-004
- **Executor:** CLAC-2

## **T-BAZI-006 — Ten Gods Engine (Thập Thần)**

- **Phase:** 1.2
- **Source:** SPEC §2.4 + FORMULA_REFERENCE §5
- **Scope:** Compute 10-god label per visible + hidden stem
- **AC summary:**
  - 10 god types correctly mapped (relation × polarity)
  - Day pillar's stem skipped (it IS day master)
  - Hidden stems all labeled
  - Cross-validate against Joey Yap reference
- **Complexity:** M
- **Dependency:** T-BAZI-002, T-BAZI-003
- **Executor:** CLAC-2

## **T-BAZI-007 — Twelve Stages Engine**

- **Phase:** 1.2
- **Source:** SPEC §2.5 + FORMULA_REFERENCE §6
- **Scope:** Compute 12-stage life cycle position for day master at each pillar's chi
- **AC summary:**
  - Direction-aware (Dương stem = clockwise, Âm = counter-clockwise)
  - All 10 stems anchor positions correct
  - 12 stages cycle correctly
- **Complexity:** M
- **Dependency:** T-BAZI-002
- **Executor:** CLAC-2

## **T-BAZI-008 — Pillar Relations Engine**

- **Phase:** 1.2
- **Source:** SPEC §2.10 + FORMULA_REFERENCE §10
- **Scope:** Detect Hợp/Khắc/Hình/Xung/Hại/Phá relations
- **AC summary:**
  - All pairwise stem combos detected (5 stem hợp pairs)
  - All branch combos detected (lục hợp 6 pairs, tam hợp 4 trios, tam hội 4 trios)
  - All clashes detected (lục xung 6 pairs)
  - Harms (lục hại), punishments (tam hình), breaks (lục phá)
  - No false positives
- **Complexity:** M
- **Dependency:** T-BAZI-001
- **Executor:** CLAC-2

## **T-BAZI-009 — Bazi Chart Object Schema + Storage**

- **Phase:** 1.3
- **Source:** SPEC §4.1 + ARCHITECTURE §4.2
- **Scope:** Implement BaziChartObject as JSONB in Supabase + auxiliary normalized tables
- **AC summary:**
  - Chart object validates against TypeScript schema
  - Round-trip Supabase storage works
  - Audit log + version field present
  - Auxiliary tables (bazi_pillars, bazi_ten_gods, bazi_luck_pillars, bazi_pillar_relations) populated
  - Per LAW 3 v1.1: cross-engine integrity (ALL 4 Bazi pillars = ALL 4 Tử Vi pillars, full alignment)
- **Complexity:** M
- **Dependency:** T-BAZI-001 through T-BAZI-008
- **Executor:** CLAC-2

## **T-BAZI-010 — Audit Log + Version Control Hooks**

- **Phase:** 1.3
- **Source:** ARCHITECTURE §14, SYSTEM_LAW §C.2
- **Scope:** Algorithm version tracking + audit log per chart computation
- **AC summary:**
  - Every chart has algorithm_version + formula_version
  - Audit log written on chart creation
  - Version bump triggers regression CI
- **Complexity:** S
- **Dependency:** T-BAZI-009
- **Executor:** CLAC-2

## **T-BAZI-011 — NTS Bazi Audit Case Fixture**

- **Phase:** 1.4
- **Source:** SPEC §7.1 (test set)
- **Scope:** NTS-provided birth profile → expected Bazi chart fixture in CI
- **AC summary:**
  - Fixture file with NTS birth data + expected output
  - CI runs on every commit touching `lib/tao/bazi/`
  - 100% match required (regression = fail)
- **Complexity:** S
- **Dependency:** T-BAZI-009
- **Executor:** CLAC-2 + NTS provides ground truth
- **Note:** NTS must provide validated Bazi chart for own birth profile (or trusted reference user)

## **T-BAZI-012 — Cross-Source Validation**

- **Phase:** 1.4
- **Source:** SPEC §7.1 + FORMULA_REFERENCE §19.3
- **Scope:** Validate against Joey Yap BaziCalculator + VN Bazi tools across 50 random birth dates
- **AC summary:**
  - 50 random dates 1900-2100 tested
  - Discrepancies < 5% across all fixtures
  - Discrepancy details documented
- **Complexity:** M
- **Dependency:** T-BAZI-011
- **Executor:** CLAC-2

## **T-BAZI-013 — CI Regression**

- **Phase:** 1.4
- **Source:** SPEC §9.1
- **Scope:** CI workflow for `formula_version` bumps + regression suite
- **AC summary:**
  - GitHub Actions workflow runs on every commit
  - Regression triggered on version bump
  - PR blocked if regression fails
- **Complexity:** S
- **Dependency:** T-BAZI-012
- **Executor:** CLAC-2

## **T-BAZI-014 — LAW 3 Cross-Engine Integrity Test**

- **Phase:** 1.4
- **Source:** SYSTEM_LAW §A LAW 3 + SPEC §7.3
- **Scope:** Test that ALL 4 Bazi pillars = ALL 4 Tử Vi pillars for same person (VN-school full alignment per NTS lock 2026-04-29)
- **AC summary:**
  - Test asserts pillars.year, pillars.month, pillars.day, pillars.hour ALL identical
  - No expected divergence — any disagreement = engine bug
  - Runs in CI after both V1+V2 charts computed
- **Complexity:** S
- **Dependency:** T-BAZI-009 + TAO V2 chart engine
- **Executor:** CLAC-2

## **T-BAZI-015 — Bazi Overview Surface (UI)**

- **Phase:** 1.5
- **Source:** UI/UX §2.1
- **Scope:** Build Bazi Overview React surface in `apps/tao/ui/bazi/overview/`
- **AC summary:**
  - Renders ENTA-aware preview if chart exists
  - "Tạo Bazi" CTA if no chart
  - 4 navigation tiles (4 Pillars / Day Master / Useful God / Luck Pillars)
  - Membership status indicator
  - QOT trace icon
  - Passes redline checklist (UI/UX §6)
- **Complexity:** M
- **Dependency:** T-BAZI-009 (needs chart API)
- **Executor:** CLAC-2

## **T-BAZI-016 — 4 Pillars Chart Surface (UI)**

- **Phase:** 1.5
- **Source:** UI/UX §2.2
- **Scope:** Build 4 vertical pillar visualization
- **AC summary:**
  - 4-column grid: Năm / Tháng / Ngày / Giờ
  - Each column shows Can + Chi + hidden stems (expandable)
  - Day Master highlighted prominently
  - Element color tinting per pillar (muted)
  - Tap any pillar → bottom sheet with detail
  - Visually distinct from Tử Vi 12-palace (per UI/UX §4.1)
  - Passes redline checklist
- **Complexity:** L
- **Dependency:** T-BAZI-009
- **Executor:** CLAC-2

## **T-BAZI-017 — Day Master Analysis Surface (UI, Member-gated)**

- **Phase:** 1.5
- **Source:** UI/UX §2.3
- **Scope:** Day Master strength + element distribution visualization
- **AC summary:**
  - Day Master visualized prominently
  - Element distribution radar chart
  - Strength gauge (5 levels)
  - Plain-language interpretation
  - Per-section QOT trace
  - Member tier gate enforced backend
  - Reading content passes content-compliance test (no forbidden keywords)
- **Complexity:** M
- **Dependency:** T-BAZI-005, T-BAZI-009
- **Executor:** CLAC-2

---

# **PHASE 2 TASKS — Useful God + Phong Thủy Basics**

## **T-BAZI-018 — Useful God Engine**

- **Phase:** 2.1
- **Source:** SPEC §2.8 + FORMULA_REFERENCE §8
- **Scope:** Dụng Thần selection rules (strength-based + season)
- **AC summary:**
  - Strong DM → Tài + Quan as primary/secondary
  - Weak DM → Ấn + Tỉ Kiếp
  - Balanced DM → seasonal need
  - Avoid elements correctly identified
  - Reasoning chain output
- **Complexity:** L
- **Dependency:** T-BAZI-005
- **Executor:** CLAC-2

## **T-BAZI-019 — Cùng Thông Seasonal Adjustment**

- **Phase:** 2.1
- **Source:** SPEC §2.8 + FORMULA_REFERENCE §8.3
- **Scope:** Optional seasonal override for Useful God selection
- **AC summary:**
  - Opt-in flag in input
  - Cold-winter charts → Hỏa adjustment
  - Hot-summer charts → Thủy adjustment
  - Override flagged in output if applied
- **Complexity:** M
- **Dependency:** T-BAZI-018
- **Executor:** CLAC-2

## **T-BAZI-020 — Luck Pillars Engine (Đại Vận)**

- **Phase:** 2.1
- **Source:** SPEC §2.9 + FORMULA_REFERENCE §9
- **Scope:** 8-cycle 10-year luck pillars + starting age computation
- **AC summary:**
  - Direction rule applied (polarity × gender)
  - Starting age computed via days-to-tiet
  - 60-pillar cycle advancing correctly
  - 8 future pillars output
  - Hour-missing chart → null (per partial chart rule)
- **Complexity:** L
- **Dependency:** T-BAZI-001
- **Executor:** CLAC-2

## **T-BAZI-021 — Useful God Reading Surface (UI, Premium-gated)**

- **Phase:** 2.1
- **Source:** UI/UX §2.4
- **Scope:** Premium reading mode for Useful God + career/environment guidance
- **AC summary:**
  - Useful God prominently displayed
  - Reasoning chain shown
  - Career + environment + activity suggestions
  - Avoid elements explained
  - Premium tier gate enforced
  - Tone passes LAW 4 (no deterministic verdict)
- **Complexity:** M
- **Dependency:** T-BAZI-018
- **Executor:** CLAC-2

## **T-BAZI-022 — Luck Pillars Timeline Surface (UI, Premium-gated)**

- **Phase:** 2.1
- **Source:** UI/UX §2.5
- **Scope:** Horizontal timeline of Đại Vận with current pillar highlighted
- **AC summary:**
  - Past + current + future pillars displayed
  - Tap pillar → detail panel for that decade
  - Window framing (no "lucky/unlucky decade")
  - Premium tier gate
  - Visual passes redline checklist
- **Complexity:** L
- **Dependency:** T-BAZI-020
- **Executor:** CLAC-2

## **T-PT-001 — Cung Mệnh Engine**

- **Phase:** 2.2
- **Source:** SPEC §3.1 + FORMULA_REFERENCE §12.2
- **Scope:** Year + gender → 8 trigrams + Đông/Tây Tứ Mệnh group + 1-9 ban mệnh tinh
- **AC summary:**
  - All 8 trigrams correctly derived
  - Special case 5 → 2 (Khôn for Nam) or 8 (Cấn for Nữ) handled
  - Group correctly assigned
  - Pre-computed lookup table for 1900-2100 to optimize
- **Complexity:** S (pure lookup with edge cases)
- **Dependency:** None
- **Executor:** CLAC-2

## **T-PT-002 — Bát Trạch Engine**

- **Phase:** 2.2
- **Source:** SPEC §3.2 + FORMULA_REFERENCE §12.5
- **Scope:** Cung Mệnh → 4 favorable + 4 unfavorable directions
- **AC summary:**
  - All 8 cung mệnh × 8 directions = 64 mappings correct
  - Output schema clean
  - Pure lookup
- **Complexity:** S
- **Dependency:** T-PT-001
- **Executor:** CLAC-2

## **T-PT-003 — Phong Thủy Profile Schema + Storage**

- **Phase:** 2.2
- **Source:** SPEC §4.2 + ARCHITECTURE §6
- **Scope:** Profile JSONB + auxiliary normalized tables in Supabase
- **AC summary:**
  - Profile structure validates against TypeScript schema
  - Round-trip storage works
  - User has 1 profile (auto-created on first compute)
  - Audit log present
- **Complexity:** S
- **Dependency:** T-PT-001, T-PT-002
- **Executor:** CLAC-2

## **T-PT-004 — Phong Thủy Overview Surface (UI, Free)**

- **Phase:** 2.2
- **Source:** UI/UX §3.1
- **Scope:** Cung Mệnh + 3 navigation tiles + educational intro
- **AC summary:**
  - Cung Mệnh derived auto from year+gender (free tier)
  - 3 tiles: Bát Trạch / Residence / Phi Tinh
  - Educational tone first, advisory second
  - "Add residence for more detail" CTA (optional)
- **Complexity:** S
- **Dependency:** T-PT-003
- **Executor:** CLAC-2

## **T-PT-005 — Bát Trạch Profile Surface (UI, Member-gated)**

- **Phase:** 2.2
- **Source:** UI/UX §3.2
- **Scope:** 8-direction compass visualization with favorable/unfavorable
- **AC summary:**
  - Compass/wheel visualization centered
  - Favorable directions: subtle green tint (NOT red alarm for unfavorable)
  - Tap each direction → detail panel
  - Member tier gate
  - Per-direction explanation neutral framing
  - Passes redline checklist
- **Complexity:** M
- **Dependency:** T-PT-002
- **Executor:** CLAC-2

## **T-PT-006 — Phong Thủy ENTA Awareness**

- **Phase:** 2.2
- **Source:** ARCHITECTURE §11.2, FORMULA_REFERENCE §17
- **Scope:** ENTA element awareness in Phong Thủy surfaces
- **AC summary:**
  - Element subtle hint applied to UI
  - Polarity context shown
  - Cross-module ENTA fallback chain works
- **Complexity:** S
- **Dependency:** T-PT-001, ENTA module ready
- **Executor:** CLAC-2

## **T-BAZI-023 — Bazi → ENTA Element Upgrade**

- **Phase:** 2.3
- **Source:** ARCHITECTURE §11.2 + FORMULA_REFERENCE §17
- **Scope:** When user completes Bazi, ENTA element auto-upgrades from year nạp âm to day master element
- **AC summary:**
  - On Bazi compute success, trigger ENTA update event
  - ENTA module subscribes + applies day master element
  - Polarity also updated
  - Audit logged
- **Complexity:** M
- **Dependency:** T-BAZI-009 + ENTA module event subscriber
- **Executor:** CLAC-2 + cross-team

## **T-BAZI-024 — Lịch Vạn Niên Bazi-aware Day Energy**

- **Phase:** 2.3
- **Source:** FORMULA_REFERENCE §15.1-15.3 + UZGPLUS_VANNIEN_CALENDAR_SPEC §11
- **Scope:** When user has Bazi, getDayInfo() returns enhanced day energy
- **AC summary:**
  - Bazi-aware scoring layered on top of basic ENTA match
  - Day pillar relations to user's pillars detected
  - Enhanced response surfaces in Daily Detail UI
  - Free tier still gets basic ENTA match (Bazi enhancement is Premium)
- **Complexity:** L
- **Dependency:** T-BAZI-009 + Lịch Vạn Niên engine
- **Executor:** CLAC-2 + Lịch Vạn Niên team

## **T-BAZI-025 — Wallet U-Reward Trigger**

- **Phase:** 2.3
- **Source:** ARCHITECTURE §11.1 + Wallet integration
- **Scope:** First Bazi reading completion → U credited (UZG+ Global Loop)
- **AC summary:**
  - Event emitted on first Bazi reading completion
  - Wallet subscribes + credits U
  - Idempotent (no double-reward)
  - Audit logged
- **Complexity:** S
- **Dependency:** T-BAZI-009 + Wallet module
- **Executor:** CLAC-2 + cross-team

---

# **PHASE 3 TASKS — Residence + AIER Advisory**

## **T-PT-007 — Residence Input Form + Privacy Consent**

- **Phase:** 3.1
- **Source:** SYSTEM_LAW LAW 12 + UI/UX §3.3
- **Scope:** 4-step opt-in flow (consent → explain encryption → collect → confirm)
- **AC summary:**
  - Explicit consent screen Step 1
  - Encryption + deletion right explained Step 2
  - Data collection form Step 3 (address + main entrance + optional construction period)
  - Confirmation summary Step 4
  - User can abort at any step
  - No data saved until Step 4 confirm
- **Complexity:** M
- **Dependency:** Privacy infrastructure ready
- **Executor:** CLAC-2

## **T-PT-008 — Encryption-at-Rest Infrastructure**

- **Phase:** 3.1
- **Source:** SYSTEM_LAW LAW 12 + ARCHITECTURE §12.3
- **Scope:** AES-256 encryption for residence address + floor plan
- **AC summary:**
  - Address field encrypted at rest
  - Floor plan blob encrypted at rest
  - Decryption only on user view request
  - Key management via UZG+ secrets infrastructure
  - Key rotation support
- **Complexity:** L
- **Dependency:** UZG+ encryption service ready
- **Executor:** CLAC-2 + security team

## **T-PT-009 — Residence Audit Log + Access Control**

- **Phase:** 3.1
- **Source:** SYSTEM_LAW LAW 12 + SPEC §3.6
- **Scope:** Audit every residence access; restrict access to owner + system
- **AC summary:**
  - Every read of residence data logged (who/when/why)
  - Access scoped to user_id (no cross-user query)
  - Bulk export disabled
  - Audit log immutable
- **Complexity:** M
- **Dependency:** T-PT-008
- **Executor:** CLAC-2

## **T-PT-010 — Right-to-be-Forgotten DELETE Flow**

- **Phase:** 3.1
- **Source:** SYSTEM_LAW LAW 12
- **Scope:** User-triggered hard-delete of residence data
- **AC summary:**
  - DELETE endpoint authenticated to owner only
  - Hard-delete (not soft) — data physically removed
  - Confirmation modal in UI before delete
  - Deletion logged in user audit (not residence — that's gone)
  - Cascading delete of phi_tinh_chart, floor_plan
- **Complexity:** S
- **Dependency:** T-PT-009
- **Executor:** CLAC-2

## **T-PT-011 — Direction Utilities**

- **Phase:** 3.1
- **Source:** SPEC §3.4 + FORMULA_REFERENCE §14
- **Scope:** Compass angle ↔ 8-direction mapping + magnetic declination correction
- **AC summary:**
  - 8 ranges correctly mapped (337.5°-22.5° = Bắc, etc.)
  - VN declination ~0-2° east handled
  - IGRF model integration optional for high-precision
- **Complexity:** S
- **Dependency:** None
- **Executor:** CLAC-2

## **T-PT-012 — Residence Mapping UI**

- **Phase:** 3.2
- **Source:** UI/UX §3.3
- **Scope:** Map user's actual rooms onto Bát Trạch directions
- **AC summary:**
  - Floor plan visualization (basic)
  - Each room shows which Bát Trạch direction it falls in
  - Match analysis with user's favorable/unfavorable
  - Member tier gate
  - Privacy badges visible (lock icon, edit/delete buttons)
- **Complexity:** L
- **Dependency:** T-PT-007, T-PT-011
- **Executor:** CLAC-2

## **T-PT-013 — Privacy Badges UX**

- **Phase:** 3.2
- **Source:** UI/UX §4.6
- **Scope:** Lock icon, last-accessed timestamp, edit/delete buttons always visible
- **AC summary:**
  - Lock icon on residence data display
  - "Dữ liệu nhà của bạn — chỉ bạn xem được" tooltip
  - Last accessed timestamp visible
  - Edit + Delete buttons always 1 tap away
- **Complexity:** S
- **Dependency:** T-PT-012
- **Executor:** CLAC-2

## **T-PT-014 — Floor Plan Visualization**

- **Phase:** 3.2
- **Source:** UI/UX §3.3
- **Scope:** Basic floor plan display (no full architectural drawing)
- **AC summary:**
  - User can sketch rough floor plan (rooms + main entrance arrow)
  - Visualization renders cleanly
  - Direction overlay shown
  - Mobile-first responsive
- **Complexity:** L
- **Dependency:** T-PT-012
- **Executor:** CLAC-2

## **T-BAZI-026 — AIER Bazi Context Engine**

- **Phase:** 3.3
- **Source:** ARCHITECTURE §8.2 + SYSTEM_LAW §C
- **Scope:** Generate AIER Bazi context pack at session start
- **AC summary:**
  - Context pack includes chart_id, chart_summary (compressed), reading_history, governance_rules
  - Pack does NOT include raw birth_profile (privacy)
  - Pack stays within token budget
- **Complexity:** L
- **Dependency:** T-BAZI-009
- **Executor:** CLAC-2 + AIER team

## **T-BAZI-027 — AIER Bazi System Prompt Template**

- **Phase:** 3.3
- **Source:** SYSTEM_LAW §C + UI/UX §2 (AIER constitutional rules)
- **Scope:** Prompt template enforcing LAW + REDLINE compliance
- **AC summary:**
  - System prompt enforces "advisor not authority" framing
  - LAW 4 (no deterministic) + REDLINE 1 (no death) + REDLINE 3 (no thầy phán) enforced
  - User question redirect logic for out-of-scope queries
- **Complexity:** L
- **Dependency:** T-BAZI-026
- **Executor:** CLAC-2 + CLA-2 prompt engineering

## **T-BAZI-028 — AIER Bazi Output Filter**

- **Phase:** 3.3
- **Source:** SYSTEM_LAW §A + §B
- **Scope:** Output filter to catch + remediate any forbidden content
- **AC summary:**
  - Filter catches forbidden keywords (chết, tử, tai họa, etc.)
  - Filter detects thầy-phán tone patterns
  - On detection: rewrite or escalate
  - Logged for review
- **Complexity:** M
- **Dependency:** T-BAZI-027
- **Executor:** CLAC-2

## **T-BAZI-029 — AIER Bazi Conversation Safety Tests**

- **Phase:** 3.3
- **Source:** SYSTEM_LAW §C
- **Scope:** 50 conversation safety tests for AIER Bazi advisor
- **AC summary:**
  - 50 test scenarios covering edge cases (death questions, forbidden requests, manipulation attempts)
  - All tests pass (AIER never produces forbidden output)
  - Fail any 1 test = AIER not deployable
- **Complexity:** L
- **Dependency:** T-BAZI-028
- **Executor:** CLAC-2 + CLA-2

## **T-PT-015 — AIER Phong Thủy Context Engine**

- **Phase:** 3.3
- **Source:** ARCHITECTURE §8.2 + SYSTEM_LAW §C
- **Scope:** Context pack for AIER Phong Thủy advisor
- **AC summary:**
  - Pack includes profile_id, bat_trach summary, phi_tinh summary (if present), residence summary (derived only — no raw address)
  - Privacy preserved: AIER never sees raw residence
- **Complexity:** L
- **Dependency:** T-PT-003 + AIER framework ready
- **Executor:** CLAC-2

## **T-PT-016 — AIER Phong Thủy System Prompt + Output Filter**

- **Phase:** 3.3
- **Source:** SYSTEM_LAW §C + REDLINE 5
- **Scope:** Prompt template + filter for Phong Thủy advisor
- **AC summary:**
  - "No fear UX" enforced
  - "No prescriptions without context" enforced (REDLINE 5)
  - Solution-oriented framing
  - Vendor product references gated by context
- **Complexity:** L
- **Dependency:** T-PT-015
- **Executor:** CLAC-2 + CLA-2

## **T-PT-017 — AIER Phong Thủy Conversation Safety Tests**

- **Phase:** 3.3
- **Source:** SYSTEM_LAW §C
- **Scope:** 50 conversation safety tests
- **AC summary:**
  - Scenarios cover fear-trigger attempts, vendor upsell pressure, residence privacy probes
  - All tests pass
- **Complexity:** L
- **Dependency:** T-PT-016
- **Executor:** CLAC-2 + CLA-2

---

# **PHASE 4 TASKS — Premium Features**

## **T-PT-018 — Cửu Cung Phi Tinh Engine**

- **Phase:** 4.1
- **Source:** SPEC §3.3 + FORMULA_REFERENCE §13
- **Scope:** Period base + annual + monthly flying star charts
- **AC summary:**
  - 9 stars correctly placed in 9 palaces
  - Period number 1-9 handled (current = 9)
  - Annual ruling star formula correct
  - Monthly overlay optional
- **Complexity:** L
- **Dependency:** T-PT-003
- **Executor:** CLAC-2

## **T-PT-019 — Lo Shu Sequence Implementation**

- **Phase:** 4.1
- **Source:** FORMULA_REFERENCE §13.4
- **Scope:** Lo Shu magic square sequence for star flight
- **AC summary:**
  - 9-step sequence correct (center → NW → W → NE → S → N → SW → E → SE)
  - Star numbers cycle properly
- **Complexity:** S
- **Dependency:** None
- **Executor:** CLAC-2

## **T-PT-020 — Phi Tinh Chart Visualization**

- **Phase:** 4.1
- **Source:** UI/UX §3.4
- **Scope:** 9-palace grid display with layered period + annual + monthly stars
- **AC summary:**
  - 9-palace grid renders cleanly
  - Layer toggleable (period base / annual / monthly)
  - Star icons + numbers + muted colors
  - Hover/tap each cell → meaning + suggestion
  - Solution-oriented framing for "hung" stars
- **Complexity:** L
- **Dependency:** T-PT-018
- **Executor:** CLAC-2

## **T-PT-021 — Phi Tinh Basic Surface (Member-gated)**

- **Phase:** 4.1
- **Source:** UI/UX §3.4
- **Scope:** Member tier sees current Period 9 awareness + general star meanings
- **AC summary:**
  - Period 9 (Cửu Tử dominant) explained neutrally
  - 9 stars introduced with meanings
  - Member gate enforced
- **Complexity:** M
- **Dependency:** T-PT-020
- **Executor:** CLAC-2

## **T-PT-022 — Phi Tinh Full Surface (Premium-gated)**

- **Phase:** 4.1
- **Source:** UI/UX §3.4
- **Scope:** Premium tier sees residence-specific Phi Tinh chart
- **AC summary:**
  - Requires residence data (construction_period + facing_direction)
  - Layered chart displayed
  - Annual + monthly overlays available
  - Premium gate enforced
- **Complexity:** L
- **Dependency:** T-PT-018, T-PT-007 (residence data)
- **Executor:** CLAC-2

## **T-PT-023 — Daily Flying Star Alerts**

- **Phase:** 4.1
- **Source:** SYSTEM_LAW LAW 5 + UZGPLUS_VANNIEN_CALENDAR_SPEC §6 (Lịch integration)
- **Scope:** Daily alerts about star activations at user's residence directions
- **AC summary:**
  - Premium tier + residence data required
  - Neutral framing (no "Ngũ Hoàng đến — nguy hiểm!")
  - Solution-oriented suggestions
  - Frequency cap: 1/day max
  - Opt-out available
- **Complexity:** M
- **Dependency:** T-PT-022 + Lịch Vạn Niên engine
- **Executor:** CLAC-2

## **T-BAZI-030 — Compatibility Engine**

- **Phase:** 4.2
- **Source:** SPEC §6.1 + FORMULA_REFERENCE §10
- **Scope:** 2-chart relational analysis (cưới hỏi, partnership)
- **AC summary:**
  - Pairwise pillar interaction map
  - Stem combos + clashes detected across both charts
  - Branch combos + clashes + harms
  - Day master interaction prominently flagged
  - Overall harmony level: low / medium / high resonance
  - REDLINE 4: no verdict ("should/shouldn't marry")
- **Complexity:** L
- **Dependency:** T-BAZI-008
- **Executor:** CLAC-2

## **T-BAZI-031 — Pillar Interaction Map Visualization**

- **Phase:** 4.2
- **Source:** UI/UX §2.6
- **Scope:** 2 charts side-by-side + interaction lines
- **AC summary:**
  - Mirror layout
  - Color-coded interaction lines (combo/clash/harm)
  - Tap line → explanation panel
  - Premium gate
- **Complexity:** L
- **Dependency:** T-BAZI-030
- **Executor:** CLAC-2

## **T-BAZI-032 — Compatibility Reading Surface (Premium)**

- **Phase:** 4.2
- **Source:** UI/UX §2.6 + SYSTEM_LAW REDLINE 4
- **Scope:** Premium reading mode for compatibility
- **AC summary:**
  - Relational tendency framing (NOT verdict)
  - Specific recommendations: areas of harmony, areas needing attention
  - REDLINE 4 hard-block: no "không nên cưới" output
  - Premium gate
- **Complexity:** M
- **Dependency:** T-BAZI-030
- **Executor:** CLAC-2

## **T-BAZI-033 — Shared Link Consent Flow**

- **Phase:** 4.2
- **Source:** UI/UX §5.4 + privacy
- **Scope:** Partner can share their Bazi via secure link with consent
- **AC summary:**
  - User A generates secure link
  - User B (or guest) accepts link → consent screen → birth data input
  - Both users get compatibility result
  - Either can revoke shared access
- **Complexity:** L
- **Dependency:** T-BAZI-032
- **Executor:** CLAC-2

## **T-BAZI-034 — Lưu Niên Annual Bazi Engine**

- **Phase:** 4.3
- **Source:** SPEC §6.3
- **Scope:** Compute current year's pillar interaction with natal pillars
- **AC summary:**
  - Current year Can-Chi vs each natal pillar
  - Detect new combos/clashes for the year
  - Flag relevant interactions (e.g., Tỉ Kiên year for Mộc DM)
  - Update yearly + cached
- **Complexity:** M
- **Dependency:** T-BAZI-008
- **Executor:** CLAC-2

## **T-BAZI-035 — Annual Bazi Reading Surface (Premium)**

- **Phase:** 4.3
- **Source:** UI/UX §2.5 (timeline pattern)
- **Scope:** Premium reading mode for current year
- **AC summary:**
  - Year header (current Can-Chi)
  - Pillar interaction summary
  - Tendencies per quarter
  - Window framing (no "lucky year/unlucky year")
  - Premium gate
- **Complexity:** M
- **Dependency:** T-BAZI-034
- **Executor:** CLAC-2

---

# **PHASE 5 TASKS — Integration & Polish**

## **T-BAZI-036 — Combined Bazi + Tử Vi Reading Engine**

- **Phase:** 5.1
- **Source:** ARCHITECTURE §11.4 + ZIWEI_ROADMAP §4.1
- **Scope:** Combined reading consuming both bazi_chart + ziwei_chart
- **AC summary:**
  - Identify points of convergence (e.g., both flag wealth area)
  - Identify divergence
  - Surface useful god from Bazi as overlay on Tử Vi palace map
  - Reconciliation framing for apparent conflicts
- **Complexity:** L
- **Dependency:** T-BAZI-009 + Tử Vi chart engine
- **Executor:** CLAC-2

## **T-BAZI-037 — Cross-Module Reconciliation Framing**

- **Phase:** 5.1
- **Source:** SYSTEM_LAW + UI/UX
- **Scope:** When Bazi says X and Tử Vi says X' (apparent conflict), engine offers reconciliation
- **AC summary:**
  - Engine detects conflicts
  - Reading does NOT pick winner
  - Framing: "Bazi nhấn mạnh X, Tử Vi nhấn mạnh X' — đây là 2 góc nhìn về cùng cấu trúc"
  - User decides
- **Complexity:** M
- **Dependency:** T-BAZI-036
- **Executor:** CLAC-2 + CLA-2

## **T-BAZI-038 — Combined Reading Surface (Premium)**

- **Phase:** 5.1
- **Source:** UI/UX (combined surface)
- **Scope:** UI for combined Bazi + Tử Vi reading
- **AC summary:**
  - Both charts displayed
  - Cross-references highlighted
  - Reconciliation explanations inline
  - Premium gate
- **Complexity:** L
- **Dependency:** T-BAZI-036, T-BAZI-037
- **Executor:** CLAC-2

## **T-BAZI-039 — Bazi Expert Consultation Booking**

- **Phase:** 5.2
- **Source:** ARCHITECTURE §9.2 + Circle Business
- **Scope:** Booking flow for paid Bazi expert reading
- **AC summary:**
  - Expert directory + filtering
  - Booking calendar integration
  - Wallet payment via UZG → Credit
  - Service hooks fire only on grounded reading state (LAW 9)
  - No fear-based push
- **Complexity:** L
- **Dependency:** Phase 4 done + Wallet ready
- **Executor:** CLAC-2 + cross-team

## **T-PT-024 — Phong Thủy Expert On-Site Visit Booking**

- **Phase:** 5.2
- **Source:** ARCHITECTURE §9.2
- **Scope:** Booking for paid Phong Thủy on-site consultation
- **AC summary:**
  - Vendor directory (verified)
  - Calendar integration
  - Wallet payment
  - Same fair-use rules as T-BAZI-039
- **Complexity:** L
- **Dependency:** Phase 4 done + Wallet
- **Executor:** CLAC-2 + cross-team

## **T-PT-025 — Vendor Verification System**

- **Phase:** 5.2
- **Source:** SYSTEM_LAW REDLINE 5
- **Scope:** Verification process for Phong Thủy product/service vendors
- **AC summary:**
  - Vendor application + review flow
  - Product listing review (no fear language allowed)
  - Recommendation algorithm based on relevance, not upsell-driven
  - Vendor performance tracking
- **Complexity:** L
- **Dependency:** Marketplace infrastructure
- **Executor:** CLAC-2 + ops team

## **T-BAZI-040 — Performance Optimization**

- **Phase:** 5.3
- **Source:** ARCHITECTURE §13
- **Scope:** Caching + latency optimization
- **AC summary:**
  - Bazi chart computation < 200ms p95
  - Phong Thủy basic profile < 100ms p95
  - Phi Tinh full < 250ms p95
  - Cache hit rate > 80%
- **Complexity:** M
- **Dependency:** Phase 4 done
- **Executor:** CLAC-2

## **T-PT-026 — Accessibility Audit**

- **Phase:** 5.3
- **Source:** UI/UX §7.1
- **Scope:** WCAG 2.1 AA compliance for all Bazi + Phong Thủy surfaces
- **AC summary:**
  - All icons have text alternatives
  - Color is never sole signal
  - Screen reader compatibility verified
  - Keyboard navigation full support
  - Color contrast AA
- **Complexity:** M
- **Dependency:** Phase 4 done
- **Executor:** CLAC-2

## **T-BAZI-041 — i18n Preparation**

- **Phase:** 5.3
- **Source:** UI/UX §7.2
- **Scope:** Vietnamese-first, English Phase 2 preparation
- **AC summary:**
  - Translation key infrastructure
  - All UI strings extractable
  - Vietnamese terms preserved with English glosses
  - Phase 2 ready (English content layer hooks)
- **Complexity:** M
- **Dependency:** Phase 4 done
- **Executor:** CLAC-2

---

# **PHASE 6 TASKS — Expansion (deferred)**

Phase 6 tasks deferred until Phase 5 ships. Will define T-BAZI-042+ + T-PT-027+ at that time.

Likely areas:
- Multilingual expansion (English, Simplified Chinese)
- Expert dashboard tools
- Multi-chart family analysis
- Business team Bazi analysis
- Advanced research features

---

# **TASK GRAPH (dependency view)**

```
PHASE 1:
T-BAZI-001 (Pillars) ──┬──> T-BAZI-002 (Day Master) ──┐
                       │                                │
                       ├──> T-BAZI-003 (Hidden Stems) ──┤
                       │                                │
                       └──> T-BAZI-008 (Relations)      │
                                                        │
T-BAZI-002, T-BAZI-003 ──> T-BAZI-004 (Element Distrib) │
                                ↓                       │
                       T-BAZI-006 (Ten Gods) ────────────┤
                       T-BAZI-007 (Twelve Stages) ──────┤
                                ↓                       │
                       T-BAZI-005 (DM Strength) ────────┤
                                                        │
                                                        ↓
                                              T-BAZI-009 (Schema+Storage)
                                                        ↓
                                              T-BAZI-010 (Audit/Version)
                                                        ↓
                                              T-BAZI-011 (NTS Fixture)
                                                        ↓
                                              T-BAZI-012 (Cross-source)
                                                        ↓
                                              T-BAZI-013 (CI Regression)
                                                        ↓
                                              T-BAZI-014 (LAW 3 integrity)
                                                        ↓
                                              ┌─────────┼─────────┐
                                              ↓         ↓         ↓
                              T-BAZI-015 (Overview) T-BAZI-016 (Pillars) T-BAZI-017 (DM Analysis)

PHASE 2:
T-BAZI-005 ──> T-BAZI-018 (Useful God) ──> T-BAZI-019 (Cùng Thông)
                                              ↓
                                    T-BAZI-021 (Useful God UI)
T-BAZI-001 ──> T-BAZI-020 (Luck Pillars) ──> T-BAZI-022 (Luck UI)

T-PT-001 (Cung Mệnh) ──> T-PT-002 (Bát Trạch) ──> T-PT-003 (Storage)
                                                       ↓
                                              T-PT-004 (Overview UI)
                                                       ↓
                                              T-PT-005 (Bát Trạch UI)
                                                       ↓
                                              T-PT-006 (ENTA awareness)

T-BAZI-009 ──> T-BAZI-023 (ENTA upgrade)
T-BAZI-009 ──> T-BAZI-024 (Vạn Niên integration)
T-BAZI-009 ──> T-BAZI-025 (Wallet U-reward)

PHASE 3:
T-PT-007 (Consent flow) ──> T-PT-008 (Encryption) ──> T-PT-009 (Audit) ──> T-PT-010 (Delete)
                                                            ↓
                                                  T-PT-011 (Direction utils)
                                                            ↓
                                                  T-PT-012 (Residence Mapping UI)
                                                            ↓
                                                  T-PT-013 (Privacy badges)
                                                            ↓
                                                  T-PT-014 (Floor plan)

T-BAZI-009 ──> T-BAZI-026 (AIER Bazi Context) ──> T-BAZI-027 (Prompt) ──> T-BAZI-028 (Filter) ──> T-BAZI-029 (Tests)
T-PT-003 ──> T-PT-015 (AIER PT Context) ──> T-PT-016 (Prompt + Filter) ──> T-PT-017 (Tests)

PHASE 4:
T-PT-003 ──> T-PT-018 (Phi Tinh Engine) + T-PT-019 (Lo Shu) ──> T-PT-020 (Visualization)
                                                                       ↓
                                                              ┌────────┴────────┐
                                                              ↓                 ↓
                                                     T-PT-021 (Basic UI)  T-PT-022 (Full UI)
                                                                              ↓
                                                                     T-PT-023 (Daily alerts)

T-BAZI-008 ──> T-BAZI-030 (Compatibility) ──> T-BAZI-031 (Visualization) ──> T-BAZI-032 (Reading UI)
                                                                                     ↓
                                                                            T-BAZI-033 (Shared link)

T-BAZI-008 ──> T-BAZI-034 (Annual) ──> T-BAZI-035 (Annual UI)

PHASE 5:
Phase 4 done ──> T-BAZI-036 (Combined Engine) ──> T-BAZI-037 (Reconciliation) ──> T-BAZI-038 (UI)

Phase 4 done ──> T-BAZI-039 (Bazi booking) + T-PT-024 (PT booking) ──> T-PT-025 (Vendor verification)

Phase 4 done ──> T-BAZI-040 (Perf) + T-PT-026 (A11y) + T-BAZI-041 (i18n)
```

---

# **DISPATCH PROTOCOL**

When NTS approves dispatch of any T-BAZI-XXX or T-PT-XXX:
1. CLA-2 runs `LAW_N5` mandatory search gate
2. CLA-2 generates full task prompt per `TASK_PROMPT_TEMPLATE_v2.2`
3. NTS reviews task prompt
4. NTS pastes task prompt into CLAC-2 thread on Desktop
5. CLAC-2 executes per `LAW_N5 v2.0` (16-item self-check, QA gate, audit log, etc.)
6. CLAC-2 reports back to NTS
7. CLA-2 verifies + reports to NTS

Per LANE_02 protocol: every task ID becomes `LANE02-AC-<T-ID>-V<N>` when dispatched.

---

# **TASK SUMMARY**

| Phase | T-BAZI tasks | T-PT tasks | Total |
|---|---|---|---|
| Phase 1 — Bazi Core MVP | 17 (T-BAZI-001 to 017) | — | 17 |
| Phase 2 — Useful God + PT Basics | 8 (T-BAZI-018 to 025) | 6 (T-PT-001 to 006) | 14 |
| Phase 3 — Residence + AIER | 4 (T-BAZI-026 to 029) | 11 (T-PT-007 to 017) | 15 |
| Phase 4 — Premium Features | 6 (T-BAZI-030 to 035) | 6 (T-PT-018 to 023) | 12 |
| Phase 5 — Integration & Polish | 6 (T-BAZI-036 to 041) | 3 (T-PT-024 to 026) | 9 |
| Phase 6 — Expansion (deferred) | TBD | TBD | TBD |
| **Total tasks defined** | **41** | **26** | **67** |

---

# **AMENDMENT RULE**

Task map amendments require:
1. Proposal as `TAO_BAZI_BUILD_TASK_MAP_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Cannot contradict any prior TAO V1/V3 doc
4. New tasks numbered sequentially (T-BAZI-042+ or T-PT-027+), no insertion
5. Old version archived

---

# **VERSION LOG**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-29 | Initial — 67 task IDs (41 T-BAZI + 26 T-PT) |
| v1.1 | 2026-04-29 | NTS school lock (Q1=A + Q2=A): T-BAZI-001 corrected to VN-school (Tết year + lunar month boundaries — fixed the ⚠️ inverted AC summary that NTS caught). T-BAZI-009 + T-BAZI-014 LAW 3 references updated to require ALL pillars match. T-BAZI-001 complexity downgraded L → M (boundaries simpler). |

---

# **SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.1 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ awaiting | — |
| Effective | — | ⏳ pending | — |

**END — TAO_BAZI_BUILD_TASK_MAP_v1**
