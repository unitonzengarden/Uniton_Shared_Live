# LANE03-UZG-RPC-SYNC-ENERGY-DAILY-SERVICE-ROLE-PRIVILEGE-HARDENING-DESIGN-OR-APPLY-V1

RESULT: PASS

Captured at: 2026-05-01T02:30:00+07:00

Mode: dependency scan first, scoped privilege apply only after safe gate.

Supabase mutated: YES, scoped function EXECUTE privileges only.

Migrations applied: NO

`supabase db push`: NO

`schema_migrations` modified: NO

Frontend code changed: NO

Backend code changed: NO

Deployment performed: NO

## Public Runtime State Read First

Read from `Uniton_Shared_Live` before planning:

| File | Result |
| --- | --- |
| `LANE03_BACKEND_RUNTIME_STATE.json` | OK |
| `LANE03_SUPABASE_HEALTH_STATE.json` | OK |
| `LANE03_MIGRATION_DRIFT_STATE.json` | OK |
| `LANE03_MIGRATION_BATCH_C_LEDGER.json` | MISSING 404 |
| `LANE03_RPC_PRIVILEGE_DECISION.json` | MISSING 404 |

Authoritative fallback used: `Uniton_Shared` origin/main, which contains the locked Batch C ledger and RPC privilege decision.

## Dependency Scan

Product repo: `D:/UZG/Projects/uzgplus-app`

GitHub truth scanned: `origin/main` at `fad8372ba277e14b08a38dfaec522cc82de6e5a4`.

Local product repo was not pulled because it is dirty with broad unrelated changes.

Patterns scanned:

- `rpc_sync_energy_daily`
- `sync_energy_daily`
- `.rpc(`
- energy sync paths
- authenticated Supabase client usage

Browser/direct authenticated dependency result:

- `src/**`: no `rpc_sync_energy_daily` or `sync_energy_daily` matches.
- `apps/uzg-pwa/src/**`: no `rpc_sync_energy_daily` or `sync_energy_daily` matches.
- Browser `.rpc(` lines scanned: 23.
- Browser `.rpc(` target matches: 0.

Server/runtime dependency result:

- `public/_worker.js:10750`
- `apps/uzg-pwa/public/_worker.js:10824`

Both target calls are inside the Worker/API facade path and invoke:

```js
invokeSupabaseRpc(config, 'rpc_sync_energy_daily', ..., { service: true })
```

`buildSupabaseHeaders` uses `config.serviceRoleKey` when `service: true`, and `resolveSupabaseConfig` reads `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_SERVICE_ROLE_KEY_B64`.

Correct service-role runtime owner: Worker/API facade.

## SQL Function Chain

Migration body references:

- `supabase/migrations/20260407093001_daily_mission_engine_foundation.sql:70`
- `supabase/migrations/20260407112001_daily_mission_reward_link_foundation.sql:85`

Live catalog check:

- `public.rpc_sync_energy_daily(uuid,date)` is `SECURITY DEFINER`, owner `postgres`.
- `public.rpc_sync_daily_missions(uuid,date)` is `SECURITY DEFINER`, owner `postgres`, and references the target function.

This preserved the safety gate for target hardening.

## SQL Applied

```sql
BEGIN;
REVOKE EXECUTE ON FUNCTION public.rpc_sync_energy_daily(uuid,date) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rpc_sync_energy_daily(uuid,date) FROM anon;
REVOKE EXECUTE ON FUNCTION public.rpc_sync_energy_daily(uuid,date) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.rpc_sync_energy_daily(uuid,date) TO service_role;
COMMIT;
```

No other SQL was applied.

## Verification

Before:

- `anon_execute`: true
- `authenticated_execute`: true
- `service_role_execute`: true
- `proacl`: `=X/postgres`, `postgres=X/postgres`, `anon=X/postgres`, `authenticated=X/postgres`, `service_role=X/postgres`

After:

- `anon_execute`: false
- `authenticated_execute`: false
- `service_role_execute`: true
- `proacl`: `postgres=X/postgres`, `service_role=X/postgres`

Verification result: PASS.

## Related Risk Not Changed

`public.rpc_sync_daily_missions(uuid,date)` still has PUBLIC, anon, authenticated, and service_role EXECUTE in the observed live ACL. It was not changed because this task was scoped only to `public.rpc_sync_energy_daily(uuid,date)`.

## Created Files

- `runtime/uzg-plus/lane_03/LANE03_RPC_SYNC_ENERGY_DAILY_PRIVILEGE_HARDENING_STATE.json`
- `runtime/uzg-plus/lane_03/LANE03_RPC_SYNC_ENERGY_DAILY_DEPENDENCY_SCAN.json`
- `reports/LANE03-UZG-RPC-SYNC-ENERGY-DAILY-SERVICE-ROLE-PRIVILEGE-HARDENING-DESIGN-OR-APPLY-V1_REPORT.md`
- `reports/LANE03-UZG-RPC-SYNC-ENERGY-DAILY-SERVICE-ROLE-PRIVILEGE-HARDENING-DESIGN-OR-APPLY-V1.json`
- `snapshots/LANE03-UZG-RPC-SYNC-ENERGY-DAILY-SERVICE-ROLE-PRIVILEGE-HARDENING-DESIGN-OR-APPLY-V1.snapshot.json`
- `audit_logs/LANE03-UZG-RPC-SYNC-ENERGY-DAILY-SERVICE-ROLE-PRIVILEGE-HARDENING-DESIGN-OR-APPLY-V1_audit.log`

## Next Safe Action

`LANE03-UZG-RPC-SYNC-ENERGY-DAILY-HARDENING-MIRROR-TO-LIVE-V1`
