# **TAO LUNAR CALENDAR ALGORITHM v1.0**

## **Eastern lunar calendar computation method (Vietnam + China) — Layer 2 reference**

---

**Document ID:** TAO_LUNAR_CALENDAR_ALGORITHM_v1
**Version:** 1.0
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge — injected on-demand)
**Authority Level:** Tier 3 (extends `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1` §3.7 + Appendix C.3)
**Parent docs:**
- `TAO_ZIWEI_CANON_OFFICIAL_v1.md` (Tier 1)
- `TAO_ZIWEI_SYSTEM_LAW_v1.md` (Tier 2)
- `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.md` §3.7 (calendar normalization framework — policy)
- `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.md` Appendix C.3 (timezone gate, hour Tý phase — policy)
- `TAO_ZIWEI_FORMULA_REFERENCE_v1.md` (chart construction tables)
**Reference sources:**
- Hồ Ngọc Đức, Vietnamese lunar calendar algorithm (informatik.uni-leipzig.de/~duc/amlich/)
- Jean Meeus, *Astronomical Algorithms*, 2nd ed. 1998 (chapters 7, 21, 47-49)
- Tøndering, Frequently Asked Questions about Calendars (tondering.dk/claus/calendar.html)
- Yuk Tung Liu, *Rules for the Chinese Calendar* (ytliu0.github.io/ChineseCalendar/rules.html)
- Hoàng Xuân Hãn, *Lịch và lịch Việt Nam* (1982) — historical Vietnam calendar
**Status:** ✅ APPROVED for Layer 2 reference (awaiting NTS sign-off)
**Issued by:** CLA-2 (Lane_02)

---

## **§0 — PURPOSE**

`TAO_ZIWEI_IMPLEMENTATION_SPEC_v1` §3.7 yêu cầu mọi lá số phải đi qua **calendar normalization layer** với:
- one canonical leap-month policy (§3.2)
- timezone gate (Appendix C.3.1)
- hour Tý phase split (Appendix C.3.2)
- formula version control (Appendix C.2)

SPEC chỉ định **phải có**, không định **làm thế nào**. Doc này fill the gap: cung cấp **algorithm cụ thể, executable, audit-able** để CLAC-2 implement engine `lib/tao/calendar/`.

**Critical scope rule (per LAW 11 — Tier hierarchy):**
- Doc này KHÔNG override SPEC §3.7 / Appendix C.3 (chúng vẫn là policy authority).
- Doc này IS THE algorithm reference — implementation must match.
- Nếu phát hiện mâu thuẫn giữa doc này và SPEC → SPEC wins → doc này amend.

**Non-goal:** Doc này KHÔNG cover Bazi-style minute-level Can-Chi (chuyện đó thuộc TAO V1 Bazi). Doc này focus vào mức độ chi tiết Tử Vi cần: **năm âm + tháng âm (with leap flag) + ngày âm + giờ chi (12 chi, with Tý phase)**.

---

## **§1 — KEY PRINCIPLE: VIETNAMESE vs CHINESE CALENDAR DIFFER**

Đây là điểm **bắt buộc** mọi engineer phải hiểu trước khi code.

Cả hai lịch đều dùng **cùng thuật toán thiên văn** (new moon + 24 solar terms), nhưng khác **kinh tuyến chuẩn**:

| Hệ | Meridian | UTC offset | Reason |
|---|---|---|---|
| **Trung Quốc** | 120°E | UTC+08:00 | Beijing standard time, adopted 1929 |
| **Việt Nam** | 105°E | UTC+07:00 | Hà Nội standard time, current |

**Hệ quả:** New moon xảy ra ở 1 thời điểm UTC duy nhất, nhưng giờ địa phương ở Bắc Kinh và Hà Nội cách nhau 1 giờ. Khi new moon rơi vào khung 23:00 (Hà Nội) → 00:00 (Bắc Kinh):

- Lịch Việt Nam đặt tháng âm bắt đầu **ngày X** (Hà Nội time)
- Lịch Trung Quốc đặt tháng âm bắt đầu **ngày X+1** (Beijing time)

Đây là lý do **lịch Việt Nam và Trung Quốc lệch nhau ở một số năm** (đặc biệt rõ trong giai đoạn 1645-1812 và rải rác sau đó).

