# V3 Modules Status — Lane_01 Owned

**Lane:** Lane_01
**Last update:** 2026-05-02T08:30Z

## Lane_01 OWNED modules current state

| Module | Sprint | Pattern | Status | Next priority |
|---|---|---|---|---|
| Auth (OTP via V2) | 5.1+5.10+5.11 | OTP via V2 Worker + Resend + Supabase native | ✅ PROD | UX polish edge cases |
| HOME / Social feed | 5.2 | Hybrid V2 Express + Realtime | ✅ PROD | Visual polish vs mockup |
| ENTA | 5.5 | Direct RPC + RLS | ✅ PROD | Wheel animation polish + Connect actions |
| Settings | 5.9 | Mixed | ✅ PROD | Notification toggle wiring |
| Profile | 5.9 | Direct + V2 avatar deferred | ✅ PROD | Avatar V2 endpoint Phase 6 |

## Lane_02 OWNED (Lane_01 NOT scope — read-only awareness)

| Module | Sprint | Owner | Lane_01 ref status |
|---|---|---|---|
| CHAT | 5.3 | Lane_02 will polish | Functional, V3 wired |
| WALLET | 5.4+5.11 | Lane_02 will polish | Functional, Send/Receive added |
| PLUS+Membership | 5.6 | Lane_02 will polish | Functional |
| U-Reward | 5.7 | Lane_02 will polish | Functional |
| TAO | 5.8 | Lane_02 will wire V2 backend | Hybrid+Mock currently |

## Production routes (24)

- **Lane_01:** /v3/, /v3/login, /v3/signup, /v3/home, /v3/enta, /v3/enta/onboarding, /v3/settings, /v3/profile/me, /v3/connections
- **Lane_02:** /v3/chat, /v3/wallet, /v3/wallet/U, /v3/wallet/USDc, /v3/wallet/send, /v3/wallet/receive, /v3/plus, /v3/membership, /v3/u-reward, /v3/tao, /v3/tao/bazi, /v3/tao/tuvi, /v3/tao/phongthuy, /v3/tao/lichvannien, /v3/tao/aier
