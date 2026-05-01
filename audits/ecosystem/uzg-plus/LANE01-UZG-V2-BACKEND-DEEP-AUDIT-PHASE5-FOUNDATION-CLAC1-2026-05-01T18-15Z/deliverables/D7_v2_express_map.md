# D7 — V2 Express Dependency Map

**Date:** 2026-05-02  
**Source:** server/aier_server.js  
**Total endpoints:** 75  
**API routes:** 63  
**AIER admin routes:** 12

---

## Summary by Domain

| Domain | Count | Auth |
|---|---|---|
| AIER Admin | 19 | USER, ADMIN |
| Admin/UZGFi | 15 | ADMIN |
| Auth/Profile | 3 | USER |
| Chat | 8 | USER |
| Circles | 6 | USER |
| Credit | 1 | USER |
| Feed/Social | 4 | USER |
| Finance | 4 | USER |
| Marketplace | 1 | USER |
| Media | 2 | USER |
| Membership | 2 | USER |
| Network | 4 | USER |
| RBAC | 1 | USER |
| Wallet (V1) | 5 | USER, ADMIN |

---

## AIER Admin

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| GET | `/aier/api/dashboard` | ADMIN | ACTIVE-V2 | L21508 |
| GET | `/aier/api/logs` | ADMIN | ACTIVE-V2 | L21573 |
| POST | `/aier/api/refresh` | ADMIN | ACTIVE-V2 | L21625 |
| GET | `/aier/api/repo-scan` | ADMIN | ACTIVE-V2 | L21537 |
| POST | `/aier/api/run-v8` | ADMIN | ACTIVE-V2 | L21644 |
| POST | `/aier/api/run-v9` | ADMIN | ACTIVE-V2 | L21669 |
| GET | `/aier/api/system-status` | ADMIN | ACTIVE-V2 | L21541 |
| GET | `/aier/api/task-queue` | ADMIN | ACTIVE-V2 | L21549 |
| POST | `/aier/api/task-queue` | ADMIN | ACTIVE-V2 | L21589 |
| GET | `/aier/api/telemetry` | ADMIN | ACTIVE-V2 | L21545 |
| GET | `/aier/api/v8-report` | ADMIN | ACTIVE-V2 | L21565 |
| GET | `/aier/api/v9-report` | ADMIN | ACTIVE-V2 | L21569 |
| GET | `/api/v1/aier/licenses/finance` | USER | ACTIVE-V2 | L20395 |
| GET | `/api/v1/aier/marketplace` | USER | ACTIVE-V2 | L20574 |
| POST | `/api/v1/aier/marketplace/listings` | USER | ACTIVE-V2 | L20614 |
| POST | `/api/v1/aier/marketplace/purchase` | USER | ACTIVE-V2 | L20676 |
| GET | `/api/v1/aier/mint` | USER | ACTIVE-V2 | L20475 |
| POST | `/api/v1/aier/mint` | USER | ACTIVE-V2 | L20515 |
| GET | `/api/v1/aier/overview` | USER | ACTIVE-V2 | L20436 |

