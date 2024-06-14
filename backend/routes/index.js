const express = require("express");
const router = express.Router();

// Import other routes
const employeeRoute = require("./employee.routes");

// Add employee router
router.use(employeeRoute);

module.exports = router;
