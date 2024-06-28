// src/services/employeeService.js
const api_url = import.meta.env.VITE_API_URL;

const createEmployee = async (formData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  };
  
  try {
    const response = await fetch(`${api_url}/api/employee`, requestOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json(); // Parse JSON response
  } catch (error) {
    console.error('Error in createEmployee:', error.message);
    throw error; // Rethrow error for component to handle
  }
};

const employeeService = {
  createEmployee
};

export default employeeService;
