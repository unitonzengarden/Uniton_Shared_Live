# **TAO ZIWEI UI/UX CANON v1.0**

## **UI/UX surface design for TAO V2 (Tử Vi) module — UZG+ ecosystem**

---

**Document ID:** TAO_ZIWEI_UI_UX_CANON_v1
**Version:** 1.1 (NTS fear-UX relaxation)
**Effective Date:** 2026-04-29
**Authority Level:** Tier 2 (extends Architecture, governed by LAW + UZG+ Master UI/UX Canon)
**Parent docs:**
- `TAO_ZIWEI_CANON_OFFICIAL_v1.md`
- `TAO_ZIWEI_SYSTEM_LAW_v1.md`
- `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.md`
- `MASTER_UIUX_CANON_OFFICIAL_v2_FINAL.md` (UZG+ master, parent UI/UX governance)
- `PLUS_HUB_MODULE_CANON_OFFICIAL_v1.md` (TAO entry point via PLUS Hub)
**Status:** PROPOSED — awaiting NTS approval
**Note:** This document is a fresh draft — content NOT extracted from V3, written based on Master Stack Section E + cross-references to UZG+ Master UI/UX Canon.

---

## **Purpose**

Document này khóa **UI/UX rules cho TAO V2 surface** trong UZG+ PWA. TAO không phải standalone app — TAO là module nằm trong UZG+ ecosystem, accessed qua PLUS Hub (Nav vị trí 3). UI/UX của TAO phải:

- Đồng bộ với UZG+ Master UI/UX Canon (5-module bottom nav, ENTA-aware, QOT-trace, no Like/Engagement-farming)
- Tôn trọng Constitutional rules cho AIER Tao (LAW SECTION C)
- Không vi phạm 4 redlines (no fear-UX, no mysticism-shock, no thầy-phán framing, no destiny-discrimination)
- Hỗ trợ Membership gating (free / member / premium) một cách trong suốt, không paywall ép buộc

---

# **SECTION 1 — TAO POSITION IN UZG+ UI**

## **1.1 Entry points**

TAO được access qua các entry points sau (theo Master UI/UX Canon + PLUS Hub Canon):

| Entry | Surface | Behavior |
|---|---|---|
| **PLUS Hub → TAO mini app** | Springboard grid icon | Primary entry. Tap → mở TAO Overview |
| **HOME feed → TAO content card** | Inline value-bearing post | Tap → context-bound TAO surface (e.g., reading reference) |
| **ENTA tab → "Hiểu cấu trúc của bạn" CTA** | Cross-module nav | Tap → TAO Overview với ENTA pre-fill |
| **AIER Tao chat session** | Bottom nav CHAT → AIER Tao thread | Conversational entry, grounded on existing chart |

**Allowed (per LAW 5/8/REDLINE 2/4 v1.1):**
- Daily widget HOME hiển thị info ngày + ENTA energy match (lookup-on-demand)
- Notification opt-in "Hôm nay là ngày phù hợp khởi sự" với neutral framing (per Lịch Vạn Niên SPEC)
- Banner truyền thống "Khám phá cấu trúc lá số của bạn" với educational tone

**Cấm (vẫn áp dụng):**
- Pop-up gây áp lực "Xem ngay nếu không sẽ..." (urgency-fear)
- Notification spam fear-copy "⚠️ KỴ! HỦY MỌI KẾ HOẠCH!" (abusive)
- Clickbait "Bạn sẽ KHÔNG TIN ĐƯỢC lá số tiết lộ điều gì..." (predatory mystical)
- A/B testing fear-copy vs neutral để optimize conversion

## **1.2 Navigation hierarchy**

```
PLUS Hub
  └─ TAO mini app
       ├─ Overview         [Section 2.1]
       ├─ Natal Chart      [Section 2.2]
       ├─ Life Reading     [Section 2.3]   (Member+)
       ├─ Annual / Cycle   [Section 2.4]   (Member+)
       └─ AIER Tao         [Section 2.5]   (cross to CHAT)
```

---

# **SECTION 2 — 5 PRIMARY SURFACES**

