# UZG+ V3 PWA OS — LANGUAGE OS MAPPING

**Document ID:** `UZG_PLUS_V3_LANGUAGE_OS_MAPPING_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 4 (Cross-cutting — maps V3 modules to LANG_OS canon)
**Type:** Master mapping file — UI strings × LANG_OS resolver contract
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 1 (LANG_OS canon library):
  - `LANG_OS_01_PRINCIPLES_v1` (5 LAWs)
  - `LANG_OS_02_ARCHITECTURE_v1` (6-layer)
  - `LANG_OS_03_RESOLVER_CONTRACT_v1`
  - `LANG_OS_04_DICTIONARY_GOVERNANCE_v1` (12 domains)
  - `LANG_OS_05_RENDER_CONTRACT_v1`
  - `LANG_OS_06_MESSAGE_CONTRACT_v1`
  - `LANG_OS_07_SEMANTIC_TOKEN_REGISTRY_v1` (11 protected + 5 elements + VN-school)
  - `LANG_OS_08_ENGLISH_MASTER_BASELINE_v1`
  - `LANG_OS_10_FORBIDDEN_PATTERNS_v1`
  - `LANG_OS_11_VALIDATION_AUDIT_v1`
- V3 module canons: HOME / CHAT / WALLET / ENTA / PLUS / U-Reward / TAO

**Companion:** All V3 UI canons + 5 UX Flow Specs (Batch 1)

---

## §0 PURPOSE

File này mapping **UI strings từ 7 V3 modules** vào **LANG_OS canon system**:

1. **Dictionary key namespaces** per module (`home.*`, `chat.*`, `wallet.*`, `enta.*`, `plus.*`, `ureward.*`, `tao.*`)
2. **Protected token usage** per module (11 system tokens render literal)
3. **Element token bindings** (5 elements với en/vi/ph display labels)
4. **VN-school protected terms** (TAO module specifically)
5. **Sentinel handling** per surface (LAW 3 — no silent fallback)
6. **String inventory** (~100-200 keys per module) — sample, not exhaustive
7. **Render contract compliance** examples per module
8. **Resolver integration** với active locale (en/vi/ph)
9. **Canon amendment requirement** cho 2 domains mới (`plus`, `ureward`)

**Critical:** Tất cả UI strings trong V3 PHẢI route qua LANG_OS resolver. Hardcoded English/Vietnamese trong JSX = **forbidden** per LANG_OS LAW 2.

---

## §1 CANON AMENDMENT NEEDED

### §1.1 Current LANG_OS V1 domains (12)

Per `LANG_OS_04_DICTIONARY_GOVERNANCE_v1` §2:

`common`, `home`, `shell`, `auth`, `wallet`, `chat`, `enta`, `community`, `settings`, `system`, `finance`, `tao`

### §1.2 V3 modules → domain mapping

| V3 Module | Existing domain | New domain needed? |
|---|---|---|
| HOME / Social | `home` + `community` | NO (use existing) |
| CHAT | `chat` | NO |
| WALLET | `wallet` + `finance` | NO |
| ENTA | `enta` | NO |
| **PLUS Hub** | — | **YES — add `plus` domain** |
| **U-Reward** | — | **YES — add `ureward` domain** |
| TAO (Bazi/Tử Vi/Phong Thủy) | `tao` | NO |

### §1.3 Amendment proposal

Required canon amendment:

```
LANG_OS_04_DICTIONARY_GOVERNANCE_v1 AMENDMENT 001
- Add domain: 'plus' → owns: PLUS Hub springboard, mini app launcher UI
- Add domain: 'ureward' → owns: U-Reward mini app (Tap/Quiz/Task/Campaign/Streak)
```

Per LANG_OS LAW 5 (Scalability) — adding domain requires:
1. NTS approval ✓ (this file is the proposal)
2. Add to `GOVERNED_LANGUAGE_DOMAINS` array
3. Add to `LANGUAGE_DICTIONARY_SECTION_OWNERSHIP` map
4. Phase 1: empty domain OK (scaffold)
5. Phase 2+: populated với parity (en/vi/ph)

After amendment: **14 domains total**.

### §1.4 V3 → 14 domains mapping (post-amendment)

| Domain | V3 Module + Surfaces |
|---|---|
| `common` | Cross-feature CTA, status, errors |
| `shell` | Foundation OS shell (4 phần cố định) |
| `auth` | Login, signup, onboarding gate |
| `home` | HOME shell + Value Stream feed |
| `community` | HOME social interactions (posts, comments) |
| `chat` | CHAT shell (Inbox / Room / Info) |
| `wallet` | WALLET shell (assets, convert, history) |
| `finance` | Currency formatting, transaction details |
| `enta` | ENTA shell (Wheel + 4 tabs + onboarding) |
| `plus` ⭐NEW | PLUS Hub (springboard + mini app launcher) |
| `ureward` ⭐NEW | U-Reward (Tap/Quiz/Task/Campaign) |
| `tao` | TAO mini app (Bazi/Tử Vi/Phong Thủy + Lịch Vạn Niên) |
| `settings` | User preferences |
| `system` | System messages, errors |

---

## §2 PROTECTED TOKENS — RENDER LITERAL ACROSS ALL LOCALES

Per `LANG_OS_07_SEMANTIC_TOKEN_REGISTRY_v1` §3 — 11 system tokens render literally in all locales (en/vi/ph).

### §2.1 11 protected tokens

| Token | Render in EN | Render in VI | Render in PH |
|---|---|---|---|
| `U` | U | U | U |
| `UZG` | UZG | UZG | UZG |
| `UZG+` | UZG+ | UZG+ | UZG+ |
| `ENTA` | ENTA | ENTA | ENTA |
| `QOT` | QOT | QOT | QOT |
| `AIER` | AIER | AIER | AIER |
| `AIFI` | AIFI | AIFI | AIFI |
| `USDc` | USDc | USDc | USDc |
| `VNDc` | VNDc | VNDc | VNDc |
| `PHPc` | PHPc | PHPc | PHPc |
| `AEDc` | AEDc | AEDc | AEDc |

### §2.2 Forbidden variants (CANNOT render)

Per LAW 4:
- ❌ `USD Credit` / `USD_Credit` / `USDC` (must be `USDc`)
- ❌ `VND Credit` / `VND Tín dụng` (must be `VNDc`)
- ❌ `Uniton Zen Garden Plus` (must be `UZG+`)
- ❌ `Authentic ENTA` (must be `ENTA`)

### §2.3 Module usage per protected token

| Token | Module(s) using | Example surface |
|---|---|---|
| `U` | U-Reward, WALLET, HOME (+U signal) | "U: 1,250 ⚡" |
| `UZG` | WALLET, U-Reward | "UZG: 450" |
| `UZG+` | All (brand) | "UZG+ Apps" (PLUS Hub) |
| `ENTA` | ENTA, HOME (avatar), CHAT | "Your ENTA Wheel" |
| `QOT` | All (provenance) | "QOT trace" icon |
| `AIER` | CHAT, TAO, PLUS | "AIER Tao", "Governed Entity" |
| `AIFI` | WALLET (advanced layer) | "AIFI" (hidden default) |
| `USDc` | WALLET | "$120.50 USDc" |
| `VNDc` | WALLET | "₫2,800,000 VNDc" |
| `PHPc` | WALLET (PH market) | "₱5,500 PHPc" |
| `AEDc` | WALLET (UAE market) | "د.إ300 AEDc" |

### §2.4 Render compliance examples

```javascript
// CORRECT — protected token literal:
<div>{`U: ${balance}`}</div>           // ✓
<div>UZG+ Apps</div>                    // ✓ (literal, no t())
<div>{`${amount} USDc`}</div>           // ✓

