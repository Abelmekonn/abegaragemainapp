// Import the vehicle service
const vehicleService = require('../services/vehicle.service');

// Create the add vehicle controller
async function createVehicle(req, res, next) {
    const vehicleData = req.body;

    try {
        const vehicleId = await vehicleService.createVehicle(vehicleData);
        return res.status(200).json({
            status: "Vehicle created",
            vehicleId: vehicleId
        });
    } catch (error) {
        console.error('Error creating vehicle:', error.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

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
