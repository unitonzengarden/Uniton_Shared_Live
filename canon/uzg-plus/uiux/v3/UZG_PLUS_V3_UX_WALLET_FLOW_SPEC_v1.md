# UZG+ V3 PWA OS — WALLET UX FLOW SPEC

**Document ID:** `UZG_PLUS_V3_UX_WALLET_FLOW_SPEC_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 4 (UX layer — implements WALLET UI canon)
**Module:** WALLET (Bottom Nav position #4)
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1`
- Tier 4: `UZG_PLUS_V3_UIUX_WALLET_CANON_v1`
- Tier 3: `UZG_PLUS_V3_UIUX_REDLINES_MASTER_v1`
- Tier 2: MASTER_ECONOMY_CANON_OFFICIAL_v1_2

**Source evidence:** Cursor V2 audit (G13 disconnected URL structure), Master Economy Canon

---

## §0 PURPOSE

UX layer cho WALLET module — user journeys + state machines + decision points cho Overview / Asset Detail / Exchange / Transaction History / Send / Receive flows. Wallet KHÔNG phải crypto exchange — UX phải reflect Value Flow Engine philosophy.

---

## §1 USER JOURNEY MAP — WALLET LIFECYCLE

### §1.1 Master journey

```
[USER taps WALLET bottom nav]
        ↓
[Module isolation: previous module unmounts]
        ↓
[WALLET shell mount → Overview surface (default)]
        ↓
[Total Value loads + asset balances]
        ↓
[User actions:]
   ├─→ Tab switch (Overview / Credit / U+UZG / History)
   ├─→ Tap asset → Asset Detail
   ├─→ Tap Floating + → Action sheet (Convert/Send/Receive/Add/Buy)
   ├─→ Tap Stats (📊 top bar) → Stats overlay
   ├─→ Tap Transaction → Detail
   └─→ Cross-module exits
```

### §1.2 Journey segments — 8 chính

| # | Segment | Goal | Surfaces |
|---|---|---|---|
| **J1** | Wallet Overview | Check balances | Overview |
| **J2** | View Asset Detail | Drill into asset | Overview → Asset Detail |
| **J3** | Convert (Exchange) | USDc → VNDc / U → UZG | Exchange Panel |
| **J4** | Send | Pay another user | Send flow |
| **J5** | Receive | Generate payment link | Receive flow |
| **J6** | Add Funds | Deposit Credit | Add Funds flow |
| **J7** | Buy UZG | Credit → UZG | Buy UZG flow |
| **J8** | Transaction History | Audit + receipts | History |

---

## §2 ENTRY FLOW (J1) — OVERVIEW LOAD

### §2.1 Wallet load state machine

```
[INITIAL] → [LOADING] → [LOADED] | [ERROR]
                            ↓
                       [REFRESHING] (pull-to-refresh)
                            ↓
                       [LOADED] (steady)
```

### §2.2 Overview load sequence

```
[WALLET shell mount]
      ↓
[Top Bar: "Wallet" + Stats icon + Settings]
      ↓
[Total Value: skeleton]
[Asset cards: skeletons]
[Recent activity: skeletons]
      ↓ ≤1.5s typical
[API: aggregated balances + recent activity]
      ↓
[All sections render]
[Total Value: hero number]
[Credit cards: USDc / VNDc / AEDc]
[U + UZG card]
[Recent activity: 5 latest]
      ↓
[WebSocket subscribe for real-time balance updates]
```

### §2.3 Total Value calculation

```
Total Value = sum of all assets converted to user's primary Credit
            = (USDc balance) + (VNDc / rate) + (AEDc / rate) + (UZG x rate) + (U x rate)

Display:
  Primary: $X.XX (USDc base, default)
  Secondary: ≈ ₫Y,YYY (user's local Credit)

NOTE: U + UZG conversion rate may have constraints (Tier-gated cash-out)
```

### §2.4 Refresh flow

```
[User pulls down]
      ↓ Threshold ~80px
[Spring tension visual]
      ↓ Release
[Refresh dispatched]
      ↓ ≤2s typical
[Balance updates]
[Recent activity refreshes]
      ↓
[Subtle "Updated" toast (1s)]
```

---

## §3 ASSET DETAIL FLOW (J2)

### §3.1 Tap asset → Asset Detail transition

