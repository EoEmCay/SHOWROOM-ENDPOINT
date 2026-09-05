<?php
/**
 * API thuê xe – chạy bằng PHP built-in server:
 *   C:\xampp\php\php.exe -S localhost:8000 "api/index.php"
 * (chạy tại thư mục "web"). Vite proxy /api -> http://localhost:8000
 */

require __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-User-Email');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$uri  = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';
$path = preg_replace('#^/(api|ktshowroom-api)#', '', $uri);
$path = '/' . trim($path, '/');
$method = $_SERVER['REQUEST_METHOD'];

function body(): array
{
    $j = json_decode(file_get_contents('php://input'), true);
    return is_array($j) ? $j : [];
}

function out($data, int $code = 200): void
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(string $msg, int $code = 400): void
{
    out(['error' => $msg], $code);
}

function userByEmail(PDO $pdo, string $email): ?array
{
    $st = $pdo->prepare("SELECT * FROM nguoidung WHERE EMAIL = :e LIMIT 1");
    $st->execute([':e' => $email]);
    return $st->fetch() ?: null;
}

function mapUser(array $r): array
{
    return [
        'maNguoiDung'   => $r['MANGUOIDUNG'],
        'fullName'      => $r['HOTEN'],
        'phone'         => $r['SĐT'],
        'email'         => $r['EMAIL'],
        'idNumber'      => $r['ANHCCCD'] ?? '',
        'driverLicense' => $r['SOBANGLAIXE'] ?? '',
        'role'          => $r['VAITRO'] ?? 'khach',
    ];
}

/** Đảm bảo bảng xe có cột PHANLOAI ('oto' | 'xemay'); tự thêm + suy luận cho dữ liệu cũ. */
function ensureCarColumns(PDO $pdo): void
{
    static $done = false;
    if ($done) return;
    $done = true;
    try {
        $has = $pdo->query(
            "SELECT COUNT(*) FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'xe' AND COLUMN_NAME = 'PHANLOAI'"
        )->fetchColumn();
        if (!$has) {
            $pdo->exec("ALTER TABLE xe ADD COLUMN `PHANLOAI` VARCHAR(10) NOT NULL DEFAULT 'oto'");
            $pdo->exec(
                "UPDATE xe SET PHANLOAI = 'xemay'
                 WHERE MAXE LIKE 'XM%'
                    OR LOAIXE LIKE '%scooter%' OR LOAIXE LIKE '%manual%' OR LOAIXE LIKE '%electric%'
                    OR LOAIXE LIKE '%xe ga%' OR LOAIXE LIKE '%xe s%' OR LOAIXE LIKE '%xe máy%'"
            );
        }
    } catch (Throwable $e) {
        // Không có quyền ALTER → bỏ qua, mặc định coi tất cả là ô tô.
    }
}

/** Đảm bảo bảng nguoidung có 2 cột phục vụ khóa đăng nhập (tự thêm nếu thiếu). */
function ensureLockoutColumns(PDO $pdo): void
{
    static $done = false;
    if ($done) return;
    $done = true;
    try {
        $pdo->exec(
            "ALTER TABLE nguoidung
               ADD COLUMN IF NOT EXISTS `SOLANDANGNHAPSAI` INT NOT NULL DEFAULT 0,
               ADD COLUMN IF NOT EXISTS `KHOADENLUC` DATETIME NULL DEFAULT NULL"
        );
    } catch (Throwable $e) {
        // Không có quyền ALTER hoặc CSDL không hỗ trợ IF NOT EXISTS → bỏ qua.
        // Đăng nhập vẫn chạy, nhưng tính năng khóa sẽ không hoạt động.
    }
}

/** Xác thực admin qua header X-User-Email (đủ dùng cho đồ án). */
function requireAdmin(PDO $pdo): array
{
    $email = trim($_SERVER['HTTP_X_USER_EMAIL'] ?? '');
    if ($email === '') fail('Chưa đăng nhập.', 401);
    $u = userByEmail($pdo, $email);
    if (!$u || ($u['VAITRO'] ?? '') !== 'admin') fail('Không có quyền quản trị.', 403);
    return $u;
}

