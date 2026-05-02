# API Contracts — TAO module engines

**Owner:** Lane_02 (CLA-2 / CLAC-2)
**Source of truth:** JSDoc typedefs in `uzgplus/lib/tao/**/types.js`
**Extracted by:** LANE02-UZG-CANON-CONSOLIDATE-V1 (CLAC-2, 2026-05-02)
**Format:** JSON Schema Draft-07 (descriptive only — engines are JS, not TS)

---

## Files

| File | What it describes | Source |
|---|---|---|
| `chart_object.schema.json` | Tử Vi V2 + Bát Tự chart structure (output of computeZiweiCore + computeBaziPillars) | lib/tao/ziwei/types.js + lib/tao/bazi/types.js |
| `reading_object.schema.json` | AIER Tao reading response (chat output filtered) | lib/tao/ziwei/aier/output-filter.js |
| `aier_context_pack.schema.json` | Context Pack passed to AIER (PII-safe) | lib/tao/ziwei/aier/context-pack.js |
| `tier_gate_matrix.schema.json` | 4-tier gating rules (Explorer / Seeker / Builder / Sovereign) | TAO_ZIWEI canon §14 + AIER reading-framing.js |
| `ziwei_engine_endpoints.md` | Endpoint inventory (REST routes + lib functions) | apps/uzg-pwa source + lib/tao indexes |

## Important caveats

- **Schemas are descriptive, not prescriptive.** The runtime engines do not validate against these schemas at boundary. They reflect observed structure as of 2026-05-02.
- **Versioning** — every chart/reading object carries `formula_version`. The schemas accept any string, but UI should pin to the bundled engine version.
- **Privacy invariant** — context_pack MUST omit `FORBIDDEN_PII_KEYS` (see context-pack.js). Tests in `__tests__/context-pack.test.js` enforce this.

## How Lane_01 should use these

1. Treat the schemas as a stable reference for what UI components can rely on.
2. Pin to a specific engine version range — chart object is forward-compatible additive only.
3. For AIER reading rendering, use `reading_object.schema.json` field semantics; do not assume any field that's `null` is missing — null is meaningful (e.g. `day` pillar null = lunar-only mode).

## Future amendments

These contracts are append-only per R-CANON-CONSOL-06. New fields → version bump (e.g. v1 → v2 schema file, do not modify v1).
