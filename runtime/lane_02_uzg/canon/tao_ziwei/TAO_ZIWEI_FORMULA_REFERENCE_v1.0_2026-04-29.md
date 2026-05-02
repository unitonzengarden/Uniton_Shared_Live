# **TAO ZIWEI FORMULA REFERENCE v1.0**

## **Canonical chart-construction formulas for TAO V2 (Tử Vi) — Layer 2 reference**

---

**Document ID:** TAO_ZIWEI_FORMULA_REFERENCE_v1
**Version:** 1.0
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge — injected on-demand into CLA prompt)
**Authority Level:** Tier 3 (extends SPEC §3-10, references Canon)
**Parent docs:**
- `TAO_ZIWEI_CANON_OFFICIAL_v1.md` (Tier 1 — what TAO is)
- `TAO_ZIWEI_SYSTEM_LAW_v1.md` (Tier 2 — what TAO must not do)
- `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.md` (Tier 2 — full build spec)
- `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.md` (Tier 2 — layers)
**Source material:** `Cach_an_sao_Tu_vi_TAO_UZG.pdf` (thangpham.free.fr) + `CACH_AN_LA_SO_TU_VI.md`
**Status:** ✅ APPROVED for Layer 2 reference
**Issued by:** CLA-2 (Lane_02)

---

## **§0 — PURPOSE & SCOPE**

This document is the **canonical formula reference** for An Lá Số Tử Vi (Ziwei chart construction). It is meant to be:

1. **Pasted/injected** into CLA prompt when CLA needs to verify a chart-formula question, write a task prompt for CLAC-2, or audit an engine output.
2. **A single-source-of-truth** for the procedural rules in `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.md` Part 3-9 — restated in compact, table-first form for fast retrieval.
3. **Executable** — every table here is directly mappable to `lib/tao/tables/*.json` constants in the `uzgplus` repo.

This document does **not** contain interpretive content (no đoán mệnh, no advisory). It is **pure formula**. Interpretation is governed separately by SYSTEM_LAW + AIER Tao prompt template.

**Critical alignment:**
- All outputs of these formulas feed into `chart_object` (SPEC §12.4) — they are immutable `natal_chart` truth.
- All formulas are deterministic. Same input → same output. No randomness.
- All Vietnamese terms preserved as-is (per Canon Glossary — these are domain-locked terms).

---

## **§1 — INPUT REQUIREMENTS (recap from SPEC §3.7)**

Before any formula in this doc applies, input must be normalized:

| Field | Required | Source |
|---|---|---|
| Solar birth datetime (year/month/day/hour/minute) | YES | User input or ENTA |
| Timezone / location | YES | User input or ENTA |
| Gender (Nam / Nữ) | YES | User input or ENTA |
| Lunar year/month/day (with leap_month_flag) | derived | Calendar Engine §3.7 |
| Can-Chi year | derived | Lục Thập Hoa Giáp lookup |
| Can-Chi month | derived | §2.3 below |
| Can-Chi day | derived | Calendar lookup |
| Can-Chi hour (giờ Tý phase aware) | derived | §2.4 below + SPEC Appendix C §C.3 |
| Âm Dương Nam/Nữ | derived | §2.5 below |

**Rule:** Missing hour → chart_status='partial', explicit warning. Per LAW 2 (no chart without validated birth data), engine still returns a partial result but flags it.

---

## **§2 — CALENDAR & CAN-CHI DERIVATION**

### **§2.1 — Vietnam-specific hour adjustment table (PDF source)**

This table is **mandatory** for any Vietnamese user before mapping to Can-Chi hour. Reason: historical Vietnam timezone changes broke direct giờ-sinh → branch mapping.

**Sinh tại Việt Nam:**

| Period | Hour adjustment |
|---|---|
| 01-01-1900 → 31-12-1942 | giờ sinh đúng, không thay đổi |
| 01-01-1943 → 31-03-1945 | giờ sinh trừ đi 1 giờ |
| 01-04-1945 → 31-03-1947 | giờ sinh trừ đi 2 giờ |
| 01-04-1947 → 30-06-1955 | giờ sinh trừ đi 1 giờ |
| 01-07-1955 → 31-12-1959 | giờ sinh đúng, không thay đổi |
| 01-01-1960 → 19-05-1975 | giờ sinh trừ đi 1 giờ |
| 20-05-1975 → ngày nay | giờ sinh đúng, không thay đổi |

**Sinh tại quốc gia có giờ mùa hè:**

| Period | Hour adjustment |
|---|---|
| Mùa đông (20.09 → 20.03) | giờ sinh đúng, không thay đổi |
| Mùa hè (20.03 → 20.09) | giờ sinh trừ đi 1 giờ |

**Sinh tại quốc gia không có giờ mùa hè:** sinh giờ nào tính giờ đó.

**Implementation note:** Build as `getHourAdjustment(birthDateUTC, country, dstFlag)` returning offset in hours. Apply BEFORE mapping to địa chi hour.

---

### **§2.2 — Map adjusted hour → Địa Chi**

