const conn = require("../config/db.config");
const bcrypt = require('bcrypt');
// function to create order

async function createOrder(order) {
    let createdOrder = {};
    try {
        const salt = await bcrypt.salt(10);
        const orderHash = await bcrypt.hash(`${order.employeeId}${order.customerId}`, salt)
        const orderQuery = `INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash)
                            VALUES (?, ?, ?, ?, ?)`;
        const orderRows = await conn.query(orderQuery, [order.employeeId, order.customerId, order.vehicleId, order.activeOrder, orderHash]);

        if (orderRows[0].affectedRows !== 1) {
            return res.status(500).json({ message: 'Error creating order' });
        }

        const orderId = orderRows[0].insertId;

        // Insert into order_info table
        const orderInfoQuery = `INSERT INTO order_info (order_id, order_total_price, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed)
                                VALUES (?, ?, ?, ?, ?, ?)`;
        const orderInfoRows = await conn.query(orderInfoQuery, [orderId, order.orderTotalPrice, order.additionalRequest, order.notesForInternalUse, order.notesForCustomer, order.additionalRequestsCompleted]);

        if (orderInfoRows[0].affectedRows !== 1) {
            return res.status(500).json({ message: 'Error creating order info' });
        }

        // Insert into order_services table
        const orderServiceQuery = `INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)`;
        const orderServiceRows = await conn.query(orderServiceQuery, [orderId, order.serviceId, order.serviceCompleted]);

        if (orderServiceRows[0].affectedRows !== 1) {
            return res.status(500).json({ message: 'Error creating order services' });
        }

        res.status(201).json({ message: 'Order created successfully!', orderHash });
        createdOrder={
            order_id:orderId
        }
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
}
module.exports={
    createOrder,
}