import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { format } from 'date-fns';
import orderService from '../../../../services/order.service'
import customerService from '../../../../services/customer.service';
import vehicleService from '../../../../services/vehicle.service';
import employeeService from "../../../../services/employee.service";
import { useNavigate } from 'react-router-dom';

function OrderList() {
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const [apiError, setApiError] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [orders, setOrders] = useState([]);
    const { employee } = useAuth();
    const token = employee ? employee.token : null;
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await orderService.getAllOrders(token);

                setOrders(response); // Set orders state with response

                setApiError(false);
                setApiErrorMessage(null);
            } catch (error) {
                console.error('Error fetching orders:', error.message);
                setApiError(true);
                setApiErrorMessage(error.message);
            }
        }
        if (token) {
            fetchOrders();
        }
    }, [token]);
    useEffect(() => {
        if (orders.length > 0) {
            const vehicleIds = orders.map(order => order.vehicle_id);
            fetchVehicles(vehicleIds);

            const employeeIds = orders.map(order => order.employee_id);
            fetchEmployees(employeeIds);

            const customerId = orders.map(order => order.customer_id);
            fetchCustomer(customerId);
        }
    }, [orders]);
    const fetchCustomer = async (customerId) => {
        try {
            const response = await customerService.getAllCustomers(token);
            if (!response.ok) {
                setApiError(true);
                if (response.status === 401) {
                    setApiErrorMessage("Please login again");
                } else if (response.status === 403) {
                    setApiErrorMessage("You are not authorized to view this page");
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
    const fetchVehicles = async (vehicleIds) => {
        try {
            const response = await vehicleService.getVehicles(token, vehicleIds);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const filteredVehicles = data.data.find(vehicle => vehicle.vehicle_id === parseInt(vehicleIds));
            setVehicles(filteredVehicles);
        } catch (error) {
            console.error('Error fetching vehicles:', error.message);
            setVehicles([]); // Initialize vehicles as an empty array on error
        }
    };
    const fetchEmployees = async (employeeIds) => {
        try {
            const response = await employeeService.getAllEmployees(token, employeeIds);
            const filteredEmployees = response.filter((employee) => employeeIds.includes(employee.employee_id));

            // Loop through the filtered employees and add to the state array
            setEmployees((prevEmployees) => [...prevEmployees, ...filteredEmployees]);
            console.log(employees)
        } catch (error) {
            console.error('Error fetching employees:', error.message);
            setApiError(true);
            setApiErrorMessage("Error fetching employees. Please try again later.");
        }
    };


    const handleViewOrder = (orderId) => {
        navigate(`/admin/orders/${orderId}`);
    };

    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), 'yyyy-MM-dd');
        } catch (error) {
            console.error('Error formatting date:', error.message);
            return 'Invalid Date';
        }
    };

    const getOrderStatus = (status) => {
        switch (status) {
            case 0:
                return 'Pending';
            case 1:
                return 'In Progress';
            case 2:
                return 'Completed';
            default:
                return 'Unknown Status';
        }
    }
    const getOrderStatusClassName = (status) => {
        switch (status) {
            case 0:
                return 'status status-pending';
            case 1:
                return 'status status-in-progress';
            case 2:
                return 'status status-completed';
            default:
                return 'status-unknown';
        }
    }

    return (
        <div>
            {apiError && (
                <div className="alert alert-danger" role="alert">
                    {apiErrorMessage}
                </div>
            )}
            <section className="contact-section">
                <div className="auto-container">
                    <div className="contact-title">
                        <h2>Orders</h2>
                    </div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Vehicle ID</th>
                                <th>Order Date</th>
                                <th>Received By</th>
                                <th>Status</th>
                                <th>Edit/View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.order_id}>
                                    <td>{order.order_id}</td>
                                    <td><div>{`${customer.customer_first_name} ${customer.customer_last_name}`} <br /> {customer.customer_email} <br /> {customer.customer_phone_number}</div></td>
                                    <td>{vehicles.vehicle_model} <br /> {vehicles.vehicle_year} <br /> {vehicles.vehicle_serial}</td>
                                    <td>{formatDate(order.order_date)}</td>
                                    <td>
                                        {employees.find((employee) => employee.employee_id === order.employee_id)?.employee_first_name}
                                    </td>
                                    <td ><p className={getOrderStatusClassName(order.order_status)}>{getOrderStatus(order.order_status)}</p></td>
                                    <td>
                                        <div className="edit d-flex justify-content-around">
                                            <a onClick={() => handleViewOrder(order.order_id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg></a>
                                            <a onClick={() => handleViewOrder(order.order_id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                            </svg></a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </section>
        </div>
    );
}

export default OrderList;