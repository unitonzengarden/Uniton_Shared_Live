# DEPLOY EVENTS LEDGER

**Append-only.** Tracks Vercel preview/prod deploys + GitHub Actions infrastructure deploys (workflows, migrations).

**Schema** (per `LIVE_LEDGER_SCHEMA_v1` §3.4):

| Date | Project | Env | Vercel URL | Commit | Build | Notes |

---

## 2026-04-29

| Date | Project | Env | URL | Commit | Build | Notes |
|---|---|---|---|---|---|---|
| 2026-04-29 | Uniton_OS Supabase | prod-db migration | (Mgmt API) | `f79a01c` | success | Migration `0033_aier_code_knowledge_chunks.sql` applied — L1 brain table + RPC + RLS + ACL (LANE01-INH-CODE-04 Phase A) |
| 2026-04-29 | Uniton_OS Supabase | prod-db migration | (Mgmt API) | `9d6ba0d` | success | Migration `0034_bloch_pool_tables.sql` applied — bloch_pool + qot_lineage tables (LANE01-BRIDGE-02) |
| 2026-04-29 | Uniton_OS Vercel app | (TBD — preview/prod) | (TBD) | `a71962e` | (TBD) | BLOCH endpoints code merged in Uniton_OS PR #11. Vercel preview/prod deploy state to be recorded here when next Vercel run completes |
| 2026-04-29 | Uniton_Shared GitHub Actions | workflow | n/a | `2aa57d4` | success | `aier_code_heartbeat.yml` workflow LIVE (cron */10 min) (LANE01-INH-CODE-02) |
| 2026-04-29 | Uniton_Shared GitHub Actions | workflow | n/a | `584bef2` | success | `sync_runtime_to_public.yml` workflow_run trigger LIVE — sync chain self-healing (LANE01-LIVE-LEDGER-TRIGGER-FIX) |

---

## Notes

- Vercel preview/prod deploys for the Uniton_OS Next.js app are recorded here when LANE01-UI-DEPLOY-PRECHECK / -PREVIEW / -PROD tasks run. As of 2026-04-29 these tasks are pending dispatch (per `status/NEXT_ACTIONS.live.md`).
- Migration deploys count as "deploy events" for Live Ledger purposes — they materially change production-side state.
- Workflow LIVE events count too — they affect ecosystem behavior (heartbeat, sync, dispatcher).

---

**END deploy-events.live.md** — schema reference: `docs/architecture/LIVE_LEDGER_SCHEMA_v1.md` §3.4
