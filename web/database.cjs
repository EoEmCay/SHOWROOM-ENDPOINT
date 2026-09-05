const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ql thuexe' 
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Kết nối thất bại: ' + err.stack);
    return;
  }
  console.log('✅ Đã kết nối thành công đến MySQL XAMPP!');
});

module.exports = connection;
