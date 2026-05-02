# UZG+ Cross-Lane Tech Stack Reference

**Authority:** CLA Lane_01 maintained
**Visibility:** Both Lanes read
**Purpose:** Tech infrastructure visibility for Lane_02 self-serve audit + module wiring without asking NTS creds (DEC-07)
**Last update:** 2026-05-02T09:15Z

⚠️ **SECURITY:** This file contains NAMES, PATHS, REFERENCES — NO actual secret values.
For actual secret values, use Lane secrets provision per repo `.env.local` files.
The single JWT included below is the Supabase ANON key, which is **public-safe by design**
(role=anon, RLS-protected access only). Any other JWT (especially SERVICE_ROLE) MUST NOT
appear in this file.

---

## §A Supabase

### Project info
- **Project ID:** `kkhhpecofolmrodyeslp` (UZG+ production)
- **Project URL:** `https://kkhhpecofolmrodyeslp.supabase.co`
- **Anon key (public, safe — role=anon):**
  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtraGhwZWNvZm9sbXJvZHllc2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODY1NTIsImV4cCI6MjA4ODU2MjU1Mn0.90c8I1OSw5Zt0-Uu_ZKFuMSbM3PJIDDabosVKhIgQ14
  ```
- **Service role key:** STORED IN — NOT in this file:
  - Cloudflare Workers env (Worker secret name `SUPABASE_SERVICE_ROLE_KEY`)
  - Lane_01 Vultr workspace `C:\workspace\Uniton_Shared\.env.local`
  - Lane_01 Vultr workspace `C:\workspace\UZGPLUS\.env.local`
  - Lane_02 access: per Lane_02 secrets provision (verify via Lane_02 zone or request via §F)

### Relevant tables for V3 modules

**Auth + Identity:**
- `auth.users` (Supabase managed) — V2 OTP via `supabase.auth.admin.generateLink({ type: 'magiclink' })`
- `profiles` (V2 user metadata, ~31 cols)
- `enta_profiles` (V3 ENTA Sprint 5.5)
- `enta_connections`
- `enta_connection_requests`

**Wallet:**
- `wallet_ledger` (transaction log; column `asset` ∈ {`U`, `UZG`, `USDc`, ...})
- `wallet_balances` (column is `asset` NOT `asset_code` — DRIFT-02)

**Membership:**
- `memberships` (column is `tier_id` NOT `tier` — DRIFT-04 HIGH)
- `member_tiers` (4 rows: Explorer / Seeker / Builder / Sovereign)
- `membership_current_view` (JOIN view, ~27 cols, KL-043)

**TAO (Sprint 5.8 + Audit #82):**
- `bazi_charts` (~3 rows live, JSONB `chart_object`)
- `bazi_audit_log`
- `enta_bazi_records` (~77 rows, structured pillar bridge — KL-046 ENTA-Bazi pattern)
- `ziwei_charts` (~4 rows live, JSONB `chart_object` + `cycle_layers`)
- `ziwei_audit_log`
- (Phong Thủy / Vạn Niên / AIER Tao tables: NOT EXIST — Lane_02 will ship DDL Phase 6)

**HOME / Social:**
- `app_posts` (V2 actual table — canon docs say `flow_posts`, KL-034)
- Reactions tables (5 ngũ hành: Hỏa / Mộc / Kim / Thủy / Thổ)

**CHAT:**
- `enta_conversations` (table prefix `enta_*`, KL-035)
- `enta_messages`

**U-Reward:**
- `wallet_ledger` (reward emissions, asset='U')
- `reward_events`
- `daily_missions`, `user_missions`
- `quiz_questions`, `user_quiz_answers`
- `live_ops_campaigns`, `user_campaign_progress`
- `u_reward_baseline_emissions` (RLS BLOCKED REST per DRIFT-14 HIGH — RPC only OR hardcoded V3 baseline)

### RLS pattern overview
- All user-scoped tables: `auth.uid() = user_id` policy
- Public reads: `member_tiers`, `quiz_questions`, `daily_missions`, `live_ops_campaigns` allow authenticated read
- Admin scope: `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS (server-side only)

### Edge Functions
- `wallet_convert_u_to_uzg` (Sprint 5.4, atomic with idempotency)
- `reward_emit` (Sprint 5.7, 12 actionTypes)

