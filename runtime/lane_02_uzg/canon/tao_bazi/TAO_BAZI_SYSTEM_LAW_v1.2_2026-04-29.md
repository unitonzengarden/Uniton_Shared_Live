# **TAO BAZI SYSTEM LAW v1.0**

## **Operational law for TAO V1 (Bazi / Tứ Trụ) + TAO V3 (Phong Thủy) module — UZG+ ecosystem**

---

**Document ID:** TAO_BAZI_SYSTEM_LAW_v1
**Version:** 1.2 (NTS fear-UX relaxation)
**Effective Date:** 2026-04-29
**Layer:** 2 (Lane_02 project knowledge)
**Authority Level:** Tier 2 — operational law, parallel to `TAO_ZIWEI_SYSTEM_LAW_v1`
**Parent Canon:** `TAO_ZIWEI_CANON_OFFICIAL_v1.md` (shared — Bazi + Tử Vi + Phong Thủy fall under same TAO module umbrella)
**Companion documents:**
- `TAO_BAZI_UI_UX_CANON_v1.md` (UI surfaces)
- `TAO_BAZI_PHONGTHUY_REFERENCE_v1.md` (Tier 3 — formulas)
- `TAO_LUNAR_CALENDAR_ALGORITHM_v1.md` (Tier 3 — input)
**Status:** ⏳ DRAFT — pending NTS approval
**Issued by:** CLA-2 (Lane_02)

---

## **§0 — POSITION TRONG TAO MODULE STACK**

TAO module = combined stack:
- **TAO V1** = Bazi (Tứ Trụ) — pillar destiny analysis
- **TAO V2** = Tử Vi Đẩu Số — palace destiny chart (governed by `TAO_ZIWEI_SYSTEM_LAW_v1`)
- **TAO V3** = Phong Thủy — environmental energy

Doc này governs **TAO V1 + TAO V3**. Lý do gộp 1 doc: cả 2 module dùng chung Bazi day master / cung mệnh / element framework, governance principles trùng nhau.

When codebase mature, doc này có thể split thành `TAO_BAZI_SYSTEM_LAW_v2` + `TAO_PHONGTHUY_SYSTEM_LAW_v2`. Hiện tại compact để tránh fragmentation.

---

## **§1 — PURPOSE**

Doc này khóa các **luật vận hành** mà mọi component của TAO V1 (Bazi engine, Bazi reading, AIER Bazi advisory, Premium tier compatibility check) + TAO V3 (Phong Thủy profile, Bát Trạch direction analysis, Cửu Cung Phi Tinh) phải tuân thủ.

Luật ở đây không phải luật toán mệnh (đó là interpretive layer), mà là **operational discipline** để TAO V1/V3 không drift thành công cụ phán mệnh hoặc thao túng tâm lý qua "phong thủy phán quyết".

---

# **SECTION A — 12 CORE LAWS (TAO V1 + V3)**

## **LAW 1 — IDENTITY BEFORE INTERPRETATION**

**Statement:** Mọi Bazi/Phong Thủy operation phải bắt đầu từ ENTA identity hoặc validated birth data. Không có identity → không có chart → không có reading → không có advisory.

**Enforcement:** Anonymous user được phép xem sample/demo, không được tạo personal profile.

---

## **LAW 2 — NO CHART WITHOUT VALIDATED BIRTH DATA**

**Statement:** Bazi engine yêu cầu **complete + validated input**: năm/tháng/ngày/giờ sinh, giới tính, timezone/location.

**Enforcement:** Thiếu giờ sinh → Bazi engine **không được tạo full 4-pillar chart**. Chỉ được tạo 3-pillar partial (năm/tháng/ngày) với cờ rõ ràng `chart_status='partial'`, `confidence='low'`, và explicit warning hiển thị: "Bazi không có giờ sinh thì không xác định Hour Pillar — vốn rất quan trọng cho phân tích".

---

## **LAW 3 — SAME CALENDAR ENGINE FOR ALL TAO MODULES**

**Statement:** Bazi và Tử Vi cùng consume `normalized_birth_profile` từ engine `TAO_LUNAR_CALENDAR_ALGORITHM_v1`. **KHÔNG được recompute calendar layers**.

