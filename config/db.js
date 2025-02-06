const mysql = require("mysql2/promise");

// MySQL Connection Configuration
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root", // Replace with your MySQL password
  database: "student_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