```
[User taps asset card (e.g. USDc)]
      ↓
[Slide transition (300ms)]
      ↓
[Asset Detail full-screen]
      ↓ Load:
   ├─ Balance hero (large)
   ├─ Equivalent values (USDc base + local Credit)
   ├─ Quick actions: Add / Convert / Send
   ├─ Recent transactions filtered to this asset
   └─ Asset metadata (last update, source)
      ↓
[User can]:
   ├─ Tap Quick action → flow trigger
   ├─ Tap transaction → Transaction Detail
   ├─ View all transactions → History (filtered)
   └─ Back arrow → Wallet Overview
```

### §3.2 Asset Detail KHÔNG có

- Price chart over time (Redlines §4.1)
- 24h change %
- Volume / market cap
- Pump/dump indicators

### §3.3 Asset metadata display

```
Asset: USDc
Full name: USD Credit
Balance: $120.50
Equivalent: ≈ ₫2,946,225 VNDc

Last balance update: 2 minutes ago
Rate source: ECB · 2026-04-30 10:24
Trust: Verified ✓
```

---

## §4 CONVERT FLOW (J3) — EXCHANGE PANEL

### §4.1 Convert state machine

```
[CLOSED] → [OPENING] → [OPEN]
                          ↓
                     [SELECTING_FROM] (asset picker)
                          ↓
                     [SELECTING_TO] (asset picker)
                          ↓
                     [ENTERING_AMOUNT]
                          ↓
                     [PREVIEW] (rate + fee shown)
                          ↓
                     [CONFIRMING] (final review)
                          ↓
                     [SUBMITTING] → [SUCCESS] | [ERROR]
                          ↓
                     [CLOSED] (return to source surface)
```

### §4.2 Convert lifecycle

```
[User taps Convert action]
   (from Floating + OR Asset Detail OR Quick Action)
      ↓
[Exchange Panel opens (full-screen)]
      ↓
[Default state]:
   ├─ From: highest balance asset (auto-selected)
   ├─ To: empty (user must select)
   └─ Amount: 0
      ↓
[User selects "To" asset]
      ↓
[Rate fetched + displayed]
[Format: "1 USDc = 24,500 VNDc"]
[Source: "ECB · 2026-04-30 10:24"]
      ↓
[User enters amount]
   ├─ "Max" button to use full balance
   └─ Live calculation: receive amount updates
      ↓
[Preview]:
   ├─ Conversion fee (e.g. 0.5%)
   ├─ Final receive amount (after fee)
   └─ "[Preview]" button reveals expandable detail
      ↓
[User taps "Confirm Convert"]
      ↓
[Loading 1-2s typical]
      ↓
[Success]:
   ├─ Animation: subtle checkmark (300ms)
   ├─ Balances updated (both sides)
   ├─ Receipt: "Converted $10 USDc to ₫245,000 VNDc"
   └─ Auto-return to source surface (Overview)
   
[Error]:
   ├─ Banner: "Conversion failed: <reason>"
   ├─ Retry button
   └─ User can edit + retry
```

### §4.3 Convert types matrix

| From | To | Rate Source | Fee | Restrictions |
|---|---|---|---|---|
| USDc | VNDc | ECB / OANDA | 0.5% | None |
| VNDc | USDc | ECB / OANDA | 0.5% | None |
| USDc | AEDc | ECB | 0.5% | None |
| Credit | UZG | UZG+ pricing | 0% | None |
| U | UZG | Dynamic UZG+ | 0% | None |
| UZG | Credit | UZG+ pricing | 1% | Builder tier+, daily limit |
| UZG | U | NOT ALLOWED | — | Reverse conversion blocked |

### §4.4 Validation gates

**Gate 1: Sufficient balance**
- Amount ≤ available balance
- Helper: "Insufficient balance"

**Gate 2: Within daily limit**
- For UZG → Credit cash-out
- Daily limit varies by tier
- Helper: "Exceeds daily limit. Try smaller amount."

**Gate 3: Amount > minimum**
- Some conversions have minimum (e.g. $1 USDc)
- Helper: "Minimum amount: $1"

**Gate 4: Rate freshness**
- Rate must be < 5 min old
- Stale rate → re-fetch + show updated rate
- IF user already saw stale rate → confirm re-show with new

### §4.5 Convert edge cases

**Rate changes during convert:**
- Re-fetch rate at confirm
- IF rate moved > 1% → show "Rate changed. Confirm new rate?"
- User accepts new rate or cancels

**Conversion partially succeeds:**
- E.g. server processes but balance update lags
- Wallet shows "Pending" status temporarily
- WebSocket reconciles within 30s
- IF persists > 5min → manual sync option

---

## §5 SEND FLOW (J4)

