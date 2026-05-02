# AIER TAO KB — Status Dashboard (LIVE)

**Last updated:** 2026-05-02 by LANE02-UZG-CANON-CONSOLIDATE-V1 (CLAC-2)
**KB source:** runtime/lane_02_uzg/kb/
**RAG pipeline:** LANE02-UZG-AIER-KB-RAG-V1 (CURSOR-2 in flight)

---

## §1 — KB rollout phases

| Phase | Scope | Status | Date |
|---|---|---|---|
| Phase 1 | chinh tinh x cung (168 entries) — summary depth | DONE | 2026-05-01 |
| Phase 2 | member_depth fill — same 168 entries with member-tier interpretive depth | PENDING — needs NTS or expert input | — |
| Phase 3 | premium_depth fill — same 168 entries with premium-tier full interpretive | PENDING | — |
| Phase 4 | cach cuc patterns — special-case cuc combinations | NOT STARTED | — |
| Phase 5 | Tu Hoa (Si Hua) — Hoa Loc / Hoa Quyen / Hoa Khoa / Hoa Ki | NOT STARTED | — |
| Phase 6 | aux stars (phu tinh) — extended star library | NOT STARTED | — |
| Phase 7 | cycle layers (dai-van / luu-nien / luu-nguyet) | NOT STARTED | — |

## §2 — Phase 1 file

`runtime/lane_02_uzg/kb/KB_TUVI_CHINH_TINH_x_CUNG_v1_0_FINAL_2026-05-01.json`

- Schema: `KB_TUVI_CHINH_TINH_x_CUNG_v1_0`
- Status: `DRAFT_v1.0_summary_only_pending_NTS_review`
- 168 entries = 14 chinh tinh x 12 cung
- School: Vietnamese (Tu Vi Dau So Viet Nam)

## §3 — RAG pipeline (parallel work — CURSOR-2)

LANE02-UZG-AIER-KB-RAG-V1 in progress. Components:

- pgvector KB (Lane_03 Supabase)
- Embedding ingest from `runtime/lane_02_uzg/kb/*.json`
- Retrieval API hook into `lib/tao/ziwei/aier/api-client`
- Smoke tests (in flight)

When this lands, `reading_object.citations[]` will be populated with `kb_entry_id` + `score` per the reading schema.

## §4 — Blockers and dependencies

| Item | Owner | Blocks |
|---|---|---|
| Phase 2 member_depth content | NTS / expert | Seeker tier readings beyond summary |
| Phase 3 premium_depth content | NTS / expert | Builder + Sovereign tier full readings |
| RAG pipeline | CURSOR-2 (in flight) | KB citations in reading_object |
| 50 safety tests | CLA-2 / CLAC-2 | Production AIER readings (sign-off) |

## §5 — Where to fetch the latest KB

**Raw URL:**
```
https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/lane_02_uzg/kb/KB_TUVI_CHINH_TINH_x_CUNG_v1_0_FINAL_2026-05-01.json
```

Sync window: ~5 min from Uniton_Shared push to Live mirror.

---

End of file.