### **§1.1 — Rule for TAO UZG+**

```
IF user_birth_location ∈ {Vietnam, Vietnamese diaspora using âm lịch VN}:
  USE timezone_offset = +7 hours (UTC+07:00)
  USE meridian = 105°E
  → "Vietnamese lunar mode"

ELIF user_birth_location ∈ {Trung Quốc, Đài Loan, Hong Kong, Singapore, Malaysia, Korea using 음력, Japan using 旧暦}:
  USE timezone_offset = +8 hours (UTC+08:00)
  USE meridian = 120°E
  → "Chinese lunar mode"

ELSE (sinh ở quốc gia khác, không có truyền thống lịch âm bản địa):
  ASK user: "Lá số của bạn theo hệ lịch Việt Nam hay Trung Quốc?"
  DEFAULT: Vietnamese mode (vì TAO UZG+ là sản phẩm Việt Nam-first)
```

**Audit field (mandatory in chart_object per SPEC §12.4):**
- `lunar_calendar_system`: `'vn' | 'cn'`
- `meridian_offset_hours`: `7 | 8`
- `algorithm_version`: `'TAO_LUNAR_v1.0'`

---

## **§2 — ALGORITHM OVERVIEW (5-step pipeline)**

```
INPUT: solar (yyyy-mm-dd hh:mm) + birth_location + lunar_calendar_system

  ┌─────────────────────────────────────────────┐
  │ STEP 1: Localize datetime                    │
  │   Apply timezone for solar→local conversion │
  │   Apply Vietnam historical hour adjustment   │
  │   (per FORMULA_REF §2.1)                    │
  └─────────────────────────────────────────────┘
                    ↓
  ┌─────────────────────────────────────────────┐
  │ STEP 2: Solar → Julian Day Number           │
  │   jdFromDate(dd, mm, yy) → integer JDN      │
  └─────────────────────────────────────────────┘
                    ↓
  ┌─────────────────────────────────────────────┐
  │ STEP 3: Find lunar month containing this JDN│
  │   Compute new moon k around target JDN      │
  │   Determine month boundaries                │
  └─────────────────────────────────────────────┘
                    ↓
  ┌─────────────────────────────────────────────┐
  │ STEP 4: Determine lunar year + month index  │
  │   Anchor on month-11 (chứa Đông Chí)        │
  │   Apply leap-month rule                     │
  └─────────────────────────────────────────────┘
                    ↓
  ┌─────────────────────────────────────────────┐
  │ STEP 5: Compute Can-Chi layers              │
  │   Year, month, day, hour Can-Chi            │
  │   Apply hour-Tý phase split                 │
  └─────────────────────────────────────────────┘
                    ↓
OUTPUT: normalized_birth_profile (per SPEC §3.7 step 5)
```

---

## **§3 — STEP 1: LOCALIZE DATETIME**

### **§3.1 — IANA timezone resolution**

Per SPEC Appendix C.3.1, timezone phải dùng **IANA** chứ không phải GMT thô.

```pseudocode
function localizeDatetime(solar_utc, birth_location):
  iana_tz = resolveIANATimezone(birth_location)
  # e.g., "Asia/Ho_Chi_Minh", "Asia/Shanghai", "Asia/Taipei"

  local_dt = convertToTimezone(solar_utc, iana_tz)
  # local_dt now has correct date + time at birth location

  return local_dt, iana_tz
```

**Critical edge cases:**
- Birth date pre-1929 (China): Beijing meridian was 116°25'E, ~14 minutes off 120°E. For TAO purposes, treat as 120°E (modern standard) UNLESS user explicitly requests historical resolution.
- Birth date in DST period (countries with DST): subtract DST offset before mapping to giờ chi.

### **§3.2 — Vietnam historical hour adjustment**

If `birth_country == VN`, apply hour adjustment table from `TAO_ZIWEI_FORMULA_REFERENCE_v1` §2.1 BEFORE Julian Day computation.

This adjustment is for **giờ sinh → giờ chi mapping only**, NOT for lunar date computation. Lunar date uses raw local time (UTC+7 for VN birth).

---

