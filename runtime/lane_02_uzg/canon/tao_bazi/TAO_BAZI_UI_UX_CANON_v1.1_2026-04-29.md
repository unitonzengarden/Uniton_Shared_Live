# **TAO BAZI UI/UX CANON v1.0**

## **UI/UX surface design for TAO V1 (Bazi) + TAO V3 (Phong Thủy) module — UZG+ ecosystem**

---

**Document ID:** TAO_BAZI_UI_UX_CANON_v1
**Version:** 1.1 (NTS fear-UX relaxation)
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge)
**Authority Level:** Tier 2 — UI/UX governance, parallel to `TAO_ZIWEI_UI_UX_CANON_v1`
**Parent docs:**
- `TAO_ZIWEI_CANON_OFFICIAL_v1.md` (TAO module canon)
- `TAO_BAZI_SYSTEM_LAW_v1.md` (operational law — must comply)
- `TAO_BAZI_PHONGTHUY_REFERENCE_v1.md` (data engine)
- `MASTER_UIUX_CANON_OFFICIAL_v2_FINAL.md` (UZG+ master UI/UX)
- `PLUS_HUB_MODULE_CANON_OFFICIAL_v1.md` (entry via PLUS Hub)
**Companion:**
- `TAO_ZIWEI_UI_UX_CANON_v1.md` (sibling — Tử Vi UI patterns to align with)
- `UZGPLUS_VANNIEN_CALENDAR_SPEC_v1.md` (Lịch Vạn Niên integration)
**Status:** ⏳ DRAFT — pending NTS approval
**Issued by:** CLA-2 (Lane_02)

---

## **§0 — POSITION & PURPOSE**

Doc này khóa **UI/UX rules cho TAO V1 (Bazi) + TAO V3 (Phong Thủy) surfaces** trong UZG+ PWA. Bazi/Phong Thủy không phải standalone app — là module của UZG+ ecosystem, accessed qua PLUS Hub (cùng entry point với Tử Vi).

UI/UX của Bazi/Phong Thủy phải:
- Đồng bộ với UZG+ Master UI/UX Canon (5-module bottom nav, ENTA-aware, QOT-trace, no Like/Engagement-farming)
- Tôn trọng Constitutional rules cho AIER Bazi (per `TAO_BAZI_SYSTEM_LAW_v1` §C)
- Không vi phạm 5 redlines (no fear-UX về phong thủy nhà cửa, no mysticism shock, no thầy-phán framing, no destiny-discrimination, no fear-prescription)
- Hỗ trợ Membership gating (free / member / premium) một cách trong suốt
- Tránh trùng lặp UI patterns với Tử Vi — mỗi module có visual identity riêng nhưng cohesive

---

# **SECTION 1 — TAO V1/V3 POSITION IN UZG+ UI**

## **§1.1 — Entry points**

| Entry | Surface | Behavior |
|---|---|---|
| **PLUS Hub → TAO mini app → Bazi tab** | Springboard grid icon | Primary entry. Tap → mở Bazi Overview |
| **PLUS Hub → TAO mini app → Phong Thủy tab** | Springboard grid icon | Primary entry. Tap → mở Phong Thủy Overview |
| **HOME feed → Bazi insight card** | Inline value-bearing post | Tap → context-bound surface (e.g., dụng thần reference) |
| **ENTA tab → "Hiểu cấu trúc Bazi của bạn" CTA** | Cross-module nav | Tap → Bazi Overview với ENTA pre-fill |
| **Lịch Vạn Niên Daily Detail → "Xem theo Bazi của bạn"** | Personalization deeplink | Tap → Bazi-aware day energy view |
| **AIER Tao chat session** | Bottom nav CHAT | Conversational entry, grounded on existing Bazi/Phong Thủy |

**Allowed (per LAW 5/6/9/REDLINE 4/5 v1.2):**
- Daily widget HOME hiển thị Bazi-aware day energy + Phi Tinh hôm nay (lookup-on-demand, neutral framing)
- Push notification opt-in về ngày hợp/khắc với user's Bazi (tone trung tính, user controls)
- Banner truyền thống "Khám phá cấu trúc Bazi của bạn" với educational tone
- Booking CTA cho consultation / vật phẩm marketplace với context Phi Tinh chart

