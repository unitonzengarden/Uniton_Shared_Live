# UZG+ IMPLEMENTATION PRIORITY MATRIX — V1

**Task:** `LANE01-UZG-PLUS-IMPLEMENTATION-PRIORITY-MATRIX-V1`
**Authored by:** Cursor / claude-sonnet-4-5 (extended thinking ON)
**Authority:** AMD_LANE01_CTO_AUTO_APPROVE_TECH_NON_CANON §3.1 + AMD_NTS_FULL_TECH_AUTONOMY
**Source of truth:** `.lane_01/audits/01..06_*.md` + `.lane_01/system_map/UZG_PLUS_SYSTEM_MAP_V1.md` (V1 ship `e4bd080` + `faf92b4`).
**Live probe:** `.lane_01/audits/PROBE_LIVE_ROUTES.txt` (46 routes, `2026-04-29T17:50Z`).
**Repo HEAD at matrix authoring:** `faf92b413e2bc58039ed210ab2549ee182e71d50`.
**Scope:** Build an actionable roadmap for NTS from V1 audit findings. NO new audit work — synthesis only.

---

## Reading guide

| Status tag | Meaning |
|---|---|
| ✅ LIVE | Page rendering on `https://uzg.plus`, code path complete, real data when authenticated |
| 🟡 WIP-Backend | Database / engine / migrations exist; user-facing UI missing or admin-only |
| 🟡 WIP-Placeholder | Page exists in `src/pages/` but is a placeholder (no real data wiring) |
| 🟡 WIP-Admin-Only | Implemented but gated to `AdminGuard` — broader user access pending product decision |
| 🔴 MISSING | Canon claim or task-prompt mention with **zero** implementation evidence |

`UI Quality` rubric: **Mature** (rich data + interactions + tests) / **Functional** (works, basic) / **Skeleton** (rendered shell only) / **N/A**.

`Live runtime` from probe header `x-uzg-runtime`:
- `product-v2-pages-shell` — main PWA Cloudflare Pages shell
- `udna-public-pages-shell` — separate Cloudflare worker for `/aier/mint`, `/aier/marketplace` (per `apps/udna-public/`)
- `product-v2-pages-worker` — Cloudflare Worker for `/api/v1/*` (auth-gated)

---

## Block 1 — LIVE Features (45)

Features with real UI accessible on `uzg.plus` (probe-confirmed shell + page-code-confirmed real wiring).

### 1.1 Identity / ENTA (5)

| # | Feature | Domain | Route | Status | UI Quality | Code anchor |
|---|---|---|---|---|---|---|
| 1 | ENTA self-view | Identity | `/enta` | ✅ LIVE | Mature | `EntaPage.jsx` + `components/enta/` (Three.js shell) |
| 2 | ENTA me / profile | Identity | `/enta/me`, `/profile`, `/profile/edit` | ✅ LIVE | Mature | `ProfilePage.jsx`, `ProfileSettingsPage.jsx` |
| 3 | Public ENTA profile | Identity | `/enta/:handle` (no auth) | ✅ LIVE | Mature | `PublicEntaProfilePage.jsx` + `PublicProfileRouteBoundary` |
| 4 | Profile relations | Identity | `/enta/:handle/connections` | ✅ LIVE | Functional | `ProfileRelationsPage.jsx` |
| 5 | ENTA Network hub | Identity | `/enta/network` (entry) | 🟡 WIP-Placeholder | Skeleton | `EntaNetworkPage.jsx` is a `PlaceholderSurface` linking to network items only — not a 3D resonance graph (see Block 2.1) |

### 1.2 Social / Flow / Chat (8)

| # | Feature | Route | Status | UI Quality |
|---|---|---|---|---|
| 6 | Connections (friends / requests / suggestions) | `/connect`, `/connect/{friends,requests,suggestions}` | ✅ LIVE | Mature |
| 7 | Post detail | `/post/:id` | ✅ LIVE | Mature |
| 8 | Flow feed | `/flow` (alias to `memberOwnedRoute`) | ✅ LIVE | Mature |
| 9 | Compose | `/compose`, `/plus` (PlusPage) | ✅ LIVE | Mature |
| 10 | Chat / Inbox | `/chat`, `/inbox` | ✅ LIVE | Mature |
| 11 | Chat thread | `/chat/:id`, `/inbox/direct/:id` | ✅ LIVE | Mature |
| 12 | Chat room info | `/chat/:id/info` | ✅ LIVE | Functional |
| 13 | Notifications | `/notifications` | ✅ LIVE | Functional |

