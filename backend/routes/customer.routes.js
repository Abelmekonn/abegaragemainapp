const express = require("express");
const {createCustomer,getAllCustomers}=require("../controllers/customer.controller")
const middleware=require("../middlewares/auth.middleware");
const { route } = require("./employee.routes");
const router = express.Router();

router.post("/api/customer", [middleware.verifyToken,middleware.isAdmin], createCustomer);
router.get("/api/customer", [middleware.verifyToken,middleware.isAdmin], getAllCustomers);

