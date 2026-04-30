# UZG+ V3 PWA OS — REDLINES MASTER

**Document ID:** `UZG_PLUS_V3_UIUX_REDLINES_MASTER_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 3 (Cross-cutting — overrides module canons on redline conflicts)
**Type:** Aggregate redlines across all UZG+ V3 PWA OS modules
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 1: WHITEPAPER_UZG_PLUS_OFFICIAL_V2
- Tier 2: HUMAN_VALUE_CANON, IDENTITY_CANON, TRUTH_TRUST_CANON, GOVERNANCE_CANON, MASTER_ECONOMY_CANON
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1`

**Module canons (sources of redlines):**
- HOME / Social
- CHAT
- WALLET
- ENTA
- PLUS Hub
- U-Reward
- TAO

---

## §0 PURPOSE

File này AGGREGATE toàn bộ redlines từ 7 module canons + Foundation OS thành 1 master reference. Khi build/audit/review UZG+ V3, đối chiếu file này TRƯỚC.

**3 quan trọng:**

1. **Authority hierarchy:** Khi conflict — REDLINES_MASTER thắng module-specific redline. Khi conflict với Tier 1/2 canon — Tier 1/2 thắng.

2. **Severity levels (3 tier):**
   - 🔴 **CRITICAL** — Immediate halt build/violation. Block ship to production.
   - 🟠 **HIGH** — Must fix in current sprint. Block major release.
   - 🟡 **MEDIUM** — Polish pass, fix opportunistically.

3. **Cross-cutting redlines (§14)** apply toàn hệ regardless of module — Foundation rules + ethics + safety.

---

## §1 GLOBAL OS REDLINES (Foundation Architecture)

