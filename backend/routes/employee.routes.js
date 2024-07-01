const express = require("express");
const { createEmployee,getAllEmployees,updateEmployee} = require("../controllers/employee.controller");

const middleware=require("../middlewares/auth.middleware")
const router = express.Router();

// Route to create employee
router.post("/api/employee", [middleware.verifyToken,middleware.isAdmin], createEmployee);
// route to update employee
router.put('/api/employee/:id', [middleware.verifyToken, middleware.isAdmin], updateEmployee);
// Route to get all employees
router.get("/api/employees", [middleware.verifyToken, middleware.isAdmin], getAllEmployees);

module.exports = router;
