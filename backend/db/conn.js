const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "my-mysql-container",
  user: "root",
  password: "Aditi@1122",
  port: "3306",
  database: "employees_db"
});

// Open the MySQL connection with better error handling
connection.connect(error => {
  if (error) {
    console.error("❌ MySQL Connection Failed:", error.message);
    process.exit(1); // Stop execution if the connection fails
  }
  console.log("✅ Successfully connected to the MySQL database.");
});

// Export the connection for use in other files
module.exports = connection;