// WRONG — translating protected token:
<div>{t('USDc')}</div>                  // ❌ tokens không phải dict keys
<div>{`USD Credit: ${amount}`}</div>    // ❌ forbidden variant
<div>{t('wallet.usdc_label')}</div>     // ❌ if dict has 'USD_Credit', wrong
```

---

## §3 ELEMENT TOKENS — DUAL LAYER (TOKEN ID + DISPLAY LABEL)

Per `LANG_OS_07_SEMANTIC_TOKEN_REGISTRY_v1` §3 — 5 element tokens với token ID immutable + locale-specific display labels.

### §3.1 5 elements

| Token ID | EN display | VI display | PH display | Color hint |
|---|---|---|---|---|
| `FIRE` | Fire | Hỏa | Apoy | Red/orange |
| `WATER` | Water | Thủy | Tubig | Black/blue |
| `WOOD` | Wood | Mộc | Kahoy | Green |
| `METAL` | Metal | Kim | Metal | Silver/white |
| `EARTH` | Earth | Thổ | Lupa | Yellow/brown |

### §3.2 Adapter usage

Per `LANG_OS_02_ARCHITECTURE_v1` §6.5 — single adapter `normalizeEntaElementKey()`:

```javascript
import { getEntaElementLabel, normalizeEntaElementKey } from '@/system/semanticTokens';

// Component usage:
const elementId = 'FIRE';  // or any input variant
const label = getEntaElementLabel(elementId, currentLocale);

// VI: label = 'Hỏa'
// EN: label = 'Fire'
// PH: label = 'Apoy'
```

### §3.3 Module usage per element token

**HOME module:**
- Reaction wheel (5 ngũ hành)
- Reaction count display
- Element resonance suggestions
- ENTA ring color on avatar

**CHAT module:**
- Message reactions (same 5 elements)
- ENTA hint per chat partner

**WALLET module:**
- Element accent color (per user's ENTA dominant)

**ENTA module:**
- ENTA Wheel (hero widget)
- Element distribution display
- Polarity balance
- Element strengths/deficiencies

**PLUS Hub module:**
- App icon element field
- Featured curation per ENTA element

**U-Reward module:**
- Energy Core glow color (per user element)

**TAO module:**
- Bazi pillar elements
- Element strength analysis
- Phong Thủy direction elements
- Cửu Cung Phi Tinh element mapping

### §3.4 KHÔNG hardcode element labels

```javascript
// CORRECT:
const userElement = getEntaElementLabel('FIRE', locale);  // ✓ adapter

// WRONG:
const labels = { FIRE: 'Hỏa', WATER: 'Thủy', ... };  // ❌ duplicate map
const label = labels[elementId];                       // ❌ bypass adapter
```

---

## §4 VN-SCHOOL PROTECTED TERMS (TAO MODULE)

Per `LANG_OS_07_SEMANTIC_TOKEN_REGISTRY_v1` §5 — Vietnamese-language domain terms NOT translated.

### §4.1 Protected VN terms

| Term | Meaning | Render in EN | Render in VI | Render in PH |
|---|---|---|---|---|
| `Mệnh` | Life palace | Mệnh | Mệnh | Mệnh |
| `Thân` | Body palace | Thân | Thân | Thân |
| `Tử Vi` | Ziwei (TAO V2) | Tử Vi | Tử Vi | Tử Vi |
| `Bát Trạch` | 8-house compatibility | Bát Trạch | Bát Trạch | Bát Trạch |
| `Đại Vận` | 10-year luck pillar | Đại Vận | Đại Vận | Đại Vận |
| `Lưu Niên` | Annual luck | Lưu Niên | Lưu Niên | Lưu Niên |
| `Cung Mệnh` | Life palace | Cung Mệnh | Cung Mệnh | Cung Mệnh |
| `Nạp Âm` | Sound-element | Nạp Âm | Nạp Âm | Nạp Âm |
| `Cửu Cung Phi Tinh` | 9-palace flying stars | Cửu Cung Phi Tinh | Cửu Cung Phi Tinh | Cửu Cung Phi Tinh |
| `Tứ Trụ` | Four pillars (Bazi) | Tứ Trụ | Tứ Trụ | Tứ Trụ |
| `Dụng Thần` | Useful god | Dụng Thần | Dụng Thần | Dụng Thần |
| `Hỉ Thần` | Like-god | Hỉ Thần | Hỉ Thần | Hỉ Thần |
| `Kỵ Thần` | Avoid-god | Kỵ Thần | Kỵ Thần | Kỵ Thần |

### §4.2 Stems and branches (60 Hoa Giáp)

Heavenly Stems (10):
`Giáp / Ất / Bính / Đinh / Mậu / Kỷ / Canh / Tân / Nhâm / Quý`

Earthly Branches (12):
`Tý / Sửu / Dần / Mão / Thìn / Tỵ / Ngọ / Mùi / Thân / Dậu / Tuất / Hợi`

All render literally in Vietnamese form, no translation.

### §4.3 Cultural framing strings

Per TAO canon §2.3, mandatory cultural framing:

EN: "Bazi, Ziwei, and Phong Thủy are East Asian structural knowledge studied for thousands of years. UZG+ presents them so you can understand your structure and environment."

VI: "Bazi, Tử Vi và Phong Thủy là tri thức cấu trúc Á Đông được nghiên cứu hàng ngàn năm. UZG+ trình bày để bạn tự hiểu cấu trúc của mình + môi trường sống."

PH: "Ang Bazi, Tử Vi, at Phong Thủy ay kaalaman sa istraktura ng Silangang Asya na pinag-aralan sa loob ng libu-libong taon. Ipinapakita ng UZG+ upang maintindihan mo ang iyong istraktura at kapaligiran."

### §4.4 Examples

```javascript
// CORRECT — VN term as Vietnamese in all locales:
<h2>Day Master: Mộc</h2>                  // EN UI, but 'Mộc' VN domain term
<p>{`Cung Mệnh: ${result.cung_menh}`}</p>  // 'Cung Mệnh' VN literal