**Cấm (vẫn áp dụng):**
- Pop-up gây áp lực "Phong thủy nhà bạn nguy hiểm! Kiểm tra ngay!" (urgency-fear)
- Notification spam fear-copy "⚠️ TAM SÁT TẤN CÔNG PHÒNG NGỦ!" (abusive)
- Clickbait "Bazi của bạn tiết lộ điều BẠN SẼ KHÔNG TIN ĐƯỢC..." (predatory mystical)
- Push fear-conversion "Mua vật phẩm ngay vì hôm nay nguy hiểm!" (fear-as-conversion)
- A/B testing fear-copy vs neutral để optimize conversion

## **§1.2 — Navigation hierarchy**

```
PLUS Hub
  └─ TAO mini app
       ├─ Tử Vi (governed by TAO_ZIWEI_UI_UX_CANON)
       ├─ Bazi
       │    ├─ Overview              [§2.1]
       │    ├─ 4 Pillars Chart       [§2.2]
       │    ├─ Day Master Analysis   [§2.3]   (Member+)
       │    ├─ Useful God Reading    [§2.4]   (Premium)
       │    ├─ Luck Pillars Timeline [§2.5]   (Premium)
       │    └─ Compatibility Check   [§2.6]   (Premium)
       └─ Phong Thủy
            ├─ Overview              [§3.1]
            ├─ Bát Trạch Profile     [§3.2]   (Member+)
            ├─ Residence Mapping     [§3.3]   (Member+)
            ├─ Cửu Cung Phi Tinh     [§3.4]   (Premium)
            └─ AIER Phong Thủy chat  [cross to CHAT]
```

---

# **SECTION 2 — BAZI SURFACES (6 surfaces)**

## **§2.1 — Bazi Overview**

**Purpose:** First entry. Show user where they are + what's available trong Bazi module.

**Content:**
- Brief intro: "Bazi (Tứ Trụ) là 4 cột Can-Chi của bạn. Mỗi cột là 1 lát cắt thời gian — năm, tháng, ngày, giờ sinh."
- ENTA-aware preview: nếu ENTA + Bazi đã có, show day master + element. Nếu chưa có chart → CTA "Tạo Bazi của bạn"
- 4 navigation tiles: 4 Pillars / Day Master / Useful God / Luck Pillars
- Membership status indicator (subtle, không paywall in-your-face)
- QOT trace icon: tap → audit trail của chart

**UX principles:**
- Calm. Tĩnh. Không animation đập vào mắt.
- Information density vừa phải.
- ENTA color hint nhẹ (theo element của day master sau khi user complete).

**Cấm:**
- "Bazi quyết định cuộc đời bạn" headline (vi phạm L4 + REDLINE 1)
- Score / Rating cho Bazi (vi phạm L11)
- "Mệnh số bạn là..." (vi phạm L4 + REDLINE 3)

## **§2.2 — 4 Pillars Chart**

**Purpose:** Hiển thị 4 trụ Can-Chi gốc.

