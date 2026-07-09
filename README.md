# Dự án kết thúc môn

Đây là thư mục dự án kết thúc môn **Thiết kế Web** của sinh viên **Vòng Tiến Phong**. Đề tài xây dựng website demo bán thiết bị điện tử và các sản phẩm công nghệ với tên cửa hàng **PhongTech**.

Dự án được tổ chức theo cấu trúc rõ ràng nhằm phục vụ quá trình phát triển website, quản lý mã nguồn, triển khai trên GitHub Pages và nộp sản phẩm cuối kỳ.

## 1. Cấu trúc thư mục dự án

```text
.
├── .git/
├── assets/
│   ├── images/
│   │   └── products/
│   └── thesis/
│       └── template_thesis.dotx
├── css/
│   └── style.css
├── html/
│   ├── phones.html
│   ├── laptops.html
│   ├── tablets.html
│   ├── headphones.html
│   ├── chargers.html
│   ├── speakers.html
│   ├── product.html
│   ├── cart.html
│   ├── login.html
│   └── contact.html
├── js/
│   ├── data.js
│   ├── common.js
│   ├── home.js
│   ├── category.js
│   ├── product.js
│   ├── cart.js
│   └── auth.js
├── index.html
├── SOURCES.md
└── README.md
```

## 2. Mô tả các thư mục và tập tin

### `.git/`

Thư mục quản lý mã nguồn của Git. Thư mục này được tạo tự động khi dự án được khởi tạo hoặc clone từ GitHub.

Sinh viên không chỉnh sửa trực tiếp nội dung bên trong thư mục này.

---

### `assets/`

Thư mục dùng để lưu trữ các tài nguyên dùng chung cho dự án, gồm:

- Hình ảnh sản phẩm
- Biểu tượng
- Tài liệu
- Mẫu báo cáo
- Các tập tin hỗ trợ khác

Ảnh sản phẩm của website được lưu tại:

```text
assets/images/products/
```

Các hình ảnh được lưu chủ yếu ở định dạng **WebP** để giảm dung lượng, tăng tốc độ tải trang và giữ chất lượng hiển thị đồng đều.

Mẫu báo cáo kết thúc môn được cung cấp tại:

```text
assets/thesis/template_thesis.dotx
```

Sinh viên sử dụng tập tin này để thực hiện báo cáo kết thúc môn theo đúng mẫu quy định.

---

### `css/`

Thư mục chứa tập tin định dạng giao diện website.

```text
css/style.css
```

Tập tin `style.css` được sử dụng để:

- Thiết kế bố cục website
- Phối màu xanh nhạt cho giao diện PhongTech
- Định dạng chữ, nút bấm, thẻ sản phẩm và biểu mẫu
- Tạo hiệu ứng chuyển động khi tương tác
- Thiết kế giao diện responsive cho máy tính, máy tính bảng và điện thoại
- Tùy chỉnh các thành phần được hỗ trợ bởi Bootstrap

---

### `html/`

Thư mục chứa các trang HTML thành phần của website ngoài trang chủ `index.html`.

```text
html/phones.html
html/laptops.html
html/tablets.html
html/headphones.html
html/chargers.html
html/speakers.html
html/product.html
html/cart.html
html/login.html
html/contact.html
```

Chức năng của từng trang:

- `phones.html`: hiển thị danh sách điện thoại
- `laptops.html`: hiển thị danh sách laptop
- `tablets.html`: hiển thị danh sách máy tính bảng
- `headphones.html`: hiển thị các loại tai nghe có dây và không dây
- `chargers.html`: hiển thị sạc, cáp sạc và phụ kiện nguồn
- `speakers.html`: hiển thị các sản phẩm loa
- `product.html`: hiển thị chi tiết và thông số sản phẩm
- `cart.html`: hiển thị giỏ hàng và thực hiện đặt hàng mô phỏng
- `login.html`: đăng nhập và đăng ký tài khoản mô phỏng
- `contact.html`: hiển thị thông tin cửa hàng và biểu mẫu liên hệ

---

### `js/`

Thư mục chứa các tập tin JavaScript dùng để quản lý dữ liệu và xử lý tương tác trên website.

```text
js/data.js
js/common.js
js/home.js
js/category.js
js/product.js
js/cart.js
js/auth.js
```

Chức năng của từng tập tin:

