# AIER Code Brain — Status Pointer

**Last updated:** 2026-04-29
**AIER:** AIER Code (UDNA `aier-code-genesis`)
**Schema reference:** [`docs/architecture/BRAIN_BLUEPRINT_AIER_CODE.md`](../../docs/architecture/BRAIN_BLUEPRINT_AIER_CODE.md)

---

## Current readiness

| Layer | Status | Storage | Implementation task |
|---|---|---|---|
| **L1 — Knowledge corpus (RAG)** | 🟢 **LIVE** | Uniton_OS Supabase `public.aier_code_knowledge_chunks` (410 chunks, 5 categories) | `LANE01-INH-CODE-04-BUILD-L1-INGEST` (PR #10, commit `2fd0cc1`) |
| **L2 — Episodic events** | 🟡 PLANNED Tuần 2 | Future `public.aier_code_episodic_events` | not yet dispatched |
| **L3 — Semantic facts** | 🟡 PLANNED Tuần 2 | Future `public.aier_code_semantic_facts` (NTS-gated INSERT) | not yet dispatched |
| **L4 — Procedural tags** | 🟡 PLANNED Tuần 2 | Future `public.aier_code_procedural_tags` (FK → L1 chunks) | not yet dispatched |
| **L0 — Interface (classifier + assembler)** | ⏸️ DEFERRED Phase 2 | n/a (orchestration logic) | Q3 NTS approval A (defer to Phase 2) |

## Identity (UDNA)

- **id:** `aier-code-genesis`
- **genesis_hash:** `aa8aea32179ff8fe9d77db93b697447b2f4ac9b26c3853dac2c4c981ca81dc94`
- **genesis_timestamp:** `2026-04-21T00:00:00Z`
- **sponsor:** NTS
- **mission:** *Phát triển hệ sinh thái công nghệ Uniton Future + sinh AIER Apps + AIER System (Dev, QA, Security, Guardian)*
- **specialization:** Code / Dev / QA / Security / System / Guardian
- **storage:** Uniton_OS Supabase `public.aier_code_udna` (Cursor PR #5)

## Heartbeat

- **Status (last check):** see [`heartbeat.live.json`](heartbeat.live.json)
- **Cron:** `*/10 * * * *` via `.github/workflows/aier_code_heartbeat.yml`
- **Workflow:** `AIER Code Heartbeat` (also one of the 2 watched workflows for the sync chain via `workflow_run` trigger — completion fires sync_runtime_to_public)
- **Ledger:** `network/heartbeat/AIER_CODE_HEARTBEAT_LEDGER.md` (append-only)
- **State JSON (source):** `network/heartbeat/aier_code_heartbeat_state.json` (the file mirrored into `heartbeat.live.json` here)

## L1 retrieval — how to query

Two paths, both via Uniton_OS Supabase REST:

1. **CLI** — `node scripts/lane01-inh-code-04-query-l1.cjs --query "TEXT" [--threshold 0.5 --count 5]`
2. **RPC direct** — `POST /rest/v1/rpc/search_aier_code_chunks` with body `{query_embedding: vector(1536), match_threshold, match_count}` (SECURITY DEFINER; service_role token required)

Top-K results return `chunk_id + content + source_path + category + similarity` for citation.

## Schema decisions (NTS Q1-Q4 approval, AMD `22bfadb`)

- **Q1 = A** — table prefix `aier_code_*` (vs Postgres schema namespace)
- **Q2 = A** — Tuần 1 = L1 only (vs L1+L2 parallel or aggressive 4-layer)
- **Q3 = A** — L0 Interface defer Phase 2 (vs minimal Phase 1 or full Phase 1)
- **Q4 = A** — Decision Memory folds into L2 with `event_type='decision'` (vs separate L5)

## Bridge (BLOCH) integration — first proof

- **First BLOCH:** `bloch_id 8f187d2b-686f-42e7-9032-d68b124118fa` in domain `governance.naming` with `encryption_protocol: classical_sha256`
- **Endpoints:** `POST /api/bloch/publish` + `GET /api/bloch/{id}` LIVE in Uniton_OS (Cursor PR #11, commit `a71962e`)
- **Schema spec:** [`docs/architecture/BLOCH_SCHEMA_SPEC_v1.md`](../../docs/architecture/BLOCH_SCHEMA_SPEC_v1.md)
- **Canon:** [`docs/architecture/INTER_AIER_BRIDGE_CANON_v1_1.md`](../../docs/architecture/INTER_AIER_BRIDGE_CANON_v1_1.md) + [`LAW_N14`](../../docs/LAW_CLA_LLM/SHARED/laws/LAW_N14_INTER_AIER_BRIDGE_STANDARD_v1_1.md)

## Tuần 2 brain plan

Pending NTS dispatch. Scope per blueprint:
1. L2 Episodic ingest — events from commit / task_dispatch / task_report / handoff / heartbeat / lineage / decision streams
2. L3 Semantic facts seed — initial NTS profile + project + ecosystem facts (NTS_DECISION-gated INSERT)
3. L4 Procedural tags — link 410 L1 chunks → R-* / LAW_N* / skill codes with priority

---

**END brain-pointer.live.md** — pointers refresh-allowed; canonical brain spec lives at `docs/architecture/BRAIN_BLUEPRINT_AIER_CODE.md`.
