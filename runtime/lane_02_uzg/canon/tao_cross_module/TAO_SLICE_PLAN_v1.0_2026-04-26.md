# **TAO SLICE PLAN v1.0**

## **UI-first vertical slice strategy — TAO V2 build**

---

**Document ID:** TAO_SLICE_PLAN_v1
**Version:** 1.0
**Effective Date:** 2026-04-26
**Authority Level:** Tier 3 (extends Roadmap, slice-level execution plan)
**Parent doc:** `TAO_ZIWEI_ROADMAP_v1.md`
**Issued by:** CLA-2 per NTS UI-first decision 2026-04-26
**Approved by:** NTS — Anh Tao
**Status:** ✅ APPROVED

---

## **§1 — RATIONALE**

Original Roadmap (`TAO_ZIWEI_ROADMAP_v1.md`) sequences UI to Phase 1.5 — meaning NTS sees first UI after 11 backend tasks complete (estimated 3-4 weeks).

NTS is business owner who reviews via UI — long delay before UI = risk of business/UX drift.

NTS lock 2026-04-26: *"Tôi chỉ test được sản phẩm thật khi ra UI thật biết đúng hay sai."*

→ Restructure: **UI-first vertical slices**, parallel backend.

---

## **§2 — SLICE STRATEGY**

3 slices, each ships testable UI within 1-2 weeks:

```
Slice 1 — "Hello chart"          [1-2 weeks]
  ↳ Form + Natal Chart visualization + Mock backend
  ↳ NTS test: form UX, chart visual fidelity, membership gate

Slice 2 — "Reading sections"     [1-2 weeks after Slice 1]
  ↳ Life Reading surface (7 sections) + Real backend wiring
  ↳ NTS test: reading content tone, LAW compliance, ENTA awareness

Slice 3 — "Cycle + AIER"         [1-2 weeks after Slice 2]
  ↳ Annual/Cycle reading + AIER Tao chat surface
  ↳ NTS test: timing window UX, AIER tone (REDLINE 3 — no thầy phán)

Hardening              [1 week after Slice 3]
  ↳ Performance, accessibility, cross-browser, payment flow polish
```

Total UI-first timeline: **4-7 weeks to production-ready**.

vs original sequential: 9-13 weeks before any UI.

---

## **§3 — SLICE 1 DETAIL**

### **§3.1 — UI tasks**
- T-TAO-UI-001: Slice 1 UI scaffold (Overview + Form + Natal)

### **§3.2 — Backend tasks (must align timing)**
- T-TAO-001: Calendar Engine ✅ DONE
- T-TAO-002: Input + ENTA Binding (in progress, v1.1 dispatch-ready)
- T-TAO-003: Palace + Cục Mapping (next dispatch after T-TAO-002 done)
- T-TAO-004: 14 Main Stars Placement (parallel with T-TAO-003 partly)

### **§3.3 — Slice 1 ship criteria**
- UI scaffold renders Natal chart with NTS audit fixture (mock data)
- Backend T-TAO-002 + T-TAO-003 + T-TAO-004 ready
- Wire mock → real backend (single-file swap per AC11 of T-TAO-UI-001)
- NTS sees full Natal chart for any input form submission

### **§3.4 — NTS review milestone**
NTS tests:
- Form UX (Vietnamese labels, error messages tone, missing-hour flow)
- Natal chart visual (palette, typography, palace layout, star strength colors)
- Membership gate (free demo vs member real chart)
- QOT trace icon visibility
- Redline compliance (no fate language, no fear UX, no mystical hooks)

NTS feedback → UI adjustments (component-level, fast iteration).

---

## **§4 — SLICE 2 DETAIL**

### **§4.1 — UI tasks**
- T-TAO-UI-002: Life Reading surface (7 sections per UI/UX §2.3)

### **§4.2 — Backend tasks**
- T-TAO-005: Auxiliary stars
- T-TAO-007: Tứ Hóa natal
- T-TAO-013: Life Reading engine (consumes chart_object)

