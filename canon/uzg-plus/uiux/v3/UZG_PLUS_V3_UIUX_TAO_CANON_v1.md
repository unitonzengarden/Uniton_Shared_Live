# UZG+ V3 PWA OS — TAO MODULE CANON

**Document ID:** `UZG_PLUS_V3_UIUX_TAO_CANON_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 4 (Module-specific, governed by Foundation OS Canon Tier 3)
**Module:** TAO Mini App (accessible via PLUS Hub)
**Sub-modules:** Bazi (Tứ Trụ) + Tử Vi Đẩu Số + Phong Thủy
**Inspiration shell:** Custom Á Đông visual (NOT mainstream pattern)
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1`
- Tier 4: `UZG_PLUS_V3_UIUX_PLUS_HUB_CANON_v1` (parent hub)
- Tier 2: IDENTITY_CANON, HUMAN_VALUE_CANON, TRUTH_TRUST_CANON
- Lane_02 references: `TAO_BAZI_UI_UX_CANON_v1.1`, `TAO_ZIWEI_UI_UX_CANON_v1.1`, `TAO_BAZI_SYSTEM_LAW_v1.2`

**Companion canons:** HOME, CHAT, WALLET, ENTA, PLUS Hub, U-Reward, REDLINES_MASTER

---

## §0 PURPOSE

Khóa UI/UX cho **TAO mini app** — wisdom system kết hợp 3 sub-modules: Bazi (Tứ Trụ) + Tử Vi Đẩu Số + Phong Thủy. TAO accessible qua PLUS Hub, full-screen takeover pattern.

TAO là **module nhạy cảm văn hóa cao** — phải tránh fear-UX, mysticism-shock, thầy-phán framing. TAO reveal cấu trúc Á Đông cổ truyền dưới góc nhìn educational + advisory, KHÔNG phải fortune-telling app.

**Quan trọng:** File này tổng hợp 3 Lane_02 canon docs (TAO Bazi UI/UX v1.1, TAO Ziwei UI/UX v1.1, TAO Bazi LAW v1.2) thành 1 unified TAO Module Canon cho UZG+ V3 PWA OS architecture.

---

## §1 ĐỊNH NGHĨA

### §1.1 Câu định nghĩa official

**TAO = Wisdom Module của UZG+ OS — combine Bazi (Tứ Trụ) + Tử Vi Đẩu Số + Phong Thủy. TAO mini app full-screen accessible qua PLUS Hub. TAO reveal cấu trúc Á Đông cổ truyền: identity (Bazi day master), destiny pattern (Tử Vi 12 cung), environment energy (Phong Thủy). TAO KHÔNG phán mệnh, KHÔNG fortune-telling — TAO educational + advisory dưới Human Authority.**

### §1.2 5 câu khóa

**1. TAO = 3 sub-modules (Bazi / Tử Vi / Phong Thủy) — chia rõ visual + scope, share calendar engine + ENTA + AIER.**
**2. Identity precedes interpretation — KHÔNG chart không có ENTA + birth data validated.**
**3. Educational + Advisory framing, KHÔNG thầy-phán fortune-telling.**
**4. AIER Tao = governed advisor, grounded on chart, KHÔNG tự generate new charts.**
**5. Membership gating: Free (overview) → Member (chart) → Premium (advanced readings).**

### §1.3 Vào TAO thấy gì

User entry qua PLUS Hub → tap TAO icon (🔮):
- Mini app full-screen takeover (slide up 320ms)
- 4 phần cố định behavior:
  - Bottom Nav: HIDDEN
  - Top Bar: REPLACED bởi TAO top bar
  - Floating +: HIDDEN
  - U-Reward pill: VISIBLE (TAO không phải U-Reward)
- Landing: TAO Overview với 3 sub-modules tabs

### §1.4 Khác biệt với apps fortune-telling truyền thống

