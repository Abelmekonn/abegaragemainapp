const api_url = import.meta.env.VITE_API_URL;

const createCustomer = async (formData) => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(formData)
    };

    try {
        const response = await fetch(`${api_url}/api/customer`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in createCustomer:', error.message);
        throw error; // Rethrow error for component to handle
    }
};

const getAllCustomers = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };
    const response = await fetch(`${api_url}/api/customers`, requestOptions);
    return response;
}


const updateCustomer = async (customerData, token) => {
    const requestOptions = {
        method: 'PUT', // Use PUT for update
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(customerData)
    };

    try {
        const response = await fetch(`${api_url}/api/customer/update`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in updateCustomer:', error.message);
        throw error; // Rethrow error for component to handle
    }
};


const customerService = {
    createCustomer,
    getAllCustomers,
    updateCustomer  // Added updateCustomer to the exported service
};

export default customerService;