# **UZG+ LỊCH VẠN NIÊN SPEC v1.0**

## **Vạn Niên Calendar feature — UZG+ ecosystem (Tier 2)**

---

**Document ID:** UZGPLUS_VANNIEN_CALENDAR_SPEC_v1
**Version:** 1.0
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge)
**Authority Level:** Tier 2 — UZG+ feature spec (peer of `MASTER_UIUX_CANON`, `PLUS_HUB_MODULE_CANON`)
**Parent docs:**
- `MASTER_UIUX_CANON_OFFICIAL_v2_FINAL.md` (UZG+ master UI/UX)
- `PLUS_HUB_MODULE_CANON_OFFICIAL_v1.md` (entry via PLUS Hub)
- `IDENTITY_CANON.md` (ENTA spec)
**Companion:** `TAO_VANNIEN_DATA_API_v1.md` (Tier 3 — data engine)
**Issued by:** CLA-2 (Lane_02)
**Status:** ⏳ DRAFT — pending NTS canon rewrite (see §0.1)

---

## **§0 — DOCUMENT STATUS NOTE**

### **§0.1 — Pending canon rewrite**

NTS quyết định 2026-04-29 rằng Lịch Vạn Niên trên UZG+ phải có đầy đủ tính năng truyền thống Á Đông: Hoàng Đạo, Hắc Đạo, Trực, Nhị Thập Bát Tú, ngày cưới hỏi, ma chay, khai trương, xuất hành, ENTA-aware energy matching, cùng với HOME widget + push notification + booking/upsell integration.

Một số tính năng trong doc này hiện đang xung đột với canon đã khóa:
- `TAO_ZIWEI_UI_UX_CANON_v1` §1.1 (cấm push "Hôm nay là ngày tốt")
- `TAO_ZIWEI_UI_UX_CANON_v1` §2.4 (cấm widget "lucky/unlucky day")
- `TAO_ZIWEI_SYSTEM_LAW_v1` REDLINE 4 (cấm thao túng theo ngày)
- `TAO_ZIWEI_SYSTEM_LAW_v1` LAW 8 (cấm upsell theo engagement metric)

NTS đã thông báo sẽ **rewrite các canon trên** để tương thích với tầm nhìn vạn niên đầy đủ. Doc này được issued với expectation rằng canon rewrite sẽ ship trước hoặc cùng thời điểm Lịch Vạn Niên feature đi vào production.

**Effective rule:**
- Doc này → ACTIVE sau khi NTS ship canon rewrite.
- Trước thời điểm đó → DRAFT, không deploy.
- Nếu NTS không rewrite canon → doc này pending vô thời hạn, hoặc được archive nếu NTS đổi ý.

### **§0.2 — Append-only history (Core Law)**

Per UZG+ Core Law "History is append-only", không có canon nào bị xóa. Khi NTS rewrite, version cũ archive vào `_archive/` với clear reason. Doc này tham chiếu canon cũ tại §0.1 chỉ để audit trail.

---

## **§1 — PURPOSE & SCOPE**

### **§1.1 — What is Lịch Vạn Niên on UZG+**

Lịch Vạn Niên (萬年曆) là tính năng **utility + personalized advisory** giúp user UZG+:
1. **Tra cứu** ngày dương ↔ âm bất kỳ (1900-2200)
2. **Xem** thông tin truyền thống của một ngày: Can-Chi, Trực, Nhị Thập Bát Tú, Hoàng Đạo/Hắc Đạo, sao tốt/xấu, tiết khí, ngày lễ
3. **Chọn** ngày tốt cho hoạt động cụ thể (cưới hỏi, khai trương, xuất hành, an táng, động thổ, nhập trạch, ký hợp đồng, v.v.)
4. **Cá nhân hóa** theo ENTA energy của user (mỗi người có ngày tương sinh / tương khắc khác nhau)
5. **Nhập** ngày sinh — user có thể nhập theo dương lịch hoặc âm lịch khi đăng ký, đổi ngày sinh, hoặc tạo lá số

### **§1.2 — Why UZG+ needs this**

- **Cultural alignment:** Văn hóa Việt + Á Đông từ ngàn đời nay dùng lịch vạn niên cho mọi quyết định lớn. UZG+ không thể bỏ qua.
- **ENTA reinforcement:** Mỗi user UZG+ có ENTA element (Mộc/Hỏa/Thổ/Kim/Thủy). Ngày năng lượng phù hợp với ENTA của user là **personalized advisory** thật sự, không phải fortune-telling chung chung.
- **Service hook organic:** Khi user thấy "hôm nay phù hợp khai trương" + UZG+ có booking dịch vụ → user thực sự cần → conversion tự nhiên, không ép buộc.
- **Cross-module utility:** TAO module dùng cùng calendar engine. AIER Tao có thể reference ngày khi tư vấn. Wallet có thể trigger U-reward cho daily check-in.

