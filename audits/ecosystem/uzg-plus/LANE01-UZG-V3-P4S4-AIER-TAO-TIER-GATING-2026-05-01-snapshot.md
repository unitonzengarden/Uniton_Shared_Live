---
task_id: LANE01-UZG-V3-P4S4-AIER-TAO-TIER-GATING-2026-05-01T12-35Z
lane: Lane_01
executor: CLAC1
mode: solo
model: claude-opus-4-7
status: SUCCESS
phase: 4
sprint: 4
priority: P0 — revenue model surface
nts_verbatim: "12 cung này nhấn vào hỏi AIER TAO lý giải chi tiết, có dạng hỏi free và hỏi membership có trả phí"
prs:
  - repo: unitonzengarden/uzgplus-app
    pr: 76
    sha: 9809f077bf5ccf709310d1ac73c90594ea732f90
    note: "AIER TAO Reading + 4-tier gating; clean merge first try"
project: uzg-plus
canon_compliance:
  - section: NAM TAO 南道 branding inheritance (Sprint 4.3.1 canon §6.1)
    status: PASS
  - section: LAW 4 educational tone (no fortune-telling, no thầy-phán)
    status: PASS
  - section: Cultural framing on every reading
    status: PASS
  - section: Polite upgrade CTAs (value framing, no fear-conversion)
    status: PASS
  - section: KL-32 + KL-33 namespace separation (aier-tao-v3)
    status: PASS
  - section: DEC-04 Membership 4 tiers
    status: PASS
---

# LANE01-UZG-V3-P4S4-AIER-TAO-TIER-GATING-2026-05-01 — Snapshot

**Status:** SUCCESS (clean merge first try, no hot-fix needed)

## NTS verbatim authority
> "12 cung này nhấn vào hỏi AIER TAO lý giải chi tiết, có dạng hỏi free và hỏi membership có trả phí" — NTS, 2026-05-01

## Highlights
- 6 components dual-tree in NEW `aier-tao-v3/` namespace (separate from Lane_02 `aier/`)
- 4-tier gating system (Explorer / Seeker $9 / Builder $39 / Sovereign $69)
- 12 palace readings × 4 tiers mock data (MỆNH + NÔ BỘC showcase + 10 helper)
- New takeover route `/v3/app/tao/ziwei/reading/:palaceIndex`
- Wired Sprint 4.3 ZiweiPalaceDetailSheet "Hỏi AIER TAO lý giải cung này →" CTA
- Cap state with localStorage persistence + reset time
- Cross-module references (Bazi Seeker+ / ENTA Builder+ / Lịch Builder+) with per-ref tier gating
- 6/6 production Playwright PASS in 10.4s
- KL-028 PASS: 8/8 routes 200, 7 bundle markers verified
- KL-32 + KL-33 ENFORCED via aier-tao-v3 namespace, Lane_02 territory verified UNTOUCHED

## 4-tier gating matrix

| Tier | Reading length | Cap/day | Cross-module | Extras |
|---|---|---|---|---|
| Explorer (Free) | ~50 từ tóm tắt | 3 | All locked | Upgrade CTA |
| Seeker ($9/30d) | ~200-300 từ structured (chính tinh + phụ tinh + tứ hóa + Bazi simple + framing) | 12 | Bazi unlocked / ENTA+Lịch locked | Chat upsell |
| Builder ($39/30d) | + so sánh 3 năm Lưu niên + Đại vận hiện tại | Unlimited | All unlocked | AIER TAO chat session |
| Sovereign ($69/30d) | + expert review queue UI + PDF export | Unlimited + priority | All unlocked | Custom annual reading |

## Components

| # | Component | Lines (TSX/CSS) | Purpose |
|---|---|---|---|
| 1 | TierContentGate | 71 / 99 | Foundational reusable: tier check + cap exhaustion + upgrade CTA. Returns `<children>`, `<lockedPreview>`, or upgrade card based on userTier vs requiredTier and capRemaining. |
| 2 | CapMeter | 33 / 53 | Daily reading counter with bar fill + legend. data-component="cap-meter" data-state="active/exhausted/unlimited". Tier-aware color (purple → red on exhausted, green-purple gradient on unlimited). |
| 3 | ReadingContent | 152 / 214 | Tier-aware content renderer: FreeReading (50-từ + inline upgrade) / SeekerReadingBlock (chính tinh + phụ tinh + tứ hóa + Bazi + framing) / BuilderExtras (luu-nien-3-year + dai-van) / SovereignExtras (expert-review-queue + pdf-export). |
| 4 | CrossModuleRefs | 86 / 129 | Bazi/ENTA/Lịch links with per-ref tier requirements. data-ref + data-locked attrs. Locked refs show "Mở khóa với {tier}" + Upgrade CTA. |
| 5 | AierTaoChatLauncher | 41 / 91 | Builder+ chat session CTA. Locked variant shows tier requirement message + Upgrade Builder CTA. |
| 6 | AierTaoReadingSurface | 99 / 116 | Root composer. Top bar (NamTaoBadge medium + tier badge + close back) + hero section (cung label + name + chính tinh chip) + CapMeter + ReadingContent + CrossModuleRefs + AierTaoChatLauncher + footer note. |

## Mock data (12 palace readings × 4 tiers)

`MOCK_PALACE_READINGS` Record<number, PalaceReading>:
- Index 0 NÔ BỘC: Thiên Tướng (Đắc) — showcase chi tiết
- Index 7 MỆNH: Thái Dương (Miếu) — showcase chi tiết per spec §5.4
- Indices 1-6, 8-11: makeReading helper produces consistent structure

Cap state defaults per tier: explorer 1/3, seeker 5/12, builder 0/unlimited, sovereign 0/unlimited.