### **§4.3 — Slice 2 ship criteria**
- 7 reading sections render: Tính cách, Sự nghiệp, Tài lộc, Hôn nhân, Sức khỏe, Quan hệ, Nhịp
- Each section grounded on chart evidence (palace + star references)
- Reading tone passes LAW 4 (no determinism)

### **§4.4 — NTS review milestone**
NTS tests:
- Reading tone (em/anh/chị formal Vietnamese, no thầy-phán)
- ENTA awareness (color hint per user element)
- Cross-section flow + scrolling UX
- Reading content quality (NTS as domain expert reviews content accuracy)

---

## **§5 — SLICE 3 DETAIL**

### **§5.1 — UI tasks**
- T-TAO-UI-003: Annual/Cycle reading + AIER Tao chat surface

### **§5.2 — Backend tasks**
- T-TAO-006: Lộc Tồn ring
- T-TAO-014: Annual / Cycle reading engine
- T-TAO-015: AIER Tao Context Engine

### **§5.3 — Slice 3 ship criteria**
- Annual reading shows current year (lưu niên Tứ Hóa)
- Đại vận transition awareness
- Timeline view with "windows" (no "lucky/unlucky day")
- AIER Tao chat session bound to chart_id
- AIER responses pass REDLINE 3 (no thầy-phán tone)

### **§5.4 — NTS review milestone**
NTS tests:
- Timeline window framing (LAW 5 — no fear UX)
- AIER conversation flow (50 conversation safety tests minimum)
- Cross-module integration (TAO ↔ AIER ↔ ENTA)

---

## **§6 — HARDENING PHASE**

After Slice 3, before public launch:

### **§6.1 — Performance + accessibility**
- Lighthouse 90+ (currently AC15 of T-TAO-UI-001 sets 85+ baseline)
- Mobile-first verified on iPhone SE / Android lower-end
- Keyboard navigation
- Screen reader compatibility
- Color contrast AA compliance

### **§6.2 — Payment + membership wiring**
- T-TAO-019 (Membership upgrade flow per Roadmap)
- Wallet integration (UZG → Credit conversion)
- Service hooks (booking, expert reading) — Phase 3 territory but UI prep needed

### **§6.3 — Production deployment**
- CI/CD pipeline for `apps/tao/ui/`
- Monitoring + observability hooks
- Error tracking (Sentry or equivalent)

---

## **§7 — DEPENDENCIES & PARALLELISM**

```
Track A (Backend):
T-TAO-001 ✅ → T-TAO-002 → T-TAO-003 → T-TAO-004 → T-TAO-005 → T-TAO-007 → T-TAO-013 → T-TAO-006 → T-TAO-014 → T-TAO-015

Track B (UI):
T-TAO-UI-001 (Slice 1) ─────────→ T-TAO-UI-002 (Slice 2) ───────────→ T-TAO-UI-003 (Slice 3) ───────→ Hardening

Sync points:
- Slice 1 wires real when T-TAO-002+003+004 ready
- Slice 2 wires real when T-TAO-013 ready
- Slice 3 wires real when T-TAO-014+015 ready
```

UI track can develop with mock backend in parallel — no blocking on backend completion.

---

## **§8 — RISK & MITIGATION**

| Risk | Mitigation |
|---|---|
| UI built against wrong data shape | Mock backend uses actual T-TAO-001 schema; swap = single-file change |
| NTS feedback after Slice 1 changes architecture | Slices designed orthogonal — Slice 1 changes don't break Slice 2/3 plans |
| Backend slips behind UI | UI keeps mock alive; partial real wiring possible (e.g., Natal real, Reading mock) |
| AIER Tao tone hard to get right | Slice 3 has AC for 50 conversation safety tests; iterate before NTS demo |
| Performance issues at scale | Hardening phase explicit budget for perf/a11y |

---

## **§9 — SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 | DRAFT v1.0 | 2026-04-26 |
| Approved by | NTS — Anh Tao | ✅ APPROVED (UI-first decision) | 2026-04-26 |
| Effective | — | ✅ ACTIVE | 2026-04-26 |

**END**