| Fortune-telling app | UZG+ TAO |
|---|---|
| "Xem ngay vận mệnh!" urgency | "Khám phá cấu trúc của bạn" educational |
| Thầy phán "Bạn sẽ..." | Advisor "Theo cấu trúc, có xu hướng..." |
| Daily horoscope spam | Daily widget opt-in, neutral framing |
| Fear-conversion (mua vật phẩm giải hạn ngay!) | Marketplace với context, Member optional |
| Thuyết tử vi 1 size fits all | ENTA-aware personalized |
| Hidden algorithm | QOT trace mọi chart |
| Anonymous reading | Identity-bound (validated birth data) |
| "Bạn 100% sẽ giàu!" claims | "Cấu trúc cho thấy xu hướng X" advisory |

---

## §2 SHELL ARCHITECTURE — TAO MINI APP

### §2.1 Vào TAO thấy gì (Overview)

```
┌─────────────────────────────────────┐
│ [✕]   TAO            [⚙️] [🔍]     │  ← Mini app top bar
├─────────────────────────────────────┤
│                                     │
│   "Tri thức cấu trúc Á Đông"        │  ← Cultural framing
│   "UZG+ trình bày để bạn tự hiểu    │
│    cấu trúc của mình + môi trường"   │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   [Tabs: Bazi | Tử Vi | Phong Thủy] │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   Bazi tab (default - if user has): │
│                                     │
│   Day Master: Mộc (Giáp)            │
│   Element distribution: Mộc 35%...   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  [Mini Chart preview]        │   │
│   │  4 vertical pillars          │   │
│   │  Year · Month · Day · Hour   │   │
│   └─────────────────────────────┘   │
│                                     │
│   [View full chart →]               │
│                                     │
│   ─────────────────────────────────  │
│                                     │
│   Or if no chart yet:                │
│                                     │
│   "Bạn chưa có Bazi chart"          │
│   "Tạo Bazi từ ENTA birth data"      │
│   [Create Bazi chart →]              │
│                                     │
│   ─────────────────────────────────  │
│                                     │
│   Today's wisdom (Lịch Vạn Niên):   │
│   ─ Hôm nay: ngày Bính Thìn         │
│   ─ Theo Bazi: hợp Mộc của bạn      │
│   ─ Phi Tinh: Sao Tứ Lục (Mộc)      │
│                                     │
│   ─────────────────────────────────  │
│                                     │
│   Quick actions                      │
│   [💬 Talk to AIER Tao]             │
│   [📅 View today's calendar]        │
│   [⭕ Compatibility check]          │
│                                     │
└─────────────────────────────────────┘
```

### §2.2 Top bar (mini app replaced)

- **Close (✕)** left — exit mini app, return to PLUS Hub
- **Title "TAO"** center
- **Settings (⚙️)** right
- **Search (🔍)** right — search within TAO content

### §2.3 Cultural framing (top of Overview)

PHẢI hiển thị (per Lane_02 canon):

> "Bazi, Tử Vi và Phong Thủy là tri thức cấu trúc Á Đông được nghiên cứu hàng ngàn năm. UZG+ trình bày để bạn tự hiểu cấu trúc của mình + môi trường sống."

Lý do: prevent users tin TAO là fortune-telling app.

### §2.4 3 sub-module tabs

```
[Bazi] [Tử Vi] [Phong Thủy]
```

Default: Bazi (most foundational + ENTA-related).

User switch tab → load relevant content (mỗi tab có visual identity riêng).

---

## §3 SUB-MODULE 1 — BAZI (TỨ TRỤ)

### §3.1 Visual identity (Bazi)

- **Geometry:** 4 vertical columns (pillars)
- **Color:** Earthen warm browns + element-tinted (per day master element)
- **Iconography:** Stem/Branch glyphs (Han characters acceptable in low contrast)
- **Spatial feel:** Pillar-as-time-slice (Year / Month / Day / Hour)

### §3.2 Bazi surfaces (6 layers)

