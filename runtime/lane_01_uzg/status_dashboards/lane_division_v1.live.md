# Lane Division v1.0 — Phân chia Lane_01 vs Lane_02

**Authority:** NTS strategic decision 2026-05-02T08:25Z
**Effective:** Post Sprint 5.12 V3 QA Auto-Loop
**Last updated:** 2026-05-02T08:30Z

---

## Lane_01 OWNED scope (CLAC1 + CLA-1)

### Modules

- ✅ **Auth** (Login/Signup/Logout OTP via V2 Worker + Resend)
- ✅ **ENTA** (Identity wheel + onboarding + connections)
- ✅ **HOME / Social feed** (V2 posts + reactions + Realtime)
- ✅ **UI/UX overall** (cross-cutting visual consistency, NAM TAO branding)
- ✅ **Settings + Profile** (account management, privacy)

### Repos

- `unitonzengarden/uzgplus-app` (Lane_01 frontend code)
- `unitonzengarden/Uniton_Shared` (Lane_01 governance + cross-Lane infrastructure)

### Phase 6 priorities Lane_01

1. ENTA UX polish (Sprint 5.5+5.9 follow-up)
2. HOME/Social Sprint 5.2 polish
3. Auth UX edge cases (post Sprint 5.10+5.11)
4. UI/UX visual diff vs mockup HTML (test credentials needed)
5. Profile + Settings polish (Sprint 5.9 follow-up)

---

## Lane_02 OWNED scope (CLAC2 + Cursor 2 + CLA-2)

### Modules

- ✅ **CHAT** (Inbox + DM Room + Realtime)
- ✅ **WALLET** (Convert + Send + Receive + Asset Detail)
- ✅ **PLUS Hub + Membership** (mini app catalog + tier gating + upgrade)
- ✅ **U-Reward** (4 modules: Tap/Quiz/Task/Campaign + Energy Core)
- ✅ **TAO** (Bazi/Ziwei/Phong Thủy/Vạn Niên/AIER Tao — all sub-modules)
- ✅ **Lane_02 backend** (TAO compute engines, Bazi/Ziwei algorithms)

### Repos

- `unitonzengarden/uzgplus-app` (Lane_02 contributions to V3 module fixes)
- (Lane_02 specific repos per Lane_02 mission)

### Phase 6 priorities Lane_02

1. CHAT module fixes + audit Sprint 5.3 functional
2. WALLET module fixes (Send/Receive Sprint 5.11 polish, V2 endpoints validation)
3. PLUS Hub + Membership fixes (Sprint 5.6 audit)
4. U-Reward module fixes (Sprint 5.7 deep functional check)
5. TAO V2 backend wire (V2 has 15 pages — flip TAO_DATA_SOURCE flag)
6. TAO real data integration thay mock (KL-045 JSONB pattern)

---

## Shared scope (joint coordination)

- **Cross-module reward emit** (Sprint 5.7.x deferred) — touches HOME/CHAT/ENTA hooks (Lane_01) + reward_emit Edge Fn (Lane_02 understands V2 economy)
- **TAO ↔ ENTA bridge** (Bazi prefill from ENTA birth data) — Lane_01 owns ENTA, Lane_02 owns TAO compute
- **Bundle code-splitting** (OBS-02) — affects all modules
- **i18n full string extraction** — strings spread cross all modules
- **Web Push notifications** — depend Auth + ENTA Connect events

---

## Boundary protection rules

🔴 **Lane_01 KHÔNG được:**
- Edit `tao-v3/` namespace (Lane_02 territory)
- Edit `chat-v3/`, `wallet-v3/`, `plus-v3/`, `membership-v3/`, `u-reward-v3/` namespaces (Lane_02 fix scope)
- Modify Lane_02 mission/strategic docs
- Push to Lane_02 branches without coordination

🔴 **Lane_02 KHÔNG được:**
- Edit `auth-v3/`, `enta-v3/`, `home-v3/`, `settings-v3/`, `profile-v3/` namespaces (Lane_01 fix scope)
- Modify Lane_01 mission/strategic docs
- Push to Lane_01 branches without coordination
- Modify V2 backend code (only frontend wire)

🟢 **CẢ 2 Lane được:**
- Read everything via Live mirror raw URL
- Push handoff JSON tới counterpart's `handoff_from_*` folder
- Update own zone status dashboards
- Self-merge own PRs --admin

---

## Conflict resolution

Nếu phát hiện cross-cutting fix:

1. CLA author handoff JSON describing scope
2. Push to own outbound channel (`handoff_to_<other>`)
3. Counterpart fetches inbound channel, reviews, dispatches
4. Done → push completion notice
5. Originator verifies CRSP, closes handoff

---

## Update cadence

- Each Lane updates own `INDEX.live.md` after major commits
- Status dashboards updated after sprint complete
- Cross-Lane shared dashboards (`runtime/cross_lane/`) updated joint when scope changes
