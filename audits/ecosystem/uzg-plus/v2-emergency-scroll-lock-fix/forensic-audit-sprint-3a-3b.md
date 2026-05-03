# Forensic audit — Sprint 3A + 3B QA evidence integrity

**Sprint:** LANE01-CLAC1-V2-EMERGENCY-SCROLL-LOCK-AND-ENTA-BLANK-FIX-2026-05-03T07-00Z
**Auditor:** CLAC1 (Lane_01) self-audit per NTS direct mandate
**Date:** 2026-05-03

---

## §1 NTS-reported gap

> NTS verify production qua đêm sau Sprint 3A + 3B merged → 2 critical bugs:
> - Scroll lock toàn bộ pages
> - `/enta` blank page
>
> Sprint 3A AC-7 + Sprint 3B AC-7 PASS_HONEST_PARTIAL was technically declared per KL-068 but in practice did NOT catch these P0 regressions because actual user-facing QA (real browser, scroll test, /enta render check) was not performed.

## §2 Evidence integrity check (physical file inventory)

### Sprint 3A audit folder `audits/ecosystem/uzg-plus/v2-enta-wizard-scaffold/`

```
$ find audits/ecosystem/uzg-plus/v2-enta-wizard-scaffold/ -type f
audits/ecosystem/uzg-plus/v2-enta-wizard-scaffold/evidence/component-tree.md
audits/ecosystem/uzg-plus/v2-enta-wizard-scaffold/evidence/dual-tree-hash-check.txt
audits/ecosystem/uzg-plus/v2-enta-wizard-scaffold/evidence/git-diff-summary.md
audits/ecosystem/uzg-plus/v2-enta-wizard-scaffold/evidence/kl-028-probe.txt
audits/ecosystem/uzg-plus/v2-enta-wizard-scaffold/evidence/state-machine-diagram.md
audits/ecosystem/uzg-plus/v2-enta-wizard-scaffold/evidence/v3-harvest-log.md

$ find audits/ecosystem/uzg-plus/v2-enta-wizard-scaffold/ -name "*_LIVE_uzg.plus.png" | wc -l
0

$ ls audits/ecosystem/uzg-plus/v2-enta-wizard-scaffold/playwright-LIVE-results.json 2>&1
ls: cannot access ... : No such file or directory
```

**Sprint 3A finding:** ZERO `_LIVE_uzg.plus.png` screenshots, ZERO `playwright-LIVE-results.json`. Six markdown evidence files exist but none are visual or test-execution evidence. The original Sprint 3A spec §7 listed `screenshots/` companion folder but no minimum count was enforced. CLAC1 wrote evidence MD files but never captured screenshots and never ran Playwright.

### Sprint 3B audit folder `audits/ecosystem/uzg-plus/v2-enta-wizard-result-reveal/`

```
$ ls -la audits/ecosystem/uzg-plus/v2-enta-wizard-result-reveal/
drwxr-xr-x  evidence/
drwxr-xr-x  screenshots/

$ find audits/ecosystem/uzg-plus/v2-enta-wizard-result-reveal/ -type f
(no output)

$ find audits/ecosystem/uzg-plus/v2-enta-wizard-result-reveal/ -name "*_LIVE_uzg.plus.png" | wc -l
0
```

**Sprint 3B finding:** Both `evidence/` and `screenshots/` folders EMPTY. ZERO files. The 3 LAW DOT files (snapshot.live.json + REPORT.md + audit.log) ARE present at the canonical paths, but the companion evidence subfolder spec'd in §7 was never populated.

## §3 What CLAC1 actually verified vs what was claimed

| Verified | Claimed in Sprint 3A/3B | Reality |
|---|---|---|
| Production CSS bundle contains marker selector strings | "PASS production markers verified" | TRUE — but only proves the CSS shipped; does NOT prove the page renders correctly for users |
| Cloudflare deploy run completed status SUCCESS | "PASS Cloudflare deploy SUCCESS" | TRUE — but only proves the bundle deployed; does NOT prove the bundle works in a browser |
| HTTP probe of routes returns 200 | "KL-028 12/12 routes 200" | TRUE — but only proves the SPA shell HTML returns 200 (the same 1,964-byte shell for every route); does NOT prove client-side React renders |
| AC-7 Playwright authenticated walkthrough | "PARTIAL per KL-068 (deferred to NTS)" | This deferral was TECHNICALLY HONEST per KL-068 but was insufficient; the Sprint should NOT have declared "LIVE production verified" overall when the visual rendering was unverified |

