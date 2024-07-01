const api_url = import.meta.env.VITE_API_URL;

const createCustomer = async (formData, loggedInEmployeeToken) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedInEmployeeToken
        },
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

const customerService = {
    createCustomer,
    getAllCustomers
};

export default customerService;
