const express = require("express");
const { createEmployee } = require("../controllers/employee.controller");

const middleware=require("../middlewares/auth.middleware")
const router = express.Router();

// Route to create employee
router.post("/api/employee", [middleware.verifyToken,middleware.isAdmin],createEmployee);

module.exports = router;