**Enforcement:**
- Same person → same Year/Day/Hour Can-Chi across Bazi và Tử Vi (sanity check).
- Bazi V1 (VN-school) uses **same boundaries as Tử Vi V2**: Year = Tết Nguyên Đán, Month = lunar month boundary. **All 4 pillars must agree** between Bazi and Tử Vi for the same person.
- Any disagreement on year/month/day/hour Can-Chi between Bazi and Tử Vi = engine bug → halt + escalate.
- Bất kỳ disagreement nào ngoài Month Pillar = engine bug → halt.

---

## **LAW 4 — NO DETERMINISTIC FATE CLAIM**

**Statement:** Bazi/Phong Thủy output không được dùng ngôn ngữ tuyệt đối: 'Mệnh số bạn là...', 'Dụng thần của bạn quyết định cuộc đời...', 'Phong thủy nhà bạn xấu — sẽ tai họa...'.

**Enforcement:**
- Allowed: 'Bazi của bạn nghiêng về xu hướng X', 'Theo cấu trúc, dụng thần phù hợp là Y', 'Bát Trạch gợi ý Z là phương hợp'.
- Forbidden: 'Số bạn là...', 'Phán mệnh...', 'Phong thủy nhà sai = chắc chắn xui'.

---

## **LAW 5 — NO ABUSIVE FEAR-TRIGGER PHONG THỦY UX (relaxed v1.2)**

**Statement:** Phong Thủy interface không được tạo cảm giác sợ hãi **một cách thao túng** về nhà cửa hoặc môi trường sống. Cấm fear-shock alarms như red flashing "NGUY HIỂM!", countdown "30 NGÀY NỮA TAM SÁT TẤN CÔNG!".

**ALLOWED (per NTS Vạn Niên decision 2026-04-29):**
- Hiển thị thông tin truyền thống về Ngũ Hoàng / Tam Sát / Hung tinh khi user **chủ động tra cứu**
- Push notification opt-in về annual flying star activations với neutral tone
- Daily widget hiển thị Phi Tinh hôm nay tại các khu vực nhà
- Solution-oriented framing với product recommendations contextual

**ENFORCEMENT (still banned):**
- Hung tinh chỉ được mô tả như "vùng năng lượng cần chú ý" / "khu vực cần điều hòa" — KHÔNG "NGUY HIỂM TUYỆT ĐỐI"
- KHÔNG dùng red-alarm flashing animations cho Phi Tinh xấu — muted tones
- Solution-oriented: "Có thể đặt vật phẩm ngũ hành tương khắc để cân bằng" thay vì "Tránh tuyệt đối!"
- Push notification copy phải neutral information, không urgency-fear

**Working principle:** Information layer (Phi Tinh, Ngũ Hoàng, Tam Sát truyền thống) is allowed when user actively engages. Fear-trigger UX (flashing red, threatening countdowns, urgency-spam) is banned.

---

## **LAW 6 — PHONG THỦY UPSELL REQUIRES CONTEXT (relaxed v1.2)**

**Statement:** TAO V3 **được phép** đẩy gợi ý vật phẩm phong thủy + dịch vụ khi có **context phù hợp**. Cấm fear-driven push.

**ALLOWED (per NTS Vạn Niên decision 2026-04-29):**
- User browsing Phi Tinh chart → relevant product recommendations với context "theo Bát Trạch của bạn"
- User search "vật phẩm cân bằng Ngũ Hoàng" → marketplace results
- User booking Phong Thủy consultation → upsell consultation packages
- Daily widget shows residence Phi Tinh + relevant marketplace items

**STILL BANNED:**
- Fear-driven push: "Phong thủy nhà bạn cần ngay vật phẩm X — mua liền tránh tai họa!" (urgency-fear)
- Notification spam: "⚠️ NGŨ HOÀNG TẤN CÔNG! MUA NGAY GIẢI HẠN!" (abusive)
- Bait-and-switch: tease info → paywall blocks chi tiết
- Vendor verification bypass: chỉ verified vendors được upsell
- Cross-user fear-conversion exploit

**Working principle:** Marketplace + product recommendations OK when user-initiated and context-grounded. Fear-as-conversion-tool banned.

---

## **LAW 7 — NO AI-GENERATED CHART WITHOUT ENGINE TRUTH**

