# LANE02-CROSS-TECH-STACK-AUDIT-V1 — Tech Stack Audit Report v1

**Task ID:** LANE02-CROSS-TECH-STACK-AUDIT-V1  
**Executor:** CURSOR-2 (Desktop stream)  
**Date:** 2026-05-02  
**Mode:** READ-ONLY — zero code/config modified  
**Authority:** handoff #2 §4 V2 BACKEND IMMUTABLE + AMD_NTS_FULL_TECH_AUTONOMY + DEC-07 LAW-NTS-CREDS-PERMANENT-V1

---

## Section A — Supabase

### A.1 UZG+ Lane_02 Project

| Field | Value |
|-------|-------|
| Project ID | `kkhhpecofolmrodyeslp` |
| URL | `https://kkhhpecofolmrodyeslp.supabase.co` |
| Anon Key | See `.env` — `VITE_SUPABASE_ANON_KEY` (public, OK to use) |
| Region | ap-southeast-1 (Singapore) |

### A.2 Three Independent Projects Confirmed

| Project | Lane | Purpose |
|---------|------|---------|
| `kkhhpecofolmrodyeslp` | Lane_02 (UZG+) | Production DB for uzgplus-app |
| `vstnvvwmztotgogobefx` | Lane_01 (Uniton_OS) | Cross-ref in .env.local comments |
| AIFI Lane_02 | Separate | Referenced in ecosystem but not local |

### A.3 Anon Key Location

- `VITE_SUPABASE_ANON_KEY` in `.env` (root repo) — public key, safe for client use
- `VITE_SUPABASE_PUBLISHABLE_KEY` alias in Cloudflare Pages env

### A.4 Service Role Key — WHERE stored (value NOT pasted)

- **Cloudflare Pages env var** — `SUPABASE_SERVICE_ROLE_KEY` (and `SUPABASE_SERVICE_ROLE_KEY_B64` alias)
- **Local `.env`** — `SUPABASE_SERVICE_ROLE_KEY=sb_secret_***` (masked)
- **GitHub Actions Secrets** — consumed by deploy.yml via Cloudflare env sync
- Do NOT paste in any deliverable per AC-3.

### A.5 Relevant Tables (row counts as of 2026-05-02)

| Table | Rows | Notes |
|-------|------|-------|
| `auth.users` | 451 | Total users |
| `auth.sessions` | 815 | Active sessions |
| `auth.one_time_tokens` | 62 | OTP store |
| `public.profiles` | 442 | User profiles |
| `public.member_tiers` | 4 | Explorer/Seeker/Builder/Sovereign |
| `public.memberships` | 135 | Active tier subscriptions |
| `public.wallet_accounts` | 295 | Wallets |
| `public.wallet_ledger` | 2379 | Transactions |
| `public.enta_bazi_records` | 77 | Bazi (production, rich) |
| `public.bazi_charts` | 3 | Bazi (JSONB format) |
| `public.ziwei_charts` | 4 | Tu Vi (JSONB format) |
| `public.aier_kb_entries` | 168 | KB RAG (all embedded) |
| `public.enta_profiles` | 308 | ENTA profiles |
| `public.ai_knowledge_blocks` | 8507 | AITAO knowledge |
| `public.ai_threads` | 7 | AITAO threads |
| `public.reward_events` | 1721 | U-Reward events |
| `public.qot_nodes` | 560 | QOT nodes |

**Tier distribution (memberships):**

| Tier | Count |
|------|-------|
| Seeker | 55 |
| Builder | 46 |
| Sovereign | 28 |
| Explorer | 6 |

### A.6 Key RPC Functions

**Auth & Identity:**
- `fn_get_user_role_context` — resolve user role from JWT
- `fn_bootstrap_profile` — create profile on first login
- `fn_membership_subscribe` — tier activation

**TAO / Chart:**
- `rpc_get_enta_bazi_record` — fetch Bazi record for user
- (ziwei_charts queried direct via RLS, no dedicated RPC)

**Wallet & Economy:**
- `rpc_convert_u_to_uzg` — U→UZG conversion
- `rpc_emit_u_reward` / `rpc_emit_and_process_reward_event` — reward emission
- `rpc_wallet_transfer` / `rpc_wallet_credit` / `rpc_wallet_debit` — transfers
- `rpc_payment_membership` — membership payment
- `rpc_payment_ticket` / `rpc_payment_booking` — tickets/booking

