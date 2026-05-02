# **TAO BAZI + PHONG THỦY REFERENCE v1.0**

## **Bazi (Tứ Trụ) + Phong Thủy canonical formulas — Layer 2 reference (Tier 3)**

---

**Document ID:** TAO_BAZI_PHONGTHUY_REFERENCE_v1
**Version:** 1.1 (school decision lock)
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge — injected on-demand)
**Authority Level:** Tier 3 — extends `TAO_LUNAR_CALENDAR_ALGORITHM_v1`, parallel to `TAO_ZIWEI_FORMULA_REFERENCE_v1`
**Parent docs:**
- `TAO_ZIWEI_CANON_OFFICIAL_v1.md` (Tier 1 — TAO module)
- `TAO_ZIWEI_SYSTEM_LAW_v1.md` (Tier 2 — operational law)
- `TAO_LUNAR_CALENDAR_ALGORITHM_v1.md` (Tier 3 — calendar engine, INPUT)
- `UZGPLUS_VANNIEN_CALENDAR_SPEC_v1.md` (Tier 2 — vạn niên feature)
- `TAO_VANNIEN_DATA_API_v1.md` (Tier 3 — vạn niên data engine)
**Reference sources:**
- *Tử Bình Chân Thuyên* (子平真詮) — Shen Xiaozhan (Thẩm Hiếu Thiền), 18th c., classical Bazi authority
- *Trích Thiên Tủy* (滴天髓) — classical Bazi text
- *Cùng Thông Bảo Giám* (窮通寶鑑) — classical seasonal Bazi
- *Bát Trạch Minh Cảnh* (八宅明鏡) — classical Bát Trạch Phong Thủy
- *Phi Tinh Phú* (飛星賦) — Cửu Cung Phi Tinh
- Joey Yap, *BaZi: The Destiny Code* (modern English exposition)
- Stephen Skinner, *Feng Shui: The Living Earth Manual*
**Status:** ⏳ DRAFT — TAO V1 module direction lock
**Issued by:** CLA-2 (Lane_02)

---

## **§0 — PURPOSE & SCOPE**

### **§0.1 — Position trong TAO module**

TAO module (`TAO_ZIWEI_*` doc set) hiện tại là **TAO V2 (Tử Vi Đẩu Số)**. Per Roadmap Phase 4, TAO sẽ expand thành combined stack:
- **TAO V1 (Bazi / Tứ Trụ)** — pillar-based destiny analysis
- **TAO V2 (Tử Vi Đẩu Số)** — palace-based destiny chart
- **TAO V3 (Phong Thủy)** — environmental/spatial energy

Doc này là **TAO V1 (Bazi)** + **TAO V3 (Phong Thủy)** combined formula reference. Lý do gộp:
1. Cả hai dùng chung Ngũ Hành / Can-Chi base
2. Phong Thủy của 1 user thường tham chiếu Bazi của user đó (ví dụ: Bát Trạch dùng Cung Mệnh derived từ năm sinh)
3. Lịch Vạn Niên cần data từ cả 2 để personalize day energy ngoài mức Ngũ Hành đơn giản

Khi codebase trưởng thành, doc này có thể split thành 2 file riêng. Hiện tại để compact reference.

### **§0.2 — What this doc IS**

- **Pure formula reference** cho Bazi + Phong Thủy chart construction
- Lookup tables, algorithms, canonical relations
- Integration contracts với calendar engine + Lịch Vạn Niên
- Skeleton cho TAO V1 build phase

### **§0.3 — What this doc is NOT**

- KHÔNG phải interpretive/advisory layer (governed bởi separate SYSTEM_LAW theo TAO V1 patterns)
- KHÔNG cover Tử Vi (xem `TAO_ZIWEI_FORMULA_REFERENCE_v1`)
- KHÔNG cover lunar calendar algorithm (xem `TAO_LUNAR_CALENDAR_ALGORITHM_v1`)
- KHÔNG cover Lịch Vạn Niên data tables (xem `TAO_VANNIEN_DATA_API_v1`)

### **§0.4 — Governance status**

Status = DRAFT. TAO V1 module sẽ cần SYSTEM_LAW + UI/UX riêng trước khi production. Doc này khóa **algorithm/data layer** trước, governance sau.

Per CLA caution: tất cả formulas in doc này là **truth-source for chart construction only**. Khi cross-vào interpretation/advisory phải pass:
- LAW 4 — no deterministic fate claim
- LAW 5 — no fear-based UX
- REDLINE 1 — no death/catastrophe prediction
- REDLINE 3 — no thầy-phán tone

---

# **PART A — BAZI (TỨ TRỤ)**

## **§1 — BAZI FOUNDATION**

### **§1.1 — Definition**

Bazi (八字 — "tám chữ") = 4 pillars × 2 chars each = 8 characters total. Mỗi pillar có 1 Thiên Can + 1 Địa Chi.

```
┌──────────┬──────────┬──────────┬──────────┐
│  Năm     │  Tháng   │  Ngày    │  Giờ     │
│  Trụ     │  Trụ     │  Trụ     │  Trụ     │
│ (Niên)   │ (Nguyệt) │ (Nhật)   │ (Thời)   │
├──────────┼──────────┼──────────┼──────────┤
│  Can     │  Can     │  Can     │  Can     │  ← Thiên Can
├──────────┼──────────┼──────────┼──────────┤
│  Chi     │  Chi     │  Chi     │  Chi     │  ← Địa Chi
└──────────┴──────────┴──────────┴──────────┘
```

### **§1.2 — Day Master (Nhật Chủ / Nhật Nguyên)**

Day Master = **Can ngày** (天干 of day pillar). Đây là **center of analysis** trong Bazi — mọi đánh giá đều tham chiếu day master:
- Day master strong vs weak
- Other elements support or oppose day master
- Useful god (dụng thần) chosen relative to day master

Mỗi user có 1 day master, là 1 trong 10 Thiên Can: Giáp / Ất / Bính / Đinh / Mậu / Kỷ / Canh / Tân / Nhâm / Quý.

### **§1.3 — Element của day master**

| Day master | Element | Polarity | Symbolic |
|---|---|---|---|
| Giáp | Mộc | Dương | Đại lâm mộc — Mộc lớn |
| Ất | Mộc | Âm | Hoa thảo mộc — Mộc nhỏ |
| Bính | Hỏa | Dương | Thái dương — Hỏa lớn |
| Đinh | Hỏa | Âm | Đèn lửa — Hỏa nhỏ |
| Mậu | Thổ | Dương | Đại địa — Thổ lớn |
| Kỷ | Thổ | Âm | Điền thổ — Thổ nhỏ |
| Canh | Kim | Dương | Kim loại nặng — Kim lớn |
| Tân | Kim | Âm | Kim loại trang sức — Kim nhỏ |
| Nhâm | Thủy | Dương | Đại hải — Thủy lớn |
| Quý | Thủy | Âm | Mưa móc — Thủy nhỏ |

---

## **§2 — INPUT: BAZI CONSUMES FROM CALENDAR ENGINE**