| # | Surface | Tier | Description |
|---|---|---|---|
| 1 | Bazi Overview | Free | Brief intro + ENTA-aware preview |
| 2 | 4 Pillars Chart | Free | Full chart visualization |
| 3 | Day Master Analysis | Member | Element strength, 10 gods |
| 4 | Useful God Reading | Premium | Advanced — dụng thần |
| 5 | Luck Pillars Timeline | Premium | 10-year cycles ahead/behind |
| 6 | Compatibility Check | Premium | Bazi compatibility với another |

### §3.3 Bazi Overview (Free tier)

```
Bazi của bạn

Day Master: Mộc Dương (Giáp Mộc)
Sinh: 1990-12-15, 12:00, Hà Nội

[Mini chart preview - 4 pillars]
┌──────┬──────┬──────┬──────┐
│ Year │Month │ Day  │ Hour │
│      │      │      │      │
│ Canh │ Mậu  │ Giáp │ Bính │
│ Ngọ  │ Tý   │ Thân │ Tý   │
└──────┴──────┴──────┴──────┘

Brief insight:
"Mộc dominant + Hỏa support → tính 
phát triển + sáng tạo. Cần Thủy và 
Kim cân bằng."

[View full chart →] [Day Master Analysis (Member) →]
```

### §3.4 4 Pillars Chart (Free)

Full visualization của 4 pillars với:
- Each pillar: Heavenly Stem + Earthly Branch
- Hidden Stems beneath each Branch
- Element marking per pillar
- 10 Gods relationships (shown subtly)
- QOT trace icon top-right

Tap any pillar → expand detail sheet.

### §3.5 Day Master Analysis (Member tier)

Detailed analysis:
- Day Master strength (mạnh/trung/yếu)
- Element distribution percentages
- 10 Gods present in chart
- Favorable elements (sơ bộ)
- Element imbalances (cần bổ sung)

### §3.6 Useful God Reading (Premium)

Advanced reading:
- Dụng thần (useful god) determination
- Method used (per `TAO_BAZI_PHONGTHUY_REFERENCE_v1`)
- Recommended elements to strengthen
- Recommended practices/colors/directions
- AIER advisory option

### §3.7 Luck Pillars Timeline (Premium)

10-year cycles visualization:
- Past 30 years (3 pillars)
- Current pillar + sub-pillar
- Next 30 years (3 pillars)
- Major life phase indicators
- KHÔNG predictive claims ("Bạn sẽ giàu vào 2028") — descriptive trends only

### §3.8 Compatibility Check (Premium)

Check Bazi compatibility với another user:
- Both users' Day Masters
- Element relationship (sinh / khắc / hợp)
- Compatibility score (educational, not absolute)
- Recommendations

---

## §4 SUB-MODULE 2 — TỬ VI ĐẨU SỐ

### §4.1 Visual identity (Tử Vi)

- **Geometry:** 12-palace circular grid (4×3 OR 5×5 ring)
- **Color:** Deep indigo + cosmic purple
- **Iconography:** Star symbols (138 stars across 14 main + 6 auxiliary)
- **Spatial feel:** Cosmic, palace-as-realm

### §4.2 Tử Vi surfaces

| # | Surface | Tier | Description |
|---|---|---|---|
| 1 | Tử Vi Overview | Free | Brief intro + Cung Mệnh preview |
| 2 | 12-Palace Chart | Free | Full chart with 14 main stars |
| 3 | Cung Mệnh Reading | Member | Mệnh palace deep dive |
| 4 | Major Palaces | Member | 12 palaces individual readings |
| 5 | Annual / Decade | Premium | Đại vận, lưu niên |
| 6 | Compatibility | Premium | Tử Vi compatibility |

### §4.3 12-Palace Chart visual

```
        ┌────┬────┬────┬────┐
        │Tý  │Sửu │Dần │Mão │
        ├────┼────┼────┼────┤
        │Hợi │ ★  │ ★  │Thìn│
        ├────┤    │    ├────┤
        │Tuất│ ★  │ ★  │Tỵ  │
        ├────┼────┼────┼────┤
        │Dậu │Thân│Mùi │Ngọ │
        └────┴────┴────┴────┘
```

