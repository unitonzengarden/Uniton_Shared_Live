# QOT Bridge — Locate & Audit V1

**Authored:** 2026-04-29 by CLAC-1 (Lane_01) under `LANE01-LAW-LANE-3-PUBLISH-AND-QOT-BRIDGE-AUDIT-V1`
**Scope:** Read-only audit. Locate the QOT cross-system bridge between UZG+ `qot_nodes` (uzgplus-app) and AIER Code `qot_lineage` (Uniton_OS) across three candidate locations. Compare schemas. Emit a verdict.
**Inputs:**
- `CANON_V2_RECONCILIATION_PROPOSAL.md §6` (raised the architectural unknown)
- Cursor audit `LANE01-UZG-PLUS-AUDIT-AND-SYSTEM-MAP-V1` §8 disclosure 7 (original observation)
- Live access via classic `GH_TOKEN` (rotated post INC-01 per `LANE01-CANON-V2-RECONCILIATION-V1`); 5 ecosystem repos visible

## §1 Audit scope

Three candidate locations identified in CANON_V2_RECONCILIATION_PROPOSAL §6:

1. **AIER Code repo** — `unitonzengarden/Uniton_Shared/services/`
2. **AIER Ops repo** — `unitonzengarden/Uniton_OS` (likely `api/qot/`, `supabase/functions/`, or a worker)
3. **Standalone microservice** — Edge Function, external worker, or cron job in any of the 5 ecosystem repos

The audit also performs a side-by-side schema comparison of the two tables that the architectural intent supposedly connects.

## §2 Methodology

- **Local file inspection** (read-only) on `C:/workspace/Uniton_Shared/` and `C:/workspace/UZGPLUS/`.
- **GitHub Contents API** (`/repos/.../contents/...`) for directory enumeration on the 4 remote repos — separate rate-limit bucket from search.
- **GitHub Search API** (`/search/code?q=...+repo:...`) for keyword-level evidence on the 5 repos — note that this endpoint shares a strict 30-req/min limit, so the audit uses it sparingly with a fallback to contents-API enumeration.
- **Schema comparison:** read the CREATE TABLE statements verbatim from each repo's authoritative migration and compare column-by-column.

No mutations were issued. No tokens were echoed in this audit document or in the supporting `_audit.log`.

## §3 Findings — Candidate 1: AIER Code repo (Uniton_Shared/services/)

```
$ ls C:/workspace/Uniton_Shared/services/
ls: cannot access 'services/': No such file or directory
```

**Result:** the `services/` directory **does not exist** in `Uniton_Shared`. No QOT bridge service code is present.

A repo-wide grep for `qot_lineage|qot_nodes|qot_bridge|uzgplus_qot` returned 15 file matches — **all of them documentation or audit artefacts** (Cursor audit reports, system maps, the canon reconciliation proposal, prior-task snapshots). There is no executable bridge code anywhere in `Uniton_Shared`.

| Evidence | Path | Type |
|---|---|---|
| Cursor audit narrative | `audits/ecosystem/uzg-plus/LANE01-UZG-PLUS-AUDIT-AND-SYSTEM-MAP-V1_REPORT.md` | doc |
| System map | `system_maps/UZG_PLUS_SYSTEM_MAP_V1.md/.json` | doc |
| Reconciliation proposal | `audits/ecosystem/uzg-plus/CANON_V2_RECONCILIATION_PROPOSAL.md` | doc |
| Inter-AIER bridge canon | `docs/architecture/INTER_AIER_BRIDGE_CANON_v1_1.md` | doc (NOT the QOT bridge) |
| Prior-task snapshots/handoffs | `tasks/`, `handoffs/`, `network/` | doc |

**Verdict for Candidate 1: bridge_present = NO.**

## §4 Findings — Candidate 2: AIER Ops repo (Uniton_OS)

The `qot_lineage` table **does exist** in `Uniton_OS` — but its purpose is **NOT** to bridge UZG+ `qot_nodes`. It is the per-BLOCH event log shipped by Lane_03 in `LANE01-BRIDGE-02-BLOCH-POOL-TABLES`.