try {
    $pdo = db();
    ensureCarColumns($pdo);

    // ---------- HỆ THỐNG ----------
    if ($path === '/' || $path === '/health') {
        out(['ok' => true, 'service' => 'ktshowroom-api', 'time' => date('c')]);
    }

    // ---------- TÀI KHOẢN / PHÂN QUYỀN ----------
    if ($path === '/auth/login' && $method === 'POST') {
        $b = body();
        $email = trim($b['email'] ?? '');
        $pass  = (string) ($b['password'] ?? '');
        if ($email === '') fail('Thiếu email');

        ensureLockoutColumns($pdo);
        $u = userByEmail($pdo, $email);
        if (!$u) {
            // Tự tạo tài khoản khách khi đăng nhập lần đầu
            $ma = nextCode($pdo, 'nguoidung', 'MANGUOIDUNG', 'ND');
            $pdo->prepare(
                "INSERT INTO nguoidung (MANGUOIDUNG, HOTEN, `SĐT`, EMAIL, NGAYTAO, VAITRO, MATKHAU)
                 VALUES (:ma, :ht, '', :em, NOW(), 'khach', :pw)"
            )->execute([
                ':ma' => $ma,
                ':ht' => ucfirst(explode('@', $email)[0]),
                ':em' => $email,
                ':pw' => $pass !== '' ? password_hash($pass, PASSWORD_DEFAULT) : null,
            ]);
            $u = userByEmail($pdo, $email);
        } else {
            // --- Chống dò mật khẩu: sai 3 lần → khóa tài khoản 30 phút ---
            // So sánh hạn khóa bằng SQL để tránh lệch múi giờ giữa PHP và MySQL.
            $lc = $pdo->prepare(
                "SELECT (KHOADENLUC IS NOT NULL AND KHOADENLUC > NOW()) AS dang_khoa,
                        TIMESTAMPDIFF(MINUTE, NOW(), KHOADENLUC) AS phut
                 FROM nguoidung WHERE MANGUOIDUNG = :id"
            );
            $lc->execute([':id' => $u['MANGUOIDUNG']]);
            $lc = $lc->fetch();
            if ($lc && (int) $lc['dang_khoa'] === 1) {
                $conLai = max(1, (int) $lc['phut'] + 1);
                fail("Tài khoản đang bị khóa do nhập sai mật khẩu quá nhiều lần. Vui lòng thử lại sau khoảng {$conLai} phút.", 423);
            }

            $needPass = ($u['VAITRO'] === 'admin') || !empty($u['MATKHAU']);
            if ($needPass && !password_verify($pass, (string) $u['MATKHAU'])) {
                $soLanSai = (int) ($u['SOLANDANGNHAPSAI'] ?? 0) + 1;
                if ($soLanSai >= 3) {
                    $pdo->prepare(
                        "UPDATE nguoidung SET SOLANDANGNHAPSAI = 0,
                                KHOADENLUC = DATE_ADD(NOW(), INTERVAL 30 MINUTE)
                         WHERE MANGUOIDUNG = :id"
                    )->execute([':id' => $u['MANGUOIDUNG']]);
                    fail('Bạn đã nhập sai mật khẩu 3 lần. Tài khoản bị tạm khóa 30 phút.', 423);
                }
                $pdo->prepare("UPDATE nguoidung SET SOLANDANGNHAPSAI = :n WHERE MANGUOIDUNG = :id")
                    ->execute([':n' => $soLanSai, ':id' => $u['MANGUOIDUNG']]);
                fail('Sai email hoặc mật khẩu. Còn ' . (3 - $soLanSai) . ' lần thử trước khi tài khoản bị khóa 30 phút.', 401);
            }

            // Đăng nhập đúng → xóa bộ đếm sai + mở khóa (nếu có)
            if ((int) ($u['SOLANDANGNHAPSAI'] ?? 0) !== 0 || !empty($u['KHOADENLUC'])) {
                $pdo->prepare("UPDATE nguoidung SET SOLANDANGNHAPSAI = 0, KHOADENLUC = NULL WHERE MANGUOIDUNG = :id")
                    ->execute([':id' => $u['MANGUOIDUNG']]);
            }
        }
        out(['user' => mapUser($u)]);
    }

    if ($path === '/auth/register' && $method === 'POST') {
        $b = body();
        $email = trim($b['email'] ?? '');
        $fullName = trim($b['fullName'] ?? '');
        $pass = (string) ($b['password'] ?? '');
        if ($email === '' || $fullName === '') fail('Thiếu họ tên hoặc email');
        if (userByEmail($pdo, $email)) fail('Email đã được đăng ký.', 409);

        $ma = nextCode($pdo, 'nguoidung', 'MANGUOIDUNG', 'ND');
        $pdo->prepare(
            "INSERT INTO nguoidung (MANGUOIDUNG, HOTEN, `SĐT`, EMAIL, ANHCCCD, NGAYTAO, SOBANGLAIXE, VAITRO, MATKHAU)
             VALUES (:ma, :ht, :sdt, :em, :cccd, NOW(), :gplx, 'khach', :pw)"
        )->execute([
            ':ma' => $ma,
            ':ht' => $fullName,
            ':sdt' => trim($b['phone'] ?? ''),
            ':em' => $email,
            ':cccd' => trim($b['idNumber'] ?? ''),
            ':gplx' => trim($b['driverLicense'] ?? ''),
            ':pw' => $pass !== '' ? password_hash($pass, PASSWORD_DEFAULT) : null,
        ]);
        out(['user' => mapUser(userByEmail($pdo, $email))], 201);
    }

    // ---------- DANH MỤC ----------
    if ($path === '/cars' && $method === 'GET') {
        out(['cars' => $pdo->query(
            "SELECT MAXE id, TENXE name, LOAIXE type, PHANLOAI phanLoai, MAU color, BIENSOXE plate,
                    TRANGTHAIXE status, GIATHEONGAY rentPriceDay, TIENDATCOC deposit,
                    HINHANH image, MOTA description
             FROM xe ORDER BY MAXE"
        )->fetchAll()]);
    }

    if ($path === '/services' && $method === 'GET') {
        out(['services' => $pdo->query(
            "SELECT MADV id, TENDV name, GIADV price, MOTA description
             FROM dichvu WHERE TRANGTHAI = 1 ORDER BY GIADV, MADV"
        )->fetchAll()]);
    }

    // ---------- ĐƠN THUÊ (KHÁCH) ----------
    if ($path === '/orders' && $method === 'GET') {
        $email = trim($_GET['email'] ?? '');
        if ($email === '') fail('Thiếu tham số email');

        $st = $pdo->prepare(
            "SELECT d.MADATXE maDatXe, d.MAXE maXe, x.TENXE tenXe, x.HINHANH hinhAnh,
                    x.LOAIXE loaiXe, x.MAU mau,
                    d.TRANGTHAIDATXE trangThai, d.NGAYNHAN ngayNhan, d.NGAYTRA ngayTra,
                    d.NGAYTAODON ngayTaoDon, d.TONGTIEN tongTien,
                    t.PTTT pttt, t.TTTT trangThaiThanhToan, t.SOTIENTRA soTienTra, t.TGTT thoiGianThanhToan
             FROM datxe d
             JOIN xe x        ON x.MAXE = d.MAXE
             JOIN nguoidung n ON n.MANGUOIDUNG = d.MANGUOIDUNG
             LEFT JOIN thanhtoan t ON t.MADATXE = d.MADATXE
             WHERE n.EMAIL = :email
             ORDER BY d.NGAYTAODON DESC, d.MADATXE DESC"
        );
        $st->execute([':email' => $email]);
        $orders = $st->fetchAll();
        attachServices($pdo, $orders);
        out(['orders' => $orders]);
    }

    if ($path === '/orders/cancel' && $method === 'POST') {
        $b = body();
        $ma = trim($b['maDatXe'] ?? '');
        $email = trim($b['email'] ?? '');
        if ($ma === '' || $email === '') fail('Thiếu maDatXe hoặc email');

        $st = $pdo->prepare(
            "UPDATE datxe d JOIN nguoidung n ON n.MANGUOIDUNG = d.MANGUOIDUNG
             SET d.TRANGTHAIDATXE = 'Đã hủy'
             WHERE d.MADATXE = :ma AND n.EMAIL = :email
               AND d.TRANGTHAIDATXE IN ('Chờ duyệt', 'Đã xác nhận')"
        );
        $st->execute([':ma' => $ma, ':email' => $email]);
        if ($st->rowCount() === 0) fail('Không hủy được (đơn không tồn tại, không thuộc bạn, hoặc đã xử lý).', 409);
        out(['ok' => true, 'maDatXe' => $ma, 'trangThai' => 'Đã hủy']);
    }

    if ($path === '/orders' && $method === 'POST') {
        $b = body();
        $carId = trim($b['carId'] ?? '');
        $c = is_array($b['customer'] ?? null) ? $b['customer'] : [];
        $email = trim($c['email'] ?? '');
        $fullName = trim($c['fullName'] ?? '');
        if ($carId === '' || $email === '' || $fullName === '') {
            fail('Thiếu carId hoặc thông tin khách hàng (fullName, email).');
        }

        $xe = $pdo->prepare("SELECT MAXE, GIATHEONGAY, TIENDATCOC FROM xe WHERE MAXE = :id");
        $xe->execute([':id' => $carId]);
        $xe = $xe->fetch();
        if (!$xe) fail("Không tìm thấy xe '$carId' trong CSDL.", 404);

        $rentDays = (float) ($b['rentDays'] ?? 1);
        if ($rentDays <= 0) $rentDays = 1;
        try {
            $nhan = !empty($b['startDate']) ? new DateTime($b['startDate'] . ' 08:00:00') : new DateTime();
        } catch (Exception $e) {
            $nhan = new DateTime();
        }
        $hours = max(1, (int) round($rentDays * 24));
        $tra = (clone $nhan)->modify("+$hours hours");

        // Dịch vụ bổ sung
        $wantIds = [];
        foreach (($b['services'] ?? []) as $s) {
            $id = is_array($s) ? ($s['madv'] ?? $s['id'] ?? null) : $s;
            if ($id) $wantIds[(string) $id] = (int) (is_array($s) ? ($s['soLuong'] ?? 1) : 1) ?: 1;
        }
        $services = [];
        $serviceTotal = 0;
        if ($wantIds) {
            $in = implode(',', array_fill(0, count($wantIds), '?'));
            $q = $pdo->prepare("SELECT MADV, TENDV, GIADV FROM dichvu WHERE TRANGTHAI = 1 AND MADV IN ($in)");
            $q->execute(array_keys($wantIds));
            foreach ($q->fetchAll() as $row) {
                $sl = max(1, $wantIds[$row['MADV']]);
                $serviceTotal += $row['GIADV'] * $sl;
                $services[] = ['madv' => $row['MADV'], 'ten' => $row['TENDV'], 'gia' => (int) $row['GIADV'], 'soLuong' => $sl];
            }
        }

        $rentTotal = (int) round((float) ($b['rentTotal'] ?? ($b['totalPrice'] ?? $xe['GIATHEONGAY'] * ceil($rentDays))));
        $tongTien = $rentTotal + $serviceTotal;
        $datCoc = (int) round((float) ($b['deposit'] ?? $xe['TIENDATCOC'] ?? 0));
        $pttt = trim($b['paymentMethod'] ?? '') ?: 'Chuyển khoản';
        $daTra = !empty($b['paid']);

        $pdo->beginTransaction();
        try {
            $u = userByEmail($pdo, $email);
            if (!$u) {
                $maNguoiDung = nextCode($pdo, 'nguoidung', 'MANGUOIDUNG', 'ND');
                $pdo->prepare(
                    "INSERT INTO nguoidung (MANGUOIDUNG, HOTEN, `SĐT`, EMAIL, ANHCCCD, NGAYTAO, SOBANGLAIXE, VAITRO)
                     VALUES (:ma, :ht, :sdt, :em, :cccd, NOW(), :gplx, 'khach')"
                )->execute([
                    ':ma' => $maNguoiDung, ':ht' => $fullName, ':sdt' => trim($c['phone'] ?? ''),
                    ':em' => $email, ':cccd' => trim($c['idNumber'] ?? ''), ':gplx' => trim($c['driverLicense'] ?? ''),
                ]);
            } else {
                $maNguoiDung = $u['MANGUOIDUNG'];
                $pdo->prepare(
                    "UPDATE nguoidung SET HOTEN = :ht, `SĐT` = :sdt, SOBANGLAIXE = :gplx WHERE MANGUOIDUNG = :ma"
                )->execute([
                    ':ht' => $fullName, ':sdt' => trim($c['phone'] ?? ''),
                    ':gplx' => trim($c['driverLicense'] ?? ''), ':ma' => $maNguoiDung,
                ]);
            }

            $maDatXe = nextCode($pdo, 'datxe', 'MADATXE', 'DX');
            $pdo->prepare(
                "INSERT INTO datxe (MADATXE, MANGUOIDUNG, MAXE, TRANGTHAIDATXE, NGAYNHAN, NGAYTRA, NGAYTAODON, TONGTIEN)
                 VALUES (:ma, :nd, :xe, 'Chờ duyệt', :nhan, :tra, NOW(), :tong)"
            )->execute([
                ':ma' => $maDatXe, ':nd' => $maNguoiDung, ':xe' => $carId,
                ':nhan' => $nhan->format('Y-m-d H:i:s'), ':tra' => $tra->format('Y-m-d H:i:s'), ':tong' => $tongTien,
            ]);

            if ($services) {
                $insDv = $pdo->prepare(
                    "INSERT INTO chitietdv (MADATXE, MADV, SOLUONG, GIATHOIDIEMDAT) VALUES (:dx, :dv, :sl, :gia)"
                );
                foreach ($services as $s) {
                    $insDv->execute([':dx' => $maDatXe, ':dv' => $s['madv'], ':sl' => $s['soLuong'], ':gia' => $s['gia']]);
                }
            }

            $maThanhToan = nextCode($pdo, 'thanhtoan', 'MATHANHTOAN', 'TT');
            $pdo->prepare(
                "INSERT INTO thanhtoan (MATHANHTOAN, MADATXE, PTTT, MAGIAODICH, TTTT, SOTIENTRA, TGTT)
                 VALUES (:ma, :dx, :pttt, :mgd, :ttt, :sotien, :tg)"
            )->execute([
                ':ma' => $maThanhToan, ':dx' => $maDatXe, ':pttt' => $pttt,
                ':mgd' => $daTra ? ('TXN' . date('ymdHis')) : null,
                ':ttt' => $daTra ? 'Đã thanh toán' : 'Chưa thanh toán',
                ':sotien' => $daTra ? $datCoc : 0,
                ':tg' => $daTra ? date('Y-m-d H:i:s') : null,
            ]);

            $pdo->commit();
        } catch (Throwable $e) {
            $pdo->rollBack();
            throw $e;
        }

        out([
            'ok' => true, 'maDatXe' => $maDatXe, 'trangThai' => 'Chờ duyệt',
            'ngayNhan' => $nhan->format('Y-m-d H:i:s'), 'ngayTra' => $tra->format('Y-m-d H:i:s'),
            'tienThue' => $rentTotal, 'tienDichVu' => $serviceTotal, 'tongTien' => $tongTien,
            'datCoc' => $datCoc, 'services' => $services,
        ], 201);
    }

    // ---------- QUẢN TRỊ ----------
    if ($path === '/admin/orders' && $method === 'GET') {
        requireAdmin($pdo);
        $st = $pdo->query(
            "SELECT d.MADATXE maDatXe, d.MAXE maXe, x.TENXE tenXe, x.HINHANH hinhAnh,
                    n.MANGUOIDUNG maNguoiDung, n.HOTEN hoTen, n.EMAIL email, n.`SĐT` sdt,
                    d.TRANGTHAIDATXE trangThai, d.NGAYNHAN ngayNhan, d.NGAYTRA ngayTra,
                    d.NGAYTAODON ngayTaoDon, d.TONGTIEN tongTien,
                    t.PTTT pttt, t.TTTT trangThaiThanhToan, t.SOTIENTRA soTienTra
             FROM datxe d
             JOIN xe x        ON x.MAXE = d.MAXE
             JOIN nguoidung n ON n.MANGUOIDUNG = d.MANGUOIDUNG
             LEFT JOIN thanhtoan t ON t.MADATXE = d.MADATXE
             ORDER BY d.NGAYTAODON DESC, d.MADATXE DESC"
        );
        $orders = $st->fetchAll();
        attachServices($pdo, $orders);
        out(['orders' => $orders]);
    }

    if ($path === '/admin/orders/status' && $method === 'POST') {
        requireAdmin($pdo);
        $b = body();
        $ma = trim($b['maDatXe'] ?? '');
        $tt = trim($b['trangThai'] ?? '');
        $allowed = ['Chờ duyệt', 'Đã xác nhận', 'Đang thuê', 'Đã hoàn thành', 'Đã hủy'];
        if ($ma === '' || !in_array($tt, $allowed, true)) fail('Trạng thái không hợp lệ.');
        $st = $pdo->prepare("UPDATE datxe SET TRANGTHAIDATXE = :tt WHERE MADATXE = :ma");
        $st->execute([':tt' => $tt, ':ma' => $ma]);
        if ($st->rowCount() === 0) fail('Không tìm thấy đơn.', 404);
        out(['ok' => true, 'maDatXe' => $ma, 'trangThai' => $tt]);
    }

    if ($path === '/admin/cars' && $method === 'GET') {
        requireAdmin($pdo);
        out(['cars' => $pdo->query(
            "SELECT x.MAXE maXe, x.TENXE tenXe, x.LOAIXE loaiXe, x.PHANLOAI phanLoai, x.MAU mau, x.BIENSOXE bienSo,
                    x.ODO odo, x.TRANGTHAIXE trangThai, x.GIATHEONGAY giaNgay, x.TIENDATCOC datCoc,
                    x.HINHANH hinhAnh, x.MOTA moTa,
                    (SELECT COUNT(*) FROM datxe d WHERE d.MAXE = x.MAXE) soDon
             FROM xe x ORDER BY x.MAXE"
        )->fetchAll()]);
    }

    if ($path === '/admin/cars/status' && $method === 'POST') {
        requireAdmin($pdo);
        $b = body();
        $ma = trim($b['maXe'] ?? '');
        $tt = trim($b['trangThai'] ?? '');
        $allowed = ['Sẵn sàng', 'Đang thuê', 'Bảo trì'];
        if ($ma === '' || !in_array($tt, $allowed, true)) fail('Trạng thái xe không hợp lệ.');
        $st = $pdo->prepare("UPDATE xe SET TRANGTHAIXE = :tt WHERE MAXE = :ma");
        $st->execute([':tt' => $tt, ':ma' => $ma]);
        if ($st->rowCount() === 0) fail('Không tìm thấy xe.', 404);
        out(['ok' => true, 'maXe' => $ma, 'trangThai' => $tt]);
    }

    // Thêm mới / cập nhật xe. Không có maXe => tạo mới (tự sinh mã X0xx).
    if ($path === '/admin/cars/save' && $method === 'POST') {
        requireAdmin($pdo);
        $b       = body();
        $maXe    = trim($b['maXe'] ?? '');
        $ten     = trim($b['tenXe'] ?? '');
        $loai    = trim($b['loaiXe'] ?? '');
        $mau     = trim($b['mau'] ?? '');
        $bienSo  = trim($b['bienSo'] ?? '');
        $odo     = max(0, (int) ($b['odo'] ?? 0));
        $giaNgay = (int) ($b['giaNgay'] ?? 0);
        $datCoc  = max(0, (int) ($b['datCoc'] ?? 0));
        $hinh    = trim($b['hinhAnh'] ?? '');
        $moTa    = trim($b['moTa'] ?? '');
        $tt      = trim($b['trangThai'] ?? 'Sẵn sàng');
        $phan    = ($b['phanLoai'] ?? 'oto') === 'xemay' ? 'xemay' : 'oto';
        if (!in_array($tt, ['Sẵn sàng', 'Đang thuê', 'Bảo trì'], true)) $tt = 'Sẵn sàng';
        if ($ten === '' || $loai === '' || $mau === '' || $bienSo === '') {
            fail('Thiếu thông tin xe: tên, loại, màu, biển số là bắt buộc.');
        }
        if ($giaNgay <= 0) fail('Giá thuê theo ngày phải lớn hơn 0.');

        $params = [
            ':ten' => $ten, ':loai' => $loai, ':phan' => $phan, ':mau' => $mau, ':bien' => $bienSo, ':odo' => $odo,
            ':tt' => $tt, ':gia' => $giaNgay, ':coc' => $datCoc,
            ':hinh' => $hinh !== '' ? $hinh : null, ':mota' => $moTa !== '' ? $moTa : null,
        ];

        if ($maXe === '') {
            $maXe = nextCode($pdo, 'xe', 'MAXE', 'X');
            $params[':ma'] = $maXe;
            $pdo->prepare(
                "INSERT INTO xe (MAXE, TENXE, LOAIXE, PHANLOAI, MAU, BIENSOXE, ODO, TRANGTHAIXE, GIATHEONGAY, TIENDATCOC, HINHANH, MOTA)
                 VALUES (:ma, :ten, :loai, :phan, :mau, :bien, :odo, :tt, :gia, :coc, :hinh, :mota)"
            )->execute($params);
            out(['ok' => true, 'maXe' => $maXe, 'created' => true], 201);
        }

        $params[':ma'] = $maXe;
        $st = $pdo->prepare(
            "UPDATE xe SET TENXE=:ten, LOAIXE=:loai, PHANLOAI=:phan, MAU=:mau, BIENSOXE=:bien, ODO=:odo,
                    TRANGTHAIXE=:tt, GIATHEONGAY=:gia, TIENDATCOC=:coc, HINHANH=:hinh, MOTA=:mota
             WHERE MAXE=:ma"
        );
        $st->execute($params);
        if ($st->rowCount() === 0) {
            $exists = $pdo->prepare("SELECT 1 FROM xe WHERE MAXE = :ma");
            $exists->execute([':ma' => $maXe]);
            if (!$exists->fetchColumn()) fail('Không tìm thấy xe để cập nhật.', 404);
        }
        out(['ok' => true, 'maXe' => $maXe, 'created' => false]);
    }

    if ($path === '/admin/cars/delete' && $method === 'POST') {
        requireAdmin($pdo);
        $maXe = trim(body()['maXe'] ?? '');
        if ($maXe === '') fail('Thiếu mã xe.');

        $soDon = $pdo->prepare("SELECT COUNT(*) FROM datxe WHERE MAXE = :ma");
        $soDon->execute([':ma' => $maXe]);
        if ((int) $soDon->fetchColumn() > 0) {
            fail('Xe đang có đơn thuê nên không thể xóa. Hãy chuyển trạng thái sang "Bảo trì".', 409);
        }
        // Gỡ tham chiếu ở lịch lái thử (cột MAXE cho phép NULL) rồi xóa xe
        $pdo->prepare("UPDATE lichlaithu SET MAXE = NULL WHERE MAXE = :ma")->execute([':ma' => $maXe]);
        $st = $pdo->prepare("DELETE FROM xe WHERE MAXE = :ma");
        $st->execute([':ma' => $maXe]);
        if ($st->rowCount() === 0) fail('Không tìm thấy xe.', 404);
        out(['ok' => true, 'maXe' => $maXe, 'deleted' => true]);
    }

    if ($path === '/admin/payments' && $method === 'GET') {
        requireAdmin($pdo);
        out(['payments' => $pdo->query(
            "SELECT t.MATHANHTOAN maThanhToan, t.MADATXE maDatXe, t.PTTT pttt, t.MAGIAODICH maGiaoDich,
                    t.TTTT trangThai, t.SOTIENTRA soTien, t.TGTT thoiGian,
                    n.HOTEN hoTen, x.TENXE tenXe
             FROM thanhtoan t
             JOIN datxe d     ON d.MADATXE = t.MADATXE
             JOIN nguoidung n ON n.MANGUOIDUNG = d.MANGUOIDUNG
             JOIN xe x        ON x.MAXE = d.MAXE
             ORDER BY t.TGTT DESC, t.MATHANHTOAN DESC"
        )->fetchAll()]);
    }

    fail('Không tìm thấy endpoint: ' . $method . ' ' . $path, 404);
} catch (Throwable $e) {
    out(['error' => 'Lỗi máy chủ', 'detail' => $e->getMessage()], 500);
}

/** Gắn danh sách dịch vụ vào từng đơn (theo tham chiếu). */
function attachServices(PDO $pdo, array &$orders): void
{
    if (!$orders) return;
    $ids = array_column($orders, 'maDatXe');
    $in = implode(',', array_fill(0, count($ids), '?'));
    $q = $pdo->prepare(
        "SELECT c.MADATXE, c.SOLUONG, c.GIATHOIDIEMDAT, dv.MADV, dv.TENDV
         FROM chitietdv c JOIN dichvu dv ON dv.MADV = c.MADV
         WHERE c.MADATXE IN ($in)"
    );
    $q->execute($ids);
    $byOrder = [];
    foreach ($q->fetchAll() as $r) {
        $byOrder[$r['MADATXE']][] = [
            'madv' => $r['MADV'], 'ten' => $r['TENDV'],
            'soLuong' => (int) $r['SOLUONG'], 'gia' => (int) $r['GIATHOIDIEMDAT'],
        ];
    }
    foreach ($orders as &$o) {
        $o['services'] = $byOrder[$o['maDatXe']] ?? [];
    }
}
