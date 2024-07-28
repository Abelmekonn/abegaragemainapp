// Import the customer service
const customerService = require('../services/customer.service');

// Create the add customer controller
async function createCustomer(req, res) {
    const { customer_email, customer_phone_number, customer_first_name, customer_last_name, customer_password, active_customer_status } = req.body;

    // Validate request body
    if (!customer_email || !customer_first_name || !customer_last_name || !customer_password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        console.log('Request to create customer received with email:', customer_email);

        // Check if the customer already exists
        const customerExists = await customerService.checkIfCustomerExists(customer_email);
        if (customerExists) {
            return res.status(400).json({ error: 'Customer with this email already exists' });
        }

        // Create a new customer
        const newCustomer = await customerService.createCustomer({
            customer_email,
            customer_phone_number,
            customer_first_name,
            customer_last_name,
            customer_password,
            active_customer_status,
        });

        if (!newCustomer) {
            return res.status(500).json({ error: 'Failed to create customer' });
        }

        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Create the getAllCustomers controller
async function getAllCustomers(req, res, next) {
    try {
        const customers = await customerService.getAllCustomers();
        if (!customers) {
            return res.status(400).json({
                error: "Failed to get all customers!"
            });
        } else {
            return res.status(200).json({
                status: "success",
                data: customers,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Something went wrong!"
        });
    }
}

const getCustomerById = async (req, res) => {
    const id = req.params.id;
    

    if (!id) {
        return res.status(400).json({ error: 'Customer ID parameter is required' });
    }

    try {
        const customer = await customerService.getCustomerById(id);

        if (!customer || customer.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        return res.status(200).json({status: "success",
            data:customer}); // Return the first customer object
    } catch (error) {
        console.error('Error in customer controller:', error);
        return res.status(500).json({ error: 'Error fetching customer' });
    }
};


// Create the updateCustomer controller
async function updateCustomer(req, res, next) {
    const customerData = req.body;

    try {
        const updated = await customerService.updateCustomer(customerData);
        if (!updated) {
            return res.status(400).json({ error: "Failed to update customer!" });
        }

        res.status(200).json({ status: "Customer updated successfully" });
    } catch (error) {
        console.error('Error updating customer:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Export the createCustomer, getAllCustomers, and updateCustomer controllers
module.exports = {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    getCustomerById
};