### **§1.3 — Non-goals**

Doc này KHÔNG cover:
- Chi tiết thuật toán Hoàng Đạo/Hắc Đạo/sao/Trực (xem `TAO_VANNIEN_DATA_API_v1.md` Tier 3)
- Chi tiết thuật toán lịch âm/dương (xem `TAO_LUNAR_CALENDAR_ALGORITHM_v1.md`)
- Tử Vi chart construction (xem `TAO_ZIWEI_FORMULA_REFERENCE_v1.md`)
- Bazi/Phong Thủy advisory (TAO V1 future)

---

## **§2 — ENTRY POINTS (5 places)**

### **§2.1 — HOME Widget (primary)**

**Vị trí:** HOME tab → trên cùng (above feed), hoặc collapsible card.

**Default state (compact):**
```
┌─────────────────────────────────────────────┐
│ 📅 Thứ Tư, 29/04/2026                       │
│    Âm: 12/3 Bính Ngọ — Mậu Tuất             │
│    Trực: Bế  ★ Hoàng Đạo                    │
│    🌿 Hợp năng lượng Mộc của bạn            │
│    [Xem chi tiết]                           │
└─────────────────────────────────────────────┘
```

**Behavior:**
- Auto-update mỗi ngày 00:01 local time.
- Tap → mở Daily Detail page (§3).
- ENTA energy line chỉ hiển thị nếu user có ENTA profile complete.
- Free tier: full info available. Premium tier: thêm "gợi ý hoạt động cá nhân hóa".

**Visual rules:**
- Hoàng Đạo: icon ★ vàng nhạt
- Hắc Đạo: icon ◐ xám (KHÔNG dùng đỏ alarm)
- Hợp năng lượng: icon element của user (🌿 Mộc / 🔥 Hỏa / 🪨 Thổ / ⚙️ Kim / 💧 Thủy) + màu nhẹ
- Khắc năng lượng: icon element + tone xám neutral, copy "ngày năng lượng đối lập, cần cân bằng" (KHÔNG dùng "xui", "kỵ", "tránh")

### **§2.2 — Tools Menu / Springboard**

**Vị trí:** PLUS Hub → springboard grid → "Lịch Vạn Niên" mini-app icon.

Tap → mở full Lịch Vạn Niên surface (§3 Calendar View).

### **§2.3 — User input: ngày sinh**

Khi user:
- Đăng ký UZG+ (ENTA setup)
- Update profile birth date
- Tạo lá số TAO

→ Form input có **2 mode toggle**:

```
[● Dương lịch] [○ Âm lịch]
[Ngày]  [Tháng]  [Năm]
[ ] Tháng nhuận (chỉ hiện khi mode âm + năm có tháng nhuận)
[Giờ]  [Phút]
```

**Behavior:**
- Mode mặc định: dương lịch
- Khi user chọn âm lịch → hiển thị thêm checkbox tháng nhuận (chỉ active khi năm chọn có tháng nhuận thực tế)
- Sau khi user nhập, hệ thống auto-display CẢ HAI lịch để confirm:
  ```
  ✓ Đã chọn: 15/05/1990 dương lịch ↔ 22/04 Canh Ngọ âm lịch
  ```
- Backend lưu **cả hai** + can-chi normalized (per `TAO_LUNAR_CALENDAR_ALGORITHM_v1` §8).

### **§2.4 — TAO module integration**

TAO surface (Overview / Natal / Reading) có shortcut "📅 Xem lịch hôm nay" → opens Daily Detail page với context "from TAO module".

### **§2.5 — AIER Tao chat reference**

Khi AIER Tao reply có liên quan đến timing (e.g., "thời điểm thuận cho việc X"), AIER inserts inline reference card:
```
[Card: 29/04 — Trực Bế, Hoàng Đạo, hợp Mộc]
```
Tap → Daily Detail page.

AIER reference KHÔNG được tự sinh advisory về ngày — chỉ reference data từ Lịch Vạn Niên engine. Per per existing AIER Tao Constitutional Rules.

---

## **§3 — UI SURFACES (8 surfaces)**

### **§3.1 — Calendar View (default landing)**

**Layout:** Month grid view (7 cols × 5-6 rows).