// WRONG — translating VN-school domain term:
<h2>Day Master: Wood</h2>                  // ❌ 'Mộc' not 'Wood' in TAO context
<p>Life Palace: ...</p>                    // ❌ should be 'Cung Mệnh'
```

NOTE: Element token (Wood) là different concept từ VN domain term (Mộc) trong context Bazi/Tử Vi. UI dùng VN term để chuẩn xác culturally.

---

## §5 MODULE: HOME / SOCIAL — DICTIONARY KEYS

### §5.1 Domain ownership

| Section | Domain |
|---|---|
| `feed` | `home` |
| `post` | `community` |
| `compose` | `home` |
| `react` | `community` |
| `connect` | `home` |
| `discover` | `home` |
| `notification` | `home` |
| `qot_trace` | `common` (shared) |

### §5.2 Sample keys (en master baseline)

```javascript
{
  en: {
    home: {
      title: 'Home',
      feed: {
        empty: {
          title: 'Welcome to your Value Stream',
          subtitle: 'Connect with people who resonate with your ENTA',
          cta: 'Find Suggested Resonance'
        },
        loading: 'Loading your stream...',
        error: 'Could not load Value Stream',
        end: 'You\'re all caught up',
        refresh_pill: '{count} new posts',
        new_user_welcome: {
          title: 'Hi {handle}!',
          subtitle: 'Welcome to your Value Stream',
          checklist_connect: 'Connect with 3 Suggested',
          checklist_post: 'Create your first post',
          checklist_circle: 'Join 1 Circle'
        }
      },
      compose: {
        button: 'New Post',
        placeholder: 'Type your post here...',
        char_counter: '{count}/2000',
        submit: 'Post',
        cancel: 'Cancel',
        draft_saved: 'Draft saved',
        gate: {
          qot_required: 'Each post needs Provenance + Actor to build trust',
          qot_label: 'Provenance (REQUIRED)',
          qot_own: 'Own thought',
          qot_referenced: 'Referenced',
          qot_quote: 'Quote post',
          actor_label: 'Actor (REQUIRED)',
          actor_human: 'I am posting as human',
          actor_aier: 'AIER co-authored',
          visibility_label: 'Visibility',
          visibility_public: 'Public',
          visibility_connections: 'Connections only',
          visibility_circle: 'Specific circle'
        },
        media: {
          image: 'Image',
          video: 'Video',
          poll: 'Poll'
        },
        error: {
          submit_failed: 'Could not post. Try again?',
          retry: 'Retry'
        }
      },
      discover: {
        suggested_resonance: 'Suggested Resonance',
        why_suggested: 'Why suggested?',
        not_now: 'Not now',
        connect: 'Connect'
      },
      search: {
        placeholder: 'Search...',
        recent: 'Recent searches',
        categories: {
          people: 'People',
          circles: 'Circles',
          posts: 'Posts',
          aier: 'AIER'
        },
        no_results: 'No matches for "{query}"'
      },
      notification: {
        title: 'Notifications',
        empty: 'No notifications',
        clear: 'Clear',
        types: {
          connection_request: '{name} connected with you',
          reaction: '{name} reacted {element} to your post',
          quote: '{name} quoted your post',
          aier_message: '{name} sent you a message',
          circle_invite: 'Circle "{name}" invited you',
          booking_confirmed: 'Booking confirmed: {service}',
          u_earned: 'You earned +{amount} U for {reason}'
        }
      }
    },
    community: {
      post: {
        edit: 'Edit',
        delete: 'Delete',
        copy_link: 'Copy link',
        report: 'Report',
        edited_label: '(edited)'
      },
      react: {
        wheel_label: 'Choose a reaction',
        aggregate: {
          mostly: 'Mostly {element}',
          strong: 'Strong {element}',
          balanced: 'Balanced 5 elements'
        }
      }
    }
  }
}
```

### §5.3 VI parity sample

```javascript
{
  vi: {
    home: {
      title: 'Trang chủ',
      feed: {
        empty: {
          title: 'Chào mừng đến với Value Stream của bạn',
          subtitle: 'Kết nối với những người cộng hưởng với ENTA của bạn',
          cta: 'Tìm Suggested Resonance'
        },
        // ... (parity continues)
      },
      compose: {
        button: 'Bài viết mới',
        placeholder: 'Viết bài của bạn ở đây...',
        // ...
        gate: {
          qot_required: 'Mỗi bài viết cần Provenance + Actor để xây trust',
          // ...
        }
      }
    }
  }
}
```

NOTE: `Value Stream` / `Suggested Resonance` / `Provenance` / `Actor` — UZG+ specific concepts, có thể giữ nguyên hoặc translate theo NTS preference. Default: UZG+ concepts giữ EN form trong VI để consistency với product language.

### §5.4 Estimated key count

HOME module: **~120-150 keys** total (across all surfaces).

---

## §6 MODULE: CHAT — DICTIONARY KEYS

### §6.1 Sample keys (en)

```javascript
{
  en: {
    chat: {
      title: 'Chat',
      inbox: {
        title: 'Chat',
        empty: 'No chats yet',
        empty_cta: 'Start a chat',
        search_placeholder: 'Search chats...',
        filters: {
          all: 'All',
          dm: 'DM',
          circles: 'Circles',
          aier: 'AIER',
          business: 'Business'
        }
      },
      room: {
        typing: 'typing...',
        typing_multiple: '{names} typing...',
        online: 'online',
        last_seen: 'last seen {time}',
        last_seen_recently: 'last seen recently',
        offline: 'offline',
        composer_placeholder: 'Type message...',
        send: 'Send',
        attach: 'Attach',
        voice_record: 'Hold to record',
        voice_release_send: 'Release to send',
        voice_slide_cancel: 'Slide left to cancel',
        message_status: {
          sent: 'Sent',
          delivered: 'Delivered',
          read: 'Read',
          failed: 'Failed - tap to retry'
        }
      },
      message: {
        edit: 'Edit',
        delete: 'Delete',
        delete_for_me: 'Delete for me',
        delete_for_everyone: 'Delete for everyone',
        reply: 'Reply',
        forward: 'Forward',
        copy: 'Copy',
        react: 'React',
        edited_label: '(edited)',
        deleted_placeholder: 'Message deleted'
      },
      aier: {
        governed_entity_label: 'Governed Entity',
        invoke_button: 'Invoke AIER',
        invoke_select_title: 'Select AIER',
        roles: {
          concierge: 'AIER Concierge',
          sales: 'AIER Sales',
          ops: 'AIER Ops',
          advisor: 'AIER Advisor',
          tao: 'AIER Tao'
        },
        dismiss: 'Dismiss from chat',
        greeting: 'Hi, I\'m {name}, your governed assistant.',
        limits_disclaimer: 'I\'m an AIER, my advice is advisory.'
      },
      business: {
        sidebar_title: 'Business Operations',
        members: {
          title: 'Members',
          leads: 'Leads',
          customers: 'Customers',
          vip: 'VIP'
        },
        crm: {
          title: 'CRM',
          active: 'Active conversations',
          notes: 'Notes & tags'
        },
        booking: {
          title: 'Booking',
          today: 'Today',
          this_week: 'This week',
          calendar: 'Calendar'
        },
        tickets: {
          title: 'Tickets',
          open: 'Open',
          resolved: 'Resolved'
        },
        events: {
          title: 'Events',
          upcoming: 'Upcoming',
          past: 'Past'
        },
        transactions: {
          title: 'Transactions',
          this_month: 'This month: {amount} {currency}'
        }
      },
      info: {
        title: 'Chat Info',
        notifications: 'Notifications',
        pin: 'Pin chat',
        archive: 'Archive',
        block: 'Block',
        clear_history: 'Clear history',
        report: 'Report'
      },
      new_chat: {
        title: 'Start new chat',
        new_dm: 'New DM',
        new_circle: 'New Circle chat',
        talk_aier: 'Talk to AIER',
        browse_business: 'Browse Businesses'
      },
      gates: {
        message_locked: 'Connect at Trusted level to message',
        circle_only: 'Members only',
        business_locked: 'Member tier required'
      }
    }
  }
}
```

### §6.2 Estimated key count

CHAT module: **~150-180 keys**.

---

## §7 MODULE: WALLET — DICTIONARY KEYS

### §7.1 Sample keys (en)

```javascript
{
  en: {
    wallet: {
      title: 'Wallet',
      total_value: {
        label: 'Total Value',
        equivalent: '{amount} equivalent'
      },
      tabs: {
        overview: 'Overview',
        credit: 'Credit',
        u_uzg: 'U + UZG',
        history: 'History'
      },
      assets: {
        credit_section: 'Credit (Monetary)',
        u_uzg_section: 'U + UZG (Utility)',
        last_update: 'Last update: {time}',
        balance: 'Balance'
      },
      actions: {
        convert: 'Convert',
        send: 'Send',
        receive: 'Receive',
        add_funds: 'Add Funds',
        buy_uzg: 'Buy UZG',
        earn_u: 'Earn U'
      },
      convert: {
        title: 'Convert',
        from_label: 'From',
        to_label: 'To',
        amount_label: 'Amount',
        max: 'Max',
        rate_label: 'Rate',
        rate_source: 'Source: {source} · {time}',
        fee_label: 'Conversion fee: {percent}%',
        receive_label: 'You receive',
        preview: 'Preview',
        confirm: 'Confirm Convert',
        success: 'Converted {from_amount} {from_asset} to {to_amount} {to_asset}',
        rate_changed: 'Rate changed. Confirm new rate?',
        gates: {
          insufficient: 'Insufficient balance. Available: {available}',
          minimum: 'Minimum amount: {min}',
          daily_limit: 'Exceeds daily limit. Try smaller amount.',
          tier_required: 'Cash-out requires Builder tier'
        }
      },
      send: {
        title: 'Send',
        recipient_label: 'Recipient',
        recipient_search: 'Search by handle or name',
        recent: 'Recent',
        connections: 'Connections',
        amount_label: 'Amount',
        message_label: 'Message (optional)',
        qot_context: 'Provenance context',
        confirm: 'Confirm Send',
        success: 'Sent {amount} {asset} to {recipient}',
        gates: {
          not_trusted: 'Connect at Trusted level to send U or UZG'
        }
      },
      receive: {
        title: 'Receive',
        select_asset: 'Select asset to receive',
        expected_amount: 'Expected amount (optional)',
        generate: 'Generate payment link',
        share_qr: 'Share QR',
        share_url: 'Share URL',
        copy: 'Copy',
        waiting: 'Waiting for payment',
        received: 'Received {amount} from {sender}'
      },
      add_funds: {
        title: 'Add Funds',
        select_credit: 'Select Credit type',
        select_method: 'Select method',
        methods: {
          bank: 'Bank transfer',
          card: 'Credit card',
          crypto: 'Crypto'
        },
        bank_details: 'Deposit account details',
        pending: 'Pending: {amount} {asset} deposit'
      },
      buy_uzg: {
        title: 'Buy UZG',
        source: 'From',
        amount_credit: 'Amount in {credit}',
        amount_uzg: 'UZG to receive',
        rate_label: '1 {credit} = {rate} UZG',
        confirm: 'Buy UZG'
      },
      history: {
        title: 'Transaction History',
        empty: 'No transactions yet',
        groups: {
          today: 'Today',
          yesterday: 'Yesterday',
          this_week: 'This week',
          this_month: 'This month',
          older: 'Older'
        },
        filter: {
          all: 'All',
          credit: 'Credit only',
          u_uzg: 'U + UZG only',
          conversions: 'Conversions',
          custom: 'Custom date range'
        }
      },
      transaction_detail: {
        title: 'Transaction Detail',
        type_label: 'Type',
        status: {
          verified: 'Verified ✓',
          pending: 'Pending',
          failed: 'Failed',
          hold: 'On hold for review'
        },
        counterparty_label: 'Counterparty',
        reference_label: 'Reference',
        receipt: {
          download: 'Download PDF',
          share: 'Share'
        }
      },
      stats: {
        title: 'Wallet Insights',
        period: {
          month: 'This month',
          quarter: 'This quarter',
          year: 'This year'
        },
        earned: 'Earned',
        spent: 'Spent',
        convert_count: 'Conversions',
        net_flow: 'Net flow',
        u_activity: 'U Activity',
        source_breakdown: 'Source breakdown',
        top_use: 'Top use'
      },
      privacy: {
        not_authority: 'Balance is not authority. Value flows here.'
      }
    }
  }
}
```

### §7.2 Banned vocabulary check

Per WALLET canon §14 + REDLINES §4.4. Audit script must reject:

```javascript
// Forbidden — audit blocks these:
const banned = [
  'Trade', 'Trading',
  'Profit', 'Gain', 'Loss',
  'Pump', 'Dump', 'Moon', 'Floor',
  'Bull', 'Bear',
  'HODL', 'Diamond hands',
  'ROI', 'Yield', 'APR',
  'Whale', 'Shill'
];

