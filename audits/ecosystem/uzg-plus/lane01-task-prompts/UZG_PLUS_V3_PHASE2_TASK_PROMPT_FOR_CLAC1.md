# LANE01-UZG-V3-PHASE2-CANON-LOCKIN — CLAC1 TASK PROMPT

**Task ID:** `LANE01-UZG-V3-PHASE2-CANON-LOCKIN-2026-04-30T16-24Z`
**Issued by:** CLA Lane_01 (UZG+ CTO)
**Executor:** CLAC1 (Claude Code Desktop)
**Workspace:** `C:\workspace\Uniton_Shared` (governance) + `C:\workspace\UZGPLUS` (mockup deploys)
**Issued:** 2026-04-30T16:24Z

---

## §1 MODEL ASSIGNMENT

**Primary model:** **Sonnet 4.6** (`claude-sonnet-4-6`)

**Reason:** Mechanical file-copy + git operations + Live mirror verification. No multi-system regression, no architecture decisions, no chained root-cause analysis. Standard governance commit workflow.

**Escalation rule:** If `gh pr merge --admin` fails 3+ times OR Live mirror returns non-200 after 5 retry cycles → escalate to Opus 4.7 with full error context.

**Downgrade rule:** N/A — this task floor is Sonnet 4.6 due to multi-step git workflow + verification.

---

## §2 OBJECTIVE

Lock 4 canon files into `unitonzengarden/Uniton_Shared` repository under `canon/uzg-plus/v3/` namespace, plus deploy 9 Phase 2 mockup files to public mirror under `audits/ecosystem/uzg-plus/phase-2-mockups/`. Verify Live mirror visibility for all 13 files.

This locks Phase 2 design output of UZG+ V3 PWA OS — prerequisite for Phase 3 Cursor implementation.

---

## §3 INPUTS

### §3.1 Pre-staged files (NTS uploads from CLA outputs)

NTS will copy these 4 canon files from CLA's outputs directory into a staging folder:

```
C:\workspace\Uniton_Shared\.staging\phase2-canon-lockin\
├── UZG_PLUS_V3_UIUX_ENTA_CANON_AMENDMENT_001.md
├── UZG_PLUS_V3_UIUX_THEME_SYSTEM_CANON_v1.md
├── UZG_PLUS_V3_PHASE2_MOCKUP_LOCK_INDEX_v1.md
└── UZG_PLUS_V3_PHASE2_TASK_PROMPT_FOR_CLAC1.md  (this file, for archival)
```

Plus 9 Phase 2 mockup HTML files:

```
C:\workspace\Uniton_Shared\.staging\phase2-mockups\
├── UZG_PLUS_V3_MOCKUP_01_FOUNDATION_OS_LOCKED.html
├── UZG_PLUS_V3_MOCKUP_02_HOME_INTERACTION_PATTERNS.html
├── UZG_PLUS_V3_MOCKUP_03_CHAT_MODULE.html
├── UZG_PLUS_V3_MOCKUP_04_WALLET_MODULE.html
├── UZG_PLUS_V3_MOCKUP_05_ENTA_MODULE.html
├── UZG_PLUS_V3_MOCKUP_06_PLUS_HUB.html
├── UZG_PLUS_V3_MOCKUP_06_5_THEME_SHOWCASE.html
├── UZG_PLUS_V3_MOCKUP_07_UREWARD_MINIAPP.html
└── UZG_PLUS_V3_MOCKUP_08_TAO_MINIAPP.html
```

### §3.2 Pre-dispatch verification (CLAC1 MUST verify before starting)

Before any commit, CLAC1 MUST verify:

1. All 4 canon staging files exist with non-zero size
2. All 9 mockup staging files exist with non-zero size
3. `git status` clean on `C:\workspace\Uniton_Shared` `main` branch
4. `git fetch origin && git pull --ff-only origin main` succeeds
5. No prior PR with name pattern `phase2-canon-lockin-*` already open or merged

