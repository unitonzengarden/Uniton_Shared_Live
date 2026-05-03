# AIER Code System Law Runtime

Generated: `2026-05-03T09:02:00+07:00`  
Purpose: cold-start law and runtime rule summary for AITAO and other LLM executors.

## Core Axioms

- Human = Authority.
- AI = Execution.
- Economy = Constraint.
- Identity precedes capability.
- History is append-only.
- No value without contribution.
- No economy without validated value.
- No trust without traceability.
- Product only reveals truth; product does not create truth.

## Repository Authority

- `Uniton_Shared` = source of truth.
- `Uniton_Shared_Live` = public mirror only.
- Public mirror files are read surfaces for cold-start, not source authority.
- A direct Live-only change must not become truth unless reconciled back into `Uniton_Shared` by an explicit scoped task.

## Lane Work Rule

- Lane work must follow one-task-only.
- A lane may only do the task it was explicitly assigned.
- Do not silently expand scope into Supabase, product repos, deployment, law rewrite, enforcement, or branch protection.
- If the runtime state disagrees with chat memory, repo runtime wins.

## Current AIER Code OS Rule

1. Read runtime first.
2. Run the pre-task gate before task work.
3. Execute only the scoped task.
4. Report after task.
5. Leave stale surfaces untouched unless the task explicitly asks to repair them.

The current gate is report-only. `ALLOW`, `WARN`, and `BLOCK` receipts are advisory until NTS explicitly approves enforcement.

## Redlines

- No direct `Uniton_Shared_Live` source-of-truth.
- No Supabase drift.
- No product repo drift.
- No deploy drift.
- No law rewrite without an explicit law task.
- No governance enforcement change without explicit approval.
- No Live branch protection change without explicit approval.
- No automated task execution unless explicitly approved.
- No chat memory dependency.

## Current Safe Operating Posture

AIER Code is building an OS-like runtime layer in phases:

- Phase 1: runtime spine normalization completed.
- Phase 2: report-only pre-task gate completed.
- Current task: canonical runtime context pack.
- Next safe phase: report-only post-task report/state emitter design.

Until the emitter and later governance phases exist, task completion still requires human-authored report evidence.
