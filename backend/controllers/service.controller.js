// Import the common service service
const commonServiceService = require('../services/service.service');

// Create the add service controller
async function createService(req, res, next) {
    try {
        const serviceData = req.body;
        // Create the service
        const service = await commonServiceService.createService(serviceData);
        if (!service) {
            res.status(400).json({
                error: "Failed to add the service!"
            });
        } else {
            res.status(200).json({
                status: "Service created",
                data: service
            });
        }
    } catch (error) {
        console.error('Error creating service:', error.message);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}

// Create the getServiceById controller
async function getServiceById(req, res, next) {
    try {
        const serviceId = req.params.id;
        const service = await commonServiceService.getServiceById(serviceId);
        if (!service) {
            return res.status(404).json({
                error: "Service not found!"
            });
        } else {
            return res.status(200).json({
                status: "success",
                data: service,
            });
        }
    } catch (error) {
        console.error('Error fetching service:', error.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

// Create the getAllServices controller
async function getAllServices(req, res, next) {
    try {
        const services = await commonServiceService.getAllServices();
        if (!services) {
            return res.status(400).json({
                error: "Failed to get all services!"
            });
        } else {
            return res.status(200).json({
                status: "success",
                data: services,
            });
        }
    } catch (error) {
        console.error('Error fetching services:', error.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

// Create the updateService controller
async function updateService(req, res, next) {
    try {
        const serviceData = req.body;
        const updated = await commonServiceService.updateService(serviceData);
        if (!updated) {
            return res.status(400).json({
                error: "Failed to update service!"
            });
        }

        res.status(200).json({
            status: "Service updated successfully"
        });
    } catch (error) {
        console.error('Error updating service:', error.message);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}

// Create the deleteService controller
const deleteService = async (req, res) => {
    const serviceId = req.params.serviceId; // Ensure serviceId is correctly obtained from request parameters

    try {
        // Perform validation or additional checks if necessary
        
        // Example: Delete logic
        const result = await commonServiceService.deleteService(serviceId);

        if (!result) {
            return res.status(404).json({ message: 'Service not found' });
        }

        return res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        return res.status(500).json({ message: 'Failed to delete service' });
    }
};


// Export the createService, getServiceById, getAllServices, updateService, and deleteService controllers
module.exports = {
    createService,
    getServiceById,
    getAllServices,
    updateService,
    deleteService
};
