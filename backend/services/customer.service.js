const conn = require("../config/db.config");
const bcrypt = require('bcrypt');
// A function to check if customer exists in the database 
async function checkIfCustomerExists(email) {
    const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";
    const rows = await conn.query(query, [email]);
    if (rows.length > 0) {
        return true;
    }
    return false;
}

// A function to create a new customer 
// A function to create a new customer 
async function createCustomer(customer) {
    let createdCustomer = {};
    try {
        const salt = await bcrypt.genSalt(10);
        const customerHash = await bcrypt.hash(customer.customer_email, salt);

        // Ensure customer_phone_number is replaced with null if undefined
        const phoneNumber = customer.customer_phone_number || null;

        const query = "INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)";
        const rows = await conn.query(query, [customer.customer_email, phoneNumber, customerHash]);
        if (rows.affectedRows !== 1) {
            return false;
        }

        const customer_id = rows.insertId;

        const query2 = "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)";
        const rows2 = await conn.query(query2, [customer_id, customer.customer_first_name, customer.customer_last_name, customer.active_customer_status]);

        createdCustomer = {
            customer_id: customer_id
        }
    } catch (err) {
        console.log(err);
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

// Export the functions for use in the controller
module.exports = {
    checkIfCustomerExists,
    createCustomer,
    getCustomerByEmail,
    getAllCustomers
};