**Content:**
- 4-column grid: Năm / Tháng / Ngày / Giờ
- Each column: Can (top), Chi (middle), Hidden Stems (bottom expandable)
- Day Master highlighted prominently (it's the **center of analysis**)
- Element color tinting per pillar (Mộc xanh / Hỏa cam / Thổ vàng / Kim bạc / Thủy xanh dương — all muted)
- Tap any pillar → bottom sheet với chi tiết: hidden stems, ten gods, twelve stages

**UX principles:**
- 4 columns layout vertical-first cho mobile, horizontal cho desktop
- Visually distinct from Tử Vi 12-palace grid (Bazi = 4 cột song song, Tử Vi = 12 cung vòng tròn) — user dễ phân biệt 2 module
- Polarity (Dương/Âm) shown as small badge

**Cấm:**
- Animation "lá số rơi từ trời xuống" (vi phạm "không rẻ tiền xem-bói-online")
- "Hung" pillars colored red (vi phạm L4 binary good/bad)
- Sound effects mystical chime

## **§2.3 — Day Master Analysis (Member+)**

**Purpose:** Phân tích Day Master strength + element distribution.

**Content sections:**
- Day Master visualized prominently (e.g., "Bính Hỏa — Thái dương")
- Element distribution radar chart (5 elements với count)
- Day Master Strength gauge: Rất nhược ↔ Cân bằng ↔ Rất vượng
- Seasonal context (mùa sinh vs day master element)
- Plain-language interpretation: "Day master của bạn là Mộc, sinh vào mùa Đông — Thủy mùa sinh ra Mộc, nhưng cùng mùa lạnh nên cần Hỏa cân bằng".

**Each section:**
- 2-3 paragraphs grounded text (per LAW 4: no deterministic, only "xu hướng / cấu trúc")
- Reference back to specific pillar evidence
- "Hỏi AIER Bazi về phần này" CTA
- QOT trace

**Cấm:**
- "Bính Hỏa = lãnh đạo bẩm sinh" (đóng khung nhân cách → REDLINE 4)
- "Day Master nhược = bạn yếu đuối, dễ thất bại" (deterministic + fear → REDLINE 1 + L4)
- Score 1-10 cho Day Master

## **§2.4 — Useful God Reading (Premium)**

**Purpose:** Identify dụng thần (useful god) + provide guidance based on it.

**Content:**
- Useful God identified: primary + secondary
- Reasoning chain: why this element is useful (strength + season + chart distribution)
- "Avoid elements" (kỵ thần) listed
- General guidance: nghề nghiệp phù hợp xu hướng, hướng đi cuộc sống
- Specific examples but always framed as "gợi ý dựa trên cấu trúc"

**UX principles:**
- Useful God element prominently displayed with element icon
- "Cùng Thông" seasonal adjustment if applicable, explained clearly
- Comparison with Day Master: tại sao dụng thần lại khác element với Day Master

**Cấm:**
- "Dụng thần của bạn là X — bạn PHẢI làm Y" (deterministic verdict → REDLINE 3)
- "Không có dụng thần này = thất bại" (fear → REDLINE 1)
- "Mua vật phẩm element X ngay để bổ sung" (upsell exploit → LAW 6)

## **§2.5 — Luck Pillars Timeline (Premium)**

**Purpose:** Đại Vận 10-year cycles visualization.

**Content:**
- Horizontal timeline với decades
- Current Đại Vận highlighted
- Past pillars + future pillars (8 total cycles displayed)
- Each pillar: Can-Chi + age range + element + brief tendency note
- Transition points marked (movement from one pillar to next)

**UX principles:**
- Timeline scrollable horizontally
- "Window" framing: "thời điểm thuận cho X" / "thời đoạn cần cẩn trọng với Y" — KHÔNG "thập niên xui / thập niên may"
- Tap any pillar → detail panel với analysis cho thập niên đó

**Cấm:**
- "Thập niên này bạn sẽ thành công" / "Thập niên này thất bại" (deterministic → L4)
- Countdown to "transition" như fear-event
- Stars/Rating gắn cho từng decade

## **§2.6 — Compatibility Check (Premium)**

**Purpose:** 2-chart relational reading cho cưới hỏi / partnership.

**Content:**
- 2 Bazi profiles side-by-side
- Pillar interaction map: which pillars hợp/khắc/xung/hình giữa 2 charts
- Element complement analysis
- Day Master interaction (most important)
- Overall harmony score ranges: low / medium / high resonance
- Specific recommendations: areas of natural harmony, areas needing attention

**UX principles:**
- 2 charts visualized in mirror layout
- Color-coded interaction lines between pillars
- Reading framed as **relational tendency**, không phải verdict

**Cấm (CRITICAL — REDLINE 4):**
- "Hai chart không hợp — không nên cưới" (deterministic discrimination)
- "Đây là cuộc hôn nhân tuyệt vời / tồi tệ" (verdict)
- Compatibility score "shareable card" để user post lên social bragging "score cao"

---

# **SECTION 3 — PHONG THỦY SURFACES (5 surfaces)**

## **§3.1 — Phong Thủy Overview**

**Purpose:** First entry. Educate + onboard.

**Content:**
- Brief intro: "Phong Thủy nghiên cứu sự tương quan giữa con người và môi trường sống."
- ENTA-aware preview: Cung Mệnh derived from year + gender (basic, free).
- 3 navigation tiles: Bát Trạch Profile / Residence Mapping / Cửu Cung Phi Tinh
- "Bạn chưa có dữ liệu nhà — thêm để xem chi tiết hơn" CTA (optional, user-controlled per LAW 12)
- Membership status

**UX principles:**
- Educational tone first, advisory second
- Privacy-first messaging: explicit về residence data
- ENTA element/polarity shown subtly

**Cấm:**
- "Phong thủy nhà bạn quyết định vận may" (fear → L4)
- Auto-collect location without consent
- "Đặt vật phẩm này ngay" upsell trên Overview

## **§3.2 — Bát Trạch Profile (Member+)**

**Purpose:** 8-house compatibility analysis.

**Content:**
- Cung Mệnh prominently displayed (e.g., "Cung Mệnh: Tốn — Đông Tứ Mệnh")
- 8-direction compass visualization
- 4 favorable directions highlighted (Sinh Khí, Thiên Y, Diên Niên, Phục Vị)
- 4 unfavorable directions noted (Tuyệt Mệnh, Ngũ Quỷ, Lục Sát, Họa Hại)
- Plain explanation per direction: "Hướng Sinh Khí của bạn là Đông Nam — phù hợp cửa chính, vị trí làm việc, hướng giường"

**UX principles:**
- Compass/wheel visualization centered
- Favorable directions: ✓ subtle green tint
- Unfavorable: ⚠ subtle gray tint (NOT red alarm — per LAW 5)
- Tap each direction → detail panel

**Cấm:**
- Red alarm UI cho "hung" directions (vi phạm L5)
- "Hướng Tuyệt Mệnh = chết chóc" (fear → REDLINE 1)
- "Mua la bàn phong thủy ngay" upsell on first view

## **§3.3 — Residence Mapping (Member+)**

**Purpose:** Map user's actual residence onto Bát Trạch directions.

**Content (only when user provides residence data):**
- Residence input form: address + main entrance direction (compass) + floor plan (optional)
- Mapping: bedroom, kitchen, work area → vs user's favorable directions
- Match analysis: which rooms align with which Bát Trạch direction
- Suggestions (gợi ý, không prescription): "Nếu phòng ngủ ở hướng Lục Sát của anh, có thể cân nhắc đổi hướng giường"

**UX principles:**
- Floor plan visualization (basic — full architectural drawing not required)
- Residence data input clearly **opt-in**, with privacy notice
- "Delete residence data" button always visible
- Edit/update anytime

**Privacy UX (per LAW 12):**
- Step 1: explicit consent screen "Tôi đồng ý cung cấp địa chỉ để nhận tư vấn Phong Thủy cá nhân hóa"
- Step 2: explain encryption + deletion right
- Step 3: collect data
- Step 4: confirmation with summary

**Allowed (per v1.1 relaxation):**
- Push notification opt-in về phong thủy nhà với neutral framing (e.g., "Hôm nay Phi Tinh tại phòng ngủ là sao Bát Bạch — supportive trend") — user controls

**Cấm (vẫn áp dụng):**
- Auto-collect address from device location without explicit consent
- Share residence data với external vendors without per-instance consent
- Fear-spam push: "⚠️ PHÒNG NGỦ CỦA BẠN ĐANG GẶP NGUY HIỂM PHI TINH!" (urgency-fear)
- Cross-user residence data leak hoặc bulk export

## **§3.4 — Cửu Cung Phi Tinh (Premium)**

**Purpose:** Flying Stars analysis.

**Content:**
- Period info (current Period 9 — Cửu Tử)
- 9-palace Phi Tinh chart for user's residence (requires construction period + facing direction)
- Annual flying star overlay (current year)
- Monthly flying star overlay (current month, optional)
- Star meanings explained neutrally (Bát Bạch = wealth-supportive trend, Ngũ Hoàng = caution-required area)
- Solution-oriented framing: "Khu vực Ngũ Hoàng có thể được cân bằng bằng vật phẩm Kim hoặc đặt nguồn nước nhẹ"

**UX principles:**
- 9-palace grid visualization
- Layered display (period base + annual + monthly toggleable)
- Star icons + numbers + colors (muted)
- Hover/tap each cell → star meaning + suggestion

**Allowed (per v1.1 relaxation):**
- Marketplace recommendations cho vật phẩm cân bằng — context-grounded (theo Phi Tinh chart của user)
- Daily Phi Tinh widget với booking CTA cho consultation/products

**Cấm (vẫn áp dụng — CRITICAL):**
- Fear language framing: "Ngũ Hoàng tại phòng ngủ — bạn sẽ gặp tai họa!" (REDLINE 1)
- Animation showing Ngũ Hoàng "đến" với threatening visuals (red flashing, thunder rumble)
- Fear-prescription: "Mua ngay vật phẩm giải Ngũ Hoàng nếu không sẽ tai họa!" (urgency-fear)
- Auto-suggest expensive vendor products as primary solution without verified vendor + context
- Recommendation algorithm tuned for conversion rate rather than relevance to user's Phi Tinh

## **§3.5 — AIER Phong Thủy chat (cross-module)**

**Purpose:** Conversational advisory grounded on Phong Thủy profile.

**Behavior:**
- Tap "AIER Phong Thủy" → opens new CHAT thread bound to user's Phong Thủy profile + (optional) residence
- AIER identifies as advisor: "Em là AIER Phong Thủy, em đồng hành cùng anh/chị qua Bát Trạch của anh/chị."
- AIER does NOT generate new Phong Thủy profiles (per LAW 7)
- AIER references Bát Trạch + Phi Tinh in replies (per LAW 10)
- AIER responses framed as advisor (per REDLINE 3)

**Surface hints:**
- AIER Phong Thủy avatar marker (visually distinct from AIER Tử Vi marker)
- "Grounded on Bát Trạch profile [profile_id]" indicator
- "View profile reference" link in messages

**Cấm:**
- AIER speaks as "thầy phong thủy phán quyết" tone (REDLINE 3)
- AIER replies without profile binding (LAW 10)
- AIER pushes vendor products without grounded context (LAW 6)
- AIER references user's specific residence in cross-user contexts (LAW 12)

---

# **SECTION 4 — UI PRINCIPLES (BAZI/PHONG THỦY-specific)**

## **§4.1 — Visual identity differentiation**

| Aspect | Tử Vi (TAO V2) | Bazi (TAO V1) | Phong Thủy (TAO V3) |
|---|---|---|---|
| Primary geometry | 12-palace grid (4×3 / 5×5 ring) | 4 vertical columns | 8-direction compass / 9-palace grid |
| Primary color | Deep indigo | Earthen warm browns + element-tinted | Compass-direction tints (Bắc xanh / Nam đỏ-cam / Đông xanh lá / Tây bạc) |
| Iconography | Star symbols | Stem/Branch glyphs (Han characters acceptable in low contrast) | Trigram symbols + Lo Shu numbers |
| Spatial feel | Cosmic, palace-as-realm | Pillar-as-time-slice | Spatial, ground-as-environment |

**Goal:** User vào TAO module phải biết đang ở Tử Vi vs Bazi vs Phong Thủy ngay lập tức từ visual.

## **§4.2 — Tone of voice**

- Same warm Vietnamese formal tone (em / anh / chị) như Tử Vi
- Bazi: more analytical, structural language
- Phong Thủy: more environmental, relational language
- Avoid all forms of mystical, fortune-telling tone

## **§4.3 — ENTA awareness**

- TAO V1 surfaces use Day Master element as primary color
- TAO V3 surfaces use Cung Mệnh element + direction
- AIER advisor sessions bound by ENTA + chart/profile

## **§4.4 — Membership transparency**

- Free tier always có meaningful preview/sample
- "Unlock with Premium" CTA polite, không pressure
- Per per UZG+ Master UI/UX: "identity precedes capability" but capability is not hidden

## **§4.5 — QOT integration**

- Every Bazi chart + Phong Thủy profile has QOT trace icon
- Tap → provenance sheet: algorithm version, source authority, calculation log, audit status
- Per UZG+ Master UI/UX: "Mọi post/message value-bearing phải có QOT icon"

## **§4.6 — Privacy badges (TAO V3-specific)**

For Phong Thủy surfaces involving residence:
- 🔒 lock icon next to residence data display
- "Dữ liệu nhà của bạn — chỉ bạn xem được" tooltip
- Quick "Edit" + "Delete" buttons always visible
- Last accessed timestamp visible

---

# **SECTION 5 — INTERACTION PATTERNS**

## **§5.1 — First-time Bazi user flow**

```
PLUS Hub → TAO mini app → Bazi tab
  ↓
Overview (no chart yet) → "Tạo Bazi" CTA
  ↓
Input form (or auto-fill from ENTA)
  ↓
Bazi computation (calm spinner, không "magical")
  ↓
4 Pillars Chart (first reveal — clean, không animation flash)
  ↓
"Khám phá thêm" CTAs to Day Master / Useful God / Luck Pillars
```

## **§5.2 — First-time Phong Thủy user flow (no residence)**

```
PLUS Hub → TAO mini app → Phong Thủy tab
  ↓
Overview → Cung Mệnh derivation (auto from year+gender)
  ↓
Bát Trạch Profile shown (basic, free)
  ↓
Optional: "Thêm thông tin nhà để xem chi tiết hơn" CTA
  ↓
[If user opts-in] Privacy consent screen → Residence Mapping form
  ↓
Mapping displayed
```

## **§5.3 — Returning Bazi user flow**

```
PLUS Hub → TAO mini app → Bazi tab
  ↓
Overview (chart exists) → quick stats + 4 nav tiles
  ↓
User picks where to deep-dive
```

## **§5.4 — Compatibility check flow (Premium)**

```
Bazi Overview → "Compatibility Check" CTA
  ↓
"Nhập thông tin của người thứ 2" form
  ↓
[Optional: friend/partner can share via secure link, requires their consent]
  ↓
Compute relational analysis
  ↓
Side-by-side display + interaction lines
```

## **§5.5 — Loading states**

- Calm spinner (single color, không rainbow)
- Loading text neutral: "Đang tính 4 trụ..." / "Đang phân tích Bát Trạch..."
- KHÔNG: "Đang khám phá vận mệnh..." (mystical → REDLINE 2)

## **§5.6 — Error states**

- Missing data: clear explanation what's needed, không shame
- Engine error: "Có lỗi tính toán. Anh/chị thử lại hoặc liên hệ support." — KHÔNG "Phong thủy chặn..."
- Network error: standard offline indicator

## **§5.7 — Empty states**

- No Bazi yet: explain Bazi briefly + CTA tạo chart
- No residence yet (Phong Thủy): explain benefit of adding + privacy reassurance + opt-in CTA

---

# **SECTION 6 — REDLINE COMPLIANCE CHECKLIST (v1.1 relaxed)**

Pre-publish review gate. UI/UX changes ship only after PASS:

**Hard checks (always banned):**

Bazi-specific:
- [ ] No deterministic Bazi language ("Mệnh số bạn là...", "Bính Hỏa = lãnh đạo")
- [ ] No abusive fear-trigger UX (red flashing alarms for "hung" elements, threatening countdowns)
- [ ] No predatory clickbait copy ("BAZI BÍ ẨN TIẾT LỘ...", "BẠN SẼ KHÔNG TIN ĐƯỢC...")
- [ ] No "thầy phán" tone in AIER Bazi
- [ ] Day Master shown analytically, not as personality verdict
- [ ] Compatibility check framed as **relational tendency**, not "should/shouldn't marry" verdict
- [ ] Useful God presented as suggestion, not absolute prescription

Phong Thủy-specific:
- [ ] No abusive fear UI for "hung" directions/stars (no red flashing for Ngũ Hoàng)
- [ ] No fear-narrative product upsell ("Mua ngay nếu không sẽ tai họa")
- [ ] Residence data collection requires explicit user consent (Step 1-4 flow)
- [ ] "Delete residence" always accessible
- [ ] Encryption-at-rest mentioned in privacy notice
- [ ] Solution-oriented framing for "hung" stars (cân bằng, điều hòa)

Common:
- [ ] AIER session always grounded on chart_id / profile_id
- [ ] No discrimination based on Bazi/cung mệnh
- [ ] No fear-conversion exploit
- [ ] No bait-and-switch upsell

**Soft checks (allowed when done right):**
- [x] Daily widget HOME hiển thị Bazi-aware day energy + Phi Tinh — OK với neutral framing
- [x] Push notification opt-in về ngày hợp/khắc — OK với user controls
- [x] Marketplace recommendations contextual to Phi Tinh chart — OK với verified vendors
- [x] Booking CTA cho consultation in Lịch Vạn Niên context — OK
- [x] Cultural mystical aesthetic in visualization — OK (truyền thống Á Đông)
- [ ] QOT trace visible on every reading
- [ ] Membership gates polite, not paywall-aggressive
- [ ] ENTA color awareness present, not overload
- [ ] Visual identity distinct from Tử Vi (so user can tell which module they're in)

---

# **SECTION 7 — ACCESSIBILITY & I18N**

## **§7.1 — Accessibility**

- All icons have text alternatives
- Color is never the only signal (icon + label)
- Screen reader: announce "Day Master Bính Hỏa, Cung Mệnh Tốn" properly
- Keyboard navigation full support
- Min font size 14px, scalable to 200%

## **§7.2 — Internationalization**

**Phase 1 (launch):** Vietnamese only.

**Phase 2:** English (with traditional terms preserved):
- "Bazi" → "Bazi (Four Pillars of Destiny)"
- "Day Master" → already English
- "Bát Trạch" → "Bát Trạch (8-house compatibility)"
- "Cửu Cung Phi Tinh" → "Cửu Cung Phi Tinh (9-Palace Flying Stars)"

**Phase 3:** Simplified Chinese (八字 / 八宅 / 飛星) for diaspora users.

Cultural framing line: "*Bazi và Phong Thủy là tri thức cấu trúc Á Đông được nghiên cứu hàng ngàn năm. UZG+ trình bày để bạn tự hiểu cấu trúc của mình + môi trường sống.*"

---

# **SECTION 8 — CROSS-MODULE COHESION**

## **§8.1 — Tử Vi ↔ Bazi visual differentiation**

User mở TAO module phải phân biệt rõ Tử Vi vs Bazi (cùng analyze birth data nhưng khác structure):

- Tử Vi: 12-palace circular grid + indigo + cosmic feel
- Bazi: 4 vertical pillars + earthen warmth + structural feel

UI shouldn't blur 2 modules. Confusion → user thinks they're getting same reading twice.

## **§8.2 — Bazi ↔ Phong Thủy navigation**

Within TAO module, Bazi và Phong Thủy share:
- Cung Mệnh (derived from year+gender, common)
- Element (Bazi day master upgrades Phong Thủy element awareness)
- AIER advisor type (single AIER instance can speak both contexts)

UI should show this connection — when user views Bazi Overview, surface "Phong Thủy of you" hint as related discovery.

## **§8.3 — Lịch Vạn Niên integration UI**

Lịch Vạn Niên Daily Detail shows enhanced match when user has Bazi:
- "Theo ENTA: hợp Mộc của anh" (basic, free)
- "Theo Bazi: dụng thần Mộc của anh + ngày-trụ tương sinh" (Premium, with Bazi profile)

UI should make Premium upgrade path clear when user has Bazi but is browsing Lịch.

---

# **AMENDMENT RULE**

UI/UX amendments require:
1. Proposal as `TAO_BAZI_UI_UX_CANON_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Cannot contradict TAO Canon, `TAO_BAZI_SYSTEM_LAW_v1`, or UZG+ Master UI/UX Canon
4. Cannot violate any of 5 redlines (auto-block at review gate)
5. Old version archived

---

---

# **VERSION LOG**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-29 | Initial — UI/UX surfaces for TAO V1 + V3 (11 surfaces) |
| v1.1 | 2026-04-29 | NTS fear-UX relaxation (per Vạn Niên + TAO module-wide decision): §1.1 entry-points cấm bullets reframed (info-layer + lookup OK, abusive fear-trigger banned). §2.5 Residence Mapping push notification now allowed with consent + neutral framing. §3.4 Phi Tinh marketplace recommendations now allowed with context. §6 Redline checklist split into hard checks (always banned) vs soft checks (allowed when done right). Cross-reference với UZGPLUS_VANNIEN_CALENDAR_SPEC §5 (push notification policy) + §6 (booking integration) + TAO_BAZI_SYSTEM_LAW v1.2. |

---

# **SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.1 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ awaiting | — |
| Effective | — | ⏳ pending TAO V1 build phase | — |

**END — TAO_BAZI_UI_UX_CANON_v1**
