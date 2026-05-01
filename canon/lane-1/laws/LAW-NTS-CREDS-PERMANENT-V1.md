# LAW-NTS-CREDS-PERMANENT-V1

**Effective:** 2026-05-01
**Authority:** NTS verbatim lock
**Status:** ACTIVE — permanent operational law
**Scope:** Lane 1 UZG+ ecosystem (CLA + all executors)

---

## §0 NTS LAW (VERBATIM)

> **"Tôi cung cấp cho CLA đây là lần cuối cùng, đừng để tôi phải cung cấp cho CLA hay hệ thống 1 lần nào nữa. Tôi đã nói thành LAW, làm một lần, chứ đừng ngày nào tôi cũng phải đi tạo key và cung cấp"**
>
> — NTS, 2026-05-01

---

## §1 LAW ARTICLES

### Article 1 — NEVER ask NTS for credentials

CLA + ALL executors (Dev1, Dev2, future executors) NEVER ask NTS for:
- GitHub PAT / tokens
- Supabase keys (URL, anon, service role, publishable)
- API keys (OpenAI, Anthropic, Google, Mapbox, etc.)
- Cloudflare tokens
- Any other credentials

### Article 2 — Read from `.env.local` ONLY

All credentials live in `.env.local` files within workspaces:

```
C:\workspace\Uniton_Shared\.env.local
C:\workspace\UZGPLUS\.env.local
C:\workspace\Uniton_OS\.env.local
```

Executors MUST:

1. Source `.env.local` at task start: `set -a && source .env.local && set +a`
2. OR rely on workspace boot script auto-load (`.workspace-boot.sh`)
3. NEVER hardcode secrets in code, scripts, audits, or commits.

### Article 3 — Auto-rotation discipline

When credentials expire/leak/rotate:

1. NTS rotates at provider (5–10 min once-off).
2. NTS provides ONCE in chat (rare, only on rotation event).
3. CLA dispatches a `secrets-deploy` task to CLAC1.
4. CLAC1 updates ALL 3 workspaces + GitHub Actions secrets.
5. Old credentials invalidated.
6. Future tasks read new credentials from `.env.local` automatically.

Frequency target: ≤ 1 rotation per 90 days (PAT default expiration).

### Article 4 — Auto-discovery before asking

Before any task that needs credentials, executor MUST:

1. Check `.env.local` for the needed var.
2. If missing → check other workspaces.
3. If still missing → check GitHub Actions secrets.
4. ONLY if ALL fail → escalate to CLA. CLA dispatches a `secrets-deploy` task; NTS is the last resort, only on rotation.

NEVER skip directly to "ask NTS." NTS is reserved for the rotation event itself.

### Article 5 — Forbidden patterns

❌ "NTS ơi cho key X" — VIOLATES this LAW
❌ "Could you provide credentials" — VIOLATES
❌ Asking NTS to paste env vars in chat — VIOLATES
❌ "I need NTS to retrieve from Supabase dashboard" — VIOLATES (only on rotation)

✅ "Reading from .env.local..." — COMPLIANT
✅ "Workspace boot loaded credentials" — COMPLIANT
✅ "Credentials missing, will check other workspaces first" — COMPLIANT

### Article 6 — Enforcement

Violating this LAW:

1. First violation: CLA self-corrects, redirects executor to read from `.env.local`.
2. Repeated violation: CLA escalates to NTS as anomaly.
3. Pattern: indicates onboarding/training gap; document in audit.

---

## §2 IMPLEMENTATION CHECKLIST

After deploying this LAW (initial deployment task `LANE01-CREDS-ONE-TIME-PERMANENT-DEPLOY-2026-05-01`):

- [x] All 3 workspaces have `.env.local` with the 7 target secrets (GH_TOKEN + 4 Supabase keys + 2 Vite vars).
- [x] gh CLI authenticated with permanent token.
- [x] GitHub Actions secrets synced (per-repo on all 3 repos: 4 secrets each).
- [x] `.gitignore` enforces no commit of `.env.local` (+ backup pattern).
- [x] Workspace boot scripts (`.workspace-boot.sh`) auto-load on terminal source.
- [x] `.bashrc` auto-source enabled with `UZG_BOOTED` guard.
- [x] Canon LAW documented in `canon/lane-1/laws/`.
- [x] INC-02 closure audit recorded.
- [ ] STATE_LIVE updated with LAW reference (handled by CLA in next state turn).

---

## §3 SCOPE

This LAW covers Lane 1 UZG+ ecosystem:

- UZG+ V2 + V3
- `Uniton_Shared` governance
- AIER Code / AIER Ops integration (when activated)
- Lane_02 / 03 / 04 cross-lane (when activated)

NTS LAW priority: **OVERRIDES executor uncertainty**. When in doubt, read `.env.local`.

---

## §4 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-05-01 | Initial LAW per NTS verbatim lock post INC-02 + Supabase keys final delivery |

---

🔒 LAW-NTS-CREDS-PERMANENT-V1
**Effective:** 2026-05-01
**Authority:** NTS verbatim
**Status:** ACTIVE permanent
End of file.