**Statement:** AIER Bazi/Phong Thủy advisor KHÔNG được tự tạo Bazi chart hoặc Phong Thủy profile. Chỉ consume objects đã được TAO V1/V3 engine tạo ra.

**Enforcement:**
- Mọi chart trong AIER context phải có valid `chart_id` reference vào DB.
- AIER tự sinh chart = violation, immediate halt.
- AIER tự đoán dụng thần ngoài Bazi engine output = violation.

---

## **LAW 8 — NO MEMBERSHIP OVERCLAIM WITHOUT ENTITLEMENT**

**Statement:** Reading depth phải gate đúng theo membership tier. Free tier không được unlock Premium reading qua bug, exploit, hoặc UI shortcut.

**Enforcement:**
- Bazi 4-pillar full reading + dụng thần analysis: Premium-gated
- Phong Thủy Bát Trạch: Member-gated
- Phi Tinh detailed analysis: Premium-gated
- Compatibility check (2 charts cưới hỏi): Premium-gated
- Backend membership check, không trust frontend.

---

## **LAW 9 — SERVICE RECOMMENDATION REQUIRES CONTEXT (relaxed v1.2)**

**Statement:** TAO V1/V3 **được phép** đẩy gợi ý dịch vụ (expert reading, phong thủy consultation, vật phẩm marketplace) khi có **context phù hợp** — bao gồm grounded reading state, user-initiated activity lookup, hoặc explicit user interest.

**ALLOWED (per NTS Vạn Niên decision 2026-04-29):**
- User search "ngày tốt khai trương" → display booking cho expert + relevant Phong Thủy services
- User completed Bazi reading + chart shows pattern → relevant service hint
- User browsing Phi Tinh → marketplace items contextual
- Daily widget với booking integration

**STILL BANNED:**
- Engagement-only triggers without context (e.g., "user mở Phong Thủy 5 lần" → blind push consultation)
- Fear-driven push ("Bạn nguy hiểm! Đặt consultation ngay!")
- Cross-user behavioral exploitation
- Bait-and-switch upsell

**Working principle:** Service hooks OK when context-grounded + non-coercive. Engagement-spam + fear-tactics banned.

---

## **LAW 10 — NO AIER ADVICE WITHOUT TAO CONTEXT BINDING**

**Statement:** AIER Bazi/Phong Thủy reply mọi câu hỏi phải bound bởi: (a) Bazi chart object của user, (b) Phong Thủy profile (nếu có), (c) interaction history. Không free-form advice ngoài bounded context.

**Enforcement:**
- User hỏi câu ngoài scope → AIER redirect: "Câu hỏi này cần thêm context X, anh muốn em compute thêm reading layer này không?"
- AIER không bịa dụng thần, không đoán phong thủy nhà nếu user chưa cung cấp residence data.

---

## **LAW 11 — NO PRODUCT SURFACE MAY OVERRIDE CANON INTERPRETATION RULES**

**Statement:** UI/UX, copy, marketing, content team không được override các interpretation rules trong canon. Marketing copy "Bazi của bạn quyết định sự nghiệp!" = block at review gate.

**Enforcement:**
- Mọi user-facing content phải pass canon review trước khi ship.
- Repeat violation = team review.

---

## **LAW 12 — RESIDENCE DATA = SENSITIVE PERSONAL DATA**

**Statement:** Phong Thủy advisory cần residence data (địa chỉ nhà, hướng cửa chính, hướng giường, etc.). Đây là **highly sensitive personal data** — phải được treat như vậy.

**Enforcement:**
- Explicit user consent before collection.
- Encrypted storage at rest.
- User can delete residence data anytime (Right to be Forgotten).
- Never share residence data with third parties without explicit per-instance consent.
- Per UZG+ Identity Canon: residence data is **personal** ENTA data, not public.
- AIER cannot reference user residence in cross-user contexts (e.g., "User A's house is bad, similar to User B's").

---

# **SECTION B — 5 CRITICAL REDLINES**

Redlines = HARD STOP. Vi phạm = immediate halt + escalation. Không có exception, không có 'just this once'.

## **REDLINE 1 — NO DEATH/CATASTROPHE PREDICTION FROM BAZI**

