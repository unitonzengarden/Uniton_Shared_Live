# Go-Live Blockers — Status Dashboard (LIVE)

**Last updated:** 2026-05-02 by LANE02-UZG-CANON-CONSOLIDATE-V1 (CLAC-2)
**Audience:** NTS + CLA-2 + Lane_01 + Lane_03
**Update protocol:** append-only — flip status, do not delete

---

## §1 — Foundation (per RUNTIME-AUDIT-V1)

| ID | Item | Status | Notes |
|---|---|---|---|
| C1 | profiles DDL | DONE per Sprint 5.1 (Auth + Identity Foundation, real Supabase) | Verified by p5-1 commit bfac517 |
| C2 | ANTHROPIC_API_KEY | DONE | Set per p4s4 deployment |
| C3 | member_tiers | DONE per Sprint 5.6 (PLUS Hub + Membership Hybrid integration) | Verified by p5-6 commit caa35f8 |
| C4 | AIER backend mock | DONE per Sprint 4.4 | p4s4 commit 9809f07 |

## §2 — Canon amendments queue

Per spec §3.7 reference, 4 amendments outstanding:

| Item | Owner | Target | Notes |
|---|---|---|---|
| Cuc 3 Moc canon clarification | NTS / CLA-2 | Append amendment | After Phase 8B Cuc 6 Hoa lock (already done v2.0) |
| Tieu Han algorithm | NTS / CLA-2 | Append amendment | Cycle layer extension |
| Triet algorithm cleanup | CLA-2 | Append amendment | After QA-17 Phase 8C cascade |
| Van Nien anchor canon | NTS | Append amendment | UZGPLUS_VANNIEN_CALENDAR_SPEC pending NTS canon rewrite (per file §0.1) |

## §3 — Pricing 4 tiers

Status: NTS approval pending.

Tier names locked: **Explorer < Seeker < Builder < Sovereign** (rank 0..3).

Pricing per tier: NOT YET SET. See `runtime/lane_02_uzg/tier_canon.live.md` (separate sync path) for canonical tier-feature matrix.

## §4 — Safety + QA

| Item | Status | Owner |
|---|---|---|
| 50 safety tests for AIER chat | PENDING — verify count + pass rate | CLA-2 / CLAC-2 |
| E2E Playwright for TAO surfaces | PENDING — verify post-Cloudflare deploy | CLAC-1 |
| KB Phase 2 member_depth fill | PENDING NTS / expert | NTS |
| RAG pipeline e2e | IN FLIGHT | CURSOR-2 |
| canon drift audit (this task) | DONE | CLAC-2 |

## §5 — Canon consolidation status (this task)

LANE02-UZG-CANON-CONSOLIDATE-V1 — DONE 2026-05-02.

Total published:
- 22 canonical TAO docs (Tu Vi V2 + Bat Tu + Van Nien + cross-module + strategy + sources)
- 9 deprecated archive files
- 5 API contract schemas
- 2 handoff docs to Lane_01
- 3 status dashboards (this file + tao_modules + aier_tao_kb)

Missing canon (gap report — see `canon/_MISSING_CANON.md`):
- 5 canon docs dated 2026-05-01 (USER_FLOW_SPEC, MEMBER_TIER_CANON, MODULE_ROADMAP_v2.0, AIER_TAO_ADVISOR_SPEC, LANE02_TAO_TUVI_COMPLETE_ROADMAP_v3.0)
- 3 source canons (UZG_TAO_CORE_V2 — superseded by V3, plus 2 Vietnamese school docs)

Action: NTS / CLA-2 supply via amendment append per R-CANON-CONSOL-06.

## §6 — Recent commit references

| Commit | Date | Description |
|---|---|---|
| 3c29ecb | 2026-05-02 | fix(lane02): KB to canonical sync path |
| 99bf4aa | 2026-05-02 | Sprint 5.9 Playwright FINAL 12/12 PASS post-Cloudflare deploy |
| ee83c65 | 2026-05-01 | feat(lane02/aier-kb-rag): pgvector KB + RAG retrieval + smoke tests |
| feb0fec | 2026-04-30 | p5-9: Auth UX + Settings + Profile + Follow |
| 415d19a | 2026-04-30 | p5-8: TAO Hybrid + Mock integration |

---

End of file.
