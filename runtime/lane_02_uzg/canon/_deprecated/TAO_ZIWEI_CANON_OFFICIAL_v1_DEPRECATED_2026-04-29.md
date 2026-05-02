# **TAO ZIWEI CANON — OFFICIAL v1.0**

## **Authority document for TAO V2 (Tử Vi) module — UZG+ ecosystem**

---

**Document ID:** TAO_ZIWEI_CANON_OFFICIAL_v1
**Version:** 1.0
**Effective Date:** 2026-04-25
**Authority Level:** Tier 1 (immutable post-approval, amendment via LAW 21)
**Source:** Extracted from `UZG_TAO_CORE_V3_CLEAN.md` PHẦN 0, 1, 14
**Status:** PROPOSED — awaiting NTS approval
**Companion documents:**
- `TAO_ZIWEI_SYSTEM_LAW_v1.md` (constraints)
- `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.md` (how-it-fits)
- `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.md` (build-able)

---

## **Purpose of this document**

Canon khóa **TAO V2 / Ziwei LÀ GÌ** trong hệ sinh thái Uniton Future. Tài liệu này không đặc tả thuật toán (xem SPEC), không đặc tả kiến trúc (xem ARCHITECTURE), và không đặc tả luật vận hành (xem LAW). Canon chỉ khóa định nghĩa, vai trò, vị trí trong stack, authority order, và ranh giới giữa thuật toán và nghiệm lý.

Bất kỳ tài liệu phía dưới (SPEC, ARCHITECTURE, LAW, UI/UX, ROADMAP, BUILD TASK) phát sinh sau Canon này đều phải bám theo Canon. Mâu thuẫn với Canon = invalid, phải amendment Canon trước (LAW 21).

---

# **SECTION 1 — DOCUMENT IDENTITY (from V3 PHẦN 0)**

## **0.1. Tên tài liệu**

**TAO UZG+ CORE 01 — Phương pháp an sao và lập lá số Tử Vi chuẩn**

Đây là tên chuẩn chính thức của tài liệu gốc dùng để khóa tầng tính toán cốt lõi cho module **TAO V2 / Tử Vi** trong hệ sinh thái **TAO UZG+**. Tên tài liệu phải được giữ nguyên thống nhất trong toàn bộ các tài liệu canon, spec, roadmap, build task và implementation note về sau, nhằm tránh việc mỗi nhóm triển khai sử dụng một tên gọi khác nhau rồi làm lệch phạm vi áp dụng của tài liệu.

Cụm **“CORE 01”** xác định rằng đây là tài liệu lõi số 1 của hệ TAO Tử Vi. Nó không phải tài liệu giới thiệu, không phải bài viết giải thích nhập môn cho người dùng cuối, và cũng không phải tài liệu marketing. Đây là tài liệu **gốc chuẩn hóa thuật toán**, dùng để xác lập nền tảng tính toán trước khi hệ thống đi sang lớp diễn giải, lớp dịch vụ hay lớp AIER advisory.

Cụm **“Phương pháp an sao và lập lá số Tử Vi chuẩn”** nhấn mạnh đúng bản chất của tài liệu:  
 đây là tài liệu nói về **cách dựng lá số**, không phải tài liệu luận đoán toàn bộ đời người. Nó giải quyết câu hỏi: hệ thống phải lấy dữ liệu gì, chuẩn hóa dữ liệu ra sao, xác định cung bàn như thế nào, an 14 chính tinh thế nào, an phụ tinh – vòng sao – hạn ra sao, và đâu là ranh giới giữa phần tính toán bất biến với phần nghiệm lý mở rộng. Cách đặt tên như vậy giúp khóa rất rõ: **tài liệu này thuộc về tầng core calculation**, không phải tầng interpretive storytelling. Điều đó cũng phù hợp với nguyên tắc lớn của toàn hệ là product và AIER không được tự tạo truth, mà chỉ được vận hành trên truth đã khóa từ tầng core.

---

## **0.2. Vai trò**

Tài liệu này giữ vai trò là **nguồn chuẩn hóa gốc** cho toàn bộ hệ thống lập lá số Tử Vi trong TAO UZG+. Nói chính xác hơn, nó là tài liệu dùng để xác lập một **core calculation standard** cho module Tử Vi, để từ đó mọi lớp phía trên như reading engine, membership service, Circle Business service flow, hay AIER Tao advisory đều phải bám theo.

Vai trò thứ nhất của tài liệu là **chuẩn hóa cách lập lá số**. Trong thực tế, cùng một người nhưng nếu khác chuẩn lịch, khác cách xác định tháng nhuận, khác quy tắc an sao, khác cách tính cung Mệnh – Thân hoặc khác logic an Tứ Hóa thì có thể cho ra các lá số lệch nhau. Với một hệ sản phẩm số như TAO UZG+, sai số như vậy là không thể chấp nhận. Vì vậy, tài liệu này tồn tại để khóa một bộ quy tắc lập số duy nhất, nhất quán, có thể audit và có thể triển khai máy tính hóa.

Vai trò thứ hai là **chuẩn hóa thứ tự an sao**. Hệ Tử Vi truyền thống không chỉ có một vài sao đơn lẻ, mà là một mạng cấu trúc gồm 14 chính tinh, nhiều lớp phụ tinh, các vòng như Lộc Tồn, Tràng Sinh, Thái Tuế, cùng các lớp hạn như Đại Hạn, Tiểu Hạn, Lưu Niên. Nếu không có một trình tự rõ ràng, việc build engine rất dễ bị rối: nhóm này an cung trước, nhóm kia an sao trước; nhóm này xem Tứ Hóa như layer phụ, nhóm kia lại lồng Tứ Hóa vào giữa quá trình an sao. Tài liệu này phải chặn toàn bộ sự nhập nhằng đó bằng một **flow calculation có thứ tự**.

Vai trò thứ ba là **khóa logic input**. Mọi hệ thống lập số đều bắt đầu từ dữ liệu đầu vào. Nhưng trong TAO UZG+, input không chỉ là năm – tháng – ngày – giờ sinh theo nghĩa cổ điển, mà còn phải đi qua lớp chuẩn hóa hiện đại như timezone, location, calendar normalization, quality score của dữ liệu, và khả năng dùng lại dữ liệu từ ENTA/Uniton ID nếu hồ sơ người dùng đã có sẵn. Do đó, tài liệu này cũng là tài liệu khóa chuẩn cho **input contract** giữa ENTA và TAO Core Calculation.

Vai trò thứ tư là **xác lập cấu trúc cung – sao – vòng – hạn** như một hệ logic hoàn chỉnh. Lá số không phải một hình ảnh tĩnh để nhìn ngắm. Nó là một mô hình tính toán có nhiều lớp:

* lớp thiên bàn  
* lớp 12 nhân sự cung  
* lớp Mệnh – Thân  
* lớp Cục  
* lớp chính tinh  
* lớp phụ tinh  
* lớp vòng sao  
* lớp Tứ Hóa  
* lớp vận hạn

Tài liệu này có trách nhiệm xác định từng lớp đó được xây ra sao, lớp nào đi trước, lớp nào đi sau, lớp nào là bất biến, lớp nào là layer diễn giải.

