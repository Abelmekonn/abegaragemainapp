const conn = require("../config/db.config");

// Function to create a new service
async function createService(service) {
    try {
        const query = "INSERT INTO common_services (service_name, service_description) VALUES (?, ?)";
        const rows = await conn.query(query, [service.service_name, service.service_description]);
        
        if (rows.affectedRows !== 1) {
            return false;
        }
        
        return {
            service_id: rows.insertId,
            service_name: service.service_name,
            service_description: service.service_description
        };
    } catch (err) {
        console.error('Error creating service:', err);
        throw err;
    }
}

// Function to get a service by ID
async function getServiceById(service_id) {
    try {
        const query = "SELECT * FROM common_services WHERE service_id = ?";
        const rows = await conn.query(query, [service_id]);
        
        if (rows.length === 0) {
            return null;
        }
        
        return rows[0];
    } catch (err) {
        console.error('Error fetching service:', err);
        throw err;
    }
}

// Function to get all services
async function getAllServices() {
    try {
        const query = "SELECT * FROM common_services ORDER BY service_id DESC";
        const rows = await conn.query(query);
        return rows;
    } catch (err) {
        console.error('Error fetching services:', err);
        throw err;
    }
}

// Function to update a service
async function updateService(service) {
    try {
        const query = "UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?";
        const rows = await conn.query(query, [service.service_name, service.service_description, service.service_id]);
        
        if (rows.affectedRows !== 1) {
            return false;
        }
        
        return true;
    } catch (err) {
        console.error('Error updating service:', err);
        throw err;
    }
}

// Function to delete a service
async function deleteService(service_id) {
    try {
        const query = "DELETE FROM common_services WHERE service_id = ?";
        const rows = await conn.query(query, [service_id]);
        
        if (rows.affectedRows !== 1) {
            return false;
        }
        
        return true;
    } catch (err) {
        console.error('Error deleting service:', err);
        throw err;
    }
}

module.exports = {
    createService,
    getServiceById,
    getAllServices,
    updateService,
    deleteService
};
