# **TAO VẠN NIÊN DATA API v1.0**

## **Vạn Niên data engine — algorithms & lookup tables (Tier 3)**

---

**Document ID:** TAO_VANNIEN_DATA_API_v1
**Version:** 1.0
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge — injected on-demand)
**Authority Level:** Tier 3 — extends `TAO_LUNAR_CALENDAR_ALGORITHM_v1`
**Parent docs:**
- `UZGPLUS_VANNIEN_CALENDAR_SPEC_v1.md` (Tier 2 — UI/feature scope)
- `TAO_LUNAR_CALENDAR_ALGORITHM_v1.md` (Tier 3 — base lunar engine)
- `TAO_ZIWEI_FORMULA_REFERENCE_v1.md` (Tier 3 — Can-Chi tables)
**Reference sources:**
- *Ngọc Hạp Thông Thư* (玉匣記) — canonical Vietnamese vạn niên reference
- Lịch Vạn Niên Hồ Ngọc Đức online tool
- *Vạn Bảo Đại Toàn* — traditional Á Đông almanac
- Helmer Aslaksen, *Mathematics of the Chinese Calendar*
**Issued by:** CLA-2 (Lane_02)
**Status:** ⏳ DRAFT — pending NTS canon rewrite (per Tier 2 §0.1)

---

## **§0 — PURPOSE**

Doc Tier 2 (`UZGPLUS_VANNIEN_CALENDAR_SPEC_v1`) định nghĩa **WHAT** — UI surfaces, scope, REDLINE.
Doc này định nghĩa **HOW** — algorithms, lookup tables, API contracts để CLAC-2 implement engine.

Scope cụ thể:
1. API contract cho `getDayInfo(date, user?)` — main entry point
2. Lookup tables cho 12 Trực, 28 sao Nhị Thập Bát Tú, Hoàng/Hắc Đạo, sao tốt/xấu
3. Hour-level Hoàng Đạo (giờ Hoàng Đạo per ngày)
4. Activity-day suitability matrix (cưới hỏi, khai trương, v.v.)
5. ENTA energy matching algorithm
6. Find-good-days ranking algorithm

---

## **§1 — MAIN API CONTRACT**

### **§1.1 — `getDayInfo(date, user_context?)`**

**Input:**
```typescript
type GetDayInfoInput = {
  date: string;              // ISO 8601 date "2026-04-29"
  timezone?: string;          // IANA, default "Asia/Ho_Chi_Minh"
  calendar_system?: 'vn' | 'cn';   // default 'vn'
  user_context?: {
    user_id: string;
    enta_element?: 'Mộc' | 'Hỏa' | 'Thổ' | 'Kim' | 'Thủy';
    enta_polarity?: 'Dương' | 'Âm';
    birth_year_can_chi?: [string, string];  // fallback if no enta
  };
};
```

**Output:**
```typescript
type DayInfo = {
  // Section 1: Calendar layers (from TAO_LUNAR_CALENDAR_ALGORITHM_v1)
  solar: {
    date: string;             // "2026-04-29"
    weekday: string;           // "Thứ Tư"
    iso_week: number;
  };
  lunar: {
    year: number;              // 2026
    month: number;             // 3
    day: number;               // 12
    is_leap_month: boolean;
    year_can_chi: [string, string];   // ["Bính", "Ngọ"]
    month_can_chi: [string, string];  // ["Nhâm", "Thìn"]
    day_can_chi: [string, string];    // ["Mậu", "Tuất"]
  };
  calendar_system: 'vn' | 'cn';

  // Section 2: Traditional markers
  truc: TrucMarker;             // §3
  nhi_thap_bat_tu: NhiThapBatTu; // §4
  hoang_dao_status: 'hoang_dao' | 'hac_dao';   // §5
  hoang_dao_name: string;        // e.g., "Minh Đường Hoàng Đạo"

  // Section 3: Stars (sao tốt + sao xấu)
  sao_tot: Sao[];                // §6
  sao_xau: Sao[];                // §6

  // Section 4: Solar terms
  tiet_khi: {
    current: string;             // current tiết khí name
    days_into: number;           // days since current tiết khí started
    next: string;                // next tiết khí name
    days_until_next: number;
  };

  // Section 5: Hour-level Hoàng Đạo (12 giờ)
  hours: HourInfo[];             // §7

  // Section 6: Activity recommendations
  activities: {
    favorable: string[];         // e.g., ["sửa chữa", "đóng cửa"]
    cautious: string[];          // e.g., ["đầu tư mới"]
    avoid: string[];             // e.g., ["khai trương", "cưới hỏi"]
  };

  // Section 7: Personalization (only if user_context provided)
  enta_match?: {
    user_element: string;
    day_element: string;
    relation: 'tương sinh' | 'tương khắc' | 'đồng hành' | 'tỉ hòa';
    resonance_score: number;     // -2 to +2
    resonance_label: 'thấp' | 'trung bình' | 'cao' | 'rất cao';
    suggestion: string;
  };

  // Section 8: Holidays / observances
  holidays: Holiday[];           // §11

  // Section 9: Audit
  metadata: {
    algorithm_version: string;   // "TAO_VANNIEN_v1.0"
    computed_at: string;
    qot_trace_id: string;
  };
};
```

### **§1.2 — Other API endpoints**

```typescript
// Get range of days (for Calendar View)
getDayRange(from: string, to: string, user?): DayInfo[]

// Convert solar ↔ lunar
convertSolarToLunar(date: string, calendar?): LunarDate
convertLunarToSolar(year, month, day, isLeap?, calendar?): SolarDate

// Find good days for activity (Activity Picker)
findGoodDays(input: FindGoodDaysInput): RankedDay[]    // §10

// Get hour detail for a specific day
getHourInfo(date: string, hour: 'Tý'|'Sửu'|...): HourInfo  // §7
```

---

## **§2 — DAY ELEMENT (NẠP ÂM)**

Mỗi cặp Can-Chi ngày có 1 element (Ngũ Hành nạp âm) — đây là input chính cho mọi tính toán phía dưới.

### **§2.1 — Lookup table (Lục Thập Hoa Giáp nạp âm)**