### 1.3 Circles / Community (6)

| # | Feature | Route | Status | UI Quality |
|---|---|---|---|---|
| 14 | Circles discovery | `/circles`, `/business` | ✅ LIVE | Mature |
| 15 | Circle home | `/circles/:k` | ✅ LIVE | Mature |
| 16 | Circle business profile | `/circles/:k/business` | ✅ LIVE | Mature (P5 commission ladder shipped) |
| 17 | Circle business rooms | `/circles/:k/business/rooms`, `/circles/:k/business/rooms/:r` | ✅ LIVE | Mature |
| 18 | Circle chat | `/circles/:k/chat` | ✅ LIVE | Mature |
| 19 | Community surface | `/community` | ✅ LIVE | Functional |

### 1.4 Wallet / U / UZGFi (12)

| # | Feature | Route | Status | UI Quality |
|---|---|---|---|---|
| 20 | Wallet home | `/wallet` | ✅ LIVE | Mature |
| 21 | Wallet asset detail | `/wallet/asset/:assetCode` | ✅ LIVE | Mature |
| 22 | Wallet activity detail | `/wallet/activity/:txId` | ✅ LIVE | Mature |
| 23 | Transfer | `/wallet/transfer`, `/wallet/transfer/detail` | ✅ LIVE | Mature |
| 24 | Convert U ↔ UZG | `/wallet/convert` | ✅ LIVE | Mature |
| 25 | U earnings | `/u-earnings` | ✅ LIVE | Mature (per-channel U emission) |
| 26 | U system core | `/u-system` | ✅ LIVE | Mature |
| 27 | U convert | `/u-convert` | ✅ LIVE | Mature |
| 28 | U convert history | `/u-convert-history` | ✅ LIVE | Mature |
| 29 | UZGFi user surface | `/uzgfi` | ✅ LIVE | Mature (`UzgFiWalletSurfacePage`) |
| 30 | Uniton Core | `/uniton` (alias `/dashboard`) | ✅ LIVE | Mature |
| 31 | Reward V5 stack | (in U earnings + dashboard) | ✅ LIVE | Mature (Daily check-in / spin / chest / quiz / season / live-ops) |

### 1.5 AIER ownership (3)

| # | Feature | Route | Status | UI Quality | Runtime |
|---|---|---|---|---|---|
| 32 | AIER overview | `/aier` | ✅ LIVE | Mature | `product-v2-pages-shell` |
| 33 | AIER mint entry | `/aier/mint`, `/aier/my` | ✅ LIVE | Mature | **`udna-public-pages-shell`** (separate worker) |
| 34 | AIER marketplace | `/aier/marketplace` | ✅ LIVE | Mature | **`udna-public-pages-shell`** |

### 1.6 Commerce (3)

| # | Feature | Route | Status | UI Quality |
|---|---|---|---|---|
| 35 | Tickets | `/tickets` | ✅ LIVE | Functional |
| 36 | Booking | `/booking` | ✅ LIVE | Functional |
| 37 | Membership status + featured upgrade | `/membership` | ✅ LIVE | Functional (one upgrade row + status only — see Block 2.5) |

### 1.7 Utilities (4)

| # | Feature | Route | Status | UI Quality |
|---|---|---|---|---|
| 38 | Search | `/search` | ✅ LIVE | Functional |
| 39 | Settings | `/settings` | ✅ LIVE | Functional |
| 40 | Help | `/help` (alias `/profile`) | ✅ LIVE | Skeleton |
| 41 | Login (OTP) | `/login` | ✅ LIVE | Mature |

### 1.8 Admin tier (4)

