# **TAO BAZI IMPLEMENTATION SPEC v1.0**

## **Build-able specification for TAO V1 (Bazi / Tứ Trụ) + TAO V3 (Phong Thủy) module — UZG+ ecosystem**

---

**Document ID:** TAO_BAZI_IMPLEMENTATION_SPEC_v1
**Version:** 1.1 (school decision lock)
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge)
**Authority Level:** Tier 2 — extends Architecture, governed by `TAO_BAZI_SYSTEM_LAW_v1`
**Parent docs:**
- `TAO_ZIWEI_CANON_OFFICIAL_v1.md` (definition)
- `TAO_BAZI_SYSTEM_LAW_v1.md` (constraints)
- `TAO_BAZI_SYSTEM_ARCHITECTURE_v1.md` (layers)
**Companion (formula authority):** `TAO_BAZI_PHONGTHUY_REFERENCE_v1.md`
**Companion (input authority):** `TAO_LUNAR_CALENDAR_ALGORITHM_v1.md`
**Status:** ⏳ DRAFT — pending NTS approval
**Issued by:** CLA-2 (Lane_02)

---

## **§0 — PURPOSE**

Document này là **build-spec** chính cho engineer + CLAC-2 + Codex khi implement TAO V1 (Bazi) + TAO V3 (Phong Thủy) module. SPEC chứa:

- Foundation principles tham chiếu
- Input data model + validation rules
- All chart-generation algorithms (in pseudocode + reference back to FORMULA REFERENCE)
- Output JSON schemas (bazi_chart_object, phongthuy_profile, reading_object)
- Audit + test set requirements
- Edge case handling
- Industrial governance (version control)

Architecture cấp khung (TAO_BAZI_SYSTEM_ARCHITECTURE). SPEC cấp build chi tiết. Engineer bám SPEC để code.

---

## **§0.1 — Relationship to other docs**

| Doc | Provides | This SPEC's role |
|---|---|---|
| `TAO_BAZI_PHONGTHUY_REFERENCE_v1` | Pure formulas, lookup tables | This SPEC references but does not duplicate |
| `TAO_BAZI_SYSTEM_LAW_v1` | Operational constraints | This SPEC enforces |
| `TAO_BAZI_SYSTEM_ARCHITECTURE_v1` | Engine boundaries, dataflow | This SPEC implements |
| `TAO_LUNAR_CALENDAR_ALGORITHM_v1` | Calendar engine output | This SPEC consumes |

When in doubt: **FORMULA REFERENCE wins on math, SYSTEM_LAW wins on governance, this SPEC wins on build detail.**

---

# **TABLE OF CONTENTS**

- PART 1 — INPUT SPECIFICATION
- PART 2 — BAZI CHART CONSTRUCTION (10 engines)
- PART 3 — PHONG THỦY PROFILE CONSTRUCTION (4 engines)
- PART 4 — OUTPUT SCHEMAS
- PART 5 — READING ENGINE
- PART 6 — INTEGRATION ENDPOINTS
- PART 7 — AUDIT & TEST SET
- PART 8 — EDGE CASES & GATES
- PART 9 — VERSION CONTROL

---

# **PART 1 — INPUT SPECIFICATION**

## **§1.1 — Input contract (Bazi)**

```typescript
type BaziComputeInput = {
  user_id: string;
  birth_profile: NormalizedBirthProfile;  // from TAO_LUNAR_CALENDAR_ALGORITHM
  options?: {
    seasonal_adjustment: boolean;          // default false (Cùng Thông is opt-in advanced)
  };
};
```

> **Note (VN-school):** TAO V1 Bazi uses Tết-based year boundary + lunar month boundary. There is no `tieng_khi_aware` option — boundaries are fixed per VN-school convention. If a future amendment introduces classical-Chinese-school as an opt-in mode, that flag will be added then.

## **§1.2 — Input contract (Phong Thủy basic)**

```typescript
type PhongThuyBasicInput = {
  user_id: string;
  birth_year: number;                     // solar year
  gender: 'Nam' | 'Nữ';
};
```

## **§1.3 — Input contract (Phong Thủy with residence)**

```typescript
type PhongThuyResidenceInput = {
  user_id: string;
  residence: {
    address: string;                      // will be encrypted
    main_entrance_direction: number;       // compass degrees 0-360
    construction_period?: number;          // 1-9, optional
    facing_direction?: number;             // compass degrees, optional (for Phi Tinh)
    floor_plan?: FloorPlanData;            // optional advanced
  };
  consent_acknowledged: boolean;            // must be true (per LAW 12)
};
```

## **§1.4 — Validation rules**

### **§1.4.1 — Bazi input validation**

```pseudocode
function validateBaziInput(input):
  birth = input.birth_profile

  # Must have full Can-Chi
  if not all([birth.can_chi.year, birth.can_chi.month,
              birth.can_chi.day, birth.can_chi.hour]):
    return INVALID with reason = 'incomplete Can-Chi'

  # Hour required for Bazi (4-pillar)
  if birth.hour_chi is null:
    return PARTIAL with chart_status='partial', confidence='low'

  # Calendar version must be supported
  if birth.metadata.algorithm_version not in SUPPORTED_VERSIONS:
    return INVALID with reason = 'unsupported calendar version'

  # Polarity must be derived
  if not birth.polarity:
    return INVALID with reason = 'polarity not computed'

  return VALID
```

### **§1.4.2 — Phong Thủy input validation**

```pseudocode
function validatePhongThuyInput(input):
  if input.birth_year < 1900 or input.birth_year > 2100:
    return INVALID with reason = 'year out of supported range'

  if input.gender not in {'Nam', 'Nữ'}:
    return INVALID with reason = 'gender required'

  if input.residence:
    if not input.consent_acknowledged:
      return REJECTED with reason = 'consent required for residence data'

    if input.residence.main_entrance_direction not in [0, 360):
      return INVALID with reason = 'compass degrees out of range'

  return VALID
```

### **§1.4.3 — Per LAW 2: partial chart for missing hour**

