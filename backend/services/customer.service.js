const conn = require("../config/db.config");
const bcrypt = require('bcrypt');
// A function to check if customer exists in the database 
async function checkIfCustomerExists(email) {
    const customerQuery = "SELECT * FROM customer_identifier WHERE customer_email = ?";
    const employeeQuery = "SELECT * FROM employee WHERE employee_email = ?";

    const customerRows = await conn.query(customerQuery, [email]);
    if (customerRows.length > 0) {
        return true;
    }

    const employeeRows = await conn.query(employeeQuery, [email]);
    if (employeeRows.length > 0) {
        return true;
    }

    return false;
}


// A function to create a new customer 
async function createCustomer(customer) {
    let createdCustomer = {};
    try {
        const salt = await bcrypt.genSalt(10);
        const customerHash = await bcrypt.hash(customer.customer_email, salt);

        // Ensure customer_phone_number is replaced with null if undefined
        const phoneNumber = customer.customer_phone_number || null;

        const query1 = "INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)";
        const [rows1] = await conn.query(query1, [customer.customer_email, phoneNumber, customerHash]);
        if (rows1.affectedRows !== 1) {
            return false;
        }

        const customer_id = rows1.insertId;

        const query2 = "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)";
        const [rows2] = await conn.query(query2, [customer_id, customer.customer_first_name, customer.customer_last_name, customer.active_customer_status]);
        if (rows2.affectedRows !== 1) {
            return false;
        }

        // Assuming customer_pass table should be populated as well
        const customerPasswordHash = await bcrypt.hash(customer.customer_password, salt);
        const query3 = "INSERT INTO customer_pass (customer_id, customer_password_hashed) VALUES (?, ?)";
        const [rows3] = await conn.query(query3, [customer_id, customerPasswordHash]);
        if (rows3.affectedRows !== 1) {
            return false;
        }

        createdCustomer = {
            customer_id: customer_id
        };
    } catch (err) {
        console.log(err);
        return false;
    }
    return createdCustomer;
}


// A function to get customer by email
async function getCustomerByEmail(customer_email) {
    if (!customer_email) {
        throw new Error('Email parameter is undefined');
    }

    const query = `
        SELECT * FROM customer_identifier 
        INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id 
        WHERE customer_identifier.customer_email = ?
    `;
    const rows = await conn.query(query, [customer_email]);
    return rows;
}

// A function to get all customers
async function getAllCustomers() {
    const query = `
        SELECT * FROM customer_identifier 
        INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id 
        ORDER BY customer_identifier.customer_id DESC LIMIT 10
    `;
    const rows = await conn.query(query);
    return rows;
}

// function to update customer profile
async function updateCustomer(customerData) {
    try {
        const { customer_id, customer_first_name, customer_last_name, customer_phone_number, active_customer_status } = customerData;

        // Update customer identifier
        const query1 = `
            UPDATE customer_identifier
            SET customer_phone_number = ?
            WHERE customer_id = ?
        `;
        const rows1 = await conn.query(query1, [customer_phone_number, customer_id]);

        if (rows1.affectedRows !== 1) {
            return false;
        }

        // Update customer info
        const query2 = `
            UPDATE customer_info
            SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ?
            WHERE customer_id = ?
        `;
        const rows2 = await conn.query(query2, [customer_first_name, customer_last_name, active_customer_status, customer_id]);

        if (rows2.affectedRows !== 1) {
            return false;
        }

        return true;
    } catch (err) {
        console.error('Error updating customer:', err);
        throw err;
    }
}


// Export the functions for use in the controller
module.exports = {
    checkIfCustomerExists,
    createCustomer,
    getCustomerByEmail,
    getAllCustomers,
    updateCustomer // Add the updateCustomer function to exports
};