### **§2.1 — Input contract**

Bazi engine **consumes** `normalized_birth_profile` produced by `TAO_LUNAR_CALENDAR_ALGORITHM_v1` §8. Bazi does NOT recompute calendar layers.

```typescript
type BaziInput = NormalizedBirthProfile;
// inherited fields used:
// - can_chi.year
// - can_chi.month
// - can_chi.day
// - can_chi.hour
// - hour_chi
// - ty_phase
// - polarity (Dương Nam / Âm Nam / Dương Nữ / Âm Nữ)
// - lunar.year
// - calendar_system (vn | cn)
```

**Critical discipline:** Bazi MUST use the same Can-Chi values as Tử Vi for the same person. No discrepancy. Both modules read from the same calendar engine output.

### **§2.2 — Bazi output: 4 pillars + derived layers**

```typescript
type BaziChart = {
  pillars: {
    year: { can: string, chi: string };
    month: { can: string, chi: string };
    day: { can: string, chi: string };       // day.can = day master
    hour: { can: string, chi: string };
  };
  day_master: string;                          // = pillars.day.can
  day_master_element: string;                  // Mộc/Hỏa/Thổ/Kim/Thủy
  day_master_polarity: 'Dương' | 'Âm';

  // Derived analysis
  hidden_stems: HiddenStems;                   // §4
  ten_gods: TenGodsMap;                        // §5
  twelve_stages: TwelveStages;                 // §6
  element_distribution: ElementCount;          // §7
  day_master_strength: DayMasterStrength;      // §7
  useful_god: UsefulGod;                       // §8
  luck_pillars: LuckPillar[];                  // §9 — 10-year cycles

  metadata: {
    algorithm_version: string;
    computed_at: string;
    source_calendar_profile_id: string;        // FK to calendar profile
  };
};
```

---

## **§3 — 4 PILLARS CONSTRUCTION (recap from calendar engine)**

Already covered by `TAO_LUNAR_CALENDAR_ALGORITHM_v1` §7. Quick recap:

### **§3.1 — Year pillar (VN-school)**

- Year Can-Chi from year cycle (anchor: 4 CE = Giáp Tý). Per `TAO_LUNAR_CALENDAR_ALGORITHM_v1` §7.2.
- **TAO V1 rule:** Year pillar boundary = **Tết Nguyên Đán** (mùng 1 tháng Giêng âm lịch). Same as Tử Vi V2.
  - Born before Tết → previous lunar year's Can-Chi
  - Born on/after Tết → current lunar year's Can-Chi

> **⚠️ School divergence note:** TAO V1 follows **Vietnamese school** (Tết-based). Classical Chinese school (Tử Bình Chân Thuyên, Trích Thiên Tủy, Joey Yap, most Chinese-language Bazi tools) uses **Lập Xuân (~Feb 4)** as year boundary. Cross-source validation must use VN-school references, not classical Chinese tools. See §16 cross-source caveat.

### **§3.2 — Month pillar (VN-school)**

- Month boundary in Bazi = **mùng 1 lunar month** (lunar month boundary). Same as Tử Vi V2.
  - Born during lunar tháng Giêng (Dần) → month pillar Chi = Dần
  - Born during lunar tháng Hai (Mão) → month pillar Chi = Mão
  - etc.

| Lunar month | Month branch | Period |
|---|---|---|
| Tháng 1 (Giêng) | Dần | Spring start |
| Tháng 2 | Mão | |
| Tháng 3 | Thìn | |
| Tháng 4 | Tỵ | Summer start |
| Tháng 5 | Ngọ | |
| Tháng 6 | Mùi | |
| Tháng 7 | Thân | Autumn start |
| Tháng 8 | Dậu | |
| Tháng 9 | Tuất | |
| Tháng 10 | Hợi | Winter start |
| Tháng 11 | Tý | |
| Tháng 12 (Chạp) | Sửu | |

- Month Can derived from Year Can per `TAO_ZIWEI_FORMULA_REFERENCE_v1` §2.3.
- **Critical:** TAO V1 month pillar **same as Tử Vi V2 month pillar** for the same person. No divergence.

> **⚠️ School divergence note:** Classical Chinese school uses **tiết khí (節)** as month boundary (12 odd-numbered solar terms: Lập Xuân/Kinh Trập/Thanh Minh/...). TAO V1 does NOT — uses lunar month boundary instead. This is the **Vietnamese-school choice** locked by NTS 2026-04-29.

### **§3.2.1 — Leap month handling**

When user is born in a **leap month** (tháng nhuận):
- Month pillar uses the **regular preceding month's branch** (e.g., born in leap-tháng-4 → branch = Tỵ, same as regular tháng-4)
- Month pillar Can derived from Year Can per regular table (no special leap Can)
- `is_leap_month: true` flag stored in metadata for audit
- Per Hồ Ngọc Đức Vietnamese tradition + per `TAO_ZIWEI_FORMULA_REFERENCE_v1` §2.3 leap rule

### **§3.3 — Day pillar**

- Same as Tử Vi day Can-Chi from JDN. Per `TAO_LUNAR_CALENDAR_ALGORITHM_v1` §7.4.

### **§3.4 — Hour pillar**

- Hour Can-Chi from day Can + hour chi. Per `TAO_ZIWEI_FORMULA_REFERENCE_v1` §2.4.
- **Hour Tý phase:** Same rule as Tử Vi — Tý sớm (23:00-23:59) day rolls over, Tý muộn (00:00-00:59) does not. Per `TAO_LUNAR_CALENDAR_ALGORITHM_v1` §7.5.

---

## **§4 — HIDDEN STEMS (Tàng Can / 藏干)**

Each Địa Chi contains 1-3 "hidden" Thiên Can — represent latent qualities of that Chi.

### **§4.1 — Lookup table**

| Chi | Main hidden | Mid hidden | Residual hidden |
|---|---|---|---|
| Tý | Quý | — | — |
| Sửu | Kỷ | Quý | Tân |
| Dần | Giáp | Bính | Mậu |
| Mão | Ất | — | — |
| Thìn | Mậu | Ất | Quý |
| Tỵ | Bính | Canh | Mậu |
| Ngọ | Đinh | Kỷ | — |
| Mùi | Kỷ | Đinh | Ất |
| Thân | Canh | Nhâm | Mậu |
| Dậu | Tân | — | — |
| Tuất | Mậu | Tân | Đinh |
| Hợi | Nhâm | Giáp | — |

**Usage in analysis:**
- Each pillar's chi contributes its hidden stems to the chart's element pool
- Main hidden stem has highest weight (~0.7), mid has middle (~0.2), residual has low (~0.1)
- Used in element distribution scoring (§7) and ten gods analysis (§5)

---

## **§5 — TEN GODS (Thập Thần / 十神)**

Each non-day-master stem in chart relates to day master through one of 10 god types. Defines the **role** of each element relative to user.

### **§5.1 — 10 god relationships**