Each palace shows:
- Palace name (Mệnh / Tài / Quan / etc.)
- Stars present (14 main, 6 auxiliary)
- Element resonance
- Tap → palace deep dive

### §4.4 Tử Vi vs Bazi differentiation

User PHẢI phân biệt rõ:
- **Bazi:** 4 pillars vertical, earthen, structural
- **Tử Vi:** 12 palaces circular, indigo, cosmic

UI shouldn't blur 2 modules. Confusion = user nghĩ getting same reading 2 lần.

---

## §5 SUB-MODULE 3 — PHONG THỦY

### §5.1 Visual identity (Phong Thủy)

- **Geometry:** 8-direction compass / 9-palace grid (Lo Shu)
- **Color:** Direction tints (Bắc xanh / Nam đỏ-cam / Đông xanh lá / Tây bạc)
- **Iconography:** Trigram symbols (☰☷☵☲☳☴☶☱) + Lo Shu numbers
- **Spatial feel:** Spatial, ground-as-environment

### §5.2 Phong Thủy surfaces

| # | Surface | Tier | Description |
|---|---|---|---|
| 1 | Phong Thủy Overview | Free | Cung Mệnh preview |
| 2 | Bát Trạch Profile | Member | 8-house compatibility |
| 3 | Residence Mapping | Member | Map your home (consent) |
| 4 | Cửu Cung Phi Tinh | Premium | 9-palace flying stars annual |
| 5 | AIER Phong Thủy chat | Member | Advisory chat |

### §5.3 Cung Mệnh derivation

Cung Mệnh derived từ year + gender (per `TAO_BAZI_PHONGTHUY_REFERENCE_v1`):

```
Your Cung Mệnh: Khôn (Earth)

Bát Trạch type: Tây tứ trạch
Compatible directions: Tây, Tây Nam, Tây Bắc, Đông Bắc
Avoid directions: Đông, Đông Nam, Nam, Bắc

Element: Thổ (Earth)
Color resonance: Vàng, nâu, đất
```

### §5.4 Bát Trạch Profile (Member tier)

8-house compatibility analysis:
- 4 favorable directions:
  - Sinh khí (best)
  - Thiên y (health)
  - Diên niên (relationships)
  - Phục vị (stability)
- 4 unfavorable directions:
  - Tuyệt mệnh
  - Ngũ quỷ
  - Lục sát
  - Hoạ hại

Visual: 8-direction compass với labels, colors per favorable/unfavorable.

### §5.5 Residence Mapping (Member tier, consent-required)

User opt-in cung cấp residence info:
- Home direction (front door faces)
- Bedroom direction
- Office direction (optional)

System maps Bát Trạch onto residence:
- Which direction is favorable for sleep
- Which for work
- Which to avoid for major activities

KHÔNG fear-prescription: "Phòng ngủ của bạn chết người!" — neutral framing only.

### §5.6 Cửu Cung Phi Tinh (Premium)

Annual flying stars analysis:
- Period 9 (Cửu Tử) era awareness (2024-2043)
- Annual star positioning
- Auspicious sectors (Quý nhân, Lộc thần)
- Cautious sectors (Tam Sát, Ngũ Hoàng)

KHÔNG:
- Animation showing Ngũ Hoàng "đến" với threatening visuals
- Fear-prescription: "Mua vật phẩm giải Ngũ Hoàng nếu không sẽ tai họa!"
- Auto-suggest expensive products without verified vendor + context

PHẢI:
- Educational explanation (Period 9 era characteristics)
- Recommendations với context (KHÔNG urgency-fear)
- Marketplace optional với clear vendor + price

---

## §6 AIER TAO — GOVERNED ADVISOR

### §6.1 AIER Tao role