```
┌───────────────────────────────────────────────────┐
│  [<]  Tháng 4 / 2026  [>]   [Hôm nay] [Tới ngày] │
│  Âm: tháng 3 Bính Ngọ                             │
├───┬───┬───┬───┬───┬───┬───┤
│ T2│ T3│ T4│ T5│ T6│ T7│ CN│
├───┼───┼───┼───┼───┼───┼───┤
│   │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │
│   │14 │15 │16 │17 │18 │19 │
│   │ ★ │   │ ★ │ ◐ │   │ ★ │
├───┼───┼───┼───┼───┼───┼───┤
│ 7 │ 8 │ 9 │10 │11 │12 │13 │
│20 │21 │22 │23 │24 │25 │26 │
│   │ ★ │ ◐ │   │   │ ★ │   │
├───┼───┼───┼───┼───┼───┼───┤
│...                                                │
└───────────────────────────────────────────────────┘
```

Each cell shows:
- Solar day (số to)
- Lunar day (số nhỏ)
- Hoàng Đạo (★) / Hắc Đạo (◐) icon
- ENTA-resonant indicator (subtle border tint nếu hợp element user)

**Interactions:**
- Tap day → Daily Detail page
- Long-press → quick preview (popup with key info, không leave page)
- Swipe left/right → previous/next month
- Today highlighted with primary color border

**Header tools:**
- `[Hôm nay]` → jump to current day
- `[Tới ngày]` → date picker, jump to specific date
- Month navigation `[<] [>]`

### **§3.2 — Daily Detail page**

Full detail của 1 ngày — vertical scroll, sectioned.

```
═════════════════════════════════════════
   Thứ Tư, 29 / 04 / 2026
   Âm: 12 tháng 3 năm Bính Ngọ
   Ngày Mậu Tuất, tháng Nhâm Thìn
═════════════════════════════════════════

📍 NGÀY HÔM NAY
─────────────────────────────────────────
Trực:           Bế (đóng cửa, kết thúc)
Sao:            Tỉnh Mộc Ngạn (Nhị Thập Bát Tú)
Hoàng Đạo:      ★ Minh Đường Hoàng Đạo
Tiết khí:       Cốc Vũ (sau Lập Hạ 5 ngày)
Ngày lễ:        —
Sao tốt:        Thiên Đức, Nguyệt Đức, Mẫu Thương
Sao xấu:        Tam Nương (ngày 13 âm), Câu Trận

🌿 NĂNG LƯỢNG CỦA BẠN (ENTA: Mộc - Dương)
─────────────────────────────────────────
Năng lượng ngày:        Thổ (Mậu Tuất)
Tương quan:             Mộc khắc Thổ
Mức cộng hưởng:         Thấp — ngày năng lượng đối lập
Gợi ý:                  Phù hợp công việc nội tỉnh,
                        kế hoạch dài hạn, tu chỉnh

⏰ GIỜ HOÀNG ĐẠO
─────────────────────────────────────────
Hoàng Đạo (tốt):
  • Dần (3-5h)   Tý (23-1h)
  • Thìn (7-9h)  Tỵ (9-11h)
  • Mùi (13-15h) Tuất (19-21h)

Hắc Đạo (cần cân nhắc):
  • Sửu (1-3h)   Mão (5-7h)
  • Ngọ (11-13h) Thân (15-17h)
  • Dậu (17-19h) Hợi (21-23h)

🎯 PHÙ HỢP HOẠT ĐỘNG GÌ
─────────────────────────────────────────
✓ Phù hợp:    Họp gia đình, sửa chữa, đóng cửa,
              kết thúc dự án, tu sửa nhà
~ Cân nhắc:   Đầu tư mới, ký hợp đồng lớn
✗ Tránh:      Khai trương, cưới hỏi, xuất hành
              xa, an táng (theo truyền thống)

📚 GIẢI THÍCH
─────────────────────────────────────────
[Trực Bế là gì? Đọc thêm...]
[Sao Tỉnh Mộc Ngạn là gì? Đọc thêm...]
[Tam Nương là gì? Đọc thêm...]

🔗 KẾT NỐI
─────────────────────────────────────────
[Hỏi AIER Tao về ngày này]
[Đặt lịch nếu có dự định]
[Chia sẻ ngày này]
═════════════════════════════════════════
```

### **§3.3 — Activity Picker page**

User chọn loại hoạt động → hệ thống đề xuất các ngày tốt trong khoảng 3 tháng tới.

**Activity types (categories):**
1. **Việc cưới hỏi**
   - Đám cưới
   - Đám hỏi / dạm ngõ
   - Đăng ký kết hôn
2. **Việc làm ăn**
   - Khai trương
   - Ký hợp đồng
   - Đầu tư / mở rộng
   - Khởi nghiệp
3. **Việc nhà cửa**
   - Động thổ / khởi công
   - Đổ móng / cất nóc
   - Nhập trạch (về nhà mới)
   - Sửa chữa / tu tạo
4. **Việc xuất hành**
   - Du lịch xa
   - Chuyển công tác
   - Đi nước ngoài
