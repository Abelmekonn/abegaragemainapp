const conn = require("../config/db.config");
const bcrypt = require('bcrypt');

// Function to create order
async function createOrder(order) {
    try {
        const salt = await bcrypt.genSalt(10);
        const orderHash = await bcrypt.hash(`${order.employeeId}${order.customerId}`, salt);
        
        const orderQuery = `INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash)
                            VALUES (?, ?, ?, ?, ?)`;
        const [orderRows] = await conn.query(orderQuery, [order.employeeId, order.customerId, order.vehicleId, order.activeOrder, orderHash]);

        if (orderRows.affectedRows !== 1) {
            throw new Error('Error creating order');
        }

        const orderId = orderRows.insertId;

        // Insert into order_info table
        const orderInfoQuery = `INSERT INTO order_info (order_id, order_total_price, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed)
                                VALUES (?, ?, ?, ?, ?, ?)`;
        const [orderInfoRows] = await conn.query(orderInfoQuery, [orderId, order.orderTotalPrice, order.additionalRequest, order.notesForInternalUse, order.notesForCustomer, order.additionalRequestsCompleted]);

        if (orderInfoRows.affectedRows !== 1) {
            throw new Error('Error creating order info');
        }

        // Insert into order_services table
        for (const serviceId of order.serviceIds) {
            const orderServiceQuery = `INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)`;
            const [orderServiceRows] = await conn.query(orderServiceQuery, [orderId, serviceId, order.serviceCompleted]);
            
            if (orderServiceRows.affectedRows !== 1) {
                throw new Error('Error creating order services');
            }
        }

        // Insert into order_status table
        const orderStatusQuery = `INSERT INTO order_status (order_id, order_status) VALUES (?, ?)`;
        const [orderStatusRows] = await conn.query(orderStatusQuery, [orderId, order.initialStatus]);

        if (orderStatusRows.affectedRows !== 1) {
            throw new Error('Error creating order status');
        }

        return { message: 'Order created successfully!', orderHash, orderId };
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Error creating order');
    }
}

module.exports = {
    createOrder,
};
