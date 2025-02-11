const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "13.53.119.4", // ✅ Use Docker container name
  user: "root",
  password: "Aditi@1122",
  port: "3306",
  database: "employees_db"
});

// Open the MySQL connection
connection.connect(error => {
  if (error) {
    console.error("MySQL Connection Failed:", error.message); // Log error
    process.exit(1); // Exit process if connection fails
  }
  console.log("Successfully connected to the MYSQL database.");
});

module.exports = connection;
