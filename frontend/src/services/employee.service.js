// src/services/employeeService.js
const api_url = import.meta.env.VITE_API_URL;

const createEmployee = async (formData,loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' ,
                'x-access-token':loggedInEmployeeToken
    },
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

const getAllEmployees = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/employees`, requestOptions);
  return response;
}

const employeeService = {
  createEmployee,
  getAllEmployees
};

export default employeeService;