| # | Can-Chi ngày | Nạp âm | Element |
|---|---|---|---|
| 1 | Giáp Tý | Hải Trung Kim | Kim |
| 2 | Ất Sửu | Hải Trung Kim | Kim |
| 3 | Bính Dần | Lư Trung Hỏa | Hỏa |
| 4 | Đinh Mão | Lư Trung Hỏa | Hỏa |
| 5 | Mậu Thìn | Đại Lâm Mộc | Mộc |
| 6 | Kỷ Tỵ | Đại Lâm Mộc | Mộc |
| 7 | Canh Ngọ | Lộ Bàng Thổ | Thổ |
| 8 | Tân Mùi | Lộ Bàng Thổ | Thổ |
| 9 | Nhâm Thân | Kiếm Phong Kim | Kim |
| 10 | Quý Dậu | Kiếm Phong Kim | Kim |
| 11 | Giáp Tuất | Sơn Đầu Hỏa | Hỏa |
| 12 | Ất Hợi | Sơn Đầu Hỏa | Hỏa |
| 13 | Bính Tý | Giản Hạ Thủy | Thủy |
| 14 | Đinh Sửu | Giản Hạ Thủy | Thủy |
| 15 | Mậu Dần | Thành Đầu Thổ | Thổ |
| 16 | Kỷ Mão | Thành Đầu Thổ | Thổ |
| 17 | Canh Thìn | Bạch Lạp Kim | Kim |
| 18 | Tân Tỵ | Bạch Lạp Kim | Kim |
| 19 | Nhâm Ngọ | Dương Liễu Mộc | Mộc |
| 20 | Quý Mùi | Dương Liễu Mộc | Mộc |
| 21 | Giáp Thân | Tuyền Trung Thủy | Thủy |
| 22 | Ất Dậu | Tuyền Trung Thủy | Thủy |
| 23 | Bính Tuất | Ốc Thượng Thổ | Thổ |
| 24 | Đinh Hợi | Ốc Thượng Thổ | Thổ |
| 25 | Mậu Tý | Tích Lịch Hỏa | Hỏa |
| 26 | Kỷ Sửu | Tích Lịch Hỏa | Hỏa |
| 27 | Canh Dần | Tùng Bách Mộc | Mộc |
| 28 | Tân Mão | Tùng Bách Mộc | Mộc |
| 29 | Nhâm Thìn | Trường Lưu Thủy | Thủy |
| 30 | Quý Tỵ | Trường Lưu Thủy | Thủy |
| 31 | Giáp Ngọ | Sa Trung Kim | Kim |
| 32 | Ất Mùi | Sa Trung Kim | Kim |
| 33 | Bính Thân | Sơn Hạ Hỏa | Hỏa |
| 34 | Đinh Dậu | Sơn Hạ Hỏa | Hỏa |
| 35 | Mậu Tuất | Bình Địa Mộc | Mộc |
| 36 | Kỷ Hợi | Bình Địa Mộc | Mộc |
| 37 | Canh Tý | Bích Thượng Thổ | Thổ |
| 38 | Tân Sửu | Bích Thượng Thổ | Thổ |
| 39 | Nhâm Dần | Kim Bạc Kim | Kim |
| 40 | Quý Mão | Kim Bạc Kim | Kim |
| 41 | Giáp Thìn | Phú Đăng Hỏa | Hỏa |
| 42 | Ất Tỵ | Phú Đăng Hỏa | Hỏa |
| 43 | Bính Ngọ | Thiên Hà Thủy | Thủy |
| 44 | Đinh Mùi | Thiên Hà Thủy | Thủy |
| 45 | Mậu Thân | Đại Trạch Thổ | Thổ |
| 46 | Kỷ Dậu | Đại Trạch Thổ | Thổ |
| 47 | Canh Tuất | Thoa Xuyến Kim | Kim |
| 48 | Tân Hợi | Thoa Xuyến Kim | Kim |
| 49 | Nhâm Tý | Tang Đố Mộc | Mộc |
| 50 | Quý Sửu | Tang Đố Mộc | Mộc |
| 51 | Giáp Dần | Đại Khê Thủy | Thủy |
| 52 | Ất Mão | Đại Khê Thủy | Thủy |
| 53 | Bính Thìn | Sa Trung Thổ | Thổ |
| 54 | Đinh Tỵ | Sa Trung Thổ | Thổ |
| 55 | Mậu Ngọ | Thiên Thượng Hỏa | Hỏa |
| 56 | Kỷ Mùi | Thiên Thượng Hỏa | Hỏa |
| 57 | Canh Thân | Thạch Lựu Mộc | Mộc |
| 58 | Tân Dậu | Thạch Lựu Mộc | Mộc |
| 59 | Nhâm Tuất | Đại Hải Thủy | Thủy |
| 60 | Quý Hợi | Đại Hải Thủy | Thủy |

**Implementation:** load as `tables/nap-am-60.json`. Lookup by `(can, chi)` tuple.

---

## **§3 — TRỰC (12 cycle)**

### **§3.1 — 12 Trực definitions**

12 Trực cycles in fixed order. Each Trực has temperament + suitable activities.

| # | Trực | Hán | Nghĩa cốt lõi | Phù hợp | Tránh |
|---|---|---|---|---|---|
| 1 | Kiến | 建 | Khởi đầu, gốc | Khởi sự, lễ tế, kết hôn | Phá dỡ, đào đất |
| 2 | Trừ | 除 | Loại bỏ, dọn dẹp | Trị bệnh, dọn nhà, gột rửa | Đầu tư, ký kết lớn |
| 3 | Mãn | 滿 | Đầy đủ | Cầu phúc, lễ tế, mở tiệc | Vay mượn, dâng văn |
| 4 | Bình | 平 | Bằng phẳng, ổn định | San lấp đất, sửa đường, hợp tác | Khởi sự lớn, đầu tư |
| 5 | Định | 定 | Vững chãi, kiên định | Xây nhà, an táng, cưới hỏi, cất nóc | Thưa kiện, di chuyển |
| 6 | Chấp | 執 | Nắm giữ, kiên trì | Cưới hỏi, nhận chức, chôn cất | Xuất hành, di chuyển |
| 7 | Phá | 破 | Phá vỡ, kết thúc | Phá dỡ, kết thúc vụ kiện | Cưới hỏi, khai trương, an táng |
| 8 | Nguy | 危 | Nguy hiểm, đề cao cảnh giác | Tu hành, gặp gỡ trang trọng | Du lịch xa, mạo hiểm |
| 9 | Thành | 成 | Hoàn thành, viên mãn | Khai trương, cưới hỏi, nhập trạch | Thưa kiện, chia ly |
| 10 | Thâu | 收 | Thu hoạch, gom góp | Thu nợ, ký hợp đồng, tích trữ | An táng, khởi sự mới |
| 11 | Khai | 開 | Mở, khởi mở | Khai trương, xuất hành, học hành, cưới hỏi | An táng, phá dỡ |
| 12 | Bế | 閉 | Đóng, kết thúc | Sửa chữa, đắp đập, đóng cửa | Khai trương, cưới hỏi, du lịch |