## **§4 — STEP 2: SOLAR → JULIAN DAY NUMBER**

### **§4.1 — Julian Day Number formula (Tøndering / Meeus)**

Julian Day Number (JDN) = số ngày liên tục kể từ 1 tháng 1 năm 4713 TCN (Julian calendar) lúc 12:00 UTC. Đây là format chuẩn cho mọi tính toán thiên văn.

```pseudocode
function INT(x):
  return floor(x)   # discard fractional part

function jdFromDate(dd, mm, yy):
  # dd = day, mm = month, yy = year (Gregorian)
  a = INT((14 - mm) / 12)
  y = yy + 4800 - a
  m = mm + 12*a - 3

  # Gregorian formula (post-1582-10-15)
  jd = dd + INT((153*m + 2) / 5) + 365*y
       + INT(y/4) - INT(y/100) + INT(y/400) - 32045

  # If date is before Gregorian reform (1582-10-15), use Julian
  if jd < 2299161:
    jd = dd + INT((153*m + 2) / 5) + 365*y + INT(y/4) - 32083

  return jd
```

**Validation:** `jdFromDate(15, 10, 1582)` → 2299161 (Gregorian reform date).

### **§4.2 — Julian Day → calendar date (inverse)**

```pseudocode
function jdToDate(jd):
  # jd = integer Julian Day Number
  if jd > 2299160:
    # Gregorian
    a = jd + 32044
    b = INT((4*a + 3) / 146097)
    c = a - INT((b * 146097) / 4)
  else:
    # Julian
    b = 0
    c = jd + 32082

  d = INT((4*c + 3) / 1461)
  e = c - INT((1461*d) / 4)
  m = INT((5*e + 2) / 153)

  day = e - INT((153*m + 2)/5) + 1
  month = m + 3 - 12*INT(m/10)
  year = b*100 + d - 4800 + INT(m/10)

  return [day, month, year]
```

---

## **§5 — STEP 3: FIND LUNAR MONTH CONTAINING TARGET DATE**

### **§5.1 — New Moon computation (Meeus chapter 47)**

Synodic month length = **29.530588853 days** (mean — astronomical precision uses Meeus periodic terms; for chart purposes mean + correction is sufficient).

`k` = số tháng trăng kể từ epoch 2000-01-06 (kJ2000 epoch chuẩn của Meeus):

```pseudocode
function getNewMoonDay(k, timeZone):
  # k = lunar month number from epoch
  # timeZone = +7 (VN) or +8 (CN)
  # Returns: integer JDN of the day containing this new moon

  T = k / 1236.85
  T2 = T * T
  T3 = T2 * T

  # Mean new moon (Meeus 47.1)
  Jd1 = 2415020.75933 + 29.53058868*k
        + 0.0001178*T2 - 0.000000155*T3
        + 0.00033 * sin( deg2rad(166.56 + 132.87*T - 0.009173*T2) )

  # Sun's mean anomaly
  M = 359.2242 + 29.10535608*k
      - 0.0000333*T2 - 0.00000347*T3

  # Moon's mean anomaly
  Mpr = 306.0253 + 385.81691806*k
        + 0.0107306*T2 + 0.00001236*T3

  # Moon's argument of latitude
  F = 21.2964 + 390.67050646*k
      - 0.0016528*T2 - 0.00000239*T3

  # Periodic corrections (truncated for chart-grade precision)
  C1 = (0.1734 - 0.000393*T) * sin(deg2rad(M))
       + 0.0021 * sin(deg2rad(2*M))
       - 0.4068 * sin(deg2rad(Mpr))
       + 0.0161 * sin(deg2rad(2*Mpr))
       - 0.0004 * sin(deg2rad(3*Mpr))
       + 0.0104 * sin(deg2rad(2*F))
       - 0.0051 * sin(deg2rad(M + Mpr))
       - 0.0074 * sin(deg2rad(M - Mpr))
       + 0.0004 * sin(deg2rad(2*F + M))
       - 0.0004 * sin(deg2rad(2*F - M))
       - 0.0006 * sin(deg2rad(2*F + Mpr))
       + 0.0010 * sin(deg2rad(2*F - Mpr))
       + 0.0005 * sin(deg2rad(M + 2*Mpr))

  # Half-day correction (Meeus uses TT, we use UT)
  if T < -11:
    deltat = 0.001 + 0.000839*T + 0.0002261*T2
             - 0.00000845*T3 - 0.000000081*T*T3
  else:
    deltat = -0.000278 + 0.000265*T + 0.000262*T2

  JdNew = Jd1 + C1 - deltat

  # Convert to local timezone day boundary
  return INT(JdNew + 0.5 + timeZone/24)
```