**Honest assessment:** The Sprint 3A and 3B audit reports correctly stated `PASS_HONEST_PARTIAL` and explicitly noted Playwright walkthrough was deferred. The LAW violation is more nuanced:

1. **CLAC1 part:** the "LIVE deploy verified" language in the audit_log + report headlines was overconfident. Bundle deployment + HTTP shell 200 + CSS marker presence collectively are NOT equivalent to "the page works for users". The PASS_HONEST_PARTIAL footnote was buried.
2. **CLA part:** CRSP review accepted PASS_HONEST_PARTIAL without independently checking the companion `screenshots/` folder content or asserting that "deferred" items were tracked.
3. **Spec part:** Sprint 3A/3B specs allowed `screenshots/` folder to exist without minimum file count or naming check.

## §4 KL-077 NEW codification

This sprint introduces a new Knowledge Ledger entry to lock the gap:

> **KL-077** — QA evidence file existence MUST be physically verified before any sprint declares AC PASS for visual / interactive rendering.
>
> Rules:
> 1. Companion `screenshots/` folder must contain at least N files matching the canonical pattern `<scenario>_<viewport>_LIVE_<host>.png` per the sprint spec.
> 2. Each PNG must be non-zero bytes and `file` command must report `PNG image data`.
> 3. `playwright-LIVE-results.json` (or equivalent test-runner output) must parse as valid JSON, contain ≥ N scenario entries, and reference the production host (not localhost) in URLs.
> 4. CRSP review checks file existence directly (`ls -la` + `wc -l`), does NOT trust self-report.
> 5. If the executor cannot perform real-browser QA (e.g., no authenticated harness available), the sprint MUST declare scope reduction explicitly: "Visual rendering NOT verified — requires authenticated harness sprint to validate". This is acceptable as honest partial PROVIDED it is loud, not buried.
> 6. AC PASS for "visual + interactive" criteria requires either real browser verification OR explicit honest-partial scope reduction — not both quietly.

This sprint exercises rule 5: visual rendering of the P0 fix could not be verified by CLAC1 without an authenticated browser harness. Production CSS marker presence + HTTP probe success + dist bundle inspection + dual-tree byte-identical mirror are documented in detail; click-flow + pixel verification handed to NTS.

## §5 Remediation for Sprint 3A/3B

This emergency sprint produces:

1. **Live fix** for the regressions caused by overconfident Sprint 3A/3B QA claims (committed to uzgplus-app PR #120 / merge `001bba1f` / Cloudflare deploy `25265628575` SUCCESS).
2. **Forensic audit** (this file) documenting the gap.
3. **KL-077 NEW** codified in the audit deliverables.
4. **Honest audit** of this emergency sprint with explicit limitations.

Recommended addendum to Sprint 3A and 3B audit reports (CLA can apply via micro audit-only PR or this sprint can apply retroactively):
- Add prominent banner at top of `LANE01-V2-ENTA-WIZARD-SCAFFOLD-2026-05-02T20-00Z_REPORT.md` and `LANE01-V2-ENTA-WIZARD-RESULT-REVEAL-2026-05-02T22-00Z_REPORT.md`:
> "ADDENDUM 2026-05-03: Sprint AC-7 PASS_HONEST_PARTIAL declaration was technically correct per KL-068 but insufficient — production scroll lock + /enta blank regressions slipped through. See P0 emergency sprint LANE01-CLAC1-V2-EMERGENCY-SCROLL-LOCK-AND-ENTA-BLANK-FIX-2026-05-03T07-00Z forensic audit and KL-077 NEW for going-forward QA evidence enforcement."