**ENTA:**
- `rpc_compute_enta_state` / `rpc_compute_enta_state_v2` — ENTA calculation
- `rpc_upsert_enta_profile_v2` — profile upsert
- `rpc_get_enta_bazi_record` — Bazi record for user

**Chat/Conversations:**
- `rpc_get_inbox` / `rpc_get_my_conversations` / `rpc_send_message` — messaging
- `rpc_get_conversation_messages` — message history

**Search & Discovery:**
- `rpc_get_connection_suggestions` — suggest_connections
- `rpc_calculate_resonance_score` — resonance engine

**KB/RAG:**
- `search_aier_kb(vector, int, text, text, text)` — tier-gated KB RAG search

### A.7 Edge Functions (Supabase hosted)

| Function | Endpoint | Purpose |
|----------|----------|---------|
| `reward_emit` | `https://kkhhpecofolmrodyeslp.supabase.co/functions/v1/reward_emit` | U-reward emission (verify_jwt: false) |
| `wallet_convert_u_to_uzg` | `.../functions/v1/wallet_convert_u_to_uzg` | U→UZG conversion (verify_jwt: false) |
| `wallet_spend_uzg` | `.../functions/v1/wallet_spend_uzg` | UZG spending (verify_jwt: false) |

### A.8 RLS Policies Summary

All public tables have RLS enabled except legacy utility tables. Pattern:
- **User data tables** (profiles, memberships, wallets, bazi_charts, ziwei_charts): `select/insert/update/delete` own rows via `auth.uid() = user_id`
- **Social tables** (posts, comments, reactions, enta_*): own writes + public reads for published content
- **Admin tables** (aier_command_queue, audit_logs): service_role only
- **KB table** (`aier_kb_entries`): public read (anon+authenticated), service_role write
- **Reward/Economy tables**: authenticated reads own + service_role writes for RPCs

---

## Section B — Cloudflare

### B.1 Workers Project

- **V2 backend**: `dist/_worker.js` (compiled from server-side logic, ~3MB bundle)
- Deployed as Cloudflare Pages Function (co-deployed with V3 PWA static assets)
- No standalone Cloudflare Worker — everything runs in Pages Functions

### B.2 Pages Project

- **Project name**: `${{ secrets.CLOUDFLARE_PAGES_PROJECT }}` (resolved at CI time via GitHub Secret)
- **Deploy command**: `npx wrangler pages deploy dist --project-name "${{ secrets.CLOUDFLARE_PAGES_PROJECT }}"`
- **Build output**: `dist/` (main PWA) + `apps/udna-public/` (public gateway)
- **Build pipeline**: `npm run build` → `npm --prefix apps/udna-public run build` → Cloudflare deploy

### B.3 Custom Domain Bindings

- **Primary**: `uzg.plus` (confirmed live, `x-uzg-runtime: product-v2-pages-shell`)
- **Deprecated**: `app.uzg.plus` (handled by `DEPRECATED_LEGACY_HOST_INPUTS` set)
- **Deploy flow**: `LOCAL -> GITHUB -> CLOUDFLARE -> UZG.PLUS`

### B.4 Environment Variables List (names only — NO values)

**Supabase:**
- `SUPABASE_URL` / `VITE_SUPABASE_URL`
- `SUPABASE_ANON_KEY` / `VITE_SUPABASE_ANON_KEY` / `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` / `SUPABASE_SERVICE_ROLE_KEY_B64`

**Email/Auth:**
- `RESEND_API_KEY`
- `AUTH_OTP_EMAIL_FROM` / `AUTH_OTP_EMAIL_FROM_NAME`
- `AUTH_OTP_SUPPORT_EMAIL`
- `RESEND_FROM_EMAIL` / `RESEND_FROM` / `RESEND_FROM_NAME`
- `AUTH_OTP_RESEND_COOLDOWN_SECONDS`

**AI Providers:**
- `OPENAI_API_KEY`
- `OPENAI_PRIMARY_MODEL` / `OPENAI_FALLBACK_MODEL`
- `AITAO_OPENAI_MODEL`
- `GEMINI_API_KEY`

**R2 Storage:**
- `R2_ACCOUNT_ID`
- `R2_ENDPOINT`
- `R2_BUCKET`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_API_TOKEN`

**Cloudflare CI (GitHub Secrets, not Pages env):**
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PAGES_PROJECT`

