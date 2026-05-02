# LANE03-GITHUB-ORG-AUDIT-ALL-REPOS-V1 Report

RESULT: WARNING

## Executive Summary

The audit inspected all seven target repositories under `unitonzengarden` and found them accessible. `_archive_chatbot` still exists under the requested name and is GitHub-archived, so it is classified as LEGACY / ARCHIVE / NOT ACTIVE. The audit completed without repository setting changes, product code changes, LAW changes, integration work, deployments, or cross-repo writes.

The governance posture is usable but not ready for automatic LAW enforcement. The strongest risks are missing main branch protection across all audited repos, failing recent CI/validator runs in `Uniton_Shared` and `Uniton_OS`, missing or weak repo orientation metadata in several repos, public mirror drift risk in `Uniton_Shared_Live`, and unclear product ownership between `aier-life-super-app` and `AIFI_LIFE`.

## Repos Audited

- unitonzengarden/Uniton_Shared
- unitonzengarden/Uniton_Shared_Live
- unitonzengarden/Uniton_OS
- unitonzengarden/uzgplus-app
- unitonzengarden/aier-life-super-app
- unitonzengarden/AIFI_LIFE
- unitonzengarden/_archive_chatbot

## Repo Classification Table

| Role | Repos | Recommendation |
| --- | --- | --- |
| GOVERNANCE / BRAIN | unitonzengarden/Uniton_Shared | Canonical repo for governance, reports, snapshots, skills, and future LAW_GITHUB evidence. |
| RUNTIME / EXECUTION | unitonzengarden/Uniton_OS | Runtime work only after protected PR flow and green CI. |
| PRODUCT | unitonzengarden/uzgplus-app, unitonzengarden/AIFI_LIFE | Product repos need product READMEs, CI, branch protection, and clear ownership. |
| MIRROR / PUBLIC STATE | unitonzengarden/Uniton_Shared_Live | Mirror only; public state must sync from source-of-truth repo. |
| ARCHIVE / LEGACY | unitonzengarden/_archive_chatbot | Not active; excluded from Codex dispatch and project execution. |
| UNKNOWN / NEEDS NTS DECISION | unitonzengarden/aier-life-super-app | NTS must classify before future GitHub LAW enforcement. |

## Repo Summary

| Repo | Visibility | Branch | Archived | Classification | Protected | Workflows | PRs | Issues | Tags |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| unitonzengarden/Uniton_Shared | PRIVATE | main | no | GOVERNANCE / BRAIN | no | 16 | 0 | 0 | 14 |
| unitonzengarden/Uniton_Shared_Live | PUBLIC | main | no | MIRROR / PUBLIC STATE | no | 0 | 0 | 0 | 0 |
| unitonzengarden/Uniton_OS | PRIVATE | main | no | RUNTIME / EXECUTION | no | 1 | 4 | 0 | 1 |
| unitonzengarden/uzgplus-app | PRIVATE | main | no | PRODUCT | no | 2 | 1 | 0 | 2 |
| unitonzengarden/aier-life-super-app | PRIVATE | main | no | UNKNOWN / PRODUCT CANDIDATE - NEEDS NTS DECISION | no | 0 | 3 | 0 | 0 |
| unitonzengarden/AIFI_LIFE | PRIVATE | main | no | PRODUCT | no | 0 | 0 | 0 | 20 |
| unitonzengarden/_archive_chatbot | PRIVATE | main | yes | ARCHIVE / LEGACY / NOT ACTIVE | no | 0 | 0 | 0 | 0 |

## Per-Repo Findings

### unitonzengarden/Uniton_Shared

