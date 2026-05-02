# **TAO ZIWEI IMPLEMENTATION SPEC v1 — AMENDMENT 001**

## **§7.9 NTS Audit Case Canonical Text — Transcription Error Correction**

---

**Amendment ID:** AMD-TAO-ZIWEI-SPEC-001
**Amendment Type:** transcription_error_correction
**Original document:** `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.1_2026-04-29.md`
**Affected section:** PART 7 / §7.9 NTS Audit Case
**Amendment date:** 2026-04-30
**Authored by:** CLA-2 (Lane_02 reviewer)
**Approved by:** NTS — Anh Tao (verbal approve 2026-04-30 chat session)
**Authority Level:** Tier 3 amendment (per LAW 21 Spec Amendment Rule)
**Status:** ✅ APPROVED
**Per:** LAW 21 (Spec Amendment Rule) + LAW 8 (Canon Append-Only)

---

## **§1 — AMENDMENT SUMMARY**

§7.9 of the original spec contained 2 transcription errors regarding the NTS
audit case (input: 1984-03-06T06:30:00+07:00, gender = Nam):

| Field | Original §7.9 text | Canonical correct | Discrepancy type |
|---|---|---|---|
| Cung Thân branch | Mão | **Ngọ** | Procedural formula violation |
| Cục | Kim Tứ Cục (4) | **Thủy Nhị Cục (2)** | Internal matrix inconsistency |

Both corrections vindicated via lyso.vn lá số mẫu Hero Vu 2023 (NTS-provided
ground truth attached to LANE02-UZG-TAO-T-TAO-005-013-V1 dispatch chat session
2026-04-30) plus engine canonical math validated end-to-end across Phase 1.2,
1.3 and 1.4 (cumulative 25/25 categories match — see §4 Verification Record).

---

## **§2 — DETAILED CORRECTION**

### **§2.1 — Cung Thân = Ngọ (NOT Mão)**

**Canonical formula** (per IMPLEMENTATION_SPEC §5.2 procedural rule):

```
Mệnh palace = Dần + (lunar_month - 1) - hour_idx mod 12
Thân palace = Dần + (lunar_month - 1) + hour_idx mod 12
```

For NTS audit case:

- lunar_month = 2 (Đinh Mão tháng 2 âm)
- hour_branch = Mão → hour_idx = 3
- Dần = idx 2

Computation:

```
Mệnh = 2 + (2 - 1) - 3 = 0   → Tý  ✓ (matches §7.9 text)
Thân = 2 + (2 - 1) + 3 = 6   → Ngọ (§7.9 text says Mão — TRANSCRIPTION ERROR)
```

The §7.9 text correctly applies the Mệnh formula but mis-transcribes the Thân
formula's CW addition as a CCW subtraction. The canonical procedural rule from
§5.2 of the same spec requires CW addition for Thân (mirror of Mệnh's CCW
subtraction).

**Cross-check 1 — lyso.vn:** Lá số mẫu Hero Vu 2023 displays
"Thân cư Thiên Di" with Thiên Di palace at Ngọ in the center metadata panel —
confirms Thân = Ngọ.

**Cross-check 2 — manual hand-cast (V3 §13.3.4 standard):** Independent manual
cast for 1984-03-06 06:30 Nam yields Thân = Ngọ.

**Cross-check 3 — tuviglobal cross-reference:** Manual verification
2026-04-30 confirms Thân = Ngọ for 1984-03-06 06:30 Nam input.

**Cross-check 4 — engine output:** `lib/tao/ziwei/menh-than.js` (Phase 1.2 ship)
yields `than_branch = "Ngọ"` for the NTS audit case. Phase 1.3 lyso fixture
GT-2 verified Thân = Ngọ — passes 100%.

### **§2.2 — Cục = Thủy Nhị Cục (NOT Kim Tứ Cục)**

**Canonical matrix** (per IMPLEMENTATION_SPEC §3.3 + FORMULA_REFERENCE §6):

```
Cục = lookup[year_stem_group][palace_pair_of_Mệnh]
```

| Năm Can | Tý-Sửu | Dần-Mão | Thìn-Tỵ | Ngọ-Mùi | Thân-Dậu | Tuất-Hợi |
|---|---|---|---|---|---|---|
| Giáp / Kỷ | Thủy 2 | Hỏa 6 | Mộc 3 | Thổ 5 | Kim 4 | Hỏa 6 |

For NTS audit case:

- Năm Can = Giáp (Giáp Tý 1984)
- Cung Mệnh = Tý → palace pair Tý-Sửu

Lookup:

```
Giáp + Tý-Sửu = Thủy Nhị Cục (2)
                §7.9 text says "Kim Tứ Cục (4)" — TRANSCRIPTION ERROR
```

Note: Kim Tứ Cục only occurs at Giáp + **Thân-Dậu** palace pair, not Tý-Sửu.

**Cross-check 1 — lyso.vn:** Lá số mẫu Hero Vu 2023 displays "Thủy Nhị Cục"
in center metadata panel — confirms Cục = Thủy 2.

