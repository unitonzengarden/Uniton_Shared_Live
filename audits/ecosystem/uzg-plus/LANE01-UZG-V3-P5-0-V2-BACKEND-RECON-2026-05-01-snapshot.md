---
task_id: LANE01-UZG-V3-P5-0-V2-BACKEND-RECON-2026-05-01T14-32Z
lane: Lane_01
executor: CLAC1
mode: solo
model: claude-opus-4-7
status: SUCCESS
phase: 5
sprint: 0
priority: P0 — Phase 5 prerequisite
type: Backend audit + documentation (no code changes)
canon_added:
  - canon/uzg-plus/backend/UZG_PLUS_V2_BACKEND_INVENTORY_v1.md
  - canon/uzg-plus/backend/UZG_PLUS_V3_PHASE5_ARCHITECTURE_v1.md
project: uzg-plus
---

# LANE01-UZG-V3-P5-0-V2-BACKEND-RECON-2026-05-01 — Snapshot

**Status:** SUCCESS — Phase 5 prerequisite COMPLETE

## Highlights
- Supabase connectivity verified (5 tests PASS)
- 192 tables inventoried + 188 RPCs + 161 RLS policies + 3 Edge Functions + 78 V2 Express endpoints
- 2 canon docs authored: V2 Backend Inventory + V3 Phase 5 Architecture (Hybrid Option C locked)
- 0 secrets leaked, audit-only sprint

## Backend Connectivity Results (2026-05-01T14:35Z)

| Test | Result | Status |
|---|---|---|
| Anon key REST root | 401 (expected for /rest/v1/ without table) | ✅ Working |
| Service role table read | Schema feedback (table exists) | ✅ Working |
| Auth health (`/auth/v1/health`) | 200 | ✅ PASS |
| Edge Functions (3) HEAD probes | All 405 (route exists, requires POST) | ✅ Reachable |
| OpenAPI swagger spec | Full spec returned | ✅ PASS |

**Conclusion:** Backend fully accessible với new permanent keys. No re-keying needed for Phase 5.

## Inventory Summary

| Asset | Count | Source |
|---|---|---|
| Migrations | 98 | `supabase/migrations/*.sql` |
| Tables (REST endpoints) | 192 | OpenAPI swagger spec |
| RPCs | 188 | OpenAPI swagger spec (`/rpc/*`) |
| RLS policies | 161 | `grep "CREATE POLICY"` migrations |
| Edge Functions | 3 | `supabase/functions/{reward_emit, wallet_convert_u_to_uzg, wallet_spend_uzg}/` |
| V2 Express endpoints | 78 | `server/aier_server.js` (21,696 lines) |

## Tables by Domain (top 10)

| Domain | Count | Key tables |
|---|---|---|
| `enta_*` | 27 | profiles, birth_data, circles, resonance, journey, energy |
| `wallet_*` | 26 | accounts, ledger, currencies, transfers |
| `app_*` | 13 | profiles, posts, bookings, events, memberships, tickets, wallets, user_roles |
| `aier_*` | 10 | command_queue, license_*, logs, tasks, wisdom_vault |
| `booking_*` | 10 | availability, guests, holiday_calendar, payment_records |
| `reward_*` | 8 | settlements, categories, baselines, caps |
| `ticket_*` | 6 | orders, inventory, holders |
| `circle_*` | 6 | members, posts, business_ops |
| `autopilot_*` | 5 | alerts, approvals, execution_history, observations, tasks |
| `ai_*` | 5 | knowledge_blocks, memory_records, messages, threads, training_jobs |

## Edge Functions

| Function | verify_jwt | Purpose |
|---|---|---|
| `reward_emit` | `false` | 12 actionTypes (online_active / post_created / mission_daily / daily_checkin / lucky_spin / chest_loot / quiz_answer / etc.) — server-side cap + cooldown enforcement |
| `wallet_convert_u_to_uzg` | `false` | Convert U → UZG. MIN=100, MAX=500, DAILY_MAX=2500, COOLDOWN=60s |
| `wallet_spend_uzg` | `true` (default) | Spend UZG for booking/ticket only (SUPPORTED_SPEND_TYPES whitelist) |