AIER Tao = governed intelligence entity advisory cho TAO domain:
- Bound to user's chart (Bazi / Tử Vi / Phong Thủy)
- KHÔNG generate new charts (per LAW)
- References specific palaces / pillars / Phi Tinh trong replies
- Framed as advisor: "Theo cấu trúc lá số, có xu hướng..." NOT "Số bạn là..."

### §6.2 AIER Tao entry

User invokes AIER Tao via:
- TAO Overview "💬 Talk to AIER Tao" button
- TAO sub-module → "Ask AIER Tao" link
- ENTA tab → "AIER Tao bound to your chart" link
- Direct CHAT shell → AIER Tao thread

When invoked → CHAT shell opens với AIER Tao thread (per CHAT canon).

### §6.3 AIER Tao surface in CHAT

```
[CHAT shell]

[Avatar AIER + "Governed Entity" badge]
AIER Tao
"Em là AIER Tao, em đồng hành cùng anh/chị 
qua cấu trúc lá số đã có."

[Chart reference: chart_id_xxx]

User: "Hôm nay phù hợp khởi sự dự án không?"

AIER Tao: "Theo Bazi của anh, Day Master 
Mộc đang hợp với ngày Mộc hôm nay. Phi 
Tinh số 4 (Mộc) tại Sinh khí của anh. 
Có xu hướng thuận lợi cho khởi sự."

[Inline chart reference link]
```

### §6.4 AIER Tao MUST

- Identify mình rõ at start
- Reference QOT chain trong advice
- Acknowledge limits ("Em là AIER Tao, advice mang tính advisory")
- Handoff to human khi vượt scope (e.g. "Cần thầy phong thủy chuyên sâu cho residence audit")
- Maintain consistent persona

### §6.5 AIER Tao KHÔNG ĐƯỢC

- Pretend là human thầy phong thủy
- Phán mệnh ("Số bạn rất xấu" ❌)
- Push expensive products without context
- Trigger fear ("Hủy ngay kế hoạch, không sẽ chết!" ❌)
- Override Human Authority

---

## §7 LỊCH VẠN NIÊN INTEGRATION

### §7.1 Daily widget (HOME)

Per Lane_02 canon, Lịch Vạn Niên hiển thị daily info trong HOME:

```
Daily widget (HOME stream):

┌─────────────────────────────────────┐
│ Hôm nay: Bính Thìn (Mộc)            │
│  ─────────────────────────────────  │
│  Theo ENTA: hợp Mộc của anh         │ (Free)
│  Theo Bazi: hợp dụng thần Mộc       │ (Member with Bazi profile)
│  Phi Tinh: số 4 tại Sinh khí        │ (Premium with PT profile)
│                                     │
│  [View calendar detail →]           │
└─────────────────────────────────────┘
```

Tap → mở Lịch Vạn Niên detail screen.

### §7.2 Lịch Vạn Niên detail

Detail screen shows:
- Selected date
- Solar / Lunar calendar
- Heavenly Stem + Earthly Branch
- Element of day
- Auspicious / Cautious activities
- Personalized matching:
  - Free: ENTA-only basic
  - Member with Bazi: dụng thần match
  - Premium with PT: Phi Tinh match

### §7.3 Personalization upgrade path

UI clearly shows upgrade path:
- Free user sees basic ENTA match
- "Get more detail with Bazi profile (Member tier)" CTA
- "Get Phi Tinh insights (Premium tier)" CTA

KHÔNG paywall ép buộc — clear value proposition.

### §7.4 Push notification (opt-in)

User can opt-in push notifications:
- "Hôm nay là ngày phù hợp khởi sự" (neutral framing)
- "Today auspicious for important decisions"

KHÔNG:
- "⚠️ KỴ! HỦY MỌI KẾ HOẠCH!" (urgency-fear)
- Auto-push without consent
- Spam fear notifications

---

## §8 MEMBERSHIP GATING

### §8.1 3 tiers

