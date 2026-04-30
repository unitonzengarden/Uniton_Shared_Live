# Lane_03 UZG+ Backend Next Safe Action

Generated at: 2026-04-30T22:59:19+07:00

RESULT: WARNING

## Next Safe Action

`LANE03-UZG-MIGRATION-DRIFT-BATCH-C-LEDGER-AND-RPC-PRIVILEGE-OWNER-DECISION-V1`

## Why

Migration drift remains the current safest governance blocker to resolve before any backend SQL apply. Batch C body diff is complete:

- 5 candidates are live-equivalent ledger candidates.
- 1 candidate, `20260407001501`, needs owner/security decision because `public.rpc_sync_energy_daily(uuid,date)` currently allows public/anon EXECUTE.
- 2 candidates, `20260320154501` and `20260320161001`, are superseded and must not be applied.

## Allowed Scope

- Ledger / owner decision only.
- No production SQL apply.
- No `supabase db push`.
- No manual `schema_migrations` repair.
- No grant/revoke changes unless a later task explicitly scopes a privilege apply.

## Still Safe But Not Next

`LANE03-UZG-REALTIME-PUBLICATION-AND-SUBSCRIPTION-DRIFT-DESIGN-V1` is ready as a design-only task, but should not mutate publications or frontend code.

## Stop Conditions

Stop and report BLOCKED if:

- A task asks to run broad migration apply.
- A task asks to repair `schema_migrations` without NTS approval.
- A task asks to publish realtime tables without privacy/RLS design.
- A task asks to fix U-Reward performance without dry transaction and rollback.