| # | Feature | Route | Status | UI Quality |
|---|---|---|---|---|
| 42 | Admin home | `/admin` (+ aitao / business / membership / platform / system / identity) | ✅ LIVE | Mature |
| 43 | Admin UZGFi suite | `/admin/uzgfi/{overview,treasury,rewards,credit,audit,marketplace,reconciliation,risk,wallet,burn,conversions,wallet/withdrawals}` | ✅ LIVE | Mature |
| 44 | Admin private wisdom (AI console) | `/admin-private/wisdom` | ✅ LIVE | Mature (Gemini chat + QOT signal map + recent QOT nodes) |
| 45 | Admin AIER ops + control + dashboard | `/admin/aier`, AierControlPage, AierDashboardPage, AierOpsPage | ✅ LIVE | Mature |

**Block 1 total: 45 LIVE features.** Most are auth-gated (only `/login`, `/enta/:handle` are public).

---

## Block 2 — WIP Features (12)

Backend / DB / engines exist. UI missing, placeholder, or admin-only.

### Tier A — Core gaps (must build for product completeness)

| # | Feature | Backend evidence | UI gap | Estimate | Impact | NTS-visible value |
|---|---|---|---|---|---|---|
| 1 | **Quantum Social Network user dashboard** | Tables `social_brain_proposals`, `social_predictions`, `social_harmony_scores`, `social_brain_approvals`, `social_brain_execution_history` (migration `2026-03-16_social_brain_031`); engines `aier:social-observer`, `aier:social-analyzer`, `aier:social-predictor`, `aier:harmony` | **No user surface anywhere.** Brain runs autonomously; users only feel it indirectly via resonance suggestions | 4 days MVP read-only | HIGH (defines the "Quantum Social" claim) | "First UZG+ surface where users see their social-brain state" |
| 2 | **QOT user trail visualization** | Table `qot_nodes` (MVP, migration `20260319213001_v2_qot_nodes_mvp`); P7 lock `v2_p7_qot_system_lock`; admin already renders `QotNodeRow` + "QOT Signal Map" in `AdminPrivateWisdomPage.jsx` lines 120–1565 | **No `/qot` user route**; admin-only signal map | 3 days | HIGH (provenance is canon pillar §3 HumanAI) | "User-side provenance trail — canon claim becomes tangible" |
| 3 | **ENTA 3D resonance graph (network mode)** | `EntaNetworkPage.jsx` is a `PlaceholderSurface`, but `EntaShell.jsx` already uses Three.js for self-view; tables `enta_resonance_024_*`, `enta_circle_026_fields_engine` | Network 3D rendering not implemented; placeholder hub only | 4 days | MEDIUM-HIGH | "ENTA Network becomes visual, not just nav" |
| 4 | **Connect-to-Earn unified dashboard** | `reward_emit/index.ts` defines 12 action types with daily caps (user_followed, circle_joined, comment_created, reaction_added, post_created, etc.); `URewardPage` shows aggregate but not per-action-type cap progress | No single page summarizing "today's caps + remaining quota per action" | 3 days | HIGH (makes the canon Connect-to-Earn semantic explicit) | "Users see clearly how each action earns U with daily limits" |

### Tier B — Admin-only (broader user access pending product decision)

| # | Feature | Current location | Question for NTS | Est. (if surface) |
|---|---|---|---|---|
| 5 | Wisdom AI chat (Gemini-grounded) | `/admin-private/wisdom` | Should non-admin users have a read-only Wisdom Q&A surface? `api/wisdom.js` already returns strict-JSON. | 4 days |
| 6 | AIER ops dashboard | `AierOpsPage`, `AierControlPage` (admin-private) | Public AIER status page (read-only health + agent count + last training time)? | 2 days |
| 7 | Wisdom training visibility | `AdminPrivateTrainingPage` | Public training-feed teaser ("training tick #N completed yesterday")? | 1 day |
| 8 | Platform audit log surface | `AdminPlatformPage` | User-side "what changed in my account" log? | 2 days |

### Tier C — Refinements (quality / UX)

| # | Feature | Current state | Refinement | Est. |
|---|---|---|---|---|
| 9 | Membership tier catalog browse | `MembershipPage` shows 1 featured upgrade + current status; tier names rendered for that one | Add "compare all tiers" panel pulling full catalog (tier_id / tier_code rows) | 2 days |
| 10 | Help page is skeleton (alias to `/profile`) | Alias only | Real help center: FAQ + canon explainers (UZG+ vision, U vs UZG, ENTA, QOT) | 3 days |
| 11 | Bare repo README | Vite template scaffold | Replace with UZG+ description + uzg.plus pointer + canon links | 0.5 day |
| 12 | Stale Vercel `homepage` field | `https://uzgplus-app.vercel.app` → 404 | Update to `https://uzg.plus`; remove deprecated `cloudways-deploy.yml` | 0.5 day |