| God | Hán | Definition (relative to day master) | Polarity vs DM |
|---|---|---|---|
| Tỉ Kiên | 比肩 | Same element, same polarity | match |
| Kiếp Tài | 劫財 | Same element, opposite polarity | mismatch |
| Thực Thần | 食神 | Element produced by DM, same polarity | match |
| Thương Quan | 傷官 | Element produced by DM, opposite polarity | mismatch |
| Thiên Tài | 偏財 | Element controlled by DM, same polarity | match |
| Chính Tài | 正財 | Element controlled by DM, opposite polarity | mismatch |
| Thiên Quan / Thất Sát | 偏官/七殺 | Element controlling DM, same polarity | match |
| Chính Quan | 正官 | Element controlling DM, opposite polarity | mismatch |
| Thiên Ấn / Kiêu Thần | 偏印/梟神 | Element producing DM, same polarity | match |
| Chính Ấn | 正印 | Element producing DM, opposite polarity | mismatch |

### **§5.2 — Algorithm**

```pseudocode
function getTenGod(stem, day_master):
  stem_elem = elementOf(stem)
  stem_polarity = polarityOf(stem)    # Dương/Âm
  dm_elem = elementOf(day_master)
  dm_polarity = polarityOf(day_master)
  same_polarity = (stem_polarity == dm_polarity)

  relation = ngu_hanh_relation(dm_elem, stem_elem)
  # Returns one of: same, dm_produces_stem, stem_produces_dm,
  #                 dm_controls_stem, stem_controls_dm

  if relation == 'same':
    return same_polarity ? 'Tỉ Kiên' : 'Kiếp Tài'
  elif relation == 'dm_produces_stem':
    return same_polarity ? 'Thực Thần' : 'Thương Quan'
  elif relation == 'dm_controls_stem':
    return same_polarity ? 'Thiên Tài' : 'Chính Tài'
  elif relation == 'stem_controls_dm':
    return same_polarity ? 'Thiên Quan' : 'Chính Quan'
  elif relation == 'stem_produces_dm':
    return same_polarity ? 'Thiên Ấn' : 'Chính Ấn'
```

### **§5.3 — Stem polarity table**

| Can | Polarity | | Can | Polarity |
|---|---|---|---|---|
| Giáp | Dương | | Kỷ | Âm |
| Ất | Âm | | Canh | Dương |
| Bính | Dương | | Tân | Âm |
| Đinh | Âm | | Nhâm | Dương |
| Mậu | Dương | | Quý | Âm |

### **§5.4 — Usage**

- Each of the 8 chars (4 stems + 4 main hidden stems of chi) gets a god label
- Distribution of gods reveals chart "shape" (e.g., heavy Quan = authority/career-focused, heavy Tài = wealth-focused)
- Gods are **descriptive**, not deterministic. Per LAW 4: no fortune-claim language.

---

## **§6 — TWELVE STAGES (Trường Sinh 12 vận)**

Each Thiên Can has a 12-stage life cycle when paired with each Địa Chi. Same concept as Tử Vi's vòng Tràng Sinh but applied per stem.

### **§6.1 — 12 stages**

Tràng Sinh → Mộc Dục → Quan Đới → Lâm Quan → Đế Vượng → Suy → Bệnh → Tử → Mộ → Tuyệt → Thai → Dưỡng → (back).

### **§6.2 — Tràng Sinh starting position by stem**

| Stem | Polarity | Tràng Sinh tại | Direction |
|---|---|---|---|
| Giáp (Mộc Dương) | + | Hợi | clockwise |
| Bính (Hỏa Dương) | + | Dần | clockwise |
| Mậu (Thổ Dương) | + | Dần | clockwise |
| Canh (Kim Dương) | + | Tỵ | clockwise |
| Nhâm (Thủy Dương) | + | Thân | clockwise |
| Ất (Mộc Âm) | - | Ngọ | counter-clockwise |
| Đinh (Hỏa Âm) | - | Dậu | counter-clockwise |
| Kỷ (Thổ Âm) | - | Dậu | counter-clockwise |
| Tân (Kim Âm) | - | Tý | counter-clockwise |
| Quý (Thủy Âm) | - | Mão | counter-clockwise |

### **§6.3 — Algorithm**

```pseudocode
function getTwelveStage(stem, chi):
  start_chi = TS_ANCHOR[stem]
  direction = polarityOf(stem) == 'Dương' ? +1 : -1
  start_idx = chi_to_index(start_chi)
  target_idx = chi_to_index(chi)
  position = (target_idx - start_idx) * direction mod 12
  return STAGES_12[position]
```

### **§6.4 — Usage**

For each pillar, compute the stage of the day master at that pillar's chi. Strong stages (Tràng Sinh, Lâm Quan, Đế Vượng) → stem stronger. Weak stages (Tử, Mộ, Tuyệt) → stem weaker.

Used in §7 day master strength scoring.

---

## **§7 — DAY MASTER STRENGTH ANALYSIS**

### **§7.1 — Why this matters**

Day master strength (vượng/tướng/hưu/tù/tử) determines which element to seek as **dụng thần** (useful god). Strong DM needs control/release. Weak DM needs support.

### **§7.2 — Five-state seasonal scoring**

Day master's element is graded by birth month's element via 5-state Ngũ Hành seasonal logic:

| State | Definition | Strength |
|---|---|---|
| Vượng (旺) | Same element as season | Strongest |
| Tướng (相) | Element produced by season | Strong |
| Hưu (休) | Element that produces season | Neutral |
| Tù (囚) | Element controlled by season | Weak |
| Tử (死) | Element that controls season | Weakest |

### **§7.3 — Season-element mapping**

| Tháng range | Season | Dominant element |
|---|---|---|
| Dần Mão Thìn (1-3) | Xuân | Mộc |
| Tỵ Ngọ Mùi (4-6) | Hạ | Hỏa |
| Thân Dậu Tuất (7-9) | Thu | Kim |
| Hợi Tý Sửu (10-12) | Đông | Thủy |
| (Thìn Mùi Tuất Sửu transition) | — | Thổ (transition) |

**Note:** Thổ is special — it has affinity with the **transition months** (Thìn, Mùi, Tuất, Sửu — the last month of each season). Classical Bazi treats Thổ as evenly distributed across these 4 transition months. TAO V1 follows this convention (using lunar month boundaries — Thổ months = lunar tháng 3, 6, 9, 12).

### **§7.4 — Composite strength scoring**

```pseudocode
function getDayMasterStrength(chart):
  dm_elem = chart.day_master_element
  month_chi = chart.pillars.month.chi
  season_elem = seasonOf(month_chi)

  # Base seasonal score
  seasonal_state = scoreSeasonal(dm_elem, season_elem)
  # Returns one of: vượng (+2), tướng (+1), hưu (0), tù (-1), tử (-2)

  # Add element distribution from chart
  elem_count = countElements(chart)    # all stems + main hidden
  same_elem_score = elem_count[dm_elem] * 0.5
  producing_elem = producerOf(dm_elem)
  producing_score = elem_count[producing_elem] * 0.4
  controlled_elem = controlledBy(dm_elem)
  controlled_score = -elem_count[controlled_elem] * 0.3
  controlling_elem = controllerOf(dm_elem)
  controlling_score = -elem_count[controlling_elem] * 0.4
  produced_elem = producedBy(dm_elem)
  produced_score = -elem_count[produced_elem] * 0.2

  total = seasonal_state + same_elem_score + producing_score
        + controlled_score + controlling_score + produced_score

  if total >= 3: return 'rất vượng'
  elif total >= 1: return 'vượng'
  elif total >= -0.5: return 'cân bằng'
  elif total >= -2: return 'nhược'
  else: return 'rất nhược'
```

