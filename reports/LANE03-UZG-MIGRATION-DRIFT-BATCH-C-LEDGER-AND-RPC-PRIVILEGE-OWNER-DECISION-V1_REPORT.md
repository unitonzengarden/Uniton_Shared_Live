# LANE03-UZG-MIGRATION-DRIFT-BATCH-C-LEDGER-AND-RPC-PRIVILEGE-OWNER-DECISION-V1

RESULT: PASS

Captured at: 2026-05-01T01:25:31+07:00

Mode: GOVERNANCE + LEDGER + DECISION ONLY

Supabase mutated: NO

Migrations applied: NO

Database mutated: NO

`schema_migrations` modified: NO

Supabase permissions changed: NO

## Mission

Complete Batch C migration drift resolution by creating ledger entries for live-equivalent migrations, locking superseded migrations as `DO_NOT_APPLY`, and publishing a canonical owner/security decision for `public.rpc_sync_energy_daily(uuid,date)`.

## Source Evidence

- `runtime/uzg-plus/lane_03/LANE03_MIGRATION_DRIFT_STATE.json`
- `runtime/uzg-plus/lane_03/LANE03_SUPABASE_HEALTH_STATE.json`
- `runtime/uzg-plus/lane_03/LANE03_BACKEND_RUNTIME_STATE.json`
- `reports/LANE03-UZG-MIGRATION-DRIFT-BATCH-C-FUNCTION-RPC-PUBLICATION-BODY-DIFF-AND-DRY-RUN-DESIGN-V1.json` from the product evidence set
- `docs/canon/LANE03_SUPABASE_SCHEMA_RLS_RPC_SECURITY_CANON_V1.md` from the product evidence set
- `docs/canon/LANE03_BACKEND_API_RUNTIME_OWNERSHIP_CANON_V1.md` from the product evidence set

## Ledger Created

These Batch C migrations are ledgered as live-equivalent and must not be reapplied:

| Version | File | Domain | Live equivalent | Apply | Reason |
| --- | --- | --- | --- | --- | --- |
| `20260320180501` | `20260320180501_v2_p5_circle_wallet_payment_trace_receiver_fix.sql` | Business/Wallet | true | false | already represented in production state |
| `20260412163000` | `20260412163000_u_reward_engine_unification_lock.sql` | U-Reward | true | false | already represented in production state |
| `20260412193000` | `20260412193000_u_reward_engine_consolidation_fix.sql` | U-Reward | true | false | already represented in production state |
| `20260417124500` | `20260417124500_wallet_global_credit_assert_rules_fix.sql` | Wallet/UZGFi | true | false | already represented in production state |
| `20260418093000` | `20260418093000_social_realtime_publication_fix.sql` | Cross-domain realtime | true | false | already represented in production state |

## DO_NOT_APPLY Locked

These Batch C migrations are locked as `DO_NOT_APPLY`:

| Version | File | Apply | Reason |
| --- | --- | --- | --- |
| `20260320154501` | `20260320154501_v2_p5_business_revenue_settlement_unblock.sql` | false | superseded / conflicting / not needed |
| `20260320161001` | `20260320161001_v2_p5_circle_wallet_account_scope_fix.sql` | false | superseded / conflicting / not needed |

The prior body-diff evidence says these old migration bodies would regress current live function bodies.

## RPC Privilege Decision

Target: `public.rpc_sync_energy_daily(uuid,date)`

Current risk from prior evidence:

- EXECUTE granted to PUBLIC: YES
- EXECUTE granted to anon: YES
- EXECUTE granted to authenticated: YES
- EXECUTE granted to service_role: YES

Canonical decision:

- Revoke PUBLIC execute.
- Revoke anon execute.
- Revoke authenticated execute.
- Preserve or grant service_role execute.
- Restrict runtime execution to service_role only.
- Do not apply SQL in this task.

Decision SQL for a future scoped task, not applied here:

```sql
REVOKE EXECUTE ON FUNCTION public.rpc_sync_energy_daily(uuid,date) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rpc_sync_energy_daily(uuid,date) FROM anon;
REVOKE EXECUTE ON FUNCTION public.rpc_sync_energy_daily(uuid,date) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.rpc_sync_energy_daily(uuid,date) TO service_role;
```

## Decision Rationale

Governance canon:

- RPC grants must be role-specific.
- Anon-callable RPCs must be intentionally public and safe.
- Security-definer functions require minimal executable roles and must revoke PUBLIC unless intentionally public.

Economic constraint model:

- Daily energy sync is user-scoped progression state and may affect Flow/reward/economy-adjacent behavior.
- Economy-adjacent synchronization should be run by trusted server runtime, not by anon/public/browser callers.

Runtime ownership model:

- Service role is server-only.
- Browser direct Supabase calls are allowed only for explicit RLS/RPC/read contracts.
- Synchronization and transactional work belongs behind Worker/API, Express/AIER, or Edge Function boundaries after authorization.

## Created Files

- `runtime/uzg-plus/lane_03/LANE03_MIGRATION_BATCH_C_LEDGER.json`
- `runtime/uzg-plus/lane_03/LANE03_RPC_PRIVILEGE_DECISION.json`
- `reports/LANE03-UZG-MIGRATION-DRIFT-BATCH-C-LEDGER-AND-RPC-PRIVILEGE-OWNER-DECISION-V1_REPORT.md`
- `reports/LANE03-UZG-MIGRATION-DRIFT-BATCH-C-LEDGER-AND-RPC-PRIVILEGE-OWNER-DECISION-V1.json`
- `snapshots/LANE03-UZG-MIGRATION-DRIFT-BATCH-C-LEDGER-AND-RPC-PRIVILEGE-OWNER-DECISION-V1.snapshot.json`
- `audit_logs/LANE03-UZG-MIGRATION-DRIFT-BATCH-C-LEDGER-AND-RPC-PRIVILEGE-OWNER-DECISION-V1_audit.log`

## Remaining Risks

- The `rpc_sync_energy_daily` privilege decision has not been applied.
- A frontend direct RPC dependency check is still required before revoking authenticated execute.
- Batch D high-risk migrations remain blocked pending NTS approval.
- Broad `supabase db push` remains blocked.
- `schema_migrations` remains unrepaired by design.

## Next Safe Action

`LANE03-UZG-RPC-SYNC-ENERGY-DAILY-SERVICE-ROLE-PRIVILEGE-HARDENING-DESIGN-OR-APPLY-V1`
