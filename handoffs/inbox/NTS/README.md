# NTS Decision Inbox

**Path:** `handoffs/inbox/NTS/`
**Owner:** NTS (Kernel Human)
**Purpose:** Repo-backed inbox for Lane → NTS escalations that request an explicit NTS decision (APPROVE / REJECT / DEFER).
**Status:** ACTIVE (created 2026-04-27 by Lane_01 on first use, per `LANE01-LAWS-N7-N11-NTS-ESCALATION-V1` task)

---

## §1 When to write here

A Lane writes a message into this inbox only when:

- the matter is on the R-AUTH-01 NTS-only list (e.g. `SHARED/laws/*`, `AUTHORITY_DECLARATION.md`, `LAW_SYSTEM.md`, `REDLINES.md`, Lane registration, production deploy, secrets/finance/security, AIER kill switch, strategic direction); OR
- the matter exceeds the requesting Lane's delegated scope under any active amendment (e.g. `AMD_LANE01_CTO_AUTO_APPROVE_TECH_NON_CANON_2026-04-26 §3.1` YES/NO list); OR
- the requesting Lane has a documented reason to defer to NTS even if delegation would technically allow auto-approve (e.g. high-impact, novel scope, conflict-of-interest concern).

A Lane MUST NOT write here for items already covered by delegated Lane authority. Auto-approve-eligible items go through the standard amendment workflow (`SHARED/amendments/pending/`) and are decided by the delegated Lane — not by NTS.

---

## §2 Filename convention

```
MSG-<from_lane>-NTS-<topic>-<YYYYMMDD>-<NNN>.md
```

Examples:

- `MSG-L01-NTS-LAWS-N7-N11-APPROVAL-REQUEST-20260427-001.md`
- `MSG-L03-NTS-CRISIS-HALT-REQUEST-20260501-001.md`

Optional companion JSON (if the requesting Lane wants schema-validated structure): `MSG-...-001.json` alongside the `.md`.

---

## §3 Required content of an escalation message

Each escalation message must include:

1. **Subject** — one-line summary of the request.
2. **From / To / Date / Task ID** — basic routing metadata.
3. **Authority basis** — which rule, amendment, or law makes this NTS-only.
4. **Decision options** — typically APPROVE / REJECT / DEFER, with what each implies.
5. **Evidence** — links to packet, candidate files, cross-review responses, reports, snapshots.
6. **Boundary** — explicit list of what the Lane has NOT done (no activation, no pre-fill, no deploy, etc.).
7. **VN one-liner** — the canonical NTS-format ask (e.g. `NTS, cần approve [X]. OK hay Không?`).
8. **Suggested next task** — what happens on each NTS decision.

---

## §4 NTS response pattern

NTS responds either:

- **In chat** (and a Lane subsequently records the decision in the appropriate location, e.g. `NTS_DECISION.md` for amendment packets, `AMENDMENTS_LOG.md` row, audit log, etc.); OR
- **By writing directly into the repo** (e.g. filling `NTS_DECISION.md`, dispatching a follow-up task prompt, or pushing an explicit decision note to `handoffs/outbox/NTS/`).

Either form is authoritative. Chat-only NTS decisions must be converted into repo-backed evidence by the receiving Lane within the same task cycle.

---

## §5 Boundary on this folder

- This folder is an **inbox surface** — escalation messages written here are requests, not decisions.
- A message in this folder MUST NOT be treated as approval. Approval requires NTS explicit response per §4.
- Lanes other than NTS MUST NOT modify or delete files here once written, except for the original author appending a follow-up note in a new file.
- Files here are append-only at the folder level (R-CANON-02 spirit).

---

## §6 Cross-references

- `LAW_SYSTEM §4` — amendment workflow.
- `R-AUTH-01` — NTS-only authority for `SHARED/laws/*`.
- `AUTHORITY_DECLARATION.md §1` — NTS powers + non-delegable authorities.
- `AUTHORITY_DECLARATION.md §3.1` — Lane operating-model addenda (Lane_01 CTO scope, Lane_01 tech non-canon auto-approve delegation).
- `SHARED/architecture/aier_code_communication_spec_v_1_draft.md` — handoff lifecycle (MSG/RSP).

---

**END README — NTS decision inbox active 2026-04-27.**