### **§7.5 — Strength classification → general guidance**

| Strength | Need | What helps DM | What hurts DM |
|---|---|---|---|
| Rất vượng | Release / control | Element controlled by DM (Tài), element controlling DM (Quan), element produced by DM (Thực Thương) | More same-element + producing element |
| Vượng | Slight release | Tài, Quan, light Thực Thương | More same-element |
| Cân bằng | Maintenance | Balance — favor element keeping equilibrium | Extreme additions |
| Nhược | Support | Element producing DM (Ấn), same element (Tỉ Kiếp) | Element controlling DM (Quan), Tài |
| Rất nhược | Strong support | Heavy Ấn + Tỉ Kiếp | Heavy Tài, Quan |

---

## **§8 — USEFUL GOD (Dụng Thần / 用神)**

### **§8.1 — Definition**

Dụng thần = "the element/god that the chart needs most for balance". Identified post-strength-analysis. There can be:
- **Dụng thần** (primary): main support
- **Hỉ thần** (secondary): supports dụng thần
- **Kỵ thần** (avoid): hurts the chart
- **Cừu thần** (enemy): supports kỵ thần

### **§8.2 — Selection rules (classical, simplified)**

```pseudocode
function selectUsefulGod(chart):
  strength = chart.day_master_strength
  dm_elem = chart.day_master_element

  if strength in {'rất vượng', 'vượng'}:
    # Strong DM — needs release or control
    # Priority: Tài > Quan > Thực Thương
    return {
      primary: controlledByDM(dm_elem),  # Tài
      secondary: controllingDM(dm_elem)  # Quan
    }
  elif strength == 'cân bằng':
    # Balanced — keep balance, choose seasonal need
    return {
      primary: seasonalNeedOf(chart.pillars.month.chi)
    }
  elif strength in {'nhược', 'rất nhược'}:
    # Weak DM — needs support
    # Priority: Ấn (producing element) > Tỉ Kiếp (same element)
    return {
      primary: producerOf(dm_elem),       # Ấn
      secondary: dm_elem                  # Tỉ Kiếp
    }
```

### **§8.3 — Seasonal adjustments (Cùng Thông Bảo Giám)**

Classical adjustment: chart born in extreme cold (winter) often needs Hỏa for warmth even if DM is strong. Chart born in extreme heat (summer) often needs Thủy for cooling. These seasonal needs override basic strength logic in some cases.

| Month branch | Common adjustment need |
|---|---|
| Tý / Sửu (cold winter) | Need Hỏa (warmth) |
| Ngọ / Mùi (hot summer) | Need Thủy (cooling) |
| Dần / Mão (early spring, wet) | Need Hỏa to dry |
| Thân / Dậu (autumn dry) | Need Thủy or Mộc |

This is **Cùng Thông** logic — implementation should expose it as advanced option.

### **§8.4 — Output**

```typescript
type UsefulGod = {
  primary: string;         // element name
  secondary?: string;
  avoid: string[];         // kỵ thần
  reasoning: string[];     // explanation lines
  seasonal_override?: boolean;
};
```

### **§8.5 — Caveat**

Useful god identification is an art-science blend. Modern engines provide a **suggestion**, not a verdict. UI must frame as "chart suggests element X is supportive" — not "your useful god IS X." Per LAW 4.

---

## **§9 — LUCK PILLARS (Đại Vận / 大運)**

### **§9.1 — Definition**

Đại Vận = 10-year life period pillars. Sequence of Can-Chi pairs starting from birth month pillar, progressing forward or backward depending on year polarity + gender.

### **§9.2 — Direction rule**

| Year polarity | Gender | Direction |
|---|---|---|
| Dương | Nam | Forward (順排) |
| Dương | Nữ | Backward (逆排) |
| Âm | Nam | Backward (逆排) |
| Âm | Nữ | Forward (順排) |

This matches Tử Vi's polarity-direction rule for đại vận.

### **§9.3 — Starting age**

Start age = days from birth to nearest tiết transition × 3 / 360 (approximate). More precisely:

```
forward case:    days_to_next_tiet × 0.0333... = starting_age (years)
backward case:   days_to_prev_tiet × 0.0333... = starting_age (years)
```

Each subsequent đại vận = 10 years.

### **§9.4 — Algorithm**

```pseudocode
function getLuckPillars(chart, count = 8):
  direction = (year_polarity == 'Dương' xor gender == 'Nữ') ? +1 : -1
  start_pillar = chart.pillars.month
  start_age = computeStartAge(chart, direction)

  pillars = []
  current = start_pillar
  age = start_age

  for i in 1..count:
    current = nextPillarInSequence(current, direction)
    pillars.append({
      pillar: current,
      start_age: age,
      end_age: age + 10
    })
    age += 10

  return pillars
```

### **§9.5 — 60-pillar cycle (Lục Thập Hoa Giáp pillar sequence)**

When advancing pillars forward/backward, the sequence follows the 60-pillar cycle:

```
Giáp Tý → Ất Sửu → Bính Dần → Đinh Mão → Mậu Thìn → ...
... → Quý Hợi → Giáp Tý (cycle)
```

Forward = next in sequence. Backward = previous. Modular arithmetic on 60-element cycle.

---

## **§10 — RELATIONS BETWEEN PILLARS (HỢP / KHẮC / HÌNH / XUNG / HẠI / PHÁ)**

### **§10.1 — Stem relations**

**Stem combinations (Thiên Can hợp):**

| Pair | Element produced |
|---|---|
| Giáp + Kỷ | Thổ |
| Ất + Canh | Kim |
| Bính + Tân | Thủy |
| Đinh + Nhâm | Mộc |
| Mậu + Quý | Hỏa |

When two stems form a combination, they "fuse" and may transform their original elements.

**Stem clashes (Thiên Can khắc):**

Pairs of opposing stems controlling each other:
- Giáp ↔ Mậu (Mộc khắc Thổ)
- Ất ↔ Kỷ (Mộc khắc Thổ)
- Bính ↔ Canh (Hỏa khắc Kim)
- Đinh ↔ Tân (Hỏa khắc Kim)
- Mậu ↔ Nhâm (Thổ khắc Thủy)
- Kỷ ↔ Quý (Thổ khắc Thủy)
- Canh ↔ Giáp
- Tân ↔ Ất
- Nhâm ↔ Bính
- Quý ↔ Đinh

### **§10.2 — Branch relations**

**Lục hợp (六合 — six pairs):**