**Statement:** Bazi TUYỆT ĐỐI KHÔNG được output language phán đoán cái chết, tai họa cụ thể, ngày giờ tử vong, hoặc 'tuyệt mệnh' theo nghĩa trực diện.

**Enforcement:**
- Hung gods (Thất Sát, Thương Quan), Mộ vận, Tử vận chỉ được mô tả như "period requiring extra awareness" với neutral framing.
- Engine layer KHÔNG được generate output containing keywords: 'chết', 'tử', 'tai nạn', 'tuyệt mệnh', 'không qua khỏi'.
- Content moderation lock at engine level.

---

## **REDLINE 2 — NO MYSTICISM SHOCK FOR ENGAGEMENT**

**Statement:** TAO V1/V3 KHÔNG được biến thành mystical content engine để câu engagement. Không 'Bazi bí ẩn của bạn tiết lộ...', không 'Phong thủy nhà bạn ẩn chứa...', không clickbait headlines.

**Enforcement:**
- UI/UX review gate: nếu copy có yếu tố mystical hook → reject.
- Marketing content vi phạm → strip + rewrite.
- Premium upsell phải dựa trên depth value, không phải curiosity gap.

---

## **REDLINE 3 — AIER BAZI NEVER ACTS AS 'THẦY PHÁN'**

**Statement:** AIER Bazi advisor KHÔNG được phép ngôn ngữ kiểu thầy số ra phán quyết: 'theo Bazi của bạn, tôi phán...', 'Mệnh số bạn là...', 'Dụng thần ép buộc bạn phải...'.

**Enforcement:**
- AIER prompt template enforced: AIER là advisor explainer, không phải authority figure.
- Output phải framed: 'theo cấu trúc Bazi, có xu hướng...', 'dựa trên dụng thần Y trong tổng thể chart...'.
- Phán quyết = halt + reset prompt.

---

## **REDLINE 4 — NO DISCRIMINATION OR ABUSIVE MANIPULATION (relaxed v1.2)**

**Statement:** TAO V1/V3 KHÔNG được dùng để:
- (a) phân biệt đối xử dựa trên Bazi/dụng thần của người khác (price discrimination, refusing service, content gating beyond membership),
- (b) **abusive** thao túng hành vi user (cấm: ép user mua trong urgency-fear; ALLOW: gợi ý service phù hợp khi user search),
- (c) đóng khung nhân cách user vào nhãn cứng public-facing (cấm: "Bính Hỏa = lãnh đạo bẩm sinh" như verdict; ALLOW: "Bazi của anh có xu hướng...").

**ALLOWED (per NTS Vạn Niên decision 2026-04-29):**
- Daily widget hiển thị info ngày + Bazi-aware day energy match
- Push notification opt-in về ngày hợp/khắc với user's Bazi
- Booking CTA cho consultation/cưới hỏi/khai trương dịch vụ trong context Lịch Vạn Niên
- Cross-module integration TAO ↔ AIER ↔ Lịch ↔ Wallet với fair-use rules

**STILL HARD-BANNED:**
- Backend logic dùng Bazi data làm input cho **price discrimination**
- API field `destiny_label` hoặc `bazi_personality_class` exposing user identity
- Refusing service based on Bazi/cung mệnh
- Cross-user data leak
- Compatibility check (cưới hỏi) verdict "không nên cưới" — output phải là **relational tendency**, không phán quyết
- Fear-as-conversion-tool ("Hôm nay là ngày kỵ! Mua giải hạn!")

**Working principle:** Recommendations + integrations OK when user-initiated and non-discriminatory. Identity-based discrimination + abusive psychological manipulation banned.

---

## **REDLINE 5 — NO PHONGTHỦY FEAR-PRESCRIPTIONS (relaxed v1.2)**

**Statement:** Phong Thủy prescriptions ("đặt cây phát tài hướng Đông", "treo gương bát quái cửa chính") **được phép** khi có context residence + grounded reading. Cấm fear-prescription ("mua ngay nếu không sẽ tai họa").

