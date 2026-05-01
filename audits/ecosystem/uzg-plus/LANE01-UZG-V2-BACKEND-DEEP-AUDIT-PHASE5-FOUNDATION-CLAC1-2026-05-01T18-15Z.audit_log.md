# Audit Log — Backend Deep Audit Phase 5 Foundation

**Audit ID:** LANE01-UZG-V2-BACKEND-DEEP-AUDIT-PHASE5-FOUNDATION-CLAC1-2026-05-01T18-15Z  

---

## Timeline

| Time | Phase | Action | Result |
|---|---|---|---|
| 2026-05-01T18:15Z | Start | Branch `audit/lane01-v2-backend-deep-audit-phase5-foundation` created | ✓ |
| 2026-05-01T18:20Z | Phase A | schema_dump.mjs written | Script created |
| 2026-05-02T00:00Z | Phase A | schema_dump.mjs executed | 192 tables via OpenAPI; execute_sql returns 204 |
| 2026-05-02T00:05Z | Phase A | Alternative probes: `get_schema_tables` RPC | 200 OK — confirms 192 tables |
| 2026-05-02T00:10Z | Phase A | OpenAPI spec extracted (1.13 MB) | Full column definitions for all 192 tables |
| 2026-05-02T00:15Z | Phase A | RPC catalog extracted from OpenAPI `/rpc/` paths | 188 RPCs |
| 2026-05-02T00:20Z | Phase B | CREATE POLICY grep across 98 migration files | 161 policies, 49 tables |
| 2026-05-02T00:25Z | Phase C | RPC catalog domain classification | 11 domains, D3 written |
| 2026-05-02T00:30Z | Phase D | Edge Function source inspection (3 functions) | D4 written |
| 2026-05-02T00:35Z | Phase E | Integrity probes via REST SERVICE_ROLE | 9 invariants verified |
| 2026-05-02T00:40Z | Phase F | Canon drift analysis: live vs code assumptions | 14 drift entries |
| 2026-05-02T00:45Z | Phase G | Express endpoint grep: server/aier_server.js | 75 endpoints |
| 2026-05-02T01:00Z | Phase H | Deliverables written to Uniton_Shared | D1-D7 complete |

---

## Evidence Collected

| File | Contents |
|---|---|
| `evidence/schema_probe_log.txt` | Raw probe log including execute_sql attempts |
| `evidence/openapi_table_list.txt` | All 192 table names with column counts |
| `evidence/rpc_list.txt` | All 188 RPC names |
| `evidence/rls_policy_count.txt` | Policy count by migration file |
| `evidence/integrity_probe_results.txt` | Raw REST probe results |
| `evidence/express_endpoint_grep.txt` | Raw grep output from aier_server.js |

---

## Scope Exceptions

| Item | Expected | Actual | Reason |
|---|---|---|---|
| `execute_sql` SQL queries | Work via service role | 204 (no content) | Custom RPC blocks arbitrary SQL |
| `pg_policies` via REST | HTTP 200 | 404 | Not exposed in REST schema |
| Anonymous key probe | Should block | 401 Invalid API key | Anon key not available in .env (expected) |
| Row counts via pg_stat | Via execute_sql | Fallback REST probes | execute_sql blocked |

---

## Sign-off

- **Auditor:** CLAC1 / Lane 01
- **Deliverables:** D1-D7 complete, 3 DOT files complete, evidence directory populated
- **Branch:** `audit/lane01-v2-backend-deep-audit-phase5-foundation`
- **Status:** READY FOR PR

