const express = require("express");
const middleware=require("../middlewares/auth.middleware")
const router = express.Router();
const {createOrder} =require('../controllers/order.controller')

router.post("/api/order",[middleware.verifyToken,middleware.isAdmin],createOrder)

module.exports = router;