---
task_id: LANE01-UZG-V3-P5-2-HOME-FEED-HYBRID-INTEGRATION-2026-05-01T15-25Z
lane: Lane_01
executor: CLAC1
mode: solo
model: claude-opus-4-7
status: SUCCESS
phase: 5
sprint: 2
priority: P0
type: Hybrid backend integration (V2 Express proxy + Supabase Realtime)
prs:
  - repo: unitonzengarden/uzgplus-app
    pr: 81
    sha: 94c14e0
    note: "Phase 5 Sprint 5.2. HOME feed Hybrid Integration. Real V2 Express + Supabase Realtime."
project: uzg-plus
---

# LANE01-UZG-V3-P5-2-HOME-FEED-HYBRID-INTEGRATION-2026-05-01 — Snapshot

**Status:** SUCCESS — Sprint 5.2 HOME feed Hybrid Integration COMPLETE

## Highlights
- 6 components dual-tree in NEW `home-v3/` namespace (KL-32+33 enforced)
- 4 hooks: useFeed (state machine) + useFeedRealtime (Supabase Realtime) + usePostReaction (optimistic) + useFeedCompose
- 1 API client: v2ExpressClient.ts (fetchFeed / createPost / sendInteraction / removeInteraction)
- V3HomePage wired to real HomeFeedV3 (mock feed removed)
- Schema discovery: `app_posts` (not `flow_posts`), `flow_reactions` correct, `comments` (not `flow_post_comments`)
- Local Playwright **6/6 PASS** in 6.6s
- Production Playwright **5/5 PASS** in 8.1s
- KL-028: **22/22 routes 200** — CLEAN regression
- Build: 723KB JS / 215KB gzip / 3.95s / 0 TS/ESLint errors
- Bundle markers: 6/6 verified (home-feed-v3, post-card, feed-skeleton, feed-empty-state, feed-error-state, reaction-button)

## Components

**home-v3/** (6):
- HomeFeedV3 (main surface: compose card + feed state machine + IntersectionObserver pagination)
- PostCardV3 (post display: author avatar + content + image/link/tao_ref cards + reaction)
- FeedSkeletonV3 (shimmer loading skeleton — 3-card default)
- FeedEmptyStateV3 (empty community state với 南道 ghost mark)
- FeedErrorStateV3 (error state với retry CTA)
- ReactionButtonV3 (4-type picker: Thích/Yêu thích/Thấu hiểu/Tĩnh tâm + optimistic toggle)

## Hooks (4)

- useFeed: INITIAL→LOADING→LOADED|ERROR|EMPTY→SCROLLING→LOADING_MORE→END_OF_FEED state machine. IntersectionObserver-driven pagination via loadMore().
- useFeedRealtime: Supabase channel `home-v3-feed` on `app_posts` INSERT + `flow_reactions` INSERT/DELETE
- usePostReaction: optimistic toggle + server write + rollback on error
- useFeedCompose: V2 Express POST /api/v1/flow/posts + optimistic prepend

## API Client

`v2ExpressClient.ts` — typed fetch wrapper with JWT injection:
- fetchFeed(jwt, cursor?, limit) → FeedPage
- createPost(jwt, payload) → { id }
- sendInteraction(jwt, payload) → void
- removeInteraction(jwt, postId, reactionType) → void

## Routes

| Route | Auth | Change |
|---|---|---|
| `/v3/home` | AuthGate | Now renders HomeFeedV3 (was mock V3HomePage) |

All other 21 routes UNCHANGED from Sprint 5.1.

## Schema Discovery Findings

| Task Spec Name | Actual Table | Status |
|---|---|---|
| `flow_posts` | `app_posts` | CORRECTED |
| `flow_reactions` | `flow_reactions` | CORRECT |
| `flow_post_comments` | `comments` | CORRECTED |
| `enta_profiles` | `enta_profiles` | CORRECT (RLS, auth required) |

## Verification

### Build
- `npm run build:v3`: PASS, 3.95s
- 723KB JS / 215KB gzip (no significant growth from Sprint 5.1's 730KB)
- 0 TS/ESLint errors

### Local Playwright (6 tests)
- mobile-380 unauthed /home → redirect to /login (AuthGate)
- tablet-768 unauthed /home → redirect to /login (AuthGate)
- login page renders [data-component="login-form"]
- signup page renders [data-component="signup-form"]
- login page has link to signup (a[href*="signup"])
- signup page has link to login (a[href*="login"])
- Result: **6/6 PASS in 6.6s**

### Production Playwright (5 tests)
- unauthed /home → redirect to /login
- login page reachable
- signup page reachable
- V2 Express /api/v1/flow/feed → AUTH_REQUIRED (endpoint live)
- V2 Express /api/v1/flow/posts → POST-only (METHOD_NOT_ALLOWED on GET)
- Result: **5/5 PASS in 8.1s**

### KL-028 production probe (22 routes)
- 22/22 PASS — NO REGRESSION across all Phase 4 + 5.1 + 5.2 surfaces

### Bundle markers
- 6/6 new Sprint 5.2 markers confirmed in dist JS

## KL-32 + KL-33 enforcement
- `home-v3/` NEW namespace — no collision with any existing component
- 42 files mirrored byte-identical (6 components × 2 + lib + hooks × 4 + types + page + tests)
- Lane_02 territory (aier/ + ziwei/) verified UNTOUCHED

## Phase 5.2 closure

Sprint 5.2 establishes:
✅ V2 Express feed read path (`GET /api/v1/flow/feed`) wired via JWT
✅ Supabase Realtime live updates (app_posts + flow_reactions channels)
✅ Optimistic reaction toggle with rollback
✅ Feed compose via V2 Express POST
✅ IntersectionObserver-driven infinite scroll (state machine)
✅ HomeFeedV3 replaces mock V3HomePage

**Next:** Sprint 5.3 CHAT real-time integration per UZG_PLUS_V3_PHASE5_ARCHITECTURE_v1.md §1.3.

End of snapshot.
