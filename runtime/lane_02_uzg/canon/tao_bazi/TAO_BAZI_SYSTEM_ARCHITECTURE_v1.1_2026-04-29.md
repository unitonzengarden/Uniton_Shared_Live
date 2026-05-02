# **TAO BAZI SYSTEM ARCHITECTURE v1.0**

## **System architecture for TAO V1 (Bazi / Tứ Trụ) + TAO V3 (Phong Thủy) module — UZG+ ecosystem**

---

**Document ID:** TAO_BAZI_SYSTEM_ARCHITECTURE_v1
**Version:** 1.1 (school decision lock)
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge)
**Authority Level:** Tier 2 — extends Canon, governed by `TAO_BAZI_SYSTEM_LAW_v1`
**Parent Canon:** `TAO_ZIWEI_CANON_OFFICIAL_v1.md` (shared TAO module canon)
**Companion documents:**
- `TAO_BAZI_SYSTEM_LAW_v1.md` (constraints)
- `TAO_BAZI_UI_UX_CANON_v1.md` (surfaces)
- `TAO_BAZI_IMPLEMENTATION_SPEC_v1.md` (build detail)
- `TAO_BAZI_PHONGTHUY_REFERENCE_v1.md` (formulas)
- `TAO_LUNAR_CALENDAR_ALGORITHM_v1.md` (input layer)
**Sibling architecture:** `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.md` (Tử Vi parallel)
**Status:** ⏳ DRAFT — pending NTS approval
**Issued by:** CLA-2 (Lane_02)

---

## **§0 — PURPOSE**

Document này khóa **kiến trúc tổng thể** của TAO V1 (Bazi) + TAO V3 (Phong Thủy) module: các layer, các engine, dataflow giữa chúng, integration points với các module khác trong UZG+ ecosystem.

Architecture KHÔNG đặc tả thuật toán chi tiết (xem IMPLEMENTATION SPEC), không liệt kê bảng tra cứu (xem PHONGTHUY REFERENCE), không định nghĩa schema chi tiết của từng JSON field (xem SPEC §11).

Architecture giải đáp: **các thành phần TAO V1/V3 như thế nào? Chúng tương tác ra sao? Khi build, cấu trúc thư mục code phản chiếu cấu trúc gì?**

---

# **SECTION 1 — POSITION IN TAO STACK**

## **§1.1 — Vertical position**

```
ENTA  →  TAO Calendar Engine  →  TAO Bazi Engine  →  Bazi Reading  →  AIER Bazi Advisory
                                                                               ↓
                                                                       Membership / Service / Booking
                                                                               
                              →  TAO Tử Vi Engine    (TAO V2 — separate)
                              
ENTA  →  TAO Phong Thủy Engine  →  Phong Thủy Profile  →  AIER Phong Thủy Advisory
              ↑
       (consumes Cung Mệnh from Bazi if available)
```

## **§1.2 — Horizontal cohesion**

TAO V1 (Bazi), TAO V2 (Tử Vi), TAO V3 (Phong Thủy) are **3 sibling modules** sharing:
- Calendar engine (`TAO_LUNAR_CALENDAR_ALGORITHM_v1`)
- ENTA identity binding
- AIER Tao advisor framework
- QOT trace + audit infrastructure
- Membership gating

But each has **independent**:
- Chart construction logic
- Output schema
- UI surface
- Reading patterns

Architectural principle: **shared inputs, independent processors, distinct outputs, unified advisor wrapper**.

---

# **SECTION 2 — INPUT LAYER (shared with Tử Vi)**

**Architectural role:** Standardize birth data + identity bindings before any calculation.

Bazi và Phong Thủy KHÔNG re-implement calendar normalization. Both consume `normalized_birth_profile` from upstream `TAO_LUNAR_CALENDAR_ALGORITHM_v1` engine.

| Component | Source | Used by Bazi | Used by Phong Thủy |
|---|---|---|---|
| ENTA Identity Binder | ENTA module | ✓ | ✓ |
| Calendar Normalization Engine | `TAO_LUNAR_CALENDAR_ALGORITHM_v1` §3.7 | ✓ | partial (only year+gender for Cung Mệnh) |
| Timezone Resolver | Same | ✓ | partial |
| Validation Gate | `TAO_LUNAR_CALENDAR_ALGORITHM_v1` §3.8 | ✓ | partial |

