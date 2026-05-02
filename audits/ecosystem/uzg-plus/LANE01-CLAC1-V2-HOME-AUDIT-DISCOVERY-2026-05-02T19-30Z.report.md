# V2 HOME Audit (Discovery-only Phase 1) — Final Report

**Audit ID:** LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane_01) solo
**Status:** DISCOVERY COMPLETE — pure audit, ZERO code edits.

---

## §1 Executive summary

This sprint produces the **Phase 1 inventory** that feeds the next 6-8 fix sprints across V2 HOME. The mandate was strict: **no code edits**, only markdown deliverables in `Uniton_Shared/audits/`. Spec §3 minimums (≥6 screens audited, ≥30 gaps with full categorization) are met and exceeded:

- **28 HOME-related routes discovered** (filtered from 80+ V2 routes; 18 unique destinations)
- **6 screens audited** at mobile + desktop = 12 screenshots
- **42 gaps catalogued** (6 CRITICAL / 15 HIGH / 13 MED / 8 LOW)
- **Fix-type categorized** for sprint dispatch: ~33 CSS-only (78%), ~9 logic-required (22%)

Deliverable artifact: `evidence/HOME_FULL_GAP_LIST.md` — 311 lines, 7 sections.

## §2 Why discovery-only?

This sprint is the **fourth stacked sprint of 2026-05-02** following the KL-070 pattern:

| Sprint | PR | Deliverable | Code? |
|---|---|---|---|
| Phase 6 ENDGAME-2-A1 | uzgplus-app #102 | V3 5 ngũ hành reactions component | YES |
| V2 UI Upgrade LIVE | uzgplus-app #106 | Syne+DM Sans + mobile shell + neutral canvas | YES |
| V2 HOME Full Audit (G001) | uzgplus-app #111 | U-Reward popup repositioning | YES |
| **V2 HOME Audit Discovery (this)** | Uniton_Shared (audit branch) | HOME_FULL_GAP_LIST.md + 12 PNGs | **NO** |

Spec §1 strict mandate: "NO code modifications — pure audit + markdown output only". Discovery serves the next 6-8 fix sprints, not this one.

## §3 Method

