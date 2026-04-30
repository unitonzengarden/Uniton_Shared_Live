# LANE03-UZG-BACKEND-RUNTIME-STATE-SPINE-AUDIT-V1

RESULT: WARNING

Captured at: 2026-04-30T22:59:19+07:00

Mode: AUDIT ONLY / STATE FILE PUBLISH ONLY

Supabase mutated: NO

Migrations applied: NO

Deployment performed: NO

Backend code changed: NO

## Mission

Create the first durable GitHub-backed Lane_03 Backend Runtime State Spine for UZG+ so AITAO and future Codex sessions can start from repository state instead of chat memory.

## Public Live State Read First

Read before planning:

- `runtime/AIER_CONTEXT_PACKET.json` from `Uniton_Shared_Live`
- `runtime/health/ECOSYSTEM_HEALTH_STATE.json` from `Uniton_Shared_Live`
- `runtime/health/LATEST_VERIFIED_COMMITS.json` from `Uniton_Shared_Live`
- `runtime/health/BLOCKERS_AND_RISKS.md` from `Uniton_Shared_Live`
- `network/task_queues/Lane_03.md` from `Uniton_Shared_Live`

Public mirror state says:

- Ecosystem aggregate health is YELLOW.
- Uniton_Shared is governance/source truth.
- Uniton_Shared_Live is public mirror/read-only runtime visibility.
- Mirror packet status was verified/synced at the published packet source commit.
- Open ecosystem risks include branch protection planning, PR backlog review, secret review, product CI/README evidence gap, and phase gate reconciliation.

## Repo Truth

### Uniton_Shared

- Path: `D:/UZG/Projects-v2/Uniton_Shared`
- Remote: `unitonzengarden/Uniton_Shared`
- Branch: `main`
- Fast-forward pull performed from origin/main before writing.
- HEAD after pull: `f96a04ce67515e81e7744d493af230d49c5e8ff5`
- Origin/main: `f96a04ce67515e81e7744d493af230d49c5e8ff5`

### uzgplus-app

- Path: `D:/UZG/Projects/uzgplus-app`
- Remote: `unitonzengarden/uzgplus-app`
- Local HEAD: `2c55814facf69b3ab6171aee285d4320555427ce`
- Origin/main after fetch: `241f771a306a696228160153e262ebb1cf51e554`
- Divergence: local ahead 1, behind 96
- Pull not performed because local product workspace is dirty with broad unrelated state.

WARNING: Current product code truth is GitHub origin/main. Local Lane_03 reports are used as historical audit evidence. This is the main evidence gap preventing PASS.

## State Files Created

- `runtime/uzg-plus/lane_03/LANE03_BACKEND_RUNTIME_STATE.json`
- `runtime/uzg-plus/lane_03/LANE03_SUPABASE_HEALTH_STATE.json`
- `runtime/uzg-plus/lane_03/LANE03_MIGRATION_DRIFT_STATE.json`
- `runtime/uzg-plus/lane_03/LANE03_REALTIME_STATE.json`
- `runtime/uzg-plus/lane_03/LANE03_BACKEND_ROADMAP.json`
- `runtime/uzg-plus/lane_03/LANE03_NEXT_SAFE_ACTION.md`

Also created:

- `reports/LANE03-UZG-BACKEND-RUNTIME-STATE-SPINE-AUDIT-V1_REPORT.md`
- `reports/LANE03-UZG-BACKEND-RUNTIME-STATE-SPINE-AUDIT-V1.json`
- `snapshots/LANE03-UZG-BACKEND-RUNTIME-STATE-SPINE-AUDIT-V1.snapshot.json`
- `audit_logs/LANE03-UZG-BACKEND-RUNTIME-STATE-SPINE-AUDIT-V1_audit.log`

## Backend/API Ownership Map

Current ownership is hybrid and still needs cleanup:

- Cloudflare Pages is the active product deploy path from `.github/workflows/deploy.yml`.
- Worker API facade source/artifacts exist at `public/_worker.js` and `apps/uzg-pwa/public/_worker.js`, but deployment source ownership remains ambiguous.
- Express/AIER runtime exists at `server/aier_server.js` and is wired by `package.json` `start` / `aier:start`; it should be treated as admin/system/transitional runtime.
- `api/wisdom.js` exists as a narrow OpenAI wisdom endpoint source, but origin/main no longer has `vercel.json`, so active deployment ownership is unclear.
- Supabase Edge Functions own transactional wallet/reward boundaries: `reward_emit`, `wallet_convert_u_to_uzg`, `wallet_spend_uzg`.
- Direct Supabase from the PWA remains active through service files and must stay contract-bound by RLS/RPC/realtime canon.

## Supabase State

Read-only catalog refresh:

- Public schema: 161 tables, 128 RLS-enabled tables, 29 views.
- Public functions: 260, of which 181 are SECURITY DEFINER.
- Private functions: 126, of which 50 are SECURITY DEFINER.
- Live migration history count: 24.
- Live max migration version: `20260419114000`.

RLS Phase 2 target:

- `public.enta_circle_members`: RLS enabled, 2 policies.
- `public.enta_circles`: RLS enabled, 1 policy.
- `public.enta_connections`: RLS enabled, 2 policies.
- `public.enta_messages`: RLS enabled, 2 policies.

Known U-Reward state:

- Helper permission 403 is fixed.
- Summary/history performance remains slow and above the 1800 ms soft timeout.
- Optimization design exists and has not been applied.

## Migration Drift State

Read-only `supabase migration list --linked` refreshed:

- Matched migrations: 24.
- Valid LOCAL-only migrations: 38.
- REMOTE-only migrations: 0.
- Legacy filename skipped migrations: 35.

Batch status:

- Batch B ledger reconciled with warning.
- Batch C body diff complete with warning.
- Batch D remains blocked pending NTS approval.
- Legacy skipped migration reconciliation remains blocked.

## Realtime State

Live `supabase_realtime` publication includes:

- `public.enta_connections`
- `public.flow_reactions`
- `public.follows`

Frontend services subscribe to or expect additional realtime surfaces such as wallet, reward, notifications, feed, chat, presence, and conversation tables. This is a confirmed publication/subscription drift and should be resolved by design before any publication mutation.

## U-Reward Risk

U-Reward is PARTIAL:

- Permission 403: fixed.
- RPC HTTP 200 path: restored in latest audits.
- Performance: unresolved.
- Slowest known root cause: heavy `public.u_reward_settled_history_view` projection and per-row local-date/timezone helper overhead.
- Next performance path: dry-run and conditional apply of the designed summary/history RPC rewrite.

## Health / Blockers / Risks

The state spine is usable, but result is WARNING because:

- Product local workspace is behind origin/main and dirty.
- Supabase advisor counts were not re-run in this spine task, only live catalog was refreshed.
- Migration drift remains APPLY_BLOCKED.
- Realtime drift remains design-required.
- Runtime ownership remains split.

No confirmed BLOCKED condition prevented creating the spine.

## Roadmap

Next safe action:

`LANE03-UZG-MIGRATION-DRIFT-BATCH-C-LEDGER-AND-RPC-PRIVILEGE-OWNER-DECISION-V1`

Secondary design-ready task:

`LANE03-UZG-REALTIME-PUBLICATION-AND-SUBSCRIPTION-DRIFT-DESIGN-V1`

## Verdict

WARNING: all required state files were created and evidence-backed, but some facts remain evidence gaps because product local state is behind origin/main and some advisory/runtime checks were intentionally not re-run.
