# UZG+ V3 PWA OS — WALLET MODULE CANON

**Document ID:** `UZG_PLUS_V3_UIUX_WALLET_CANON_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 4 (Module-specific, governed by Foundation OS Canon Tier 3)
**Module:** WALLET (Bottom Nav position #4)
**Inspiration shell:** Binance / fintech wallet (clean balance + flow), KHÔNG phải crypto trading
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1` ← MUST read first
- Tier 3: `UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1`
- Tier 3: `UZG_PLUS_UIUX_COMPONENT_LIBRARY_SPEC_v1`
- Tier 2: MASTER_ECONOMY_CANON, HUMAN_VALUE_CANON

**Companion canons:** HOME, CHAT, PLUS Hub, ENTA, U-Reward, TAO, REDLINES_MASTER

---

## §0 PURPOSE

Khóa UI/UX cho **WALLET shell** — Value Operating System Layer của UZG+. WALLET inherit Binance-style wallet pattern (clean balance overview, flow-based actions, asset list) NHƯNG bỏ hoàn toàn crypto trading trap (KHÔNG chart giá, KHÔNG order book, KHÔNG pump/dump UI).

WALLET KHÔNG phải nơi giữ tiền. WALLET là nơi value được **ghi nhận, chuyển hóa, sử dụng đúng luật**.

**Quan trọng:** File này CHỈ describe nội dung WALLET shell. 4 phần cố định (Bottom Nav, Top Bar Avatar, Floating +, U-Reward pill) đã spec trong Foundation Canon — không lặp lại.

---

## §1 ĐỊNH NGHĨA

### §1.1 Câu định nghĩa official

**WALLET = Value Flow Engine của UZG+ OS. WALLET shell theo fintech-clean pattern (giống Binance balance UI nhưng bỏ trading), tổ chức 4 lớp tài sản (U / UZG / Credit / AIFI) với conversion-based actions thay vì trading. WALLET reveal value flow của user — KHÔNG fetishize số dư, KHÔNG biến balance thành authority.**

### §1.2 4 câu khóa

**1. Wallet = Value Flow Engine, KHÔNG phải Storage / Bank / Crypto Exchange.**
**2. Credit = Monetary Layer chuẩn hóa theo tiền quốc gia (USDc/VNDc/AEDc).**
**3. Exchange = Conversion System (1 chiều sang 1 chiều), KHÔNG phải Trading System.**
**4. Economy = Constraint, KHÔNG bao giờ là Authority.**

### §1.3 Vào WALLET thấy gì

Khi user tap WALLET bottom nav:
- Module trước unmount
- WALLET shell mount (slide in 200ms)
- Top Bar title: "Wallet"
- Floating + Button context: "Giao dịch mới"
- Bottom Nav stays (WALLET active)
- U-Reward pill stays (visible but separate from main wallet display)
- Main canvas = Wallet Overview

KHÔNG thấy: HOME feed, CHAT messages, ENTA wheel.

### §1.4 Khác biệt với Binance/Crypto wallet

| Binance | UZG+ WALLET |
|---|---|
| Trading platform | Value flow engine |
| Chart giá pump/dump | KHÔNG có chart |
| Order book / Depth | KHÔNG |
| Trade / Profit / Gain | Convert / Use / Experience |
| Coin list | 4 layered assets (U/UZG/Credit/AIFI) |
| Speculation | Constraint-based usage |
| Buy/Sell | Convert/Use |
| Market price volatile | Dynamic rate (sourced + timestamped) |
| 1000+ tokens | Limited assets per canon |

---

## §2 SHELL ARCHITECTURE — WALLET

### §2.1 Vào WALLET thấy gì

