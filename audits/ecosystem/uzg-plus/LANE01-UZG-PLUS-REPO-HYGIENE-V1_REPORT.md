# LANE01-UZG-PLUS-REPO-HYGIENE-V1 — Ship Report

**Task ID:** `LANE01-UZG-PLUS-REPO-HYGIENE-V1`
**Lane:** Lane_01 (Cursor / claude-sonnet-4-5, extended thinking ON)
**Authority:** AMD_LANE01_CTO_AUTO_APPROVE_TECH_NON_CANON §3.1 + AMD_NTS_FULL_TECH_AUTONOMY (Quick Win #5 pre-authorized boundary exception)
**Source:** Quick Win #5 from `UZG_PLUS_IMPLEMENTATION_PRIORITY_MATRIX_V1` (Block 4)
**Scope:** Repo profile cleanup — README, `package.json`, GitHub metadata, deprecated workflow + legacy vercel.json removal.
**Repo HEAD at task start:** `5da7f23d2a5606cdc8f4a9cf91a882c79f723715`
**Authored at:** 2026-04-29T18:57Z
**NTS clicks:** 0

---

## §1 Intent

Clean the UZG+ repo profile so NTS — and any external visitor — sees a professional, accurate landing surface:
- The bare Vite-template `README.md` is replaced with a real UZG+ description.
- `package.json` advertises `uzg.plus` as the canonical homepage.
- GitHub repo metadata (`homepage`, `description`) is updated to match.
- Deprecated `cloudways-deploy.yml` workflow is removed.
- Legacy `vercel.json` is removed (Cloudflare is the canonical deploy target).

This task is the smallest, highest-visibility quick win from the V1 priority matrix.

---

## §2 Phases executed

| Phase | Description | Status |
|---|---|---|
| A | Pre-flight + branch (`feat/lane01-uzg-plus-repo-hygiene`) | ✅ |
| B | Replace `README.md` with ~120-line UZG+ description | ✅ |
| C | Add `homepage` + `description` to `package.json` | ✅ |
| D | `git rm .github/workflows/cloudways-deploy.yml` | ✅ |
| E | `git rm vercel.json` | ✅ |
| F | Validate `package.json` (JSON OK) and `vite.config.js` (`node --check` OK) | ✅ |
| G | `gh api repos/... -X PATCH` — homepage + description | ✅ |
| H | Author 3 DOT deliverables (this report + snapshot + audit log) | ✅ |
| I | Commit + PR + self-merge | (next) |
| J | Cross-publish 2 files (report + snapshot) to Uniton_Shared via gh api | (next) |
| K | Verify live deploy + Live mirror sync | (next) |

---

## §3 Changes summary

### 3.1 README.md (root) — replaced

**Before:** 17-line Vite template scaffold ("React + Vite … two official plugins are available…").
**After:** ~120-line UZG+ description with sections:
- Vision (verbatim whitepaper §1.2 quote)
- Tech Stack table
- 7 Core Modules (Whitepaper §4.2 names)
- 4 Membership Tiers (catalog: Explorer / Seeker / Builder / Sovereign — sourced from `.codex-artifacts/v2-p5-uzgfi-package-catalog-live.json`)
- Build Status (V2 LIVE; 96 migrations, 16 domains; V3 in progress)
- Development scripts
- Deployment (Cloudflare Pages + Workers; explicit "no Vercel deploy" note)
- Documentation index (with Uniton_Shared_Live raw URLs for system map + priority matrix)
- Lane Architecture (Lane_01 / Lane_02 / Lane_03 boundary)
- License

### 3.2 package.json — fields added

`package.json` did not have a `homepage` field at all (audit observation `homepage = uzgplus-app.vercel.app` referred to **GitHub repo metadata**, not the npm manifest). Added two fields after `"type": "module",`:

```diff
   "type": "module",
+  "homepage": "https://uzg.plus",
+  "description": "UZG+ — Human Value Origin Layer. Mobile-first super-app combining identity, social, value, community business, AI guidance, and governance. Live at uzg.plus.",
```

`Get-Content package.json -Raw | ConvertFrom-Json` parses cleanly; no other fields touched.

### 3.3 GitHub repo metadata — PATCHed

Before:

```json
{
  "homepage":    "https://uzgplus-app.vercel.app",
  "description": "UZG+ product application frontend and product modules for onboarding, dashboard, and app workflows."
}
```

After:

```json
{
  "homepage":    "https://uzg.plus",
  "description": "UZG+ — Human Value Origin Layer. Mobile-first super-app combining identity, social, value, community business, AI guidance, and governance. Live at uzg.plus."
}
```

Method: `gh api repos/unitonzengarden/uzgplus-app -X PATCH -f homepage=… -f description=…`. No token value was logged — token is read from `.env.local` and only injected into the in-process `$env:GH_TOKEN` (post INC-01 rule).

### 3.4 `.github/workflows/cloudways-deploy.yml` — deleted

The file's only job was a deprecation `echo`:

```yaml
echo "Legacy deploy workflow is disabled."
echo "Canonical path: LOCAL -> GITHUB -> CLOUDFLARE -> UZG.PLUS"
echo "AIER must run in shared frontend Node runtime; no PM2/Cloudways split runtime."
```

Removing it cleans the GitHub Actions dropdown. No live deploy depends on it.

### 3.5 `vercel.json` — deleted

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "npm install",
  "buildCommand":   "npm run build",
  "outputDirectory":"dist",
  "cleanUrls": true,
  "routes": [ … ]
}
```

This file targeted Vercel — but Vercel deployment for this repo is dead (audit `06_LIVE_DEPLOYMENT.md`: `uzgplus-app.vercel.app` returned 404). Cloudflare Pages is the canonical deploy via `.github/workflows/deploy.yml` (Node 22 + `wrangler pages deploy dist`).

---

## §4 Boundary check

12 standard items + 5 documented exceptions (per Quick Win #5 pre-authorize):

| Item | Status |
|---|---|
| Cursor work only in `C:\workspace\UZGPLUS\` | ✅ |
| No Uniton_Shared local clone | ✅ |
| No `.lane_02/` touch | ✅ |
| No `.lane_03/` touch (does not exist yet) | ✅ |
| No Supabase modify | ✅ |
| No Vercel deploy | ✅ |
| No `GH_TOKEN` echoed in commits / logs / audit | ✅ |
| `[vercel skip]` on commits | ✅ |
| LANE01- DOT format on 3 deliverables | ✅ |
| Self-merge per AMD | (next, Phase I) |
| NTS clicks = 0 | ✅ |
| `npm install` not run (audit-style, no build) | ✅ |
| **Exception:** modify root `README.md` | ✅ pre-authorized |
| **Exception:** modify `package.json` | ✅ pre-authorized |
| **Exception:** delete `.github/workflows/cloudways-deploy.yml` | ✅ pre-authorized |
| **Exception:** delete `vercel.json` | ✅ pre-authorized |
| **Exception:** PATCH GitHub repo metadata via `gh api` | ✅ pre-authorized |

---

## §5 Acceptance criteria (16 items)

| AC | Status | Evidence |
|---|---|---|
| AC1 — Branch `feat/lane01-uzg-plus-repo-hygiene` created | ✅ | `git branch --show-current` |
| AC2 — README.md replaced with real UZG+ description | ✅ | ~120 lines; whitepaper §1.2 quoted; sections listed in §3.1 |
| AC3 — `package.json` homepage = `https://uzg.plus` | ✅ | Field added (was absent) |
| AC4 — `cloudways-deploy.yml` deleted | ✅ | `git rm` recorded |
| AC5 — `vercel.json` deleted | ✅ | `git rm` recorded |
| AC6 — GitHub repo `homepage` updated via `gh api` PATCH | ✅ | API verify shows `https://uzg.plus` + new description |
| AC7 — `package.json` valid JSON post-update | ✅ | `ConvertFrom-Json` parses without error |
| AC8 — `vite.config.js` parseable post-changes | ✅ | `node --check vite.config.js` exits 0 |
| AC9 — `deploy.yml` workflow intact (Cloudflare deploy unchanged) | ✅ | File present, byte-identical to base |
| AC10 — 3 DOT deliverables authored | ✅ | this file + `.snapshot.live.json` + `_audit.log` |
| AC11 — PR self-merged via squash | ⏳ Phase I |
| AC12 — Cross-publish 2 files (report + snapshot, NO audit log) | ⏳ Phase J |
| AC13 — Live deploy `uzg.plus` still 200 OK post-push | ⏳ Phase K (after Cloudflare auto-deploy) |
| AC14 — Live mirror sync verified (1 URL fetch 200 OK) | ⏳ Phase K |
| AC15 — Boundary 12/12 PASS (with documented exceptions) | ✅ | §4 |
| AC16 — NTS clicks = 0 | ✅ | full autonomy via `.env.local` |

