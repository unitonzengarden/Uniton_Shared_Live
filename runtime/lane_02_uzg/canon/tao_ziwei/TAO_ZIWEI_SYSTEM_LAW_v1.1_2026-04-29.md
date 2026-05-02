# **TAO ZIWEI SYSTEM LAW v1.0**

## **Operational law for TAO V2 (Tử Vi) module — UZG+ ecosystem**

---

**Document ID:** TAO_ZIWEI_SYSTEM_LAW_v1
**Version:** 1.1 (NTS fear-UX relaxation + VN-school explicit)
**Effective Date:** 2026-04-29
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

## **LAW 5 — NO ABUSIVE FEAR-TRIGGER UX (relaxed v1.1)**

**Statement:** UI/UX không được tạo cảm giác sợ hãi, sốc, dọa nạt **một cách thao túng**. Cấm: red alarm flashing animations, countdown threatening to "death/disaster events", clickbait fear copy ("Tránh ngay nếu không sẽ...").

**ALLOWED (per NTS Vạn Niên decision 2026-04-29):**
- Hiển thị **thông tin truyền thống** ngày tốt/xấu, Hoàng Đạo/Hắc Đạo, sao tốt/xấu, hung tinh, Tam Sát, Ngũ Hoàng, Tam Nương khi user **chủ động tra cứu** (lookup-on-demand).
- Daily widget HOME hiển thị info ngày hiện tại với neutral framing.
- Push notification opt-in (user chủ động bật) với tone trung tính, không fear copy.
- Calendar showing ngày tốt/xấu cho activities cụ thể (cưới hỏi, khai trương, etc.) — đây là information layer truyền thống, không phải fear-UX.

