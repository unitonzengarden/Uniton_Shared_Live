# Screenshot before/after — V2 PLUS Hub UI upgrade

## BEFORE (V2 /app pre-PR #113)

V2 PlusHub component (`apps/uzg-pwa/src/components/layout/PlusHub.jsx`) rendered:
- Modal-style overlay (`open={true}`)
- 3 large card buttons with text descriptions:
  - "Membership" — "Manage your tier and benefits"
  - "UZGFI Marketplace" — "Browse and purchase products"
  - "AIER" — "AI advisor and services"
- onClose → navigate('/dashboard')

UI characteristic: card-text-list, large vertical scrolling.

## AFTER (V2 /app post-PR #113)

V3 PlusHubShellV3 component (`apps/uzg-pwa/src/components/plus-v3/PlusHubShellV3.tsx`) renders:
- Springboard layout (4-column icon grid, mobile-first)
- 3 sections:
  - **Đã ghim** (Pinned) — default 4 apps: U-Reward, TAO, Booking, Membership
  - **Đề xuất** (Featured) — Membership, TAO, U-Reward, Circles
  - **Tất cả ứng dụng** (All Apps) — 12 apps alphabetically sorted
- Search bar at top: "🔍 Tìm ứng dụng"
- Each icon shows emoji + Vietnamese label + tier-lock indicator

UI characteristic: icon grid springboard, compact, Á Đông mobile pattern.

## Visual diff

| Aspect | Before | After |
|---|---|---|
| Layout | Card list (3 large cards) | Icon grid (4 cols × 3 rows) |
| Density | Low (scroll required) | High (above fold) |
| Pattern | Card-text | Springboard mobile |
| Sections | 1 (flat list) | 3 (Pinned/Featured/All) |
| Search | Absent | Top search bar |
| Tier gating | Hidden | Lock icon affordance |
| Apps shown | 3 (Membership/UZGFI/AIER) | 12 (full Lane_02 catalog) |

## Wired apps (7) — tap navigates V2 route

| Icon | Label | V2 Route |
|---|---|---|
| ⚡ | U-Reward | /u-earnings |
| 🔮 | TAO | /v3/tao (V3 module live) |
| 📅 | Booking | /booking |
| 💎 | Membership | /membership |
| ⭕ | Circles | /circles |
| 🤖 | AIER Hub | /aier |
| 🎫 | Tickets | /tickets |

## Stub apps (5) — tap shows "Sắp ra mắt" alert

| Icon | Label | Reason |
|---|---|---|
| 🛍 | Marketplace | V2 route undefined |
| 🌿 | Retreat | V2 route undefined |
| 📊 | Stats | V2 route undefined (also tier-locked: Member+) |
| 🗳 | Governance | V2 route undefined (also tier-locked: Premium+) |
| 💼 | Business Tools | V2 route undefined (also tier-locked: Business) |

## Manual verification steps

1. Open https://uzg.plus/app on browser (must be ENTA-complete user)
2. Verify springboard icon grid renders (NOT card text list)
3. Tap "TAO" icon → should navigate to /v3/tao
4. Tap "Membership" icon → should navigate to /membership
5. Tap "Marketplace" icon → should show "Sắp ra mắt — Marketplace" alert
6. Tap "Stats" icon (Free user) → should show TierLockedAppV3 modal

## Smoke test note

Playwright auth-bypass smoke fixture (Explorer tier `auditmol5eus0@deltajohnsons.com`) gets redirected to ENTA onboarding before /app renders. Manual NTS verification or fixture upgrade (auto-fill ENTA) needed for automated 5/5 PASS.