5. **Việc tang lễ**
   - An táng / chôn cất
   - Cải táng / di mộ
   - Lập bàn thờ
6. **Việc cá nhân**
   - Cắt tóc / làm đẹp
   - Mua xe / mua nhà
   - Ký giấy tờ quan trọng

**Output (per activity selected):**
```
TÌM NGÀY TỐT: Khai trương cửa hàng

Trong 90 ngày tới, các ngày phù hợp nhất:

┌──────────────────────────────────────────────┐
│ ⭐⭐⭐⭐⭐  Thứ Hai, 12/05/2026               │
│           Âm: 26/4 Bính Ngọ                  │
│           Trực: Khai  ★ Tư Mệnh Hoàng Đạo    │
│           Cộng hưởng cao với Mộc của bạn     │
│           Giờ tốt: 7h-9h, 9h-11h, 15h-17h    │
│           [Đặt lịch hoạt động]               │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ ⭐⭐⭐⭐    Thứ Năm, 22/05/2026               │
│           ...                                │
└──────────────────────────────────────────────┘

[Xem thêm 8 ngày khác]
[Lọc: Chỉ T7-CN] [Lọc: Trong tháng 5]
```

**Rating algorithm:** kết hợp Hoàng Đạo + sao tốt + Trực phù hợp + ENTA resonance. Per `TAO_VANNIEN_DATA_API_v1` §6.

### **§3.4 — Lunar ↔ Solar Converter**

Standalone tool, accessed from Tools or directly via deeplink.

```
CHUYỂN ĐỔI LỊCH

Mode: [● Dương → Âm]  [○ Âm → Dương]

Nhập ngày dương:  [29] / [04] / [2026]
                  [Chuyển đổi]

Kết quả:
  Dương:    Thứ Tư, 29/04/2026
  Âm:       Thứ Tư, 12/03/2026 (Bính Ngọ)
  Can Chi:  ngày Mậu Tuất, tháng Nhâm Thìn,
            năm Bính Ngọ
  Tiết khí: Cốc Vũ
  Trực:     Bế

[Xem chi tiết ngày này]
[Chuyển đổi ngày khác]
```

Reverse mode (Âm → Dương) tương tự, với checkbox tháng nhuận.

### **§3.5 — Year View**

Vista 12 tháng/năm trên 1 màn hình — useful cho planning dài hạn.

Each month: thumbnail mini-grid với highlighted:
- Tết Nguyên Đán
- Tiết khí transitions
- Ngày tốt cá nhân hóa (top 3 mỗi tháng theo ENTA của user)

### **§3.6 — Search / Filter page**

User search ngày tốt theo criteria:
- Date range
- Activity type
- Minimum star rating
- Day-of-week constraint
- ENTA resonance threshold

### **§3.7 — Hour Detail (giờ Hoàng Đạo)**

Tap vào "Giờ Hoàng Đạo" trong Daily Detail → expand chi tiết:
- 12 giờ trong ngày
- Mỗi giờ: tên (Tý/Sửu/...), thời gian (real hour), Hoàng/Hắc Đạo, sao tốt/xấu của giờ, hoạt động phù hợp

### **§3.8 — Saved Days / Bookmarks**

User có thể bookmark ngày → list trong "Ngày đã lưu". Cho phép thêm note cá nhân.

---

## **§4 — UI VISUAL & TONE GUIDELINES**

### **§4.1 — Color palette**

| Element | Color (light mode) | Color (dark mode) |
|---|---|---|
| Hoàng Đạo (good) | Vàng warm `#D4A53A` | Vàng nhạt `#E8C766` |
| Hắc Đạo (caution) | Xám neutral `#888888` | Xám `#AAAAAA` |
| Today highlight | UZG+ primary indigo | UZG+ primary indigo |
| ENTA Mộc (Wood) | Xanh lá nhẹ `#7AAB7E` | Xanh lá nhạt |
| ENTA Hỏa (Fire) | Đỏ cam nhẹ `#D87A5A` | Đỏ cam nhạt |
| ENTA Thổ (Earth) | Vàng đất `#A89968` | Vàng đất nhạt |
| ENTA Kim (Metal) | Xám bạc `#9AA5B1` | Xám bạc nhạt |
| ENTA Thủy (Water) | Xanh dương sâu `#5A7AAB` | Xanh dương nhạt |
| Tam Nương / Sát Chủ | Xám đậm `#666666` | Xám đậm `#888888` |

**KHÔNG dùng đỏ alarm `#FF0000` cho ngày xấu** — đỏ chỉ dùng cho error UI. Hắc Đạo/sao xấu = xám neutral để tránh fear-shock.

### **§4.2 — Tone of voice**

