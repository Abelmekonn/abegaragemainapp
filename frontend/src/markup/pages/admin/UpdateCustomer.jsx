import React from "react";
// Import the auth hook 
import { useAuth } from "../../../contexts/AuthContext";
// Import the login form component 
import LoginForm from '../../components/Form/LoginForm';
// Import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
// Import the Update customer
import CustomerUpdate from "../../components/Admin/Customer/CustomerUpdate";
function UpdateCustomer() {
    // Destructure the auth hook 
    const { isLogged, isAdmin } = useAuth();

    if (isLogged) {
        if (isAdmin) {
            return (
                <div>
                    <div className="container-fluid admin-pages">
                        <div className="row">
                            <div className="col-md-3 admin-left-side">
                                <AdminMenu />
                            </div>
                            <div className="col-md-9 admin-right-side">
                                <CustomerUpdate />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>You are not authorized to access this page</h1>
                </div>
            );
        }
    } else {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }

}

export default UpdateCustomer; 