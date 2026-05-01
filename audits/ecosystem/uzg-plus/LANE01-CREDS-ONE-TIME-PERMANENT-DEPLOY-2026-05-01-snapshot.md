---
task_id: LANE01-CREDS-ONE-TIME-PERMANENT-DEPLOY-2026-05-01T09-30Z
lane: Lane_01
executor: CLAC1
mode: solo
model: claude-sonnet-4-6
status: SUCCESS
type: P0_INFRASTRUCTURE_PERMANENT
project: ecosystem
prs:
  - repo: unitonzengarden/Uniton_Shared
    pr: 64
    sha: 28cea6e7e7f8ababd7cc69490ccb12c598c490a7
canon_compliance:
  - section: LAW-NTS-CREDS-PERMANENT-V1 (NTS verbatim lock)
    status: PUBLISHED
  - section: secrets discipline (no values in commits/audits)
    status: ENFORCED
---

# LANE01-CREDS-ONE-TIME-PERMANENT-DEPLOY-2026-05-01 — Snapshot

**Authority:** NTS verbatim LAW lock 2026-05-01 — "Làm một lần, không bao giờ hỏi NTS keys lần nữa"
**Outcome:** Credentials deployed permanently to 3 workspaces + 12 Actions secrets + workspace boot scripts. Future tasks NEVER ask NTS for credentials.

## Verification snapshot (6/6 PASS)

| Check | Result |
|---|---|
| Old PAT invalidated | `401 Unauthorized` ✅ |
| Workspaces have 7 target secrets each | 3/3 workspaces × 7 vars = 21/21 ✅ |
| gh CLI auth (new PAT) | `admin:org / repo / workflow` scopes ✅ |
| Supabase service_role probe | HTTP 200 with real data on `wallet_currencies` ✅ |
| GitHub Actions per-repo secrets | 4 secrets × 3 repos = 12/12 ✅ |
| `.gitignore` enforcement | 3/3 workspaces, git status clean ✅ |
| Live mirror sync (post-merge) | LAW + INC-02 closure both 200 OK ✅ |

## Deliverables

| Path | Purpose |
|---|---|
| `canon/lane-1/laws/LAW-NTS-CREDS-PERMANENT-V1.md` | LAW canon (6 articles) |
| `audits/ecosystem/uzg-plus/incidents/INC-02-2026-05-01-CLOSURE.md` | Incident closure record |
| `.gitignore` (3 workspaces) | `.env.local` + backups + `.workspace-boot.sh` ignored |
| `.workspace-boot.sh` (3 workspaces) | Auto-load `.env.local` when sourced |
| `~/.bashrc` | Auto-source on terminal open with `UZG_BOOTED` guard |
| GitHub Actions (3 repos × 4 secrets) | CI/CD reads new credentials automatically |

## PR
- **Uniton_Shared #64** → `28cea6e` at 2026-05-01T09:50:17Z (LAW + INC-02 + .gitignore)

## Live mirror URL (CRSP)
- LAW: `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/canon/lane-1/laws/LAW-NTS-CREDS-PERMANENT-V1.md`
- INC-02: `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/audits/ecosystem/uzg-plus/incidents/INC-02-2026-05-01-CLOSURE.md`
- Report: `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/audits/ecosystem/uzg-plus/LANE01-CREDS-ONE-TIME-PERMANENT-DEPLOY-2026-05-01-report.md`

## Critical security discipline observed

- **Secret values NEVER echoed in tool output** — only length + 6-char prefix masked (e.g., `ghp_8d***`, `eyJhbG***`).
- **Secret values NEVER in committed files** — strict regex scan (`ghp_[36]|github_pat|sb_publishable_<...>|eyJhbG[30+]|sk-(proj|ant)`) returned 0 matches before commit.
- **Heredoc writes** used single-quoted (`<<'ENVEOF'`) to prevent shell expansion; values flow from chat context → `.env.local` directly with no intermediate echo.
- **Audit log + report use masked references only** (`ghp_8d***A6` style).

End of snapshot.