```
┌─────────────────────────────────────┐
│ [Avatar]  Wallet      [📊] [⚙️]    │  ← PHẦN 2 Top Bar
│                          ┌────────┐ │
│                          │⚡U:1250│ │  ← PHẦN 4 U-Reward pill
│                          └────────┘ │
├─────────────────────────────────────┤
│                                     │
│   Total Value                       │
│   $1,847.50                         │  ← Total (in USDc base)
│   ≈ ₫45,267,500                     │
│                                     │
│  ─────────────────────────────────  │
│  [Tabs: Overview | Credit | U+UZG | History]
│  ─────────────────────────────────  │
│                                     │
│   💰 Credit (Monetary)              │
│   ┌───────────────────────────────┐ │
│   │ USDc      $120.50              │ │
│   │ VNDc      ₫2,800,000           │ │
│   │ AEDc      د.إ300               │ │
│   └───────────────────────────────┘ │
│                                     │
│   ⚡ U + UZG (Utility)              │
│   ┌───────────────────────────────┐ │
│   │ U         1,250 ⚡             │ │
│   │ UZG       450 utility units    │ │
│   └───────────────────────────────┘ │
│                                     │
│   Quick Actions                     │
│   ┌─────┐ ┌─────┐ ┌─────┐          │
│   │ ⇄   │ │ →   │ │ ⚡  │          │
│   │Conv │ │Use  │ │ Earn│          │
│   └─────┘ └─────┘ └─────┘          │
│                                     │
│   Recent Activity                   │
│   ─ +5 U from post (2h ago)         │
│   ─ -10 USDc booking (yesterday)    │
│   ─ Convert 100 U → 1 UZG (2d)      │
│                                     │
│                              ┌───┐  │
│                              │ + │  │  ← PHẦN 3 Floating +
│                              └───┘  │
├─────────────────────────────────────┤
│  HOME  CHAT  [UZG+]  WALLET  ENTA  │  ← PHẦN 1 Bottom Nav
└─────────────────────────────────────┘
```

### §2.2 Module-specific elements

**Top Bar context:**
- Title: "Wallet"
- Right icons: Stats (📊) + Settings (⚙️)
- Avatar Menu Wallet section: Transaction history / Cards / Spending limits / Receipts

**Floating + Button context:**
- WALLET context = "Giao dịch mới"
- Tap → Action sheet (§7)

**Main canvas:**
- Total value display (top hero)
- Tab navigation (4 tabs)
- Asset balances (grouped by layer)
- Quick actions
- Recent activity

---

## §3 4 LỚP TÀI SẢN — KHÔNG TRỘN

### §3.1 Asset layers

Per Master Economy Canon, 4 layers tách biệt:

| Layer | Role | UI display | User interaction |
|---|---|---|---|
| **U** | Contribution Energy | Signal/điểm năng lượng | Earn (auto), Convert to UZG |
| **UZG** | Utility Layer | Utility units | Use cho service, Convert to/from |
| **Credit** | Monetary Layer | National currency standard | Buy/Use/Convert |
| **AIFI** | AI economic layer | Hidden default | Advanced users only |

### §3.2 Hiển thị mặc định

Default user Wallet:
- **Credit balances** (USDc, VNDc, AEDc) — top section
- **U + UZG balances** — second section
- **AIFI** — hidden, advanced toggle để show

Lý do: User cần focus monetary value (Credit) và utility (U/UZG). AIFI là background economic layer.

### §3.3 Layer rules — KHÔNG trộn

CẤM:
- Mix U + UZG + Credit trong 1 balance display tổng (vì khác nature)
- Convert thẳng U → Credit (phải qua UZG)
- Hiển thị U như money (U là energy signal)

PHẢI:
- Tách rõ 3 sections: Credit / U + UZG / (advanced) AIFI
- Conversion path explicit:
  - U → UZG (dynamic rate)
  - UZG → Credit (specific rate)
  - Credit ↔ Credit (exchange rate)
  - Credit → UZG (purchase rate)

---

## §4 CREDIT SYSTEM

### §4.1 Credit là gì

**Credit = Monetary Value Layer chuẩn hóa theo tiền tệ quốc gia.**

| USD thật | USD Credit (USDc) |
|---|---|
| Tiền ngoài đời | Tiền trong hệ |
| Ngân hàng | Wallet |
| Không trace | Trace đầy đủ (QOT) |

### §4.2 Naming convention (LOCKED)

| Full name | Ticker |
|---|---|
| USD Credit | **USDc** |
| VND Credit | **VNDc** |
| AED Credit | **AEDc** |