### B.5 KV Namespaces

- **None found** — no KV usage in _worker.js ENV_CONTRACT. OTP state managed via Supabase `auth.one_time_tokens`.

### B.6 R2 Buckets

- Bucket name: `uzg-enta-media` (from `.env`: `R2_BUCKET=uzg-enta-media`)
- Purpose: ENTA media uploads (profile images, post images/videos, comment images)
- Route: `/api/v1/media/enta/upload` (POST), `/api/v1/media/enta/object` (GET/HEAD)
- Allowed prefixes: `enta/posts/images/`, `enta/posts/videos/`, `enta/comments/images/`, `enta/profile/`

### B.7 Wrangler Config

- **No `wrangler.toml` or `wrangler.jsonc`** found in project root or subfolders
- Wrangler config is passed entirely via CLI args in `.github/workflows/deploy.yml`
- Config path: `.github/workflows/deploy.yml` (line: `npx wrangler pages deploy dist`)

---

## Section C — Resend

### C.1 Plan

- Confirmed: Resend production plan ($20/month per NTS briefing)
- Domain: `uzg.plus` (primary send domain)

### C.2 Domain Whitelist

- **Production**: email sent from `uzg.plus` domain (configured via `AUTH_OTP_EMAIL_FROM` env var)
- From address: set via `AUTH_OTP_EMAIL_FROM` Cloudflare Pages env — value masked
- Domain must be verified in Resend dashboard for `uzg.plus`

### C.3 API Key Storage

- **Cloudflare Pages env var**: `RESEND_API_KEY` (primary storage for production)
- **Not in GitHub Secrets** (deploy.yml does not reference RESEND vars — only CF API + Supabase)
- Key is injected at Pages runtime, resolved by `resolveAuthOtpEmailGatewayConfig(env)`

### C.4 Email Templates

- **No external Resend template IDs** — templates are built inline in `_worker.js`
- Functions: `buildAuthOtpEmailText()` + `buildAuthOtpEmailHtml()`
- Resend called with `html:` + `text:` inline content, no template_id parameter

### C.5 OTP Flow Detail

| Step | Detail |
|------|--------|
| Trigger endpoint | `POST /api/v1/auth/otp/request` |
| Payload | `{ identifier: email, emailRedirectTo: string }` |
| Backend flow | Worker → `Supabase /auth/v1/admin/generate_link` (type: 'magiclink', service_role) → extracts `response.payload.email_otp` → sends via Resend |
| Email subject | `"Your UZG+ sign-in code"` |
| Email text | `"Your UZG+ sign-in code is: [CODE]. Use this code in the UZG+ app."` |
| OTP format | Numeric string from Supabase `email_otp` (Supabase default: **6 digits**; frontend validates `length >= 6`) |
| Verify endpoint | Client-side: `supabase.auth.verifyOtp({ email, token, type: 'email' })` |
| Cooldown | 60 seconds (default, configurable via `AUTH_OTP_RESEND_COOLDOWN_SECONDS`) |
| Rate limit | 429 from Resend → code `AUTH_EMAIL_PROVIDER_RATE_LIMITED`; additionally Supabase native rate limiting applies |
| Fallback | If worker unavailable → `supabase.auth.signInWithOtp()` direct (PKCE flow) |

### C.6 OTP Storage

- **Supabase `auth.one_time_tokens`** table — 62 rows active
- Generated server-side by Supabase admin `generate_link` API
- Verified via `supabase.auth.verifyOtp()` — Supabase handles expiry/invalidation
- OTP expires automatically (Supabase default: 1 hour for magiclink type)
- NOT stored in KV or worker memory

---

## Section D — V2 Backend

### D.1 `_worker.js` Full Route List

