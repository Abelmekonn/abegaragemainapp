import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import customerService from '../../../../services/customer.service';

function CustomerUpdate() {
    const { customerId } = useParams();
    const { employee } = useAuth();
    let token = null;
    if (employee) {
        token = employee.token;
    }
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState({
        customer_phone_number: '',
        customer_first_name: '',
        customer_last_name: '',
        active_customer_status: 1,  // Default to active status
        customer_id: customerId  // Ensure the customer ID is included
    });

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await customerService.getAllCustomers(token);
                const data = await response.json();
                const customers = data.data ;
                const customerToEdit = customers.find(cust => cust.customer_id === parseInt(customerId, 10));
                if (customerToEdit) {
                    setCustomerData(prevData => ({
                        ...prevData,
                        customer_phone_number: customerToEdit.customer_phone_number,
                        customer_first_name: customerToEdit.customer_first_name,
                        customer_last_name: customerToEdit.customer_last_name,
                        active_customer_status: customerToEdit.active_customer_status
                    }));
                }
            } catch (error) {
                console.error('Error fetching customer data:', error.message);
            }
        };
        fetchCustomerData();
    }, [customerId, token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCustomerData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Log the payload
        try {
            await customerService.updateCustomer(customerData, token);
            navigate('/admin/customers');
        } catch (error) {
            console.error('Error updating customer:', error.message);
        }
    };

    return (
        <section className="contact-section">
            <div className="auto-container">
                <div className="contact-title">
                    <h2>Update Customer</h2>
                </div>
                <div className="row clearfix">
                    <div className="form-column col-lg-7">
                        <div className="inner-column">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="row clearfix">
                                        <div className="form-group col-md-12">
                                            <input type="text" name="customer_first_name" value={customerData.customer_first_name} onChange={handleChange} placeholder="Customer first name" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="customer_last_name" value={customerData.customer_last_name} onChange={handleChange} placeholder="Customer last name" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="customer_phone_number" value={customerData.customer_phone_number} onChange={handleChange} placeholder="Customer phone (555-555-5555)" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>
                                                <input type="checkbox" name="active_customer_status" checked={customerData.active_customer_status === 1} onChange={handleChange} />
                                                Active Customer
                                            </label>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Update Customer</span></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CustomerUpdate;
