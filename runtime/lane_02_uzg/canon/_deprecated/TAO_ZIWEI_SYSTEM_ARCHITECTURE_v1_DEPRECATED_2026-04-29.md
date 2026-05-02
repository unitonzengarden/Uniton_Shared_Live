# **TAO ZIWEI SYSTEM ARCHITECTURE v1.0**

## **System architecture for TAO V2 (Tử Vi) module — UZG+ ecosystem**

---

**Document ID:** TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1
**Version:** 1.0
**Effective Date:** 2026-04-25
**Authority Level:** Tier 2 (extends Canon, governed by LAW)
**Parent Canon:** `TAO_ZIWEI_CANON_OFFICIAL_v1.md`
**Companion documents:**
- `TAO_ZIWEI_SYSTEM_LAW_v1.md` (constraints)
- `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.md` (build detail)
**Status:** PROPOSED — awaiting NTS approval

---

## **Purpose**

Document này khóa **kiến trúc tổng thể** của TAO V2 module: các layer, các engine, dataflow giữa chúng, integration points với các module khác trong UZG+ ecosystem. Architecture không đặc tả thuật toán chi tiết (xem SPEC), không liệt kê bảng tra cứu (xem SPEC §15), không định nghĩa schema chi tiết của từng JSON field (xem SPEC §12).

Architecture giải đáp câu hỏi: **các thành phần TAO V2 như thế nào? Chúng tương tác ra sao? Khi build, cấu trúc thư mục code phản chiếu cấu trúc gì?**

---

# **SECTION 1 — POSITION IN STACK**

```
ENTA  →  TAO Core Calculation  →  TAO Ziwei Reading  →  AIER Tao Advisory
 |              |                        |                       |
 |              |                        |                       └→ Membership / Circle Business / Service Hooks
 |              |                        └→ Reading layers (Natal / Annual / Cycle / Compatibility)
 |              └→ Chart engine (an cung, an sao, an vòng, an hạn, an Tứ Hóa)
 └→ Identity binding (birth data, gender, ENTA profile)
```

**Architectural principle:** Mỗi layer chỉ consume từ layer trên + produce cho layer dưới. KHÔNG có ngược chiều, KHÔNG có shortcut, KHÔNG có layer skip. (Detail: see Canon §1.2.4 + §0.3)

---

# **SECTION 2 — INPUT LAYER**

**Architectural role:** Standardize birth data + identity bindings before any calculation.

**Components:**

| Component | Responsibility | Detail in SPEC |
|---|---|---|
| ENTA Identity Binder | Pull birth data from ENTA profile if exists | SPEC §3.0 |
| Calendar Normalization Engine | Solar → Lunar conversion, leap month policy, Can-Chi mapping | SPEC §3.7 |
| Timezone Resolver | Local datetime + UTC offset + historical timezone | SPEC §3.6 + Appendix C |
| Validation Gate | Reject invalid input, score confidence | SPEC §3.8 |

**Input contract:** {năm, tháng, ngày, giờ sinh, giới tính, timezone, location, ENTA profile reference}

**Output contract:** Normalized birth profile (see SPEC §3.7) — single canonical structure consumed by all downstream engines.

**Integration with other modules:** ENTA profile may be available → reuse mandatory per LAW 3 of `TAO_ZIWEI_SYSTEM_LAW_v1`.

---

# **SECTION 3 — CORE ENGINES**

Core Calculation = sequence of 8 engines. Each engine produces a deterministic output that becomes input for the next. NO engine writes to upstream layer's data.

## **3.1 Calendar Normalization Engine**

**Role:** Convert raw birth datetime → standardized lunar datetime + Can-Chi layers

**Contract:** Input: solar datetime + timezone | Output: lunar year/month/day + leap_month_flag + Can-Chi year + branch hour

**Implementation detail:** SPEC §3.7

---

## **3.2 Ziwei Chart Engine (Master)**

**Role:** Orchestrator that calls all sub-engines in correct order. Returns structured chart object.

**Contract:** Input: normalized birth profile | Output: complete chart object (palaces + stars + rings + sihua + cycles + validation)

**Implementation detail:** SPEC §12.4

---

## **3.3 Palace & Star Mapping Engine**

**Role:** Set up 12 palaces, locate Mệnh/Thân, determine Cục, place 14 main stars, place auxiliary stars

**Contract:** Input: normalized birth profile | Output: palace positions + star placements

**Implementation detail:** SPEC §4-8

---

## **3.4 Ring Engine**

**Role:** Place Lộc Tồn ring, Tràng Sinh ring, Thái Tuế ring

**Contract:** Input: normalized birth profile + palace map | Output: ring placements as overlay

**Implementation detail:** SPEC §9 + Appendix E

---

## **3.5 Tứ Hóa Engine**

**Role:** Compute natal Tứ Hóa, đại hạn Tứ Hóa, lưu niên Tứ Hóa, phi hóa relationships

**Contract:** Input: Can year + main stars | Output: 4-state dynamic markers per palace

**Implementation detail:** SPEC §10

---

## **3.6 Cycle Engine**

