import React from 'react'
import { useAuth } from "../../../contexts/AuthContext";
import LoginForm from '../../components/Form/LoginForm';
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import CustomerDetail from '../../components/Admin/Customer/CustomerDetail'
function CustomerPage() {
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
                                <CustomerDetail />
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

export default CustomerPage
