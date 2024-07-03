const conn = require("../config/db.config");

const createVehicle = async (vehicleData) => {
    const { customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color } = vehicleData;
    const query = `
        INSERT INTO customer_vehicle_info 
        (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        const [result] = await conn.query(query, [customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color]);
        return result.insertId;
    } catch (error) {
        console.error('Error creating vehicle:', error);
        throw error;
    }
};

const getVehiclesByCustomerId = async (customerId) => {
    const query = `
        SELECT * FROM customer_vehicle_info WHERE customer_id = ?
    `;
    try {
        const [rows] = await conn.query(query, [customerId]);
        return rows;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};

const updateVehicle = async (vehicleData) => {
    const { vehicle_id, customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color } = vehicleData;
    const query = `
        UPDATE customer_vehicle_info
        SET 
            vehicle_year = ?,
            vehicle_make = ?,
            vehicle_model = ?,
            vehicle_type = ?,
            vehicle_mileage = ?,
            vehicle_tag = ?,
            vehicle_serial = ?,
            vehicle_color = ?
        WHERE vehicle_id = ? AND customer_id = ?
    `;
    try {
        const [result] = await conn.query(query, [vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color, vehicle_id, customer_id]);
        if (result.affectedRows === 0) {
            throw new Error(`Vehicle with ID ${vehicle_id} for customer ${customer_id} not found.`);
        }
        return true; // or return result as needed
    } catch (error) {
        console.error('Error updating vehicle:', error);
        throw error;
    }
};

module.exports = {
    createVehicle,
    getVehiclesByCustomerId,
    updateVehicle
};
