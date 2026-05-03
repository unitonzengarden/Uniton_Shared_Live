# AIER / Uniton Shared Live - Start Here

## Purpose

This is the first file every Lane/LLM should read when cold-starting from `Uniton_Shared_Live`.

## Authority

- `Uniton_Shared` = source of truth.
- `Uniton_Shared_Live` = public mirror / cold-start state only.
- Chat memory is not source of truth.

## Mandatory Read Order

1. `runtime/aier-code/context/SYSTEM_LAW_RUNTIME.md`
2. `runtime/aier-code/context/PROJECT_STATE_RUNTIME.json`
3. `runtime/aier-code/context/LANE03_RUNTIME_STATE.json`
4. `runtime/aier-code/context/SYSTEM_MAP_RUNTIME.md`
5. `runtime/aier-code/context/TASK_REPORT_STANDARD.md`

## Raw URLs

- [SYSTEM_LAW_RUNTIME.md](https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/aier-code/context/SYSTEM_LAW_RUNTIME.md)
- [PROJECT_STATE_RUNTIME.json](https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/aier-code/context/PROJECT_STATE_RUNTIME.json)
- [LANE03_RUNTIME_STATE.json](https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/aier-code/context/LANE03_RUNTIME_STATE.json)
- [SYSTEM_MAP_RUNTIME.md](https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/aier-code/context/SYSTEM_MAP_RUNTIME.md)
- [TASK_REPORT_STANDARD.md](https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/aier-code/context/TASK_REPORT_STANDARD.md)

## Lane Work Protocol

- Read runtime first.
- Run/report the pre-task gate when available.
- Do exactly one scoped task.
- Produce report evidence after work.
- Never write directly to `Uniton_Shared_Live` as source of truth.

## Current State

- AIER Code Phase 1 runtime spine completed.
- Phase 2 report-only pre-task gate completed.
- Runtime context pack completed.
- Next safe action: `LANE03-AIER-CODE-POSTTASK-REPORT-STATE-EMITTER-DESIGN-V1`.

## Existing Mirror Index Files

- [LAW_INDEX_MASTER.md](LAW_INDEX_MASTER.md)
- [SYNC_INFO.md](SYNC_INFO.md)
- [README.md](README.md)
