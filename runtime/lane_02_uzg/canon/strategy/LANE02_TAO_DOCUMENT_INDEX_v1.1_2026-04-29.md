# **LANE02 TAO DOCUMENT INDEX v1.0**

## **Master canonical document index for UZG+ TAO module — Lane_02 project knowledge**

---

**Document ID:** LANE02_TAO_DOCUMENT_INDEX_v1
**Version:** 1.1
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge — meta document)
**Authority Level:** Tier 0 — index/registry, no business logic
**Issued by:** CLA-2 (Lane_02)
**Status:** ✅ ACTIVE — single source of truth for TAO module documents

---

## **§0 — PURPOSE**

Document này là **single source of truth** liệt kê:
1. Tất cả file TAO module documents (Tier 1, 2, 3)
2. Version mới nhất của mỗi file (canonical version)
3. File nào nên **DELETE/ARCHIVE** vì cũ hoặc redundant
4. Recommended folder structure trên máy NTS
5. Khi CLAC-2 fetch documents, dùng index này để biết file nào load

NTS dùng file này khi muốn clean folder `/Downloads/TAO/` hoặc set up folder mới.

---

## **§1 — CANONICAL FILES (CHUẨN — DÙNG)**

### **§1.1 — Tier 1: Canon (1 file)**

| Document ID | Current filename | Date | Note |
|---|---|---|---|
| `TAO_ZIWEI_CANON_OFFICIAL_v1` | `TAO_ZIWEI_CANON_OFFICIAL_v1.0_2026-04-25.md` | 2026-04-25 | Shared cho cả V1 + V2 + V3. Tier 1 không bị school-lock affect. |

### **§1.2 — Tier 2: Module Governance — TAO V2 (Tử Vi)**

| Document ID | Current filename | Date | Note |
|---|---|---|---|
| `TAO_ZIWEI_SYSTEM_LAW_v1` | **`TAO_ZIWEI_SYSTEM_LAW_v1.1_2026-04-29.md`** | 2026-04-29 | NTS fear-UX relaxation + VN-school explicit |
| `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1` | `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.0_2026-04-25.md` | 2026-04-25 | Architecture school-agnostic, không cần update |
| `TAO_ZIWEI_UI_UX_CANON_v1` | **`TAO_ZIWEI_UI_UX_CANON_v1.1_2026-04-29.md`** | 2026-04-29 | NTS fear-UX relaxation |
| `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1` | **`TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.1_2026-04-29.md`** | 2026-04-29 | VN-school confirmation block added |

### **§1.3 — Tier 2: Module Governance — TAO V1 + V3 (Bazi + Phong Thủy)**

| Document ID | Current filename | Date | Note |
|---|---|---|---|
| `TAO_BAZI_SYSTEM_LAW_v1` | **`TAO_BAZI_SYSTEM_LAW_v1.2_2026-04-29.md`** | 2026-04-29 | School lock (v1.1) + fear-UX relaxation (v1.2) |
| `TAO_BAZI_SYSTEM_ARCHITECTURE_v1` | `TAO_BAZI_SYSTEM_ARCHITECTURE_v1.1_2026-04-29.md` | 2026-04-29 | School lock |
| `TAO_BAZI_UI_UX_CANON_v1` | **`TAO_BAZI_UI_UX_CANON_v1.1_2026-04-29.md`** | 2026-04-29 | NTS fear-UX relaxation |
| `TAO_BAZI_IMPLEMENTATION_SPEC_v1` | `TAO_BAZI_IMPLEMENTATION_SPEC_v1.1_2026-04-29.md` | 2026-04-29 | School lock |

### **§1.4 — Tier 2: UZG+ Vạn Niên Feature**

| Document ID | Current filename | Date | Note |
|---|---|---|---|
| `UZGPLUS_VANNIEN_CALENDAR_SPEC_v1` | `UZGPLUS_VANNIEN_CALENDAR_SPEC_v1.0_2026-04-29.md` | 2026-04-29 | Pending NTS canon rewrite (per §0.1 in file). With v1.1/v1.2 fear-UX relaxation now in V1+V2 LAWs, the canon rewrite is effectively done — file can be promoted to v1.1 after NTS reviews. |

