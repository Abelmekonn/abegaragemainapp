const conn = require("../config/db.config");
const bcrypt = require('bcrypt');

// Function to create order
async function createOrder(order) {
    try {
        const salt = await bcrypt.genSalt(10);
        const orderHash = await bcrypt.hash(`${order.employeeId}${order.customerId}`, salt);

        const orderQuery = `INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash)
                          VALUES (?, ?, ?, ?, ?)`;
        const result = await conn.query(orderQuery, [order.employeeId, order.customerId, order.vehicleId, order.activeOrder, orderHash]);

        if (result.affectedRows !== 1) {
            throw new Error('Error creating order');
        }

        const orderId = result.insertId;
        console.log('Order created with ID:', orderId);

        // Insert into order_info table
        const orderInfoQuery = `INSERT INTO order_info (order_id, order_total_price, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed)
                              VALUES (?, ?, ?, ?, ?, ?)`;
        const orderInfoResult = await conn.query(orderInfoQuery, [orderId, order.orderTotalPrice, order.additionalRequest, order.notesForInternalUse, order.notesForCustomer, order.additionalRequestsCompleted]);

        if (orderInfoResult.affectedRows !== 1) {
            throw new Error('Error creating order info');
        }

        console.log('Order info created for order ID:', orderId);

        // Insert into order_services table
        for (const serviceId of order.serviceIds) {
            const orderServiceQuery = `INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)`;
            const orderServiceResult = await conn.query(orderServiceQuery, [orderId, serviceId, order.serviceCompleted]);

            if (orderServiceResult.affectedRows !== 1) {
                throw new Error('Error creating order services');
            }
        }

        console.log('Order services created for order ID:', orderId);

        // Insert into order_status table
        const orderStatusQuery = `INSERT INTO order_status (order_id, order_status) VALUES (?, ?)`;
        const orderStatusResult = await conn.query(orderStatusQuery, [orderId, order.initialStatus]);

        if (orderStatusResult.affectedRows !== 1) {
            throw new Error('Error creating order status');
        }

        console.log('Order status created for order ID:', orderId);

        return { message: 'Order created successfully!', orderHash, orderId };
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Error creating order');
    }
}

async function getOrderById(orderId) {
    try {
        const query = `SELECT o.id, o.employee_id, o.customer_id, o.vehicle_id, o.active_order, o.order_hash,
                      oi.order_total_price, oi.additional_request, oi.notes_for_internal_use, oi.notes_for_customer, oi.additional_requests_completed,
                      os.service_id, os.service_completed,
                      ost.order_status
                     FROM orders o
                     LEFT JOIN order_info oi ON o.id = oi.order_id
                     LEFT JOIN order_services os ON o.id = os.order_id
                     LEFT JOIN order_status ost ON o.id = ost.order_id
                     WHERE o.id = ?`;

        const results = await conn.query(query, [orderId]);

        if (results.length === 0) {
            throw new Error('Order not found');
        }

        const order = results[0];
        return {
            id: order.id,
            employeeId: order.employee_id,
            customerId: order.customer_id,
            vehicleId: order.vehicle_id,
            activeOrder: order.active_order,
            orderHash: order.order_hash,
            orderTotalPrice: order.order_total_price,
            additionalRequest: order.additional_request,
            notesForInternalUse: order.notes_for_internal_use,
            notesForCustomer: order.notes_for_customer,
            additionalRequestsCompleted: order.additional_requests_completed,
            services: [
                {
                    serviceId: order.service_id,
                    serviceCompleted: order.service_completed,
                },
            ],
            orderStatus: order.order_status,
        };
    } catch (error) {
        console.error('Error getting order by ID:', error);
        throw new Error('Error getting order by ID');
    }
}
async function getAllOrders() {
    try {
        const query = `SELECT o.id, o.employee_id, o.customer_id, o.vehicle_id, o.active_order, o.order_hash,
                      oi.order_total_price, oi.additional_request, oi.notes_for_internal_use, oi.notes_for_customer, oi.additional_requests_completed,
                      os.service_id, os.service_completed,
                      ost.order_status
                     FROM orders o
                     LEFT JOIN order_info oi ON o.id = oi.order_id
                     LEFT JOIN order_services os ON o.id = os.order_id
                     LEFT JOIN order_status ost ON o.id = ost.order_id
                     ORDER BY o.id DESC`;

        const results = await conn.query(query);

        const orders = results.map((row) => ({
            id: row.id,
            employeeId: row.employee_id,
            customerId: row.customer_id,
            vehicleId: row.vehicle_id,
            activeOrder: row.active_order,
            orderHash: row.order_hash,
            orderTotalPrice: row.order_total_price,
            additionalRequest: row.additional_request,
            notesForInternalUse: row.notes_for_internal_use,
            notesForCustomer: row.notes_for_customer,
            additionalRequestsCompleted: row.additional_requests_completed,
            services: [
                {
                    serviceId: row.service_id,
                    serviceCompleted: row.service_completed,
                },
            ],
            orderStatus: row.order_status,
        }));

        return orders;
    } catch (error) {
        console.error('Error getting all orders:', error);
        throw new Error('Error getting all orders');
    }
}
module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
};
