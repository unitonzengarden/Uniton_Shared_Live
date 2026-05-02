# Cross-Lane Shared Dashboards

**Maintained by:** CLA Lane_01 + CLA Lane_02 jointly
**Visibility:** Both Lanes read + write (with coordination)

## Files

- `master_module_map.live.md` — module ownership matrix CẢ 2 Lane
- `joint_blockers.live.md` — bugs cross-cutting cần coordination
- `handoff_log.live.md` — all cross-Lane handoffs history

## Update protocol

- Lane_01 updates after Lane_01 commit affecting shared scope
- Lane_02 updates after Lane_02 commit affecting shared scope
- Updates appended-only (never overwrite)
- Each entry includes: timestamp + Lane + commit SHA + summary

## Authority

- LAW-NTS-LANE-1-07 (cross-Lane communication formal)
- NTS strategic decision 2026-05-02T08:25Z (runtime-first mandate)

## Both Lanes runtime-first mandate (effective 2026-05-02T08:30Z)

🔴 Cả 2 Lane PHẢI đọc runtime via Live mirror raw URL trước mỗi action
🔴 Cả 2 Lane PHẢI push state updates sau commit
🔴 Cross-Lane handoffs PHẢI dùng JSON formal
