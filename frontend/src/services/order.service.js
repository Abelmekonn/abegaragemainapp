const api_url = import.meta.env.VITE_API_URL;

const createOrder= async (orderData,token)=>{
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(orderData)
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
}

const orderService={
    createOrder
}

export default orderService;