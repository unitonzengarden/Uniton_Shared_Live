# UZG+ V3 — ENTA CANON §3.2 AMENDMENT 001

**Document ID:** `UZG_PLUS_V3_UIUX_ENTA_CANON_AMENDMENT_001`
**Type:** Amendment to `UZG_PLUS_V3_UIUX_ENTA_CANON_v1`
**Version:** v1.0
**Effective Date:** 2026-04-30
**Authority:** Tier 4 (Module canon amendment)
**Status:** ✅ NTS APPROVED 2026-04-30 (Mockup #5 verification + Pentagon geometry confirmation)

**Source of truth:**
- NTS verbatim approval 2026-04-30 thread: "ok, đã chuẩn"
- Mockup #5 ENTA Module verified Pentagon geometry: `UZG_PLUS_V3_MOCKUP_05_ENTA_MODULE.html`
- NAM TAO foundations PDF: `NAMTAO_Official_29012026.pdf` (page 18 Thiên Can / page 20 Địa Chi / page 59 tương sinh khắc)

---

## §0 PURPOSE

Amend `UZG_PLUS_V3_UIUX_ENTA_CANON_v1` §3.2 (Pentagon Wheel sequence) to reflect NAM TAO chuẩn Pentagon geometry confirmed by NTS during Phase 2 Mockup review.

---

## §1 PRIOR INCORRECT SEQUENCE (DEPRECATED)

ENTA Canon v1 §3.2 originally specified Pentagon vertex sequence as:

```
Top vertex:   KIM (incorrect)
Clockwise:    KIM → THỦY → MỘC → HỎA → THỔ → KIM
```

**This is INCORRECT** — does not match NAM TAO foundational geometry.

---

## §2 CORRECTED SEQUENCE (CANONICAL)

### §2.1 Element positions (centered on cardinal angles)

Pentagon divides 360° into 5 equal segments (72° each). Each ngũ hành element is **CENTERED** on its cardinal angle (NOT placed at vertex/edge):

| Angle (clockwise from top) | Clock position | Element |
|---|---|---|
| **0°** | **12h top** | **HỎA** (viêm thượng — fire rises) |
| 72° | 2:24h | **THỔ** |
| 144° | 4:48h | **KIM** |
| 216° | 7:12h | **THỦY** |
| 288° | 9:36h | **MỘC** |

### §2.2 Edge vertices (between elements)

Pentagon outline drawn through edge vertices at 36° offset from element centers:

| Angle | Edge between |
|---|---|
| 36° | Hỏa ↔ Thổ |
| 108° | Thổ ↔ Kim |
| 180° | Kim ↔ Thủy |
| 252° | Thủy ↔ Mộc |
| 324° | Mộc ↔ Hỏa |

### §2.3 Tương Sinh (clockwise outer arc) — green arrows

```
HỎA → THỔ → KIM → THỦY → MỘC → HỎA (cycle)
```

Mnemonic explanations:
- **Hỏa sinh Thổ** — lửa cháy thành tro bụi
- **Thổ sinh Kim** — đất sinh kim loại
- **Kim sinh Thủy** — kim loại nung chảy thành nước
- **Thủy sinh Mộc** — nước nuôi cây
- **Mộc sinh Hỏa** — gỗ cháy thành lửa

### §2.4 Tương Khắc (inner pentagram skip-1) — red arrows

```
HỎA khắc KIM (top → bottom-right, skip Thổ)
KIM khắc MỘC (bottom-right → top-left, skip Thủy)
MỘC khắc THỔ (top-left → right, skip Hỏa)
THỔ khắc THỦY (right → bottom-left, skip Kim)
THỦY khắc HỎA (bottom-left → top, skip Mộc — completes pentagram)
```

Mnemonic explanations:
- **Hỏa khắc Kim** — lửa nung chảy kim loại
- **Kim khắc Mộc** — kim loại chặt cây
- **Mộc khắc Thổ** — cây hút dinh dưỡng từ đất
- **Thổ khắc Thủy** — đất ngăn nước
- **Thủy khắc Hỏa** — nước dập lửa

---

## §3 IMPLEMENTATION NOTE FOR DEVELOPERS

### §3.1 Coordinate calculation (canonical)

For Pentagon centered at `(cx, cy)` with element-center radius `r_label`:

```python
import math

def element_position(element_index, cx, cy, radius):
    """
    element_index: 0=Hỏa, 1=Thổ, 2=Kim, 3=Thủy, 4=Mộc
    Returns (x, y) for element label center.
    """
    angle_deg = element_index * 72       # 0, 72, 144, 216, 288
    angle_rad = math.radians(angle_deg - 90)  # -90 because top is 0° in our system
    x = cx + radius * math.cos(angle_rad)
    y = cy + radius * math.sin(angle_rad)
    return (x, y)
```

### §3.2 Petal arc construction

Each petal spans **between 2 edge vertices** (NOT between 2 element centers):

- Petal HỎA: edge `Mộc-Hỏa(324°)` → edge `Hỏa-Thổ(36°)`, label centered at 0°
- Petal THỔ: edge `Hỏa-Thổ(36°)` → edge `Thổ-Kim(108°)`, label centered at 72°
- ... etc

This ensures the element label sits in the **center** of its colored petal, not at the edge.

---

## §4 VISUAL REFERENCE

Verified implementation: `UZG_PLUS_V3_MOCKUP_05_ENTA_MODULE.html` (Phase 2 mockup, NTS approved 2026-04-30).

Reference NAM TAO PDF foundations:
- Page 59 — "Phân tích chi tiết về đặc tính ngũ hành" (tương sinh + tương khắc visual)
- Page 18 — 10 Thiên Can ngũ hành mapping
- Page 20 — 12 Địa Chi ngũ hành mapping

---

## §5 SCOPE OF AMENDMENT

This amendment supersedes:
- ENTA Canon v1 §3.2 (Pentagon Wheel sequence)
- Any prior CLA-authored content specifying different Pentagon vertex order

This amendment governs:
- ENTA Wheel rendering (Mockup #5 Pentagon)
- TAO Bazi Day Master visualization (Mockup #8 element bars)
- HOME Long-press wheel petals (Mockup #2 5 petals layout)
- Any future Pentagon visual in UZG+ V3 OS

This amendment does NOT change:
- Element data colors (Hỏa #E24B4A, Thổ #BA7517, Kim #A9ADB5, Thủy #185FA5, Mộc #1D9E75)
- Element attributes (Khúc trực, Viêm thượng, Tòng cách, Nhuận hạ, Giá sắt)
- Yin/Yang polarity logic
- Tương sinh/khắc relationships (only the visual sequence is canonicalized)

---

## §6 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial amendment — locks Pentagon geometry per NAM TAO chuẩn after NTS verbatim approval Mockup #5 |

---

🔒 ENTA Canon Amendment 001 — Pentagon §3.2 NAM TAO sequence locked
End of file.
