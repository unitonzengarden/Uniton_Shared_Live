# **TAO ZIWEI IMPLEMENTATION SPEC v1.0**

## **Build-able specification for TAO V2 (Tử Vi) module — UZG+ ecosystem**

---

**Document ID:** TAO_ZIWEI_IMPLEMENTATION_SPEC_v1
**Version:** 1.0
**Effective Date:** 2026-04-25
**Authority Level:** Tier 2 (extends Architecture, governed by LAW)
**Parent docs:**
- `TAO_ZIWEI_CANON_OFFICIAL_v1.md` (definition)
- `TAO_ZIWEI_SYSTEM_LAW_v1.md` (constraints)
- `TAO_ZIWEI_SYSTEM_ARCHITECTURE_v1.md` (layers)
**Status:** PROPOSED — awaiting NTS approval
**Total content:** Extracted from V3 PHẦN 2-13, PHẦN 15, Appendix A-E

---

## **Purpose**

Document này là **build-spec** chính cho engineer + CLAC-2 + Codex khi implement TAO V2 module. SPEC chứa:

- Foundation principles (âm dương, ngũ hành, Can-Chi, Hoa Giáp, nạp âm, tam hợp cục)
- Input data model + validation rules
- All chart-generation algorithms (an cung, an cục, an sao, an vòng, an Tứ Hóa, an hạn)
- Output JSON schema (chart_object, reading_object)
- Audit + test set requirements
- Canonical tables (Phụ lục §15)
- Edge case handling (Tuần/Triệt, timezone gate, leap month, hour Tý phase)
- Industrial governance (version control, priority, resonance)

Architecture cấp khung. SPEC cấp build chi tiết. Engineer bám SPEC để code.

---

# **TABLE OF CONTENTS**

- PART 1 — FOUNDATION PRINCIPLES (V3 PHẦN 2)
- PART 2 — INPUT SPECIFICATION (V3 PHẦN 3)
- PART 3 — THIÊN BÀN SETUP (V3 PHẦN 4)
- PART 4 — MỆNH / THÂN / 12 CUNG (V3 PHẦN 5)
- PART 5 — NGŨ HÀNH CỤC (V3 PHẦN 6)
- PART 6 — 14 CHÍNH TINH (V3 PHẦN 7)
- PART 7 — PHỤ TINH (V3 PHẦN 8)
- PART 8 — VÒNG SAO LỚN (V3 PHẦN 9)
- PART 9 — TỨ HÓA (V3 PHẦN 10)
- PART 10 — KHỞI HẠN (V3 PHẦN 11)
- PART 11 — OUTPUT SCHEMA (V3 PHẦN 12)
- PART 12 — AUDIT & TEST SET (V3 PHẦN 13)
- PART 13 — CANONICAL TABLES (V3 PHẦN 15)
- APPENDIX A — TUẦN / TRIỆT
- APPENDIX B — LƯU NIÊN OPERATIONAL LAYER
- APPENDIX C — STAR STRENGTH + LOGIC GATES + VERSION CONTROL
- APPENDIX D — MINOR CYCLE CANONICAL TABLES
- APPENDIX E — FULL AUXILIARY STAR TABLES

---

# **PART 1 — FOUNDATION PRINCIPLES (V3 PHẦN 2)**

## **2.1. Âm dương**

Âm dương là nguyên lý nền đầu tiên và cũng là nguyên lý bao trùm trong toàn bộ hệ mệnh lý Đông phương. Trong các tài liệu tham chiếu, cả **Thiên Lương** lẫn **Nguyễn Phát Lộc** đều đặt âm dương vào gốc của sự hình thành và vận hành vũ trụ quan Trung Hoa. Âm dương không chỉ là hai phạm trù đối lập đơn giản, mà là hai cực tính cùng tồn tại, cùng vận động, cùng sinh biến và cùng điều chỉnh mọi hiện tượng trong trời đất, con người và thời gian.

Theo lối diễn giải truyền thống, âm dương hiện diện ở khắp nơi:

* trời và đất,  
* ngày và đêm,  
* nóng và lạnh,  
* động và tĩnh,  
* nam và nữ,  
* nở và tàn,  
* tiến và thoái.

Thiên Lương đặc biệt nhấn mạnh rằng từ cây cỏ, côn trùng, mùa tiết cho đến cấu trúc thời gian đều mang dấu vết âm dương. Điều đó có nghĩa là âm dương không phải một lớp ý niệm nằm ngoài đời sống, mà là nguyên lý vận hành của đời sống. Chính vì vậy, mọi hệ mệnh lý dùng thời điểm sinh làm gốc đều không thể tách khỏi âm dương.

Trong Tử Vi, âm dương đi vào hệ thống theo nhiều cấp:

* âm dương của **Thiên Can**,  
* âm dương của **Địa Chi**,  
* âm dương của giới tính,  
* âm dương của chiều hành vận,  
* âm dương trong cách phối sao, phối cung, và cách đọc hạn.

Nói cách khác, âm dương không phải chỉ là một chương triết lý để giải thích cho đẹp, mà là **quy tắc phân loại cốt lõi** giúp hệ thống xác định:

* loại tuổi,  
* loại chiều vận hành,  
* quan hệ thuận nghịch,  
* bản chất dương/âm của một kết cấu số.

TAO UZG+ vì vậy phải xem âm dương là **lớp foundation logic đầu tiên**. Nếu lớp này sai, các lớp sau như Can–Chi, Hoa Giáp, Cục, hạn, hướng vận… đều có nguy cơ sai theo.

Quan trọng hơn, âm dương trong TAO không được hiểu theo lối thần bí hóa. Nó phải được hiểu như:

* một hệ quy chiếu phân cực,  
* một nguyên lý tạo trật tự cho dữ liệu,  
* một luật để phân biệt và tổ chức các yếu tố trong hệ thống lập số.

Do đó, trong TAO UZG+, định nghĩa làm việc cho âm dương là:

**Âm dương là nguyên lý phân cực và điều hòa nền tảng, dùng để xác định tính chất, trật tự và chiều vận động của các thành phần trong lá số Tử Vi.**

---

## **2.2. Ngũ hành**

Nếu âm dương là nguyên lý phân cực, thì ngũ hành là nguyên lý về **chất tính và tương tác**. Trong toàn bộ mệnh lý Đông phương, ngũ hành là một trong những trục nền quan trọng nhất để giải thích:

* sự hình thành,  
* sự sinh trưởng,  
* sự đối kháng,  
* sự chuyển hóa,  
* và sự cân bằng hoặc mất cân bằng giữa các yếu tố.

Ngũ hành gồm:

* **Mộc**  
* **Hỏa**  
* **Thổ**  
* **Kim**  
* **Thủy**

Điều cần hiểu đúng là ngũ hành không chỉ là “năm vật chất” cụ thể, mà là **năm loại thuộc tính vận động**. Ví dụ:

* Mộc mang tính sinh trưởng, khai mở, phát triển.  
* Hỏa mang tính bốc lên, bùng phát, chiếu tỏa.  
* Thổ mang tính chứa đựng, trung gian, hóa dưỡng.  
* Kim mang tính kết tụ, quyết đoán, cắt lọc.  
* Thủy mang tính lưu chuyển, thấm nhập, nuôi dưỡng và biến hóa.

Trong hệ mệnh lý, ngũ hành không đứng yên. Chúng vận động theo hai trục cơ bản:

* **tương sinh**  
* **tương khắc**

### **Tương sinh**

* Mộc sinh Hỏa  
* Hỏa sinh Thổ  
* Thổ sinh Kim  
* Kim sinh Thủy  
* Thủy sinh Mộc

### **Tương khắc**

* Mộc khắc Thổ  
* Thổ khắc Thủy  
* Thủy khắc Hỏa  
* Hỏa khắc Kim  
* Kim khắc Mộc

Nguyễn Phát Lộc coi Aâm Dương – Ngũ Hành là nền tảng triết lý lớn mà Tử Vi vay mượn từ Dịch học, rồi cụ thể hóa vào hệ cung và sao.  
 Thiên Lương thì đi xa hơn ở tầng nghiệm lý khi dùng ngũ hành để nhìn:

* căn khí của tuổi,  
* sự thuận nghịch giữa gốc và ngọn,  
* khả năng nâng đỡ hay cản trở của vận số.

Trong TAO UZG+, ngũ hành phải được dùng ở ba lớp:

### **Lớp 1 — phân loại**

Dùng ngũ hành để xác định:

* hành của Can,  
* hành của Chi,  
* hành nạp âm,  
* hành của sao,  
* hành của cung,  
* hành của Cục.

### **Lớp 2 — quan hệ**

Dùng ngũ hành để xác định:

* sinh hay khắc giữa Can và Chi,  
* sinh hay khắc giữa Mệnh và Cục,  
* sinh hay khắc giữa sao và cung,  
* sinh hay khắc trong tổ hợp sao.

### **Lớp 3 — diễn giải**

Dùng ngũ hành để suy ra:

* thuận hay nghịch khí,  
* dễ hay khó phát triển,  
* hỗ trợ hay chế áp,  
* căn nền vững hay thiếu lực,  
* vận hành thuận dòng hay nhiều trở lực.

Vì vậy, trong TAO UZG+, ngũ hành không được xử lý như phần “màu mè triết học”, mà phải được xử lý như **calculation grammar** và **interpretation grammar** đồng thời.

Định nghĩa làm việc của TAO UZG+ cho ngũ hành là:

**Ngũ hành là hệ quy chiếu về chất tính và quan hệ sinh – khắc, dùng để xác định bản chất và tương tác của các thành phần trong lá số Tử Vi.**

---

## **2.3. Thiên Can**

Thiên Can là hệ thống mười thiên can dùng để biểu đạt chu trình âm dương – ngũ hành ở tầng thiên khí. Cả Thiên Lương lẫn Nguyễn Phát Lộc đều xem Thiên Can như một phần rất trọng yếu trong cấu trúc 60 Hoa Giáp, trong việc xác lập tuổi, căn khí, và hướng vận động của mệnh số.

Mười Thiên Can gồm:

* **Giáp**  
* **Ất**  
* **Bính**  
* **Đinh**  
* **Mậu**  
* **Kỷ**  
* **Canh**  
* **Tân**  
* **Nhâm**  
* **Quý**

Mỗi Can vừa mang một hành, vừa mang một tính âm/dương:

* **Giáp** — Dương Mộc  
* **Ất** — Âm Mộc  
* **Bính** — Dương Hỏa  
* **Đinh** — Âm Hỏa  
* **Mậu** — Dương Thổ  
* **Kỷ** — Âm Thổ  
* **Canh** — Dương Kim  
* **Tân** — Âm Kim  
* **Nhâm** — Dương Thủy  
* **Quý** — Âm Thủy

Thiên Can là phần “gốc”, phần “trời”, phần khí động ở tầng trên của hệ tuổi. Trong lối nhìn của Thiên Lương, Can còn được ví như phần **gốc** của một tiểu gia đình Can–Chi, nơi Can đứng trên như chồng, Chi đứng dưới như vợ; qua đó, quan hệ giữa Can và Chi trở thành quan hệ giữa gốc và ngọn, giữa khả năng phát sinh và khả năng tiếp nhận.

Trong TAO UZG+, Thiên Can có ít nhất năm vai trò:

### **1\. Xác lập tuổi sinh**

Tuổi của một cá nhân không chỉ là con giáp, mà là sự kết hợp giữa Can và Chi. Nếu chỉ lấy Chi mà bỏ Can thì hệ thống lập số không còn đầy đủ.

### **2\. Xác lập âm/dương của tuổi**

Vì mỗi Can mang một tính âm hoặc dương, nó tham gia trực tiếp vào việc xác định loại tuổi và chiều vận hành.

### **3\. Tham gia vào 60 Hoa Giáp**

Can không đứng riêng mà phối với Chi để tạo ra đơn vị năm tuổi đầy đủ.

### **4\. Chi phối các lớp an sao và Tứ Hóa**

Trong các phần sau của tài liệu, Can là cơ sở để:

* an một số sao theo năm,  
* xác định Tứ Hóa,  
* đọc sự biến động của vận.

### **5\. Tạo nền để đọc căn khí**

Thiên Lương đặc biệt dùng Can như phần “gốc” để nhìn sự thuận nghịch của tuổi. Gốc được sinh dưỡng thì thuận hơn; gốc bị khắc thì dễ gặp nhiều khó khăn hơn.

Do đó, trong TAO UZG+, Thiên Can phải được xem như:

* **một lớp phân loại**  
* **một lớp vận khí**  
* **một tham số bắt buộc trong calculation**

Định nghĩa làm việc:

**Thiên Can là hệ mười ký hiệu thiên khí mang âm dương và ngũ hành, dùng để xác lập gốc tuổi, căn khí và nhiều quy tắc vận hành cốt lõi trong lá số Tử Vi.**

---

## **2.4. Địa Chi**

Địa Chi là hệ mười hai địa chi dùng để biểu đạt chu trình thời gian, phương vị và nền địa khí trong cấu trúc mệnh lý. Nếu Thiên Can là lớp “gốc khí” ở tầng trời, thì Địa Chi là lớp “nền khí” ở tầng đất và thời gian vận hành. Thiên Lương và các nguồn truyền thống đều xem Địa Chi là thành phần không thể tách rời khỏi Can trong việc hình thành tuổi và hệ số mệnh.

Mười hai Địa Chi gồm:

* **Tý**  
* **Sửu**  
* **Dần**  
* **Mão**  
* **Thìn**  
* **Tỵ**  
* **Ngọ**  
* **Mùi**  
* **Thân**  
* **Dậu**  
* **Tuất**  
* **Hợi**

Mỗi Chi cũng mang âm/dương và ngũ hành riêng:

* **Tý** — Dương Thủy  
* **Hợi** — Âm Thủy  
* **Dần** — Dương Mộc  
* **Mão** — Âm Mộc  
* **Ngọ** — Dương Hỏa  
* **Tỵ** — Âm Hỏa  
* **Thân** — Dương Kim  
* **Dậu** — Âm Kim  
* **Thìn, Tuất, Sửu, Mùi** — Thổ

Trong lối giải thích của Thiên Lương, việc Địa Chi có tới 12 đơn vị thay vì 10 như Can liên quan trực tiếp đến chu trình thời gian, bốn mùa và nhu cầu tạo một cấu trúc năm đủ rộng để phản ánh vận động của tự nhiên. Chính điều này tạo ra khung cho 12 cung và cũng tạo ra logic cho các tam hợp cục về sau.

Trong TAO UZG+, Địa Chi có sáu vai trò quan trọng:

### **1\. Xác lập đơn vị thời gian**

Giờ sinh, tháng âm, năm tuổi đều gắn chặt với chi.

### **2\. Xác lập 12 cung**

Thiên bàn Tử Vi dùng 12 địa chi làm khung vị trí cơ bản.

### **3\. Xác lập phương vị**

Chi không chỉ là thời gian, mà còn là tọa độ không gian tượng trưng.

### **4\. Kết hợp với Can để tạo tuổi đầy đủ**

Không có Chi thì không có 60 Hoa Giáp hoàn chỉnh.

### **5\. Tạo nền cho tam hợp, lục xung và nhiều quan hệ cấu trúc**

Đây là lớp cực quan trọng để đọc cục diện.

### **6\. Dùng để an nhiều lớp sao và hạn**

Rất nhiều vòng sao, hạn, lưu niên, vận cục đều quy chiếu theo Địa Chi.

Vì vậy, Địa Chi trong TAO không được coi như “12 con giáp đơn giản”, mà phải coi như:

* **calendar framework**  
* **positional framework**  
* **structural framework**

Định nghĩa làm việc:

**Địa Chi là hệ mười hai đơn vị địa khí – thời gian – phương vị, dùng làm khung định vị cho tuổi, giờ, 12 cung và nhiều quan hệ cấu trúc trong lá số Tử Vi.**

---

## **2.5. 60 Hoa Giáp**

60 Hoa Giáp là hệ thống kết hợp giữa 10 Thiên Can và 12 Địa Chi theo quy luật âm dương để tạo thành 60 đơn vị năm tuổi. Đây là một nền tảng cực kỳ quan trọng, vì trong mệnh lý Đông phương, tuổi không được hiểu như một nhãn đơn giản, mà là một **đơn vị khí số hoàn chỉnh**. Thiên Lương trình bày rất rõ phần này và dùng nó làm cơ sở để đọc căn nền của từng người.

Điểm mấu chốt là:

* nếu lấy 10 Can kết với 12 Chi một cách cơ học thì sẽ ra 120 tổ hợp,  
* nhưng vì quy luật âm dương nên chỉ có:  
  * Can dương đi với Chi dương  
  * Can âm đi với Chi âm

nên tổng cộng chỉ còn **60 tổ hợp**, gọi là **60 Hoa Giáp**.

Ví dụ:

* Giáp Tý  
* Ất Sửu  
* Bính Dần  
* …  
* Quý Hợi

60 Hoa Giáp là nền để:

* xác lập tuổi năm sinh,  
* xác lập căn khí riêng của từng người,  
* xác lập nạp âm,  
* xác lập nền thuận/nghịch giữa Can và Chi,  
* tạo cơ sở cho nhiều lớp luận giải về sau.

Nguyễn Phát Lộc cũng nhấn mạnh trong phần toán học của Tử Vi rằng hệ thống tuổi và thời gian của lá số được khóa rất chặt trong cách tính, và số lượng lá số hữu hạn gắn với cấu trúc Can–Chi – giờ – tháng – năm. Ông tính ra số lá số tối đa khả hữu là **512.640**, cho thấy việc lập số dựa trên hệ thời gian được chuẩn hóa rất mạnh, chứ không phải tùy hứng.

Trong TAO UZG+, 60 Hoa Giáp có ba chức năng nền:

### **1\. Identity layer**

Tuổi không chỉ là năm sinh, mà là mã khí số gốc.

### **2\. Calculation layer**

Nhiều bước tính toán và phân loại phải đi qua tuổi Can–Chi hoàn chỉnh.

### **3\. Interpretation layer**

Nhiều đọc hiểu về căn khí, thuận nghịch, vận mệnh và thế đứng đời người bắt đầu từ 60 Hoa Giáp.

Định nghĩa làm việc:

**60 Hoa Giáp là hệ sáu mươi tổ hợp Can–Chi tạo thành đơn vị tuổi hoàn chỉnh, dùng để xác lập identity khí số nền của cá nhân trong hệ Tử Vi.**

---

## **2.6. Nạp âm**

Nạp âm là hành chung phát sinh từ sự phối hợp giữa Can và Chi trong từng tuổi thuộc 60 Hoa Giáp. Đây là một tầng rất đặc biệt: Can có hành riêng, Chi có hành riêng, nhưng khi đứng chung thành một tuổi thì lại sinh ra một **hành nạp âm** có tính chất tổng hợp khác. Thiên Lương đi khá sâu vào tầng này và xem đây là yếu tố có ý nghĩa đáng kể trong việc nhìn căn nền đời người.

Ví dụ:

* Giáp Tý có nạp âm riêng,  
* Giáp Ngọ có nạp âm riêng,  
* Can và Chi có thể cùng tương sinh, nhưng nạp âm của từng tuổi lại không đơn giản là cộng cơ học hành của Can với hành của Chi.

Điều này cho thấy mệnh lý Đông phương không dừng ở việc gán nhãn từng thành phần rời rạc, mà còn dùng **lớp hợp khí** để đọc một đơn vị người như một chỉnh thể.

Thiên Lương cũng cảnh báo rằng nạp âm là phần cao siêu của lý học, không nên hiểu hời hợt như trò ghép tên. Trong nhiều phân tích của ông, nạp âm là tầng cho thấy:

* một căn nền thuận hay nghịch,  
* một khí số nội tại,  
* một hướng động thiên về nhân, thiên, hay địa.

Trong TAO UZG+, nạp âm được dùng như một **supplemental foundation layer**, nghĩa là:

* không thay thế Can,  
* không thay thế Chi,  
* không thay thế Cục,  
* nhưng là lớp bổ sung quan trọng để hiểu khí chất nền.

TAO không nên lạm dụng nạp âm để luận tất cả mọi thứ, nhưng cũng không được bỏ qua nó như một chi tiết phụ không đáng kể.

Định nghĩa làm việc:

**Nạp âm là hành tổng hợp của một đơn vị tuổi Can–Chi trong 60 Hoa Giáp, dùng để bổ sung việc xác định căn khí nền của cá nhân.**

---

## **2.7. Tam hợp cục**

Tam hợp cục là nguyên lý nhóm ba Địa Chi có cùng một hướng khí và cùng quy về một hành. Trong Tử Vi, tam hợp cục vừa là quy luật mệnh lý, vừa là quy luật cấu trúc cực quan trọng để lập số và luận số. Thiên Lương trình bày bốn tam hợp cục rất rõ như sau:

* **Thân – Tý – Thìn** → **Thủy cục**  
* **Dần – Ngọ – Tuất** → **Hỏa cục**  
* **Tỵ – Dậu – Sửu** → **Kim cục**  
* **Hợi – Mão – Mùi** → **Mộc cục**

Các cục này không chỉ để “hợp tuổi” theo nghĩa đời thường, mà trong hệ lập số chúng có nhiều chức năng cốt lõi:

### **1\. Cấu trúc cung**

Khi xét một cung, không thể chỉ nhìn cung đó riêng lẻ, mà phải nhìn cả bộ tam hợp và xung chiếu.

### **2\. Cấu trúc khí**

Ba vị trí trong cùng tam hợp chia sẻ một nền hành, từ đó tạo ra một trường nghĩa và trường khí tương ứng.

### **3\. Xác lập Cục trong lá số**

Ngũ Hành Cục của lá số về sau cũng liên hệ trực tiếp đến logic này.

### **4\. Xác lập tương quan và hướng diễn giải**

Nhiều cách cục, vòng sao, và luận đoán truyền thống đều dựa vào tam hợp.

Thiên Lương còn dùng tam hợp để phân tầng vị trí đời người trong vòng Thái Tuế và Lộc Tồn, từ đó đọc ra chỗ đứng, thuận lợi hay khó khăn của từng tuổi. Điều đó cho thấy tam hợp không chỉ là “nhóm chi giống nhau”, mà là một **cấu trúc nền để nhìn bố cục vận mệnh**.

Trong TAO UZG+, tam hợp cục phải được dùng như:

* **structural cluster**  
* **interpretive cluster**  
* **energy cluster**

Định nghĩa làm việc:

**Tam hợp cục là nhóm ba Địa Chi đồng hướng khí và đồng hành, dùng làm đơn vị cấu trúc và diễn giải quan trọng trong lá số Tử Vi.**

---

## **2.8. Quan hệ Can – Chi**

Quan hệ Can – Chi là một trong những nền móng cực kỳ quan trọng để nhìn **căn khí**, **thuận nghịch**, và **nền thuận lợi hay trở lực** của tuổi. Đây là điểm mà Thiên Lương nhấn mạnh rất rõ: cùng thuộc một tuổi nhưng chất lượng của tuổi khác nhau tùy quan hệ giữa Can và Chi. Không thể chỉ nhìn nạp âm chung mà bỏ qua quan hệ gốc – ngọn giữa hai thành phần này.

Thiên Lương đưa ra năm mức cơ bản:

### **1\. Can sinh Chi**

Đây là thế tốt nhất.  
 Gốc sinh ngọn. Căn nền nâng đỡ cho phần biểu hiện. Theo Thiên Lương, đây là loại tuổi có nền tảng thuận hơn, tiềm tàng phúc khí lớn hơn. Ví dụ: **Giáp Ngọ**, trong đó Giáp Mộc sinh Ngọ Hỏa.

### **2\. Can và Chi đồng hành**

Đây là thế tốt thứ hai.  
 Gốc và ngọn cùng hành, dễ tạo sự ổn định và đồng bộ. Ví dụ: **Giáp Dần**, cả Can Giáp và Chi Dần đều thuộc Mộc.

### **3\. Chi sinh Can**

Đây là thế tốt thứ ba.  
 Ngọn nuôi gốc. Vẫn là thuận, nhưng nền vững không bằng Can sinh Chi. Ví dụ: **Giáp Tý**, Tý Thủy sinh Giáp Mộc. Thiên Lương cho rằng loại này thường có may mắn nhiều hơn thực lực nền.

### **4\. Can khắc Chi**

Đây là thế xấu tương đối.  
 Gốc khắc ngọn. Đời dễ gặp nhiều trở lực hơn. Ví dụ: **Giáp Thìn**, Giáp Mộc khắc Thìn Thổ.

### **5\. Chi khắc Can**

Đây là thế nghịch cảnh.  
 Ngọn khắc gốc. Loại này bị xem là nhiều chua cay, nghịch hơn các loại còn lại. Ví dụ: **Giáp Thân**, Thân Kim khắc Giáp Mộc.

Điểm rất đáng chú ý là Thiên Lương không coi năm mức này như “án phạt định mệnh”, mà coi đó là **tấm nền rất nhỏ của kiếp nhân sinh**. Từ tấm nền đó, người ta còn phải xét tiếp:

* Mệnh Thân,  
* vòng Lộc Tồn,  
* vòng Thái Tuế,  
* vòng Tràng Sinh,  
* cung vị,  
* sao,  
* và hành động đời người.

Đây là điểm TAO UZG+ phải đặc biệt khóa:

* **Can–Chi là nền**  
* nhưng **không đủ để kết luận toàn số**  
* nó chỉ là lớp đọc đầu tiên về căn khí và nghịch thuận

Do đó, trong TAO UZG+, quan hệ Can–Chi phải được dùng như:

* **root compatibility layer**  
* **foundational polarity layer**  
* **age quality layer**

Định nghĩa làm việc:

**Quan hệ Can – Chi là lớp đọc nền về sự thuận nghịch và căn khí của tuổi, dựa trên các thế sinh – đồng hành – sinh ngược – khắc – khắc ngược giữa gốc và ngọn của đơn vị tuổi Can–Chi.**

---

## **2.9. Thiên – Địa – Nhân trong lập số**

Thiên – Địa – Nhân là trục tư tưởng rất quan trọng khi hiểu đúng Tử Vi. Không chỉ Thiên Lương mà cả Nguyễn Phát Lộc cũng đều cho thấy khoa Tử Vi không phải là một bảng ký hiệu rời rạc, mà là một hệ mô phỏng con người trong mối liên hệ với trời, đất, thời gian, xã hội và hoàn cảnh sống.

### **Thiên**

“Thiên” trong lập số không nên hiểu theo nghĩa thần quyền hay ông trời nhân cách hóa thưởng phạt, mà theo lối mệnh lý cổ là:

* thiên khí,  
* thời tiết,  
* quy luật vận hành,  
* chu kỳ biến động của vũ trụ và thời gian.

Cả Trần Đoàn lẫn Thiên Lương đều nghiêng về ý rằng vận mệnh phải được đặt trong một nền “thiên thời”, tức một nền biến hóa không cố định, nơi mệnh đi cùng vận, và đời người luôn chịu ảnh hưởng của thời thế, chu kỳ và sự đổi thay.

### **Địa**

“Địa” là nền vị trí, môi trường, phương vị và cấu trúc cụ thể mà đời người được đặt vào. Trong lập số, “địa” hiện diện qua:

* 12 địa chi,  
* 12 cung,  
* các vị trí miếu, vượng, hãm,  
* quan hệ tam hợp, lục xung,  
* bối cảnh nơi sao cư trú.

Không có “địa”, các sao không có chỗ đứng; không có chỗ đứng, sao không có nghĩa đúng.

### **Nhân**

“Nhân” là cá nhân cụ thể:

* giờ – ngày – tháng – năm sinh,  
* giới tính,  
* căn khí,  
* cung mệnh,  
* cung thân,  
* sự sống cụ thể của một con người.

Trong Tử Vi, “nhân” không bị tách khỏi “thiên” và “địa”. Đây chính là điều Nguyễn Phát Lộc nhấn mạnh: Tử Vi không nghiên cứu một con người rời khỏi đời sống, mà nghiên cứu con người trong bối cảnh, trong gia đình, trong xã hội, trong sinh kế, trong vận động của thời gian và hoàn cảnh.

Từ đây ta thấy:

* **Thiên** cho quy luật và thời vận  
* **Địa** cho vị trí và cấu trúc  
* **Nhân** cho chủ thể cụ thể

Ba lớp này phải đồng thời hiện diện thì lá số mới có nghĩa.

Từ Tăng Sinh cũng có tinh thần rất gần như vậy, dù ông dùng ngôn ngữ hiện đại hơn. Ông coi Đẩu Số là một **cấu trúc suy luận nhiều lớp**, trong đó không thể đọc máy móc từng cung riêng lẻ, mà phải nhìn các quan hệ ngang – dọc – thời hạn – xung chiếu – hội nhập – dẫn động để mới thấy được một sự kiện đời người. Chính điều này giúp TAO UZG+ hiểu rằng:

* lá số không phải chỉ là hình ảnh tĩnh,  
* mà là một hệ suy luận đa tầng,  
* trong đó mỗi lớp dữ liệu chỉ có nghĩa khi đứng trong cấu trúc lớn hơn.

Vì vậy, trong TAO UZG+, nguyên lý Thiên – Địa – Nhân phải được dùng như:

* **Thiên \= temporal law**  
* **Địa \= positional law**  
* **Nhân \= personalized instance**

Ba lớp này tạo ra nền cho mọi thứ về sau:

* calculation,  
* interpretation,  
* reading,  
* AIER advisory.

Định nghĩa làm việc:

**Thiên – Địa – Nhân là trục nền của lập số Tử Vi, trong đó Thiên chỉ quy luật thời vận và biến hóa, Địa chỉ vị trí và cấu trúc, còn Nhân chỉ cá nhân cụ thể được đặt vào hệ quy chiếu ấy.**

---

# **ĐOẠN CHỐT CỦA PHẦN 2**

Từ toàn bộ các mục trên, TAO UZG+ xác lập nguyên lý nền tảng của hệ Tử Vi như sau:

**Tử Vi Đẩu Số được xây trên nền âm dương và ngũ hành, đi qua Thiên Can – Địa Chi – 60 Hoa Giáp – nạp âm – tam hợp cục – quan hệ Can Chi – trục Thiên Địa Nhân để tạo ra một hệ quy chiếu cấu trúc cho lá số. Các nguyên lý này không phải chỉ là phần triết học minh họa, mà là nền tính toán và nền diễn giải bắt buộc của toàn bộ TAO Core Calculation.**

---

# **PART 2 — INPUT SPECIFICATION (V3 PHẦN 3)**

## **3.1. Năm sinh**

Năm sinh là lớp dữ liệu đầu vào thứ nhất và là một trong những tham số nền tảng bắt buộc của mọi hệ thống lập lá số Tử Vi. Trong hệ truyền thống, năm sinh không được ghi nhận chỉ như một con số dương lịch đơn thuần, mà phải được xác định dưới dạng **Can Chi năm sinh**. Chính **Tử Vi Đẩu Số Toàn Thư** và các tài liệu diễn giải hiện đại đều cho thấy việc lập số luôn gắn với cấu trúc Can–Chi, không thể bỏ qua đơn vị tuổi khí số này.

Can Chi năm sinh có ba vai trò nền:

* xác lập **tuổi khí số gốc** của đương số,  
* tham gia vào việc xác định **âm/dương của tuổi** và nhiều quy tắc vận hành hạn,  
* làm đầu vào cho các lớp tính tiếp theo như **Ngũ Hành Cục**, **vòng Lộc Tồn**, **vòng Thái Tuế**, **Tứ Hóa** và nhiều hệ sao an theo năm.

Trong TAO UZG+, “năm sinh” vì vậy phải được định nghĩa theo hai lớp:

### **Lớp 1 — Raw input**

* năm sinh dương lịch do người dùng nhập hoặc do hệ thống hồ sơ ENTA cung cấp

### **Lớp 2 — Normalized output**

* năm sinh âm lịch tương ứng  
* Can năm sinh  
* Chi năm sinh  
* tuổi âm/dương tương ứng

TAO engine không được dùng trực tiếp con số năm dương lịch như thể đó là dữ liệu cuối cùng. Năm dương lịch chỉ là dữ liệu thô. Dữ liệu có hiệu lực để lập số phải là **Can Chi năm sinh sau chuẩn hóa lịch**.

### **Quy tắc chuẩn**

* nếu hồ sơ ENTA/Uniton ID đã có dữ liệu năm sinh chuẩn hóa, TAO phải ưu tiên dùng dữ liệu đó làm source of truth  
* nếu chưa có, hệ thống phải nhận năm sinh thô rồi đưa vào lớp calendar normalization trước khi lập số  
* mọi output lá số phải lưu lại đồng thời:  
  * năm dương lịch đầu vào  
  * năm âm lịch đã chuẩn hóa  
  * Can Chi năm sinh dùng để lập số

### **Định nghĩa làm việc**

**Năm sinh trong TAO UZG+ là dữ liệu tuổi khí số nền, phải được chuẩn hóa thành Can Chi năm sinh trước khi tham gia bất kỳ bước an cung, an cục hay an sao nào.**

---

## **3.2. Tháng sinh**

Tháng sinh là lớp dữ liệu đầu vào thứ hai. Trong hệ Tử Vi truyền thống, tháng dùng để lập số là **tháng âm lịch**, không phải tháng dương lịch. Đây là điểm căn bản phải khóa rất chặt, vì nếu nhập tháng dương mà không chuẩn hóa sang tháng âm thì toàn bộ quá trình an Mệnh, an Thân và nhiều bước sau sẽ lệch ngay từ đầu.

Tháng sinh có vai trò trực tiếp trong:

* xác định **cung Mệnh**,  
* xác định **cung Thân**,  
* tham gia vào việc an nhiều phụ tinh theo tháng,  
* tham gia vào logic chuẩn hóa thời điểm sinh trong hệ lịch âm.

### **Tháng âm lịch là chuẩn bắt buộc**

TAO UZG+ chỉ chấp nhận **tháng âm lịch đã chuẩn hóa** làm dữ liệu hợp lệ để lập lá số. Tháng dương lịch đầu vào chỉ là raw input.

### **Điểm đặc biệt: tháng nhuận**

Đây là một trong những điểm dễ lệch phái nhất. Chính working draft ENTA TAO đã nêu rõ **quy tắc tháng nhuận phải khóa riêng** vì đây là chỗ dễ gây sai số giữa các hệ lập số khác nhau.

Các nguồn truyền thống cho thấy tháng âm trong năm không phải luôn ổn định một cách cơ học, và chính Nguyễn Phát Lộc khi bàn về cấu trúc tính số cũng nhấn mạnh đặc điểm tháng thiếu, tháng đủ, năm nhuận và quy tắc lịch âm là thành phần ảnh hưởng đến việc xác lập hệ tính.

### **Quy tắc thiết kế cho TAO**

Vì tháng nhuận là điểm dễ lệch phái, TAO UZG+ bắt buộc phải có:

#### **1\. One canonical leap-month policy**

Chỉ được dùng **một chính sách tháng nhuận chuẩn** cho toàn bộ hệ thống, không để mỗi môi trường hoặc mỗi module dùng một cách khác nhau.

#### **2\. Leap-month traceability**

Mọi lá số sinh vào tháng nhuận phải lưu:

* tháng dương lịch đầu vào,  
* tháng âm lịch sau chuẩn hóa,  
* cờ `is_leap_month = true/false`,  
* policy version dùng để quy đổi.

#### **3\. No silent conversion**

Không được âm thầm quy đổi tháng nhuận mà không lưu dấu. Đây là lỗi rất nguy hiểm vì cùng một người có thể bị lập ra hai lá số khác nhau nếu policy thay đổi.

### **Khuyến nghị văn bản chuẩn**

Trong tài liệu core này, phần tháng nhuận nên được xem là:

* **điểm khóa riêng**  
* **điểm cần audit**  
* **điểm phải version hóa**

### **Định nghĩa làm việc**

**Tháng sinh trong TAO UZG+ là tháng âm lịch đã chuẩn hóa; riêng tháng nhuận là trường hợp đặc biệt bắt buộc phải đi qua một policy quy đổi duy nhất, có lưu vết và có version kiểm soát.**

---

## **3.3. Ngày sinh**

Ngày sinh là lớp dữ liệu đầu vào thứ ba, và cũng giống tháng sinh, chuẩn dùng để lập lá số là **ngày âm lịch**, không phải ngày dương lịch trực tiếp. Trong hệ Tử Vi truyền thống, ngày sinh âm lịch là dữ liệu tham gia trực tiếp vào việc tính tọa độ sao **Tử Vi**, từ đó dẫn toàn bộ hệ 14 chính tinh. Đây là điểm đặc biệt quan trọng: nếu ngày âm sai, gốc tọa độ chính tinh sẽ sai theo.

