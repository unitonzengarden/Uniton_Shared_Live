---
canon_id: UZG-PLUS-V3-PHASE5-ARCHITECTURE-V1
version: 1.0
status: ACTIVE
date: 2026-05-01
authority: CLA Lane_01 (Phase 5 design lock)
purpose: Per-module Phase 5 wire approach decisions
references:
  - canon/uzg-plus/backend/UZG_PLUS_V2_BACKEND_INVENTORY_v1.md
  - audits/ecosystem/uzg-plus/PHASE-4-CLOSURE-2026-05-01.md
---

# UZG+ V3 Phase 5 Backend Architecture v1.0

## §0 Decision: Hybrid (Option C)

**Locked 2026-05-01** by CLA Lane_01 post Phase 4 closure.

V3 PWA OS is now ship-ready với mock data (Phase 4 COMPLETE). Phase 5 wires real backend per the **hybrid pattern**:

- **Direct Supabase** for: Auth, simple table reads với RLS, RPC calls, Edge Functions
- **V2 Express proxy** for: complex aggregation logic that already exists (HOME feed, CHAT history, posts)
- **Supabase Realtime** for: live updates (CHAT messages, presence, notifications)

**Why hybrid not pure rewrite:**
- V2 Express monolith (21,696 lines) contains battle-tested aggregation logic. Rewriting Sprint-by-Sprint introduces regression risk.
- Direct Supabase is faster + simpler for table reads + RPC calls (no JWT proxy overhead).
- Supabase Realtime is the only way to get push updates (V2 Express is request/response only).

## §1 Architecture Per Module

### Phase 5.1 — Auth + Identity Foundation

**V3 wire approach:** Direct Supabase JS client.

| Concern | Implementation |
|---|---|
| Sign in / Sign up | `supabase.auth.signInWithPassword()` / `signUp()` / OAuth providers |
| Session management | `supabase.auth.getSession()` + `onAuthStateChange()` listener |
| User profile | RPC `bootstrap_wallet_for_user()` + `bootstrap_membership_for_user()` on first signin |
| RLS context | `auth.uid()` auto-injected via JWT in Authorization header |
| Replace mock | `localStorage.uzg-mock-user` → real Supabase Auth state |

**Deliverables:**
- `src/lib/supabase.ts` — Supabase client singleton
- `src/lib/auth.ts` — useAuth hook with session state
- Wire V3LoginPage to real Supabase Auth
- V3App reads user from useAuth, removes readMockUser fallback (or keeps it as dev-only fallback)

**Dependencies:** None (Supabase backend already exists).

**Estimated complexity:** Medium. Auth state propagation across 25+ V3 routes.

---

### Phase 5.2 — HOME feed

**V3 wire approach:** Hybrid — V2 Express proxy for feed aggregation + Supabase Realtime for new post notifications.

