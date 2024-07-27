const api_url = import.meta.env.VITE_API_URL;

const createOrder = async (order, token) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(order)
    };
    try {
        const response = await fetch(`${api_url}/api/order`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in create order:', error.message);
        throw error; // Rethrow error for component to handle
    }
};

const getAllOrders = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };
    try {
        const response = await fetch(`${api_url}/api/orders`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON response
        return data; // Return the array of orders
    } catch (error) {
        console.error('Error in getAllOrders:', error.message);
        throw error; // Rethrow error for component to handle
    }
};

const getOrderById = async (orderId, token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };
    try {
        const response = await fetch(`${api_url}/api/order/${orderId}`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in get order by id:', error.message);
        throw error; // Rethrow error for component to handle
    }
};

const getOrderByCustomerId = async (customerId) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const response = await fetch(`${api_url}/api/order/customer/${customerId}`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json(); // Parse JSON response
    } catch (error) {
        console.error('Error in get order by customer id:', error.message);
        throw error; // Rethrow error for component to handle
    }
};

const orderService = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByCustomerId
};

export default orderService;