| Pair | Element produced |
|---|---|
| Tý + Sửu | Thổ |
| Dần + Hợi | Mộc |
| Mão + Tuất | Hỏa |
| Thìn + Dậu | Kim |
| Tỵ + Thân | Thủy |
| Ngọ + Mùi | (Hỏa-Thổ neutral) |

**Tam hợp (三合 — three-branch combinations):**

| Trio | Element produced |
|---|---|
| Thân + Tý + Thìn | Thủy |
| Dần + Ngọ + Tuất | Hỏa |
| Tỵ + Dậu + Sửu | Kim |
| Hợi + Mão + Mùi | Mộc |

**Tam hội (三會 — directional combinations):**

| Trio | Direction | Element |
|---|---|---|
| Dần + Mão + Thìn | Đông | Mộc |
| Tỵ + Ngọ + Mùi | Nam | Hỏa |
| Thân + Dậu + Tuất | Tây | Kim |
| Hợi + Tý + Sửu | Bắc | Thủy |

**Lục xung (六沖 — opposing pairs):**

| Pair | Note |
|---|---|
| Tý ↔ Ngọ | Strong clash |
| Sửu ↔ Mùi | Earth clash |
| Dần ↔ Thân | Tree-metal clash |
| Mão ↔ Dậu | Strong clash |
| Thìn ↔ Tuất | Earth-pillar clash |
| Tỵ ↔ Hợi | Fire-water clash |

**Lục hại (六害):**

| Pair |
|---|
| Tý-Mùi |
| Sửu-Ngọ |
| Dần-Tỵ |
| Mão-Thìn |
| Thân-Hợi |
| Dậu-Tuất |

**Tam hình (三刑):**

| Trio / Pair |
|---|
| Dần Tỵ Thân (vô ân hình) |
| Sửu Tuất Mùi (vô lễ hình) |
| Tý Mão (vô lễ hình) |
| Thìn Thìn / Ngọ Ngọ / Dậu Dậu / Hợi Hợi (tự hình) |

**Lục phá (六破):**

| Pair |
|---|
| Tý Dậu |
| Ngọ Mão |
| Tỵ Thân |
| Hợi Dần |
| Sửu Thìn |
| Mùi Tuất |

### **§10.3 — Output**

```typescript
type PillarRelations = {
  stem_combos: Combo[];        // hợp
  stem_clashes: Clash[];
  branch_six_combos: Combo[];   // lục hợp
  branch_trios: Trio[];         // tam hợp
  branch_directionals: Trio[];  // tam hội
  branch_clashes: Clash[];      // lục xung
  branch_harms: Pair[];         // lục hại
  branch_punishes: Trio[];      // tam hình
  branch_breaks: Pair[];        // lục phá
};
```

These relations help interpret chart dynamics. Implementation: scan all pairs/trios in (year/month/day/hour pillars) for matches.

---

# **PART B — PHONG THỦY (FENG SHUI)**

## **§11 — PHONG THỦY FOUNDATION**

### **§11.1 — Scope of TAO V3 (Phong Thủy)**

TAO V3 covers:
- **Bát Trạch (八宅)** — 8-house personal compatibility
- **Cửu Cung Phi Tinh (九宮飛星)** — flying stars
- **Hướng** — directional analysis

NOT covered (deferred):
- Geomancy site analysis (large-scale topographic reading)
- Form School (Loan Đầu) detailed evaluations
- Date selection for construction (covered partly by Lịch Vạn Niên)

### **§11.2 — 8 directions**

| Direction | Hán | Trigram | Element | Polarity |
|---|---|---|---|---|
| Bắc (North) | 北 | Khảm (坎) | Thủy | Trung |
| Đông Bắc (NE) | 東北 | Cấn (艮) | Thổ | Dương |
| Đông (East) | 東 | Chấn (震) | Mộc | Dương |
| Đông Nam (SE) | 東南 | Tốn (巽) | Mộc | Âm |
| Nam (South) | 南 | Ly (離) | Hỏa | Trung |
| Tây Nam (SW) | 西南 | Khôn (坤) | Thổ | Âm |
| Tây (West) | 西 | Đoài (兌) | Kim | Âm |
| Tây Bắc (NW) | 西北 | Càn (乾) | Kim | Dương |

### **§11.3 — Bát Trạch and Cửu Cung Phi Tinh both depend on:**
1. User's birth year (or sometimes spouse's)
2. Building's facing direction (hướng)
3. Building's construction period (for Phi Tinh)

---

## **§12 — BÁT TRẠCH (8-HOUSE COMPATIBILITY)**

### **§12.1 — Cung Mệnh (Life Trigram)**

Each user has a Cung Mệnh = trigram derived from birth year + gender. Determines compatibility with directions.

### **§12.2 — Cung Mệnh calculation**

```pseudocode
function getCungMenh(birth_year, gender):
  # Birth year here = lunar year (Tết-aligned, consistent with Bazi V1).
  # If born before Tết → use previous lunar year.
  # If born on/after Tết → use current lunar year.
  # Use sum-digit method:

  # For Nam:
  if gender == 'Nam':
    # Sum digits of year, reduce to single digit, then 11 - sum
    # Special rule for years ending matching specific patterns
    sum = sumDigits(birth_year) until single digit
    cm_idx = 11 - sum
    if cm_idx == 5: cm_idx = 2    # Khôn (special)

  # For Nữ:
  if gender == 'Nữ':
    sum = sumDigits(birth_year) until single digit
    cm_idx = sum + 4
    if cm_idx > 9: cm_idx -= 9
    if cm_idx == 5: cm_idx = 8    # Cấn (special)

  return TRIGRAMS[cm_idx]
```

**Lookup table for Cung Mệnh (faster than algorithm):** see `tables/cung-menh-by-year.json`. CLAC-2 implementation should pre-compute 1900-2100 range.

### **§12.3 — Đông Tứ Mệnh / Tây Tứ Mệnh grouping**

Each Cung Mệnh belongs to 1 of 2 groups:

**Đông Tứ Mệnh (East Four Houses):**
- Khảm (北) — Water
- Ly (南) — Fire
- Chấn (東) — Wood
- Tốn (東南) — Wood

**Tây Tứ Mệnh (West Four Houses):**
- Càn (西北) — Metal
- Khôn (西南) — Earth
- Cấn (東北) — Earth
- Đoài (西) — Metal

User's compatible directions = same group as their Cung Mệnh. Incompatible = other group.

### **§12.4 — 4 favorable + 4 unfavorable directions**

Each Cung Mệnh has 4 favorable + 4 unfavorable directions:

**4 Favorable (Cát):**
- **Sinh Khí** (生氣) — best for vitality, prosperity, leadership
- **Thiên Y** (天醫) — best for health, healing
- **Diên Niên** (延年) — best for longevity, relationships, harmony
- **Phục Vị** (伏位) — best for personal cultivation, restoration

**4 Unfavorable (Hung):**
- **Tuyệt Mệnh** (絕命) — worst direction overall
- **Ngũ Quỷ** (五鬼) — chaos, conflict
- **Lục Sát** (六煞) — accidents, problems
- **Họa Hại** (禍害) — financial loss, gossip

