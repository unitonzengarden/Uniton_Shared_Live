# LAW INDEX MASTER — Uniton Future Ecosystem

**Version:** master v1
**Initial publish:** 2026-04-29
**Maintained by:** CLA + NTS
**Source of truth:** `unitonzengarden/Uniton_Shared`
**Public mirror:** `unitonzengarden/Uniton_Shared_Live`

This index aggregates **all active LAW files** across the ecosystem. Older
group-scoped indexes live under `docs/LAW_CLA_LLM/_archive/` for audit trail.

---

## NHÓM 1 — LAW_N* (universal numbered LAWs, 13 files)

Path: `docs/LAW_CLA_LLM/SHARED/laws/`

| File | Scope | Notes |
|---|---|---|
| `LAW_N1_IDENTITY.md` | ALL | Identity / boot |
| `LAW_N2_DISCUSSION.md` | ALL | Discussion / canon talk |
| `LAW_N4_ROADMAP.md` | ALL | Roadmap / phase order |
| `LAW_N5_TASK_PROMPT.md` | CLA-1, CLA-2 | Task prompt authoring (v2 with L27-L31) |
| `LAW_N6_OS.md` | ALL | Repo / GitHub / AIER topology |
| `LAW_N7_MEMORY.md` | ALL | Memory architecture L0-L4 |
| `LAW_N8_RUNTIME.md` | ALL | Runtime / execution |
| `LAW_N9_SKILL.md` | ALL | Skill authoring + execution model |
| `LAW_N10_CAPABILITY_MATRIX.md` | ALL | Capability scope |
| `LAW_N11_BACKEND_BRIDGE.md` | ALL | Inter-AIER bridge contract |
| `LAW_N12_REPO_RUNTIME_STANDARD.md` | ALL | Repo runtime conventions |
| `LAW_N13_MULTI_REPO_AND_HANDOFFS.md` | ALL | Cross-repo + handoffs |
| `LAW_N14_INTER_AIER_BRIDGE_STANDARD_v1_1.md` | ALL | Inter-AIER bridge v1.1 |

## NHÓM 2 — LAW_SYSTEM + REDLINES (system-wide, 2 files)

Path: `docs/LAW_CLA_LLM/SHARED/laws/`

| File | Scope | Notes |
|---|---|---|
| `LAW_SYSTEM.md` | ALL | System-level coordination law |
| `REDLINES.md` | ALL | R-* redlines registry (R-AUTH, R-LANE, R-MEM, R-SEC, R-WS, R-DB, R-CANON, etc.) |

## NHÓM 3 — Topic-specific LAWs

Path: `docs/LAW_CLA_LLM/SHARED/laws/`

| File | Scope | Notes |
|---|---|---|
| `BOOT_MINIMUM.md` | ALL | Boot-minimum context |
| `LAW_GITHUB_01_REPO_GOVERNANCE.md` | ALL | GitHub repo governance |

## NHÓM 4 — LAW-NTS-LANE-* (Lane-specific LAWs, currently 3 files)

Path: `laws/` (root-level — separate from `docs/LAW_CLA_LLM/SHARED/laws/`)

| File | Scope | Date | Notes |
|---|---|---|---|
| `LAW-NTS-LANE-1_v1.md` | Lane_01 (CLA1 / CLAC1 / Cursor — Vultr 24/7) | 2026-04-30 | CTO Orchestrator Lane operating law v1.0 — DUAL workspace + DUAL executor pattern |
| `LAW-NTS-LANE-3_v1.md` | Lane_03 (AITAO / Codex) | 2026-04-29 | Backend Engineering Lane operating law v1.1 |
| `LAW-NTS-LANE-4_v1.md` | Lane_04 (Gemini + Copilot) | 2026-04-29 | Social + Real User Testing Lane operating law v1.0 (effective 2026-04-30) |

