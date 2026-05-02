# Lane_02 → Lane_01 Inbound Handoffs

CLA-1 polls/fetches this folder để nhận:
- Lane_02 fix completion notices
- Lane_02 propose tasks cho Lane_01 scope
- Lane_02 escalations (cross-cutting bugs)

## Active inbound handoffs

(populated khi Lane_02 sends)

## CLA-1 response cadence

- Check Live mirror raw URL `runtime/lane_02_uzg/handoff_to_lane01/` mỗi turn nếu có communication
- After receive → review → dispatch own executor (CLAC1) hoặc respond rejection

## Note

The "inbound" channel is named `handoff_from_lane02/` from CLA-1's perspective. From CLA-2's perspective, the same physical channel is `handoff_to_lane01/` (Lane_02's outbound). Both Lanes write to / read from the SAME physical files via opposite-named symlinks/conventions.

Specifically:
- Lane_02 WRITES files to `runtime/lane_02_uzg/handoff_to_lane01/` (Lane_02's outbound)
- Lane_01 READS files from `runtime/lane_02_uzg/handoff_to_lane01/` via Live mirror
- Lane_01 mirrors/echoes those into `runtime/lane_01_uzg/handoff_from_lane02/` for own bookkeeping (optional)

The simplest convention: Lane_01 reads `runtime/lane_02_uzg/handoff_to_lane01/` directly via Live mirror raw URL.