Quy tắc:
- Full name + Ticker hiển thị song song trong UI
- KHÔNG dùng raw code (`USD_Credit` ❌)
- Format số: theo tiền quốc gia
  - USDc: `$120.50`
  - VNDc: `₫2,800,000`
  - AEDc: `د.إ300`

### §4.3 Core Credit launch (Phase 1)

V3 launch với 2-3 Credit:
1. **USDc** (USD Credit) — chuẩn hệ
2. **VNDc** (VND Credit) — Việt Nam users
3. **AEDc** (optional) — UAE/quốc tế

Future: thêm EURc, SGDc, etc. theo market expansion.

### §4.4 Credit UI display

```
┌─────────────────────────────────────┐
│ 💰 Credit (Monetary)                │
│  ─────────────────────────────────  │
│  USD Credit (USDc)         $120.50  │
│  VND Credit (VNDc)     ₫2,800,000   │
│  AED Credit (AEDc)         د.إ300   │
│                                     │
│  Total ≈ $234.50 USDc base          │
└─────────────────────────────────────┘
```

Tap any Credit → Asset Detail screen (§5).

---

## §5 ASSET DETAIL SCREEN

### §5.1 Tap asset → Asset Detail

Tap any asset (USDc, U, UZG, etc.) → mở Asset Detail full-screen.

```
┌─────────────────────────────────────┐
│ [←]  USD Credit (USDc)    [⚙️]     │
├─────────────────────────────────────┤
│                                     │
│   Balance                           │
│   $120.50                           │
│   ≈ ₫2,946,225                      │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   Quick Actions                     │
│   ┌─────┐ ┌─────┐ ┌─────┐          │
│   │ +   │ │ ⇄   │ │ →   │          │
│   │ Add │ │Conv │ │Send │          │
│   └─────┘ └─────┘ └─────┘          │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   Recent transactions               │
│   ─ -10 USDc booking (yesterday)    │
│   ─ +50 USDc deposit (3d)           │
│   ─ -5 USDc convert to VNDc (1w)    │
│                                     │
│   [View all transactions →]         │
│                                     │
└─────────────────────────────────────┘
```

### §5.2 KHÔNG có chart giá

CẤM tuyệt đối:
- Price chart (giá theo thời gian)
- Pump/dump green/red bars
- Volume chart
- Market depth
- "1D / 1W / 1M / 1Y" period selector cho price

PHẢI:
- Balance lớn (hero)
- Equivalent values (in USDc base)
- Recent transactions list
- Quick actions

### §5.3 Asset metadata visible

Cho mỗi asset:
- Full name + ticker
- Current balance
- Equivalent in USDc (or other Credit)
- Last update timestamp
- Trust source (where rate comes from)

KHÔNG visible:
- "24h change %"
- "7-day high/low"
- Holders count
- Market cap

---

## §6 EXCHANGE / CONVERSION SYSTEM

### §6.1 Exchange = Conversion, KHÔNG phải Trading

**Exchange trong UZG+ là 1-way conversion theo published rate, KHÔNG phải market making.**

KHÔNG:
- Order book
- Bid/Ask spread
- Limit orders
- Market orders
- Stop loss
- Speculation

PHẢI:
- Select source asset
- Select target asset
- Enter amount
- See published rate
- Confirm conversion
- Done (instant or near-instant)

### §6.2 Exchange types

**Type 1: Credit ↔ Credit**

Ví dụ:
- USDc → VNDc (rate: 1 USDc = 24,500 VNDc)
- VNDc → USDc (reverse)
- USDc → AEDc (rate: 1 USDc = 3.67 AEDc)

**Type 2: Credit → UZG**

User mua UZG bằng Credit để dùng dịch vụ.
- Rate: published per period (e.g. 1 UZG = $0.10 USDc)

**Type 3: U → UZG**

Earn U from contribution → convert to UZG để spend.
- Rate: dynamic (e.g. 100 U = 1 UZG, varies)

**Type 4: UZG → Credit**

User cash out utility back to monetary (limited, gated).
- Rate: published, may có fee
- Restrictions: Builder tier+ only, daily limit

### §6.3 Exchange UI

Tap "Convert" action → mở Exchange Panel.