`readCapState()` reads localStorage `uzg-aier-tao-cap-state` for user-overrides (used in Playwright cap-exhausted test).

## Routes added

`src/V3App.jsx`:
- `<Route path="/app/:appName/:state/:subState/:detail" element={<V3MiniAppPage />} />`
- `<Route path="/app/:appName/:state/:subState/:detail/:detailId" element={<V3MiniAppPage />} />`

`src/pages/v3/V3MiniAppPage.jsx`:
- Imports AierTaoReadingSurface + MOCK_PALACE_READINGS + readCapState + MOCK_ZIWEI_CHART_HOA_USER + normalizeTier
- Detects appName=tao, state=ziwei, subState=reading, detail=palaceIndex → renders `<AierTaoReadingPage>` wrapper
- AierTaoReadingPage reads user + chart + cap state, looks up palace + reading, passes to AierTaoReadingSurface

`src/components/tao/TaoMiniAppShell.tsx`:
- New prop `onAierTaoNavigate?: (palaceIndex: number) => void`
- ZiweiPalaceDetailSheet onAierTaoTap calls `onAierTaoNavigate(activePalaceIndex)` then closes sheet

`src/components/tao/ziwei-v3/ZiweiPalaceDetailSheet.tsx`:
- CTA text changed "Hỏi AIER Tử Vi" → "Hỏi AIER TAO lý giải cung này →"
- Added `data-cta="aier-tao-reading"` for Playwright assertion

## PRs
| Repo | PR | Merge SHA | Merged | Notes |
|---|---|---|---|---|
| unitonzengarden/uzgplus-app | #76 | `9809f07` | 2026-05-01T13:17:35Z | AIER TAO Reading + 4-tier gating; deploy SUCCESS in ~90s |
| unitonzengarden/Uniton_Shared | TBD | TBD | TBD | 3 DOT + 5 prod screenshots |

## Verification

### Build
- `npm run build:v3`: PASS, 239 modules (+15 from Sprint 4.3.1), 3.19s
- 0 TypeScript errors, 0 ESLint errors

### Local Playwright (`tests/visual/p4s4-aier-tao.spec.mjs`)
- 6 tests:
  1. tier-explorer-renders-correct-content (~50 từ + upgrade CTA visible)
  2. tier-seeker-renders-correct-content (200-2000 chars + Bazi unlocked + ENTA locked)
  3. tier-builder-renders-correct-content (luu-nien-3-year section + dai-van section + ENTA unlocked + chat launcher CTA)
  4. tier-sovereign-renders-correct-content (expert-review-queue + PDF export CTAs)
  5. explorer-cap-exhausted-shows-upgrade (capUsed=3/capTotal=3 → cap-exhausted state visible)
  6. palace-detail-cta-navigates-to-reading (palace tap → detail sheet → AIER TAO CTA → URL contains /reading/)
- Result: **6/6 PASS in 7.5s**

### Production Playwright (`tests/visual/p4s4-aier-tao-prod.spec.mjs`)
- Same 6 tests against `https://uzg.plus`
- Result: **6/6 PASS in 10.4s**

### KL-028 production probe
| Status | Path | Type |
|---|---|---|
| 200 | /v3/app/tao/ziwei/reading/7 | NEW reading surface (MỆNH) |
| 200 | /v3/app/tao/ziwei/reading/0 | NEW reading surface (NÔ BỘC) |
| 200 | /v3/app/tao | Sprint 4.1 baseline |
| 200 | /v3/app/tao/bazi | Sprint 4.2 |
| 200 | /v3/app/tao/ziwei | Sprint 4.3 |
| 200 | /v3/enta | Pentagon 南道 |
| 200 | /v3/home | V3 baseline |
| 200 | / | V2 baseline |

Bundle markers verified in `main-BUo1jrtV.js`: `aier-tao-reading-surface`, `aier-tao-chat-launcher`, `cap-meter`, `cross-module-refs`, `expert-review-queue`, `reading-content`, `upgrade-member` (7/7 expected markers present).

## LAW 4 enforcement

- ✅ Educational tone all readings ("pattern phản chiếu", "cấu trúc tham chiếu, không phải định mệnh")
- ✅ Cultural framing on every reading (FRAMING_DEFAULT + FRAMING_GENERAL)
- ✅ Polite upgrade CTAs ("Nâng cấp Member để mở khóa", "mở khóa hiểu biết sâu", "Xem các tier khác")
- ❌ NO thầy-phán tone ("anh sẽ giàu", "chị sẽ gặp người")
- ❌ NO fortune-telling ("destiny", "fate", "auspicious days")
- ❌ NO fear-conversion ("không nâng cấp = thiếu kiến thức")

## Mirror discipline (KL-32 + KL-33 ENFORCED via namespace separation)

`aier-tao-v3/` NEW namespace SEPARATE from Lane_02 `aier/`:
- `src/components/tao/aier/` (Lane_02 — UNTOUCHED) vs `src/components/tao/aier-tao-v3/` (NEW Lane_01)
- `apps/uzg-pwa/src/components/tao/aier/` (Lane_02 — UNTOUCHED) vs `apps/uzg-pwa/src/components/tao/aier-tao-v3/` (NEW Lane_01)
- 13 files in aier-tao-v3 byte-identical between trees
- Pre-commit `git diff --cached --stat apps/.../{aier,ziwei}/` returned EMPTY

Result: First-try clean build + deploy SUCCESS, no hot-fix.

## Live mirror URL (CRSP)
`https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/audits/ecosystem/uzg-plus/LANE01-UZG-V3-P4S4-AIER-TAO-TIER-GATING-2026-05-01-report.md`

End of snapshot.