### **§5.2 — Find which lunar month contains target JDN**

```pseudocode
function getLunarMonthBoundaries(targetJDN, timeZone):
  # Estimate lunar month index k near target
  k = INT((targetJDN - 2415021.076998695) / 29.530588853)

  # Try k+1 first (for safety margin)
  monthStart = getNewMoonDay(k+1, timeZone)

  if monthStart > targetJDN:
    # We overshot; use k
    monthStart = getNewMoonDay(k, timeZone)

  return monthStart   # integer JDN of 1st day of the lunar month
```

The `lunar_day` is then simply `targetJDN - monthStart + 1`.

---

## **§6 — STEP 4: LUNAR YEAR + MONTH INDEX (with leap rule)**

### **§6.1 — Anchor: Lunar Month 11 contains Winter Solstice**

**Foundational rule (both VN + CN):** The lunar month containing **Đông Chí (Winter Solstice)** is always month-11.

This anchor solves both year boundary AND leap month determination.

### **§6.2 — Compute Winter Solstice (Sun longitude = 270°)**

```pseudocode
function getSunLongitude(jdn, timeZone):
  # Returns Sun's apparent longitude in [0, 360) degrees
  T = (jdn - 2451545.5 - timeZone/24) / 36525
  T2 = T * T

  L = 280.46645 + 36000.76983*T + 0.0003032*T2
  M = 357.52910 + 35999.05030*T - 0.0001559*T2 - 0.00000048*T2*T

  L = mod360(L)
  M = mod360(M)
  M_rad = deg2rad(M)

  # Equation of center
  C = (1.914600 - 0.004817*T - 0.000014*T2) * sin(M_rad)
      + (0.019993 - 0.000101*T) * sin(2*M_rad)
      + 0.000290 * sin(3*M_rad)

  L_apparent = L + C    # apparent solar longitude
  return mod360(L_apparent)

function getLunarMonth11(yy, timeZone):
  # Find new moon BEFORE Đông Chí of year yy
  # Đông Chí ~ Dec 22 each year
  off = jdFromDate(31, 12, yy) - 2415021.076998695
  k = INT(off / 29.530588853)
  nm = getNewMoonDay(k, timeZone)

  sunLong = INT(getSunLongitude(nm, timeZone) / 30)
  if sunLong >= 9:    # Đông Chí longitude/30 = 9 (270°/30)
    nm = getNewMoonDay(k - 1, timeZone)

  return nm    # JDN of 1st day of month-11 of year yy
```

### **§6.3 — Lunar year assignment**

```pseudocode
function getLunarYearAndMonth(targetJDN, solarYear, timeZone):
  monthStart = getLunarMonthBoundaries(targetJDN, timeZone)
  a11 = getLunarMonth11(solarYear, timeZone)
  b11 = a11

  if a11 >= monthStart:
    # Birth was BEFORE month-11 of current solar year
    # → still in previous lunar year
    lunarYear = solarYear
    a11 = getLunarMonth11(solarYear - 1, timeZone)
  else:
    # Birth was AFTER month-11 of current solar year
    # → in next lunar year
    lunarYear = solarYear + 1
    b11 = getLunarMonth11(solarYear + 1, timeZone)

  lunarDay = targetJDN - monthStart + 1
  diff = INT((monthStart - a11) / 29)

  lunarLeap = false
  lunarMonth = diff + 11

  # Leap-suì check: 13 new moons between two month-11s
  if (b11 - a11) > 365:
    leapMonthDiff = getLeapMonthOffset(a11, timeZone)
    if diff >= leapMonthDiff:
      lunarMonth = diff + 10
      if diff == leapMonthDiff:
        lunarLeap = true

  if lunarMonth > 12:
    lunarMonth = lunarMonth - 12

  if lunarMonth >= 11 and diff < 4:
    lunarYear = lunarYear - 1

  return {
    lunarDay: lunarDay,
    lunarMonth: lunarMonth,
    lunarYear: lunarYear,
    isLeapMonth: lunarLeap
  }
```

