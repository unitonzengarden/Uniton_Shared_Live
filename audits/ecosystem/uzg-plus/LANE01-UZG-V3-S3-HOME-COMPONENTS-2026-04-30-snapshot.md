# Snapshot — LANE01-UZG-V3-S3-HOME-COMPONENTS-2026-04-30

**Task ID:** `LANE01-UZG-V3-S3-HOME-COMPONENTS-2026-04-30T18-39Z`
**Date:** 2026-04-30
**Executor:** CLAC1
**Branch:** `feat/lane01-s3-home-components` (deleted after merge)
**Repo:** `unitonzengarden/uzgplus-app`
**PR:** #54 — https://github.com/unitonzengarden/uzgplus-app/pull/54
**Merge SHA:** `fad8372ba277e14b08a38dfaec522cc82de6e5a4`

---

## Components — `apps/uzg-pwa/src/components/home/` (KL-05 dual-tree primary)

| File | Purpose |
|---|---|
| `LongPressWheel.tsx` + `.module.css` + `.stories.tsx` | 5-petal NAM TAO Pentagon reaction wheel |
| `ComposeFlowSheet.tsx` + `.module.css` + `.stories.tsx` | Bottom sheet w/ element resonance + QOT toggle |
| `QOTTraceSheet.tsx` + `.module.css` + `.stories.tsx` | Bottom sheet w/ origin + lineage chain + trust score |
| `ThreadExpand.tsx` + `.module.css` + `.stories.tsx` | Inline thread expansion w/ element-bordered replies |
| `FeedItem.tsx` + `.module.css` + `.stories.tsx` | Container w/ long-press detection + element reactions |
| `hooks/useLongPress.ts` | 300ms gesture detection via pointer events |
| `hooks/useSheetAnimation.ts` | 320ms cubic-bezier(0.32, 0.72, 0, 1) spring slide-up |
| `index.ts` | Re-exports all 5 components + 2 hooks + types |

## Types

| File | Purpose |
|---|---|
| `apps/uzg-pwa/src/types/home.ts` | `Element`, re-export of all component prop types |
| `src/types/home.ts` | dual-tree mirror |

## Pentagon geometry test

| File | Result |
|---|---|
| `tests/pentagon-geometry.test.js` | **9/9 tests PASS** ✅ |

Test coverage:
- 5 element angles (Hỏa=0°, Thổ=72°, Kim=144°, Thủy=216°, Mộc=288°)
- Tương sinh order: Hỏa→Thổ→Kim→Thủy→Mộc
- Edge vertex 36° offset between elements
- Tương khắc skip-1 (5 pairs)
- Coordinate calculation per ENTA Amendment §3.1

## Dual-tree verification

`src/components/home/` byte-identical to `apps/uzg-pwa/src/components/home/` — verified `diff -r` exits 0.
`src/types/home.ts` byte-identical to `apps/uzg-pwa/src/types/home.ts` — verified `diff` exits 0.

---

## Totals

- Components: 5 (each `.tsx` + `.module.css` + `.stories.tsx`)
- Hooks: 2 (`.ts` files)
- Per tree: 18 files (15 component + 2 hook + 1 index)
- Plus types/home.ts per tree
- Pentagon geometry test: 1 (single tree, `tests/`)
- **Dual-tree total: 39 files, 4,922 insertions**

---

## Component summary

| # | Component | Tokens consumed |
|---|---|---|
| 1 | LongPressWheel | `var(--hoa)`, `var(--tho)`, `var(--kim)`, `var(--thuy)`, `var(--moc)` data; `var(--uniton-text)`, `var(--uniton-bg)` neutral |
| 2 | ComposeFlowSheet | `var(--t-primary)`, `var(--t-tint)`, `var(--t-primary-light)`, `var(--t-primary-dark)`, `var(--{element})` for chips |
| 3 | QOTTraceSheet | `var(--t-primary)`, `var(--{element})` for distribution bars + dots |
| 4 | ThreadExpand | `var(--t-primary)`, `var(--t-primary-light)`, `var(--t-primary-dark)`, `var(--{element})` for borders |
| 5 | FeedItem | `var(--t-primary)`, `var(--{element})` for badges/dots, `var(--uniton-quantum)` for QOT badge |

---

## Authority

- Task: `LANE01-UZG-V3-S3-HOME-COMPONENTS-2026-04-30T18-39Z`
- Source: Mockup #2 HOME Interaction Patterns + ENTA Canon Amendment 001 §2.1-§2.4, §3.1
- Authority: `AMD_NTS_FULL_TECH_AUTONOMY` + `R-AUTH-01`

End of snapshot.