### **§12.5 — Direction matrix per Cung Mệnh**

| Cung Mệnh | Sinh Khí | Thiên Y | Diên Niên | Phục Vị | Tuyệt Mệnh | Ngũ Quỷ | Lục Sát | Họa Hại |
|---|---|---|---|---|---|---|---|---|
| Khảm (Bắc) | Đông Nam | Đông | Nam | Bắc | Tây Nam | Đông Bắc | Tây Bắc | Tây |
| Ly (Nam) | Đông | Đông Nam | Bắc | Nam | Tây Bắc | Tây | Đông Bắc | Tây Nam |
| Chấn (Đông) | Nam | Bắc | Đông Nam | Đông | Tây | Tây Bắc | Tây Nam | Đông Bắc |
| Tốn (Đông Nam) | Bắc | Nam | Đông | Đông Nam | Đông Bắc | Tây Nam | Tây | Tây Bắc |
| Càn (Tây Bắc) | Tây | Đông Bắc | Tây Nam | Tây Bắc | Nam | Đông | Bắc | Đông Nam |
| Khôn (Tây Nam) | Đông Bắc | Tây | Tây Bắc | Tây Nam | Bắc | Đông Nam | Đông | Nam |
| Cấn (Đông Bắc) | Tây Nam | Tây Bắc | Tây | Đông Bắc | Đông Nam | Bắc | Nam | Đông |
| Đoài (Tây) | Tây Bắc | Tây Nam | Đông Bắc | Tây | Đông | Đông Nam | Nam | Bắc |

### **§12.6 — Usage**

- Bedroom door / bed orientation should face Sinh Khí or Thiên Y
- Main entrance orientation: Sinh Khí or Diên Niên
- Avoid orienting to Tuyệt Mệnh or Ngũ Quỷ for major activities
- Office / work seat orientation: Sinh Khí or Diên Niên

**Output schema:**

```typescript
type BatTrachAnalysis = {
  user_cung_menh: string;
  group: 'Đông Tứ Mệnh' | 'Tây Tứ Mệnh';
  favorable: {
    sinh_khi: string;
    thien_y: string;
    dien_nien: string;
    phuc_vi: string;
  };
  unfavorable: {
    tuyet_menh: string;
    ngu_quy: string;
    luc_sat: string;
    hoa_hai: string;
  };
};
```

---

## **§13 — CỬU CUNG PHI TINH (9 FLYING STARS)**

### **§13.1 — 9 stars (Cửu Tinh)**

| # | Star | Hán | Element | Nature |
|---|---|---|---|---|
| 1 | Nhất Bạch | 一白 | Thủy | Cát — sự nghiệp, học vấn |
| 2 | Nhị Hắc | 二黑 | Thổ | Hung — bệnh tật |
| 3 | Tam Bích | 三碧 | Mộc | Hung — kiện tụng, thị phi |
| 4 | Tứ Lục | 四綠 | Mộc | Cát — văn chương, tình duyên |
| 5 | Ngũ Hoàng | 五黃 | Thổ | Hung mạnh — tai họa |
| 6 | Lục Bạch | 六白 | Kim | Cát — quyền uy |
| 7 | Thất Xích | 七赤 | Kim | Hung — trộm cắp, kiện tụng (in current period) |
| 8 | Bát Bạch | 八白 | Thổ | Cát — tài lộc (current dominant in period 8/9) |
| 9 | Cửu Tử | 九紫 | Hỏa | Cát — hôn nhân, danh vọng |

### **§13.2 — 20-year periods (運)**

Cửu Cung divides time into 9 periods × 20 years = 180-year cycle.

| Period | Years | Dominant star |
|---|---|---|
| 1 | 1864-1883 | Nhất Bạch |
| 2 | 1884-1903 | Nhị Hắc |
| 3 | 1904-1923 | Tam Bích |
| 4 | 1924-1943 | Tứ Lục |
| 5 | 1944-1963 | Ngũ Hoàng |
| 6 | 1964-1983 | Lục Bạch |
| 7 | 1984-2003 | Thất Xích |
| 8 | 2004-2023 | Bát Bạch |
| 9 | 2024-2043 | Cửu Tử ← **CURRENT PERIOD** |
| 1 | 2044-2063 | Nhất Bạch (cycle resumes) |

**Current period (2026):** Period 9 — Cửu Tử dominates. Hỏa-related themes (innovation, fame, technology) energetic. Period 8 (Bát Bạch — wealth) just ended 2023.

### **§13.3 — Birth year star (Bản Mệnh Tinh)**

Each person has a flying star derived from birth year + gender. Same as Cung Mệnh trigram (§12.2) but using star numbers 1-9.

| Cung Mệnh trigram | Star number |
|---|---|
| Khảm | 1 |
| Khôn | 2 |
| Chấn | 3 |
| Tốn | 4 |
| (center / no trigram) | 5 |
| Càn | 6 |
| Đoài | 7 |
| Cấn | 8 |
| Ly | 9 |

### **§13.4 — Annual flying star (Lưu Niên Phi Tinh)**

Each year, the 9 stars "fly" through the 9 palaces (8 directions + center). Annual layout depends on year number.

**Annual ruling star formula (men):**
```
ruling_star = 11 - (sumDigits(year) reduced to single digit)
if result <= 0: result += 9
```

**Annual ruling star formula (women):**
```
ruling_star = sumDigits(year) reduced + 4
if result > 9: result -= 9
```

Once ruling star is known, the 9 stars "fly" in fixed order across the 9 palaces:
```
center → NW → W → NE → S → N → SW → E → SE → (next year center)
```

(This is "Lo Shu" magic square sequence.)

### **§13.5 — Implementation note**

Full Phi Tinh chart requires:
1. Building's construction period (1-9)
2. Building's facing direction
3. Year (for annual layer)
4. Month (for monthly layer — optional precision)

Generate 2-3 layered Phi Tinh chart (period base + year + optionally month).

This is **complex enough to warrant a dedicated sub-module**. v1.0 doc holds skeleton — full implementation in TAO V3 build phase.

---

## **§14 — DIRECTION ANALYSIS UTILITIES**

### **§14.1 — `getDirection(angle)`**

Map compass angle to 1 of 8 directions:

| Angle range | Direction |
|---|---|
| 337.5°–22.5° | Bắc |
| 22.5°–67.5° | Đông Bắc |
| 67.5°–112.5° | Đông |
| 112.5°–157.5° | Đông Nam |
| 157.5°–202.5° | Nam |
| 202.5°–247.5° | Tây Nam |
| 247.5°–292.5° | Tây |
| 292.5°–337.5° | Tây Bắc |

### **§14.2 — Magnetic vs True North**

User's compass shows magnetic north. For Phong Thủy, both magnetic and true north can be used (school-dependent). UZG+ default: **true north** (using location's magnetic declination correction).

For VN: declination ~0-2° east in 2026 (small enough to ignore for casual use). For high-precision Phong Thủy, use IGRF model.

---

# **PART C — INTEGRATION**

## **§15 — INTEGRATION WITH LỊCH VẠN NIÊN**

