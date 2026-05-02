# Lane_01 UZG+ Runtime Index

**Authority:** CLA Lane_01 self-maintained per LAW-CLA-STATE-02
**Repo:** unitonzengarden/Uniton_Shared
**Live mirror:** unitonzengarden/Uniton_Shared_Live
**Last updated:** 2026-05-02T08:30Z

## Lane_01 Mission (per NTS division 2026-05-02)

**Lane_01 ưu tiên:** UI/UX tổng thể, Auth, ENTA, Social (HOME), Settings, Profile

**Lane_01 NOT scope:** CHAT, WALLET, PLUS+Membership, U-Reward, TAO (Lane_02 owns these)

## Tier 1 — Entry points

- `INDEX.live.md` (this file)
- `network/lane_01_uzg/MISSION.live.md`

## Tier 2 — Status dashboards

- `status_dashboards/v3_modules_status.live.md` — module wiring trạng thái
- `status_dashboards/v3_audit_status.live.md` — automated audit scores
- `status_dashboards/v3_blockers.live.md` — Lane_01 active bugs queue
- `status_dashboards/lane_division_v1.live.md` ⭐ Lane_01 vs Lane_02 scope phân chia

## Tier 3 — Audits

- `audits/` — auto-pushed reports (Sprint C+ bots)

## Cross-Lane channels

- `handoff_to_lane02/` — Lane_01 SEND tới Lane_02
- `handoff_from_lane02/` — Lane_02 SEND tới Lane_01 (inbound)
- `runtime/cross_lane/` — shared dashboards CẢ 2 Lane đọc

## Lane_01 executors

- **CLAC1** (Claude Code Desktop) — primary
- **Cursor 1** — token-limited (đang hết tháng)

## Lane_01 repos owned

- `unitonzengarden/uzgplus-app` — V3 PWA implementation (Auth + ENTA + HOME + Settings + Profile namespaces)
- `unitonzengarden/Uniton_Shared` — governance + cross-Lane infrastructure
- `unitonzengarden/Uniton_Shared_Live` — public mirror (sync target)

## Phase 5 status

- 13 sprints + 4 audits + 2 hot-fixes COMPLETE
- 24 V3 production routes operational
- Sprint 5.12 QA Auto-Loop closed: 0 Critical/High/Medium/Low bugs
- V3 PWA OS PRODUCTION READY for V2 user rollout

## Phase 6 active scope (Lane_01)

- Auth UX hardening polish (Sprint 5.10+5.11 follow-up)
- ENTA UX polish (Sprint 5.5+5.9 follow-up)
- HOME/Social feed polish (Sprint 5.2 follow-up)
- UI/UX overall consistency vs mockup canon
- Settings + Profile polish (Sprint 5.9 follow-up)

## Phase 6 deferred (Lane_02 will handle per division)

- CHAT module fixes
- WALLET module fixes
- PLUS+Membership fixes
- U-Reward fixes
- TAO V2 backend wire (V2 has 15 pages)
- TAO mock-to-real swap

## Runtime-first mandate (effective 2026-05-02T08:30Z)

🔴 Cả 2 Lane PHẢI đọc runtime via Live mirror raw URL TRƯỚC mỗi action
🔴 Cả 2 Lane PHẢI push state updates vào runtime SAU mỗi commit
🔴 KHÔNG dispatch task không qua runtime visibility
🔴 Cross-Lane handoffs PHẢI dùng JSON formal qua `handoff_to_*` / `handoff_from_*` folders
