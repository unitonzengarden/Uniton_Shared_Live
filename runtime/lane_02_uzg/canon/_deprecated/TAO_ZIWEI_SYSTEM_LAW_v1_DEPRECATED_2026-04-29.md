# **TAO ZIWEI SYSTEM LAW v1.0**

## **Operational law for TAO V2 (Tử Vi) module — UZG+ ecosystem**

---

**Document ID:** TAO_ZIWEI_SYSTEM_LAW_v1
**Version:** 1.0
**Effective Date:** 2026-04-25
**Authority Level:** Tier 2 (extends Canon Tier 1, amendment via LAW 21)
**Parent Canon:** `TAO_ZIWEI_CANON_OFFICIAL_v1.md`
**Status:** PROPOSED — awaiting NTS approval

---

## **Purpose**

Document này khóa các **luật vận hành** mà mọi component của TAO V2 (chart engine, reading engine, AIER Tao advisory, membership flow, Circle Business hooks, UI/UX surfaces) phải tuân thủ.

Luật ở đây không phải luật toán mệnh (đó là interpretive layer), mà là luật **operational discipline** để TAO V2 không drift thành công cụ phán mệnh, không trở thành chatbot bói toán, và không vi phạm canon ENTA → TAO → AIER.

---

# **SECTION A — 10 CORE LAWS**

## **LAW 1 — IDENTITY BEFORE INTERPRETATION**

**Statement:** Mọi TAO operation phải bắt đầu từ ENTA identity hoặc validated birth data. Không có identity → không có chart → không có reading → không có advisory.

**Enforcement:** TAO không tạo lá số cho user vô danh. Anonymous user được phép xem sample chart (read-only demo), không được tạo personal chart.

---

## **LAW 2 — NO CHART WITHOUT VALIDATED BIRTH DATA**

**Statement:** Chart generation requires complete + validated input: năm, tháng, ngày, giờ sinh, giới tính, timezone/location.

**Enforcement:** Thiếu giờ sinh → chart_status='partial', explicit warning hiển thị. Không cho phép missing data sau khi gọi engine — engine phải reject input invalid.

---

## **LAW 3 — NO DUPLICATED INPUT IF ENTA ALREADY EXISTS**

**Statement:** Nếu ENTA profile đã có dữ liệu sinh, TAO MUST reuse, không bắt user nhập lại.

**Enforcement:** Reuse policy: TAO query ENTA → if data complete, skip input form → if partial, prefill + ask user fill missing only.

---

## **LAW 4 — NO DETERMINISTIC FATE CLAIM**

**Statement:** TAO output không được dùng ngôn ngữ tuyệt đối: 'số mệnh của bạn là...', 'bạn chắc chắn sẽ...', 'không thể tránh khỏi...'.

**Enforcement:** Allowed: 'xu hướng', 'cấu trúc', 'có khả năng', 'cần thận trọng', 'điểm mạnh', 'điểm cần cân bằng'. Forbidden: 'đại hung', 'tuyệt mệnh', 'phải', 'sẽ chắc chắn'.

---

## **LAW 5 — NO FEAR-BASED PREDICTION UX**

**Statement:** UI/UX không được tạo cảm giác sợ hãi, sốc, dọa nạt. Không màu đỏ alarm cho 'hạn xấu'. Không animation alert cho hung tinh. Không countdown đến ngày 'kỵ'.

**Enforcement:** Mọi cảnh báo phải framed as 'period requiring attention' hoặc 'opportunity for awareness', không phải 'danger zone'.

---

## **LAW 6 — NO AI-GENERATED CHART WITHOUT ENGINE TRUTH**

**Statement:** AIER Tao KHÔNG được tự lập lá số. AIER chỉ consume chart object đã sinh từ TAO Core Calculation Engine.

**Enforcement:** Mọi chart trong AIER context phải có valid `chart_id` reference vào DB. AIER tự sinh chart = violation, immediate halt.

---

## **LAW 7 — NO MEMBERSHIP OVERCLAIM WITHOUT ENTITLEMENT**

**Statement:** Reading depth phải gate đúng theo membership tier. Free tier không được unlock premium reading qua bug, exploit, hoặc UI shortcut.

**Enforcement:** Membership check trên backend (không trust frontend). Mỗi reading API call phải verify entitlement trước khi return.

---

## **LAW 8 — NO SERVICE RECOMMENDATION WITHOUT GROUNDED READING STATE**

**Statement:** TAO không được đẩy upsell expert reading / workshop / membership upgrade chỉ dựa trên click pattern hoặc engagement metric. Phải có grounded reading state — chart đã tính + reading đã sinh + context user đã consume.

**Enforcement:** Service hooks fire khi: user finished reading section X + reading state shows pattern Y + user level matches offer Z. Không phải mọi user vào TAO đều thấy upsell.

---

## **LAW 9 — NO AIER ADVICE WITHOUT TAO CONTEXT BINDING**

**Statement:** AIER Tao reply mọi câu hỏi phải bound bởi: (a) chart object của user, (b) reading state đã generated, (c) interaction history. Không free-form advice ngoài bounded context.

**Enforcement:** Nếu user hỏi câu ngoài scope chart hiện có, AIER phải redirect: 'Câu hỏi này cần thêm context X, anh muốn em compute thêm reading layer này không?' — không bịa.

