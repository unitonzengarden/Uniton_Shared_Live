# UZG+ ECOSYSTEM — TECH STACK REGISTRY v1.0

**Authored:** 2026-04-30 by CLA Lane_01 / CLAC-1 (Claude Opus 4.7)
**Authority:** AMD_NTS_FULL_TECH_AUTONOMY_2026-04-29 + AMD_LANE01_CTO_AUTO_APPROVE_TECH_NON_CANON §3.1
**Owner:** NTS (final approver) · CLA Lane_01 (curator) · CLAC-1 + Cursor (executors)
**Visibility:** PRIVATE repo `Uniton_Shared` only — NOT mirrored to public Live (security-sensitive)
**Update cadence:** Append-only changelog; values never committed (only key names + presence flags)
**Status:** PUBLISHED 2026-04-30

---

## §0 Header — Security Policy Summary

This file is the **single source of truth** for every external service the UZG+ ecosystem talks to. It documents:

- **Which Lanes use which services**
- **Where credentials are stored** (which `.env.local` files)
- **Whether each credential is currently present** (per workspace)
- **What action NTS takes when a new service is needed** (max 1 paste, then Lane handles forever)

**SECURITY NOTE:** This registry contains **NO actual secret values**. Only:
- Service names + dashboard URLs (public info)
- Environment variable key names (e.g. `OPENAI_API_KEY` — the *name*, not the *value*)
- Presence flags per workspace (`PRESENT` / `ABSENT` boolean — established via `grep -q` key-existence check, never reading the value)

Per NTS verbatim 2026-04-30 ("có lộ CLA tôi ko lo"): internal trust accepted for 3 months. Registry stored in private repo only. **3-month review:** 2026-07-30 — migrate to GitHub App + Vault if AIER Public ready.

---

## §1 NTS PROFILE — NO-CODE, NO-TECH

NTS verbatim 2026-04-30:

> "Một ngày tôi phải làm một việc stress nhất biết bao nhiêu lần tạo tạo... TOKEN của các dự án đưa vào env.local... đăng ký... CLA, tôi là no-code, no-tech."

### Hard rules for Lanes

1. **Lanes NEVER ask NTS for tokens.** This registry is the single paste point.
2. **NTS pastes a new credential ONCE per service per quarter** (max).
3. **From that paste forward, Lane auto-syncs across all `.env.local` files** via `scripts/governance/sync_env_local.ps1`.
4. **When Lane discovers a NEW service is needed:** Lane writes a status with link to signup page (clickable). NTS signs up, pastes ONE token. Lane handles everything else.
5. **Goal: NTS clicks ≤ 1 per new service per quarter. Zero repeated token paste.**

---

## §2 LANE-TO-SERVICE MAPPING

Which Lane uses which services. Source of truth for cross-Lane visibility.

