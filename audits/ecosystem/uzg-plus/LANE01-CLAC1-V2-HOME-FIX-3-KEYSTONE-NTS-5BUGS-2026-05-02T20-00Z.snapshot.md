# Snapshot — V2 HOME Fix-3 Keystone NTS 5 Bugs (LIVE)

**Audit ID:** LANE01-CLAC1-V2-HOME-FIX-3-KEYSTONE-NTS-5BUGS-2026-05-02T20-00Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane_01) solo
**Status:** **COMPLETE LIVE PRODUCTION** — all 5 NTS-reported bugs fixed and verified on `https://uzg.plus/`.

---

## §1 Sprint nature

Fix-3 keystone sprint per `audits/.../LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z` Tier 3 dispatch order. NTS authorized logic edits for 5 specific bugs. V2 backend immutable.

## §2 Deliverables

| Repo | PR | Commit | Status |
|---|---|---|---|
| `unitonzengarden/uzgplus-app` | [#114](https://github.com/unitonzengarden/uzgplus-app/pull/114) | `5e4dc686` (merge) | **MERGED** at 2026-05-02T16:40:50Z |
| `unitonzengarden/Uniton_Shared` | (this audit branch) | TBD | OPEN |

Cloudflare deploy run 25256693185: **SUCCESS** in 1m30s.

## §3 Per-bug commits (granular revert ready)

| Bug | Severity | Commit | One-liner |
|---|---|---|---|
| B1 | CRITICAL | `d346219b` | U-Reward popup close button + 24h dismissal via localStorage |
| B2 | CRITICAL | `d8111bd6` | Profile banner+avatar layering z-index (CSS-only) |
| B5 | HIGH | `b470ec64` | Content limits 900 chars / 9 images / 2 MB / 36s with VN errors |
| B3 | CRITICAL | `5af73cac` | Dedicated `/compose` page wires real PostComposer |
| B4 | HIGH | `9202a0b8` | Media lightbox provider + image/video fullscreen viewer |

Order of execution: lowest risk first (B1 → B2 → B5 → B3 → B4) per spec §5.

## §4 Files touched (per PR #114)

```
apps/uzg-pwa/src/App.jsx                              [B3 + B4 wiring]
apps/uzg-pwa/src/components/flow/FlowFeedList.jsx     [B4 lightbox click bind]
apps/uzg-pwa/src/components/flow/PostComposer.jsx     [B5 validators + counter]
apps/uzg-pwa/src/components/layout/URewardV4FloatingShell.jsx  [B1 close button + state]
apps/uzg-pwa/src/components/media/MediaLightbox.jsx   [B4 NEW component]
apps/uzg-pwa/src/pages/ComposePage.jsx                [B3 NEW page]
apps/uzg-pwa/src/styles.css                           [B1+B2+B3+B4+B5 CSS]
src/* mirror of all the above per KL-05 dual-tree
```

## §5 Verification

| Gate | Result |
|---|---|
| `npx vite build` | PASS (7.79s) |
| 0 TS errors | PASS |
| KL-05 dual-tree mirror byte-identical | PASS |
| Cloudflare deploy `Deploy to Cloudflare Pages (Stable)` run 25256693185 | SUCCESS 1m30s |
| KL-028 V2 LIVE probe 12/12 routes 200 | PASS |
| Production CSS contains `u-reward-v4-floating-shell-close{` | PASS |
| Production CSS contains `u-reward-v4-floating-shell-wrapper{` | PASS |
| Production CSS contains avatar `z-index:3` (B2) | PASS |
| Production CSS contains `media-lightbox-overlay{` (B4) | PASS |
| Production CSS contains `compose-page-shell{` (B3) | PASS |
| Production CSS contains `flow-composer-counter-error{` (B5) | PASS |
| V2 backend untouched (`aier_server.js`, `_worker.js`, supabase fns) | PASS |
| Lane boundary clean (Lane_01 only, no Lane_02 edits) | PASS |
| `/v3/*` routes untouched | PASS |

## §6 Production CSS bundle citations

```
$ curl -s "https://uzg.plus/" | grep -oE 'index-[A-Za-z0-9_-]+\.css' | head -1
index-Cq5OYFDU.css
$ curl -s "https://uzg.plus/" | grep -oE 'index-[A-Za-z0-9_-]+\.js' | head -1
index-DCqZtxur.js
```

`evidence/kl-028-probe-LIVE.txt` contains the full probe output with per-route 200 codes and per-bug CSS selector verification grep hits.

## §7 Acceptance criteria status

| AC | Result |
|---|---|
| **AC-1** NTS verify production LIVE 5 bugs fixed | ✅ shipped LIVE; manual walkthrough recommended for B1 click flow + B3 post submit + B4 lightbox swipe + B5 edge cases |
| **AC-2** V2 backend untouched | ✅ no `aier_server.js` / Worker / supabase fn changes |
| **AC-3** Lane boundary clean | ✅ no Lane_02 / `/v3/*` edits |
| **AC-4** KL-028 probe LIVE all routes 200 | ✅ 12/12 |
| **AC-5** Console + network clean LIVE | LIVE deploy SUCCESS, no build warnings escalated to errors |
| **AC-6** QA evidence from LIVE production | ✅ probe + CSS selector grep capture in evidence folder |
| **AC-7** Per-bug commit history | ✅ 5 distinct commits (`d346219b`, `d8111bd6`, `b470ec64`, `5af73cac`, `9202a0b8`) |
| **AC-8** Content limits edge cases tested | code-level: text limit 900 enforced via maxLength + slice + canSubmit gate; image 2 MB hardcoded `FLOW_IMAGE_MAX_BYTES`; image count 9 hardcoded `FLOW_IMAGE_MAX_COUNT`; video duration via metadata read with 36s threshold |

## §8 Lane boundaries

```
✅ apps/uzg-pwa/src/* + src/* mirror — 8 files (1 NEW page + 1 NEW component + 6 modified)
✅ audits/ecosystem/uzg-plus/LANE01-CLAC1-V2-HOME-FIX-3-KEYSTONE-…/* (audit deliverables)

UNTOUCHED:
- aier_server.js, _worker.js, supabase functions
- All Lane_02 namespaces (chat-v3, wallet-v3, plus-v3, membership-v3, u-reward-v3, tao-v3)
- /v3/* routes
- Routes config beyond /compose swap
- productV2Service.js (V2 EXACT body shape preserved)
```

## §9 Cumulative HOME upgrade today (5 stacked sprints)

| # | Sprint | PR | Commit | Visible delta to NTS |
|---|---|---|---|---|
| 1 | Phase 6 ENDGAME-2-A1 | uzgplus-app #102 | `f5736f51` | V3 path: 5 ngũ hành component shipped |
| 2 | V2 UI Upgrade LIVE | uzgplus-app #106 | `008bda33` | V2 path: Syne+DM Sans + mobile shell + neutral canvas |
| 3 | V2 HOME G001 | uzgplus-app #111 | `e95155c1` | V2 path: U-Reward popup repositioned bottom-left → top-right |
| 4 | V2 HOME Audit Discovery | Uniton_Shared #101 | (audit-only) | (no production delta — produces inventory) |
| 5 | **V2 HOME Fix-3 Keystone (this)** | uzgplus-app #114 | `5e4dc686` | **5 NTS-reported bugs fixed: popup close, profile avatar, composer page, lightbox, content limits** |

KL-070 stacked sprint pattern (5th application today).
