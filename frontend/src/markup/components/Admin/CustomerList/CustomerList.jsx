// components/CustomersList.jsx
import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { format } from 'date-fns';
import customerService from "../../../../services/customer.service";
import { useNavigate } from 'react-router-dom';

const CustomersList = () => {
    const [customers, setCustomers] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const { employee } = useAuth();
    let token = null;
    if (employee) {
        token = employee.employee_token;
    }

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await customerService.getAllCustomers(token);
                if (!response.ok) {
                    setApiError(true);
                    if (response.status === 401) {
                        setApiErrorMessage("Please login again");
                    } else if (response.status === 403) {
                        setApiErrorMessage("You are not authorized to view this page");
                    } else {
                        setApiErrorMessage("Please try again later");
                    }
                    return;
                }
                const data = await response.json();
                if (data.data.length > 0) {
                    setCustomers(data.data);
                    console.log(customers)
                }
            } catch (error) {
                console.error('Error fetching customers:', error);
                setApiError(true);
                setApiErrorMessage("Error fetching customers. Please try again later.");
            }
        };

        fetchCustomers();
    }, [token]);

    const handleEditCustomer = (customerId) => {
        navigate(`/admin/customer/update/${customerId}`);
    };

    return (
        <>
            {apiError ? (
                <section className="contact-section">
                    <div className="auto-container">
                        <div className="contact-title">
                            <h2>{apiErrorMessage}</h2>
                        </div>
                    </div>
                </section>
            ) : (
                <>
                    <section className="contact-section">
                        <div className="auto-container">
                            <div className="contact-title">
                                <h2>Customers</h2>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Added Date</th>
                                        <th>Active</th>
                                        <th>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer) => (
                                        <tr key={customer.customer_id}>
                                            <td>{customer.customer_id}</td>
                                            <td>{customer.customer_first_name}</td>
                                            <td>{customer.customer_last_name}</td>
                                            <td>{customer.customer_email}</td>
                                            <td>{customer.customer_phone_number}</td>
                                            <td>{format(new Date(customer.customer_added_date), 'MM - dd - yyyy | kk:mm')}</td>
                                            <td>{customer.active_customer_status? "Yes" : "No"}</td>
                                            <td>
                                                <div className="edit">
                                                    <Button variant="info" onClick={() => handleEditCustomer(customer.customer_id)}>Edit</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}

export default CustomersList;
