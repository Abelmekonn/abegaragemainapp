const express = require("express");
const {createCustomer,getAllCustomers,updateCustomer}=require("../controllers/customer.controller")
const middleware=require("../middlewares/auth.middleware");
const { route } = require("./employee.routes");
const router = express.Router();

// add customer to db
router.post("/api/customer", createCustomer);
// fecth data 
router.get("/api/customers", [middleware.verifyToken,middleware.isAdmin], getAllCustomers);
// update route 
router.put("/api/customer/update", [middleware.verifyToken, middleware.isAdmin], updateCustomer);


module.exports = router;