### **§1.5 — Tier 3: Algorithms & Data Engines**

| Document ID | Current filename | Date | Note |
|---|---|---|---|
| `TAO_ZIWEI_FORMULA_REFERENCE_v1` | `TAO_ZIWEI_FORMULA_REFERENCE_v1.0_2026-04-29.md` | 2026-04-29 | Pure formulas, no LAW dependency |
| `TAO_LUNAR_CALENDAR_ALGORITHM_v1` | `TAO_LUNAR_CALENDAR_ALGORITHM_v1.0_2026-04-29.md` | 2026-04-29 | Calendar engine — VN/CN dual mode (correct as-is) |
| `TAO_VANNIEN_DATA_API_v1` | `TAO_VANNIEN_DATA_API_v1.0_2026-04-29.md` | 2026-04-29 | Vạn Niên data engine |
| `TAO_BAZI_PHONGTHUY_REFERENCE_v1` | `TAO_BAZI_PHONGTHUY_REFERENCE_v1.1_2026-04-29.md` | 2026-04-29 | School lock |

### **§1.6 — Tier 3: Roadmap & Build Plan**

| Document ID | Current filename | Date | Note |
|---|---|---|---|
| `TAO_ZIWEI_ROADMAP_v1` | `TAO_ZIWEI_ROADMAP_v1.0_2026-04-25.md` | 2026-04-25 | TAO V2 build phases |
| `TAO_ZIWEI_BUILD_TASK_MAP_v1` | `TAO_ZIWEI_BUILD_TASK_MAP_v1.0_2026-04-25.md` | 2026-04-25 | TAO V2 task IDs |
| `TAO_ZIWEI_BUILD_TASK_MAP_v1_AMENDMENT_001` | `TAO_ZIWEI_BUILD_TASK_MAP_v1_AMENDMENT_001_2026-04-26.md` | 2026-04-26 | Amendment to V2 task map |
| `TAO_SLICE_PLAN_v1` | `TAO_SLICE_PLAN_v1.0_2026-04-26.md` | 2026-04-26 | Cross-module slice plan |
| `TAO_BAZI_ROADMAP_v1` | `TAO_BAZI_ROADMAP_v1.1_2026-04-29.md` | 2026-04-29 | School lock |
| `TAO_BAZI_BUILD_TASK_MAP_v1` | `TAO_BAZI_BUILD_TASK_MAP_v1.1_2026-04-29.md` | 2026-04-29 | School lock |

### **§1.7 — Source Files (Reference Only)**

| Document ID | Current filename | Date | Note |
|---|---|---|---|
| `UZG_TAO_CORE_V3_CLEAN` | `UZG_TAO_CORE_V3_CLEAN.md` | 2026-04-25 | NTS source — exempt from naming standard (legacy reference) |
| `CACH_AN_LA_SO_TU_VI` | `CACH_AN_LA_SO_TU_VI.md` | 2026-04-26 | NTS source — exempt |
| (PDF files) | `Cach_an_sao_Tu_vi_TAO_UZG.pdf`, `Tu Vi Dau So.pdf`, `an-tao-tu-vi.TAO_UZG.pdf` | 2026-04-26 | PDF — exempt |

### **§1.8 — Index & Standard Files**

| Document ID | Current filename | Date | Note |
|---|---|---|---|
| `LANE02_TAO_DOCUMENT_INDEX_v1` | **`LANE02_TAO_DOCUMENT_INDEX_v1.1_2026-04-29.md`** | 2026-04-29 | This file — bumped v1.0 → v1.1 |
| `LANE02_FILE_NAMING_STANDARD_v2` | `LANE02_FILE_NAMING_STANDARD_v2.0_2026-04-29.md` | 2026-04-29 | New standard — applied to all TAO files |

---

## **§2 — TOTAL CANONICAL FILES**

**Active canonical files: 22**
- 1 Tier 0 (this index)
- 1 Tier 1 (Canon)
- 9 Tier 2 (4 V2 + 4 V1+V3 + 1 Vạn Niên)
- 4 Tier 3 algorithms
- 6 Tier 3 roadmap/plan
- 1 Tier 3 amendment

