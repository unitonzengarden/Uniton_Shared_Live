# **LANE02 FILE NAMING STANDARD v2.0**

## **File naming + version management protocol — TAO module scope (Lane_02 project knowledge)**

---

**Document ID:** LANE02_FILE_NAMING_STANDARD_v2
**Version:** 2.0
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge — meta document)
**Authority Level:** Tier 0 — protocol/registry, no business logic
**Issued by:** CLA-2 (Lane_02)
**Approved by:** NTS — Anh Tao (per ask_user_input_v0 confirmation 2026-04-29)
**Scope:** TAO module only (TAO_*, UZGPLUS_VANNIEN_*, LANE02_TAO_*, LANE02_FILE_NAMING_*)
**Status:** ✅ ACTIVE — binding for CLA-2 from this turn forward

---

## **§0 — WHY THIS DOCUMENT EXISTS**

NTS observation 2026-04-29: "*Mỗi lần tạo file mới, tôi không biết đâu là file mới đâu là file cũ, bản thân CLA không có ghi phiên bản, ngày giờ... cứ tạo file tên y chang cũ.*"

**Root cause:** CLA-2 đã không thiết kế file naming convention cho người **no-tech** quản lý. Files cùng tên trùng lặp giữa các turn → NTS không phân biệt được file mới/cũ → repo loạn.

**Solution:** Naming standard mới + version+date trong tên file. NTS nhìn tên là biết file mới hay cũ ngay lập tức.

**Trade-off được NTS chấp nhận (per choice 2026-04-29 option I):**
- Cross-references trong file (`Parent docs:`, `Companion:`, etc.) sẽ broken khi file rename
- CLA-2 sẽ update cross-references when build phase starts (CLAC-2 implementation)
- Apply scope minimal — TAO module only — để minimize side effects

---

## **§1 — FILE NAMING CONVENTION**

### **§1.1 — Standard format**

```
<DOCUMENT_ID>_v<MAJOR>.<MINOR>_<YYYY-MM-DD>.md
```

**Components:**
- `<DOCUMENT_ID>` = Snake_Case_uppercase identifier (existing canonical IDs preserved)
- `<MAJOR>` = integer, increment for substantive changes (e.g., school lock, fear-UX rewrite)
- `<MINOR>` = integer, increment for patches/clarifications/typos
- `<YYYY-MM-DD>` = ISO 8601 date when this version was approved by NTS

### **§1.2 — Examples**

| Old name (v1.x) | New name (v2.0 standard) |
|---|---|
| `TAO_BAZI_SYSTEM_LAW_v1.md` | `TAO_BAZI_SYSTEM_LAW_v1.2_2026-04-29.md` |
| `TAO_ZIWEI_SYSTEM_LAW_v1.md` | `TAO_ZIWEI_SYSTEM_LAW_v1.1_2026-04-29.md` |
| `TAO_BAZI_PHONGTHUY_REFERENCE_v1.md` | `TAO_BAZI_PHONGTHUY_REFERENCE_v1.1_2026-04-29.md` |
| `TAO_ZIWEI_CANON_OFFICIAL_v1.md` | `TAO_ZIWEI_CANON_OFFICIAL_v1.0_2026-04-25.md` |

### **§1.3 — Special cases**

**Amendment files:**
```
<DOCUMENT_ID>_v<MAJOR>_AMENDMENT_<NNN>_<YYYY-MM-DD>.md
```
Example: `TAO_ZIWEI_BUILD_TASK_MAP_v1_AMENDMENT_001_2026-04-25.md`

**Deprecated files (archived):**
```
<DOCUMENT_ID>_v<X>_DEPRECATED_<YYYY-MM-DD>.md
```
Example: `TAO_BAZI_SYSTEM_LAW_v1.0_DEPRECATED_2026-04-29.md`

**Index files (specially-named per Lane_02 convention):**
```
LANE02_<INDEX_TYPE>_v<MAJOR>.<MINOR>_<YYYY-MM-DD>.md
```
Example: `LANE02_TAO_DOCUMENT_INDEX_v1.1_2026-04-29.md`

