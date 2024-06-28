const api_url = import.meta.env.VITE_API_URL;

// A function to send the login request to the server 
const LogIn = async (formData) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };
    console.log("About to send request");
    console.log(requestOptions.body);
    const response = await fetch(`${api_url}/api/employee/login`, requestOptions);
    return response;
}

// Export the functions 
export default LogIn;