**Block 2 total: 12 WIP features (4 Tier-A + 4 Tier-B + 4 Tier-C).**

---

## Block 3 — MISSING Features (6)

Canon mentions or task-prompt assertions with **no** implementation evidence in the audited code.

### 3.1 AIER Companion user surface (Phase 5 user-side)

- **Canon basis:** `docs/UZG+ WHITEPAPER - OFFICAL.md` §3.3 "AIer Agents", §3.4 "Knowledge Engine"; AMD memos reference Phase 5 user companion.
- **Code evidence:** `api/wisdom.js` (Wisdom function), `services/wisdomAIClient.js` proxy `/api/wisdom`, `osWisdomPrivateService` — **all consumers are admin pages**. No user route like `/companion`, `/wisdom`, or `/ai`.
- **Status:** 🔴 MISSING (user-facing).
- **Estimate to MVP:** 5 days (chat surface + auth-gated context + memory write-back).

### 3.2 AIFI Bridge (Phase 6 inferred)

- **Canon basis:** `Uniton_Shared` ecosystem; AIFI = AI Finance, paired with UZGFi at the ecosystem level.
- **Code evidence:** No `aifi*` route, page, service, or migration in `uzgplus-app`. Only `UZGFi` subsystem.
- **Status:** 🔴 MISSING (in this repo).
- **Estimate:** Out of one-repo scope — needs cross-system spec from NTS first.

### 3.3 QOT cross-system bridge UZG+ ↔ AIER Code

- **Canon basis:** AIER Code DB has `qot_lineage` (per V1 audit 04 §6); UZG+ has `qot_nodes` MVP. The two should converge into a single provenance graph.
- **Code evidence:** No bridge service, no shared schema, no cross-DB sync visible in this repo.
- **Status:** 🔴 MISSING (bridge service).
- **Estimate:** Out of single-repo scope; needs both DB keys + a service host.

### 3.4 Connect-to-Earn explicit phrase + user education

- **Canon basis:** Task prompt §G "Phase 2 (Connect-to-Earn)".
- **Code evidence:** Phrase "Connect-to-Earn" / "connect-to-earn" returns **0 grep matches** across `docs/`, `src/`. Semantic engine exists (reward_emit on follow / join / comment / reaction / post), but the canonical phrase is absent.
- **Status:** 🔴 MISSING (phrase + dedicated user dashboard); see Block 2 Tier-A item 4 for the dashboard quick win.
- **Estimate:** 3 days (covered by Block 2 Tier-A item 4).

### 3.5 Membership "6 tiers" hardcoded list

- **Canon basis:** Task prompt §G "Membership 6 tiers".
- **Code evidence:** Schema is **tier-flexible** via `tier_id` / `tier_code` look-ups; whitepaper does not enumerate 6 tiers by name. The set of tier names is data-driven (`membership_usd_credit_canon` migration).
- **Status:** 🔴 MISSING by-name (canonical 6-name list lives outside this repo, if anywhere). Code design is correct (catalog-driven); a static "6 named tiers" would be a regression.
- **Recommendation:** NTS supplies authoritative tier-name canon doc, or ratifies the catalog approach as the canon.

### 3.6 Express server (`server/aier_server.js`) public exposure

- **Canon basis:** V1 system map flow #7 (Admin reconciliation) and #5 (Membership) reference Express endpoints.
- **Code evidence:** Probe shows `/aier/status`, `/aier/health`, `/api/v1/admin/uzgfi/*` paths return SPA HTML on `uzg.plus` (200 with `product-v2-pages-shell` runtime), **not** the Express JSON. Express boots to ~21k LOC but is internal-only.
- **Status:** 🔴 MISSING (public route surface). Either:
  - (a) wire the Worker to proxy `/api/v1/admin/uzgfi/*` to the internal Express, or
  - (b) port admin endpoints to Cloudflare Worker fully.