Vai trò thứ năm, và cũng là điểm quan trọng nhất, là **phân ranh giới giữa thuật toán và nghiệm lý**. Đây là điểm mà Thiên Lương và cả Từ Tăng Sinh đều gián tiếp cảnh báo: không thể lấy các câu phú tổng quát hay các kinh nghiệm luận đoán rồi nhập thẳng vào tầng tính toán cốt lõi như thể đó là công thức bất biến. Phú đoán, cách cục, kinh nghiệm ứng nghiệm, các mô hình sự kiện đời người… đều có giá trị, nhưng chúng thuộc **interpretive layer**, không thuộc **core algorithm layer**. Tài liệu này phải khóa ranh giới đó thật chặt, để TAO UZG+ không biến thành một hệ “AI bói toán” dùng những câu phú cứng nhắc để dựng lá số hoặc áp lời đoán hàng loạt lên con người.

Tóm lại, tài liệu này không phải để “giải lá số hay hơn”, mà để bảo đảm rằng **mọi việc giải lá số về sau đều đứng trên cùng một nền tính toán đúng**.

---

## **0.3. Vị trí trong TAO stack**

**ENTA → TAO Core Calculation → TAO Ziwei Reading → AIER Tao Advisory**

Vị trí của tài liệu này trong TAO stack phải được khóa thật rõ ngay từ đầu, bởi nếu vị trí bị hiểu sai thì toàn bộ lộ trình build sau đó sẽ lệch. Tài liệu này không nằm ở tầng social, không nằm ở tầng AI, và cũng không nằm ở tầng nghiệm lý thương mại. Nó thuộc về **TAO Core Calculation** — tức tầng tính toán cốt lõi của hệ Tử Vi.

Ở phía trước của nó là **ENTA**. ENTA là nơi nắm giữ identity năng lượng gốc của con người trong toàn hệ, bao gồm các dữ liệu sinh mệnh và context nền cần thiết để TAO có thể khởi động đúng. Điều đó có nghĩa là TAO Core Calculation không được hành xử như một khối biệt lập “muốn nhập gì thì nhập”. Nếu hồ sơ ENTA đã có dữ liệu sinh của người dùng, TAO phải có khả năng dùng lại dữ liệu đó như input chuẩn, thay vì buộc người dùng nhập lại nhiều lần. Điều này thống nhất với hướng đi mà anh đã khóa cho TAO V2 trước đó.

Ở chính giữa là **TAO Core Calculation**. Đây là nơi tài liệu hiện tại đang thuộc về. Nhiệm vụ của tầng này là:

* nhận input đã chuẩn hóa  
* dựng thiên bàn  
* an Mệnh, Thân, 12 cung  
* xác định Cục  
* an chính tinh  
* an phụ tinh  
* an các vòng  
* an các lớp hạn  
* tạo ra **lá số đúng chuẩn**

Tầng này không làm nhiệm vụ kể chuyện, không làm nhiệm vụ luận giải “đẹp”, và càng không làm nhiệm vụ khuyên người dùng nên làm gì trong cuộc đời. Nó chỉ làm một việc: **sản xuất truth object của lá số**.

Sau đó mới đến **TAO Ziwei Reading**. Đây là tầng diễn giải. Tầng này lấy lá số đã được dựng đúng làm đầu vào, rồi mới tiến hành:

* mô tả cấu trúc số mệnh  
* đọc tính chất cung sao  
* đọc xu hướng trọn đời  
* đọc đại vận, tiểu vận, lưu niên  
* tạo ra các lớp reading cho membership và service

Tầng Reading không được tự dựng lá số, không được sửa đổi kết quả core calculation, và không được chèn logic nghiệm lý trở ngược lên tầng tính toán.

Sau cùng là **AIER Tao Advisory**. Đây là tầng advisory intelligence. AIER Tao không có quyền “bịa” lá số, cũng không được hành xử như một ông thầy số độc lập khỏi hệ. Nó chỉ được phép dùng:

* lá số đã tính đúng từ TAO Core Calculation  
* reading object đã diễn giải từ TAO Ziwei Reading  
* context từ ENTA  
* lịch sử tương tác của người dùng

để tạo ra guidance có cấu trúc, bounded, và có kiểm soát. Điều này hoàn toàn phù hợp với nguyên tắc chung của toàn hệ Uniton Future: AI chỉ xử lý intelligence trên nền context và truth đã được tạo lập từ layer trước.

Vì vậy, nói ngắn gọn, tài liệu này giữ vị trí:  
 **sau ENTA, trước reading, và trước AIER advisory**.  
 Nó là **lõi dựng lá số**, không phải lõi diễn giải, và càng không phải lõi phán đoán thay con người.

---

## **0.4. Authority order**

Authority order của tài liệu này phải được xác lập minh bạch để tránh drift về sau. Khi build TAO UZG+, nếu không khóa authority order, đội triển khai rất dễ lấy một bài viết trên mạng, một bản tổng hợp chưa kiểm chứng, hoặc một cách an sao của website nào đó làm chuẩn tạm thời rồi dần dần biến nó thành chuẩn thật. Điều đó cực kỳ nguy hiểm với một hệ thống nền như TAO.

### **1\. Trần Đoàn / Tử Vi Đẩu Số Toàn Thư — gốc thuật số**

Tầng authority cao nhất của tài liệu này là **Hi Di Trần Đoàn / Tử Vi Đẩu Số Toàn Thư**. Đây là gốc thuật số, là nền để xác định hệ 12 cung, 14 chính tinh, các nhóm phụ tinh, các vòng sao và cấu trúc tổng thể của môn Tử Vi trong hệ mà TAO UZG+ lựa chọn. Các bản PDF và DOCX mà anh gửi đều cho thấy rõ đây là nguồn gốc cốt lõi của hệ thống sao, cung và toàn bộ cấu trúc thuật số.

Trong tài liệu TAO UZG+, Trần Đoàn phải được hiểu là:

* **authority của core star system**  
* **authority của cấu trúc lá số**  
* **authority của logic thuật số gốc**

Mọi phần an sao, lập số, dựng lá số đều phải ưu tiên bám theo nguồn này trước tiên.

### **2\. Thiên Lương / Tử Vi Nghiệm Lý Toàn Thư — lớp nghiệm lý hỗ trợ**

Tầng authority thứ hai là **Thiên Lương / Tử Vi Nghiệm Lý Toàn Thư**. Thiên Lương không đứng trên Trần Đoàn trong phần thuật toán, nhưng có giá trị rất mạnh ở tầng:

* nghiệm lý  
* giải thích ý nghĩa sâu  
* đọc vòng Thái Tuế, Lộc Tồn, Tràng Sinh  
* cảnh báo không áp dụng phú đoán một cách máy móc  
* nhấn mạnh cấu trúc khác nhau giữa các tuổi, các vị trí, các vòng.

Nói cách khác:

* **Trần Đoàn** giúp TAO biết **lập lá số thế nào**  
* **Thiên Lương** giúp TAO biết **khi diễn giải phải cẩn trọng ra sao**

Thiên Lương là authority của **interpretive caution**, không phải authority để ghi đè core algorithm.

### **3\. Từ Tăng Sinh / Mệnh vận phân tích — lớp hiện đại hóa cấu trúc phân tích**