- Identity: PRIVATE; default branch `main`; description: Governance-as-Code: Tier 1 ecosystem canon + Tier 2 AIER_COMMON + skills + adapters for Uniton Future ecosystem; topics: (none)
- Current classification: GOVERNANCE / BRAIN
- Recommended classification: Keep active as canonical governance, audit, canon, reports, snapshots, and shared skills repo.
- Structure: README yes, LICENSE yes, .gitignore yes, docs yes, reports yes, snapshots yes, audit_logs yes, workflows yes; root entries: 34; package indicators: (none)
- Folder quality notes: structure is readable enough for current role
- Branches: audit/lane04-copilot-source-audit-001, feat/law-cla-llm-init, main
- Protection: not protected
- PRs/issues: 0 open PR(s), 0 open issue(s)
- Actions/CI: AIER Code Heartbeat [active]; AIER Canon QA Worker [active]; AIER QA Loop Coordinator [active]; AIER Skill QA Worker [active]; AIER Scan Worker [active]; Auto PROJECT_STATUS Regenerate [active]; Build Artifacts [active]; Dispatch Task Spec [active]; Handoff Validator [active]; Lane Guardrails [active]; Lane Dispatch [active]; Pre-Flight Validator [active]; Sync Runtime to Public [active]; Tag Release [active]; Task Prompt Validator [active]; Validate Canon [active]
- Latest workflow: Handoff Validator: completed/failure on main at 2026-04-29T04:58:08Z
- Releases/tags: 1 release(s), latest v1.0.0 14 tag(s), latest versioning-system-v1.0
- Recommendation: Keep active as canonical governance, audit, canon, reports, snapshots, and shared skills repo.
- Required next action: Add main branch protection and fix latest Handoff Validator failure before LAW_GITHUB activation.
- Future LAW_GITHUB coverage: yes

Repo risks:
- default main branch has no branch protection
- recent workflow failure observed

### unitonzengarden/Uniton_Shared_Live

- Identity: PUBLIC; default branch `main`; description: Pulic live state for AIER Code; topics: (none)
- Current classification: MIRROR / PUBLIC STATE
- Recommended classification: Keep as public mirror only; no manual truth edits; sync from Uniton_Shared by controlled workflow.
- Structure: README yes, LICENSE no, .gitignore no, docs no, reports no, snapshots no, audit_logs no, workflows no; root entries: 5; package indicators: (none)
- Folder quality notes: README is skeletal; no workflow files
- Branches: main
- Protection: not protected
- PRs/issues: 0 open PR(s), 0 open issue(s)
- Actions/CI: -
- Latest workflow: No recent workflow runs observed.
- Releases/tags: No releases observed. No tags observed.
- Recommendation: Keep as public mirror only; no manual truth edits; sync from Uniton_Shared by controlled workflow.
- Required next action: Correct description typo, document mirror-only rule, and add mirror sync/status evidence standard.
- Future LAW_GITHUB coverage: yes

Repo risks:
- default main branch has no branch protection
- README too thin for Codex/human orientation
- public mirror lacks explicit mirror-only enforcement evidence

### unitonzengarden/Uniton_OS

- Identity: PRIVATE; default branch `main`; description: (missing); topics: (none)
- Current classification: RUNTIME / EXECUTION
- Recommended classification: Keep active as runtime/execution repo; add governance protections before further integration work.
- Structure: README yes, LICENSE no, .gitignore yes, docs yes, reports yes, snapshots yes, audit_logs yes, workflows yes; root entries: 28; package indicators: package-lock.json, package.json
- Folder quality notes: missing description
- Branches: audit/cla-integration-2026-04-29, chore/LANE01-naming-convention-2026-04-29, cursor/foundation-lock-reports-and-operator-law-v2, feat/T-INT-01-aier-code-schema, feat/T-INT-02-service-token-broker, main
- Protection: not protected
- PRs/issues: 4 open PR(s), 0 open issue(s)
- Actions/CI: CI [active]
- Latest workflow: CI: completed/failure on main at 2026-04-29T05:04:57Z
- Releases/tags: No releases observed. 1 tag(s), latest v0.2.0
- Recommendation: Keep active as runtime/execution repo; add governance protections before further integration work.
- Required next action: Add repo description, protect main, and repair failing CI before any runtime or bridge task.
- Future LAW_GITHUB coverage: yes

Repo risks:
- default main branch has no branch protection
- missing GitHub description
- recent workflow failure observed

### unitonzengarden/uzgplus-app