**Role:** Compute Đại vận (10y), Tiểu vận (1y), Lưu niên, Lưu nguyệt, Lưu nhật as overlay layers

**Contract:** Input: birth profile + palace map | Output: time-cycle overlays + nested limit alignment

**Implementation detail:** SPEC §11 + Appendix B + D

---

## **3.7 Tuần / Triệt Engine**

**Role:** Place Tuần Trung Không Vong + Triệt Lộ Không Vong as system regulators

**Contract:** Input: Can year (Tuần) + branch year (Triệt) | Output: void-zone markers across palace pairs

**Implementation detail:** SPEC Appendix A

---

## **3.8 Star Strength Engine**

**Role:** Apply Miếu / Vượng / Đắc / Bình / Hãm coefficient to each star based on palace position

**Contract:** Input: chart object | Output: weighted star strength layer

**Implementation detail:** SPEC Appendix C

---

# **SECTION 4 — OUTPUT LAYER**

**Architectural role:** Produce machine-readable + audit-ready chart object that downstream layers (Reading, AIER, UI) consume.

## **4.1 Chart Object Structure**

Single canonical structure (4 layers):

```
chart_object = {
    chart_metadata,    # nguồn gốc, điều kiện tính toán
    natal_chart,       # cấu trúc lá số gốc (immutable)
    cycle_layers,      # Đại vận / Tiểu vận / Lưu niên (overlay)
    validation         # audit trail, formula version, calculation log
}
```

**Detail:** see SPEC §12.4 (full JSON schema)

## **4.2 Storage**

**Architectural decision:** Hybrid Supabase pattern.

- Master chart = single JSONB blob (`ziwei_charts.chart_json`) for fast read/write
- Normalized auxiliary tables for analytics queries (palaces, main_stars, aux_stars, cycles, validation)

**Detail:** see SPEC §12.4.5

---

# **SECTION 5 — READING LAYER**

**Architectural role:** Consume chart object, produce structured interpretation. Reading layer is **derivative** — it cannot mutate chart truth.

## **5.1 Reading Modes**

| Mode | Scope | Membership tier |
|---|---|---|
| Natal Reading | Cấu trúc lá số gốc (cá tính, mô thức đời) | Free + |
| Life Overview | Trọng đời: nghề, tài, hôn nhân, sức khỏe | Member |
| Annual Reading | Lưu niên năm hiện tại + advisory windows | Member |
| Period Reading | Đại vận hiện tại + transition points | Premium |
| Event Reading | User-specified question grounded on chart | Premium |
| Compatibility | 2-chart relational reading | Premium |

**Detail:** see SPEC §3.3

## **5.2 Reading Output Schema**

```
reading_object = {
    chart_id (FK),
    reading_mode,
    palace_summaries,
    star_summaries,
    strengths,
    risks,
    timing_windows,
    recommendations,
    aier_seed (context for AIER Tao)
}
```

**Detail:** see SPEC §3.4

---

# **SECTION 6 — AIER TAO ADVISORY LAYER**

**Architectural role:** Conversational advisory grounded on chart + reading objects. AIER does NOT generate charts.

## **6.1 AIER Context Pack**

AIER Tao consumes a **context pack** at session start:

```
aier_context_pack = {
    chart_id,
    chart_summary (compressed natal info),
    current_reading_state,
    user_membership_tier,
    interaction_history,
    governance_rules (loaded from SYSTEM_LAW)
}
```

## **6.2 AIER Bounded Behavior**

Per LAW 9 (`TAO_ZIWEI_SYSTEM_LAW_v1`): AIER replies bound by chart + reading + history. No free-form advice.

Per REDLINE 3: AIER never acts as 'thầy phán'. Output framed as advisor, not authority.

---

# **SECTION 7 — SERVICE LAYER (Membership / Circle Business)**

**Architectural role:** Connect TAO output to monetization + community.

## **7.1 Membership Gates**

| Gate | Public | Member | Premium | Expert Session |
|---|---|---|---|---|
| Sample chart (demo) | ✓ | ✓ | ✓ | ✓ |
| Personal chart generation | — | ✓ | ✓ | ✓ |
| Natal reading | — | ✓ | ✓ | ✓ |
| Annual reading | — | ✓ | ✓ | ✓ |
| Period / Event reading | — | — | ✓ | ✓ |
| Compatibility reading | — | — | ✓ | ✓ |
| Live expert consultation | — | — | — | ✓ |

**Detail:** see SPEC §3.5

## **7.2 Circle Business Hooks**

- Booking consultation
- Paid expert reading (1-on-1)
- Workshops / livestreams
- Private circles / premium channels
- Upsell from reading → service → community

**Critical:** Per LAW 8, service hooks fire only on **grounded reading state**, not on engagement signals alone.

---

# **SECTION 8 — PRIORITY / RESONANCE / PRECEDENCE LAYER**

> Source: V3 Appendix F. Architectural rules for resolving conflicts when multiple TAO layers fire simultaneously.

> **Note:** Đây là content gốc từ V2 "PHỤ LỤC 6", renamed → Appendix F. Subsection numbering renamed P6.x → F.x.

## **F.1. Priority Layering**

Khi nhiều lớp chồng nhau, TAO phải đọc theo thứ tự:

1. **Base Natal Truth**  
2. **Decade Overlay**  
3. **Annual Overlay**  
4. **Monthly Overlay**  
5. **Daily / Hourly Precision**

---

## **F.2. Resonance Trigger**

Khi sao lưu trùng với sao gốc hoặc tín hiệu cùng loại chồng lên nhau, hệ thống phải bật cờ **RESONANCE\_TRIGGER**.

### **Ví dụ**

* **Lưu Lộc Tồn** trùng **Lộc Tồn gốc**  
   → `double_wealth_trigger = true`  
* **Lưu Hóa Khoa** kích hoạt đúng sao đã có Khoa bản mệnh  
   → `double_reputation_trigger = true`  
* **Lưu Hóa Kỵ** rơi vào cung đã có hung tinh / Hãm tinh / Hóa Kỵ gốc  
   → `double_conflict_trigger = true`

### **Mức cảnh báo**

* `info`  
* `watch`  
* `high_alert`  
* `golden_opportunity`

### **Quy tắc**

* Resonance **không có nghĩa chắc chắn sự kiện sẽ xảy ra**  
* nhưng là chỉ dấu để advisory engine tăng mức chú ý

---

## **F.3. Conflict Resolution Rule**

Nếu:

* Base tốt  
* Annual xấu  
   thì Annual chỉ được xem là:  
* **disruption inside a good base**

Nếu:

* Base yếu  
* Decade mạnh  
   thì Decade được xem là:  
* **supportive external phase on a weak base**

TAO không được để lớp động overwrite lớp gốc.

---

## **F.4. Overlay schema đề xuất**

{  
 "overlay\_analysis": {  
   "base\_strength": "stable",  
   "decade\_bias": "growth",  
   "annual\_bias": "conflict",  
   "resonance\_flags": {  
     "double\_wealth\_trigger": false,  
     "double\_reputation\_trigger": true,  
     "double\_conflict\_trigger": false  
   },  
   "priority\_resolution": "base\>decade\>annual"  
 }  
}

### **Định nghĩa làm việc**

**Priority / Resonance / Precedence layer là lớp điều phối các overlay động của lá số, bảo đảm hệ thống đọc đúng thứ tự ưu tiên và nhận diện các trạng thái cộng hưởng hoặc xung đột giữa Base, Decade, Annual và các lớp chính xác cao hơn.**

---

---

# **SECTION 9 — CODE STRUCTURE MAPPING**

**Architectural mapping** of TAO V2 to repo `uzgplus` folder structure (Desktop stream owns this).

```
D:\UZG\Projects-v2\uzgplus\
├── apps\
│   └── tao\                              # TAO V2 product surface
│       ├── api\                         # API endpoints
│       │   ├── chart\compute            # POST chart generation
│       │   ├── reading\generate         # POST reading layer
│       │   └── aier\session             # AIER Tao session bridge
│       └── ui\                          # TAO surfaces (Overview, Natal, Life, Annual, AIER)
├── lib\
│   └── tao\                             # TAO V2 engines (no UI)
│       ├── calendar\                   # §3.7 calendar normalization
│       ├── chart\                      # §3.3 master orchestrator
│       ├── palaces\                    # §3.3 palace + star mapping
│       ├── rings\                      # §3.4 Lộc Tồn / Tràng Sinh / Thái Tuế
│       ├── sihua\                      # §3.5 Tứ Hóa
│       ├── cycles\                     # §3.6 Đại vận / Tiểu vận / Lưu niên
│       ├── tuan-triet\                 # §3.7 Appendix A
│       ├── strength\                   # §3.8 star strength matrix
│       └── tables\                     # canonical tables (SPEC §15 + Appendix E)
├── packages\
│   └── tao-types\                       # Shared TS types (chart_object, reading_object)
├── docs\
│   └── TAO\                             # All TAO docs (canon, law, arch, spec, ui/ux, roadmap, build task)
└── tests\
    └── tao\                             # Test cases (lyso, tuviglobal, manual chart, casebook)
```

**Note:** Folder names are architectural intent, not yet locked. Final naming per CLAC-2 implementation phase.

---

# **SECTION 10 — INTEGRATION POINTS WITH OTHER MODULES**

| Module | Integration | Direction |
|---|---|---|
| **ENTA** | Provide identity + birth data | ENTA → TAO (input) |
| **AIER Tao** | Receive context pack from TAO Reading | TAO → AIER (output) |
| **Wallet / U-Reward** | Trigger U for first reading completion (per UZG+ Global Loop) | TAO → Wallet (signal) |
| **PLUS Hub** | Expose TAO module as mini app in springboard | PLUS → TAO (entry) |
| **CHAT** | AIER Tao chat sessions | TAO ↔ CHAT |
| **Membership Engine** | Gate reading depth | Membership → TAO |
| **Circle Business** | Service hooks for paid reading + booking | TAO → Circle Business |
| **QOT** | Each chart + reading has provenance trace | TAO → QOT (audit) |

---

# **AMENDMENT RULE**

Architecture amendments require:
1. Proposal as `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Cannot contradict Canon or LAW
4. Old version archived