Tầng authority thứ ba là **Từ Tăng Sinh / Tử Vi Đẩu Số Mệnh Vận Phân Tích**. Bộ tài liệu này có giá trị lớn ở chỗ:

* hiện đại hóa tư duy phân tích  
* coi Đẩu Số như một hệ ký hiệu nhiều lớp  
* nhấn mạnh việc nghiệm chứng, ghi case, quy nạp quy tắc  
* nhìn mối quan hệ giữa các cung, các hạn, các lớp tương tác động hơn là chỉ đọc tĩnh từng cung.

Trong TAO UZG+, Từ Tăng Sinh không được dùng để thay thế Trần Đoàn, mà được dùng như:

* lớp **methodological modernization**  
* lớp hỗ trợ thiết kế data model, audit model, reasoning model cho máy

Tức là:

* không thay core star system  
* nhưng hỗ trợ rất mạnh cho cách biến môn Tử Vi thành engine có cấu trúc và có khả năng rule-based expansion

### **4\. ENTA TAO draft files — lớp working synthesis cho implementation**

Tầng authority thứ tư là **các draft files ENTA TAO** mà anh đã gửi. Đây là lớp tổng hợp làm việc để phục vụ triển khai:

* system architecture  
* data logic  
* thuật toán sơ bộ  
* test assumptions  
* engine mapping  
* implementation notes.

Lớp này rất hữu ích cho build, nhưng không được phép đứng trên ba tầng authority phía trên. Nói cách khác:

* nếu draft synthesis mâu thuẫn với Trần Đoàn → phải sửa draft  
* nếu draft synthesis đi lệch cảnh báo của Thiên Lương → phải chỉnh interpretation layer  
* nếu draft synthesis yếu về cấu trúc phân tích → có thể mượn tư duy của Từ Tăng Sinh để bổ sung

Vì vậy, authority order phải được khóa như sau:

**Trần Đoàn \= gốc thuật số**  
 **Thiên Lương \= nghiệm lý hỗ trợ và cảnh báo phương pháp**  
 **Từ Tăng Sinh \= hiện đại hóa logic phân tích**  
 **ENTA TAO drafts \= working synthesis cho implementation**

Đây là trật tự bắt buộc để TAO UZG+ vừa giữ được gốc chuẩn, vừa hiện đại hóa được hệ thống, mà không bị trôi sang kiểu “gom nhiều nguồn rồi trộn lẫn thành một thứ lai tạp”.

---

## **0.5. Final rule**

**Không AIER nào được tự lập lá số nếu chưa đi qua core calculation engine đúng tài liệu này.**

Đây là luật khóa cuối cùng của PHẦN 0, và cũng là một trong những luật nền quan trọng nhất của toàn bộ TAO V2. Nếu không khóa luật này ngay từ đầu, hệ TAO về sau rất dễ drift thành một chatbot huyền học: người dùng hỏi vài câu, AIER bịa ra vài cung sao, rồi bắt đầu luận số như thật. Điều đó đi ngược hoàn toàn với định hướng mà anh đã khóa cho TAO UZG+.

Lá số Tử Vi không được sinh ra từ ngôn ngữ tự do.  
 Lá số Tử Vi phải được sinh ra từ:

* input chuẩn hóa  
* lịch chuẩn hóa  
* engine an cung  
* engine an cục  
* engine an chính tinh  
* engine an phụ tinh  
* engine an vòng  
* engine an hạn

Nói cách khác, **chart generation là quyền của core calculation engine**, không phải quyền của AIER conversational layer.

AIER Tao chỉ được phép làm việc sau khi có đủ các lớp truth sau:

1. **validated identity input**  
2. **normalized calendar result**  
3. **core chart object**  
4. **reading object**  
5. **bounded advisory context**

Nếu thiếu một trong các lớp trên, AIER không được quyền hành xử như thể lá số đã tồn tại. Nó có thể:

* yêu cầu bổ sung dữ liệu  
* giải thích quy trình  
* hướng dẫn người dùng  
* tạm dừng và chờ engine trả kết quả

nhưng **không được tự suy đoán để dựng chart**.

Luật này cũng hoàn toàn tương thích với triết lý product truth của toàn hệ: product và AI không tự tạo truth, mà chỉ được vận hành trên truth đã khóa từ hệ thống cốt lõi.

Do đó, câu final rule không chỉ là một ghi chú kỹ thuật. Nó là một **constitutional boundary** cho TAO V2:

* bảo vệ tính chuẩn của lá số  
* bảo vệ tính auditability của hệ  
* bảo vệ TAO khỏi drift chatbot  
* bảo vệ AIER khỏi overreach  
* bảo vệ người dùng khỏi việc nhận lời đoán dựa trên một chart không hợp lệ

Câu này phải được xem là **hard law** cho mọi lớp phía sau:  
 **Không AIER nào được tự lập lá số nếu chưa đi qua core calculation engine đúng tài liệu này.**

---

## **0.6. Table of Contents (V3 OFFICIAL)**

### **Phần thân (Core Body)**

- PHẦN 0 — DOCUMENT IDENTITY
- PHẦN 1 — MỞ ĐẦU: TỬ VI LÀ GÌ
- PHẦN 2 — NGUYÊN LÝ NỀN TẢNG
- PHẦN 3 — ĐỊNH NGHĨA DỮ LIỆU ĐẦU VÀO
- PHẦN 4 — THIẾT LẬP THIÊN BÀN
- PHẦN 5 — AN CUNG MỆNH, CUNG THÂN, 12 NHÂN SỰ CUNG
- PHẦN 6 — XÁC ĐỊNH NGŨ HÀNH CỤC
- PHẦN 7 — AN THẬP TỨ CHÍNH TINH
- PHẦN 8 — AN PHỤ TINH
- PHẦN 9 — AN CÁC VÒNG SAO LỚN
- PHẦN 10 — AN TỨ HÓA
- PHẦN 11 — KHỞI HẠN
- PHẦN 12 — CHUẨN HÓA OUTPUT CỦA LÁ SỐ
- PHẦN 13 — KIỂM TRA SAI SỐ & CHUẨN HÓA THUẬT TOÁN
- PHẦN 14 — RANH GIỚI NGHIỆM LÝ
- PHẦN 15 — PHỤ LỤC CHUẨN (15.1 - 15.26)

### **Phần phụ lục mở rộng (Appendices)**

- APPENDIX A — TUẦN TRUNG VÀ TRIỆT LỘ KHÔNG VONG
- APPENDIX B — HỆ THỐNG LƯU NIÊN & TIỂU HẠN
- APPENDIX C — MA TRẬN ĐỘ SÁNG, LOGIC GATES & VERSION CONTROL
- APPENDIX D — BẢNG KHỞI TIỂU VẬN ĐỦ 4 NHÓM TAM HỢP
- APPENDIX E — FULL CANONICAL TABLES CHO SAO PHỤ
- APPENDIX F — PRIORITY / RESONANCE / PRECEDENCE LAYER

### **Document Final**

- DF.1. Document Stack Final
- DF.2. Authority Final
- DF.3. Precedence Final
- DF.4. Legacy Deprecation Note
- ĐOẠN CHỐT CUỐI

---

---

