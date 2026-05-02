# **TAO ZIWEI BUILD TASK MAP v1 — AMENDMENT 001**

## **Add T-TAO-001-FU-01 follow-up task**

---

**Document ID:** TAO_ZIWEI_BUILD_TASK_MAP_v1_AMENDMENT_001
**Version:** Amendment to v1.0 → produces v1.0.1
**Effective Date:** 2026-04-26
**Authority Level:** Tier 3 amendment (per parent doc Amendment Rule)
**Parent doc:** `TAO_ZIWEI_BUILD_TASK_MAP_v1.md`
**Issued by:** CLA-2 (drafted per NTS adjudication of T-TAO-001 CL3)
**Approved by:** NTS — Anh Tao (2026-04-26)
**Status:** ✅ APPROVED

---

## **§1 — RATIONALE**

T-TAO-001 verify pass (2026-04-26) discovered CL3: leap-month-12 day-16+ rollover wraps to month 1 silently. This violates brief v1.1 §6.3 "no silent fallbacks" but is rare historical edge case (no AC fixture exercises it).

NTS adjudication 2026-04-26: **Accept-as-is + create follow-up task**. Rationale:
- Edge case extremely rare (leap month 12 itself rare; day 16+ within it rarer; near-zero real-world users affected)
- Fix is small (add explicit `notes[]` entry instead of silent wrap)
- Blocking T-TAO-001 over non-exercised edge case delays Phase 1 unnecessarily

This amendment registers the follow-up task formally.

---

## **§2 — NEW TASK REGISTRATION**

### **T-TAO-001-FU-01 — Leap-month-12 silent wrap fix**

- **Phase:** 1.1 (follow-up to Phase 1.1 task T-TAO-001)
- **Source:** T-TAO-001 verify report §3 CL3, brief v1.1 §6.3 "no silent fallbacks"
- **Scope:** Replace silent month-wrap behavior with explicit `notes[]` entry when leap-month-12 day exceeds canonical boundary
- **AC summary:**
  - AC1: When input falls into leap-month-12 day-16+ edge case, engine adds explicit note to `notes[]` field describing the wrap
  - AC2: `input_confidence_score` reduced to "low" for this edge case
  - AC3: New test fixture exercising the edge case (exact date TBD by CLAC-2 with calendar library research)
  - AC4: Existing 11 ACs of T-TAO-001 still pass (no regression)
- **Complexity:** S (small — localized fix in `solar-lunar.js` or `pipeline.js`)
- **Dependency:** T-TAO-001 (parent task)
- **Executor:** CLAC-2
- **Priority:** LOW (edge case, no production impact)

---

## **§3 — TASK GRAPH UPDATE**

Insert into parent doc §"TASK GRAPH (dependency view)" after T-TAO-001:

```
T-TAO-001 (Calendar) ──┬──> T-TAO-001-FU-01 (leap-12 silent wrap fix) [LOW priority]
                       │
                       └──> T-TAO-002 (Input + ENTA Binding) ──> ...
```

T-TAO-001-FU-01 is **non-blocking** for downstream tasks (T-TAO-002 etc. proceed in parallel).

---

## **§4 — DISPATCH PROTOCOL (deferred)**

Per NTS LOW priority designation, T-TAO-001-FU-01 will be dispatched when:
- Phase 1 main path (T-TAO-002 → T-TAO-012) reaches a natural pause point, OR
- A real user case surfaces leap-month-12 edge case (immediate dispatch trigger), OR
- NTS explicit dispatch order

CLAC-2 does not start T-TAO-001-FU-01 unprompted.

---

## **§5 — VERSION TRACKING**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-25 | Initial — 19 tasks T-TAO-001 through T-TAO-019 |
| v1.0.1 | 2026-04-26 | Amendment 001: add T-TAO-001-FU-01 (this doc) |

---

## **§6 — SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Drafted by | CLA-2 | DRAFT | 2026-04-26 |
| Approved by | NTS — Anh Tao | ✅ APPROVED | 2026-04-26 |
| Effective | — | ✅ ACTIVE | 2026-04-26 |

**END OF AMENDMENT 001 — APPROVED**