**Prefer:**
- "Phù hợp hoạt động X" / "Cân nhắc làm Y" / "Theo truyền thống tránh Z"
- "Cộng hưởng cao/thấp với năng lượng của bạn"
- "Ngày năng lượng đối lập, cần cân bằng"
- "Theo lịch truyền thống Á Đông..."

**Avoid:**
- "Hôm nay xui!", "Ngày kỵ!", "Tránh tuyệt đối!"
- "Phán quyết", "Không thể tránh khỏi"
- "Bí ẩn vận mệnh", "Lá số tiết lộ ngày..."

**Framing principle:** Lịch Vạn Niên là **information layer** giúp user **tự quyết định** dựa trên truyền thống, KHÔNG phải authority phán xét. User là người quyết định cuối cùng (per UZG+ Core Law: Human = Authority).

### **§4.3 — Iconography**

- ★ filled = Hoàng Đạo
- ◐ outlined = Hắc Đạo
- 🌿 Mộc / 🔥 Hỏa / 🪨 Thổ / ⚙️ Kim / 💧 Thủy = ENTA elements
- ⏰ giờ Hoàng Đạo
- 🎯 hoạt động phù hợp
- 📚 giải thích
- 🔖 bookmark

Use SF Symbols / Material Icons. Avoid mystical/glitter icons.

### **§4.4 — Typography**

- Solar dates: bold sans-serif
- Lunar dates: regular weight, smaller (subordinate)
- Can-Chi names: serif for traditional feel (e.g., Source Han Serif VN)
- Body text: IBM Plex Sans VN / Inter VN

---

## **§5 — PUSH NOTIFICATION POLICY**

### **§5.1 — Notification types**

UZG+ Lịch Vạn Niên SHIPS push notifications, framed as **information**, not manipulation.

**Allowed notification types:**

| Type | Frequency | Default | User control |
|---|---|---|---|
| **Daily morning briefing** | 1×/day, 7:00 AM local | OFF | User opt-in in Settings |
| **High-resonance day alert** | When user has very-high-match day in next 7 days | OFF | User opt-in |
| **Activity reminder** | When user bookmarked a day for activity | ON | Cancel anytime |
| **Tiết khí change** | 24h before each tiết khí | OFF | User opt-in |
| **Major holidays** | 2 days before Tết, Trung Thu, etc. | ON | Toggle off in Settings |

### **§5.2 — Notification copy (LOCKED templates)**

**Daily morning briefing (opt-in):**
```
Title:  📅 Thứ Tư, 29/04
Body:   Trực Bế, ngày Hoàng Đạo. Năng lượng Thổ —
        cân bằng với Mộc của bạn.
```

**High-resonance day alert (opt-in):**
```
Title:  ⭐ Ngày cộng hưởng cao sắp tới
Body:   12/05/2026 phù hợp khai trương theo ENTA của bạn.
        Xem chi tiết.
```

**Activity reminder (auto):**
```
Title:  🔖 Ngày bạn đã lưu sắp đến
Body:   29/04 — kế hoạch khai trương. Chi tiết ngày.
```

**Forbidden notification copy:**
- ❌ "Hôm nay là ngày kỵ! Hủy mọi kế hoạch ngay!"
- ❌ "Tam Nương! Cẩn trọng!"
- ❌ "Mua membership ngay vì hôm nay là ngày tốt mua hàng!"
- ❌ Countdown to "đại hạn" / "ngày tử"
- ❌ Fear-language hoặc urgency-spam

**Hard rule:** Notification frequency cap = **2/day maximum** từ Lịch Vạn Niên. Không được spam.

### **§5.3 — Settings UI**

User Settings → Lịch Vạn Niên section:
- Toggle each notification type on/off
- Choose notification time (default 7:00, range 6-9 AM)
- Quiet hours: notifications suppressed during 22:00-06:00
- "Tắt toàn bộ" master switch

---

## **§6 — BOOKING / SERVICE INTEGRATION**

### **§6.1 — When upsell is allowed**

Lịch Vạn Niên có **service hooks** nhưng phải tuân fair-use rules:

**Allowed upsell triggers:**
- User actively chọn activity (e.g., "Tìm ngày khai trương") → display "Đặt dịch vụ tổ chức khai trương" CTA bên cạnh ngày match.
- User bookmarked ngày + activity → 7 ngày trước, gợi ý "Bạn có muốn đặt dịch vụ cho ngày này?"
- User vào Daily Detail của ngày trong tương lai → bottom CTA "Đặt lịch nếu có dự định".

**Forbidden upsell triggers:**
- ❌ Push notification "Hôm nay là ngày tốt mua membership!"
- ❌ Daily widget hiển thị "Mua Premium để xem giờ Hoàng Đạo chi tiết" (giờ Hoàng Đạo là free tier).
- ❌ Booking CTA dựa trên engagement metric ("user mở Lịch 3 lần hôm nay → push booking").
- ❌ Bait-and-switch: free user thấy "Ngày tốt!" rồi paywall blocks chi tiết.