// Audit pattern — detect these in wallet.* dictionary:
banned.forEach(word => {
  if (dictContains('wallet.*', word)) {
    audit.fail(`Forbidden vocabulary: "${word}" in wallet domain`);
  }
});
```

### §7.3 Estimated key count

WALLET module: **~200-250 keys** (largest due to flows + states + currencies).

---

## §8 MODULE: ENTA — DICTIONARY KEYS

### §8.1 Sample keys (en)

```javascript
{
  en: {
    enta: {
      title: 'ENTA',
      wheel: {
        label: 'ENTA Wheel',
        elements: {
          fire: '{percentage}% Fire',
          water: '{percentage}% Water',
          wood: '{percentage}% Wood',
          metal: '{percentage}% Metal',
          earth: '{percentage}% Earth'
        }
      },
      identity: {
        format: '{element1}-{element2} dominant · {polarity}',
        polarity: {
          dragon_male: 'Dương Nam',
          shadow_male: 'Âm Nam',
          dragon_female: 'Dương Nữ',
          shadow_female: 'Âm Nữ'
        },
        phase_label: 'Phase: {phase}',
        phases: {
          founding: 'Founding',
          building: 'Building',
          expanding: 'Expanding',
          harvesting: 'Harvesting',
          resting: 'Resting',
          renewing: 'Renewing'
        }
      },
      tabs: {
        identity: 'Identity',
        resonance: 'Resonance',
        circles: 'Circles',
        journey: 'Journey'
      },
      identity_tab: {
        enta_map_title: 'ENTA Map',
        polarity_balance_title: 'Polarity Balance',
        suggested_balance_title: 'Suggested Balance Actions',
        element_status: {
          deficient: 'deficient',
          balanced: 'balanced',
          strong: 'strong',
          excess: 'excess'
        }
      },
      resonance_tab: {
        connected_label: 'Connected',
        connected_count: 'Connected with {count} in your resonance field',
        trust_levels: {
          open: 'Open Connect',
          resonance: 'Resonance Connect',
          circle: 'Circle Connect',
          trusted: 'Trusted Connect'
        },
        top_resonance_title: 'Top Resonance',
        suggested_new_title: 'Suggested Resonance (new)'
      },
      circles_tab: {
        member_of_title: 'Member of',
        suggested_circles_title: 'Suggested Circles',
        role: {
          founder: 'Founder',
          moderator: 'Moderator',
          member: 'Member'
        }
      },
      journey_tab: {
        timeline_title: 'Energy Journey Timeline',
        contribution_history_title: 'Contribution History',
        total_contributions: 'Total QOT-traceable contributions: {count}',
        by_element_title: 'By element'
      },
      onboarding: {
        title: 'Welcome to UZG+',
        subtitle: 'Let\'s discover your ENTA',
        steps: {
          step1_title: 'Birth Data',
          birth_date: 'Birth Date',
          birth_time: 'Birth Time (optional)',
          gender: 'Gender',
          location: 'Birth Location',
          gender_options: {
            male: 'Male',
            female: 'Female',
            other: 'Other'
          },
          privacy_note: 'Used for calculation only. Never shared publicly.',
          step2_title: 'Calculating your ENTA...',
          step3_title: 'Your ENTA',
          step3_format: 'You are {dominant} dominant, {polarity}',
          step4_title: 'Connect with people who resonate',
          step5_title: 'You\'re all set!',
          continue: 'Continue',
          skip: 'Skip',
          enter: 'Enter UZG+'
        }
      },
      edit: {
        title: 'Edit Profile',
        display_name: 'Display name',
        handle: 'Handle (one-time change)',
        bio: 'Bio',
        phase_narrative: 'Phase narrative',
        privacy: 'Privacy settings',
        save: 'Save',
        discard: 'Discard'
      },
      privacy: {
        title: 'Privacy Settings',
        visibility_label: 'Profile visibility',
        visibility: {
          public: 'Public (anyone can view)',
          connections: 'Connections only',
          trusted: 'Trusted only'
        },
        toggles: {
          element_percentages: 'Element percentages',
          phase_narrative: 'Phase narrative',
          connection_count: 'Connection count',
          mutual_circles: 'Mutual circles',
          public_posts: 'Public posts',
          resonance_score: 'Resonance score with others'
        }
      },
      other_user: {
        resonance_with_you: '{percentage}% Resonance with You',
        connect_button: 'Connect',
        connect_states: {
          not_connected: 'Connect',
          open: 'Connected · Open',
          resonance: 'Connected · Resonance',
          circle: 'Connected · Circle',
          trusted: 'Connected · Trusted',
          pending: 'Pending'
        },
        send_message: 'Send Message',
        send_message_locked: 'Connect first to message',
        more_menu: {
          view_posts: 'View public posts',
          mutual_circles: 'Mutual circles',
          block: 'Block',
          report: 'Report'
        }
      }
    }
  }
}
```

### §8.2 Estimated key count

ENTA module: **~180-220 keys**.

---

## §9 MODULE: PLUS HUB — DICTIONARY KEYS (NEW DOMAIN)

### §9.1 Sample keys (en) — NEW domain `plus`

```javascript
{
  en: {
    plus: {
      title: 'UZG+ Apps',
      sections: {
        pinned: 'Pinned',
        featured: 'Featured',
        all_apps: 'All Apps'
      },
      search: {
        placeholder: 'Search apps...',
        no_results: 'No apps match "{query}"',
        suggestions: {
          title: 'Try',
          different_keywords: 'Different keywords',
          browse_featured: 'Browse Featured',
          request_app: 'Request a new app feature'
        }
      },
      categories: {
        all: 'All',
        identity_wisdom: 'Identity & Wisdom',
        economic: 'Economic',
        social: 'Social',
        personal: 'Personal',
        governance: 'Governance',
        business: 'Business'
      },
      sort_options: {
        a_z: 'A-Z',
        recent: 'Recently used',
        most_used: 'Most used',
        category: 'Category'
      },
      apps: {
        u_reward: 'U-Reward',
        tao: 'TAO',
        booking: 'Booking',
        membership: 'Membership',
        marketplace: 'Marketplace',
        retreat: 'Retreat',
        tickets: 'Tickets',
        circles: 'Circles',
        aier_hub: 'AIER Hub',
        stats: 'Stats',
        governance: 'Governance',
        business: 'Business'
      },
      app_actions: {
        long_press_menu_title: 'App: {name}',
        pin: 'Pin to top',
        unpin: 'Unpin',
        hide: 'Hide from grid',
        about: 'About',
        notification_settings: 'Notification settings'
      },
      edit_mode: {
        edit_button: 'Edit',
        done_button: 'Done',
        helper_text: 'Drag to reorder, ✕ to unpin'
      },
      featured: {
        why_button: 'Why?',
        why_title: 'Why is this featured?',
        explanation: 'Featured because: {reason}'
      },
      mini_app: {
        close: 'Close',
        loading: 'Loading {app_name}...',
        loading_slow: 'Slow connection. Continue?',
        unavailable: '{app_name} is currently unavailable',
        coming_soon: 'Coming soon'
      },
      gates: {
        tier_locked: 'Upgrade to {tier} to access {app_name}',
        permission_denied: 'Permission required for {app_name}'
      }
    }
  }
}
```

### §9.2 Estimated key count

PLUS Hub: **~80-100 keys**.

---

## §10 MODULE: U-REWARD — DICTIONARY KEYS (NEW DOMAIN)

### §10.1 Sample keys (en) — NEW domain `ureward`

```javascript
{
  en: {
    ureward: {
      title: 'U-Reward',
      stats: {
        u_balance: 'U: {amount}',
        daily_energy: 'Daily Energy: {percent}%',
        streak: 'Streak: {days} days',
        streak_zero: 'No streak yet',
        level: 'Level {number}',
        level_progress: 'Level {current} → Level {next} ({u_to_go} U to go)'
      },
      tap_module: {
        label: 'TAP',
        energy_core_cta: 'TAP HERE',
        depleted_title: '⚡ Daily energy 0%',
        depleted_subtitle: 'Resets in {time}',
        depleted_alternative: 'Try Quiz or Task instead',
        rapid_tap_warning: 'Slow down for full reward',
        plus_u_format: '+{amount} U'
      },
      quiz_module: {
        label: 'QUIZ',
        question_label: 'Q: {question}',
        submit: 'Submit answer',
        correct_title: 'Correct! ✓',
        correct_reward: '+{amount} U earned',
        explanation_label: 'Explanation',
        next_question: 'Next Question',
        wrong_title: 'Not quite',
        try_again: 'Try again',
        daily_limit_reached: 'Daily quiz limit reached',
        daily_limit_subtitle: 'Resets in {time}'
      },
      task_module: {
        label: 'TASK',
        title: 'Today\'s Tasks',
        empty: 'No tasks today',
        completed_label: 'Completed',
        available_label: 'Available',
        pending_label: 'Pending verification',
        reward_format: '+{amount} U',
        start_task: 'Start task',
        claim: 'I did this',
        verifying: 'Verifying...',
        complete_title: 'Task Complete! ✓',
        complete_format: '"{task_name}" +{amount} U earned',
        daily_refresh: 'Daily refresh in {time}'
      },
      campaign_module: {
        label: 'CAMPAIGN',
        title: 'Active Campaigns',
        empty: 'No active campaigns',
        progress_format: '{current}/{total}',
        ends_in: 'Ends in {time}',
        bonus_format: 'Complete {tasks} tasks → +{amount} U bonus',
        view_tasks: 'View tasks',
        complete_title: 'Campaign Complete!',
        complete_subtitle: '+{amount} U bonus granted'
      },
      streak: {
        milestone: {
          title: '🔥 {days}-day streak!',
          subtitle: 'You\'ve shown commitment.',
          bonus: 'Bonus: +{amount} U',
          next: 'Keep going for {next}-day milestone',
          continue: 'Continue'
        },
        reset: {
          title: 'Streak reset',
          subtitle: 'Start fresh today'
        }
      },
      level: {
        up_title: 'Level {number} reached',
        unlocks_label: 'New unlocks'
      },
      trophy: {
        title: 'Your Achievements',
        earned_section: 'Earned ({count})',
        in_progress_section: 'In Progress ({count})',
        unlock_title: 'Achievement Unlocked',
        unlock_subtitle: '+{amount} U bonus'
      },
      cross_module_earn: {
        toast_format: '+{amount} U for {reason}',
        reasons: {
          new_connection: 'new connection',
          post_value: 'post contribution',
          reaction_received: 'reaction received',
          message_value: 'value-bearing message',
          aier_action: 'AIER advisory action',
          booking_complete: 'booking confirmed',
          tao_chart: 'first chart created',
          tao_daily: 'daily TAO check',
          enta_onboarding: 'ENTA onboarding complete',
          daily_checkin: 'daily check-in'
        }
      },
      settings: {
        title: 'Settings',
        sound: 'Sound effects',
        haptic: 'Haptic feedback',
        daily_reminder: 'Daily reminder notification',
        animation_level: 'Animation level',
        animation: {
          full: 'Full',
          reduced: 'Reduced',
          off: 'Off'
        },
        privacy_hide_stats: 'Hide my stats from others'
      },
      bot_detection: {
        flag_warning: 'Activity flagged for review',
        cooldown_message: 'Activity rate normalized',
        retry_in: 'Try again in {seconds}s'
      }
    }
  }
}
```

### §10.2 Estimated key count

U-Reward: **~100-130 keys**.

---

## §11 MODULE: TAO — DICTIONARY KEYS

### §11.1 Sample keys (en) — heavy use of VN-school protected terms

```javascript
{
  en: {
    tao: {
      title: 'TAO',
      cultural_framing: 'Bazi, Tử Vi, and Phong Thủy are East Asian structural knowledge studied for thousands of years. UZG+ presents them so you can understand your structure and environment.',
      sub_modules: {
        bazi: 'Bazi',
        ziwei: 'Tử Vi',
        phongthuy: 'Phong Thủy'
      },
      no_chart: {
        title: 'You have no Bazi chart yet',
        subtitle: 'Create from ENTA birth data',
        create_button: 'Create Bazi chart'
      },
      bazi: {
        overview_title: 'Bazi (Tứ Trụ)',
        day_master_label: 'Day Master',
        day_master_format: '{element_polarity} ({stem})',
        pillars: {
          year: 'Year Pillar',
          month: 'Month Pillar',
          day: 'Day Pillar',
          hour: 'Hour Pillar'
        },
        chart_status: {
          full: 'Complete chart',
          partial: 'Partial (no birth time)'
        },
        partial_warning: 'Bazi without birth time cannot determine Hour Pillar — important for analysis',
        analysis: {
          day_master: 'Day Master Analysis',
          day_master_strength: 'Strength: {level}',
          element_distribution: 'Element distribution',
          ten_gods: '10 Gods present',
          favorable_elements: 'Favorable elements',
          imbalances: 'Element imbalances'
        },
        useful_god: {
          title: 'Useful God Reading',
          locked_message: 'Premium feature',
          dung_than_label: 'Dụng Thần',
          hi_than_label: 'Hỉ Thần',
          ky_than_label: 'Kỵ Thần'
        },
        luck_pillars: {
          title: 'Đại Vận Timeline',
          past_pillars: 'Past pillars',
          current: 'Current',
          future: 'Future',
          locked_message: 'Premium feature'
        },
        compatibility: {
          title: 'Compatibility Check',
          locked_message: 'Premium feature',
          select_other: 'Select person to compare',
          relationship_label: 'Element relationship',
          relationships: {
            sinh: 'Mutual (sinh)',
            khac: 'Conflict (khắc)',
            hop: 'Harmony (hợp)'
          }
        }
      },
      ziwei: {
        overview_title: 'Tử Vi Đẩu Số',
        chart_label: '12-Palace Chart',
        cung_menh_label: 'Cung Mệnh',
        palaces: {
          menh: 'Mệnh (Life)',
          huynh_de: 'Huynh Đệ (Siblings)',
          phu_the: 'Phu Thê (Marriage)',
          tu_tuc: 'Tử Tức (Children)',
          tai_bach: 'Tài Bạch (Wealth)',
          tat_ach: 'Tật Ách (Health)',
          thien_di: 'Thiên Di (Travel)',
          noi_thuoc: 'Nô Thuộc (Friends)',
          quan_loc: 'Quan Lộc (Career)',
          dien_trach: 'Điền Trạch (Property)',
          phuc_duc: 'Phúc Đức (Fortune)',
          phu_mau: 'Phụ Mẫu (Parents)'
        },
        major_palaces_label: 'Major Palaces',
        annual_decade: {
          title: 'Annual / Decade',
          dai_van_label: 'Đại Vận',
          luu_nien_label: 'Lưu Niên',
          locked_message: 'Premium feature'
        }
      },
      phongthuy: {
        overview_title: 'Phong Thủy',
        cung_menh_label: 'Your Cung Mệnh',
        bat_trach: {
          title: 'Bát Trạch Profile',
          favorable_directions: 'Favorable directions',
          unfavorable_directions: 'Unfavorable directions',
          favorable: {
            sinh_khi: 'Sinh khí (best)',
            thien_y: 'Thiên y (health)',
            dien_nien: 'Diên niên (relationships)',
            phuc_vi: 'Phục vị (stability)'
          },
          unfavorable: {
            tuyet_menh: 'Tuyệt mệnh',
            ngu_quy: 'Ngũ quỷ',
            luc_sat: 'Lục sát',
            hoa_hai: 'Hoạ hại'
          },
          locked_message: 'Member feature'
        },
        residence: {
          title: 'Residence Mapping',
          consent_required: 'Opt-in required',
          home_direction: 'Home direction (front door faces)',
          bedroom_direction: 'Bedroom direction',
          office_direction: 'Office direction (optional)',
          favorable_for: '{direction} is favorable for {activity}',
          activities: {
            sleep: 'sleep',
            work: 'work',
            major_activities: 'major activities'
          }
        },
        phi_tinh: {
          title: 'Cửu Cung Phi Tinh',
          period_9_label: 'Period 9 (Cửu Tử) era',
          annual_stars: 'Annual star positioning',
          auspicious: 'Auspicious sectors',
          cautious: 'Cautious sectors',
          locked_message: 'Premium feature'
        }
      },
      aier_tao: {
        title: 'AIER Tao',
        invoke_button: 'Talk to AIER Tao',
        bound_to_chart_label: 'Grounded on your chart',
        greeting: 'Hi, I\'m AIER Tao. I\'m bound to your chart structure.',
        limits_disclaimer: 'My advice is advisory based on chart structure.'
      },
      lich_van_nien: {
        title: 'Lịch Vạn Niên',
        today_label: 'Today',
        date_format: '{date} ({stem_branch})',
        element_label: 'Element of day',
        personalization: {
          enta: 'According to ENTA: {match}',
          bazi: 'According to Bazi: {match}',
          phi_tinh: 'Phi Tinh: {match}'
        },
        upgrade_prompts: {
          for_bazi: 'Get more detail with Bazi profile (Member)',
          for_phi_tinh: 'Get Phi Tinh insights (Premium)'
        },
        activities: {
          auspicious: 'Auspicious activities',
          cautious: 'Cautious activities'
        }
      },
      chart_wizard: {
        step1_title: 'Confirm birth data',
        step1_subtitle: 'From your ENTA',
        edit_data: 'Edit data',
        step2_title: 'Computing...',
        step3_title: 'Your Result',
        step3_day_master_format: 'Day Master: {element} {polarity} ({stem})',
        view_full_chart: 'View full chart'
      },
      pillar_detail: {
        title: '{pillar_name} Detail',
        stem_label: 'Heavenly Stem',
        branch_label: 'Earthly Branch',
        hidden_stems: 'Hidden Stems',
        element_interactions: 'Element interactions',
        ten_gods_present: '10 Gods present'
      },
      qot_trace: {
        title: 'Provenance Trace',
        formula_version: 'Formula version: {version}',
        source_authority: 'Source: {source}',
        calculation_log: 'Calculation log',
        audit_status: 'Audit status: {status}'
      },
      tier_gate: {
        member_required: 'Member tier required',
        premium_required: 'Premium feature',
        upgrade_to: 'Upgrade to {tier}',
        free_alternative: 'Or learn more: {alternative}'
      }
    }
  }
}
```

### §11.2 VN-school terms render literally in all locales

Per `LANG_OS_07_SEMANTIC_TOKEN_REGISTRY_v1` §5:

```javascript
// Cung Mệnh, Mệnh, Thân, Tử Vi, Bát Trạch, etc.
// Render literally - same string in en/vi/ph dict

