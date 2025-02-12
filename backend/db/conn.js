const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "Aditi@1122",
  port: 3306,   
  database: "employees_db"
});

// open the MySQL connection
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error.message);  // Log more detailed error
    process.exit(1);  // Exit if connection fails
  }
  console.log("Successfully connected to the MySQL database.");
});

module.exports = connection;
