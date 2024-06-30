import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import getAuth from "../../../util/auth.header"

const PrivateAuthRoute = ({ roles, children }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await getAuth();
                if (response.employee_token) {
                    setIsLogged(true);
                    // eslint-disable-next-line react/prop-types
                    if (roles && roles.length > 0 && roles.includes(response.employee_role)) {
                        setIsAuthorized(true);
                    }
                }
            } catch (err) {
                setError(err);
            } finally {
                setIsChecked(true);
            }
        };

        checkAuth();
    }, [roles]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!isChecked) {
        return <div>Loading...</div>;
    }

    if (!isLogged) {
        return <Navigate to="/login" />;
    }

    if (!isAuthorized) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateAuthRoute;