**Source files (reference only): 5**
- 2 .md (CORE V3 + CACH AN LA SO TU VI)
- 3 .pdf

---

## **§3 — WHAT CHANGED RECENTLY** (đọc 1 lần là biết update gần đây)

NTS quick-scan section. Most recent changes at top.

| Date | Document ID | Bump | Change in 1 line |
|---|---|---|---|
| 2026-04-29 | LANE02_FILE_NAMING_STANDARD_v2 | NEW | New file naming convention với version+date trong tên file |
| 2026-04-29 | LANE02_TAO_DOCUMENT_INDEX_v1 | v1.0 → v1.1 | Add §3 "What Changed Recently" + apply v2.0 naming standard |
| 2026-04-29 | TAO_ZIWEI_SYSTEM_LAW_v1 | v1.0 → v1.1 | NTS fear-UX relaxation + VN-school explicit |
| 2026-04-29 | TAO_ZIWEI_UI_UX_CANON_v1 | v1.0 → v1.1 | NTS fear-UX relaxation |
| 2026-04-29 | TAO_ZIWEI_IMPLEMENTATION_SPEC_v1 | v1.0 → v1.1 | VN-school confirmation block added |
| 2026-04-29 | TAO_BAZI_SYSTEM_LAW_v1 | v1.1 → v1.2 | NTS fear-UX relaxation |
| 2026-04-29 | TAO_BAZI_UI_UX_CANON_v1 | v1.0 → v1.1 | NTS fear-UX relaxation |
| 2026-04-29 | TAO_BAZI_SYSTEM_LAW_v1 | v1.0 → v1.1 | NTS school lock (VN-school: Tết year + lunar month) |
| 2026-04-29 | TAO_BAZI_SYSTEM_ARCHITECTURE_v1 | v1.0 → v1.1 | NTS school lock |
| 2026-04-29 | TAO_BAZI_IMPLEMENTATION_SPEC_v1 | v1.0 → v1.1 | NTS school lock |
| 2026-04-29 | TAO_BAZI_PHONGTHUY_REFERENCE_v1 | v1.0 → v1.1 | NTS school lock |
| 2026-04-29 | TAO_BAZI_ROADMAP_v1 | v1.0 → v1.1 | NTS school lock |
| 2026-04-29 | TAO_BAZI_BUILD_TASK_MAP_v1 | v1.0 → v1.1 | NTS school lock |

**NTS quick-check rule:** Mở section này, đọc cột "Change in 1 line" → biết hết update gần đây trong 30 giây.

CLA-2 self-discipline: mỗi turn ship file mới, MUST add row vào bảng này (most recent at top). Per LANE02_FILE_NAMING_STANDARD_v2 §7.

---

## **§4 — FILES TO DELETE / ARCHIVE**

### **§3.1 — Currently in NTS folder `/Downloads/TAO/`**

Per screenshot 2026-04-29 NTS upload, folder có **24 items**. Comparison with canonical list above:

#### **DUPLICATE / OUTDATED (recommend DELETE):**

Per audit, **không có file duplicate** trong folder hiện tại — mỗi file là 1 instance unique. Tất cả 24 files đều unique và đều có chỗ trong canonical hierarchy.

**Tuy nhiên**, files mà NTS có trên máy (per screenshot) là **versions cũ** (v1.0) cho 5 files đã được CLA update lên v1.1/v1.2 hôm nay. NTS cần **replace những versions cũ này** bằng versions mới ship trong session này:

| File | Version trên máy NTS | Version mới CLA ship | Action |
|---|---|---|---|
| `TAO_ZIWEI_SYSTEM_LAW_v1.md` | v1.0 (2026-04-25) | **v1.1** (2026-04-29) | REPLACE |
| `TAO_ZIWEI_UI_UX_CANON_v1.md` | v1.0 (2026-04-25) | **v1.1** (2026-04-29) | REPLACE |
| `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.md` | v1.0 (2026-04-25) | **v1.1** (2026-04-29) | REPLACE |
| `TAO_BAZI_SYSTEM_LAW_v1.md` | v1.1 (2026-04-29 sáng) | **v1.2** (2026-04-29 chiều) | REPLACE |
| `TAO_BAZI_UI_UX_CANON_v1.md` | v1.0 (2026-04-29 sáng) | **v1.1** (2026-04-29 chiều) | REPLACE |