| Lane | Strategist | Executor(s) | Workspace | Active services | Status |
|---|---|---|---|---|---|
| **Lane_01** | CLA Lane_01 (Claude Opus 4.7 web) | CLAC-1 (Claude Code Desktop on Vultr) + Cursor (Cursor IDE on Vultr) | `C:\workspace\Uniton_Shared\` (governance) + `C:\workspace\UZGPLUS\` (V3 frontend) | GitHub, Supabase (read), Anthropic, OpenAI, Google AI, xAI, DeepSeek, Cloudflare (deploy) | ACTIVE |
| **Lane_02** | CLA Lane_02 (Claude AI separate project) | CLAC-2 (Claude Code Desktop) | `D:\UZG\Projects-v2\uzgplus\` (Local Desktop) | TBD on activation — likely GitHub, Supabase, Anthropic, Google AI | PENDING |
| **Lane_03** | AITAO (ChatGPT separate instance) | Codex (`gpt-5-codex`) via Cursor | `D:\UZG\Projects\uzgplus-app\` (Local Desktop) | GitHub, Supabase (write), Cloudflare (workflow), OpenAI (Codex), Anthropic (review), Render (planned), Resend (planned) | LAW LIVE, awaiting first dispatch |
| **Lane_04** | Gemini + Copilot (Dual-LLM) | Gemini CLI / Copilot CLI | TBD | TBD on activation 2026-04-30 — likely GitHub, Anthropic, social-platform APIs | LAW LIVE, activates 2026-04-30 |
| **AIER Ops (cross-cutting)** | NTS direct | CLAC-1 + ops scripts | `C:\workspace\Uniton_OS\` | GitHub, Supabase (full), all AI providers, **LANE_BROKER tokens (BLOCH publisher + consumer)** | ACTIVE |

---

## §3 SERVICE REGISTRY (per service, full block)

Each service block follows the same template:
- **Purpose** — what UZG+ uses it for
- **Used by Lanes** — which Lanes need this
- **Active in workspaces** — which `.env.local` files have credentials
- **Account info** — free tier / paid; NTS personal vs org
- **Dashboard URL** — where NTS manages account
- **Required env vars** — list with presence per workspace
- **Auto-rotation policy** — when rotation triggers
- **NTS action triggers** — when NTS must act
- **Lane autonomy** — what Lane handles without NTS

---

### §3.1 GitHub

- **Purpose:** Source-of-truth git host for all 5 ecosystem repos (`Uniton_Shared`, `Uniton_Shared_Live`, `uzgplus-app`, `Uniton_OS`, `aier-life-super`). PR creation + workflow runs + admin merges. PAT-bypass for branch protection.
- **Used by Lanes:** ALL (Lane_01, Lane_02, Lane_03, Lane_04, AIER Ops)
- **Active in workspaces:** Uniton_Shared ✅ · UZGPLUS ✅ · Uniton_OS ✅
- **Account info:** Org `unitonzengarden` (NTS personal-tied); free tier; admin PAT (Classic) per AMD §3.1
- **Dashboard URL:** https://github.com/unitonzengarden + https://github.com/settings/personal-access-tokens
- **Required env vars:**
  - `GH_TOKEN` (Classic PAT, full repo + admin scope) — PRESENT in Uniton_Shared, UZGPLUS, Uniton_OS
  - `GH_TOKEN_AUTO_COMMIT` (repo secret, NOT in `.env.local`; configured at https://github.com/unitonzengarden/Uniton_Shared/settings/secrets) — used by workflow auto-commit fallback per `aier_code_heartbeat.yml`
- **Auto-rotation policy:** ON LEAK only (post INC-01 protocol). Otherwise indefinite per AMD.
- **NTS action triggers:** GitHub Push Protection blocks a commit → secret leaked → NTS rotate via dashboard + paste new value into `.env.local` (1 paste, all 3 workspaces auto-synced via `sync_env_local.ps1`).
- **Lane autonomy:** Self-merge `--admin`, branch creation, PR open/close, workflow trigger, gh CLI ops. Never asks NTS for token.

---

### §3.2 Supabase

- **Purpose:** Primary database for all UZG+ V2 features (96 migrations, ~90 tables, ≥290 RLS policies, ≥250 RPCs/Edge Functions). RBAC + auth + reward stack + wallet + ENTA.
- **Used by Lanes:** Lane_01 (read for governance), Lane_02 (TAO/Bazi/Language data), Lane_03 (full write — backend territory), AIER Ops (full).
- **Active in workspaces:** Uniton_Shared ✅ (read keys) · UZGPLUS ⚠️ (only NEXT_PUBLIC_SUPABASE_URL — sync gap) · Uniton_OS ✅ (full write keys)
- **Account info:** Project `kkhhpecofolmrodyeslp` (NTS personal-tied); paid tier (likely Pro); CLI managed
- **Dashboard URL:** https://supabase.com/dashboard/project/kkhhpecofolmrodyeslp
- **Required env vars:**
  - `SUPABASE_URL` — PRESENT in Uniton_Shared, Uniton_OS · ABSENT UZGPLUS
  - `SUPABASE_ANON_KEY` (public, safe to commit but kept private) — PRESENT in Uniton_Shared, Uniton_OS · ABSENT UZGPLUS
  - `SUPABASE_SERVICE_ROLE_KEY` (admin, MUST never leak) — PRESENT in Uniton_Shared, Uniton_OS · ABSENT UZGPLUS
  - `SUPABASE_DB_PASSWORD` (direct DB access) — PRESENT in Uniton_OS only
  - `SUPABASE_ACCESS_TOKEN` (CLI auth) — PRESENT in Uniton_Shared, Uniton_OS · ABSENT UZGPLUS
  - `SUPABASE_PROJECT_REF` (`kkhhpecofolmrodyeslp`) — PRESENT in Uniton_Shared, Uniton_OS · ABSENT UZGPLUS
  - `NEXT_PUBLIC_SUPABASE_URL` (public, frontend-exposed) — PRESENT in UZGPLUS, Uniton_OS · ABSENT Uniton_Shared
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public, frontend-exposed) — PRESENT in Uniton_OS only
- **Auto-rotation policy:** ON LEAK only. SERVICE_ROLE_KEY rotation = full migration + redeploy.
- **NTS action triggers:** Project quota / billing alert from dashboard. Otherwise none.
- **Lane autonomy:** Migrations apply, RLS audit, function deploy, RPC creation. Cross-publish via API.

---

### §3.3 Anthropic (Claude API)

- **Purpose:** Claude Code (CLAC-1, CLAC-2) execution + future Lane_03 review tasks + ad-hoc API calls.
- **Used by Lanes:** Lane_01 (CLAC-1 execution), Lane_02 (CLAC-2 execution), Lane_03 (review + dual-track), Lane_04 (Dual-LLM with Gemini), AIER Ops.
- **Active in workspaces:** Uniton_Shared ✅ · UZGPLUS ❌ · Uniton_OS ✅
- **Account info:** Console account (NTS personal email); paid tier (usage-based)
- **Dashboard URL:** https://console.anthropic.com/settings/keys
- **Required env vars:**
  - `ANTHROPIC_API_KEY` (`sk-ant-*`) — PRESENT in Uniton_Shared, Uniton_OS · ABSENT UZGPLUS
- **Auto-rotation policy:** ON LEAK only.
- **NTS action triggers:** Usage limit alert; billing card update.
- **Lane autonomy:** All API calls, model selection, prompt caching. Never asks NTS for key.

---

### §3.4 OpenAI

- **Purpose:** Lane_03 Codex execution (`gpt-5-codex`) + ad-hoc GPT API calls.
- **Used by Lanes:** Lane_03 (primary — Codex), Lane_01 (occasional), AIER Ops.
- **Active in workspaces:** Uniton_Shared ✅ · UZGPLUS ❌ · Uniton_OS ✅
- **Account info:** Platform account (NTS personal email); paid tier
- **Dashboard URL:** https://platform.openai.com/api-keys
- **Required env vars:**
  - `OPENAI_API_KEY` (`sk-*`) — PRESENT in Uniton_Shared, Uniton_OS · ABSENT UZGPLUS
- **Auto-rotation policy:** ON LEAK only.
- **NTS action triggers:** Billing / usage alert.
- **Lane autonomy:** Codex execution, model selection, completion API calls.

---

### §3.5 Google AI (Gemini)

- **Purpose:** Lane_04 Gemini execution (Dual-LLM with Copilot) + Wisdom AI integration + Language OS translator.
- **Used by Lanes:** Lane_04 (primary), Lane_02 (Language OS translator), AIER Ops.
- **Active in workspaces:** Uniton_Shared ✅ · UZGPLUS ❌ · Uniton_OS ✅
- **Account info:** Google AI Studio account (NTS personal Google account)
- **Dashboard URL:** https://aistudio.google.com/apikey
- **Required env vars:**
  - `GOOGLE_AI_API_KEY` (`AI*`) — PRESENT in Uniton_Shared, Uniton_OS · ABSENT UZGPLUS
- **Auto-rotation policy:** ON LEAK only.
- **NTS action triggers:** Quota exceeded alert.
- **Lane autonomy:** Gemini API calls, model selection.

---

### §3.6 xAI (Grok)

- **Purpose:** Backup AI provider; Lane_04 alternative model; ad-hoc Grok API.
- **Used by Lanes:** AIER Ops (primary), Lane_04 (alt model option).
- **Active in workspaces:** Uniton_Shared ✅ · UZGPLUS ❌ · Uniton_OS ✅
- **Account info:** xAI Console (NTS personal email)
- **Dashboard URL:** https://console.x.ai/
- **Required env vars:**
  - `XAI_API_KEY` (`xai-*`) — PRESENT in Uniton_Shared, Uniton_OS · ABSENT UZGPLUS
- **Auto-rotation policy:** ON LEAK only.
- **NTS action triggers:** Billing alert.
- **Lane autonomy:** All API calls.

---

### §3.7 DeepSeek

- **Purpose:** Backup AI provider for cost-optimized batch tasks; Lane_04 alt model.
- **Used by Lanes:** AIER Ops (primary), Lane_04 (alt model option).
- **Active in workspaces:** Uniton_Shared ✅ · UZGPLUS ❌ · Uniton_OS ✅
- **Account info:** DeepSeek platform (NTS personal email)
- **Dashboard URL:** https://platform.deepseek.com/api_keys
- **Required env vars:**
  - `DEEPSEEK_API_KEY` (`sk-*`) — PRESENT in Uniton_Shared, Uniton_OS · ABSENT UZGPLUS
- **Auto-rotation policy:** ON LEAK only.
- **NTS action triggers:** Billing alert.
- **Lane autonomy:** All API calls.

---

### §3.8 Cloudflare (Pages + Workers)

- **Purpose:** Production hosting for `https://uzg.plus` (Cloudflare Pages dual runtime: `product-v2-pages-shell` + `product-v2-pages-worker`); separate `udna-public-pages-shell` worker for `/aier/mint`, `/aier/marketplace` public routes.
- **Used by Lanes:** Lane_03 (deploy chain owner), Lane_01 (V3 frontend deploys via same chain).
- **Active in workspaces:** ❌ in all 3 workspaces (CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID, CLOUDFLARE_ACCOUNT_ID all ABSENT)
- **Account info:** Cloudflare account (NTS personal email); free tier (Pages + Workers free tier)
- **Dashboard URL:** https://dash.cloudflare.com/
- **Required env vars (PLANNED):**
  - `CLOUDFLARE_API_TOKEN` — ABSENT (currently deploys via GitHub Action `deploy.yml` with workflow secret, not local env)
  - `CLOUDFLARE_ZONE_ID` — ABSENT
  - `CLOUDFLARE_ACCOUNT_ID` — ABSENT
