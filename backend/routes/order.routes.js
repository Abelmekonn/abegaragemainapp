const express = require("express");
const middleware = require("../middlewares/auth.middleware");
const router = express.Router();
const { createOrder, getAllOrders, getOrderById } = require('../controllers/order.controller');

router.post("/api/order", [middleware.verifyToken, middleware.isAdmin], createOrder);
router.get("/api/orders", [middleware.verifyToken, middleware.isAdmin], getAllOrders);
router.get("/api/order/:id", [middleware.verifyToken, middleware.isAdmin], getOrderById);

module.exports = router;