NTS có thể giữ versions cũ trong folder `_archive/` nếu muốn audit history (per UZG+ Core Law: append-only). Hoặc xóa hẳn nếu không cần.

#### **MISSING (NTS chưa có, cần download):**

| File | Reason |
|---|---|
| `LANE02_TAO_DOCUMENT_INDEX_v1.md` | This file — master index, NTS chưa có |

Per screenshot: folder `/Downloads/TAO/` không có file index. Cần add sau khi CLA ship turn này.

---

## **§5 — RECOMMENDED FOLDER STRUCTURE**

NTS có thể organize cleanly theo cấu trúc sau:

```
D:\UZG\Projects-v2\TAO_Documents\
├── _index\
│   └── LANE02_TAO_DOCUMENT_INDEX_v1.md
├── tier1_canon\
│   └── TAO_ZIWEI_CANON_OFFICIAL_v1.md
├── tier2_governance\
│   ├── ziwei_v2\
│   │   ├── TAO_ZIWEI_SYSTEM_LAW_v1.md (v1.1)
│   │   ├── TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.md
│   │   ├── TAO_ZIWEI_UI_UX_CANON_v1.md (v1.1)
│   │   └── TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.md (v1.1)
│   ├── bazi_phongthuy_v1_v3\
│   │   ├── TAO_BAZI_SYSTEM_LAW_v1.md (v1.2)
│   │   ├── TAO_BAZI_SYSTEM_ARCHITECTURE_v1.md (v1.1)
│   │   ├── TAO_BAZI_UI_UX_CANON_v1.md (v1.1)
│   │   └── TAO_BAZI_IMPLEMENTATION_SPEC_v1.md (v1.1)
│   └── vannien\
│       └── UZGPLUS_VANNIEN_CALENDAR_SPEC_v1.md
├── tier3_algorithms\
│   ├── TAO_ZIWEI_FORMULA_REFERENCE_v1.md
│   ├── TAO_LUNAR_CALENDAR_ALGORITHM_v1.md
│   ├── TAO_VANNIEN_DATA_API_v1.md
│   └── TAO_BAZI_PHONGTHUY_REFERENCE_v1.md (v1.1)
├── tier3_roadmap\
│   ├── ziwei\
│   │   ├── TAO_ZIWEI_ROADMAP_v1.md
│   │   ├── TAO_ZIWEI_BUILD_TASK_MAP_v1.md
│   │   └── TAO_ZIWEI_BUILD_TASK_MAP_v1_AMENDMENT_001.md
│   ├── bazi\
│   │   ├── TAO_BAZI_ROADMAP_v1.md (v1.1)
│   │   └── TAO_BAZI_BUILD_TASK_MAP_v1.md (v1.1)
│   └── TAO_SLICE_PLAN_v1.md
├── source_references\
│   ├── UZG_TAO_CORE_V3_CLEAN.md
│   ├── CACH_AN_LA_SO_TU_VI.md
│   ├── Cach_an_sao_Tu_vi_TAO_UZG.pdf
│   ├── Tu Vi Dau So.pdf
│   └── an-tao-tu-vi.TAO_UZG.pdf
└── _archive\
    ├── TAO_ZIWEI_SYSTEM_LAW_v1_v1.0_2026-04-25.md
    ├── TAO_ZIWEI_UI_UX_CANON_v1_v1.0_2026-04-25.md
    ├── TAO_ZIWEI_IMPLEMENTATION_SPEC_v1_v1.0_2026-04-25.md
    ├── TAO_BAZI_SYSTEM_LAW_v1_v1.0_2026-04-29.md
    ├── TAO_BAZI_SYSTEM_LAW_v1_v1.1_2026-04-29.md
    └── TAO_BAZI_UI_UX_CANON_v1_v1.0_2026-04-29.md
```

