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
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };

  console.log('Request URL:', `${api_url}/api/employees`);
  console.log('Request Options:', requestOptions);

  try {
    const response = await fetch(`${api_url}/api/employees`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json(); // Get error details
      console.error('Error response:', errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse JSON response
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    throw error; // Rethrow error for component to handle
  }
};


const updateEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': loggedInEmployeeToken,
      },
      body: JSON.stringify(formData),
  };

  try {
      const response = await fetch(`${api_url}/api/employee/${formData.employee_id}`, requestOptions);

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json(); // Parse JSON response
  } catch (error) {
      console.error('Error updating employee:', error.message);
      throw error;
  }
};

const employeeService = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
};

export default employeeService;