If ANY check fails → HALT, append to audit log, ping CLA via report.

---

## §4 EXECUTION STEPS

### §4.1 Branch creation

```bash
cd C:\workspace\Uniton_Shared
git checkout main
git pull --ff-only origin main
git checkout -b lane01-phase2-canon-lockin-2026-04-30
```

### §4.2 Copy canon files to canonical paths

```bash
# Create canonical directory if not exists
mkdir -p canon/uzg-plus/v3/

# Copy 3 canon files (the 4th task prompt is archived separately)
cp .staging/phase2-canon-lockin/UZG_PLUS_V3_UIUX_ENTA_CANON_AMENDMENT_001.md canon/uzg-plus/v3/
cp .staging/phase2-canon-lockin/UZG_PLUS_V3_UIUX_THEME_SYSTEM_CANON_v1.md canon/uzg-plus/v3/
cp .staging/phase2-canon-lockin/UZG_PLUS_V3_PHASE2_MOCKUP_LOCK_INDEX_v1.md canon/uzg-plus/v3/

# Archive task prompt
mkdir -p audits/ecosystem/uzg-plus/lane01-task-prompts/
cp .staging/phase2-canon-lockin/UZG_PLUS_V3_PHASE2_TASK_PROMPT_FOR_CLAC1.md audits/ecosystem/uzg-plus/lane01-task-prompts/
```

### §4.3 Copy 9 mockup files to public audit namespace

```bash
mkdir -p audits/ecosystem/uzg-plus/phase-2-mockups/

cp .staging/phase2-mockups/UZG_PLUS_V3_MOCKUP_01_FOUNDATION_OS_LOCKED.html audits/ecosystem/uzg-plus/phase-2-mockups/
cp .staging/phase2-mockups/UZG_PLUS_V3_MOCKUP_02_HOME_INTERACTION_PATTERNS.html audits/ecosystem/uzg-plus/phase-2-mockups/
cp .staging/phase2-mockups/UZG_PLUS_V3_MOCKUP_03_CHAT_MODULE.html audits/ecosystem/uzg-plus/phase-2-mockups/
cp .staging/phase2-mockups/UZG_PLUS_V3_MOCKUP_04_WALLET_MODULE.html audits/ecosystem/uzg-plus/phase-2-mockups/
cp .staging/phase2-mockups/UZG_PLUS_V3_MOCKUP_05_ENTA_MODULE.html audits/ecosystem/uzg-plus/phase-2-mockups/
cp .staging/phase2-mockups/UZG_PLUS_V3_MOCKUP_06_PLUS_HUB.html audits/ecosystem/uzg-plus/phase-2-mockups/
cp .staging/phase2-mockups/UZG_PLUS_V3_MOCKUP_06_5_THEME_SHOWCASE.html audits/ecosystem/uzg-plus/phase-2-mockups/
cp .staging/phase2-mockups/UZG_PLUS_V3_MOCKUP_07_UREWARD_MINIAPP.html audits/ecosystem/uzg-plus/phase-2-mockups/
cp .staging/phase2-mockups/UZG_PLUS_V3_MOCKUP_08_TAO_MINIAPP.html audits/ecosystem/uzg-plus/phase-2-mockups/
```

### §4.4 Author 3 mandatory deliverable files in `audits/ecosystem/uzg-plus/`

Per `R-DELIVERABLE-01` redline (post OBS-01 fix 2026-04-30): 3 DOT files MUST be in `audits/ecosystem/uzg-plus/` namespace for Live mirror visibility. Filenames use DOT format with task ID prefix.

**File 1: Snapshot**

Path: `audits/ecosystem/uzg-plus/LANE01-UZG-V3-PHASE2-CANON-LOCKIN-2026-04-30-snapshot.md`

Content (CLAC1 authors): list of all 13 files committed (3 canon + 9 mockups + 1 task prompt archive), their canonical paths, file sizes, sha256 (optional), and Live mirror URL after merge.

