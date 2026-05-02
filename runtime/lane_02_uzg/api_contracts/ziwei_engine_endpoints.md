# TAO Engine — Endpoint and Function Inventory

**Source:** uzgplus repo (private) as of 2026-05-02
**Extracted by:** LANE02-UZG-CANON-CONSOLIDATE-V1 (CLAC-2)

---

## Architecture note

TAO module is **in-process JavaScript library** invoked from React components, not a REST microservice. The "endpoints" below are library entry points + the Next.js routes that wrap them.

For Lane_01 UI integration: import directly from `lib/tao/<module>` — no network round-trip required.

---

## Tu Vi V2 (`lib/tao/ziwei/`)

| Function / Path | Purpose | Output |
|---|---|---|
| `computeZiweiCore(profile)` | Build chart_object from normalized birth profile | chart object (see chart_object.schema.json) |
| `computeInterpretiveLayer(chart)` | Brightness, cach-cuc, dominant patterns | interpretive layer |
| `computeCycleLayers(chart, targetYear)` | Dai-van + Luu-nien + Luu-nguyet for a target year | cycle_layer |
| `lib/tao/ziwei/aier/buildAierContextPack({chart, interpretive, cycleLayer, userProfile})` | Build PII-safe context pack | context_pack (see schema) |
| `lib/tao/ziwei/aier/api-client` | Fetch AIER reading with framing | reading_object (see schema) |
| `lib/tao/ziwei/aier/output-filter` | Scrub PII + out-of-scope content from chat | filtered messages |

## Bat Tu (`lib/tao/bazi/`)

| Function | Purpose | Output |
|---|---|---|
| `computeBaziPillars(profile)` | Year/month/day/hour pillars | BaziPillars |
| `getDayMaster(pillars)` | Nhat Chu + element + polarity | DayMaster |
| `getHiddenStems(pillars)` | Tang Can per pillar | HiddenStemsMap |
| `getElementDistribution(pillars, hiddenStems)` | Weighted Ngu Hanh count | ElementDistribution |
| `getTenGods(pillars, dayMaster)` | Thap Than per pillar | TenGodsMap |
| `getDayMasterStrength(pillars, ...)` | Strength label + score | DayMasterStrength |
| `getTwelveStages(pillars)` | 12 Truong Sinh per pillar | TwelveStagesMap |
| `getPillarRelations(pillars)` | Combos + clashes + harms | PillarRelations |
| `computeUsefulGod(...)` | Dung Than analysis | UsefulGod |
| `computeLuckPillars(profile, pillars)` | Premium dai-van for Bazi | luck_pillars[] |

## Lich Van Nien (`lib/tao/calendar/vannien/`)

| Function | Purpose |
|---|---|
| `computeDailyVannien(date)` | Ngay Hoang Dao, sao tot/xau, gio Hoang Dao for a given solar date |
| `computeMonthlyVannien(year, month)` | Full month grid |

## Phong Thuy (`lib/tao/phongthuy/`)

| Function | Purpose |
|---|---|
| `computeBatTrach(birth_year, gender)` | Bat Trach 8 directions per Cung Menh |
| `computeCungMenh(birth_year, gender)` | Cung Menh classification |

## AIER Tao Cross-module (`lib/tao/aier/`)

| Function | Purpose |
|---|---|
| `cross-context-pack` | Composite context across Tu Vi + Bazi + Phong Thuy for advanced AIER readings |
| `module-resolver` | Resolve which TAO sub-engine answers a query |
| `cross-reference-rules` | Cross-module consistency rules |
| `cross-system-prompt` | System prompt assembly with module-aware framing |

## Next.js / App routes

The TAO module does NOT expose dedicated REST endpoints in `apps/uzg-pwa/src/app/api/`. Components import directly from `lib/tao`. The only API route in the repo is `api/wisdom.js` (AIER Wisdom OS — different surface).

**Implication for Lane_01:** TAO surfaces are client-side computed. Server round-trip is only required for AIER chat (which uses a separate AIER chat endpoint, not a TAO endpoint).

---

End of file.
