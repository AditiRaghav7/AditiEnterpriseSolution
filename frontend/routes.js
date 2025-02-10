const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
//const connection = require('./conn');
// Backend API Base URL
const host = 'http://16.170.223.140:8000/'; 

// Render Home Page
router.get('/', (req, res) => {
    res.render('index');
});

// Render Add Data Form
router.get('/addData', (req, res) => {
    res.render('addData');
});

// Handle Add Employee Form Submission
router.post('/addData', async (req, res) => {
    const empData = {
        emp_name: req.body.emp_name,
        emp_contact: req.body.emp_contact,
        emp_add: req.body.emp_add
    };

    console.log("Sending Employee Data:", empData);

    try {
        const response = await fetch(`${host}/add`, {
            method: 'POST',
            body: JSON.stringify(empData),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        console.log("Add Employee Response:", data);

        res.render('submitResponse', { data: data });
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).send("Failed to add employee.");
    }
});

// List Employees
router.get('/list-employees', async (req, res) => {
    try {
        const response = await fetch(host, { headers: { 'Content-Type': 'application/json' } });
        const data = await response.json();
        console.log("Employee List:", data);

        res.render('listEmployee', { data: data });
    } catch (error) {
        console.error("Error fetching employee list:", error);
        res.status(500).send("Failed to retrieve employees.");
    }
});

// Delete Employee by ID
router.get('/delete/:emp_id', async (req, res) => {
    const emp_id = req.params.emp_id;
    
    try {
        // Send DELETE request to API
        const deleteResponse = await fetch(`${host}/delete/${emp_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        const deleteData = await deleteResponse.json();
        console.log("Delete Response:", deleteData);

        // Refresh the Employee List
        const response = await fetch(host, { headers: { 'Content-Type': 'application/json' } });
        const data = await response.json();

        res.render('listEmployee', { data: data });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).send("Failed to delete employee.");
    }
});

module.exports = router;