**Cross-check 2 — internal consistency proof (CRITICAL):**
The 14 chính tinh listed in §7.9 itself (Tử Vi tại Mão, Thiên Phủ tại Sửu,
Thiên Cơ tại Dần, Thái Dương tại Tý, Vũ Khúc tại Hợi, Thiên Đồng tại Tuất,
Liêm Trinh tại Thân, ...) can ONLY derive from Cục Thủy 2 + lunar day 4
placement.

Per §7.2 Tử Vi position table:

| Cuc | day 4 → Tử Vi tại |
|---|---|
| Thủy 2 | **Mão** (matches §7.9 listed value) ✓ |
| Mộc 3 | Thìn |
| Kim 4 | Dần (does NOT match §7.9 listed Tử Vi tại Mão) ✗ |
| Thổ 5 | Tỵ |
| Hỏa 6 | Tý |

This proves the 14 stars listed in §7.9 are correct for **Thủy 2**, and the
"Kim 4" label in §7.9 is the transcription error. The §7.9 text is internally
inconsistent with itself.

**Cross-check 3 — engine output:** `lib/tao/ziwei/cuc.js` (Phase 1.2 ship)
yields `cuc = { name: "Thủy Nhị Cục", number: 2 }` for the NTS audit case.
Phase 1.3 lyso fixture GT-3 verified Cục = Thủy 2 — passes 100%. The 14
chính tinh derived in `lib/tao/ziwei/chinh-tinh.js` for Cục Thủy 2 day 4 match
lyso.vn 14/14 values exactly.

---

## **§3 — IMPACT ANALYSIS**

### **§3.1 — Implementation impact: NONE**

Engine code (Phase 1.2 + 1.3 + 1.4 shipped) was implemented per
FORMULA_REFERENCE §6 matrix and §5.2 procedural rule — NOT per §7.9 text.
Engine output has always been canonically correct. No code changes required.

| Engine module | Phase | Affected by §7.9 errors? |
|---|---|---|
| `menh-than.js` | 1.2 | NO — uses §5.2 formula directly |
| `cuc.js` | 1.2 | NO — uses §3.3 / FORMULA_REFERENCE §6 matrix |
| `chinh-tinh.js` | 1.2 | NO — derives from canonical Cục |
| `aux-stars.js`, `trang-sinh.js`, `thai-tue.js`, `loc-ton.js`, `tuan-triet.js`, `si-hua.js`, `dai-van.js`, `menh-than-chu.js` | 1.3 | NO — all derived from canonical inputs |
| `luu-nien.js`, `tieu-van.js`, `luu-nguyet.js`, `luu-stars.js`, `computeCycleLayers.js` | 1.4 | NO — cycle layer over canonical natal chart |

### **§3.2 — Test fixture impact: NONE**

Lyso ground-truth fixtures (GT-1..GT-20 in `lib/tao/ziwei/__tests__/lyso-ground-truth.test.js`)
test against lyso.vn observable data (Thân = Ngọ, Cục = Thủy 2), which match
canonical math. All 25/25 categories already pass. No fixture updates required.

| Fixture suite | Count | Tests against §7.9 text? |
|---|---|---|
| Phase 1.2 unit fixtures | 131 | NO — formula-based |
| Phase 1.3 GT-1..GT-12 (natal lyso) | 12 | NO — lyso.vn observable |
| Phase 1.3 unit fixtures | 130 | NO — formula-based |
| Phase 1.4 GT-13..GT-20 (cycle lyso) | 8 | NO — lyso.vn observable |
| Phase 1.4 unit fixtures | 88 | NO — formula-based |

### **§3.3 — Documentation impact: This amendment doc only**

Original §7.9 text in `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.1_2026-04-29.md` remains
ARCHIVED AS-IS per LAW 8 (canon append-only — never delete original). This
amendment supersedes the §7.9 text per LAW 21 (precedence: amendment > original).

### **§3.4 — AIER Tao impact: NONE**

AIER Tao advisory layer (Phase 3) reads `chart_object` from engine output, never
from spec §7.9 text directly. No AIER training corpus changes required.

### **§3.5 — UI impact: NONE**

Tử Vi V2 Natal Chart UI (Phase 1.5 minimal — `apps/uzg-pwa/src/components/tao/ziwei/`)
reads `chart_object` from engine output. No UI changes required.

---

## **§4 — VERIFICATION RECORD**

### **§4.1 — lyso.vn ground truth (Hero Vu 2023, 1984-03-06 06:30 Nam)**

