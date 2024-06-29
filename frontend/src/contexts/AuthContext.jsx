// Import React and the Hooks we need here 
import React, { useState, useEffect, useContext, useMemo } from "react";
// Import the Util function we created to handle the reading from the local storage 
import getAuth from '../util/auth.header';

// Create a context object  
const AuthContext = React.createContext();

// Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
}

// Create a provider component  
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Retrieve the logged-in user from local storage
    const fetchAuth = async () => {
      try {
        const response = await getAuth();
        if (response?.employee_token) {
          setIsLogged(true);
          if (response.employee_role === 3) { // 3 is the employee_role for admin
            setIsAdmin(true);
          }
          setEmployee(response);
        }
      } catch (error) {
        console.error("Failed to fetch auth:", error);
      }
    };

    fetchAuth();
  }, []);

  const value = useMemo(() => ({
    isLogged,
    isAdmin,
    setIsAdmin,
    setIsLogged,
    employee,
  }), [isLogged, isAdmin, employee]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