- Identity: PRIVATE; default branch `main`; description: UZG+ Super App frontend — Auth Core, onboarding, dashboard and future V1 modules; topics: (none)
- Current classification: PRODUCT
- Recommended classification: Keep active product repo; separate product runtime from repo-brain documents where possible.
- Structure: README yes, LICENSE no, .gitignore yes, docs yes, reports yes, snapshots no, audit_logs no, workflows yes; root entries: 126; package indicators: package-lock.json, package.json
- Folder quality notes: very broad root surface (126 root entries); root .env files present; contents not inspected
- Branches: codex/auto-go-live, codex/v2-p5-business-commission-publish, codex/v2-p6-notification-lock, codex/v2-p7-qot-system-lock, codex/v3-ui-flow-feed-redesign, codex/v3-ui-topbar-layout-base, feat/lane02/T-LANE02-TAO-DOCS-DROP-V1, main
- Protection: not protected
- PRs/issues: 1 open PR(s), 0 open issue(s)
- Actions/CI: Deprecated Legacy Deploy [active]; Deploy to Cloudflare Pages (Stable) [active]
- Latest workflow: Deploy to Cloudflare Pages (Stable): completed/success on main at 2026-04-29T04:24:49Z
- Releases/tags: No releases observed. 2 tag(s), latest v1-progress-v0.5-final-shell
- Recommendation: Keep active product repo; separate product runtime from repo-brain documents where possible.
- Required next action: Replace generic Vite README with product README; review root .env files for secret exposure; protect main.
- Future LAW_GITHUB coverage: yes

Repo risks:
- default main branch has no branch protection
- root .env files require secret review

### unitonzengarden/aier-life-super-app

- Identity: PRIVATE; default branch `main`; description: (missing); topics: (none)
- Current classification: UNKNOWN / PRODUCT CANDIDATE - NEEDS NTS DECISION
- Recommended classification: NTS decision required: keep as product, archive, or merge/consolidate with AIFI_LIFE/uzgplus-app.
- Structure: README no, LICENSE no, .gitignore yes, docs yes, reports no, snapshots no, audit_logs no, workflows no; root entries: 32; package indicators: package-lock.json, package.json
- Folder quality notes: missing README; missing description; no workflow files
- Branches: codex/create-aier-life-canonical-document, codex/create-master-memory-documentation-file, codex/create-master-memory-documentation-file-4tfj7u, codex/create-master-memory-documentation-file-6sao80, main
- Protection: not protected
- PRs/issues: 3 open PR(s), 0 open issue(s)
- Actions/CI: -
- Latest workflow: No recent workflow runs observed.
- Releases/tags: No releases observed. No tags observed.
- Recommendation: NTS decision required: keep as product, archive, or merge/consolidate with AIFI_LIFE/uzgplus-app.
- Required next action: Decide active/archive/consolidate status; if active, add README, description, CI, and governance folders.
- Future LAW_GITHUB coverage: yes

Repo risks:
- default main branch has no branch protection
- missing GitHub description
- missing README
- no active GitHub Actions workflow listed
- active/archive/product role is ambiguous against AIFI_LIFE

### unitonzengarden/AIFI_LIFE

- Identity: PRIVATE; default branch `main`; description: (missing); topics: (none)
- Current classification: PRODUCT
- Recommended classification: Keep as product repo only if NTS confirms finance-domain ownership; otherwise consolidate/rename by future decision.
- Structure: README yes, LICENSE no, .gitignore yes, docs no, reports yes, snapshots no, audit_logs no, workflows no; root entries: 24; package indicators: package-lock.json, package.json
- Folder quality notes: missing description; no workflow files
- Branches: main
- Protection: not protected
- PRs/issues: 0 open PR(s), 0 open issue(s)
- Actions/CI: -
- Latest workflow: No recent workflow runs observed.
- Releases/tags: No releases observed. 20 tag(s), latest v71.0
- Recommendation: Keep as product repo only if NTS confirms finance-domain ownership; otherwise consolidate/rename by future decision.
- Required next action: Add description, CI, audit/snapshot convention, and clarify relation to aier-life-super-app.
- Future LAW_GITHUB coverage: yes

