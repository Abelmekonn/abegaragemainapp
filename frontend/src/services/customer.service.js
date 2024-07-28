const api_url = import.meta.env.VITE_API_URL;

const createCustomer = async (formData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    };

    try {
        const response = await fetch(`${api_url}/api/customer`, requestOptions);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in createCustomer:', error.message);
        throw error; // Rethrow error for component to handle
    }
}

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
const getCustomerById = async (id) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await fetch(`${api_url}/api/customer/${id}`, requestOptions);
        

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseBody = await response.text();

        try {
            const data = JSON.parse(responseBody);
            
            return data;
        } catch (error) {
            console.error('Error parsing response:', error);
            throw error;
        }
    } catch (error) {
        console.error('Error in getCustomerById:', error);
        throw error;
    }
};




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
    updateCustomer,
    getCustomerById  // Added updateCustomer to the exported service
};

export default customerService;