**File 2: Report**

Path: `audits/ecosystem/uzg-plus/LANE01-UZG-V3-PHASE2-CANON-LOCKIN-2026-04-30-report.md`

Content (CLAC1 authors): execution summary — branch name, PR number, merge timestamp, Live mirror verification results (curl 200 OK for at least 3 sample files: 1 canon + 2 mockups), any issues encountered, total time elapsed.

**File 3: Audit log**

Path: `audits/ecosystem/uzg-plus/LANE01-UZG-V3-PHASE2-CANON-LOCKIN-2026-04-30-audit_log.md`

Content (CLAC1 authors): step-by-step append-only log with timestamps for each git operation, file copy, push, PR creation, merge, mirror verification. Include any retries/errors. Excluded from public mirror per `R-SEC-03` if contains sensitive data; otherwise public.

### §4.5 Git commit + push

```bash
git add canon/uzg-plus/v3/
git add audits/ecosystem/uzg-plus/
git commit -m "Lane01: Phase 2 canon lock-in — ENTA Pentagon amendment 001 + Theme System Canon v1 + Phase 2 Mockup Index v1 + 9 mockup files

- canon/uzg-plus/v3/UZG_PLUS_V3_UIUX_ENTA_CANON_AMENDMENT_001.md (NAM TAO Pentagon §3.2 sequence)
- canon/uzg-plus/v3/UZG_PLUS_V3_UIUX_THEME_SYSTEM_CANON_v1.md (5-element theme system 1C+2C+3B)
- canon/uzg-plus/v3/UZG_PLUS_V3_PHASE2_MOCKUP_LOCK_INDEX_v1.md (Phase 2 lock + Phase 3 readiness)
- audits/ecosystem/uzg-plus/phase-2-mockups/* (9 HTML mockup files)
- audits/ecosystem/uzg-plus/LANE01-UZG-V3-PHASE2-CANON-LOCKIN-2026-04-30-{snapshot,report,audit_log}.md

NTS approved 2026-04-30. Phase 2 design output locked. Phase 3 Cursor implementation can begin."

git push origin lane01-phase2-canon-lockin-2026-04-30
```

### §4.6 PR creation + self-merge

```bash
gh pr create \
  --title "Lane01: Phase 2 canon lock-in (ENTA amendment + Theme Canon + Mockup Index + 9 mockups)" \
  --body "Per NTS approval 2026-04-30 + AMD_NTS_FULL_TECH_AUTONOMY. See LANE01-UZG-V3-PHASE2-CANON-LOCKIN-2026-04-30-report.md for execution details." \
  --base main \
  --head lane01-phase2-canon-lockin-2026-04-30

# Capture PR number
PR_NUM=$(gh pr list --head lane01-phase2-canon-lockin-2026-04-30 --json number --jq '.[0].number')

# Self-merge per AMD
gh pr merge $PR_NUM --squash --delete-branch --admin
```

### §4.7 Live mirror verification

After merge, wait 60 seconds for `unitonzengarden/Uniton_Shared_Live` mirror sync, then verify with curl:

```bash
sleep 60

# Sample 3 files for 200 OK verification
curl -I https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/canon/uzg-plus/v3/UZG_PLUS_V3_UIUX_THEME_SYSTEM_CANON_v1.md

curl -I https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/audits/ecosystem/uzg-plus/phase-2-mockups/UZG_PLUS_V3_MOCKUP_05_ENTA_MODULE.html

curl -I https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/audits/ecosystem/uzg-plus/phase-2-mockups/UZG_PLUS_V3_MOCKUP_08_TAO_MINIAPP.html
```

If all 3 return HTTP 200 → success. Update report file with mirror URLs.

If ANY return 404 → wait additional 60s, retry once. If still 404 after retry → flag in audit_log and report, but task can still be considered complete (mirror lag is operational, not failure).

### §4.8 Cleanup