### **§3.2 — Trực determination algorithm**

Trực cycles every 12 days, but **resets at each tiết khí change** (specifically at 12 "tiết" — odd-numbered solar terms among the 24 tiết khí).

**Rule:**
- At each tiết khí transition (e.g., Lập Xuân, Lập Hạ, etc.), the Trực restarts.
- The starting Trực of each tháng (lunar month) is determined by the tháng's địa chi:

| Lunar month branch | Starting Trực |
|---|---|
| Dần (tháng 1) | Kiến tại ngày Dần |
| Mão (tháng 2) | Kiến tại ngày Mão |
| Thìn (tháng 3) | Kiến tại ngày Thìn |
| Tỵ (tháng 4) | Kiến tại ngày Tỵ |
| Ngọ (tháng 5) | Kiến tại ngày Ngọ |
| Mùi (tháng 6) | Kiến tại ngày Mùi |
| Thân (tháng 7) | Kiến tại ngày Thân |
| Dậu (tháng 8) | Kiến tại ngày Dậu |
| Tuất (tháng 9) | Kiến tại ngày Tuất |
| Hợi (tháng 10) | Kiến tại ngày Hợi |
| Tý (tháng 11) | Kiến tại ngày Tý |
| Sửu (tháng 12) | Kiến tại ngày Sửu |

```pseudocode
function getTruc(day_chi, month_chi):
  # Find starting position: ngày X has Trực Kiến where X chi == month chi
  # Then count from there
  start_chi_idx = chi_to_index(month_chi)    # Dần=0, Mão=1, ..., Sửu=11
  current_chi_idx = chi_to_index(day_chi)
  truc_idx = (current_chi_idx - start_chi_idx + 12) % 12
  return TRUC_NAMES[truc_idx]
```

**Edge case:** "Trùng" — when crossing tiết khí, two consecutive days may have the same Trực (Trùng Trực). This is documented in canonical almanacs.

---

## **§4 — NHỊ THẬP BÁT TÚ (28 STARS)**

### **§4.1 — 28 stars in 4 quadrants**

| # | Quadrant | Sao | Hán | Element | Animal | Goodness |
|---|---|---|---|---|---|---|
| 1 | Đông | Giác Mộc Giảo | 角木蛟 | Mộc | Rồng | Cát |
| 2 | Đông | Cang Kim Long | 亢金龍 | Kim | Rồng | Hung |
| 3 | Đông | Đê Thổ Lạc | 氐土貉 | Thổ | Lửng | Hung |
| 4 | Đông | Phòng Nhật Thố | 房日兔 | Hỏa | Thỏ | Cát |
| 5 | Đông | Tâm Nguyệt Hồ | 心月狐 | Thủy | Cáo | Hung |
| 6 | Đông | Vĩ Hỏa Hổ | 尾火虎 | Hỏa | Hổ | Cát |
| 7 | Đông | Cơ Thủy Báo | 箕水豹 | Thủy | Báo | Cát |
| 8 | Bắc | Đẩu Mộc Giải | 斗木獬 | Mộc | Giải | Cát |
| 9 | Bắc | Ngưu Kim Ngưu | 牛金牛 | Kim | Trâu | Hung |
| 10 | Bắc | Nữ Thổ Bức | 女土蝠 | Thổ | Dơi | Hung |
| 11 | Bắc | Hư Nhật Thử | 虛日鼠 | Hỏa | Chuột | Hung |
| 12 | Bắc | Nguy Nguyệt Yến | 危月燕 | Thủy | Yến | Hung |
| 13 | Bắc | Thất Hỏa Trư | 室火豬 | Hỏa | Heo | Cát |
| 14 | Bắc | Bích Thủy Du | 壁水貐 | Thủy | Du | Cát |
| 15 | Tây | Khuê Mộc Lang | 奎木狼 | Mộc | Sói | Hung |
| 16 | Tây | Lâu Kim Cẩu | 婁金狗 | Kim | Chó | Cát |
| 17 | Tây | Vị Thổ Trĩ | 胃土雉 | Thổ | Trĩ | Cát |
| 18 | Tây | Mão Nhật Kê | 昴日雞 | Hỏa | Gà | Hung |
| 19 | Tây | Tất Nguyệt Ô | 畢月烏 | Thủy | Quạ | Cát |
| 20 | Tây | Chủy Hỏa Hầu | 觜火猴 | Hỏa | Khỉ | Hung |
| 21 | Tây | Sâm Thủy Viên | 參水猿 | Thủy | Vượn | Cát |
| 22 | Nam | Tỉnh Mộc Ngạn | 井木犴 | Mộc | Ngạn | Cát |
| 23 | Nam | Quỷ Kim Dương | 鬼金羊 | Kim | Dê | Hung |
| 24 | Nam | Liễu Thổ Chương | 柳土獐 | Thổ | Hươu | Hung |
| 25 | Nam | Tinh Nhật Mã | 星日馬 | Hỏa | Ngựa | Hung |
| 26 | Nam | Trương Nguyệt Lộc | 張月鹿 | Thủy | Nai | Cát |
| 27 | Nam | Dực Hỏa Xà | 翼火蛇 | Hỏa | Rắn | Hung |
| 28 | Nam | Chẩn Thủy Dẫn | 軫水蚓 | Thủy | Giun | Cát |