- **Auto-rotation policy:** ON LEAK only.
- **NTS action triggers:** Domain renewal (annual); SSL cert review (auto-managed); billing if upgrading from free tier.
- **Lane autonomy:** Deploy via GitHub Action; Worker config via wrangler CLI (when keys added).
- **Status:** **GAP — needed for Lane_03 deploy automation tasks (Q3 2026 priority).**

---

### §3.9 Vercel

- **Purpose:** Currently DEAD per Master Audit (404 from `vercel.json` removed by Quick Win #5). Listed for historical completeness.
- **Used by Lanes:** None active (deprecated).
- **Active in workspaces:** ❌ all 3 (VERCEL_TOKEN ABSENT)
- **Account info:** N/A (deprecated)
- **Dashboard URL:** https://vercel.com/dashboard
- **Status:** **DEPRECATED — do not re-introduce without canon decision.** Cloudflare Pages is the current deploy target.

---

### §3.10 LANE_BROKER (BLOCH inter-AIER bridge)

- **Purpose:** Internal token-broker pattern for AIER Code ↔ AIER Ops bridge per LAW_N14_INTER_AIER_BRIDGE_STANDARD_v1_1. Publisher token publishes events; consumer token reads.
- **Used by Lanes:** AIER Ops (publisher + consumer); future cross-AIER nodes.
- **Active in workspaces:** ❌ Uniton_Shared · ❌ UZGPLUS · ✅ Uniton_OS (BOTH publisher + consumer present)
- **Account info:** Internal — not external service. Tokens generated by AIER Code script.
- **Dashboard URL:** N/A (internal token registry)
- **Required env vars:**
  - `LANE_BROKER_BLOCH_PUBLISHER_TOKEN` — PRESENT in Uniton_OS only
  - `LANE_BROKER_BLOCH_CONSUMER_TOKEN` — PRESENT in Uniton_OS only
- **Auto-rotation policy:** Per LAW_N14 §6 (rotation procedure documented separately).
- **NTS action triggers:** Bridge protocol upgrade requiring re-issue.
- **Lane autonomy:** AIER Ops handles fully. Other Lanes do NOT need these tokens.
- **Sync gap rationale:** Correctly scoped — only Uniton_OS workspace runs AIER Ops. Other workspaces don't need.

---

### §3.11 Audit / Test Account (Mailinator pattern)

- **Purpose:** Cursor-driven Playwright authenticated screenshots task — needs a real test account with email-OTP login flow. Mailinator-style throwaway inbox + audit-only credentials.
- **Used by Lanes:** Lane_01 Cursor (primary — V2 audit screenshots task); future Lane_04 user-flow testing.
- **Active in workspaces:** Uniton_Shared ✅ (`AUDIT_LOGIN_EMAIL` PRESENT) · UZGPLUS ❌ · Uniton_OS ❌
- **Account info:** Mailinator-style throwaway email (NTS-managed; rotated quarterly)
- **Dashboard URL:** Mailinator inbox URL (NTS-only)
- **Required env vars:**
  - `AUDIT_LOGIN_EMAIL` — PRESENT in Uniton_Shared (recently added; SYNC GAP to UZGPLUS + Uniton_OS)
  - `AUDIT_LOGIN_OTP_BYPASS` — ABSENT in all 3 workspaces (if Mailinator inbox-poll workflow chosen, key not needed; if direct OTP-bypass token issued by app, key needed)
- **Auto-rotation policy:** Quarterly (low-impact; throwaway account).
- **NTS action triggers:** Initial signup (one-time); quarterly rotation.
- **Lane autonomy:** Cursor reads `AUDIT_LOGIN_EMAIL` from `.env.local`; runs Playwright + Mailinator-poll; no NTS interaction needed during runs.
- **Status:** **PARTIAL — Cursor V2 screenshots task halted on credentials; resolved when AUDIT_LOGIN_EMAIL added to Uniton_Shared. Pending: sync to UZGPLUS + Uniton_OS for Cursor-on-other-workspace scenarios.**

---

## §4 SERVICES CURRENTLY ACTIVE — Audit Matrix

Cross-reference: which env vars are PRESENT (P) / ABSENT (A) per workspace. Generated 2026-04-30 via `grep -q` key-existence check (no values touched).

| Service / Key | Uniton_Shared | UZGPLUS | Uniton_OS |
|---|---|---|---|
| **GitHub** |  |  |  |
| `GH_TOKEN` | ✅ P | ✅ P | ✅ P |
| **Supabase (UZG+ project)** |  |  |  |
| `SUPABASE_URL` | ✅ P | ❌ A | ✅ P |
| `SUPABASE_ANON_KEY` | ✅ P | ❌ A | ✅ P |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ P | ❌ A | ✅ P |
| `SUPABASE_DB_PASSWORD` | ❌ A | ❌ A | ✅ P |
| `SUPABASE_ACCESS_TOKEN` | ✅ P | ❌ A | ✅ P |
| `SUPABASE_PROJECT_REF` | ✅ P | ❌ A | ✅ P |
| `NEXT_PUBLIC_SUPABASE_URL` | ❌ A | ✅ P | ✅ P |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ❌ A | ❌ A | ✅ P |
| **AI providers** |  |  |  |
| `ANTHROPIC_API_KEY` | ✅ P | ❌ A | ✅ P |
| `OPENAI_API_KEY` | ✅ P | ❌ A | ✅ P |
| `GOOGLE_AI_API_KEY` | ✅ P | ❌ A | ✅ P |
| `XAI_API_KEY` | ✅ P | ❌ A | ✅ P |
| `DEEPSEEK_API_KEY` | ✅ P | ❌ A | ✅ P |
| **Cloudflare (PLANNED)** |  |  |  |
| `CLOUDFLARE_API_TOKEN` | ❌ A | ❌ A | ❌ A |
| `CLOUDFLARE_ZONE_ID` | ❌ A | ❌ A | ❌ A |
| `CLOUDFLARE_ACCOUNT_ID` | ❌ A | ❌ A | ❌ A |
| **Vercel (DEPRECATED)** |  |  |  |
| `VERCEL_TOKEN` | ❌ A | ❌ A | ❌ A |
| **LANE_BROKER (AIER Ops only)** |  |  |  |
| `LANE_BROKER_BLOCH_PUBLISHER_TOKEN` | ❌ A | ❌ A | ✅ P |
| `LANE_BROKER_BLOCH_CONSUMER_TOKEN` | ❌ A | ❌ A | ✅ P |
| **Audit / Test** |  |  |  |
| `AUDIT_LOGIN_EMAIL` | ✅ P | ❌ A | ❌ A |
| `AUDIT_LOGIN_OTP_BYPASS` | ❌ A | ❌ A | ❌ A |

**Sync gap summary (action items for `sync_env_local.ps1`):**
1. `AUDIT_LOGIN_EMAIL` → sync to UZGPLUS + Uniton_OS (low priority — Lane_01 Cursor will use it from Uniton_Shared)
2. Supabase keys → consider sync to UZGPLUS if Lane_01 V3 frontend needs DB access (currently has only `NEXT_PUBLIC_SUPABASE_URL`)
3. AI provider keys → consider sync to UZGPLUS if V3 frontend embeds AI chat directly (currently uses backend proxy)

---

## §5 SERVICES PLANNED (Q2-Q4 2026)

Future services Lanes will need but credentials not yet present. Each entry includes: when needed, which Lane, NTS action complexity.

### §5.1 Mailinator-style email service (Q2 2026 — IMMEDIATE)

- **When needed:** Cursor authenticated screenshots task (already halted once on `AUDIT_LOGIN_EMAIL`)
- **Which Lane:** Lane_01 Cursor + future Lane_04 social testing
- **Auto-signup possible?** YES — Cursor can self-signup via Mailinator inbox-poll without NTS interaction
- **NTS action needed?** Initial Mailinator domain choice (1 paste); quarterly rotation
- **Estimated NTS time:** <2 min one-time

### §5.2 Render (Q3 2026)

- **When needed:** Lane_03 backend workers when Express monolith refactor begins (`server/aier_server.js` 21k lines → Render-hosted Workers)
- **Which Lane:** Lane_03 (primary)
- **Auto-signup possible?** YES — Lane_03 can self-create account; NTS sets up payment once
- **NTS action needed?** Initial signup + payment card paste (one-time); afterwards Lane_03 manages
- **Estimated NTS time:** ~5 min one-time

### §5.3 Resend (Q3 2026)

- **When needed:** Email notifications (membership tier expiry, governance proposal alerts, retreat booking confirmations)
- **Which Lane:** Lane_03 (backend) + Lane_02 (Language OS for VN/EN templates)
- **Auto-signup possible?** YES — free tier covers up to 3,000 emails/month
- **NTS action needed?** Initial signup + verify domain DNS (DNS handled by Cloudflare; NTS just clicks "verify")
- **Estimated NTS time:** ~5 min one-time

### §5.4 Sentry (Q3 2026)

- **When needed:** Production error monitoring for V3 PWA
- **Which Lane:** Lane_03 (backend) + Lane_01 (V3 frontend)
- **Auto-signup possible?** YES — free tier
- **NTS action needed?** Initial signup
- **Estimated NTS time:** ~3 min one-time

### §5.5 PostHog (Q4 2026)

- **When needed:** User analytics + feature flag rollout for V3 progressive disclosure
- **Which Lane:** Lane_01 (V3 frontend)
- **Auto-signup possible?** YES — generous free tier
- **NTS action needed?** Initial signup
- **Estimated NTS time:** ~3 min one-time

### §5.6 Stripe / payment processor (TBD 2026)

- **When needed:** Membership tier upgrades (DEC-04: Seeker $9 / Builder $39 / Sovereign $69)
- **Which Lane:** Lane_03 (backend payment integration)
- **Auto-signup possible?** PARTIAL — account requires NTS identity verification (passport / business docs)
- **NTS action needed?** Identity verification (legal); business docs upload; bank account linking
- **Estimated NTS time:** ~30-60 min one-time (legal/identity verification cannot be automated)
- **Note:** This is the ONE service where NTS time investment is unavoidable due to regulatory KYC requirements.

---

## §6 NTS WORKFLOW — When a New Key Is Needed

7-step process; max 1 paste from NTS.

```
STEP 1 — Lane discovers new service needed
  Example: Cursor task fails because Mailinator credentials missing.

STEP 2 — Lane writes status with structured prompt
  Status format:
    "NEW SERVICE NEEDED: <name>
     Reason: <brief why>
     Signup URL: <clickable>
     Time estimate: <X min>"

STEP 3 — NTS receives 1 prompt with link
  NTS clicks signup URL. Signs up. Copies the resulting token/key.

STEP 4 — NTS pastes the token ONCE in chat
  Format: "Token cho <service>: <value>"
  CLA web sees this paste.

STEP 5 — CLA writes task for CLAC1
  Task: "Add token to TECH_STACK_REGISTRY §3.X SERVICE_NAME +
         sync to Uniton_Shared/.env.local +
         run sync_env_local.ps1 to propagate to UZGPLUS + Uniton_OS as appropriate"

STEP 6 — CLAC1 does the work
  - Update §3 service block with PRESENT flags per workspace
  - Append §4 audit table row
  - Update §12 changelog
  - NEVER echo the value in commits/audit
  - Add value to .env.local (one workspace, then sync_env_local.ps1)

STEP 7 — From this point: Lane auto-uses, NTS never touches again
  Future runs: Lane reads from .env.local autonomously.
```

**Time investment per new service:** NTS clicks 1-2 (signup + paste). Total NTS time per service: ≤5 min (excluding Stripe-class regulatory exceptions).

### §6.1 Visual flow

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   Lane discovers new service needed                      │
│                       │                                  │
│                       ▼                                  │
│   Lane writes structured status:                         │
│     "NEW SERVICE NEEDED: <name>                          │
│      Reason: <1 line>                                    │
│      Signup URL: <clickable>                             │
│      Time estimate: <X min>"                             │
│                       │                                  │
│                       ▼                                  │
│   NTS receives prompt with link                          │
│   ─ NTS clicks signup URL                                │
│   ─ NTS signs up, copies token (≤ 5 min)                 │
│   ─ NTS pastes token in chat (1 paste)                   │
│                       │                                  │
│                       ▼                                  │
│   CLA writes follow-up task for CLAC-1                   │
│   ─ Add to Uniton_Shared/.env.local                      │
│   ─ Run sync_env_local.ps1 to propagate                  │
│   ─ Update registry §3 + §4                              │
│                       │                                  │
│                       ▼                                  │
│   CLAC-1 executes (≤ 5 min)                              │
│   ─ Idempotent sync                                      │
│   ─ Masked logging (no value leak)                       │
│   ─ Governance PR + self-merge --admin                   │
│                       │                                  │
│                       ▼                                  │
│   Lane re-runs original task                             │
│   ─ Reads from .env.local                                │
│   ─ NTS no longer involved                               │
│                                                          │
└──────────────────────────────────────────────────────────┘

Total NTS time: ≤ 5 min per new service (excluding KYC).
Total Lane time: ≤ 5 min per new service.
NTS clicks: 1 (signup URL).
NTS pastes: 1 (token value).
```

### §6.2 What NTS sees vs what Lane handles

| Phase | NTS sees | NTS does | Lane does (silently) |
|---|---|---|---|
| Discovery | Status: "NEW SERVICE NEEDED: <name> ..." | Reads | Writes structured status |
| Signup | Clickable signup URL | Clicks → signs up → copies token | Waits |
| Paste | Single token paste | Pastes in chat | CLA captures from chat |
| Sync | Sync confirmation message | Reads | CLAC-1 runs `sync_env_local.ps1` |
| Resume | Status: "Task PASS — used <service>" | Reads | Original task re-dispatched + completes |

NTS interaction surface: 2 messages (signup link in, token paste out). Total NTS attention: <5 min per service.

---

## §7 ENV.LOCAL AUTO-SYNC POLICY

### Rules

1. **Each workspace has `.env.local`** (gitignored — never committed to repo)
2. **When a new credential is added** to one workspace: CLAC1 (or Cursor) syncs to other workspaces automatically via `scripts/governance/sync_env_local.ps1`
3. **Master copy:** This registry (`governance/TECH_STACK_REGISTRY_v1.md`) — with VALUES MASKED (only key names + presence flags)
4. **Actual values stored:** `.env.local` files only (never committed, never echoed, never logged)
5. **Sync script:** `scripts/governance/sync_env_local.ps1`
6. **Trigger:** Manual via Lane request OR automated on registry update PR merge (future hook)

### Sync script usage

```powershell
# Default: sync from Uniton_Shared (canonical source) to UZGPLUS + Uniton_OS
pwsh scripts/governance/sync_env_local.ps1

# Specify source workspace
pwsh scripts/governance/sync_env_local.ps1 -SourceWorkspace Uniton_Shared

# Dry-run (report changes, don't write)
pwsh scripts/governance/sync_env_local.ps1 -DryRun

# Specific keys only (won't sync everything — safer for narrow updates)
pwsh scripts/governance/sync_env_local.ps1 -Keys @("AUDIT_LOGIN_EMAIL", "GH_TOKEN")
```

The script:
- Reads source `.env.local` (key=value lines)
- For each key: writes to target workspaces if absent OR overwrites if `-Overwrite` flag set
- Masks all values in any console output (e.g. `AUDIT_LOGIN_EMAIL=*****@*****.com`)
- Idempotent — safe to run multiple times
- Confirms success: count of keys synced + workspaces updated

### Exclusions (per Lane scoping)

- `LANE_BROKER_BLOCH_*` keys → ONLY in Uniton_OS (don't sync to Uniton_Shared/UZGPLUS even if requested)
- `SUPABASE_DB_PASSWORD` → high-sensitivity; only sync if explicitly requested with `-IncludeSensitive`
- Workspace-specific overrides (e.g. `WORKSPACE_LABEL=Uniton_OS`) — never sync; per-workspace identity

---

## §8 SECURITY POLICY

### Per NTS verbatim 2026-04-30

> "có lộ CLA tôi ko lo" — internal trust accepted for 3 months.

### Concrete rules

1. **This registry stored in private repo `Uniton_Shared` only** — NOT mirrored to public `Uniton_Shared_Live` (this file is excluded from sync workflow paths if it lands under `governance/`; verify by checking `.github/workflows/sync_runtime_to_public.yml` does NOT include this specific filename or governance whitelist filters it).
   - **CORRECTION:** As of v2 (LANE01-CLA-PERSISTENT-REMINDERS-UPDATE-V2), `governance/**` IS in the sync whitelist. The Persistent Reminders v1.1 file IS publicly mirrored. **This registry should NOT be public** — see §8.7 below for filename-level exclusion option.
2. **Values masked in commits:** `ghp_***<last 5>` pattern (post INC-01 protocol).
3. **Token rotation:** Triggered ONLY on leak (per INC-01 protocol). Otherwise indefinite.
4. **3-month review:** **2026-07-30** — at this date:
   - Audit whether AIER Public ready to migrate to GitHub App + Vault (more secure than PAT in `.env.local`)
   - Re-evaluate "có lộ CLA tôi ko lo" in light of any incidents
   - Decide whether to maintain current pattern or rotate to org-level secret manager
5. **Pre-commit lint:** Husky hook detects `ghp_*`, `github_pat_*`, `sk-*`, `eyJ*` patterns and blocks. (Lane_03 own + maintain.)
6. **NEVER echo raw values:** in audit logs, commit messages, PR bodies, snapshots, reports, or any artifact that gets committed to git.

### §8.7 Public mirror exclusion option (RECOMMENDED for this registry)

To prevent this registry from being mirrored publicly via `governance/**` whitelist:

**Option A:** Add explicit exclusion to `.github/workflows/sync_runtime_to_public.yml`:
```yaml
- '!governance/TECH_STACK_REGISTRY_*.md'
```

**Option B:** Move registry to a path NOT covered by sync whitelist:
- `private/TECH_STACK_REGISTRY_v1.md` (with `private/` NOT in whitelist)
- `internal/TECH_STACK_REGISTRY_v1.md`

**Option C:** Keep masked-only registry public (no sensitive info — only key NAMES + presence flags); accept that the *structure* of secrets is visible.

**Decision deferred:** This registry as authored contains only key names + presence flags + dashboard URLs (no secrets). Public mirror is technically safe but exposes service inventory. Recommend Option A (explicit exclusion) — applied in follow-up commit if NTS approves.

---

## §9 MISSING SERVICES — NTS Action Required

Currently identified but credentials not yet in any `.env.local`:

### §9.1 AUDIT_LOGIN_OTP_BYPASS (Cursor authenticated screenshots V2)

- **Service URL:** Internal — depends on uzgplus-app email-OTP flow. If app supports OTP-bypass tokens for test accounts, NTS request from Lane_03; otherwise Mailinator inbox-poll workflow used and this var not needed.
- **Specific env var:** `AUDIT_LOGIN_OTP_BYPASS`
- **Where to paste:** `C:\workspace\Uniton_Shared\.env.local` (then `sync_env_local.ps1` propagates if needed)
- **NTS time estimate:** <2 min if Lane_03 issues bypass token; 0 min if Mailinator-poll approach (Cursor handles fully)

### §9.2 CLOUDFLARE_API_TOKEN (Lane_03 deploy automation)

- **Service URL:** https://dash.cloudflare.com/profile/api-tokens → Create Token → "Edit zone DNS" + "Edit Cloudflare Workers" template
- **Specific env vars:** `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ZONE_ID`, `CLOUDFLARE_ACCOUNT_ID`
- **Where to paste:** `C:\workspace\Uniton_OS\.env.local` (Lane_03 territory primarily) + sync to others if multi-workspace deploy
- **NTS time estimate:** ~5 min (find Zone ID + Account ID in dashboard; create scoped token)

### §9.3 RESEND_API_KEY (when email notifications go live)

- **Service URL:** https://resend.com/api-keys
- **Specific env var:** `RESEND_API_KEY`
- **Where to paste:** `C:\workspace\Uniton_OS\.env.local` (Lane_03 backend)
- **NTS time estimate:** ~3 min (signup + DNS verify if not done)

### §9.4 RENDER_API_KEY (when Lane_03 backend workers ship)

- **Service URL:** https://dashboard.render.com/u/settings#api-keys
- **Specific env var:** `RENDER_API_KEY`
- **Where to paste:** `C:\workspace\Uniton_OS\.env.local`
- **NTS time estimate:** ~5 min (signup + payment card)

### §9.5 STRIPE keys (when membership monetization activates)

- **Service URL:** https://dashboard.stripe.com/test/apikeys
- **Specific env vars:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PUBLISHABLE_KEY`
- **Where to paste:** `C:\workspace\Uniton_OS\.env.local` (Lane_03 backend payment integration)
- **NTS time estimate:** **~30-60 min one-time** (legal/identity verification + business docs + bank linking — unavoidable per Stripe KYC)

---

## §10 LANE AUTONOMY POLICY (CRITICAL)

### Lanes MUST

1. **Read this registry FIRST** before asking NTS anything tech-related
2. **Auto-handle all signup/token/account tasks** within their authority (free-tier signups, OAuth flows that don't require NTS identity)
3. **Only escalate to NTS** when literally impossible:
   - Payment-tied to NTS personal card (e.g. Stripe activation)
   - Identity verification (KYC, business documents)
   - Domain DNS changes that require NTS-only login
4. **When escalating:** provide ONE clear question + ONE click action max. Format:
   ```
   NEW SERVICE NEEDED: <name>
   Reason: <1 line>
   Signup URL: <clickable>
   Time estimate: <X min>
   ```

### Lanes MUST NOT

1. ❌ Ask NTS to "create a new token" without first attempting auto-signup
2. ❌ Ask NTS to "paste credentials" if registry shows credential PRESENT in another workspace
3. ❌ Ask NTS to "sign up for service X" without providing the URL + reason + time estimate
4. ❌ Echo raw credential values in chat, commits, audit logs, or any artifact
5. ❌ Block on credentials when an alternative service in the registry could substitute (e.g. AI provider failover)

### When stuck

Lane writes blocker handoff → CLA orchestrator handles user-facing prompt to NTS. NTS sees only the structured prompt format above, never raw technical jargon.

---

## §11 LANE EXTENSION PROTOCOL (FOR FUTURE LANES)

When Lane_02 / Lane_03 / Lane_04 activate (or new Lane_05+ added), follow this protocol:

1. **Read this registry** to understand existing service inventory
2. **Identify services your Lane needs** that aren't in §3 yet
3. **Update §2 Lane-to-Service mapping** — add your Lane's row OR update existing row with new services
4. **Update §3 Service Registry** if new service:
   - Add full `§3.X SERVICE_NAME` block per template
   - Document presence per workspace
5. **Update §4 audit matrix** with current state
6. **Update §12 changelog** with version bump
7. **Submit governance PR** via standard `LANE0X-TECH-STACK-REGISTRY-UPDATE-V<N>` task naming
8. **NTS verbatim approve** OR auto-approve per AMD §3.1 (if no new credentials required)
9. **Post-merge:** Other Lanes pick up the registry update on next read

### Adding a new SERVICE that requires NTS credential paste

If your Lane needs a service not in §5 Planned list:

1. Lane writes status: "NEW SERVICE NEEDED: <name> ..."
2. CLA orchestrator confirms with NTS
3. NTS provides credential per §6 workflow
4. CLAC1 / your Lane updates registry per §11 steps 3-7
5. `sync_env_local.ps1` propagates value to relevant workspaces
6. Service goes live in registry §3 + §4

---

## §12 WORKED EXAMPLES — common scenarios

### §12.1 Example: Cursor screenshots task halts on `AUDIT_LOGIN_EMAIL` (actual incident 2026-04-30)

**Sequence:**

1. Cursor V2 task `LANE01-UZG-PLUS-V2-AUTHENTICATED-SCREENSHOTS-V1` halted at §4 Step A pre-flight: `AUDIT_LOGIN_EMAIL` absent in all `.env.local`
2. CLAC-1 verify task confirmed halt cause + reported back to NTS
3. NTS pasted `AUDIT_LOGIN_EMAIL=<value>` into chat (1 paste)
4. CLA orchestrator wrote a brief follow-up task: "CLAC-1 add `AUDIT_LOGIN_EMAIL` to `Uniton_Shared/.env.local` + run `sync_env_local.ps1` to propagate"
5. CLAC-1 executed in <2 min
6. Registry §3.11 updated to PRESENT in Uniton_Shared
7. Cursor re-dispatched V2 task; proceeded normally

**Lesson:** §6 NTS Workflow saved time. Without registry, NTS would have:
- Pasted into Uniton_Shared/.env.local manually (5 min)
- Pasted into UZGPLUS/.env.local manually (5 min — if Cursor on Lane_01 V3 needed)
- Pasted into Uniton_OS/.env.local manually (5 min — if Cursor on AIER Ops needed)
- Total: 15+ min instead of 2.

### §12.2 Example: Lane_03 needs Cloudflare for deploy automation (PLANNED Q3 2026)

**Sequence (projected):**

1. Lane_03 task discovers automated wrangler deploy needs `CLOUDFLARE_API_TOKEN`
2. Lane_03 status: "NEW SERVICE NEEDED: Cloudflare API token. Reason: wrangler CLI deploy automation. Signup: https://dash.cloudflare.com/profile/api-tokens. Time: ~5 min."
3. NTS clicks signup URL → creates token with "Edit Cloudflare Workers" template scope → copies token + Account ID + Zone ID
4. NTS pastes 3 values in chat (single message)
5. CLA writes follow-up: "CLAC-1 add 3 keys to Uniton_OS/.env.local + sync to UZGPLUS if Lane_01 deploy automation also needed"
6. CLAC-1 updates registry §3.8 + §4 audit table + runs sync script
7. Lane_03 picks up token from `.env.local` on next task

### §12.3 Example: Anti-pattern — Lane asks NTS for token without checking registry

**WRONG:**
```
Status: "Cần Anthropic API key để chạy task. Xin NTS provide."
```

This violates §10 Lane Autonomy Policy. Anthropic key is documented in registry §3.3 as PRESENT in Uniton_Shared + Uniton_OS.

**RIGHT:**
```
[Lane reads registry §3.3]
[Confirms ANTHROPIC_API_KEY PRESENT in source workspace]
[Reads from .env.local, executes task]
[Status: "Task PASS. Used Anthropic API key from .env.local per registry §3.3."]
```

If Lane is on UZGPLUS workspace (where ANTHROPIC_API_KEY is ABSENT per registry §4):

**RIGHT:**
```
[Lane reads registry §3.3 + §4]
[Sees ABSENT in UZGPLUS]
[Runs sync_env_local.ps1 -SourceWorkspace Uniton_Shared -Keys @('ANTHROPIC_API_KEY')]
[Now PRESENT in UZGPLUS, proceeds with task]
```

**Anti-pattern outcome:** NTS wastes 5 minutes pasting a value that already exists 2 workspaces over.
**Pattern outcome:** Lane self-resolves in 30 seconds.

---

## §13 OPERATIONAL CHECKLISTS (quick reference)

### §13.1 New service onboarding (Lane perspective)

```
☐ 1. Read registry §3 to verify service not already present
☐ 2. If absent → check §5 Planned services list (might already be on roadmap)
☐ 3. If new → write structured status: "NEW SERVICE NEEDED: <name> ..."
☐ 4. Wait for NTS paste
☐ 5. Update registry §3.X new service block per template
☐ 6. Update §2 Lane-to-Service mapping with new service
☐ 7. Update §4 audit matrix with PRESENT flag
☐ 8. Run sync_env_local.ps1 to propagate to other workspaces (if cross-Lane needed)
☐ 9. Update §12 changelog with version bump
☐ 10. Submit governance PR
☐ 11. Self-merge per AMD §3.1
```

### §13.2 Token rotation (post-leak per INC-01)

```
☐ 1. Detect leak (GitHub Push Protection block OR external alert)
☐ 2. STOP all work immediately
☐ 3. Notify CLA orchestrator + NTS via handoff JSON
☐ 4. NTS rotates via service dashboard
☐ 5. NTS pastes new value in chat (1 paste)
☐ 6. CLAC-1 updates Uniton_Shared/.env.local + runs sync_env_local.ps1
☐ 7. Update registry §4 audit matrix (rotation event timestamp)
☐ 8. Update §12 changelog with rotation note
☐ 9. Resume work
```

### §13.3 Pre-task credential check (Lane perspective, every task)

```
☐ 1. Open registry §3 + §4 — locate services this task needs
☐ 2. Verify each required env var is PRESENT in current workspace
☐ 3. If any ABSENT in current workspace but PRESENT elsewhere → run sync_env_local.ps1
☐ 4. If absent everywhere → check §5 Planned (might be expected gap)
☐ 5. If genuinely new service → §13.1 New service onboarding flow
☐ 6. Otherwise: proceed with task using credentials from .env.local
```

### §13.4 Quarterly review (NTS + CLA Lane_01)

```
☐ 1. Audit §4 matrix — any new sync gaps?
☐ 2. Review §5 Planned services — anything moved from Planned → Active this quarter?
☐ 3. Check §8 3-month review condition (next checkpoint: 2026-07-30)
☐ 4. Decide on §8.7 public mirror exclusion option (apply Option A/B/C)
☐ 5. Review token rotation history — any forced rotations from leaks?
☐ 6. Update §12 changelog with quarterly review entry
☐ 7. Bump version v1.X if material changes
```

---

## §14 GLOSSARY

- **`.env.local`** — Local environment file per workspace (gitignored). Stores actual secret values. NEVER committed to repo.
- **AMD** — Authority Memo Directive. NTS pre-authorisation packet (e.g. AMD_NTS_FULL_TECH_AUTONOMY) granting executor self-merge + autonomous decision-making.
- **DEC-XX** — Canonical decision (e.g. DEC-04 = 4 Membership tiers locked). Tracked in Master Audit + Reconciliation Proposal.
- **INC-01** — Incident #1 (2026-04-29 leaked classic GH PAT in audit log via Cursor commit). Established secret-rotation protocol.
- **Lane_NN** — Specific Lane only (Lane_01 strategic+CTO, Lane_02 TAO/Bazi/Language, Lane_03 Backend Engineering, Lane_04 Social/Real-User).
- **PRESENT / ABSENT** — Audit terminology for whether a key exists in a `.env.local` file (boolean only; value never read).
- **R-AUTH-01** — Redline: NTS sole canon approver. Canon edits require verbatim NTS approval.
- **R-NTS-LLM-01..02** — Redlines protecting NTS from being pushed into tech work.
- **R-WS-01..04** — Workspace redlines (sync cadence, no-clone rules, etc.).
- **Sync workflow** — `.github/workflows/sync_runtime_to_public.yml` mirroring Uniton_Shared private content to Uniton_Shared_Live public.

---

## §15 FAQ — anticipated questions

### Q1: What if a Lane needs a service that's not in §3 and not in §5 Planned?

**A:** Follow §13.1 New service onboarding flow. Lane writes structured status with signup URL + reason + time estimate. NTS clicks once. CLAC-1 updates registry. Done in ≤15 min total.

### Q2: What if NTS pastes a value into the wrong workspace's `.env.local`?

**A:** No problem. Lane runs `sync_env_local.ps1 -SourceWorkspace <where-NTS-pasted>` to propagate. The "canonical source" of `Uniton_Shared` is just the default — any workspace can be the source for a sync.

### Q3: What about services that are GitHub Secrets (not in `.env.local`)?

**A:** Documented separately. Currently only `GH_TOKEN_AUTO_COMMIT` is a GitHub Secret (per §3.1). It's set at https://github.com/unitonzengarden/Uniton_Shared/settings/secrets/actions and used by `.github/workflows/aier_code_heartbeat.yml` for auto-commit fallback. NTS rotates same as PAT; CLA Lane_01 updates the secret value via gh CLI.

### Q4: What if a Lane creates a free-tier account autonomously (no NTS interaction)?

**A:** Per §10 Lane Autonomy Policy, this IS allowed. After signup:
1. Lane stores token in workspace `.env.local`
2. Lane updates registry §3 (new service block) + §4 (audit matrix)
3. Lane runs sync script to propagate
4. Lane submits governance PR with the registry update
5. Self-merge per AMD §3.1
6. NTS sees the update via PR notification but doesn't need to take action

### Q5: How does this registry differ from `UNITON_FUTURE_MASTER_NOTE` in project knowledge?

**A:** Master Note (project knowledge — CLA web only) covers ecosystem-wide architecture: repos, projects, organizational decisions. **This registry** is the credentials + services subset, scoped to what `.env.local` files contain. Master Note is the *what we're building*; registry is the *what credentials we use to build it*. They cross-reference; registry §3.1-§3.11 service entries should be discoverable from Master Note's service list (when Master Note next updates).

### Q6: What if a credential in registry is rotated mid-task? Does the task fail?

**A:** Should not happen during a task because rotations are deliberate (post-leak only per §8). If it does happen:
1. Task fails with credential-rejected error
2. Lane writes halt-state per §13.2 Token rotation flow
3. NTS pastes new value
4. Lane re-dispatches task

Concurrent rotation during active task is rare; if observed, treat as an INC-01-class incident.

### Q7: What about temporary / scratch tokens (e.g. Anthropic API key for one-off testing)?

**A:** Same registry, marked as temporary in §3 service block. After test, rotate per §13.2 to invalidate the temporary key. Keep registry up to date.

### Q8: Why is `governance/TECH_STACK_REGISTRY_v1.md` mirrored to public Live by default?

**A:** Per `.github/workflows/sync_runtime_to_public.yml` whitelist `governance/**`, this file would mirror to public Live. Per §8.7, NTS should decide whether to:
- (A) explicitly exclude `governance/TECH_STACK_REGISTRY_*.md` from sync workflow (recommended — service inventory is sensitive even without values)
- (B) move file to non-mirrored path like `private/`
- (C) accept public visibility (registry has no secret values, only key NAMES + presence flags + dashboard URLs)

Pending NTS decision. Default behavior at v1.0 publish: mirrored publicly. Treat as PUBLIC and avoid adding sensitive metadata until decision made.

### Q9: Can a Lane modify another Lane's `.env.local`?

**A:** Per §7 sync policy: yes, via `sync_env_local.ps1` only. Direct manual `.env.local` edits in another Lane's workspace are forbidden by Lane boundary rules (per LAW Lane_03 §2 / LAW Lane_02 §2). Sync script is the sanctioned mechanism.

### Q10: What if Lane discovers a key in `.env.local` but no service block in §3?

**A:** This is a registry gap. Lane updates §3 with a new block + §4 audit matrix entry, even if Lane didn't introduce the service. Registry should be exhaustive per §11 Lane Extension Protocol.

---

## §16 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial publish — aggregate current service inventory across 3 workspaces (Uniton_Shared + UZGPLUS + Uniton_OS); document Lane-to-Service mapping; establish NTS workflow; planned services Q2-Q4 2026; sync script `sync_env_local.ps1` companion; added §12 worked examples + §13 operational checklists + §14 glossary + §15 FAQ |

---

🔒 UZG+ Tech Stack Registry v1.0 — single source of truth for ecosystem credentials.
End of file.
