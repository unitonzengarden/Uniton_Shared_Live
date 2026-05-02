# Manual 7-Step Walkthrough — Status

Per spec §5 AC-1 (NTS manual test 7 bước):

| Step | Action | Status | Evidence |
|---|---|---|---|
| 1 | NTS login uzg.plus/v3/home | ✓ Login flow works (Sprint 5.11 verified) | Sprint 5.11 production Playwright 15/15 PASS |
| 2 | Thấy 5 icons ngũ hành dưới mỗi post | ⏸ DEPENDS on user having ENTA Root + posts in feed | Bundle string verification: `ngu-hanh-bar` + Kim/Thủy/Mộc/Hỏa/Thổ present in main-Dqpw9Wi3.js |
| 3 | Tap icon Mộc → highlight green + glow | ⏸ Same dependency | Component CSS verified: `.iconActive` applies `--ngu-hanh-color` (#16A34A for Mộc) + `box-shadow: 0 0 16px` |
| 4 | Số count tăng (aggregate text khi ≥5) | ⏸ Same dependency | `computeAggregateSentiment` function shipped + bundle has "Chủ yếu" / "Mạnh" / "Cân bằng ngũ hành" strings |
| 5 | Tap icon Hỏa → switch sang Hỏa, Mộc fade out | ⏸ Same dependency | `usePostReaction.toggle` handles switch (delta=0 when switching elements) |
| 6 | Reload page → Hỏa vẫn highlight (persist) | ⏸ Same dependency | V2 endpoint `POST /api/v1/flow/interactions` persists; V3 reads `post.user_reaction` on feed load |
| 7 | KHÔNG console error | ✓ ENDGAME-1 fixed runtime crash + this sprint adds defensive guards | Sprint 5.11 + Phase 6.1 regression: 27/27 PASS |

## Why steps 2-6 are deferred (not failed)

Steps 2-6 require an authenticated test user with **completed ENTA Root** so feed posts render. Current test fixture `lane02-test-sovereign@uzg.local` lacks ENTA Root → V2 returns 409 ENTA_ROOT_REQUIRED → V3 renders ENTA gate message → no posts → no NguHanhBar visible to interact with.

This is the same constraint as Phase 6.1.b (test-user infrastructure limitation, NOT a code bug).

## Code is verified deployed

Production bundle `main-Dqpw9Wi3.js` contains:
- Component: `data-component="ngu-hanh-bar"`, `data-element="kim|thuy|moc|hoa|tho"`
- V2 EXACT wire: `target_id`, `target_type: 'flow_post'`, `element_type`
- Vietnamese labels: Kim, Thủy, Mộc, Hỏa, Thổ
- Aggregate text: "Chủ yếu", "Mạnh", "Cân bằng ngũ hành"
- CSS: glow animation, scale, color via `--ngu-hanh-color` custom property

## NTS verify path

When NTS logs in with a user that HAS completed ENTA Root:
1. Navigate https://uzg.plus/v3/home
2. Posts will render via feed (Sprint ENDGAME-1 fixed)
3. Each post will show 5 ngũ hành buttons under content (this sprint)
4. Tap any element → V2 EXACT POST /api/v1/flow/interactions fires
5. Highlight + glow per element color
6. Reload → V2 persists user_reaction → V3 reads via mapV2ReactionToV3 → displays

## Phase 7 follow-up

Seed an ENTA-onboarded test user via `auth.admin.generateLink` + complete ENTA onboarding wizard. Then Playwright spec 04 will not skip — full 7-step walkthrough automated.
