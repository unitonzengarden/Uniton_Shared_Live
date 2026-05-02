# Audit Log — Append Only

**Audit ID:** LANE01-UZG-V2-TAO-BACKEND-AUDIT-PHASE5-FOUNDATION-CURSOR-2026-05-01T22-30Z

| Timestamp (UTC) | Actor | Entry |
|---|---|---|
| 2026-05-02T00:00Z approx | Executor prep | Checked `SUPABASE_URL` host `kkhhpecofolmrodyeslp.supabase.co`; credentials loaded strictly from Cursor workspace `.env.local` (**not echoed**). |
| 2026-05-02 | Discovery | Ran service-role enumeration for **≥30** Tao candidate tables (`PGRST205` ⇒ absent from PostgREST cache). Snapshot row counts logged to `evidence/tao_table_discovery.txt`. Key counts: `bazi_charts=3`, `ziwei_charts=4`, `enta_bazi_records=77`, audits (`bazi_audit_log=3`, `ziwei_audit_log=9`). |
| 2026-05-02 | Discovery | Posted `{}` probes for **≥15** candidate RPC identifiers; documented `PGRST202` false-negative risk for parameterized RPCs. Confirmed **`calc_enta_profile`** presence via authenticated-context error using typed-arg probe. ENTA-named RPC trio (`rpc_get_enta_bazi_record`, snapshot + birth-core upserts) surfaced **authentication-required** semantics under service-role anonymity. Evidence: `evidence/tao_rpc_discovery.txt`. |
| 2026-05-02 | RLS ingest | Imported Tao-related policy fragments from Backend Deep Audit `#78` raw `rls_policies_raw.txt` into `evidence/tao_rls_dump.txt`; added reference note for `enta_bazi_records_select_own` DDL origin file path (no secret material). |
| 2026-05-02 | Canon crosswalk | Compiled ≥5 drift rows aligning TAO_BAZI / TAO_ZIWEI / Vạn Niên API specs vs prod naming + presence; xref file `tao_canon_xref.txt`. |
| 2026-05-02 | Deliverables | Authored Markdown D1–D4 under `audits/ecosystem/uzg-plus/backend/` + DOT trilogy at `audits/ecosystem/uzg-plus/`. |
| 2026-05-02 | Hygiene | Ephemeral Cursor helper script **`UZGPLUS/.lane_01/scripts/tao_discovery_session.mjs`** created then **deleted pre-commit** → **no lingering secrets** inside repository diff on app workspace besides standard ignored env files untouched. |

**Blockers recorded:** NONE (B1 service key OK).

---

**END audit log**