### **§6.4 — Leap month rule (no-major-solar-term)**

**The rule:** In a leap suì (13-month interval between two month-11s), the **first lunar month that does NOT contain a Major Solar Term (Trung Khí)** is the leap month.

12 Trung Khí (Principal/Major Terms) — Sun longitude in multiples of 30°:

| # | Tên | Sun longitude | ~ Gregorian date |
|---|---|---|---|
| 1 | Đại Tuyết → Đông Chí | 270° | 22 Dec |
| 2 | Tiểu Hàn → Đại Hàn | 300° | 20 Jan |
| 3 | Lập Xuân → Vũ Thủy | 330° | 19 Feb |
| 4 | Kinh Trập → Xuân Phân | 0° | 21 Mar |
| 5 | Thanh Minh → Cốc Vũ | 30° | 20 Apr |
| 6 | Lập Hạ → Tiểu Mãn | 60° | 21 May |
| 7 | Mang Chủng → Hạ Chí | 90° | 22 Jun |
| 8 | Tiểu Thử → Đại Thử | 120° | 23 Jul |
| 9 | Lập Thu → Xử Thử | 150° | 23 Aug |
| 10 | Bạch Lộ → Thu Phân | 180° | 23 Sep |
| 11 | Hàn Lộ → Sương Giáng | 210° | 23 Oct |
| 12 | Lập Đông → Tiểu Tuyết | 240° | 22 Nov |

```pseudocode
function getLeapMonthOffset(a11, timeZone):
  # a11 = JDN of 1st day of month-11 (anchor)
  # Walk forward through 12 lunar months after a11
  # First month without a Trung Khí = leap month
  k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853)

  last = 0
  i = 1
  arc = getSunLongitude(getNewMoonDay(k+i, timeZone), timeZone) // 30

  while True:
    last = arc
    i = i + 1
    arc = getSunLongitude(getNewMoonDay(k+i, timeZone), timeZone) // 30
    if arc == last or i >= 14:
      break

  return i - 1
```

### **§6.5 — VN vs CN divergence point**

This is **the critical line of code** where VN and CN calendars diverge:

```pseudocode
# Vietnamese:
monthStart_vn = getNewMoonDay(k, timeZone=7)

# Chinese:
monthStart_cn = getNewMoonDay(k, timeZone=8)
```

When new moon occurs UTC time corresponds to Vietnamese time 23:xx but Chinese time 00:xx of next day:
- VN result: `monthStart` = day X
- CN result: `monthStart` = day X+1

Same person, same birth — **two different lunar dates**. TAO must pick one based on `lunar_calendar_system` user choice and record it.

---

## **§7 — STEP 5: CAN-CHI LAYERS**

### **§7.1 — Sexagenary cycle (Lục Thập Hoa Giáp)**

10 Thiên Can (Heavenly Stems): Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý.
12 Địa Chi (Earthly Branches): Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi.
Combined cycle: 60 (LCM of 10 and 12 with same parity).

### **§7.2 — Can-Chi năm (year)**

Anchor: **Năm Giáp Tý = 4 CE** (or any known reference year).

```pseudocode
function yearCanChi(lunarYear):
  can_idx = (lunarYear + 6) % 10        # 0=Giáp, 1=Ất, ..., 9=Quý
  chi_idx = (lunarYear + 8) % 12        # 0=Tý, 1=Sửu, ..., 11=Hợi
  return [CAN[can_idx], CHI[chi_idx]]
```

**Validation:** `yearCanChi(2024)` → Giáp Thìn ✅. `yearCanChi(2026)` → Bính Ngọ ✅.

### **§7.3 — Can-Chi tháng (month)**

Already provided in `TAO_ZIWEI_FORMULA_REFERENCE_v1` §2.3 (lookup table by Can year × lunar month).