// Examples:
en: { tao: { ziwei: { palaces: { menh: 'Mệnh (Life)' } } } }
vi: { tao: { ziwei: { palaces: { menh: 'Mệnh' } } } }
ph: { tao: { ziwei: { palaces: { menh: 'Mệnh' } } } }
```

NOTE: EN có thể thêm explanatory English in parentheses (e.g. "Mệnh (Life)") nhưng Vietnamese term itself doesn't change.

### §11.3 Estimated key count

TAO module: **~250-300 keys** (largest due to 3 sub-modules + AIER + Lịch Vạn Niên).

---

## §12 SHARED DOMAINS (`common`, `system`, `auth`, `shell`, `settings`)

### §12.1 `common` domain

```javascript
{
  en: {
    common: {
      cta: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        skip: 'Skip',
        retry: 'Retry',
        submit: 'Submit',
        search: 'Search',
        share: 'Share',
        copy: 'Copy',
        view_more: 'View more',
        learn_more: 'Learn more'
      },
      status: {
        loading: 'Loading...',
        empty: 'Nothing here yet',
        error: 'Something went wrong',
        success: 'Success',
        pending: 'Pending',
        verified: 'Verified ✓',
        failed: 'Failed'
      },
      time: {
        just_now: 'just now',
        minutes_ago: '{count}m ago',
        hours_ago: '{count}h ago',
        days_ago: '{count}d ago',
        yesterday: 'Yesterday',
        today: 'Today',
        tomorrow: 'Tomorrow'
      },
      unit: {
        char_count: '{current}/{max}',
        more: '+{count} more',
        all: 'All'
      },
      error: {
        generic: 'Something went wrong. Try again.',
        network: 'Connection issue. Retry?',
        permission: 'Permission required',
        not_found: 'Not found',
        timeout: 'Request timed out'
      }
    }
  }
}
```

### §12.2 `shell` domain (Foundation OS)

```javascript
{
  en: {
    shell: {
      bottom_nav: {
        home: 'Home',
        chat: 'Chat',
        plus: 'UZG+',
        wallet: 'Wallet',
        enta: 'ENTA'
      },
      avatar_menu: {
        title: 'Menu',
        shared_section: {
          settings: 'Settings',
          theme: 'Theme & Style',
          projects: 'Projects',
          membership: 'Membership tier',
          switch_account: 'Switch account',
          logout: 'Logout'
        },
        home_section: {
          my_posts: 'My posts',
          bookmarks: 'Bookmarks',
          drafts: 'Drafts',
          lists: 'Lists'
        },
        chat_section: {
          archived_chats: 'Archived chats',
          saved_messages: 'Saved messages',
          folders: 'Folders'
        },
        wallet_section: {
          transaction_history: 'Transaction history',
          cards: 'Cards',
          spending_limits: 'Spending limits'
        },
        enta_section: {
          edit_profile: 'Edit profile',
          privacy: 'Privacy',
          connections: 'Connections'
        }
      },
      floating_plus: {
        home_action: 'New Post',
        chat_action: 'New Chat',
        wallet_action: 'New Transaction',
        enta_action: 'Edit ENTA / Add Connection',
        plus_action: 'Customize Hub'
      },
      offline_banner: 'Offline — actions queued',
      reconnect_banner: 'Reconnected'
    }
  }
}
```

### §12.3 `auth` domain

```javascript
{
  en: {
    auth: {
      login: {
        title: 'Login',
        email_placeholder: 'Email',
        password_placeholder: 'Password',
        submit: 'Login',
        oauth_google: 'Continue with Google',
        oauth_apple: 'Continue with Apple',
        magic_link: 'Send magic link',
        forgot_password: 'Forgot password?'
      },
      signup: {
        title: 'Sign up',
        terms_agree: 'By signing up, you agree to {terms}',
        terms_link: 'Terms & Privacy'
      },
      session: {
        expired_title: 'Session expired',
        expired_subtitle: 'Login again?',
        relogin_button: 'Login'
      },
      onboarding_gate: {
        complete_enta_banner: 'Complete your ENTA to unlock full Value Stream',
        continue_button: 'Continue ENTA setup'
      }
    }
  }
}
```

### §12.4 `system` domain

```javascript
{
  en: {
    system: {
      maintenance: {
        title: 'Under maintenance',
        subtitle: 'We\'ll be back shortly'
      },
      update_required: {
        title: 'App update required',
        subtitle: 'Refresh to get the latest version',
        refresh: 'Refresh now'
      },
      session_conflict: {
        title: 'Logged in on another device',
        stay: 'Stay here',
        logout_other: 'Logout other'
      }
    }
  }
}
```

### §12.5 Estimated total

Shared domains: **~80-100 keys**.

---

## §13 SENTINEL HANDLING

Per `LANG_OS_01_PRINCIPLES_v1` LAW 3 — missing translation → visible sentinel.

### §13.1 Sentinel format

```
[[<locale>_missing:<key>]]
```

Examples:
- VI missing `home.feed.empty.title` → `[[vi_missing:home.feed.empty.title]]`
- PH missing `wallet.convert.confirm` → `[[ph_missing:wallet.convert.confirm]]`

### §13.2 Sentinel visibility

Sentinels visible to users intentionally:
- QA catches gaps
- Dev fixes immediately
- KHÔNG silent fallback to English

### §13.3 Module-specific sentinel monitoring

Audit per module after build:
- HOME module: zero sentinels in production
- CHAT module: zero sentinels
- All modules: zero sentinels at deploy

---

## §14 RENDER CONTRACT COMPLIANCE — V3 EXAMPLES

Per `LANG_OS_05_RENDER_CONTRACT_v1`, all UI strings route through `t()` helper.

### §14.1 HOME module render examples

```javascript
// CORRECT:
import { useT } from '@/system/languageFoundation';

