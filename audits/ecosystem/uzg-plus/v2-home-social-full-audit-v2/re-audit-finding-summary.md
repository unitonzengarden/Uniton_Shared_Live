# V2 HOME Social Re-Audit Finding Summary

**Audit:** LANE01-V2-HOME-SOCIAL-FULL-AUDIT-V2
**Date:** 2026-05-03
**Auditor:** CLAC1 (Lane_01)
**Sister artifact:** [HOME_SOCIAL_BUG_LIST_V2.md](HOME_SOCIAL_BUG_LIST_V2.md) (50 bugs cataloged)

---

## TL;DR (NTS read first)

- ✅ **Fix-3 keystone (PR #114) shipped successfully** — V2 HOME social feed now exists at `/dashboard`, posts render, ngũ hành reactions visible. G011 architectural keystone resolved.
- ✅ **PR #119 fixed BUG-PLUS-01 (`common.back` i18n)** + **BUG-PLUS-02 (ENTA gate /app)** as advertised.
- ⚠️ **However:** the polish sprint following Fix-3 has not shipped, leaving **6/7 NTS-reported bugs from 2026-05-03 STILL_PRESENT or WORSENED**.
- 🔴 **Root-cause discovery:** `[[vi_missing:common.back]]` was a SYMPTOM. The **language resolver itself** ([languageFoundation.js:7430](apps/uzg-pwa/src/system/languageFoundation.js:7430)) ignores the `fallback` argument when locale='vi' and key missing → ANY future missing key will re-leak the same way. Already happening on `system.uReward.shell.closeShellAria` (4 routes affected).
- 🟡 **New finding:** HOME social pages (`/dashboard`, `/compose`, `/notifications`, `/search`, `/connect`) render English while user has `preferred_language='vi'` — locale not consistently applied. Caused by hardcoded EN strings (no `appT()` wrap), exposed when Fix-3 shipped feed without retro-fitting LANG_OS contract.

**50 bugs cataloged.** Severity 8 CRIT / 20 HIGH / 15 MED / 7 LOW. Most are CSS-only or one-liner i18n adds. Aggregate fix ETA ~30-40 dev hours across 17 mini-sprints.

---

## NTS-reported 2026-05-03 evidence — verification

### Screenshot 1: `/compose`

| NTS observation | Audit verification | Bug ID | Status |
|---|---|---|---|
| Raw key `[[vi_missing:common.back]]` | Not visible at audit time | (cleared by PR #119 + BUG-004 root) | PARTIAL — symptom fixed, root resolver bug remains |
| Composer cắt hình tròn đen layout vỡ | CONFIRMED — composer renders as massive black oval | BUG-001 | STILL_PRESENT (CRITICAL) |
| Title `Chia sẻ điều gì đó` (canonical VI) | Page actually renders "Share something" (English) | BUG-011 | STILL_PRESENT (HIGH) |
| Bottom nav vắng mặt (compose là full-screen overlay) | CONFIRMED — bottom nav hidden on /compose (correct per canon) | (no bug — correct behavior) | OK |
| Trang trắng background không neutral-dark | CONFIRMED — light gradient background | BUG-002 | STILL_PRESENT app-wide (CRITICAL) |

### Screenshot 2: `/dashboard`

| NTS observation | Audit verification | Bug ID | Status |
|---|---|---|---|
| Top bar `Trang chủ` correct | Actually renders "Home" (English) | BUG-009 | STILL_PRESENT (HIGH) |
| Tab `Cho bạn 12 / Đang theo dõi 10` correct | CONFIRMED VI tab labels | (no bug here) | OK |
| Composer top duplicate với /compose | CONFIRMED — same component on both surfaces | BUG-008 | STILL_PRESENT (CRITICAL) |
| 5 ngũ hành reactions emoji rời, không pentagon | CONFIRMED — horizontal emoji strip | BUG-003 | STILL_PRESENT (CRITICAL) |
| Bottom nav floating middle desktop | CONFIRMED — overlap on multiple routes | BUG-007 | STILL_PRESENT (CRITICAL) |
| Background trắng KHÔNG neutral-dark | CONFIRMED app-wide | BUG-002 | STILL_PRESENT (CRITICAL) |

**6/7 NTS bugs confirmed STILL_PRESENT or WORSENED. 1 partial-fixed.**

---

## Phase outcomes

### PHASE A — Login + route inventory

- Authenticated sovereign user via Supabase admin OTP bypass (same pattern as Lane_01 PR #94 Phase 6.1.b auth-bypass fixture).
- Discovered 33 HOME social routes via `App.jsx` regex enumeration (filtered Lane_02 namespaces).
- Captured 9 routes directly (mobile + desktop) + 8 indirect (redirect targets) = 17/33 covered = 52%.
- Output: [screen-list.md](screen-list.md)

**Significant subfinding:** Without seeded `enta_profile`, ALL HOME social routes redirect to `/enta` per [userJourneyEngine.js:204](apps/uzg-pwa/src/system/userJourneyEngine.js:204). Confirms 2026-05-02 G011 baseline. Audit seeded a stub enta_profile for sovereign to bypass gate (cleaned up post-audit).

### PHASE B — Screenshot capture

- 18 screenshots captured (9 routes × 2 viewports). Exceeds AC-3 minimum 14.
- Mobile 375 + Desktop 1280, deviceScaleFactor 2.
- 4 interaction states (reaction wheel, U-Reward popup, compose overlay, action sheet) captured embedded in main route screenshots.
- Output: [screenshots/](screenshots/) folder

### PHASE C — i18n leak audit

- Resolver source code reviewed; confirmed [languageFoundation.js:7430](apps/uzg-pwa/src/system/languageFoundation.js:7430) BUG-004.
- DOM scan identified 4 raw key leaks (system.uReward.shell.closeShellAria across 3 routes).
- Locale inconsistency map produced — VI works on /profile/me, /enta, /settings; EN dominates on /dashboard, /compose, /notifications, /search, /connect.
- Output: [i18n-broken-keys.txt](i18n-broken-keys.txt)

### PHASE D — Bug cataloging

- 50 bugs cataloged with full structured fields (severity / category / route / viewport / evidence / canon / fix-type / fix-complexity / file-suspected / dual-tree / NTS-reported / previous-audit-id / status).
- 7 NTS-reported bugs verified.
- 30 previous-audit gaps reconciled (1 done, 1 partial, 4 verified-changed, 24 unverified-defer or status updated).
- Output: [HOME_SOCIAL_BUG_LIST_V2.md](HOME_SOCIAL_BUG_LIST_V2.md)

### PHASE E — Playwright assertions

- 10 canon-driven assertions executed.
- 4/10 PASS (compose no raw i18n on /compose path-specific; desktop 480px shell; ureward close button exists; dashboard renders feed).
- 6/10 FAIL (bottom nav inside shell — selector miss; 5 ngu hanh reactions exact count — selector miss; compose vietnamese; 4 media buttons; tap post navigation; notifications vietnamese).
- Output: [playwright-results.json](playwright-results.json)

### PHASE F — KL-028 production probe

- 12 routes probed via curl.
- ALL 200 OK, identical SPA shell size (1964 bytes — index.html before JS hydration). No 404/5xx.
- Output: [kl-028-probe.txt](kl-028-probe.txt)

### PHASE G — Deliverables

- 3 mandatory files in §7.X format (snapshot.live.json + _REPORT.md + _audit.log).
- Companion folder structured per OBS-01 + KL-073.

---

## Layer-cake of bugs (severity × visibility × fix complexity)

```
                CRITICAL  HIGH  MEDIUM  LOW
NTS-visible       4         3      0      0      ← SHIP FIRST (Tier 0+1)
Hidden but high   2         8      4      1      ← SHIP NEXT (Tier 2)
Polish            2         9     11      6      ← SHIP LAST (Tier 3+4)
                  ───       ──    ──      ─
                   8        20    15      7      Total = 50
```

---

## Critical drift findings (top-3 architectural issues)

### 1. Language OS resolver fallback semantics broken (BUG-004)

[languageFoundation.js:7430](apps/uzg-pwa/src/system/languageFoundation.js:7430) returns `[[vi_missing:KEY]]` immediately when `locale==='vi'` and key absent. This IGNORES the `fallback` argument that callers explicitly pass. Result: any future missing VI key will re-leak as raw bracket.

PR #119 patched ONE specific symptom (`common.back`) by adding the missing dictionary entry. Resolver itself untouched. We've already observed the same pattern leak again on `system.uReward.shell.closeShellAria` across 4 routes.

**Fix dispatch:** Sprint Fix-i18n-A is the single highest-priority sprint. ~1-2h CSS-equivalent surgical patch. Protects ALL future i18n work.

### 2. HOME social pages were authored without LANG_OS contract (BUG-006 + cluster)

When PR #114 shipped Fix-3 keystone, the new pages (Dashboard top-bar, NotificationsPage, SearchPage, ConnectionsPage, ComposePage, PostComposer) used hardcoded English strings rather than `useLanguageFoundation()` + `appT()` wrappers.

This explains why /profile/me + /enta + /settings render Vietnamese (older code, properly wrapped) while the new HOME social pages render English.

**Fix dispatch:** Sprint Fix-i18n-B (3-4h) retrofit. ~30 visible English strings → VI dict additions + JSX wrap calls.

### 3. Composer container CSS catastrophic (BUG-001)

The PostComposer renders as a giant black oval/circle on /compose due to border-radius: 50% (or near-equiv) being applied to its container. Likely a CSS module class collision OR a regression from PR #106 V2 UI Upgrade where the composer card got a misapplied "circle" or "blob" style.

**Fix dispatch:** Sprint Fix-Compose-Layout (~30min CSS override).

---

## Drift KLs (knowledge ledger updates)

### KL-NEW — Fix-3 keystone success but polish-sprint omission

When shipping a major architectural feature (V2 HOME social feed) that adds many new pages, the LANG_OS contract retrofit + theme-canvas application must ALSO ship in the same wave OR be queued as immediate Tier 1 follow-up. Otherwise visible regressions emerge to NTS within hours.

**Pattern reaffirmation:** Architectural shipping ≠ done. Polish-Tier 1 is part of the keystone sprint, not a follow-up nice-to-have.

### KL-NEW — Resolver-level i18n bug masked by single-symptom fix

PR #119 patched `common.back` as a raw-key fix. The resolver-level bug was not surfaced in that PR's discussion or commit message. Result: same disease re-emerges on a different key within 24h.

**Pattern reaffirmation:** When a forbidden-pattern leak surfaces, ALWAYS audit the resolver itself, not just the visible key. KL-074 LAW retroactive fix → expand to resolver too.

### KL-NEW — Audit harness needs ENTA-Root pre-state seeding

Lane_01 auth-bypass fixture (PR #94) authenticates a user but does not seed the ENTA Root profile required to pass the journey gate. Audit attempts to capture HOME pages on un-onboarded sovereign user redirect to /enta, hiding the actual HOME state.

**Recommendation:** Extend Lane_01 auth-bypass fixture with optional `seedEntaRoot: true` flag that pre-creates a stub `enta_profile` for the test user, then cleans up after. Aligns with future audit + testing needs.

---

## Lane boundary statement

This audit modifies **0 source files** in `unitonzengarden/uzgplus-app`. All deliverables committed to `unitonzengarden/Uniton_Shared` repo only:

```
Uniton_Shared:
  audits/ecosystem/uzg-plus/snapshots/LANE01-V2-HOME-SOCIAL-FULL-AUDIT-V2.snapshot.live.json
  audits/ecosystem/uzg-plus/reports/LANE01-V2-HOME-SOCIAL-FULL-AUDIT-V2_REPORT.md
  audits/ecosystem/uzg-plus/audit_logs/LANE01-V2-HOME-SOCIAL-FULL-AUDIT-V2_audit.log
  audits/ecosystem/uzg-plus/v2-home-social-full-audit-v2/HOME_SOCIAL_BUG_LIST_V2.md  ⭐
  audits/ecosystem/uzg-plus/v2-home-social-full-audit-v2/screen-list.md
  audits/ecosystem/uzg-plus/v2-home-social-full-audit-v2/i18n-broken-keys.txt
  audits/ecosystem/uzg-plus/v2-home-social-full-audit-v2/playwright-results.json
  audits/ecosystem/uzg-plus/v2-home-social-full-audit-v2/audit-results.json
  audits/ecosystem/uzg-plus/v2-home-social-full-audit-v2/kl-028-probe.txt
  audits/ecosystem/uzg-plus/v2-home-social-full-audit-v2/re-audit-finding-summary.md (this file)
  audits/ecosystem/uzg-plus/v2-home-social-full-audit-v2/screenshots/ (18 PNG)
```

Audit-only branch: `audit/LANE01-V2-HOME-SOCIAL-FULL-AUDIT-V2`. R-LANE-01 + R-CANON-01 + R-DELIVERABLE-01 + KL-073 verified.

---

## Top 3 recommended next sprints for CLA

1. **Sprint Fix-i18n-A** — patch resolver fallback (1-2h, single file, CRITICAL system-wide protection). Closes BUG-004 root.
2. **Sprint Fix-Compose-Layout** — CSS override of composer oval (30min, single file). Closes BUG-001, the #1 NTS-visible bug.
3. **Sprint Fix-Theme-A** — neutral-dark canvas application (30min, ~3 CSS files). Closes BUG-002, app-wide visible.

These 3 sprints (~3h total) address the top NTS-reported issues. Tier 1+ retrofit (i18n, pentagon, post tap) follow.