### RPCs
Key Lane_02 RPCs (per Sprint 5.8 + TAO Audit #82):
- `rpc_get_enta_bazi_record` (Bazi compute via ENTA plane)
- `calc_enta_profile` (parameterized)
- Connect-related RPCs (Sprint 5.9 — Lane_01 scope, but Lane_02 may reference)

For comprehensive RPC catalog see §G referenced audits (Backend Audit #78 — see "ship later" note).

---

## §B Cloudflare

### Pages (V3 PWA deploy)
- **Project name:** `product-v2-pages-shell`
- **Worker bound to Pages:** `product-v2-pages-worker`
- **Domain:** `https://uzg.plus` (production)
- **Branch deploys:** `main` → production, feature branches → preview URLs
- **Build:** `npm run build:v3`, output in `dist/v3/` mounted at `/v3/*`
- **Routing:** `dist/_redirects` rule `/v3/*  /v3/index.html  200` (Cloudflare Pages only)

### Worker (V2 backend immutable)
- **Worker source:** `_worker.js` in repo (or Cloudflare assets)
- **Routes:**
  - `https://uzg.plus/api/v1/*` → Worker handlers (V2 backend)
  - `https://uzg.plus/v3/*` + `/v2/*` → Pages SPA shell
- **Modification rule:** IMMUTABLE per Lane Division v1 + DEC-08. Both Lanes only wire frontend to Worker — no Worker code edits.

### Worker environment variables (NAMES only — values in Cloudflare dashboard secrets)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` — admin operations
- `RESEND_API_KEY` — email delivery
- `AUTH_OTP_EMAIL_FROM` — Resend verified sender
- `ANTHROPIC_API_KEY` — if AIER chat features
- `OPENAI_API_KEY` — if AIER chat alternate
- (Additional service-specific keys per Cloudflare dashboard)

### Pages env vars (V3 build time, public — baked into bundle)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (same ANON key as §A)
- (No secrets in V3 frontend bundle by policy)

### udna-public-pages-shell (separate, out of V3 scope)
- Routes: `/aier/mint`, `/aier/marketplace`
- Different Pages project; not under V3 PWA OS canon

---

## §C Resend (email delivery)

### Plan
- $20/month tier (per NTS confirmation)
- Verified sender configured via `AUTH_OTP_EMAIL_FROM` env var on Worker

### Domain whitelist
- `uzg.plus` (primary)
- `unitonzengarden.com` (verify if registered — may not be active)

### API key location
- Stored: Cloudflare Workers secret `RESEND_API_KEY`
- Worker `_worker.js` reads via `env.RESEND_API_KEY`
- Lane_02 access NOT directly required if using Supabase Admin SDK OTP bypass (recommended; see §E)

### Email template (CRITICAL: NO separate template ID)

V2 `_worker.js` generates email HTML **inline** within the OTP request handler. No Resend template
ID exists; the template is hardcoded in Worker source. Pattern (READ reference, do NOT modify):

```javascript
// Inside _worker.js OTP handler (READ reference only)
const otpCode = generateOtp(); // 6-8 digits per V2 LoginPage.jsx:24-25
const emailHtml = `
  <html><body>
    <h2>Your UZG+ sign-in code</h2>
    <p>Code: <strong>${otpCode}</strong></p>
    <p>Valid for 10 minutes.</p>
  </body></html>
`;
await sendViaResend(env.RESEND_API_KEY, to, 'Your UZG+ sign-in code', emailHtml);
```

Reference Sprint 5.10 verify report for exact pattern in repo:
`audits/ecosystem/uzg-plus/LANE01-UZG-V2-AUTH-OTP-VIA-RESEND-VERIFY-2026-05-02T03-15Z.report.md`
(if present in source tree).

---

## §D V2 Endpoint Catalog

### Auth (Cloudflare Worker)
- `POST /api/v1/auth/otp/request` — Request OTP (email or phone)
  - Body: `{ email }` OR `{ phone }`
  - Response: `{ ok: true, expires_in: 600 }` (or `{ ok: true, data: { sent: true, cooldown_seconds: 60, delivery_owner: 'mock' | 'resend' } }`)
- Verify path: Supabase native `supabase.auth.verifyOtp({ email, token, type: 'email' })` OR `{ phone, token, type: 'sms' }`

### V2 Express endpoints (per `aier_server.js`)
- `/api/v1/flow/feed` — HOME feed
- `/api/v1/flow/posts` — Compose post
- `/api/v1/flow/reactions` — React to post
- `/api/v1/chat/inbox` — Chat inbox
- `/api/v1/chat/messages/:conversation_id` — DM Room messages
- `/api/v1/chat/send` — Send message
- `/api/v1/wallet/transfer` — Send transfer (Sprint 5.11; aier_server.js:18554)
- `/api/v1/deposits/address` — Get deposit address (Sprint 5.11; aier_server.js:18316)
- `/api/v1/membership/upgrade` — Membership upgrade flow

### Authentication header pattern
- Bearer JWT: `Authorization: Bearer <Supabase JWT>`
- JWT obtained via Supabase Auth (`verifyOtp` returns `session.access_token`)

### Rate limits
- OTP request: ~3-5 per email per 10 min (verify exact via V2 Worker logic)
- General API: per Cloudflare Worker config

### Reference detailed flows (Sprint 5.11 Audit #88 V2_FLOW_*_EXACT)

All exist in this repo — fetch via Live mirror:
- `audits/ecosystem/uzg-plus/v2-exact-flows/V2_FLOW_AUTH_EXACT_v1.md`
- `audits/ecosystem/uzg-plus/v2-exact-flows/V2_FLOW_HOME_EXACT_v1.md`
- `audits/ecosystem/uzg-plus/v2-exact-flows/V2_FLOW_CHAT_EXACT_v1.md`
- `audits/ecosystem/uzg-plus/v2-exact-flows/V2_FLOW_WALLET_EXACT_v1.md`
- `audits/ecosystem/uzg-plus/v2-exact-flows/V2_FLOW_ENTA_EXACT_v1.md`
- `audits/ecosystem/uzg-plus/v2-exact-flows/V2_FLOW_PLUS_MEMBERSHIP_EXACT_v1.md`
- `audits/ecosystem/uzg-plus/v2-exact-flows/V2_FLOW_U_REWARD_EXACT_v1.md`
- `audits/ecosystem/uzg-plus/v2-exact-flows/V2_FLOW_TAO_EXACT_v1.md`

Each flow file contains exact endpoint signatures, payload schemas, response shapes per module.

---

## §E Test Accounts (DECLINED — Lane_02 self-serve)

⚠️ **Lane_01 does NOT maintain authoritative list of test accounts.**

Why declined: Test account inventory is execution-time concern, not infrastructure. Lane_02 has
direct access to Supabase admin operations and can self-discover existing test users + create
dedicated test users on demand without Lane_01 mediation.

### Lane_02 self-serve discovery pattern

```javascript
// Using SERVICE_ROLE_KEY (bypasses RLS) — server-side only, never in browser bundle
import { createClient } from '@supabase/supabase-js';
const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Discover existing test users
const { data, error } = await sb
  .from('auth.users')
  .select('id, email, created_at, last_sign_in_at, raw_user_meta_data')
  .or('email.like.%test%@%,email.like.%demo%@%,email.like.%lane02%@%')
  .order('created_at', { ascending: false })
  .limit(50);

console.log('Test accounts found:', data);
```

### Recommended Lane_02 OTP bypass via Supabase Admin SDK

```javascript
// Generate magiclink (server-side, no email sent — token returned in response)
const { data, error } = await sb.auth.admin.generateLink({
  type: 'magiclink',
  email: 'test-user@unitonzengarden.local'
});

// data.properties.action_link contains URL with OTP-equivalent token
// Playwright navigates to that URL → user auto-logged in → no email roundtrip needed
await page.goto(data.properties.action_link);
```

This works WITHOUT modifying V2 backend (read-only admin operation, V2 Worker not involved).

### Alternative: Create dedicated test users

```javascript
// One-time setup
const { data, error } = await sb.auth.admin.createUser({
  email: 'lane02-test-1@unitonzengarden.local',
  email_confirm: true, // skip email confirmation
  user_metadata: { test_user: true, lane: 'lane_02' }
});

// Generate magiclink for repeated use
const { data: link } = await sb.auth.admin.generateLink({
  type: 'magiclink',
  email: 'lane02-test-1@unitonzengarden.local'
});

// Cache link in Playwright fixture (JSON file gitignored)
```

---

## §F Secrets Governance

### Process for additional secret access

If Lane_02 needs additional secret access not currently provisioned:

1. CLA-2 author handoff JSON to Lane_01:

   ```json
   {
     "handoff_id": "LANE02-TO-LANE01-REQUEST-SECRET-ACCESS-<TASK>-<ISO>",
     "secret_name": "<e.g. SUPABASE_SERVICE_ROLE_KEY>",
     "rationale": "<why Lane_02 needs>",
     "scope_limit": "<read-only? specific table?>",
     "deadline": "<ISO>"
   }
   ```

2. Push to `runtime/lane_02_uzg/handoff_to_lane01/`

3. CLA-1 reviews:
   - High-sensitivity (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) → escalate NTS strategic decision
   - Read-only references → CLA-1 grant + add to Lane_02 secrets store
   - Time-bounded test access → may grant with audit trail

4. Lane_01 grants access OR escalates to NTS

### Boundary
- Lane_01 doesn't unilaterally distribute high-sensitivity secrets
- NTS retains final authority on cross-Lane secret sharing
- Future: `runtime/cross_lane/secret_grants.live.md` (if pattern repeats)

---

## §G Reference Audit Files (Lane_02 should read these)

For deep V2 backend understanding, fetch via Live mirror raw URL.

### TAO Backend Audit (#82) — EXISTS in repo
- `audits/ecosystem/uzg-plus/backend/UZG_PLUS_V2_TAO_BACKEND_SCHEMA_v1.md` ✓
- `audits/ecosystem/uzg-plus/backend/UZG_PLUS_V2_TAO_BACKEND_RPC_AND_RLS_v1.md` ✓
- `audits/ecosystem/uzg-plus/backend/UZG_PLUS_V2_TAO_INTEGRATION_STRATEGY_v1.md` ✓
- `audits/ecosystem/uzg-plus/backend/UZG_PLUS_V2_TAO_CANON_DRIFT_MAP_v1.md` ✓

### V2 EXACT Comprehensive Read (#88) — EXISTS in repo
- `audits/ecosystem/uzg-plus/V2_EXACT_MASTER_SUMMARY_GO_LIVE_v1.md` ✓
- + 8 module-specific files in `audits/ecosystem/uzg-plus/v2-exact-flows/V2_FLOW_*_EXACT_v1.md` ✓

### Backend Foundation Audit (#78) — TO BE PUBLISHED in this repo (Phase 6 Lane_01 task)

The following files were authored under Audit #78 but are NOT yet in this Uniton_Shared repo
(may be in source-only / archive / different naming). Phase 6 Lane_01 task: re-publish with the
canonical names below to match this reference. Lane_02 should request via §F handoff if needed
urgently.

- `UZG_PLUS_V2_BACKEND_SCHEMA_v1.md` (192 tables)
- `UZG_PLUS_V2_BACKEND_RPC_CATALOG_v1.md` (188 RPCs)
- `UZG_PLUS_V2_BACKEND_RLS_POLICIES_v1.md` (161 policies)
- `UZG_PLUS_V2_BACKEND_EDGE_FUNCTIONS_v1.md`
- `UZG_PLUS_V2_BACKEND_INVARIANTS_v1.md` (9 verified)
- `UZG_PLUS_V2_BACKEND_DRIFT_MAP_v1.md` (14 drifts including DRIFT-04 HIGH + DRIFT-14 HIGH)
- `UZG_PLUS_V2_EXPRESS_ENDPOINT_MAP_v1.md` (75 endpoints)

Until those are re-published, Lane_02 can extract equivalent info from:
- `audits/ecosystem/uzg-plus/LANE01-UZG-PLUS-AUDIT-AND-SYSTEM-MAP-V1_REPORT.md` (master report)
- `audits/ecosystem/uzg-plus/CANON_V2_RECONCILIATION_PROPOSAL.md` (drift detail)
- `system_maps/UZG_PLUS_SYSTEM_MAP_V1.md` (system map)

### Cross-Lane Runtime
- `runtime/lane_01_uzg/INDEX.live.md`
- `runtime/lane_01_uzg/status_dashboards/lane_division_v1.live.md`
- `runtime/cross_lane/master_module_map.live.md`

---

## §H Update Cadence

This file maintained by CLA-1. Updates triggered by:
- V2 backend infrastructure changes (rare, immutable per DEC-08)
- New modules ship and tables/RPCs added
- Secrets provisioning patterns change
- Lane_02 specific request for additional info (via handoff JSON)

Append timestamp + change summary to bottom of file (§I Change Log).

---

## §I Change Log

- **2026-05-02T09:15Z:** Initial publish per `LANE02-TO-LANE01-REQUEST-TECH-STACK-RUNTIME-PUBLISH-2026-05-02T08-50Z` (CLA-1 response with scope modifications via `LANE01-RESPONSE-TO-LANE02-TECH-STACK-RUNTIME-PUBLISH-2026-05-02T08-55Z`). Shipped by CLAC1 task `LANE01-CLAC1-TECH-STACK-RUNTIME-PUBLISH-2026-05-02T09-15Z`. Backend Audit #78 reference files marked as "to be re-published Phase 6" (not present in this repo with canonical names).