### **§6.2 — Service categories integrated**

Lịch Vạn Niên có thể trigger booking cho:
- Tổ chức cưới hỏi (qua Circle Business partner network)
- Khai trương / event business
- Dịch vụ phong thủy / tâm linh (đã verified vendor)
- Tư vấn TAO chuyên sâu (paid expert reading)
- Du lịch / di chuyển (qua travel partner)

### **§6.3 — Conversion tracking ethics**

- Track conversion **with user consent** only.
- **Never** tune algorithm to push booking on "fear days" — algorithm chỉ optimize cho match (ENTA + activity + Hoàng Đạo), không cho conversion rate.
- A/B test KHÔNG được test "fear copy vs neutral copy" — chỉ test "neutral A vs neutral B".

---

## **§7 — MEMBERSHIP TIERS**

### **§7.1 — Tier matrix**

| Feature | Free | Member | Premium |
|---|---|---|---|
| Calendar View | ✓ | ✓ | ✓ |
| Daily Detail (full) | ✓ | ✓ | ✓ |
| Lunar ↔ Solar converter | ✓ | ✓ | ✓ |
| Hoàng Đạo / Hắc Đạo | ✓ | ✓ | ✓ |
| Trực + 28 sao | ✓ | ✓ | ✓ |
| Sao tốt / Sao xấu | ✓ | ✓ | ✓ |
| Giờ Hoàng Đạo per day | ✓ | ✓ | ✓ |
| Hoạt động chung phù hợp | ✓ | ✓ | ✓ |
| **ENTA energy match** | ✓ basic | ✓ full | ✓ full |
| **Activity Picker (find good days)** | ✗ | ✓ | ✓ |
| **Personalized recommendations** | ✗ | ✓ | ✓ |
| **Year View / Long-term planning** | ✗ | ✓ | ✓ |
| **Bookmark days** | ✓ (max 3) | ✓ unlimited | ✓ unlimited |
| **Push notifications** | ✓ basic | ✓ all types | ✓ all types |
| **AIER Tao timing advisory** | ✗ | ✗ | ✓ |
| **Compatibility check (2 charts)** | ✗ | ✗ | ✓ |

### **§7.2 — Free tier promise**

Free tier có **đầy đủ thông tin truyền thống** của lịch vạn niên — đây là common-good knowledge thuộc văn hóa Á Đông. UZG+ KHÔNG paywall thông tin lịch.

Premium gate chỉ cho **personalization sâu + planning tools + AIER advisory** — đây là value-add mà UZG+ tạo ra trên top of common knowledge.

---

## **§8 — CROSS-MODULE INTEGRATION**

### **§8.1 — Module map**

```
                 ┌──────────────────────────┐
                 │   UZG+ Lịch Vạn Niên     │
                 │   (this spec)            │
                 └─────────────┬────────────┘
                               │
        ┌──────────┬───────────┼───────────┬──────────┐
        ↓          ↓           ↓           ↓          ↓
     ┌─────┐   ┌──────┐   ┌────────┐  ┌────────┐  ┌──────┐
     │HOME │   │ TAO  │   │ AIER   │  │ ENTA   │  │Wallet│
     │     │   │      │   │ Tao    │  │        │  │      │
     └─────┘   └──────┘   └────────┘  └────────┘  └──────┘
```

### **§8.2 — Per-module contract**

**HOME ↔ Lịch:**
- HOME widget consumes `getDayInfo(today, current_user_id)` API
- Update cadence: 00:01 daily + on user app open
- HOME content card type: "vạn niên insight" with QOT trace

**TAO ↔ Lịch:**
- TAO module SHARES the same `lib/tao/calendar/` engine — no duplication
- TAO Natal/Annual reading có thể reference ngày từ Lịch
- TAO chart input form (§2.3) shares lunar/solar toggle component

**AIER Tao ↔ Lịch:**
- AIER Tao có quyền consume Lịch data trong context pack
- AIER có thể tham chiếu ngày khi tư vấn timing
- AIER reference cards (§2.5) deeplink vào Daily Detail

**ENTA ↔ Lịch:**
- Lịch consumes `user.enta.element` + `user.enta.polarity`
- Fallback: nếu user không có ENTA, derive nạp âm từ năm sinh Can-Chi (per Tier 3 doc §7)
- ENTA energy match là personalization core

**Wallet ↔ Lịch:**
- Daily check-in vào Lịch → user earn 1 U/day (gated as soft engagement reward, not addictive)
- Bookmark + complete activity → bonus U
- Wallet integration follows existing UZG+ U-reward rules