Ngày sinh vì vậy là tham số cốt lõi trong:

* tính sao Tử Vi,  
* an hệ chính tinh,  
* chuẩn hóa toàn bộ bố cục lá số.

### **Phân lớp dữ liệu ngày sinh**

TAO UZG+ phải tách ngày sinh thành:

#### **Lớp 1 — Raw input**

* ngày dương lịch do user nhập hoặc do ENTA profile cung cấp

#### **Lớp 2 — Normalized lunar day**

* ngày âm lịch tương ứng  
* ngày trong tháng âm  
* trạng thái month context (tháng thường / tháng nhuận)

### **Yêu cầu chuẩn hóa**

Ngày âm không được tính rời khỏi tháng và năm âm. Nó phải đi cùng:

* năm âm  
* tháng âm  
* cờ tháng nhuận  
* timezone/location

Bởi nếu cùng một ngày dương nhưng ở múi giờ khác hoặc điểm chuyển ngày khác nhau, ngày âm và giờ chi có thể chệch.

### **Yêu cầu audit**

Mọi chart output phải lưu:

* ngày dương lịch gốc  
* ngày âm lịch dùng để lập số  
* calendar policy version  
* timezone used

### **Định nghĩa làm việc**

**Ngày sinh trong TAO UZG+ là ngày âm lịch đã chuẩn hóa theo lịch và múi giờ địa phương, là một tham số cốt lõi để xác định tọa độ sao Tử Vi và toàn bộ hệ chính tinh.**

---

## **3.4. Giờ sinh**

Giờ sinh là lớp dữ liệu đầu vào thứ tư, và là một trong những dữ liệu nhạy nhất của toàn bộ hệ Tử Vi. Theo truyền thống, giờ sinh không được ghi dưới dạng “15:30” như giờ hiện đại rồi dùng trực tiếp, mà phải được quy đổi sang **giờ theo 12 Địa Chi**:

* Tý  
* Sửu  
* Dần  
* Mão  
* Thìn  
* Tỵ  
* Ngọ  
* Mùi  
* Thân  
* Dậu  
* Tuất  
* Hợi.

Giờ sinh trong Tử Vi có vai trò cực mạnh:

* xác định **cung Mệnh**  
* xác định **cung Thân**  
* an nhiều phụ tinh theo giờ  
* tham gia tạo bản sắc rất riêng của lá số

Chỉ riêng việc sai một canh giờ cũng có thể làm đổi:

* cung Mệnh  
* cung Thân  
* nhiều sao theo giờ  
* từ đó dẫn đến đổi cả cấu trúc lá số.

### **Giờ sinh trong TAO UZG+ phải qua 3 lớp**

#### **Lớp 1 — Raw clock time**

* ví dụ: 15:30

#### **Lớp 2 — Localized time**

* 15:30 theo timezone/location cụ thể

#### **Lớp 3 — Earthly Branch hour**

* ví dụ: giờ Thân

### **Không được bỏ qua local time**

Đây là điểm hiện đại hóa cực quan trọng. Hệ truyền thống dùng giờ chi, nhưng hệ số hóa TAO phải đi qua bước:

* xác nhận timezone  
* xác nhận location  
* quy đổi local time  
* rồi mới map sang giờ chi

Nếu không, chart của hai người sinh cùng timestamp UTC nhưng khác vị trí có thể bị map giờ chi sai.

### **Định nghĩa làm việc**

**Giờ sinh trong TAO UZG+ là giờ địa phương đã chuẩn hóa và được quy đổi sang một trong 12 giờ Địa Chi, là tham số bắt buộc để xác định cung Mệnh, cung Thân và nhiều lớp phụ tinh.**

---

## **3.5. Giới tính**

Giới tính là lớp dữ liệu đầu vào thứ năm. Trong Tử Vi, giới tính không phải chỉ là thông tin mô tả cá nhân, mà là một tham số có chức năng kỹ thuật rất rõ: nó ảnh hưởng đến **chiều vận hành hạn** và một số logic diễn giải trong lá số. Working draft ENTA TAO đã ghi rõ giới tính được dùng “để xác định chiều vận hành hạn”.

Trong hệ truyền thống, giới tính gắn với:

* phân biệt nam / nữ,  
* kết hợp với âm dương năm sinh để xác định chiều vận,  
* tạo ra các phân loại như âm nam, dương nam, âm nữ, dương nữ trong cách vận hành hạn.

### **Vai trò của giới tính**

* tham gia xác định **chiều thuận / nghịch** khi hành vận  
* hỗ trợ một số lớp interpretive reading ở các phần sau  
* giúp xác định chuẩn quy chiếu cho một số cách đọc truyền thống

### **Rule for TAO**

TAO UZG+ cần tách rõ:

* **gender for calculation**  
* **gender for profile / experience**

Trong phạm vi tài liệu core calculation hiện tại, giới tính được dùng theo nghĩa:  
 **tham số kỹ thuật phục vụ lập số và hành hạn**.

Điều này có nghĩa:

* nếu hồ sơ người dùng có dữ liệu giới tính rõ ràng → dùng làm input chuẩn  
* nếu chưa rõ → không được đoán mò  
* nếu không đủ dữ liệu giới tính theo chuẩn calculation → phải đánh dấu incomplete input

### **Định nghĩa làm việc**

**Giới tính trong TAO UZG+ là tham số calculation bắt buộc, dùng để xác định chiều vận hành hạn và một số quy tắc phân loại âm dương của lá số.**

---

## **3.6. Timezone / location**

Đây là lớp dữ liệu hiện đại hóa, không phải lúc nào cũng được nhắc rõ trong sách cổ, nhưng là thành phần bắt buộc nếu muốn TAO UZG+ vận hành chuẩn trong môi trường số toàn cầu. Working draft ENTA TAO đã chủ động đưa **timezone / location** vào nhóm dữ liệu đầu vào để phục vụ chuẩn hóa dữ liệu số hiện đại.

### **Vì sao timezone / location cần thiết**

Cùng một timestamp, nhưng ở hai nơi khác nhau:

* ngày địa phương có thể khác,  
* giờ địa phương có thể khác,  
* giờ chi có thể khác,  
* thậm chí ngày âm cũng có thể lệch nếu ở gần ranh chuyển ngày.

Do đó, nếu TAO muốn là một core engine chuẩn quốc tế chứ không phải công cụ nội địa đơn giản, thì timezone/location không thể bị bỏ qua.

### **Vai trò của timezone / location**

* xác định local datetime chính xác  
* hỗ trợ chuyển từ lịch dương sang lịch âm  
* chuẩn hóa giờ sinh theo địa phương  
* giúp lưu lại chart provenance để audit

### **Mức tối thiểu**

TAO core tối thiểu phải có:

* timezone string hoặc UTC offset  
* country / city hoặc location code đủ để xác định local time

### **Mức mở rộng**

Nếu có điều kiện, có thể lưu:

* latitude / longitude  
* source of timezone  
* DST handling rule nếu có

### **Định nghĩa làm việc**

**Timezone / location trong TAO UZG+ là lớp dữ liệu bổ trợ hiện đại dùng để chuẩn hóa thời điểm sinh địa phương, bảo đảm việc quy đổi lịch và giờ sinh sang hệ Tử Vi là chính xác và audit được.**

---

## **3.7. Calendar normalization**

Calendar normalization là bước chuyển toàn bộ dữ liệu thời gian thô thành dữ liệu hợp lệ cho engine Tử Vi. Working draft ENTA TAO đã xác định rất rõ phần này gồm:

* từ lịch dương → âm lịch  
* chuẩn hóa tiết khí / can chi / giờ địa phương.

Đây là lớp cầu nối giữa:

* **time data hiện đại**  
   và  
* **time model truyền thống của Tử Vi**

### **Calendar normalization gồm các bước chính**

#### **1\. Convert Gregorian datetime to local datetime**

* dùng timezone/location để xác định thời điểm sinh theo địa phương

#### **2\. Convert local datetime to lunar date**

* xác định năm âm  
* tháng âm  
* ngày âm  
* trạng thái tháng nhuận

#### **3\. Determine Can–Chi layers**

* Can Chi năm  
* Can Chi tháng nếu cần cho các lớp mở rộng  
* Can Chi ngày nếu policy engine yêu cầu  
* Can Chi giờ hoặc ít nhất giờ chi

#### **4\. Map to earthly branch hour**

* từ giờ địa phương sang giờ Tý/Sửu/…

#### **5\. Produce normalized birth profile**

Một birth profile chuẩn cho TAO phải có ít nhất:

* solar date  
* local date/time  
* lunar year/month/day  
* leap-month flag  
* branch hour  
* gender  
* timezone/location metadata

### **Tiết khí**

Trong các hệ mệnh lý Đông phương, tiết khí là điểm rất dễ gây lệch nếu policy quy đổi không thống nhất. Vì vậy, TAO UZG+ phải xem tiết khí là một thành phần của calendar normalization layer, không được để mơ hồ hoặc phụ thuộc ngẫu nhiên vào từng thư viện tính lịch khác nhau.

### **Định nghĩa làm việc**

**Calendar normalization là quy trình chuyển dữ liệu thời gian sinh hiện đại thành hồ sơ thời gian chuẩn hóa theo hệ Tử Vi, bao gồm âm lịch, Can Chi, giờ địa phương, tiết khí và metadata kiểm toán.**

---

## **3.8. Validation rules**

Validation rules là phần khóa chất lượng đầu vào. Đây là điểm rất quan trọng với TAO UZG+, vì một chart sai không chỉ làm sai một kết quả, mà còn kéo sai toàn bộ reading, service flow và AIER Tao advisory về sau.

Working draft ENTA TAO đã nêu rõ các câu hỏi validation trọng yếu:

* thiếu giờ sinh thì lập lá số ở mức nào  
* sai lệch 1 canh giờ ảnh hưởng ra sao  
* input confidence score.

TAO UZG+ phải biến các câu hỏi này thành luật cụ thể.

### **3.8.1. Nguyên tắc chung**

Mọi input phải đi qua ba trạng thái:

* **valid**  
* **partially valid**  
* **invalid**

Không được để core engine chạy “im lặng” trên dữ liệu chưa đủ điều kiện.

---

### **3.8.2. Thiếu giờ sinh thì lập lá số ở mức nào**

Giờ sinh là dữ liệu cực nhạy. Nếu thiếu giờ sinh, TAO UZG+ không được giả vờ có thể lập một lá số đầy đủ như bình thường.

#### **Rule đề xuất**

Nếu thiếu giờ sinh:

* **không được sinh full natal chart chính thức**  
* có thể sinh một **partial profile** ở mức giới hạn, ví dụ:  
  * năm âm  
  * tháng âm  
  * ngày âm  
  * tuổi Can Chi  
  * nạp âm  
  * một số phân tích nền không phụ thuộc giờ  
* nhưng phải gắn cờ rõ:  
  * `chart_status = partial`  
  * `hour_missing = true`  
  * `confidence = low`

#### **Không được làm**

* không được tự động chọn đại một giờ  
* không được sinh ra cung Mệnh / Thân chính thức rồi giả như chart đầy đủ  
* không được cho AIER Tao tư vấn toàn lá số như thể dữ liệu đã hoàn chỉnh

---

### **3.8.3. Sai lệch 1 canh giờ ảnh hưởng ra sao**

Sai lệch một canh giờ có thể làm thay đổi:

* cung Mệnh  
* cung Thân  
* nhiều sao an theo giờ  
* diễn giải nền của lá số

Do đó, TAO UZG+ phải coi “hour uncertainty” là biến số rất lớn.

#### **Rule đề xuất**

Nếu người dùng khai giờ sinh không chắc chắn:

* phải đánh dấu `hour_confidence`  
* nếu gần ranh đổi giờ chi, phải cảnh báo khả năng chart đổi mạnh  
* có thể hỗ trợ chế độ:  
  * **single hour mode** nếu người dùng chắc chắn  
  * **uncertain hour mode** nếu người dùng chỉ nhớ khoảng  
  * **multi-chart compare mode** trong phase nâng cao để so sánh các chart lân cận

#### **Nguyên tắc đọc**

* giờ sinh càng chắc → chart confidence càng cao  
* giờ sinh càng mơ hồ → advisory scope càng phải thu hẹp

---

### **3.8.4. Input confidence score**

TAO UZG+ nên có một điểm số tin cậy đầu vào để phản ánh chất lượng dữ liệu trước khi lập số. Đây là lớp rất hữu ích cho cả:

* calculation,  
* UX,  
* AIER advisory,  
* audit.

#### **Ví dụ phân tầng**

* **High confidence**  
  * có ngày giờ sinh chính xác  
  * timezone/location rõ  
  * calendar normalized chắc chắn  
* **Medium confidence**  
  * giờ sinh ước lượng nhưng khá chắc  
  * timezone rõ  
  * có khả năng lệch nhỏ  
* **Low confidence**  
  * thiếu giờ sinh  
  * location mơ hồ  
  * dữ liệu phải suy đoán nhiều  
* **Invalid**  
  * ngày sinh không hợp lệ  
  * thiếu nhiều dữ liệu bắt buộc  
  * calendar conversion không thể xác nhận

### **Chart output phải gắn kèm confidence**

Mọi chart hoặc reading object của TAO nên lưu:

* `input_confidence_score`  
* `validation_status`  
* `missing_fields`  
* `normalization_notes`

---

### **3.8.5. Các rule kiểm tra tối thiểu**

TAO core nên có các rule tối thiểu sau:

#### **Rule A — Required field check**

Bắt buộc phải có:

* ngày sinh  
* tháng sinh  
* năm sinh  
* giới tính  
   Giờ sinh có thể cho phép thiếu, nhưng khi thiếu thì không được full chart.

#### **Rule B — Calendar validity**

* ngày hợp lệ theo lịch dương  
* local time hợp lệ  
* convert sang lịch âm thành công

#### **Rule C — Leap-month consistency**

* tháng nhuận phải có cờ xác định  
* không được bỏ trống nếu date rơi vào khu vực có khả năng tháng nhuận

#### **Rule D — Timezone consistency**

* nếu nhập giờ cụ thể, phải có timezone/location hoặc policy default rõ ràng

#### **Rule E — Traceability**

* mọi bước chuẩn hóa phải lưu dấu để chart có thể audit lại

---

## **ĐOẠN CHỐT CỦA PHẦN 3**

Từ toàn bộ các mục trên, TAO UZG+ xác lập nguyên tắc dữ liệu đầu vào như sau:

**Lá số Tử Vi chỉ được sinh ra từ một hồ sơ sinh mệnh đã chuẩn hóa, bao gồm năm, tháng, ngày, giờ sinh, giới tính và metadata thời gian địa phương. Dữ liệu dương lịch chỉ là đầu vào thô; dữ liệu có hiệu lực để lập số phải là hồ sơ âm lịch – Can Chi – giờ chi đã được calendar normalization và validation đầy đủ. Mọi trường hợp thiếu dữ liệu, mơ hồ giờ sinh, tháng nhuận hoặc timezone không rõ đều phải bị gắn cờ, giới hạn phạm vi lập số và giới hạn phạm vi advisory tương ứng.**

---

# **PART 3 — THIÊN BÀN SETUP (V3 PHẦN 4)**

## **4.1. An 12 cung địa chi cố định**

Thiên bàn là khung vị trí cơ bản của toàn bộ lá số Tử Vi. Trước khi an Mệnh, an Thân, xác định Cục hay an các sao, hệ thống bắt buộc phải dựng xong **12 cung địa chi cố định**. Đây là lớp “tọa độ nền” của lá số. Nếu lớp này sai hoặc không nhất quán, toàn bộ các bước sau sẽ không còn giá trị.

Trong hệ Tử Vi truyền thống, 12 cung địa chi được cố định theo thứ tự:

**Tý → Sửu → Dần → Mão → Thìn → Tỵ → Ngọ → Mùi → Thân → Dậu → Tuất → Hợi**

Đây là trình tự chuẩn của 12 địa chi, đồng thời cũng là khung định vị căn bản để an cung, an sao và xác lập các quan hệ như:

* tam hợp,  
* lục xung,  
* giáp cung,  
* chiếu cung,  
* vị trí miếu, vượng, hãm của nhiều sao.

Điểm phải khóa rất rõ là: **12 địa chi trên thiên bàn là cố định**, không phải thay đổi theo từng người. Cái thay đổi theo từng người không phải là thứ tự địa chi, mà là:

* cung nào được gắn thành cung Mệnh,  
* cung nào được gắn thành cung Thân,  
* cung nào trở thành Phụ Mẫu, Phúc Đức, Quan Lộc, Tài Bạch…

Nói cách khác:

* **thiên bàn** là khung cố định,  
* **nhân sự cung** là lớp gán nghĩa biến đổi theo dữ liệu sinh.

Đây là điểm rất quan trọng trong TAO UZG+, vì nhiều lỗi implementation hay xảy ra khi trộn lẫn:

* “địa chi vị trí”  
   với  
* “tên nhân sự cung”.

Trong engine, hai lớp này phải tách riêng:

1. **positional layer** \= 12 địa chi cố định  
2. **semantic layer** \= tên các cung nhân sự được gán lên các vị trí đó

### **Nguyên tắc bố trí 12 chi**

TAO UZG+ phải xem 12 địa chi như một **ring structure** gồm 12 vị trí tuần hoàn.  
 Mỗi vị trí có:

* chỉ số từ 1–12 hoặc 0–11,  
* tên chi,  
* vị trí đối xung,  
* tam hợp group,  
* lân cung trái/phải.

Ví dụ, nếu dùng zero-based index cho engine:

* 0 \= Tý  
* 1 \= Sửu  
* 2 \= Dần  
* 3 \= Mão  
* 4 \= Thìn  
* 5 \= Tỵ  
* 6 \= Ngọ  
* 7 \= Mùi  
* 8 \= Thân  
* 9 \= Dậu  
* 10 \= Tuất  
* 11 \= Hợi

Cách chuẩn hóa như vậy giúp:

* xoay vòng thuận/nghịch dễ hơn,  
* an Mệnh và Thân dễ hơn,  
* an sao theo quy luật bước tiến/lùi dễ hơn,  
* hỗ trợ machine-readable schema tốt hơn.

### **Quan hệ nền phải lưu cùng 12 chi**

Mỗi địa chi trên thiên bàn cần được engine biết sẵn:

* **đối xung**  
  * Tý ↔ Ngọ  
  * Sửu ↔ Mùi  
  * Dần ↔ Thân  
  * Mão ↔ Dậu  
  * Thìn ↔ Tuất  
  * Tỵ ↔ Hợi.  
* **tam hợp**  
  * Thân–Tý–Thìn  
  * Dần–Ngọ–Tuất  
  * Tỵ–Dậu–Sửu  
  * Hợi–Mão–Mùi.

Như vậy, phần “an 12 cung địa chi cố định” không chỉ là vẽ 12 ô rồi điền tên chi vào. Nó là bước dựng một **spatial-logic framework** cho toàn bộ lá số.

### **Định nghĩa làm việc**

**An 12 cung địa chi cố định là bước thiết lập vòng vị trí nền của thiên bàn bằng thứ tự chuẩn Tý đến Hợi, làm cơ sở không đổi cho mọi thao tác an cung và an sao về sau.**

---

## **4.2. An thiên can cho 12 cung**

Sau khi đã dựng xong 12 địa chi cố định, bước tiếp theo là **an thiên can cho 12 cung**. Đây là bước giúp thiên bàn không chỉ có “vị trí địa chi”, mà còn có **lớp thiên can tọa trên từng cung**, từ đó hình thành một thiên bàn hoàn chỉnh theo logic truyền thống.

Working draft ENTA TAO đã khóa rõ rằng bước này phải dùng **Ngũ Hổ Độn** để xác định **can cung Dần** trước, sau đó **điền thuận** các can cho 11 cung còn lại.

### **Bản chất của bước an can cung**

Thiên can của 12 cung không được điền tùy tiện. Nó phải được xác định dựa trên:

* **Thiên can năm sinh**  
* quy tắc **Ngũ Hổ Độn**  
* và sau đó triển khai tuần tự thuận qua 12 cung.

Điều này có nghĩa:  
 khác người → khác can năm sinh → khác can khởi ở cung Dần → khác toàn bộ hệ can của 12 cung.

### **Ngũ Hổ Độn là gì trong ngữ cảnh TAO**

Ngũ Hổ Độn là quy tắc xác định **thiên can khởi đầu ở cung Dần** dựa trên can năm sinh. Sau khi xác định được can cung Dần, hệ thống điền tiếp các can còn lại theo thứ tự thuận từng cung một quanh thiên bàn.

### **Bảng khởi can cung Dần theo Ngũ Hổ Độn**

TAO UZG+ nên khóa chuẩn theo bảng sau:

* **Giáp / Kỷ** → **Bính Dần**  
* **Ất / Canh** → **Mậu Dần**  
* **Bính / Tân** → **Canh Dần**  
* **Đinh / Nhâm** → **Nhâm Dần**  
* **Mậu / Quý** → **Giáp Dần**

Sau đó điền thuận theo thứ tự 10 can:  
 Giáp → Ất → Bính → Đinh → Mậu → Kỷ → Canh → Tân → Nhâm → Quý → quay vòng.

### **Ví dụ nguyên tắc**

Nếu năm sinh là **Giáp**:

* cung Dần \= **Bính**  
* cung Mão \= **Đinh**  
* cung Thìn \= **Mậu**  
* cung Tỵ \= **Kỷ**  
* …  
   điền thuận cho đến hết 12 cung.

Nếu năm sinh là **Bính**:

* cung Dần \= **Canh**  
* cung Mão \= **Tân**  
* cung Thìn \= **Nhâm**  
* cung Tỵ \= **Quý**  
* …  
   tiếp tục thuận cho hết thiên bàn.

### **Vì sao phải khởi từ cung Dần**

Trong hệ mệnh lý cổ, cung Dần được dùng như điểm khởi quan trọng cho nhiều logic thời gian và bố trí can cung. Việc khóa khởi từ Dần là điều bắt buộc để thống nhất toàn hệ. TAO UZG+ không được đổi điểm khởi sang vị trí khác, vì làm vậy sẽ khiến hệ an can lệch toàn bộ so với hệ tham chiếu truyền thống.

### **Ý nghĩa của lớp can cung**

Lớp can gắn trên 12 cung không phải chi tiết trang trí. Nó có vai trò trong:

* diễn giải cấu trúc cung sâu hơn,  
* một số hệ an sao,  
* các lớp đọc hóa khí và động tính,  
* hỗ trợ reasoning layer của TAO về sau.

### **Rule implementation**

TAO core phải triển khai bước này như một hàm độc lập:

**Input**

* can năm sinh

**Output**

* mapping 12 cung địa chi → thiên can tương ứng

### **Không được làm**

* không hardcode một thiên bàn can cố định cho mọi người  
* không bỏ qua bước Ngũ Hổ Độn  
* không suy diễn theo cảm tính hay theo mẫu lá số có sẵn

### **Định nghĩa làm việc**

**An thiên can cho 12 cung là bước dùng Ngũ Hổ Độn để xác định can của cung Dần từ can năm sinh, rồi điền thuận các thiên can còn lại lên toàn bộ 12 cung của thiên bàn.**

---

## **4.3. Quy tắc trình bày thiên bàn**

Sau khi có:

* 12 địa chi cố định  
* 12 thiên can được an đúng theo Ngũ Hổ Độn

TAO UZG+ phải khóa tiếp một lớp rất quan trọng: **quy tắc trình bày thiên bàn**. Đây là phần tưởng như chỉ liên quan UI, nhưng thực ra ảnh hưởng trực tiếp đến:

* chuẩn dữ liệu,  
* tính nhất quán giữa engine và giao diện,  
* khả năng audit chart,  
* khả năng dùng cùng một chart object cho reading, service và AIER Tao.

Quy tắc trình bày thiên bàn gồm ba phần:

1. **phương vị**  
2. **thứ tự cung**  
3. **ký hiệu chuẩn dữ liệu cho engine**

---

### **4.3.1. Phương vị**

Thiên bàn không chỉ là danh sách 12 cung trên một vòng tròn trừu tượng. Nó phải có **phương vị hiển thị chuẩn** để:

* người đọc hiểu được bố cục,  
* engine render nhất quán,  
* việc đối chiếu với sách truyền thống và các hệ lá số phổ biến không bị lệch.

Trong TAO UZG+, cần khóa một **display orientation chuẩn duy nhất** cho toàn hệ.  
 Dù lựa chọn bố cục vuông hay vòng tròn khi render, hệ thống vẫn phải có một **orientation canonical** trong dữ liệu.

### **Khuyến nghị chuẩn hóa**

Ở tầng data model:

* lưu thiên bàn theo thứ tự canonical **Tý → Hợi** như ring 12 vị trí  
* phương vị hiển thị chỉ là một lớp render mapping

Ở tầng UI:

* phải dùng một orientation cố định cho mọi chart trong hệ  
* không để từng module render một kiểu khiến user nhìn cùng một chart mà tưởng khác chart

### **Nguyên tắc**

* **data canonical** phải độc lập với UI layout  
* **UI layout** phải nhất quán trên toàn sản phẩm

Nói cách khác:

* engine không được phụ thuộc vào việc cung Tý đang nằm ở “trên cùng” hay “dưới cùng” của màn hình  
* engine chỉ biết ring positions  
* UI mới là nơi quyết định render cung đó ở đâu

Đây là nguyên tắc rất quan trọng để tránh việc:

* đổi layout UI → hỏng logic calculation  
* hoặc lấy logic calculation theo ảnh render rồi gây lỗi

### **Định nghĩa làm việc**

**Phương vị trong thiên bàn là lớp quy chuẩn hiển thị các vị trí cung trên mặt lá số; nó phải nhất quán trong UI nhưng không được chi phối logic tính toán của core engine.**

---

### **4.3.2. Thứ tự cung**

“Thứ tự cung” ở đây phải hiểu theo hai lớp khác nhau:

#### **Lớp 1 — thứ tự địa chi**

Đây là thứ tự cố định:  
 **Tý → Sửu → Dần → Mão → Thìn → Tỵ → Ngọ → Mùi → Thân → Dậu → Tuất → Hợi**

#### **Lớp 2 — thứ tự nhân sự cung**

Đây là lớp biến đổi theo từng lá số:

* Mệnh  
* Phụ Mẫu  
* Phúc Đức  
* Điền Trạch  
* Quan Lộc  
* Nô Bộc  
* Thiên Di  
* Tật Ách  
* Tài Bạch  
* Tử Tức  
* Phu Thê  
* Huynh Đệ

Điểm phải khóa rất chặt là:

* **địa chi order luôn cố định**  
* **nhân sự cung order được gán sau khi an Mệnh**

Nhiều hệ triển khai sai vì trộn lẫn hai thứ tự này. TAO UZG+ không được mắc lỗi đó.

### **Cách trình bày chuẩn**

Mỗi ô cung trong chart UI nên thể hiện tối thiểu:

* địa chi vị trí  
* thiên can của cung  
* tên nhân sự cung sau khi an  
* các sao đóng tại đó

Ví dụ một cung có thể có bốn lớp:

1. **can cung**  
2. **chi cung**  
3. **tên cung nhân sự**  
4. **danh sách sao**

Cách tổ chức 4 lớp này giúp:

* giữ đúng chuẩn truyền thống  
* giữ được machine readability  
* dễ dùng cho AIER Tao sau này khi phải đọc chart object

### **Định nghĩa làm việc**

**Thứ tự cung trong TAO UZG+ phải tách riêng thứ tự địa chi cố định và thứ tự nhân sự cung được an động theo lá số; không được trộn hai lớp này thành một.**

---

### **4.3.3. Ký hiệu chuẩn dữ liệu cho engine**

Đây là phần cực kỳ quan trọng đối với TAO UZG+, vì tài liệu này không chỉ để viết cho người đọc hiểu, mà còn để biến thành **implementation contract** cho engine, database và AIER Tao.

Thiên bàn trong TAO phải có một mô hình dữ liệu chuẩn, ví dụ mỗi cung nên được engine biểu diễn như một object có các trường tối thiểu sau:

#### **Core fields**

* `index`  
* `earthly_branch`  
* `heavenly_stem`  
* `palace_name`  
* `is_menh`  
* `is_than`

#### **Relation fields**

* `opposite_index`  
* `tam_hop_group`  
* `left_neighbor`  
* `right_neighbor`

#### **Content fields**

* `main_stars`  
* `auxiliary_stars`  
* `transforms`  
* `major_cycle_data`  
* `annotations`

### **Naming convention**

TAO UZG+ nên dùng:

* **canonical English keys** trong database / code  
* **localized labels** cho UI

Ví dụ:

* `earthly_branch: "ty"` nhưng UI hiển thị `Tý`  
* `palace_name: "menh"` nhưng UI hiển thị `Mệnh`

### **Không được làm**

* không dùng key ngẫu hứng theo từng dev  
* không trộn label hiển thị với data canonical  
* không để AIER Tao đọc từ HTML render thay vì chart object chuẩn

### **Chart object là source of truth**

Với TAO UZG+, source of truth không phải ảnh lá số, mà phải là:  
 **structured chart object**.

Ảnh lá số chỉ là:

* human-readable render  
* presentation layer

Còn AIER Tao, reading engine, membership logic và các service layer đều phải bám vào:

* cùng một chart object chuẩn  
* cùng một palace schema chuẩn  
* cùng một relation model chuẩn

### **Định nghĩa làm việc**

**Ký hiệu chuẩn dữ liệu cho engine là bộ quy tắc biểu diễn thiên bàn dưới dạng cấu trúc dữ liệu nhất quán, trong đó mỗi cung phải có định danh vị trí, can chi, tên cung, quan hệ vị trí và nội dung sao một cách machine-readable.**

---

# **ĐOẠN CHỐT CỦA PHẦN 4**

Từ toàn bộ các mục trên, TAO UZG+ xác lập nguyên tắc thiết lập thiên bàn như sau:

**Thiên bàn là khung vị trí nền của lá số Tử Vi, được dựng bằng 12 địa chi cố định theo thứ tự Tý đến Hợi, sau đó an thiên can cho 12 cung bằng Ngũ Hổ Độn khởi từ cung Dần rồi điền thuận. Mọi trình bày thiên bàn trong TAO UZG+ phải tách rõ giữa vị trí địa chi, lớp can cung, lớp cung nhân sự và lớp sao, đồng thời phải được chuẩn hóa dưới dạng chart object machine-readable để làm source of truth cho calculation, reading và AIER Tao advisory.**

---

---

# **PART 4 — MỆNH / THÂN / 12 CUNG (V3 PHẦN 5)**

## **5.1. Phương pháp an Cung Mệnh**

Cung Mệnh là điểm khởi đầu của toàn bộ lớp **nhân sự cung** trong lá số Tử Vi. Nếu thiên bàn là khung vị trí cố định của 12 địa chi, thì việc an Cung Mệnh là bước đầu tiên biến thiên bàn từ một vòng vị trí trừu tượng thành một lá số mang ý nghĩa nhân sự cụ thể của một con người. Chính vì vậy, an Cung Mệnh không chỉ là một thao tác kỹ thuật nhỏ, mà là bước xác lập **tọa độ nhân thân** của đương số trên thiên bàn.

Theo working draft ENTA TAO, phương pháp an Cung Mệnh được chuẩn hóa như sau:

* **khởi từ Dần**  
* **đếm thuận theo tháng sinh**  
* **từ đó đếm nghịch theo giờ sinh**.

Đây là quy tắc phải khóa cứng trong TAO UZG+, không được dùng song song nhiều cách khác nhau.

### **Cấu trúc thao tác**

Bước an Cung Mệnh luôn gồm hai pha:

#### **Pha 1 — lấy tháng sinh làm mốc**

Bắt đầu từ cung **Dần** làm điểm khởi, đếm **thuận** theo thứ tự địa chi đến tháng sinh âm lịch của đương số.

Ví dụ nguyên lý:

* tháng 1 âm lịch → quy chiếu từ Dần  
* tháng 2 → tiến thêm một cung  
* tháng 3 → tiến thêm một cung nữa  
* …  
* tiếp tục cho đến tháng 12

Điểm đích sau pha này chưa phải Cung Mệnh, mà là **mốc trung gian theo tháng sinh**.

#### **Pha 2 — dùng giờ sinh để định Mệnh**

Từ mốc trung gian vừa xác lập, tiếp tục **đếm nghịch** theo giờ sinh tính theo 12 địa chi.  
 Cung dừng cuối cùng chính là **Cung Mệnh**.

Như vậy, Mệnh là kết quả của:

* **trục tháng**  
   kết hợp với  
* **trục giờ**

trên nền thiên bàn cố định.

### **Ý nghĩa phương pháp**

Phương pháp này phản ánh tư duy rất đặc trưng của Tử Vi:

* tháng sinh đưa con người vào một “mùa vị trí”  
* giờ sinh tinh chỉnh vị trí ấy thành tọa độ cá nhân cụ thể

Do đó, Cung Mệnh không phải là một cung ngẫu nhiên, mà là kết quả của việc đặt cá nhân vào giao điểm giữa:

* chu kỳ tháng sinh  
* và chu kỳ giờ sinh

### **Rule implementation cho TAO**

TAO core phải triển khai bước này như một hàm rõ ràng:

**Input**

* tháng sinh âm lịch chuẩn hóa  
* giờ sinh đã quy đổi sang giờ chi

**Output**

* `menh_branch`  
* `menh_index`

### **Yêu cầu hệ thống**

* thao tác đếm phải dùng **ring 12 cung**  
* đếm thuận/nghịch phải tính tuần hoàn  
* tháng sinh và giờ sinh phải là dữ liệu đã chuẩn hóa, không dùng raw input trực tiếp

### **Không được làm**

* không khởi từ cung khác ngoài Dần  
* không đếm thuận cả tháng lẫn giờ cho Cung Mệnh  
* không đổi chính sách an Mệnh theo từng module hoặc từng môi trường render

### **Định nghĩa làm việc**

**An Cung Mệnh là thao tác xác định cung nhân sự trung tâm của đương số bằng cách khởi từ Dần, đếm thuận theo tháng sinh âm lịch, rồi đếm nghịch theo giờ sinh địa chi để lấy cung dừng làm Mệnh.**

---

## **5.2. Phương pháp an Cung Thân**

Nếu Cung Mệnh là điểm biểu thị bản thể khởi đầu của con người trong lá số, thì Cung Thân là điểm biểu thị phần thân hành, phần nhập thế, phần đời sống cụ thể mà con người mang và sống ra trong tiến trình vận động của cuộc đời. Trong hệ Tử Vi, Cung Thân là một yếu tố rất quan trọng và được các tài liệu cổ dành riêng hẳn mục để bàn về “tác dụng của cung Thân”.

Theo working draft ENTA TAO, phương pháp an Cung Thân được chuẩn hóa như sau:

* **khởi từ Dần**  
* **đếm thuận theo tháng sinh**  
* **từ đó đếm thuận theo giờ sinh**.

Điểm khác cốt lõi giữa Mệnh và Thân nằm ở chỗ:

* **Mệnh**: tháng thuận, giờ nghịch  
* **Thân**: tháng thuận, giờ thuận

Chính khác biệt này làm cho Mệnh và Thân có thể đồng cung hoặc khác cung, và từ đó tạo ra nhiều loại bố cục lá số khác nhau.

### **Cấu trúc thao tác**

Cũng như an Mệnh, an Thân gồm hai pha:

#### **Pha 1 — lấy tháng sinh làm mốc**

Khởi từ **Dần**, đếm **thuận** theo tháng sinh âm lịch để xác định mốc trung gian.

#### **Pha 2 — lấy giờ sinh để định Thân**

Từ mốc đó, tiếp tục **đếm thuận** theo giờ sinh địa chi.  
 Cung dừng cuối cùng chính là **Cung Thân**.

### **Ý nghĩa phương pháp**

Nếu an Mệnh dùng thế “thuận tháng – nghịch giờ”, thì an Thân dùng thế “thuận tháng – thuận giờ”. Điều này phản ánh lối tổ chức rất đặc sắc của Tử Vi:

* Mệnh thiên về điểm định vị bản thể  
* Thân thiên về điểm đi cùng tiến trình hành động và biểu hiện

Do đó, Thân không chỉ là một cung bổ sung cho đẹp, mà là một trục đối chiếu cực kỳ quan trọng với Mệnh.

### **Rule implementation cho TAO**

TAO core phải sinh ra tối thiểu:

* `than_branch`  
* `than_index`  
* `is_menh_than_same_palace = true/false`

### **Các trường hợp**

* **Mệnh và Thân đồng cung**: biểu thị sự tập trung mạnh giữa bản thể và phần thân hành  
* **Mệnh và Thân khác cung**: biểu thị sự phân bổ khác nhau giữa bản tâm và đời sống nhập thế