When `birth.hour_chi is null`:
- Bazi engine generates **3-pillar partial chart** (year + month + day)
- Hour pillar fields = null
- Hour-dependent analyses (luck pillar starting age) = null
- Chart marked: `chart_status = 'partial'`, `hour_missing = true`, `confidence = 'low'`
- UI must show explicit warning per UI/UX §5.7

---

# **PART 2 — BAZI CHART CONSTRUCTION (10 engines)**

## **§2.1 — Pillar Construction Engine**

### **§2.1.1 — Year Pillar (VN-school)**

```pseudocode
function getYearPillar(birth_profile):
  # Year boundary in TAO V1 = Tết Nguyên Đán (mùng 1 tháng Giêng âm lịch)
  # Use lunar year directly from calendar engine output

  lunar_year = birth_profile.lunar.year
  # birth_profile.lunar already accounts for Tết boundary:
  # if solar date < Tết → lunar.year = previous year
  # if solar date >= Tết → lunar.year = current year

  can_chi_year = computeYearCanChi(lunar_year)
  return {can: can_chi_year[0], chi: can_chi_year[1]}
```

**Note:** Same boundary as Tử Vi V2. Bazi year pillar = Tử Vi year pillar for same person.

### **§2.1.2 — Month Pillar (VN-school)**

```pseudocode
function getMonthPillar(birth_profile):
  # Month boundary in TAO V1 = lunar month boundary (mùng 1 of each lunar month)
  # Use lunar month directly from calendar engine output

  lunar_month = birth_profile.lunar.month        # 1..12
  is_leap = birth_profile.lunar.is_leap_month

  # Map lunar month → branch (consistent with Tử Vi)
  # Tháng 1 (Giêng) = Dần, Tháng 2 = Mão, ..., Tháng 11 = Tý, Tháng 12 (Chạp) = Sửu
  month_branch = LUNAR_MONTH_TO_BRANCH[lunar_month]

  # Leap month: per Hồ Ngọc Đức Vietnamese tradition,
  # leap month uses same Can-Chi as the regular preceding month
  # (i.e., is_leap doesn't change Can-Chi, only flagged in metadata)

  # Month Can derived from Year Can per FORMULA_REF §2.3
  year_can = getYearPillar(birth_profile).can
  month_can = MONTH_CAN_TABLE[year_can][lunar_month]

  return {
    can: month_can,
    chi: month_branch,
    is_leap_month: is_leap     # metadata flag for audit
  }
```

**Note:** Same boundary as Tử Vi V2. Bazi month pillar = Tử Vi month pillar for same person.

### **§2.1.3 — Day Pillar**

```pseudocode
function getDayPillar(birth_profile):
  # Day Can-Chi from JDN per TAO_LUNAR_CALENDAR_ALGORITHM §7.4
  jdn = jdnFromDate(birth_profile.input.solar_datetime_local)
  return computeDayCanChi(jdn)
```

### **§2.1.4 — Hour Pillar**

```pseudocode
function getHourPillar(birth_profile):
  if birth_profile.hour_chi is null:
    return null  # partial chart

  hour_chi = birth_profile.hour_chi
  ty_phase = birth_profile.ty_phase
  day_can = getDayPillar(birth_profile).can

  # Hour Can derived from Day Can per FORMULA_REF §2.4
  # Per LAW 3: same formula as Tử Vi
  if hour_chi == 'Tý' and ty_phase == 'early':
    # Tý sớm: day rolls over → use NEXT day's can for hour Can
    next_day_can = nextCanInCycle(day_can)
    hour_can = HOUR_CAN_TABLE[next_day_can][hour_chi]
  else:
    hour_can = HOUR_CAN_TABLE[day_can][hour_chi]

  return {can: hour_can, chi: hour_chi}
```

### **§2.1.5 — Combined**

```pseudocode
function buildPillars(birth_profile):
  return {
    year: getYearPillar(birth_profile),
    month: getMonthPillar(birth_profile),
    day: getDayPillar(birth_profile),
    hour: getHourPillar(birth_profile)  # may be null
  }
```

## **§2.2 — Day Master Engine**

```pseudocode
function getDayMaster(pillars):
  day_can = pillars.day.can
  return {
    day_master: day_can,
    day_master_element: STEM_ELEMENT[day_can],
    day_master_polarity: STEM_POLARITY[day_can]
  }
```

Reference: `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §1.3.

## **§2.3 — Hidden Stems Engine**

```pseudocode
function extractHiddenStems(pillars):
  result = {}
  for pillar_name in ['year', 'month', 'day', 'hour']:
    if pillars[pillar_name] is null:
      result[pillar_name] = null
      continue

    chi = pillars[pillar_name].chi
    hidden = HIDDEN_STEMS_TABLE[chi]
    # Returns {main: stem, mid?: stem, residual?: stem}

    result[pillar_name] = {
      main: hidden.main,
      mid: hidden.mid || null,
      residual: hidden.residual || null
    }
  return result
```

Reference: `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §4.1 lookup table.

## **§2.4 — Ten Gods Engine**

```pseudocode
function computeTenGods(pillars, hidden_stems, day_master):
  gods_map = {}

  for pillar_name in ['year', 'month', 'day', 'hour']:
    if pillars[pillar_name] is null:
      continue

    pillar_gods = {}

    # Visible stem (skip day-pillar's stem since it IS day master)
    if pillar_name != 'day':
      pillar_gods.visible = getTenGod(pillars[pillar_name].can, day_master)

    # Hidden stems
    hidden = hidden_stems[pillar_name]
    pillar_gods.hidden_main = getTenGod(hidden.main, day_master)
    if hidden.mid:
      pillar_gods.hidden_mid = getTenGod(hidden.mid, day_master)
    if hidden.residual:
      pillar_gods.hidden_residual = getTenGod(hidden.residual, day_master)

    gods_map[pillar_name] = pillar_gods

  return gods_map

function getTenGod(stem, day_master):
  stem_elem = STEM_ELEMENT[stem]
  stem_pol = STEM_POLARITY[stem]
  dm_elem = STEM_ELEMENT[day_master]
  dm_pol = STEM_POLARITY[day_master]
  same_pol = (stem_pol == dm_pol)

  relation = NGU_HANH_RELATION[dm_elem][stem_elem]
  # Returns: 'same', 'dm_produces', 'dm_controls',
  #           'controls_dm', 'produces_dm'

  return TEN_GODS_TABLE[relation][same_pol ? 'same_polarity' : 'opposite_polarity']
```

