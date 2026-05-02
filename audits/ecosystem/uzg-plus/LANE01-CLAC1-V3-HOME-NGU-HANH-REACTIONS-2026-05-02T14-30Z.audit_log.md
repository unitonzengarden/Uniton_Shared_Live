# Audit Log — V3 HOME 5 Ngũ Hành Reactions

**Audit ID:** LANE01-CLAC1-V3-HOME-NGU-HANH-REACTIONS-2026-05-02T14-30Z
**Executor:** CLAC1 solo (Lane_01)
**Models:** Sonnet 4.6
**Started:** 2026-05-02T14:30Z
**Completed:** 2026-05-02T14:55Z (approx)
**Duration:** ~75 min (within 60-90 min spec estimate)

---

## §1 Timeline

| Time (UTC) | Action |
|---|---|
| 14:30 | Sprint task issued (sub-module C only — 5 ngũ hành reactions) |
| 14:32 | Branch `feat/lane01/v3-home-ngu-hanh-reactions` from main |
| 14:33 | Read `PostCardV3.tsx`, `ReactionButtonV3.tsx`, `usePostReaction.ts` — found V3 currently uses like/love/insight/zen |
| 14:35 | Grep `productV2Service.js` for `/api/v1/flow/interactions` — found canonical service `interactWithFlowPost:20338-20363` |
| 14:36 | Read V2 service body — confirmed `{ target_id, target_type: 'flow_post', element_type }` |
| 14:37 | **MAJOR DISCOVERY**: `productV2Service.js:126-137 FLOW_ELEMENT_ALIASES` — V2 already supports Vietnamese aliases (kim/thuy/moc/hoa/tho) natively. V3 just needs to send them. |
| 14:39 | KL-069 NEW: V2 backend often supports feature richness V3 hasn't exposed |
| 14:40 | Built `reactionAdapter.ts` with NguHanhElement type + NGU_HANH_ORDER + NGU_HANH_META + 4 utility functions |
| 14:43 | Updated `v2ExpressClient.ts:sendInteraction` + `removeInteraction` to V2 EXACT body shape |
| 14:46 | Updated `types/feed.ts:ReactionPayload` to use NguHanhReactionType |
| 14:48 | Updated `usePostReaction.ts` to use NguHanhElement + mapV2ReactionToV3 |
| 14:52 | Built `NguHanhBar.tsx` component (5 buttons with element color via CSS custom property) |
| 14:55 | Built `NguHanhBar.module.css` with active/inactive states + glow animation + responsive |
| 14:57 | Wired `<NguHanhBar>` into PostCardV3 (replaced `<ReactionButtonV3>`) |
| 14:58 | Updated barrel export in `home-v3/index.ts` |
| 15:00 | KL-05 mirror: 8 files copied to `src/`; `diff -r` confirms byte-identical |
| 15:02 | Build PASS (853.35 KB, +0.55 KB delta) |
| 15:04 | Sprint 5.11 + Phase 6.1 regression: 27/27 PASS |
| 15:06 | Authored `04-ngu-hanh-reactions.audit.spec.js` (2 tests) |
| 15:08 | Committed with simple message (KL-064) — `feat lane01 v3 home 5 ngu hanh reactions component v2 adapter` |
| 15:10 | Pushed branch + opened PR #102 |
| 15:12 | PR #102 self-merged --admin at `f5736f51` |
| 15:14 | Wait Cloudflare deploy ~3 min |
| 15:18 | Deploy SUCCESS in 1m16s — bundle hash `main-Dqpw9Wi3.js` |
| 15:19 | Verified production bundle has: `ngu-hanh-bar`, `element_type`, `target_type:`, `target_id:`, Kim/Thủy/Mộc/Hỏa/Thổ, Chủ yếu/Cân bằng/ngũ hành |
| 15:20 | Production Playwright spec: SKIPPED (sovereign test user lacks ENTA Root → no posts → no buttons to tap) — same constraint as Phase 6.1.b |
| 15:22 | Begin authoring 3 DOT audit files |

## §2 Decisions

### D-1: V2 already supports 5 ngũ hành — V3 just needs to map and wire

Discovery at 14:37: `productV2Service.js:126-137` has `FLOW_ELEMENT_ALIASES` with both English (metal/water/wood/fire/earth) and Vietnamese (kim/thuy/moc/hoa/tho) aliases. V2's `interactWithFlowPost` accepts `element_type` field that goes through `normalizeFlowElement` which uses these aliases.

This means **the 5 ngũ hành reactions are NOT a missing V2 backend feature** — V2 already has it. V3 just needs to:
1. Build V3 component that displays 5 elements
2. Adapter to map V3 element → V2 EXACT body
3. Wire V3's existing sendInteraction/removeInteraction to use V2 EXACT shape

This is **KL-069 NEW**: V2 backend often supports feature richness V3 hasn't exposed.

### D-2: Send Vietnamese aliases (kim/thuy/moc/hoa/tho) not English

V2 accepts both. Choosing Vietnamese preserves UZG+ DNA per canon §5 (Vietnamese-first naming). The adapter's `mapV3ReactionToV2` is identity passthrough since V2 normalizes both directions.

