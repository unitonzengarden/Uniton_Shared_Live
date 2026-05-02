# Lane_01 → Lane_02 Outbound Handoffs

CLA-1 (or CLAC1 acting on CLA-1's behalf) writes JSON files here when Lane_01 needs to:
- Dispatch a task into Lane_02 scope (e.g., CHAT/WALLET/PLUS/U-Reward/TAO)
- Propose a cross-cutting fix that requires Lane_02 expertise
- Escalate a blocker discovered in Lane_02 territory while working on Lane_01 scope

## Schema

```json
{
  "handoff_id": "LANE01-TO-LANE02-<TASK>-<ISO>",
  "from": "CLA Lane_01",
  "to": "CLA Lane_02",
  "issued_at": "<ISO>",
  "authority": "AMD_NTS_FULL_TECH_AUTONOMY + NTS auth",
  "scope": "<task description>",
  "recommended_executor": "CLAC2 | Cursor 2 | CLA-2 decides",
  "deliverables_path": "<where Lane_02 push completion>",
  "ac": ["AC-1: ...", "AC-2: ..."],
  "deadline": "<ISO>",
  "status": "OPEN | IN_PROGRESS | DONE | BLOCKED"
}
```

## Active outbound handoffs

(populated as CLA-1 sends)

## Naming

`LANE01-TO-LANE02-<TASK_ID>-<ISO_TIMESTAMP>.md`

## Lifecycle

1. CLA-1 push handoff to this folder
2. NTS notify CLA-2 (or CLA-2 polls Live mirror)
3. CLA-2 reviews + dispatches Lane_02 executor
4. Lane_02 ships + pushes completion notice tới Lane_02's `handoff_to_lane01/` folder
5. CLA-1 verifies CRSP, marks `status: DONE`