## V2 Express Endpoints by Group

| Group | Routes | Key endpoints |
|---|---|---|
| `/api/v1/auth/*` + `/profile/*` | 4 | auth/context, profile/me, profile/bootstrap |
| `/api/v1/flow/*` | 3 | feed, posts, interactions |
| `/api/v1/conversations/*` + `/messages/*` | 6 | conversations CRUD, messages CRUD, presence, typing |
| `/api/v1/circles/*` | 7 | list, get, business, members/manage, members/actions |
| `/api/v1/wallet/*` | 4 | summary, transfers, transfer POST |
| `/api/v1/credit/*` + `/membership/*` | 3 | profile, upgrade GET+POST |
| `/api/v1/deposits/*` + `/withdrawals/*` | 4 | list, address, request |
| `/api/v1/aier/*` | 5 | overview, mint GET+POST, marketplace, listings, purchase |
| `/api/v1/admin/*` | 15+ | uzgfi finance, reconciliation, withdrawals approve, risk |
| `/aier/*` | 13 | dashboard, status, telemetry, V8/V9 reports |
| `/api/v1/marketplace/*` + media + chat safety | 4 | finance, media upload/object, chat safety actions |

## Phase 5 Architecture Decision: Hybrid (Option C)

| Sprint | Module | Wire approach |
|---|---|---|
| 5.1 | Auth + Identity | **Direct** Supabase JS client + RPC bootstrap |
| 5.2 | HOME feed | **Hybrid** V2 Express proxy + Supabase Realtime |
| 5.3 | CHAT | **Hybrid** V2 Express proxy + Supabase Realtime channels |
| 5.4 | WALLET | **Direct** Edge Functions + RLS reads |
| 5.5 | ENTA | **Direct** Supabase RPC + RLS (27 tables) |
| 5.6 | PLUS Hub + Membership | **Hybrid** Direct booking RPC + V2 Express membership upgrade |
| 5.7 | U-Reward | **Direct** Edge Function `reward_emit` |
| 5.8 | TAO module | **Direct** Lane_02 engine API (when ready) |

**Pre-Sprint 5.4 task:** Live schema discovery on `wallet_currencies` (test query found `code` column doesn't exist — Phase 4 mock assumed wrong schema).

## Known Gaps + Notes

1. `wallet_currencies` schema differs from Phase 4 mock — Phase 5.4 must verify live schema
2. Edge Function 405 on HEAD/GET expected (POST-only)
3. Edge Function configs in `supabase/config.toml` (not `config.json` per function dir)
4. AIER licensing endpoints may defer to Phase 6 (NFT/blockchain integration)
5. Admin endpoints excluded from V3 user UI Phase 5 scope

## Canon docs authored

- `canon/uzg-plus/backend/UZG_PLUS_V2_BACKEND_INVENTORY_v1.md` — complete backend inventory with per-domain table counts, RPC categorization, Edge Function specs, V2 Express endpoint groups
- `canon/uzg-plus/backend/UZG_PLUS_V3_PHASE5_ARCHITECTURE_v1.md` — Phase 5 architecture decisions, per-sprint wire approach, dependencies, cross-cutting concerns (JWT, Realtime, error handling, caching, security)

## Phase 5 estimated timeline

Per Phase 4 precedent (~1-2h actual per sprint vs 8-12h book):
- 5.0 (this): 30 min ✓
- 5.1 Auth: ~2h
- 5.2-5.7 in parallel: ~10h cumulative
- 5.8 TAO: ~3h (depends on Lane_02 readiness)
- **Total Phase 5: ~16 hours actual**

V3 PRODUCTION COMPLETE estimated 2026-05-08 to 2026-05-15.

## Live mirror URL (CRSP)
`https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/audits/ecosystem/uzg-plus/LANE01-UZG-V3-P5-0-V2-BACKEND-RECON-2026-05-01-report.md`

End of snapshot.