- **Estimate:** Out of Lane_01 scope; architectural decision needed first.

**Block 3 total: 6 MISSING features.** 3 of 6 are out-of-single-repo-scope (3.2 / 3.3 / 3.6); 1 (3.5) is canon-source ambiguity; 2 (3.1, 3.4) are buildable as quick wins.

---

## Block 4 — 5 QUICK WINS (NTS sees in 1 week)

Each ≤ 4 days, ranked by NTS-visible impact. All five buildable by 1 dev (Cursor) on `uzgplus-app` alone.

### Quick Win #1 — Quantum Social User Dashboard MVP (4 days)

**Page:** `/social-brain` (new route)
**Anchor:** `App.jsx` lazy import + `RouteGuard` + `gateByJourney('connect')`.
**Backend:** Surface `social_predictions`, `social_harmony_scores`, `social_brain_proposals` for the current user (read-only). RLS scope: user reads own predictions / harmony rows + global brain proposals (admin-approved).
**Frontend:**
- Top: "Your harmony score this week" gauge (from `social_harmony_scores`).
- Mid: 5 most-recent predictions affecting the user (from `social_predictions WHERE subject_user_id = me`).
- Bottom: 3 published brain proposals (from `social_brain_proposals WHERE status='approved'` LIMIT 3).
- Read-only — NO action buttons.

**NTS sees:** "First time UZG+ has a user surface for the Quantum Social brain. The 'Quantum Social' canon claim becomes visible — not invisible auto-tuning."
**File budget:** ~600 LOC across 1 page + 3 components + 1 service.

### Quick Win #2 — Connect-to-Earn Unified Dashboard (3 days)

**Page:** `/earn` (new route, alias from `/u-earnings`)
**Anchor:** `App.jsx` route + service helper.
**Backend:** Aggregate `reward_events` from last 30 days for the current user. The 12 action-type rules + daily caps live in `reward_emit/index.ts` — port the rule table to a shared `data/connectToEarnCatalog.js` or fetch from a new `GET /api/v1/reward/catalog` endpoint (Block 2 Tier-A item 4 covers this).
**Frontend:**
- Header: "U earned today: X / today's max: Y"
- Grid of 12 cards (one per action type): icon + name + per-action U + daily cap + your-progress-today (e.g., "comment_created: 3 / 12 today").
- Tag: "Connect-to-Earn" — explicit phrase rendered.

**NTS sees:** "The 'Connect-to-Earn' phrase appears for the first time on the live product. Users understand U emission rules at a glance."
**File budget:** ~400 LOC.

### Quick Win #3 — QOT User Trail (3 days)

**Page:** `/qot/me` (new route)
**Anchor:** `App.jsx` route + `gateByJourney('enta')`.
**Backend:** New service helper `productV2Service.fetchMyQotTrail(session)` → reads `qot_nodes WHERE owner_user_id = me ORDER BY ts DESC LIMIT 50`. Reuses the same shape `AdminPrivateWisdomPage`'s `QotNodeRow` consumes.
**Frontend:**
- Header: "Your provenance trail (canon §3 HumanAI)"
- Reuse `QotNodeRow` from `AdminPrivateWisdomPage.jsx` (extract to `components/qot/QotNodeRow.jsx`).
- List: most recent 50 user-scoped QOT nodes with type / source / timestamp / parent link.

**NTS sees:** "UZG+ provenance claim has a user-side surface — the 'truth/lineage' pillar of UZG+ becomes tangible."
**File budget:** ~300 LOC + the extracted shared component.

### Quick Win #4 — Membership Tier Catalog Browse (2 days)

**Page extension:** `/membership` (existing) — add a "Compare all tiers" panel above the featured upgrade.
**Backend:** New endpoint `GET /api/v1/membership/catalog` → reads tier catalog (`membership_usd_credit_canon` rows). Or reuse existing `productV2Service` getter if it already fetches multiple tiers.
**Frontend:**
- New component `components/membership/MembershipCatalogPanel.jsx` — render table: tier_code | tier_name | price | privileges digest.
- Insert before `MembershipUpgradePanel` on the existing page (no new route).

**NTS sees:** "Membership page goes from 'one upgrade row' to 'browse + compare' — looks like a real catalog."
**File budget:** ~300 LOC + 1 new endpoint.