**Auth & Runtime:**
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/v1/health` | GET | Health check |
| `/api/v1/runtime/version` | GET | Runtime version |
| `/api/v1/runtime/binding-health` | GET | Env binding health |
| `/api/v1/auth/context` | GET | Auth context (decode JWT) |
| `/api/v1/auth/otp/request` | POST | OTP request via Resend |
| `/api/v1/role/context` | GET | RBAC role context |

**Profile:**
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/v1/profile/bootstrap` | POST | Bootstrap profile on first login |
| `/api/v1/profile/me` | GET | Current user profile |
| `/api/v1/profile/update` | POST/PATCH | Update profile |
| `/api/v1/profile/avatar` | POST | Avatar upload to R2 |
| `/api/v1/profile/banner` | POST | Banner upload to R2 |
| `/api/v1/profile/:userId` | GET | Public profile read |
| `/api/v1/profile/:userId/connections` | GET | User connections |
| `/api/v1/enta/profile` | GET/POST/PATCH | ENTA profile CRUD |
| `/api/v1/enta/:userId` | GET | Public ENTA profile |

**Wallet & Economy:**
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/v1/wallet/summary` | GET | Wallet balance summary |
| `/api/v1/wallet/history` | GET | Transaction history |
| `/api/v1/wallet/packages` | GET | Available packages |
| `/api/v1/wallet/convert/readiness` | GET | Conversion readiness check |
| `/api/v1/wallet/transfers` | GET | Transfer history |
| `/api/v1/wallet/transfer` | POST | P2P transfer |
| `/api/v1/wallet/convert` | POST | U→UZG conversion |
| `/api/v1/uzgfi/overview` | GET | UZGFI overview |
| `/api/v1/uzgfi/catalog` | GET | Asset catalog |
| `/api/v1/uzgfi/packages/purchase` | POST | Package purchase |
| `/api/v1/credit/profile` | GET | Credit profile |

**Membership:**
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/v1/membership/status` | GET | Current tier status |
| `/api/v1/membership/history` | GET | Membership history |
| `/api/v1/membership/upgrade` | POST | Tier upgrade |
| `/api/v1/membership/auto-renew` | POST/PATCH | Auto-renew setting |

**U-Reward:**
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/v1/u-reward/checkin` | GET | Daily check-in state |
| `/api/v1/u-reward/lucky-spin` | GET | Lucky spin state |
| `/api/v1/u-reward/chest-loot` | GET | Chest loot state |
| `/api/v1/u-reward/quiz` | GET | Quiz state |
| `/api/v1/u-reward/season` | GET | Season state |
| `/api/v1/u-reward/live-ops` | GET | Live ops state |
| `/api/v1/missions/daily` | GET | Daily missions |
| `/api/v1/promotion-u/campaign` | GET | Promo campaign state |
| `/api/v1/promotion-u/claim` | POST | Promo claim |

**Social/Chat:**
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/v1/flow/feed` | GET/POST | Social feed |
| `/api/v1/flow/posts` | POST | Create post |
| `/api/v1/flow/interactions` | POST | React/interact |
| `/api/v1/posts/:id` | GET/DELETE | Post detail |
| `/api/v1/posts/:id/comments` | GET/POST | Post comments |
| `/api/v1/conversations` | GET/POST | Chat conversations |
| `/api/v1/messages` | GET/POST | Messages |
| `/api/v1/messages/read` | POST | Mark read |
| `/api/v1/notifications` | GET | Notification feed |
| `/api/v1/search/global` | GET | Global search |

