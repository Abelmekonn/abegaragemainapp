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
    // Call the getAllCustomers method from the customer service
    const customers = await customerService.getAllCustomers();
    if (!customers) {
        res.status(400).json({
            error: "Failed to get all customers!"
        });
    } else {
        res.status(200).json({
            status: "success",
            data: customers,
        });
    }
}

// Export the createCustomer and getAllCustomers controllers
module.exports = {
    createCustomer,
    getAllCustomers
};