**ENFORCEMENT (what's still banned):**
- Cảnh báo phải framed as "period requiring attention" / "thông tin truyền thống ngày này" — KHÔNG "DANGER!" / "TRÁNH NGAY!"
- Animations + sounds không được mystical-shock (no thunder rumble cho hung tinh)
- Push notification copy phải neutral information, không urgency-fear ("⚠️ HÔM NAY KỴ! HỦY MỌI KẾ HOẠCH!")
- Color palette: muted tones for "hung", không red-alarm flashing
- User always has opt-out toggle for any notification stream

**Working principle:** Information layer (truyền thống Á Đông) is allowed and encouraged when user actively seeks. Manipulation layer (force/scare/exploit) is banned. The line: who initiates — user pulls = OK, system pushes fear = banned.

---

## **LAW 6 — NO AI-GENERATED CHART WITHOUT ENGINE TRUTH**

**Statement:** AIER Tao KHÔNG được tự lập lá số. AIER chỉ consume chart object đã sinh từ TAO Core Calculation Engine.

**Enforcement:** Mọi chart trong AIER context phải có valid `chart_id` reference vào DB. AIER tự sinh chart = violation, immediate halt.

---

## **LAW 7 — NO MEMBERSHIP OVERCLAIM WITHOUT ENTITLEMENT**

**Statement:** Reading depth phải gate đúng theo membership tier. Free tier không được unlock premium reading qua bug, exploit, hoặc UI shortcut.

**Enforcement:** Membership check trên backend (không trust frontend). Mỗi reading API call phải verify entitlement trước khi return.

---

## **LAW 8 — SERVICE RECOMMENDATION REQUIRES CONTEXT (relaxed v1.1)**

**Statement:** TAO **được phép** đẩy gợi ý dịch vụ (expert reading, workshop, membership upgrade) khi có **context phù hợp** — bao gồm grounded reading state, user-initiated activity lookup (e.g., user search "ngày tốt khai trương"), hoặc explicit user interest.

**ALLOWED (per NTS Vạn Niên decision 2026-04-29):**
- User search "tìm ngày tốt cưới hỏi" → display booking CTA cho dịch vụ tổ chức cưới
- User bookmark a date for activity → reminder + booking option 7 days before
- User completed reading + chart shows pattern Y → relevant service hint
- Daily widget shows "hôm nay phù hợp khởi sự" + nearby relevant services

**STILL BANNED:**
- Fear-driven upsell ("Mua ngay vì hôm nay là ngày tốt cuối cùng!")
- Bait-and-switch (free user thấy "Ngày tốt!" rồi paywall blocks chi tiết)
- A/B testing fear copy vs neutral copy
- Cross-user data exploit (price discrimination based on chart)

**Working principle:** Recommendation OK when relevant + non-coercive. Fear-as-conversion-tool banned regardless of conversion rate.

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

## **REDLINE 2 — NO PREDATORY MYSTICISM CLICKBAIT (relaxed v1.1)**

**Statement:** TAO **không được dùng mystical clickbait** để câu engagement bằng cách bóp méo info hoặc tạo curiosity gap không đáp ứng. KHÔNG: 'BẠN SẼ KHÔNG TIN ĐƯỢC lá số của mình tiết lộ điều gì...', 'CHỈ 1% LÁ SỐ HIẾM...', 'TIẾT LỘ BÍ MẬT vận mệnh...'.

**ALLOWED:**
- Văn hóa truyền thống Á Đông có yếu tố tâm linh + mystical aesthetic — UZG+ không phải xóa hết để trở thành calculator vô hồn.
- "Khám phá cấu trúc lá số của bạn" / "Hiểu thêm về cung Mệnh" / "Sao Tử Vi của bạn ở cung nào" — đều OK.
- Content kể chuyện về hung tinh/cát tinh với tone giáo dục, không khinh khi nhưng cũng không over-spook.

**STILL BANNED:**
- Headline có cấu trúc "BẠN SẼ KHÔNG TIN..." / "TIẾT LỘ NHỮNG ĐIỀU..." / "BÍ MẬT số..."
- Gamified destiny reveals (lottery-style "spin the wheel for your fortune")
- Promise mystical info bị paywall ngay sau khi user click
- A/B test mystical fear-copy vs neutral

**Working principle:** Mystical aesthetic OK as cultural inheritance. Mystical-as-bait-for-engagement banned.

---

## **REDLINE 3 — AIER TAO NEVER ACTS AS 'THẦY PHÁN'**

**Statement:** AIER Tao KHÔNG được phép ngôn ngữ kiểu thầy số ra phán quyết: 'theo lá số của bạn, tôi phán...', 'số bạn là...', 'mệnh bạn không tốt...'.

**Enforcement:** AIER prompt template enforced: AIER là advisor explainer, không phải authority figure. Output phải framed: 'theo cấu trúc lá số, có xu hướng...', 'dựa trên cung X tại vị trí Y, có thể...'. Phán quyết = halt + reset prompt.

---

## **REDLINE 4 — NO DISCRIMINATION OR ABUSIVE MANIPULATION (relaxed v1.1)**

**Statement:** TAO KHÔNG được dùng để:
- (a) phân biệt đối xử dựa trên 'số mệnh' của người khác (price discrimination, content gating dựa trên chart, refusing service to certain Bazi profiles, etc.),
- (b) **abusive** thao túng hành vi user (cấm: ép user mua trong urgency-fear; ALLOW: gợi ý dịch vụ phù hợp khi user search activity),
- (c) đóng khung nhân cách user vào nhãn cứng public-facing (cấm: "Bính Hỏa = lãnh đạo bẩm sinh" như verdict; ALLOW: "Bazi của anh có xu hướng leadership traits, cấu trúc...").

**ALLOWED (per NTS Vạn Niên decision 2026-04-29):**
- Daily widget hiển thị info ngày hôm nay với recommendations cho activities
- Push notification opt-in về ngày hợp/khắc với user's energy
- Booking CTA cho dịch vụ trong context Lịch Vạn Niên (cưới hỏi, khai trương, etc.)
- Cross-module integration TAO ↔ AIER ↔ Lịch ↔ Wallet với fair-use rules

**STILL HARD-BANNED:**
- Backend logic dùng chart data làm input cho **price discrimination**
- API field `destiny_label` hoặc `bazi_personality_class` exposing user
- Content gating ngoài membership tier
- Refusing service based on Bazi/cung mệnh
- Cross-user data leak (User A's chart used to target User B in adversarial way)
- Fear-as-conversion-tool ("Hôm nay là ngày kỵ! Mua giải hạn ngay!")

**Working principle:** Recommendations + integrations OK when user-initiated and non-discriminatory. Identity-based discrimination + abusive psychological manipulation banned.

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

---

# **VERSION LOG**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-25 | Initial — 10 laws + 4 redlines + Constitutional rules |
| v1.1 | 2026-04-29 | NTS fear-UX relaxation (per Vạn Niên decision): LAW 5 relaxed (info layer + lookup OK, abusive fear-trigger banned). LAW 8 relaxed (recommendation with context OK, fear-driven banned). REDLINE 2 relaxed (cultural mystical aesthetic OK, predatory clickbait banned). REDLINE 4 relaxed (recommendations + cross-module integration OK, discrimination + abusive manipulation hard-banned). VN-school confirmation: TAO V2 uses Tết Nguyên Đán (year boundary) + lunar month (month boundary), aligning với TAO V1. |

---

# **VN-SCHOOL CONFIRMATION (added v1.1)**

Per NTS school lock 2026-04-29, TAO V2 (Tử Vi) uses **Vietnamese school** boundaries:
- Year pillar boundary = Tết Nguyên Đán (mùng 1 tháng Giêng âm lịch)
- Month pillar boundary = mùng 1 lunar month
- Day pillar = JDN-based
- Hour pillar = with Tý phase rollover

Same as TAO V1 (Bazi). Cross-engine integrity (LAW 3): all 4 pillars Bazi = all 4 pillars Tử Vi for same person — full alignment, no expected divergence.

Cross-source validation: must use VN-school references, NOT classical Chinese tools (Joey Yap, paipan.cn, etc.) — those use Lập Xuân + tiết khí which differ.

---

# **SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.1 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ awaiting | — |
| Effective | — | ⏳ pending | — |

**END — TAO_ZIWEI_SYSTEM_LAW_v1**

