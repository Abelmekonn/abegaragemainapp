// Import the customer service
const customerService = require('../services/customer.service');

// Create the add customer controller
async function createCustomer(req, res, next) {
    // Check if customer email already exists in the database
    const customerExists = await customerService.checkIfCustomerExists(req.body.customer_email);

    // If customer exists, send a response to the client
    if (customerExists) {
        res.status(400).json({
            error: "This email address is already associated with another customer!"
        });
    } else {
        try {
            const customerData = req.body;
            // Create the customer
            const customer = await customerService.createCustomer(customerData);
            if (!customer) {
                res.status(400).json({
                    error: "Failed to add the customer!"
                });
            } else {
                res.status(200).json({
                    status: "customer created",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                error: "Something went wrong!"
            });
        }
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
    updateCustomer
};