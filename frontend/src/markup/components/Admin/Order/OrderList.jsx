import React, { useState, useEffect } from "react";
import { Table, Button } from 'eact-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { format } from 'date-fns';
import orderService from "../../../services/order.service";
import { useNavigate } from 'eact-router-dom';

function OrderList() {
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const [apiError, setApiError] = useState(false);
    const [orders, setOrders] = useState([]);
    const { employee } = useAuth();
    let token = null;
    if (employee) {
        token = employee.employee_token;
    }

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await orderService.getAllOrders(token);
                setOrders(response);
            } catch (error) {
                setApiError(true);
                setApiErrorMessage(error.message);
            }
        };
        fetchOrders();
    }, [token]);

    const handleViewOrder = (orderId) => {
        navigate(`/orders/${orderId}`);
    };

    return (
        <div>
            {apiError && (
                <div className="alert alert-danger" role="alert">
                    {apiErrorMessage}
                </div>
            )}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Order Date</th>
                        <th>Received By</th>
                        <th>Status</th>
                        <th>Edit/View</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer_name}</td>
                            <td>{format(new Date(order.order_date), 'yyyy-MM-dd')}</td>
                            <td>{order.received_by}</td>
                            <td>{order.status}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleViewOrder(order.id)}>
                                    View
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default OrderList;