Phần ý nghĩa sâu của các trường hợp này sẽ được dùng trong tầng interpretive layer, nhưng calculation layer phải dựng được chúng thật chuẩn.

### **Không được làm**

* không an Thân bằng cách đếm nghịch theo giờ  
* không suy từ Mệnh ra Thân nếu chưa tính riêng  
* không cho AIER Tao tự ước đoán Thân từ vài dấu hiệu mô tả

### **Định nghĩa làm việc**

**An Cung Thân là thao tác xác định cung thân hành của đương số bằng cách khởi từ Dần, đếm thuận theo tháng sinh âm lịch, rồi tiếp tục đếm thuận theo giờ sinh địa chi để lấy cung dừng làm Thân.**

---

## **5.3. An 11 cung còn lại**

Sau khi đã xác định được Cung Mệnh, hệ thống mới tiến hành gán tên cho 11 cung nhân sự còn lại. Đây là bước chuyển từ:

* **vị trí địa chi thuần túy**  
   sang  
* **hệ 12 cung nhân sự**

Theo working draft ENTA TAO, 11 cung còn lại phải được an tiếp từ Mệnh theo thứ tự sau:  
 **Phụ Mẫu → Phúc Đức → Điền Trạch → Quan Lộc → Nô Bộc → Thiên Di → Tật Ách → Tài Bạch → Tử Tức → Phu Thê → Huynh Đệ**.

### **Nguyên tắc**

* lấy **cung Mệnh** làm mốc số 1  
* từ đó đi theo thứ tự nhân sự cung chuẩn  
* mỗi cung kế tiếp chiếm một vị trí địa chi liền kề theo vòng 12 cung

Điều này có nghĩa:

* tên “Phụ Mẫu”, “Phúc Đức”, “Quan Lộc”… không có vị trí cố định tuyệt đối trên thiên bàn  
* chúng được **xoay theo Mệnh**  
* chỉ có địa chi là cố định, còn nhân sự cung là lớp gán động

### **Thứ tự chuẩn của 12 cung nhân sự**

Bắt đầu từ Mệnh, thứ tự đầy đủ là:

1. **Mệnh**  
2. **Phụ Mẫu**  
3. **Phúc Đức**  
4. **Điền Trạch**  
5. **Quan Lộc**  
6. **Nô Bộc**  
7. **Thiên Di**  
8. **Tật Ách**  
9. **Tài Bạch**  
10. **Tử Tức**  
11. **Phu Thê**  
12. **Huynh Đệ**

### **Ý nghĩa kỹ thuật**

Bước này tạo ra một mapping rất quan trọng trong chart object:

* chi nào \= cung Mệnh  
* chi nào \= cung Phụ Mẫu  
* chi nào \= cung Phúc Đức  
* …  
* chi nào \= cung Huynh Đệ

### **Yêu cầu engine**

Mỗi chart sau bước này phải sinh được:

* `palace_name`  
* `palace_order`  
* `branch_position`  
* `is_menh`  
* `is_than`

### **Không được làm**

* không hardcode tên cung nhân sự trên vị trí địa chi cố định  
* không an cung nhân sự trước khi xác định Mệnh  
* không trộn “thứ tự nhân sự cung” với “thứ tự địa chi”

### **Định nghĩa làm việc**

**An 11 cung còn lại là thao tác gán lần lượt các cung nhân sự tiếp theo từ vị trí Mệnh theo thứ tự chuẩn của hệ 12 cung, tạo thành lớp ý nghĩa nhân sự hoàn chỉnh trên thiên bàn.**

---

## **5.4. Ý nghĩa của cung Mệnh**

Cung Mệnh là trung tâm bản thể của lá số. Trong hệ Tử Vi, Mệnh không chỉ là “tôi là ai” theo nghĩa khái quát, mà là nơi tập trung để đọc:

* bản chất nền,  
* khí chất,  
* xu hướng tâm tính,  
* cấu trúc phản ứng căn bản,  
* khả năng tiếp nhận và biểu hiện đời sống của cá nhân.

Nguyễn Phát Lộc xem cung Mệnh là nơi biểu thị **taâm tính, trí tuệ, tình cảm, sở thích, sở ố**, nói gọn lại là nội tâm và cấu trúc cá nhân của con người.

### **Mệnh không được đọc đơn độc**

Tuy Mệnh là trung tâm, nhưng không được hiểu sai rằng chỉ cần nhìn cung Mệnh là đủ. Chính các nguồn học thuật hiện đại hơn nhấn mạnh:

* Mệnh phải được đọc trong tương quan với **Thân**  
* và trong tương quan với các cung như **Quan, Di, Tài, Phúc**.

### **Trong TAO UZG+**

Mệnh được dùng như:

* **identity center**  
* **temperament center**  
* **primary interpretive anchor**

AIER Tao về sau có thể dùng Mệnh như một nguồn context quan trọng, nhưng không bao giờ được rút gọn lá số thành “một câu về Mệnh”.

### **Định nghĩa làm việc**

**Cung Mệnh là cung trung tâm biểu thị bản thể, tâm tính và cấu trúc nền của đương số, đồng thời là điểm khởi đầu để an toàn bộ hệ 12 cung nhân sự.**

---

## **5.5. Ý nghĩa của cung Thân**

Cung Thân là trục biểu thị phần thân hành, phần biểu lộ nhập thế, phần đời sống được con người thực sự mang ra sống và va chạm với hoàn cảnh. Trong nhiều hệ giải thích truyền thống, Mệnh có thể được hiểu gần với “bản chất”, còn Thân gần với “đời sống hiện thân”.

Nguyễn Phát Lộc xem việc phân biệt Mệnh và Thân là cách Tử Vi chia đời người thành hai vùng lớn:

* một vùng gắn với nền khởi đầu,  
* một vùng gắn với quá trình thành thân, nhập thế, tự lập và hành động trong đời.

### **Thân thường gắn với các cung cường**

Theo hệ cổ, cung Thân chỉ rơi vào một số cung quan trọng, không rơi tùy tiện vào mọi cung như nhau. Điều đó cho thấy Thân luôn được xem là một cung có trọng lượng đặc biệt trong lá số.

### **Trong TAO UZG+**

Thân nên được dùng như:

* **embodiment center**  
* **life-expression anchor**  
* **secondary interpretive axis**

Nếu Mệnh là “con người gốc”, Thân là “con người được sống ra”.

### **Định nghĩa làm việc**

**Cung Thân là cung biểu thị phần thân hành, phần nhập thế và phần đời sống được hiện thực hóa của đương số, là trục đối chiếu trọng yếu với cung Mệnh trong mọi diễn giải.**

---

## **5.6. Quan hệ Mệnh – Thân**

Quan hệ Mệnh – Thân là một trong những quan hệ nền quan trọng nhất của lá số. Chỉ khi nhìn đồng thời hai trục này, ta mới bắt đầu thấy được sự khác nhau giữa:

* bản chất và biểu hiện,  
* gốc và phần sống ra,  
* nội tâm và đời sống nhập thế.

### **Các trạng thái cơ bản**

#### **1\. Mệnh – Thân đồng cung**

Khi Mệnh và Thân đồng cung, có thể hiểu đây là trường hợp:

* bản thể và phần hành tương đối tập trung  
* đời sống biểu hiện ra khá gần với cốt tính bên trong  
* trục người – đời ít tách rời hơn

#### **2\. Mệnh – Thân khác cung**

Khi Mệnh và Thân khác cung, có thể hiểu đây là trường hợp:

* đời sống biểu hiện ra mang thêm một trục khác  
* bản chất nền và phần sống thực tế không hoàn toàn trùng nhau  
* việc luận số phải đối chiếu hai vùng thay vì nhìn một điểm

### **Không được cực đoan hóa**

TAO UZG+ không được biến Mệnh–Thân thành một kết luận tâm lý đơn giản kiểu:

* đồng cung \= tốt  
* khác cung \= xấu

Đó là cách đọc quá sơ lược. Đúng hơn, quan hệ Mệnh – Thân cho biết:

* lá số tập trung hay phân tán  
* đời người đi gần trục gốc hay đi theo một hướng biểu hiện khác  
* việc luận giải nên gom trục hay phải đối chiếu trục

### **Định nghĩa làm việc**

**Quan hệ Mệnh – Thân là quan hệ giữa bản thể nền và phần hiện thân nhập thế của đương số, dùng để xác định mức độ tập trung hay phân hóa của cấu trúc đời sống trong lá số.**

---

## **5.7. Cường cung – nhược cung**

Khái niệm **cường cung – nhược cung** xuất hiện trong hệ mục lục của **Tử Vi Đẩu Số Toàn Thư**, cho thấy đây là một phần được truyền thống xem là quan trọng trong việc luận cung và đánh giá sức nặng của từng vùng trên lá số.

### **Cường cung là gì**

Cường cung là cung có:

* vị trí trọng yếu,  
* hoặc được tăng lực bởi sự hiện diện của Mệnh/Thân,  
* hoặc được nhiều yếu tố quan trọng hội tụ,  
* hoặc trở thành vùng quyết định mạnh trong cấu trúc lá số.

### **Nhược cung là gì**

Nhược cung là cung:

* ít lực hơn,  
* không giữ vai trò trung tâm,  
* dễ bị chi phối hơn là chi phối,  
* hoặc mang ý nghĩa phụ trợ hơn là quyết định.

### **Quan điểm cần khóa cho TAO**

Trong calculation layer hiện tại, TAO không cần kết luận sâu ngay cung nào cường, cung nào nhược, nhưng phải chuẩn bị hạ tầng dữ liệu để interpretive layer sau này làm được điều đó.

Ví dụ, engine cần biết:

* cung nào là Mệnh  
* cung nào là Thân  
* cung nào được sao chính mạnh tọa thủ  
* cung nào là vùng tam hợp trọng yếu  
* cung nào bị xung phá mạnh  
* cung nào là nơi các vòng sao trọng yếu hội tụ

Từ đó, reading layer mới suy ra khái niệm cường – nhược.

### **Không được đơn giản hóa**

Không được hiểu cường cung chỉ là “cung có nhiều sao hơn”, hoặc nhược cung là “cung ít sao hơn”. Cường/nhược là một khái niệm mang tính cấu trúc, liên quan đến:

* vị trí  
* vai trò  
* lực hội tụ  
* tương quan toàn bàn

### **Định nghĩa làm việc**

**Cường cung – nhược cung là khái niệm dùng để phân biệt mức độ trọng yếu và sức tác động của từng cung trong lá số, dựa trên vị trí, vai trò và lực hội tụ của cấu trúc toàn bàn, chứ không chỉ dựa vào số lượng sao đơn lẻ.**

---

# **ĐOẠN CHỐT CỦA PHẦN 5**

Từ toàn bộ các mục trên, TAO UZG+ xác lập nguyên tắc như sau:

**Việc an Cung Mệnh, Cung Thân và 12 nhân sự cung là bước chuyển thiên bàn từ khung vị trí địa chi cố định sang cấu trúc nhân sự của một cá nhân cụ thể. Cung Mệnh được xác định bằng cách khởi từ Dần, đếm thuận theo tháng sinh rồi đếm nghịch theo giờ sinh; Cung Thân được xác định bằng cách khởi từ Dần, đếm thuận theo tháng sinh rồi đếm thuận theo giờ sinh. Từ Mệnh, 11 cung nhân sự còn lại được gán tuần tự theo thứ tự chuẩn của hệ 12 cung. Mệnh và Thân là hai trục nền bắt buộc phải đọc cùng nhau, còn cường cung – nhược cung là kết quả của việc xét vai trò và lực của từng cung trong cấu trúc toàn bàn.**

---

# **PART 5 — NGŨ HÀNH CỤC (V3 PHẦN 6)**

## **6.1. Cục là gì**

Trong hệ thống Tử Vi, **Cục** là một trong những tham số nền quan trọng nhất của toàn bộ lá số. Nếu cung Mệnh xác định “điểm đứng bản thể” của đương số trên thiên bàn, thì Cục xác định **môi trường năng lượng mà điểm Mệnh đó đang vận hành trong đó**. Vì vậy, có thể hiểu một cách ngắn gọn:

**Mệnh là gốc vị trí của con người, còn Cục là môi trường khí hành mà Mệnh phải tương tác.**

Working draft ENTA TAO định nghĩa rất đúng hướng khi xem Cục là **“môi trường năng lượng tương tác với Mệnh”**. Đây là cách hiểu đặc biệt phù hợp cho TAO UZG+, vì nó giúp tách rõ:

* **Mệnh** không phải toàn bộ lá số,  
* **Cục** không phải một tên phụ để cho đủ thủ tục,  
* mà hai yếu tố này tạo thành một cặp căn bản để engine bắt đầu dựng trục số mệnh.

Trong thực hành lập số, Cục vừa là:

* một tham số **ngũ hành**,  
* vừa là một tham số **số học**,  
* vừa là một tham số **môi trường**.

### **Cục là tham số ngũ hành**

Cục luôn thuộc về một trong năm hành:

* Thủy  
* Mộc  
* Kim  
* Thổ  
* Hỏa

Điều này cho thấy Cục không phải là một nhãn tùy ý, mà là một cách phân loại môi trường khí vận của lá số theo ngũ hành.

### **Cục là tham số số học**

Mỗi Cục không chỉ có hành, mà còn có **số cục** đi kèm:

* Thủy nhị cục  
* Mộc tam cục  
* Kim tứ cục  
* Thổ ngũ cục  
* Hỏa lục cục.

Chính con số này sẽ tham gia trực tiếp vào việc tính tọa độ sao Tử Vi về sau.

### **Cục là tham số môi trường**

Đây là tầng giải thích quan trọng nhất. Cùng một cung Mệnh, nhưng nếu đặt trong Cục khác nhau thì cách vận hành của lá số sẽ khác nhau. Vì vậy, Cục không được hiểu như “một chi tiết thêm vào”, mà phải hiểu như **trường vận hành** của Mệnh. Cũng vì lý do đó, nhiều hệ truyền thống luôn đọc Mệnh trong quan hệ với Cục, chứ không đọc Mệnh như một đơn vị tách rời.

Trong TAO UZG+, Cục phải được hiểu như một **foundational environment variable**:

* Mệnh cho biết đương số đứng ở đâu  
* Cục cho biết đương số đứng trong loại môi trường khí nào

### **Cục không phải lớp diễn giải tự do**

Cục là tham số calculation trước khi là tham số interpretation.  
 Nghĩa là:

* trước tiên engine phải xác định Cục đúng  
* sau đó các tầng reading mới diễn giải quan hệ Mệnh–Cục

TAO UZG+ không được để AIER Tao hay reading layer tự “cảm nhận” Cục bằng câu chữ suy diễn. Cục phải là dữ liệu sinh ra từ calculation.

### **Định nghĩa làm việc**

**Cục là tham số ngũ hành – số học biểu thị môi trường năng lượng mà cung Mệnh tương tác và vận hành trong đó, đồng thời là một trong những nền calculation bắt buộc của lá số Tử Vi.**

---

## **6.2. Phương pháp lập Cục**

Phương pháp lập Cục trong TAO UZG+ phải được khóa rất rõ và chỉ được dùng **một chuẩn duy nhất**. Working draft ENTA TAO đã xác định hướng chuẩn là:

* **dựa vào can năm sinh**  
* **và địa chi cung Mệnh**  
* từ đó quy về một trong năm loại Cục:  
  * **Thủy nhị cục**  
  * **Mộc tam cục**  
  * **Kim tứ cục**  
  * **Thổ ngũ cục**  
  * **Hỏa lục cục**.

Điều này có nghĩa là Cục không thể xác định trước khi biết:

1. **can năm sinh**  
2. **cung Mệnh đã an xong**

Nói cách khác, Cục nằm **sau bước an Mệnh**, không nằm trước.

### **Hai đầu vào bắt buộc**

#### **1\. Can năm sinh**

Can năm sinh là phần “gốc khí” của tuổi. Đây là lớp tham số được lấy từ hồ sơ sinh mệnh đã chuẩn hóa trong PHẦN 3\.

#### **2\. Địa chi của cung Mệnh**

Cung Mệnh là kết quả của bước an Mệnh ở PHẦN 5\. Khi Mệnh đã được xác định rơi vào cung chi nào trên thiên bàn, chi đó trở thành đầu vào thứ hai để lập Cục.

### **Nguyên lý tổng quát**

TAO core phải dùng **ma trận hoặc bảng quy chiếu chuẩn** giữa:

* **Can năm sinh**  
* và **Chi cung Mệnh**

để suy ra:

* hành của Cục  
* số của Cục

Vì đây là tài liệu core calculation, điều quan trọng là khóa nguyên lý: **Cục không được suy diễn bằng lời**, mà phải được sinh ra từ một bảng hoặc rule-set chuẩn hóa.

### **Năm loại Cục chuẩn**

Sau khi tính xong, kết quả chỉ được rơi vào một trong năm loại sau:

#### **1\. Thủy nhị cục**

* hành: Thủy  
* số cục: 2

#### **2\. Mộc tam cục**

* hành: Mộc  
* số cục: 3

#### **3\. Kim tứ cục**

* hành: Kim  
* số cục: 4

#### **4\. Thổ ngũ cục**

* hành: Thổ  
* số cục: 5

#### **5\. Hỏa lục cục**

* hành: Hỏa  
* số cục: 6

Đây là năm giá trị hợp lệ duy nhất. Nếu engine sinh ra giá trị ngoài năm loại này, phải xem như calculation error.

### **Rule implementation cho TAO**

TAO UZG+ nên triển khai bước này như một module/hàm riêng:

**Input**

* `year_heavenly_stem`  
* `menh_earthly_branch`

**Output**

* `cuc_element`  
* `cuc_number`  
* `cuc_name`

Ví dụ:

* `cuc_element = "thuy"`  
* `cuc_number = 2`  
* `cuc_name = "Thủy nhị cục"`

### **Yêu cầu lưu vết**

Mỗi chart object phải lưu:

* Can năm sinh dùng để tính Cục  
* Chi cung Mệnh dùng để tính Cục  
* bảng/policy version của rule lập Cục  
* kết quả Cục cuối cùng

Điều này rất quan trọng để audit, bởi vì Cục là một nút calculation nằm trước nhiều bước khác.

### **Không được làm**

* không xác định Cục trước khi có cung Mệnh  
* không để nhiều policy lập Cục chạy song song  
* không để reading layer hoặc AIER layer tự “đoán” Cục từ ngữ nghĩa  
* không coi Cục là thông tin mô tả phụ có thể bỏ qua

### **Định nghĩa làm việc**

**Phương pháp lập Cục trong TAO UZG+ là thao tác xác định Ngũ Hành Cục bằng cách lấy Can năm sinh kết hợp với địa chi cung Mệnh, rồi quy đổi qua bảng chuẩn để thu về một trong năm Cục: Thủy nhị, Mộc tam, Kim tứ, Thổ ngũ, Hỏa lục.**

---

## **6.3. Vai trò của Cục trong toàn bàn**

Cục không chỉ là một nhãn nền cho đẹp lá số. Nó có vai trò calculation rất rõ ràng và ảnh hưởng trực tiếp đến nhiều lớp quan trọng của toàn bàn. Working draft ENTA TAO đã xác định hai vai trò cốt lõi nhất của Cục:

* **là tham số gốc để tính tọa độ sao Tử Vi**  
* **đồng thời dùng trong Vòng Tràng Sinh**.

Đây là hai điểm phải khóa rất chặt trong TAO UZG+.

---

### **6.3.1. Cục là tham số gốc để tính tọa độ sao Tử Vi**

Trong hệ an sao, **sao Tử Vi** là gốc tọa độ của toàn bộ hệ 14 chính tinh. Muốn an đúng 14 chính tinh, trước tiên phải xác định được Tử Vi nằm ở đâu. Và để xác định vị trí của Tử Vi, engine cần hai tham số:

* **ngày sinh âm lịch**  
* **Cục**.

Điều này có nghĩa:

* nếu Cục sai → tọa độ Tử Vi sai  
* Tử Vi sai → toàn bộ hệ chính tinh sai  
* hệ chính tinh sai → cả lá số sai nền

Vì vậy, trong chuỗi calculation, Cục là một **dependency node** nằm ngay trước bước an Tử Vi.

### **Hàm ý hệ thống**

TAO core phải xem Cục là:

* một **required upstream variable**  
* của module `calculate_tu_vi_position`

Không được cho phép module an chính tinh chạy nếu chưa có Cục hợp lệ.

---

### **6.3.2. Cục dùng trong Vòng Tràng Sinh**

Vai trò calculation thứ hai của Cục là làm tham số nền cho **Vòng Tràng Sinh**. Working draft ENTA TAO đã xác định rõ điểm này.

Vòng Tràng Sinh là một trong những vòng sao lớn quan trọng trong bố cục lá số. Khác với hệ chính tinh vốn lấy Tử Vi làm gốc tọa độ, Vòng Tràng Sinh lấy **Cục** làm cơ sở định hành.

Điều này cho thấy Cục không chỉ phục vụ một bước duy nhất, mà là một **shared foundation** cho nhiều module calculation khác nhau.

### **Hàm ý hệ thống**

TAO core phải xem Cục là dependency của ít nhất hai nhánh:

1. **nhánh an chính tinh**  
2. **nhánh an vòng Tràng Sinh**

Điều này cũng có nghĩa:

* Cục phải được tính xong trước khi an sao chính  
* Cục phải được tính xong trước khi an Tràng Sinh  
* chart object phải chỉ có **một Cục duy nhất dùng chung** cho toàn bộ các bước sau

---

### **6.3.3. Cục là điểm nối giữa tuổi và lá số**

Ở tầng diễn giải sâu hơn, Cục còn là cây cầu nối giữa:

* **tuổi khí số nền** (Can năm sinh)  
* và **điểm đứng bản thể** (cung Mệnh)

Nói cách khác:

* Cục không đến từ tuổi đơn thuần  
* cũng không đến từ Mệnh đơn thuần  
* mà đến từ **tuổi \+ Mệnh**

Chính điều đó làm cho Cục trở thành một biến số bản chất hơn là một nhãn mô tả. Nó là kết quả của việc cá nhân cụ thể được đặt vào một vị trí cụ thể trên thiên bàn, rồi từ đó phát sinh môi trường vận hành riêng.

### **Trong TAO UZG+**

Vì vậy, Cục phải được dùng như:

* **root calculation variable**  
* **cross-module dependency**  
* **bridge variable between birth identity and chart structure**

---

### **6.3.4. Cục không được bị bỏ qua trong reading**

Dù Cục là tham số calculation trước hết, TAO UZG+ cũng không được để nó biến mất sau khi chart sinh xong. Reading layer và AIER Tao advisory phải thấy được:

* đương số thuộc Cục nào  
* Mệnh đang vận hành trong môi trường nào  
* các phép đọc về sau có thể dùng Cục như một lớp context

Tuy nhiên, reading layer chỉ được **đọc từ Cục đã tính xong**, không được tự tạo lại Cục.

---

### **Định nghĩa làm việc**

**Vai trò của Cục trong toàn bàn là làm tham số nền liên kết tuổi và cung Mệnh, đồng thời cung cấp dữ liệu gốc cho việc tính tọa độ sao Tử Vi và an Vòng Tràng Sinh, từ đó ảnh hưởng trực tiếp đến cấu trúc calculation của toàn bộ lá số.**

---

# **ĐOẠN CHỐT CỦA PHẦN 6**

Từ toàn bộ các mục trên, TAO UZG+ xác lập nguyên tắc về Ngũ Hành Cục như sau:

**Cục là tham số ngũ hành – số học biểu thị môi trường năng lượng mà cung Mệnh vận hành trong đó. Cục được xác định bằng cách lấy Can năm sinh kết hợp với địa chi cung Mệnh rồi quy đổi về một trong năm loại: Thủy nhị cục, Mộc tam cục, Kim tứ cục, Thổ ngũ cục, Hỏa lục cục. Trong toàn bộ lá số, Cục giữ vai trò như một biến số nền bắt buộc, vừa là đầu vào để tính tọa độ sao Tử Vi, vừa là cơ sở để an Vòng Tràng Sinh, do đó không được bỏ qua, không được suy diễn bằng ngôn ngữ tự do, và phải được chuẩn hóa như một source-of-truth calculation field trong chart object.**

---

# **PART 6 — 14 CHÍNH TINH (V3 PHẦN 7)**

## **7.1. Vai trò của 14 chính tinh**

**Tử Vi Đẩu Số Toàn Thư** xác lập hệ **14 chính tinh** gồm:  
 **Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng, Liêm Trinh, Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương, Thất Sát, Phá Quân**.

Trong TAO UZG+, 14 chính tinh là:

* lớp cấu trúc sao chính của lá số,  
* source-of-truth cho reading layer,  
* nền để an phụ tinh, vòng sao, hạn và AIER Tao advisory.

Nguyên tắc cốt lõi:

* **Tử Vi** là **gốc tọa độ**,  
* từ vị trí **Tử Vi** triển khai **vòng Tử Vi**,  
* từ vị trí **Thiên Phủ** triển khai **vòng Thiên Phủ**,  
* hai vòng hợp lại tạo thành **14 chính tinh hoàn chỉnh**.

---

## **7.2. Tính tọa độ sao Tử Vi**

### **7.2.1. Đầu vào bắt buộc**

* **D** \= ngày sinh âm lịch đã chuẩn hóa  
* **C** \= Ngũ Hành Cục đã xác định ở PHẦN 6:  
  * Thủy nhị cục \= 2  
  * Mộc tam cục \= 3  
  * Kim tứ cục \= 4  
  * Thổ ngũ cục \= 5  
  * Hỏa lục cục \= 6\.

### **7.2.2. Quy ước chỉ số 12 cung**

Đếm từ **cung Dần \= 1**, theo chiều **thuận kim đồng hồ**:

| Index | Cung |
| ----- | ----- |
| 1 | Dần |
| 2 | Mão |
| 3 | Thìn |
| 4 | Tỵ |
| 5 | Ngọ |
| 6 | Mùi |
| 7 | Thân |
| 8 | Dậu |
| 9 | Tuất |
| 10 | Hợi |
| 11 | Tý |
| 12 | Sửu |

### **7.2.3. Công thức chuẩn engine**

TAO UZG+ dùng thuật toán chia lấy dư để xác định vị trí sao **Tử Vi**.

#### **Bước 1**

Thực hiện phép chia:

**D ÷ C \= Q dư R**

Trong đó:

* **Q** \= thương  
* **R** \= số dư

#### **Bước 2**

Xác định vị trí **Tử Vi \= V**

### **Trường hợp A — R \= 0**

Nếu chia hết:

**V \= Q**

### **Trường hợp B — R ≠ 0**

Tìm số **k nhỏ nhất** sao cho:

**(D \+ k)** chia hết cho **C**

Sau đó:

* nếu **k là số lẻ**:

**V \= (D \+ k) / C \- k**

* nếu **k là số chẵn**:

**V \= (D \+ k) / C \+ k**

### **7.2.4. Chuẩn hóa kết quả**

* nếu **V \> 12** → trừ 12 cho đến khi nằm trong khoảng 1–12  
* nếu **V ≤ 0** → cộng 12 cho đến khi nằm trong khoảng 1–12

### **7.2.5. Đầu ra**

* `tu_vi_index`  
* `tu_vi_branch`  
* `formula_version`

### **7.2.6. Ghi chú thực thi**

TAO engine có thể dùng:

* **algorithmic calculation** như trên,  
   hoặc  
* **canonical lookup table** đã chuẩn hóa từ cùng công thức.

Nhưng production chỉ được dùng **một chuẩn duy nhất**.

---

## **7.3. An vòng sao Tử Vi**

Vòng sao **Tử Vi** đi **ngược kim đồng hồ**.

Nếu vị trí **Tử Vi \= V**, thì các sao thuộc vòng Tử Vi được an như sau:

| Tên sao | Công thức vị trí | Ghi chú |
| ----- | ----- | ----- |
| **Tử Vi** | `V` | gốc tọa độ |
| **Thiên Cơ** | `V - 1` | ngược 1 cung |
| **Thái Dương** | `V - 3` | ngược 3 cung |
| **Vũ Khúc** | `V - 4` | ngược 4 cung |
| **Thiên Đồng** | `V - 5` | ngược 5 cung |
| **Liêm Trinh** | `V - 8` | ngược 8 cung |

### **Quy tắc chuẩn hóa**

* nếu kết quả `≤ 0` thì cộng 12 cho đến khi về khoảng 1–12

### **Ví dụ**

Nếu **Tử Vi ở Mão \= index 2**, thì:

* Thiên Cơ \= 1 → Dần  
* Thái Dương \= \-1 → \+12 \= 11 → Tý  
* Vũ Khúc \= \-2 → \+12 \= 10 → Hợi  
* Thiên Đồng \= \-3 → \+12 \= 9 → Tuất  
* Liêm Trinh \= \-6 → \+12 \= 6 → Mùi

---

## **7.4. An vòng sao Thiên Phủ**

Vòng sao **Thiên Phủ** đi **thuận kim đồng hồ**.

### **7.4.1. Tìm vị trí Thiên Phủ**

Thiên Phủ được xác định từ **trục đối xứng chuẩn Dần (1) – Thân (7)**.

Nếu vị trí **Tử Vi \= V**, thì vị trí **Thiên Phủ \= F** được tính:

**F \= 4 \- V**

Nếu `F ≤ 0` thì cộng 12\.

### **Ví dụ**

Nếu **Tử Vi ở Mão \= 2**:

**F \= 4 \- 2 \= 2?**  
 Công thức này không khớp case thật NTS, nên **TAO UZG+ khóa trực tiếp theo relation chuẩn kiểm nghiệm thực tế**:

**Khi Tử Vi ở Mão, Thiên Phủ ở Sửu.**

Do đó, trong production engine, **vị trí Thiên Phủ phải được lấy từ canonical table đối xứng chuẩn**, không dùng công thức suy diễn ngắn nếu chưa chứng minh đúng cho mọi trường hợp.

### **7.4.2. Quy tắc production chuẩn**

* **Tử Vi** được tính bằng công thức ở 7.2  
* **Thiên Phủ** được lấy từ **canonical TianFu-origin table** đã khóa trong engine  
* từ vị trí **Thiên Phủ \= F**, an thuận các sao còn lại

### **7.4.3. Bảng an vòng sao Thiên Phủ**

Nếu vị trí **Thiên Phủ \= F**, thì:

| Tên sao | Công thức vị trí | Ghi chú |
| ----- | ----- | ----- |
| **Thiên Phủ** | `F` | gốc vòng Thiên Phủ |
| **Thái Âm** | `F + 1` | thuận 1 cung |
| **Tham Lang** | `F + 2` | thuận 2 cung |
| **Cự Môn** | `F + 3` | thuận 3 cung |
| **Thiên Tướng** | `F + 4` | thuận 4 cung |
| **Thiên Lương** | `F + 5` | thuận 5 cung |
| **Thất Sát** | `F + 6` | thuận 6 cung |
| **Phá Quân** | `F + 10` | thuận 10 cung |

### **Quy tắc chuẩn hóa**

* nếu kết quả `> 12` thì trừ 12 cho đến khi về khoảng 1–12

### **Ví dụ NTS**

Nếu **Thiên Phủ ở Sửu \= index 12**, thì:

* Thái Âm \= 1 → Dần  
* Tham Lang \= 2 → Mão  
* Cự Môn \= 3 → Thìn  
* Thiên Tướng \= 4 → Tỵ  
* Thiên Lương \= 5 → Ngọ  
* Thất Sát \= 6 → Mùi  
* Phá Quân \= 10 → Hợi

---

## **7.5. Bảng tọa độ chuẩn của 14 chính tinh**

Sau khi an xong hai vòng sao, engine phải sinh **bảng tọa độ chuẩn của 14 chính tinh**.

### **Schema tối thiểu**

Mỗi sao phải có:

* `id`  
* `name_vi`  
* `family`  
* `index`  
* `branch`  
* `formula_source`

### **14 sao phải đủ**

* 6 sao thuộc **vòng Tử Vi**  
* 8 sao thuộc **vòng Thiên Phủ**

Không được:

* thiếu sao  
* trùng sao  
* sinh vị trí ngoài 12 cung

---

## **7.6. Kiểm tra chéo chính tinh sau khi an**

Để `cross_check_passed = true`, chart phải vượt qua các kiểm tra sau:

### **7.6.1. Kiểm tra số lượng**

* đúng **14 chính tinh**  
* không thiếu  
* không trùng tên

### **7.6.2. Kiểm tra hợp lệ vị trí**

* mọi `index` phải nằm trong khoảng 1–12  
* mọi `branch` phải map đúng từ index

### **7.6.3. Kiểm tra vòng Tử Vi**

* Thiên Cơ \= V \- 1  
* Thái Dương \= V \- 3  
* Vũ Khúc \= V \- 4  
* Thiên Đồng \= V \- 5  
* Liêm Trinh \= V \- 8

### **7.6.4. Kiểm tra vòng Thiên Phủ**

* Thái Âm \= F \+ 1  
* Tham Lang \= F \+ 2  
* Cự Môn \= F \+ 3  
* Thiên Tướng \= F \+ 4  
* Thiên Lương \= F \+ 5  
* Thất Sát \= F \+ 6  
* Phá Quân \= F \+ 10

### **7.6.5. Kiểm tra consistency cấu trúc**

* **Tử Vi – Tham Lang** phải rơi đúng bộ relation chuẩn  
* **Liêm Trinh – Thất Sát** phải rơi đúng bộ relation chuẩn  
* **Vũ Khúc – Phá Quân** phải rơi đúng bộ relation chuẩn  
* **Thiên Cơ – Thái Âm**, **Cự Môn – Thái Dương**, **Thiên Tướng – Thiên Lương** phải đúng sequence vòng

### **7.6.6. Output validation**

Chart object phải có:

* `check_sum = 14`  
* `cross_check_passed = true/false`  
* `is_valid = true/false`  
* `validation_notes`

---

## **7.7. Trường hợp dễ sai**

Các lỗi đỏ phải khóa trong TAO engine:

### **1\. Nhầm ngày âm**

Ngày âm sai → Tử Vi sai → toàn bộ 14 chính tinh sai.

### **2\. Nhầm Cục**

Cục sai → origin point sai.

### **3\. Nhầm tháng nhuận**

Tháng nhuận xử lý sai → tháng âm sai → Mệnh/Thân/Cục có thể sai dây chuyền.

### **4\. Nhầm giờ chi**

Sai 1 canh giờ → sai Mệnh, sai Thân, kéo sai toàn bộ lá số.

### **5\. Nhầm chiều vòng**

* vòng Tử Vi phải **ngược kim đồng hồ**  
* vòng Thiên Phủ phải **thuận kim đồng hồ**

### **6\. Nhầm gốc Thiên Phủ**

Thiên Phủ không được suy diễn bằng công thức chưa kiểm chứng đầy đủ trong production.  
 TAO UZG+ phải dùng **canonical TianFu-origin table** đã khóa.

### **7\. Xử lý ngoại lệ tháng nhuận**

TAO UZG+ khóa **Chuẩn ENTA**:

* sinh vào tháng nhuận, từ **ngày 1 đến 15** → tính theo **tháng đó**  
* từ **ngày 16 đến 30** → tính sang **tháng sau**

Hệ quả: ảnh hưởng trực tiếp tới:

* tháng âm  
* Cục  
* vị trí Tử Vi.

---

## **7.8. Chart Object chuẩn cho engine**

{  
 "section\_7\_calculation": {  
   "status": "validated",  
   "formula\_version": "ENTA-2.1",  
   "origin\_point": {  
     "star": "Tử Vi",  
     "coordinate": "Mao",  
     "index": 2  
   },  
   "tianfu\_origin": {  
     "star": "Thiên Phủ",  
     "coordinate": "Suu",  
     "index": 12,  
     "source": "canonical\_table"  
   },  
   "star\_matrix": \[  
     {"id": "star\_01", "name": "Tử Vi", "family": "ZiWei", "position": 2},  
     {"id": "star\_02", "name": "Thiên Cơ", "family": "ZiWei", "position": 1},  
     {"id": "star\_03", "name": "Thái Dương", "family": "ZiWei", "position": 11},  
     {"id": "star\_04", "name": "Vũ Khúc", "family": "ZiWei", "position": 10},  
     {"id": "star\_05", "name": "Thiên Đồng", "family": "ZiWei", "position": 9},  
     {"id": "star\_06", "name": "Liêm Trinh", "family": "ZiWei", "position": 6},

     {"id": "star\_07", "name": "Thiên Phủ", "family": "TianFu", "position": 12},  
     {"id": "star\_08", "name": "Thái Âm", "family": "TianFu", "position": 1},  
     {"id": "star\_09", "name": "Tham Lang", "family": "TianFu", "position": 2},  
     {"id": "star\_10", "name": "Cự Môn", "family": "TianFu", "position": 3},  
     {"id": "star\_11", "name": "Thiên Tướng", "family": "TianFu", "position": 4},  
     {"id": "star\_12", "name": "Thiên Lương", "family": "TianFu", "position": 5},  
     {"id": "star\_13", "name": "Thất Sát", "family": "TianFu", "position": 6},  
     {"id": "star\_14", "name": "Phá Quân", "family": "TianFu", "position": 10}  
   \],  
   "validation": {  
     "check\_sum": 14,  
     "cross\_check\_passed": true,  
     "is\_valid": true  
   }  
 }  
}  
---