| Tier | Access |
|---|---|
| **Free (Explorer)** | Overview + basic chart + daily widget basic |
| **Member (Seeker / Builder)** | Full Bazi + Tử Vi + Phong Thủy charts, Day Master analysis, Bát Trạch, AIER Tao chat |
| **Premium (Sovereign)** | Useful God, Luck Pillars, Cửu Cung Phi Tinh, Compatibility, advanced AIER advisory |

### §8.2 Gating UX

Tier-locked surfaces show preview + clear upgrade prompt:

```
┌─────────────────────────────────────┐
│ Useful God Reading                  │
│                                     │
│ [Lock icon]                         │
│                                     │
│ "Premium feature"                   │
│ Sees in-depth dụng thần analysis    │
│ + advanced advisory                 │
│                                     │
│ [Upgrade to Sovereign →]            │
│                                     │
│ Or learn more: [Free Day Master →]  │
└─────────────────────────────────────┘
```

KHÔNG aggressive paywall. Always có Free fallback path.

### §8.3 Free tier value

Free user phải có meaningful experience:
- Overview với cultural framing
- Basic chart (without deep analysis)
- Daily widget với ENTA match
- 1-2 sample readings
- AIER Tao limited (3 questions/month)

KHÔNG paywall everything immediately.

---

## §9 STATE LAW — 5 STATES

**§9.1 Loading** — Chart computation: calm spinner (single color, KHÔNG rainbow), text: "Đang tính lá số..." (neutral, KHÔNG "Đang khám phá vận mệnh..." mystical)

**§9.2 Empty** — No chart yet: "Bạn chưa có Bazi chart. Tạo từ ENTA birth data" + CTA

**§9.3 Error** — "Có lỗi tính toán. Thử lại?" + retry button

**§9.4 Active** — Chart rendered, all readings accessible per tier

**§9.5 Disabled** — Tier-locked: lock icon + clear upgrade prompt (no shame)

---

## §10 OVERLAY LAYER

### §10.1 Chart creation wizard

Trigger: "Tạo Bazi chart" CTA when user has no chart yet.

```
Step 1: Confirm birth data
  Birth date: from ENTA (auto-fill)
  Birth time: from ENTA (auto-fill)
  Gender: from ENTA
  Location: from ENTA
  
  [Edit]  [Continue →]

Step 2: Computing... (calm animation, 2-3s)

Step 3: Result reveal
  "Day Master: Mộc Dương (Giáp Mộc)"
  [Brief explanation]
  [View full chart →]
```

### §10.2 Pillar / Palace deep dive sheet

Tap any pillar (Bazi) or palace (Tử Vi):
- Bottom sheet, 70% screen height
- Detail của pillar/palace
- Stars present, hidden stems, gods
- Educational explanation
- Related insights

### §10.3 QOT trace sheet

Per HOME §11.1 — same pattern. Show chart provenance:
- Calculation formula version
- Source authority
- Calculation log
- Audit status

### §10.4 AIER Tao invocation

Tap "Talk to AIER Tao" → CHAT shell opens với AIER thread (cross-module).

### §10.5 Marketplace overlay (optional, with context)

For Phong Thủy products / Bazi consultation booking:
- Vendor verified
- Context explanation: "Recommended based on your Phi Tinh"
- Price + booking CTA
- KHÔNG urgency-fear ("Mua ngay nếu không...")

---

## §11 MOTION + ANIMATION

### §11.1 Allowed motion

- Chart drawing: gradual reveal (1-2s, calm)
- Pillar/palace tap: subtle highlight (200ms)
- Number computation: gentle counter (500ms)
- Tab switch: instant
- Loading: calm single-color spinner

### §11.2 Forbidden motion

- ❌ Magical/mystical animation (sparkles, glows excessive)
- ❌ Animation flashing red alarm cho "hung" days
- ❌ Threatening visuals (Ngũ Hoàng đến với thunder)
- ❌ Dramatic reveals "DỰ ĐOÁN CỦA BẠN..."
- ❌ Confetti khi unlock features
- ❌ Sparkle effects on stars (overdone mystical)

---

## §12 REDLINES (5 HARD REDLINES per Lane_02 canon)