Reference: `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §5.1-5.3.

## **§2.5 — Twelve Stages Engine**

```pseudocode
function computeTwelveStages(pillars, day_master):
  stages = {}
  for pillar_name in ['year', 'month', 'day', 'hour']:
    if pillars[pillar_name] is null:
      continue

    chi = pillars[pillar_name].chi
    stage = getTwelveStage(day_master, chi)
    stages[pillar_name] = stage

  return stages

function getTwelveStage(stem, chi):
  start_chi = TS_ANCHOR_TABLE[stem]
  direction = STEM_POLARITY[stem] == 'Dương' ? +1 : -1

  start_idx = chi_to_index(start_chi)
  target_idx = chi_to_index(chi)
  position = (target_idx - start_idx) * direction mod 12
  if position < 0:
    position += 12

  return STAGES_12_NAMES[position]
```

Reference: `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §6.

## **§2.6 — Element Distribution Engine**

```pseudocode
function computeElementDistribution(pillars, hidden_stems):
  count = {Mộc: 0, Hỏa: 0, Thổ: 0, Kim: 0, Thủy: 0}

  for pillar_name in ['year', 'month', 'day', 'hour']:
    if pillars[pillar_name] is null:
      continue

    # Visible stem (weight 1.0)
    visible_can = pillars[pillar_name].can
    count[STEM_ELEMENT[visible_can]] += 1.0

    # Visible chi element (if classified as element-bearing)
    chi = pillars[pillar_name].chi
    if BRANCH_ELEMENT[chi]:
      count[BRANCH_ELEMENT[chi]] += 0.5  # branches have lighter weight

    # Hidden stems
    hidden = hidden_stems[pillar_name]
    count[STEM_ELEMENT[hidden.main]] += 0.7
    if hidden.mid:
      count[STEM_ELEMENT[hidden.mid]] += 0.2
    if hidden.residual:
      count[STEM_ELEMENT[hidden.residual]] += 0.1

  return count
```

**Branch element table:**
| Chi | Element |
|---|---|
| Tý | Thủy |
| Sửu | Thổ |
| Dần | Mộc |
| Mão | Mộc |
| Thìn | Thổ |
| Tỵ | Hỏa |
| Ngọ | Hỏa |
| Mùi | Thổ |
| Thân | Kim |
| Dậu | Kim |
| Tuất | Thổ |
| Hợi | Thủy |

## **§2.7 — Day Master Strength Engine**

```pseudocode
function computeDayMasterStrength(day_master, pillars, element_count):
  dm_elem = STEM_ELEMENT[day_master]

  # Step 1: Seasonal score
  month_chi = pillars.month.chi
  season = SEASON_OF_BRANCH[month_chi]
  # Returns: 'spring' (Mộc), 'summer' (Hỏa),
  #          'autumn' (Kim), 'winter' (Thủy),
  #          'transition' (Thổ — for Thìn/Mùi/Tuất/Sửu)

  seasonal_state = scoreSeasonalState(dm_elem, season)
  # Returns: 'vượng' (+2), 'tướng' (+1), 'hưu' (0),
  #          'tù' (-1), 'tử' (-2)

  # Step 2: Element distribution score
  same_score = element_count[dm_elem] * 0.5
  producing_elem = PRODUCER_OF[dm_elem]      # element that produces DM
  producing_score = element_count[producing_elem] * 0.4
  produced_elem = PRODUCED_BY[dm_elem]        # element DM produces
  produced_score = -element_count[produced_elem] * 0.2
  controlled_elem = CONTROLLED_BY[dm_elem]    # element DM controls
  controlled_score = -element_count[controlled_elem] * 0.3
  controlling_elem = CONTROLLER_OF[dm_elem]   # element that controls DM
  controlling_score = -element_count[controlling_elem] * 0.4

  total = stateScore(seasonal_state)
        + same_score + producing_score + produced_score
        + controlled_score + controlling_score

  if total >= 3.0:
    return {label: 'rất vượng', total_score: total}
  elif total >= 1.0:
    return {label: 'vượng', total_score: total}
  elif total >= -0.5:
    return {label: 'cân bằng', total_score: total}
  elif total >= -2.0:
    return {label: 'nhược', total_score: total}
  else:
    return {label: 'rất nhược', total_score: total}
```

Reference: `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §7.

## **§2.8 — Useful God Engine**

```pseudocode
function selectUsefulGod(chart, options):
  strength = chart.day_master_strength.label
  dm_elem = chart.day_master_element
  season_elem = SEASON_ELEMENT[chart.pillars.month.chi]

  result = {primary: null, secondary: null, avoid: [], reasoning: []}

  if strength in ['rất vượng', 'vượng']:
    # Strong DM — needs release/control
    result.primary = CONTROLLED_BY[dm_elem]   # Tài
    result.secondary = CONTROLLER_OF[dm_elem] # Quan
    result.avoid = [dm_elem, PRODUCER_OF[dm_elem]]
    result.reasoning.append('Day Master strong — needs Tài (controlled) and Quan (controller) to balance')

  elif strength == 'cân bằng':
    # Balanced — choose seasonal need
    if options.seasonal_adjustment:
      result.primary = seasonalNeedOf(chart.pillars.month.chi)
      result.reasoning.append('Day Master balanced — primary need adjusts to seasonal context')

  else:  # nhược or rất nhược
    # Weak DM — needs support
    result.primary = PRODUCER_OF[dm_elem]   # Ấn
    result.secondary = dm_elem               # Tỉ Kiếp (same)
    result.avoid = [CONTROLLED_BY[dm_elem], CONTROLLER_OF[dm_elem]]
    result.reasoning.append('Day Master weak — needs Ấn (producer) and Tỉ Kiếp (same element) for support')

  # Cùng Thông seasonal override (if enabled)
  if options.seasonal_adjustment:
    cung_thong_need = CUNG_THONG_TABLE[chart.pillars.month.chi]
    if cung_thong_need and cung_thong_need != result.primary:
      result.reasoning.append(`Cùng Thông adjustment: ${chart.pillars.month.chi} typically needs ${cung_thong_need}`)
      result.seasonal_override = true
      # Decision: keep result.primary OR shift; document both

  return result
