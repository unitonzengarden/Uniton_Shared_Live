# Handoff to Lane_01 — Tu Vi V2 + TAO module UI Integration

**Owner:** Lane_02 (CLA-2)
**Audience:** Lane_01 (CLA1) — front-end ghep UI
**Issued by:** LANE02-UZG-CANON-CONSOLIDATE-V1 (CLAC-2, 2026-05-02)
**Status:** LIVE — single source of truth for cross-Lane handoff

---

## §1 — TAO modules built (engine + UI bridge LIVE)

| Module | Engine status | UI surface status | Latest sprint |
|---|---|---|---|
| Tu Vi V2 (Ziwei) | LIVE — full chart + cycle layers + AIER bridge | LIVE Phase 8C overhaul (rings + Tuan/Triet span markers) | T-TAO-069..082 |
| Bat Tu (Bazi) | LIVE — all 4 free + 2 premium engines | LIVE 4 free surfaces + 2 Premium (Sprint 4.5) | p4s5 |
| Phong Thuy | LIVE — Bat Trach + Cung Menh + 3 surfaces | LIVE 3 surfaces (Sprint 4.5) | p4s5 |
| Lich Van Nien | LIVE — daily + 28 sao + Hoang Dao | LIVE Phase 1 + additive (T-VAN-016..020) | p4s6 |
| AIER TAO | LIVE — Reading + 4-tier gating + context pack | LIVE Sprint 4.4 | p4s4 |

## §2 — Canon reference paths (LOCKED 2026-05-02)

Lane_01 MUST fetch from canonical raw URL — NEVER fork or modify.

### Tu Vi V2 canon (10 files)
- [TAO_ZIWEI_CANON_OFFICIAL_v1.0_2026-04-25.md](../canon/tao_ziwei/TAO_ZIWEI_CANON_OFFICIAL_v1.0_2026-04-25.md)
- [TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.1_2026-04-29.md](../canon/tao_ziwei/TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.1_2026-04-29.md)
- [TAO_ZIWEI_IMPLEMENTATION_SPEC_v1_AMENDMENT_001_2026-04-30.md](../canon/tao_ziwei/TAO_ZIWEI_IMPLEMENTATION_SPEC_v1_AMENDMENT_001_2026-04-30.md)
- [TAO_ZIWEI_FORMULA_REFERENCE_v1.0_2026-04-29.md](../canon/tao_ziwei/TAO_ZIWEI_FORMULA_REFERENCE_v1.0_2026-04-29.md)
- [TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.0_2026-04-25.md](../canon/tao_ziwei/TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.0_2026-04-25.md)
- [TAO_ZIWEI_SYSTEM_LAW_v1.1_2026-04-29.md](../canon/tao_ziwei/TAO_ZIWEI_SYSTEM_LAW_v1.1_2026-04-29.md) — fear-UX relaxation + VN-school
- [TAO_ZIWEI_UI_UX_CANON_v1.1_2026-04-29.md](../canon/tao_ziwei/TAO_ZIWEI_UI_UX_CANON_v1.1_2026-04-29.md) — **PRIMARY UI REFERENCE**
- [TAO_ZIWEI_BUILD_TASK_MAP_v1.0_2026-04-25.md](../canon/tao_ziwei/TAO_ZIWEI_BUILD_TASK_MAP_v1.0_2026-04-25.md)
- [TAO_ZIWEI_BUILD_TASK_MAP_v1_AMENDMENT_001_2026-04-26.md](../canon/tao_ziwei/TAO_ZIWEI_BUILD_TASK_MAP_v1_AMENDMENT_001_2026-04-26.md)
- [TAO_ZIWEI_ROADMAP_v1.0_2026-04-25.md](../canon/tao_ziwei/TAO_ZIWEI_ROADMAP_v1.0_2026-04-25.md)

### Bat Tu canon (7 files)
See `runtime/lane_02_uzg/canon/tao_bazi/`. **Primary UI reference:** TAO_BAZI_UI_UX_CANON_v1.1_2026-04-29.md.

### Lich Van Nien canon (3 files)
See `runtime/lane_02_uzg/canon/tao_vannien/`.

### Strategy + Index
- [LANE02_TAO_DOCUMENT_INDEX_v1.1_2026-04-29.md](../canon/strategy/LANE02_TAO_DOCUMENT_INDEX_v1.1_2026-04-29.md) — master canon registry
- [LANE02_FILE_NAMING_STANDARD_v2.0_2026-04-29.md](../canon/strategy/LANE02_FILE_NAMING_STANDARD_v2.0_2026-04-29.md)

## §3 — V3 UI overhaul reference points

Phase 8C UI overhaul (T-TAO-069..082) has shipped. Key UI canons Lane_01 must respect:

1. **TAO_ZIWEI_UI_UX_CANON_v1.1** §6 — palace cell layout, ring directions (Tu Vi NGUOC kim dong ho, Thien Phu THUAN kim dong ho)
2. **NAM TAO branding** — see `apps/uzg-pwa/src/components/tao/NamTaoBadge.tsx` + `UZG_PLUS_V3_NAM_TAO_BRANDING_CANON_v1.md`
3. **Cycle layer rendering** — Tuan/Triet span markers per Phase 8C QA-16 + QA-17 cascade
4. **fear-UX relaxation** (LAW v1.1) — soften phrasing, no "death" framing in chat output

## §4 — User flow reference

Per spec: `TAO_ZIWEI_USER_FLOW_SPEC_v1.0_2026-05-01.md` is referenced but **NOT YET PUBLISHED** (see `runtime/lane_02_uzg/canon/_MISSING_CANON.md`). Lane_01 should:
- Use observed flow from current uzgplus implementation as interim
- Re-fetch INDEX.live.md when CLA-2 ships USER_FLOW_SPEC

Components currently driving the flow:
- `ZiweiCreateSurface.jsx` -> `ZiweiBirthInputForm.jsx` -> `ZiweiInputWizard.tsx` (V3)
- `ZiweiNatalChartSurface.jsx` (chart view) -> `ZiweiPalaceDetailSheet.jsx` (palace detail)
- `ZiweiReadingPanel.jsx` (AIER chat surface)
- `ZiweiCycleLegend.jsx` + `ZiweiYearSelector.jsx` + `ZiweiTuanTrietOverlay.jsx` (cycle layers)

## §5 — 4-tier gating

Source: TAO_ZIWEI canon §14 + `lib/tao/ziwei/aier/reading-framing.js` + tier_gate_matrix.schema.json.

Tiers (rank 0..3): **Explorer < Seeker < Builder < Sovereign**

| Surface | Explorer | Seeker | Builder | Sovereign |
|---|---|---|---|---|
| Tu Vi natal chart | view | view | view | view |
| Interpretive layer | summary | summary | full | full |
| Cycle layers | none | current_year | current_dai_van | full |
| AIER chat | n/a | limited | unlimited member | unlimited premium |
| KB depth | summary | member | premium | premium |
| Bat Tu free | 4 surfaces | 4 | 4 | 4 |
| Bat Tu premium | locked | locked | unlocked | unlocked |
| Phong Thuy 3 surfaces | locked | locked | unlocked | unlocked |

UI gate component: read tier from auth context, fall back to Explorer if null. Schema: `runtime/lane_02_uzg/api_contracts/tier_gate_matrix.schema.json`.

## §6 — NAM TAO 南道 branding

Per Sprint 4.3.1 hot-fix (commit 9aa1375), NAM TAO branding is consistency-locked.

Files Lane_01 must respect:
- `UZG_PLUS_V3_NAM_TAO_BRANDING_CANON_v1.md` (lives in `AIER_Code/Lane_02/canon/uzg-plus/uiux/v3/` — Lane_01 UI canon zone, not consolidated here)
- Component: `apps/uzg-pwa/src/components/tao/NamTaoBadge.tsx`

## §7 — API contracts (engine boundaries)

Lane_01 should treat the following as stable contracts:

- [chart_object.schema.json](../api_contracts/chart_object.schema.json) — output of computeZiweiCore + computeBaziPillars
- [reading_object.schema.json](../api_contracts/reading_object.schema.json) — AIER chat response
- [aier_context_pack.schema.json](../api_contracts/aier_context_pack.schema.json) — context pack (PII-safe)
- [tier_gate_matrix.schema.json](../api_contracts/tier_gate_matrix.schema.json) — 4-tier gating
- [ziwei_engine_endpoints.md](../api_contracts/ziwei_engine_endpoints.md) — function inventory

**Note:** TAO is in-process JS, not REST. Lane_01 imports `lib/tao/*` directly — no network calls for chart compute. AIER chat IS a network call (separate AIER endpoint).

## §8 — KB seed (RAG)

Phase 1 KB seed published: `runtime/lane_02_uzg/kb/KB_TUVI_CHINH_TINH_x_CUNG_v1_0_FINAL_2026-05-01.json` (168 entries — 14 chinh tinh x 12 cung).

Phase 2+ pending — see `status_dashboards/aier_tao_kb_status.live.md`.

CURSOR-2 is shipping LANE02-UZG-AIER-KB-RAG-V1 in parallel — RAG retrieval + pgvector. When that lands, AIER readings will cite KB entries (`reading_object.citations[]`).

## §9 — What Lane_01 should do next

1. Fetch `runtime/lane_02_uzg/INDEX.live.md` from Live mirror at session start
2. Load TAO_ZIWEI_UI_UX_CANON_v1.1 + tier_gate_matrix.schema.json as primary references
3. Build/maintain UI surfaces that consume `chart_object` and render per UI/UX canon §6
4. For AIER chat, render `reading_object` per schema; respect tier-gated depth
5. Watch INDEX.live.md for new amendments (R-CANON-CONSOL-06 — append-only)

---

End of file.