# **SECTION 2 — DEFINITION & ROLE (from V3 PHẦN 1)**

## **1.1. Bản chất của Tử Vi Đẩu Số**

Tử Vi Đẩu Số, theo hệ Hi Di Trần Đoàn được lưu truyền trong **Tử Vi Đẩu Số Toàn Thư**, là một hệ thống lập số và luận số dùng **12 cung** cùng **14 chính tinh** làm trục cấu trúc cốt lõi để khảo sát con người và đời người căn cứ theo **giờ, ngày, tháng, năm sinh**. Trong hệ này, mười bốn chính tinh gồm: **Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng, Liêm Trinh, Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương, Thất Sát, Phá Quân**; còn mười hai cung là các khu vực biểu đạt những chiều kích khác nhau của đời sống con người như Mệnh, Huynh Đệ, Phụ Mẫu, Tử Tức, Quan Lộc, Thiên Di, Tật Ách, Tài Bạch, Nô Bộc, Điền Trạch, Phúc Đức. Chính cấu trúc này cho phép lá số trở thành một “bản đồ” tóm lược và tổ chức hóa các yếu tố cốt lõi của vận mệnh.

Điểm cần nhấn mạnh trước hết là: **Tử Vi không phải chỉ là một truyền thuyết dân gian**. Đúng là trong quá trình lưu truyền, Tử Vi đi kèm nhiều tích truyện, điển cố và cách diễn giải dân gian để giúp dễ nhớ hơn; chính **Tử Vi Đẩu Số Toàn Thư** cũng trình bày phần “Tử vi đẩu số qua truyền thuyết dân gian” để kể lại việc gán tên và tính chất các sao qua nhân vật lịch sử – truyền kỳ. Nhưng ngay trong chính nguồn này, Tử Vi được xác lập như một **“toán mệnh phương pháp”**, tức một phương pháp lập và luận mệnh có quy tắc, trong đó các sao chỉ là những ký hiệu của một bài toán số mệnh, được an theo giờ, ngày, tháng, năm sinh rồi luận trên bố cục tổng thể của lá số.

Ở góc nhìn học thuật hiện đại hơn, **Nguyễn Phát Lộc** cho rằng Tử Vi vừa là **một khoa** vừa là **một thuật**: là “khoa” khi xét nó như một hệ thống kiến thức có đối tượng, phương pháp, nền tảng tư tưởng và quy tắc diễn giải; là “thuật” khi đưa toàn bộ hệ thống đó vào ứng dụng cụ thể để giải đoán vận mệnh con người. Ông đồng thời xem Tử Vi là một bộ môn của **khoa học nhân văn ứng dụng**, nghĩa là không phải khoa học chính xác kiểu toán học – vật lý, nhưng cũng không phải chỉ là một tập hợp lời đoán vô trật tự. Nó là một hệ thống ký hiệu và quy tắc dùng để khảo sát con người và đời người, rồi từ đó dẫn sang phần giải đoán.

Nói một cách ngắn gọn nhưng chuẩn xác: **bản chất của Tử Vi Đẩu Số là một hệ thống tính – an – luận**.

* **Tính**: từ dữ liệu sinh mệnh xác định bố cục lá số.  
* **An**: đặt cung, sao, vòng, hạn đúng quy luật.  
* **Luận**: đọc mối liên hệ giữa các thành phần đã an.

Vì vậy, nếu thiếu phần **tính** và **an**, phần **luận** chỉ còn là suy diễn chủ quan. Đây chính là lý do tại sao trong TAO UZG+, việc lập lá số phải được khóa ở tầng **core calculation** trước khi mở sang tầng reading hoặc advisory.

Một điểm rất quan trọng khác là: Tử Vi không nghiên cứu con người như một mảnh rời rạc. Nhiều tài liệu tham khảo cho thấy Tử Vi luôn nhìn con người trong **toàn cục**:

* vừa xét nội tâm và cá tính,  
* vừa xét gia đạo, xã hội, nghề nghiệp, tài chính, bệnh tật, hạn vận,  
* vừa xét chuyển động của đời người theo thời gian.

Nguyễn Phát Lộc mô tả Tử Vi là bộ môn nghiên cứu **con người và đời người**, nghĩa là không chỉ dừng ở tính cách mà còn mở sang sự thành – bại, giàu – nghèo, thọ – yểu, gia đạo, nghề nghiệp và hoàn cảnh sống. Điều này làm cho Tử Vi khác với một thứ “xem bói vài câu”, vì nó cố mô hình hóa một cấu trúc đời sống chứ không chỉ phát biểu vài lời tiên đoán rời rạc.

Tuy nhiên, cũng phải nói thật rõ: Tử Vi là một hệ thống **có giới hạn**. Chính các tác giả truyền thống và hiện đại đều thừa nhận nó là một môn **dễ học nhưng khó tinh tường**, có nguy cơ bị tam sao thất bản, bị cắt nghĩa võ đoán, hoặc bị biến thành lời phán áp lực thần quyền nếu người dùng không hiểu đúng phương pháp. **Thiên Lương** cũng cảnh báo phải rất thận trọng khi áp dụng các câu phú và mô thức cổ, vì cùng một sao hay cùng một thế cục nhưng rơi vào tuổi khác, vị trí khác, vòng khác, kết cấu khác thì ý nghĩa đã đổi đi nhiều.

Vì vậy, trong tài liệu này, TAO UZG+ sẽ xác lập định nghĩa làm việc như sau:

**Tử Vi Đẩu Số là hệ thống toán mệnh dùng 12 cung và 14 chính tinh làm khung cấu trúc, dựa vào dữ liệu sinh mệnh để thiết lập một lá số chuẩn hóa, từ đó suy khảo về cấu trúc cá nhân, bối cảnh đời sống, và các chu kỳ biến động của con người.**

Định nghĩa này giúp loại bỏ hai cực đoan:

* một cực đoan coi Tử Vi chỉ là mê tín truyền khẩu,  
* một cực đoan khác thần thánh hóa Tử Vi như chân lý tuyệt đối không thể sai.

TAO UZG+ không chấp nhận cả hai cực đoan đó.

---

## **1.2. Tử Vi trong TAO UZG+**

Trong hệ TAO UZG+, Tử Vi **không được dùng như bói toán đại trà**. Nó không phải một “chuyên mục xem số online” để trả ra vài câu nói chung chung, gây tò mò, kích thích cảm xúc, hay tạo cảm giác thần bí cho người dùng. TAO UZG+ cũng không thiết kế Tử Vi như một công cụ “phán mệnh nhanh”, không hướng tới trải nghiệm kiểu hỏi một câu rồi nhận một kết luận tuyệt đối về số phận.

Thay vào đó, TAO UZG+ dùng Tử Vi như một **cấu trúc dữ liệu – diễn giải – guidance** nằm trong chuỗi phát triển rộng hơn của toàn hệ. Cụ thể, Tử Vi được đặt sau ENTA và trước AIER Tao advisory, nghĩa là nó là một **interpretation layer** phát sinh từ identity sinh mệnh và quay trở lại phục vụ việc hiểu con người, đọc chu kỳ, và cá thể hóa intelligence.

Trong TAO UZG+, Tử Vi được dùng theo bốn vai trò chính:

### **1.2.1. Destiny-structure map**

Trước hết, Tử Vi là một **destiny-structure map** — bản đồ cấu trúc số mệnh.  
 Từ dữ liệu giờ, ngày, tháng, năm sinh và giới tính, hệ thống không chỉ dựng ra một hình lá số, mà dựng ra một **cấu trúc quan hệ** giữa:

* cung Mệnh,  
* cung Thân,  
* các cung nhân sự,  
* chính tinh,  
* phụ tinh,  
* vòng sao,  
* hạn vận.

Như vậy, TAO không dùng Tử Vi để “nói một câu cho xong”, mà để dựng **một cấu trúc tham chiếu lâu dài**. Cấu trúc đó trở thành nền cho các tầng phân tích sâu hơn về sau.

### **1.2.2. Life-pattern map**

Thứ hai, Tử Vi trong TAO là một **life-pattern map** — bản đồ mô thức đời sống.  
 Mỗi lá số không chỉ biểu diễn một cá tính tĩnh, mà còn biểu diễn các mô thức như:

* cách con người phản ứng trước môi trường,  
* trục mạnh – yếu giữa nội tâm và ngoại giới,  
* tương quan giữa bản thân, gia đạo, xã hội, nghề nghiệp,  
* các xu hướng lặp lại trong đời sống,  
* các điểm dễ vượng – suy – xung – hóa.

Điều này rất gần với cách Nguyễn Phát Lộc nhìn Tử Vi như hệ khảo sát “con người và đời người”, và cũng gần với Từ Tăng Sinh khi ông xem Đẩu Số là hệ ký hiệu nhiều lớp cần được nghiệm chứng qua sự kiện và mối liên hệ giữa các cung – hạn – hóa.

### **1.2.3. Timing & guidance engine**

Thứ ba, Tử Vi trong TAO là một **timing & guidance engine**.  
 “Timing” ở đây không có nghĩa là tiên tri cứng nhắc từng sự kiện, mà là xác định:

* chu kỳ thuận – nghịch,  
* thời đoạn nên mở – nên giữ,  
* khoảng thời gian dễ biến động,  
* giai đoạn cần cẩn trọng,  
* vùng thời gian thích hợp cho một số hành động hay lựa chọn.

“Guidance” ở đây cũng không có nghĩa là AI hay hệ thống ra lệnh cho người dùng phải sống ra sao, mà là:

* giúp người dùng hiểu bối cảnh mình đang ở đâu,  
* đọc đúng nhịp của đời sống,  
* thấy được các trục căng – giãn của vận trình,  
* đưa ra gợi ý hành động có tính định hướng, không áp đặt.

Do đó, Tử Vi trong TAO không phải là công cụ “đoán cho biết”, mà là công cụ **đọc cấu trúc và đọc thời điểm**.

### **1.2.4. AIER context source**

Thứ tư, Tử Vi là **AIER context source**.  
 Đây là điểm khác biệt nền tảng của TAO UZG+ so với các sản phẩm Tử Vi truyền thống. Trong toàn hệ của anh, Tử Vi không kết thúc ở việc “luận giải cho user”, mà còn cung cấp đầu vào có cấu trúc cho **AIER Tao**.

Điều này có nghĩa là:

* Tử Vi cung cấp lớp context về cá tính, nhịp vận hành, mô thức quan hệ, vùng nhạy cảm, trục phát triển, xu hướng timing.  
* AIER Tao dùng lớp context đó để tư vấn tốt hơn, sát người hơn, cá thể hóa hơn.  
* Nhưng AIER Tao chỉ là **consumer** của lá số và reading object, không phải là nơi tự bịa chart hay tự dựng số mệnh.

Vì vậy, trong TAO UZG+, Tử Vi không chỉ là sản phẩm để người dùng “xem”, mà còn là một **nguồn dữ liệu cấu trúc phục vụ intelligence cá thể hóa**. Điều này đúng với vị trí của TAO trong stack: **ENTA → TAO Core Calculation → TAO Ziwei Reading → AIER Tao Advisory**.

Nói gọn lại, TAO UZG+ không dùng Tử Vi như:

* trò bói toán phổ thông,  
* công cụ thần bí hóa người dùng,  
* chatbot phán số,  
* content engine để sản xuất câu chữ hấp dẫn.

TAO UZG+ dùng Tử Vi như:

* **bản đồ cấu trúc**  
* **bản đồ mô thức đời sống**  
* **động cơ đọc nhịp thời gian và guidance**  
* **nguồn context cho AIER**

Đó là sự tái định vị rất quan trọng, và phải được khóa ngay từ phần mở đầu để tránh cả đội ngũ sản phẩm, nội dung, AI, membership hay vận hành dịch vụ đi sai hướng.

---

## **1.3. Giới hạn cần khóa**

Muốn dùng Tử Vi đúng trong TAO UZG+, không chỉ cần định nghĩa nó là gì, mà còn phải khóa rất rõ **nó không phải là gì**. Đây là phần đặc biệt quan trọng, vì hầu hết drift của một hệ huyền học số hóa đều bắt đầu từ chỗ bỏ qua ranh giới phương pháp.

### **1.3.1. Không đồng nhất Tử Vi với chân lý tuyệt đối**

Giới hạn đầu tiên cần khóa là: **không được đồng nhất Tử Vi với chân lý tuyệt đối**.

Tử Vi là một hệ thống tính và diễn giải dựa trên ký hiệu, quy tắc và kinh nghiệm tích lũy. Nó có giá trị lớn, nhưng không phải một “toàn tri tuyệt đối” có thể kết luận mọi thứ về con người không sai lệch. Ngay các nguồn truyền thống cũng đã tự thừa nhận nhiều điểm bất toàn:

* có phần tối nghĩa,  
* có khả năng tam sao thất bản,  
* dễ học nhưng rất khó tinh tường,  
* nếu chỉ nắm bề mặt thì dễ rơi vào áp đặt hoặc hiểu sai.

Do đó, TAO UZG+ không được phép xây trải nghiệm theo kiểu:

* “hệ thống này biết chính xác toàn bộ đời bạn”,  
* “lá số này là số phận bất biến của bạn”,  
* “AIER Tao biết chân lý tuyệt đối về con người bạn”.

Tử Vi trong TAO chỉ được xem là:

* một cấu trúc diễn giải mạnh,  
* một mô hình đọc pattern,  
* một hệ quy chiếu,  
* một công cụ guidance có điều kiện.

### **1.3.2. Không dùng phú đoán như luật cứng cho mọi trường hợp**

Giới hạn thứ hai cần khóa là: **không dùng phú đoán như luật cứng cho mọi trường hợp**.

Đây là điểm Thiên Lương nhấn rất mạnh. Ông cảnh báo rằng các câu phú là kết tinh kinh nghiệm, rất quý, nhưng không thể áp cứng như những mệnh đề tuyệt đối cho mọi người. Cùng một thế “Phá Quân Thìn Tuất” hay “Tham Sát Dần Thân”, nếu khác tuổi, khác vị trí trong vòng Thái Tuế, khác cục diện chính – phụ tinh, khác Hóa Khoa, khác Tuần Triệt, thì kết quả hoàn toàn có thể khác nhau. Chính Thiên Lương dành hẳn phần để nói **“những câu phú nên thận trọng áp dụng”**.