```

Reference: `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §8.

## **§2.9 — Luck Pillars Engine**

```pseudocode
function computeLuckPillars(chart, count = 8):
  if not chart.pillars.hour:
    return null  # partial chart can't compute luck pillars accurately

  year_polarity = STEM_POLARITY[chart.pillars.year.can]
  gender = chart.birth_profile.input.gender

  # Direction rule
  forward = (year_polarity == 'Dương' and gender == 'Nam') or
            (year_polarity == 'Âm' and gender == 'Nữ')

  # Starting age
  birth_jdn = jdnFromDate(chart.birth_profile.input.solar_datetime_local)
  if forward:
    next_tiet_jdn = findNextTiet(birth_jdn)
    days_to_tiet = next_tiet_jdn - birth_jdn
  else:
    prev_tiet_jdn = findPreviousTiet(birth_jdn)
    days_to_tiet = birth_jdn - prev_tiet_jdn

  start_age = days_to_tiet / 3.0  # 3 days = 1 year of age (approximate classical rule)

  # Generate pillars
  current_pillar = chart.pillars.month
  pillars = []
  for i in 1..count:
    current_pillar = nextPillarInCycle(current_pillar, forward)
    pillars.append({
      pillar: current_pillar,
      start_age: start_age + (i-1) * 10,
      end_age: start_age + i * 10
    })

  return pillars
```

Reference: `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §9.

## **§2.10 — Pillar Relations Engine**

```pseudocode
function detectPillarRelations(pillars):
  result = {
    stem_combos: [], stem_clashes: [],
    branch_six_combos: [], branch_trios: [],
    branch_directionals: [],
    branch_clashes: [], branch_harms: [],
    branch_punishes: [], branch_breaks: []
  }

  pillar_names = ['year', 'month', 'day', 'hour']

  # Pairwise checks
  for i in 0..3:
    for j in i+1..3:
      if pillars[pillar_names[i]] is null or pillars[pillar_names[j]] is null:
        continue

      p1 = pillars[pillar_names[i]]
      p2 = pillars[pillar_names[j]]

      # Stem combos
      if (p1.can, p2.can) in STEM_COMBO_PAIRS:
        result.stem_combos.append({pair: [pillar_names[i], pillar_names[j]],
                                    type: 'hợp',
                                    produces: STEM_COMBO_PAIRS[(p1.can, p2.can)]})

      # Stem clashes
      if (p1.can, p2.can) in STEM_CLASH_PAIRS:
        result.stem_clashes.append({pair: [pillar_names[i], pillar_names[j]],
                                     type: 'khắc'})

      # Branch six combos
      if (p1.chi, p2.chi) in BRANCH_SIX_COMBO_PAIRS:
        result.branch_six_combos.append({...})

      # Branch clashes (lục xung)
      if (p1.chi, p2.chi) in BRANCH_CLASH_PAIRS:
        result.branch_clashes.append({...})

      # Branch harms (lục hại)
      if (p1.chi, p2.chi) in BRANCH_HARM_PAIRS:
        result.branch_harms.append({...})

      # Branch breaks (lục phá)
      if (p1.chi, p2.chi) in BRANCH_BREAK_PAIRS:
        result.branch_breaks.append({...})

  # Three-branch combos (tam hợp + tam hội)
  for trio in itertools.combinations(pillar_names, 3):
    chis = [pillars[p].chi for p in trio if pillars[p]]
    if len(chis) == 3:
      if set(chis) in BRANCH_TRIO_SETS:
        result.branch_trios.append({trio: trio,
                                     type: 'tam hợp',
                                     produces: BRANCH_TRIO_PRODUCES[set(chis)]})
      if set(chis) in BRANCH_DIRECTIONAL_SETS:
        result.branch_directionals.append({...})

  # Punishments (tam hình) — special pattern
  detectPunishments(pillars, result)

  return result
```

Reference: `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §10.

## **§2.11 — Pipeline orchestrator**

```pseudocode
function computeBaziChart(input):
  # Validate
  validation = validateBaziInput(input)
  if validation == INVALID:
    return error

  birth = input.birth_profile

  # Sequential engines per Architecture §3.11
  pillars = buildPillars(birth)
  day_master_info = getDayMaster(pillars)
  hidden_stems = extractHiddenStems(pillars)
  ten_gods = computeTenGods(pillars, hidden_stems, day_master_info.day_master)
  twelve_stages = computeTwelveStages(pillars, day_master_info.day_master)
  element_distribution = computeElementDistribution(pillars, hidden_stems)
  day_master_strength = computeDayMasterStrength(day_master_info.day_master,
                                                  pillars, element_distribution)
  useful_god = selectUsefulGod({
    day_master: day_master_info.day_master,
    day_master_element: day_master_info.day_master_element,
    day_master_strength: day_master_strength,
    pillars: pillars,
    element_distribution: element_distribution
  }, input.options)
  luck_pillars = computeLuckPillars({...})
  pillar_relations = detectPillarRelations(pillars)

  # Assemble
  chart = {
    metadata: {
      algorithm_version: 'TAO_BAZI_v1.0',
      formula_version: 'PHONGTHUY_REF_v1.0',
      computed_at: now(),
      qot_trace_id: generateTraceId(),
      source_calendar_profile_id: birth.metadata.id
    },
    birth_profile: birth,
    pillars: pillars,
    day_master: day_master_info.day_master,
    day_master_element: day_master_info.day_master_element,
    day_master_polarity: day_master_info.day_master_polarity,
    derived_layers: {
      hidden_stems, ten_gods, twelve_stages,
      element_distribution, day_master_strength,
      useful_god, luck_pillars, pillar_relations
    }
  }

  # Validation per LAW 3 (cross-engine integrity)
  assert chart.pillars.year.can_chi == birth.can_chi.year (sanity)
  assert chart.pillars.day.can_chi == birth.can_chi.day (sanity)

  # Persist + return
  saveChart(chart)
  emitEvent('bazi_chart_computed', {chart_id, user_id})

  return chart
```