**Input contract for Bazi:**
- Full `normalized_birth_profile` (year/month/day/hour Can-Chi, polarity, ty_phase)
- Lunar year/month/day with `is_leap_month` flag (for VN-school month pillar)

**Input contract for Phong Thủy (basic):**
- `birth_year_can_chi`
- `gender`
- (Cung Mệnh derived — minimal input)

**Input contract for Phong Thủy (advanced — residence):**
- Above +
- Residence address (encrypted)
- Main entrance direction (compass)
- Construction period (1-9, derived from build year)
- Optional: floor plan vertices

**Critical rule (per LAW 3 in SYSTEM_LAW):**
- Bazi engine MUST consume from calendar engine — không recompute
- ALL pillars (year/month/day/hour Can-Chi) must match Tử Vi values for same person (TAO V1 = VN-school, full pillar alignment with TAO V2)
- Any disagreement = engine bug → halt + escalate

---

# **SECTION 3 — BAZI CORE ENGINES (10 engines)**

Bazi Core Calculation = sequence of 10 engines. Each produces deterministic output that becomes input for next. Sequential dependency graph (§3.11).

## **§3.1 — Pillar Construction Engine**

**Role:** Build 4 Can-Chi pillars from normalized birth profile.

**TAO V1 boundary rules (VN-school, per NTS lock 2026-04-29):**
- Year pillar: Tết Nguyên Đán boundary (mùng 1 tháng Giêng âm lịch)
- Month pillar: lunar month boundary (mùng 1 of each lunar month)
- Result: All 4 pillars match Tử Vi V2 pillars for same person — no divergence.

**Contract:** Input: `normalized_birth_profile` | Output: `4 pillars` with Can + Chi

**Implementation:** SPEC §3 + `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §3

## **§3.2 — Day Master Engine**

**Role:** Identify Day Master (= Can ngày) + element + polarity.

**Contract:** Input: `pillars` | Output: `day_master`, `day_master_element`, `day_master_polarity`

**Implementation:** Pure lookup. SPEC §1.2-1.3.

## **§3.3 — Hidden Stems Engine (Tàng Can)**

**Role:** Extract main + mid + residual hidden stems from each Chi.

**Contract:** Input: `pillars` | Output: `hidden_stems` per pillar

**Implementation:** Lookup table per `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §4.

## **§3.4 — Ten Gods Engine (Thập Thần)**

**Role:** Compute 10-god label cho mỗi non-day-master stem (visible + hidden).

**Contract:** Input: `pillars` + `day_master` + `hidden_stems` | Output: `ten_gods_map` per stem

**Implementation:** `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §5 algorithm (relation × polarity → 10 god types).

## **§3.5 — Twelve Stages Engine (Trường Sinh per stem)**

**Role:** Compute 12-stage life cycle position for day master at each pillar's chi.

**Contract:** Input: `day_master` + `pillars` | Output: `stages` per pillar

**Implementation:** `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §6.

## **§3.6 — Element Distribution Engine**

**Role:** Count + weight elements across all visible + hidden stems.

**Contract:** Input: complete chart (4 stems + 4 main hidden + 4 mid hidden + 4 residual hidden) | Output: `element_count` (5-element histogram)

**Implementation:** Weighted sum (visible: 1.0, main hidden: 0.7, mid: 0.2, residual: 0.1).

## **§3.7 — Day Master Strength Engine**

**Role:** Score Day Master strength using composite (seasonal + element distribution).

**Contract:** Input: `day_master` + `pillars.month` + `element_count` | Output: `strength` ∈ {rất nhược, nhược, cân bằng, vượng, rất vượng}

**Implementation:** SPEC §7 formula (5-state seasonal + element relations + composite scoring).

## **§3.8 — Useful God Engine (Dụng Thần)**

**Role:** Identify primary + secondary useful god + avoid elements.

**Contract:** Input: complete chart + `strength` | Output: `useful_god` object

**Implementation:** SPEC §8 selection rules + Cùng Thông seasonal adjustments.

## **§3.9 — Luck Pillars Engine (Đại Vận)**

**Role:** Compute 8 future luck pillars (10-year cycles) starting from birth month pillar.

**Contract:** Input: `pillars.month` + `polarity` + birth datetime | Output: `luck_pillars[8]` with start_age + end_age + Can-Chi

**Note:** Đại Vận **starting age** is classically computed from days-to-nearest-tiết (3 days = 1 year). This is **internal computation only** — does NOT affect pillar boundary (which is Tết + lunar month per VN-school). NTS may opt for alternative VN-school start-age formula in future amendment if desired.