### §12.1 REDLINE 1 — NO FEAR-UX

CẤM tuyệt đối:
- Pop-up "Xem ngay nếu không sẽ tai họa!"
- Notification "⚠️ KỴ! HỦY MỌI KẾ HOẠCH!"
- Countdown threatening to "đại hạn"
- Animation flashing red alarm

### §12.2 REDLINE 2 — NO MYSTICISM-SHOCK

CẤM:
- "Bí mật vận mệnh BẠN SẼ KHÔNG TIN ĐƯỢC..."
- Predatory mystical clickbait
- "Ngày của bạn THỰC SỰ là..."
- Mystical sound effects + dramatic music

### §12.3 REDLINE 3 — NO THẦY-PHÁN FRAMING

CẤM:
- "Số bạn là..." (definitive)
- "Bạn 100% sẽ giàu/nghèo/khổ..."
- Authoritative fortune-telling tone
- AIER speaks như thầy phán

PHẢI dùng:
- "Theo cấu trúc lá số, có xu hướng..."
- "Khả năng cao..."
- Educational + advisory framing

### §12.4 REDLINE 4 — NO DESTINY-DISCRIMINATION

CẤM:
- "Người Bazi này không nên kết hôn với..."
- Categorize users into "good" vs "bad" charts
- Compatibility scores tuyệt đối ("Hai người này KHÔNG hợp")

PHẢI:
- Educational về compatibility patterns
- "Có khía cạnh tương sinh + có khía cạnh cần work on"

### §12.5 REDLINE 5 — NO FEAR-PRESCRIPTION

CẤM:
- "Mua vật phẩm này NGAY để giải hạn!"
- Auto-suggest expensive products without context
- Recommendation algo tuned for conversion rate (over relevance)
- A/B testing fear-copy vs neutral để optimize conversion

PHẢI:
- Marketplace optional với clear context
- Verified vendors only
- Neutral framing

---

## §13 ACCESSIBILITY

### §13.1 Screen reader
- Chart elements ARIA labeled (Vietnamese)
- Han characters announced với Vietnamese pinyin equivalent
- Pillar/palace navigation accessible

### §13.2 Color contrast
- Element colors có alternate symbol (not color alone)
- Direction tints distinguishable in high contrast mode

### §13.3 Cultural sensitivity
- Vietnamese terms primary
- Han characters secondary (with pinyin alt)
- Phase 2: English (preserving traditional terms)
- Phase 3: Simplified Chinese (diaspora users)

### §13.4 Educational tone
- Tooltips explain each term
- "What is Day Master?" learning paths
- Glossary accessible

---

## §14 INTEGRATION VỚI MODULE KHÁC

**§14.1 TAO → ENTA** — Birth data shared bidirectionally. ENTA Identity tab shows "View detailed Bazi reading →" link to TAO.

**§14.2 TAO → CHAT** — AIER Tao invocation → CHAT shell với AIER thread bound to chart.

**§14.3 TAO → HOME** — TAO content cards in HOME (daily widget, insight posts). Daily Vạn Niên widget per §7.

**§14.4 TAO → WALLET** — TAO Premium subscription managed in Wallet (recurring billing). Marketplace purchases (Phong Thủy items) → Wallet transaction.

**§14.5 TAO → PLUS Hub** — TAO icon in PLUS Hub. Booking consultation → Booking mini app cross-link.

**§14.6 TAO → U-Reward** — Earn U for: first chart creation (+10), daily TAO check (+3), premium reading consumed (+15), AIER Tao session (+5).

---

## §15 V2 → V3 MIGRATION PATH

### §15.1 V2 current state

- TAO module concept exists in Lane_02 canon (Bazi + Tử Vi + Phong Thủy)
- Lane_02 canon docs authored (TAO_BAZI_*, TAO_ZIWEI_*)
- V2 implementation NOT yet shipped
- `apps/tao/` directory exists in uzgplus-app per Master Audit
- Calendar engine specs exist (`TAO_LUNAR_CALENDAR_ALGORITHM_v1`)

