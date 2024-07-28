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

const getOrderById = async (orderId) => {
    if (orderId === undefined || orderId === null) {
        throw new Error('Order ID must be provided');
    }

    try {
        const query = `SELECT o.order_id, o.employee_id, o.customer_id, o.vehicle_id, o.active_order, o.order_hash,
                      oi.order_total_price, oi.additional_request, oi.notes_for_internal_use, oi.notes_for_customer, oi.additional_requests_completed,
                      os.service_id, os.service_completed,
                      ost.order_status
                     FROM orders o
                     LEFT JOIN order_info oi ON o.order_id= oi.order_id
                     LEFT JOIN order_services os ON o.order_id = os.order_id
                     LEFT JOIN order_status ost ON o.order_id = ost.order_id
                     WHERE o.order_id = ?`;

        const [results] = await conn.query(query, [orderId]);

        if (results.length === 0) {
            throw new Error('Order not found');
        }

        const order = results[0];
        return {
            id: order.order_id,
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
            services: results.map(row => ({
                serviceId: row.service_id,
                serviceCompleted: row.service_completed,
            })),
            orderStatus: order.order_status,
        };
    } catch (error) {
        console.error('Error getting order by ID:', error);
        throw new Error('Error getting order by ID');
    }
}



const getAllOrders = async (token) => {
    const query = `
      SELECT o.order_id, o.employee_id, o.customer_id, o.vehicle_id, o.order_date ,o.active_order, o.order_hash,
      oi.order_total_price, oi.additional_request, oi.notes_for_internal_use, oi.notes_for_customer, oi.additional_requests_completed,
      GROUP_CONCAT(os.service_id ORDER BY os.service_id) AS service_ids,
      GROUP_CONCAT(os.order_service_id ORDER BY os.order_service_id) AS order_service_ids,
      os.service_completed,
      ost.order_status
      FROM orders o
      INNER JOIN order_info oi ON o.order_id = oi.order_id
      INNER JOIN order_services os ON o.order_id = os.order_id
      INNER JOIN order_status ost ON o.order_id = ost.order_id
      GROUP BY o.order_id
      ORDER BY o.order_id DESC
      LIMIT 10;
    `;

    try {
        const rows = await conn.query(query);
        return rows; // Return the array of orders
    } catch (error) {
        console.error('Error getting all orders:', error.message);
        throw error;
    }
};

const getOrderByCustomerId = async (customerId) => {
    if (customerId === undefined || customerId === null) {
        throw new Error('Customer ID must be provided');
    }

    try {
        const query = `SELECT o.order_id, o.employee_id, o.customer_id, o.vehicle_id, o.active_order, o.order_hash,
                      oi.order_total_price, oi.additional_request, oi.notes_for_internal_use, oi.notes_for_customer, oi.additional_requests_completed,
                      os.service_id, os.service_completed,
                      ost.order_status
                     FROM orders o
                     LEFT JOIN order_info oi ON o.order_id = oi.order_id
                     LEFT JOIN order_services os ON o.order_id = os.order_id
                     LEFT JOIN order_status ost ON o.order_id = ost.order_id
                     WHERE o.customer_id = ?`;

        const [results] = await conn.query(query, [customerId]);

        console.log('Results:', results); // Log the result to understand its structure

        // Ensure results is an array
        const rows = Array.isArray(results) ? results : [results];

        if (rows.length === 0) {
            return []; // No orders found
        }

        // Process each row
        return rows.map(row => ({
            id: row.order_id,
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
            services: rows.filter(service => service.service_id === row.service_id).map(service => ({
                serviceId: service.service_id,
                serviceCompleted: service.service_completed,
            })),
            orderStatus: row.order_status,
        }));
    } catch (error) {
        console.error('Error getting orders by customer ID:', error);
        throw new Error('Error getting orders by customer ID');
    }
};






module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByCustomerId,
};