> **Phantom-prefix materialisation update 2026-04-30:** the `LAW-NTS-LANE-*` prefix phantom count: **3 of 10 materialised** (Lane_01 v1.0 + Lane_03 v1.1 + Lane_04 v1.0). Remaining 7 phantoms (Lane_02, Lane_05+, etc.) await CLA1 authoring on demand. The prefix is now firmly canonical-intended (not aspirational); Lane_01 master file consolidates 10 NHÓM 2 detail files into Lane operating doc per 4-Lane Architecture clean-up.

---

## SCOPE LEGEND

- **ALL** — every executor / strategist (CLA-1, CLA-2, CLAC-1, CLAC-2, Cursor, Codex, future LLMs)
- **CLA-1 / CLA-2** — Claude.ai web Account A (Vultr stream) / Account B (Desktop stream)
- **CLAC-1 / CLAC-2** — Claude Code on Vultr Windows Server / Desktop
- **Cursor** — Cursor IDE (any Lane)
- **Codex** — OpenAI Codex (Lane_03 executor)
- **Lane_NN** — specific Lane only (Lane_01 strategic, Lane_02 TAO/Bazi/Language, Lane_03 Backend Engineering, Lane_04 Social/Real-User — activates 2026-04-30)

---

## INTERACTION TYPE → LAW MAPPING

| When NTS does this | Load this law file |
|---|---|
| Says hi, casual chat, identity question | `LAW_N1_IDENTITY` |
| Discusses architecture, canon, whitepaper, spec, design | `LAW_N2_DISCUSSION` |
| Discusses roadmap, phase, sprint, build order | `LAW_N4_ROADMAP` |
| Says "viết task", "dispatch", "T-XXX", "prompt cho CLAC" | `LAW_N5_TASK_PROMPT` |
| Discusses repo, GitHub, AIER entity, deployment topology | `LAW_N6_OS` |
| Memory / context / brain / L0-L4 | `LAW_N7_MEMORY` |
| Runtime / heartbeat / process | `LAW_N8_RUNTIME` |
| Skill author / invoke / promote | `LAW_N9_SKILL` |
| Capability / scope / authority | `LAW_N10_CAPABILITY_MATRIX` |
| Backend bridge, BLOCH, QOT | `LAW_N11_BACKEND_BRIDGE`, `LAW_N14_INTER_AIER_BRIDGE_STANDARD_v1_1` |
| Repo runtime / conventions | `LAW_N12_REPO_RUNTIME_STANDARD` |
| Multi-repo / handoffs | `LAW_N13_MULTI_REPO_AND_HANDOFFS` |
| Lane_03 backend work | `LAW-NTS-LANE-3_v1` (NHÓM 4) + inherited universal LAW_N* |
| Any tripwire keyword | `REDLINES` (immediate HALT) |

---

## UPDATE WORKFLOW (canonical)

1. CLA proposes update → ships file in PR (e.g., `feat/lawN-update-v2`).
2. NTS approves per `R-AUTH-01` (canon edit gate).
3. CLA merges PR → file lands on `main`.
4. CLA bumps the entry in this index (version + date).
5. CLAC / Cursor / Codex auto-pull on next pre-flight; pre-existing references rewire on next read.

LAWs are append-only. Old versions live under `docs/LAW_CLA_LLM/_archive/` for audit trail. NEVER delete a LAW file (per `R-CANON-01`).

---

## ARCHIVED LAW INDEXES

For historical reference (do not load as active):

- `docs/LAW_CLA_LLM/_archive/LAW_INDEX_v1_2026-04-25.md` — pre-v2.0
- `docs/LAW_CLA_LLM/_archive/LAW_INDEX_v2_2026-04-25.md` — added L27-L31 to LAW_N5

These cover only NHÓM 1 (LAW_N1-N6) and were authored before NHÓM 2-4 were named. This master index supersedes them as the active authority.

---

## NEXT REVIEW

This index re-bumps when any of:

- A new LAW lands (NHÓM 2-4 tend to grow with Lane activation).
- A LAW version bumps (NHÓM 1 stability target — bumps signal canon evolution).
- A new NHÓM is introduced (e.g., `LAW-AIER-CODE-*` if NTS materialises that prefix).

---

**END LAW_INDEX_MASTER.md**
