const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "16.170.223.140",
  user: "root",
  password: "Aditi@1122",
  port: "3306",
  database: "employees_db"
});

// Open the MySQL connection
connection.connect(error => {
  if (error) {
    console.error("Error connecting to MySQL:", error.message);
    return;
  }
  console.log("Successfully connected to the MySQL database.");
});

module.exports = connection;