## Admin/UZGFi

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| POST | `/api/v1/admin/reconciliation/provider` | ADMIN | ACTIVE-V2 | L21188 |
| POST | `/api/v1/admin/reconciliation/treasury-day` | ADMIN | ACTIVE-V2 | L21137 |
| GET | `/api/v1/admin/uzgfi/audit` | ADMIN | ACTIVE-V2 | L21001 |
| GET | `/api/v1/admin/uzgfi/burn` | ADMIN | ACTIVE-V2 | L20887 |
| GET | `/api/v1/admin/uzgfi/conversions` | ADMIN | ACTIVE-V2 | L20811 |
| GET | `/api/v1/admin/uzgfi/credit` | ADMIN | ACTIVE-V2 | L20963 |
| GET | `/api/v1/admin/uzgfi/marketplace` | ADMIN | ACTIVE-V2 | L20773 |
| GET | `/api/v1/admin/uzgfi/overview` | ADMIN | ACTIVE-V2 | L20735 |
| GET | `/api/v1/admin/uzgfi/reconciliation` | ADMIN | ACTIVE-V2 | L21039 |
| GET | `/api/v1/admin/uzgfi/rewards` | ADMIN | ACTIVE-V2 | L20925 |
| GET | `/api/v1/admin/uzgfi/risk` | ADMIN | ACTIVE-V2 | L21239 |
| POST | `/api/v1/admin/uzgfi/risk/actions` | ADMIN | ACTIVE-V2 | L21277 |
| GET | `/api/v1/admin/uzgfi/treasury` | ADMIN | ACTIVE-V2 | L20849 |
| GET | `/api/v1/admin/withdrawals` | ADMIN | ACTIVE-V2 | L21416 |
| POST | `/api/v1/admin/withdrawals/approve` | ADMIN | ACTIVE-V2 | L21454 |

## Auth/Profile

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| GET | `/api/v1/auth/context` | USER | ACTIVE-V2 | L19641 |
| GET | `/api/v1/profile/bootstrap` | USER | ACTIVE-V2 | L19929 |
| GET | `/api/v1/profile/me` | USER | ACTIVE-V2 | L19667 |

## Chat

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| POST | `/api/v1/chat/safety/actions` | USER | ACTIVE-V2 | L18730 |
| GET | `/api/v1/conversations` | USER | ACTIVE-V2 | L18660 |
| POST | `/api/v1/conversations` | USER | ACTIVE-V2 | L18670 |
| POST | `/api/v1/conversations/presence` | USER | ACTIVE-V2 | L18680 |
| POST | `/api/v1/conversations/typing` | USER | ACTIVE-V2 | L18690 |
| GET | `/api/v1/messages` | USER | ACTIVE-V2 | L18700 |
| POST | `/api/v1/messages` | USER | ACTIVE-V2 | L18710 |
| POST | `/api/v1/messages/read` | USER | ACTIVE-V2 | L18720 |

## Circles

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| GET | `/api/v1/circles` | USER | ACTIVE-V2 | L19755 |
| GET | `/api/v1/circles/:circleId/members/manage` | USER | ACTIVE-V2 | L18797 |
| GET | `/api/v1/circles/:circleKey` | USER | ACTIVE-V2 | L19791 |
| GET | `/api/v1/circles/:circleKey/business/ops` | USER | ACTIVE-V2 | L19847 |
| GET | `/api/v1/circles/business/revenue` | USER | ACTIVE-V2 | L20356 |
| POST | `/api/v1/circles/members/actions` | USER | ACTIVE-V2 | L18849 |

## Credit

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| GET | `/api/v1/credit/profile` | USER | ACTIVE-V2 | L18107 |

## Feed/Social

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| GET | `/api/v1/flow/feed` | USER | ACTIVE-V2 | L20011 |
| POST | `/api/v1/flow/interactions` | USER | ACTIVE-V2 | L20245 |
| POST | `/api/v1/flow/posts` | USER | ACTIVE-V2 | L20072 |
| GET | `/api/v1/posts/:postId` | USER | ACTIVE-V2 | L19703 |

## Finance

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| GET | `/api/v1/deposits` | USER | ACTIVE-V2 | L18277 |
| POST | `/api/v1/deposits/address` | USER | ACTIVE-V2 | L18316 |
| GET | `/api/v1/withdrawals` | USER | ACTIVE-V2 | L18374 |
| POST | `/api/v1/withdrawals/request` | USER | ACTIVE-V2 | L18413 |

## Marketplace

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| GET | `/api/v1/marketplace/finance` | USER | ACTIVE-V2 | L20316 |

## Media

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| GET | `/api/v1/media/enta/object` | USER | ACTIVE-V2 | L20150 |
| POST | `/api/v1/media/enta/upload` | USER | ACTIVE-V2 | L20114 |

