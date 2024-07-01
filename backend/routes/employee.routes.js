const express = require("express");
const { createEmployee,getAllEmployees } = require("../controllers/employee.controller");

const middleware=require("../middlewares/auth.middleware")
const router = express.Router();

// Route to create employee
router.post("/api/employee", [middleware.verifyToken,middleware.isAdmin], createEmployee);
// Route to get all employees
router.get("/api/employees", [middleware.verifyToken, middleware.isAdmin], getAllEmployees);

module.exports = router;