function HomeShell() {
  const t = useT();
  return (
    <header>
      <h1>{t('home.title')}</h1>
      <button>{t('home.compose.button')}</button>
    </header>
  );
}

function PostCard({ post }) {
  const t = useT();
  return (
    <div>
      <span>{t('common.time.minutes_ago', { count: post.minutes_ago })}</span>
      <span>U: {post.u_balance}</span>  {/* U token literal */}
      <NguHanhReaction />
    </div>
  );
}

// WRONG:
function HomeShell() {
  return <h1>Home</h1>;  // ❌ hardcoded
}
```

### §14.2 WALLET module render examples

```javascript
// CORRECT:
import { useT } from '@/system/languageFoundation';

function WalletOverview() {
  const t = useT();
  const balance = useBalance();
  return (
    <div>
      <h2>{t('wallet.total_value.label')}</h2>
      <span className="hero">${balance.usdc} USDc</span>  {/* USDc literal */}
      <p>{t('wallet.total_value.equivalent', { 
        amount: `≈ ₫${balance.vndc} VNDc`  // VNDc literal
      })}</p>
    </div>
  );
}

// WRONG:
function WalletOverview() {
  return (
    <div>
      <h2>Total Value</h2>  {/* ❌ hardcoded */}
      <span>USD Credit: $100</span>  {/* ❌ forbidden variant */}
    </div>
  );
}
```

### §14.3 ENTA module render examples

```javascript
// CORRECT — element token via adapter:
import { useT } from '@/system/languageFoundation';
import { getEntaElementLabel } from '@/system/semanticTokens';