### §5.1 Send state machine

```
[CLOSED] → [SELECT_RECIPIENT]
                ↓
            [SELECT_AMOUNT]
                ↓
            [SELECT_ASSET] (auto if Detail entry)
                ↓
            [OPTIONAL_MESSAGE] (with QOT context)
                ↓
            [PREVIEW]
                ↓
            [CONFIRMING]
                ↓
            [SUBMITTING] → [SUCCESS] | [ERROR]
```

### §5.2 Send lifecycle

```
[User taps Send action]
      ↓
[Send overlay opens (full-screen)]
      ↓
[Step 1: Select Recipient]
   ├─ Search (by handle/name)
   ├─ Recent recipients (suggestions)
   ├─ Connections list (default)
   └─ Tap user → next step
      ↓
[Step 2: Select Asset + Amount]
   ├─ Asset picker (default: USDc OR per Detail entry)
   ├─ Amount input
   ├─ "Max" button
   └─ Live conversion to recipient's primary Credit shown
      ↓
[Step 3: Optional message + QOT context]
   ├─ Text message (max 200 chars)
   ├─ QOT context: Own / Reference / Quote
   └─ Skip OR Add
      ↓
[Step 4: Preview]
   ├─ Recipient avatar + name
   ├─ Asset + amount
   ├─ Fee (if any)
   ├─ Total deducted
   └─ "Confirm" button
      ↓
[Loading 1-2s]
      ↓
[Success]:
   ├─ Animation: success
   ├─ Confirmation message
   ├─ Receipt + share option
   └─ Return to Overview
   
[Error]:
   ├─ Banner with reason
   ├─ Retry / Edit flow
   └─ Funds NOT deducted (atomic)
```

### §5.3 Send validation gates

- Recipient: must be valid user (in connections OR handle exists)
- Asset: user must have balance
- Amount: > 0, ≤ balance, ≥ minimum
- Fee: clearly visible

### §5.4 Send to non-Trusted Connect

```
[User attempts to Send to Open Connect]
      ↓
[Decision]:
   ├─ Send Credit (USDc/VNDc): allowed
   ├─ Send U: requires Trusted Connect (per gating)
   └─ Send UZG: requires Resonance Connect+
      ↓
[IF blocked → "Upgrade connection to send <asset>"]
[Optional: prompt to upgrade connection]
```

---

## §6 RECEIVE FLOW (J5)

### §6.1 Receive lifecycle

```
[User taps Receive action]
      ↓
[Receive overlay opens]
      ↓
[Step 1: Select asset to receive]
   └─ Default: USDc
      ↓
[Step 2: Optional expected amount]
   ├─ Specific amount (locks payment to that)
   └─ Open (any amount)
      ↓
[Step 3: Generate]
   ├─ QR code
   ├─ Payment URL (uzg.plus/pay/<id>)
   └─ Share via CHAT or copy
      ↓
[State: WAITING]
   ├─ Real-time monitoring for payment
   └─ Notification on receive
      ↓
[Payment received]:
   ├─ Toast notification
   ├─ Receive overlay updates: "Received $X from @user"
   └─ Receipt + return to Overview
```

### §6.2 Receive QR code

```
QR code:
  Format: standard payment URL
  Content: uzg.plus/pay/<payment_id>
  
Share options:
  ├─ Copy URL
  ├─ Share via CHAT (DM with QR + URL)
  ├─ Save QR as image
  └─ Native share (system sheet)
```

---

## §7 ADD FUNDS FLOW (J6)

### §7.1 Add Funds lifecycle

```
[User taps Add Funds action]
      ↓
[Add Funds overlay]
      ↓
[Step 1: Select Credit type]
   ├─ USDc
   ├─ VNDc
   └─ AEDc
      ↓
[Step 2: Select method]
   ├─ Bank transfer (default)
   ├─ Credit card
   └─ Crypto (advanced)
      ↓
[Method-specific flow]:

[Bank transfer]:
   ├─ Show bank details (deposit account)
   ├─ User initiates transfer externally
   ├─ Provide transaction reference
   └─ Wait for confirmation (manual or auto)

[Credit card]:
   ├─ Stripe / payment provider integration
   ├─ Card details entry (PCI-compliant)
   ├─ 3DS verification if required
   └─ Instant settlement on success

[Crypto]:
   ├─ Show wallet address
   ├─ User sends crypto externally
   ├─ Wait for blockchain confirmation
   └─ Auto-credit on confirm
      ↓
[Success]:
   ├─ Balance updates
   ├─ Receipt
   └─ Return to Overview
```