| Real hour (24h) | Địa Chi |
|---|---|
| 23:00 – 01:00 | Tý |
| 01:00 – 03:00 | Sửu |
| 03:00 – 05:00 | Dần |
| 05:00 – 07:00 | Mão |
| 07:00 – 09:00 | Thìn |
| 09:00 – 11:00 | Tỵ |
| 11:00 – 13:00 | Ngọ |
| 13:00 – 15:00 | Mùi |
| 15:00 – 17:00 | Thân |
| 17:00 – 19:00 | Dậu |
| 19:00 – 21:00 | Tuất |
| 21:00 – 23:00 | Hợi |

**Edge case — Hour Tý phase (giờ Tý sớm vs muộn):** see SPEC Appendix C §C.3. Quick rule: 23:00–00:00 = giờ Tý of next day (early Tý / Tý đầu); 00:00–01:00 = giờ Tý of same day (late Tý / Tý cuối). System must record which phase. Default policy: split-day at 00:00 (Tý đầu belongs to next-day's Can-Chi day).

---

### **§2.3 — Can month from Can year + lunar month**

```
month_branch = LOOKUP(lunar_month)        # tháng 1 = Dần, tháng 2 = Mão, ... tháng 12 = Sửu
month_can    = TABLE_2_3[year_can, lunar_month]
```

**TABLE_2_3 — Can tháng theo Can năm:**

| Tháng | Địa Chi | Giáp/Kỷ | Ất/Canh | Bính/Tân | Đinh/Nhâm | Mậu/Quý |
|---|---|---|---|---|---|---|
| 1 | Dần | Bính | Mậu | Canh | Nhâm | Giáp |
| 2 | Mão | Đinh | Kỷ | Tân | Quý | Ất |
| 3 | Thìn | Mậu | Canh | Nhâm | Giáp | Bính |
| 4 | Tỵ | Kỷ | Tân | Quý | Ất | Đinh |
| 5 | Ngọ | Canh | Nhâm | Giáp | Bính | Mậu |
| 6 | Mùi | Tân | Quý | Ất | Đinh | Kỷ |
| 7 | Thân | Nhâm | Giáp | Bính | Mậu | Canh |
| 8 | Dậu | Quý | Ất | Đinh | Kỷ | Tân |
| 9 | Tuất | Giáp | Bính | Mậu | Canh | Nhâm |
| 10 | Hợi | Ất | Đinh | Kỷ | Tân | Quý |
| 11 | Tý | Bính | Mậu | Canh | Nhâm | Giáp |
| 12 | Sửu | Đinh | Kỷ | Tân | Quý | Ất |

**Example:** sinh năm Giáp + tháng 8 → Quý Dậu.

---

### **§2.4 — Can hour from Can day + giờ địa chi**

**TABLE_2_4 — Can giờ theo Can ngày:**

| Giờ (real) | Địa Chi | Giáp/Kỷ | Ất/Canh | Bính/Tân | Đinh/Nhâm | Mậu/Quý |
|---|---|---|---|---|---|---|
| 23–01 | Tý | Giáp | Bính | Mậu | Canh | Nhâm |
| 01–03 | Sửu | Ất | Đinh | Kỷ | Tân | Quý |
| 03–05 | Dần | Bính | Mậu | Canh | Nhâm | Giáp |
| 05–07 | Mão | Đinh | Kỷ | Tân | Quý | Ất |
| 07–09 | Thìn | Mậu | Canh | Nhâm | Giáp | Bính |
| 09–11 | Tỵ | Kỷ | Tân | Quý | Ất | Đinh |
| 11–13 | Ngọ | Canh | Nhâm | Giáp | Bính | Mậu |
| 13–15 | Mùi | Tân | Quý | Ất | Đinh | Kỷ |
| 15–17 | Thân | Nhâm | Giáp | Bính | Mậu | Canh |
| 17–19 | Dậu | Quý | Ất | Đinh | Kỷ | Tân |
| 19–21 | Tuất | Giáp | Bính | Mậu | Canh | Nhâm |
| 21–23 | Hợi | Ất | Đinh | Kỷ | Tân | Quý |

**Example:** sinh ngày Mậu + 10:00 (giờ Tỵ) → Đinh Tỵ.

---

### **§2.5 — Âm Dương Nam/Nữ resolution**

```
year_branch_polarity = {
  Tý:+, Sửu:-, Dần:+, Mão:-, Thìn:+, Tỵ:-,
  Ngọ:+, Mùi:-, Thân:+, Dậu:-, Tuất:+, Hợi:-
}

if year_branch_polarity == '+' AND gender == Nam → Dương Nam
if year_branch_polarity == '+' AND gender == Nữ  → Dương Nữ
if year_branch_polarity == '-' AND gender == Nam → Âm Nam
if year_branch_polarity == '-' AND gender == Nữ  → Âm Nữ
```

This 4-state value is critical for: Tràng Sinh direction, Lộc Tồn ring direction, Đại vận direction, Hỏa Tinh / Linh Tinh direction.

---

## **§3 — CHART LAYOUT (12 PALACES)**

### **§3.1 — Two layouts (display)**

PDF source defines two visual layouts. Engine output is layout-agnostic; UI chooses.

**CÁCH XƯA (4×4 with central địa bàn):**

```
TỴ   NGỌ  MÙI  THÂN
THÌN [địa bàn] DẬU
MÃO  [   ]    TUẤT
DẦN  SỬU  TÝ  HỢI
```

**CÁCH NAY (4×4 with corner palaces, polarity marked):**

```
THÌN(+)  TỴ(-)   NGỌ(+)  MÙI(-)
MÃO(-)   [địa bàn]       THÂN(+)
DẦN(+)   [    ]          DẬU(-)
SỬU(-)   TÝ(+)   HỢI(-)  TUẤT(+)
```

UZG+ default: **CÁCH NAY** per Master UI/UX Canon (NTS to confirm; can A/B test).

### **§3.2 — Direction conventions (locked)**

- **Chiều thuận** = clockwise (Dần → Mão → Thìn → ...)
- **Chiều nghịch** = counter-clockwise (Dần → Sửu → Tý → ...)
- All formulas below state direction explicitly.

---

## **§4 — AN CUNG MỆNH & THÂN**

### **§4.1 — Algorithm (procedural)**

```
1. Start at cung Dần. Call it "tháng 1".
2. Count clockwise (chiều thuận) up to lunar_month → land at palace P1.
3. From P1, call it "giờ Tý".
4. Count counter-clockwise (chiều nghịch) up to giờ_sinh → land at palace P2.
5. P2 = Cung Mệnh.

For Cung Thân:
1. Same as steps 1-3.
2. From P1, count CLOCKWISE (chiều thuận) up to giờ_sinh → land at palace P3.
3. P3 = Cung Thân.
```

**Implementation:** simple modular arithmetic on 12-element ring.

### **§4.2 — Direct lookup table (Cung Mệnh by month + hour)**

| Tháng \ Giờ | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Giêng | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão |
| Hai | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn |
| Ba | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ |
| Tư | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ |
| Năm | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi |
| Sáu | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân |
| Bảy | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu |
| Tám | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất |
| Chín | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi |
| Mười | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý |
| Mười Một | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu |
| Chạp | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần |

After Cung Mệnh is placed, the other 11 palaces fill clockwise in fixed order: **Mệnh → Phụ Mẫu → Phúc Đức → Điền Trạch → Quan Lộc → Nô Bộc → Thiên Di → Tật Ách → Tài Bạch → Tử Tức → Phu Thê → Huynh Đệ → (Mệnh)**.

### **§4.3 — Cung Thân direct lookup**

| Sinh giờ | Thân an tại |
|---|---|
| Tý | Mệnh |
| Sửu | Phúc Đức |
| Dần | Quan Lộc |
| Mão | Thiên Di |
| Thìn | Tài Bạch |
| Tỵ | Phu/Thê |
| Ngọ | Mệnh |
| Mùi | Phúc Đức |
| Thân | Quan Lộc |
| Dậu | Thiên Di |
| Tuất | Tài Bạch |
| Hợi | Phu/Thê |

---

## **§5 — AN THIÊN CAN CHO 12 CUNG**

After Cung Mệnh is placed, each of the 12 palaces gets a Thiên Can derived from the year's Can. Algorithm: see SPEC §5.x. Quick reference: month-Can-from-year-Can table (§2.3) is repurposed — palace branches map to month positions, palace Cans follow the same 5-column lookup. (Engineers: implement as lookup `palace_can_table[year_can, palace_branch]`.)

---

## **§6 — CỤC (NGŨ HÀNH CỤC)**

Cục is determined by **Can year × Cung Mệnh palace pair**.

| Can năm | Tý-Sửu | Dần-Mão | Thìn-Tỵ | Ngọ-Mùi | Thân-Dậu | Tuất-Hợi |
|---|---|---|---|---|---|---|
| Giáp/Kỷ | Thủy 2 | Hỏa 6 | Mộc 3 | Thổ 5 | Kim 4 | Hỏa 6 |
| Ất/Canh | Hỏa 6 | Thổ 5 | Kim 4 | Mộc 3 | Thủy 2 | Thổ 5 |
| Bính/Tân | Thổ 5 | Mộc 3 | Thủy 2 | Kim 4 | Hỏa 6 | Mộc 3 |
| Đinh/Nhâm | Mộc 3 | Kim 4 | Hỏa 6 | Thủy 2 | Thổ 5 | Kim 4 |
| Mậu/Quý | Kim 4 | Thủy 2 | Thổ 5 | Hỏa 6 | Mộc 3 | Thủy 2 |

**Output:** `cuc_element` ∈ {Thủy, Mộc, Kim, Thổ, Hỏa} + `cuc_number` ∈ {2, 3, 4, 5, 6}.

**Example:** Mệnh tại Thìn, sinh năm Đinh → Hỏa 6 cục.

---

## **§7 — AN SAO TỬ VI**

### **§7.1 — Algorithm**

Sao Tử Vi is placed using a `(cuc_number, lunar_day)` lookup. Each cục has its own table. The PDF gives a **5-table compact form** (Thủy 2 / Mộc 3 / Kim 4 / Thổ 5 / Hỏa 6). Implement as `getZiweiPosition(cuc_element, lunar_day)` returning a địa chi.

### **§7.2 — Tử Vi position tables (compact, executable)**

**Thủy 2 cục (`tử vi` position by lunar day):**

```
day  1: Sửu  | day  2: Dần  | day  3: Dần  | day  4: Mão
day  5: Mão  | day  6: Thìn | day  7: Thìn | day  8: Tỵ
day  9: Tỵ  | day 10: Ngọ  | day 11: Ngọ  | day 12: Mùi
day 13: Mùi  | day 14: Thân | day 15: Thân | day 16: Dậu
day 17: Dậu  | day 18: Tuất | day 19: Tuất | day 20: Hợi
day 21: Hợi  | day 22: Tý   | day 23: Tý   | day 24: Sửu
day 25: Sửu  | day 26: Dần  | day 27: Dần  | day 28: Mão
day 29: Mão  | day 30: Thìn
```

**Mộc 3 cục:**

```
day  1: Thìn | day  2: Sửu  | day  3: Dần  | day  4: Tỵ
day  5: Dần  | day  6: Mão  | day  7: Ngọ  | day  8: Mão
day  9: Thìn | day 10: Mùi  | day 11: Thìn | day 12: Tỵ
day 13: Thân | day 14: Tỵ  | day 15: Ngọ  | day 16: Dậu
day 17: Ngọ  | day 18: Mùi  | day 19: Tuất | day 20: Mùi
day 21: Thân | day 22: Hợi  | day 23: Thân | day 24: Dậu
day 25: Tý   | day 26: Dậu  | day 27: Tuất | day 28: Sửu
day 29: Tuất | day 30: Hợi
```

**Kim 4 cục:**

```
day  1: Hợi  | day  2: Thìn | day  3: Sửu  | day  4: Dần
day  5: Tý   | day  6: Tỵ   | day  7: Dần  | day  8: Mão
day  9: Sửu  | day 10: Ngọ  | day 11: Mão  | day 12: Thìn
day 13: Dần  | day 14: Mùi  | day 15: Thìn | day 16: Tỵ
day 17: Mão  | day 18: Thân | day 19: Tỵ   | day 20: Ngọ
day 21: Thìn | day 22: Dậu  | day 23: Ngọ  | day 24: Mùi
day 25: Tỵ   | day 26: Tuất | day 27: Mùi  | day 28: Thân
day 29: Ngọ  | day 30: Hợi
```

**Thổ 5 cục:**

```
day  1: Ngọ  | day  2: Hợi  | day  3: Thìn | day  4: Sửu
day  5: Dần  | day  6: Mùi  | day  7: Tý   | day  8: Tỵ
day  9: Dần  | day 10: Mão  | day 11: Thân | day 12: Sửu
day 13: Ngọ  | day 14: Mão  | day 15: Thìn | day 16: Dậu
day 17: Dần  | day 18: Mùi  | day 19: Thìn | day 20: Tỵ
day 21: Tuất | day 22: Mão  | day 23: Thân | day 24: Tỵ
day 25: Ngọ  | day 26: Hợi  | day 27: Thìn | day 28: Dậu
day 29: Ngọ  | day 30: Mùi
```

**Hỏa 6 cục:**

```
day  1: Dậu  | day  2: Ngọ  | day  3: Hợi  | day  4: Thìn
day  5: Sửu  | day  6: Dần  | day  7: Tuất | day  8: Mùi
day  9: Tý   | day 10: Tỵ   | day 11: Dần  | day 12: Mão
day 13: Hợi  | day 14: Thân | day 15: Sửu  | day 16: Ngọ
day 17: Mão  | day 18: Thìn | day 19: Tý   | day 20: Dậu
day 21: Dần  | day 22: Mùi  | day 23: Thìn | day 24: Tỵ
day 25: Sửu  | day 26: Tuất | day 27: Mão  | day 28: Thân
day 29: Tỵ   | day 30: Ngọ
```

> **Cross-check note:** PDF source presents these as visual grids. The compact form above is the engineer-friendly row-form. CLAC-2 must verify against PDF visual on T-TAO-004 implementation. Mộc 3, Kim 4, Thổ 5 day-positions are inferred from PDF layout; CLAC-2 cross-check vs lyso.vn + tuviglobal during test phase. **If discrepancy — PDF visual wins, this table updated via amendment.**

---

## **§8 — AN VÒNG TỬ VI (6 SAO) + VÒNG THIÊN PHỦ (8 SAO) = 14 CHÍNH TINH**

### **§8.1 — Position of Thiên Phủ from Tử Vi**

Tử Vi and Thiên Phủ form a mirror pair across an axis:

| Tử Vi | Thiên Phủ |
|---|---|
| Tý | Thìn |
| Sửu | Mão |
| Dần | Dần (same — đồng cung) |
| Mão | Sửu |
| Thìn | Tý |
| Tỵ | Hợi |
| Ngọ | Tuất |
| Mùi | Dậu |
| Thân | Thân (same — đồng cung) |
| Dậu | Mùi |
| Tuất | Ngọ |
| Hợi | Tỵ |

### **§8.2 — Vòng Tử Vi (place clockwise from Tử Vi)**

| Star | Position rule (clockwise from Tử Vi) |
|---|---|
| Tử Vi | base |
| Liêm Trinh | Tử Vi + 4 (i.e., 3 cung after) |
| Thiên Đồng | Liêm Trinh + 3 |
| Vũ Khúc | Thiên Đồng + 1 |
| Thái Dương | Vũ Khúc + 1 |
| Thiên Cơ | Thái Dương + 2 (1 cung gap) |

### **§8.3 — Vòng Thiên Phủ (place clockwise from Thiên Phủ)**

| Star | Position rule (clockwise from Thiên Phủ) |
|---|---|
| Thiên Phủ | base |
| Thái Âm | Thiên Phủ + 1 |
| Tham Lang | Thái Âm + 1 |
| Cự Môn | Tham Lang + 1 |
| Thiên Tướng | Cự Môn + 1 |
| Thiên Lương | Thiên Tướng + 1 |
| Thất Sát | Thiên Lương + 1 |
| Phá Quân | Thất Sát + 4 (3 cung gap) |

### **§8.4 — Direct lookup (14 chính tinh by Tử Vi position)**

| Tử Vi tại → | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Liêm Trinh | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão |
| Thiên Đồng | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ |
| Vũ Khúc | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi |
| Thái Dương | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân |
| Thiên Cơ | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất |
| Thiên Phủ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ |
| Thái Âm | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ |
| Tham Lang | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi |
| Cự Môn | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân |
| Thiên Tướng | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu |
| Thiên Lương | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất |
| Thất Sát | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi |
| Phá Quân | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão |

This is the **canonical T-TAO-004 fixture**. Engine output for any `tử_vi_position` must match this row exactly.

---

## **§9 — VÒNG SAO LỚN**

### **§9.1 — Vòng Tràng Sinh (12 sao) — by Cục + polarity**

**Dương Nam + Âm Nữ → place CLOCKWISE:**

| Star \ Cục | Thủy | Mộc | Kim | Thổ | Hỏa |
|---|---|---|---|---|---|
| Tràng Sinh | Thân | Hợi | Tỵ | Thân | Dần |
| Mộc Dục | Dậu | Tý | Ngọ | Dậu | Mão |
| Quan Đới | Tuất | Sửu | Mùi | Tuất | Thìn |
| Lâm Quan | Hợi | Dần | Thân | Hợi | Tỵ |
| Đế Vượng | Tý | Mão | Dậu | Tý | Ngọ |
| Suy | Sửu | Thìn | Tuất | Sửu | Mùi |
| Bệnh | Dần | Tỵ | Hợi | Dần | Thân |
| Tử | Mão | Ngọ | Tý | Mão | Dậu |
| Mộ | Thìn | Mùi | Sửu | Thìn | Tuất |
| Tuyệt | Tỵ | Thân | Dần | Tỵ | Hợi |
| Thai | Ngọ | Dậu | Mão | Ngọ | Tý |
| Dưỡng | Mùi | Tuất | Thìn | Mùi | Sửu |

**Dương Nữ + Âm Nam → place COUNTER-CLOCKWISE:**

| Star \ Cục | Thủy | Mộc | Kim | Thổ | Hỏa |
|---|---|---|---|---|---|
| Tràng Sinh | Tý | Mão | Dậu | Tý | Ngọ |
| Mộc Dục | Hợi | Dần | Thân | Hợi | Tỵ |
| Quan Đới | Tuất | Sửu | Mùi | Tuất | Thìn |
| Lâm Quan | Dậu | Tý | Ngọ | Dậu | Mão |
| Đế Vượng | Thân | Hợi | Tỵ | Thân | Dần |
| Suy | Mùi | Tuất | Thìn | Mùi | Sửu |
| Bệnh | Ngọ | Dậu | Mão | Ngọ | Tý |
| Tử | Tỵ | Thân | Dần | Tỵ | Hợi |
| Mộ | Thìn | Mùi | Sửu | Thìn | Tuất |
| Tuyệt | Mão | Ngọ | Tý | Mão | Dậu |
| Thai | Dần | Tỵ | Hợi | Dần | Thân |
| Dưỡng | Sửu | Thìn | Tuất | Sửu | Mùi |

### **§9.2 — Vòng Thái Tuế (12 sao) — by Năm Sinh (always clockwise)**

| Star \ Năm | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Thái Tuế | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
| Thiếu Dương | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý |
| Tang Môn | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu |
| Thiếu Âm | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần |
| Quan Phù | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão |
| Tử Phù | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn |
| Tuế Phá | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ |
| Long Đức | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ |
| Bạch Hổ | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi |
| Phúc Đức | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân |
| Điếu Khách | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu |
| Trực Phù | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất |

### **§9.3 — Vòng Lộc Tồn (12 sao) — by Can năm + polarity**

**Anchor stars from Can year:**

| Star | Giáp | Ất | Bính | Đinh | Mậu | Kỷ | Canh | Tân | Nhâm | Quý |
|---|---|---|---|---|---|---|---|---|---|---|
| Đà La | Sửu | Dần | Thìn | Tỵ | Thìn | Tỵ | Mùi | Thân | Tuất | Hợi |
| **Lộc Tồn** | Dần | Mão | Tỵ | Ngọ | Tỵ | Ngọ | Thân | Dậu | Hợi | Tý |
| Kình Dương | Mão | Thìn | Ngọ | Mùi | Ngọ | Mùi | Dậu | Tuất | Tý | Sửu |

- **Dương Nam + Âm Nữ:** Đà La / Lộc Tồn / Kình Dương placed CLOCKWISE.
- **Dương Nữ + Âm Nam:** same triple but reversed direction (Kình Dương / Lộc Tồn / Đà La placed CLOCKWISE — i.e., the ring of 12 followers spins counter-clockwise from Lộc Tồn).

**The 12 followers (Bác Sĩ ring):**

Bác Sĩ → Lực Sĩ → Thanh Long → Tiểu Hao → Tướng Quân → Tấu Thư → Phi Liêm → Hỷ Thần → Bệnh Phù → Đại Hao → Phục Binh → Quan Phủ → (back to Bác Sĩ).

Bác Sĩ is co-located with Lộc Tồn. Place 11 followers in the direction determined by polarity.

---

## **§10 — TỨ HÓA (NATAL)**

By **Can năm**, four main stars take Tứ Hóa markers:

| Can năm | Hóa Lộc | Hóa Quyền | Hóa Khoa | Hóa Kỵ |
|---|---|---|---|---|
| Giáp | Liêm Trinh | Phá Quân | Vũ Khúc | Thái Dương |
| Ất | Thiên Cơ | Thiên Lương | Tử Vi | Thái Âm |
| Bính | Thiên Đồng | Thiên Cơ | Văn Xương | Liêm Trinh |
| Đinh | Thái Âm | Thiên Đồng | Thiên Cơ | Cự Môn |
| Mậu | Tham Lang | Thái Âm | Hữu Bật | Thiên Cơ |
| Kỷ | Vũ Khúc | Tham Lang | Thiên Lương | Văn Khúc |
| Canh | Thái Dương | Vũ Khúc | Thái Âm | Thiên Đồng |
| Tân | Cự Môn | Thiên Lương | Văn Khúc | Văn Xương |
| Nhâm | Thiên Lương | Tử Vi | Tả Phụ | Vũ Khúc |
| Quý | Phá Quân | Cự Môn | Thái Âm | Tham Lang |

**Output:** for each of the 4 Tứ Hóa, the marker is attached to the palace where the named star sits in this chart. Markers are queryable per-palace.

---

## **§11 — PHỤ TINH (auxiliary stars — minimal set)**

### **§11.1 — By Năm sinh (Địa Chi)**

| Star \ Năm | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Phượng Các | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi |
| Giải Thần | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi |
| Long Trì | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão |
| Nguyệt Đức | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn |
| Thiên Đức | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân |
| Thiên Hỷ | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất |
| Thiên Mã | Dần | Hợi | Thân | Tỵ | Dần | Hợi | Thân | Tỵ | Dần | Hợi | Thân | Tỵ |
| Thiên Khốc | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi |
| Thiên Hư | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ |
| Đào Hoa | Dậu | Ngọ | Mão | Tý | Dậu | Ngọ | Mão | Tý | Dậu | Ngọ | Mão | Tý |
| Hồng Loan | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn |
| Hoa Cái | Thìn | Sửu | Tuất | Mùi | Thìn | Sửu | Tuất | Mùi | Thìn | Sửu | Tuất | Mùi |
| Kiếp Sát | Tỵ | Dần | Hợi | Thân | Tỵ | Dần | Hợi | Thân | Tỵ | Dần | Hợi | Thân |
| Phá Toái | Tỵ | Sửu | Dậu | Tỵ | Sửu | Dậu | Tỵ | Sửu | Dậu | Tỵ | Sửu | Dậu |
| Cô Thần | Dần | Dần | Tỵ | Tỵ | Tỵ | Thân | Thân | Thân | Hợi | Hợi | Hợi | Dần |
| Quả Tú | Tuất | Tuất | Sửu | Sửu | Sửu | Thìn | Thìn | Thìn | Mùi | Mùi | Mùi | Tuất |

### **§11.2 — By Giờ sinh**

| Star \ Giờ | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Văn Xương | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi |
| Văn Khúc | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão |
| Địa Không | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý |
| Địa Kiếp | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất |
| Thai Phụ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ |
| Phong Cáo | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu |

### **§11.3 — Hỏa Tinh (by hour + năm trio + polarity)**

**Tuổi:** trio of Địa Chi → 4 trios: {Tý-Thìn-Thân}, {Sửu-Tỵ-Dậu}, {Dần-Ngọ-Tuất}, {Mão-Mùi-Hợi}.

**Dương Nam + Âm Nữ → place CLOCKWISE from base position by giờ sinh:**

| Tuổi trio \ Giờ | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Tý-Thìn-Thân | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu |
| Sửu-Tỵ-Dậu | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần |
| Dần-Ngọ-Tuất | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý |
| Mão-Mùi-Hợi | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân |

**Dương Nữ + Âm Nam → place COUNTER-CLOCKWISE:**

| Tuổi trio \ Giờ | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Tý-Thìn-Thân | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão |
| Sửu-Tỵ-Dậu | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn |
| Dần-Ngọ-Tuất | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần |
| Mão-Mùi-Hợi | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi | Tuất |

### **§11.4 — Linh Tinh (by hour + năm trio + polarity)**

Two trios only: {Dần-Ngọ-Tuất} vs all others.

**Dương Nam + Âm Nữ → place COUNTER-CLOCKWISE from base position by giờ sinh:**

| Tuổi \ Giờ | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dần-Ngọ-Tuất | Mão | Dần | Sửu | Tý | Hợi | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn |
| Khác | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi |

**Dương Nữ + Âm Nam → place CLOCKWISE:**

| Tuổi \ Giờ | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dần-Ngọ-Tuất | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần |
| Khác | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu |

### **§11.5 — Tả Phụ + Hữu Bật (by Tháng sinh)**

| Star \ Tháng | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Tả Phụ | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão |
| Hữu Bật | Tuất | Dậu | Thân | Mùi | Ngọ | Tỵ | Thìn | Mão | Dần | Sửu | Tý | Hợi |

### **§11.6 — Other tháng-driven stars**

| Star \ Tháng | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Thiên Hình | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân |
| Thiên Riêu | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý |
| Thiên Y | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý |
| Thiên Giải | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi |
| Địa Giải | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ |

### **§11.7 — Other Can năm-driven stars**

| Star \ Can năm | Giáp | Ất | Bính | Đinh | Mậu | Kỷ | Canh | Tân | Nhâm | Quý |
|---|---|---|---|---|---|---|---|---|---|---|
| Lưu Hà | Dậu | Tuất | Mùi | Thìn | Tỵ | Ngọ | Thân | Mão | Hợi | Dần |
| Quốc Ấn | Tuất | Hợi | Sửu | Dần | Sửu | Dần | Thìn | Tỵ | Mùi | Thân |
| Đường Phù | Mùi | Thân | Tuất | Hợi | Tuất | Hợi | Sửu | Dần | Thìn | Tỵ |
| Văn Tinh | Tỵ | Ngọ | Thân | Dậu | Thân | Dậu | Hợi | Tý | Dậu | Mão |
| Thiên Khôi | Sửu | Tý | Hợi | Hợi | Sửu | Tý | Ngọ | Ngọ | Mão | Mão |
| Thiên Việt | Mùi | Thân | Dậu | Dậu | Mùi | Thân | Dần | Dần | Tỵ | Tỵ |
| Thiên Quan | Mùi | Thìn | Tỵ | Dần | Mão | Dậu | Hợi | Dậu | Tuất | Ngọ |
| Thiên Phúc | Dậu | Thân | Tý | Hợi | Mão | Dần | Ngọ | Tỵ | Ngọ | Tỵ |
| Thiên Trù | Tỵ | Ngọ | Tý | Tỵ | Ngọ | Thân | Dần | Ngọ | Dậu | Tuất |

### **§11.8 — Mệnh Chủ + Thân Chủ (from Cung Mệnh palace)**

| Mệnh cư | Sao Mệnh Chủ | | Thân cư | Sao Thân Chủ |
|---|---|---|---|---|
| Tý | Tham Lang | | Tý | Linh Tinh |
| Sửu | Cự Môn | | Sửu | Thiên Tướng |
| Dần | Lộc Tồn | | Dần | Thiên Lương |
| Mão | Văn Khúc | | Mão | Thiên Đồng |
| Thìn | Liêm Trinh | | Thìn | Văn Xương |
| Tỵ | Vũ Khúc | | Tỵ | Thiên Cơ |
| Ngọ | Phá Quân | | Ngọ | Hỏa Tinh |
| Mùi | Vũ Khúc | | Mùi | Thiên Tướng |
| Thân | Liêm Trinh | | Thân | Thiên Lương |
| Dậu | Văn Khúc | | Dậu | Thiên Đồng |
| Tuất | Lộc Tồn | | Tuất | Văn Xương |
| Hợi | Cự Môn | | Hợi | Thiên Cơ |

---

## **§12 — TUẦN / TRIỆT (void-zone markers)**

### **§12.1 — Tuần Trung Không Vong (by Can-Chi năm)**

Tuần is placed **between two palaces** (a pair of consecutive Địa Chi). Lookup pair from Can year + the Địa Chi pair the year falls into:

| Tuần đặt giữa | Giáp | Ất | Bính | Đinh | Mậu | Kỷ | Canh | Tân | Nhâm | Quý |
|---|---|---|---|---|---|---|---|---|---|---|
| Tý-Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
| Dần-Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu |
| Thìn-Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão |
| Ngọ-Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ |
| Thân-Dậu | Tuất | Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi |
| Tuất-Hợi | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu |

### **§12.2 — Triệt Lộ Không Vong (by Can năm) — placed between two palaces**

| Can năm | Giáp/Kỷ | Ất/Canh | Bính/Tân | Đinh/Nhâm | Mậu/Quý |
|---|---|---|---|---|---|
| Triệt giữa | Thân-Dậu | Ngọ-Mùi | Thìn-Tỵ | Dần-Mão | Tý-Sửu |

**Tuần** affects 2 palaces (the pair). **Triệt** affects 2 palaces (the pair). Both flagged on chart_object as `void_markers[]` overlay.

---

## **§13 — MISC SAO (positional rules from PDF)**

| Sao | Rule |
|---|---|
| Đẩu Quân | Call Thái Tuế "tháng Giêng", count counter-clockwise to lunar_month, then count clockwise hour from there. |
| Thiên Không | Place clockwise immediately after Thái Tuế. Co-located with Thiếu Dương. |
| Thiên Tài | Call Cung Mệnh "năm Tý", count clockwise to năm sinh. |
| Thiên Thọ | Call Cung Thân "năm Tý", count clockwise to năm sinh. |
| Thiên Quý | From Văn Khúc as 1, count counter-clockwise to ngày sinh, back 1 cung. |
| Ân Quang | From Văn Xương as 1, count clockwise to ngày sinh, back 1 cung. |
| Tam Thai | From Tả Phụ as 1, count clockwise to ngày sinh. |
| Bát Tọa | From Hữu Bật as 1, count counter-clockwise to ngày sinh. |
| Thiên Thương | Always at Cung Nô Bộc. |
| Thiên Sứ | Always at Cung Tật Ách. |
| Thiên La | Always at Cung Thìn. |
| Địa Võng | Always at Cung Tuất. |

---

## **§14 — STAR STRENGTH SCORING (Miếu / Vượng / Đắc / Bình / Hãm / Cực Hãm)**

PDF source defines a 3-axis scoring rubric per star per palace:

| Axis | Match (0) | Mismatch (x) |
|---|---|---|
| Âm Dương | Star polarity matches palace polarity | Mismatch |
| Ngũ Hành | Same element OR sinh-nhập | Khắc-nhập or khắc-xuất |
| Phương Hướng | Star native direction matches palace direction | Mismatch |

| Score | Result |
|---|---|
| 000 (3 matches) | Miếu địa |
| 00 (2 matches) | Vượng địa |
| 0 (1 match) | Đắc địa |
| x (1 mismatch) | Hãm địa |
| xxx (3 mismatches) | Cực hãm |
| Mixed | Bình địa |

**Implementation:** SPEC Appendix C provides star-by-star native polarity / element / direction tables. This scoring runs once per `(star, palace)` pair after placement is done.

**UI rule (per UI/UX §2.2):** color the strength label, NEVER use red/green binary good/bad (LAW 4 + LAW 5).

---

## **§15 — VALIDATION CHECKLIST (canonical test fixture)**

Any chart engine implementing §1-§14 MUST pass:

- [ ] Calendar conversion matches Vạn Niên Lịch reference
- [ ] Vietnam timezone adjustment applied per §2.1
- [ ] Hour Tý phase (early/late) recorded explicitly
- [ ] Cung Mệnh + Cung Thân match §4.2 + §4.3 lookup
- [ ] All 12 palaces placed clockwise from Mệnh in standard 12-name order
- [ ] Cục matches §6 lookup
- [ ] Tử Vi position matches §7.2 cục-day table
- [ ] All 14 chính tinh match §8.4 row for given Tử Vi position
- [ ] Vòng Tràng Sinh placed in correct direction per §9.1 polarity
- [ ] Vòng Thái Tuế placed clockwise from năm sinh per §9.2
- [ ] Lộc Tồn ring direction correct per §9.3 polarity
- [ ] Tứ Hóa natal markers attached per §10
- [ ] Hỏa Tinh + Linh Tinh placement direction-aware per §11.3 + §11.4
- [ ] Tuần + Triệt placed between palace pairs per §12
- [ ] Star strength scored per §14 rubric
- [ ] Output matches NTS audit fixture (V3 §7.9 + Appendix B.10) 100%
- [ ] Cross-source diff < 5% vs lyso.vn + tuviglobal on 3 reference charts

---

## **§16 — CROSS-REFERENCES TO TIER 1/2 GOVERNANCE**

These formulas are **the truth-source for chart construction**, but they do not authorize:

- **Interpretation language** (governed by `TAO_ZIWEI_SYSTEM_LAW_v1` §A LAW 4 + §B REDLINE 1).
- **AIER advisory tone** (governed by SYSTEM_LAW §C + REDLINE 3).
- **UI rendering choices** (governed by `TAO_ZIWEI_UI_UX_CANON_v1`).

Any output produced from this doc that crosses into interpretation/advisory must additionally pass:
- LAW 4 — no deterministic fate claim
- LAW 5 — no fear-based UX
- REDLINE 1 — no death/catastrophe prediction
- REDLINE 3 — no thầy-phán tone

---

## **§17 — VERSION CONTROL & AMENDMENT**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-29 | Initial extraction from PDF + alignment to SPEC §3-10 |

**Amendment rule:**
1. Proposal as `TAO_ZIWEI_FORMULA_REFERENCE_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Amendment must specify: which §, what changed, why (PDF re-read vs lyso.vn vs tuviglobal vs NTS expert decision)
4. Cannot contradict TAO Canon (Tier 1) or SYSTEM_LAW (Tier 2)
5. Cannot weaken validation checklist §15
6. Old version archived to `_archive/`

---

## **§18 — SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.0 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ awaiting | — |
| Effective | — | ⏳ pending | — |

**END — TAO_ZIWEI_FORMULA_REFERENCE_v1**