## **2.1 Overview surface**

**Purpose:** First entry. Show user where they are + what's available.

**Content:**
- Brief intro: "Lá số của bạn là một bản đồ cấu trúc. TAO giúp bạn đọc nó."
- ENTA-aware preview: nếu ENTA đã có, show 2-3 high-level signals (ví dụ: "Mệnh tại Tý — Tham Lang"). Nếu chưa có chart → CTA "Tạo lá số".
- 4 navigation tiles: Natal Chart / Life Reading / Annual Cycle / AIER Tao
- Membership status indicator (subtle, không paywall in-your-face)
- QOT trace icon: tap → audit trail của chart (provenance)

**UX principles:**
- Calm. Tĩnh. Không animation đập vào mắt
- Information density vừa phải, không overwhelm beginner
- ENTA color hint nhẹ (theo element của user)

**Cấm:**
- "Vận may hôm nay" widget (vi phạm REDLINE 4)
- "Số phận của bạn..." headline (vi phạm L4 no-deterministic)
- Score / Rating / Star count cho lá số (vi phạm L10 no-product-override)

## **2.2 Natal Chart surface**

**Purpose:** Hiển thị lá số gốc — 12 cung, 14 chính tinh, phụ tinh, vòng sao, Tứ Hóa.

**Content:**
- Lá số visualization (4x3 grid theo CÁCH NAY, hoặc 5x5 ring theo CÁCH XƯA — NTS quyết)
- Mỗi cung: tên cung, chính tinh, phụ tinh, độ sáng (Miếu/Vượng/Đắc/Bình/Hãm)
- Mệnh / Thân / Cục badge prominent
- Ring overlay toggle: Lộc Tồn / Tràng Sinh / Thái Tuế (default off, opt-in)
- Tứ Hóa markers visible với explanation tap
- Tap any palace → palace detail bottom sheet với đầy đủ info

**UX principles:**
- Visual rõ, đường nét sáng, font Han Vietnamese / Sans Serif rõ ràng
- Color palette: traditional colors but muted (deep indigo, calm purple, warm gray) — KHÔNG đỏ alarm, vàng glitter
- Tap interactions feel responsive, không lag
- Each star có short tooltip với neutral framing

**Cấm:**
- Animation "shooting stars" / "falling sakura" decorative (vi phạm UX principle "không rẻ tiền xem-bói-online")
- Sound effects on tap (mystical chime → REDLINE 2)
- "Hung" stars colored red, "Cát" colored green (binary good/bad → vi phạm L4)

## **2.3 Life Reading surface (Member+)**

**Purpose:** Tổng quan trọn đời theo cấu trúc lá số.

**Content sections (vertical scroll):**
- Tính cách & cấu trúc nội tâm
- Sự nghiệp & nhịp phát triển
- Tài lộc & quan hệ vật chất
- Hôn nhân & quan hệ thân mật
- Sức khỏe & vùng cần lưu ý
- Quan hệ & mạng lưới xã hội
- Nhịp vận hành tổng thể

**Each section:**
- 2-3 paragraphs grounded text (per LAW 4: no deterministic, only "xu hướng / cấu trúc / có khả năng")
- Reference back to specific palace + star + ring evidence
- "Hỏi AIER Tao về phần này" CTA (cross to AIER session)
- QOT trace for transparency

**Cấm:**
- "Bạn sẽ giàu vào năm 35 tuổi" (deterministic → REDLINE 1 + L4)
- "Hôn nhân của bạn sẽ thất bại" (negative deterministic → REDLINE 1)
- Score 1-10 cho từng aspect (gamification → L5)

## **2.4 Annual / Cycle Reading surface (Member+)**

**Purpose:** Đọc năm hiện tại (lưu niên) + đại vận / tiểu vận.

**Content:**
- Năm hiện tại badge (ví dụ "2026 — Bính Ngọ")
- Lưu niên Tứ Hóa overlay
- Đại vận hiện tại + transition points (10y window)
- Tiểu vận năm hiện tại
- Timeline view: months in current year với "windows" highlighted (advisory periods, not "lucky/unlucky days")
- Transition alert (e.g., "Đại vận sẽ chuyển từ cung X sang Y vào năm Z")

