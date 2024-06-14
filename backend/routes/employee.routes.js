const express = require("express");
const { createEmployee } = require("../controllers/employee.controller");
const router = express.Router();

// Route to create employee
router.post("/employees", createEmployee);

module.exports = router;
