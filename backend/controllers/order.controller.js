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

const getOrderById = async (req, res) => {
    const orderId = req.params.id; // Ensure this matches your route parameter name
    if (!orderId) {
        return res.status(400).send('Order ID must be provided');
    }

    try {
        const order = await orderService.getOrderById(orderId);
        res.json(order);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).send('Internal Server Error');
    }
};


const getOrderByCustomerId = async (req, res) => {
    const customerId = req.params.customerId;

    if (!customerId) {
        return res.status(400).send('Customer ID must be provided');
    }

    try {
        const orders = await orderService.getOrdersByCustomerId(customerId);
        res.json(orders);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByCustomerId,
};
