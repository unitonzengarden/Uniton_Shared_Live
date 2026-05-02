# Snapshot — V2 HOME Audit (Discovery-only Phase 1)

**Audit ID:** LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane_01) solo
**Status:** **DISCOVERY COMPLETE** — pure audit + markdown output, ZERO code edits.

---

## Sprint nature

This is a **Phase 1 discovery-only sprint** continuing the KL-070 stacked sprint pattern. It produces the audit inventory feeding the next 6-8 fix sprints. **No application code modified, no PR to uzgplus-app repo**, only audit deliverables to Uniton_Shared.

## Deliverables

| Artifact | Path | Status |
|---|---|---|
| **HOME_FULL_GAP_LIST.md** (main) | `audits/ecosystem/uzg-plus/LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z/evidence/HOME_FULL_GAP_LIST.md` | ✅ |
| screen-list.md (companion) | `…/evidence/screen-list.md` | ✅ |
| 12 screenshots (mobile + desktop × 6 screens) | `…/evidence/screenshots/*.png` | ✅ |
| Snapshot (this file) | `LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z.snapshot.md` | ✅ |
| Report | `LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z.report.md` | ✅ |
| Audit log | `LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z.audit_log.md` | ✅ |

## Audit numbers (from HOME_FULL_GAP_LIST.md)

| Metric | Value |
|---|---|
| HOME-related V2 routes discovered | **28** (filtered from 80+ App.jsx routes; 18 unique destinations) |
| Screens audited via screenshots (mobile + desktop) | **6** unique = 12 PNGs |
| Total gaps catalogued | **42** |
| → CRITICAL | 6 (1 DONE — G001 PR #111) |
| → HIGH | 15 |
| → MED | 13 |
| → LOW | 8 |
| Gaps fixable CSS-only (no logic auth) | **~33 (78%)** |
| Gaps requiring logic auth | **~9 (22%)** |

Spec §3 minimums (≥6 screens, ≥30 gaps): **MET + EXCEEDED**.

## Recommended downstream sprint queue (CLA dispatch)

| Tier | Sprint | ETA | Logic auth? |
|---|---|---|---|
| 1 | Fix-1A Typography batch (G003+G008+G012+G018+G022+G029) | ~30 min | NO (CSS) |
| 1 | Fix-1B Color/Spacing batch (10 gaps) | ~45 min | NO (CSS) |
| 1 | Fix-1C Layout positioning batch (4-6 gaps) | ~45 min | NO (CSS) |
| 2 | Fix-2A U-Reward close button (G002) | ~30 min | YES |
| 2 | Fix-2B Profile preview sheet on tap avatar (G026) | ~1 h | YES |
| 2 | Fix-2C Connect 4 trust levels UI (G017) | ~2-3 h | YES |
| 3 | Fix-3 V2 HOME Value Stream feed (G011 + G013) | ~4-6 h | YES (architectural) |
| 4 | Audit-A Connect sub-lanes capture | ~1 h | NO (audit only) |
| 4 | Audit-B Post + Profile + Compose + Search + Notifications capture | ~2 h | NO (audit only) |

**Total to ship full HOME canon-aligned:** ~12-17 h across 6-8 dedicated sprints.

## Key discoveries (KL extensions)

### KL-071 NEW — V2 HOME canon gap is architectural, not cosmetic

V2's `/` redirects to `/identity-hub` (ENTA form) — there is **no dedicated HOME Value Stream feed component** mounted at any route. Canon §1.1 explicitly mandates "default landing tại HOME (Value Stream)". Without that feed component, ~6 NTS-reported bugs (composer text-only, tap post no detail, 5 ngũ hành misplacement, desktop layout vỡ) trace back to **one** root cause.

PR #102 shipped `<NguHanhBar>` for V3 paths only. V2 paths need a HOST UI to put it in. Tier 3 Fix-3 is the keystone.

### KL-072 NEW — V2 backend richness > V2 frontend exposure (mirror of KL-069)

V2's `productV2Service.js` already has `/api/v1/flow/feed`, `/api/v1/posts/:id`, `/api/v1/posts/:id/comments`. The Tier 3 architectural sprint can leverage existing V2 backend — **no V2 backend changes needed**. Pure frontend wiring.

## NTS-reported bugs status (after this audit)

| NTS-reported bug | Gap ID | Status |
|---|---|---|
| U-Reward popup top-right | G001 | **DONE PR #111** |
| U-Reward close button | G002 | PENDING (logic auth) |
| Desktop layout vỡ | G011 + G013 | PENDING (architectural) |
| Composer text-only, no media | G013 | PENDING (architectural) |
| Tap post no detail | G011 + (`/post/:id` route audit) | PENDING (architectural + Audit-B) |
| 5 ngũ hành chưa chuẩn V3 | V3: DONE PR #102 ; V2: depends G011 | PARTIAL |

## Lane boundaries (this sprint)

```
✅ audits/ecosystem/uzg-plus/LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-…/* (NEW audit deliverables)

UNTOUCHED:
- All apps/uzg-pwa/src/* (zero code changes)
- All Lane_02 namespaces
- V2 backend
- V3 paths
- Routes / routing config
```

## Verification

| Gate | Result |
|---|---|
| Code modified? | NONE (audit-only sprint) |
| Markdown deliverables present? | ✅ 3 DOT + HOME_FULL_GAP_LIST + screen-list + 12 PNGs |
| Spec §3 ≥6 screens met? | ✅ 6 screens × 2 viewports = 12 captures |
| Spec §3 ≥30 gaps met? | ✅ 42 gaps catalogued |
| Per-gap fields (ID/severity/category/desc/canon-ref/fix-type/ETA) | ✅ all 30 numbered gaps |
| Lane boundary (Lane_01 only) | ✅ all routes filtered from Lane_02 |
| KL-068 (cannot-complete IS a finding) | reaffirmed (4th application) |
| New KLs documented | KL-071 + KL-072 |