---

# **PART 3 — PHONG THỦY PROFILE CONSTRUCTION (4 engines)**

## **§3.1 — Cung Mệnh Engine**

```pseudocode
function computeCungMenh(birth_year, gender):
  # Use lunar year (Tết-aligned, consistent with Bazi V1)
  # birth_year here = lunar.year from calendar engine
  effective_year = birth_year

  # Sum digits to single digit
  sum = sumDigitsToSingle(effective_year)

  if gender == 'Nam':
    cm_idx = 11 - sum
    if cm_idx == 5:
      cm_idx = 2  # Special: Khôn
  else:  # Nữ
    cm_idx = sum + 4
    if cm_idx > 9:
      cm_idx -= 9
    if cm_idx == 5:
      cm_idx = 8  # Special: Cấn

  cung_menh = TRIGRAMS[cm_idx]
  group = TRIGRAM_GROUP[cung_menh]  # Đông Tứ Mệnh / Tây Tứ Mệnh
  ban_menh_tinh = TRIGRAM_TO_STAR_NUMBER[cung_menh]  # 1-9

  return {cung_menh, group, ban_menh_tinh}
```

Reference: `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §12.2-12.3.

**Implementation note:** Pre-compute lookup table `cung_menh_by_year_gender[year][gender]` for years 1900-2100 to avoid digit-sum every request.

## **§3.2 — Bát Trạch Engine**

```pseudocode
function computeBatTrach(cung_menh):
  matrix = BAT_TRACH_MATRIX[cung_menh]  # Per FORMULA_REF §12.5

  return {
    favorable: {
      sinh_khi: matrix.sinh_khi,
      thien_y: matrix.thien_y,
      dien_nien: matrix.dien_nien,
      phuc_vi: matrix.phuc_vi
    },
    unfavorable: {
      tuyet_menh: matrix.tuyet_menh,
      ngu_quy: matrix.ngu_quy,
      luc_sat: matrix.luc_sat,
      hoa_hai: matrix.hoa_hai
    }
  }
```

Pure lookup. Per `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §12.5.

## **§3.3 — Cửu Cung Phi Tinh Engine**

```pseudocode
function computeFlyingStars(input):
  # Input: construction_period (1-9), facing_direction, current_year, [current_month]

  # Step 1: Period base chart
  period_base_chart = generatePeriodBaseChart(input.construction_period,
                                                input.facing_direction)
  # 9 palaces with mountain star + facing star

  # Step 2: Annual star overlay
  annual_ruling_star = computeAnnualRulingStar(input.current_year)
  annual_chart = generateAnnualChart(annual_ruling_star)

  # Step 3: Monthly star overlay (optional)
  if input.current_month:
    monthly_ruling_star = computeMonthlyRulingStar(input.current_year, input.current_month)
    monthly_chart = generateMonthlyChart(monthly_ruling_star)
  else:
    monthly_chart = null

  return {
    period_base: period_base_chart,
    annual: annual_chart,
    monthly: monthly_chart,
    period_number: input.construction_period
  }

function computeAnnualRulingStar(year):
  # Per FORMULA_REF §13.4 (men's formula — applied to year, not gender)
  sum = sumDigitsToSingle(year)
  result = 11 - sum
  if result <= 0:
    result += 9
  return result

function generateAnnualChart(ruling_star):
  # Lo Shu sequence: place stars in 9 palaces starting from center=ruling_star
  chart = {}
  for i in 0..8:
    palace_name = LO_SHU_SEQUENCE[i]
    star_number = (ruling_star + i - 1) mod 9 + 1
    chart[palace_name] = star_number
  return chart
```

Reference: `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §13.

## **§3.4 — Direction Utilities**

```pseudocode
function compassToDirection(degrees):
  # Map compass angle to 8-direction
  # Ranges per FORMULA_REF §14.1
  d = degrees mod 360
  if d >= 337.5 or d < 22.5: return 'Bắc'
  if d < 67.5: return 'Đông Bắc'
  if d < 112.5: return 'Đông'
  if d < 157.5: return 'Đông Nam'
  if d < 202.5: return 'Nam'
  if d < 247.5: return 'Tây Nam'
  if d < 292.5: return 'Tây'
  return 'Tây Bắc'

function applyMagneticDeclination(magnetic_degrees, lat, lon, date):
  # For VN: declination ~0-2° east in 2026, small enough to ignore for casual
  # For high-precision: use IGRF model
  declination = igrfDeclination(lat, lon, date)
  return (magnetic_degrees + declination) mod 360
```

## **§3.5 — Pipeline orchestrator (basic profile)**

```pseudocode
function computePhongThuyProfile(input):
  validation = validatePhongThuyInput(input)
  if validation != VALID:
    return error

  cm_info = computeCungMenh(input.birth_year, input.gender)
  bat_trach = computeBatTrach(cm_info.cung_menh)

  profile = {
    metadata: {
      algorithm_version: 'TAO_PHONGTHUY_v1.0',
      computed_at: now(),
      qot_trace_id: generateTraceId()
    },
    user_id: input.user_id,
    cung_menh: cm_info.cung_menh,
    group: cm_info.group,
    ban_menh_tinh: cm_info.ban_menh_tinh,
    bat_trach: bat_trach,
    residence: null  # filled by separate flow
  }

  saveProfile(profile)
  return profile