Repo risks:
- default main branch has no branch protection
- missing GitHub description
- no active GitHub Actions workflow listed

### unitonzengarden/_archive_chatbot

- Identity: PRIVATE; default branch `main`; description: (missing); topics: (none)
- Current classification: ARCHIVE / LEGACY / NOT ACTIVE
- Recommended classification: Keep archived; not active; no Codex work except archive evidence.
- Structure: README yes, LICENSE yes, .gitignore yes, docs no, reports no, snapshots no, audit_logs no, workflows no; root entries: 28; package indicators: package.json, pnpm-lock.yaml
- Folder quality notes: missing description; no workflow files
- Branches: main
- Protection: not protected
- PRs/issues: 0 open PR(s), 0 open issue(s)
- Actions/CI: -
- Latest workflow: No recent workflow runs observed.
- Releases/tags: No releases observed. No tags observed.
- Recommendation: Keep archived; not active; no Codex work except archive evidence.
- Required next action: Leave archived and excluded from active project lists; optionally add archive topic/description if GitHub settings are later approved.
- Future LAW_GITHUB coverage: yes

Repo risks:
- No material repo-specific governance risk beyond global baseline.

## GitHub Hygiene Findings

- All audited repos are accessible through authenticated GitHub CLI inspection.
- All audited repos have default branch `main`.
- GitHub topics are absent across the target set; this increases human and Codex repo-selection ambiguity.
- Descriptions are missing on `Uniton_OS`, `aier-life-super-app`, `AIFI_LIFE`, and `_archive_chatbot`.
- `Uniton_Shared_Live` description contains a typo: "Pulic live state for AIER Code".
- `aier-life-super-app` has no README.
- `uzgplus-app` README is still generic React/Vite text despite the repo being a product repo.
- `uzgplus-app` has root `.env` and `.env.test` files; contents were not inspected, but presence should trigger a secret-handling review.

## Branch / PR / Protection Findings

- No audited repo reported active default-branch protection on `main`.
- Open PRs observed: `Uniton_OS` has 4, `uzgplus-app` has 1, and `aier-life-super-app` has 3. Other audited repos have 0 open PRs.
- Open issue count is zero for every audited repo by `gh issue list`.
- Active repos therefore have direct-main risk until branch protection and PR policy are formalized.
- Archived `_archive_chatbot` does not need active branch protection, but it must remain excluded from dispatch and active work.

## Actions / CI Findings

- `Uniton_Shared` has 16 active workflows; latest observed `Handoff Validator` run failed, while Lane Guardrails and Build Artifacts succeeded.
- `Uniton_OS` has CI configured; the latest observed CI runs failed on `main` and PR branches.
- `uzgplus-app` has deployment workflows; latest observed Cloudflare Pages deployment runs succeeded.
- `Uniton_Shared_Live`, `aier-life-super-app`, `AIFI_LIFE`, and `_archive_chatbot` have no active workflow list observed; archive status makes this acceptable only for `_archive_chatbot`.

## Mirror / Archive Findings

- `Uniton_Shared_Live` is public, minimal, and mirror-like. It should be treated as MIRROR / PUBLIC STATE, not as an active source-of-truth repo.
- `Uniton_Shared_Live` lacks explicit mirror enforcement evidence in-repo; future governance should bind sync source, manifest/hash checks, and no-manual-edit rules.
- `_archive_chatbot` is still named `_archive_chatbot`, is private, and is GitHub-archived. It is LEGACY / ARCHIVE / NOT ACTIVE and must not be listed as an active project.

## Codex Workflow Readiness

- Codex should default to `Uniton_Shared` for governance, audit, report, snapshot, law-draft, and cross-repo evidence tasks.
- Codex should use `Uniton_OS` only for runtime/execution tasks after explicit scope and pre-flight checks.
- Codex should use product repos only for product-scoped tasks, with repo role confirmed before edits.
- Codex should treat `Uniton_Shared_Live` as read-only mirror/public-state evidence unless a mirror-sync task is explicitly authorized.
- Codex should never dispatch active implementation work to `_archive_chatbot`.