**Implementation:** SPEC §9 direction rule + 60-pillar cycle.

## **§3.10 — Pillar Relations Engine**

**Role:** Detect Hợp/Khắc/Hình/Xung/Hại/Phá relationships in chart.

**Contract:** Input: complete `pillars` | Output: `pillar_relations` object with all detected relations

**Implementation:** SPEC §10 — scan all stem-stem and chi-chi pairs.

## **§3.11 — Engine sequencing (DAG)**

```
normalized_birth_profile
        ↓
   §3.1 Pillar Construction (4 pillars)
        ↓
   §3.2 Day Master ────┐
        ↓              │
   §3.3 Hidden Stems   │
        ↓              ↓
   §3.4 Ten Gods ──────┤
        ↓              │
   §3.5 Twelve Stages ─┤
        ↓              ↓
   §3.6 Element Distribution
        ↓
   §3.7 Day Master Strength
        ↓
   §3.8 Useful God
        ↓
   §3.9 Luck Pillars
        ↓
   §3.10 Pillar Relations
        ↓
  → Bazi Chart Object (§4)
```

Note: §3.4-3.5 can run in parallel after §3.3.

---

# **SECTION 4 — BAZI OUTPUT LAYER**

## **§4.1 — Bazi Chart Object structure**

Single canonical structure (per `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §18.1):

```
bazi_chart_object = {
    metadata,                # algorithm version, audit, FK
    birth_profile,           # mirrored from calendar engine
    pillars,                 # 4 Can-Chi pillars (immutable)
    day_master,              # central reference
    derived_layers: {        # all from §3 engines
        hidden_stems,
        ten_gods,
        twelve_stages,
        element_distribution,
        day_master_strength,
        useful_god,
        luck_pillars,
        pillar_relations
    }
}
```

## **§4.2 — Storage**

**Architectural decision:** Hybrid Supabase pattern (parallel với Tử Vi):

- Master Bazi chart = single JSONB blob (`bazi_charts.chart_json`) for fast read/write
- Normalized auxiliary tables for analytics queries:
  - `bazi_pillars` (4 rows per chart)
  - `bazi_ten_gods` (variable rows)
  - `bazi_luck_pillars` (8 rows per chart)
  - `bazi_pillar_relations` (variable rows)

## **§4.3 — Immutability**

Bazi chart is **immutable** once computed. Re-compute only when input data changes:
- User corrects birth time (rare)
- User updates timezone (rare)
- Algorithm version bump → trigger regression CI, optionally re-compute existing charts

---

# **SECTION 5 — PHONG THỦY ENGINES (4 engines)**

## **§5.1 — Cung Mệnh Engine**

**Role:** Derive life trigram from year + gender.

**Contract:** Input: `birth_year_can_chi.year` + `gender` | Output: `cung_menh` ∈ {Khảm, Khôn, Chấn, Tốn, Càn, Đoài, Cấn, Ly} + `group` ∈ {Đông Tứ Mệnh, Tây Tứ Mệnh}

**Implementation:** `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §12.2.

**Note:** Cung Mệnh is shared with Bazi/Phong Thủy crossover. Same year+gender → same Cung Mệnh.

## **§5.2 — Bát Trạch Engine**

**Role:** Map Cung Mệnh to 8-direction favorable/unfavorable matrix.

**Contract:** Input: `cung_menh` | Output: `bat_trach_directions` with 4 favorable + 4 unfavorable

**Implementation:** `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §12.5 lookup table.

## **§5.3 — Cửu Cung Phi Tinh Engine**

**Role:** Compute flying star chart for residence (period base + annual + monthly layers).

**Contract:** Input: `construction_period` + `facing_direction` + current year [+ current month] | Output: `phi_tinh_chart` (3 layers × 9 palaces)

**Implementation:** `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §13. Lo Shu sequence + period number.

## **§5.4 — Direction Utilities**

**Role:** Compass angle ↔ 8-direction mapping. Magnetic declination correction.

**Contract:** Input: `compass_angle_degrees` | Output: `direction` ∈ 8 directions

**Implementation:** `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §14.

## **§5.5 — Engine sequencing (DAG)**

```
birth_year + gender
        ↓
   §5.1 Cung Mệnh ─────┐
        ↓              │
   §5.2 Bát Trạch      │   (basic Phong Thủy profile)
        ↓              │
        ├──── Phong Thủy Profile (basic) ←─────────┘
        │
        ↓
[Optional: residence data added]
        ↓
   §5.4 Direction utilities (normalize compass input)
        ↓
   §5.3 Cửu Cung Phi Tinh
        ↓
  → Phong Thủy Profile (full)
```

---

# **SECTION 6 — PHONG THỦY OUTPUT LAYER**

## **§6.1 — Phong Thủy Profile structure**

Per `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §18.2:

```
phongthuy_profile = {
    metadata,
    cung_menh,
    group,                      # Đông Tứ Mệnh / Tây Tứ Mệnh
    ban_menh_tinh,              # 1-9 number
    bat_trach: {
        favorable: { sinh_khi, thien_y, dien_nien, phuc_vi },
        unfavorable: { tuyet_menh, ngu_quy, luc_sat, hoa_hai }
    },
    residence?: {               # OPTIONAL — only if user provides
        address_encrypted,
        main_entrance_direction,
        construction_period,
        facing_direction,
        floor_plan?,
        phi_tinh_chart?
    }
}
```

## **§6.2 — Storage**

- Phong Thủy basic profile (Cung Mệnh + Bát Trạch): always stored if user is Member tier+
- Residence sub-record: separate table `phongthuy_residences` with encryption-at-rest
- Per LAW 12: residence data has Right to be Forgotten — `DELETE FROM phongthuy_residences WHERE user_id = ?` available via UI button

## **§6.3 — Encryption requirements (per LAW 12)**

- Address field: AES-256 at rest, decrypted only on user view request
- Floor plan: stored as encrypted blob
- Audit log per access (who/when/why)
- No cross-user leakage (queries scoped to single user_id)

---

# **SECTION 7 — READING LAYER**

**Architectural role:** Consume chart/profile objects, produce structured interpretation. Reading layer is **derivative** — cannot mutate chart truth.

## **§7.1 — Bazi Reading Modes**

| Mode | Scope | Membership tier |
|---|---|---|
| Bazi Overview | 4 trụ + Day Master basics | Free |
| Day Master Analysis | Strength + element distribution | Member |
| Useful God Reading | Dụng thần + nghề nghiệp guidance | Premium |
| Luck Pillars Timeline | Đại vận 8-cycle visualization + tendencies | Premium |
| Compatibility (2-chart) | Pillar interaction analysis | Premium |
| Annual Bazi (Lưu niên) | Current year pillar interaction with natal | Premium |

## **§7.2 — Phong Thủy Reading Modes**

| Mode | Scope | Membership tier |
|---|---|---|
| Cung Mệnh + Bát Trạch basic | Direction guidance | Free + |
| Bát Trạch full reading | All 8 directions interpretation | Member |
| Residence Mapping | User's actual rooms vs directions | Member (residence opt-in required) |
| Cửu Cung Phi Tinh basic | Period 9 era awareness | Member |
| Cửu Cung Phi Tinh full | Annual + monthly layers + residence-specific | Premium |

## **§7.3 — Reading Output Schema**

```
reading_object = {
    chart_id (FK to bazi_chart or phongthuy_profile),
    reading_mode,
    sections: [
        {
            title,
            content_paragraphs,
            evidence: [pillar_ref | direction_ref | star_ref],
            qot_trace
        }
    ],
    tendencies,
    cautions,                     # never "warnings", always "considerations"
    aier_seed                     # context for AIER advisor
}
```

## **§7.4 — Content discipline (per SYSTEM_LAW)**

- No deterministic claims (LAW 4)
- No fear language (LAW 5, REDLINE 1)
- No prescriptive Phong Thủy ("must buy X") (LAW 6, REDLINE 5)
- Solution-oriented framing for "hung" elements/stars
- Per-section QOT trace mandatory

---

# **SECTION 8 — AIER BAZI / PHONG THỦY ADVISORY LAYER**

## **§8.1 — AIER Tao expanded scope**

AIER Tao now has 3 chart contexts:
- AIER Bazi: bound to bazi_chart
- AIER Tử Vi: bound to ziwei_chart
- AIER Phong Thủy: bound to phongthuy_profile

Single AIER instance can speak all 3 if user has all profiles. Cross-context references allowed.

## **§8.2 — AIER Context Pack expansion**

```
aier_context_pack = {
    user_id,
    enta_profile,
    bazi_chart_id?,
    bazi_chart_summary?,         # compressed Bazi info
    ziwei_chart_id?,
    ziwei_chart_summary?,
    phongthuy_profile_id?,
    phongthuy_summary?,
    current_reading_state,
    user_membership_tier,
    interaction_history,
    governance_rules             # loaded from BOTH SYSTEM_LAWs (V2 + V1/V3)
}
```

## **§8.3 — AIER Bounded Behavior (per `TAO_BAZI_SYSTEM_LAW_v1` §C)**

AIER Bazi/Phong Thủy:
- Reply bound by chart/profile + reading + history
- No free-form advice
- No 'thầy phán' tone
- No prescriptive product recommendations without context

Per REDLINE 3: AIER frames responses as advisor: "theo Bazi của anh, có xu hướng..." NOT "Bazi quyết định...".

## **§8.4 — Cross-module AIER reasoning**

When user has both Bazi + Tử Vi + Phong Thủy:
- AIER can cross-reference patterns ("Theo Bazi dụng thần là Mộc, theo Tử Vi cung Tài có Lộc — đây là điểm cộng hưởng")
- But must explicitly NOT contradict between modules
- If Bazi says X and Tử Vi says X' (apparent conflict), AIER must offer **reconciliation framing**, not pick one

---

# **SECTION 9 — SERVICE LAYER (Membership / Circle Business)**

## **§9.1 — Membership Gates**

| Gate | Public | Member | Premium | Expert Session |
|---|---|---|---|---|
| Sample Bazi (demo) | ✓ | ✓ | ✓ | ✓ |
| Personal Bazi generation | — | ✓ | ✓ | ✓ |
| Bazi Day Master analysis | — | ✓ | ✓ | ✓ |
| Useful God reading | — | — | ✓ | ✓ |
| Luck Pillars timeline | — | — | ✓ | ✓ |
| Compatibility check | — | — | ✓ | ✓ |
| Annual Bazi reading | — | — | ✓ | ✓ |
| Cung Mệnh + Bát Trạch basic | ✓ | ✓ | ✓ | ✓ |
| Bát Trạch full | — | ✓ | ✓ | ✓ |
| Residence Mapping | — | ✓ | ✓ | ✓ |
| Cửu Cung Phi Tinh basic | — | ✓ | ✓ | ✓ |
| Cửu Cung Phi Tinh full | — | — | ✓ | ✓ |
| Live expert consultation | — | — | — | ✓ |

## **§9.2 — Circle Business Hooks**

- Bazi consultation booking (paid expert)
- Phong Thủy on-site visit (paid expert)
- Workshops / livestreams about Bazi / Phong Thủy education
- Vật phẩm phong thủy marketplace (future, gated by REDLINE 5)

**Critical (per LAW 9):** Service hooks fire only on **grounded reading state** + relevant context, not engagement metrics alone.

## **§9.3 — Vendor verification for Phong Thủy products**

If marketplace launches:
- All vendors must be verified
- Product listings cannot use fear language
- Recommendations must be relevance-based (Bát Trạch match), không upsell-driven

---

# **SECTION 10 — CODE STRUCTURE MAPPING**

**Architectural mapping** of TAO V1+V3 to repo `uzgplus` folder structure.

```
D:\UZG\Projects-v2\uzgplus\
├── apps\
│   └── tao\
│       ├── api\
│       │   ├── bazi\
│       │   │   ├── chart\compute        # POST Bazi chart generation
│       │   │   ├── reading\generate     # POST reading layer
│       │   │   ├── compatibility\compute # POST 2-chart relational
│       │   │   └── aier\session         # AIER Bazi session bridge
│       │   └── phongthuy\
│       │       ├── profile\compute      # POST Phong Thủy profile
│       │       ├── residence\           # CRUD residence (encrypted)
│       │       ├── flying-stars\compute # POST Phi Tinh chart
│       │       └── aier\session         # AIER Phong Thủy session
│       └── ui\
│           ├── bazi\                    # Bazi surfaces (Overview, 4 Pillars, Day Master, etc.)
│           └── phongthuy\               # Phong Thủy surfaces (Overview, Bát Trạch, Residence, Phi Tinh)
├── lib\
│   └── tao\
│       ├── calendar\                    # SHARED with Tử Vi
│       │   └── (per TAO_LUNAR_CALENDAR_ALGORITHM_v1)
│       ├── bazi\                        # TAO V1 engines
│       │   ├── pillars.ts               # §3.1
│       │   ├── day-master.ts            # §3.2
│       │   ├── hidden-stems.ts          # §3.3
│       │   ├── ten-gods.ts              # §3.4
│       │   ├── twelve-stages.ts         # §3.5
│       │   ├── element-distribution.ts  # §3.6
│       │   ├── day-master-strength.ts   # §3.7
│       │   ├── useful-god.ts            # §3.8
│       │   ├── luck-pillars.ts          # §3.9
│       │   ├── relations.ts             # §3.10
│       │   ├── pipeline.ts              # main orchestrator
│       │   └── tables\                  # JSON lookup tables
│       │       ├── stem-polarity.json
│       │       ├── hidden-stems.json
│       │       ├── ten-gods-relations.json
│       │       ├── twelve-stages-anchor.json
│       │       ├── nap-am-60.json
│       │       └── pillar-relations.json
│       └── phongthuy\                   # TAO V3 engines
│           ├── cung-menh.ts             # §5.1
│           ├── bat-trach.ts             # §5.2
│           ├── flying-stars.ts          # §5.3
│           ├── direction-utils.ts       # §5.4
│           ├── pipeline.ts              # main orchestrator
│           └── tables\
│               ├── cung-menh-by-year.json
│               ├── bat-trach-direction-matrix.json
│               ├── flying-star-periods.json
│               ├── lo-shu-sequence.json
│               └── trigram-element.json
├── packages\
│   ├── tao-types\                       # SHARED TS types (extended for Bazi + Phong Thủy)
│   │   ├── bazi-chart-object.ts
│   │   ├── phongthuy-profile.ts
│   │   └── pillar-relations.ts
│   └── tao-encryption\                  # Residence data encryption utilities
└── tests\
    └── tao\
        ├── bazi\                        # Bazi test fixtures
        └── phongthuy\                   # Phong Thủy test fixtures
```

**Note:** Folder names are architectural intent, not yet locked. Final naming per CLAC-2 implementation phase.

---

# **SECTION 11 — INTEGRATION POINTS WITH OTHER MODULES**

## **§11.1 — Module integration matrix**

| Module | Integration | Direction |
|---|---|---|
| **ENTA** | Provide identity + birth data; receive day master element upgrade | ENTA ↔ TAO V1/V3 |
| **TAO V2 (Tử Vi)** | Share calendar engine, share AIER advisor wrapper | TAO V1/V3 ↔ TAO V2 |
| **AIER Tao** | Receive Bazi/Phong Thủy context pack | TAO V1/V3 → AIER |
| **Lịch Vạn Niên** | Provide Bazi-aware day energy + Phong Thủy daily flags | TAO V1/V3 → Lịch Vạn Niên |
| **Wallet / U-Reward** | Trigger U for first Bazi reading completion | TAO V1/V3 → Wallet |
| **PLUS Hub** | Expose TAO module mini app (shared with Tử Vi) | PLUS → TAO V1/V3 |
| **CHAT** | AIER Bazi/Phong Thủy chat sessions | TAO V1/V3 ↔ CHAT |
| **Membership Engine** | Gate reading depth | Membership → TAO V1/V3 |
| **Circle Business** | Service hooks for expert reading + vật phẩm marketplace | TAO V1/V3 → Circle Business |
| **QOT** | Each chart + reading + profile has provenance trace | TAO V1/V3 → QOT |
| **Encryption Service** | Residence data encryption at rest | TAO V3 → Encryption |

## **§11.2 — ENTA element upgrade flow**

```
User signs up
  ↓
ENTA basic — element from year nạp âm (priority 2)
  ↓
[Optional] User completes Bazi
  ↓
ENTA element auto-upgraded to Bazi day master element (priority 1)
  ↓
Lịch Vạn Niên + AIER advisory + personalization
gain accuracy boost
```

## **§11.3 — Lịch Vạn Niên integration**

When user has Bazi profile:
- `getDayInfo()` returns enhanced `enta_match` with Bazi-aware scoring
- `findGoodDays()` ranking includes Bazi pillar interactions (per `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §15.1-15.3)

When user has Phong Thủy residence:
- Daily flying star alerts (Premium-gated)
- Annual flying star summary on residence map

## **§11.4 — Combined reading mode (Premium)**

Per `TAO_ZIWEI_ROADMAP_v1` Phase 4.1, Premium feature: combined Bazi + Tử Vi reading.

Architectural pattern:
- Compute both charts independently
- Identify points of convergence (e.g., both flag Tài/wealth area)
- Identify divergence (e.g., Bazi says strength=vượng but Tử Vi cung Mệnh has Hãm star)
- Reading engine offers **reconciliation framing**, không pick winner
- AIER reads combined context

---

# **SECTION 12 — ARCHITECTURAL CONSTRAINTS**

## **§12.1 — Tier hierarchy (per LAW_N1 system)**

This Architecture document is **Tier 2**. It cannot:
- Override Tier 1 Canon (`TAO_ZIWEI_CANON_OFFICIAL_v1`)
- Contradict `TAO_BAZI_SYSTEM_LAW_v1` (peer Tier 2)

It defines:
- Engine boundaries
- Data flow
- Integration contracts

It does NOT define:
- Algorithm details (→ IMPLEMENTATION SPEC)
- UI layouts (→ UI/UX CANON)
- Build sequence (→ ROADMAP)

## **§12.2 — Independence + cohesion**

TAO V1 (Bazi) + TAO V3 (Phong Thủy) MUST:
- Share calendar engine input — no duplication
- Share AIER advisor wrapper — single user-facing AIER Tao
- Share QOT trace infrastructure
- Share membership gating logic

But MUST be:
- Independently versionable (Bazi v1.x can update without Phong Thủy v1.x updating)
- Independently deployable (Phong Thủy can ship before Bazi, or vice versa)
- Independently testable (separate fixtures)

## **§12.3 — Security boundary**

Residence data (Phong Thủy) crosses **sensitive data boundary** per `TAO_BAZI_SYSTEM_LAW_v1` LAW 12. Architectural enforcement:

- `phongthuy_residences` table is **the only place** residence data lives
- Encryption-at-rest mandatory
- Audit log on every read
- No bulk export (e.g., "all Phong Thủy users in Hanoi") — query must be scoped to single user
- AIER context pack does NOT include raw residence — only derived analysis (e.g., "user's main entrance is in their Sinh Khí direction")

---

# **SECTION 13 — SCALABILITY**

## **§13.1 — Compute cost**

Bazi chart computation: ~100-200ms per chart (mostly table lookups).
Phong Thủy profile (basic): ~50ms.
Phong Thủy with full Phi Tinh: ~200ms.
Compatibility check (2 charts): ~300ms.

All deterministic + cacheable.

## **§13.2 — Caching**

- Bazi chart: deterministic per (user, birth_profile) → cache forever (invalidate on input correction)
- Phong Thủy profile: deterministic per (user, year, gender) → cache forever
- Phi Tinh annual: deterministic per (year, residence) → cache 1 year
- Compatibility result: cache by sorted user_id pair → cache 1 month
- Bazi-aware day energy: cache per (user_id, date) → cache 30 days

## **§13.3 — Storage growth**

Per active user (Member+ tier):
- Bazi chart: ~5 KB JSON
- Phong Thủy profile (basic): ~2 KB
- Phong Thủy profile (with residence + Phi Tinh): ~10 KB encrypted blob

For 1M Member+ users: ~17 GB total. Negligible.

---

# **SECTION 14 — VERSION CONTROL**

## **§14.1 — Algorithm version**

Each engine has `algorithm_version` field. Bumping triggers:
- Full regression CI
- Optional: re-compute existing charts with diff alert
- Migration path for users with old charts

## **§14.2 — Schema version**

`bazi_chart_object` schema versioned independently. Backward compatibility for at least 2 major versions.

---

# **AMENDMENT RULE**

Architecture amendments require:
1. Proposal as `TAO_BAZI_SYSTEM_ARCHITECTURE_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Cannot contradict Canon, `TAO_BAZI_SYSTEM_LAW_v1`, or sibling architectures
4. Old version archived

---

# **VERSION LOG**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-29 | Initial — TAO V1 + V3 architecture |
| v1.1 | 2026-04-29 | NTS school lock: full pillar alignment (Tết + lunar month). §2 input contract simplified, §3.1 boundary rules updated to VN-school, §3.9 luck pillars start-age clarified as internal-only computation. |

---

# **SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.1 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ awaiting | — |
| Effective | — | ⏳ pending TAO V1 build phase | — |

**END — TAO_BAZI_SYSTEM_ARCHITECTURE_v1**