Source: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1` §10

### §1.1 CRITICAL 🔴

- ❌ KHÔNG làm desktop UI riêng (mobile-first scale up only)
- ❌ KHÔNG show UI của module khác khi đang trong 1 module
- ❌ KHÔNG đổi 5 icons bottom nav (HOME / CHAT / PLUS / WALLET / ENTA fixed)
- ❌ KHÔNG đổi vị trí 4 phần cố định (Bottom Nav / Top Bar / Floating + / U-Reward pill)
- ❌ KHÔNG hide 4 phần cố định trừ trường hợp đặc biệt được spec
- ❌ KHÔNG có sidebar desktop layout
- ❌ KHÔNG có hamburger menu (avatar drawer thay thế)

### §1.2 HIGH 🟠

- ❌ KHÔNG mix UI giữa modules (HOME content trong CHAT shell)
- ❌ KHÔNG state loss khi switch module
- ❌ KHÔNG animation > 400ms (except onboarding wow moments)
- ❌ KHÔNG bottom nav dài hơn 5 icons
- ❌ KHÔNG menu drawer ở phải (luôn từ left, theo Avatar)

### §1.3 MEDIUM 🟡

- ❌ KHÔNG icon rác trong top bar
- ❌ KHÔNG badge spam (max 1 notification badge tại 1 time)
- ❌ KHÔNG U-Reward pill nhảy số liên tục (quá distracting)

---

## §2 HOME / SOCIAL REDLINES

Source: `UZG_PLUS_V3_UIUX_HOME_SOCIAL_CANON_v1` §13

### §2.1 CRITICAL 🔴

- ❌ KHÔNG biến HOME thành dopamine social network
- ❌ KHÔNG reward engagement rỗng (clicks, time, scroll depth)
- ❌ KHÔNG content vô danh (QOT mandatory cho value-bearing posts)
- ❌ KHÔNG Like system cũ (chỉ Ngũ Hành reaction)
- ❌ KHÔNG ranking theo viral / trending velocity
- ❌ KHÔNG card UI nặng (chỉ flow)
- ❌ KHÔNG auto-play video on scroll
- ❌ KHÔNG sponsored / ad content
- ❌ KHÔNG status box cố định ("What's on your mind?")
- ❌ KHÔNG follower count public

### §2.2 HIGH 🟠

- ❌ KHÔNG follower = authority signal
- ❌ KHÔNG trending hashtags / topics
- ❌ KHÔNG spam compose prompts
- ❌ KHÔNG UI tạo cảm giác nghiện
- ❌ KHÔNG hide AIER posts như human posts
- ❌ KHÔNG public reaction list (privacy)
- ❌ KHÔNG infinite scroll without value filter

### §2.3 MEDIUM 🟡

- ❌ KHÔNG animation quá đà
- ❌ KHÔNG overload thông tin trong post card
- ❌ KHÔNG desktop-style multi-column
- ❌ KHÔNG emoji-only reaction

---

## §3 CHAT REDLINES

Source: `UZG_PLUS_V3_UIUX_CHAT_CANON_v1` §15

### §3.1 CRITICAL 🔴

- ❌ Chat KHÔNG được chỉ là messaging tool (must support value execution)
- ❌ AIER KHÔNG được pretend là human (CRITICAL attribution)
- ❌ Anonymous message KHÔNG cho phép cho value-bearing communications
- ❌ KHÔNG QOT cho booking / payment / deal messages
- ❌ KHÔNG biến chat thành spam loop
- ❌ KHÔNG read message data cross-Lane (privacy)
- ❌ KHÔNG store messages plaintext on server (E2E for DM)

### §3.2 HIGH 🟠

- ❌ KHÔNG emoji-only reactions (chỉ Ngũ Hành)
- ❌ KHÔNG bot spam patterns
- ❌ KHÔNG always-on AIER trong DM
- ❌ KHÔNG tách chat khỏi business operations
- ❌ KHÔNG disappearing messages (provenance break)
- ❌ KHÔNG anonymous group chat
- ❌ KHÔNG public chat history (default private)

### §3.3 MEDIUM 🟡

- ❌ KHÔNG animation quá đà
- ❌ KHÔNG UI nặng
- ❌ KHÔNG desktop sidebar layout
- ❌ KHÔNG notification spam

---

## §4 WALLET REDLINES

Source: `UZG_PLUS_V3_UIUX_WALLET_CANON_v1` §13 + §14

### §4.1 CRITICAL 🔴

- ❌ Wallet KHÔNG được giống crypto exchange
- ❌ KHÔNG có chart giá pump/dump
- ❌ KHÔNG có order book / depth
- ❌ KHÔNG có "Trade" / "Profit" / "Gain" terminology
- ❌ Credit KHÔNG được trông như token
- ❌ KHÔNG mix U / UZG / Credit balance (4 layers tách biệt)
- ❌ KHÔNG fake rate / user-set rate
- ❌ KHÔNG speculation UI
- ❌ Balance KHÔNG được trông như authority signal

### §4.2 HIGH 🟠

- ❌ KHÔNG real-time price ticking
- ❌ KHÔNG green/red flashing on balance change
- ❌ KHÔNG auto-play coin animations
- ❌ KHÔNG hide conversion fees
- ❌ KHÔNG promote upgrading tier qua wallet (use Membership module)
- ❌ KHÔNG show "leaderboard of richest users"

### §4.3 MEDIUM 🟡

- ❌ KHÔNG animation pump/dump
- ❌ KHÔNG coin spinning
- ❌ KHÔNG number scrolling effect
- ❌ KHÔNG desktop sidebar layout
- ❌ KHÔNG multi-currency comparison chart

### §4.4 CRYPTO TRAP — VOCABULARY BANNED

Forbidden words anywhere in WALLET UI:

- ❌ Trade / Trading
- ❌ Profit / Gain / Loss
- ❌ Pump / Dump / Moon / Floor
- ❌ Bull / Bear
- ❌ HODL / Diamond hands
- ❌ ROI / Yield / APR
- ❌ Whale / Shill
- ❌ DeFi (user surface)
- ❌ Tokenomics (user surface)

Use instead:
- ✅ Convert / Exchange
- ✅ Earned / Spent
- ✅ Value flow / Activity
- ✅ Energy / Utility
- ✅ Member tier
- ✅ Service usage

---

## §5 ENTA REDLINES

Source: `UZG_PLUS_V3_UIUX_ENTA_CANON_v1` §13

### §5.1 CRITICAL 🔴

- ❌ ENTA KHÔNG được giống LinkedIn / Facebook profile
- ❌ KHÔNG follower count public
- ❌ KHÔNG profile completeness % gamification
- ❌ KHÔNG "Verified" badges (we use QOT, not external verification)
- ❌ Birth data KHÔNG được publicly visible
- ❌ KHÔNG resume / CV display
- ❌ KHÔNG endorsements / recommendations from others (LinkedIn pattern)
- ❌ KHÔNG profile views count

### §5.2 HIGH 🟠

- ❌ KHÔNG ENTA hidden behind paywall (all users have ENTA)
- ❌ KHÔNG ENTA score gamified
- ❌ KHÔNG numerical leaderboards
- ❌ KHÔNG public connection count
- ❌ KHÔNG fake resonance (must be calculated)
- ❌ KHÔNG manipulation ("X people viewed your profile")

### §5.3 MEDIUM 🟡

- ❌ KHÔNG cover photo (focus on wheel)
- ❌ KHÔNG carousel of life moments
- ❌ KHÔNG location check-ins
- ❌ KHÔNG "feeling" status

---

## §6 PLUS HUB REDLINES

Source: `UZG_PLUS_V3_UIUX_PLUS_HUB_CANON_v1` §14

### §6.1 CRITICAL 🔴

- ❌ PLUS KHÔNG được giống hamburger menu
- ❌ KHÔNG list-style nav (must be grid)
- ❌ KHÔNG sponsored apps in Featured
- ❌ KHÔNG hidden ads in app icons
- ❌ Mini apps KHÔNG được override 4 phần cố định behavior
- ❌ KHÔNG forced app installs (user chooses)
- ❌ KHÔNG track user across mini apps without consent

### §6.2 HIGH 🟠

- ❌ KHÔNG random Featured rotation (must be relevance-based)
- ❌ KHÔNG limit pinned to paid users (free user có 8 pinned slots)
- ❌ KHÔNG dark patterns ("must use this app to continue")
- ❌ KHÔNG trending leaderboard ("top 10 apps")
- ❌ KHÔNG popularity = priority

### §6.3 MEDIUM 🟡

- ❌ KHÔNG icon thay đổi tùy hứng (consistency)
- ❌ KHÔNG remove apps without notice
- ❌ KHÔNG complex onboarding for each mini app

---

## §7 U-REWARD REDLINES

Source: `UZG_PLUS_V3_UIUX_UREWARD_CANON_v1` §12

### §7.1 CRITICAL 🔴

- ❌ KHÔNG landing page hoặc "coming soon" UI
- ❌ KHÔNG "please wait" prompts
- ❌ KHÔNG dead UI sections
- ❌ KHÔNG reward vô nghĩa (mỗi U gắn value)
- ❌ KHÔNG spam tap không cooldown
- ❌ KHÔNG crypto-style UI (pump / dump / coin shower)
- ❌ KHÔNG paid energy refill (pay-to-win)
- ❌ KHÔNG fake leaderboard global

### §7.2 HIGH 🟠

- ❌ KHÔNG UI tĩnh (must feel alive)
- ❌ KHÔNG delay reward feedback
- ❌ KHÔNG thiếu loop (action → reward → next)
- ❌ KHÔNG urgency-fear tactics
- ❌ KHÔNG dark patterns (forced ads, paywall)
- ❌ KHÔNG farm-friendly bot patterns

### §7.3 MEDIUM 🟡

- ❌ KHÔNG animation quá đà (excessive sparkle)
- ❌ KHÔNG sound aggressive
- ❌ KHÔNG over-gamification (too many badges)
- ❌ KHÔNG complex onboarding cho mini app

---

## §8 TAO REDLINES (5 HARD REDLINES)

Source: `UZG_PLUS_V3_UIUX_TAO_CANON_v1` §12

TAO có 5 redlines tuyệt đối — đặc biệt critical vì module này nhạy cảm văn hóa cao.

### §8.1 REDLINE 1 — NO FEAR-UX 🔴

- ❌ Pop-up "Xem ngay nếu không sẽ tai họa!"
- ❌ Notification "⚠️ KỴ! HỦY MỌI KẾ HOẠCH!"
- ❌ Countdown threatening to "đại hạn"
- ❌ Animation flashing red alarm cho "hung" days

### §8.2 REDLINE 2 — NO MYSTICISM-SHOCK 🔴

- ❌ "Bí mật vận mệnh BẠN SẼ KHÔNG TIN ĐƯỢC..."
- ❌ Predatory mystical clickbait
- ❌ Mystical sound effects + dramatic music
- ❌ "Ngày của bạn THỰC SỰ là..."

### §8.3 REDLINE 3 — NO THẦY-PHÁN FRAMING 🔴

- ❌ "Số bạn là..." (definitive)
- ❌ "Bạn 100% sẽ giàu/nghèo/khổ..."
- ❌ Authoritative fortune-telling tone
- ❌ AIER speaks như thầy phán

PHẢI dùng:
- ✅ "Theo cấu trúc lá số, có xu hướng..."
- ✅ "Khả năng cao..."
- ✅ Educational + advisory framing

### §8.4 REDLINE 4 — NO DESTINY-DISCRIMINATION 🔴

- ❌ "Người Bazi này không nên kết hôn với..."
- ❌ Categorize users into "good" vs "bad" charts
- ❌ Compatibility scores tuyệt đối ("Hai người này KHÔNG hợp")

### §8.5 REDLINE 5 — NO FEAR-PRESCRIPTION 🔴

- ❌ "Mua vật phẩm này NGAY để giải hạn!"
- ❌ Auto-suggest expensive products without context
- ❌ Recommendation algo tuned for conversion rate (over relevance)
- ❌ A/B testing fear-copy vs neutral để optimize conversion

---

## §9 CROSS-CUTTING REDLINES (TOÀN HỆ)

Apply across ALL modules. Override module-specific allowances.

### §9.1 IDENTITY & PRIVACY 🔴

- ❌ KHÔNG anonymous identity in value-bearing flows
- ❌ KHÔNG share birth data publicly without consent
- ❌ KHÔNG cross-module data sharing without explicit consent
- ❌ KHÔNG track user behavior outside module scope without disclosure
- ❌ KHÔNG store PII in plain text
- ❌ KHÔNG require real name (handle is sufficient)
- ❌ KHÔNG hide privacy settings (always visible in Avatar Menu)

### §9.2 TRUTH & PROVENANCE (QOT) 🔴

- ❌ KHÔNG value-bearing content without QOT
- ❌ KHÔNG fabricated provenance trail
- ❌ KHÔNG hide actor type (human/AIER/system)
- ❌ KHÔNG QOT-stripped messages or posts
- ❌ KHÔNG false "Verified" badges

### §9.3 HUMAN AUTHORITY 🔴

- ❌ KHÔNG AI as final decision-maker in user value matters
- ❌ KHÔNG AIER override Human Authority
- ❌ KHÔNG AIER pretend to be human
- ❌ KHÔNG AIER make autonomous payment / commitment decisions
- ❌ KHÔNG hide AIER governance status

### §9.4 ECONOMY = CONSTRAINT 🔴

- ❌ KHÔNG balance = authority signal
- ❌ KHÔNG wealth display fetishism
- ❌ KHÔNG tier = social status indicator publicly
- ❌ KHÔNG "richest users" leaderboards
- ❌ KHÔNG money-buys-influence patterns

### §9.5 NO ENGAGEMENT MANIPULATION 🔴

- ❌ KHÔNG dopamine loops
- ❌ KHÔNG variable reward schedules (gambling pattern)
- ❌ KHÔNG infinite scroll without purpose
- ❌ KHÔNG auto-play media on scroll
- ❌ KHÔNG urgency-fear ("Limited time!" without genuine reason)
- ❌ KHÔNG FOMO triggers
- ❌ KHÔNG "X people are viewing this right now"
- ❌ KHÔNG streak gamification beyond meaningful purpose

### §9.6 ANTI-DARK-PATTERNS 🔴

- ❌ KHÔNG trick clicks (button placement deception)
- ❌ KHÔNG misleading copy
- ❌ KHÔNG unsubscribe friction (must be 1-tap easy)
- ❌ KHÔNG hidden costs / fees
- ❌ KHÔNG roach motel (easy entry, hard exit)
- ❌ KHÔNG forced continuity (auto-renewal without clear consent)
- ❌ KHÔNG bait-and-switch
- ❌ KHÔNG confirmshaming ("No, I don't want to save money")

### §9.7 SECURITY 🔴

- ❌ KHÔNG echo secrets in logs / audit / commits / UI
- ❌ KHÔNG hardcode API keys in client
- ❌ KHÔNG bypass auth flows
- ❌ KHÔNG store sensitive data in localStorage / sessionStorage (per Foundation §2.1 PWA principles)
- ❌ KHÔNG accept unencrypted PII
- ❌ KHÔNG SQL injection vulnerabilities
- ❌ KHÔNG XSS vectors

### §9.8 ACCESSIBILITY 🟠

- ❌ KHÔNG color alone as sole information indicator
- ❌ KHÔNG contrast below WCAG AA (4.5:1 text)
- ❌ KHÔNG touch target < 44px × 44px
- ❌ KHÔNG keyboard inaccessible features
- ❌ KHÔNG ignore `prefers-reduced-motion`
- ❌ KHÔNG missing ARIA labels on interactive elements
- ❌ KHÔNG audio-only content without captions

### §9.9 LOCALIZATION 🟠

- ❌ KHÔNG English-only UI (Vietnamese primary)
- ❌ KHÔNG hardcoded Vietnamese diacritics issues
- ❌ KHÔNG Han characters without Vietnamese context
- ❌ KHÔNG cultural insensitive imagery
- ❌ KHÔNG date/time format hardcoded (locale-aware)

### §9.10 PERFORMANCE 🟠

- ❌ KHÔNG large bundles (target < 500KB initial)
- ❌ KHÔNG blocking scripts
- ❌ KHÔNG layout thrash
- ❌ KHÔNG memory leaks
- ❌ KHÔNG unnecessary re-renders
- ❌ KHÔNG real-time polling > 1Hz unless absolutely needed
- ❌ KHÔNG drain battery (continuous animations)

---

## §10 BRAND & VISUAL REDLINES

### §10.1 CRITICAL 🔴

- ❌ KHÔNG enterprise dashboard look
- ❌ KHÔNG crypto casino aesthetic
- ❌ KHÔNG fintech bank look
- ❌ KHÔNG generic Material Design (UZG+ has identity)
- ❌ KHÔNG mismatched visual language between modules
- ❌ KHÔNG metaverse 3D render imagery (per Tier 3 Design System)

### §10.2 HIGH 🟠

- ❌ KHÔNG stock-photo people imagery
- ❌ KHÔNG corporate clichés
- ❌ KHÔNG trendy gradients overused
- ❌ KHÔNG glassmorphism overdone
- ❌ KHÔNG icon styles mixed (Phosphor + custom UZG glyphs only per Design System)

### §10.3 MEDIUM 🟡

- ❌ KHÔNG inconsistent border radii
- ❌ KHÔNG mixed shadow styles
- ❌ KHÔNG random font weight choices
- ❌ KHÔNG color outside Design System palette

---

## §11 ETHICAL REDLINES (HUMAN VALUE)

Per HUMAN_VALUE_CANON.

### §11.1 CRITICAL 🔴

- ❌ KHÔNG content harming children
- ❌ KHÔNG hate speech / discrimination
- ❌ KHÔNG content promoting violence
- ❌ KHÔNG self-harm content / glorification
- ❌ KHÔNG eating disorder content / promotion
- ❌ KHÔNG sexual content (UZG+ is value platform, not adult)
- ❌ KHÔNG illegal substance promotion

### §11.2 HIGH 🟠

- ❌ KHÔNG manipulation tactics (dark psychology)
- ❌ KHÔNG predatory marketing
- ❌ KHÔNG deceptive AI use
- ❌ KHÔNG misinformation amplification
- ❌ KHÔNG cult-building patterns
- ❌ KHÔNG MLM / pyramid schemes

### §11.3 MEDIUM 🟡

- ❌ KHÔNG culturally insensitive content
- ❌ KHÔNG context-stripped wisdom claims
- ❌ KHÔNG appropriation of traditions

---

## §12 GOVERNANCE REDLINES

Per GOVERNANCE_CANON.

### §12.1 CRITICAL 🔴

- ❌ KHÔNG concentrated power (single entity controls all decisions)
- ❌ KHÔNG hidden moderation policies
- ❌ KHÔNG ban without due process
- ❌ KHÔNG appeal process bypass
- ❌ KHÔNG selective enforcement of rules

### §12.2 HIGH 🟠

- ❌ KHÔNG opaque algorithmic decisions
- ❌ KHÔNG governance vote without quorum
- ❌ KHÔNG canonical change without NTS approval (during NTS phase)
- ❌ KHÔNG retroactive rule changes affecting past contributions
- ❌ KHÔNG silent feature removal

### §12.3 MEDIUM 🟡

- ❌ KHÔNG rule changes without changelog
- ❌ KHÔNG governance UI hidden in deep menus

---

## §13 REDLINE SEVERITY MATRIX

### §13.1 Severity definitions

| Severity | Definition | Action |
|---|---|---|
| 🔴 **CRITICAL** | Violates core principles, breaks user trust, or causes real harm | Halt build immediately. Block production deploy. Audit + fix before resuming. |
| 🟠 **HIGH** | Significantly degrades UX, breaks canon, retention risk | Must fix in current sprint. Block major release. |
| 🟡 **MEDIUM** | Polish issue, edge case, accessibility gap | Fix opportunistically. Track in backlog. |

### §13.2 Total redlines count by severity

| Module | 🔴 CRITICAL | 🟠 HIGH | 🟡 MEDIUM | Total |
|---|---|---|---|---|
| OS Foundation | 7 | 5 | 3 | 15 |
| HOME / Social | 10 | 7 | 4 | 21 |
| CHAT | 7 | 7 | 4 | 18 |
| WALLET | 9 | 6 | 5 + 9 vocab | 29 |
| ENTA | 8 | 6 | 4 | 18 |
| PLUS Hub | 7 | 5 | 3 | 15 |
| U-Reward | 8 | 6 | 4 | 18 |
| TAO | 5 (REDLINES) | — | — | 5 |
| Cross-cutting (§9) | 30+ | 6 | 5 | 41+ |
| Brand/Visual | 6 | 5 | 4 | 15 |
| Ethical (§11) | 7 | 6 | 3 | 16 |
| Governance (§12) | 5 | 5 | 2 | 12 |
| **TOTAL** | **~109** | **~64** | **~50** | **~223** |

---

## §14 AUDIT CHECKLIST

Khi audit/review code/UI, đối chiếu checklist:

### §14.1 Build-time check (developer)

```
☐ Module follows Foundation OS architecture (4 phần cố định intact)?
☐ No desktop UI added (mobile-first scaling)?
☐ No banned vocabulary used (especially WALLET crypto vocab)?
☐ No anonymous content in value-bearing flows?
☐ QOT trace implemented where required?
☐ AIER attribution clear (Governed Entity badge)?
☐ Privacy controls accessible?
☐ Accessibility minimum (WCAG AA, 44px touch)?
☐ Reduced motion respected?
☐ Vietnamese localization complete?
☐ No engagement manipulation patterns?
☐ No dark patterns?
☐ Security: no secrets exposed, no localStorage, etc.?
```

### §14.2 Pre-deploy check (release manager)

```
☐ All CRITICAL redlines verified (manual + automated)?
☐ All HIGH redlines documented if not fixed (with timeline)?
☐ Module canon compliance verified per module ship?
☐ Cross-cutting redlines (§9) audited?
☐ TAO 5 hard redlines tested (if TAO module touched)?
☐ Ethical content review passed?
☐ Governance approval if canon-affecting change?
☐ Performance benchmarks met?
☐ Security audit done?
```

### §14.3 Post-deploy monitoring

```
☐ Behavioral metrics tracked (anti-signals from each module)?
☐ User reports about UX violations triaged?
☐ AIER governance violations escalated?
☐ Engagement patterns reviewed (no addiction loops)?
☐ Anti-bot detection active?
☐ QOT chain integrity verified?
☐ Privacy compliance maintained?
```

---

## §15 ENFORCEMENT MECHANISMS

### §15.1 Automated gates

**Lint rules:**
- Banned vocabulary check (WALLET crypto words)
- ARIA label presence
- Touch target size minimum
- Color contrast minimum
- Bundle size limits

**Test gates:**
- E2E flows (compose, react, convert, etc.)
- Accessibility tests (axe-core)
- Performance tests (Lighthouse)
- Security tests (SAST)

**CI checks:**
- Foundation 4 phần cố định presence
- Module isolation (no cross-pollution)
- Schema compliance
- Localization parity

### §15.2 Manual review gates

**Design review:**
- Visual identity consistency
- Brand guidelines compliance
- Module-specific canon compliance

**Content review:**
- TAO 5 redlines (cultural sensitivity)
- AIER attribution clarity
- Ethical content check

**Governance review:**
- NTS approval for canon changes (during NTS phase)
- Lane authority compliance
- Audit log integrity

### §15.3 User reporting

User flags content/UX:
- Report button accessible from any post/message
- Privacy violation report
- AIER governance violation
- Dark pattern report
- Accessibility issue

Reports routed to:
- Lane_01 (operations/CTO)
- Lane_04 (community/social) when activated

---

## §16 EXCEPTIONS & WAIVERS

### §16.1 No exceptions for CRITICAL redlines

CRITICAL redlines are NEVER waived. If a CRITICAL redline conflicts with a feature requirement → feature is wrong, not the redline.

### §16.2 HIGH redline temporary waivers

HIGH redline waivers possible if:
- Documented clear rationale
- Time-bounded (max 1 quarter)
- NTS verbatim approval
- User-facing disclosure (if applicable)
- Tracking ticket created

### §16.3 MEDIUM redline ongoing tolerance

MEDIUM redlines tracked in backlog. Acceptable to ship with known MEDIUM violations as long as:
- Documented
- Prioritized
- Fix planned within 2 quarters

---

## §17 REDLINE EVOLUTION

### §17.1 Adding new redlines

Process:
1. Lane discovers pattern (audit, user feedback, incident)
2. Author proposal: "Why this should be redline" + severity
3. NTS verbatim approval
4. Add to appropriate module canon §13 + this REDLINES_MASTER
5. Update audit checklist
6. Communicate to all Lanes

### §17.2 Removing redlines

Rare. Only if:
- Original concern proven invalid by data
- Better mechanism replaces it
- NTS verbatim approval + amendment record

### §17.3 Severity changes

Possible:
- HIGH → CRITICAL (after incident)
- MEDIUM → HIGH (pattern observed)
- HIGH → MEDIUM (rare, requires evidence harm reduced)

---

## §18 KẾT LUẬN — 5 CÂU KHÓA

**1. REDLINES_MASTER aggregate ~223 redlines từ 7 modules + Foundation + cross-cutting + ethical + governance.**

**2. 3 severity tiers: 🔴 CRITICAL (immediate halt) / 🟠 HIGH (sprint fix) / 🟡 MEDIUM (polish).**

**3. CRITICAL redlines NEVER waived — feature wrong, not redline.**

**4. TAO có 5 hard redlines đặc biệt (cultural sensitivity highest stakes).**

**5. Cross-cutting redlines (§9) override module-specific allowances — toàn hệ phải tuân.**

---

## §19 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — aggregate from 7 module canons + Foundation + Tier 2 ethics/governance |

---

🔒 UZG+ V3 PWA OS — REDLINES MASTER v1.0
End of file.

═══════════════════════════════════════════════════
COMPLETE V3 UI/UX CANON SET — 8/8 MODULES DONE
═══════════════════════════════════════════════════