---

## **LAW 10 — NO PRODUCT SURFACE MAY OVERRIDE CANON INTERPRETATION RULES**

**Statement:** UI/UX, copy, marketing, content team không được override các interpretation rules trong canon. Ví dụ: marketing không được dùng câu 'lá số của bạn quyết định cuộc đời', dù catchier.

**Enforcement:** Mọi user-facing content phải pass canon review trước khi ship. Marketing copy phá canon = block at review gate.

---

# **SECTION B — 4 CRITICAL REDLINES**

Redlines = HARD STOP. Vi phạm = immediate halt + escalation. Không có exception, không có 'just this once'.

## **REDLINE 1 — NO DEATH/CATASTROPHE PREDICTION**

**Statement:** TAO TUYỆT ĐỐI KHÔNG được output language phán đoán cái chết, tai họa cụ thể, ngày giờ tử vong, hoặc 'tuyệt mệnh' theo nghĩa trực diện.

**Enforcement:** Hung tinh / Hóa Kỵ / hạn xấu chỉ được mô tả như 'period requiring extra awareness' với neutral framing. Engine layer KHÔNG được generate output containing keywords: 'chết', 'tử', 'tai nạn', 'tuyệt mệnh', 'không qua khỏi'. Content moderation lock at engine level.

---

## **REDLINE 2 — NO MYSTICISM SHOCK FOR ENGAGEMENT**

**Statement:** TAO KHÔNG được biến thành mystical content engine để câu engagement. Không 'lá số bí ẩn của bạn tiết lộ...', không clickbait headlines, không gamified destiny reveals.

**Enforcement:** UI/UX review gate: nếu copy có yếu tố mystical hook → reject. Marketing content vi phạm → strip + rewrite. Repeat violation = team review.

---

## **REDLINE 3 — AIER TAO NEVER ACTS AS 'THẦY PHÁN'**

**Statement:** AIER Tao KHÔNG được phép ngôn ngữ kiểu thầy số ra phán quyết: 'theo lá số của bạn, tôi phán...', 'số bạn là...', 'mệnh bạn không tốt...'.

**Enforcement:** AIER prompt template enforced: AIER là advisor explainer, không phải authority figure. Output phải framed: 'theo cấu trúc lá số, có xu hướng...', 'dựa trên cung X tại vị trí Y, có thể...'. Phán quyết = halt + reset prompt.

---

## **REDLINE 4 — NO USE OF TỬ VI FOR DISCRIMINATION OR MANIPULATION**

**Statement:** TAO KHÔNG được dùng để: (a) phân biệt đối xử dựa trên 'số mệnh' của người khác, (b) thao túng hành vi người dùng (ví dụ: 'mua membership ngay vì hôm nay là ngày tốt'), (c) đóng khung nhân cách user vào nhãn cứng.

**Enforcement:** Code-level enforcement: không có API field 'destiny_label' cho user. Không có backend logic dùng chart data làm input cho price discrimination, content gating beyond membership, hoặc behavioral nudge based on 'lucky/unlucky day'.

---

# **SECTION C — CONSTITUTIONAL RULES FOR AIER TAO (from Canon §14.4)**

> Source: V3 PHẦN 14 §14.4.5. These rules govern AIER Tao behavior at runtime.

AIER Tao:

- **được quyền** giải thích cấu trúc, chu kỳ, guidance
- **không được quyền** lập chart nếu chưa có engine
- **không được quyền** phán mệnh tuyệt đối
- **không được quyền** dùng chart để đóng khung nhân cách người dùng
- **không được quyền** biến Hóa Kỵ, sát tinh hay hạn xấu thành lời dọa nạt

---

## **Working definition (from Canon §14.4.6)**

**Quan điểm TAO UZG+ là không dùng Tử Vi để phán số tuyệt đối, gây sợ hãi hay đóng khung con người; TAO chỉ dùng Tử Vi để hiểu cấu trúc, đọc chu kỳ, hỗ trợ guidance và enrich context cho AIER Tao một cách có giới hạn, có đạo đức và có kiểm soát.**

---

# **SECTION D — ENFORCEMENT**

## **Where laws are enforced**

| Layer | Enforcement mechanism |
|---|---|
| Engine (Chart, Reading) | Input validation, output content moderation, schema constraints |
| AIER Tao runtime | System prompt constraints, output filter, context binding check |
| API layer | Membership entitlement check, rate limit, anonymization |
| UI/UX | Copy review gate, design review checklist, language guidelines |
| Content / Marketing | Pre-publish canon review, no exceptions for 'time pressure' |

## **Violation response**

- **Soft violation** (e.g., copy not aligned, minor UX framing issue) → review feedback, fix in next sprint
- **Hard violation** (e.g., AIER outputs 'số bạn là...', engine outputs death prediction) → immediate halt of feature, hotfix required, post-mortem
- **Redline violation** → escalate to NTS, feature shutdown, root cause analysis, prevention measure shipped before re-enable

---

# **AMENDMENT RULE**

These laws are derived from Canon. Amendment requires:
1. Proposed change + rationale ship as `TAO_ZIWEI_SYSTEM_LAW_v1_AMENDMENT_<X>.md`
2. NTS explicit approval per LAW 21
3. Cannot contradict Canon (Tier 1)
4. Old version archived
