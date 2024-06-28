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
      let errorMessage = 'Unknown error occurred.';
      if (response.status === 400) {
        const errorData = await response.json();
        errorMessage = errorData.message || 'Bad request';
      } else {
        errorMessage = `HTTP error! Status: ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Error creating employee');
  }
};

const employeeService = {
  createEmployee
};

export default employeeService;
