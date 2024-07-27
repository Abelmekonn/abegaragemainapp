const api_url = import.meta.env.VITE_API_URL;

// A function to send the login request to the server 
const LogIn = async (formData) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };

    

    try {
        const response = await fetch(`${api_url}/api/login`, requestOptions);
        const responseData = await response.json();

        

        if (!response.ok) {
            console.error('Response Error:', responseData);
            throw new Error(responseData.message || 'Login request failed');
        }

        return responseData;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
};

const LogOut = () => {
    localStorage.removeItem("employee");
};

// Export the functions 
export { LogIn, LogOut };