```

## **§3.6 — Pipeline orchestrator (with residence)**

```pseudocode
function addResidenceToProfile(user_id, residence_input):
  if not residence_input.consent_acknowledged:
    return REJECTED  # per LAW 12

  # Encrypt sensitive fields per LAW 12
  encrypted_address = encryptAES256(residence_input.address)
  encrypted_floor_plan = residence_input.floor_plan ?
                          encryptAES256(serialize(residence_input.floor_plan)) :
                          null

  # Compute Phi Tinh if construction period + facing direction provided
  phi_tinh_chart = null
  if residence_input.construction_period and residence_input.facing_direction:
    phi_tinh_chart = computeFlyingStars({
      construction_period: residence_input.construction_period,
      facing_direction: residence_input.facing_direction,
      current_year: now().year,
      current_month: now().month
    })

  residence_record = {
    user_id: user_id,
    address_encrypted: encrypted_address,
    main_entrance_direction: residence_input.main_entrance_direction,
    construction_period: residence_input.construction_period,
    facing_direction: residence_input.facing_direction,
    floor_plan_encrypted: encrypted_floor_plan,
    phi_tinh_chart: phi_tinh_chart,
    consent_timestamp: now(),
    audit_log: []
  }

  saveResidence(residence_record)
  return residence_record
```

---

# **PART 4 — OUTPUT SCHEMAS**

## **§4.1 — Bazi Chart Object (full)**

```typescript
type BaziChartObject = {
  // Metadata
  metadata: {
    chart_id: string;                       // UUID
    algorithm_version: string;               // e.g., "TAO_BAZI_v1.0"
    formula_version: string;                 // e.g., "PHONGTHUY_REF_v1.0"
    computed_at: string;                     // ISO 8601
    qot_trace_id: string;
    source_calendar_profile_id: string;      // FK
  };

  // Inputs (mirrored)
  birth_profile: NormalizedBirthProfile;

  // Pillars
  pillars: {
    year: { can: string; chi: string };
    month: { can: string; chi: string };
    day: { can: string; chi: string };       // day.can = day master
    hour: { can: string; chi: string } | null;  // null if hour missing
  };

  // Day master
  day_master: string;                          // = pillars.day.can
  day_master_element: 'Mộc' | 'Hỏa' | 'Thổ' | 'Kim' | 'Thủy';
  day_master_polarity: 'Dương' | 'Âm';

  // Derived layers
  derived_layers: {
    hidden_stems: HiddenStems;
    ten_gods: TenGodsMap;
    twelve_stages: TwelveStages;
    element_distribution: ElementCount;
    day_master_strength: DayMasterStrength;
    useful_god: UsefulGod;
    luck_pillars: LuckPillar[] | null;        // null if hour missing
    pillar_relations: PillarRelations;
  };

  // Status
  chart_status: 'complete' | 'partial';
  hour_missing: boolean;
  confidence: 'high' | 'medium' | 'low';
};
```

## **§4.2 — Phong Thủy Profile**

```typescript
type PhongThuyProfile = {
  metadata: {
    profile_id: string;
    algorithm_version: string;
    computed_at: string;
    qot_trace_id: string;
  };

  user_id: string;
  cung_menh: 'Khảm' | 'Khôn' | 'Chấn' | 'Tốn' | 'Càn' | 'Đoài' | 'Cấn' | 'Ly';
  group: 'Đông Tứ Mệnh' | 'Tây Tứ Mệnh';
  ban_menh_tinh: 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9;  // 5 not used (replaced)

  bat_trach: {
    favorable: {
      sinh_khi: Direction;
      thien_y: Direction;
      dien_nien: Direction;
      phuc_vi: Direction;
    };
    unfavorable: {
      tuyet_menh: Direction;
      ngu_quy: Direction;
      luc_sat: Direction;
      hoa_hai: Direction;
    };
  };

  residence: ResidenceRecord | null;
};

type ResidenceRecord = {
  residence_id: string;
  user_id: string;
  address_encrypted: string;                    // AES-256
  main_entrance_direction: number;              // compass degrees
  construction_period: 1|2|3|4|5|6|7|8|9 | null;
  facing_direction: number | null;
  floor_plan_encrypted: string | null;
  phi_tinh_chart: PhiTinhChart | null;
  consent_timestamp: string;
  audit_log: AuditEntry[];
};
```

## **§4.3 — Reading Object**

```typescript
type BaziReadingObject = {
  reading_id: string;
  chart_id: string;                              // FK to BaziChartObject
  reading_mode: 'overview' | 'day_master' | 'useful_god' |
                'luck_pillars' | 'compatibility' | 'annual';
  user_membership_tier: string;
  generated_at: string;
  algorithm_version: string;

  sections: ReadingSection[];

  qot_trace_id: string;
};

type ReadingSection = {
  title: string;
  content_paragraphs: string[];
  evidence: Evidence[];                          // pillar/star/relation refs
  tendencies: string[];
  cautions: string[];                            // never "warnings"
  qot_trace: string;
};

type PhongThuyReadingObject = { ... };  // analogous structure
```

---

# **PART 5 — READING ENGINE**

## **§5.1 — Reading content discipline (per SYSTEM_LAW)**

All reading content MUST:
- Use neutral framing (LAW 4)
- Reference specific chart evidence (pillar/element/relation)
- Include solution-oriented framing for "challenges"
- Avoid forbidden language (per `TAO_BAZI_SYSTEM_LAW_v1` REDLINE 1)

## **§5.2 — Reading template patterns**

### **§5.2.1 — Day Master Analysis section**

```
[Title] Day Master của bạn: {day_master_can_chi} — {element_symbol}

{day_master} thuộc hành {element}, mang tính {polarity}. {symbolic_description}

Theo phân tích cấu trúc:
- Strength: {strength_label} ({total_score})
- Mùa sinh ({season}) đối với {element}: {seasonal_state}
- Phân bố ngũ hành: {element_distribution_breakdown}

Xu hướng cấu trúc:
{tendencies based on strength + distribution}

Điểm cần cân bằng:
{cautions, framed as "elements to be aware of", not "dangers"}
```

### **§5.2.2 — Useful God section**

```
[Title] Dụng thần phù hợp: {useful_god_primary}

Dựa trên Day Master {day_master} có cường độ {strength_label}, cấu trúc Bazi gợi ý {primary} là dụng thần phù hợp.

Lý do:
{reasoning chain}

Hướng phù hợp với dụng thần này:
- Nghề nghiệp: {career_directions}
- Môi trường: {environment_directions}
- Activities: {activity_suggestions}

Điều cần lưu ý:
- Element {avoid[0]}: {explanation}
- Element {avoid[1]}: {explanation}