**ALLOWED (per NTS Vạn Niên decision 2026-04-29):**
- Generic Bát Trạch advice với caveat "đây là gợi ý chung dựa trên năm sinh" (Free + Member tier)
- Specific prescriptions khi user có complete residence profile (Phi Tinh chart + room layout)
- Marketplace items contextual to user's Phi Tinh chart
- Daily widget gợi ý vật phẩm liên quan ngày-năng-lượng

**STILL HARD-BANNED:**
- Fear-prescription framing: "Mua ngay vật phẩm X để giải hạn!" (urgency-fear)
- Notification spam: "⚠️ NGŨ HOÀNG TẤN CÔNG! MUA NGAY!" (abusive)
- Prescription without ANY context (no residence + no Bazi profile) — purely speculative
- Vendor verification bypass — chỉ verified vendors được upsell
- Recommendation algorithm based on conversion rate optimization rather than relevance

**Working principle:** Prescriptions OK when context-grounded + neutral framing. Fear-as-prescription-tool banned regardless of conversion.

---

# **SECTION C — CONSTITUTIONAL RULES FOR AIER BAZI / PHONG THỦY**

These rules govern AIER Bazi/Phong Thủy advisor behavior at runtime, parallel to TAO_ZIWEI Constitutional Rules.

AIER Bazi/Phong Thủy:

- **được quyền** giải thích cấu trúc 4 trụ, dụng thần, đại vận, Bát Trạch
- **được quyền** đưa ra gợi ý hướng nhà, hướng làm việc dựa trên Bát Trạch
- **được quyền** flag khi user's pillar interactions với day pillar tạo dynamic đáng chú ý
- **không được quyền** lập Bazi chart nếu chưa có engine
- **không được quyền** phán mệnh tuyệt đối từ Bazi
- **không được quyền** dùng dụng thần để đóng khung nhân cách user
- **không được quyền** biến Hung gods, Tam Sát, Ngũ Hoàng thành lời dọa nạt
- **không được quyền** prescribe vật phẩm phong thủy cụ thể không có context residence
- **không được quyền** so sánh Bazi của user với Bazi của người khác cụ thể (privacy)

---

## **Working definition**

**Quan điểm TAO UZG+ là không dùng Bazi để phán số tuyệt đối, không dùng Phong Thủy để dọa nạt và bán đồ; TAO V1/V3 chỉ dùng Bazi/Phong Thủy để hiểu cấu trúc nội tại + tương quan môi trường, hỗ trợ guidance và enrich context cho AIER advisor một cách có giới hạn, có đạo đức và có kiểm soát.**

---

# **SECTION D — INTERACTION WITH OTHER MODULES**

## **D.1 — TAO V1 ↔ TAO V2 (Tử Vi)**

- Same person, same calendar engine input.
- Year/Day/Hour Can-Chi must agree.
- Month boundary divergence is **expected**, not a bug.
- Combined reading mode (Premium): Bazi dụng thần overlays Tử Vi palace map. Per `TAO_ZIWEI_ROADMAP_v1` Phase 4.1.

## **D.2 — TAO V1/V3 ↔ ENTA**

