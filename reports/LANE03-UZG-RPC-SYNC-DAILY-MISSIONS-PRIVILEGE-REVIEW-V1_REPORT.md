# LANE03 UZG RPC Sync Daily Missions Privilege Review V1

Task ID: `LANE03-UZG-RPC-SYNC-DAILY-MISSIONS-PRIVILEGE-REVIEW-V1`  
Generated: `2026-05-01T15:16:18+07:00`  
Lane: `Lane_03`  
Mode: Review/design only

## RESULT

PASS

## Safety

- SQL applied: NO
- Supabase permissions changed: NO
- `supabase db push`: NOT RUN
- Migrations applied: NO
- `schema_migrations` edited: NO
- Frontend/backend code changed: NO
- Deploy performed: NO

## Summary

`public.rpc_sync_daily_missions(uuid,date)` remains a privilege risk because live production grants allow EXECUTE for `PUBLIC`, `anon`, `authenticated`, and `service_role` on a `SECURITY DEFINER` function owned by `postgres`.

GitHub-truth dependency scan found no direct browser/authenticated-client dependency on this RPC. The application runtime dependency found in `origin/main` is the Worker/API path, and that path calls `rpc_sync_daily_missions` through `invokeSupabaseRpc` with `service=true`.

The RPC also references `public.rpc_sync_energy_daily(uuid,date)`, which has already been hardened to service_role-only. Leaving `rpc_sync_daily_missions` callable by `PUBLIC`, `anon`, or `authenticated` creates an indirect bypass risk around the hardened energy sync surface.

## Public Live State Read

Read-only public state sources were fetched successfully:

- `LANE03_BACKEND_RUNTIME_STATE.json`
- `LANE03_SUPABASE_HEALTH_STATE.json`
- `LANE03_RPC_SYNC_ENERGY_DAILY_PRIVILEGE_HARDENING_STATE.json`
- `LANE03_RPC_SYNC_ENERGY_DAILY_DEPENDENCY_SCAN.json`

## Dependency Scan

Scan target: `D:/UZG/Projects/uzgplus-app`  
Scan ref: `origin/main`  
GitHub-truth commit: `f4fa499ce91db118506d5f9cc768783417627888`

Local `uzgplus-app` was dirty and behind origin/main, so no pull was performed. The scan used `origin/main` directly.

### Browser / Authenticated Client

- `src/**`: no `rpc_sync_daily_missions` match.
- `apps/uzg-pwa/src/**`: no `rpc_sync_daily_missions` match.
- Browser `.rpc(` lines found: 23.
- Browser `.rpc(` calls targeting daily mission sync: 0.

Conclusion: no direct browser/authenticated-client dependency was found.

### Worker / API

Worker/API dependency found:

- `origin/main:apps/uzg-pwa/public/_worker.js:11369`
- `origin/main:apps/uzg-pwa/public/_worker.js:11391`
- `origin/main:apps/uzg-pwa/public/_worker.js:11401`
- `origin/main:public/_worker.js:11369`
- `origin/main:public/_worker.js:11391`
- `origin/main:public/_worker.js:11401`

Runtime model:

- `syncDailyMissionsWorker` invokes `rpc_sync_daily_missions`.
- Calls use `invokeSupabaseRpc(..., { service: true })`.
- `buildSupabaseHeaders` uses `config.serviceRoleKey` when `service=true`.

Classification: mixed user-triggered, server-executed. User flows can trigger the Worker path, but the RPC execution is server/service-role owned.

## Live Privilege Review

Read-only live catalog evidence for `public.rpc_sync_daily_missions(uuid,date)`:

- Function exists: YES
- Owner: `postgres`
- Security: `SECURITY DEFINER`
- Volatility: `VOLATILE`
- EXECUTE granted to `PUBLIC`: YES
- EXECUTE granted to `anon`: YES
- EXECUTE granted to `authenticated`: YES
- EXECUTE granted to `service_role`: YES
- References `public.rpc_sync_energy_daily(uuid,date)`: YES

Related hardened function state for `public.rpc_sync_energy_daily(uuid,date)`:

- EXECUTE granted to `PUBLIC`: NO
- EXECUTE granted to `anon`: NO
- EXECUTE granted to `authenticated`: NO
- EXECUTE granted to `service_role`: YES

## Privilege Posture

Selected posture: `RESTRICT_SERVICE_ROLE_ONLY`

Reason: no browser/direct authenticated dependency was found, while the runtime path already uses Worker/API service-role execution. The existing broad grants expose a security-definer sync function that accepts a supplied user id and can indirectly invoke the hardened energy sync RPC.

Risk rating: HIGH

## Canonical Recommendation

Do not keep `authenticated` EXECUTE. Do not leave `PUBLIC` or `anon` EXECUTE. Restrict `public.rpc_sync_daily_missions(uuid,date)` to `service_role` only in a future production apply task with explicit NTS approval.

Future SQL, not applied in this task:

```sql
REVOKE EXECUTE ON FUNCTION public.rpc_sync_daily_missions(uuid,date) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rpc_sync_daily_missions(uuid,date) FROM anon;
REVOKE EXECUTE ON FUNCTION public.rpc_sync_daily_missions(uuid,date) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.rpc_sync_daily_missions(uuid,date) TO service_role;
```

Rollback SQL if a future approved apply must be reversed:

```sql
GRANT EXECUTE ON FUNCTION public.rpc_sync_daily_missions(uuid,date) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.rpc_sync_daily_missions(uuid,date) TO anon;
GRANT EXECUTE ON FUNCTION public.rpc_sync_daily_missions(uuid,date) TO authenticated;
GRANT EXECUTE ON FUNCTION public.rpc_sync_daily_missions(uuid,date) TO service_role;
```

## Remaining Risks

- The hardening SQL was not applied.
- Production still has `PUBLIC`, `anon`, and `authenticated` EXECUTE until a separate approved apply task runs.
- Future code could add direct browser/authenticated dependency, so dependencies must be re-scanned immediately before apply.

## Next Safe Action

`LANE03-UZG-RPC-SYNC-DAILY-MISSIONS-SERVICE-ROLE-HARDENING-APPLY-WITH-NTS-APPROVAL-V1`

With explicit NTS production-apply approval, re-scan dependencies, apply only the four scoped privilege statements, and verify Worker/API runtime.