| Field | Lyso displayed | Engine output | §7.9 original | §7.9 corrected |
|---|---|---|---|---|
| Mệnh | Tý | Tý ✓ | Tý ✓ | Tý ✓ |
| **Thân** | **Ngọ (cư Thiên Di)** | **Ngọ ✓** | **Mão ✗** | **Ngọ ✓** |
| **Cục** | **Thủy Nhị Cục** | **Thủy 2 ✓** | **Kim 4 ✗** | **Thủy 2 ✓** |
| Tử Vi | Mão | Mão ✓ | Mão ✓ | Mão ✓ |
| Thiên Phủ | Sửu | Sửu ✓ | Sửu ✓ | Sửu ✓ |
| 14 chính tinh | All 14 | All 14 ✓ | All 14 ✓ | All 14 ✓ |
| Mệnh chủ | Tham Lang | Tham Lang ✓ | (not in §7.9) | (not affected) |
| Thân chủ | Hỏa Tinh | Hỏa Tinh ✓ | (not in §7.9) | (not affected) |
| Tứ Hóa Giáp | 4 stars | 4 stars ✓ | (not in §7.9) | (not affected) |
| Tuần Triệt | Tý-Sửu / Thân-Dậu | match ✓ | (not in §7.9) | (not affected) |
| Đại vận | 12 vận ages | match ✓ | (not in §7.9) | (not affected) |
| Cycle 2023 (Quý Mão) — Lưu Niên | Mão | Mão ✓ | (not in §7.9) | (not affected) |
| Cycle 2023 — Tiểu Vận | Sửu (age 40 tuổi mụ) | Sửu ✓ | (not in §7.9) | (not affected) |
| Cycle 2023 — Lưu Lộc Tồn | Tý | Tý ✓ | (not in §7.9) | (not affected) |
| Cycle 2023 — Lưu Thiên Mã | Tỵ | Tỵ ✓ | (not in §7.9) | (not affected) |
| Cycle 2023 — Lưu Khôi/Việt | Mão / Tỵ | match ✓ | (not in §7.9) | (not affected) |
| Cycle 2023 — Lưu Tứ Hóa | Phá Quân/Cự Môn/Thái Âm/Tham Lang | match ✓ | (not in §7.9) | (not affected) |
| Cycle 2023 — Lưu Nguyệt M1 | Tỵ | Tỵ ✓ | (not in §7.9) | (not affected) |

**Cumulative ground-truth match: 25 / 25 categories (16 natal + 9 cycle) — 100%.**

### **§4.2 — PR / SHA references**

| Phase | PR | Squash SHA | Cumulative GT match |
|---|---|---|---|
| Phase 1.2 (engine core) | #45 | `7142e10` | 0 (engine only — no UI verify) |
| Phase 1.3 + 1.5 (aux + UI) | #46 | `15766dc` | 16 / 16 natal categories |
| Phase 1.4 (cycles + overlay) | #47 | `60c3630` | 9 / 9 cycle categories |
| **Cumulative** | | | **25 / 25 categories — 100%** |

---

## **§5 — FORMULA VERSION + SOURCE AUTHORITY**

Per LAW 21 amendment requirements:

| Field | Value |
|---|---|
| `amendment_id` | AMD-TAO-ZIWEI-SPEC-001 |
| `amendment_type` | transcription_error_correction |
| `affected_formula_versions` | none (engine code unchanged) |
| `affected_documentation` | `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.1_2026-04-29.md` §7.9 |
| `source_authority` | TranDoan-Core (canon formula) + ENTA-CanonicalNormalization (matrix lookup) |
| `verification_authority` | lyso.vn (P-LANE02-LYSO-GROUND-TRUTH) + manual hand-cast (V3 §13.3.4) + tuviglobal cross-reference |
| `precedence` | This amendment > original §7.9 text |
| `archive_status` | Original v1.1 doc unchanged; amendment supersedes §7.9 only |
| `effective_from` | 2026-04-30 |

---

## **§6 — AMENDMENT RULES COMPLIANCE**

Per LAW 21 (Spec Amendment Rule):

| Requirement | Status |
|---|---|
| Proposal as `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1_AMENDMENT_<X>.md` | ✅ filename pattern matches (`_v1_AMENDMENT_001_2026-04-30.md`) |
| NTS approval | ✅ verbal approve 2026-04-30 chat session |
| Cannot contradict Canon, LAW, or Architecture | ✅ amendment ALIGNS with FORMULA_REFERENCE §6 matrix + §5.2 procedural rule (in fact RESTORES alignment lost in §7.9 text) |
| Algorithm changes MUST bump `formula_version` in chart audit log | ✅ N/A (no algorithm change — only spec text correction) |
| Old version archived | ✅ original v1.1 doc unchanged per LAW 8 |
| File naming standard | ✅ per LAW-NTS-LANE-2-10 (TAO scope `_v<X>_AMENDMENT_<NNN>_<YYYY-MM-DD>.md`) |

---

## **§7 — DECLARATION**

This amendment corrects 2 transcription errors in IMPLEMENTATION_SPEC v1.1 §7.9
NTS audit case canonical text.

**Engine code is unaffected** — implementation has always been canonically correct
per FORMULA_REFERENCE matrices and §5.2 procedural rules.

lyso.vn lá số mẫu Hero Vu 2023 confirms canonical values:

- Cung Thân = **Ngọ** (Thân cư Thiên Di palace at Ngọ)
- Cục = **Thủy Nhị Cục** (number = 2)

Engine output, lyso.vn observable data, manual hand-cast, and tuviglobal
cross-reference all agree. The §7.9 text as originally written is internally
inconsistent with its own listed 14 chính tinh values — confirming the §7.9
text errors and vindicating engine canonical math.

This amendment is canonical from 2026-04-30 forward.

---

**End AMD-TAO-ZIWEI-SPEC-001**
