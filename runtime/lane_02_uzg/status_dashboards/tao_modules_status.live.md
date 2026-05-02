# TAO Modules — Status Dashboard (LIVE)

**Last updated:** 2026-05-02 by LANE02-UZG-CANON-CONSOLIDATE-V1 (CLAC-2)
**Source of truth:** uzgplus git log + handoff_to_lane01/HANDOFF_TUVI_V2_UI_INTEGRATION.md
**Update protocol:** append-only — new sprints add status rows, no rewrites

---

## §1 — Module status

| Module | Engine | UI surface | KB | AIER bridge | Latest |
|---|---|---|---|---|---|
| Tu Vi V2 (Ziwei) | LIVE | LIVE Phase 8C | Seed Phase 1 (168) | LIVE | T-TAO-069..082 |
| Bat Tu (Bazi) | LIVE | LIVE 4 free + 2 Premium | n/a (planned) | partial | p4s5 |
| Phong Thuy | LIVE | LIVE 3 surfaces | n/a (planned) | partial | p4s5 |
| Lich Van Nien | LIVE Phase 1 + additive | LIVE | n/a | n/a | p4s6 + T-VAN-016..020 |
| AIER TAO | LIVE | LIVE Reading + 4-tier | RAG in progress | self | p4s4 |

## §2 — Sprint roll-up (most recent first)

| Date | Sprint | What landed |
|---|---|---|
| 2026-05-01 | LANE02-UZG-AIER-KB-RAG-V1 | pgvector KB + RAG retrieval + smoke tests (CURSOR-2 in flight) |
| 2026-05-01 | KB seed Phase 1 | 168 entries chinh tinh x cung (CLA-2 ship) |
| 2026-04-29 | TAO canon v1.1/v1.2 bumps | fear-UX relaxation + VN-school confirm across 8 docs |
| 2026-04-29 | Phase 8C overhaul | rings + footers + Tuan/Triet span markers |
| 2026-04-28 | p4s6 FINAL | Lich + AIER Chat + Residence + Phase 4 closure |
| 2026-04-28 | p4s5 | Bazi Premium Luck Pillars + Phong Thuy 3 surfaces |
| 2026-04-28 | p4s4 | AIER TAO Reading + 4-tier gating |
| 2026-04-27 | p4s3.1 | NAM TAO branding consistency hot-fix |
| 2026-04-27 | p4s3 | Tu Vi Full Flow PREMIUM (3 surfaces) |
| 2026-04-26 | p4s2 | Bazi 4 surfaces |
| 2026-04-26 | p4s1 | TAO shell + overview |

## §3 — Engine version registry

Per Z7 LAW (every result ships formula_version + source_authority):

| Engine | Latest version |
|---|---|
| Tu Vi computeZiweiCore | TAO-ZIWEI-CORE-1.0 |
| Tu Vi main-stars | TAO-ZIWEI-MAIN-STARS-2.0 (Phase 8B canon §7.2 Hoa 6 cuc) |
| Tu Vi cuc | TAO-ZIWEI-CUC-1.0 |
| Tu Vi palaces | TAO-ZIWEI-PALACES-1.0 |
| Tu Vi menh-than | TAO-ZIWEI-MENH-THAN-1.0 |
| Tu Vi aier context | TAO-ZIWEI-AIER-CONTEXT-1.0 |
| Bazi pillars | TAO-BAZI-PILLARS-1.0 |
| Bazi day-master | TAO-BAZI-DAY-MASTER-1.0 |
| Bazi hidden-stems | TAO-BAZI-HIDDEN-STEMS-1.0 |
| Bazi element-distribution | TAO-BAZI-ELEMENT-DISTRIBUTION-1.0 |
| Bazi ten-gods | TAO-BAZI-TEN-GODS-1.0 |
| Bazi day-master-strength | TAO-BAZI-DAY-MASTER-STRENGTH-1.0 |
| Bazi twelve-stages | TAO-BAZI-TWELVE-STAGES-1.0 |
| Bazi pillar-relations | TAO-BAZI-PILLAR-RELATIONS-1.0 |
| Bazi useful-god | TAO-BAZI-USEFUL-GOD-1.0 |
| Bazi luck-pillars | TAO-BAZI-LUCK-PILLARS-1.0 |

## §4 — Source authority chain

`SOURCE_AUTHORITY = ['TranDoan-Core', 'ENTA-CanonicalNormalization']`

Locked per Z3 + Z7 in `lib/tao/ziwei/types.js`. Vong Tu Vi NGUOC kim dong ho, Vong Thien Phu THUAN kim dong ho.

---

End of file.