**Naming convention cho archive:**
`<filename_without_ext>_<version>_<date>.md`

→ Append-only history per UZG+ Core Law. Old versions không xóa, di vào `_archive/` để audit khi cần.

---

## **§6 — CLEANUP CHECKLIST FOR NTS**

NTS làm theo thứ tự sau để clean folder:

### **Step 1 — Backup hiện tại**
```bash
# Optional: zip current state before cleanup
zip -r TAO_backup_2026-04-29.zip /Downloads/TAO/
```

### **Step 2 — Tạo folder structure mới**
Theo §4 above. Tạo các thư mục: `_index/`, `tier1_canon/`, `tier2_governance/{ziwei_v2,bazi_phongthuy_v1_v3,vannien}/`, `tier3_algorithms/`, `tier3_roadmap/{ziwei,bazi}/`, `source_references/`, `_archive/`.

### **Step 3 — Move file vào folder mới**
Move 24 files hiện tại theo bảng §1 + §4. Pattern:
- Files có "ZIWEI" → ziwei folder
- Files có "BAZI" → bazi folder
- Files "VANNIEN" / "VANNIEN_DATA_API" → vannien
- Files "LUNAR" / "FORMULA" → tier3_algorithms
- Files "ROADMAP" / "TASK_MAP" / "AMENDMENT" / "SLICE" → tier3_roadmap
- Files PDF + UZG_TAO_CORE_V3_CLEAN.md + CACH_AN_LA_SO_TU_VI.md → source_references

### **Step 4 — Replace old versions**
Các file đã có trên máy là v1.0 — cần thay bằng v1.1/v1.2 mới ship hôm nay (per §3.1). Move v1.0 versions sang `_archive/` với suffix tên file.

### **Step 5 — Add new files**
Save các files mới ship trong session này vào folder tương ứng:
- `LANE02_TAO_DOCUMENT_INDEX_v1.md` → `_index/`
- 5 files updated ship turn này → respective folders

### **Step 6 — Update Lane_02 project knowledge**
NTS upload tất cả 22 canonical files (active versions) lên Lane_02 project knowledge để CLA-2 + CLAC-2 dispatch tham chiếu được. Source references không cần upload (đã extract content vào canonical files).

---

## **§7 — DISPATCH USAGE GUIDE**

Khi NTS dispatch task cho CLAC-2:
1. CLAC-2 nhận task prompt từ NTS (per `TASK_PROMPT_TEMPLATE_v2.2`)
2. Task prompt reference các canonical files cần load
3. CLAC-2 fetch từ Lane_02 project knowledge bằng tên file canonical (per §1)
4. CLAC-2 tuyệt đối **không load** files từ `_archive/` hoặc duplicate files
5. Nếu CLAC-2 thấy 2 phiên bản cùng tên trong context, dùng version mới nhất per §1 mapping

CLA-2 trước khi dispatch task:
1. Verify task references files từ canonical list (§1)
2. Verify version numbers match
3. Reject task prompt nào reference deprecated files

---

## **§8 — INDEX MAINTENANCE**

Khi có file mới ship hoặc bump version:
1. CLA-2 update file này (bump LANE02 INDEX version)
2. Add changelog entry
3. NTS approve
4. Archive index version cũ vào `_archive/`

Khi ship Phase 1 build (CLAC-2 starts implementation):
- Code repo paths có thể được add vào index
- Cross-reference với SKILL.md / engine files

---

## **§9 — VERSION LOG**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-29 | Initial — master index for TAO module Lane_02 documents. Lists 22 canonical files + 5 source references + cleanup guide cho NTS. |
| v1.1 | 2026-04-29 | Apply LANE02_FILE_NAMING_STANDARD_v2: all files renamed với version+date format. Add §3 "WHAT CHANGED RECENTLY" quick-scan table. Renumber sections §3 (was Files to Delete) → §4. |

---

## **§10 — SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.1 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ✅ Approved (option I + 1) | 2026-04-29 |
| Effective | — | ✅ ACTIVE | 2026-04-29 |

**END — LANE02_TAO_DOCUMENT_INDEX_v1**