### §15.2 V3 implementation order

1. **Build TAO mini app shell** (full-screen takeover from PLUS Hub)
2. **Build cultural framing header** (Overview top text)
3. **Build 3-tab navigation** (Bazi / Tử Vi / Phong Thủy)
4. **Implement Calendar engine** (foundational)
5. **Build Bazi sub-module:**
   - Overview
   - 4 Pillars Chart visualization
   - Day Master Analysis (Member)
   - Useful God (Premium)
   - Luck Pillars (Premium)
6. **Build Tử Vi sub-module:**
   - Overview
   - 12-Palace Chart
   - Cung Mệnh Reading (Member)
   - Annual readings (Premium)
7. **Build Phong Thủy sub-module:**
   - Overview với Cung Mệnh
   - Bát Trạch Profile (Member)
   - Residence Mapping (Member)
   - Cửu Cung Phi Tinh (Premium)
8. **Build Lịch Vạn Niên integration**
9. **Build AIER Tao** (CHAT integration)
10. **Build chart creation wizard**
11. **Build pillar/palace deep dive sheets**
12. **Implement membership gating**
13. **Implement 5 redlines compliance gate**
14. **Migrate ENTA birth data flow** to TAO chart input

### §15.3 V3 Phase 2 mockup priorities

| Priority | Mockup |
|---|---|
| 1 | TAO mini app Overview với 3-tab |
| 2 | Bazi 4 Pillars Chart (visual identity) |
| 3 | Tử Vi 12-Palace Chart (visual identity) |
| 4 | Phong Thủy compass (visual identity) |
| 5 | Day Master Analysis surface |
| 6 | Cửu Cung Phi Tinh surface |
| 7 | Chart creation wizard |
| 8 | Pillar deep dive sheet |
| 9 | AIER Tao chat in CHAT module |
| 10 | Lịch Vạn Niên daily widget + detail |
| 11 | Membership gating UX (locked feature with upgrade) |
| 12 | Marketplace context overlay (Phi Tinh recommendation) |

---

## §16 SUCCESS METRICS

TAO thành công nếu:

**Behavioral signals (good):**
- Chart creation rate among ENTA-verified users > 50%
- Daily widget engagement (educational use, not addictive)
- AIER Tao chat sessions với grounded follow-up questions
- Premium upgrade driven by genuine interest (not fear)
- Cultural framing accepted (no complaints "this is fortune telling")

**Anti-signals (failure):**
- Users complain "TAO scared me" (= fear-UX leaked through)
- High bounce rate after chart reveal (= experience too dense)
- Premium conversion < 5% (= value not clear)
- AIER Tao mistaken as fortune-teller (= attribution failure)
- Marketplace conversion driven by fear (= REDLINE 5 leaked)
- Spam reports về fear-notifications (= push notification policy violated)

---

## §17 KẾT LUẬN — 5 CÂU KHÓA

**1. TAO = Wisdom Module = Bazi (Tứ Trụ) + Tử Vi Đẩu Số + Phong Thủy — 1 mini app, 3 sub-modules có visual identity riêng.**

**2. Educational + Advisory framing, KHÔNG fortune-telling. Cultural framing top mọi screen.**

**3. Identity precedes interpretation — KHÔNG chart không có ENTA birth data validated.**

**4. AIER Tao = governed advisor (CHAT integration), grounded on chart, advisor tone KHÔNG thầy-phán.**

**5. 5 REDLINES tuyệt đối: NO fear-UX / NO mysticism-shock / NO thầy-phán / NO destiny-discrimination / NO fear-prescription.**

---

## §18 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized từ Foundation OS + PLUS Hub Canon + Lane_02 canon docs (TAO Bazi UI/UX v1.1, Ziwei UI/UX v1.1, Bazi LAW v1.2) into unified UZG+ V3 module canon |

---

🔒 UZG+ V3 PWA OS — TAO Module Canon v1.0
End of file.
