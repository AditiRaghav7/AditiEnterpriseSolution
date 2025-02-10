const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "16.16.201.88",
  user: "root",
  password: "Aditi@1122",
  port: "3306",
  database: "employees_db"
});

// Open the MySQL connection with better error handling
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the MYSQL database.");
});


// Export the connection for use in other files
module.exports = connection;
