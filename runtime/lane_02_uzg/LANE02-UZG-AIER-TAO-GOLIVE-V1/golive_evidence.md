# LANE02-UZG-AIER-TAO-GOLIVE-V1 — Go-Live Evidence

---

## 1. Production HTTP Check

```
GET https://uzg.plus/
HTTP 200 OK
x-uzg-runtime: product-v2-pages-shell
cf-ray: 9f54449b3a93ce27-SIN
server: cloudflare
date: Sat, 02 May 2026 04:26:29 GMT
```

---

## 2. Cloudflare CI Deploy

```
Run ID: 25243707962
Workflow: Deploy to Cloudflare Pages (Stable)
Trigger: push to main (commit 25d07d3)
Status: ✅ success
Duration: 1m12s

Steps passed:
  ✓ Set up job
  ✓ Checkout
  ✓ Setup Node
  ✓ Install deps
  ✓ Build main PWA
  ✓ Build public gateway runtime
  ✓ Deploy to Cloudflare Pages
  ✓ Post Setup Node
  ✓ Post Checkout
  ✓ Complete job
```

---

## 3. Q2 Smoke Test — DB Count

```
Test: AIER TAO GO-LIVE > Q2: KB count = 168
Result: PASS (488ms)

Query:
  supabase.from('aier_kb_entries')
    .select('*', { count: 'exact', head: true })
Response:
  { count: 168, error: null }

Supabase project: kkhhpecofolmrodyeslp
Table: public.aier_kb_entries
Embedding model: text-embedding-3-small (1536 dims)
All 168 entries: ✅ with_embedding=168
```

---

## 4. DB State Snapshot (SQL evidence from LANE02-UZG-AIER-KB-RAG-V1)

```sql
SELECT COUNT(*) as total,
       COUNT(embedding) as with_embedding,
       COUNT(member_depth) as with_member_depth
FROM public.aier_kb_entries;

-- Result: {"total":168,"with_embedding":168,"with_member_depth":0}
```

Phase 1 summary-only KB. member_depth + premium_depth null pending NTS Phase 2/3 fill.

---

## 5. search_aier_kb RPC (Supabase Dashboard evidence)

RPC `public.search_aier_kb` deployed with:
- Parameters: `p_query_embedding vector(1536), p_match_count int, p_tier text, p_star_filter text, p_palace_filter text`
- Returns: `kb_id, star, palace, subject, content, depth_level, tags, similarity`
- Tier gating: explorer=summary | seeker/builder=member | sovereign=premium
- Grant: `anon, authenticated`
- Security: `security definer`

---

## 6. PR Merge Evidence

```
PR #90: https://github.com/unitonzengarden/uzgplus-app/pull/90
Title: feat(lane02): wire AIER KB RAG production [vercel skip]
Base: main | Head: feat/lane02/cursor2/aier-kb-rag-v1
State: MERGED
Merge commit: 25d07d372d5daa5ff400fb8b40e123ca2e745a19
Merged at: 2026-05-02T04:25:54Z
Strategy: squash
```

---

## 7. Skipped Tests — Root Cause (TAO_BACKEND_LANE02_DEFERRED)

```
File: src/hooks/useAierTaoChat.ts
Line 2: import { TAO_BACKEND_LANE02_DEFERRED } from '../types/taoV3';

Status: AIER Tao chat is a mock frontend implementation.
        No /api/aier/tao/chat endpoint exists in production.
        Q1/Q3/Q4/Q5 correctly skip when TEST_AUTH_TOKEN is absent.

Compliance enforcement at data layer:
  - compliance_flags in aier_kb_entries: law_4/5/redline_1/3 = true
  - search_aier_kb RPC: inherits compliance from KB entries
  - system-prompt.js: GOVERNANCE block enforces redlines at LLM level

Next action: NTS dispatch chat backend wire-up sprint.
```

---

## 8. Files Committed This Task

| File | Description |
|------|-------------|
| `supabase/migrations/20260502093001_lane02_aier_kb_rag_v1.sql` | pgvector + table + HNSW + RPC |
| `scripts/import_aier_kb_embeddings.mjs` | 168 entries import script |
| `lib/tao/ziwei/aier/context-builder.js` | RAG pipeline + tier gating |
| `tests/qa/aier-kb-rag.qa.spec.js` | Q-RAG-01..03 unit smoke |
| `tests/qa/aier-tao-golive.spec.js` | Q1..Q5 golive smoke |