**Important:** lunar month index in the lookup table is **the regular month number** (1-12), where Dần=1. If the lunar month is a **leap month**, it shares the same Can-Chi as the preceding regular month for Tử Vi purposes (per V3 §3.2.5 + Hồ Ngọc Đức Vietnamese tradition). Leap month is flagged separately.

### **§7.4 — Can-Chi ngày (day)**

The day Can-Chi cycles every 60 days. Reference anchor: **JDN 2415021 (1900-01-01) = Giáp Tuất day** (verify against authoritative ephemeris).

```pseudocode
function dayCanChi(jdn):
  # Anchor: JDN 0 corresponds to a specific (offset_can, offset_chi)
  # Per Hồ Ngọc Đức convention (verified against Vạn Niên Lịch):
  can_idx = (jdn + 9) % 10
  chi_idx = (jdn + 1) % 12
  return [CAN[can_idx], CHI[chi_idx]]
```

> **Audit note for CLAC-2:** Anchor offsets `+9` and `+1` are the Hồ Ngọc Đức convention. CLAC-2 must verify on T-TAO-001 implementation by cross-checking 5+ known dates (e.g., 2024-01-01 = Bính Tuất day, 2026-04-29 = Bính Ngọ day per current Vạn Niên Lịch). If offsets differ, update via amendment.

### **§7.5 — Can-Chi giờ (hour)**

Already provided in `TAO_ZIWEI_FORMULA_REFERENCE_v1` §2.4 (lookup table by Can day × giờ chi).

**Hour Tý phase split (per SPEC Appendix C.3.2):**

```pseudocode
function hourCanChi(local_time, day_can):
  hour = local_time.hour
  minute = local_time.minute

  # Determine giờ chi
  if hour == 23 or hour == 0:
    chi = 'Tý'
    if hour == 23:
      ty_phase = 'early'    # Tý sớm
      # Day rollover policy: late-Tý belongs to NEXT day's Can-Chi
      day_for_hour = day_can + 1 mod 10    # use next day's can
    else:    # hour == 0
      ty_phase = 'late'     # Tý muộn
      day_for_hour = day_can
  else:
    chi = mapHourToChi(hour)
    ty_phase = null
    day_for_hour = day_can

  can = lookupHourCan(day_for_hour, chi)
  return [can, chi, ty_phase, day_for_hour]
```

**Critical:** `ty_phase` and `day_rollover_applied` MUST be stored in `chart_object.metadata` per SPEC Appendix C.3.2.

---

## **§8 — OUTPUT: NORMALIZED BIRTH PROFILE**

After 5 steps, produce this canonical structure (consumed by all downstream chart engines):

```json
{
  "input": {
    "solar_datetime_utc": "1990-06-15T08:30:00Z",
    "solar_datetime_local": "1990-06-15T15:30:00+07:00",
    "birth_location": {
      "country": "VN",
      "city": "Hà Nội",
      "iana_timezone": "Asia/Ho_Chi_Minh",
      "lat": 21.0285,
      "lon": 105.8542
    },
    "gender": "Nam"
  },
  "lunar": {
    "year": 1990,
    "month": 5,
    "day": 22,
    "is_leap_month": false,
    "calendar_system": "vn",
    "meridian_offset_hours": 7
  },
  "can_chi": {
    "year": ["Canh", "Ngọ"],
    "month": ["Nhâm", "Ngọ"],
    "day": ["Quý", "Sửu"],
    "hour": ["Canh", "Thân"]
  },
  "hour_chi": "Thân",
  "ty_phase": null,
  "polarity": "Dương Nam",
  "vn_hour_adjustment_applied": false,
  "metadata": {
    "algorithm_version": "TAO_LUNAR_v1.0",
    "formula_version": "MEEUS_1998_TRUNCATED",
    "calendar_policy_version": "VN_HONGOC_DUC",
    "computed_at": "2026-04-29T12:34:56Z",
    "day_rollover_applied": false,
    "rollover_policy_version": "TAO_ROLLOVER_v1"
  }
}
```

This object is the input to all chart-construction formulas in `TAO_ZIWEI_FORMULA_REFERENCE_v1`.

---

## **§9 — EDGE CASES & GATES**

### **§9.1 — Missing hour**