### Quick Win #5 — Repo Hygiene Round (1 day, batched)

A single PR that fixes audit-flagged repo-profile gaps. NTS-visible because GitHub repo card and uzg.plus link improve.

1. **README.md replacement** (root). Remove Vite template; write 60–100 line UZG+ description with: vision (one paragraph from whitepaper §1), live URL `https://uzg.plus`, canon doc index, build commands, Cloudflare deploy note.
2. **`homepage` field update** in `package.json` from `https://uzgplus-app.vercel.app` to `https://uzg.plus`.
3. **Delete `cloudways-deploy.yml`** workflow (deprecation notice already prints; safe to remove).
4. **Delete `vercel.json`** (legacy; Cloudflare is the active deploy target — confirmed in audit 06).

**NTS sees:** "Repo profile becomes professional. No more stale Vercel link, no more 404 from `homepage`, no more deprecated workflow listed."
**File budget:** ~120 LOC delta total.

> **Boundary note:** Quick Win #5 modifies files OUTSIDE `.lane_01/`. Lane_01 (this matrix task) cannot ship #5; a follow-up task `LANE01-UZG-PLUS-REPO-HYGIENE-V1` (or equivalent) is required. This matrix only **proposes** the work.

### Quick Wins summary

| # | Title | Days | Adds new route | Backend changes |
|---|---|---|---|---|
| 1 | Quantum Social user dashboard | 4 | `/social-brain` | Read-only RLS scope (no schema change) |
| 2 | Connect-to-Earn dashboard | 3 | `/earn` | Optional `GET /api/v1/reward/catalog` |
| 3 | QOT user trail | 3 | `/qot/me` | None (reuse `qot_nodes`) |
| 4 | Membership catalog browse | 2 | None (extend `/membership`) | Optional `GET /api/v1/membership/catalog` |
| 5 | Repo hygiene round | 1 | None | None |

**Total dev budget: 13 days (≈ 2.5 weeks for 1 dev).** Pick top 3 for "NTS sees in 1 week" target = #5 + #4 + #3 = 6 days; plus #2 starting in week 2.

---

## Block 5 — Strategic Recommendations

### 5.1 Pattern observed (V1 audit synthesis)

- **Backend / DB depth >> frontend coverage.** ~90 tables across 16 domains, ~250 functions / RPCs, ~290 RLS lines, ~96 migrations. Frontend has ~64 pages over ~80 routes. **Estimated coverage: ~70% of domains have a user surface; ~30% are admin-only or DB-only.**
- **Admin tier is dense.** Two parallel admin trees (`/admin/*` public-admin and `/admin-private/*` private-admin). Wisdom AI, Training, Intelligence, AIER ops, UZGFi 12-page suite — all admin only.
- **Most mature product surface: Wallet / U / UZGFi.** P0–P5 + global credit + treasury realign + super-app payments + circle business commission ladder. Multiple consumer pages, full admin reconciliation.
- **Least mature product surface: Quantum Social Network.** Backend brain runs autonomously; users feel it but cannot see it.
- **Identity (ENTA) is healthy** as self-view; network-side is a placeholder (Block 2.1).
- **Provenance (QOT) is admin-visible only.** User-side trail missing.

### 5.2 4-week NTS-visible plan

| Week | Theme | Tasks | NTS evidence |
|---|---|---|---|
| 1 | Quick wins (UI surfaces) | QW #5 (1d) + QW #4 (2d) + QW #3 (3d) | uzg.plus has `/qot/me`, `/membership` catalog, repo profile cleaned |
| 2 | Quick wins (continued) | QW #2 (3d) + start QW #1 (1d) | uzg.plus has `/earn` rendering Connect-to-Earn explicitly |
| 3 | Tier-A core gap | Finish QW #1 (3d) + AIER Companion MVP scaffold (4d) | uzg.plus has `/social-brain` + `/companion` (auth-gated MVP) |
| 4 | Polish + handoff | ENTA Network 3D MVP (4d) + V2.5 release notes + UZG+ V2.5 milestone tag | Public release post: "UZG+ V2.5 — Quantum Social user surface + Connect-to-Earn dashboard + QOT user trail" |