```
┌─────────────────────────────────────┐
│ [←]  Convert                  [⚙️] │
├─────────────────────────────────────┤
│                                     │
│   From                              │
│   ┌───────────────────────────────┐ │
│   │ USD Credit (USDc)              │ │
│   │                                │ │
│   │ Amount:  10                    │ │
│   │ Available: $120.50             │ │
│   └───────────────────────────────┘ │
│                                     │
│         ⇣ Rate                      │
│   1 USDc = 24,500 VNDc              │
│   Source: ECB · 2026-04-30 10:24    │
│                                     │
│   To                                │
│   ┌───────────────────────────────┐ │
│   │ VND Credit (VNDc)              │ │
│   │                                │ │
│   │ Receive: ₫245,000              │ │
│   └───────────────────────────────┘ │
│                                     │
│  ─────────────────────────────────  │
│   Conversion fee: 0.5% (₫1,225)     │
│   You receive: ₫243,775             │
│                                     │
│   [Preview]    [Confirm Convert]    │
│                                     │
└─────────────────────────────────────┘
```

### §6.4 Exchange flow

```
1. Tap "Convert" action
2. Select source asset (default: highest balance)
3. Select target asset
4. Enter amount (or "Max" button)
5. Preview shows: rate, fee, final receive
6. Confirm → loading 1-2s
7. Success: balances update, animation
8. Receipt: "Converted X to Y at rate Z"
```

### §6.5 Rate rules

**MUST:**
- Dynamic rate (real-time fetched)
- Source explicit (ECB, OANDA, internal pool, etc.)
- Timestamp visible
- Fee transparent

**CẤM:**
- Fixed fake rate
- User-set rate
- Speculation
- Hidden fees
- Slippage gambling

---

## §7 FLOATING + BUTTON — TRANSACTION ACTIONS

### §7.1 Tap Floating + → Action sheet

WALLET context (Foundation PHẦN 3):

```
┌─────────────────────────────────────┐
│   New Transaction                   │
│  ─────────────────────────────────  │
│                                     │
│   ⇄  Convert                        │
│      Between assets                 │
│                                     │
│   →  Send                           │
│      To another user                │
│                                     │
│   ⬇  Receive                        │
│      Generate payment link          │
│                                     │
│   +  Add funds                      │
│      Deposit USDc/VNDc              │
│                                     │
│   💎 Buy UZG                         │
│      With Credit                    │
│                                     │
│   ⚡ Earn U                          │
│      Open U-Reward                  │
│                                     │
│  ─────────────────────────────────  │
│   [Cancel]                          │
└─────────────────────────────────────┘
```

### §7.2 Action descriptions

**Convert:** Open Exchange Panel (§6.3)

**Send:** Send Credit/UZG to another user
- Search recipient (name/handle)
- Enter amount
- Optional: message + QOT context
- Confirm

**Receive:** Generate payment link
- Select asset to receive
- Enter expected amount (optional)
- Generate link (QR code + URL)
- Share via CHAT or copy

**Add funds:** Deposit Credit
- Select Credit type (USDc/VNDc/AEDc)
- Choose method:
  - Bank transfer
  - Credit card
  - Crypto (advanced)
- Confirm + complete external

**Buy UZG:** Purchase UZG with Credit
- Select source Credit
- Enter amount
- Preview rate + UZG receive
- Confirm

**Earn U:** Open U-Reward mini app (per U-Reward canon)

---

## §8 TRANSACTION HISTORY

### §8.1 History tab

Tap "History" tab in Wallet → mở Transaction History.

```
┌─────────────────────────────────────┐
│ [Avatar]  History     [🔍] [📅]    │
├─────────────────────────────────────┤
│                                     │
│   Filter: All | Credit | U+UZG | Convert
│                                     │
│   Today                             │
│   ─────────────────────────────────  │
│   +5 U                              │
│   Post contribution · Garden Bay    │
│   10:24 · [QOT 🔍]                  │
│   ─────────────────────────────────  │
│   -10 USDc                          │
│   Booking · Garden Bay Spa          │
│   09:00 · [Receipt →]               │
│                                     │
│   Yesterday                         │
│   ─────────────────────────────────  │
│   +50 USDc                          │
│   Deposit from Bank · Verified      │
│   18:30                             │
│   ─────────────────────────────────  │
│   Convert 100 U → 1 UZG             │
│   Rate: 100:1 · Auto                │
│   12:15                             │
│                                     │
│   This week                         │
│   ...                               │
│                                     │
└─────────────────────────────────────┘
```