### **§4.2 — Algorithm**

Sao Nhị Thập Bát Tú cycles every 28 days. The cycle is anchored to a known reference date.

**Anchor:** 1900-01-01 (JDN 2415021) = Hư Nhật Thử (sao #11).

```pseudocode
function getNhiThapBatTu(jdn):
  # Anchor: jdn 2415021 → star index 11 (Hư Nhật Thử)
  ANCHOR_JDN = 2415021
  ANCHOR_INDEX = 10    # 0-based: Hư Nhật Thử is index 10
  diff = jdn - ANCHOR_JDN
  star_idx = (diff + ANCHOR_INDEX) % 28
  return STARS_28[star_idx]
```

> **CLAC-2 audit note:** Anchor must be cross-verified against 5+ known dates from authoritative Vạn Niên reference (e.g., Lịch Vạn Niên Nhà Xuất Bản Văn Hóa). If anchor offset differs, update via amendment.

---

## **§5 — HOÀNG ĐẠO / HẮC ĐẠO (12-DAY CYCLE)**

### **§5.1 — 12 Hoàng Đạo / Hắc Đạo names**

6 ngày Hoàng Đạo (auspicious) + 6 ngày Hắc Đạo (caution), cycling every 12 days within each tháng.

**6 Hoàng Đạo (cát):**
1. Thanh Long Hoàng Đạo (青龍黃道)
2. Minh Đường Hoàng Đạo (明堂黃道)
3. Kim Quỹ Hoàng Đạo (金匱黃道)
4. Thiên Đức Hoàng Đạo (天德黃道)
5. Ngọc Đường Hoàng Đạo (玉堂黃道)
6. Tư Mệnh Hoàng Đạo (司命黃道)

**6 Hắc Đạo (hung):**
1. Thiên Hình Hắc Đạo (天刑黑道)
2. Chu Tước Hắc Đạo (朱雀黑道)
3. Bạch Hổ Hắc Đạo (白虎黑道)
4. Thiên Lao Hắc Đạo (天牢黑道)
5. Huyền Vũ Hắc Đạo (玄武黑道)
6. Câu Trận Hắc Đạo (勾陳黑道)

### **§5.2 — Lookup table by month branch + day branch**

Hoàng Đạo / Hắc Đạo của ngày phụ thuộc vào: **(month branch, day branch)**.

**Anchor table — Thanh Long Hoàng Đạo position by month branch:**

| Tháng (chi) | Thanh Long tại ngày |
|---|---|
| Dần / Thân | Tý |
| Mão / Dậu | Dần |
| Thìn / Tuất | Thìn |
| Tỵ / Hợi | Ngọ |
| Ngọ / Tý | Thân |
| Mùi / Sửu | Tuất |

From Thanh Long position, count clockwise for 12 days in this fixed order:

```
1. Thanh Long  (Hoàng Đạo)
2. Minh Đường  (Hoàng Đạo)
3. Thiên Hình  (Hắc Đạo)
4. Chu Tước    (Hắc Đạo)
5. Kim Quỹ     (Hoàng Đạo)
6. Thiên Đức   (Hoàng Đạo)    [a.k.a. Bảo Quang in some sources]
7. Bạch Hổ     (Hắc Đạo)
8. Ngọc Đường  (Hoàng Đạo)
9. Thiên Lao   (Hắc Đạo)
10. Huyền Vũ   (Hắc Đạo)
11. Tư Mệnh    (Hoàng Đạo)
12. Câu Trận   (Hắc Đạo)
```

```pseudocode
function getHoangDao(month_chi, day_chi):
  thanh_long_chi = ANCHOR_TABLE[month_chi]
  thanh_long_idx = chi_to_index(thanh_long_chi)
  day_idx = chi_to_index(day_chi)
  position = (day_idx - thanh_long_idx + 12) % 12
  name, status = HD_HD_CYCLE[position]
  return { name, status }    # status: 'hoang_dao' | 'hac_dao'
```

---

## **§6 — SAO TỐT / SAO XẤU (Auspicious & Inauspicious Stars)**

### **§6.1 — Major good stars (sao tốt)**

| Sao | Activated when | Effect | Strength |
|---|---|---|---|
| Thiên Đức | Day Can-Chi matches month-specific Can-Chi | Trừ tà, mọi việc thuận | Cao |
| Nguyệt Đức | Specific day-can per month | Cát lành, cầu được | Cao |
| Thiên Đức Hợp | Pair of Thiên Đức | Tăng cát lực | Trung bình |
| Nguyệt Đức Hợp | Pair of Nguyệt Đức | Tăng cát lực | Trung bình |
| Thiên Hỷ | Cố định theo tháng âm | Vui mừng, cưới hỏi | Cao |
| Mẫu Thương | Cố định theo tháng | Tài lộc, kho vựa | Trung bình |
| Đại Hồng Sa | Định theo can-chi ngày | Mọi việc cát | Cao |
| Tam Hợp | 3 chi tam hợp | Hội tụ, hợp tác | Cao |
| Lục Hợp | 2 chi lục hợp | Hòa hợp | Trung bình |
| Sinh Khí | Theo can-chi | Sinh sôi, phát triển | Cao |
| Thiên Y | Theo tháng | Trị bệnh, an khang | Trung bình |

### **§6.2 — Major bad stars (sao xấu)**

| Sao | Activated when | Effect | Strength |
|---|---|---|---|
| Tam Nương | Ngày 3, 7, 13, 18, 22, 27 âm lịch | Tránh cưới hỏi, khai trương | Cao |
| Sát Chủ | Định theo tháng âm | Tránh động thổ, xây nhà | Cao |
| Thọ Tử | Định theo tháng âm | Tránh việc cát, hỷ sự | Cao |
| Nguyệt Kỵ | Ngày 5, 14, 23 âm lịch | Tránh khởi sự, đi xa | Trung bình |
| Trùng Tang | Ngày Dần, Thân, Tỵ, Hợi rơi vào năm Trùng Tang | Tránh an táng | Cao |
| Trùng Phục | Định theo tháng | Tránh an táng | Trung bình |
| Cô Thần | Theo năm sinh và ngày | Cô đơn, không hợp cưới | Trung bình |
| Quả Tú | Theo năm sinh và ngày | Tương tự Cô Thần | Trung bình |
| Không Vong | Theo Tuần | Mất, tan, hư | Cao |
| Câu Trận | Hắc Đạo position | Trở ngại, kiện tụng | Trung bình |
| Lục Bất Thành | Định theo tháng | 6 việc không thành | Trung bình |

### **§6.3 — Lookup tables**

**Thiên Đức by month (Can-Chi or just Can match):**

| Tháng âm | Thiên Đức tại Can/Chi |
|---|---|
| 1 (Dần) | Đinh |
| 2 (Mão) | Khôn (Thân Mùi) |
| 3 (Thìn) | Nhâm |
| 4 (Tỵ) | Tân |
| 5 (Ngọ) | Càn (Tuất Hợi) |
| 6 (Mùi) | Giáp |
| 7 (Thân) | Quý |
| 8 (Dậu) | Cấn (Sửu Dần) |
| 9 (Tuất) | Bính |
| 10 (Hợi) | Ất |
| 11 (Tý) | Tốn (Thìn Tỵ) |
| 12 (Sửu) | Canh |

**Nguyệt Đức by month:**

| Tháng âm | Nguyệt Đức tại Can |
|---|---|
| 1, 5, 9 (Dần Ngọ Tuất) | Bính |
| 2, 6, 10 (Mão Mùi Hợi) | Giáp |
| 3, 7, 11 (Thìn Thân Tý) | Nhâm |
| 4, 8, 12 (Tỵ Dậu Sửu) | Canh |

**Thiên Hỷ by month:**

| Tháng âm | Thiên Hỷ tại Chi ngày |
|---|---|
| 1 | Tuất |
| 2 | Hợi |
| 3 | Tý |
| 4 | Sửu |
| 5 | Dần |
| 6 | Mão |
| 7 | Thìn |
| 8 | Tỵ |
| 9 | Ngọ |
| 10 | Mùi |
| 11 | Thân |
| 12 | Dậu |

**Tam Nương — fixed lunar days:** 3, 7, 13, 18, 22, 27 (every month).

**Nguyệt Kỵ — fixed lunar days:** 5, 14, 23 (every month).

**Sát Chủ by month:**

| Tháng âm | Sát Chủ tại Chi ngày |
|---|---|
| 1 | Tỵ |
| 2 | Tý |
| 3 | Mùi |
| 4 | Mão |
| 5 | Thân |
| 6 | Tuất |
| 7 | Hợi |
| 8 | Sửu |
| 9 | Ngọ |
| 10 | Dậu |
| 11 | Dần |
| 12 | Thìn |

**Thọ Tử by month:**

| Tháng âm | Thọ Tử tại Chi ngày |
|---|---|
| 1 | Tuất |
| 2 | Thìn |
| 3 | Hợi |
| 4 | Tỵ |
| 5 | Tý |
| 6 | Ngọ |
| 7 | Sửu |
| 8 | Mùi |
| 9 | Dần |
| 10 | Thân |
| 11 | Mão |
| 12 | Dậu |

> **Note:** Một số bảng trong §6 có thể vary giữa các source (Ngọc Hạp Thông Thư vs Vạn Bảo Đại Toàn). CLAC-2 phải lock với 1 source canonical (đề xuất: theo Lịch Vạn Niên Hồ Ngọc Đức / Lịch Việt 2026 NXB Văn Hóa) và document trong implementation. Mismatch → amendment.

---

## **§7 — GIỜ HOÀNG ĐẠO (HOUR-LEVEL)**

### **§7.1 — Algorithm**

Mỗi ngày có 6 giờ Hoàng Đạo + 6 giờ Hắc Đạo (12 giờ cycle).

**Lookup table by day branch:**

| Day chi | Giờ Hoàng Đạo | Giờ Hắc Đạo |
|---|---|---|
| Tý | Tý, Sửu, Mão, Ngọ, Thân, Dậu | Dần, Thìn, Tỵ, Mùi, Tuất, Hợi |
| Sửu | Dần, Mão, Tỵ, Thân, Tuất, Hợi | Tý, Sửu, Thìn, Ngọ, Mùi, Dậu |
| Dần | Tý, Sửu, Thìn, Tỵ, Mùi, Tuất | Dần, Mão, Ngọ, Thân, Dậu, Hợi |
| Mão | Tý, Dần, Mão, Ngọ, Mùi, Dậu | Sửu, Thìn, Tỵ, Thân, Tuất, Hợi |
| Thìn | Dần, Thìn, Tỵ, Thân, Dậu, Hợi | Tý, Sửu, Mão, Ngọ, Mùi, Tuất |
| Tỵ | Sửu, Thìn, Ngọ, Mùi, Tuất, Hợi | Tý, Dần, Mão, Tỵ, Thân, Dậu |
| Ngọ | Tý, Sửu, Mão, Ngọ, Thân, Dậu | Dần, Thìn, Tỵ, Mùi, Tuất, Hợi |
| Mùi | Dần, Mão, Tỵ, Thân, Tuất, Hợi | Tý, Sửu, Thìn, Ngọ, Mùi, Dậu |
| Thân | Tý, Sửu, Thìn, Tỵ, Mùi, Tuất | Dần, Mão, Ngọ, Thân, Dậu, Hợi |
| Dậu | Tý, Dần, Mão, Ngọ, Mùi, Dậu | Sửu, Thìn, Tỵ, Thân, Tuất, Hợi |
| Tuất | Dần, Thìn, Tỵ, Thân, Dậu, Hợi | Tý, Sửu, Mão, Ngọ, Mùi, Tuất |
| Hợi | Sửu, Thìn, Ngọ, Mùi, Tuất, Hợi | Tý, Dần, Mão, Tỵ, Thân, Dậu |

> **Pattern note:** Lookup table này lặp lại theo pair {Tý/Ngọ, Sửu/Mùi, Dần/Thân, Mão/Dậu, Thìn/Tuất, Tỵ/Hợi} — implement as 6-row table indexed by `chi_idx % 6` saves 50% storage.

### **§7.2 — Hour info object**

```typescript
type HourInfo = {
  chi: string;              // "Tý"
  real_hour_range: string;  // "23:00-01:00"
  status: 'hoang_dao' | 'hac_dao';
  hour_can: string;         // computed from day-can per FORMULA_REF §2.4
  good_for: string[];       // activities suitable in this hour
  cautious_for: string[];   // activities to be cautious
};
```

---

## **§8 — TIẾT KHÍ (24 SOLAR TERMS)**

### **§8.1 — 24 tiết khí list**

| # | Name | Hán | Sun longitude | ~ Date | Loại |
|---|---|---|---|---|---|
| 1 | Lập Xuân | 立春 | 315° | 4 Feb | Tiết |
| 2 | Vũ Thủy | 雨水 | 330° | 19 Feb | Trung khí |
| 3 | Kinh Trập | 驚蟄 | 345° | 6 Mar | Tiết |
| 4 | Xuân Phân | 春分 | 0° | 21 Mar | Trung khí |
| 5 | Thanh Minh | 清明 | 15° | 5 Apr | Tiết |
| 6 | Cốc Vũ | 穀雨 | 30° | 20 Apr | Trung khí |
| 7 | Lập Hạ | 立夏 | 45° | 6 May | Tiết |
| 8 | Tiểu Mãn | 小滿 | 60° | 21 May | Trung khí |
| 9 | Mang Chủng | 芒種 | 75° | 6 Jun | Tiết |
| 10 | Hạ Chí | 夏至 | 90° | 22 Jun | Trung khí |
| 11 | Tiểu Thử | 小暑 | 105° | 7 Jul | Tiết |
| 12 | Đại Thử | 大暑 | 120° | 23 Jul | Trung khí |
| 13 | Lập Thu | 立秋 | 135° | 8 Aug | Tiết |
| 14 | Xử Thử | 處暑 | 150° | 23 Aug | Trung khí |
| 15 | Bạch Lộ | 白露 | 165° | 8 Sep | Tiết |
| 16 | Thu Phân | 秋分 | 180° | 23 Sep | Trung khí |
| 17 | Hàn Lộ | 寒露 | 195° | 8 Oct | Tiết |
| 18 | Sương Giáng | 霜降 | 210° | 23 Oct | Trung khí |
| 19 | Lập Đông | 立冬 | 225° | 7 Nov | Tiết |
| 20 | Tiểu Tuyết | 小雪 | 240° | 22 Nov | Trung khí |
| 21 | Đại Tuyết | 大雪 | 255° | 7 Dec | Tiết |
| 22 | Đông Chí | 冬至 | 270° | 22 Dec | Trung khí |
| 23 | Tiểu Hàn | 小寒 | 285° | 6 Jan | Tiết |
| 24 | Đại Hàn | 大寒 | 300° | 20 Jan | Trung khí |

### **§8.2 — Algorithm**

Reuse `getSunLongitude()` from `TAO_LUNAR_CALENDAR_ALGORITHM_v1` §6.2.

```pseudocode
function getCurrentTietKhi(jdn, timeZone):
  sun_long = getSunLongitude(jdn, timeZone)
  # Find the largest tiết khí longitude <= sun_long
  current_idx = floor(((sun_long - 315 + 360) % 360) / 15)
  return TIET_KHI_24[current_idx]

function getDaysIntoTietKhi(jdn, timeZone):
  current = getCurrentTietKhi(jdn, timeZone)
  start_jdn = findTietKhiStart(jdn, current.longitude, timeZone)
  return jdn - start_jdn
```

---

## **§9 — ACTIVITY-DAY SUITABILITY MATRIX**

### **§9.1 — Activity catalog**

Per Tier 2 §3.3, 6 categories × multiple activities each. Total ~25 activity types.

### **§9.2 — Suitability scoring**

For each (activity, day) pair, compute a suitability score in range [-3, +3]:

```
score = 0
+ if Trực of day ∈ favorable_truc[activity]: score += 2
+ if Trực of day ∈ neutral_truc[activity]: score += 0
+ if Trực of day ∈ avoid_truc[activity]: score -= 2
+ if Hoàng Đạo: score += 1
+ if Hắc Đạo: score -= 1
+ for each sao_tot present: score += sao.weight (1 or 2)
+ for each sao_xau present: score -= sao.weight (1 or 2)
+ if day is Tam Nương AND activity ∈ {cưới hỏi, khai trương}: score -= 3 (hard penalty)
+ if Sát Chủ AND activity ∈ {động thổ, xây nhà}: score -= 3
+ if Thọ Tử AND activity ∈ {hỷ sự, cưới hỏi}: score -= 3

Clamp score to [-3, +3]
```

### **§9.3 — Activity ↔ Trực matrix (excerpt)**

| Activity | Favorable Trực | Avoid Trực |
|---|---|---|
| Đám cưới | Định, Thành, Khai, Mãn | Phá, Bế, Bình |
| Khai trương | Khai, Thành, Mãn | Bế, Phá, Trừ |
| Động thổ | Định, Thành, Bình | Phá, Bế |
| Nhập trạch | Thành, Khai, Mãn, Thâu | Phá, Bế |
| Xuất hành | Khai, Thành | Bế, Phá, Nguy |
| An táng | Định, Chấp | Khai, Phá, Mãn |
| Sửa chữa | Bình, Định, Bế | Khai, Mãn |
| Cắt tóc | Trừ | Phá |
| Mua xe | Thành, Khai | Phá, Bế |

(Full table ~25 rows in `tables/activity-truc-matrix.json`.)

### **§9.4 — Output format**

```typescript
type ActivityRating = {
  activity: string;
  score: number;               // -3 to +3
  label: 'rất tốt' | 'tốt' | 'phù hợp' | 'cân nhắc' | 'tránh' | 'rất tránh';
  reasoning: string[];          // ["Trực Khai phù hợp", "Hoàng Đạo Minh Đường", "không có sao xấu hoạt động này"]
};
```

---

## **§10 — FIND GOOD DAYS RANKING**

### **§10.1 — `findGoodDays()` API**

```typescript
type FindGoodDaysInput = {
  activity: string;             // e.g., "khai trương"
  date_range: {
    from: string;
    to: string;                 // max 365 days range
  };
  user_context?: {
    enta_element?: string;
    birth_year_can_chi?: [string, string];
  };
  filters?: {
    weekday_only?: boolean;     // exclude weekends?
    weekend_only?: boolean;
    min_resonance?: number;     // 0..2 ENTA threshold
    avoid_holidays?: boolean;
  };
  limit?: number;               // default 10
};

type RankedDay = {
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;    // 5-star scale
  composite_score: number;       // sum of all factors
  highlights: string[];          // top 3 reasons
  enta_match?: EntaMatchInfo;
  hours_recommended: string[];   // top hour ranges
};
```

### **§10.2 — Composite scoring**

```
composite_score =
  activity_suitability_score (from §9.2, max +3)
  + enta_resonance_bonus (0 to +2)        // §11
  + hoang_dao_bonus (1 if Hoàng Đạo, 0 if Hắc Đạo, -0 default)
  + sao_tot_count * 0.5
  - sao_xau_count * 0.5
  - hard_penalties (Tam Nương, Sát Chủ when applicable, -3 each)

5-star mapping:
  ≥ 4.5: ⭐⭐⭐⭐⭐ "rất tốt"
  3.0-4.4: ⭐⭐⭐⭐ "tốt"
  1.5-2.9: ⭐⭐⭐ "phù hợp"
  0.0-1.4: ⭐⭐ "cân nhắc"
  < 0:    ⭐ "tránh" (excluded from results unless user opts to see)
```

### **§10.3 — Implementation hint**

For 90-day range:
1. Get 90 DayInfo objects (cache hit for most)
2. Score each day for the activity
3. Apply ENTA matching if user provided
4. Sort descending by composite_score
5. Return top N

Performance budget: < 1.5s p95.

---

## **§11 — ENTA ENERGY MATCHING**

### **§11.1 — Resolve user element (fallback chain)**

```pseudocode
function getUserElement(user_context):
  # Priority 1: ENTA module field
  if user_context.enta_element:
    return user_context.enta_element

  # Priority 2: derive from birth year nạp âm
  if user_context.birth_year_can_chi:
    can, chi = user_context.birth_year_can_chi
    return lookupNapAm(can, chi).element

  # Priority 3: no element available
  return null    # skip ENTA matching
```

> **Open contract for ENTA team:** Fields `user.enta.element` and `user.enta.polarity` need to be confirmed exact field names. CLAC-2 must coordinate with ENTA module spec before implementation.

### **§11.2 — Ngũ Hành relationship matrix**

| User \ Day | Mộc | Hỏa | Thổ | Kim | Thủy |
|---|---|---|---|---|---|
| **Mộc** | Tỉ hòa (+1) | Sinh xuất (-1) | Khắc xuất (-1) | Khắc nhập (-2) | Sinh nhập (+2) |
| **Hỏa** | Sinh nhập (+2) | Tỉ hòa (+1) | Sinh xuất (-1) | Khắc xuất (-1) | Khắc nhập (-2) |
| **Thổ** | Khắc nhập (-2) | Sinh nhập (+2) | Tỉ hòa (+1) | Sinh xuất (-1) | Khắc xuất (-1) |
| **Kim** | Khắc xuất (-1) | Khắc nhập (-2) | Sinh nhập (+2) | Tỉ hòa (+1) | Sinh xuất (-1) |
| **Thủy** | Sinh xuất (-1) | Khắc xuất (-1) | Khắc nhập (-2) | Sinh nhập (+2) | Tỉ hòa (+1) |

**Interpretation:**
- **Sinh nhập (+2):** Day element nourishes user element → very high resonance, "rất cao"
- **Tỉ hòa (+1):** Same element → harmony, "cao"
- **Sinh xuất (-1):** User element gives to day element → mild fatigue, "trung bình"
- **Khắc xuất (-1):** User element controls day element → mild dominance, "trung bình"
- **Khắc nhập (-2):** Day element controls user element → opposing energy, "thấp"

### **§11.3 — Suggestion text templates**

Per resonance level, generate Vietnamese suggestion:

| Resonance | Label | Suggestion template |
|---|---|---|
| +2 | Rất cao | "Ngày này nuôi dưỡng năng lượng {element} của bạn — phù hợp khởi sự, đầu tư, mở rộng." |
| +1 | Cao | "Ngày này cộng hưởng với {element} của bạn — thuận lợi cho mọi việc theo kế hoạch." |
| -1 | Trung bình | "Ngày năng lượng tương quan trung tính — phù hợp công việc bình thường, không nên đẩy mạnh." |
| -2 | Thấp | "Ngày năng lượng đối lập — phù hợp công việc nội tỉnh, kế hoạch dài hạn, tu chỉnh." |

### **§11.4 — Polarity bonus (optional, advanced)**

If user has polarity (Dương/Âm) AND day has implicit polarity (from year branch), add small bonus:
- Same polarity: +0.5
- Opposite polarity: -0.5
- (Most charts work with element only — polarity is fine-tuning)

---

## **§12 — HOLIDAYS & OBSERVANCES**

### **§12.1 — Vietnamese traditional holidays (lunar)**

| Holiday | Lunar date | English |
|---|---|---|
| Tết Nguyên Đán | 1/1 | Lunar New Year |
| Tết Thượng Nguyên | 15/1 | Lantern Festival |
| Hàn Thực | 3/3 | Cold Food Festival |
| Giỗ Tổ Hùng Vương | 10/3 | Hùng King Memorial |
| Tết Đoan Ngọ | 5/5 | Dragon Boat |
| Vu Lan | 15/7 | Ghost Festival / Filial Piety |
| Tết Trung Thu | 15/8 | Mid-Autumn |
| Tết Trùng Cửu | 9/9 | Double Ninth |
| Tết Hạ Nguyên | 15/10 | — |
| Tết Đông Chí | (around 22/12 solar) | Winter Solstice |
| Tết Ông Công | 23/12 | Kitchen God Send-off |

### **§12.2 — Vietnamese national holidays (solar)**

| Holiday | Solar date |
|---|---|
| Tết Dương Lịch | 1/1 |
| Ngày Giải Phóng | 30/4 |
| Quốc Tế Lao Động | 1/5 |
| Quốc Khánh | 2/9 |

### **§12.3 — Chinese / regional (when calendar_system = 'cn')**

Add: Qixi (7/7 lunar), Chongyang (9/9 lunar — same as VN), Chinese specific dates.

### **§12.4 — Output format**

```typescript
type Holiday = {
  name: string;
  type: 'traditional' | 'national' | 'religious' | 'observance';
  description?: string;
};
```

---

## **§13 — IMPLEMENTATION GUIDANCE**

### **§13.1 — Folder structure**

```
lib/tao/calendar/vannien/
├── nap-am.ts                    # §2 - day element lookup
├── truc.ts                      # §3 - 12 trực
├── nhi-thap-bat-tu.ts           # §4 - 28 stars
├── hoang-dao.ts                 # §5 - 12 hoàng/hắc đạo
├── sao-tot-xau.ts               # §6 - good/bad stars
├── tiet-khi.ts                  # §8 - 24 solar terms
├── giờ-hoang-dao.ts             # §7 - hour-level
├── activity-match.ts            # §9 - activity rating
├── find-good-days.ts            # §10 - ranking
├── enta-energy-match.ts         # §11 - ENTA matching
├── holidays.ts                  # §12
├── pipeline.ts                  # main getDayInfo()
└── tables/
    ├── nap-am-60.json
    ├── truc-12.json
    ├── stars-28.json
    ├── hoang-dao-anchor.json
    ├── thien-duc-by-month.json
    ├── nguyet-duc-by-month.json
    ├── thien-hy-by-month.json
    ├── sat-chu-by-month.json
    ├── tho-tu-by-month.json
    ├── tam-nuong-days.json
    ├── nguyet-ky-days.json
    ├── activity-truc-matrix.json
    ├── activity-categories.json
    ├── tiet-khi-24.json
    ├── gio-hoang-dao-by-day.json
    ├── ngu-hanh-relations.json
    ├── holidays-vn.json
    └── holidays-cn.json
```

### **§13.2 — Caching strategy**

- `getDayInfo` (without user) → deterministic per (date, calendar_system) → cache 30 days TTL
- `getDayInfo` (with user) → ENTA match changes per user, but day data shared → 2-layer cache
- `findGoodDays` → cache by (activity, range, user_id) → 1 hour TTL
- 12 trực, 28 stars, etc. tables → load once at startup

### **§13.3 — Test discipline**

Per `TAO_ZIWEI_BUILD_TASK_MAP_v1` discipline:

**Unit tests:**
- Each table lookup function: ≥ 5 known cases
- Trực, Hoàng Đạo, sao calculations: anchor-verified against canonical Vạn Niên reference

**Integration tests:**
- 100 random dates between 1900-2100: full DayInfo computed, validated against reference (Lịch Vạn Niên Hồ Ngọc Đức for VN mode, ytliu0.github.io for CN mode)
- ENTA matching: symmetric (Mộc-Thủy match = Thủy-Mộc match for sinh nhập/sinh xuất pair, signs flipped)
- Activity scoring: edge cases (Tam Nương + cưới = -3 hard penalty)

**Validation fixtures:**

| # | Date | Mode | Expected |
|---|---|---|---|
| V1 | 2026-04-29 | VN | Trực=Bế, Hoàng Đạo=Minh Đường, 28-star=Tỉnh Mộc Ngạn |
| V2 | 2026-02-17 (Tết) | VN | Holiday=Tết Nguyên Đán, Trực=Kiến |
| V3 | Tam Nương day in 2026 | VN | Sao xấu includes "Tam Nương" |
| V4 | User Mộc + day Thủy | — | enta_match.relation = "tương sinh", score = +2 |
| V5 | User Mộc + day Kim | — | enta_match.relation = "tương khắc", score = -2 |

---

## **§14 — CROSS-REFERENCE TO TIER 2**

This Tier 3 doc supplies the `getDayInfo()` API consumed by Tier 2 UI surfaces. Cross-checks:

| Tier 2 surface | Tier 3 API | Tier 3 fields needed |
|---|---|---|
| HOME widget (§2.1) | `getDayInfo(today, user)` | solar, lunar, truc, hoang_dao_status, enta_match (1 line) |
| Calendar View (§3.1) | `getDayRange(month_from, month_to, user)` | per day: solar, lunar, hoang_dao_status, enta_resonance hint |
| Daily Detail (§3.2) | `getDayInfo(date, user)` | full DayInfo |
| Activity Picker (§3.3) | `findGoodDays(activity, range, user)` | RankedDay[] |
| Converter (§3.4) | `convertSolarToLunar` / `convertLunarToSolar` | minimal |
| Year View (§3.5) | `getDayRange` for whole year | summary per month |
| Hour Detail (§3.7) | `getDayInfo` + `hours[]` field | full HourInfo[] |

---

## **§15 — VERSION CONTROL**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-29 | Initial — algorithms + lookup tables for full Vạn Niên feature |

**Amendment rule:**
1. Proposal as `TAO_VANNIEN_DATA_API_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. If anchors / lookup tables change → bump `formula_version`, full regression CI
4. Source-disagreement note: doc references Hồ Ngọc Đức + Ngọc Hạp Thông Thư + Vạn Bảo Đại Toàn. CLAC-2 must lock 1 source as primary at implementation, document in code, mismatch resolved via amendment.
5. Old version archived

---

## **§16 — REFERENCES**

1. *Ngọc Hạp Thông Thư* (玉匣記) — traditional Vietnamese vạn niên reference
2. Lịch Vạn Niên Hồ Ngọc Đức — https://www.informatik.uni-leipzig.de/~duc/amlich/
3. *Vạn Bảo Đại Toàn* (萬寶大全) — Á Đông almanac
4. Lịch Việt 2026 — Nhà xuất bản Văn Hóa
5. Helmer Aslaksen, *Mathematics of the Chinese Calendar*, NUS
6. Yuk Tung Liu, *Rules for the Chinese Calendar*

---

## **§17 — SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.0 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ pending canon rewrite | — |
| Effective | — | ⏳ pending | — |

**END — TAO_VANNIEN_DATA_API_v1**