### **§8.3 — QOT trace requirement**

Mọi data hiển thị trên Lịch Vạn Niên phải có QOT trace:
- Source: traditional almanac (Lịch Vạn Niên Hồ Ngọc Đức / Bộ Lễ Việt / canonical Á Đông)
- Algorithm: TAO calendar engine version X
- Computed: timestamp + algorithm_version
- Per-user customization: "based on your ENTA element X"

Tap QOT icon → audit sheet (per UZG+ Master UI/UX QOT rule).

---

## **§9 — INTERACTION FLOWS (4 key flows)**

### **§9.1 — First-time user flow**

```
1. User signs up UZG+ + completes ENTA
   ↓
2. UZG+ tutorial introduces Lịch Vạn Niên (1 of 5 cards)
   ↓
3. User taps HOME → sees today's widget với ENTA match
   ↓
4. User taps "Xem chi tiết" → Daily Detail
   ↓
5. CTA suggests "Khám phá Lịch tháng này" → Calendar View
```

### **§9.2 — Find-good-day flow**

```
1. User decides to plan event (e.g., wedding)
   ↓
2. Open Lịch → Activity Picker → "Đám cưới"
   ↓
3. Choose date range (e.g., "Trong 6 tháng tới")
   ↓
4. System returns ranked list of dates
   ↓
5. User taps top match → Daily Detail with full info
   ↓
6. User bookmarks → optional: book service via Circle Business
```

### **§9.3 — Quick lookup flow**

```
1. User wants to convert solar ↔ lunar
   ↓
2. Open Lịch → Converter tool (or HOME widget tap)
   ↓
3. Enter date + mode → instant result
   ↓
4. Optional: "Xem chi tiết ngày này"
```

### **§9.4 — AIER Tao timing advisory flow (Premium)**

```
1. User asks AIER Tao "Khi nào nên ký hợp đồng?"
   ↓
2. AIER reads context: user chart + ENTA + recent decisions
   ↓
3. AIER queries Lịch Vạn Niên engine: "find good days for
   business contract in next 60 days, ENTA match required"
   ↓
4. AIER replies với 3 ngày đề xuất + reasoning grounded
   on chart + Lịch
   ↓
5. Each suggestion has inline reference card linking
   to Daily Detail
```

---

## **§10 — ACCESSIBILITY & I18N**

### **§10.1 — Accessibility**

- All icons have text alternatives
- Color is never the only signal (icon + label)
- Screen reader: announce "Hoàng Đạo, ngày Bính Ngọ, hợp Mộc" properly
- Keyboard navigation full support for Calendar View (arrow keys to move between days)
- Min font size 14px, scalable to 200%

### **§10.2 — Internationalization**

**Phase 1 (launch):** Vietnamese only.

**Phase 2:** English (with traditional terms preserved):
- "Hoàng Đạo" → "Hoàng Đạo (auspicious day)"
- "Trực" → "Trực (12-day cycle marker)"
- "Tiết khí" → "Tiết khí (solar term)"

**Phase 3:** Simplified Chinese (黄道 / 直 / 节气) for diaspora users.

Cultural framing line: "*Lịch vạn niên là tri thức truyền thống Á Đông được truyền lại hàng nghìn năm. UZG+ trình bày đầy đủ để bạn tự quyết định.*"

---

## **§11 — TECHNICAL ARCHITECTURE (high-level)**

### **§11.1 — Component map**

```
apps/uzgplus/
├── ui/calendar/                    # UZG+ vạn niên surfaces
│   ├── home-widget/                # §2.1
│   ├── calendar-view/              # §3.1
│   ├── daily-detail/               # §3.2
│   ├── activity-picker/            # §3.3
│   ├── converter/                  # §3.4
│   ├── year-view/                  # §3.5
│   ├── search/                     # §3.6
│   ├── hour-detail/                # §3.7
│   └── bookmarks/                  # §3.8
├── api/calendar/
│   ├── day                         # GET /day/:date
│   ├── range                       # GET /range/:from/:to
│   ├── find-good-days              # POST /find
│   ├── convert                     # POST /convert (solar↔lunar)
│   ├── bookmark                    # CRUD bookmarks
│   └── notifications               # subscribe/unsubscribe
└── workers/
    ├── daily-refresh               # 00:01 daily cache invalidate
    └── notification-dispatch       # 7:00 daily push

lib/tao/calendar/                    # SHARED with TAO module
├── (existing engine per TAO_LUNAR_CALENDAR_ALGORITHM_v1)
└── vannien/                         # vạn niên-specific
    ├── truc-12.ts                   # 12 trực cycle
    ├── nhi-thap-bat-tu.ts           # 28 stars
    ├── hoang-dao.ts                 # Hoàng/Hắc Đạo per day
    ├── sao-tot-xau.ts               # good/bad stars
    ├── activity-match.ts            # activity → day suitability
    ├── enta-energy-match.ts         # ENTA element resonance
    └── tables/                      # JSON lookup tables
```

