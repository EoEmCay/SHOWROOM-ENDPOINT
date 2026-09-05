<?php
/**
 * Tạo CSDL và nạp dữ liệu từ ql_thuexe.sql (file dump KHÔNG có lệnh CREATE DATABASE).
 * Chạy 1 lần:  C:\xampp\php\php.exe api/setup_db.php
 */

$cfg = require __DIR__ . '/config.php';
$sqlFile = __DIR__ . '/../ql_thuexe.sql';

if (!is_file($sqlFile)) {
    fwrite(STDERR, "Không tìm thấy $sqlFile\n");
    exit(1);
}

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$my = new mysqli($cfg['host'], $cfg['user'], $cfg['pass'], '', $cfg['port']);
$my->set_charset('utf8mb4');

$db = $my->real_escape_string($cfg['dbname']);
$my->query("CREATE DATABASE IF NOT EXISTS `{$cfg['dbname']}` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci");
$my->select_db($cfg['dbname']);
echo "✔ Database `{$cfg['dbname']}` đã sẵn sàng\n";

$sql = file_get_contents($sqlFile);

// mysqli::multi_query xử lý được cả file dump (nhiều câu lệnh, comment điều kiện)
if ($my->multi_query($sql)) {
    do {
        if ($res = $my->store_result()) {
            $res->free();
        }
    } while ($my->more_results() && $my->next_result());
}
if ($my->errno) {
    fwrite(STDERR, "Lỗi khi nạp SQL: {$my->error}\n");
    exit(1);
}

// Kiểm tra nhanh
foreach (['xe', 'nguoidung', 'datxe', 'thanhtoan'] as $t) {
    $c = $my->query("SELECT COUNT(*) n FROM `$t`")->fetch_assoc()['n'];
    echo "  - $t: $c dòng\n";
}
echo "✔ Nạp dữ liệu xong.\n";