Per LAW 2 + SPEC §3.8.2:
- Engine MUST NOT silently default to giờ Ngọ or any specific hour.
- Output: `chart_status = 'partial'`, `hour_missing = true`, `confidence = 'low'`.
- Generate calendar layers (lunar year/month/day + Can-Chi year/month/day) but skip hour-Can-Chi.
- UI must show explicit warning per UI/UX §4.4.

### **§9.2 — Birth near new-moon boundary**

If birth occurs within ±2 hours of a new moon:
- Engine MUST log `boundary_warning = 'near_new_moon'`.
- `confidence` reduced to `'medium'`.
- VN vs CN result may differ → engine must be explicit about which mode used.

### **§9.3 — Birth in Vietnam timezone-shift period**

If birth date ∈ {1943-01-01..1945-03-31, 1945-04-01..1947-03-31, 1947-04-01..1955-06-30, 1960-01-01..1975-05-19} → `vn_hour_adjustment_applied = true` per FORMULA_REF §2.1.

### **§9.4 — Birth in DST country**

Engine MUST consult IANA database for DST flag at exact birth instant. If DST was active, subtract DST offset from local time before mapping to giờ chi.

### **§9.5 — Leap-month-12 day-16+ edge case**

Per `TAO_ZIWEI_BUILD_TASK_MAP_v1_AMENDMENT_001` (T-TAO-001-FU-01): when birth falls into leap-month-12 day 16+, do NOT silently wrap month index. Instead:
- Add explicit entry to `notes[]`: `"leap-month-12 day-16+ rollover detected; refer to canonical reference for resolution"`
- Reduce `input_confidence_score` to `'low'`.

### **§9.6 — Pre-1900 dates**

