import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../../../contexts/AuthContext';
import { Table, Button } from 'react-bootstrap';
import customerService from '../../../../services/customer.service';
import vehicleService from '../../../../services/vehicle.service';

function SelectVehicle({ onSelectVehicle }) { // Add onSelectVehicle prop
    const { customerId } = useParams();
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

    const handleSelectVehicle = (vehicleId) => {
        onSelectVehicle(vehicleId); // Pass the selected vehicle ID to the parent component
    };

    return (
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
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{vehicle.vehicle_id}</td>
                                <td>{vehicle.year}</td>
                                <td>{vehicle.make}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.type}</td>
                                <td>{vehicle.tag}</td>
                                <td>{vehicle.serial}</td>
                                <td>{vehicle.color}</td>
                                <td>{vehicle.mileage}</td>
                                <td>
                                    <Button onClick={() => handleSelectVehicle(vehicle.vehicle_id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-index-thumb" viewBox="0 0 16 16">
                                            <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.