---

## **§2 — VERSION BUMP RULES**

### **§2.1 — When to bump MAJOR (e.g., v1 → v2)**

- Substantive policy change (e.g., NTS school lock — Tết vs Lập Xuân)
- Major feature addition or removal
- Breaking changes to logic
- Reformulation of laws/redlines

### **§2.2 — When to bump MINOR (e.g., v1.1 → v1.2)**

- Fear-UX relaxation (relaxing existing rules)
- Adding clarifications/explanations
- Adding new examples
- Fixing typos
- Reformatting tables for clarity

### **§2.3 — When NOT to bump version**

- Pure copy-paste move (e.g., file moved to subdirectory)
- Whitespace-only changes
- Comment updates (non-substantive)

---

## **§3 — DATE CONVENTIONS**

### **§3.1 — `<YYYY-MM-DD>` format**

ISO 8601 — no exceptions. Reasons:
- Sortable alphabetically (file explorer auto-sorts by name)
- Locale-neutral (no Vietnamese vs English ambiguity)
- 4-digit year (no Y2K-style ambiguity)

### **§3.2 — Date selection**

The date in filename = **date NTS approved the version**, NOT date CLA-2 wrote it.

If NTS hasn't approved yet:
- File status = `DRAFT`
- Filename uses date-of-ship: `TAO_BAZI_SYSTEM_LAW_v1.2_2026-04-29.md`
- After NTS approval, if same day → no rename needed
- If approval comes later day → CLA-2 rename to approval date

---

## **§4 — ARCHIVE PROTOCOL**

### **§4.1 — When file gets new version, OLD version moves to archive**

**Required by NTS Core Law: "History is append-only" — never delete.**

**Process:**
1. File `TAO_BAZI_SYSTEM_LAW_v1.1_2026-04-29.md` exists
2. NTS approves new v1.2 with changelog
3. CLA-2 ships `TAO_BAZI_SYSTEM_LAW_v1.2_2026-04-29.md`
4. NTS moves OLD file to `_archive/` folder, rename: `TAO_BAZI_SYSTEM_LAW_v1.1_DEPRECATED_2026-04-29.md`
5. INDEX updated to point to v1.2

### **§4.2 — Archive folder location**

```
D:\UZG\Projects-v2\uzgplus\docs\00_CANON\MODULES\TAO\
├── TAO_Documents\          ← active canonical files only
├── _archive\               ← deprecated versions
└── _index\                 ← INDEX files
```

### **§4.3 — Archive folder retention**

- Keep all deprecated versions forever (per Core Law)
- If folder grows too large (e.g., 500+ files), can split by year: `_archive/2026/`, `_archive/2027/`
- Never bulk-delete archive

---

## **§5 — CROSS-REFERENCE HANDLING**

### **§5.1 — The cross-reference problem**

When file `TAO_BAZI_SYSTEM_LAW_v1.md` is renamed to `TAO_BAZI_SYSTEM_LAW_v1.2_2026-04-29.md`, all files that reference it (e.g., in `Parent docs:` section) will have **broken links**.

### **§5.2 — Mitigation strategy**

**Inside file content (Parent docs, Companion, Sources):**
- Continue using SHORT identifier without date: `TAO_BAZI_SYSTEM_LAW_v1`
- This is **document ID**, not filename
- INDEX file maps document ID → current filename

**Example in file body:**
```markdown
**Parent docs:**
- `TAO_ZIWEI_CANON_OFFICIAL_v1` (definition)        ← short ID
- `TAO_BAZI_SYSTEM_LAW_v1` (constraints)            ← short ID
```

**INDEX file maps:**
```markdown
| Document ID | Current filename |
|---|---|
| TAO_ZIWEI_CANON_OFFICIAL_v1 | TAO_ZIWEI_CANON_OFFICIAL_v1.0_2026-04-25.md |
| TAO_BAZI_SYSTEM_LAW_v1 | TAO_BAZI_SYSTEM_LAW_v1.2_2026-04-29.md |
```

### **§5.3 — Build phase fix**

