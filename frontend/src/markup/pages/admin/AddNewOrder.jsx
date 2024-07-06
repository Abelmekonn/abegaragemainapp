import React from 'react'
import { useAuth } from "../../../contexts/AuthContext";
import LoginForm from '../../components/LoginForm/LoginForm';
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddOrder from '../../components/Admin/Order/AddOrder'
function AddNewOrder() {
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
                                <AddOrder/>
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

export default AddNewOrder
