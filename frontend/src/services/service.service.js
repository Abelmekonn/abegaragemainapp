const api_url = import.meta.env.VITE_API_URL;

const createService = async (serviceData, token) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(serviceData)
    };

    try {
        const response = await fetch(`${api_url}/api/service`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in createService:', error.message);
        throw error; // Rethrow error for component to handle
    }
};

const getServiceById = async (serviceId, token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };

    try {
        const response = await fetch(`${api_url}/api/service/${serviceId}`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in getServiceById:', error.message);
        throw error; // Rethrow error for component to handle
    }
};

const getAllServices = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };

    try {
        const response = await fetch(`${api_url}/api/services`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in getAllServices:', error.message);
        throw error; // Rethrow error for component to handle
    }
};

const updateService = async (serviceData, token) => {
    const requestOptions = {
        method: 'PUT', // Use PUT for update
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(serviceData)
    };

    try {
        const response = await fetch(`${api_url}/api/service/update`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in updateService:', error.message);
        throw error; // Rethrow error for component to handle
    }
};

const deleteService = async (token) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };

    try {
        const response = await fetch(`${api_url}/api/service/delete`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in deleteService:', error.message);
        throw error; // Rethrow error for component to handle
    }
};

const serviceService = {
    createService,
    getServiceById,
    getAllServices,
    updateService,
    deleteService // Added deleteService to the exported service
};

export default serviceService;