### **§15.1 — Bazi-aware day energy**

Lịch Vạn Niên §11 provides ENTA energy matching using simple 5-element Ngũ Hành. With Bazi, we can deepen this:

**Layer 1 — Element match (existing in TAO_VANNIEN_DATA_API §11):**
- User element (Mộc/Hỏa/Thổ/Kim/Thủy) vs day element
- 5×5 matrix of relations

**Layer 2 — Day master + day pillar interaction:**
```pseudocode
function baziAwareDayEnergy(user_bazi, day):
  user_dm = user_bazi.day_master
  user_useful_god = user_bazi.useful_god.primary

  day_can = day.day_can_chi[0]
  day_chi = day.day_can_chi[1]

  # Score 1: relation between day stems and user useful god
  if elementOf(day_can) == user_useful_god:
    score += 2    # day brings what user needs
  if elementOf(day_chi_main_hidden) == user_useful_god:
    score += 1

  # Score 2: hidden stems of day chi vs day master
  for hidden_stem in day_chi.hidden_stems:
    relation = ngu_hanh_relation(user_dm.element, hidden_stem.element)
    score += relation_score(relation, weight=hidden_stem.weight)

  # Score 3: day-pillar god type
  day_pillar_god = getTenGod(day_can, user_dm)
  if day_pillar_god in user_bazi.favorable_gods:
    score += 1
  if day_pillar_god in user_bazi.unfavorable_gods:
    score -= 1

  return score    # range approximately -3 to +5
```

This score replaces (or augments) §11.2 simple matrix when user has full Bazi profile.

### **§15.2 — Day-pillar relations to user's pillars**

Check if today's day pillar:
- Forms hợp with user's year/month/day/hour pillars (§10) → boosts relevance
- Forms xung (clash) with user pillars → caution
- Forms hình → caution
- Forms hại → mild caution

This adds **personalized resonance** beyond generic Hoàng Đạo / sao tốt.

### **§15.3 — Find good days enhanced**

When user has Bazi, `findGoodDays()` ranking (§10 of `TAO_VANNIEN_DATA_API`) gets additional inputs:
- Days that bring useful god → bonus
- Days that clash with user's pillars → penalty
- Days that combine with user's pillars → bonus

Update composite scoring formula to include Bazi resonance score (weight 1.0-1.5x of basic ENTA score).

### **§15.4 — Phong Thủy daily considerations**

For users with full address (apartment direction), Lịch Vạn Niên can flag:
- Annual flying star at user's main entrance direction
- Monthly flying star activations
- Days when negative stars (Ngũ Hoàng, Tam Sát) align with user's bedroom direction

This is **advanced feature**, gated to Premium tier per `UZGPLUS_VANNIEN_CALENDAR_SPEC` §7.

---

## **§16 — INTEGRATION WITH TỬ VI (TAO V2)**

### **§16.1 — Shared inputs (full alignment)**

Both Bazi V1 and Tử Vi V2 consume `normalized_birth_profile` from calendar engine. Both modules MUST agree on **ALL pillars**:
- Year Can-Chi (Tết-based, same)
- Month Can-Chi (lunar month-based, same)
- Day Can-Chi (JDN-based, same)
- Hour Can-Chi (with Tý phase, same)
- Polarity (Dương Nam / Âm Nam / Dương Nữ / Âm Nữ)

### **§16.2 — Full pillar alignment (no divergence)**

**Per NTS 2026-04-29 lock:** TAO V1 (Bazi) uses **Vietnamese school** boundaries — Tết for year + lunar month for month. This means Bazi 4 pillars = Tử Vi 4 pillars for the same person.

This simplifies UI — user sees the same Can-Chi pillars in both modules. Difference between Bazi and Tử Vi is **how each module interprets** the pillars (Bazi: Day Master + element analysis; Tử Vi: palaces + stars), NOT in the pillars themselves.

**Cross-engine integrity test (per LAW 3):**
```
assert bazi.pillars.year == ziwei.year_pillar
assert bazi.pillars.month == ziwei.month_pillar
assert bazi.pillars.day == ziwei.day_pillar
assert bazi.pillars.hour == ziwei.hour_pillar
```
Any failure = engine bug → halt.

### **§16.3 — Combined reading mode**

Premium feature: combined Bazi + Tử Vi reading. Engine produces both charts, identifies points of convergence + divergence, surfaces useful god from Bazi as overlay on Tử Vi palace map.

This is TAO module Phase 4.1 (Bazi + Ziwei combined per Roadmap).

---

## **§17 — INTEGRATION WITH ENTA**

### **§17.1 — ENTA element ←→ Bazi day master element**

Question: should ENTA element be derived from Bazi day master, year nạp âm, or user-stated?

**Recommendation:**
- If user has Bazi profile → ENTA element = day master element (most accurate)
- Else if user has year nạp âm → ENTA element = nạp âm element
- Else → user explicitly states or system asks

This forms the fallback chain already noted in `TAO_VANNIEN_DATA_API` §11.1, but with Bazi added as priority 0.

### **§17.2 — ENTA polarity ←→ Bazi day master polarity**

Same logic — Bazi day master polarity (Dương/Âm) supersedes year polarity for personalized accuracy.

### **§17.3 — User flow**

```
User signs up UZG+
  ↓
ENTA setup form (basic) — derives element from year nạp âm
  ↓
[Optional] User completes Bazi profile (TAO V1)
  ↓
ENTA element auto-upgraded to day master element
  ↓
Lịch Vạn Niên + AIER Tao + all personalized features
get more accurate from this point
```

---

## **§18 — DATA MODEL & STORAGE**

### **§18.1 — Bazi chart object**

```typescript
type BaziChart = {
  // Identification
  chart_id: string;
  user_id: string;
  source_calendar_profile_id: string;

  // Inputs (mirrored from calendar)
  birth_profile: NormalizedBirthProfile;

  // Pillars
  pillars: { year, month, day, hour };
  day_master: string;
  day_master_element: string;
  day_master_polarity: 'Dương' | 'Âm';

  // Derived
  hidden_stems: HiddenStems;
  ten_gods: TenGodsMap;
  twelve_stages: TwelveStages;
  element_distribution: ElementCount;
  day_master_strength: DayMasterStrength;
  useful_god: UsefulGod;
  luck_pillars: LuckPillar[];
  pillar_relations: PillarRelations;

  // Metadata
  metadata: {
    algorithm_version: string;
    formula_version: string;
    computed_at: string;
    qot_trace_id: string;
  };
};
```

### **§18.2 — Phong Thủy profile**

```typescript
type PhongThuyProfile = {
  user_id: string;
  cung_menh: string;                  // Khảm/Ly/Chấn/...
  group: 'Đông Tứ Mệnh' | 'Tây Tứ Mệnh';
  ban_menh_tinh: number;              // 1-9
  bat_trach: BatTrachAnalysis;
  // Building / location data (optional, user-provided)
  residence?: {
    address?: string;
    main_entrance_direction?: string;
    construction_period?: number;     // 1-9
    facing_direction?: string;
  };
  metadata: { ... };
};
```