### §7.2 Add Funds edge cases

**Pending transaction:**
- Wallet shows "Pending: $50 USDc deposit" inline
- Updates auto on confirm
- User can check status anytime

**Failed deposit:**
- Banner with reason
- Retry option
- No charge to user

---

## §8 BUY UZG FLOW (J7)

### §8.1 Buy UZG lifecycle

```
[User taps "Buy UZG" action]
      ↓
[Buy UZG overlay]
      ↓
[Step 1: Select source Credit]
   └─ USDc / VNDc / AEDc (with balance check)
      ↓
[Step 2: Enter amount]
   ├─ Amount in source Credit (e.g. $10 USDc)
   ├─ OR amount in UZG (calculated reverse)
   └─ Live preview rate
      ↓
[Step 3: Preview]
   ├─ Spend: $10 USDc
   ├─ Receive: 100 UZG (rate 1:10)
   ├─ Fee: 0% (no fee for buying UZG)
   └─ Confirm
      ↓
[Submission]
      ↓
[Success]:
   ├─ USDc balance decreases
   ├─ UZG balance increases
   ├─ Receipt
   └─ Return to Overview
```

### §8.2 Use cases for UZG

After buying UZG, user can use for:
- Membership tier upgrade
- Service bookings (retreats / consultations)
- Premium features (TAO Premium, AIER advanced)
- Marketplace purchases

UI shows "What can I use UZG for?" link → opens explainer.

---

## §9 TRANSACTION HISTORY FLOW (J8)

### §9.1 History tab

```
[User taps History tab in Wallet]
      ↓
[History list loads (paginated)]
      ↓
[Group by]:
   ├─ Today
   ├─ Yesterday
   ├─ This week
   ├─ This month
   └─ Older (date headers)
      ↓
[Each transaction]:
   ├─ Direction icon (+/-/⇄)
   ├─ Amount + asset
   ├─ Description / counterparty
   ├─ Timestamp
   ├─ QOT trace (if applicable)
   └─ Status (verified/pending/failed)
```

### §9.2 Filter & search

```
[Top filter tabs]:
   ├─ All
   ├─ Credit only
   ├─ U + UZG only
   ├─ Conversions
   └─ Custom date range

[Search]:
   ├─ Counterparty name/handle
   ├─ Description keyword
   └─ Amount range
```

### §9.3 Transaction Detail flow

```
[Tap transaction]
      ↓
[Transaction Detail full-screen]
      ↓
[Show]:
   ├─ Amount + direction (large)
   ├─ Description
   ├─ Counterparty
   ├─ Type (Booking / Convert / Send / etc.)
   ├─ Status (Verified ✓ / Pending / Failed)
   ├─ Timestamp
   ├─ Reference (booking ID, etc.)
   ├─ QOT Trace (link)
   └─ Receipt:
         ├─ Download PDF
         └─ Share
```

---

## §10 STATS OVERLAY FLOW

### §10.1 Stats overlay

```
[User taps 📊 in Top Bar]
      ↓
[Stats overlay slides up (240ms)]
      ↓
[Show]:
   ├─ This month: Earned / Spent / Convert / Net flow
   ├─ U Activity: Earned + Source breakdown
   ├─ Top use: Where value went back
   └─ KHÔNG ROI / Profit / Investment metrics
      ↓
[User can]:
   ├─ Change period (week / month / quarter / year)
   ├─ Drill into specific category
   └─ Close overlay
```

### §10.2 Stats KHÔNG hiển thị

- "Profit/Loss" framing
- "Portfolio performance"
- "Investment growth"
- "vs market" comparisons
- "ROI" metrics

### §10.3 Stats CÓ hiển thị

- Earned vs Spent (neutral framing)
- U source breakdown
- Top services used
- Conversion summary

---

## §11 SCREEN STATES MATRIX