When CLAC-2 implementation starts (Phase 1):
- Code references will use exact filename
- CLA-2 + CLAC-2 will update all cross-references in code
- This is acceptable per NTS approval 2026-04-29 — minimal pain, deferred

---

## **§6 — APPLICATION SCOPE**

### **§6.1 — In-scope (TAO module)**

This standard applies to:
- All `TAO_*` files (TAO_ZIWEI_*, TAO_BAZI_*, TAO_VANNIEN_*, TAO_LUNAR_*, TAO_SLICE_*)
- `UZGPLUS_VANNIEN_*` files
- `LANE02_TAO_*` index files
- `LANE02_FILE_NAMING_*` (this file)

### **§6.2 — Out-of-scope (other modules)**

This standard does NOT apply to:
- AIER Code module files (`LAW_N*`, `AIER_CODE_*`)
- UZG+ canon files (`UZG_*`, `IDENTITY_CANON.md`, etc.)
- OPS module files
- Lane infrastructure files (`LANE_*`, `LAW_SYSTEM.md`, etc.)

These modules continue current naming conventions until NTS decides to expand scope.

### **§6.3 — Future scope expansion**

If NTS wants to apply v2.0 standard to other modules:
- Create new files: `LANE02_AIER_FILE_NAMING_STANDARD_v1`, `LANE02_UZG_FILE_NAMING_STANDARD_v1`, etc.
- Or expand this v2.0 to v3.0 with broader scope

---

## **§7 — CLA-2 SELF-DISCIPLINE (binding)**

### **§7.1 — Every turn CLA-2 ships TAO file, MUST:**

1. **Search project knowledge** for current version of file
2. **Determine version bump** (MAJOR vs MINOR vs no bump per §2)
3. **Generate filename** per §1.1 standard with current date
4. **Update INDEX** to reflect new filename + changelog entry
5. **Note explicitly in reply** to NTS:
   - "Bumped from v1.X → v1.Y because [reason]"
   - "Old filename → New filename"
6. **List rename action** for NTS to perform (move old → archive)

### **§7.2 — Failure modes (CLA-2 must NEVER do):**

- ❌ Ship file with same name as existing version
- ❌ Skip version bump when content changed
- ❌ Forget to update INDEX
- ❌ Use ambiguous date format (DD/MM vs MM/DD)
- ❌ Place archived version in active folder

### **§7.3 — NTS verification**

NTS can verify CLA-2 compliance by:
1. Open INDEX file → check "WHAT CHANGED RECENTLY" table
2. Ensure filename in table matches file in TAO_Documents folder
3. If mismatch → CLA-2 violation → escalate via tripwire `CLA DRIFT`

---

## **§8 — RENAME PROCEDURE FOR EXISTING FILES (one-time)**

### **§8.1 — Files to rename**

NTS currently has 22 canonical files in TAO_Documents folder with old naming. Rename to v2.0 standard.

### **§8.2 — Rename mapping table**