**UX principles:**
- Timeline visualization clean, balanced với cultural traditional aesthetic
- "Window" framing acceptable, plus traditional "ngày tốt / ngày xấu" labels are ALLOWED khi user search activities cụ thể (cưới hỏi, khai trương, etc.) per Lịch Vạn Niên SPEC §3.3
- Advisory paragraphs neutral framing, không fear-copy

**Allowed (per v1.1 relaxation):**
- Calendar widget với "ngày Hoàng Đạo / Hắc Đạo / Tam Nương / Sát Chủ" labels (truyền thống Á Đông information layer)
- Push notification opt-in về ngày hợp/khắc với user's energy (neutral tone)
- Daily morning briefing widget HOME

**Cấm (vẫn áp dụng):**
- Push notification spam fear-copy: "⚠️ HÔM NAY KỴ! HỦY MỌI KẾ HOẠCH!"
- Countdown threatening to "đại hạn" event với fear narrative (urgency-fear)
- Animation flashing red alarm for "hung" days
- Auto-push without user opt-in

## **2.5 AIER Tao surface (cross-module to CHAT)**

**Purpose:** Conversational advisory grounded on chart.

**Behavior:**
- Tap "AIER Tao" → opens new CHAT thread bound to user's chart
- AIER Tao identifies as advisor: "Em là AIER Tao, em đồng hành cùng anh/chị qua cấu trúc lá số đã có."
- AIER does NOT generate new charts (per LAW 6)
- AIER references chart palaces + stars + cycles in replies (per LAW 9)
- AIER responses framed as advisor (per REDLINE 3): "theo cấu trúc lá số, có xu hướng..." NOT "số bạn là..."
- User can ask follow-up; AIER stays grounded

**Surface hints (in CHAT UI):**
- AIER Tao avatar marker (visually distinct from user message)
- Subtle "Grounded on chart [chart_id]" indicator (transparency)
- "View chart reference" link in messages where AIER cites a palace/star

**Cấm:**
- AIER speaks as "thầy phán" tone (REDLINE 3)
- AIER replies without chart binding (LAW 9 violation)
- AIER triggers fear language (REDLINE 1 + L5)

---

# **SECTION 3 — UI PRINCIPLES (TAO-specific)**

## **3.1 Visual identity**

- **Palette:** Deep indigo (primary), calm purple (secondary), warm gray (neutral), muted gold (accent only)
- **Typography:** Han-readable Vietnamese sans-serif (e.g., IBM Plex Sans VN, Inter VN)
- **Iconography:** Line icons, không 3D, không glitter
- **Spacing:** Generous, không cramped
- **Animation:** Subtle, không "magical" effects

## **3.2 Tone of voice**

- Calm, factual, neutral
- Vietnamese formal (em / anh / chị) for advisory
- Empathetic but not coddling
- Educational over mysterious

## **3.3 ENTA awareness**

- TAO surfaces respect ENTA element of user (subtle color hint, không overload)
- Reading content adapts to ENTA polarity (Dương Nam / Âm Nam / Dương Nữ / Âm Nữ) per V3 §11
- AIER Tao session bound by ENTA + chart

## **3.4 Membership transparency**

- Gate clearly indicated, không hidden behind random walls
- "Unlock with Premium" CTA polite, không pressure
- Free tier always has meaningful sample (per Master UI/UX Canon "identity precedes capability" but not "capability is hidden")

## **3.5 QOT integration**

- Every chart + reading has QOT trace icon
- Tap → provenance sheet: chart formula version, source authority, calculation log, audit status
- Per UZG+ Master UI/UX: "Mọi post/message value-bearing phải có QOT icon"

---

# **SECTION 4 — INTERACTION PATTERNS**

## **4.1 First-time user flow**