Vì vậy, trong TAO UZG+:

* câu phú chỉ được dùng như **interpretive reference**  
* không được dùng như **core algorithm**  
* không được biến thành if/then cứng cho mọi trường hợp  
* không được để AIER lấy một câu phú rồi gắn trực tiếp thành kết luận về người dùng

Phú có thể hỗ trợ reading, nhưng không được thay thế việc xét toàn bàn.

### **1.3.3. Phải xét tuổi**

Tử Vi không thể tách khỏi **tuổi**.  
 Thiên Lương nhấn mạnh rất mạnh quan hệ **Can – Chi**, 60 Hoa Giáp, nền căn khí thuận – nghịch của từng tuổi; còn Nguyễn Phát Lộc cũng nhấn mạnh rằng tuổi là một trong các đầu vào cốt lõi làm nên cách lập số và giới hạn của số.

Do đó, bất kỳ diễn giải nào bỏ qua tuổi là sai nền.

### **1.3.4. Phải xét cung**

Mọi luận đoán trong Tử Vi đều phải đi qua **cung**.  
 Cung không phải chỉ là nơi đặt sao, mà là khung ngữ nghĩa của toàn bộ sự kiện và đời sống: Mệnh, Thân, Phụ Mẫu, Phúc Đức, Quan Lộc, Tài Bạch, Thiên Di, Điền Trạch, v.v. Nguyễn Phát Lộc đặc biệt nhấn mạnh rằng muốn hiểu Tử Vi phải hiểu cả **hệ 12 cung** như khung khảo sát con người và đời người.

Nếu bỏ cung mà chỉ nhìn sao, lời đoán sẽ méo.

### **1.3.5. Phải xét chính tinh**

Chính tinh là trục của lá số.  
 Chính **Tử Vi Đẩu Số Toàn Thư** đã đặt 14 chính tinh làm hạt nhân của hệ thống. Vì vậy, bất kỳ lá số nào cũng phải được đọc trên bố cục chính tinh trước khi mở sang các lớp khác.

### **1.3.6. Phải xét phụ tinh**

Nếu chỉ nhìn chính tinh mà bỏ phụ tinh thì chưa phải đọc toàn bàn.  
 Ngay mục lục của **Toàn Thư** đã cho thấy một lượng lớn phụ tinh, chùm sao, vòng sao, Tuần – Triệt, Long Phượng, Tam Thai – Bát Tọa, Lộc Tồn, Hồng Loan – Thiên Hỷ, Thiên Đức – Nguyệt Đức… Điều này chứng tỏ truyền thống Tử Vi chưa bao giờ xem chính tinh là đủ.

### **1.3.7. Phải xét vòng sao**

Các vòng như:

* Lộc Tồn  
* Tràng Sinh  
* Thái Tuế  
   không phải đồ trang trí của lá số. Chúng là một phần rất trọng yếu trong cách đọc cấu trúc số, đặc biệt khi đi sang tầng nghiệm lý. Thiên Lương còn xây rất mạnh trên các trục này.

### **1.3.8. Phải xét hạn**

Tử Vi không chỉ là lá số tĩnh.  
 Nó là một hệ đọc **vận**: đại hạn, tiểu hạn, lưu niên, và ở các phái phát triển hơn thì còn có các lớp vận nhỏ hơn. Nguyễn Phát Lộc và Từ Tăng Sinh đều nhấn mạnh yếu tố biến động theo thời gian, tức là mệnh phải đi cùng vận.

### **1.3.9. Phải xét cấu trúc toàn bàn**

Đây là giới hạn cuối cùng và cũng là giới hạn lớn nhất: **mọi diễn giải phải đi qua cấu trúc toàn bàn**.

Một sao tốt không chắc đã cho kết quả tốt nếu rơi sai chỗ, bị xung phá, bị kéo bởi hung sát, hoặc ở trong một cục diện bất lợi. Một sao xấu cũng không chắc đã cho kết quả xấu tuyệt đối nếu được chế, được trợ, được hóa giải, hoặc nằm trong cấu trúc làm đổi nghĩa. Đây là điểm Thiên Lương nhấn mạnh khi nói không thể đọc phú cứng; và cũng là điểm Nguyễn Phát Lộc nhấn mạnh khi coi Tử Vi là hệ vừa phân tích vừa tổng hợp.

Do đó, TAO UZG+ phải khóa nguyên tắc:

**Không được luận Tử Vi bằng một dấu hiệu đơn lẻ.**  
 **Phải xét tuổi, cung, chính tinh, phụ tinh, vòng sao, hạn và cấu trúc toàn bàn.**

---

# **ĐOẠN CHỐT CỦA PHẦN 1**

Từ toàn bộ các điểm trên, TAO UZG+ xác lập cách hiểu chính thức như sau:

**Tử Vi Đẩu Số là hệ thống toán mệnh cấu trúc, dùng 12 cung và 14 chính tinh làm lõi, đặt trên nền dữ liệu sinh mệnh để thiết lập lá số và đọc mô thức con người – đời người. Trong TAO UZG+, Tử Vi không được dùng như bói toán đại trà, mà được dùng như bản đồ cấu trúc số mệnh, bản đồ mô thức đời sống, động cơ đọc nhịp thời gian và nguồn context cho AIER Tao. Mọi diễn giải đều phải bị ràng buộc bởi tuổi, cung, chính tinh, phụ tinh, vòng sao, hạn và cấu trúc toàn bàn; tuyệt đối không thần thánh hóa Tử Vi, cũng không áp cứng phú đoán như luật tuyệt đối.**

---

# **SECTION 3 — BOUNDARY: ALGORITHM vs INTERPRETATION (from V3 PHẦN 14)**

## **14.1. Cái gì thuộc core algorithm**

### **14.1.1. Bản chất**

`Core algorithm` là phần **cứng**, **có quy tắc**, **có thể chuẩn hóa**, **có thể audit**, **có thể lập trình** và **phải tái lập được cùng kết quả** nếu đầu vào như nhau.

Nói cách khác, đây là phần mà TAO engine phải coi là:

* deterministic calculation layer  
* source-of-truth layer  
* không phụ thuộc cảm hứng người luận  
* không phụ thuộc phong cách hành văn  
* không phụ thuộc “ngộ tính” của AIER

### **14.1.2. Những gì thuộc core algorithm**

Trong TAO UZG+, các thành phần sau thuộc **core algorithm**:

#### **A. Input**

Bao gồm:

* năm sinh  
* tháng sinh  
* ngày sinh  
* giờ sinh  
* giới tính  
* timezone / location  
* calendar normalization  
* validation rules

Đây là tầng dữ liệu đầu vào. Nếu input không chuẩn thì toàn bộ lá số không chuẩn.

#### **B. An cung**

Bao gồm:

* an 12 cung địa chi cố định  
* an thiên can cho 12 cung  
* an Mệnh  
* an Thân  
* an 11 cung nhân sự còn lại

Đây là tầng định vị nhân sự trên thiên bàn.

#### **C. An cục**

Bao gồm:

* xác định Ngũ Hành Cục từ Can năm sinh và chi cung Mệnh  
* quy về:  
  * Thủy nhị cục  
  * Mộc tam cục  
  * Kim tứ cục  
  * Thổ ngũ cục  
  * Hỏa lục cục

#### **D. An sao**

Bao gồm:

* an 14 chính tinh  
* an phụ tinh theo năm / tháng / ngày / giờ  
* an các cụm sao đặc biệt

#### **E. An vòng**

Bao gồm:

* vòng Lộc Tồn  
* vòng Tràng Sinh  
* vòng Thái Tuế  
* các vòng sao lớn và các cluster phụ thuộc

#### **F. An hạn**

Bao gồm:

* Đại vận  
* Tiểu vận  
* Lưu niên  
* Lưu nguyệt  
* Lưu nhật  
* các lớp chồng hạn

### **14.1.3. Đặc trưng của core algorithm**

Một thành phần chỉ được gọi là **core algorithm** nếu thỏa đủ các điều kiện sau:

* cùng input → cùng output  
* có công thức hoặc bảng tra canonical  
* có version  
* có audit log  
* có thể viết test case  
* có thể đối chiếu với chart mẫu  
* AI không được quyền “sáng tạo thêm”

### **14.1.4. Không được làm ở core layer**

Core algorithm **không được**:

* thêm phú đoán  
* thêm lời khuyên đạo đức  
* thêm dự đoán cảm tính  
* thêm màu sắc thần bí  
* sửa output vì “nghe chưa hợp lý”

Nếu chart engine ra sai, phải sửa **rule**, không được sửa bằng **văn**.

### **14.1.5. Định nghĩa làm việc**

**Core algorithm là toàn bộ phần input, an cung, an cục, an sao, an vòng và an hạn có tính quy tắc, tái lập được, audit được và phải được xem là source-of-truth calculation layer của TAO UZG+.**

---

## **14.2. Cái gì thuộc interpretive layer**

### **14.2.1. Bản chất**

`Interpretive layer` là phần **đọc nghĩa**, **diễn giải**, **quy nạp**, **liên hệ sự kiện**, **xây guidance** từ chart đã được sinh đúng.

Đây là phần:

* không được phép chạy trước core algorithm  
* không được tự sinh lá số  
* không được override calculation  
* nhưng lại cực kỳ quan trọng để biến chart thành thứ **con người hiểu được** và **AIER Tao dùng được**

### **14.2.2. Những gì thuộc interpretive layer**

Trong TAO UZG+, các thành phần sau thuộc interpretive layer:

#### **A. Cách cục**

Bao gồm:

* các tổ hợp sao  
* các cách đặc biệt  
* các bộ như Tử Phủ, Sát Phá Tham, Cơ Nguyệt Đồng Lương, Nhật Nguyệt, v.v.

Đây là lớp đọc cấu trúc ý nghĩa từ chart đã sinh ra.

#### **B. Phú đoán**

Các câu phú, khẩu quyết, quyết văn, lời cổ nhân ghi lại.

Đây là lớp tham chiếu kinh nghiệm, không phải thuật toán.

#### **C. Nghiệm lý**

Là toàn bộ phần:

* đối chiếu chart với đời sống  
* đọc sắc thái  
* phân biệt mạnh / nhẹ / thiên lệch / ứng khác nhau  
* nhìn “trường hợp này ứng ra sao”

#### **D. Sự kiện ứng nghiệm**

Bao gồm:

* tai nạn  
* kết hôn  
* đổi nghề  
* phát tài  
* phá sản  
* bệnh tật  
* mâu thuẫn  
* sinh con  
* ly hôn  
* nổi danh  
* dính pháp lý

Đây là lớp event mapping, không phải output sơ cấp của thuật toán.

#### **E. Luận mạnh / yếu**

Ví dụ:

* cung mạnh hay yếu  
* bộ sao đắc hay hãm  
* lực một sao đang phát mạnh hay bị chế  
* Đại vận đẹp nhưng Lưu niên triệt lực

Đây là lớp đánh giá tương đối.

#### **F. Luận nghề, hôn nhân, bệnh, tài**

Đây là các ứng dụng cụ thể của interpretive layer:

* sự nghiệp  
* tài vận  
* hôn nhân  
* sức khỏe  
* gia đạo  
* nhân duyên  
* hợp tác  
* xã hội

### **14.2.3. Đặc trưng của interpretive layer**

Interpretive layer có thể:

* phong phú hơn  
* đa tầng hơn  
* chịu ảnh hưởng trường phái hơn  
* cần nghiệm chứng thực tế nhiều hơn

Nó **không phải** là phần “muốn nói gì cũng được”, nhưng nó **không có tính cứng tuyệt đối** như core algorithm.

### **14.2.4. Quan hệ với AIER Tao**

AIER Tao thuộc **interpretive \+ advisory layer**, không thuộc core algorithm.  
 Vai trò của AIER Tao là:

* đọc chart đã sinh đúng  
* giải thích cấu trúc  
* hỏi sâu thêm context  
* hỗ trợ guidance  
* không được tự an sao thay engine

### **14.2.5. Định nghĩa làm việc**

**Interpretive layer là toàn bộ phần cách cục, phú đoán, nghiệm lý, sự kiện ứng nghiệm và các luận đoán chuyên đề như nghề, hôn nhân, bệnh, tài, được xây trên chart đã tính đúng nhưng không được phép thay thế hoặc sửa đổi core algorithm.**

---

## **14.3. Cảnh báo phương pháp**

### **14.3.1. Cảnh báo từ Thiên Lương**

Thiên Lương nhấn mạnh rất rõ rằng:

* phải **thận trọng áp dụng phú**  
* không thể lấy **một câu phú tổng quát** áp cứng cho mọi trường hợp  
* phải xét:  
  * tuổi  
  * vị trí  
  * vòng sao  
  * trạng thái cụ thể của lá số.

Đây là một trong những cảnh báo phương pháp quan trọng nhất cho TAO UZG+.

### **14.3.2. Vì sao phú dễ gây sai**

Các câu phú thường:

* ngắn  
* mạnh  
* dễ nhớ  
* giàu tính hình tượng

Nhưng chính vì vậy chúng dễ bị hiểu sai theo kiểu:

* thấy một tổ hợp là phán ngay  
* bỏ qua tuổi  
* bỏ qua tam hợp  
* bỏ qua vòng Thái Tuế / Tràng Sinh / Lộc Tồn  
* bỏ qua miếu hãm  
* bỏ qua Hóa Khoa / Hóa Kỵ / Tuần / Triệt  
* bỏ qua vị trí Mệnh / Thân / cung ứng sự

### **14.3.3. Nguyên tắc xử lý phú trong TAO**

TAO UZG+ phải khóa:

#### **Rule A — Phú chỉ là heuristic**

Phú là:

* heuristic  
* kinh nghiệm tóm lược  
* pattern hint

Phú **không phải**:

* core formula  
* rule cứng tuyệt đối  
* chân lý độc lập khỏi chart

#### **Rule B — Phú chỉ được dùng sau chart**

Không có chart chuẩn → không được dùng phú.

#### **Rule C — Phú phải đi sau cấu trúc**

Phải xét đủ:

* tuổi  
* Mệnh / Thân  
* chính tinh  
* phụ tinh  
* vòng sao  
* hạn  
* Tứ Hóa  
* toàn bàn  
   rồi mới được phép tham chiếu phú.

#### **Rule D — Phú không được override evidence**

Nếu:

* phú gợi ý một chiều  
* nhưng chart tổng thể, nhiều tầng và nghiệm chứng thực tế đi chiều khác  
   thì phải ưu tiên:  
* core structure  
* multi-layer evidence  
* event validation

### **14.3.4. Cảnh báo từ Từ Tăng Sinh**

Từ Tăng Sinh cho thấy rất rõ rằng muốn học tốt Tử Vi phải:

* thu thập ví dụ  
* lập casebook  
* phân tầng nhiều lớp  
* dùng quy nạp / diễn dịch  
* không nhìn dấu hiệu đơn lẻ rồi kết luận.

Điều này có nghĩa:

* không được “thấy sao đoán ngay”  
* không được “thấy phú đọc ngay”  
* phải có hệ phân tích nhiều tầng

### **14.3.5. Định nghĩa làm việc**

**Cảnh báo phương pháp của TAO UZG+ là: mọi câu phú và kinh nghiệm cổ truyền chỉ được dùng như heuristic sau khi chart đã được tính đúng và sau khi đã xét tuổi, vị trí, vòng sao, Tứ Hóa, hạn và cấu trúc toàn bàn; tuyệt đối không được lấy một câu phú tổng quát để áp cứng cho mọi trường hợp.**

---

## **14.4. Quan điểm TAO UZG+**

### **14.4.1. Không phán số tuyệt đối**

TAO UZG+ không xem Tử Vi như một công cụ để phán quyết tuyệt đối rằng:

* đời người chắc chắn thế này  
* người này bản chất chỉ thế kia  
* số đã định nên không thể khác

Lý do:

* chart là cấu trúc  
* vận là biến động  
* nghiệm lý là xác suất định hướng cao, không phải mệnh lệnh tuyệt đối

Điều này cũng phù hợp với tinh thần nhân bản của Nguyễn Phát Lộc: Tử Vi là một ngành **nhân văn ứng dụng**, giúp con người hiểu mình và sửa mình, không phải cái lồng để nhốt con người vào một định mệnh chết cứng.

### **14.4.2. Không dùng để gây sợ hãi**

TAO UZG+ không được dùng Tử Vi như công cụ:

* dọa họa  
* ép tin  
* tạo sợ hãi  
* thao túng cảm xúc  
* tạo phụ thuộc vào “thầy” hay “AI”

Đây là ranh giới đạo đức rất quan trọng.

### **14.4.3. Không dùng để đóng khung con người**

TAO UZG+ không được biến chart thành nhãn chết:

* người này là người xấu  
* người kia chắc chắn bạc tình  
* người nọ chắc chắn phá sản  
* người kia chắc chắn yểu

Mọi kết luận nếu có chỉ được diễn đạt dưới dạng:

* xu hướng  
* vùng rủi ro  
* điểm dễ gặp  
* bài học cần lưu ý  
* cấu trúc cần quan sát

### **14.4.4. TAO dùng để làm gì**

TAO UZG+ chỉ dùng Tử Vi để:

#### **A. Hiểu cấu trúc**

* con người đang đứng trong cấu trúc nào  
* mệnh bàn tổ chức ra sao  
* các trục lực mạnh yếu ở đâu

#### **B. Đọc chu kỳ**

* giai đoạn nào thuận  
* giai đoạn nào nghịch  
* giai đoạn nào cần thận trọng  
* giai đoạn nào nên tích lũy hay bứt phá

#### **C. Hỗ trợ guidance**

* tư vấn định hướng  
* gợi ý hành động phù hợp nhịp vận  
* cảnh báo vùng rủi ro  
* hỗ trợ quyết định sống khôn ngoan hơn

#### **D. Enrich AIER context**

* cho AIER Tao hiểu sâu hơn về nhịp người dùng  
* cá thể hóa cách nói, cách đồng hành, cách tư vấn  
* nhưng không biến AIER Tao thành “ông thầy phán số”

### **14.4.5. Quy tắc constitutional cho AIER Tao**

AIER Tao:

* **được quyền** giải thích cấu trúc, chu kỳ, guidance  
* **không được quyền** lập chart nếu chưa có engine  
* **không được quyền** phán mệnh tuyệt đối  
* **không được quyền** dùng chart để đóng khung nhân cách người dùng  
* **không được quyền** biến Hóa Kỵ, sát tinh hay hạn xấu thành lời dọa nạt

### **14.4.6. Định nghĩa làm việc**

**Quan điểm TAO UZG+ là không dùng Tử Vi để phán số tuyệt đối, gây sợ hãi hay đóng khung con người; TAO chỉ dùng Tử Vi để hiểu cấu trúc, đọc chu kỳ, hỗ trợ guidance và enrich context cho AIER Tao một cách có giới hạn, có đạo đức và có kiểm soát.**

---

# **ĐOẠN CHỐT FINAL CỦA PHẦN 14**

**PHẦN 14 trong TAO UZG+ xác lập ranh giới rõ ràng giữa core algorithm và interpretive layer. Core algorithm bao gồm input, an cung, an cục, an sao, an vòng và an hạn; còn interpretive layer bao gồm cách cục, phú đoán, nghiệm lý, sự kiện ứng nghiệm và các luận đoán chuyên đề như nghề, hôn nhân, bệnh, tài. Mọi câu phú và nghiệm lý chỉ được dùng như heuristic sau khi đã có chart chuẩn và sau khi xét đủ cấu trúc toàn bàn. TAO UZG+ không dùng Tử Vi để phán số tuyệt đối, gây sợ hãi hay đóng khung con người, mà chỉ dùng để hiểu cấu trúc, đọc chu kỳ, hỗ trợ guidance và enrich AIER context trong giới hạn có kiểm soát.**

---

# **CANON LOCK STATEMENT**

**TAO V2 / Ziwei is the destiny-structure interpretation layer of TAO, transforming birth-based identity and cyclical time data into governed life guidance, service intelligence, and AIER personalization context.**

**TAO Tử Vi là lớp diễn giải cấu trúc số mệnh trong hệ TAO, chuyển dữ liệu sinh mệnh và chu kỳ thời gian thành guidance có cấu trúc, dịch vụ cá nhân hóa, và context hợp lệ cho AIER.**

---

## **What this Canon does NOT cover**

- Algorithmic detail (an cung, an sao, an vòng, an hạn) → see `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1.md`
- System architecture (engines, data flow, integration) → see `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.md`
- Operational laws and redlines → see `TAO_ZIWEI_SYSTEM_LAW_v1.md`
- UI/UX design → see `TAO_ZIWEI_UI_UX_CANON_v1.md`
- Build sequence → see `TAO_ZIWEI_ROADMAP_v1.md`
- Executable tasks → see `TAO_ZIWEI_BUILD_TASK_MAP_v1.md`

## **Amendment rule**

This Canon is Tier 1 immutable. Amendment requires:
1. Proposal documenting the change + rationale
2. NTS explicit approval per LAW 21 of governance canon
3. Version bump to v2.0 (or appropriate)
4. Old version archived in version history, NEVER deleted