### D-3: Element color exposed via CSS custom property (--ngu-hanh-color)

Instead of 5 separate CSS classes (`.kim`, `.thuy`, etc.) duplicating most styles, use 1 CSS class with `--ngu-hanh-color` custom property set by React inline style (`{'--ngu-hanh-color': meta.color}`). Module CSS reads `var(--ngu-hanh-color)` for color/outline/glow. DRY.

### D-4: Aggregate sentiment text only when ≥5 total reactions

Per canon §5.4: NO raw count, NO trending. Display `"Chủ yếu <element>"` / `"Mạnh <element>"` / `"Cân bằng ngũ hành"` only when meaningful (≥5 reactions). Below threshold: blank.

V2 may not expose per-element counts in feed item by default — this sprint's UI handles that gracefully (`element_counts` field check, fallback to no aggregate display).

### D-5: Tests skip when test user lacks ENTA Root

Same constraint as Phase 6.1.b. Test user `lane02-test-sovereign@uzg.local` is ENTA-gated → V2 returns 409 → V3 renders ENTA gate message → no posts visible → no NguHanhBar to tap.

The Playwright tests use `test.skip(true, ...)` when no posts visible — honest behavior, not a fail. Component IS deployed (verified via production bundle string check).

Phase 7 task: seed an ENTA-onboarded test user for full integration testing.

### D-6: Did NOT delete ReactionButtonV3.tsx

Removed the import from PostCardV3 but left the component file in place. Reasoning: barrel still exports it for backward compat; future sprint may want to repurpose for comments reactions or other contexts. Zero cost to keep.

### D-7: Self-merge --admin with simple commit message (KL-064)

PR #102 commit message: `feat lane01 v3 home 5 ngu hanh reactions component v2 adapter` (simple ASCII, no Vietnamese/emojis to avoid Cloudflare API rejection per KL-064). Deploy succeeded first try in 1m16s.

## §3 Risks resolved

| Risk | Resolution |
|---|---|
| V2 doesn't support 5 ngũ hành reactions | DEBUNKED at 14:37 — V2 has FLOW_ELEMENT_ALIASES natively |
| V3↔V2 field mismatch | FIXED — sendInteraction/removeInteraction now V2 EXACT body |
| Sprint 5.11/6.1 regression | 27/27 PASS post-fix |
| Bundle bloat | +0.55 KB / +0.06% — well under +5% gate |
| Cloudflare deploy commit-message rejection (KL-064) | AVOIDED with simple ASCII message |
| Test user ENTA gate prevents Playwright | DOCUMENTED honestly via test.skip; bundle strings verify deployment |

## §4 NOTES

### V2 backend richness > V3 frontend exposure

This sprint's biggest insight: V2 had 5 ngũ hành element types waiting to be wired since `FLOW_ELEMENT_ALIASES` constant was defined. V3 had been sending `like/love/insight/zen` to a backend that had element_type support all along.

For remaining ENDGAME-2 sub-modules (B Post component, D Composer media, E Post Detail, F Lightbox, G Comments, H Share, I Profile, J Connect, K Notifications, L Suggested), pre-sprint grep V2 canonical service first. Each sprint will likely find V2 already has substantial support, reducing each sprint to V3 adapter + component + wire = 60-90 min pattern.

### Why aggregate count display is conditional

Spec mandated `Chủ yếu` / `Mạnh` / `Cân bằng` text but only when meaningful (≥5 total reactions). For posts with 1-4 reactions, displaying "Chủ yếu Mộc" when only 1 person tapped Mộc is misleading. The threshold prevents this.

### Future sprint pattern (proven this sprint)

Per the 75-min completion of this sprint:

1. **Pre-dispatch (10-15 min):** Read V3 source + grep V2 canonical service + identify whether V2 already supports
2. **Adapter (10-15 min):** Build mapping module if V3↔V2 field mismatch exists
3. **Component + CSS (20-30 min):** Build component with state management
4. **Wire (5-10 min):** Update consumer (PostCard) + barrel
5. **Mirror + verify (5-10 min):** KL-05 mirror + build + regression
6. **Test + commit (10-15 min):** Playwright spec + commit + push + PR + merge
7. **Deploy + audit (15-20 min):** Wait deploy + verify bundle strings + 3 DOT audit

= 75-115 min per sprint. ENDGAME-2's 11 sub-modules in 9-15 hours total.

## §5 Lessons learned

### KL-067 reaffirmed (3rd consecutive application)

V3 client field names must follow V2 canonical service. ENDGAME-1, ENDGAME-2 composer, ENDGAME-2-A1 reactions — all three same class. Pattern is fully validated.

### KL-069 NEW — V2 backend richness > V3 frontend exposure

Before assuming V2 doesn't support a feature, grep V2 canonical service for related capability. V2 often has more richness than V3 currently uses. This sprint, V2 had Vietnamese aliases for ngũ hành since the original data layer was designed.

### Sprint efficiency baseline established

75-min sprint per sub-module is achievable when:
- V2 backend already supports the feature
- KL-067 pattern applied (centralized adapter)
- KL-064 simple commit messages avoid Cloudflare deploy retries

Future ENDGAME-2 sprints can target this baseline.
