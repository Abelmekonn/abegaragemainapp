// import express 
const express = require('express');
// import rout from express
const router = express.Router();
// import employee controller
const employeeController = require('../controllers/employee.controller');
// create a route to handel the add employee request on post
router.post('/api/employee', employeeController.createEmployee);
// export route
module.exports = router;