[Lưu ý:] Đây là gợi ý dựa trên cấu trúc Bazi. Mỗi quyết định cuộc sống cần tham chiếu nhiều yếu tố ngoài Bazi.
```

## **§5.3 — Reading template patterns (Phong Thủy)**

### **§5.3.1 — Bát Trạch Profile section**

```
[Title] Cung Mệnh của bạn: {cung_menh} ({group})

Cung Mệnh gắn với Trigram {trigram}, hành {element}, polarity {polarity}.

4 hướng phù hợp:
- Sinh Khí (sinh động, sự nghiệp): {sinh_khi}
- Thiên Y (sức khỏe, an khang): {thien_y}
- Diên Niên (tuổi thọ, hòa hợp): {dien_nien}
- Phục Vị (bình ổn, tu tâm): {phuc_vi}

4 hướng cần cân bằng:
- Tuyệt Mệnh: {tuyet_menh} (hướng đối lập mạnh nhất)
- Ngũ Quỷ: {ngu_quy}
- Lục Sát: {luc_sat}
- Họa Hại: {hoa_hai}

Gợi ý sử dụng:
- Cửa chính: hướng Sinh Khí hoặc Diên Niên
- Đầu giường: hướng Sinh Khí hoặc Thiên Y
- Bàn làm việc: hướng Sinh Khí hoặc Diên Niên

[Lưu ý:] Bát Trạch là một trong nhiều phương pháp phong thủy. Đối với phân tích chi tiết hơn, kết hợp Cửu Cung Phi Tinh + thông tin nhà cụ thể.
```

---

# **PART 6 — INTEGRATION ENDPOINTS**

## **§6.1 — Bazi API endpoints**

```
POST /api/bazi/chart/compute
  Body: BaziComputeInput
  Returns: BaziChartObject
  Auth: required, user_id matched

GET /api/bazi/chart/:chart_id
  Returns: BaziChartObject
  Auth: required, owner only

POST /api/bazi/reading/generate
  Body: { chart_id, reading_mode }
  Returns: BaziReadingObject
  Auth: required, owner only, membership-gated

POST /api/bazi/compatibility/compute
  Body: { chart_id_a, chart_id_b }  // user must own at least one or have shared link consent
  Returns: CompatibilityReading
  Auth: required, premium tier

POST /api/bazi/aier/session
  Body: { chart_id, message }
  Returns: AIER response
  Auth: required, owner only
```

## **§6.2 — Phong Thủy API endpoints**

```
POST /api/phongthuy/profile/compute
  Body: PhongThuyBasicInput
  Returns: PhongThuyProfile (basic)
  Auth: required

POST /api/phongthuy/residence
  Body: PhongThuyResidenceInput
  Returns: ResidenceRecord
  Auth: required, consent verified

GET /api/phongthuy/profile/:user_id
  Returns: PhongThuyProfile (with residence if owner)
  Auth: required, owner only

DELETE /api/phongthuy/residence/:residence_id
  Returns: { deleted: true }
  Auth: required, owner only
  Note: per LAW 12 right-to-be-forgotten

POST /api/phongthuy/flying-stars/compute
  Body: { construction_period, facing_direction, year, month? }
  Returns: PhiTinhChart
  Auth: required, premium tier

POST /api/phongthuy/aier/session
  Body: { profile_id, message }
  Returns: AIER response
  Auth: required, owner only
```

## **§6.3 — Lịch Vạn Niên integration**

When user has Bazi profile + queries `getDayInfo(date)`:
- Lịch Vạn Niên engine fetches user.bazi_chart
- Computes Bazi-aware day energy per `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §15
- Returns enhanced response

When user has Phong Thủy residence + Premium:
- Daily flying star computed for residence
- Surfaced in Daily Detail page

---

# **PART 7 — AUDIT & TEST SET**

## **§7.1 — Validation fixtures (Bazi)**

| # | Input | Expected output |
|---|---|---|
| B1 | NTS audit case | ALL 4 pillars match Tử Vi Can-Chi exactly (LAW 3 — full alignment) |
| B2 | Born 2024-02-10 (Tết Giáp Thìn) | Year pillar = Giáp Thìn (2024 lunar year) |
| B3 | Born 2024-02-09 23:00 (one day before Tết) | Year pillar = Quý Mão (still 2023 lunar year) |
| B4 | User Mộc DM, born winter | Strength: tướng or hưu (depending on chart) |
| B5 | User Hỏa DM, born summer | Strength: vượng |
| B6 | User Mộc, season Xuân | Day master strength: vượng |
| B7 | Tý-Mùi pair in user pillars | Detected as 'lục hại' |
| B8 | Dần-Ngọ-Tuất in 3 pillars | Detected as 'tam hợp Hỏa' |
| B9 | Hour missing | Chart status: partial, hour_missing: true |
| B10 | Cross-source cross-check | Match VN-school references (lịch vạn niên Việt Nam, sách Tử Bình Việt). Do NOT cross against Joey Yap or other classical Chinese tools — they will disagree by design (different school). |

## **§7.2 — Validation fixtures (Phong Thủy)**

| # | Input | Expected |
|---|---|---|
| P1 | Nam, born 1990 | Cung Mệnh = Tốn, group Đông Tứ Mệnh |
| P2 | Nữ, born 1990 | Cung Mệnh = Khôn, group Tây Tứ Mệnh |
| P3 | Cung Mệnh Khảm | Sinh Khí = Đông Nam, Tuyệt Mệnh = Tây Nam |
| P4 | Cung Mệnh Càn | Sinh Khí = Tây, group Tây Tứ Mệnh |
| P5 | 2026 annual ruling star | Star 4 (per Period 9 + 2026 calc) |
| P6 | Compass 90° magnetic | Direction = Đông |
| P7 | Compass 0° (with 2° declination correction) | Direction = Bắc |

## **§7.3 — Cross-engine integrity tests (per LAW 3)**

