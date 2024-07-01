const conn = require("../config/db.config");
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
async function createCustomer(customer) {
    let createdCustomer = {};
    try {
        // Generate a salt and hash the email to create a customer hash
        const salt = await bcrypt.genSalt(10);
        const customerHash = await bcrypt.hash(customer.customer_email, salt);
        // Insert the email, phone number, and hash into the customer_identifier table  
        const query = "INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)";
        const rows = await conn.query(query, [customer.customer_email, customer.customer_phone_number, customerHash]);
        if (rows.affectedRows !== 1) {
            return false;
        }
        // Get the customer id from the insert 
        const customer_id = rows.insertId;
        // Insert the remaining data into the customer_info table  
        const query2 = "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)";
        const rows2 = await conn.query(query2, [customer_id, customer.customer_first_name, customer.customer_last_name, customer.active_customer_status]);
        // Construct the customer object to return 
        createdCustomer = {
            customer_id: customer_id
        }
    } catch (err) {
        console.log(err);
    }
    // Return the customer object 
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
