// Import the vehicle service
const vehicleService = require('../services/vehicle.service');

// Create the add vehicle controller
const createVehicle = async (req, res) => {
    console.log('Incoming request body:', req.body); // Log incoming request
    const vehicleData = req.body;
    try {
        const insertedId = await vehicleService.createVehicle(vehicleData);
        res.status(201).json({ id: insertedId, message: 'Vehicle created successfully' });
    } catch (error) {
        console.error('Error creating vehicle:', error);
        res.status(500).json({ error: 'Failed to create vehicle' });
    }
};

// Create the get vehicles 
const getVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleService.getVehicles();
        res.status(200).json(vehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
};

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
    getVehicles,
    updateVehicle
};
