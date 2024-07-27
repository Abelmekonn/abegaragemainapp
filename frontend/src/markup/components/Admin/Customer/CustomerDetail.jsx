import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../../../contexts/AuthContext';
import { Table, Button } from 'react-bootstrap';
import AddVehicleForm from '../Vehicle/AddVehicleForm';
import customerService from '../../../../services/customer.service';
import vehicleService from '../../../../services/vehicle.service';

function CustomerDetail() {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const [apiError, setApiError] = useState(false);
    const { employee } = useAuth();
    let token = null;

    if (employee) {
        token = employee.token;
    }

    useEffect(() => {
        const fetchCustomer = async () => {
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
                const filteredCustomer = data.data.find(customer => customer.customer_id === parseInt(customerId));
                setCustomer(filteredCustomer);
            } catch (error) {
                console.error('Error fetching customers:', error);
                setApiError(true);
                setApiErrorMessage("Error fetching customers. Please try again later.");
            }
        };

        if (customerId) {
            fetchCustomer();
        }
    }, [customerId, token]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await vehicleService.getVehicles(token, customerId);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const filteredVehicles = data.data.filter(vehicle => vehicle.customer_id === parseInt(customerId));
                setVehicles(filteredVehicles);
            } catch (error) {
                console.error('Error fetching vehicles:', error.message);
                setVehicles([]); // Initialize vehicles as an empty array on error
            }
        };

        if (customerId && token) {
            fetchVehicles();
        }
    }, [customerId, token]);

    if (apiError) {
        return <div>{apiErrorMessage}</div>;
    }

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <section className="history-section my-3">
            <div className="auto-container">
                <div className="history-block ">
                    <div className="years">Info</div>
                    <div className="content">
                        <h4>Customer:</h4>
                        <div className="text ">
                            <div className="customer-info"><h5>Email </h5><p>: {customer.customer_email}</p></div>
                            <div className="customer-info"><h5>Phone Number</h5><p>: {customer.customer_phone_number}</p></div>
                            <div className="customer-info"><h5>Active Customer</h5><p>: {customer.active_customer_status ? 'Yes' : 'No'}</p></div>
                            <div className="customer-info"><h5>Edit customer info</h5><p>: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5.5 0 0 0 2.5 15h11a1.5.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5.5 0 0 0 1 2.5z" />
                            </svg>
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="history-block">
                    <div className="years">Cars</div>
                    <div className="content">
                        <h4>Vehicles of {customer.customer_first_name}</h4>
                        <div className="">
                            <div className="text vehicle-box">
                                {vehicles.length === 0 ? (
                                    <p>No vehicles found</p>
                                ) : (
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Year</th>
                                                <th>Make</th>
                                                <th>Model</th>
                                                <th>Type</th>
                                                <th>Tag</th>
                                                <th>Serial</th>
                                                <th>Color</th>
                                                <th>Mileage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vehicles.map((vehicle, index) => (
                                                <tr key={index}>
                                                    <td>{vehicle.vehicle_id}</td>
                                                    <td>{vehicle.vehicle_year}</td>
                                                    <td>{vehicle.vehicle_make}</td>
                                                    <td>{vehicle.vehicle_model}</td>
                                                    <td>{vehicle.vehicle_type}</td>
                                                    <td>{vehicle.vehicle_tag}</td>
                                                    <td>{vehicle.vehicle_serial}</td>
                                                    <td>{vehicle.vehicle_color}</td>
                                                    <td>{vehicle.vehicle_mileage}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </div>
                            <AddVehicleForm />
                        </div>
                    </div>
                </div>
                <div className="history-block">
                    <div className="years">Orders</div>
                    <div className="content">
                        <h4>Orders of {customer.customer_first_name}</h4>
                        <div className="text">Order will display here</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CustomerDetail;