| Old name | New name | Action |
|---|---|---|
| `TAO_ZIWEI_CANON_OFFICIAL_v1.md` | `TAO_ZIWEI_CANON_OFFICIAL_v1.0_2026-04-25.md` | Rename |
| `TAO_ZIWEI_SYSTEM_LAW_v1.md` | `TAO_ZIWEI_SYSTEM_LAW_v1.1_2026-04-29.md` | Rename |
| `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.md` | `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.0_2026-04-25.md` | Rename |
| `TAO_ZIWEI_UI_UX_CANON_v1.md` | `TAO_ZIWEI_UI_UX_CANON_v1.1_2026-04-29.md` | Rename |
| `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.md` | `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.1_2026-04-29.md` | Rename |
| `TAO_BAZI_SYSTEM_LAW_v1.md` | `TAO_BAZI_SYSTEM_LAW_v1.2_2026-04-29.md` | Rename |
| `TAO_BAZI_SYSTEM_ARCHITECTURE_v1.md` | `TAO_BAZI_SYSTEM_ARCHITECTURE_v1.1_2026-04-29.md` | Rename |
| `TAO_BAZI_UI_UX_CANON_v1.md` | `TAO_BAZI_UI_UX_CANON_v1.1_2026-04-29.md` | Rename |
| `TAO_BAZI_IMPLEMENTATION_SPEC_v1.md` | `TAO_BAZI_IMPLEMENTATION_SPEC_v1.1_2026-04-29.md` | Rename |
| `UZGPLUS_VANNIEN_CALENDAR_SPEC_v1.md` | `UZGPLUS_VANNIEN_CALENDAR_SPEC_v1.0_2026-04-29.md` | Rename |
| `TAO_ZIWEI_FORMULA_REFERENCE_v1.md` | `TAO_ZIWEI_FORMULA_REFERENCE_v1.0_2026-04-29.md` | Rename |
| `TAO_LUNAR_CALENDAR_ALGORITHM_v1.md` | `TAO_LUNAR_CALENDAR_ALGORITHM_v1.0_2026-04-29.md` | Rename |
| `TAO_VANNIEN_DATA_API_v1.md` | `TAO_VANNIEN_DATA_API_v1.0_2026-04-29.md` | Rename |
| `TAO_BAZI_PHONGTHUY_REFERENCE_v1.md` | `TAO_BAZI_PHONGTHUY_REFERENCE_v1.1_2026-04-29.md` | Rename |
| `TAO_ZIWEI_ROADMAP_v1.md` | `TAO_ZIWEI_ROADMAP_v1.0_2026-04-25.md` | Rename |
| `TAO_ZIWEI_BUILD_TASK_MAP_v1.md` | `TAO_ZIWEI_BUILD_TASK_MAP_v1.0_2026-04-25.md` | Rename |
| `TAO_ZIWEI_BUILD_TASK_MAP_v1_AMENDMENT_001.md` | `TAO_ZIWEI_BUILD_TASK_MAP_v1_AMENDMENT_001_2026-04-26.md` | Rename |
| `TAO_SLICE_PLAN_v1.md` | `TAO_SLICE_PLAN_v1.0_2026-04-26.md` | Rename |
| `TAO_BAZI_ROADMAP_v1.md` | `TAO_BAZI_ROADMAP_v1.1_2026-04-29.md` | Rename |
| `TAO_BAZI_BUILD_TASK_MAP_v1.md` | `TAO_BAZI_BUILD_TASK_MAP_v1.1_2026-04-29.md` | Rename |
| `LANE02_TAO_DOCUMENT_INDEX_v1.md` | `LANE02_TAO_DOCUMENT_INDEX_v1.1_2026-04-29.md` | Rename + bump v1.0→v1.1 |
| (this file) `LANE02_FILE_NAMING_STANDARD_v2.md` | `LANE02_FILE_NAMING_STANDARD_v2.0_2026-04-29.md` | Save as |

### **§8.3 — How NTS performs rename (Windows File Explorer)**

For each file:
1. Open `TAO_Documents` folder
2. Right-click file → Rename
3. Type new name from §8.2 table
4. Press Enter
5. Repeat for next file

**Time estimate:** ~30 seconds per file × 22 files = ~10 minutes total.

**Tip for NTS:** Use file explorer "Sort by Name" — sau khi rename, files sẽ tự sắp xếp theo group (ZIWEI cùng nhau, BAZI cùng nhau).

### **§8.4 — Verification after rename**

NTS check:
1. Folder `TAO_Documents` có 22 files với tên mới
2. Mỗi file có version + date trong tên
3. Mở INDEX file → check "WHAT CHANGED RECENTLY" table → matches reality

---

## **§9 — VERSION LOG**

| Version | Date | Change |
|---|---|---|
| v2.0 | 2026-04-29 | Initial — file naming standard with version+date in filename. Apply scope: TAO module only. Approved by NTS per option I (rename file standard) trade-off. |

---

## **§10 — SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v2.0 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ✅ Approved (option I) | 2026-04-29 |
| Effective | — | ✅ ACTIVE | 2026-04-29 |

**END — LANE02_FILE_NAMING_STANDARD_v2**