```bash
# Remove staging files post-success
rm -rf C:\workspace\Uniton_Shared\.staging\phase2-canon-lockin\
rm -rf C:\workspace\Uniton_Shared\.staging\phase2-mockups\
```

---

## §5 SCOPE BOUNDARIES

### §5.1 In-scope (CLAC1 MUST do)

- Verify all 13 staging files exist before starting (§3.2)
- Create branch + copy files + commit + push (§4.1-4.5)
- Author 3 mandatory deliverable files (§4.4)
- Create PR + self-merge `--admin` (§4.6)
- Verify Live mirror with curl (§4.7)
- Cleanup staging directory (§4.8)

### §5.2 Out-of-scope (CLAC1 MUST NOT do)

- ❌ Edit content of canon files or mockup files (CLA-authored, locked verbatim)
- ❌ Modify any file in `unitonzengarden/uzgplus-app` repository (different workspace)
- ❌ Trigger any deploy / Cloudflare / Vercel actions
- ❌ Modify any Lane_02/03/04 territory
- ❌ Apply Supabase migrations
- ❌ Touch `.env.local` or any secrets
- ❌ Echo `GH_TOKEN` or any secret value into logs / audit / commits

---

## §6 ACCEPTANCE CRITERIA

CLAC1 reports SUCCESS only when ALL of these are true:

- [ ] All 4 canon files committed to `canon/uzg-plus/v3/` (3 files) + `audits/ecosystem/uzg-plus/lane01-task-prompts/` (1 task prompt archive)
- [ ] All 9 mockup HTML files committed to `audits/ecosystem/uzg-plus/phase-2-mockups/`
- [ ] 3 mandatory DOT deliverable files exist in `audits/ecosystem/uzg-plus/` (snapshot + report + audit_log)
- [ ] PR created, self-merged with `--admin`, branch deleted
- [ ] Live mirror returns HTTP 200 for at least 3 sample files (1 canon + 2 mockups)
- [ ] Staging directory cleaned up
- [ ] No secrets echoed in any committed file or audit log
- [ ] Final report file lists: PR number, merge timestamp, Live mirror sample URLs (3), total time elapsed

If ANY criterion fails → CLAC1 reports `STATUS: FAILED` with specific failure point + recovery suggestion.

---

## §7 SELF-CHECK BEFORE REPORTING DONE

Per `LAW-NTS-LLM-05_SELF_CHECK` and `LAW-NTS-LLM-12_REPORT_VERIFY_MANDATORY`:

CLAC1 MUST verify before reporting SUCCESS:

1. ☐ All 13 files exist on `main` branch of `unitonzengarden/Uniton_Shared` (verify with `git log` or `gh api`)
2. ☐ All 3 deliverable DOT files exist in `audits/ecosystem/uzg-plus/` (verify file presence)
3. ☐ Live mirror sample files return 200 (curl evidence in report)
4. ☐ No `ghp_*` or other secret patterns in any committed file (grep check)
5. ☐ Report file lists actual PR number (not placeholder)
6. ☐ audit_log.md is append-only format with timestamps
7. ☐ No files created outside scoped paths (`canon/uzg-plus/v3/` + `audits/ecosystem/uzg-plus/`)

If ANY self-check item fails → DO NOT report SUCCESS. Report FAILED with details.

---

## §8 QA GATE

### §8.1 Pre-merge QA

Before `gh pr merge --admin`:
- Confirm all 13 files staged in PR via `gh pr view --json files`
- Confirm no out-of-scope files included
- Confirm commit message follows format

### §8.2 Post-merge QA

After merge:
- Confirm branch deleted
- Confirm Live mirror sync (3 sample curl 200)
- Confirm report file contains actual data (no placeholders)

---

## §9 ERROR HANDLING