| Surface | LOADING | EMPTY | ERROR | ACTIVE | DISABLED |
|---|---|---|---|---|---|
| **Total Value** | Skeleton number | "No assets yet" + Add Funds CTA | "Could not load" | Live number | N/A |
| **Asset card** | Skeleton | "Empty balance" | Failed | Balance + name | Locked (tier) |
| **Asset Detail** | Skeleton sections | "No transactions yet" | "Could not load detail" | Full detail | N/A |
| **Exchange Panel** | N/A | Default state (asset selectors empty) | Rate fetch failed | Active conversion | Action disabled (gate fail) |
| **Send overlay** | N/A | Recipient empty | "Send failed" | Multi-step active | Insufficient balance (Submit disabled) |
| **Receive overlay** | Generating QR | N/A | "Could not generate" | QR + URL active | N/A |
| **Add Funds** | Method loading | N/A | "Method unavailable" | Active flow | Method disabled |
| **Buy UZG** | Rate loading | N/A | "Could not buy" | Active | Insufficient Credit |
| **History list** | Skeleton rows | "No transactions yet" | "Could not load" | List rendered | Filter applied (filtered) |
| **Transaction Detail** | Skeleton | N/A | "Detail unavailable" | Full detail | Pending (limited info) |
| **Stats overlay** | Skeleton | "Not enough data" | N/A | Full stats | N/A |

---

## §12 EDGE CASES

### §12.1 Insufficient balance mid-flow

```
[User in Convert/Send, enters amount > balance]
      ↓
[Live validation]
      ↓
[Submit button disabled]
[Helper text: "Insufficient balance. Available: $X"]
      ↓
[User can]:
   ├─ Tap "Max" to use full balance
   ├─ Add Funds (cross-flow)
   └─ Reduce amount
```

### §12.2 Network drop during transaction

```
[Convert/Send dispatched]
      ↓
[Network drops]
      ↓
[State: PENDING_NETWORK]
      ↓ Reconnect
[Reconcile via API]
      ├─ Server confirmed → success state
      ├─ Server didn't receive → retry option
      └─ Server processed but UI lost confirmation → idempotent retry safe
```

### §12.3 Rate stale

```
[User on Exchange Panel]
      ↓
[Rate displayed at moment T]
      ↓
[User idle 5+ min]
      ↓
[Rate marked stale (visual)]
      ↓
[Submit attempt → re-fetch rate]
      ↓
[New rate shown]
   ├─ Same: proceed
   └─ Changed > 1%: confirm "New rate, accept?"
```

### §12.4 Cash-out limit hit

```
[User attempts UZG → Credit beyond daily limit]
      ↓
[Blocked]
[Banner: "Daily cash-out limit reached. Try tomorrow."]
      ↓
[User can]:
   ├─ Convert smaller amount within limit
   ├─ View limit details
   └─ Upgrade tier (higher limits)
```

### §12.5 Suspicious activity flag

```
[Transaction triggers fraud detection]
      ↓
[Status: HOLD]
[User notified]:
   ├─ "Transaction held for review"
   ├─ Verification steps (KYC if needed)
   └─ Resolution timeline
```

---

## §13 PERMISSION + GATING

### §13.1 Tier gating

| Action | Free (Explorer) | Member (Builder) | Premium (Sovereign) |
|---|---|---|---|
| View balance | ✓ | ✓ | ✓ |
| Receive Credit | ✓ | ✓ | ✓ |
| Send Credit | Limited daily | Higher daily | Higher daily |
| Convert Credit↔Credit | ✓ | ✓ | ✓ |
| Buy UZG | ✓ | ✓ | ✓ |
| Cash-out UZG → Credit | ❌ | Daily limit | Higher daily |
| Add Funds | ✓ | ✓ | ✓ |
| Multiple Credit types | USDc/VNDc | All | All |
| Recurring transfers | ❌ | ✓ | ✓ |

### §13.2 Connection gating

- Send to Open Connect: Credit only (not U/UZG without trust)
- Send to Trusted Connect: all assets
- Receive from anyone with QOT trace

---

## §14 TIMING + PERFORMANCE

| Action | Target | Max |
|---|---|---|
| WALLET shell mount | < 200ms | 500ms |
| Overview initial load | < 1.5s | 3s |
| Asset Detail load | < 800ms | 2s |
| Convert preview rate | < 500ms | 1.5s |
| Convert submit | < 1s | 3s |
| Send submit | < 1s | 3s |
| Transaction History load | < 1s | 2.5s |
| Transaction Detail | < 600ms | 1.5s |
| Stats overlay | < 800ms | 2s |
| QR generate | < 500ms | 1.5s |
| Pull-to-refresh | < 1s | 2s |

---

## §15 CROSS-MODULE EXITS

| From WALLET | To module | Trigger |
|---|---|---|
| Send → recipient search | (in-module) | — |
| Booking message tap (in transaction) | CHAT shell với that thread | History → Detail |
| Buy UZG → tier required | PLUS Hub > Membership mini app | Auto |
| Recipient ENTA preview | ENTA shell (their profile) | Send flow |
| "Earn U" action | U-Reward mini app | Action sheet |
| HOME bottom nav | HOME | Standard |
| CHAT bottom nav | CHAT | Standard |
| ENTA bottom nav | ENTA | Standard |
| UZG+ logo | PLUS Hub | Standard |