### **§18.3 — Storage**

- Bazi chart: 1 record per user (fits within Tử Vi `chart_object` schema as parallel layer, OR separate `bazi_charts` table)
- Phong Thủy profile: 1 record per user, optional residence sub-record per residence
- Both immutable once computed (re-compute only if input data changes — birth time correction, residence change)

---

## **§19 — IMPLEMENTATION GUIDANCE**

### **§19.1 — Folder structure**

```
lib/tao/bazi/
├── pillars.ts                  # §3 - 4 pillars from calendar
├── day-master.ts               # §1.2 - day master derivation
├── hidden-stems.ts             # §4 - tàng can lookup
├── ten-gods.ts                 # §5 - thập thần analysis
├── twelve-stages.ts            # §6 - trường sinh per stem
├── element-distribution.ts     # §7 - element count weighting
├── day-master-strength.ts      # §7.2-7.4 - vượng/nhược
├── useful-god.ts               # §8 - dụng thần selection
├── luck-pillars.ts             # §9 - đại vận
├── relations.ts                # §10 - hợp/khắc/hình/xung/hại/phá
├── pipeline.ts                 # main getBaziChart()
└── tables/
    ├── hidden-stems-table.json
    ├── ten-gods-table.json
    ├── stem-polarity.json
    ├── twelve-stages-anchor.json
    ├── element-relations.json
    ├── pillar-relations-tables.json

lib/tao/phongthuy/
├── cung-menh.ts                # §12.2 - life trigram
├── bat-trach.ts                # §12 - 8-house compatibility
├── flying-stars.ts             # §13 - cửu cung phi tinh
├── direction-utils.ts          # §14 - compass to direction
├── pipeline.ts                 # main getPhongThuyProfile()
└── tables/
    ├── cung-menh-by-year.json
    ├── bat-trach-direction-matrix.json
    ├── flying-star-periods.json
    ├── lo-shu-sequence.json
    └── trigram-element.json
```

### **§19.2 — Test discipline**

**Validation fixtures:**

| # | Input | Expected (Bazi) |
|---|---|---|
| B1 | NTS audit case (V3 §7.9) | Day master = (per audit), all 4 pillars match Tử Vi Can-Chi exactly |
| B2 | Birth on Tết Nguyên Đán day | Year pillar matches lunar-year computation; if born before Tết → previous lunar year's Can-Chi |
| B3 | User Mộc DM, born winter | Day master strength = "tướng" (winter produces water → produces wood, but wood season not, so weak-medium) |
| B4 | User Hỏa DM, born summer | Day master strength = "vượng" |
| B5 | Tý-Mùi pair in user pillars | Detected as "lục hại" |

**Validation fixtures (Phong Thủy):**

| # | Input | Expected |
|---|---|---|
| P1 | Nam, born 1990 | Cung Mệnh = Tốn, group Đông Tứ Mệnh |
| P2 | Nữ, born 1990 | Cung Mệnh = Khôn, group Tây Tứ Mệnh |
| P3 | Cung Mệnh Khảm | Sinh Khí = Đông Nam |
| P4 | 2026 annual flying star (Period 9) | Ruling star at center = (compute) |

### **§19.3 — Cross-validation (VN-school references)**

For 50 random birth dates 1900-2100, validate Bazi output against:
- VN-school Bazi references (sách Tử Bình Việt Nam, lịch vạn niên Việt + Tứ Trụ commentary)
- Lịch Vạn Niên Hồ Ngọc Đức for lunar boundary verification

> **⚠️ Do NOT cross-validate against classical Chinese tools (Joey Yap BaziCalculator, paipan.cn, ziwei.app, Five Arts).** Those use **Lập Xuân + tiết khí** boundaries — they will disagree with TAO V1 by design for users born late January through early February (year boundary) and around tiết khí transitions (month boundary). This disagreement is **expected**, not a bug.

For comparison purposes only, document tools used + their school explicitly. Discrepancies with VN-school references → CLAC-2 audit, document, escalate.

---

## **§20 — REDLINES (this doc-specific)**

Since TAO V1 SYSTEM_LAW doesn't exist yet, this doc embeds minimal redlines:

- **R-B1.** Day master strength calculation MUST use seasonal + element-distribution composite. Single-axis simplifications are forbidden.
- **R-B2.** Useful god selection is a **suggestion**, not a verdict. UI must use "chart suggests" framing.
- **R-B3.** Bazi engine MUST consume calendar engine output — no recomputation.
- **R-B4.** Same person's Bazi day Can-Chi and Tử Vi day Can-Chi MUST be identical. Any discrepancy = engine bug.
- **R-B5.** Phong Thủy direction analysis must use **at least** Bát Trạch. Single-axis "Năm bản mệnh" oversimplification is forbidden as standalone advice.
- **R-B6.** Phong Thủy advice never makes absolute "your house is bad" claims. Always frame as "tính tương quan" (relational analysis), per LAW 4.
- **R-B7.** Period 9 dominant claims (Cửu Tử = wealth/innovation) must be presented as **trend tendency**, not certainty.
- **R-B8.** Personal data (residence, address, direction) requires explicit user consent and qualifies as sensitive data per UZG+ Identity Canon.

---

## **§21 — VERSION CONTROL & AMENDMENT**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-29 | Initial — Bazi + Phong Thủy combined Tier 3 reference |
| v1.1 | 2026-04-29 | NTS school lock: TAO V1 uses **Vietnamese school** boundaries — Year = Tết Nguyên Đán, Month = lunar month. Bazi 4 pillars now fully aligned with Tử Vi V2. Updated §3.1, §3.2, §12.2, §16.1-16.2, §19.2, §19.3. Cross-validation against Joey Yap classical Chinese tools no longer applicable — must use VN-school references instead. |

**Amendment rule:**
1. Proposal as `TAO_BAZI_PHONGTHUY_REFERENCE_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Splits into separate docs (`TAO_BAZI_REFERENCE_v2`, `TAO_PHONGTHUY_REFERENCE_v2`) acceptable when codebase mature
4. New tables / lookup discrepancies → resolve to canonical source, document in amendment
5. Old version archived

---

## **§22 — REFERENCES**

1. *Tử Bình Chân Thuyên* (子平真詮), Shen Xiaozhan, 18th c.
2. *Trích Thiên Tủy* (滴天髓), classical
3. *Cùng Thông Bảo Giám* (窮通寶鑑), classical seasonal Bazi
4. *Bát Trạch Minh Cảnh* (八宅明鏡), classical Bát Trạch
5. *Phi Tinh Phú* (飛星賦), Cửu Cung Phi Tinh
6. Joey Yap, *BaZi: The Destiny Code*, JY Books
7. Stephen Skinner, *Feng Shui: The Living Earth Manual*
8. Joseph Yu, *Joseph Yu Feng Shui Research Center* materials

---

## **§23 — SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.0 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ awaiting | — |
| Effective | — | ⏳ pending TAO V1 build phase | — |

**END — TAO_BAZI_PHONGTHUY_REFERENCE_v1**
