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

// Create the get vehicles in controller
const getVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getVehicles(); // Call the getVehicles function from vehicleService
    console.log(vehicles)
    if (!vehicles || vehicles.length === 0) {
      return res.status(200).json({
        status: "success",
        data: [], // Return an empty array
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: vehicles,
      });
    }
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

async function getVehicleByCustomerId(req, res, next) {
    try {
        const customerId = req.params.customerId;
        customerId = parseInt(customerId)
        const vehicles = await vehicleService.getVehicleByCustomerId(customerId);
        if (!vehicles || vehicles.length === 0) {
            return res.status(404).json({
                error: "No vehicles found for this customer!"
            });
        } else {
            return res.status(200).json({
                status: "success",
                data: vehicles,
            });
        }
    } catch (error) {
        console.error('Error fetching vehicles by customer ID:', error.message);
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
    getVehicles,
    updateVehicle,
    getVehicleByCustomerId
};