---

## §16 DECISION POINTS

### §16.1 Convert source asset default

- Auto-select highest balance asset
- User can override

### §16.2 Send asset default

- Auto-select USDc (universal)
- User can override

### §16.3 Add Funds method default

- Auto-select Bank transfer (lowest fee)
- Order: Bank > Card > Crypto

### §16.4 Cash-out gate

- IF user Free tier → "Upgrade to cash-out"
- IF Member → check daily limit
- IF Premium → check daily limit (higher)

---

## §17 ANALYTICS EVENTS

| Event | Purpose |
|---|---|
| `wallet.shell.mounted` | Performance |
| `wallet.overview.loaded` | Health |
| `wallet.convert.opened` | Usage |
| `wallet.convert.submitted` | Conversion |
| `wallet.convert.success` | Success rate |
| `wallet.convert.error` | Error monitoring |
| `wallet.send.submitted` | Activity |
| `wallet.add_funds.method_selected` | Method preference |
| `wallet.transaction.detail_opened` | Audit usage |
| `wallet.stats.opened` | Insights engagement |

KHÔNG track:
- ❌ Time spent on Asset Detail (dwell tracking)
- ❌ Refresh frequency (privacy)
- ❌ Wealth correlation cross-user

---

## §18 ACCESSIBILITY

### §18.1 Screen reader

- Total Value: read aloud with currency
- Each asset: name + balance + last update
- Transaction: amount + direction + counterparty + time
- Convert flow: step-by-step accessible

### §18.2 Number formatting

- Localization: ₫ (VND), $ (USD), د.إ (AED)
- Thousand separators per locale
- Decimal precision per asset (USDc 2, VNDc 0, U integer)

### §18.3 Keyboard navigation

| Key | Action |
|---|---|
| Tab | Next asset / element |
| Enter | Open detail / submit |
| Esc | Close overlay |
| C | Convert action |
| S | Send action |
| Cmd+R / Ctrl+R | Refresh |

---

## §19 V2 → V3 UX MIGRATION

### §19.1 V2 issues

| Gap | Issue | Fix |
|---|---|---|
| G13 | `/wallet`, `/u-earnings`, `/u-system`, `/u-convert`, `/uzgfi` siblings | Group under `/wallet/*` |
| — | No clean Credit display | §2.3 + Credit cards section |
| — | UZGFi separate surface | Subsume under `/wallet/uzgfi` |
| — | No Convert UI flow | §4 Exchange Panel |
| — | Crypto-styled UI elements | Remove all per Redlines |

### §19.2 V3 implementation order

Sprint 1:
1. WALLET shell + Overview
2. Total Value + asset cards
3. Asset Detail screen
4. Floating + action sheet

Sprint 2:
5. Exchange Panel (Convert flow)
6. Send flow
7. Receive flow + QR
8. Transaction History + Detail

Sprint 3:
9. Add Funds flow (Bank → Card → Crypto)
10. Buy UZG flow
11. Stats overlay
12. Edge cases (insufficient / stale rate / limits)

---

## §20 SUCCESS METRICS

**Good signals:**
- Convert frequency steady (purposeful, not thrash)
- U → UZG correlated với service usage
- Credit deposits stable
- Transaction history accessed for proof (not gambling)
- Cash-out only when needed

**Failure signals:**
- "Show me chart" requests
- Convert thrash patterns (rapid in/out)
- Balance refresh > 10x/hour
- Users treating U as investment
- Spam cash-out attempts

---

## §21 KẾT LUẬN — 5 CÂU KHÓA

**1. WALLET UX = Value Flow Engine, KHÔNG phải crypto exchange.**

**2. 8 journey segments: Overview / Asset Detail / Convert / Send / Receive / Add / Buy UZG / History.**

**3. Convert = 1-way conversion (rate published + fee transparent), KHÔNG trading.**

**4. State machines clear: Convert / Send / Receive với optimistic UI + atomic rollback.**

**5. Stats KHÔNG ROI/Profit framing — Earned vs Spent neutral.**

---

## §22 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized từ WALLET UI canon + Master Economy + Cursor V2 audit |

---

🔒 UZG+ V3 PWA OS — WALLET UX Flow Spec v1.0
End of file.