```typescript
test('Bazi pillars must match Tử Vi pillars exactly for same person (VN-school full alignment)', () => {
  const user = createTestUser();
  const ziwei = computeZiweiChart(user);
  const bazi = computeBaziChart(user);

  // ALL 4 pillars must match — per LAW 3 v1.1 (NTS school lock 2026-04-29)
  expect(bazi.pillars.year).toEqual(ziwei.year_pillar);
  expect(bazi.pillars.month).toEqual(ziwei.month_pillar);
  expect(bazi.pillars.day).toEqual(ziwei.day_pillar);
  expect(bazi.pillars.hour).toEqual(ziwei.hour_pillar);

  // Any disagreement = engine bug (no expected divergence in VN-school)
});

test('No silent fallback when leap-month edge case', () => {
  const edge_case = createLeapMonth12Day16Plus();
  const bazi = computeBaziChart(edge_case);
  expect(bazi.metadata.notes).toContain('leap-month-12 day-16+ rollover detected');
});
```

## **§7.4 — Sensitive data tests (per LAW 12)**

```typescript
test('Residence data is encrypted at rest', () => {
  const profile = createPhongThuyWithResidence();
  const raw_db_record = await db.query('SELECT * FROM phongthuy_residences WHERE id = ?', [profile.residence.id]);
  expect(raw_db_record.address_encrypted).not.toContain(plaintext_address);
  expect(isAES256Encrypted(raw_db_record.address_encrypted)).toBe(true);
});

test('User can delete residence data (right to be forgotten)', () => {
  const profile = createPhongThuyWithResidence();
  await deleteResidence(profile.user_id, profile.residence.id);

  const after = await db.query('SELECT * FROM phongthuy_residences WHERE id = ?', [profile.residence.id]);
  expect(after).toBeNull();
});

test('AIER context pack does not include raw residence', () => {
  const profile = createPhongThuyWithResidence();
  const context = buildAIERContextPack(profile.user_id);
  expect(context.phongthuy_summary).toBeDefined();
  expect(context.phongthuy_summary.address).toBeUndefined();
  expect(JSON.stringify(context)).not.toContain(plaintext_address);
});
```

## **§7.5 — Content compliance tests**

```typescript
test('Reading content does not contain forbidden keywords', () => {
  const reading = generateBaziReading(testChart, 'day_master');
  for (section of reading.sections) {
    expect(section.content_paragraphs.join(' ')).not.toMatch(
      /chết|tử|tai họa|tuyệt mệnh|không qua khỏi|phải làm/i
    );
  }
});

test('AIER Bazi response not in thầy-phán tone', () => {
  const response = aierBaziChat({ chart_id, message: 'Mệnh tôi tốt không?' });
  expect(response.text).not.toMatch(/^Mệnh.*là\b|^Số bạn|tôi phán/i);
  expect(response.text).toMatch(/cấu trúc|xu hướng|gợi ý|theo Bazi/i);
});
```

---

# **PART 8 — EDGE CASES & GATES**

## **§8.1 — Tết Nguyên Đán boundary case**

Born within 24 hours of Tết Nguyên Đán: engine MUST log `boundary_warning: 'near_tet'`. UI MUST show explanation. Per VN-school, year pillar boundary at Tết requires careful handling for late-night-Dec-cuối / early-morning-Jan-Giêng births.

## **§8.2 — Lunar month boundary case**

Born within 24h of any lunar month boundary (mùng 1 of new month): engine MUST log `boundary_warning: 'near_lunar_month_change'`. Same boundary as Tử Vi — confidence remains high if lunar date well-defined.

## **§8.3 — Hour Tý phase**

Engine MUST apply day rollover for Tý sớm (23:00-23:59) → Hour Pillar uses NEXT day's Day Can. Tý muộn (00:00-00:59) does not roll over. Per `TAO_LUNAR_CALENDAR_ALGORITHM_v1` §7.5.

## **§8.4 — Special Cung Mệnh case (5 → 2 or 8)**

When digit-sum produces Cung Mệnh index 5 (which is center, no trigram), engine MUST replace with:
- Nam: Cung Mệnh = Khôn (idx 2)
- Nữ: Cung Mệnh = Cấn (idx 8)

Per `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §12.2.

## **§8.5 — Construction period unknown**

If user provides residence but unknown construction period, Phi Tinh chart cannot be computed. Engine MUST:
- Save residence with `construction_period: null`
- Skip Phi Tinh
- UI MUST guide user to enter period when known

## **§8.6 — Pre-1900 / Post-2100 birth dates**

- Pre-1900: limited support, log warning, flag confidence
- Post-2100: limited support, log warning

---

# **PART 9 — VERSION CONTROL**

## **§9.1 — Algorithm version field**

Every output object has:
```
metadata.algorithm_version: 'TAO_BAZI_v1.0' | 'TAO_PHONGTHUY_v1.0'
metadata.formula_version: 'PHONGTHUY_REF_v1.0'
```

Bumping triggers:
- Full regression CI
- Optional: re-compute existing charts with diff alert
- Backward compat: keep at least 2 prior versions readable

## **§9.2 — Schema version**

`bazi_chart_object` schema versioned independently. Field additions backward-compatible. Field removals require migration plan.

---

# **AMENDMENT RULE**

SPEC amendments require:
1. Proposal as `TAO_BAZI_IMPLEMENTATION_SPEC_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Cannot contradict Canon, SYSTEM_LAW, ARCHITECTURE
4. Algorithm changes → bump version + full regression CI
5. Old version archived

---

# **VERSION LOG**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-29 | Initial — TAO V1 + V3 implementation spec |
| v1.1 | 2026-04-29 | NTS school lock (Q1=A + Q2=A): Year pillar boundary = Tết Nguyên Đán, Month pillar boundary = lunar month. Updated §1.1 input contract (removed `tieng_khi_aware` option), §2.1.1-§2.1.2 (Year+Month pseudocode rewritten for VN-school), §3.1 Cung Mệnh comment, §7.1 fixtures B1-B3 + B10, §7.3 cross-engine test (now requires ALL pillars match), §8.1-§8.2 edge cases (now Tết + lunar month boundaries). |

---

# **SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.1 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ awaiting | — |
| Effective | — | ⏳ pending TAO V1 build phase | — |

**END — TAO_BAZI_IMPLEMENTATION_SPEC_v1**
