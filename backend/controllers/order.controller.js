const { error } = require('console');
const orderService = require('../services/order.service');

async function createOrder(req, res, next) {
    try {
        const orderData = req.body;
        const { message, orderHash, orderId } = await orderService.createOrder(orderData);
        res.status(201).json({
            status: "order created",
            message,
            orderHash,
            orderId,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: "Failed to create order",
        });
    }
}

async function getAllOrders(req, res, next) {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: "Failed to retrieve orders",
        });
    }
}

async function getOrderById(req, res, next) {
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            res.status(404).json({
                error: "Order not found",
            });
        } else {
            res.status(200).json(order);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: "Failed to retrieve order",
        });
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
};