## Membership

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| GET | `/api/v1/membership/upgrade` | USER | ACTIVE-V2 | L18177 |
| POST | `/api/v1/membership/upgrade` | USER | ACTIVE-V2 | L18216 |

## Network

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| GET | `/api/v1/connect/suggestions` | USER | ACTIVE-V2 | L18620 |
| POST | `/api/v1/resonance/connect` | USER | ACTIVE-V2 | L18640 |
| GET | `/api/v1/resonance/connections` | USER | ACTIVE-V2 | L18630 |
| POST | `/api/v1/resonance/connections/actions` | USER | ACTIVE-V2 | L18650 |

## RBAC

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| GET | `/api/v1/role/context` | USER | ACTIVE-V2 | L19899 |

## Wallet (V1)

| Method | Path | Auth | Sprint Status | Line |
|---|---|---|---|---|
| POST | `/api/v1/admin/reconciliation/wallet-day` | ADMIN | ACTIVE-V2 | L21086 |
| GET | `/api/v1/admin/uzgfi/wallet` | ADMIN | ACTIVE-V2 | L21378 |
| GET | `/api/v1/wallet/summary` | USER | REPLACED-BY-DIRECT-EF | L18479 |
| POST | `/api/v1/wallet/transfer` | USER | REPLACED-BY-DIRECT-EF | L18554 |
| GET | `/api/v1/wallet/transfers` | USER | REPLACED-BY-DIRECT-EF | L18515 |

---

## Sprint 5.5-5.8 Migration Guidance

### Already Replaced by Direct Edge Functions (Sprint 5.4)
- `GET /api/v1/wallet/summary` → replaced by `wallet_convert_u_to_uzg` / `wallet_spend_uzg` Edge Functions
- `GET /api/v1/wallet/transfers` → replaced by `wallet_convert_u_to_uzg` / `wallet_spend_uzg` Edge Functions
- `POST /api/v1/wallet/transfer` → replaced by `wallet_convert_u_to_uzg` / `wallet_spend_uzg` Edge Functions

### Wallet Routes Still Using V2 Express (Sprint 5.5 targets)
- `POST /api/v1/admin/reconciliation/wallet-day`
- `GET /api/v1/admin/uzgfi/wallet`

### Admin Routes (Keep V2 Express — not in V3 scope)
- `GET /api/v1/admin/uzgfi/overview`
- `GET /api/v1/admin/uzgfi/marketplace`
- `GET /api/v1/admin/uzgfi/conversions`
- `GET /api/v1/admin/uzgfi/treasury`
- `GET /api/v1/admin/uzgfi/burn`
- `GET /api/v1/admin/uzgfi/rewards`
- `GET /api/v1/admin/uzgfi/credit`
- `GET /api/v1/admin/uzgfi/audit`
- `GET /api/v1/admin/uzgfi/reconciliation`
- `POST /api/v1/admin/reconciliation/wallet-day`
- `POST /api/v1/admin/reconciliation/treasury-day`
- `POST /api/v1/admin/reconciliation/provider`
- `GET /api/v1/admin/uzgfi/risk`
- `POST /api/v1/admin/uzgfi/risk/actions`
- `GET /api/v1/admin/uzgfi/wallet`
- `GET /api/v1/admin/withdrawals`
- `POST /api/v1/admin/withdrawals/approve`
- `GET /aier/api/dashboard`
- `GET /aier/api/repo-scan`
- `GET /aier/api/system-status`
- `GET /aier/api/telemetry`
- `GET /aier/api/task-queue`
- `GET /aier/api/v8-report`
- `GET /aier/api/v9-report`
- `GET /aier/api/logs`
- `POST /aier/api/task-queue`
- `POST /aier/api/refresh`
- `POST /aier/api/run-v8`
- `POST /aier/api/run-v9`
