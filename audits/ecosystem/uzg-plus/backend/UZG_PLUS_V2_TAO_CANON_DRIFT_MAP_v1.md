# UZG+ V2 — TAO Canon ↔ Production Drift Map v1

**Audit ID:** `LANE01-UZG-V2-TAO-BACKEND-AUDIT-PHASE5-FOUNDATION-CURSOR-2026-05-01T22-30Z`  
**Date:** 2026-05-02 (UTC)

Canon refs (UZGPLUS repo Lane_01 read-only):

- `docs/00_CANON/MODULES/TAO/TAO_Documents/TAO_BAZI_IMPLEMENTATION_SPEC_v1.1_2026-04-29.md`
- `docs/00_CANON/MODULES/TAO/TAO_Documents/TAO_BAZI_SYSTEM_LAW_v1.2_2026-04-29.md`
- `docs/00_CANON/MODULES/TAO/TAO_Documents/TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.1_2026-04-29.md`
- `docs/00_CANON/MODULES/TAO/TAO_Documents/TAO_ZIWEI_CANON_OFFICIAL_v1.0_2026-04-25.md`
- `docs/00_CANON/MODULES/TAO/TAO_Documents/TAO_VANNIEN_DATA_API_v1.0_2026-04-29.md`
- `docs/00_CANON/MODULES/TAO/TAO_Documents/UZGPLUS_VANNIEN_CALENDAR_SPEC_v1.0_2026-04-29.md`

Evidence crosswalk: companion `evidence/tao_canon_xref.txt`

---

## Drift table (≥5 claims)

| # | Domain | Canon doc — claim | Production reality `kkhhpecofolmrodyeslp` | Impact |
|---:|---|---|---|---|
| 1 | Bazi persistence | IMPLEMENTATION SPEC uses conceptual `bazi_chart_object`; suggests rich machine-readable layering | Columns: `chart_object` + `summary` + **`formula_versions`** + **`algorithm_version`** on `bazi_charts`. | Sprint 5.8 uses **literal column names `chart_object`/`summary`**; map spec’s “bazi_chart_object” wording to **`chart_object` JSON**. |
| 2 | Normalized Bazi adjuncts | TASK discovery list hypothesizes **`bazi_pillars`** et al. for decomposition | **Tables absent** (PGRST205). Detail lives in **JSONB** + **`enta_bazi_records`** pillar fields. | Canonical **relational explode** pattern **not shipped** — analytics must parse JSON or ENTA pillar record. |
| 3 | Ziwei storage | SPEC §12.4.5 **Cách B** lists `ziwei_chart_palaces`, `ziwei_chart_main_stars`, … | **`ziwei_charts` JSONB-only** (+ `cycle_layers`, `interpretive_layer`); **no `ziwei_chart_*` satellite tables.** | Matches **Cách A / hybrid lite** pathway in same spec subsection — update canon appendix OR mark **Cách B** as **Roadmap deferred**. |
| 4 | Ziwei naming | Legacy / colloquial “Tử Vi” may map to **`tuvi_*`** DDL in some forks | **`tuvi_*` names absent**; canonical live name is **`ziwei_charts`**. | Client + docs must **`ziwei_` prefix**. |
| 5 | ENTA coupling | LAW docs frame TAO modular engine | **`enta_bazi_records`** (77 rows) + ENTA astro RPC dome (`rpc_*enta*`) materially **fuse** Tao birth data with ENTA runtime. | Sprint 5.8 must treat **TAO Bazi UX** & **ENTA graph** writes as **joined concern** — not isolated “TAO microservice RPC”. |
| 6 | Vạn Niên persistence | DATA API describes lookup packs + deterministic API surface (`getDayRange` etc.) | **No PostgreSQL mirror tables** for activities / calendar corpus. | Frontend **mock + static CDN JSON** acceptable until Phase 6 — document **`TAO_BACKEND_LANE02_DEFERRED`**. |
| 7 | AIER Tao memory | EXEC task implied `aier_tao_*` durable threads | **`aier_tao_threads|messages|readings` absent** | Use general AI/message stores or remain client-only until DDL lands. |

**Minimum AC (≥5 drifts)** satisfied rows: **7**.

---

### Recommended canon hygiene (non-blocking)

| Option | When |
|---|---|
| Bump **TAO_ZIWEI_IMPLEMENTATION_SPEC** amendment — mark **Cách B tables** explicitly “**Not deployed in prod 2026-05**” | Sprint 5.8 planning agrees |
| Add **TAO_SUPABASE_PHYSICAL_SCHEMA_v1** pointer table (names only) linking canon ↔ `public.*` | Reduces Lane_02 ambiguity |

---

**END — UZG_PLUS_V2_TAO_CANON_DRIFT_MAP_v1**