## Risks

- All audited repos currently report no default-branch protection on main; this creates direct-main and unreviewed-change risk for active repos.
- Core automation is not fully green: Uniton_Shared latest Handoff Validator run failed, and Uniton_OS latest CI runs failed.
- Several repos have weak or missing orientation metadata: Uniton_OS, aier-life-super-app, AIFI_LIFE, and _archive_chatbot lack descriptions; aier-life-super-app lacks README; Uniton_Shared_Live README is skeletal; uzgplus-app README is still generic React/Vite text.
- Product truth is ambiguous between aier-life-super-app, AIFI_LIFE, and parts of uzgplus-app unless NTS assigns domain ownership.
- Open PR backlog exists in Uniton_OS, uzgplus-app, and aier-life-super-app, including integration/runtime-looking work that should not be merged before repo governance is settled.
- Uniton_Shared_Live is public and mirror-like but has no workflow/status enforcement in that repo; mirror drift risk should be governed from Uniton_Shared.
- uzgplus-app contains root .env/.env.test files; contents were not inspected in this audit, but their presence should trigger a secret-handling review.
- Topics are absent across the audited repo list, increasing Codex and human repo-selection ambiguity.

## Recommendations

- Adopt GitHub topics for every repo: governance-brain, runtime-execution, product, mirror-public, archive-legacy, active, nts-decision-needed as applicable.
- Protect main on active repos with PR requirement, one NTS-approved review or CODEOWNER review, no force pushes, no branch deletion, and required checks once CI is reliable.
- Use PRs for all active repo changes except explicit NTS emergency exceptions; one task = one branch = one report, with report-only commits allowed in Uniton_Shared.
- Set CI minimums: lint/build/test or governance validator for active repos; mirror sync verification for Uniton_Shared_Live; no CI requirement for archived repos.
- Standardize reports, snapshots, and audit logs using the task id and canonical directories; governance-wide evidence belongs in Uniton_Shared.
- Make Uniton_Shared the default Codex repo for governance/audit tasks; Uniton_OS only for runtime/execution; product repos only for product work; Uniton_Shared_Live read-only mirror; _archive_chatbot excluded from active work.
- Document mirror sync as source-of-truth Uniton_Shared to public Uniton_Shared_Live with hash/manifest evidence and no manual edits in the mirror.
- Require an NTS decision on aier-life-super-app vs AIFI_LIFE to remove duplicate product truth risk before product LAW coverage is enforced.

## Recommended Future LAW_GITHUB_01 Outline

1. Purpose and authority: Human = Authority, AI = Execution, Repo = Truth.
2. Repo role registry: governance/brain, runtime/execution, product, mirror/public state, archive/legacy, unknown/NTS decision.
3. Repo selection rule for Codex and humans before any task starts.
4. Branch protection and PR policy by role, including exception path.
5. Actions/CI minimum by role and how failing checks block active work.
6. Report/snapshot/audit artifact standard and canonical evidence location.
7. Mirror sync rule, drift detection, and public-state boundaries.
8. Archive handling: archived repos are not active, are excluded from dispatch, and retain evidence only.
9. Security hygiene minimum: descriptions, README, topics, no secrets in repo, env examples only.
10. Review cadence and amendment path for future GitHub governance updates.

## Next Recommended Task

LAW_GITHUB_01_REPO_GOVERNANCE_DRAFT_V1

## Boundary Confirmation

- Human = Authority.
- AI = Execution.
- Repo = Truth.
- One task = one scope = one report.
- No product code modified.
- No Uniton_OS runtime code modified.
- No active LAW files modified.
- LAW_N13 was not applied.
- No bridge endpoints implemented.
- No production deploy performed.
- No backend mutation performed.
- No repository settings changed.
- No repositories deleted or renamed.
- No cross-repo writes performed.
- Audit artifacts were written only inside `D:/UZG/Projects-v2/Uniton_Shared`.