```
PLUS Hub → TAO mini app
  ↓
Overview (no chart yet) → "Tạo lá số" CTA
  ↓
Input form (or auto-fill from ENTA)
  ↓
Chart computation (loading state với calm spinner, không "magical")
  ↓
Natal Chart surface (first reveal — clean, không animation flash)
  ↓
"Khám phá thêm" CTAs to Life Reading / Annual / AIER
```

## **4.2 Returning user flow**

```
PLUS Hub → TAO mini app
  ↓
Overview (chart exists) → quick stats + 4 nav tiles
  ↓
User picks where to deep-dive
```

## **4.3 Loading states**

- Calm spinner (single color, không rainbow)
- Loading text neutral: "Đang tính lá số..." / "Đang tải reading..."
- KHÔNG: "Đang khám phá vận mệnh..." (mystical → REDLINE 2)

## **4.4 Error states**

- Missing data: clear explanation what's needed, không shame
- Engine error: "Có lỗi tính toán. Anh/chị thử lại hoặc liên hệ support." — KHÔNG "Vận xui chặn..."
- Network error: standard offline indicator

## **4.5 Empty states**

- No chart yet: explain TAO + CTA tạo lá số
- No annual reading yet (free tier): explain Member benefit + upgrade CTA polite

---

# **SECTION 5 — REDLINE COMPLIANCE CHECKLIST (v1.1 relaxed)**

Pre-publish review gate. UI/UX changes ship only after PASS:

**Hard checks (always banned):**
- [ ] No deterministic language ("sẽ", "chắc chắn", "không thể tránh khỏi")
- [ ] No abusive fear-trigger UX (red flashing alarms, threatening countdowns to "death/disaster")
- [ ] No predatory clickbait copy ("BẠN SẼ KHÔNG TIN ĐƯỢC", "TIẾT LỘ BÍ MẬT", "CHỈ 1% LÁ SỐ HIẾM")
- [ ] No "thầy phán" tone in AIER Tao
- [ ] No discrimination based on chart (price discrimination, content gating, refusal of service)
- [ ] No abusive fear-conversion ("Mua ngay vì hôm nay là ngày tốt cuối cùng!")
- [ ] No bait-and-switch (tease info → paywall)
- [ ] AIER Tao session always grounded on chart_id

**Soft checks (allowed when done right):**
- [x] Calendar widget hiển thị "ngày Hoàng Đạo / Hắc Đạo / Tam Nương / etc." — OK as traditional information layer (per Lịch Vạn Niên SPEC)
- [x] Push notification opt-in về ngày hợp/khắc — OK với neutral tone, user controls
- [x] Daily morning widget HOME với info ngày hôm nay — OK
- [x] Booking CTA cho dịch vụ relevant to user's lookup activity — OK
- [x] Cultural mystical aesthetic in visualization — OK (truyền thống Á Đông)
- [ ] Score/rating for chart aspects — generally avoid; OK only if framed as "structural strength" not "good/bad rating"
- [ ] QOT trace visible on every reading
- [ ] Membership gates polite, not paywall-aggressive
- [ ] ENTA color awareness present, not overload

---

# **AMENDMENT RULE**

UI/UX amendments require:
1. Proposal as `TAO_ZIWEI_UI_UX_CANON_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Cannot contradict TAO Canon, LAW, or UZG+ Master UI/UX Canon
4. Cannot violate any of 4 redlines (auto-block at review gate)
5. Old version archived

---

# **VERSION LOG**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-25 | Initial — UI/UX surfaces + redline checklist |
| v1.1 | 2026-04-29 | NTS fear-UX relaxation (per Vạn Niên + TAO module-wide decision): §1.1 Cấm bullets reframed (abusive vs informational); §2.4 Annual Cycle "ngày tốt/xấu" labels now allowed when context-driven (lookup, activity-search); §5 Redline checklist split into hard checks (always banned) vs soft checks (allowed when done right). Cross-reference với UZGPLUS_VANNIEN_CALENDAR_SPEC §5 (push notification policy) + §6 (booking integration). |

---

# **SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.1 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ awaiting | — |
| Effective | — | ⏳ pending | — |

**END — TAO_ZIWEI_UI_UX_CANON_v1**