- `data.js`: lưu thông tin 24 sản phẩm thật thuộc 6 danh mục
- `common.js`: xử lý các thành phần dùng chung như thanh điều hướng, chân trang, tìm kiếm và số lượng sản phẩm trong giỏ hàng
- `home.js`: hiển thị danh mục, sản phẩm nổi bật và sản phẩm ưu đãi trên trang chủ
- `category.js`: hiển thị, tìm kiếm, lọc và sắp xếp sản phẩm theo từng danh mục
- `product.js`: đọc mã sản phẩm từ URL và hiển thị thông tin chi tiết
- `cart.js`: thêm, xóa, thay đổi số lượng, tính tổng tiền và lưu đơn hàng mô phỏng
- `auth.js`: xử lý đăng nhập, đăng ký và lưu tài khoản mô phỏng

Các tập tin JavaScript được sử dụng để:

- Xử lý sự kiện người dùng
- Thao tác với DOM
- Tìm kiếm sản phẩm
- Lọc theo thương hiệu và mức giá
- Sắp xếp theo tên, giá hoặc đánh giá
- Quản lý giỏ hàng
- Kiểm tra dữ liệu biểu mẫu
- Lưu giỏ hàng, tài khoản và đơn hàng bằng `localStorage`

---

### `index.html`

Đây là tập tin trang chủ của website PhongTech và được đặt riêng ở thư mục gốc của dự án.

Trang chủ giới thiệu cửa hàng, hiển thị các danh mục sản phẩm, sản phẩm nổi bật, sản phẩm ưu đãi và cung cấp đường dẫn đến các trang chức năng khác.

Khi bật GitHub Pages, tập tin `index.html` sẽ là trang mặc định được hiển thị đầu tiên khi người dùng truy cập vào website.

---

### `SOURCES.md`

Tập tin ghi lại nguồn tham khảo về tên sản phẩm, thông số kỹ thuật, giá tham khảo và hình ảnh được sử dụng trong website demo.

---

### `README.md`

Tập tin mô tả thông tin tổng quan về dự án, cấu trúc thư mục, công nghệ sử dụng, cách triển khai và yêu cầu nộp bài.

## 3. Yêu cầu thực hiện dự án

Website PhongTech được xây dựng nhằm vận dụng kiến thức đã học về **HTML, CSS, JavaScript và Bootstrap** vào một sản phẩm demo hoàn chỉnh.

Dự án hiện có các nội dung và chức năng chính sau:

- Có cấu trúc thư mục rõ ràng.
- Có trang chủ `index.html` đặt tại thư mục gốc.
- Có 10 trang HTML thành phần trong thư mục `html/`.
- Sử dụng HTML5 để xây dựng nội dung và cấu trúc website.
- Sử dụng CSS3 để định dạng giao diện.
- Sử dụng Bootstrap 5 và Bootstrap Icons thông qua CDN.
- Sử dụng JavaScript thuần để xử lý tương tác.
- Có 24 sản phẩm thật thuộc 6 danh mục: điện thoại, laptop, máy tính bảng, tai nghe, sạc và loa.
- Dữ liệu sản phẩm được quản lý trong tập tin `js/data.js`.
- Có chức năng tìm kiếm, lọc và sắp xếp sản phẩm.
- Có trang xem chi tiết và thông số sản phẩm.
- Có chức năng thêm, xóa và thay đổi số lượng sản phẩm trong giỏ hàng.
- Có chức năng tính tổng tiền và đặt hàng mô phỏng.
- Có chức năng đăng nhập và đăng ký mô phỏng.
- Có biểu mẫu liên hệ và kiểm tra dữ liệu nhập.
- Giỏ hàng, tài khoản và đơn hàng được lưu bằng `localStorage`.
- Giao diện responsive, có thể hiển thị trên nhiều kích thước màn hình.
- Các tài nguyên như hình ảnh, tài liệu và biểu tượng được lưu trong thư mục `assets/`.
- Báo cáo kết thúc môn được thực hiện theo mẫu tại `assets/thesis/template_thesis.dotx`.

Đây là website frontend demo, không sử dụng cơ sở dữ liệu, backend, cổng thanh toán hoặc trang quản trị. Sản phẩm hiện được quản lý trực tiếp trong tập tin `js/data.js`.

## 4. Triển khai website bằng GitHub Pages

Dự án cần được đẩy lên GitHub và bật GitHub Pages để công bố website trực tuyến.

Trước khi triển khai, sinh viên có thể chạy dự án trên máy tính bằng Visual Studio Code và Live Server:

1. Mở thư mục dự án bằng Visual Studio Code.
2. Cài extension **Live Server**.
3. Nhấn chuột phải vào tập tin `index.html`.
4. Chọn **Open with Live Server**.
5. Kiểm tra các trang, hình ảnh, CSS, JavaScript và chức năng giỏ hàng.

Sau khi đẩy mã nguồn lên GitHub:

1. Mở repository của dự án.
2. Chọn **Settings**.
3. Chọn **Pages**.
4. Trong mục **Build and deployment**, chọn nhánh chứa mã nguồn.
5. Chọn thư mục gốc `/root`.
6. Nhấn **Save** và chờ GitHub tạo liên kết website.

Liên kết website GitHub Pages thường có dạng:

```text
https://<ten-tai-khoan-github>.github.io/<ten-repository>/
```

Ví dụ theo tên dự án:

```text
https://<ten-tai-khoan-github>.github.io/PhongTech/
```

Sau khi bật GitHub Pages, sinh viên cần kiểm tra website hoạt động đúng trước khi nộp bài.

## 5. Nộp bài trên hệ thống LMS

Sau khi hoàn thành dự án, sinh viên cần thực hiện các bước sau:

1. Kiểm tra lại toàn bộ mã nguồn và cấu trúc thư mục.
2. Đẩy toàn bộ mã nguồn dự án PhongTech lên GitHub.
3. Bật GitHub Pages cho repository.
4. Kiểm tra website trên máy tính và điện thoại.
5. Kiểm tra các chức năng tìm kiếm, lọc, xem chi tiết, giỏ hàng, đăng nhập và liên hệ.
6. Sao chép liên kết website GitHub Pages.
7. Vào hệ thống LMS.
8. Dán liên kết website vào mục **"Kết thúc môn"**.
9. Nộp báo cáo kết thúc môn theo đúng mẫu được cung cấp.

## 6. Nội dung cần nộp

Sinh viên cần nộp đầy đủ các nội dung sau:

- Liên kết website PhongTech đã triển khai bằng GitHub Pages.
- Liên kết repository chứa mã nguồn dự án trên GitHub.
- Mã nguồn HTML, CSS, JavaScript và các tài nguyên liên quan.
- Báo cáo kết thúc môn theo mẫu `template_thesis.dotx`.
- Tập tin `SOURCES.md` ghi nguồn thông tin và hình ảnh sản phẩm.
- Các tài nguyên liên quan khác nếu có.

## 7. Lưu ý

- Không xóa tập tin `README.md`.
- Không xóa hoặc thay đổi vị trí mẫu báo cáo trong thư mục `assets/thesis/`.
- Giữ tập tin `index.html` ở thư mục gốc để GitHub Pages nhận đúng trang chủ.
- Các trang HTML còn lại được đặt trong thư mục `html/`.
- Cần kiểm tra kỹ đường dẫn tương đối giữa `index.html`, thư mục `html/`, hình ảnh, CSS và JavaScript.
- Không đổi tên tập tin hoặc thư mục nếu chưa cập nhật lại toàn bộ đường dẫn liên quan.
- Website phải hiển thị được khi truy cập bằng liên kết GitHub Pages.
- Dữ liệu sản phẩm được quản lý trong `js/data.js`, không có trang quản trị riêng.
- Dữ liệu trong `localStorage` chỉ được lưu trên trình duyệt đang sử dụng và không đồng bộ giữa các thiết bị.
- Chức năng đăng nhập, đặt hàng và thanh toán chỉ mang tính mô phỏng phục vụ đồ án.
- Giá sản phẩm là giá tham khảo tại thời điểm xây dựng demo.
- Liên kết website cần được cung cấp vào đúng mục **"Kết thúc môn"** trên hệ thống LMS.

## 8. Thông tin sinh viên

```text
Họ và tên: Vòng Tiến Phong
Mã số sinh viên: 110125130
Lớp: DA25TTB
Tên đề tài: Thiết kế website bán thiết bị điện tử và các sản phẩm công nghệ
Tên website demo: PhongTech
Liên kết GitHub repository: https://github.com/TKW-22526/final-test-web-design-ex-KazeKazeeee.git
Liên kết GitHub Pages: Chưa cập nhật
```

### Thông tin cửa hàng demo

```text
Tên cửa hàng: PhongTech
Địa chỉ: Phường Trà Vinh, Vĩnh Long
Số điện thoại: 0898 053 037
Email: tienphongvong@gmail.com
Tên hiển thị: TiếnPhongMasachika
```
