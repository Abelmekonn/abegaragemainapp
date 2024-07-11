import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { Table, Button } from 'react-bootstrap';
import customerService from '../../../../services/customer.service';
import vehicleService from '../../../../services/vehicle.service';
import serviceService from '../../../../services/service.service';

function SelectService({ customerId, vehicleId, onSelectService }) {
    const [service, setService] = useState([])
    const [customer, setCustomer] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const [apiError, setApiError] = useState(false);
    const { employee } = useAuth();
    let token = null;
    if (employee) {
        token = employee.employee_token;
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
                const filteredVehicles = data.data.filter(vehicle => vehicle.vehicle_id === parseInt(vehicleId));
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

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceService.getAllServices(token);
                // Log the response to see its format
                if (response.status === 'success' && Array.isArray(response.data)) {
                    setService(response.data);
                } else {
                    setApiError('Unexpected response format. Please check the API response.');
                }
            } catch (error) {
                setApiError('Failed to fetch services. Please try again.');
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, [customerId, vehicleId]);


    return (
        <div>
            <div>
                {customer && (
                    <div className="service-box">
                        <h4>{customer.customer_first_name} {customer.customer_last_name}</h4>
                        <div className="customer-info"><h6>Email:</h6><p className='highlight'>{customer.customer_email}</p></div>
                        <div className="customer-info"><h6>Phone Number:</h6><p>{customer.customer_phone_number}</p></div>
                        <div className="customer-info"><h6>Active Customer:</h6><p>{customer.active_customer ? 'Yes' : 'No'}</p></div>
                        <div className="customer-info">
                            <h6>Edit customer info:</h6>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square bi-trash" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>
                            </p>
                        </div>
                    </div>
                )}
                <div className='service-box mt-3'>
                    <Table striped hover responsive >
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
                            ))
                            }
                        </tbody>
                    </Table></div>
            </div>
            <div className='service-box mt-3 py-4'>
                <h3>choose service</h3>
                <div>
                    {service.map(service => (
                        <div key={service.service_id} className='service-box mb-2'>
                            <h5 className='px-3'>{service.service_name}</h5>
                            <div className='d-flex justify-content-between'>
                                <p className='col-10 '>{service.service_description}</p>
                                <div className="edit col-1 d-flex justify-content-between">
                                    <input type="checkbox" className='bordered' style={{ width: '25px' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <section className="contact-section service-box mt-3">
                <div className="auto-container">
                    <div className="contact-title">
                        <h2>Additional request</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="form-column col-lg-7">
                            <div className="inner-column">
                                <div className="contact-form">
                                    <form >
                                        <div className="row clearfix">
                                            <div className="form-group col-md-12">
                                                <textarea
                                                    name="description"
                                                    placeholder="Additional request"

                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <input
                                                    type="text"
                                                    name="service_name"
                                                    placeholder="price"

                                                />
                                            </div>

                                            <div className="form-group col-md-12">
                                                <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Add service</span></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SelectService;