<?php
// Tạo kết nối PDO dùng chung cho toàn bộ API
function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $cfg = require __DIR__ . '/config.php';
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        $cfg['host'],
        $cfg['port'],
        $cfg['dbname'],
        $cfg['charset']
    );

    try {
        $pdo = new PDO($dsn, $cfg['user'], $cfg['pass'], [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'error'   => 'Không kết nối được MySQL. Kiểm tra XAMPP đã bật MySQL và đã import ql_thuexe.sql chưa.',
            'detail'  => $e->getMessage(),
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    return $pdo;
}

/**
 * Sinh mã kiểu tiền tố + số thứ tự 0-padded, ví dụ DX031, ND031, TT031.
 * $len là tổng độ dài phần số (mặc định 3).
 */
function nextCode(PDO $pdo, string $table, string $column, string $prefix, int $len = 3): string
{
    $sql = "SELECT MAX(CAST(SUBSTRING(`$column`, " . (strlen($prefix) + 1) . ") AS UNSIGNED)) AS m
            FROM `$table` WHERE `$column` LIKE :p";
    $st = $pdo->prepare($sql);
    $st->execute([':p' => $prefix . '%']);
    $max = (int) ($st->fetchColumn() ?: 0);
    return $prefix . str_pad((string) ($max + 1), $len, '0', STR_PAD_LEFT);
}