1. **Route discovery:** `apps/uzg-pwa/src/App.jsx` `<Route path="…">` enumeration, filtered to Lane_01 territory (HOME / Identity / Connect / Profile / Settings). Excluded Lane_02 namespaces (`/chat/*`, `/wallet/*`, `/tao/*`, `/plus*`, `/u-reward*`).
2. **Screenshot reuse:** Reused the 12 AFTER-state captures from the V2 UI Upgrade LIVE sprint (these reflect production POST PR #106 + PR #111). Avoids redundant capture cost.
3. **Per-screen gap extraction:** For each of 6 audited screens, walked the canon (HOME_SOCIAL §1-§7, FOUNDATION_OS §3-§8) against the visible UI, recorded gaps.
4. **Categorization:** Severity (CRITICAL/HIGH/MED/LOW) × Category (Position / Typography / Color / Spacing / Architecture / Interaction / Animation / Logic) × Fix type (CSS-only vs Logic-required) × ETA.
5. **Tier-bucket assignment:** Grouped gaps into 4 fix tiers ready for CLA dispatch.

## §4 G011 — the keystone architectural gap (KL-071 NEW)

V2's `/` route does NOT have a dedicated Value Stream feed component. Users land on `/identity-hub` (ENTA hub form) which is identity intelligence, not social feed. Canon §1.1 explicitly states:

> "User vào uzg.plus default landing tại HOME (Value Stream)."

**This means:** ~6 NTS-reported bugs (composer text-only, tap post no detail, 5 ngũ hành reactions misplacement, desktop layout vỡ, etc.) all trace back to **one** root cause: V2 HOME social feed is not built. PR #102 shipped 5 ngũ hành for V3 paths only — V2 paths still lack the host UI.

Tier 3 Fix-3 (estimated 4-6 h, logic auth required) is the **single highest-impact sprint** in the queue. Until that ships, several NTS-reported bugs cannot be addressed because the host UI does not exist.

## §5 KL-072 NEW — V2 backend richness mirror

V2 `productV2Service.js` exposes: `/api/v1/flow/feed`, `/api/v1/posts`, `/api/v1/posts/:id`, `/api/v1/posts/:id/comments`, `/api/v1/flow/interactions` (5 ngũ hành). The endpoints are production-tested via Sprint 5.10 + 5.11. Tier 3 Fix-3 architectural sprint can wire these directly — no V2 backend changes needed.

This mirrors KL-069 (V2 backend richer than V2 frontend exposes) and reaffirms the pattern across multiple V2 modules.

## §6 Production verification (no deploy this sprint)

This sprint deploys **no code**. Production state remains:

```
$ curl -s "https://uzg.plus/" | grep -oE 'index-[A-Za-z0-9_]+\.css'
index-DvFWmoqS.css    # post PR #111 G001 fix
$ curl -s "https://uzg.plus/" | grep -oE 'main-[A-Za-z0-9_]+\.js'
(verified at audit start, not modified)
```

No changes to production CSS/JS bundles. Audit reads only.

## §7 Recommended downstream sprint queue

| # | Sprint | Tier | ETA | Logic auth | Gaps covered |
|---|---|---|---|---|---|
| 1 | Fix-1A Typography batch | 1 | ~30 min | NO | G003 G008 G012 G018 G022 G029 (6) |
| 2 | Fix-1B Color/Spacing batch | 1 | ~45 min | NO | G005 G006 G009 G014 G015 G019 G020 G025 G028 G030 (10) |
| 3 | Fix-1C Layout positioning batch | 1 | ~45 min | NO | G004 G023 + others (4-6) |
| 4 | Fix-2A U-Reward close button | 2 | ~30 min | YES | G002 |
| 5 | Fix-2B Profile preview sheet | 2 | ~1 h | YES | G026 |
| 6 | Fix-2C Connect 4 trust levels UI | 2 | ~2-3 h | YES | G017 |
| 7 | Fix-3 HOME Value Stream feed (keystone) | 3 | ~4-6 h | YES | G011 + G013 |
| 8 | Audit-A Connect sub-lanes capture | 4 | ~1 h | NO | discovery extension |
| 9 | Audit-B Post/Profile/Compose/Search/Notifications | 4 | ~2 h | NO | discovery extension |

**Total to ship full HOME canon-aligned:** ~12-17 h across 6-8 sprints.

CLA can run these in any order, BUT recommend:
- Tier 1 first (low-risk CSS) — closes ~25 gaps in ~2 h, builds confidence
- Tier 3 next (architectural keystone) — unlocks all remaining downstream value
- Tier 2 polish + Tier 4 audit completion in parallel after Tier 3

## §8 NTS-reported bugs final-status table (after this discovery)

| NTS-reported bug | Gap ID | Status | Sprint to clear |
|---|---|---|---|
| U-Reward popup → top-right | G001 | DONE PR #111 | (cleared) |
| U-Reward close button | G002 | PENDING | Fix-2A |
| Desktop layout vỡ U balance + composer | G011 + G013 | PENDING | Fix-3 (keystone) |
| Composer chỉ text, thiếu media upload | G013 | PENDING | Fix-3 (keystone) |
| Tap post chưa mở detail | G011 + Audit-B | PENDING | Fix-3 + Audit-B |
| 5 ngũ hành chưa chuẩn V3 | V3 DONE PR #102 ; V2 depends G011 | PARTIAL | Fix-3 (keystone) |

5/6 NTS-reported bugs converge on Fix-3 (architectural keystone) or Fix-2A (logic-auth quick win). The full NTS punch-list clears with **2 fix sprints (Fix-2A + Fix-3)** plus the already-shipped G001.

## §9 KL extensions (4 ledger updates)

### KL-068 reaffirmed (4th application this sprint)
Cannot-complete IS a finding. This audit explicitly defers 12 routes (Sprint Audit-A + Audit-B) rather than fabricating coverage. Same pattern as ENDGAME-2 partial (PR #98), Phase 6.1.b authenticated infra deferred, V2 HOME Full Audit honest partial (PR #111).

### KL-070 reaffirmed (2nd application)
Stacked sprints substitute single comprehensive sprint. Today's V2 HOME comprehensive upgrade is shipping as 4 sprints (PR #102 ngũ hành + PR #106 V2 UI Upgrade + PR #111 G001 fix + this discovery audit) rather than one 12-17h mega-sprint. Each PR independently shippable + verifiable; the audit document stitches them together.

### KL-071 NEW — V2 HOME canon gap is architectural, not cosmetic
V2 `/` lacks a Value Stream feed component. Multiple NTS-reported bugs all trace to this one root cause. Tier 3 Fix-3 is the keystone sprint.

### KL-072 NEW — V2 backend richness > V2 frontend exposure (mirror of KL-069)
V2 has full feed/post/interaction endpoints production-tested. The Tier 3 architectural sprint can wire frontend without touching backend. Pattern: when frontend feels minimal, **inspect the V2 backend before building new endpoints** — they likely already exist.

## §10 Lane boundary verification

```
$ git diff main..HEAD --name-only
audits/ecosystem/uzg-plus/LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z/evidence/HOME_FULL_GAP_LIST.md
audits/ecosystem/uzg-plus/LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z/evidence/screen-list.md
audits/ecosystem/uzg-plus/LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z/evidence/screenshots/{12 PNGs}
audits/ecosystem/uzg-plus/LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z.snapshot.md
audits/ecosystem/uzg-plus/LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z.report.md
audits/ecosystem/uzg-plus/LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z.audit_log.md
```

**Audit-only.** Zero `.ts/.tsx/.jsx/.css/.js` modified. Zero `apps/uzg-pwa/` touched. KL-067 + spec §1 compliance verified.

## §11 Sign-off

Discovery Phase 1 is the prerequisite gate for the next 6-8 fix sprints. The HOME_FULL_GAP_LIST.md is canonical: every downstream fix sprint cites a gap ID from this document; every audit completion sprint extends the gap list rather than creating a new one. NTS punch-list converges on 2 follow-up sprints (Fix-2A + Fix-3) plus 2 audit-extension sprints (Audit-A + Audit-B).