function ENTAWheel({ user, locale }) {
  const t = useT();
  return (
    <div>
      {user.elements.map(el => (
        <Segment 
          key={el.id}
          label={getEntaElementLabel(el.id, locale)}  // 'Hỏa' (vi), 'Fire' (en)
          percentage={el.percentage}
        />
      ))}
    </div>
  );
}
```

### §14.4 TAO module render examples (VN-school terms)

```javascript
// CORRECT — VN-school terms literal:
function BaziChart({ chart }) {
  const t = useT();
  return (
    <div>
      <h2>{t('tao.bazi.day_master_label')}: Mộc</h2>  {/* 'Mộc' VN literal */}
      <h3>Cung Mệnh: {chart.cung_menh}</h3>  {/* 'Cung Mệnh' literal */}
      <Pillar label={t('tao.bazi.pillars.year')} stem="Canh" branch="Ngọ" />
    </div>
  );
}

// WRONG — translating VN domain term:
function BaziChart({ chart }) {
  return (
    <div>
      <h2>Day Master: Wood</h2>  {/* ❌ should be 'Mộc' */}
      <h3>Life Palace: ...</h3>  {/* ❌ should be 'Cung Mệnh' */}
    </div>
  );
}
```

### §14.5 Message contract examples (CHAT module)

Per `LANG_OS_06_MESSAGE_CONTRACT_v1`:

```javascript
// Service returns:
{
  status: 'success',
  data: { message_id: 'msg_abc' },
  message_code: 'chat.message.sent',
  message_params: { recipient: '@elsa' },
  message_fallback: 'Message sent'
}

// UI resolves:
import { resolveMessage } from '@/system/languageMessageContract';

