# Snapshot — LANE01-UZG-V3-S2-FOUNDATION-COMPONENTS-2026-04-30

**Task ID:** `LANE01-UZG-V3-S2-FOUNDATION-COMPONENTS-2026-04-30T18-15Z`
**Date:** 2026-04-30
**Executor:** CLAC1
**Branch:** `feat/lane01-s2-foundation-components` (deleted after merge)
**Repo:** `unitonzengarden/uzgplus-app`
**PR:** #52 — https://github.com/unitonzengarden/uzgplus-app/pull/52
**Merge SHA:** `2205f671adc3589807ce8ab86cb677c26f0fe26c`

---

## Components — `apps/uzg-pwa/src/components/foundation/` (KL-05 dual-tree primary)

| File | Size (bytes) | SHA-256 |
|---|---|---|
| `BottomNav.tsx` | 5,209 | `6f72e31081d4f8be...` |
| `BottomNav.module.css` | 2,664 | `77cfa9a0f89dbc13...` |
| `BottomNav.stories.tsx` | 1,955 | `38f5389fc15a17f1...` |
| `TopBar.tsx` | 3,344 | `61be88ea095ce3e8...` |
| `TopBar.module.css` | 2,360 | `8d19acd5ddb9b34d...` |
| `TopBar.stories.tsx` | 1,642 | `80e50a6e5a05e0e9...` |
| `FloatingActionButton.tsx` | 563 | `96f07dfe03ca8ad7...` |
| `FloatingActionButton.module.css` | 1,148 | `a6b59675764f42b7...` |
| `FloatingActionButton.stories.tsx` | 2,703 | `d092aec80dc1a81f...` |
| `URewardPill.tsx` | 1,381 | `4d9a5cf83c26f6f8...` |
| `URewardPill.module.css` | 1,598 | `bb4d2cd935ee578f...` |
| `URewardPill.stories.tsx` | 2,380 | `9ee1bf016de6f95d...` |
| `MiniAppTakeover.tsx` | 839 | `57368f0368806ef6...` |
| `MiniAppTakeover.module.css` | 738 | `d2124e8d9528fced...` |
| `MiniAppTakeover.stories.tsx` | 1,992 | `e0d10aa14a60369b...` |
| `MiniAppTopBar.tsx` | 1,937 | `d5f5bb26365993c0...` |
| `MiniAppTopBar.module.css` | 3,000 | `b84006da1449cb3e...` |
| `MiniAppTopBar.stories.tsx` | 2,889 | `16c34a3e6bcdac9f...` |
| `AvatarMenu.tsx` | 5,542 | `44144fc8f541a0a6...` |
| `AvatarMenu.module.css` | 2,795 | `fa6e013076beee8c...` |
| `AvatarMenu.stories.tsx` | 2,608 | `27f7fbe079340d43...` |
| `index.ts` | 788 | `bff6263c97f8f6de...` |

## Types

| File | Size (bytes) | SHA-256 |
|---|---|---|
| `apps/uzg-pwa/src/types/foundation.ts` | 1,047 | `6b46b3266d787b36...` |

## Dual-tree mirror

`src/components/foundation/` and `src/types/foundation.ts` are byte-identical to `apps/uzg-pwa/src/...` paths — verified via `diff -r` (exit 0).

---

## Totals

- Components: 7 (each `.tsx` + `.module.css` + `.stories.tsx` = 21 files per tree)
- Plus `index.ts` per tree + `types/foundation.ts` per tree
- Per tree: 23 files
- Dual-tree total: 46 files
- Insertions: 3,494 lines
- Total payload size: ~50,128 bytes per tree

---

## Component summary

| # | Component | Specs | Tokens consumed |
|---|---|---|---|
| 1 | BottomNav | 5-item nav; center UZG+ tap=PLUS, long-press(300ms)=HOME | `--t-primary`, `--t-primary-dark`, `--t-glow-soft`, `--t-glow-strong`, `--t-tint` |
| 2 | TopBar | Avatar gradient + title + 3 right icons | `--t-primary-light`, `--t-primary-dark`, `--t-glow-soft`, `--t-tint`, `--uniton-text` |
| 3 | FloatingActionButton | 52px FAB w/ theme glow | `--t-primary`, `--t-primary-dark`, `--t-glow-strong` |
| 4 | URewardPill | Cross-module balance pill, earn-pulse animation | `--t-tint`, `--t-primary-light`, `--t-primary-dark`, `--t-glow-soft` |
| 5 | MiniAppTakeover | Slide-up overlay (320ms spring) sets data-takeover | `--uniton-bg` |
| 6 | MiniAppTopBar | X close + name + Governed badge + actions | `--uniton-text`, `--uniton-quantum`, `--uniton-text-muted` |
| 7 | AvatarMenu | Bottom sheet (280ms spring) shared + module-specific | `--t-primary`, `--t-tint`, `--uniton-text`, `--uniton-bg` |

---

## Authority

- Task: `LANE01-UZG-V3-S2-FOUNDATION-COMPONENTS-2026-04-30T18-15Z`
- Source: Mockup #1 Foundation OS LOCKED + Foundation Canon v1.1 §A1.1-§A1.12
- Authority: `AMD_NTS_FULL_TECH_AUTONOMY` + `R-AUTH-01`

End of snapshot.