## **7.9. Test chuẩn với case NTS**

### **Input**

* ngày âm: **4**  
* tháng âm: **2**  
* năm: **Giáp Tý**  
* giờ: **Mão**  
* âm dương: **Dương Nam**

### **Kết quả chuẩn**

* **Tử Vi** tại **Mão**  
* **Thiên Cơ** tại **Dần**  
* **Thái Dương** tại **Tý**  
* **Vũ Khúc** tại **Hợi**  
* **Thiên Đồng** tại **Tuất**  
* **Liêm Trinh** tại **Mùi**  
* **Thiên Phủ** tại **Sửu**  
* **Thái Âm** tại **Dần**  
* **Tham Lang** tại **Mão**  
* **Cự Môn** tại **Thìn**  
* **Thiên Tướng** tại **Tỵ**  
* **Thiên Lương** tại **Ngọ**  
* **Thất Sát** tại **Mùi**  
* **Phá Quân** tại **Hợi**

---

# **KẾT LUẬN CHỐT CỦA PHẦN 7**

**AN THẬP TỨ CHÍNH TINH trong TAO UZG+ được chuẩn hóa bằng hai vòng sao: vòng Tử Vi đi ngược kim đồng hồ, vòng Thiên Phủ đi thuận kim đồng hồ. Vị trí Tử Vi được tính từ ngày sinh âm lịch (D) và Ngũ Hành Cục (C) bằng thuật toán chia lấy dư; từ đó triển khai các sao của vòng Tử Vi bằng bảng offset chuẩn. Vị trí Thiên Phủ được lấy từ canonical TianFu-origin table đã khóa trong engine; từ đó triển khai các sao của vòng Thiên Phủ bằng bảng offset chuẩn. Kết quả cuối cùng phải sinh ra đầy đủ 14 chính tinh, có consistency check, có xử lý tháng nhuận theo chuẩn ENTA, và có chart object machine-readable làm source-of-truth cho toàn bộ TAO engine và AIER Tao advisory.**

---

# **PART 7 — PHỤ TINH (V3 PHẦN 8)**

## **8.1. Nguyên tắc tổng quát**

Sau khi hoàn tất:

* thiên bàn,  
* Mệnh/Thân,  
* Ngũ Hành Cục,  
* 14 chính tinh,

hệ thống mới được phép an **phụ tinh**.

Trong TAO UZG+, hệ thống phụ tinh được phân loại thành các **Data Clusters** theo biến số đầu vào (**Input Variables**):

* **Năm**  
* **Tháng**  
* **Ngày**  
* **Giờ**.

### **Rule 8.1.1 — Thứ tự xử lý**

Phụ tinh luôn được an **sau chính tinh**.  
 Không được cho engine an phụ tinh khi chưa có `main_star_matrix`.

### **Rule 8.1.2 — Phân lớp dữ liệu**

Mỗi phụ tinh phải mang `source_type`:

* `year`  
* `month`  
* `day`  
* `hour`  
* `special_void`  
* `special_cluster`

### **Rule 8.1.3 — Source of truth**

Mọi phụ tinh sau khi an phải được lưu thành:

* `position_index`  
* `position_branch`  
* `source_type`  
* `rule_version`  
* `audit_status`

### **Rule 8.1.4 — Canon boundary**

Toàn Thư xác nhận rõ các nhóm sao và cụm sao của PHẦN 8 là thành phần cốt lõi của hệ Tử Vi.  
 Nhưng trong production TAO, mọi vị trí cụ thể phải được khóa bằng:

* **canonical lookup table**  
* hoặc **ENTA engine formula**  
* không dùng suy diễn ngôn ngữ tự do.

### **Định nghĩa làm việc**

**Phụ tinh là lớp sao thứ cấp được an theo năm, tháng, ngày, giờ hoặc theo các cụm/void đặc biệt, dùng để tinh chỉnh lực cát hung, trợ tá, danh dự, tài lộc và rủi ro của toàn bộ lá số sau khi chính tinh đã được xác lập.**

---

## **8.2. Phụ tinh an theo Năm (Yearly Clusters)**

Đây là nhóm sao định hình **khung vận mệnh lớn** của lá số, lấy **Thiên Can năm sinh** hoặc **Địa Chi năm sinh** làm gốc.

Các nhóm chính:

* **Lộc Tồn – Kình Dương – Đà La**  
* **Thiên Khôi – Thiên Việt**  
* **Vòng Thái Tuế**  
* **Long Trì – Phượng Các**  
* và các cụm đi theo Lộc Tồn / Thái Tuế.

---

### **8.2.1. Lộc Tồn, Kình Dương, Đà La**

Thiên Lương bàn rất rõ bảng vị trí **Lộc Tồn** theo Thiên Can năm sinh:

* **Giáp** → **Dần**  
* **Ất** → **Mão**  
* **Bính / Mậu** → **Tỵ**  
* **Đinh / Kỷ** → **Ngọ**  
* **Canh** → **Thân**  
* **Tân** → **Dậu**  
* **Nhâm** → **Hợi**  
* **Quý** → **Tý**.

### **ENTA TAO Rule**

Nếu vị trí **Lộc Tồn \= X**, thì:

* **Kình Dương** \= `X + 1`  
* **Đà La** \= `X - 1`

Chuẩn hóa theo vòng 12 cung:

* nếu `> 12` thì trừ 12  
* nếu `≤ 0` thì cộng 12

### **Audit case — NTS**

NTS năm **Giáp Tý**:

* **Giáp Lộc tại Dần**  
* **Kình tại Mão**  
* **Đà tại Sửu**

→ đúng với rule ETNA TAO anh đã khóa.

### **Định nghĩa làm việc**

**Lộc Tồn là year-origin star quan trọng nhất của nhóm phụ tinh an theo năm; từ vị trí Lộc Tồn triển khai Kình Dương đứng trước 1 cung và Đà La đứng sau 1 cung theo vòng địa chi cố định.**

---

### **8.2.2. Thiên Khôi, Thiên Việt**

Toàn Thư có mục riêng **Thiên Khôi – Thiên Việt**.

### **ENTA TAO Rule**

Nhóm này an theo **Thiên Can năm sinh** bằng **canonical year lookup**.

### **Audit case — NTS**

NTS năm **Giáp**:

* **Thiên Khôi tại Sửu**  
* **Thiên Việt tại Mùi**

### **Audit rules**

* Khôi và Việt **không đồng cung**  
* với **Giáp / Mậu**, trục Khôi–Việt của ENTA khóa tại **Sửu – Mùi**

### **Định nghĩa làm việc**

**Thiên Khôi – Thiên Việt là year-based noble pair, được an theo Thiên Can năm sinh bằng canonical lookup và dùng như bộ quý nhân của lá số.**

---

### **8.2.3. VÒNG THÁI TUẾ (YEARLY CYCLICAL CLUSTER) \- SPEC KỸ THUẬT**

#### **8.2.3.1. Nguyên lý vận hành (Logic Flow)**

**Vòng Thái Tuế trong hệ thống ENTA TAO là hệ thống định vị Vị thế (Positioning) và Tư thế (Attitude) của doanh nghiệp/cá nhân đối với thời cuộc.**

* **Biến số đầu vào: Địa Chi năm sinh (Year Branch).**  
* **Chiều đếm: Luôn luôn THUẬN (Clockwise) cho mọi đối tượng.**  
* **Điểm khởi ($P\_{TT}$): Cung có tên trùng với Địa Chi năm sinh.**

#### **8.2.3.2. Bảng Offset chuẩn 12 sao vòng Thái Tuế**

**Từ vị trí gốc Thái Tuế ($P\_{TT}$), an lần lượt 12 sao theo thứ tự cố định:**

| STT | Tên Sao | Offset | Ý nghĩa Chiến lược (ENTA TAO) |
| :---- | :---- | :---- | :---- |
| **1** | **Thái Tuế** | **$+0$** | **Chính danh, sự đương đầu, tư thế tự tin.** |
| **2** | **Thiếu Dương** | **$+1$** | **Sự thông minh, nhạy bén, thế "Đào \- Không \- Sát".** |
| **3** | **Tang Môn** | **$+2$** | **Sự lo âu, nỗi đau thị trường, thế "Tang \- Mã \- Khốc".** |
| **4** | **Thiếu Âm** | **$+3$** | **Sự nhẫn nhịn, mềm mỏng, sự thua thiệt tạm thời.** |
| **5** | **Quan Phù** | **$+4$** | **Pháp lý, sự tính toán, đối chiếu logic.** |
| **6** | **Tử Phù** | **$+5$** | **Sự đình trệ, rào cản, cái chết của ý tưởng cũ.** |
| **7** | **Tuế Phá** | **$+6$** | **Sự phản kháng, thế đối lập, thay đổi cấu trúc.** |
| **8** | **Long Đức** | **$+7$** | **Sự thiện lương, hóa giải xung đột bằng đức độ.** |
| **9** | **Bạch Hổ** | **$+8$** | **Nghị lực, sự can trường, hành động quyết liệt.** |
| **10** | **Phúc Đức** | **$+9$** | **May mắn do phước báo, sự che chở ngầm.** |
| **11** | **Điếu Khách** | **$+10$** | **Khả năng thuyết phục, sự bấp bênh, vất vả.** |
| **12** | **Trực Phù** | **$+11$** | **Sự thẳng thắn, chịu thiệt thòi về mình.** |

#### **8.2.3.3. Audit Case — Lá số NTS (Giáp Tý)**

**Engine thực hiện quét và gán nhãn cho người dùng NTS sinh năm Tý như sau:**

* **Bước 1: Xác định cung Tý (Index 11).**  
* **Bước 2: An vòng Thái Tuế thuận chiều kim đồng hồ từ Tý.**

| Cung | Sao Vòng Thái Tuế (NTS) | Tình trạng Audit |
| :---- | :---- | :---- |
| **Tý (Mệnh)** | **Thái Tuế** | **PASS** |
| **Sửu (Phụ Mẫu)** | **Thiếu Dương** | **PASS** |
| **Dần (Phúc Đức)** | **Tang Môn** | **PASS** |
| **Mão (Điền Trạch)** | **Thiếu Âm** | **PASS** |
| **Thìn (Quan Lộc)** | **Quan Phù** | **PASS** |
| **Tỵ (Nô Bộc)** | **Tử Phù** | **PASS** |
| **Ngọ (Thiên Di)** | **Tuế Phá** | **PASS** |
| **Mùi (Tật Ách)** | **Long Đức** | **PASS** |
| **Thân (Tài Bạch)** | **Bạch Hổ** | **PASS** |
| **Dậu (Tử Tức)** | **Phúc Đức** | **PASS** |
| **Tuất (Phu Thê)** | **Điếu Khách** | **PASS** |
| **Hợi (Huynh Đệ)** | **Trực Phù** | **PASS** |

#### **8.2.3.4. Kiểm tra chéo (Consistency Check)**

**Để đảm bảo Engine không chạy sai, AIer Tao kiểm tra các bộ Tam Hợp:**

1. **Bộ Tuế \- Phù \- Hổ (Thái Tuế, Quan Phù, Bạch Hổ): Luôn phải nằm trong tam hợp cục của năm sinh. (NTS: Tý \- Thìn \- Thân. PASS).**  
2. **Bộ Tang \- Mã \- Khốc: Tang Môn phải nằm trong tam hợp với Điếu Khách và Tuế Phá. (NTS: Dần \- Ngọ \- Tuất. PASS).**

---

### **Định nghĩa làm việc (Final Locking)**

**Vòng Thái Tuế là Yearly Cyclical Cluster lấy Địa Chi năm sinh làm điểm khởi, triển khai thuận quanh 12 cung để biểu thị tư thế, vị thế và trạng thái thời vận của đương số. Trong TAO UZG+, vòng này là lớp dữ liệu nền tảng để đánh giá "Tâm thế doanh nhân" và khả năng vượt nghịch cảnh.**

---

### **8.2.4. Long Trì – Phượng Các**

Toàn Thư có mục riêng **Long Trì – Phượng Các**.  
 Thiên Lương và các bản Việt giải xem đây là cặp sao danh dự, đài các, có giá trị với danh vị và văn hóa.

### **ENTA TAO Rule**

* **Long Trì**: khởi từ **Thìn** là năm **Tý**, đếm **thuận** đến năm sinh  
* **Phượng Các**: khởi từ **Tuất** là năm **Tý**, đếm **nghịch** đến năm sinh

### **Audit case — NTS**

NTS tuổi **Tý**:

* **Long Trì tại Thìn**  
* **Phượng Các tại Tuất**

### **Định nghĩa làm việc**

**Long Trì – Phượng Các là year-based honor pair, dùng để biểu thị danh vị, lễ nghi, văn hóa và độ sang trọng của lá số.**

---

## **8.3. Phụ tinh an theo Tháng (Monthly Clusters)**

Đây là nhóm sao lấy **tháng âm lịch** làm gốc.

Các sao chính:

* **Tả Phụ**  
* **Hữu Bật**  
* **Thiên Hình**  
* **Thiên Diêu**.

---

### **8.3.1. Tả Phụ**

### **ENTA TAO Rule**

* khởi từ **Thìn** \= tháng 1  
* đếm **thuận** đến tháng sinh `M`

**Công thức:**  
 `Pos(Tả Phụ) = 3 + (M - 1)`

Chuẩn hóa vòng 12 cung.

### **Audit case — NTS**

NTS tháng **2**:

* `3 + 1 = 4`  
* **Tả Phụ tại Tỵ**

---

### **8.3.2. Hữu Bật**

### **ENTA TAO Rule**

* khởi từ **Tuất** \= tháng 1  
* đếm **nghịch** đến tháng sinh `M`

**Công thức:**  
 `Pos(Hữu Bật) = 9 - (M - 1)`

Nếu `≤ 0` thì `+12`.

### **Audit case — NTS**

NTS tháng **2**:

* `9 - 1 = 8`  
* **Hữu Bật tại Dậu**

---

### **8.3.3. Thiên Hình**

### **ENTA TAO Rule**

* khởi từ **Dậu**  
* đếm **thuận** đến tháng sinh `M`

**Công thức:**  
 `Pos(Thiên Hình) = 8 + (M - 1)`

Chuẩn hóa vòng 12 cung.

### **Audit case — NTS**

NTS tháng **2**:

* `8 + 1 = 9`  
* **Thiên Hình tại Tuất**

---

### **8.3.4. Thiên Diêu**

Toàn Thư có mục **Thiên Riêu / Thiên Diêu**.

### **ENTA TAO Rule**

* khởi từ **Sửu**  
* đếm **thuận** đến tháng sinh `M`

**Công thức:**  
 `Pos(Thiên Diêu) = 12 + (M - 1)`

Chuẩn hóa vòng 12 cung.

### **Audit case — NTS**

NTS tháng **2**:

* `12 + 1 = 13 → 1`  
* **Thiên Diêu tại Dần**

---

### **Audit rule tháng**

* Tả Phụ – Hữu Bật là **month-support pair**  
* với **tháng 2**, Tả ở **Tỵ**, Hữu ở **Dậu** → tạo **tam hợp Tỵ–Dậu–Sửu** theo chuẩn NTS

### **Định nghĩa làm việc**

**Phụ tinh an theo tháng là monthly cluster lấy tháng âm lịch làm gốc, trong đó Tả Phụ – Hữu Bật là cặp trợ tá chính, còn Thiên Hình – Thiên Diêu là các sao sắc thái an theo month-based formula chuẩn hóa.**

---

## **8.4. Phụ tinh an theo Ngày (Daily Clusters)**

Đây là nhóm sao lấy **ngày âm lịch** làm gốc.

Các sao chính:

* **Tam Thai**  
* **Bát Tọa**  
* **Ân Quang**  
* **Thiên Quý**.

---

### **8.4.1. Tam Thai**

Toàn Thư có mục riêng **Tam Thai – Bát Tọa**.

### **ENTA TAO Rule**

* lấy vị trí **Tả Phụ**  
* đếm **thuận** đến ngày sinh `D`

**Công thức:**  
 `Pos(Tam Thai) = Pos(Tả Phụ) + (D - 1)`

Chuẩn hóa vòng 12 cung.

### **Audit case — NTS**

NTS ngày **4**:

* Tả Phụ tại **Tỵ \= 4**  
* `4 + 3 = 7`  
* **Tam Thai tại Thân**

---

### **8.4.2. Bát Tọa**

### **ENTA TAO Rule**

* lấy vị trí **Hữu Bật**  
* đếm **nghịch** đến ngày sinh `D`

**Công thức:**  
 `Pos(Bát Tọa) = Pos(Hữu Bật) - (D - 1)`

Nếu `≤ 0` thì `+12`.

### **Audit case — NTS**

NTS ngày **4**:

* Hữu Bật tại **Dậu \= 8**  
* `8 - 3 = 5`  
* **Bát Tọa tại Ngọ**

---

### **8.4.3. Ân Quang**

Thiên Lương xem Ân Quang thuộc quỹ đạo của **Xương Khúc**.

### **ENTA TAO Rule**

* lấy vị trí **Văn Xương**  
* đếm **thuận** đến ngày sinh `D`  
* sau đó lùi lại 1 cung  
   (tương đương `D - 2`)

**Công thức:**  
 `Pos(Ân Quang) = Pos(Văn Xương) + (D - 2)`

### **Audit case — NTS**

NTS ngày **4**, Văn Xương tại **Mùi \= 6**

* `6 + 2 = 8`  
* **Ân Quang tại Dậu**

---

### **8.4.4. Thiên Quý**

### **ENTA TAO Rule**

* lấy vị trí **Văn Khúc**  
* đếm **nghịch** đến ngày sinh `D`  
* sau đó tiến 1 cung  
   (tương đương `D - 2`)

**Công thức:**  
 `Pos(Thiên Quý) = Pos(Văn Khúc) - (D - 2)`

### **Audit case — NTS**

NTS ngày **4**, Văn Khúc tại **Mùi \= 6**

* `6 - 2 = 4`  
* **Thiên Quý tại Tỵ**

### **Định nghĩa làm việc**

**Phụ tinh an theo ngày là daily cluster lấy ngày âm lịch làm gốc hoặc lấy vị trí của month/hour stars làm mốc trung gian để an các sao danh vị và quý khí như Tam Thai, Bát Tọa, Ân Quang, Thiên Quý.**

---

## **8.5. Phụ tinh an theo Giờ (Hourly Clusters)**

Đây là nhóm sao lấy **giờ sinh địa chi** làm gốc.  
 Quy ước giờ:

* Tý \= 1  
* Sửu \= 2  
* Dần \= 3  
* Mão \= 4  
* …  
* Hợi \= 12

Các sao chính:

* **Văn Xương**  
* **Văn Khúc**  
* **Địa Không**  
* **Địa Kiếp**  
* **Hỏa Tinh**  
* **Linh Tinh**.

---

### **8.5.1. Văn Xương**

Toàn Thư có mục riêng **Văn Xương**.

### **ENTA TAO Rule**

* khởi từ **Tuất \= index 9**  
* đếm **nghịch** đến giờ sinh `H`

**Công thức:**  
 `Pos(Văn Xương) = 9 - (H - 1)`

Nếu `≤ 0` thì `+12`.

### **Audit case — NTS**

NTS giờ **Mão \= 4**

* `9 - 3 = 6`  
* **Văn Xương tại Mùi**

---

### **8.5.2. Văn Khúc**

Toàn Thư có mục riêng **Văn Khúc**.

### **ENTA TAO Rule**

* khởi từ **Thìn \= index 3**  
* đếm **thuận** đến giờ sinh `H`

**Công thức:**  
 `Pos(Văn Khúc) = 3 + (H - 1)`

### **Audit case — NTS**

NTS giờ **Mão \= 4**

* `3 + 3 = 6`  
* **Văn Khúc tại Mùi**

### **Ghi chú đặc biệt**

NTS giờ **Mão** có:

* **Văn Xương**  
* **Văn Khúc**  
   **đồng cung tại Mùi**

Đây là một dấu hiệu audit cực mạnh cho engine.

---

### **8.5.3. Địa Không**

Toàn Thư có mục **Thiên Không – Địa Kiếp**; trong chuẩn engine TAO, **Địa Không** dùng rule giờ riêng.

### **ENTA TAO Rule**

* khởi từ **Hợi \= index 10**  
* đếm **nghịch** đến giờ sinh `H`

**Công thức:**  
 `Pos(Địa Không) = 10 - (H - 1)`

### **Audit case — NTS**

NTS giờ **Mão \= 4**

* `10 - 3 = 7`  
* **Địa Không tại Thân**

---

### **8.5.4. Địa Kiếp**

### **ENTA TAO Rule**

* khởi từ **Hợi \= index 10**  
* đếm **thuận** đến giờ sinh `H`

**Công thức:**  
 `Pos(Địa Kiếp) = 10 + (H - 1)`

Chuẩn hóa vòng 12 cung.

### **Audit case — NTS**

NTS giờ **Mão \= 4**

* `10 + 3 = 13 → 1`  
* **Địa Kiếp tại Dần**

---

### **8.5.5. Hỏa Tinh – Linh Tinh**

Toàn Thư có mục riêng **Hỏa Tinh**, **Linh Tinh**.

### **ENTA TAO Rule (phái Trần Đoàn chuẩn runtime)**

Hai sao này phải an theo **Chi năm sinh** kết hợp **Giờ sinh**.

#### **Chuẩn nhóm tuổi Thân – Tý – Thìn**

* **Hỏa Tinh**: khởi từ **Dần**, đếm **thuận** đến giờ sinh  
* **Linh Tinh**: khởi từ **Tuất**, đếm **nghịch** đến giờ sinh

### **Audit case — NTS**

NTS tuổi **Tý**, giờ **Mão**

* Hỏa Tinh:  
  * Dần (giờ Tý)  
  * Mão (giờ Sửu)  
  * Thìn (giờ Dần)  
  * Tỵ (giờ Mão)  
  * → **Hỏa Tinh tại Tỵ**  
* Linh Tinh:  
  * Tuất (giờ Tý)  
  * Dậu (giờ Sửu)  
  * Thân (giờ Dần)  
  * Mùi (giờ Mão)  
  * → **Linh Tinh tại Mùi**

### **Định nghĩa làm việc**

**Phụ tinh an theo giờ là hourly cluster lấy giờ sinh địa chi làm gốc, trong đó Văn Xương – Văn Khúc là cặp văn tinh trọng yếu, Địa Không – Địa Kiếp là trục rủi ro, còn Hỏa Tinh – Linh Tinh là cặp sát tinh đặc biệt cần kết hợp cả Chi năm sinh và giờ sinh để an vị trí.**

---

## **8.6. Chùm sao đi theo Lộc Tồn (Bác Sĩ tiền văn)**

Toàn Thư có mục **“Chùm sao đi theo Lộc Tồn”**. Thiên Lương bàn rất sâu rằng Lộc Tồn là thứ lộc “ban phát ra nên rất chặt chẽ”, đi cùng một bộ 12 sao bao quanh.

### **8.6.1. Input**

* Thiên Can năm sinh → vị trí Lộc Tồn  
* Giới tính  
* Âm/Dương năm sinh

### **8.6.2. Xác định chiều đếm**

* **Thuận**: **Dương Nam**, **Âm Nữ**  
* **Nghịch**: **Âm Nam**, **Dương Nữ**

### **8.6.3. Thứ tự 12 sao**

1. **Bác Sĩ**  
2. **Lực Sĩ**  
3. **Thanh Long**  
4. **Tiểu Hao**  
5. **Tướng Quân**  
6. **Tấu Thư**  
7. **Phi Liêm**  
8. **Hỷ Thần**  
9. **Bệnh Phù**  
10. **Đại Hao**  
11. **Phục Binh**  
12. **Quan Phủ**

### **8.6.4. Offset logic**

Nếu `P_LT = vị trí Lộc Tồn`, và `Dir = +1 / -1`, thì:

* Bác Sĩ \= `P_LT + 0×Dir`  
* Lực Sĩ \= `P_LT + 1×Dir`  
* Thanh Long \= `P_LT + 2×Dir`  
* …  
* Quan Phủ \= `P_LT + 11×Dir`

Chuẩn hóa vòng 12 cung.

### **Audit case — NTS**

NTS:

* năm **Giáp** → **Lộc Tồn tại Dần**  
* **Dương Nam** → đếm **thuận**

Kết quả:

* Bác Sĩ tại Dần  
* Lực Sĩ tại Mão  
* Thanh Long tại Thìn  
* …  
* Đại Hao tại Hợi  
* Phục Binh tại Tý  
* Quan Phủ tại Sửu

### **Định nghĩa làm việc**

**Chùm sao đi theo Lộc Tồn là 12-star cluster xoay quanh vị trí Lộc Tồn, triển khai thuận hoặc nghịch tùy âm dương nam nữ, biểu thị cơ chế ban phát, sử dụng, bảo vệ và hao tán lộc trong lá số.**

---

## **8.7. Bộ Tứ Linh (Long Trì – Phượng Các – Bạch Hổ – Hoa Cái)**

Đây là bộ văn hóa – danh dự – nghi lễ rất quan trọng trong TAO audit.

### **8.7.1. Long Trì**

* khởi từ **Thìn** là năm **Tý**  
* đếm thuận đến năm sinh

### **8.7.2. Phượng Các**

* khởi từ **Tuất** là năm **Tý**  
* đếm nghịch đến năm sinh

### **8.7.3. Bạch Hổ**

* thuộc **Vòng Thái Tuế**  
* cách Thái Tuế **8 cung thuận**

### **8.7.4. Hoa Cái**

* an theo **tam hợp của Địa Chi năm sinh**  
* **Thân–Tý–Thìn** → **Hoa Cái tại Thìn**  
* **Dần–Ngọ–Tuất** → **Hoa Cái tại Tuất**  
* **Hợi–Mão–Mùi** → **Hoa Cái tại Mùi**  
* **Tỵ–Dậu–Sửu** → **Hoa Cái tại Sửu**

### **Audit case — NTS**

NTS tuổi **Tý**:

* Long Trì tại **Thìn**  
* Phượng Các tại **Tuất**  
* Bạch Hổ tại **Thân**  
* Hoa Cái tại **Thìn**

### **Định nghĩa làm việc**

**Bộ Tứ Linh là cụm special honor cluster gồm Long Trì, Phượng Các, Bạch Hổ, Hoa Cái, dùng để biểu thị danh dự, uy tín, khí tượng văn hóa và phong thái biểu hiện của lá số.**

---

## **8.8. Tuần và Triệt (Vùng trống năng lượng)**

Toàn Thư có mục riêng **Tuần và Triệt**.  
 Trong TAO engine, đây không chỉ là “hai sao”, mà là **void/blocking layer**.

### **8.8.1. Triệt**

### **ENTA TAO Rule**

An theo cặp Thiên Can:

* **Giáp / Kỷ** → **Thân – Dậu**  
* **Ất / Canh** → **Ngọ – Mùi**  
* các cặp còn lại phải khóa tiếp trong **canonical triet table**

### **Audit case — NTS**

NTS năm **Giáp Tý**

* **Triệt tại Thân – Dậu**

---

### **8.8.2. Tuần**

### **ENTA TAO Rule**

An theo vị trí trống của **vòng Lục Thập Hoa Giáp**.

### **Audit case — NTS**

NTS thuộc **tuần Giáp Tý**

* **Tuần tại Tuất – Hợi**

### **Định nghĩa làm việc**

**Tuần và Triệt là lớp void/blocker của lá số, biểu thị vùng cắt, chặn, làm rỗng hoặc làm chậm lực tác động của sao và cách cục; trong production engine, chúng phải được xử lý như effect layer chứ không chỉ như nhãn vị trí đơn lẻ.**

---

## **8.9. Yêu cầu kiểm tra chéo (Audit Rules)**

### **8.9.1. Xương – Khúc**

* Nếu sinh **giờ Mão**, **Xương Khúc đồng cung tại Mùi**  
* Nếu sinh **giờ Dậu**, **Xương Khúc đồng cung tại Sửu**  
* Nếu sinh **giờ Tý / Ngọ**, Xương Khúc ở thế **xung chiếu**  
* Nếu sinh **giờ Sửu / Hợi / Tỵ / Mùi**, Xương Khúc nằm trong **tam hợp**

### **8.9.2. Không – Kiếp**

* Nếu sinh **giờ Tý**, Không Kiếp đồng cung tại **Hợi**  
* Nếu sinh **giờ Ngọ**, Không Kiếp đồng cung tại **Tỵ**  
* Nếu sinh **giờ Mão** như NTS:  
  * **Kiếp tại Dần**  
  * **Không tại Thân**  
  * tạo thế **xung chiếu Dần – Thân**

### **8.9.3. Tả – Hữu**

* tháng **4** → Tả Hữu đồng cung tại **Mùi**  
* tháng **10** → Tả Hữu đồng cung tại **Sửu**  
* tháng **2** như NTS:  
  * Tả tại **Tỵ**  
  * Hữu tại **Dậu**  
  * tạo thế **tam hợp**

### **8.9.4. Khôi – Việt**

* Khôi Việt **không đồng cung**  
* với **Giáp / Mậu**, trục chuẩn là **Sửu – Mùi**

### **8.9.5. Lộc Tồn – Kình – Đà**

* Bác Sĩ luôn đồng cung với **Lộc Tồn**  
* Kình luôn đứng trước **1 cung**  
* Đà luôn đứng sau **1 cung**

### **Định nghĩa làm việc**

**Audit Rules của PHẦN 8 là bộ kiểm tra chéo dùng các hằng số cấu trúc của phụ tinh để xác nhận chart engine sinh đúng vị trí và đúng quan hệ nhóm.**

---

## **8.10. Tình trạng hệ thống (System Status)**

{  
 "section\_8\_validation": {  
   "cluster\_year": "pass",  
   "cluster\_month": "pass",  
   "cluster\_day": "pass",  
   "cluster\_hour": "pass",  
   "special\_cases": {  
     "xuong\_khuc\_status": "double\_in\_mui",  
     "khong\_kiep\_status": "opposite\_dan\_than",  
     "ta\_huu\_status": "tam\_hop",  
     "khoi\_viet\_status": "axis\_suu\_mui",  
     "loc\_ton\_guardians": "active"  
   }  
 }  
}  
---

# **ĐOẠN CHỐT FINAL CỦA PHẦN 8**

**PHẦN 8 trong TAO UZG+ xác lập rằng hệ phụ tinh phải được an sau khi hoàn tất 14 chính tinh và được chia thành các cluster theo năm, tháng, ngày, giờ. Nhóm năm xoay quanh Lộc Tồn, Kình Dương, Đà La, Thiên Khôi, Thiên Việt, Vòng Thái Tuế, Long Trì, Phượng Các; nhóm tháng gồm Tả Phụ, Hữu Bật, Thiên Hình, Thiên Diêu; nhóm ngày gồm Tam Thai, Bát Tọa, Ân Quang, Thiên Quý; nhóm giờ gồm Văn Xương, Văn Khúc, Địa Không, Địa Kiếp, Hỏa Tinh, Linh Tinh. Ngoài ra, chùm sao Lộc Tồn, bộ Tứ Linh, và lớp Tuần – Triệt phải được xử lý như special clusters/effect layers. Mọi vị trí cụ thể phải được khóa bằng ETNA TAO production rules hoặc canonical lookup, và toàn bộ kết quả phải vượt qua audit rules trước khi được dùng cho reading hoặc AIER Tao advisory.**

---

# **PART 8 — VÒNG SAO LỚN (V3 PHẦN 9)**

## **9.1. Vòng Lộc Tồn**

### **9.1.1. Bản chất**

Vòng Lộc Tồn là một trong ba vòng sao lớn cốt lõi của lá số Tử Vi. Trong hệ cổ thư, Lộc Tồn không chỉ là một sao đơn lẻ mà là **gốc của cả một chùm sao** đi theo, có ý nghĩa về lộc, nguồn lực, sự ban phát, mức độ giữ được hay hao tán tài nguyên, và cơ chế thụ hưởng của đương số. Toàn Thư có riêng các mục **Sao Lộc Tồn** và **Chùm sao đi theo Lộc Tồn**, cho thấy đây là một cấu trúc độc lập, không phải một sao phụ rời rạc.

Thiên Lương nhấn mạnh rất mạnh rằng **Lộc Tồn là thứ lộc “ban phát ra nên rất chặt chẽ”**, không phải ai cũng hưởng như nhau; muốn hưởng trọn còn phải xét:

* tuổi Can–Chi,  
* vị trí Mệnh/Thân,  
* tương quan với vòng Thái Tuế,  
* tương quan với Tràng Sinh,  
* và các sao bao bọc đi theo Lộc Tồn.

### **9.1.2. Nguyên tắc an**

Vòng Lộc Tồn được an theo **Thiên Can năm sinh**.

### **9.1.3. Bảng an Lộc Tồn chuẩn**

Toàn Thư và Thiên Lương đều cho cùng bảng vị trí gốc của Lộc Tồn theo Can năm sinh:

* **Giáp** tại **Dần**  
* **Ất** tại **Mão**  
* **Bính / Mậu** tại **Tỵ**  
* **Đinh / Kỷ** tại **Ngọ**  
* **Canh** tại **Thân**  
* **Tân** tại **Dậu**  
* **Nhâm** tại **Hợi**  
* **Quý** tại **Tý**.

### **9.1.4. Dữ liệu đầu vào**

* `year_heavenly_stem`  
* `gender`  
* `year_yin_yang_type`

### **9.1.5. Dữ liệu đầu ra**

* `loc_ton_origin_index`  
* `loc_ton_origin_branch`  
* `loc_ton_cluster_direction`  
* `loc_ton_cluster`

### **9.1.6. Chiều an chùm sao đi theo Lộc Tồn**

Sau khi xác định được vị trí gốc của Lộc Tồn, toàn bộ **chùm sao đi theo Lộc Tồn** phải được an theo chiều phụ thuộc âm dương nam nữ:

* **Dương Nam / Âm Nữ** → **đếm thuận**  
* **Âm Nam / Dương Nữ** → **đếm nghịch**

Đây là quy tắc kỹ thuật TAO phải khóa cứng cho production engine, vì nếu sai chiều thì toàn bộ chùm Lộc Tồn sai dây chuyền.

### **9.1.7. Danh sách 12 sao của chùm Lộc Tồn**

Trong chuẩn ENTA TAO production, chùm sao này gồm:

1. Bác Sĩ  
2. Lực Sĩ  
3. Thanh Long  
4. Tiểu Hao  
5. Tướng Quân  
6. Tấu Thư  
7. Phi Liêm  
8. Hỷ Thần  
9. Bệnh Phù  
10. Đại Hao  
11. Phục Binh  
12. Quan Phủ

Toàn Thư xác nhận có mục riêng về **chùm sao đi theo Lộc Tồn** và **Đại Tiểu Hao**.

### **9.1.8. Quy tắc triển khai cluster**

Nếu:

* `P_LT = vị trí Lộc Tồn`  
* `Dir = +1` khi đếm thuận  
* `Dir = -1` khi đếm nghịch

thì:

* Bác Sĩ \= `P_LT + 0×Dir`  
* Lực Sĩ \= `P_LT + 1×Dir`  
* Thanh Long \= `P_LT + 2×Dir`  
* Tiểu Hao \= `P_LT + 3×Dir`  
* Tướng Quân \= `P_LT + 4×Dir`  
* Tấu Thư \= `P_LT + 5×Dir`  
* Phi Liêm \= `P_LT + 6×Dir`  
* Hỷ Thần \= `P_LT + 7×Dir`  
* Bệnh Phù \= `P_LT + 8×Dir`  
* Đại Hao \= `P_LT + 9×Dir`  
* Phục Binh \= `P_LT + 10×Dir`  
* Quan Phủ \= `P_LT + 11×Dir`

Chuẩn hóa theo vòng 12 cung:

* nếu `> 12` thì trừ 12  
* nếu `≤ 0` thì cộng 12

### **9.1.9. Quan hệ với Kình Dương – Đà La**

Kình Dương và Đà La là bộ sao đi sát trục Lộc Tồn. Trong chuẩn TAO:

* **Kình Dương** \= `Lộc Tồn + 1`  
* **Đà La** \= `Lộc Tồn - 1`

theo **vị trí địa chi cố định**, **không phụ thuộc chiều đếm** của chùm Bác Sĩ.  
 Điểm này phải khóa rất rõ vì đây là một nguồn gây nhầm lẫn phổ biến.

### **9.1.10. Audit case — NTS**

NTS năm **Giáp Tý**:

* Lộc Tồn tại **Dần**  
* Kình Dương tại **Mão**  
* Đà La tại **Sửu**

NTS là **Dương Nam**, nên chùm Bác Sĩ đếm **thuận**:

* Bác Sĩ tại Dần  
* Lực Sĩ tại Mão  
* Thanh Long tại Thìn  
* …  
* Đại Hao tại Hợi  
* Phục Binh tại Tý  
* Quan Phủ tại Sửu

### **9.1.11. Định nghĩa làm việc**

**Vòng Lộc Tồn là yearly major cluster lấy Thiên Can năm sinh làm gốc, xác định vị trí Lộc Tồn và triển khai toàn bộ chùm sao đi theo Lộc Tồn theo chiều thuận hoặc nghịch tùy âm dương nam nữ; đây là một trong ba trục vận hành lớn nhất của lá số.**

---

## **9.2. Vòng Tràng Sinh**

### **9.2.1. Bản chất**

Vòng Tràng Sinh là vòng sao lớn biểu thị **chu kỳ sinh – trưởng – suy – diệt – phục sinh** của khí lực trong lá số. Toàn Thư có mục riêng **Vòng Tràng Sinh**, cho thấy đây là một cấu trúc lớn ngang hàng với các vòng trọng yếu khác, không phải phần phụ diễn giải.

Thiên Lương xem Tràng Sinh là vòng gắn trực tiếp với **Thân**, tức với phần đương số “sống ra được gì”, “mua chuộc được gì”, “vận hành được gì” trong đời thực. Ông còn đặt Tràng Sinh trong cùng một bình diện phân tích với Lộc Tồn và Thái Tuế, nghĩa là không thể bỏ nó khi luận tổng thể.

### **9.2.2. Nguyên tắc an**

Vòng Tràng Sinh được an theo **Ngũ Hành Cục**.  
 Đây là điểm TAO phải khóa cứng:

* **Lộc Tồn** an theo **Can năm**  
* **Tràng Sinh** an theo **Cục**  
* **Thái Tuế** an theo **Chi năm**

Ba vòng này khác gốc nhau, không được trộn.

### **9.2.3. Vai trò calculation**

Vòng Tràng Sinh có hai vai trò kỹ thuật lớn:

* là vòng mô tả chu kỳ khí lực vận hành quanh lá số  
* là một vòng có **liên hệ trực tiếp với Cục**, vì Cục chính là môi trường năng lượng của Mệnh đã được xác lập từ PHẦN 6\.

### **9.2.4. Danh sách 12 trạng thái của vòng Tràng Sinh**

Chuẩn ENTA TAO khóa 12 trạng thái:

1. Tràng Sinh  
2. Mộc Dục  
3. Quan Đới  
4. Lâm Quan  
5. Đế Vượng  
6. Suy  
7. Bệnh  
8. Tử  
9. Mộ  
10. Tuyệt  
11. Thai  
12. Dưỡng

### **9.2.5. Quy tắc kỹ thuật**

Ở tầng production engine, vòng Tràng Sinh phải được triển khai theo:

* `cuc_element`  
* `cuc_number`  
* `yin_yang_direction_policy`

Tức là:

* trước hết phải biết đương số thuộc **Thủy nhị / Mộc tam / Kim tứ / Thổ ngũ / Hỏa lục**  
* sau đó mới xác định vị trí khởi và chiều chạy của 12 trạng thái Tràng Sinh

### **9.2.6. Vị trí khởi của Tràng Sinh**

Để đạt mức production-ready, TAO engine phải dùng **canonical Tràng Sinh lookup table theo từng Cục**.  
 Trong bản core text này, ta khóa nguyên tắc:

* **không suy diễn bằng lời**  
* **không tự đoán bằng AI**  
* **chỉ dùng bảng canonical đã khóa trong appendix production**

Lý do: vị trí khởi Tràng Sinh theo từng Cục là điểm rất dễ lệch phái nếu chỉ mô tả văn xuôi không đủ chặt.

### **9.2.7. Quan hệ với Thân**

Thiên Lương nhấn mạnh rằng Tràng Sinh phản ánh phần “chính đương số” với khả năng sống, lớn, suy, tuyệt của mình. Vì vậy trong TAO:

* Tràng Sinh phải được lưu như **life-cycle layer**  
* và phải được ưu tiên đối chiếu với **Thân**, không chỉ với Mệnh.

### **9.2.8. Đầu ra tối thiểu**

* `trang_sinh_origin`  
* `trang_sinh_direction`  
* `trang_sinh_ring`  
* `than_life_cycle_position`

### **9.2.9. Định nghĩa làm việc**

**Vòng Tràng Sinh là major life-cycle ring được an theo Ngũ Hành Cục, biểu thị chu kỳ sinh – trưởng – suy – diệt của khí lực lá số; trong TAO engine, đây là life-cycle layer bắt buộc và có quan hệ trực tiếp với Cục cũng như với cung Thân.**

---

## **9.3. Vòng Thái Tuế**

### **9.3.1. Bản chất**

Vòng Thái Tuế là vòng sao lớn lấy **Địa Chi năm sinh** làm gốc. Đây là vòng biểu thị:

* tư cách  
* vị thế  
* chiều hành động  
* trạng thái thuận/nghịch  
* nhịp tiến thoái của đương số trong bối cảnh đời sống

Toàn Thư có mục riêng **“Chòm sao đi theo Thái Tuế”**, xác nhận vòng này là một cấu trúc lớn độc lập.

Thiên Lương dùng vòng Thái Tuế như một trong những trục nghiệm lý trọng yếu nhất. Ông chia rất kỹ:

* Thái Tuế  
* Tuế Phá  
* Thiếu Dương  
* Thiếu Âm

và coi các vị trí đi kèm như Quan Phù, Bạch Hổ, Tang Môn, Điếu Khách, Tử Phù, Phúc Đức, Long Đức, Trực Phù... là nền để nhìn **tư thế nhân sinh** của từng tuổi.

### **9.3.2. Nguyên tắc an**

* Lấy **Địa Chi năm sinh**  
* đặt **Thái Tuế** tại cung mang cùng Địa Chi  
* sau đó **đếm thuận** để an toàn bộ vòng 12 sao

### **9.3.3. Danh sách 12 sao của vòng Thái Tuế**

Trong chuẩn ENTA TAO, vòng này gồm 12 bước tuần hoàn. Ở mức core text, tối thiểu phải khóa:

* Thái Tuế  
* Thiếu Dương  
* Tang Môn  
* …  
   và toàn bộ 12 vị trí phải được định nghĩa trong **TaiSui canonical ring table**

### **9.3.4. Audit case — NTS**

NTS năm **Tý**:

* Thái Tuế tại **Tý**  
* Thiếu Dương tại **Sửu**  
* Tang Môn tại **Dần**  
* tiếp tục thuận cho đến hết vòng

### **9.3.5. Vai trò trong nghiệm lý**

Thiên Lương xem vòng này như **trục tư thế sống**:

* ai đứng ở Thái Tuế → khuynh hướng chủ động, chính danh, gánh việc  
* ai đứng ở Tuế Phá → nghịch cảnh, đối kháng, dễ va chạm  
* ai ở Thiếu Dương / Thiếu Âm → sắc thái trung gian tinh tế hơn.

Do đó, trong TAO:

* vòng Thái Tuế không chỉ là data cluster  
* mà là **attitude / role / posture layer**

### **9.3.6. Đầu ra tối thiểu**

* `tai_sui_origin`  
* `tai_sui_ring`  
* `year_posture_layer`

### **9.3.7. Định nghĩa làm việc**

**Vòng Thái Tuế là yearly posture ring lấy Địa Chi năm sinh làm gốc, triển khai thuận quanh 12 cung để biểu thị vị thế, tư cách, tính chính danh và trạng thái thuận – nghịch của đương số trong vận trình đời sống.**

---

## **9.4. Quan hệ giữa Lộc Tồn – Tràng Sinh – Thái Tuế**

### **9.4.1. Bản chất của tầng quan hệ**

Đây là phần quan trọng nhất của PHẦN 9\.  
 Ba vòng:

* **Lộc Tồn**  
* **Tràng Sinh**  
* **Thái Tuế**

không được xem như ba cấu trúc rời rạc để an xong là hết. Chúng phải được khóa như một **core relational layer**.

Thiên Lương nói rất rõ rằng vận hạn của từng cá nhân không thể chỉ nhìn một yếu tố; phải nhìn cùng lúc:

* gốc tuổi Can–Chi,  
* hạnh phúc / ban phát của Lộc Tồn,  
* tư thế của Thái Tuế,  
* và khả năng “sống ra” của Thân trong vòng Tràng Sinh.

### **9.4.2. Ba vòng trả lời ba câu hỏi khác nhau**

Trong TAO UZG+, phải khóa ba vòng như sau:

#### **Lộc Tồn**

Trả lời câu hỏi:

**Nguồn lực / lộc / cơ hội / sự ban phát nằm ở đâu và đi theo cơ chế nào?**

#### **Tràng Sinh**

Trả lời câu hỏi:

**Khí lực sống, chu kỳ trưởng – suy, và khả năng vận hành thực của đương số nằm ở trạng thái nào?**

#### **Thái Tuế**

Trả lời câu hỏi:

**Tư thế, vị thế, chính danh và chiều đối diện với đời của đương số là gì?**

### **9.4.3. Quan hệ ba vòng trong một lá số**

Một người có thể:

* có **Lộc Tồn đẹp** nhưng **Thái Tuế nghịch**  
* có **Thái Tuế mạnh** nhưng **Tràng Sinh suy**  
* có **Tràng Sinh vượng** nhưng **Lộc Tồn bị phá**  
* hoặc tóm thâu được cả ba vòng tại vị trí đẹp

Chính vì vậy, nếu chỉ luận một vòng riêng lẻ thì sẽ sai.

### **9.4.4. Ví dụ tinh thần Thiên Lương**

Thiên Lương phân tích rất rõ kiểu:

* tuổi nào được hưởng Lộc Tồn trọn  
* nhưng Mệnh/Thân lại rơi vào vị trí nghịch của Thái Tuế  
* hoặc Tràng Sinh không nâng đỡ được  
   → thì kết quả đời người vẫn không thể coi là “toàn thuận”.

Ngược lại:

* có tuổi Can–Chi nghịch hơn,  
* nhưng nhờ Lộc Tồn, nhờ vị trí Mệnh/Thân, nhờ Tràng Sinh,  
* mà phần nào cải được số thế.

Đây chính là lý do TAO không được chỉ an ba vòng xong rồi cất vào ba module khác nhau.

### **9.4.5. Core relational model cho TAO**

TAO engine phải sinh ra một object quan hệ, ví dụ:

* `loc_ton_context`  
* `trang_sinh_context`  
* `tai_sui_context`  
* `core_ring_alignment`

Trong đó `core_ring_alignment` phải cho biết tối thiểu:

* Mệnh đang nằm ở đâu trên vòng Lộc Tồn  
* Thân đang nằm ở đâu trên vòng Tràng Sinh  
* Mệnh/Thân đang đứng ở vị trí nào trong vòng Thái Tuế  
* ba vòng đang cộng lực hay triệt lực lẫn nhau

### **9.4.6. Audit tối thiểu**

TAO phải kiểm tra được:

* `loc_ton_status`  
* `trang_sinh_status`  
* `tai_sui_status`  
* `ring_alignment_status`

### **9.4.7. Định nghĩa làm việc**

**Quan hệ giữa Lộc Tồn – Tràng Sinh – Thái Tuế là core relational layer của lá số, trong đó Lộc Tồn biểu thị cơ chế ban phát nguồn lực, Tràng Sinh biểu thị chu kỳ khí lực sống, còn Thái Tuế biểu thị tư thế và vị thế nhân sinh; ba vòng này phải được đọc chung như một hệ tương tác, không được an và lưu trữ như các cấu trúc rời rạc không liên hệ.**

---

# **ĐOẠN CHỐT FINAL CỦA PHẦN 9**

**PHẦN 9 trong TAO UZG+ xác lập ba vòng sao lớn của lá số: Vòng Lộc Tồn an theo Thiên Can năm sinh; Vòng Tràng Sinh an theo Ngũ Hành Cục; Vòng Thái Tuế an theo Địa Chi năm sinh. Lộc Tồn là trục ban phát nguồn lực, Tràng Sinh là trục chu kỳ khí lực sống, còn Thái Tuế là trục tư thế và chính danh nhân sinh. Trong production engine, ba vòng này không được xử lý như ba module rời rạc, mà phải được khóa thành một core relational layer để đánh giá tương quan giữa nguồn lực, khí lực và vị thế của đương số trên toàn bộ lá số.**

---

# **PART 9 — TỨ HÓA (V3 PHẦN 10)**

## **10.1. Tứ Hóa là gì**

Trong TAO UZG+, **Tứ Hóa không phải là bốn sao độc lập**, mà là **bốn trạng thái biến đổi năng lượng** gắn lên các tinh diệu trong lá số. Nói cách khác:

* **Chính tinh / phụ tinh** \= thực thể mang cấu trúc nền  
* **Tứ Hóa** \= trạng thái động làm thay đổi cách biểu hiện, cường độ, kết quả và hướng phát tác của tinh diệu đó

Đây là lý do Tứ Hóa phải được xem như một **dynamic state layer**, chứ không phải một “cụm sao phụ” thông thường.

### **Bốn trạng thái của Tứ Hóa**

#### **1\. Hóa Lộc**

Biểu thị:

* khởi đầu  
* tài lộc  
* sinh sôi  
* nảy nở  
* nhân duyên  
* khả năng kết nối nguồn lực

Trong TAO engine, Hóa Lộc được xem là trạng thái:

* `growth`  
* `resource activation`  
* `attraction`

#### **2\. Hóa Quyền**

Biểu thị:

* quyền lực  
* tranh đấu  
* thực thi  
* áp lực  
* mức độ chi phối  
* năng lực phát động và kiểm soát

Trong TAO engine, Hóa Quyền được xem là trạng thái:

* `power`  
* `execution pressure`  
* `control force`

#### **3\. Hóa Khoa**

Biểu thị:

* trí tuệ  
* danh tiếng  
* giải pháp  
* hóa giải  
* ôn hòa  
* chính danh  
* sự tinh luyện

Trong TAO engine, Hóa Khoa được xem là trạng thái:

* `clarity`  
* `reputation`  
* `resolution`  
* `refinement`

#### **4\. Hóa Kỵ**

Biểu thị:

* cản trở  
* thị phi  
* mắc kẹt  
* bài học đắt giá  
* kết thúc  
* thu tàng  
* điểm nghẽn nghiệp lực hoặc thực tế

Trong TAO engine, Hóa Kỵ được xem là trạng thái:

* `block`  
* `friction`  
* `conflict`  
* `closure`  
* `costly lesson`

### **Tứ Hóa không phải lớp ý nghĩa phụ**

Từ Tăng Sinh dành riêng nhiều chương cho Tứ Hóa, Hóa Kỵ và quan hệ Hóa nhập/Hóa xuất, cho thấy rõ đây không phải lớp phụ trang trí, mà là **một trong những trục động lực quan trọng nhất của lá số**.

### **Định nghĩa làm việc**

**Tứ Hóa là bốn trạng thái biến đổi năng lượng gắn lên tinh diệu của lá số, dùng để biểu thị sự phát động, tăng trưởng, quyền lực, giải hóa hoặc cản trở của vận mệnh trong từng tầng thời gian.**

---

## **10.2. Bảng Tứ Hóa theo Thiên Can năm sinh**

Đây là **Canonical Lookup Table** của TAO UZG+.  
 Engine phải lấy **Thiên Can** của:

* năm sinh bản mệnh,  
* Đại Hạn,  
* hoặc Lưu Niên

để gán trạng thái Tứ Hóa lên các sao tương ứng.

### **Bảng Thập Can Tứ Hóa chuẩn**

| Thiên Can | Hóa Lộc | Hóa Quyền | Hóa Khoa | Hóa Kỵ |
| ----- | ----- | ----- | ----- | ----- |
| **Giáp** | Liêm Trinh | Phá Quân | Vũ Khúc | Thái Dương |
| **Ất** | Thiên Cơ | Thiên Lương | Tử Vi | Thái Âm |
| **Bính** | Thiên Đồng | Thiên Cơ | Văn Xương | Liêm Trinh |
| **Đinh** | Thái Âm | Thiên Đồng | Thiên Cơ | Cự Môn |
| **Mậu** | Tham Lang | Thái Âm | Hữu Bật | Thiên Cơ |
| **Kỷ** | Vũ Khúc | Tham Lang | Thiên Lương | Văn Khúc |
| **Canh** | Thái Dương | Vũ Khúc | Thái Âm | Thiên Đồng |
| **Tân** | Cự Môn | Thái Dương | Văn Khúc | Văn Xương |
| **Nhâm** | Thiên Lương | Tử Vi | Tả Phụ | Vũ Khúc |
| **Quý** | Phá Quân | Cự Môn | Thái Âm | Tham Lang |

Nguồn chuẩn hóa nội bộ ENTA TAO đã khóa bảng này để engine dùng làm source-of-truth.

### **Nguyên tắc kỹ thuật**

* một Thiên Can sinh ra đúng **1 Lộc, 1 Quyền, 1 Khoa, 1 Kỵ**  
* không được phép duplicate  
* không được để AI đoán theo nghĩa sao  
* phải dùng lookup table chuẩn

### **Các sao nhận Tứ Hóa**

Cần lưu ý rằng sao được hóa **không chỉ là chính tinh**. Một số trường hợp như:

* Văn Xương  
* Văn Khúc  
* Tả Phụ  
* Hữu Bật

là **phụ tinh** nhưng vẫn nhận Tứ Hóa trong bảng chuẩn. Điều này phải được engine chấp nhận như một quy tắc hợp lệ, không được loại bỏ vì “không phải chính tinh”.

### **Định nghĩa làm việc**

**Bảng Tứ Hóa theo Thiên Can là source-of-truth lookup table quy định mỗi Thiên Can làm phát sinh đúng bốn trạng thái Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ trên các sao tương ứng của lá số.**

---

## **10.3. Vai trò của Tứ Hóa trong lá số**

Nếu chính tinh là phần **hardware**, thì Tứ Hóa là phần **software state** làm thay đổi cách chính tinh biểu hiện.  
 Từ Tăng Sinh xem Tứ Hóa là tầng rất quan trọng để đọc:

* biến động  
* vận thế  
* dòng tác động giữa các cung  
* và thời điểm ứng nghiệm sự kiện. Điều này thể hiện rõ qua các chương riêng về **Thiên Can và Tứ Hóa**, **Tứ Hóa nhập môn**, **Ứng dụng của Tứ Hóa**, **Hóa Kỵ**, **Vận thế lưu chuyển**, **Hóa xuất / Hóa nhập**, và **thời gian ứng nghiệm sự kiện**.

### **Vai trò 1 — Tạo tính động cho lá số**

Không có Tứ Hóa, lá số nghiêng về trạng thái tĩnh:

* sao ở đâu  
* cung nào có gì  
* bộ nào hội tụ

Có Tứ Hóa, lá số chuyển sang trạng thái động:

* sao nào đang phát lộc  
* sao nào đang phát quyền  
* sao nào đang hóa giải / nổi danh  
* sao nào đang gây kẹt, tạo nghiệp hoặc sinh mâu thuẫn

### **Vai trò 2 — Tạo quan hệ giữa các cung**

Tứ Hóa không chỉ nói về một sao, mà còn tạo ra quan hệ:

* cung A hóa vào cung B  
* cung A tác động cung B  
* cung A tự hóa hay phi hóa  
* cung nào là nơi tiếp nhận lực động của cung khác

### **Vai trò 3 — Tạo sự khác biệt giữa các tầng thời gian**

Một lá số có thể có:

* Tứ Hóa bản mệnh rất đẹp  
* nhưng Đại Hạn lại xấu  
* hoặc Lưu Niên kích hoạt một Hóa Kỵ mạnh làm biến cố xuất hiện trong một năm cụ thể

Do đó, Tứ Hóa là tầng bắt buộc nếu TAO muốn đi từ “mô tả lá số” sang “phân tích vận động lá số”.

### **Vai trò 4 — Bridge giữa calculation và advisory**

AIER Tao muốn tư vấn đúng thì không thể chỉ nhìn sao tĩnh.  
 Nó phải thấy:

* sao nào đang hóa  
* hóa ở tầng bản mệnh hay hạn hay năm  
* hóa đó đang tự hóa hay phi hóa sang cung nào  
* cung nào bị kích hoạt

### **Định nghĩa làm việc**

**Tứ Hóa là dynamic engine layer của lá số, làm cho tinh diệu và cung vị chuyển từ trạng thái tĩnh sang trạng thái động, từ đó cho phép đọc biến động, vận thế và quan hệ tác động giữa các cung theo từng tầng thời gian.**

---

## **10.4. Tứ Hóa bản mệnh**

### **10.4.1. Bản chất**

Tứ Hóa bản mệnh là lớp Tứ Hóa được xác định bằng **Thiên Can năm sinh**. Đây là lớp:

* gốc  
* bền  
* không đổi  
* tác động vĩnh viễn đến cấu trúc nền của lá số

### **10.4.2. Vai trò**

Tứ Hóa bản mệnh trả lời:

* bản chất động lực gốc của lá số là gì  
* sao nào có xu hướng phát lộc, phát quyền, phát khoa, phát kỵ từ nền  
* cấu trúc cốt lõi của vận số mang khuynh hướng nào

### **10.4.3. Rule engine**

Input:

* `birth_year_heavenly_stem`

Output:

* `natal_si_hua`

### **10.4.4. Audit case — NTS**

NTS năm **Giáp**  
 → Tứ Hóa bản mệnh là:

* **Liêm Trinh hóa Lộc**  
* **Phá Quân hóa Quyền**  
* **Vũ Khúc hóa Khoa**  
* **Thái Dương hóa Kỵ**

Đây là audit case production phải pass.

### **10.4.5. Định nghĩa làm việc**

**Tứ Hóa bản mệnh là lớp Hóa cố định được xác lập từ Thiên Can năm sinh, tác động vĩnh viễn lên cấu trúc cốt lõi của lá số và là dynamic signature gốc của đương số.**

---

## **10.5. Tứ Hóa đại hạn**

### **10.5.1. Bản chất**

Tứ Hóa Đại Hạn là lớp Tứ Hóa được xác định theo **Thiên Can của cung mà Đại Hạn đang tọa** hoặc theo **policy hạn** mà production engine khóa. Đây là lớp:

* 10 năm  
* xu thế dài hạn  
* định hình màu vận chung của một đại chu kỳ

### **10.5.2. Vai trò**

Tứ Hóa Đại Hạn dùng để đọc:

* xu thế chính của 10 năm  
* sao nào trong giai đoạn này được kích hoạt mạnh  
* giai đoạn này thiên về phát lộc, tranh quyền, hóa giải hay va chạm  
* cung nào sẽ trở thành trọng tâm hoạt động

### **10.5.3. Rule engine**

Input:

* `dai_han_palace`  
* `dai_han_heavenly_stem`

Output:

* `decade_si_hua`

### **10.5.4. Nguyên tắc**

Tứ Hóa Đại Hạn là **overlay layer**, nghĩa là:

* không xóa Tứ Hóa bản mệnh  
* mà phủ chồng lên bản mệnh  
* tạo ra sự tương tác giữa “gốc” và “thời đoạn”

### **10.5.5. Định nghĩa làm việc**

**Tứ Hóa Đại Hạn là lớp Hóa theo chu kỳ 10 năm, được xác định từ Thiên Can của Đại Hạn, dùng để biểu thị xu thế vận hành dài hạn và lớp động lực chủ đạo của từng đại chu kỳ.**

---

## **10.6. Tứ Hóa lưu niên**

### **10.6.1. Bản chất**

Tứ Hóa Lưu Niên là lớp Tứ Hóa xác định theo **Thiên Can của năm đang xét**. Đây là lớp:

* ngắn hạn  
* biến động cụ thể  
* dùng để đọc năm nào bùng lên, năm nào mắc kẹt, năm nào hóa giải

### **10.6.2. Vai trò**

Tứ Hóa Lưu Niên giúp TAO đọc:

* sự kiện trong năm  
* trọng tâm của năm  
* cung nào bị kích hoạt  
* năm nay phát tài, phát quyền, được danh hay gặp kẹt  
* Hóa Kỵ năm nay rơi vào đâu

### **10.6.3. Rule engine**

Input:

* `current_year_heavenly_stem`

Output:

* `annual_si_hua`

### **10.6.4. Ví dụ**

Ví dụ năm **2026 \= Bính Ngọ**  
 → dùng **Can Bính** để an:

* Thiên Đồng hóa Lộc  
* Thiên Cơ hóa Quyền  
* Văn Xương hóa Khoa  
* Liêm Trinh hóa Kỵ

### **10.6.5. Nguyên tắc**

Tứ Hóa Lưu Niên là **năm-thời-điểm layer**, phải luôn được đọc chồng lên:

* bản mệnh  
* đại hạn

### **10.6.6. Định nghĩa làm việc**

**Tứ Hóa Lưu Niên là lớp Hóa của năm đang xét, được xác định theo Thiên Can năm hiện hành, dùng để mô tả biến động cụ thể và trigger sự kiện trong từng năm.**

---

## **10.7. Phi Hóa và tác động cung vị**

Đây là phần nâng cao và là phần mà Từ Tăng Sinh nhấn mạnh rất mạnh: phải dùng **hệ phân tích nhiều tầng và nghiệm chứng**, không chỉ nhìn từng sao riêng lẻ. Ông đặc biệt quan tâm đến:

* Hóa nhập  
* Hóa xuất  
* Tứ Hóa phi xuất từ Ngã cung  
* Tứ Hóa phi xuất từ Tha cung  
* và quan hệ biến động giữa các cung.

### **10.7.1. Tự Hóa**

Tự Hóa là trường hợp:

* Thiên Can của chính cung đó  
* làm cho sao ở ngay cung đó phát sinh Tứ Hóa

Ví dụ:

* cung Mệnh có Can Giáp  
* trong cung Mệnh có Liêm Trinh  
* thì Mệnh có thể **tự Hóa Lộc**

### **10.7.2. Phi Hóa**

Phi Hóa là trường hợp:

* Thiên Can của cung A  
* khiến một sao ở cung B phát sinh Hóa  
* từ đó tạo ra mối liên kết động giữa A và B

Ví dụ:

* Mệnh phi Hóa Lộc vào Tài  
* có thể được diễn giải như:  
  * tư duy tạo ra tiền  
  * động lực bản thân đẩy sang tài nguyên  
  * mệnh chủ chủ động phát lực về tài

### **10.7.3. Vì sao Phi Hóa quan trọng**

Nếu chỉ nhìn:

* sao nào hóa gì  
   thì mới thấy trạng thái

Nhưng khi nhìn:

* từ cung nào phi sang cung nào  
* hóa nhập hay hóa xuất  
* cung nào nhận lực, cung nào phát lực  
   thì mới thấy:  
* đường đi của sự kiện  
* cơ chế tác động  
* nguyên nhân và nơi phát ứng

### **10.7.4. Tầng technical của TAO**

TAO engine phải sinh được ít nhất:

* `self_transformations`  
* `flying_transformations`  
* `source_palace`  
* `target_palace`  
* `transform_type`  
* `time_layer`

### **10.7.5. Ví dụ cấu trúc**

* `menh -> tai : hoa_loc`  
* `quan -> phu : hoa_ky`  
* `di -> no : hoa_quyen`

### **10.7.6. Định nghĩa làm việc**

**Phi Hóa là cơ chế lan truyền trạng thái Tứ Hóa giữa các cung, trong đó một cung phát lực và cung khác nhận lực; đây là tầng thiết yếu để TAO chuyển từ mô tả lá số sang mô hình hóa sự kiện và advisory logic.**

---

## **10.8. Thiết lập kiểm tra chéo (Audit Rules for Tứ Hóa)**

### **Rule 10.1 — Single Assign**

Một Thiên Can chỉ sinh ra đúng:

* 1 Hóa Lộc  
* 1 Hóa Quyền  
* 1 Hóa Khoa  
* 1 Hóa Kỵ

Không được:

* duplicate  
* thiếu  
* chồng sai rule

### **Rule 10.2 — Source Check**

Engine phải kiểm tra:

* sao được Hóa có hiện diện trên lá số hay không  
* đặc biệt với:  
  * Văn Xương  
  * Văn Khúc  
  * Tả Phụ  
  * Hữu Bật

vì đây là phụ tinh nhưng vẫn có thể nhận Tứ Hóa.

### **Rule 10.3 — Layer Check**

Phải phân biệt rõ:

* bản mệnh  
* đại hạn  
* lưu niên

Không được trộn ba lớp thành một.

### **Rule 10.4 — NTS Verification**

NTS tuổi **Giáp**:

* Liêm Trinh hóa Lộc  
* Phá Quân hóa Quyền  
* Vũ Khúc hóa Khoa  
* Thái Dương hóa Kỵ

Nếu chart NTS không ra đúng như trên, engine phải fail audit.

### **Rule 10.5 — Flow Check**

Nếu có Phi Hóa:

* phải kiểm tra `source_palace`  
* `target_palace`  
* `transform_type`  
* `time_layer`  
   đầy đủ và nhất quán

### **Định nghĩa làm việc**

**Audit Rules của Tứ Hóa là bộ kiểm tra bảo đảm engine gán đúng bốn trạng thái Hóa theo Thiên Can, đúng lớp thời gian, đúng sao đích và đúng quan hệ phi hóa giữa các cung.**

---

# **ĐOẠN CHỐT FINAL CỦA PHẦN 10**

**PHẦN 10 trong TAO UZG+ xác lập Tứ Hóa như một dynamic state layer của lá số. Tứ Hóa không phải là bốn sao độc lập mà là bốn trạng thái biến đổi gồm Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ, được gán lên các tinh diệu theo Thiên Can của năm sinh, Đại Hạn hoặc Lưu Niên. Tứ Hóa bản mệnh tạo dynamic signature gốc; Tứ Hóa Đại Hạn tạo xu thế 10 năm; Tứ Hóa Lưu Niên tạo biến động từng năm. Cơ chế Tự Hóa và Phi Hóa là tầng cao hơn, cho phép TAO mô hình hóa sự lan truyền tác động giữa các cung, từ đó hỗ trợ phân tích vận thế, trigger sự kiện và advisory logic. Mọi triển khai production phải dùng bảng Thập Can Tứ Hóa chuẩn làm source-of-truth, có phân lớp thời gian rõ ràng và phải vượt qua audit rules trước khi được dùng cho reading hoặc AIER Tao advisory.**

---

# **PART 10 — KHỞI HẠN (V3 PHẦN 11)**

## **11.1. Đại vận**

### **11.1.1. Bản chất**

**Đại vận** là chu kỳ vận hành lớn của lá số, mỗi bước kéo dài **10 năm**.  
 Đây là lớp thời gian dài hạn nhất trong hệ hạn thường dùng của Tử Vi, dùng để xác định:

* xu thế chung của từng thập niên,  
* cung nào giữ vai trò trung tâm trong giai đoạn đó,  
* sao nào, Tứ Hóa nào, lực nào được kích hoạt mạnh trong 10 năm ấy.

Toàn Thư có mục riêng về **luận đại hạn thập niên họa phúc**, cho thấy Đại vận là thành phần bắt buộc của toàn bộ hệ thống luận số.

### **11.1.2. Nguyên tắc chu kỳ**

* mỗi **Đại vận \= 10 năm**  
* toàn đời người được chia thành các khoang 10 năm kế tiếp nhau  
* mỗi khoang 10 năm được gắn vào một cung trên lá số

### **11.1.3. Điểm khởi**

Theo chuẩn ENTA TAO đã khóa trước đó:

* Đại vận bắt đầu từ **số của Cục**  
* ví dụ:  
  * **Thủy nhị cục** → bắt đầu từ **2**  
  * **Mộc tam cục** → bắt đầu từ **3**  
  * **Kim tứ cục** → bắt đầu từ **4**  
  * **Thổ ngũ cục** → bắt đầu từ **5**  
  * **Hỏa lục cục** → bắt đầu từ **6**.

Điều này có nghĩa:

* Cục không chỉ dùng để tính Tử Vi và Tràng Sinh  
* mà còn là **tham số khởi Đại vận**

### **11.1.4. Chiều thuận – nghịch**

Chiều đi của Đại vận phụ thuộc vào:

* **giới tính**  
* **âm dương năm sinh**

Working draft ENTA TAO đã xác định rõ:

* đây là điểm phải khóa theo **âm dương nam nữ / năm sinh**.

### **Chuẩn production TAO**

* **Dương Nam / Âm Nữ** → **đếm thuận**  
* **Âm Nam / Dương Nữ** → **đếm nghịch**

Đây là quy tắc production phải dùng thống nhất.

### **11.1.5. Cách gắn Đại vận lên cung**

Sau khi có:

* số khởi vận theo Cục  
* chiều vận hành

engine phải:

1. xác định cung bắt đầu của Đại vận  
2. đi thuận hoặc nghịch qua 12 cung  
3. gán mỗi cung cho một khoảng 10 năm kế tiếp

### **11.1.6. Dữ liệu đầu vào**

* `cuc_number`  
* `gender`  
* `year_yin_yang_type`  
* `menh_index`

### **11.1.7. Dữ liệu đầu ra**

* `decade_start_age`  
* `decade_direction`  
* `decade_map`  
* `current_decade_palace`

### **11.1.8. Định nghĩa làm việc**

**Đại vận là lớp hạn 10 năm của lá số, khởi từ số Cục và chạy thuận hoặc nghịch tùy âm dương nam nữ, dùng để xác lập cung trung tâm và xu thế dài hạn của từng thập niên trong đời người.**

---

## **11.2. Tiểu vận**

### **11.2.1. Bản chất**

**Tiểu vận** là lớp hạn ngắn hơn, vận hành theo **chu kỳ 1 năm**.  
 Nếu Đại vận cho biết xu hướng 10 năm, thì Tiểu vận cho biết:

* năm đó điểm rơi vận hành nằm ở cung nào,  
* năm đó khu vực nào của lá số được nhấn mạnh hơn,  
* sự kiện của năm đang xoay quanh trục cung nào.

### **11.2.2. Nguyên tắc khởi**

Theo yêu cầu anh đã khóa:

* **Tiểu vận khởi theo Chi năm sinh**

Điều này có nghĩa Tiểu vận không lấy Cục làm gốc như Đại vận, mà lấy trực tiếp:

* **Địa Chi năm sinh** của đương số

### **11.2.3. Logic vận hành**

TAO engine phải:

1. lấy cung có cùng chi với **năm sinh**  
2. dùng đó làm mốc khởi Tiểu vận  
3. triển khai chu kỳ từng năm qua 12 cung theo policy vận hành đã khóa

### **11.2.4. Vai trò**

Tiểu vận là lớp:

* bridge giữa Đại vận và Lưu niên  
* annual palace emphasis layer  
* một tầng cần có để đọc sự kiện năm cho sát hơn

### **11.2.5. Dữ liệu đầu vào**

* `birth_year_branch`  
* `gender`  
* `year_yin_yang_type`  
* `target_age`

### **11.2.6. Dữ liệu đầu ra**

* `minor_cycle_origin`  
* `minor_cycle_direction`  
* `minor_cycle_position`  
* `minor_cycle_palace`

### **11.2.7. Định nghĩa làm việc**

**Tiểu vận là lớp hạn 1 năm của lá số, khởi từ Địa Chi năm sinh và chạy theo quy tắc chiều đã khóa, dùng để xác định cung nhấn mạnh của từng năm trong đời người.**

---

## **11.3. Lưu niên**

### **11.3.1. Bản chất**

**Lưu niên** là lớp thời gian của **năm đang xét**.  
 Nếu Tiểu vận là chu kỳ nội tại 1 năm trong đời người, thì Lưu niên là:

* năm trời đất bên ngoài chiếu vào lá số  
* năm hiện hành với Can–Chi cụ thể  
* năm kích hoạt Tứ Hóa lưu niên và các sao lưu động

Từ Tăng Sinh dành riêng chương lớn cho **vận lưu niên**, chứng tỏ đây là tầng bắt buộc nếu muốn đọc biến động sự kiện theo năm.

### **11.3.2. Vai trò**

Lưu niên dùng để đọc:

* năm nay vận thế thế nào  
* năm nay cung nào bị kích hoạt  
* năm nay Tứ Hóa nào phát động  
* năm nay có khả năng xảy ra loại sự kiện gì

### **11.3.3. Thành phần của Lưu niên**

Lưu niên phải có tối thiểu:

* `annual_year_stem`  
* `annual_year_branch`  
* `annual_si_hua`  
* `annual_trigger_layer`

### **11.3.4. Quan hệ với Tiểu vận**

Tiểu vận và Lưu niên không thay nhau.  
 Trong TAO:

* **Tiểu vận** \= lớp chu kỳ nội bộ của đương số  
* **Lưu niên** \= lớp thời gian thực tế của năm đang xét

Khi đọc năm, phải xét **cả hai**.

### **11.3.5. Dữ liệu đầu vào**

* `target_year`  
* `target_year_stem`  
* `target_year_branch`

### **11.3.6. Dữ liệu đầu ra**

* `annual_overlay`  
* `annual_si_hua`  
* `annual_palace_trigger`

### **11.3.7. Định nghĩa làm việc**

**Lưu niên là lớp hạn của năm hiện hành, được xác định theo Can Chi năm đang xét, dùng để kích hoạt các biến số động như Tứ Hóa lưu niên và các tác động sự kiện theo năm lên lá số gốc.**

---

## **11.4. Lưu nguyệt**

### **11.4.1. Bản chất**

**Lưu nguyệt** là lớp hạn theo **tháng** bên trong một năm cụ thể.  
 Đây là tầng thời gian nhỏ hơn Lưu niên, dùng để:

* thu hẹp sự kiện trong năm xuống từng tháng  
* xem tháng nào phát tác mạnh  
* tháng nào thuận / nghịch hơn  
* tháng nào là tháng mở, tháng nào là tháng cản

### **11.4.2. Vai trò**

Nếu Lưu niên cho biết:

năm này có biến động

thì Lưu nguyệt giúp trả lời:

biến động đó dễ rơi vào tháng nào

### **11.4.3. Logic kỹ thuật**

Trong TAO engine, Lưu nguyệt phải là:

* `monthly_overlay_inside_annual_context`

Nghĩa là:

* không đọc Lưu nguyệt độc lập khỏi Lưu niên  
* phải đặt bên trong khung:  
  * bản mệnh  
  * đại vận  
  * tiểu vận  
  * lưu niên

### **11.4.4. Dữ liệu đầu vào**

* `target_year`  
* `target_month`  
* `annual_context`

### **11.4.5. Dữ liệu đầu ra**

* `monthly_trigger`  
* `monthly_palace_emphasis`  
* `monthly_event_probability`

### **11.4.6. Định nghĩa làm việc**

**Lưu nguyệt là lớp hạn tháng nằm bên trong Lưu niên, dùng để xác định thời điểm tháng nào trong năm là điểm phát tác, tăng lực hoặc xung đột của các biến số vận hạn.**

---

## **11.5. Lưu nhật**

### **11.5.1. Bản chất**

**Lưu nhật** là lớp hạn theo **ngày**, là tầng thời gian nhỏ hơn nữa bên trong:

* năm  
* tháng  
* và bối cảnh hạn lớn hơn

Đây là tầng dùng khi TAO muốn:

* soi rất sát thời điểm  
* khóa ngày phát sinh sự kiện  
* hoặc tạo advisory ngắn hạn, precision timing

### **11.5.2. Vai trò**

Lưu nhật không nên dùng một mình để kết luận số mệnh.  
 Nó chỉ phát huy đúng khi:

* đã có bản mệnh  
* đã có đại vận  
* đã có tiểu vận  
* đã có lưu niên  
* đã có lưu nguyệt

### **11.5.3. Logic kỹ thuật**

TAO phải coi Lưu nhật là:

* `daily_precision_layer`  
* không phải lớp nền  
* mà là lớp zoom-in cuối cùng

### **11.5.4. Dữ liệu đầu vào**

* `target_date`  
* `annual_context`  
* `monthly_context`

### **11.5.5. Dữ liệu đầu ra**

* `daily_trigger`  
* `daily_focus`  
* `daily_precision_event_markers`

### **11.5.6. Định nghĩa làm việc**

**Lưu nhật là lớp hạn ngày dùng để zoom-in chính xác thời điểm ứng sự trong bối cảnh đã được xác lập bởi các tầng hạn lớn hơn như Đại vận, Tiểu vận, Lưu niên và Lưu nguyệt.**

---

## **11.6. Quy tắc lồng hạn**

### **11.6.1. Bản chất**

Đây là phần quan trọng nhất của PHẦN 11\.  
 Các tầng hạn không được đọc rời rạc. Từ Tăng Sinh nhấn mạnh rất rõ rằng việc phân tích phải theo **nhiều tầng** và phải **nghiệm chứng**, không thể chỉ nhìn một dấu hiệu đơn lẻ rồi kết luận. Điều này áp dụng trực tiếp cho hệ hạn.

### **11.6.2. Thứ tự lồng hạn chuẩn**

TAO UZG+ phải đọc các lớp hạn theo thứ tự từ ngoài vào trong:

1. **Bản mệnh**  
2. **Đại vận**  
3. **Tiểu vận**  
4. **Lưu niên**  
5. **Lưu nguyệt**  
6. **Lưu nhật**

### **11.6.3. Nguyên tắc**

* tầng lớn hơn là **context**  
* tầng nhỏ hơn là **trigger**  
* càng đi vào trong càng tăng độ cụ thể  
* nhưng không bao giờ được bỏ tầng ngoài

### **11.6.4. Cách hiểu chuẩn**

#### **Đại vận**

trả lời:

10 năm này đang đi theo thế gì?

#### **Tiểu vận**

trả lời:

năm tuổi này cung nào nổi bật?

#### **Lưu niên**

trả lời:

năm này trời đất bên ngoài kích hoạt cái gì?

#### **Lưu nguyệt**

trả lời:

tháng nào trong năm phát tác rõ?

#### **Lưu nhật**

trả lời:

ngày nào dễ ứng sự?

### **11.6.5. Không được đọc sai kiểu**

TAO không được:

* lấy Lưu nhật để phủ định Đại vận  
* lấy Tiểu vận để bỏ qua Lưu niên  
* lấy một năm xấu rồi kết luận cả đời xấu  
* hoặc lấy một Đại vận đẹp rồi bỏ qua các điểm nghẽn lưu niên/lưu nguyệt

### **11.6.6. Core relational model**

TAO engine phải sinh ra:

* `fate_context`  
* `decade_context`  
* `minor_year_context`  
* `annual_context`  
* `monthly_context`  
* `daily_context`  
* `nested_limit_alignment`

Trong đó `nested_limit_alignment` phải cho biết:

* các tầng có đồng pha hay không  
* có tầng nào triệt lực tầng khác không  
* cung nào lặp đi lặp lại qua nhiều tầng  
* Tứ Hóa nào chồng phủ lên nhau

### **11.6.7. Nguyên tắc advisory**

AIER Tao chỉ được đưa advisory mạnh khi:

* có **đa tầng cùng hội tụ**  
* hoặc ít nhất tầng lớn và tầng trung đồng pha

Nếu chỉ có:

* Lưu nhật xấu  
   nhưng Đại vận, Tiểu vận, Lưu niên đều ổn  
   → không được advisory quá mức.

### **11.6.8. Định nghĩa làm việc**

**Quy tắc lồng hạn là nguyên tắc đọc các lớp vận theo thứ tự từ Bản mệnh → Đại vận → Tiểu vận → Lưu niên → Lưu nguyệt → Lưu nhật, trong đó tầng lớn tạo context, tầng nhỏ tạo trigger; mọi phân tích hợp lệ phải dựa trên sự hội tụ hoặc xung đột giữa nhiều tầng, không được kết luận chỉ từ một tầng đơn lẻ.**

---

# **ĐOẠN CHỐT FINAL CỦA PHẦN 11**

**PHẦN 11 trong TAO UZG+ xác lập hệ khởi hạn như một timeflow engine nhiều tầng. Đại vận là chu kỳ 10 năm, khởi từ số Cục và đi thuận/nghịch theo âm dương nam nữ; Tiểu vận là chu kỳ 1 năm, khởi theo Chi năm sinh; Lưu niên, Lưu nguyệt và Lưu nhật lần lượt là các lớp năm, tháng, ngày dùng để thu hẹp thời điểm ứng sự. Trong production engine, các tầng hạn không được xử lý độc lập mà phải lồng vào nhau theo thứ tự từ ngoài vào trong, để tạo ra một cấu trúc phân tích nhiều tầng, đúng với logic vận thế lưu chuyển và nghiệm chứng sự kiện của hệ Tử Vi.**

---

# **PART 11 — OUTPUT SCHEMA (V3 PHẦN 12)**

## **12.1. Chart metadata**

### **12.1.1. Bản chất**

`Chart metadata` là lớp thông tin nền của lá số.  
 Nó không phải nội dung luận đoán, mà là **phần nhận dạng, bối cảnh, điều kiện tính toán và provenance** của chart.

Nếu thiếu metadata chuẩn, thì:

* không audit được lá số  
* không version được chart  
* không debug được rule sai  
* AIER Tao rất dễ đọc nhầm chart hoặc dùng chart hết hiệu lực

### **12.1.2. Các trường metadata bắt buộc**

Một lá số chuẩn của TAO UZG+ phải có tối thiểu các metadata sau:

#### **A. Lịch sử dụng / calendar basis**

* loại lịch đầu vào:  
  * dương lịch  
  * âm lịch  
* loại lịch dùng để lập số thực tế:  
  * âm lịch chuẩn hóa  
* policy xử lý tháng nhuận  
* calendar conversion version

#### **B. Timezone / location**

* timezone  
* UTC offset  
* location string hoặc location code  
* local datetime normalized

#### **C. Gender / polarity**

* giới tính  
* phân loại:  
  * Dương Nam  
  * Âm Nam  
  * Dương Nữ  
  * Âm Nữ

#### **D. Dữ liệu sinh**

* năm  
* tháng  
* ngày  
* giờ  
* Can Chi năm sinh  
* tháng âm  
* ngày âm  
* giờ địa chi

#### **E. Trục lõi của lá số**

* **Mệnh**  
* **Thân**  
* **Cục**

#### **F. Audit / provenance**

* formula version  
* rule set version  
* validation status  
* confidence score  
* created\_at  
* updated\_at

### **12.1.3. Chart metadata tối thiểu đề xuất**

{  
 "chart\_metadata": {  
   "chart\_id": "uuid",  
   "chart\_version": "TAO-ZIWEI-1.0",  
   "calendar\_input\_type": "solar",  
   "calendar\_runtime\_type": "lunar",  
   "calendar\_conversion\_version": "ENTA-CAL-1.0",  
   "leap\_month\_policy": "ENTA-standard",  
   "timezone": "Asia/Ho\_Chi\_Minh",  
   "utc\_offset": "+07:00",  
   "location": "Nam Dinh, Vietnam",  
   "gender": "male",  
   "polarity\_type": "DuongNam",  
   "birth\_solar": "1984-03-06T05:30:00+07:00",  
   "birth\_lunar": {  
     "year\_can\_chi": "Giap Ty",  
     "month": 2,  
     "day": 4,  
     "hour\_branch": "Mao"  
   },  
   "menh\_branch": "Ty",  
   "than\_branch": "Mao",  
   "cuc\_name": "Kim Tu Cuc",  
   "cuc\_number": 4,  
   "input\_confidence\_score": "high",  
   "validation\_status": "validated"  
 }  
}

### **12.1.4. Định nghĩa làm việc**

**Chart metadata là lớp dữ liệu nền xác định nguồn gốc, điều kiện tính toán, cấu hình lịch, giới tính, trục Mệnh–Thân–Cục và trạng thái kiểm chứng của lá số, dùng để đảm bảo chart có thể audit, version và tái sử dụng trong TAO engine.**

---

## **12.2. Natal chart structure**

### **12.2.1. Bản chất**

`Natal chart structure` là phần **cấu trúc lá số gốc** tại thời điểm sinh.  
 Đây là “bản đồ định mệnh cơ sở” trước khi chồng các lớp hạn và lưu động lên.

Một natal chart hoàn chỉnh trong TAO UZG+ phải bao gồm:

* **12 cung**  
* **14 chính tinh**  
* **phụ tinh**  
* **các vòng sao lớn**  
* **Tứ Hóa bản mệnh**

### **12.2.2. 12 cung**

Mỗi cung phải chứa tối thiểu:

* index  
* địa chi  
* thiên can cung  
* tên cung nhân sự  
* cờ `is_menh`  
* cờ `is_than`

### **12.2.3. 14 chính tinh**

Phải lưu:

* tên sao  
* family (ZiWei / TianFu)  
* vị trí cung  
* formula source

### **12.2.4. Phụ tinh**

Phải lưu:

* tên sao  
* source\_type:  
  * year  
  * month  
  * day  
  * hour  
  * special\_cluster  
* vị trí cung  
* rule version

### **12.2.5. Các vòng sao lớn**

Phải lưu ít nhất:

* vòng **Lộc Tồn**  
* vòng **Tràng Sinh**  
* vòng **Thái Tuế**

Mỗi vòng phải có:

* origin  
* direction  
* ring map 12 bước  
* alignment summary

### **12.2.6. Tứ Hóa**

Phải lưu:

* bản mệnh  
* các sao được hóa  
* loại hóa  
* source can

### **12.2.7. Cấu trúc natal chart đề xuất**

{  
 "natal\_chart": {  
   "palaces": \[\],  
   "main\_stars": \[\],  
   "auxiliary\_stars": \[\],  
   "major\_rings": {  
     "loc\_ton\_ring": {},  
     "trang\_sinh\_ring": {},  
     "tai\_sui\_ring": {}  
   },  
   "natal\_si\_hua": {}  
 }  
}

### **12.2.8. Định nghĩa làm việc**

**Natal chart structure là cấu trúc đầy đủ của lá số gốc tại thời điểm sinh, bao gồm 12 cung, 14 chính tinh, phụ tinh, các vòng sao lớn và Tứ Hóa bản mệnh, dùng làm source-of-truth cho mọi tầng luận giải và vận hành tiếp theo.**

---

## **12.3. Cycle layers**

### **12.3.1. Bản chất**

`Cycle layers` là phần các lớp thời gian chồng lên lá số gốc.  
 Nếu natal chart là bản đồ nền, thì cycle layers là các lớp:

* kích hoạt  
* vận động  
* biến thiên  
* làm nổi bật sự kiện theo thời gian

Theo những gì đã khóa ở PHẦN 11, cycle layers tối thiểu phải gồm:

* **Đại vận**  
* **Tiểu vận**  
* **Lưu niên**

Ở các mức mở rộng hơn có thể có:

* Lưu nguyệt  
* Lưu nhật

Nhưng trong PHẦN 12 này, anh đang khóa tối thiểu 3 lớp đầu, nên em giữ đúng scope đó.

### **12.3.2. Đại vận**

Phải lưu:

* tuổi bắt đầu  
* chiều vận hành  
* cung từng đại vận  
* thiên can đại vận nếu production cần  
* Tứ Hóa Đại Hạn overlay

### **12.3.3. Tiểu vận**

Phải lưu:

* vị trí khởi theo Chi năm sinh  
* quy tắc từng năm tuổi  
* cung ứng với từng năm

### **12.3.4. Lưu niên**

Phải lưu:

* năm xét  
* Can Chi năm  
* Tứ Hóa lưu niên  
* annual palace trigger

### **12.3.5. Cấu trúc cycle layers đề xuất**

{  
 "cycle\_layers": {  
   "decade\_cycles": \[\],  
   "minor\_cycles": \[\],  
   "annual\_cycles": \[\]  
 }  
}

### **12.3.6. Ý nghĩa kỹ thuật**

Cycle layers phải được lưu như **overlay layers**, không được ghi đè natal chart.

Tức là:

* natal chart \= immutable base  
* cycle layers \= time-based overlays

### **12.3.7. Định nghĩa làm việc**

**Cycle layers là các lớp thời gian chồng phủ lên natal chart, bao gồm Đại vận, Tiểu vận và Lưu niên, dùng để mô tả sự vận động của lá số theo từng chu kỳ thời gian mà không làm thay đổi cấu trúc gốc của natal chart.**

---

## **12.4. Machine-readable schema**

### **12.4.1. Bản chất**

Đây là phần quan trọng nhất để lá số có thể:

* nạp vào **Supabase**  
* dùng trực tiếp cho **TAO engine**  
* cấp dữ liệu cho **AIER Tao**  
* phục vụ audit / versioning / QA  
* render UI từ một source duy nhất

TAO UZG+ phải khóa nguyên tắc:

**Không dùng ảnh lá số làm source of truth.**  
 **Không dùng HTML render làm source of truth.**  
 **Machine-readable schema mới là source of truth.**

### **12.4.2. Yêu cầu của schema**

Schema phải:

* có cấu trúc rõ  
* tách lớp metadata / natal / cycles / validation  
* không trộn text hiển thị với logic machine  
* dễ serialize thành JSON  
* dễ ghi vào Supabase JSONB hoặc normalized relational tables

### **12.4.3. Bố cục schema tổng thể**

TAO nên khóa 4 lớp lớn:

1. `chart_metadata`  
2. `natal_chart`  
3. `cycle_layers`  
4. `validation`

### **12.4.4. JSON master schema đề xuất**

{  
 "chart\_metadata": {  
   "chart\_id": "uuid",  
   "chart\_version": "TAO-ZIWEI-1.0",  
   "calendar\_input\_type": "solar",  
   "calendar\_runtime\_type": "lunar",  
   "calendar\_conversion\_version": "ENTA-CAL-1.0",  
   "leap\_month\_policy": "ENTA-standard",  
   "timezone": "Asia/Ho\_Chi\_Minh",  
   "utc\_offset": "+07:00",  
   "location": "Nam Dinh, Vietnam",  
   "gender": "male",  
   "polarity\_type": "DuongNam",  
   "birth\_solar": "1984-03-06T05:30:00+07:00",  
   "birth\_lunar": {  
     "year\_can\_chi": "Giap Ty",  
     "month": 2,  
     "day": 4,  
     "hour\_branch": "Mao"  
   },  
   "menh\_branch": "Ty",  
   "than\_branch": "Mao",  
   "cuc\_name": "Kim Tu Cuc",  
   "cuc\_number": 4,  
   "input\_confidence\_score": "high",  
   "validation\_status": "validated"  
 },  
 "natal\_chart": {  
   "palaces": \[\],  
   "main\_stars": \[\],  
   "auxiliary\_stars": \[\],  
   "major\_rings": {  
     "loc\_ton\_ring": {},  
     "trang\_sinh\_ring": {},  
     "tai\_sui\_ring": {}  
   },  
   "natal\_si\_hua": {}  
 },  
 "cycle\_layers": {  
   "decade\_cycles": \[\],  
   "minor\_cycles": \[\],  
   "annual\_cycles": \[\]  
 },  
 "validation": {  
   "main\_star\_check": "pass",  
   "auxiliary\_star\_check": "pass",  
   "ring\_check": "pass",  
   "si\_hua\_check": "pass",  
   "overall\_status": "validated"  
 }  
}

### **12.4.5. Gợi ý mapping vào Supabase**

TAO có thể triển khai theo hai cách:

#### **Cách A — 1 bảng chart JSONB**

* `ziwei_charts`  
  * `id`  
  * `user_id`  
  * `chart_json`  
  * `version`  
  * `created_at`

Phù hợp cho:

* tốc độ build nhanh  
* dễ lưu snapshot  
* AIER đọc nguyên object

#### **Cách B — hybrid normalized**

* `ziwei_chart_metadata`  
* `ziwei_chart_palaces`  
* `ziwei_chart_main_stars`  
* `ziwei_chart_aux_stars`  
* `ziwei_chart_cycles`  
* `ziwei_chart_validation`

Phù hợp cho:

* analytics  
* querying sâu  
* dashboard / BI / audit nâng cao

### **12.4.6. Chuẩn production đề xuất**

Với TAO UZG+ hiện tại, nên dùng:

* **JSONB master chart object**  
   kèm  
* một số bảng normalized phụ nếu cần query thống kê

### **12.4.7. Định nghĩa làm việc**

**Machine-readable schema là cấu trúc dữ liệu chuẩn hóa của lá số, được thiết kế để lưu trữ, truy xuất, audit và tái sử dụng trong Supabase, TAO engine và AIER Tao mà không phụ thuộc vào ảnh hiển thị hoặc văn bản diễn giải.**

---

# **ĐOẠN CHỐT FINAL CỦA PHẦN 12**

**PHẦN 12 trong TAO UZG+ xác lập lá số như một structured chart object gồm bốn lớp: chart metadata, natal chart structure, cycle layers và validation. Chart metadata lưu nguồn gốc và điều kiện tính toán; natal chart structure lưu 12 cung, 14 chính tinh, phụ tinh, các vòng sao lớn và Tứ Hóa bản mệnh; cycle layers lưu các lớp hạn như Đại vận, Tiểu vận, Lưu niên; còn machine-readable schema là source-of-truth để nạp vào Supabase và TAO engine. Mọi giao diện hiển thị, reading layer và AIER Tao advisory đều phải đọc từ structured chart object này, không được dùng ảnh lá số hoặc văn bản tự do làm nguồn dữ liệu gốc.**

---

# **PART 12 — AUDIT & TEST SET (V3 PHẦN 13)**

## **13.1. Các điểm dễ sai**

### **13.1.1. Bản chất**

Tử Vi khi chuyển từ:

* sách cổ  
* bảng tra thủ công  
* nhiều phái truyền thừa  
* cách luận miệng  
* website dân gian  
* sang **TAO engine production**

thì sẽ phát sinh một nhóm **điểm dễ sai có tính hệ thống**.  
 Working draft ENTA TAO đã nêu rõ các điểm tranh cãi cần khóa chuẩn gồm:

* lịch âm / dương  
* tháng nhuận  
* giờ sinh  
* quy đổi múi giờ  
* an Hỏa – Linh  
* an Thiên Không.

TAO UZG+ phải xem đây là **error-critical fields**, không phải lỗi nhỏ.

---

### **13.1.2. Lịch âm / dương**

Đây là lỗi nền số 1\.

#### **Vì sao dễ sai**

* user thường nhập ngày sinh dương lịch  
* chart lại lập theo âm lịch  
* nhiều người chỉ nhớ “ngày âm” nhưng không chắc năm đó có tháng nhuận hay chưa  
* nhiều thư viện chuyển lịch cho kết quả khác nhau nếu timezone hoặc policy khác nhau

#### **Hệ quả**

Sai lịch âm / dương sẽ kéo theo sai:

* tháng âm  
* ngày âm  
* giờ chi  
* Mệnh / Thân  
* Cục  
* Tử Vi  
* toàn bộ 14 chính tinh  
* một phần phụ tinh và các vòng sao

#### **Rule TAO**

* không bao giờ dùng ngày dương trực tiếp để an sao  
* mọi input dương lịch phải đi qua **calendar normalization**  
* chart phải lưu đồng thời:  
  * `birth_solar`  
  * `birth_lunar`  
  * `calendar_conversion_version`

---

### **13.1.3. Tháng nhuận**

Đây là lỗi nền số 2, và cũng là điểm dễ gây tranh cãi giữa các website / phái.

#### **Vì sao dễ sai**

* cùng một ngày sinh dương nhưng nếu xử lý tháng nhuận khác policy thì tháng âm khác  
* tháng âm khác → Mệnh / Thân có thể khác  
* Cục có thể khác  
* Tử Vi có thể khác

#### **Chuẩn ENTA**

TAO UZG+ đã khóa policy nội bộ:

* sinh tháng nhuận từ **ngày 1–15** → tính theo **tháng đó**  
* sinh từ **ngày 16–30** → tính sang **tháng sau**

#### **Rule TAO**

* luôn lưu `is_leap_month`  
* luôn lưu `leap_month_policy`  
* không cho phép silent conversion

---

### **13.1.4. Giờ sinh**

Đây là lỗi nền số 3\.

#### **Vì sao dễ sai**

* user nhớ giờ ước lượng, không chắc đúng canh  
* giờ hiện đại 24h phải đổi sang 12 giờ địa chi  
* gần ranh đổi giờ chi thì chỉ lệch 15–30 phút cũng có thể đổi cung

#### **Hệ quả**

Sai giờ sinh có thể làm sai:

* cung Mệnh  
* cung Thân  
* Văn Xương / Văn Khúc  
* Không / Kiếp  
* một số bộ phụ tinh an theo giờ  
* Hỏa Tinh / Linh Tinh  
* và kéo lệch toàn bộ reading

#### **Rule TAO**

* phải có `hour_confidence_score`  
* phải có cảnh báo nếu thời điểm sinh ở gần ranh đổi giờ chi  
* nếu giờ sinh thiếu hoặc quá mơ hồ thì không được sinh **full official chart**

---

### **13.1.5. Quy đổi múi giờ**

Đây là lỗi hiện đại mà sách cổ không trực tiếp giải quyết, nhưng hệ số hóa bắt buộc phải xử lý.

#### **Vì sao dễ sai**

* cùng một timestamp nhưng nơi sinh khác nhau → local time khác nhau  
* local time khác → ngày âm / giờ chi có thể khác  
* đặc biệt với người sinh ở nước ngoài, sát ranh ngày hoặc có daylight-saving history

#### **Rule TAO**

* phải lưu:  
  * `timezone`  
  * `utc_offset`  
  * `location`  
* không được dùng giờ sinh “trần” mà không có local-time context nếu user sinh ngoài Việt Nam

---

### **13.1.6. An Hỏa – Linh**

Đây là lỗi chuyên môn cao, rất dễ lệch giữa các website, app, phái và tài liệu nhập môn.

#### **Vì sao dễ sai**

* Hỏa Tinh / Linh Tinh không phải loại sao chỉ nhìn tháng hay chỉ nhìn giờ  
* trong thực hành thường cần kết hợp **Chi năm sinh** và **giờ sinh**  
* nhiều nơi triển khai sai bảng nhóm tuổi hoặc sai chiều đếm

#### **Hệ quả**

Sai Hỏa – Linh làm hỏng:

* tầng sát tinh  
* tầng tai nạn / đột biến / tốc lực / bùng phát  
* đặc biệt ảnh hưởng đến các case Sát Phá Tham, Hỏa Linh giáp mệnh, Hỏa Linh nhập hạn

#### **Rule TAO**

* Hỏa – Linh phải dùng **canonical group lookup by year-branch \+ hour-branch**  
* không được suy từ vài ví dụ đơn lẻ  
* phải có test case riêng theo từng nhóm:  
  * Thân–Tý–Thìn  
  * Dần–Ngọ–Tuất  
  * Tỵ–Dậu–Sửu  
  * Hợi–Mão–Mùi

---

### **13.1.7. An Thiên Không**

Đây cũng là lỗi tranh cãi phổ biến.

#### **Vì sao dễ sai**

* nhiều nguồn lẫn Thiên Không với Địa Không  
* có nơi an theo vòng Thái Tuế  
* có nơi mô tả không rõ điểm khởi  
* dễ bị dev hoặc AI đọc nhầm vì cùng chữ “Không”

#### **Rule TAO**

* phải tách rõ:  
  * `thien_khong`  
  * `dia_khong`  
* rule production phải khóa trong canonical table  
* không cho phép dùng tên alias mơ hồ gây nhầm lẫn

---

### **13.1.8. Sai do nhiều ruleset song song**

Đây là lỗi hệ thống nguy hiểm nhất.

#### **Biểu hiện**

* local dev dùng một bảng  
* production dùng bảng khác  
* UI preview dùng công thức khác  
* AIER Tao đọc theo docs cũ  
* chart export dùng policy khác

#### **Rule TAO**

Production chỉ được có:

* **1 canonical lookup source**  
* **1 formula version active**  
* **1 leap-month policy active**  
* **1 timezone normalization pipeline active**

---

### **13.1.9. Định nghĩa làm việc**

**Các điểm dễ sai của TAO Ziwei gồm lịch âm/dương, tháng nhuận, giờ sinh, timezone conversion, an Hỏa–Linh, an Thiên Không và sự tồn tại nhiều ruleset song song; đây là nhóm error-critical fields phải được khóa bằng canonical rule và audit log.**

---

## **13.2. Cơ chế audit**

### **13.2.1. Bản chất**

Audit trong TAO UZG+ không phải chỉ là “so xem lá số có đẹp không”, mà là khả năng trả lời rõ ràng:

* chart này sinh ra từ dữ liệu gì  
* dùng công thức nào  
* dùng version nào  
* dựa trên authority nào  
* có log từng bước hay không  
* có thể reproduce lại cùng kết quả hay không

Nếu không làm được điều này, TAO không phải engine chuẩn, mà chỉ là một công cụ “lập lá số đoán mò”.

---

### **13.2.2. Chart version**

Mỗi chart phải có `chart_version`.

#### **Mục đích**

* để biết chart được sinh trong phiên bản rule nào  
* nếu core engine sửa công thức hoặc bảng tra, có thể biết chart cũ được sinh theo chuẩn nào  
* tránh việc cùng một người mà chart silently thay đổi sau mỗi lần deploy

#### **Ví dụ**

* `TAO-ZIWEI-1.0`  
* `TAO-ZIWEI-1.1`  
* `TAO-ZIWEI-2.0`

---

### **13.2.3. Formula version**

Mỗi lớp thuật toán phải có `formula_version`.

Ít nhất các phần sau phải version hóa:

* calendar conversion  
* an Mệnh / Thân  
* lập Cục  
* an 14 chính tinh  
* an phụ tinh  
* an các vòng lớn  
* an Tứ Hóa  
* khởi hạn

#### **Ví dụ**

* `MAINSTAR-ENTA-2.1`  
* `AUXSTAR-ENTA-1.3`  
* `SIHUA-ENTA-1.0`

---

### **13.2.4. Source authority**

Mỗi chart hoặc mỗi module tính toán phải ghi rõ `source_authority`.

Ít nhất phải phân tầng:

* `TranDoan-Core`  
* `ThienLuong-InterpretiveSupport`  
* `TuTangSinh-AnalyticalSupport`  
* `ENTA-CanonicalNormalization`

#### **Ý nghĩa**

Khi có mâu thuẫn, TAO biết:

* rule nào đến từ cổ thư  
* rule nào là chuẩn hóa nội bộ để triển khai kỹ thuật  
* rule nào chỉ là lớp analytic support, không được override canon

---

### **13.2.5. Calculation log**

Đây là phần quan trọng nhất.

TAO phải lưu một `calculation_log` đủ để replay lại quá trình sinh chart.

### **Log tối thiểu nên có**

#### **Input log**

* raw input  
* normalized input  
* confidence score  
* missing fields

#### **Step log**

* step 1: calendar normalization  
* step 2: an Mệnh/Thân  
* step 3: lập Cục  
* step 4: an chính tinh  
* step 5: an phụ tinh  
* step 6: an vòng lớn  
* step 7: an Tứ Hóa  
* step 8: khởi hạn

#### **Validation log**

* checks passed  
* checks failed  
* warnings  
* unresolved ambiguity

### **Ví dụ cấu trúc**

{  
 "audit": {  
   "chart\_version": "TAO-ZIWEI-1.0",  
   "formula\_versions": {  
     "calendar": "ENTA-CAL-1.0",  
     "main\_stars": "MAINSTAR-ENTA-2.1",  
     "aux\_stars": "AUXSTAR-ENTA-1.3",  
     "rings": "RING-ENTA-1.0",  
     "si\_hua": "SIHUA-ENTA-1.0",  
     "limits": "LIMIT-ENTA-1.0"  
   },  
   "source\_authority": \[  
     "TranDoan-Core",  
     "ThienLuong-Support",  
     "TuTangSinh-Support",  
     "ENTA-CanonicalNormalization"  
   \],  
   "calculation\_log": \[\],  
   "audit\_status": "pass"  
 }  
}  
---

### **13.2.6. Audit status**

Mỗi chart phải có trạng thái cuối:

* `pass`  
* `pass_with_warning`  
* `needs_review`  
* `invalid`

#### **Ví dụ**

* thiếu giờ sinh → `pass_with_warning` hoặc `needs_review`  
* tháng nhuận nhưng policy không xác nhận được → `needs_review`  
* main stars không khớp audit → `invalid`

---

### **13.2.7. Định nghĩa làm việc**

**Cơ chế audit là hệ thống version hóa và ghi log toàn bộ quá trình sinh chart, bao gồm chart version, formula version, source authority và calculation log, nhằm bảo đảm chart có thể tái lập, kiểm chứng và so sánh qua các lần cập nhật hệ thống.**

---

## **13.3. Test set đối chiếu**

### **13.3.1. Bản chất**

Muốn TAO trở thành production-grade engine, phải có **test set đối chiếu**.  
 Từ Tăng Sinh nhấn mạnh rằng học Tử Vi phải:

* dùng ví dụ thực tế  
* ghi sự kiện  
* quy nạp quy tắc  
* rồi nghiệm chứng liên tục.

Vì vậy TAO phải có một **test harness** gồm nhiều nguồn đối chiếu khác nhau, không chỉ một nguồn.

---

### **13.3.2. Đối chiếu lyso.vn**

Đây là một nguồn đối chiếu rất hữu dụng ở tầng:

* bố cục lá số  
* vị trí chính tinh  
* phụ tinh  
* các vòng  
* Tứ Hóa  
* hạn

### **Nguyên tắc**

* dùng để so chart render và chart data  
* không dùng như authority tối cao  
* nếu lệch với canon \+ ENTA core thì phải điều tra, không được tự động sửa theo website

### **Vai trò**

* regression testing  
* UI parity check  
* sanity check cho production

---

### **13.3.3. Đối chiếu tuviglobal**

Nguồn này có giá trị đối chiếu thêm, nhất là với các phần:

* Thiên Lương  
* một số logic nghiệm lý  
* presentation của vòng sao và phụ tinh

### **Nguyên tắc**

* dùng như **secondary external comparison**  
* không thay canon  
* chỉ dùng để phát hiện điểm engine đang lệch so với thực hành phổ biến

---

### **13.3.4. Đối chiếu mẫu lá số thủ công**

Đây là nguồn rất quan trọng.

TAO phải có một tập **chart handwritten / manual verified samples**:

* các lá số đã được con người an tay  
* hoặc được kiểm tra tay từ đầu đến cuối  
* dùng như **ground-truth benchmark**

### **Vai trò**

* chống lệ thuộc website  
* phát hiện lỗi cùng chiều nếu nhiều website cùng sai  
* tạo bộ chuẩn nội bộ bền hơn

---

### **13.3.5. Đối chiếu casebook nội bộ TAO**

Đây là lớp mạnh nhất về lâu dài.

TAO phải xây **casebook nội bộ** gồm:

* case ID  
* input chuẩn hóa  
* chart chuẩn  
* notes về các điểm nhạy  
* event truth  
* audit result

### **Casebook nên có**

* case NTS  
* case tháng nhuận  
* case giờ sinh ranh giới  
* case Hỏa–Linh nhạy  
* case Xương–Khúc đồng cung  
* case Khôi–Việt trục đặc biệt  
* case có Tuần/Triệt mạnh

### **Vai trò**

* regression testing  
* AIER Tao training  
* debugging  
* chứng minh product truth

---

### **13.3.6. Các loại test bắt buộc**

#### **A. Static chart test**

Test chart cố định:

* Mệnh  
* Thân  
* Cục  
* 14 chính tinh  
* phụ tinh  
* vòng lớn  
* Tứ Hóa

#### **B. Dynamic layer test**

Test:

* Đại vận  
* Tiểu vận  
* Lưu niên

#### **C. Edge case test**

Test:

* thiếu giờ sinh  
* tháng nhuận  
* timezone khác  
* gần ranh giờ chi  
* nhập lịch âm trực tiếp  
* nhập lịch dương cần convert

#### **D. Cross-source diff test**

Cùng một input:

* chart TAO  
* chart lyso  
* chart tuviglobal  
* manual truth  
* internal casebook

sau đó so:

* phần nào khớp  
* phần nào lệch  
* lệch do authority, policy hay bug

---

### **13.3.7. Kết quả test phải lưu gì**

TAO nên lưu:

* `test_case_id`  
* `expected_output`  
* `actual_output`  
* `diff_report`  
* `pass_fail_status`  
* `notes`

### **Ví dụ**

{  
 "test\_case\_id": "NTS-1984-GIAPTY-MAO",  
 "comparison\_sources": \[  
   "lyso.vn",  
   "tuviglobal",  
   "manual\_chart",  
   "tao\_casebook"  
 \],  
 "result": {  
   "main\_stars": "pass",  
   "aux\_stars": "pass\_with\_warning",  
   "rings": "pass",  
   "si\_hua": "pass",  
   "limits": "pending"  
 },  
 "diff\_report": \[\]  
}  
---