### **§11.2 — Data flow**

```
User opens Daily Detail of date X
  ↓
Frontend → GET /api/calendar/day/2026-04-29?user_id=...
  ↓
Backend:
  1. lib/tao/calendar.solarToLunar(X) → lunar date + can-chi
  2. lib/tao/calendar.vannien.getDayInfo(canChi, lunar) → full info
  3. lib/tao/calendar.vannien.entaMatch(dayElement, userElement) → resonance
  4. Compose response object
  ↓
Frontend renders Daily Detail
```

### **§11.3 — Caching**

- Day info is **deterministic** per date → cache aggressively (CDN-level, 30 days TTL)
- ENTA match is per-user → compute on request (small overhead)
- Calendar View grid: prefetch 3 months ahead in background

### **§11.4 — Performance budget**

- Daily Detail page load: < 800ms p95
- Calendar View: < 500ms p95
- Activity Picker compute: < 1.5s p95 for 90-day range
- Push notification dispatch: < 5min after 7:00 AM trigger

---

## **§12 — METRICS & SUCCESS CRITERIA**

### **§12.1 — Adoption metrics**

- DAU of Lịch Vạn Niên ≥ 30% of overall DAU within 3 months
- Daily morning notification opt-in rate ≥ 20%
- Activity Picker usage: ≥ 5% of Member tier per month

### **§12.2 — Quality metrics**

- Lunar/Solar conversion accuracy: 100% match against Hồ Ngọc Đức reference (CI test)
- Hoàng Đạo / Hắc Đạo: 100% match against canonical lookup
- ENTA energy match user satisfaction: ≥ 4.0/5.0 in surveys

### **§12.3 — Revenue metrics**

- Free → Member conversion attributable to Lịch ≥ 10% of monthly conversion
- Service booking through Lịch (Activity Picker → vendor) ≥ X bookings/month (TBD)
- Average revenue per user with Lịch active vs inactive (track but don't over-optimize)

---

## **§13 — REDLINES (this doc-specific)**

Even with NTS canon rewrite pending, this feature MUST never:

- **R1.** Frame Lịch Vạn Niên as "fortune-telling" or "fate prediction" — it is a **traditional information layer**.
- **R2.** Use red alarm UI for "bad days" — only neutral muted tones.
- **R3.** Push notification with fear language ("kỵ", "tử", "đại hạn", "tránh tuyệt đối").
- **R4.** Paywall basic traditional information (Hoàng Đạo, Trực, sao, tiết khí) — these are common-good cultural knowledge.
- **R5.** Use Lịch data for behavior manipulation (price discrimination, fear-based upsell, bait-and-switch).
- **R6.** Allow AIER Tao to make absolute predictions about ngày tốt/xấu — AIER references info, never decrees.
- **R7.** Build "lịch áp đặt" tone — user always có quyền tự quyết, lịch là **gợi ý truyền thống**.

These redlines are **doc-internal**, không phụ thuộc canon rewrite. Chúng preserve UZG+ identity ("Human = Authority") regardless of which canon version is active.

---

## **§14 — OPEN QUESTIONS FOR NTS**

| # | Question | Recommendation |
|---|---|---|
| Q1 | Default homepage — Calendar View hay Daily Detail? | Calendar View |
| Q2 | Year View free hay member-gated? | Member-gated |
| Q3 | Compatibility check (2 charts) cho cưới hỏi — Premium only? | Yes, Premium only |
| Q4 | AI auto-suggest "ngày tốt cho user X làm Y" có nên proactive (AIER initiated) hay reactive (user asks)? | Reactive only — match Constitutional Rule 9 |
| Q5 | Service booking commission rate cho Lịch-driven bookings? | TBD by Wallet team |
| Q6 | Localized data cho tiết khí (theo timezone user) hay fixed VN+CN? | Fixed VN/CN per `lunar_calendar_system` |

---

## **§15 — VERSION CONTROL**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-29 | Initial — full feature spec, NTS-approved direction (full A+B+C scope) |

**Amendment rule:**
1. Proposal as `UZGPLUS_VANNIEN_CALENDAR_SPEC_v1_AMENDMENT_<X>.md`
2. NTS approval required
3. Cannot violate doc-internal redlines §13
4. Cannot break cross-module contracts §8
5. Old version archived

---

## **§16 — SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.0 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ pending canon rewrite | — |
| Effective | — | ⏳ pending | — |

**END — UZGPLUS_VANNIEN_CALENDAR_SPEC_v1**
