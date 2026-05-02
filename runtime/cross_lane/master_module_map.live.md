# Master Module Ownership Matrix

**Last update:** 2026-05-02T08:30Z
**Authority:** Lane Division v1 + NTS strategic decision 2026-05-02T08:25Z

| Module | V3 Sprint | Pattern | Lane Owner | Frontend Owner | Backend Owner |
|---|---|---|---|---|---|
| Auth | 5.1+5.10+5.11 | OTP via V2 Worker + Resend + Supabase native | Lane_01 | Lane_01 | V2 (immutable) |
| HOME / Social | 5.2 | Hybrid V2 Express + Realtime | Lane_01 | Lane_01 | V2 (immutable) |
| CHAT | 5.3 | Hybrid V2 Express + Realtime | Lane_02 | Lane_02 | V2 (immutable) |
| WALLET | 5.4+5.11 | Direct Edge Fn + V2 transfer/deposit | Lane_02 | Lane_02 | V2 (immutable) |
| ENTA | 5.5 | Direct RPC + RLS | Lane_01 | Lane_01 | V2 (immutable) |
| PLUS+Membership | 5.6 | Hybrid catalog + V2 upgrade | Lane_02 | Lane_02 | V2 (immutable) |
| U-Reward | 5.7 | Direct reward_emit Edge Fn | Lane_02 | Lane_02 | V2 (immutable) |
| TAO | 5.8 | Hybrid+Mock (V2 has 15 pages, defer wire) | Lane_02 | Lane_02 | Lane_02 engines |
| Settings | 5.9 | Direct localStorage + Supabase | Lane_01 | Lane_01 | Mixed |
| Profile | 5.9 | Direct + V2 avatar (deferred) | Lane_01 | Lane_01 | V2 (immutable) |

## Cross-cutting modules

- **Cross-module reward emit** — Lane_01 hooks (HOME/CHAT/ENTA) + Lane_02 reward_emit Edge Fn understanding
- **i18n** — strings spread all modules — joint
- **Bundle code-split (OBS-02)** — affects all — joint
- **Web Push** — Auth + ENTA + reward triggers — joint
- **TAO ↔ ENTA bridge** (Bazi prefill from ENTA birth data) — Lane_01 owns ENTA, Lane_02 owns TAO compute

## V2 backend immutable

**Both Lanes:** V2 backend (Worker + Express + Supabase + Resend) is immutable — only frontend wire allowed. Any V2 backend change requires NTS strategic decision + new Lane assignment.

## Namespace mapping (apps/uzg-pwa/src/components/)

### Lane_01 namespaces (Lane_02 must NOT edit)
- `auth-v3/` — Auth components
- `enta-v3/` — ENTA components
- `home-v3/` — HOME components (if exists)
- `flow/` — Social feed (HOME)
- `settings-v3/` — Settings components
- `profile-v3/` — Profile components
- `foundation/` — Mobile shell, AvatarMenu, BottomNav (cross-cutting UI/UX)

### Lane_02 namespaces (Lane_01 must NOT edit)
- `chat-v3/` — Chat components
- `wallet-v3/` — Wallet components
- `plus-v3/` — Plus Hub components
- `membership-v3/` — Membership components
- `u-reward-v3/` — U-Reward components
- `tao-v3/` — TAO components

### Shared namespaces (both Lanes coordinate)
- `lib/` — `v2ExpressClient.ts`, shared API clients
- `pages/v3/` — Top-level page wrappers (use module's namespace internally)
- `V3App.jsx` — Routing (changes require coordination)