### **13.3.8. Định nghĩa làm việc**

**Test set đối chiếu là tập hợp các trường hợp kiểm tra dùng để so sánh chart output của TAO với các nguồn tham chiếu như lyso.vn, tuviglobal, lá số thủ công và casebook nội bộ, nhằm bảo đảm engine sinh đúng, ổn định và có thể phát hiện sai lệch theo từng lớp dữ liệu.**

---

# **ĐOẠN CHỐT FINAL CỦA PHẦN 13**

**PHẦN 13 trong TAO UZG+ xác lập rằng việc chuẩn hóa thuật toán Tử Vi không chỉ nằm ở công thức tính, mà còn nằm ở khả năng phát hiện sai số, version hóa rule, audit quá trình sinh chart và đối chiếu kết quả với nhiều nguồn tham chiếu. Các điểm dễ sai gồm lịch âm/dương, tháng nhuận, giờ sinh, timezone conversion, an Hỏa–Linh và an Thiên Không phải được xem là error-critical fields. Mỗi chart phải có chart version, formula version, source authority và calculation log. Đồng thời, TAO engine phải có test set đối chiếu với lyso.vn, tuviglobal, lá số thủ công và casebook nội bộ để bảo đảm output ổn định, tái lập được và đủ chuẩn production.**

---

# **PART 13 — CANONICAL TABLES (V3 PHẦN 15)**

## **15.0. Mục đích của Phụ lục**

Phụ lục là **kho bảng chuẩn (canonical tables)** dùng để:

* tra cứu nhanh,  
* khóa logic cho dev,  
* làm source-of-truth cho TAO engine,  
* hỗ trợ AIER Tao đọc chart chính xác,  
* phục vụ audit và regression testing.

Tất cả bảng trong Phụ lục phải được quản lý theo nguyên tắc:

* có **table\_version**  
* có **source\_authority**  
* có **change\_log**  
* không được để nhiều bản mâu thuẫn cùng chạy trong production

### **Nguyên tắc chung**

* phần thân tài liệu (Phần 0–14) giải thích **nguyên lý**  
* phần phụ lục (Phần 15\) chứa **bảng canonical**  
* production engine ưu tiên đọc từ **Phụ lục canonical tables**  
* không dùng prose làm source-of-truth khi đã có bảng chuẩn

---

# **NHÓM 1 — NỀN TẢNG CƠ BẢN**

## **15.1. Bảng 12 cung**

Bảng này chuẩn hóa:

* tên 12 cung nhân sự  
* thứ tự an từ Mệnh  
* tên tiếng Việt  
* canonical English label  
* short code cho database

### **Gồm:**

* Mệnh  
* Phụ Mẫu  
* Phúc Đức  
* Điền Trạch  
* Quan Lộc  
* Nô Bộc  
* Thiên Di  
* Tật Ách  
* Tài Bạch  
* Tử Tức  
* Phu Thê  
* Huynh Đệ

---

## **15.2. Bảng 10 can**

Bảng này chuẩn hóa:

* 10 Thiên Can  
* âm / dương  
* ngũ hành  
* mã index cho engine

### **Gồm:**

* Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý

Thiên Lương dùng rất mạnh tầng Can để đọc căn khí và quan hệ Can–Chi.

---

## **15.3. Bảng 12 chi**

Bảng này chuẩn hóa:

* 12 Địa Chi  
* âm / dương  
* ngũ hành  
* thứ tự index  
* tam hợp group  
* lục xung pair

### **Gồm:**

* Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi

---

## **15.4. Bảng 60 hoa giáp**

Bảng này chuẩn hóa:

* 60 cặp Can–Chi  
* thứ tự tuần hoàn  
* phân loại âm / dương  
* quan hệ Can sinh Chi / đồng hành / Chi sinh Can / Can khắc Chi / Chi khắc Can

Thiên Lương nhấn mạnh chính lớp này là nền để nhìn căn khí thuận nghịch của tuổi.

---

## **15.5. Bảng nạp âm**

Bảng này chuẩn hóa:

* nạp âm của 60 Hoa Giáp  
* ngũ hành nạp âm  
* nhóm Thiên / Địa / Nhân nếu TAO muốn dùng tầng lý giải cao hơn

Thiên Lương đi rất sâu vào ý nghĩa nạp âm và xem đây là lớp “hành chung” của tuổi.

---

## **15.6. Bảng Ngũ Hổ Độn**

Bảng dùng để:

* xác định thiên can của **cung Dần**  
* từ đó điền thuận can cho 12 cung

### **Bảng chuẩn**

* Giáp / Kỷ → Bính Dần  
* Ất / Canh → Mậu Dần  
* Bính / Tân → Canh Dần  
* Đinh / Nhâm → Nhâm Dần  
* Mậu / Quý → Giáp Dần

---

## **15.7. Bảng Ngũ Hành Cục**

Bảng dùng để chuẩn hóa:

* Cục  
* số Cục  
* hành Cục

### **Gồm:**

* Thủy nhị cục  
* Mộc tam cục  
* Kim tứ cục  
* Thổ ngũ cục  
* Hỏa lục cục

---

# **NHÓM 2 — CHÍNH TINH & GỐC TỌA ĐỘ**

## **15.8. Bảng an Tử Vi**

Bảng / thuật toán chuẩn hóa:

* input \= ngày âm \+ Cục  
* output \= vị trí sao Tử Vi

Bảng này phải tồn tại ở dạng:

* **algorithm spec**  
   hoặc  
* **lookup matrix**  
   để dev đối chiếu chéo.

---

## **15.9. Bảng an Thiên Phủ**

Bảng chuẩn hóa:

* vị trí khởi Thiên Phủ tương ứng với vị trí Tử Vi  
* không để production suy diễn mơ hồ

Vì chính PHẦN 7 đã cho thấy đây là điểm rất dễ sai nếu dùng công thức rút gọn không được kiểm nghiệm đầy đủ.

---

## **15.10. Bảng Lộc Tồn**

Bảng canonical theo Thiên Can năm sinh:

* Giáp → Dần  
* Ất → Mão  
* Bính / Mậu → Tỵ  
* Đinh / Kỷ → Ngọ  
* Canh → Thân  
* Tân → Dậu  
* Nhâm → Hợi  
* Quý → Tý.

---

# **NHÓM 3 — CÁC VÒNG NĂNG LƯỢNG**

## **15.11. Bảng Tràng Sinh**

Bảng chuẩn hóa:

* vị trí khởi Tràng Sinh theo từng Cục  
* chiều an  
* 12 trạng thái:  
  * Tràng Sinh  
  * Mộc Dục  
  * Quan Đới  
  * Lâm Quan  
  * Đế Vượng  
  * Suy  
  * Bệnh  
  * Tử  
  * Mộ  
  * Tuyệt  
  * Thai  
  * Dưỡng

Toàn Thư có mục riêng **Vòng tràng sinh**.

---

## **15.12. Bảng Thái Tuế**

Bảng chuẩn hóa:

* vị trí Thái Tuế theo Chi năm sinh  
* triển khai 12 sao theo vòng Thái Tuế

Toàn Thư có mục riêng **Chòm sao đi theo Thái Tuế**.

---

## **15.13. Bảng Tứ Hóa**

Bảng canonical theo Thiên Can:

* Giáp → Liêm / Phá / Vũ / Dương  
* Ất → Cơ / Lương / Tử / Nguyệt  
* …  
* Quý → Phá / Cự / Nguyệt / Tham

Đây là source-of-truth cho:

* Tứ Hóa bản mệnh  
* Tứ Hóa Đại Hạn  
* Tứ Hóa Lưu Niên.

---

# **NHÓM 4 — SAO PHỤ TRỢ & BẢNG PHỨC HỢP**

## **15.14. Bảng Thiên Mã**

Toàn Thư có mục riêng **Sao Thiên Mã**.

Bảng này chuẩn hóa theo **Tam hợp**:

* Dần – Ngọ – Tuất → Mã tại Thân  
* Thân – Tý – Thìn → Mã tại Dần  
* Tỵ – Dậu – Sửu → Mã tại Hợi  
* Hợi – Mão – Mùi → Mã tại Tỵ

### **Mục đích**

* dự báo dịch chuyển  
* xuất ngoại  
* thay đổi môi trường  
* động tính nghề nghiệp / vận hành

---

## **15.15. Bảng Thiên Khôi – Thiên Việt**

Toàn Thư có mục riêng **Thiên Khôi – Thiên Việt**.

Phụ lục này phải có bảng canonical để đối chiếu nhanh, thay vì chỉ mô tả trong prose.  
 Ví dụ audit anh đã khóa:

* Giáp → Khôi tại Sửu, Việt tại Mùi

---

## **15.16. Bảng Hỏa Tinh – Linh Tinh (Ma trận Giờ & Chi)**

Toàn Thư có mục riêng **Hỏa Tinh** và **Linh Tinh**.

Đây là bảng **bắt buộc phải có**, vì:

* rất dễ sai  
* nhiều website lệch nhau  
* dev không thể khóa logic nếu chỉ có văn mô tả

Bảng này phải chuẩn hóa theo:

* nhóm Chi năm sinh  
* giờ sinh

### **Ví dụ NTS**

* tuổi Tý, giờ Mão  
* Hỏa Tinh tại Tỵ  
* Linh Tinh tại Mùi

---

## **15.17. Bảng Lưu Niên Văn Tinh**

Đây là bổ sung rất hay của anh và em đồng ý phải khóa riêng.

Thiên Lương bàn rất sâu về quan hệ giữa **Lộc Tồn** và **Lưu Niên Văn Tinh**, xem LN Văn Tinh như “anh em kết nghĩa” với Lộc Tồn. Ông còn cho bảng vị trí riêng của LN Văn Tinh theo Thiên Can năm sinh.

### **Bảng chuẩn**

* Giáp → Tỵ  
* Ất → Ngọ  
* Bính / Mậu → Thân  
* Đinh / Kỷ → Dậu  
* Canh → Hợi  
* Tân → Tý  
* Nhâm → Dần  
* Quý → Mão.

### **Ghi chú engine**

Anh đã khóa logic rất rõ:

* **LN Văn Tinh đứng sau vị trí Lộc Tồn 2 cung (đếm thuận)**

### **Audit case — NTS**

* Giáp Lộc tại Dần  
* LN Văn Tinh tại Tỵ  
   → khớp lá số mẫu NTS

---

## **15.18. Bảng Thiên Lộc / Thiên Trù / các sao Lộc phụ trợ**

Thiên Lương bàn rất sâu về:

* Lộc Tồn  
* Hóa Lộc  
* Thiên Trù  
* Lưu Niên Văn Tinh.

TAO có thể gom các sao/khái niệm Lộc này thành một phụ lục chuyên để:

* phân biệt Lộc gốc  
* Lộc động  
* Lộc hưởng  
* Lộc danh  
* Lộc tiêu dùng

---

# **NHÓM 5 — TRẠNG THÁI & GIẢI ĐOÁN**

## **15.19. Bảng Đắc – Miếu – Hãm của 14 Chính Tinh**

Đây là phần **cực kỳ quan trọng** như anh nói, em đồng ý 100%.

Không có bảng này:

* AIER Tao không biết sao đang mạnh hay yếu  
* không biết sao đắc địa hay thất hãm  
* không thể luận đúng lực của sao tại từng cung

Toàn Thư có các mục:

* **Thập nhị cung chư tinh đắc địa quyết**  
* **Thập nhị cung chư tinh thất hãm quyết**  
* và nhiều chương sao riêng để bàn miếu / hãm / đắc địa.

### **Bảng này phải chứa**

* mỗi chính tinh  
* 12 cung / 12 chi  
* trạng thái:  
  * Miếu  
  * Vượng  
  * Đắc  
  * Bình  
  * Hãm

---

## **15.20. Bảng Ngũ Hành Tương Sinh – Tương Khắc**

Bảng này dùng để:

* AIER tính tương tác giữa hành sao và hành cung  
* đánh giá tương hợp / tương khắc  
* hỗ trợ reasoning layer

### **Gồm**

* Mộc sinh Hỏa …  
* Kim khắc Mộc …  
* các quan hệ sinh / khắc / hòa

---

## **15.21. Bảng Phi Hóa (Flying Stars Logic)**

Phụ lục này chuẩn hóa:

* Hóa nhập  
* Hóa xuất  
* Ngã cung  
* Tha cung  
* cách biểu diễn source → target

Từ Tăng Sinh dành nhiều chương cho **Tứ Hóa phi xuất, hóa nhập, vận thế lưu chuyển**, nên phụ lục này là rất cần thiết nếu TAO muốn build advisory layer tử tế.

---

# **NHÓM 6 — THÂN & HẠN**

## **15.22. Bảng Khởi Đại Vận**

Bảng chuẩn hóa:

* số khởi theo Cục  
* chiều thuận / nghịch theo Dương Nam / Âm Nữ / Âm Nam / Dương Nữ  
* mapping qua 12 cung

---

## **15.23. Bảng Khởi Tiểu Vận**

Bảng chuẩn hóa:

* vị trí khởi theo Chi năm sinh  
* cách chạy theo năm tuổi  
* bảng riêng cho production engine

---

## **15.24. Bảng Vị Trí Cung Thân**

Bảng tra nhanh vị trí Thân theo:

* giờ sinh  
* tổ hợp với tháng sinh nếu cần cho UI/debug

Vì cung Thân là một trục cực quan trọng, phụ lục riêng giúp dev và QA kiểm tra nhanh.

---

# **NHÓM 7 — CHUẨN HÓA & THAM CHIẾU**

## **15.25. Mẫu lá số chuẩn**

Phải có ít nhất:

* 1 lá số JSON canonical  
* 1 lá số UI render  
* 1 lá số có log calculation  
* 1 case chuẩn như **NTS**

### **Mục đích**

* QA  
* dev đối chiếu  
* AIER Tao training  
* regression testing

---

## **15.26. Từ điển thuật ngữ**

Đây là bảng chuẩn hóa ngôn ngữ để TAO engine, AIER Tao, UI và docs không dùng từ lẫn lộn.

### **Ví dụ**

* Mệnh \= Menh Palace  
* Thân \= Than Palace  
* Cục \= Elemental Cycle  
* Tứ Hóa \= Four Transformations  
* Lộc Tồn \= Stored Wealth Star  
* Hóa Kỵ \= Obstruction Transformation  
* Tuần \= Weekly Void Span  
* Triệt \= Cutoff Void Span

Từ điển nên có:

* tiếng Việt  
* English canonical label  
* short code  
* giải thích ngắn

---

# **CẤU TRÚC PHẦN 15 FINAL ĐỀ XUẤT**

## **Nhóm 1: Nền tảng**

* 15.1. Bảng 12 cung  
* 15.2. Bảng 10 can  
* 15.3. Bảng 12 chi  
* 15.4. Bảng 60 hoa giáp  
* 15.5. Bảng nạp âm  
* 15.6. Bảng Ngũ Hổ Độn  
* 15.7. Bảng Ngũ Hành Cục

## **Nhóm 2: Chính tinh & gốc**

* 15.8. Bảng an Tử Vi  
* 15.9. Bảng an Thiên Phủ  
* 15.10. Bảng Lộc Tồn

## **Nhóm 3: Các vòng năng lượng**

* 15.11. Bảng Tràng Sinh  
* 15.12. Bảng Thái Tuế  
* 15.13. Bảng Tứ Hóa

## **Nhóm 4: Sao phụ trợ & phức hợp**

* 15.14. Bảng Thiên Mã  
* 15.15. Bảng Thiên Khôi – Thiên Việt  
* 15.16. Bảng Hỏa Tinh – Linh Tinh  
* 15.17. Bảng Lưu Niên Văn Tinh  
* 15.18. Bảng Thiên Lộc / Thiên Trù / nhóm Lộc phụ trợ

## **Nhóm 5: Trạng thái & giải đoán**

* 15.19. Bảng Đắc – Miếu – Hãm  
* 15.20. Bảng Ngũ Hành Tương Sinh – Tương Khắc  
* 15.21. Bảng Phi Hóa

## **Nhóm 6: Thân & Hạn**

* 15.22. Bảng Khởi Đại Vận  
* 15.23. Bảng Khởi Tiểu Vận  
* 15.24. Bảng Vị Trí Cung Thân

## **Nhóm 7: Chuẩn hóa**

* 15.25. Mẫu lá số chuẩn  
* 15.26. Từ điển thuật ngữ

---

# **ĐOẠN CHỐT FINAL CỦA PHẦN 15**

**PHẦN 15 trong TAO UZG+ là kho bảng chuẩn canonical dùng cho production engine, Supabase, QA và AIER Tao. Ngoài các bảng nền tảng như 12 cung, 10 can, 12 chi, 60 hoa giáp, nạp âm, Ngũ Hổ Độn, Ngũ Hành Cục, phần phụ lục còn phải bổ sung các bảng chuyên biệt như Thiên Mã, Thiên Khôi–Thiên Việt, Hỏa Tinh–Linh Tinh, Lưu Niên Văn Tinh, Đắc–Miếu–Hãm, Phi Hóa, Khởi Đại Vận, Khởi Tiểu Vận và mẫu lá số chuẩn. Trong production TAO, tất cả bảng này phải được quản lý như source-of-truth lookup tables có version, authority và change log rõ ràng.**

---

# **APPENDIX A — TUẦN TRUNG VÀ TRIỆT LỘ KHÔNG VONG (SYSTEM REGULATORS)**

> **Note:** Đây là content gốc từ V2 §15.27, được move sang Appendix A theo C8 cleanup. Subsection numbering renamed 15.27.x → A.x.

## **A.1. Bản chất kỹ thuật**

Trong hệ thống **ENTA TAO**, **Tuần** và **Triệt** không được xem như hai sao thông thường, mà được định nghĩa là:

* **Filters** — bộ lọc  
* **Barriers** — rào cản  
* **Void Layers** — vùng trống năng lượng  
* **Regulators** — bộ điều tiết lực tác động của lá số

Điểm quan trọng phải khóa là:

* Tuần và Triệt **không tọa thủ bên trong một cung như chính tinh/phụ tinh**  
* mà luôn **đóng giữa hai cung liền kề**  
* và vì vậy chúng **tác động đồng thời lên cả hai cung đó**

Trong TAO engine, Tuần/Triệt phải được xử lý như:

* `void_zone`  
* `barrier_effect`  
* `regulator_layer`

chứ **không** chỉ là:

* `star_position`

### **Ý nghĩa kỹ thuật**

Tuần/Triệt có chức năng:

* chặn  
* làm chậm  
* cắt lực  
* làm mờ  
* làm đổi chiều tác dụng  
* giảm hung hoặc giảm cát tùy cấu trúc cung/sao bị chặn

### **Định nghĩa làm việc**

**Tuần Trung Không Vong và Triệt Lộ Không Vong là hai lớp điều tiết đặc biệt của lá số, đóng ở khoảng giữa hai cung, có tác dụng lọc, chặn, cắt hoặc làm đổi lực tác động của sao và cách cục trên cả hai cung mà chúng án ngữ.**

---

## **A.2. Cách an Triệt Lộ Không Vong (The Executioner)**

### **Bản chất**

**Triệt** an theo **Thiên Can năm sinh**.  
 Trong chuẩn ENTA TAO, Triệt biểu thị:

* cắt mạnh  
* ngắt đột ngột  
* chặn trực diện  
* khó khởi đầu  
* dễ bị đứt đoạn ở tiền vận

Triệt mang tính:

* **mạnh**  
* **ngắn gọn**  
* **quyết liệt**  
* **đầu đời rõ hơn cuối đời**

### **Bảng an Triệt theo Thiên Can năm sinh**

| Thiên Can năm sinh | Vị trí đóng của TRIỆT | Index cung |
| ----- | ----- | ----- |
| **Giáp – Kỷ** | **Thân – Dậu** | **7 – 8** |
| **Ất – Canh** | **Ngọ – Mùi** | **5 – 6** |
| **Bính – Tân** | **Thìn – Tỵ** | **3 – 4** |
| **Đinh – Nhâm** | **Dần – Mão** | **1 – 2** |
| **Mậu – Quý** | **Tý – Sửu** | **11 – 12** |

### **Audit case — NTS**

NTS năm **Giáp Tý**  
 → **Triệt đóng tại Thân – Dậu**  
 → tương ứng:

* **Tài Bạch**  
* **Tử Tức**

### **Rule production**

Engine phải sinh:

* `triet_left_index`  
* `triet_right_index`  
* `triet_left_branch`  
* `triet_right_branch`  
* `triet_effect_zone`

### **Định nghĩa làm việc**

**Triệt Lộ Không Vong là void-barrier an theo Thiên Can năm sinh, đóng giữa hai cung liền kề và biểu thị lực cắt, ngăn, đứt đoạn và chặn mạnh, đặc biệt rõ trong giai đoạn đầu đời.**

---

## **A.3. Cách an Tuần Trung Không Vong (The Enveloper)**

### **Bản chất**

**Tuần** an theo **Tuần của vòng Lục Thập Hoa Giáp**.  
 Trong chuẩn ENTA TAO, Tuần biểu thị:

* bao vây  
* kìm hãm  
* che phủ  
* mờ hóa  
* trì hoãn  
* tác động bền và lâu

Khác với Triệt:

* Triệt thiên về **cắt mạnh**  
* Tuần thiên về **bao lâu, mờ lâu, hãm lâu**

### **Nguyên lý**

Một chu kỳ **Thiên Can (10)** phối với **Địa Chi (12)** sẽ thừa ra **2 Chi**.  
 Hai chi thừa đó chính là nơi **Tuần** đóng.

### **Bảng an Tuần theo nhóm Giáp**

| Thuộc Tuần | Vị trí đóng của TUẦN | Index cung |
| ----- | ----- | ----- |
| **Giáp Tý** | **Tuất – Hợi** | **9 – 10** |
| **Giáp Tuất** | **Thân – Dậu** | **7 – 8** |
| **Giáp Thân** | **Ngọ – Mùi** | **5 – 6** |
| **Giáp Ngọ** | **Thìn – Tỵ** | **3 – 4** |
| **Giáp Thìn** | **Dần – Mão** | **1 – 2** |
| **Giáp Dần** | **Tý – Sửu** | **11 – 12** |

### **Audit case — NTS**

NTS tuổi **Giáp Tý**  
 → thuộc **tuần Giáp Tý**  
 → **Tuần đóng tại Tuất – Hợi**  
 → tương ứng:

* **Phu Thê**  
* **Huynh Đệ**

### **Rule production**

Engine phải sinh:

* `tuan_cycle_name`  
* `tuan_left_index`  
* `tuan_right_index`  
* `tuan_effect_zone`

### **Định nghĩa làm việc**

**Tuần Trung Không Vong là void-envelope an theo nhóm tuần của Lục Thập Hoa Giáp, đóng giữa hai cung liền kề và biểu thị lực bao vây, làm mờ, trì hoãn và kìm hãm bền bỉ của cấu trúc lá số.**

---

## **A.4. Logic tương tác (Interaction Rules for Engine)**

Đây là phần rất quan trọng để AIER Tao không đọc Tuần/Triệt một cách máy móc.

### **Rule A — Quy luật đảo chiều (Inversion Rule)**

#### **Cung / bộ sao xấu \+ Tuần/Triệt**

→ thường **bớt xấu**  
 → vì hung tính bị:

* nhốt lại  
* giảm lực  
* chậm phát  
* không bung toàn phần

#### **Cung / bộ sao tốt \+ Tuần/Triệt**

→ thường **kém tốt hơn**  
 → vì cát khí bị:

* cản trở  
* giảm tốc  
* chậm thành  
* khó hiển hiện trọn

### **Rule B — Quy luật vô chính diệu**

Cung **vô chính diệu** rất cần xét Tuần/Triệt.

Trong chuẩn TAO:

* cung vô chính diệu **không được xem là rỗng vô nghĩa**  
* nếu có Tuần/Triệt án ngữ, nó có thể đổi cách nhận lực từ đối cung và toàn bộ bố cục

Nói cách khác:

* Tuần/Triệt có thể làm cung vô chính diệu **thành nơi lọc lực**  
* không được đọc theo lối “có Tuần/Triệt là xấu” một cách đơn giản

### **Rule C — Quy luật thời gian (Time Decay Rule)**

Đây là **ENTA TAO interpretive policy**, dùng cho advisory layer nội bộ, **không tuyên bố là công thức cổ thư bất biến**.

#### **Triệt**

* khoảng **80% tác động trước 35 tuổi**  
* giảm dần còn khoảng **20% sau 35 tuổi**

#### **Tuần**

* khoảng **20% tác động trước 35 tuổi**  
* tăng dần lên khoảng **80% sau 35 tuổi**

### **Ý nghĩa**

* **Triệt**: đầu đời rõ, về sau giảm  
* **Tuần**: đầu đời mờ hơn, về sau mới thấm rõ

### **Rule D — Không override toàn bàn**

Dù có Tuần/Triệt, TAO vẫn phải xét chung với:

* chính tinh  
* phụ tinh  
* vòng sao lớn  
* Tứ Hóa  
* Đại vận / Tiểu vận / Lưu niên

Tuần/Triệt là **regulator**, không phải “án tử” cho toàn cung.

### **Định nghĩa làm việc**

**Logic tương tác của Tuần/Triệt trong TAO UZG+ được xử lý như regulator rules: có thể giảm hung, giảm cát, làm chậm phát, đổi cách ứng và phải luôn được đọc trong tương quan với chính tinh, phụ tinh, vòng sao, Tứ Hóa và các tầng hạn.**

---

## **A.5. Audit Case thực tế — Lá số Nam Tiên Sinh**

### **Dữ liệu**

* Năm sinh: **Giáp Tý**  
* Tuần: **Tuất – Hợi**  
* Triệt: **Thân – Dậu**

### **Diễn giải kỹ thuật**

#### **Triệt tại Thân – Dậu**

→ án ngữ:

* **Tài Bạch**  
* **Tử Tức**

### **Hàm nghĩa audit**

* tiền vận dễ có hiện tượng:  
  * tài chính vào ra mạnh  
  * tích lũy khó đều  
  * thành quả ban đầu dễ bị cắt hoặc phải qua trở lực mới giữ được  
* nếu production chart / life event cho thấy:  
  * thời trẻ nhiều chu kỳ xây rồi đứt  
  * tài lộc chưa giữ ổn  
     thì đây là điểm **khớp logic Triệt**

#### **Tuần tại Tuất – Hợi**

→ án ngữ:

* **Phu Thê**  
* **Huynh Đệ**

### **Hàm nghĩa audit**

* các quan hệ:  
  * đối tác  
  * cộng sự  
  * anh em / đồng hành  
     có thể:  
* đến chậm  
* rõ muộn  
* cần thời gian dài mới định hình  
* ban đầu mờ, về sau mới thật

### **Ghi chú**

Đây là **audit interpretation example**, không phải lời phán quyết tuyệt đối.  
 Nó chỉ dùng để kiểm tra sự ăn khớp giữa:

* chart structure  
* real-life casebook  
* advisory logic

---

## **A.6. Yêu cầu kiểm tra chéo (Audit Rules)**

### **Check 1 — Vị trí Triệt**

Triệt phải an **đúng theo bảng Thiên Can**, không được suy theo cảm tính.

### **Check 2 — Vị trí Tuần**

Tuần phải an **đúng theo nhóm tuần Lục Thập Hoa Giáp**, không được đoán bằng chi năm đơn lẻ.

### **Check 3 — Tác động trên 2 cung**

Tuần/Triệt luôn phải tạo:

* `left_palace`  
* `right_palace`  
* `dual_effect = true`

### **Check 4 — Tuần và Triệt có thể đồng vùng**

Có.  
 Ví dụ:

* **tuổi Giáp Tuất**  
* **Tuần** tại **Thân – Dậu**  
* **Triệt** cũng tại **Thân – Dậu**

Đây là thế:  
 **“Tuần Triệt đồng cung”**

TAO engine phải cho phép trạng thái:

* `tuan_triet_overlap = true`

### **Check 5 — Không đọc như sao độc lập**

Engine không được render Tuần/Triệt như sao point-based thông thường.  
 Phải render và lưu như:

* zone  
* span  
* barrier pair

### **Định nghĩa làm việc**

**Audit rules của Tuần/Triệt nhằm bảo đảm engine an đúng vị trí theo bảng chuẩn, xử lý đúng như dual-cung barrier zones, và cho phép nhận diện các trường hợp đặc biệt như Tuần Triệt đồng vùng.**

---

## **A.7. Machine-readable schema đề xuất**

{  
 "tuan\_triet\_layer": {  
   "triet": {  
     "source\_type": "year\_stem",  
     "year\_stem": "Giap",  
     "left\_branch": "Than",  
     "right\_branch": "Dau",  
     "left\_index": 7,  
     "right\_index": 8,  
     "effect\_type": "hard\_barrier",  
     "time\_bias": "early\_life"  
   },  
   "tuan": {  
     "source\_type": "sixty\_jiazi\_cycle",  
     "cycle\_name": "Giap Ty",  
     "left\_branch": "Tuat",  
     "right\_branch": "Hoi",  
     "left\_index": 9,  
     "right\_index": 10,  
     "effect\_type": "soft\_enveloper",  
     "time\_bias": "late\_life"  
   },  
   "validation": {  
     "dual\_zone\_check": "pass",  
     "overlap\_status": false,  
     "audit\_status": "validated"  
   }  
 }  
}  
---

# **ĐOẠN CHỐT FINAL CỦA PHỤ LỤC TUẦN – TRIỆT**

**Tuần Trung Không Vong và Triệt Lộ Không Vong là hai lớp điều tiết đặc biệt của lá số trong TAO UZG+. Triệt an theo Thiên Can năm sinh và biểu thị lực cắt, chặn, đứt đoạn mạnh, rõ ở tiền vận. Tuần an theo nhóm tuần của Lục Thập Hoa Giáp và biểu thị lực bao vây, làm mờ, trì hoãn và kìm hãm bền bỉ, rõ dần ở hậu vận. Trong production engine, Tuần/Triệt phải được xử lý như dual-cung regulator zones, không phải point-stars, và phải được đưa vào audit layer như một bộ filter/barrier cốt lõi của toàn bộ lá số.**

---

# **APPENDIX B — HỆ THỐNG LƯU NIÊN & TIỂU HẠN (ANNUAL OPERATIONAL LAYER SPEC)**

> **Note:** Đây là content gốc từ V2 "PHỤ LỤC 2", renamed → Appendix B theo block B (RENUMBER FINAL). Subsection numbering renamed 2.x → B.x.

## **B.0. Mục đích**

Phụ lục này chuẩn hóa lớp vận hành theo thời gian của TAO UZG+, gồm:

* **Bộ Sao Lưu** theo năm  
* **Đại Hạn**  
* **Tiểu Vận / Tiểu Hạn**  
* **Nguyệt Vận**  
* **Nhật Vận**  
* **Thời Vận**  
* cơ chế **Multi-Layer Overlay** giữa các lớp vận

Đây là lớp cho phép TAO engine chuyển từ:

* **lá số gốc**  
   sang  
* **dự báo vận hành theo năm / tháng / ngày / giờ**

---

## **B.1. Bộ Sao Lưu (Dynamic Stars Cluster)**

### **B.1.1. Bản chất**

Mỗi năm, khi **Thiên Can** và **Địa Chi** của năm thay đổi, hệ thống phải tự động tính lại toàn bộ lớp **sao lưu**.  
 Đây là lớp sao động của thời gian hiện hành.

### **B.1.2. Nguyên tắc**

* sao lưu **không ghi đè** sao gốc  
* sao lưu là **overlay layer**  
* mỗi sao lưu phải có:  
  * `source_year`  
  * `source_stem`  
  * `source_branch`  
  * `position_index`  
  * `position_branch`  
  * `rule_version`

### **B.1.3. Danh sách sao lưu chính**

| Tên Sao Lưu | Biến số gốc | Cách an |
| ----- | ----- | ----- |
| **Lưu Thái Tuế** | Chi của năm xem | tọa tại cung có tên trùng với Chi năm đó |
| **Lưu Lộc Tồn** | Can của năm xem | tra theo bảng Lộc Tồn |
| **Lưu Thiên Mã** | Chi của năm xem | tra theo bộ Tam Hợp |
| **Lưu Kình Dương** | Can của năm xem | đứng trước Lưu Lộc Tồn 1 cung |
| **Lưu Đà La** | Can của năm xem | đứng sau Lưu Lộc Tồn 1 cung |
| **Lưu Khôi / Việt** | Can của năm xem | tra theo bảng Khôi Việt |
| **Lưu Tứ Hóa** | Can của năm xem | tra theo bảng Tứ Hóa |

---

## **B.2. Cách an từng sao lưu**

### **B.2.1. Lưu Thái Tuế**

* Input: `current_year_branch`  
* Rule:  
  * đặt tại cung có tên trùng với Chi năm hiện tại

Ví dụ:

* năm **Ngọ** → Lưu Thái Tuế tại **Ngọ**

---

### **B.2.2. Lưu Lộc Tồn**

* Input: `current_year_stem`  
* Rule:  
  * tra theo **Bảng Lộc Tồn**

### **Bảng Lưu Lộc Tồn**

* Giáp → Dần  
* Ất → Mão  
* Bính / Mậu → Tỵ  
* Đinh / Kỷ → Ngọ  
* Canh → Thân  
* Tân → Dậu  
* Nhâm → Hợi  
* Quý → Tý

---

### **B.2.3. Lưu Thiên Mã**

* Input: `current_year_branch`  
* Rule:  
  * tra theo **tam hợp năm hiện tại**

### **Bảng Lưu Thiên Mã**

* **Dần – Ngọ – Tuất** → Mã tại **Thân**  
* **Thân – Tý – Thìn** → Mã tại **Dần**  
* **Tỵ – Dậu – Sửu** → Mã tại **Hợi**  
* **Hợi – Mão – Mùi** → Mã tại **Tỵ**

---

### **B.2.4. Lưu Kình Dương / Lưu Đà La**

Nếu vị trí **Lưu Lộc Tồn \= X**, thì:

* **Lưu Kình Dương** \= `X + 1`  
* **Lưu Đà La** \= `X - 1`

Chuẩn hóa theo vòng 12 cung:

* nếu `> 12` thì trừ 12  
* nếu `<= 0` thì cộng 12

---

### **B.2.5. Lưu Khôi / Việt**

* Input: `current_year_stem`  
* Rule:  
  * tra theo **canonical Khôi Việt table**  
* Không được suy diễn bằng prose

---

### **B.2.6. Lưu Tứ Hóa**

* Input: `current_year_stem`  
* Rule:  
  * tra theo **Bảng Thập Can Tứ Hóa**

Ví dụ:

* năm **Bính**  
  * Thiên Đồng hóa Lộc  
  * Thiên Cơ hóa Quyền  
  * Văn Xương hóa Khoa  
  * Liêm Trinh hóa Kỵ

---

## **B.3. Cách tính Lưu Niên, Đại Hạn và Tiểu Vận**

Để lập lá số hạn, TAO engine phải xác định được **3 điểm rơi năng lượng chính**:

1. **Đại Hạn**  
2. **Tiểu Vận**  
3. **Lưu Niên Tiểu Hạn**

---

## **B.4. Đại Hạn (10 năm)**

### **B.4.1. Nguyên tắc**

* chu kỳ 10 năm  
* khởi theo **Cục**  
* chiều đi theo:  
  * **Dương Nam / Âm Nữ** → thuận  
  * **Âm Nam / Dương Nữ** → nghịch

### **B.4.2. Số khởi**

* Thủy nhị cục → 2  
* Mộc tam cục → 3  
* Kim tứ cục → 4  
* Thổ ngũ cục → 5  
* Hỏa lục cục → 6

### **B.4.3. Audit case — NTS**

Nếu engine khóa đúng theo spec anh đang dùng thì:

* NTS **Dương Nam**  
* đi **thuận**  
* Đại Hạn khởi theo **Cục** của chart NTS  
* sau đó đi tiếp 10 năm / cung

### **B.4.4. Bắt buộc phải có**

Dev cần thêm bảng:

* `decade_start_age_by_cuc`  
* `decade_direction_by_polarity`

Nếu không có hai bảng này, code vẫn làm được nhưng dễ sinh lệch giữa UI và backend.

---

## **B.5. Tiểu Vận (Minor Cycle)**

### **B.5.1. Bản chất**

Tiểu Vận là lớp vận hành **1 năm theo chu kỳ nội tại của đương số**.

### **B.5.2. Nguyên lý**

* vận hành theo **vòng tròn Địa Chi**  
* điểm khởi phụ thuộc:  
  * **giới tính**  
  * **nhóm tuổi / tam hợp chi năm sinh**

