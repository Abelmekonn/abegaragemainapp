const api_url = import.meta.env.VITE_API_URL;

const createVehicle = async (vehicleData, loggedInEmployeeToken) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedInEmployeeToken
        },
        body: JSON.stringify(vehicleData)
    };

    try {
        const response = await fetch(`${api_url}/api/vehicle`, requestOptions);

        if (response.status !== 201) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in createVehicle:', error.message);
        throw error; // Rethrow error for component to handle
    }
};
const getVehicles = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'x-access-token': token
        }
    };

    
        const response = await fetch(`${api_url}/api/all-vehicles`, requestOptions);

        return response; // Parse JSON response
};

const updateVehicle = async (vehicleData, token) => {
    const requestOptions = {
        method: 'PUT', // Use PUT for update
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(vehicleData)
    };

    try {
        const response = await fetch(`${api_url}/api/vehicle/update`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in updateVehicle:', error.message);
        throw error; // Rethrow error for component to handle
    }
};

const getVehicleByCustomerId = async ( customerId) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await fetch(`${api_url}/api/vehicle/${customerId}`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in getVehicleByCustomerId:', error.message);
        throw error; // Rethrow error for component to handle
    }
};

const vehicleService = {
    createVehicle,
    getVehicles,
    updateVehicle,
    getVehicleByCustomerId // Added getVehicleByCustomerId to the exported service
};

export default vehicleService;