---

## §6 Honest disclosure

1. **`package.json` did NOT have a `homepage` field** in the pre-task tree. The V1 audit observation about a "stale `uzgplus-app.vercel.app` homepage" referred to **GitHub repo metadata**, not the npm manifest. This task adds `homepage` and `description` fields to `package.json` so that the npm manifest carries the same canonical surface as GitHub. Net effect is the intended one (uzg.plus is canonical everywhere) — but the audit phrasing is corrected here.
2. **`vite.config.js` runtime import resolution** still requires `npm install` to run. Boundary forbids `npm install`, so the verification was syntax-only (`node --check`, exit 0). This is sufficient to confirm no syntax regression; runtime resolution is exercised in CI on every push.
3. **`vercel.json` deletion does not deploy a Vercel rollback** because Vercel deployment is already dead (audit 06: `uzgplus-app.vercel.app` returns 404). The file's removal removes a stale config that contradicted live runtime architecture.
4. **`cloudways-deploy.yml` deletion** is safe because the workflow only runs on `workflow_dispatch` (manual button) and prints a deprecation notice. No scheduled trigger, no `push` trigger.
5. **GitHub repo `description` is now ~200 chars** — within the 350-char GitHub limit. Long enough to convey vision; short enough for repo cards.

---

## §7 Evidence URLs