### §8.2 Transaction item structure

Each transaction shows:
- Direction icon (+/− or ⇄)
- Amount + asset
- Description (purpose)
- Counterparty (if applicable)
- Timestamp
- QOT trace (if value-bearing)
- Status (verified/pending/failed)

### §8.3 Filter & search

Top filter tabs:
- All
- Credit only
- U + UZG only
- Conversions
- Custom date range

Search by: counterparty, description, amount range.

### §8.4 Transaction Detail

Tap any transaction → mở Detail.

```
┌─────────────────────────────────────┐
│ [←]  Transaction Detail             │
├─────────────────────────────────────┤
│                                     │
│   -10.00 USDc                       │
│   Booking confirmation              │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   Counterparty                      │
│   Garden Bay Spa                    │
│   Business Circle                   │
│                                     │
│   Type: Booking payment             │
│   Status: Verified ✓                │
│   Time: 2026-04-30 09:00            │
│                                     │
│   Reference                         │
│   Booking #BK-20260430-001          │
│   Service: Mộc Retreat (May 12-14)  │
│                                     │
│   QOT Trace                         │
│   [View provenance chain →]         │
│                                     │
│   Receipt                           │
│   [Download PDF]  [Share]           │
│                                     │
└─────────────────────────────────────┘
```

---

## §9 STATS + INSIGHTS

### §9.1 Stats icon (Top Bar)

Tap 📊 in Top Bar → mở Wallet Stats overlay.

### §9.2 Stats content

```
┌─────────────────────────────────────┐
│ [✕]  Wallet Insights                │
├─────────────────────────────────────┤
│                                     │
│   This month                        │
│   ─────────────────────────────────  │
│   Earned:    +$245 equivalent       │
│   Spent:     -$180 equivalent       │
│   Convert:   3 transactions         │
│   Net flow:  +$65                   │
│                                     │
│   U Activity                        │
│   ─────────────────────────────────  │
│   Earned this month: 145 U          │
│   Source breakdown:                 │
│   ─ Posts (40%)                     │
│   ─ Connections (30%)               │
│   ─ Bookings (20%)                  │
│   ─ Tasks (10%)                     │
│                                     │
│   Top use                           │
│   ─────────────────────────────────  │
│   ─ Garden Bay Spa (3 bookings)     │
│   ─ Forest Circle Member (renewed)  │
│   ─ TAO Premium (subscription)      │
│                                     │
└─────────────────────────────────────┘
```

KHÔNG hiển thị:
- "Profit/Loss" (KHÔNG có khái niệm)
- "ROI"
- "Portfolio performance"
- "Investment growth"

PHẢI hiển thị:
- Earned vs Spent (neutral framing)
- U source breakdown
- Top used services (where value went back)

---

## §10 STATE LAW — 5 STATES

**§10.1 Loading** — Skeleton balance card, shimmer

**§10.2 Empty** — "Welcome to your Wallet" + "Earn your first U via U-Reward"

**§10.3 Error** — Connection issue indicator, retry path, "Last sync: X ago"

**§10.4 Active** — Default wallet display

**§10.5 Disabled** — Locked features (e.g. cash-out for Explorer tier) → tooltip "Upgrade to Builder for cash-out"

---

## §11 OVERLAY LAYER

### §11.1 Asset Detail (full screen)

Per §5.

### §11.2 Exchange Panel (full screen)

Per §6.3.

### §11.3 Transaction Detail (full screen)

Per §8.4.

### §11.4 Action sheet (Floating +)

Per §7.

### §11.5 Stats overlay (slide-up sheet)

Per §9.2.

### §11.6 Send/Receive flows

Multi-step overlay với progress indicator.

### §11.7 Add funds flow

Multi-step external integration (bank/card/crypto).

---

## §12 MOTION + ANIMATION

### §12.1 Allowed

