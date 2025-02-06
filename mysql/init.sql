-- Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS employees_db;

-- Use the created database
USE employees_db;

-- Create the EMPLOYEES table
CREATE TABLE IF NOT EXISTS EMPLOYEES (
    emp_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    emp_name VARCHAR(255) NOT NULL,
    emp_contact VARCHAR(10),
    emp_add VARCHAR(255) DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