const message = resolveMessage(serviceResult);
// message = 'Sent message to @elsa' (en)
//         = 'Đã gửi tin nhắn cho @elsa' (vi)
```

---

## §15 RESOLVER INTEGRATION — ACTIVE LOCALE

Per `LANG_OS_03_RESOLVER_CONTRACT_v1`, active locale determined by resolver per session.

### §15.1 Locale resolution order

```
1. URL query param (?lang=vi)
2. User profile setting
3. Browser Accept-Language header
4. Default: en
```

### §15.2 V3 modules respect active locale

All 7 modules MUST:
- Use `useT()` hook for translations
- Use `getEntaElementLabel()` adapter for element labels
- Render protected tokens literal
- Render VN-school terms literal (TAO module)
- Emit sentinels (not silent fallback) on missing keys

### §15.3 Locale switching UX

User changes locale via Avatar Menu → Settings → Language:

```
[User selects new locale]
      ↓
[Resolver updates session locale]
      ↓
[UI re-renders với new dictionary lookups]
      ↓
[All modules respect new locale instantly]
      ↓
[Element labels update via adapter]
[VN-school terms remain Vietnamese]
[Protected tokens remain literal]
```

---

## §16 VALIDATION + AUDIT

Per `LANG_OS_11_VALIDATION_AUDIT_v1`, audit script runs:
- Pre-commit
- Pre-merge
- In CI

### §16.1 V3-specific audit checks

```bash
node scripts/language_os_system_lock_audit_v1.mjs
```

Validates:

**Parity (across en/vi/ph):**
- All keys present in all 3 locales
- No missing leaves per locale
- No missing sections per locale

**Contamination:**
- VI dict values are Vietnamese (heuristic)
- PH dict values are Filipino (heuristic)
- KHÔNG English values in VI/PH

**Banned vocabulary (WALLET specific):**
- No "Trade", "Profit", "Pump", "HODL", etc. in `wallet.*`

**Protected tokens:**
- `USDc` literal everywhere (no `USD Credit` variants)
- `UZG+` literal (no `Uniton Zen Garden Plus`)
- 11 tokens immutable

**VN-school terms (TAO specific):**
- `Mệnh`, `Cung Mệnh`, `Bát Trạch`, etc. literal Vietnamese
- KHÔNG translated to English in TAO context

**Domain ownership:**
- All sections owned by registered domains
- 14 domains (12 existing + 2 new: `plus`, `ureward`)

**Sentinels:**
- Zero sentinels in production builds
- Dev builds: visible for QA

### §16.2 Audit report format per module

```
HOME module audit:
  - Keys: 145
  - EN parity: ✓ (145/145)
  - VI parity: ✓ (145/145)
  - PH parity: ✓ (145/145)
  - Sentinels detected: 0
  - Contamination: 0
  - Status: PASS ✓

WALLET module audit:
  - Keys: 232
  - Parity: ✓ (all locales)
  - Banned vocabulary check: PASS
  - Protected token check: PASS
  - Status: PASS ✓

TAO module audit:
  - Keys: 287
  - VN-school terms: PASS (literal)
  - Cultural framing present: PASS
  - Element tokens via adapter: PASS
  - Status: PASS ✓
```

---

## §17 V2 → V3 LANGUAGE OS MIGRATION

### §17.1 V2 current state

V2 codebase has:
- Mixed hardcoded strings + `t()` calls
- Inconsistent dictionary usage
- Some Vietnamese hardcoded in JSX
- Protected tokens not consistently literal
- Element labels duplicated per page

### §17.2 V3 migration tasks

Sprint 1:
1. **Audit V2 hardcoded strings** — scan for non-`t()` text
2. **Build V3 dictionary scaffold** — 14 domains structure
3. **Add `plus` + `ureward` domains** (canon amendment)
4. **Migrate HOME strings** to `home.*` keys
5. **Migrate CHAT strings** to `chat.*` keys

Sprint 2:
6. **Migrate WALLET strings** + banned vocab audit
7. **Migrate ENTA strings** + element adapter integration
8. **Migrate TAO strings** + VN-school term enforcement

Sprint 3:
9. **Build PLUS Hub strings** (new domain)
10. **Build U-Reward strings** (new domain)
11. **VI parity authoring** (all 7 modules)
12. **PH parity authoring** (all 7 modules)
13. **Final audit pass**

---

## §18 SUMMARY METRICS

### §18.1 Total dictionary key count (estimated)

| Module / Domain | Keys (en baseline) |
|---|---|
| HOME (`home` + `community`) | ~150 |
| CHAT (`chat`) | ~180 |
| WALLET (`wallet` + `finance`) | ~250 |
| ENTA (`enta`) | ~220 |
| PLUS Hub (`plus` ⭐NEW) | ~100 |
| U-Reward (`ureward` ⭐NEW) | ~130 |
| TAO (`tao`) | ~300 |
| Shared (`common` + `shell` + `auth` + `system` + `settings`) | ~150 |
| **TOTAL** | **~1,480 keys** |

### §18.2 With parity (3 locales)

Total ~4,440 entries across en/vi/ph dictionaries.

### §18.3 Locale lifecycle

Phase 1 active: en (master) + vi + ph
Phase 2 (future): zh (Chinese) deferred per NTS decision
Phase 3 (future): ja, ko based on market expansion

Adding new locale = additive only (per LAW 5 Scalability):
- Create dict file
- Author parity vs en master
- Audit pass
- No architectural change

---

## §19 KẾT LUẬN — 5 CÂU KHÓA

**1. V3 Language OS = 14 domains (12 existing + 2 NEW: `plus`, `ureward`) — canon amendment required.**

**2. ~1,480 dictionary keys across 7 modules + shared. Parity en/vi/ph = ~4,440 entries.**

**3. Protected tokens (11) render literal in all locales. Element tokens (5) via adapter. VN-school terms (TAO) literal Vietnamese.**

**4. Sentinels visible (no silent fallback). All UI routes through `t()` / message contract / adapter.**

**5. Audit pre-commit / pre-merge / CI: parity check + banned vocab (WALLET) + VN-school enforcement (TAO).**

---

## §20 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized 7 V3 module canons + 5 UX Flow Specs với LANG_OS V1 canon library (12 docs). Includes canon amendment proposal cho 2 new domains. |

---

🔒 UZG+ V3 PWA OS — Language OS Mapping v1.0
End of file.

═══════════════════════════════════════════════════
COMPLETE V3 DELIVERABLE SET — 14 FILES TOTAL
═══════════════════════════════════════════════════

UI CANON LAYER (8 files):
1. UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1.md
2. UZG_PLUS_V3_UIUX_HOME_SOCIAL_CANON_v1.md
3. UZG_PLUS_V3_UIUX_CHAT_CANON_v1.md
4. UZG_PLUS_V3_UIUX_WALLET_CANON_v1.md
5. UZG_PLUS_V3_UIUX_ENTA_CANON_v1.md
6. UZG_PLUS_V3_UIUX_PLUS_HUB_CANON_v1.md
7. UZG_PLUS_V3_UIUX_UREWARD_CANON_v1.md
8. UZG_PLUS_V3_UIUX_TAO_CANON_v1.md
9. UZG_PLUS_V3_UIUX_REDLINES_MASTER_v1.md (cross-cutting)

UX FLOW LAYER (5 files):
10. UZG_PLUS_V3_UX_HOME_FLOW_SPEC_v1.md
11. UZG_PLUS_V3_UX_CHAT_FLOW_SPEC_v1.md
12. UZG_PLUS_V3_UX_WALLET_FLOW_SPEC_v1.md
13. UZG_PLUS_V3_UX_ENTA_PLUS_TAO_FLOW_SPEC_v1.md
14. UZG_PLUS_V3_UX_UREWARD_FLOW_SPEC_v1.md

LANGUAGE OS LAYER (1 file):
15. UZG_PLUS_V3_LANGUAGE_OS_MAPPING_v1.md

═══════════════════════════════════════════════════