- Balance update: fade-in new number (200ms)
- Convert success: subtle checkmark (300ms)
- Transaction added: slide-in (200ms)
- Tab switch: instant (no transition)
- Stats overlay: slide-up (240ms)

### §12.2 Forbidden

- ❌ Number "spinning" / counting up (crypto pump feel)
- ❌ Green/red flashing on balance change
- ❌ "Coin spinning" animation
- ❌ Confetti on receive
- ❌ Pump/dump style bars
- ❌ Auto-refresh every second (battery drain + addiction)

### §12.3 Refresh policy

- Manual pull-to-refresh
- Auto-refresh on tab open (1x)
- Background sync every 30s (silent)
- KHÔNG real-time tick like trading apps

---

## §13 REDLINES

### §13.1 CRITICAL

- ❌ Wallet KHÔNG được giống crypto exchange
- ❌ KHÔNG có chart giá pump/dump
- ❌ KHÔNG có order book / depth
- ❌ KHÔNG có "Trade" / "Profit" / "Gain" terminology
- ❌ Credit KHÔNG được trông như token
- ❌ KHÔNG mix U / UZG / Credit balance trộn
- ❌ KHÔNG fake rate / user-set rate
- ❌ KHÔNG speculation UI
- ❌ Balance KHÔNG được trông như authority signal

### §13.2 HIGH

- ❌ KHÔNG real-time price ticking
- ❌ KHÔNG green/red flashing
- ❌ KHÔNG auto-play coin animations
- ❌ KHÔNG hide conversion fees
- ❌ KHÔNG promote upgrading tier qua wallet (use Membership module)
- ❌ KHÔNG show "leaderboard of richest users"

### §13.3 MEDIUM

- ❌ Animation pump/dump
- ❌ Coin spinning
- ❌ Number scrolling effect
- ❌ Desktop sidebar layout
- ❌ Multi-currency comparison chart

---

## §14 CRYPTO TRAP — TRÁNH (CRITICAL)

### §14.1 KHÔNG dùng crypto vocabulary

CẤM từ:
- Trade / Trading
- Profit / Gain / Loss
- Pump / Dump / Moon / Floor
- Bull / Bear
- HODL / Diamond hands
- ROI / Yield / APR
- Whale / Shill
- DeFi (cho user surface, internal OK)
- Tokenomics (user surface, không show)

THAY BẰNG:
- Convert / Exchange
- Earned / Spent
- Value flow / Activity
- Energy / Utility
- Member tier
- Service usage
- Annual fee / Monthly fee

### §14.2 KHÔNG visualize như crypto

CẤM:
- Candlestick charts
- Volume bars
- Order book depth
- Heat maps of "trending coins"
- Leaderboards of "biggest movers"
- "Buy the dip" prompts
- FOMO triggers

PHẢI:
- Clean balance display
- Activity timeline
- Stats grouped by purpose (earned vs spent vs converted)

### §14.3 Constraint visibility (Economy = Constraint)

User PHẢI thấy:
- Daily/monthly limits (where applicable)
- Conversion fees explicit
- Tier-gated actions clear
- "This action requires Builder tier" prompts

KHÔNG hide:
- Hidden fees
- Surprise restrictions
- Sudden limits

---

## §15 ACCESSIBILITY

### §15.1 Screen reader
- Balance read aloud với asset name
- Transactions có ARIA: amount, direction, counterparty, time
- Convert flow accessible step-by-step

### §15.2 Color contrast
- Balance text high contrast
- Direction icons có alternate symbol (not just red/green)
- Transaction status icons có text label

### §15.3 Keyboard navigation
- Tab through transaction list
- Enter to view detail
- C key for convert
- S key for send
- Cmd+R / Ctrl+R refresh

### §15.4 Number formatting
- Localization respect (₫, $, د.إ)
- Thousand separators per locale
- Decimal precision per asset (USDc 2, VNDc 0, U integer)

---

## §16 INTEGRATION VỚI MODULE KHÁC

**§16.1 WALLET → HOME** — Convert/Send action confirmation → toast "Action complete" → return previous module if linked from there.

**§16.2 WALLET → CHAT** — Payment request received → notification → tap → CHAT shell với message thread + payment confirm UI.