### 5.3 Constraints (per V1 audit honest disclosure)

| Constraint | Impact on plan |
|---|---|
| **UZG+ Supabase keys (`kkhhpecofolmrodyeslp`) not in env** | Backend RLS / migration changes blocked until NTS supplies keys. All 5 quick wins are read-only on existing tables — no schema changes needed. |
| **VERCEL_TOKEN not in env, Vercel side dead** | QW #5 (delete `vercel.json`, fix `homepage`) clarifies and confirms the dead state. No risk. |
| **Express server (`server/aier_server.js`) not on uzg.plus** | Quick wins use Supabase REST + the existing Cloudflare Worker `/api/v1/*`. Express bridge work deferred (Block 3.6). |
| **`apps/udna-public/` is a separate worker (`udna-public-pages-shell`)** for `/aier/mint`, `/aier/marketplace` | New `/social-brain`, `/earn`, `/qot/me` should live on `product-v2-pages-shell` (main PWA), not the udna-public worker. Confirm with build pipeline before adding routes. |
| **1 dev (Cursor) for build, CLAC1 governance + QA** | 13-day total budget for 5 QWs is feasible at 1 dev for one calendar month including review cycles. |

### 5.4 Non-recommendations (explicit non-goals for this matrix)

- **Do NOT** add a "6 named membership tiers" hard list — current catalog-driven design is correct (Block 3.5).
- **Do NOT** rebuild Wallet / U / UZGFi surfaces — they are mature.
- **Do NOT** start AIFI Bridge work in `uzgplus-app` — needs cross-system spec first (Block 3.2).
- **Do NOT** modify `.lane_02/` content — Lane_02 owns TAO / Bazi / Language OS work; cross-lane edits violate boundary.

---

## Block 6 — Execution mapping (suggested task IDs)

If NTS approves, these become discrete Cursor tasks under Lane_01:

| Suggested task ID | Scope | Quick wins covered | Days |
|---|---|---|---|
| `LANE01-UZG-PLUS-REPO-HYGIENE-V1` | README + homepage + workflow cleanup | #5 | 1 |
| `LANE01-UZG-PLUS-MEMBERSHIP-CATALOG-V1` | `/membership` catalog panel | #4 | 2 |
| `LANE01-UZG-PLUS-QOT-USER-TRAIL-V1` | `/qot/me` page + shared `QotNodeRow` extraction | #3 | 3 |
| `LANE01-UZG-PLUS-CONNECT-TO-EARN-DASHBOARD-V1` | `/earn` page + reward catalog endpoint | #2 | 3 |
| `LANE01-UZG-PLUS-SOCIAL-BRAIN-USER-V1` | `/social-brain` page + 3 components + 1 service | #1 | 4 |
| `LANE01-UZG-PLUS-AIER-COMPANION-MVP-V1` | `/companion` page (Phase 5 user-side) | (Block 3.1) | 5 |
| `LANE01-UZG-PLUS-ENTA-NETWORK-3D-V1` | Three.js network graph in `/enta/network` | (Block 2.1) | 4 |

> Each task should mirror this matrix's deliverable shape: branch `feat/lane01-uzg-plus-<scope>`, `.lane_01/` writes only, `[vercel skip]` commit, self-merge per AMD, cross-publish to `Uniton_Shared/audits/ecosystem/uzg-plus/` + (if a system-map update) `Uniton_Shared/system_maps/`. Honest disclosure on any partial / blocked work.

---

## Closing fingerprints

```
matrix_authored_at_utc: 2026-04-29T17:50Z
repo_head:              faf92b413e2bc58039ed210ab2549ee182e71d50
live_runtime_split:     product-v2-pages-shell | product-v2-pages-worker | udna-public-pages-shell
domain_coverage:        ~70% user-surfaced / ~30% admin-or-DB-only
total_features_listed:  45 LIVE + 12 WIP + 6 MISSING = 63
quick_wins:             5 (4d / 3d / 3d / 2d / 1d) — total 13 dev-days
canon_alignment:        whitepaper §3 (HumanAI), §4.2 (Modules), §9 (Roadmap), §5.1 (Token); honest disclosure 6 items in audit 05
nts_clicks_to_decide:   0 (matrix is fully autonomous synthesis)
```
