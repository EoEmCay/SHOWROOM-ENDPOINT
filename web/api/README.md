# Backend PHP – Đơn thuê xe

API nhỏ bằng PHP + PDO, ghi vào CSDL MySQL `ql thuexe` (XAMPP).
Dùng cho luồng **Thuê xe trực tuyến** và **Quản lý đơn thuê của tôi** trong usecase.

## 1. Yêu cầu
- XAMPP: bật **Apache** (không bắt buộc) và **MySQL**.
- PHP của XAMPP: `C:\xampp\php\php.exe`

## 2. Tạo CSDL + nạp dữ liệu (chạy 1 lần)
File `ql_thuexe.sql` KHÔNG có lệnh `CREATE DATABASE`, nên chạy script sau để tạo
database `ql thuexe` và nạp toàn bộ bảng/dữ liệu:

```powershell
cd "D:\XayDungWeb\FINALEXAM\Web thuê xe (1)\web"
C:\xampp\php\php.exe api\setup_db.php
```

(Hoặc trong phpMyAdmin: tạo database tên `ql thuexe` rồi Import `ql_thuexe.sql`.)

## 3. Chạy backend
```powershell
cd "D:\XayDungWeb\FINALEXAM\Web thuê xe (1)\web"
C:\xampp\php\php.exe -S localhost:8000 "api\index.php"
```
Giữ cửa sổ này mở. Kiểm tra: mở http://localhost:8000/health

## 4. Chạy frontend (cửa sổ khác)
```powershell
npm run dev
```
Vite đã cấu hình proxy `/api` → `http://localhost:8000` (xem `vite.config.ts`).

## 5. Endpoint

| Method | Path | Mô tả |
|---|---|---|
| GET  | `/api/health` | kiểm tra sống |
| GET  | `/api/cars` | danh sách xe từ bảng `xe` |
| POST | `/api/orders` | tạo đơn: upsert `nguoidung` theo email → `datxe` (Chờ duyệt) + `thanhtoan` |
| GET  | `/api/orders?email=...` | đơn thuê của 1 người dùng (join `xe`, `thanhtoan`) |
| POST | `/api/orders/cancel` | body `{maDatXe,email}` → đổi trạng thái `Đã hủy` (chỉ khi Chờ duyệt/Đã xác nhận) |

### Body `POST /api/orders`
```json
{
  "carId": "X001",
  "customer": { "fullName": "...", "idNumber": "...", "phone": "...", "email": "...", "address": "...", "driverLicense": "..." },
  "startDate": "2026-09-10",
  "rentDays": 3,
  "totalPrice": 3600000,
  "deposit": 5000000,
  "contractNo": "HĐ-RENT-...",
  "paymentMethod": "Chuyển khoản",
  "paid": true
}
```

## Cấu hình
Sửa user/pass MySQL trong `api/config.php` nếu cần (mặc định `root` / không mật khẩu).