| Concern | Implementation |
|---|---|
| Feed fetch | GET `/api/v1/flow/feed` (V2 Express, complex post + reaction + comment + author aggregation) |
| Single post | GET `/api/v1/posts/:postId` (V2 Express) |
| Post creation | POST `/api/v1/flow/posts` (V2 Express, validates + inserts + broadcasts) |
| Interactions (like/share/comment) | POST `/api/v1/flow/interactions` (V2 Express, multi-table txn) |
| Live new posts | Supabase Realtime channel on `posts` table INSERT (filter by user's followed circles) |

**Why proxy:** V2 `/api/v1/flow/feed` already handles 6+ JOINs + complex pagination. Reimplementing in V3 client = 200+ lines of orchestration. Proxy is 5 lines of fetch.

**Deliverables:**
- `src/lib/api.ts` — Express API client (axios/fetch wrapper với JWT injection)
- Wire V3HomePage feed to `/api/v1/flow/feed`
- Wire post composer to `/api/v1/flow/posts`
- Subscribe to Realtime channel for live updates

---

### Phase 5.3 — CHAT

**V3 wire approach:** Hybrid — V2 Express proxy for conversation history + Supabase Realtime for live messages + presence.

| Concern | Implementation |
|---|---|
| Conversations list | GET `/api/v1/conversations` (V2 Express) |
| Create conversation | POST `/api/v1/conversations` (V2 Express, validates + inserts + auto-adds members) |
| Message history | GET `/api/v1/messages?conversation_id=X&before=Y` (V2 Express, paginated) |
| Send message | POST `/api/v1/messages` (V2 Express, RLS-checked + broadcasts) |
| Mark read | POST `/api/v1/messages/read` (V2 Express) |
| Live messages | Supabase Realtime channel on `messages` table INSERT (filtered by conversation_id) |
| Typing indicator | POST `/api/v1/conversations/typing` (V2 Express, ephemeral) |
| Presence | POST `/api/v1/conversations/presence` (V2 Express, ephemeral) |
| Chat safety | POST `/api/v1/chat/safety/actions` (V2 Express, moderation) |

**Why proxy + Realtime:** Same as 5.2 (complex aggregation), plus Realtime is essential for chat UX.

**Deliverables:**
- `src/lib/realtime.ts` — Supabase Realtime channel manager (subscribe/unsubscribe lifecycle)
- Wire V3ChatPage list, V3DMRoomPage, V3CircleGroupPage to V2 Express + Realtime
- Replace mock conversations với real data

---

### Phase 5.4 — WALLET

**V3 wire approach:** Direct — Edge Functions for transactions + Supabase RPC + RLS for reads.

| Concern | Implementation |
|---|---|
| Wallet summary | Direct Supabase RPC + RLS reads on `wallet_accounts`, `wallet_ledger`, `wallet_currencies` |
| Convert U → UZG | Edge Function POST `/functions/v1/wallet_convert_u_to_uzg` (idempotent, cap-enforced) |
| Spend UZG | Edge Function POST `/functions/v1/wallet_spend_uzg` (booking/ticket only, JWT-protected) |
| Send / Receive | Direct Supabase RPC (insert into `wallet_transfers` with RLS check) |
| Asset detail | Direct Supabase reads on `wallet_accounts` + `wallet_ledger` (RLS auto-filters by user) |

**Why direct:** Edge Functions are faster (Deno runtime, edge-deployed) than V2 Express. RLS on tables means no app-layer filter needed.

**Pre-Sprint 5.4 task:** Live schema discovery on `wallet_currencies` (test query showed `code` column doesn't exist — Phase 4 mock assumed wrong schema).

**Deliverables:**
- `src/lib/wallet.ts` — Edge Function client + RLS-aware Supabase queries
- Wire V3WalletPage, V3AssetDetailPage, V3ConvertPage, V3SendPage, V3ReceivePage

---

### Phase 5.5 — ENTA

**V3 wire approach:** Direct — Supabase RPC + RLS on all 27 `enta_*` tables.

| Concern | Implementation |
|---|---|
| Profile | Read `enta_profiles` (RLS-filtered to current user) |
| Identity | Read `enta_birth_data` + RPC `calc_enta_profile()` |
| Resonance | Read `enta_resonance` + related tables |
| Circles | RPC `build_circles(user_id)` aggregates circle membership + posts |
| Journey | Read `enta_journey` events |
| Energy | Read `enta_energy` snapshots |
| RLS helpers | `enta_rls_current_profile_id()`, `enta_rls_can_view_circle()`, `enta_rls_is_conversation_member()` |

**Why direct:** ENTA is per-user state. RLS filters automatically. RPC `calc_enta_profile` does heavy lifting server-side.

**Deliverables:**
- `src/lib/enta.ts` — ENTA Supabase RPC client
- Wire V3EntaPage, V3EntaIdentityPage, V3EntaResonancePage, V3EntaCirclesPage, V3EntaJourneyPage
- Wire OnboardingWizard to insert into `enta_birth_data` + RPC `calc_enta_profile`
- Wire V3EntaPublicPage to RLS-aware public profile reads

---

### Phase 5.6 — PLUS Hub + Membership

**V3 wire approach:** Direct Supabase RPC for booking system + V2 Express proxy for membership upgrade flow.

| Concern | Implementation |
|---|---|
| PLUS Hub catalog (mini app list) | Direct Supabase read on `app_*` tables |
| Membership state | GET `/api/v1/membership/upgrade` (V2 Express, returns current tier + upgrade options) |
| Membership upgrade | POST `/api/v1/membership/upgrade` (V2 Express, multi-step txn including wallet deduction) |
| Booking system | Direct Supabase RPC: `booking_seed_availability_range()`, `booking_release_availability_for_booking()`, `booking_resolve_listing_price()`, `booking_status_allowed()`, `can_read_booking()` (9 RPCs total) |
| Missions / daily check-ins | Direct Supabase reads on `missions` table + `daily_checkins` |

**Why hybrid:** Booking RPCs are well-defined; PLUS Hub catalog is read-only. Membership upgrade has complex side effects (wallet, tier change, notification) — proxy to V2.

**Deliverables:**
- `src/lib/membership.ts` — Membership state + upgrade flow
- `src/lib/booking.ts` — Booking RPC client
- Wire V3PlusPage, MembershipPanels, mini-app booking flows

---

### Phase 5.7 — U-Reward

**V3 wire approach:** Direct Edge Function — `reward_emit` for all reward emissions.

| Concern | Implementation |
|---|---|
| Reward emission | POST `/functions/v1/reward_emit` with `{actionType, sourceType, ...metadata}` |
| Reward state read | Direct Supabase reads on `reward_*` tables (RLS-filtered) + `daily_checkins` + `online_presence_*` |
| Cap / cooldown enforcement | Server-side in Edge Function (no client logic needed) |
| 12 action types | Per Edge Function source: online_active, post_created, mission_daily, daily_checkin, lucky_spin, chest_loot, quiz_answer, etc. |

**Why direct:** Edge Function is the single source of truth for reward emission. V3 client just POSTs the actionType + metadata.

**Deliverables:**
- `src/lib/reward.ts` — `emitReward(actionType, metadata)` wrapper
- Wire V3 surfaces that emit rewards: post compose, daily check-in, online presence ping, mission completion, U-Reward mini-app TAP/QUIZ/TASK/CAMPAIGN

---

### Phase 5.8 — TAO module (Bazi / Tử Vi / Phong Thủy / Lịch / AIER TAO)

**V3 wire approach:** Direct Lane_02 engine API (when ready). Until Lane_02 ships engine: keep Phase 4 mock data.

| Concern | Implementation (when Lane_02 ships) |
|---|---|
| Bazi 4-pillars compute | Lane_02 engine API: `POST /lane02/bazi/compute` with birth info |
| Tử Vi 12-cung an sao | Lane_02 engine API: `POST /lane02/ziwei/an-sao` |
| Phong Thủy Bát Trạch | Lane_02 engine API: `POST /lane02/phong-thuy/bat-trach` |
| Cửu Cung Phi Tinh annual | Lane_02 engine API: `GET /lane02/phong-thuy/cuu-cung?year=YYYY` |
| Lịch Vạn Niên | Lane_02 engine API: `GET /lane02/lich/month?year=YYYY&month=MM` (28 sao + Hoàng Đạo + Tam Nương + Sát Chủ) |
| AIER TAO Reading | OpenAI/Anthropic LLM với prompt template + Lane_02 chart context |
| AIER TAO Chat | LLM với chart context + conversation history (Builder+ tier check) |

**Until Lane_02 ships:**
- Mock data persists (Sprint 4.2-4.6 mock files)
- AIER TAO returns mock responses (4 prompts in `v3-mock-aier-tao.ts`)

**Phase 5.8 timing:** Depends on Lane_02 engine readiness. Could be Phase 6 if Lane_02 isn't ready.

**Deliverables (when ready):**
- `src/lib/tao.ts` — Lane_02 engine API client
- `src/lib/aier-tao.ts` — AIER TAO LLM client với chart context
- Replace MOCK_BAZI_CHART_HOA_USER, MOCK_ZIWEI_CHART_HOA_USER, MOCK_PHONG_THUY_PROFILE_KHON, MOCK_LICH_2026_05, MOCK_AIER_TAO_CHAT_RESPONSES with real engine calls

## §2 Sprint Order + Dependencies

```
Phase 5.0 (this sprint) ─┐
                         ▼
                    5.1 Auth + Identity ◄── BLOCKING for all subsequent (need real auth)
                         │
              ┌──────────┼──────────┬──────────┬──────────┐
              ▼          ▼          ▼          ▼          ▼
            5.2 HOME   5.3 CHAT   5.4 WALLET  5.5 ENTA  5.6 PLUS+MEMBER
                                       │                      │
                                       ▼                      │
                                    5.7 U-REWARD ◄────────────┘
                                       │
                                       ▼
                                    5.8 TAO (when Lane_02 ready)
```

**Dependencies:**
- 5.1 BLOCKS all (need real auth context for any wire)
- 5.2-5.6 can run **parallel** (different modules, no shared state)
- 5.7 depends on 5.4 (reward emission needs wallet) + 5.6 (mission completion)
- 5.8 depends on Lane_02 engine readiness (external blocker)

## §3 Cross-cutting Concerns

### §3.1 JWT propagation

V3 client ALWAYS sends Supabase JWT in Authorization header for:
- Direct Supabase REST calls (auto-injected by `@supabase/supabase-js` client)
- Edge Function calls (manual header)
- V2 Express calls (manual header — V2 Express middleware extracts user from JWT)

### §3.2 Realtime subscription lifecycle

For surfaces using Realtime (CHAT, HOME feed live updates):
- `useEffect` subscribes on mount với cleanup on unmount
- Channel name pattern: `{table}-{filter}` (e.g., `messages-conv-{conversation_id}`)
- Auto-reconnect on network failure

### §3.3 Error handling

| Error | V3 client behavior |
|---|---|
| 401 (auth expired) | Trigger session refresh; if refresh fails, redirect to /login |
| 403 (RLS denied) | Show "Bạn không có quyền truy cập tài nguyên này" |
| 404 (resource gone) | Show "Tài nguyên không tồn tại" |
| 429 (rate limit) | Show "Quá nhiều yêu cầu, vui lòng thử lại sau" + exponential backoff retry |
| 500/503 (backend down) | Show "Hệ thống đang gặp sự cố, vui lòng thử lại sau" + retry button |

### §3.4 Caching strategy

| Data | Cache strategy |
|---|---|
| User session | In-memory (Supabase client) + localStorage (session refresh token) |
| User profile | React Query 5-min stale time |
| Wallet balance | React Query 30-sec stale time + Realtime invalidation |
| Feed posts | React Query 1-min stale time + Realtime invalidation |
| Chat messages | React Query infinite query + Realtime append |
| TAO charts | React Query 24-hour stale time (rarely change) |
| Lịch month | React Query 24-hour stale time |

### §3.5 Mock data fallback

Phase 5 sprints REMOVE mock data progressively. But for resilience:
- Each Phase 5 sprint keeps mock data file as fallback IF Supabase request fails
- Add feature flag `import.meta.env.VITE_USE_MOCK_FALLBACK = true/false` (default true in dev, false in prod)

## §4 Tech Stack Additions Phase 5

| Library | Purpose | Sprint introduced |
|---|---|---|
| `@supabase/supabase-js` v2 | Supabase JS client | 5.1 |
| `@tanstack/react-query` v5 | Data fetching + cache | 5.1 |
| `axios` | V2 Express proxy client | 5.2 |
| (optional) `zod` | Runtime schema validation | 5.1 |

## §5 Performance Considerations

### §5.1 Supabase connection pooling

V3 client uses single Supabase client instance (singleton in `src/lib/supabase.ts`). Auth state shared across all queries.

### §5.2 Realtime channel limits

Supabase Realtime has connection limits per project. Strategy:
- Subscribe only to active surfaces (conversation open, feed visible)
- Unsubscribe on navigation away
- Max 5-10 concurrent channels per session

### §5.3 V2 Express proxy latency

V2 Express monolith adds ~50-100ms latency vs direct Supabase. Acceptable for:
- Feed pagination (not realtime-critical)
- Conversation history load (not realtime-critical)
- Post creation (txn finality matters more than latency)

NOT acceptable for:
- Live chat messages (use Realtime instead)
- Wallet balance display (use direct Supabase)

### §5.4 Edge Function cold start

First invocation per region may have cold start ~500ms. Strategy:
- Pre-warm via health-check ping in app boot
- Show loading state on first reward emission

## §6 Security

### §6.1 RLS-first design

All `app_*`, `wallet_*`, `enta_*`, `circle_*`, `messages`, `conversations` tables have RLS enabled with policies derived from `auth.uid()`. V3 client does NOT need app-layer filters — JWT auto-filters via RLS.

### §6.2 Edge Function JWT verification

| Edge Function | JWT verify | Justification |
|---|---|---|
| `reward_emit` | `false` | Idempotent, server-side cap enforcement, action-type whitelist |
| `wallet_convert_u_to_uzg` | `false` | Idempotent, server-side cap enforcement, conversion limits |
| `wallet_spend_uzg` | `true` (default) | High-stakes spend, requires JWT for user identity |

### §6.3 Admin endpoints excluded

V3 user UI does NOT call `/api/v1/admin/*` (15+ routes). These remain V2 Express only, accessed via separate admin UI (out of Phase 5 scope).

## §7 Migration Path Summary

Phase 5 wires V3 client to V2 backend WITHOUT modifying V2 backend. All changes are V3 client-side:

1. Install Supabase JS client + React Query
2. Replace `localStorage.uzg-mock-user` reads with `useAuth()` hook
3. Replace MOCK_* data imports với React Query data hooks
4. Subscribe to Realtime channels for live surfaces
5. Wire compute-heavy endpoints to V2 Express proxy

After Phase 5 complete:
- All V3 surfaces functional với real backend data
- TAO module continues using mock data until Lane_02 engine ships
- Admin functions remain V2 Express (separate admin UI)

## §8 Phase 5 Estimated Timeline

Per Phase 4 precedent (~1-2h actual per sprint vs 8-12h book):

| Sprint | Estimate book | Estimate actual | Cumulative |
|---|---|---|---|
| 5.0 (this) | 1h | ~30 min | 30 min |
| 5.1 Auth | 8h | ~2h | 2.5h |
| 5.2 HOME | 6h | ~1.5h | 4h |
| 5.3 CHAT | 10h | ~2.5h | 6.5h |
| 5.4 WALLET | 8h | ~2h | 8.5h |
| 5.5 ENTA | 6h | ~1.5h | 10h |
| 5.6 PLUS+MEMBER | 8h | ~2h | 12h |
| 5.7 U-REWARD | 4h | ~1h | 13h |
| 5.8 TAO (when ready) | 12h | ~3h | 16h |

**Total Phase 5: ~16 hours actual** (vs 60-80h book estimate). V3 PRODUCTION COMPLETE estimated 2026-05-08 to 2026-05-15.

## §9 Phase 5 Acceptance Criteria

After Phase 5 closure:
- All 25+ V3 routes functional with real Supabase backend (no mock fallback in prod)
- All 192 tables accessible via correct RLS context
- All 188 RPCs callable from V3 client where needed
- 3 Edge Functions integrated for wallet + reward operations
- Realtime channels working for CHAT + HOME feed
- TAO module on Lane_02 engine OR documented mock-fallback (if Lane_02 not ready)
- Phase 5 closure doc + canon updates

End of architecture v1.