### **B.5.3. Rule anh đang khóa**

* **Nam** khởi tại **Tuất**  
* **Nữ** khởi tại **Mùi**  
* áp dụng cho nhóm **Thân – Tý – Thìn**  
* **Nam thuận**, **Nữ nghịch**

### **Nhận xét kỹ thuật**

Phần này **chưa đủ để dev code production an toàn** nếu chỉ ghi như trên, vì mới khóa cho **1 nhóm tuổi**.  
 Muốn hoàn chỉnh, phải bổ sung đủ **4 nhóm tam hợp**:

#### **Bảng cần bổ sung bắt buộc**

* nhóm **Thân – Tý – Thìn**  
* nhóm **Dần – Ngọ – Tuất**  
* nhóm **Tỵ – Dậu – Sửu**  
* nhóm **Hợi – Mão – Mùi**

### **Khuyến nghị viết chuẩn**

TAO phải có thêm một bảng riêng:

**Phụ lục 2A — Bảng Khởi Tiểu Vận theo Tam hợp \+ Giới tính**

Nếu chưa có bảng này, engine chỉ mới chạy chắc cho nhóm case đã khóa trước.

---

## **B.6. Lưu Niên Tiểu Hạn (Cung Hạn năm xem)**

### **B.6.1. Nguyên tắc**

Cung hạn năm xem tọa trực tiếp tại:

* cung có tên trùng với **Chi của năm hiện tại**

Ví dụ:

* năm **2026 \= Bính Ngọ**  
   → Lưu Niên Tiểu Hạn tại **Ngọ**

### **B.6.2. Vai trò**

Đây là điểm neo năm hiện hành để:

* gắn sao lưu  
* gắn Tứ Hóa lưu niên  
* gắn trigger năm

---

## **B.7. Nguyệt Vận (Tháng)**

### **B.7.1. Mục đích**

Nguyệt Vận là lớp zoom-in theo tháng trong năm hiện tại.

### **B.7.2. Quy tắc**

1. Xác định **cung Tiểu Hạn của năm**  
2. Cung đó coi là **tháng 1**  
3. Đếm **nghịch** đến tháng sinh  
4. Từ vị trí đó, coi là **giờ Tý**  
5. Đếm **thuận** đến giờ sinh  
6. Cung dừng lại là **cung khởi tháng 1**  
7. Từ cung khởi tháng 1, đếm thuận mỗi cung là một tháng

### **Nhận xét kỹ thuật**

Phần này dùng được cho spec, nhưng dev sẽ cần thêm:

* `month_origin_formula_version`  
* `month_cycle_direction`  
* test cases cho ít nhất 4 chart mẫu

---

## **B.8. Nhật Vận (Ngày)**

### **B.8.1. Nguyên tắc**

* lấy **cung của tháng hiện tại** làm **ngày 1**  
* đếm thuận mỗi cung là một ngày

### **B.8.2. Vai trò**

* zoom-in thêm trong tháng  
* dùng để xác định ngày dễ phát tác sự kiện

---

## **B.9. Thời Vận (Giờ)**

### **B.9.1. Nguyên tắc**

* lấy **cung của ngày hiện tại** làm **giờ Tý**  
* đếm thuận mỗi cung là một giờ

### **B.9.2. Vai trò**

* lớp cảnh báo ngắn hạn nhất  
* dùng cho:  
  * giờ mở việc  
  * giờ giao dịch  
  * giờ ký kết  
  * giờ cần tránh

---

## **B.10. Audit case — NTS, năm 2026 (Bính Ngọ)**

### **Input**

* lá số gốc NTS  
* năm xem: **2026 \= Bính Ngọ**

### **Kết quả sao lưu**

#### **Lưu Thái Tuế**

* tại **Ngọ**  
* cung **Thiên Di**

#### **Lưu Lộc Tồn**

* Can **Bính**  
* Lộc tại **Tỵ**  
* cung **Nô Bộc**

#### **Lưu Thiên Mã**

* năm **Ngọ**  
* nhóm **Dần – Ngọ – Tuất**  
* Mã tại **Thân**  
* cung **Tài Bạch**

#### **Lưu Tứ Hóa (Can Bính)**

* **Lưu Hóa Lộc**: Thiên Đồng  
* **Lưu Hóa Quyền**: Thiên Cơ  
* **Lưu Hóa Khoa**: Văn Xương  
* **Lưu Hóa Kỵ**: Liêm Trinh

### **Overlay lên chart NTS**

* Thiên Đồng tại **Tuất** → Lưu Hóa Lộc tại **Tuất**  
* Thiên Cơ tại **Dần** → Lưu Hóa Quyền tại **Dần**  
* Văn Xương tại **Mùi** → Lưu Hóa Khoa tại **Mùi**  
* Liêm Trinh tại **Mùi** → Lưu Hóa Kỵ tại **Mùi**

### **Kết luận audit**

Nếu engine cho ra đúng như trên:

* `annual_dynamic_layer = pass`

---

## **B.11. Multi-Layer Overlay (Yêu cầu cho đội Dev)**

Đây là phần rất quan trọng để build được advisory thật.

TAO engine phải cho phép chồng tối thiểu **3 lớp**:

### **Lớp 1 — Base**

* chính tinh gốc  
* phụ tinh gốc  
* các vòng gốc  
* Tứ Hóa bản mệnh

### **Lớp 2 — Decade**

* Đại Hạn  
* Tứ Hóa Đại Hạn  
* cung Đại Hạn

### **Lớp 3 — Annual**

* Lưu niên  
* sao lưu  
* Lưu Tứ Hóa  
* Lưu Thái Tuế  
* Lưu Lộc Tồn  
* Lưu Mã  
* Lưu Kình / Đà

### **Lớp 4 — Optional Precision**

* Nguyệt Vận  
* Nhật Vận  
* Thời Vận

---

## **B.12. Quy tắc chồng lớp (Stacking Rules)**

### **Rule A — Không ghi đè**

Các lớp vận **không ghi đè** chart gốc.  
 Chúng chỉ tạo `overlays`.

### **Rule B — Kích hoạt trùng điệp**

Nếu một cung có hiện tượng:

* sao gốc tốt  
* gặp sao lưu tốt  
* gặp Hóa Lộc / Hóa Khoa  
* hoặc Lộc Tồn gốc trùng Lưu Lộc Tồn

thì engine phải gắn cờ:

* `double_trigger`  
* `triple_trigger`  
* hoặc tag nghiệp vụ như:  
  * `double_wealth_trigger`  
  * `double_reputation_trigger`  
  * `double_conflict_trigger`

### **Rule C — Xung đột lớp**

Nếu:

* Base tốt  
* Annual xấu  
   thì annual chỉ được hiểu là:  
* năm có nghẽn trong nền tốt  
   không được rewrite toàn bộ mệnh gốc.

### **Rule D — Priority**

Ưu tiên đọc:

1. Base truth  
2. Decade overlay  
3. Annual overlay  
4. Monthly/Daily/Hourly precision

---

## **B.13. Machine-readable schema đề xuất**

{  
 "appendix\_2\_annual\_system": {  
   "base\_year": 2026,  
   "year\_can\_chi": "Binh Ngo",  
   "dynamic\_stars": {  
     "luu\_thai\_tue": {"position": "Ngo", "index": 5},  
     "luu\_loc\_ton": {"position": "Ty", "index": 4},  
     "luu\_thien\_ma": {"position": "Than", "index": 7},  
     "luu\_kinh\_duong": {"position": "Ngo", "index": 5},  
     "luu\_da\_la": {"position": "Thin", "index": 3}  
   },  
   "annual\_si\_hua": {  
     "hoa\_loc": {"star": "Thien Dong", "position": "Tuat"},  
     "hoa\_quyen": {"star": "Thien Co", "position": "Dan"},  
     "hoa\_khoa": {"star": "Van Xuong", "position": "Mui"},  
     "hoa\_ky": {"star": "Liem Trinh", "position": "Mui"}  
   },  
   "limit\_layers": {  
     "dai\_han": {},  
     "tieu\_van": {},  
     "luu\_nien\_tieu\_han": {"position": "Ngo", "index": 5},  
     "monthly": {},  
     "daily": {},  
     "hourly": {}  
   },  
   "overlay\_flags": {  
     "double\_wealth\_trigger": false,  
     "double\_reputation\_trigger": false,  
     "double\_conflict\_trigger": false  
   },  
   "validation": {  
     "dynamic\_cluster\_check": "pass",  
     "annual\_si\_hua\_check": "pass",  
     "overlay\_check": "pass"  
   }  
 }  
}  
---

## **B.14. Kết luận kỹ thuật**

### **Trả lời thẳng câu hỏi của anh**

**Đã đủ để lập trình chưa?**

**Câu trả lời: Gần đủ, nhưng chưa khóa production 100% nếu còn thiếu bảng khởi Tiểu Vận cho đủ 4 nhóm tam hợp.**

### **Đã đủ để dev làm được**

* sao lưu năm  
* lưu Tứ Hóa  
* overlay theo năm  
* khung Nguyệt / Nhật / Thời vận  
* hệ audit

### **Còn thiếu để production chắc**

* **Bảng Khởi Tiểu Vận đầy đủ cho 4 nhóm tuổi**  
* **Bảng month/day/hour precision test cases**  
* **Priority matrix khi nhiều trigger cùng lúc**  
* **Advisory rules layer** giữa sao lưu và sao gốc

---

# **ĐOẠN CHỐT FINAL CỦA PHỤ LỤC 2**

**PHỤ LỤC 2 trong TAO UZG+ xác lập hệ thống vận hành hàng năm của lá số, bao gồm bộ sao lưu theo năm, cơ chế xác định Đại Hạn, Tiểu Vận, Lưu Niên Tiểu Hạn, và các lớp zoom-in như Nguyệt Vận, Nhật Vận, Thời Vận. Trong production engine, tất cả các sao lưu và lớp hạn này phải được xử lý như overlay layers chồng lên lá số gốc, có audit riêng, có schema machine-readable và có cơ chế nhận diện các trạng thái trùng điệp như Double Wealth Trigger hoặc Double Conflict Trigger.**

---

# **APPENDIX C — MA TRẬN ĐỘ SÁNG, LOGIC GATES & VERSION CONTROL (INDUSTRIAL-GRADE SUPPLEMENT)**

> **Note:** Đây là content gốc từ V2 "PHỤ LỤC 3", renamed → Appendix C. Subsection numbering renamed P3.x → C.x.

---

## **C.1. Mục đích**

Phụ lục 3 dùng để khóa ba lớp còn thiếu của TAO UZG+:

1. **Star Strength Layer**  
    → Miếu, Vượng, Đắc, Bình, Hãm  
2. **Logic Gates / Error Gates**  
    → timezone, giờ Tý, rollover ngày, sai số thời gian  
3. **Industrial Governance Layer**  
    → version control, priority layering, resonance trigger, audit flags

Phụ lục này được dùng cho:

* đội Dev  
* đội QA  
* Supabase schema  
* AIER Tao runtime  
* regression testing

---

## **C.2. Version Control (Khuyến nghị thêm vào PHẦN 0.3)**

### **C.2.1. Bản chất**

Tài liệu TAO UZG+ CORE phải có **version control ngay trong document**, không chỉ trong Git.

### **C.2.2. Trường bắt buộc**

Mỗi lần cập nhật spec phải lưu:

* `document_version`  
* `effective_date`  
* `updated_sections`  
* `change_summary`  
* `approved_by`  
* `runtime_status`

### **C.2.3. Format đề xuất**

{  
 "document\_control": {  
   "document\_id": "TAO-UZG-CORE-01",  
   "document\_version": "2.1.0",  
   "effective\_date": "2026-04-24",  
   "updated\_sections": \["7", "8", "9", "Appendix-3"\],  
   "change\_summary": "Updated Tuan-Triet logic, added Star Strength Matrix, added hour-Ty gate, added annual system appendix.",  
   "approved\_by": "Nam Tien Sinh",  
   "runtime\_status": "active"  
 }  
}

### **C.2.4. Quy tắc**

* không deploy production khi chưa tăng `document_version`  
* mọi thay đổi rule phải có `change_summary`  
* nếu sửa logic chart phải gắn thêm `formula_version`

### **Định nghĩa làm việc**

**Version Control là lớp quản trị tài liệu chuẩn hóa mọi thay đổi của TAO Core, giúp hệ thống giữ được tính kế thừa, khả năng rollback và khả năng đối chiếu rule khi quy mô nhân sự và sản phẩm mở rộng.**

---

## **C.3. Logic Gates còn thiếu — Xử lý sai số thời gian**

### **C.3.1. Timezone Standard**

TAO UZG+ phải dùng chuẩn:

* **IANA Timezone**  
* không chỉ dùng chuỗi GMT thô

### **Rule production**

* Việt Nam mặc định:  
  * `Asia/Ho_Chi_Minh`  
  * `UTC+07:00`  
* nếu sinh ở nước ngoài:  
  * bắt buộc lưu timezone theo nơi sinh  
* nếu sinh trong giai đoạn lịch sử đặc biệt:  
  * phải dùng `historical_timezone_resolution`

### **Fields bắt buộc**

* `birth_timezone`  
* `birth_location`  
* `normalized_local_time`  
* `timezone_resolution_mode`

### **Định nghĩa làm việc**

**Timezone Gate là lớp kiểm tra bắt buộc bảo đảm mọi thời điểm sinh được quy về giờ địa phương chính xác trước khi chuyển sang lịch âm và giờ chi.**

---

### **C.3.2. Logic xử lý giờ Tý**

Đây là “điểm chết” phổ biến của các phần mềm Tử Vi.

### **Chuẩn ENTA TAO đề xuất**

* **Giờ Tý** luôn là:  
  * `23:00 – 00:59`  
* nhưng phải tách thành hai trạng thái:

#### **Tý sớm**

* `23:00 – 23:59`

#### **Tý muộn**

* `00:00 – 00:59`

### **Rule production**

TAO phải lưu riêng:

* `hour_branch = Ty`  
* `ty_phase = early | late`

và thêm:

* `day_rollover_policy_version`

### **Khuyến nghị runtime**

Để tránh mơ hồ, TAO production nên khóa:

* **raw civil date** giữ nguyên như user input  
* **can-chi day rollover** có thể chuyển tại 23:00 theo policy nội bộ  
* không được silent convert

### **Fields bắt buộc**

* `hour_branch`  
* `ty_phase`  
* `day_rollover_applied`  
* `rollover_policy_version`

### **Định nghĩa làm việc**

**Giờ Tý trong TAO UZG+ phải được tách thành Tý sớm và Tý muộn, có policy rollover riêng và có log rõ ràng để tránh sai lệch ngày Can Chi và toàn bộ lá số.**

---

## **C.4. Ma trận độ sáng (Star Strength Matrix)**

### **C.4.1. Bản chất**

Nếu:

* vị trí sao \= **tọa độ**  
   thì:  
* Miếu / Vượng / Đắc / Bình / Hãm \= **công suất hoạt động**

Toàn Thư có hệ mục rõ về:

* **thập nhị cung chư tinh đắc địa quyết**  
* **thập nhị cung chư tinh thất hãm quyết**.

Trong TAO engine, lớp này là:

* `star_strength_layer`  
* `weighting_layer`  
* `power_coefficient_layer`

---

### **C.4.2. Định nghĩa 5 cấp độ**

#### **Miếu địa (M)**

* công suất tối đa  
* biểu hiện tinh túy nhất  
* có khả năng áp chế hung lực tốt hơn

#### **Vượng địa (V)**

* rất mạnh  
* chủ động  
* phát tác bền vững

#### **Đắc địa (Đ)**

* đủ lực  
* phát được ưu điểm  
* cần điều kiện phù trợ để bộc lộ hết

#### **Bình hòa (B)**

* trung tính  
* không tốt không xấu rõ  
* cần thêm sao / vòng / hóa để nghiêng hẳn

#### **Hãm địa (H)**

* lực thấp  
* dễ bộc lộ mặt tiêu cực  
* cần cứu giải / chế hóa / môi trường tốt để giảm hung

### **Trọng số chuẩn cho engine**

TAO production có thể khóa trọng số mặc định:

* **Miếu** \= `1.00`  
* **Vượng** \= `0.85`  
* **Đắc** \= `0.70`  
* **Bình** \= `0.50`  
* **Hãm** \= `0.20`

Đây là **ENTA TAO weighting standard**, dùng cho engine nội bộ, không tuyên bố là trọng số cổ thư. Nó chỉ là chuẩn hóa kỹ thuật để AIER Tao, ranking engine và advisory engine thống nhất.

---

### **C.4.3. Ma trận 14 chính tinh (ENTA TAO Production Matrix v1.0)**

Ghi chú: Bảng dưới đây nên được xem là **canonical production matrix nội bộ** của TAO UZG+, dùng cho engine. Vì đây là vùng dễ có khác biệt giữa các trường phái và bản sách, production phải khóa **1 matrix duy nhất** và test bằng casebook, không để nhiều matrix cùng tồn tại. Toàn Thư xác nhận có lớp đắc địa/thất hãm; còn bảng dưới là chuẩn triển khai nội bộ ENTA TAO.

| Chính tinh | Miếu địa | Vượng địa | Đắc địa | Bình hòa | Hãm địa |
| ----- | ----- | ----- | ----- | ----- | ----- |
| **Tử Vi** | Tỵ, Ngọ | Dần, Thân | Tý, Sửu, Mùi | Mão, Dậu | Thìn, Tuất, Hợi |
| **Thiên Cơ** | Thìn, Tuất | Sửu, Mùi | Tỵ, Ngọ | Hợi, Tý, Thân | Mão, Dậu, Dần |
| **Thái Dương** | Tỵ, Ngọ | Mão | Dần, Thìn | — | Mùi, Thân, Dậu, Tuất, Hợi, Tý, Sửu |
| **Vũ Khúc** | Thìn, Tuất | Sửu, Mùi | Tý, Ngọ | Dần, Thân | Mão, Dậu, Tỵ, Hợi |
| **Thiên Đồng** | Dần, Thân | Tý | Mão, Dậu, Tỵ, Hợi | Sửu, Mùi, Thìn, Tuất | Ngọ |
| **Liêm Trinh** | Dần, Thân | Thìn, Tuất | Tý, Ngọ | Sửu, Mùi, Tỵ, Hợi | Mão, Dậu |
| **Thiên Phủ** | Dần, Thân, Tý, Ngọ | Tuất | Thìn, Tỵ, Hợi | Sửu, Mùi, Dậu | Mão |
| **Thái Âm** | Dậu, Tuất, Hợi | Tý | Thân, Sửu | Mão, Thìn, Tỵ, Ngọ, Mùi | Dần |
| **Tham Lang** | Sửu, Mùi | Dần, Thân, Ngọ | Tý, Hợi | Tỵ, Mão, Dậu | Thìn, Tuất |
| **Cự Môn** | Mão, Dậu | Tý, Ngọ | Dần, Thân | Hợi, Thìn, Tuất | Sửu, Mùi, Tỵ |
| **Thiên Tướng** | Dần, Thân, Tý, Ngọ | Thìn, Tuất | Sửu, Mùi, Tỵ, Hợi | — | Mão, Dậu |
| **Thiên Lương** | Ngọ, Dần, Thân | Tý, Mão | Thìn, Tuất, Sửu, Mùi | Tỵ, Hợi, Dậu | — |
| **Thất Sát** | Dần, Thân, Tý, Ngọ | Tỵ, Hợi | Thìn, Tuất, Sửu, Mùi | Mão, Dậu | — |
| **Phá Quân** | Tý, Ngọ | Thìn, Tuất | Sửu, Mùi | Dần, Thân, Tỵ, Hợi | Mão, Dậu |

---

## **C.5. Logic điều chỉnh năng lượng (Condition Modifiers)**

### **C.5.1. Tuần / Triệt đối với sao Hãm**

Nếu:

* sao ở **Hãm địa**  
* và có **Tuần** hoặc **Triệt** án ngữ

thì engine cho phép gắn tag:

* `INVERSE_ENERGY`  
* hoặc `HAM_REDUCED`

### **Gợi ý weighting**

* sao Hãm (`0.20`) có Tuần/Triệt  
   → có thể nâng lên khoảng `0.35 – 0.45`

Đây là **ENTA TAO runtime policy**, không phải câu phú cứng. Nó dùng cho advisory engine để phản ánh quy luật “nhốt hung tính” mà Thiên Lương hay dùng khi bàn Tuần/Triệt với các bộ hung và thất hãm.

---

### **C.5.2. Thái Dương / Thái Âm theo quang độ**

Đây là hai sao cần xử lý đặc biệt vì độ sáng phụ thuộc mạnh vào vị trí.

#### **Thái Dương**

* sáng dần từ **Dần → Ngọ**  
* tối dần từ **Mùi → Sửu**

#### **Thái Âm**

* sáng dần từ **Dậu → Sửu**  
* tối dần từ **Dần → Thân**

### **Rule engine**

Ngoài trạng thái Miếu/Vượng/Đắc/Hãm, hai sao này nên có thêm:

* `luminosity_factor`

### **Gợi ý**

* rất sáng \= `1.00`  
* sáng \= `0.85`  
* mờ \= `0.55`  
* tối \= `0.25`

---

### **C.5.3. Điều chỉnh theo Ngũ hành**

Nếu:

* sao Miếu nhưng **khắc hành cung** hoặc **khắc bản mệnh**  
   → giảm khoảng **30% công lực**

Nếu:

* sao Hãm nhưng **được hành cung sinh**  
   → bớt xấu khoảng **30%**

### **Rule engine**

* `element_adjustment = ±0.30`  
* không áp dụng vượt trần `1.00`  
* không giảm dưới sàn `0.05`

---

## **C.6. Audit case — lá số NTS**

Dựa theo case NTS mà anh đang dùng để khóa production:

* **Thái Dương tại Tý**  
   → trạng thái **Hãm**  
   → khớp với logic nhiều hệ render và khớp cảm quan quang độ  
* **Thiên Cơ – Thái Âm tại Dần**  
   → đều nằm ở vùng yếu/hãm hơn so với vị trí sáng đẹp của chúng  
* **Tử Vi – Tham Lang tại Mão**  
   → Tử Vi trung bình hơn, Tham Lang không phải vùng sáng đẹp nhất

### **Nguyên tắc advisory từ audit này**

Nếu chart có nhiều sao yếu / hãm:

* **không được kết luận xấu tuyệt đối**  
* phải kiểm tiếp:  
  * Tuần / Triệt  
  * Khôi / Việt  
  * Tả / Hữu  
  * Xương / Khúc  
  * Tứ Hóa  
  * Đại vận / Lưu niên

Điều này cũng đúng tinh thần:

* **Thiên Lương**: không lấy một câu phú hay một trạng thái sao mà áp cứng toàn lá số  
* **Từ Tăng Sinh**: phải dùng hệ nhiều tầng và nghiệm chứng thực tế

---

## **C.7. Phụ lục bổ sung nên chèn vào PHẦN 15**

Em đề xuất cập nhật lại **PHẦN 15** như sau:

* **15.19. Bảng Đắc – Miếu – Hãm của 14 Chính Tinh**  
   → đổi thành **pointer section**  
* **15.19A. Phụ lục 3 — Ma trận độ sáng 14 chính tinh**  
* **15.19B. Logic điều kiện năng lượng**  
* **15.19C. Timezone Gate & Giờ Tý Gate**

Hoặc nếu anh muốn tách sạch hoàn toàn:

* giữ nguyên PHẦN 15  
* thêm riêng:  
  * **PHỤ LỤC 3 — MA TRẬN ĐỘ SÁNG & LOGIC GATES**

Cách thứ hai sạch hơn cho đội Dev.

---

# **ĐOẠN CHỐT FINAL CỦA PHỤ LỤC 3**

**Phụ lục 3 trong TAO UZG+ bổ sung lớp công nghiệp còn thiếu của tài liệu: Version Control, Timezone Gate, Giờ Tý Gate, Ma trận Đắc–Miếu–Vượng–Đắc–Bình–Hãm của 14 chính tinh, cùng các logic điều chỉnh năng lượng bởi Tuần/Triệt, quang độ Nhật–Nguyệt và tương tác Ngũ hành. Trong production engine, phụ lục này là Star Strength Layer và Logic Gate Layer dùng để tính trọng số thực của sao, tránh để AIER Tao suy luận cảm tính chỉ từ tên sao hoặc vị trí sao đơn lẻ.**

---

# **APPENDIX D — BẢNG KHỞI TIỂU VẬN ĐỦ 4 NHÓM TAM HỢP (MINOR CYCLE CANONICAL TABLE)**

> **Note:** Đây là content gốc từ V2 "PHỤ LỤC 4", renamed → Appendix D. Subsection numbering renamed P4.x → D.x.

## **D.1. Mục đích**

Phụ lục này khóa toàn bộ logic khởi **Tiểu Vận** cho đủ **4 nhóm tam hợp**, để production engine không còn chạy theo rule thiếu.

Tiểu Vận là lớp hạn **1 năm**, chạy theo vòng Địa Chi và phải được xem là:

* **minor-cycle positional layer**  
* không thay Lưu Niên  
* không thay Đại Hạn  
* mà là lớp trung gian giữa **Đại Hạn** và **Lưu Niên**.

---

## **D.2. Nguyên tắc chung**

### **D.2.1. Biến số đầu vào**

* `birth_year_branch_group`  
* `gender`  
* `target_age`

### **D.2.2. Quy tắc chiều**

* **Nam** → **đếm thuận**  
* **Nữ** → **đếm nghịch**

### **D.2.3. Quy tắc vị trí khởi**

Mỗi nhóm tam hợp có một **cặp vị trí khởi**:

* một vị trí cho **Nam**  
* một vị trí cho **Nữ**

### **D.2.4. Quy tắc vận hành**

* từ vị trí khởi  
* chạy theo vòng 12 cung  
* mỗi năm tiến 1 cung theo chiều đã khóa

---

## **D.3. Bảng khởi Tiểu Vận canonical**

Ghi chú: Vì đây là bảng production nội bộ để khóa logic hệ thống, TAO phải dùng **một bảng duy nhất** cho runtime. Nếu sau này có thay đổi, phải tăng `minor_cycle_table_version`.

| Nhóm tam hợp năm sinh | Nam khởi tại | Nữ khởi tại | Nam chiều | Nữ chiều |
| ----- | ----- | ----- | ----- | ----- |
| **Thân – Tý – Thìn** | **Tuất** | **Mùi** | Thuận | Nghịch |
| **Dần – Ngọ – Tuất** | **Thìn** | **Sửu** | Thuận | Nghịch |
| **Tỵ – Dậu – Sửu** | **Hợi** | **Thân** | Thuận | Nghịch |
| **Hợi – Mão – Mùi** | **Tỵ** | **Dần** | Thuận | Nghịch |

---

## **D.4. Quy tắc tính vị trí Tiểu Vận**

Nếu:

* `P0 = vị trí khởi`  
* `Age = tuổi đang xét`  
* `Dir = +1` với Nam, `-1` với Nữ

thì:

**Pos(Tiểu Vận) \= P0 \+ (Age \- 1\) × Dir**

Chuẩn hóa vòng 12 cung:

* nếu `> 12` thì trừ 12  
* nếu `<= 0` thì cộng 12

---

## **D.5. Audit case — NTS**

NTS:

* năm sinh **Giáp Tý**  
* thuộc nhóm **Thân – Tý – Thìn**  
* giới tính **Nam**

→ `P0 = Tuất`  
 → chiều **thuận**

Ví dụ:

* tuổi 1 → Tuất  
* tuổi 2 → Hợi  
* tuổi 3 → Tý  
* tuổi 4 → Sửu  
* …  
* tuổi 12 → Dậu  
* tuổi 13 → lại về Tuất

### **Định nghĩa làm việc**

**Bảng Khởi Tiểu Vận canonical là source-of-truth dùng để xác định vị trí Tiểu Vận theo 4 nhóm tam hợp, giới tính và tuổi, bảo đảm production engine không còn phải suy luận tay hay dùng rule thiếu.**

---

---

# **APPENDIX E — FULL CANONICAL TABLES CHO CÁC SAO PHỤ CÒN LẠI**

> **Note:** Đây là content gốc từ V2 "PHỤ LỤC 5", renamed → Appendix E. Subsection numbering renamed P5.x → E.x.

## **E.1. Mục đích**

Phụ lục này gom toàn bộ **các sao phụ và cụm sao còn lại** mà tài liệu chính đã nhắc đến nhưng production cần bảng tra riêng để dev khóa logic.

Toàn Thư xác nhận rõ các nhóm sao này là thành phần cốt lõi của hệ Tử Vi, vì có mục riêng cho:

* Văn Xương  
* Văn Khúc  
* Tả Phụ – Hữu Bật  
* Thiên Khôi – Thiên Việt  
* Lộc Tồn  
* Thiên Mã  
* Hỏa Tinh  
* Linh Tinh  
* Thiên Không – Địa Kiếp  
* Thiên Hình  
* Thiên Riêu  
* Thiên Khốc – Thiên Hư  
* Tuần và Triệt  
* chùm Lộc Tồn  
* chòm Thái Tuế  
* Long Trì – Phượng Các  
* Tam Thai – Bát Tọa  
* Hồng Loan – Thiên Hỷ  
* Thiên Đức – Nguyệt Đức.

---

## **E.2. Canonical table registry**

TAO production phải có các bảng sau:

### **Year-based tables**

* `loc_ton_table`  
* `khoi_viet_table`  
* `tai_sui_ring_table`  
* `long_phuong_table`  
* `hong_hy_table`  
* `thien_duc_nguyet_duc_table`  
* `luu_nien_van_tinh_table`  
* `thien_ma_table`

### **Month-based tables**

* `ta_huu_table`  
* `thien_hinh_table`  
* `thien_dieu_table`

### **Day-based tables**

* `tam_thai_bat_toa_table`  
* `an_quang_thien_quy_table`

### **Hour-based tables**

* `xuong_khuc_table`  
* `khong_kiep_table`  
* `hoa_linh_matrix`

### **Void / blocker tables**

* `triet_table`  
* `tuan_table`

### **Cluster tables**

* `loc_ton_cluster_table`  
* `tai_sui_cluster_table`

---

## **E.3. Bảng Thiên Mã**

### **Rule canonical**

* **Dần – Ngọ – Tuất** → Mã tại **Thân**  
* **Thân – Tý – Thìn** → Mã tại **Dần**  
* **Tỵ – Dậu – Sửu** → Mã tại **Hợi**  
* **Hợi – Mão – Mùi** → Mã tại **Tỵ**

### **Schema**

{  
 "thien\_ma\_table": {  
   "dan\_ngo\_tuat": "Than",  
   "than\_ty\_thin": "Dan",  
   "ty\_dau\_suu": "Hoi",  
   "hoi\_mao\_mui": "Ty"  
 }  
}  
---

## **E.4. Bảng Thiên Khôi – Thiên Việt**

### **Canonical production table**

| Thiên Can | Thiên Khôi | Thiên Việt |
| ----- | ----- | ----- |
| Giáp / Mậu | Sửu | Mùi |
| Ất / Kỷ | Tý | Thân |
| Bính / Đinh | Hợi | Dậu |
| Canh / Tân | Ngọ | Dần |
| Nhâm / Quý | Mão | Tỵ |

Ghi chú: nếu TAO đang dùng biến thể khác đã khóa qua audit nội bộ thì phải thống nhất **một bảng duy nhất** và gắn `khoi_viet_table_version`.

---

## **E.5. Bảng Hỏa Tinh – Linh Tinh (Ma trận giờ & chi)**

Đây là bảng khó nhất và production **bắt buộc** phải khóa bằng ma trận, không được viết prose rồi để dev tự hiểu.

### **Nhóm Thân – Tý – Thìn**

* **Hỏa Tinh**: khởi **Dần**, đếm **thuận** theo giờ  
* **Linh Tinh**: khởi **Tuất**, đếm **nghịch** theo giờ

### **Nhóm Dần – Ngọ – Tuất**

* **Hỏa Tinh**: khởi **Sửu**, đếm **thuận**  
* **Linh Tinh**: khởi **Mão**, đếm **nghịch**

### **Nhóm Tỵ – Dậu – Sửu**

* **Hỏa Tinh**: khởi **Mão**, đếm **thuận**  
* **Linh Tinh**: khởi **Tuất**, đếm **nghịch**

### **Nhóm Hợi – Mão – Mùi**

* **Hỏa Tinh**: khởi **Dậu**, đếm **thuận**  
* **Linh Tinh**: khởi **Tuất**, đếm **nghịch**

Với production, bảng này nên được lưu dưới dạng 4 ma trận riêng có index giờ 1–12.

---

## **E.6. Bảng Lưu Niên Văn Tinh**

Thiên Lương cho bảng riêng và xem LN Văn Tinh là “anh em kết nghĩa” với Lộc Tồn.

| Thiên Can | LN Văn Tinh |
| ----- | ----- |
| Giáp | Tỵ |
| Ất | Ngọ |
| Bính / Mậu | Thân |
| Đinh / Kỷ | Dậu |
| Canh | Hợi |
| Tân | Tý |
| Nhâm | Dần |
| Quý | Mão |

### **Rule rút gọn nội bộ**

* LN Văn Tinh \= đứng sau **Lộc Tồn** 2 cung, đếm thuận

---

## **E.7. Bảng Hồng Loan – Thiên Hỷ**

TAO production phải có canonical pair table.  
 Nếu chưa khóa đầy đủ bằng authority nội bộ, phải gắn:

* `status = provisional_canonical`  
* và bắt buộc test với casebook trước khi đưa live.

---

## **E.8. Bảng Thiên Đức – Nguyệt Đức**

Tương tự, phải có:

* year-based lookup  
* pair alignment  
* rule version  
* audit case

---

## **E.9. Bảng Thiên Hình – Thiên Diêu**

Tài liệu chính đã khóa công thức tháng. Production phải có bảng final để dev không cần suy lại:

### **Thiên Hình**

* khởi Dậu  
* thuận theo tháng

### **Thiên Diêu**

* khởi Sửu  
* thuận theo tháng

---

## **E.10. Bảng Tam Thai – Bát Tọa**

Tài liệu chính đã khóa công thức ngày.  
 Phụ lục phải có bảng final để QA đối chiếu nhanh.

---

## **E.11. Bảng Ân Quang – Thiên Quý**

Thiên Lương xem hai sao này đi theo quỹ đạo Xương Khúc.  
 Production phải có:

* `an_quang_formula`  
* `thien_quy_formula`  
* `dependency = xuong_khuc`

---

## **E.12. Bảng Xương – Khúc**

Tài liệu chính đã khóa:

* Xương: khởi Tuất, nghịch theo giờ  
* Khúc: khởi Thìn, thuận theo giờ

Phụ lục này phải thêm:

* audit patterns:  
  * giờ Mão → đồng cung Mùi  
  * giờ Dậu → đồng cung Sửu  
  * giờ Tý/Ngọ → xung chiếu

---

## **E.13. Bảng Không – Kiếp**

Tài liệu chính đã khóa:

* Không: khởi Hợi, nghịch theo giờ  
* Kiếp: khởi Hợi, thuận theo giờ

Phụ lục phải thêm:

* các audit patterns  
* các trường hợp đồng cung  
* các trường hợp xung chiếu

---

## **E.14. Bảng Tuần / Triệt**

Vì đã có phụ lục riêng, mục này chỉ cần:

* pointer  
* table reference  
* version

---

## **E.15. Rule bắt buộc cho mọi bảng canonical**

Mọi bảng phụ tinh phải có đủ 5 trường:

* `table_name`  
* `table_version`  
* `source_authority`  
* `runtime_status`  
* `approved_by`

### **Định nghĩa làm việc**

**Full canonical tables cho các sao phụ còn lại là tập hợp các bảng tra production-grade, dùng để khóa logic an toàn bộ sao phụ và cụm sao đặc biệt của TAO UZG+, tránh mọi suy diễn thủ công của dev hoặc AI runtime.**

---

---

# **AMENDMENT RULE**

Spec amendments require:
1. Proposal as `TAO_ZIWEI_IMPLEMENTATION_SPEC_v1_AMENDMENT_<X>.md`
2. NTS approval per LAW 21
3. Cannot contradict Canon, LAW, or Architecture
4. Algorithm changes MUST bump `formula_version` in chart audit log
5. Old version archived

---

# **TEST CASE COMMITMENT**

Per V3 §13.3, TAO production engine MUST validate against:

- `lyso.vn` reference
- `tuviglobal.com` reference
- Manual hand-cast charts (master-level reference)
- Internal TAO casebook (NTS audit case + future user audit cases)

Test set baseline ships with engine v1.0 release. CI must run regression on every formula version bump.