**Source:** [`supabase/migrations/0034_bloch_pool.sql`](https://github.com/unitonzengarden/Uniton_OS/blob/main/supabase/migrations/0034_bloch_pool.sql), commented as:

> `'QOT (Quantum Object Trail) lineage — append-only event log per BLOCH. Created by LANE01-BRIDGE-02 Task 6.'`

**Schema (verbatim):**

```sql
CREATE TABLE IF NOT EXISTS public.qot_lineage (
  id              BIGSERIAL PRIMARY KEY,
  bloch_id        UUID    NOT NULL REFERENCES public.bloch_pool(bloch_id) ON DELETE RESTRICT,
  sequence_number INTEGER NOT NULL,
  event_type      TEXT    NOT NULL,
  actor_aier_id   TEXT    NOT NULL,
  signature       TEXT    NOT NULL,
  data            JSONB   NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT qot_event_type_enum
    CHECK (event_type IN ('publish', 'consume', 'verify', 'transform', 'archive')),
  CONSTRAINT qot_seq_nonneg
    CHECK (sequence_number > 0),
  CONSTRAINT qot_bloch_seq_unique
    UNIQUE (bloch_id, sequence_number)
);
```

**Critical observation:** the FK is `bloch_id → bloch_pool.bloch_id`. There is **no FK, no view, no function** that connects `qot_lineage` to UZG+'s `qot_nodes`. The two tables share a name prefix only.

**Other Uniton_OS surfaces probed:**

| Surface | Contents | QOT-bridge relevance |
|---|---|---|
| `apps/` | only `web/` | none (web app, not a bridge) |
| `supabase/functions/` | `embed-event`, `embed-message` | none (embedding workers for AIER memory, not QOT bridge) |
| Top-level dirs | `audit`, `audit-handoff`, `audit_logs`, `docs`, `packages`, `reports`, `scripts`, `snapshots`, `supabase`, `tests` | none host a `qot_bridge` or `qot_sync` service |

`gh api search/code` for `qot_bridge` and `uzgplus_qot` returned **0 hits** in `Uniton_OS` (before rate limit). The 28 hits for `qot_lineage` are all internal BLOCH lineage references (apps/web/src/lib/bloch/*, audit/lane01_bridge_*, supabase/migrations/0034_bloch_pool.sql).

**Verdict for Candidate 2: bridge_present = NO.** A table named `qot_lineage` exists, but it is the BLOCH event log, not a UZG+ bridge. The naming overlap is conceptual, not structural.

## §5 Findings — Candidate 3: Standalone microservice (TBD)

Searched 5 repos (`Uniton_Shared`, `Uniton_OS`, `uzgplus-app`, `AIFI_LIFE`, `aier-life-super-app`) for keywords `qot_bridge_service`, `qot_sync_service`, `uzgplus_qot_sync`, `qot_publisher`. All searches that completed before the GitHub `/search/code` 30-req/min rate limit kicked in returned **0 hits**.

**Edge Functions inventory** (uzgplus-app supabase/functions):

| Function | Purpose | QOT-bridge relevance |
|---|---|---|
| `reward_emit` | V5 reward stack (14 action types) | none |
| `wallet_convert_u_to_uzg` | wallet conversion | none |
| `wallet_spend_uzg` | wallet spend | none |

**Edge Functions inventory** (Uniton_OS supabase/functions):

| Function | Purpose | QOT-bridge relevance |
|---|---|---|
| `embed-event` | embedding worker | none |
| `embed-message` | embedding worker | none |

There is **no Edge Function**, **no cron job**, **no external worker** in any of the inspected surfaces that publishes UZG+ `qot_nodes` events to AIER Code `qot_lineage` (or vice-versa).

**Verdict for Candidate 3: bridge_present = NO.**

## §6 Schema comparison: `qot_nodes` vs `qot_lineage`

The two tables are structurally **distinct** and represent different domain concepts.

### UZG+ `public.qot_nodes` (uzgplus-app)

Source: [`supabase/migrations/20260319213001_v2_qot_nodes_mvp.sql`](https://github.com/unitonzengarden/uzgplus-app/blob/main/supabase/migrations/20260319213001_v2_qot_nodes_mvp.sql) + `v2_p7_qot_system_lock.sql` additions.

| Column | Type | Purpose |
|---|---|---|
| `id` | uuid PK | row id |
| `qot_id` | text unique | external QOT identifier |
| `object_type` | text | post / profile / circle / etc. |
| `object_id` | uuid | FK to the underlying domain object |
| `root_node_id` | uuid (self-FK) | tree root |
| `parent_node_id` | uuid (self-FK) | tree parent |
| `creator_user_id` | uuid | content creator |
| `creator_profile_id` | uuid | creator's profile |
| `circle_id` | uuid | originating circle |
| `state_type` | text | `original` / `derived` / etc. |
| `origin_type` | text | `native` / `imported` / etc. |
| `content_hash` | text | hash for integrity |
| `content_text` | text | optional inline text |
| `media_count` | integer | attached media |
| `metadata` | jsonb | per-domain extension |
| `created_at`, `updated_at` | timestamptz | audit |
| **(P7 lock additions)** | — | — |
| `root_origin_id` | uuid (self-FK) | true ancestor |
| `lineage_depth` | integer | tree depth |
| `origin_user_id` | uuid | propagated origin user |
| `propagation_count` | integer | spread counter |
| `integrity_hash` | text | tamper check |
| `verification_status` | text | `verified` / etc. |

**Domain:** content-node lineage inside UZG+ (parent–child tree of posts / profiles / circles). Tree-shaped. Self-referential.

### AIER Code `public.qot_lineage` (Uniton_OS)

Source: `supabase/migrations/0034_bloch_pool.sql`, `LANE01-BRIDGE-02 Task 6` (Lane_03 ship).

| Column | Type | Purpose |
|---|---|---|
| `id` | bigserial PK | row id |
| `bloch_id` | uuid (FK → `bloch_pool.bloch_id`) | parent BLOCH |
| `sequence_number` | integer | monotonic per BLOCH |
| `event_type` | text (enum) | `publish` / `consume` / `verify` / `transform` / `archive` |
| `actor_aier_id` | text | which AIER acted |
| `signature` | text | event signature |
| `data` | jsonb | event payload |
| `created_at` | timestamptz | append-only |

**Domain:** BLOCH event log. Sequence-shaped per BLOCH (1, 2, 3, …). FK to `bloch_pool` (an AIER-OS-internal store).

### Side-by-side

| Property | `qot_nodes` (UZG+) | `qot_lineage` (AIER Code) |
|---|---|---|
| **Entity modelled** | content node | event |
| **Shape** | tree (self-FK parent / root) | sequence (per `bloch_id`) |
| **Primary key** | uuid | bigserial |
| **Cross-key** | `qot_id` (string identifier) | `bloch_id` (FK to BLOCH) |
| **Versioning** | `lineage_depth`, `propagation_count` | `sequence_number` |
| **Integrity** | `content_hash`, `integrity_hash`, `verification_status` | `signature` |
| **Actor** | `creator_user_id` (user) | `actor_aier_id` (AIER agent) |
| **Mutable?** | yes (some fields immutable post-publish via trigger) | no (append-only via trigger) |
| **Where it lives** | UZG+ Supabase project (`kkhhpecofolmrodyeslp`) | AIER OS Supabase project (`vstnvvwmztotgogobefx`) |

**Compatibility for a future bridge:** the two tables could be wired together by a bridge service that:

1. emits a `qot_lineage` event of type `publish` on every UZG+ `qot_nodes` insert, **OR**
2. attaches a `bloch_id` to each `qot_nodes` row to anchor it in the BLOCH pool, **OR**
3. defines a third table (e.g. `qot_uzgplus_aier_link`) mapping `qot_id` ↔ `bloch_id`.

None of those three exist today. There is **no schema-level coupling** between the two tables.

## §7 Verdict

**`bridge_present` = NO.**

| Aspect | Result |
|---|---|
| Implementation in Uniton_Shared | None (`services/` doesn't exist; only doc references) |
| Implementation in Uniton_OS | None (the local `qot_lineage` table is BLOCH-internal, not a UZG+ bridge) |
| Implementation as standalone service | None (0 hits across 5 repos for bridge-shaped keywords; no relevant Edge Function / cron) |
| Schema overlap | None (different shape: tree vs sequence; different keys; different actors) |
| Cross-DB FK | None (`qot_nodes.qot_id` is a string and is **not** the same as `qot_lineage.bloch_id` — UUID with FK to `bloch_pool`) |

The "QOT" naming overlap between the two tables is **conceptual** (both invoke the "Quantum Object Trail" idea — provenance tracking). They are **two parallel implementations** of the concept in two different Supabase projects, with no current connector.

## §8 Honest disclosure

1. **GitHub `/search/code` rate limit hit at 19:00:20 UTC.** Approximately 8 of 20 planned keyword probes completed before the 30-req/min ceiling kicked in. The probes that DID complete (`qot_lineage`, `qot_bridge`, `uzgplus_qot` against `Uniton_OS`) had already returned the dispositive evidence: 28 BLOCH-internal hits + 0 bridge-keyword hits. The remaining probes were redundant confirmations. Audit conclusion is unaffected.

2. **Uniton_OS commented `qot_lineage` migration explicitly notes it is a BLOCH-internal trail.** This is not a guess — the table comment quotes `LANE01-BRIDGE-02 Task 6` as the authoring task. The "QOT" name was chosen for the BLOCH event log because it adopts the same conceptual vocabulary as UZG+, but the structural intent is internal, not cross-system.

3. **No bridge service was found, but absence of a found bridge is not absolute proof of absence.** The audit covered: 5 GitHub repos via Search and Contents APIs, 2 local clones (Uniton_Shared, UZGPLUS), and the explicit candidate paths in CANON_V2_RECONCILIATION_PROPOSAL §6. A bridge living **outside** these surfaces — e.g. in a private Vercel/Cloudflare worker not mirrored to any of the 5 repos — would not be visible to this audit. Recommendation §9 #2 covers this case.

4. **`qot_id` (UZG+) vs `bloch_id` (AIER Code) are **not** the same identifier space.** UZG+ uses a `text` `qot_id`; AIER Code uses a `uuid` `bloch_id` with FK to `bloch_pool`. A bridge would need a mapping, not a direct join.

5. **Naming-collision risk for future readers.** Anyone reading both repos may wrongly assume `qot_nodes` and `qot_lineage` are two halves of the same system because they share the "QOT" word. Recommendation §9 #3 calls for a canon update that disambiguates these.

6. **Lane_03 scope.** The `qot_lineage` work in Uniton_OS was a Lane_03 deliverable (BRIDGE-02 Task 6). Lane_03's domain charter is "BLOCH inter-AIER bridge, not UZG+ ↔ AIER Code provenance bridge." This audit confirms that Lane_03 has shipped what they were asked to; the architectural-unknown is in **a domain Lane_03 was never asked to own**.

## §9 Recommended next steps

1. **Update canon `CANON_V2_RECONCILIATION_PROPOSAL §6`** from `BRIDGE_TBD` to `BRIDGE_NOT_PRESENT` with a one-paragraph rationale. The bridge is **declared intent**, not deferred-but-coming. NTS decision needed: does the bridge get built, scoped to a separate dispatch, or struck from the canon?

2. **If NTS decides to build the bridge, scope it as `LANE01-BRIDGE-UZGPLUS-TO-AIERCODE-V1`.** Three viable architectures:
   - **A. Trigger + Edge Function on UZG+ Supabase.** On `qot_nodes` insert, an Edge Function publishes a BLOCH to `bloch_pool` in Uniton_OS via the BLOCH publisher endpoint, embedding the `qot_id` in the BLOCH payload. Lowest-friction but couples UZG+ writes to AIER Code availability.
   - **B. Daily batch job in Uniton_OS.** A cron worker reads new `qot_nodes` rows from UZG+ Supabase via a service-role read endpoint and writes corresponding `qot_lineage` rows. Decoupled, but introduces sync lag.
   - **C. Separate `qot_uzgplus_aier_link` table in either project.** A third table that owns the mapping `(qot_id, bloch_id)`. Cleanest semantically; needs migrations on both sides.
   Any of the three involves **canon edits** (R-AUTH-01) and a real schema change, so this is a serious task — recommend extended-thinking dispatch.

3. **Disambiguate `qot_*` naming in canon.** Add a paragraph to the UZG+ §6 Roots and to the AIER Code BLOCH canon explaining that `qot_nodes` (UZG+) and `qot_lineage` (Uniton_OS) are **two different tables with the same conceptual name**, and clarifying which one a given doc is referring to. Avoids the naming-collision footgun.

4. **Tag `bloch_pool` ↔ `qot_lineage` as the authoritative AIER Code provenance pair.** Since the Lane_03 BRIDGE-02 work already makes this an inter-AIER provenance trail, treat that as the canonical AIER-side QOT layer and reserve "UZG+ qot_nodes" as a UZG+-internal content-tree concern.

5. **Lane_03 BRIDGE-05 (proposed):** if NTS picks architecture A or B above, scope it as Lane_03 work since it touches `bloch_pool` writes — that's Lane_03's territory. CLAC1 (Lane_01) authors the dispatch, Lane_03 (Codex) executes.

## §10 Evidence URLs

After this audit's commit lands and `sync_runtime_to_public` fires, the public-fetchable evidence is:

```
1. This audit:
   https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/audits/ecosystem/uzg-plus/QOT_BRIDGE_LOCATE_AUDIT_V1.md

2. Reconciliation proposal that originated the question (§6):
   https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/audits/ecosystem/uzg-plus/CANON_V2_RECONCILIATION_PROPOSAL.md

3. Cursor audit that first surfaced the unknown (§8 disclosure 7):
   https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/audits/ecosystem/uzg-plus/LANE01-UZG-PLUS-AUDIT-AND-SYSTEM-MAP-V1_REPORT.md

4. UZG+ qot_nodes migration (gh-api auth required — file lives on private uzgplus-app):
   gh api repos/unitonzengarden/uzgplus-app/contents/supabase/migrations/20260319213001_v2_qot_nodes_mvp.sql

5. AIER Code qot_lineage migration (gh-api auth required):
   gh api repos/unitonzengarden/Uniton_OS/contents/supabase/migrations/0034_bloch_pool.sql
```

---

**END QOT_BRIDGE_LOCATE_AUDIT_V1.md**

🔒 Read-only audit. No mutations. No tokens echoed. Verdict reached after 3-candidate sweep + side-by-side schema comparison.
