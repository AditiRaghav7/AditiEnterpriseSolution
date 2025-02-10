const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "16.170.223.140", // Use the MySQL container name instead of an IP
  user: "root",
  password: "Aditi@1122",
  port: 3306,
  database: "employees_db",
  connectTimeout: 10000 // Optional: Increase timeout to 10s
});

// Open the MySQL connection
connection.connect(error => {
  if (error) {
    console.error("Database connection failed:", error);
    return;
  }
  console.log("Successfully connected to the MySQL database.");
});

module.exports = connection;