**§16.3 WALLET → PLUS** — Tap "Buy UZG" → if needs membership upgrade → PLUS Hub > Membership mini app.

**§16.4 WALLET → ENTA** — Send action → search recipient → defaults to Connections (ENTA-aware).

**§16.5 WALLET → U-Reward** — Tap "Earn U" action → U-Reward mini app full-screen.

**§16.6 WALLET → TAO** — TAO Premium subscription → manage from Wallet (recurring billing visible).

**§16.7 WALLET → AIER** — AIER advisory message contains booking → tap → Wallet pending transaction.

---

## §17 V2 → V3 MIGRATION PATH

### §17.1 V2 current state (per Cursor audit)

- `/wallet`, `/u-earnings`, `/u-system`, `/u-convert`, `/u-convert-history`, `/uzgfi` siblings (Gap G13)
- Disconnected URL structure
- Existing components: WalletPage, WalletMainActionPage, WalletAssetDetailPage, WalletTransactionDetailPage
- UZGFi separate surface
- No clean Credit display
- USDc canon V2 P4 migration done (foundation present)

### §17.2 V3 implementation order

1. **Resolve URL structure** — Group under `/wallet/*`:
   - `/wallet` → main
   - `/wallet/asset/:id` → detail
   - `/wallet/convert` → exchange
   - `/wallet/transactions` → history
   - `/wallet/transaction/:id` → detail
   - `/wallet/uzgfi` → UZGFi (under wallet umbrella)
   - `/wallet/earnings` → renamed from `/u-earnings`
2. **Build WALLET shell** với Foundation 4 phần cố định
3. **Build Total Value hero**
4. **Build asset list** sectioned (Credit / U+UZG)
5. **Build `<AssetCard>` component**
6. **Build Asset Detail screen**
7. **Build Exchange Panel** (Convert UI)
8. **Build Transaction History list + detail**
9. **Build Floating + action sheet**
10. **Build Stats overlay**
11. **Migrate U-Reward integration** (pill in Top Bar đã có per Foundation)
12. **Remove all crypto-styled UI** (charts, coin lists, trading screens)

### §17.3 V3 Phase 2 mockup priorities

| Priority | Mockup |
|---|---|
| 1 | WALLET shell với Total Value + 4-tab nav |
| 2 | Credit balances section (USDc/VNDc/AEDc) |
| 3 | U + UZG balances section |
| 4 | Asset Detail screen (USDc example) |
| 5 | Exchange Panel (USDc → VNDc flow) |
| 6 | Transaction History với filter tabs |
| 7 | Transaction Detail screen |
| 8 | Floating + Action sheet |
| 9 | Stats overlay |
| 10 | Send / Receive flows |

---

## §18 SUCCESS METRICS

WALLET thành công nếu:

**Behavioral signals (good):**
- Convert actions > Trade-style speculation patterns
- U → UZG conversion correlated với service usage
- Credit deposits stable (not boom/bust)
- Transaction history accessed for proof/receipts (not gambling reflexes)
- Users use UZG for services (return to experience)

**Anti-signals (failure):**
- Users requesting "show me chart"
- "When moon" type questions
- Balance refresh frequency > 10x/hour (= addiction)
- Convert thrash patterns (in/out same asset rapidly)
- Users treating U as "investment"
- Cash-out attempts spam (UZG → Credit)

---

## §19 KẾT LUẬN — 5 CÂU KHÓA

**1. WALLET shell = fintech-clean (Binance balance UI, KHÔNG crypto trading).**

**2. 4 lớp tài sản: U / UZG / Credit / AIFI — KHÔNG trộn, conversion path explicit.**

**3. Credit = Monetary (USDc/VNDc/AEDc) — naming locked, ticker + full name song song.**

**4. Exchange = Conversion (1-way, published rate, có fee transparent), KHÔNG phải Trading.**

**5. Wallet = Value Flow Engine — KHÔNG fetishize số dư, balance KHÔNG là authority.**

---

## §20 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized từ Foundation OS + Master Economy Canon + 13 file canon cũ + Cursor V2 audit |

---

🔒 UZG+ V3 PWA OS — WALLET Module Canon v1.0
End of file.