- Bazi day master element → upgrades ENTA element accuracy.
- Cung Mệnh (Phong Thủy) → derives from same year+gender ENTA already has.
- ENTA module reads from Bazi/Phong Thủy if user has these profiles, with priority chain per `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §17.

## **D.3 — TAO V1/V3 ↔ Lịch Vạn Niên**

- Lịch Vạn Niên consume Bazi to provide **personalized day energy** (per `TAO_BAZI_PHONGTHUY_REFERENCE_v1` §15).
- Phong Thủy daily flags (Ngũ Hoàng location, Tam Sát) shown to Premium users with residence data.

## **D.4 — TAO V1/V3 ↔ Wallet**

- U-reward triggered on first Bazi reading completion (similar to Tử Vi pattern).
- Service booking via Phong Thủy consultation gates through Wallet payment.
- Same fair-use rules per LAW 9.

## **D.5 — TAO V1/V3 ↔ AIER Tao**

- AIER Tao now spans 3 contexts: Bazi context, Tử Vi context, Phong Thủy context.
- AIER context pack expanded: `aier_context_pack.bazi_chart`, `.phongthuy_profile`, `.ziwei_chart`.
- AIER can cross-reference (e.g., "Theo Bazi của anh, dụng thần là Mộc; theo Tử Vi, cung Tài có Lộc — đây là điểm cộng hưởng").
- All output still bound by REDLINE 3 (no thầy-phán).

## **D.6 — TAO V1/V3 ↔ Circle Business**

- Phong Thủy consultation (paid expert) integration via verified vendor network.
- Vật phẩm phong thủy marketplace (future) — must comply with REDLINE 5 (no fear-prescription).
- Booking date for consultation can leverage Lịch Vạn Niên find-good-days.

---

# **SECTION E — ENFORCEMENT**

## **Where laws are enforced**

| Layer | Enforcement mechanism |
|---|---|
| Engine (Bazi, Phong Thủy) | Input validation, output content moderation, schema constraints |
| AIER Bazi runtime | System prompt constraints, output filter, context binding check |
| API layer | Membership entitlement, rate limit, residence data encryption |
| UI/UX | Copy review gate, design review checklist, language guidelines |
| Content / Marketing | Pre-publish canon review, no exceptions for time pressure |
| Data layer | Residence data encryption, deletion right, no cross-user leakage |

## **Violation response**

- **Soft violation** (e.g., copy not aligned, minor UX framing issue) → review feedback, fix in next sprint
- **Hard violation** (e.g., AIER outputs "Bazi của bạn là...", Phong Thủy generates "nhà bạn = xui") → immediate halt of feature, hotfix required, post-mortem
- **Redline violation** → escalate to NTS, feature shutdown, root cause analysis, prevention measure shipped before re-enable

---

# **SECTION F — INTEROPERATION WITH UZGPLUS_VANNIEN_CALENDAR_SPEC**

`UZGPLUS_VANNIEN_CALENDAR_SPEC_v1.md` §0.1 declared canon rewrite pending. Doc này does NOT block on that — but it must be re-reviewed when canon rewrite ships.

Specifically, if UZG+ rewrites canon to enable push notifications + booking/upsell theo ngày, doc này should re-evaluate:
- LAW 9 (no service recommendation without grounded state) — confirm still applies
- REDLINE 4 — confirm still applies to Bazi/Phong Thủy
- LAW 6 (no Phong Thủy upsell exploit) — explicit reaffirmation

These laws are designed to **persist** even under expanded UZG+ scope. Bazi/Phong Thủy fear-driven manipulation is sufficiently dangerous that it deserves protection regardless of broader UZG+ scope shifts.

---

# **AMENDMENT RULE**

These laws are derived from Canon. Amendment requires:
1. Proposed change + rationale ship as `TAO_BAZI_SYSTEM_LAW_v1_AMENDMENT_<X>.md`
2. NTS explicit approval per LAW 21 (governance amendment process)
3. Cannot contradict Canon (Tier 1)
4. Cannot weaken redlines without explicit NTS sign-off + 2-week public review period
5. Old version archived

---

# **VERSION LOG**

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-29 | Initial — TAO V1 + V3 operational law |
| v1.1 | 2026-04-29 | NTS school lock: full pillar alignment between Bazi and Tử Vi (Tết year + lunar month). LAW 3 enforcement updated — no expected divergence; any disagreement = engine bug. |
| v1.2 | 2026-04-29 | NTS fear-UX relaxation (per Vạn Niên + TAO module-wide decision): LAW 5 relaxed (info layer + Phi Tinh lookup OK, abusive fear-trigger banned). LAW 6 relaxed (marketplace + product recommendations OK with context, fear-driven push banned). LAW 9 relaxed (service hooks OK với context, engagement-spam banned). REDLINE 4 relaxed (recommendations + cross-module integration OK, discrimination + abusive manipulation hard-banned). REDLINE 5 relaxed (Phong Thủy prescriptions OK với context residence + grounded reading, fear-prescription banned). Cross-reference với UZGPLUS_VANNIEN_CALENDAR_SPEC §5 (push notification policy) + §6 (booking integration). |

---

# **SIGN-OFF**

| Role | Name | Status | Date |
|---|---|---|---|
| Issued by | CLA-2 (Lane_02) | DRAFT v1.2 | 2026-04-29 |
| Approved by | NTS — Anh Tao | ⏳ awaiting | — |
| Effective | — | ⏳ pending | — |

**END — TAO_BAZI_SYSTEM_LAW_v1**
