# Hướng dẫn thiết lập EmailJS cho form liên hệ

## Giới thiệu

EmailJS là một dịch vụ cho phép bạn gửi email trực tiếp từ JavaScript phía client mà không cần bất kỳ server backend nào. Đây là một giải pháp tuyệt vời cho các website tĩnh như portfolio của bạn.

## Các bước thiết lập

### 1. Tạo tài khoản EmailJS

1. Truy cập [https://www.emailjs.com/](https://www.emailjs.com/) và đăng ký một tài khoản miễn phí
2. Đăng nhập vào tài khoản của bạn

### 2. Kết nối dịch vụ email

1. Trong dashboard, chọn **Email Services** từ menu bên trái
2. Nhấp vào **Add New Service**
3. Chọn nhà cung cấp email của bạn (Gmail, Outlook, Yahoo, v.v.)
4. Nhập thông tin đăng nhập của bạn để kết nối
5. Đặt tên cho dịch vụ và ghi nhớ **Service ID** (bạn sẽ cần nó sau)

### 3. Tạo mẫu email

1. Trong dashboard, chọn **Email Templates** từ menu bên trái
2. Nhấp vào **Create New Template**
3. Thiết kế mẫu email của bạn với các biến sau:
   - `{{name}}` - Tên người gửi
   - `{{email}}` - Email của người gửi
   - `{{subject}}` - Chủ đề email
   - `{{message}}` - Nội dung tin nhắn
4. Lưu mẫu và ghi nhớ **Template ID**

### 4. Cập nhật mã trong main.js

Tìm đoạn mã sau trong file `main.js`:

```javascript
// EmailJS initialization
emailjs.init("YOUR_USER_ID"); // Thay "YOUR_USER_ID" bằng User ID từ EmailJS

// Trong hàm gửi email
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Thay thế các phần sau:

1. **YOUR_USER_ID**: Tìm User ID của bạn trong mục "Account" > "API Keys" trong dashboard EmailJS
2. **YOUR_SERVICE_ID**: Service ID từ dịch vụ email bạn đã tạo ở Bước 2
3. **YOUR_TEMPLATE_ID**: Template ID từ mẫu email bạn đã tạo ở Bước 3

## Kiểm tra

1. Truy cập trang portfolio của bạn
2. Điền form liên hệ và gửi
3. Kiểm tra email của bạn để xem tin nhắn đã được gửi chưa

## Lưu ý

- EmailJS cung cấp gói miễn phí với giới hạn 200 email mỗi tháng
- Đảm bảo không chia sẻ các khóa API của bạn với người khác
- Nếu bạn cần gửi nhiều email hơn, bạn có thể nâng cấp lên gói trả phí

---

Chúc bạn thành công!