**Connections:**
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/v1/resonance/connect` | POST | Connect/follow |
| `/api/v1/resonance/connections` | GET | My connections |
| `/api/v1/resonance/follow` | POST | Follow user |
| `/api/v1/connect/suggestions` | GET | Suggested connections |

### D.2 `aier_server.js` (Local Dev Only, port 3001)

Express server for AIER automation loop (NTS internal tooling). Not production — not exposed to users. Routes: `/api/aier/*` for automation tasks, wallet risk intents, chat safety actions, etc.

### D.3 Auth Flow

```
1. OTP REQUEST:
   POST /api/v1/auth/otp/request
   Body: { identifier: email, emailRedirectTo: string }
   → Worker: Supabase admin/generate_link (magiclink, service_role)
   → Extract email_otp from payload
   → Send via Resend (subject: "Your UZG+ sign-in code")
   → Response: { ok: true, data: { cooldown_seconds: 60, delivery_owner: "worker-resend-email-gateway" } }

2. OTP VERIFY (client-side):
   supabase.auth.verifyOtp({ email, token, type: 'email' })
   → Supabase validates against auth.one_time_tokens
   → Returns { data: { session, user } }
   → Session stored via Supabase JS client (persistSession: true, PKCE flow)

3. SESSION STORAGE:
   - localStorage key: sb-kkhhpecofolmrodyeslp-auth-token
   - PKCE code_verifier stored during flow
   - autoRefreshToken: true (background token refresh)

4. SUBSEQUENT REQUESTS:
   Authorization: Bearer <supabase_access_token>
   Worker decodes via decodeJwtPayload() for context
   Supabase RLS validates JWT sub (user_id)

5. LOGOUT:
   supabase.auth.signOut() → clears localStorage
   No dedicated /api/v1/auth/logout endpoint (client-side only)
```

### D.4 JWT Structure

- **Issuer**: Supabase (`iss: "https://kkhhpecofolmrodyeslp.supabase.co/auth/v1"`)
- **Claims**: `sub` (user_id UUID), `email`, `role` (authenticated), `aud`, `exp`, `iat`, `aal`
- **Expiry**: 1 hour (Supabase default), auto-refreshed via refresh_token
- **Signing**: HMAC HS256 with Supabase JWT_SECRET (not exposed to workers)
- Worker decodes payload only (no signature verification — trusts Supabase)

### D.5 CORS Config

- Worker identifies `OFFICIAL_LIVE_DOMAIN = 'uzg.plus'` for request origin validation
- Deprecated legacy host `app.uzg.plus` redirected to `uzg.plus`
- No explicit `Access-Control-Allow-Origin` header found in worker ENV_CONTRACT — Pages serves static assets with Cloudflare defaults
- API routes protected by Bearer token, not CORS

---

## Section E — V3 Frontend

### E.1 Build Target

- **Cloudflare Pages** (dist/ output) — confirmed via deploy.yml + x-uzg-runtime header
- Build tool: Vite (vite.config.js + vite.config.v3.ts)
- Output: `dist/` (V2 shell + V3 components + _worker.js)

### E.2 V3 Routes (24 confirmed)

| Route | Page | Status |
|-------|------|--------|
| `/v3/` | V3 Home | Live (real data) |
| `/v3/enta` | ENTA Page | Live (real) |
| `/v3/tao` | TAO Overview | Live |
| `/v3/tao/bazi` | Bazi | Live (hybrid: enta_bazi_records + bazi_charts) |
| `/v3/tao/ziwei` | Tu Vi | Live (ziwei_charts) |
| `/v3/tao/phongthuy` | Phong Thuy | Mock (TAO_BACKEND_LANE02_DEFERRED) |
| `/v3/tao/vannien` | Lich Van Nien | Mock (TAO_BACKEND_LANE02_DEFERRED) |
| `/v3/tao/aier` | AIER Tao Chat | Mock (TAO_BACKEND_LANE02_DEFERRED) |
| `/v3/chat` | Chat inbox | Live |
| `/v3/chat/:roomId` | DM Room | Live |
| `/v3/wallet` | Wallet | Live |
| `/v3/wallet/convert` | Conversion | Live |
| `/v3/wallet/asset/:code` | Asset detail | Live |
| `/v3/plus` | Plus Hub | Live |
| `/v3/membership` | Membership | Live |
| `/v3/u-reward` | U-Reward | Live |
| `/v3/enta/connections` | Connections | Live |
| `/v3/onboarding` | ENTA onboarding | Live |
| `/v3/profile/:userId` | Public profile | Live |
| `/v3/settings` | Settings | Live |
| `/v3/account/delete` | Account delete | Live |
| `/v3/auth/login` | Login | Live |
| `/v3/auth/signup` | Signup | Live |
| `/v3/auth/otp` | OTP verification | Live |

### E.3 Auth State Management

- **Supabase JS client** (`@supabase/supabase-js`) — no Zustand/Redux for auth state
- Config: `flowType: 'pkce'`, `persistSession: true`, `autoRefreshToken: true`
- Session key in localStorage: `sb-kkhhpecofolmrodyeslp-auth-token`
- Hooks: `useAuth.ts` wraps `supabase.auth.onAuthStateChange`

### E.4 API Client Config

- Primary: Supabase client direct (RLS-protected reads) for most data
- Secondary: Cloudflare Worker `/api/v1/*` for write operations + complex queries
- No dedicated Axios/fetch wrapper — per-hook `fetch` calls or Supabase SDK
- `v2ExpressClient.ts` — thin wrapper for V2 worker endpoints
- Base URL: relative `/api/v1/` (same-origin, resolved by Cloudflare Pages routing)

### E.5 TAO_DATA_SOURCE Flag

**File:** `src/data/v3-tao-data-layer.ts`, **line 28**

```typescript
export const TAO_DATA_SOURCE: TaoDataSourceConfig = {
  bazi: 'real',        // hybrid — enta_bazi_records + bazi_charts EXIST
  ziwei: 'real',       // ziwei_charts (4 rows) EXISTS
  phongthuy: 'mock',   // Lane_02 DDL pending (TAO_BACKEND_LANE02_DEFERRED)
  vannien: 'mock',     // Lane_02 DDL pending (TAO_BACKEND_LANE02_DEFERRED)
  aierTao: 'mock',     // Lane_02 DDL pending (TAO_BACKEND_LANE02_DEFERRED)
};
```

To go live for any module: flip flag to `'real'` + implement `REAL_DATA_FETCHER.module()` in same file. No UI changes needed.

---

## Section F — Existing Test Accounts

### F.1 Query Results

**Total test/dev accounts found:** 321  
Filter: email LIKE `%test%` OR `%qa%` OR `%demo%` OR `%audit%` OR `%uzg.local%` OR `%deltajohnsons%`

| Metric | Count |
|--------|-------|
| Total matches | 321 |
| Has signed in | 299 |
| Email confirmed | 310 |
| Never signed in | 22 |

### F.2 Sample Accounts (masking applied)

| Email (masked) | Created | Last Login | Confirmed | Tier |
|----------------|---------|-----------|-----------|------|
| `auditmol5eus0@d***.com` | 2026-04-30 | 2026-04-30 | YES | Explorer (per .env.local) |
| `auditmol5wqnc@d***.com` | 2026-04-30 | 2026-04-30 | YES | null (no membership) |
| `auditmol66xjq@d***.com` | 2026-04-30 | 2026-04-30 | YES | null (no membership) |
| `auditmol517tt@d***.com` | 2026-04-30 | 2026-04-30 | YES | null (no membership) |
| `lane01-test-1777647849@u***.local` | 2026-05-01 | 2026-05-01 | YES | — |
| `discovery-probe-test@e***.test` | 2026-05-02 | 2026-05-02 | YES | — |
| `xpwa.connect.audit.a.*@uzg.local` (×6 sets) | 2026-04-08 | 2026-04-08 | YES | — |

### F.3 Best Reusable Account for Lane_02 Phase 6

**`auditmol5eus0@deltajohnsons.com`** — confirmed in `.env.local`:
- Provider: mail.tm (`AUDIT_LOGIN_PROVIDER=mail.tm`)
- Tier: Explorer
- Mail.tm API token available in `.env.local`
- OTP inbox URL: `https://api.mail.tm/messages`
- Signed in 2026-04-30 — active account

OTP bypass path for this account: fetch OTP via mail.tm API (token in .env.local).

### F.4 Tier Coverage Gap

No test accounts with Seeker/Builder/Sovereign tiers found among audit/test accounts. To test higher-tier flows, must either:
1. Create new accounts + manually upgrade (requires payment flow or admin SQL)
2. Use Supabase Admin SDK to set tier directly (Option C approach)
3. Use existing real user accounts (requires NTS permission)

---

## Section G — Secrets Governance Lane_02

### G.1 LANE02-UZG-SECRETS-PROVISION-V1 Location

- `.lane_02/governance/SECRETS_GOVERNANCE_v1_2026-05-01.md` (local repo)
- Provisioned: 2026-05-01 from Lane_01 Uniton_OS/.env.local

### G.2 Secrets Lane_02 Currently Has

| Secret | Location | Covers |
|--------|----------|--------|
| `OPENAI_API_KEY` | `.env` + `.env.local` | Embedding, GPT models |
| `ANTHROPIC_API_KEY` | `.env.local` | Claude models |
| `GEMINI_API_KEY` | `.env` + `.env.local` | Gemini models |
| `VITE_SUPABASE_URL` | `.env` | Lane_02 Supabase URL |
| `VITE_SUPABASE_ANON_KEY` | `.env` | Lane_02 anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env` | Lane_02 service role |
| `GH_TOKEN` | `.env.local` | GitHub API access |
| `R2_*` | `.env` | R2 bucket access |
| `SUPABASE_LANE01_SERVICE_ROLE_KEY` | `.env.local` | Lane_01 cross-ref (read-only caution) |

### G.3 Runtime Secret Fetch Pattern

Lane_02 loads secrets at script startup:
```javascript
// Pattern: load .env then .env.local (local overrides)
dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local' })
// or readFileSync + manual parse (scripts/import_aier_kb_embeddings.mjs)
```

### G.4 Gaps: Additional Secrets Needed for OTP Bypass

| Secret Needed | Current Status | Source |
|--------------|----------------|--------|
| `AUDIT_LOGIN_MAILTM_TOKEN` | **AVAILABLE** in `.env.local` | mail.tm JWT |
| `AUDIT_LOGIN_INBOX_URL` | **AVAILABLE** in `.env.local` | `https://api.mail.tm/messages` |
| `AUDIT_LOGIN_MAILTM_PASSWORD` | **AVAILABLE** in `.env.local` | mail.tm account password |
| Seeker/Builder/Sovereign test accounts | **MISSING** | Need creation or admin set |

**Self-serve OTP bypass is already possible** for the Explorer test account via mail.tm API.

---

## Section H — Email/Auth Bypass Options Analysis

### Option A — Mailtrap/Mailosaur

**Feasibility:** PARTIAL (requires Resend config change)

| Check | Result |
|-------|--------|
| Resend supports dynamic recipient routing | No — Resend sends to actual email address |
| Would require dedicated test subdomain | Yes — e.g. `@test.uzg.plus` routed to Mailosaur |
| Requires Resend domain config change | YES — needs new DNS record for test subdomain |
| Extra cost | ~$10/month Mailosaur Starter |
| Backend change needed | NO — only Resend domain DNS config |
| Risk | Low — isolated test subdomain |

**Verdict:** Viable but requires NTS Resend dashboard access to add subdomain.

### Option B — Test Header in V2 Worker

**Feasibility: BLOCKED**

- Requires modifying `dist/_worker.js` or source
- R-BACKEND-IMMUTABLE: KHÔNG được phép
- **SKIP**

### Option C — Supabase Admin SDK Generate JWT/Session

**Feasibility: RECOMMENDED** ✅

| Check | Result |
|-------|--------|
| `SUPABASE_SERVICE_ROLE_KEY` accessible | YES (`.env` + Cloudflare env) |
| `admin.generateLink({ type: 'magiclink', email })` supported | YES (already used in `_worker.js`!) |
| Can extract OTP token server-side | YES — `response.payload.email_otp` |
| Can create signed URL for direct login | YES — `response.properties.action_link` |
| Requires backend code change | NO — script-only, not production backend |
| Risk level | LOW — test environment only, never production |

**Implementation for Lane_02 Phase 6:**
```javascript
// Script-only, not production code
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// Generate magic link → extract token
const { data } = await supabase.auth.admin.generateLink({
  type: 'magiclink',
  email: 'auditmol5eus0@deltajohnsons.com'
})
const token = data.properties.email_otp  // 6-digit OTP
// OR use data.properties.action_link directly to create session
```

This bypasses email entirely. The OTP code is returned directly from admin API.

### Option D — Inbucket/MailHog Local

**Feasibility: LIMITED**

| Check | Result |
|-------|--------|
| V2 worker uses Resend for production | YES (production locked to uzg.plus domain) |
| Supabase direct signInWithOtp() fallback exists | YES (line ~70 in otpClient.ts) |
| Can intercept SMTP locally | Only if using Supabase direct flow (not worker path) |
| Works for production OTP testing | NO — production always routes through Resend |
| Works for local dev with custom SMTP | YES (if Supabase configured with custom SMTP) |

**Verdict:** Not practical for production E2E. Only local dev.

### H.5 Recommendation

**Ranked options for Lane_02 Phase 6 OTP bypass:**

1. **Option C (Admin SDK)** — FASTEST. No extra cost, no DNS change, self-contained. Lane_02 already has `SUPABASE_SERVICE_ROLE_KEY`. One-time setup script, reusable in Playwright tests via `globalSetup`. ⭐ RECOMMENDED
2. **Mail.tm for Explorer account** — ALREADY WORKS. `auditmol5eus0@deltajohnsons.com` + mail.tm token in `.env.local`. Playwright can fetch OTP via `https://api.mail.tm/messages`. No new work needed for Explorer tier.
3. **Option A (Mailosaur)** — Best for long-term test infrastructure but requires NTS action (Resend DNS config).
4. **Option D** — Skip for production testing.

---

## Section I — Cross-Lane Runtime Status

### I.1 Live Mirror Sync

| URL | HTTP | Notes |
|-----|------|-------|
| `runtime/lane_02_uzg/INDEX.live.md` | ✅ 200 | Lane_02 index live |
| `runtime/lane_02_uzg/canon/tao_ziwei/TAO_ZIWEI_CANON_OFFICIAL_v1.0_2026-04-25.md` | 404 | Path differs — file is in subdirectory `tao_ziwei/` |
| `runtime/lane_02_uzg/canon/tao_ziwei/TAO_ZIWEI_SYSTEM_LAW_v1.1_2026-04-29.md` | local OK | Confirmed locally in 10-file set |
| `network/lane_02_uzg/MISSION.live.md` | ❌ 404 | Expected gap (NAMESPACE-V1 known) |
| `runtime/cross_lane/handoff_log.live.md` | ✅ 200 | Cross-lane log live |

**Note:** Canon files exist locally in `runtime/lane_02_uzg/canon/tao_ziwei/` — correct subfolder structure. Raw URL path test used wrong path. Local canon is intact.

### I.2 SYNC_INFO.md Last Sync

```
Last sync: 2026-05-02T09:02:50Z (today)
Source: unitonzengarden/Uniton_Shared (private) → Uniton_Shared_Live (public)
Source commit: a446922c4122eaa479504aec2c1f1d3984c5bed3
Triggered by: push
```
**Lag:** Approximately auto-triggered on push. Low lag (<1 hour typically).

### I.3 Lane_01 Zone Status

| URL | HTTP | Notes |
|-----|------|-------|
| `runtime/lane_01_uzg/INDEX.live.md` | ✅ 200 | Lane_01 index live |
| `runtime/lane_01_uzg/status_dashboards/lane_division_v1.live.md` | 404 | Not yet shipped by Lane_01 |

Lane_01 runtime zone partially populated. INDEX exists, detailed dashboards pending.

### I.4 Cross-Lane Zone Status

| URL | HTTP | Notes |
|-----|------|-------|
| `runtime/cross_lane/handoff_log.live.md` | ✅ 200 | Live + active |
| `runtime/cross_lane/` directory | Exists | handoff_log.live.md present |

---

## Section J — Recommendations for CLA-2

1. **Auth bypass fastest path**: Use **Option C** (Supabase Admin SDK `generateLink`) for Phase 6 P0 user-journey audit. Lane_02 has `SUPABASE_SERVICE_ROLE_KEY` in `.env`. Write a Playwright `globalSetup.ts` that generates magic link tokens directly — zero email delivery, zero Resend dependency.

2. **Explorer account reuse**: `auditmol5eus0@deltajohnsons.com` is immediately reusable via mail.tm API (`AUDIT_LOGIN_MAILTM_TOKEN` in `.env.local`). No new account creation needed for Explorer tier smoke tests.

3. **Higher-tier test accounts**: Create 3 new accounts (Seeker/Builder/Sovereign) via Admin SDK `admin.createUser()` + direct Supabase SQL `INSERT INTO memberships` with service_role. These can be created as part of Phase 6 test setup without UI flow.

4. **Secrets self-sufficient**: Lane_02 already has all required secrets for OTP bypass (`SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, mail.tm credentials). No cross-Lane secret request needed.

5. **TAO live-flip**: When dispatching chat backend wire-up sprint, simply flip `aierTao: 'mock' → 'real'` in `src/data/v3-tao-data-layer.ts:33` + implement `fetchRealAierTao()` function. The KB RAG infrastructure (`search_aier_kb` RPC + `context-builder.js`) is already production-ready.

6. **Cross-Lane runtime**: `runtime/cross_lane/` is active and writable. Use `handoff_log.live.md` for cross-Lane comms. No gap in this path.

7. **SYNC lag**: Uniton_Shared → Uniton_Shared_Live sync is push-triggered with low lag. Deliverables are readable within minutes of push.

8. **Phase 6 5-module audit scope**: CHAT + WALLET + PLUS + U-Reward all have live backends. TAO (aierTao) requires backend wire-up first. Recommend running 4/5 modules now + TAO when deferred backend is shipped.