| Failure | Action |
|---|---|
| Staging files missing | HALT, report FAILED with list of missing files |
| `git pull --ff-only` rejected | HALT, report conflict, await CLA guidance |
| `gh pr create` fails | Retry once with longer timeout. If 2nd fail → HALT report FAILED |
| `gh pr merge --admin` fails | Retry up to 3 times. If 3 fails → escalate to Opus 4.7 |
| Live mirror 404 after 2 retries | Flag in audit_log, mark report as "merge succeeded, mirror lag" — task complete with note |
| Secret pattern detected in any committed file | EMERGENCY: revert commit, HALT, report INC alert |

---

## §10 REPORT FORMAT (CLAC1 → CLA)

```markdown
# CLAC1 Report: LANE01-UZG-V3-PHASE2-CANON-LOCKIN-2026-04-30

## Status
[SUCCESS | FAILED | PARTIAL]

## Summary
- Branch: lane01-phase2-canon-lockin-2026-04-30
- PR #: [number]
- Merge timestamp: [ISO 8601]
- Total time elapsed: [HH:MM:SS]
- Files committed: 13 (3 canon + 9 mockups + 1 task prompt archive)

## Deliverables
- [x] audits/ecosystem/uzg-plus/LANE01-UZG-V3-PHASE2-CANON-LOCKIN-2026-04-30-snapshot.md
- [x] audits/ecosystem/uzg-plus/LANE01-UZG-V3-PHASE2-CANON-LOCKIN-2026-04-30-report.md
- [x] audits/ecosystem/uzg-plus/LANE01-UZG-V3-PHASE2-CANON-LOCKIN-2026-04-30-audit_log.md

## Live Mirror Verification (curl HTTP status)
- canon/uzg-plus/v3/UZG_PLUS_V3_UIUX_THEME_SYSTEM_CANON_v1.md: [200 / 404]
- audits/ecosystem/uzg-plus/phase-2-mockups/UZG_PLUS_V3_MOCKUP_05_ENTA_MODULE.html: [200 / 404]
- audits/ecosystem/uzg-plus/phase-2-mockups/UZG_PLUS_V3_MOCKUP_08_TAO_MINIAPP.html: [200 / 404]

## Self-Check
[7 items list with ☑ / ☐]

## Issues / Notes
[Any retries, mirror lag, or operational notes]
```

---

## §11 NTS ACTIONS REQUIRED

NTS only needs to do these 2 actions before CLAC1 starts:

1. **Copy 4 canon files** from CLA outputs to `C:\workspace\Uniton_Shared\.staging\phase2-canon-lockin\`
2. **Copy 9 mockup files** from CLA outputs to `C:\workspace\Uniton_Shared\.staging\phase2-mockups\`

After CLAC1 reports SUCCESS, NTS does **0 additional actions**.

CLAC1 self-merges via `--admin` (per AMD_NTS_FULL_TECH_AUTONOMY). NTS does NOT click PR merge button.

---

## §12 KEY LEARNINGS REFERENCE

- `KL-01`: Verify Live mirror BEFORE declaring done (curl 200 OK) — applied §4.7
- `KL-02`: Token never echo (post INC-01) — applied §5.2
- `KL-03`: Embed full content in task prompts (avoid defer pattern) — DEVIATION: per recent_updates rule, content is in pre-staged files (more accurate, faster, lower token cost)
- `KL-04`: Self-merge `gh pr merge --squash --delete-branch --admin` — applied §4.6
- `KL-07`: Sync cadence mandatory (`git fetch + checkout main + pull --ff-only`) — applied §4.1
- `KL-019`: Project knowledge accessible only for CLA web → embed in task prompts OR pre-stage files. THIS task uses pre-stage approach.

---

## §13 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30T16:24Z | Initial — Phase 2 canon lock-in dispatch |

---

## §14 END

Task scope: **mechanical file copy + git operations + verification**. No design decisions, no canon authoring (CLA-authored verbatim), no implementation work.

Total expected time: **8-15 minutes** (verify → branch → copy → commit → push → PR → merge → verify mirror → cleanup → report).

🔒 Lane_01 dispatch — Phase 2 canon lock-in
End of task prompt.