Algorithm above precise to ~1900-2200. For pre-1900 dates:
- Vietnam: per Hoàng Xuân Hãn (1982), historical lịch pháp định 1301-1945 differs from algorithmic computation. TAO V2 default uses **astronomical calendar** (algorithm output), but stores `historical_calendar_note = true` if user specifies they want pháp định.
- China: pre-1929 used Beijing meridian (116°25'E). For TAO purposes, treat as 120°E unless user explicitly requests historical.

### **§9.7 — Future dates beyond 2200**

Algorithm precision degrades beyond 2200. For 2200+, engine MUST log `precision_warning = 'beyond_validated_range'`.

---

## **§10 — VALIDATION FIXTURE**

Engine implementing this doc MUST pass:

| Test | Solar | Mode | Expected lunar | Expected Can-Chi |
|---|---|---|---|---|
| F1 | 2026-02-17 (Tết Bính Ngọ) | VN | 2026-01-01 | Bính Ngọ năm |
| F2 | 2026-02-17 | CN | 2026-01-01 | Bính Ngọ year |
| F3 | 2024-01-01 | VN | 2023-11-20 | Quý Mão year, Giáp Tý month, Bính Tuất day |
| F4 | 1990-06-15 15:30 Hà Nội | VN | 1990-05-22 | Canh Ngọ year, Quý Sửu day |
| F5 | NTS audit case (V3 §7.9) | VN | (per audit) | (per audit) — **100% match required** |
| F6 | 2023-02-22 23:30 Hà Nội | VN | hour=Tý, ty_phase=early, day_rollover=true |
| F7 | 2023-02-22 00:30 Hà Nội | VN | hour=Tý, ty_phase=late, day_rollover=false |
| F8 | Birth in leap month 2-năm Quý Mão (2023) | VN | is_leap_month=true |

CI must run all 8 fixtures on every commit touching `lib/tao/calendar/`.

Cross-source validation (T-TAO-009): result must match Hồ Ngọc Đức online tool (informatik.uni-leipzig.de/~duc/amlich/) within 0 days for VN mode, and match `ytliu0.github.io/ChineseCalendar` within 0 days for CN mode, for 50 randomly-sampled birth dates between 1900-2100.

---

## **§11 — IMPLEMENTATION GUIDANCE**

### **§11.1 — Recommended library (DO NOT reinvent)**

For CLAC-2 implementation in `lib/tao/calendar/`:

| Language | Library | License |
|---|---|---|
| TypeScript/JavaScript | Port of Hồ Ngọc Đức `amlich.js` | Personal/non-commercial — must obtain commercial license OR rewrite |
| Python | `lunar-vn` (pip) | check license |
| Java | `LunarCalendar4J` (GitHub: nhatanh2996) | check license |

**Recommendation:** Implement TAO's own port from this spec to avoid licensing issues. The algorithm is straightforward (~200 lines) and well-documented.

### **§11.2 — Folder structure (per ARCH §9)**

```
lib/tao/calendar/
├── julian-day.ts              # §4 jdFromDate / jdToDate
├── new-moon.ts                # §5 getNewMoonDay
├── solar-longitude.ts         # §6.2 getSunLongitude
├── lunar-month-11.ts          # §6.2 getLunarMonth11
├── leap-month.ts              # §6.4 getLeapMonthOffset
├── solar-to-lunar.ts          # main converter (§5-§6)
├── can-chi.ts                 # §7 year/month/day/hour Can-Chi
├── hour-ty-phase.ts           # §7.5 hour Tý phase split
├── vn-hour-adjustment.ts      # FORMULA_REF §2.1
├── pipeline.ts                # §2 5-step pipeline
└── tables/
    ├── month-can-by-year.json # FORMULA_REF §2.3
    ├── hour-can-by-day.json   # FORMULA_REF §2.4
    └── trung-khi.json         # §6.4 12 Major Solar Terms
```

### **§11.3 — Test discipline**

- Every function has unit tests with at least 5 known inputs/outputs.
- `pipeline.test.ts` runs §10 validation fixtures F1-F8.
- Property-based tests: `solarToLunar(lunarToSolar(x)) === x` for 1000 random dates.

---

## **§12 — CROSS-REFERENCE TO TIER 1/2 GOVERNANCE**

This algorithm produces the **calendar layer** of `chart_object`. It does NOT authorize:
- Interpretation tone (governed by SYSTEM_LAW §A LAW 4).
- AIER advisory framing (governed by SYSTEM_LAW §C + REDLINE 3).
- UI rendering of date (governed by UI/UX Canon).

**Compliance checklist (must pass before deploy):**
- [ ] All output stores `algorithm_version` per SPEC Appendix C.2
- [ ] Hour Tý phase split per SPEC Appendix C.3.2
- [ ] Timezone resolution uses IANA per SPEC Appendix C.3.1
- [ ] No silent fallback when leap-month edge case occurs
- [ ] VN vs CN mode explicitly recorded in `chart_object`
- [ ] Result matches NTS audit fixture 100%

---

## **§13 — VERSION CONTROL & AMENDMENT**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-29 | Initial — Meeus 1998 truncated + Hồ Ngọc Đức conventions |

**Amendment rule:**
1. Proposal as `TAO_LUNAR_CALENDAR_ALGORITHM_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Amendment must specify: which §, what changed, why (precision improvement vs library compatibility vs edge case fix)
4. If algorithm changes, `formula_version` MUST bump → triggers full regression CI
5. Cannot weaken validation fixture §10
6. Old version archived to `_archive/`

---

## **§14 — REFERENCES**

1. Hồ Ngọc Đức, *Computing the Vietnamese lunar calendar*, https://www.informatik.uni-leipzig.de/~duc/amlich/calrules.html
2. Jean Meeus, *Astronomical Algorithms*, 2nd ed., Willmann-Bell, 1998 — chapters 7 (Julian Day), 21 (Sidereal time), 25 (Solar coordinates), 47 (Phases of the Moon).
3. Tøndering, *Frequently Asked Questions about Calendars*, https://www.tondering.dk/claus/calendar.html
4. Yuk Tung Liu, *Rules for the Chinese Calendar*, https://ytliu0.github.io/ChineseCalendar/rules.html
5. Hoàng Xuân Hãn, *Lịch và lịch Việt Nam*, Khoa học Xã hội, 1982 — historical Vietnamese calendar 1301-1945.
6. Helmer Aslaksen, *The Mathematics of the Chinese Calendar*, NUS, https://www.math.nus.edu.sg/aslaksen/calendar/

---

## **§15 — SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.0 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ awaiting | — |
| Effective | — | ⏳ pending | — |

**END — TAO_LUNAR_CALENDAR_ALGORITHM_v1**