```
1. uzg.plus LIVE:                   https://uzg.plus
2. GitHub repo metadata:            https://github.com/unitonzengarden/uzgplus-app
3. README rendering on GitHub:      https://github.com/unitonzengarden/uzgplus-app#readme
4. Report (Live mirror, post-K):    https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/audits/ecosystem/uzg-plus/LANE01-UZG-PLUS-REPO-HYGIENE-V1_REPORT.md
5. PR (post-I):                     https://github.com/unitonzengarden/uzgplus-app/pulls?q=LANE01-UZG-PLUS-REPO-HYGIENE-V1
```

---

## §8 NTS-visible improvements

Immediate:
- Repo card on GitHub shows real UZG+ description (no more "product application frontend and product modules" placeholder).
- Repo `homepage` link on GitHub navigates to `https://uzg.plus` (200 OK), not the dead Vercel URL (404).
- Visiting the repo page renders the new README — vision, tech stack, modules, tiers, deployment, lane architecture all visible.
- GitHub Actions list no longer shows the deprecated `Deprecated Legacy Deploy` workflow.
- Repo no longer carries a `vercel.json` that contradicts the actual Cloudflare runtime.

---

## §9 Sign-off (pending Phase I/J/K)

```
2026-04-29T<HH:MM>Z LANE01-UZG-PLUS-REPO-HYGIENE-V1 COMPLETE
   README replaced ✓
   package.json homepage + description added ✓
   cloudways-deploy.yml removed ✓
   vercel.json removed ✓
   GitHub metadata PATCHed ✓
   build verification (syntax) PASS ✓
   PR <num> squash-merged → <SHA>
   2 files cross-published (report + snapshot)
   Live deploy 200 OK post-push
   Live mirror 200 OK
   NTS_clicks = 0 ✓
```
