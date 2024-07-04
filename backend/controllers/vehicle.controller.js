// Import the vehicle service
const vehicleService = require('../services/vehicle.service');

// Create the add vehicle controller
const createVehicle = async (req, res) => {
    const vehicleData = req.body; // Assuming vehicle data is passed in the request body

    try {
        const insertedId = await vehicleService.createVehicle(vehicleData);
        res.status(201).json({ id: insertedId, message: 'Vehicle created successfully' });
    } catch (error) {
        console.error('Error creating vehicle:', error);
        res.status(500).json({ error: 'Failed to create vehicle' });
    }
};

// Create the get vehicles by customer ID controller
async function getVehiclesByCustomerId(req, res, next) {
    const customerId = req.params.customerId;

    try {
        const vehicles = await vehicleService.getVehiclesByCustomerId(customerId);
        return res.status(200).json({
            status: "success",
            data: vehicles
        });
    } catch (error) {
        console.error('Error fetching vehicles:', error.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

// Create the update vehicle controller
async function updateVehicle(req, res, next) {
    const vehicleData = req.body;

    try {
        const updated = await vehicleService.updateVehicle(vehicleData);
        if (!updated) {
            return res.status(400).json({ error: "Failed to update vehicle!" });
        }
        return res.status(200).json({ status: "Vehicle updated successfully" });
    } catch (error) {
        console.error('Error updating vehicle:', error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Export the createVehicle, getVehiclesByCustomerId, and updateVehicle controllers
module.exports = {
    createVehicle,
    getVehiclesByCustomerId,
    updateVehicle
};
