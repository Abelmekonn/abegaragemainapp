import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import customerService from "../../../../services/customer.service";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CustomerSearch({ onSelectCustomer }) { 
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const [apiError, setApiError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const { employee } = useAuth();
    const navigate = useNavigate();
    let token = null;
    if (employee) {
        token = employee.token;
    }

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
                    setFilteredCustomers(data.data);
                }
            } catch (error) {
                console.error('Error fetching customers:', error);
                setApiError(true);
                setApiErrorMessage("Error fetching customers. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, [token]);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCustomers(customers);
        } else {
            const filtered = customers.filter(customer =>
                customer.customer_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.customer_last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.customer_phone_number.includes(searchTerm)
            );
            setFilteredCustomers(filtered);
        }
    }, [searchTerm, customers]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEditCustomer = (customerId) => {
        navigate(`/admin/customer/update/${customerId}`);
    };

    const handleSelectCustomer = (customerId) => {
        console.log(customerId)
        onSelectCustomer(customerId);
    };

    return (
        <div>
            <section className='form-control col-md-12 mb-2'>
                <div className='form-group'>
                    <input
                        className='col-11'
                        type="text"
                        placeholder='Search customer by first name, last name, email, or phone number'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        disabled={loading}
                    />
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search align-item-center" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </a>
                </div>
            </section>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <>
                    {apiError && (
                        <Alert variant="danger">{apiErrorMessage}</Alert>
                    )}
                    <Table striped bordered hover responsive>
                        <tbody>
                            {filteredCustomers.map((customer, index) => (
                                <tr key={index}>
                                    <td>{customer.customer_first_name}</td>
                                    <td>{customer.customer_last_name}</td>
                                    <td>{customer.customer_email}</td>
                                    <td>{customer.customer_phone_number}</td>
                                    <td>
                                        <a href="#" onClick={() => handleSelectCustomer(customer.customer_id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-index-thumb" viewBox="0 0 16 16">
                                                <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025" />
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
            <div className="link-btn mt-3">
                <Link to="/admin/add-customer" className="theme-btn btn-style-one">
                    Add new customer
                </Link>
            </div>
        </div>
    );
}

export default CustomerSearch;
