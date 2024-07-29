import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import orderService from "../../services/order.service";
import customerService from "../../services/customer.service";
import vehicleService from "../../services/vehicle.service";
import serviceService from "../../services/service.service";
import ScrollReveal from 'scrollreveal';

function Order() {
    const { orderId } = useParams();
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const [apiError, setApiError] = useState(false);
    const [customer, setCustomer] = useState({});
    const [serviceIdsArray, setServiceIdsArray] = useState([]);
    const [services, setServices] = useState([]);
    const [vehicle, setVehicle] = useState({});
    const [order, setOrder] = useState({});
    const { employee } = useAuth();
    let token = null;
    let customer_id = null;
    if (employee) {
        token = employee.token;
        customer_id = employee.id;
    }

    useEffect(() => {
        async function fetchOrder() {
            try {
                const response = await orderService.getOrderByCustomerId(customer_id, token);
                setOrder(response[0])
                console.log(response)
                setApiError(false);
                setApiErrorMessage(null);
            } catch (error) {
                console.error("Error fetching order:", error.message);
                setApiError(true);
                setApiErrorMessage(error.message);
            }
        }
        if (token) {
            fetchOrder();
        }
    }, [token, customer_id]);

    useEffect(() => {
        if (Object.keys(order).length > 0) {
            fetchCustomer(order.customerId);
            fetchVehicle(order.vehicleId);

            if (order.services) {
                const serviceIds = order.services.map(service => parseInt(service.serviceId));
                setServiceIdsArray(serviceIds);
                console.log(serviceIds)
            }

            fetchServices();
        }
    }, [order]);

    const fetchCustomer = async () => {
        try {
            const response = await customerService.getCustomerById(customer_id);


            if (response.status !== 'success') {
                throw new Error('Failed to fetch customer data');
            }

            setCustomer(response.data);

        } catch (error) {
            console.error('Error fetching customer:', error.message);
            setApiError(true);
            setApiErrorMessage('Error fetching customer. Please try again later.');
        }
    };

    const fetchVehicle = async () => {
        try {
            const vehicleId = order.vehicleId;
            const response = await vehicleService.getVehicleByVehicleId(vehicleId);
            setVehicle(response.data);
        } catch (error) {
            console.error("Error fetching vehicle:", error.message);
            setApiError(true);
            setApiErrorMessage("Error fetching vehicle. Please try again later.");
        }
    };


    const fetchServices = async () => {
        try {
            const responses = await Promise.all(
                serviceIdsArray.map((id) =>
                    serviceService.getServiceById(id).catch((error) => {
                        console.error(`Error fetching service ${id}:`, error);
                        return null; // or some other default value
                    })
                )
            );
            
            const allService=responses.map((response) => response.data);
            setServices(allService);
            console.log(services)
        } catch (error) {
            setApiError('Failed to fetch services. Please try again.');
            console.error('Error fetching services:', error);
        }
    };

    const handleApiError = (response) => {
        setApiError(true);
        if (response.status === 401) {
            setApiErrorMessage("Please login again");
        } else if (response.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
        }
    };

    const getOrderStatus = (status) => {
        switch (status) {
            case 0:
                return "Pending";
            case 1:
                return "In Progress";
            case 2:
                return "Completed";
            default:
                return "Unknown Status";
        }
    };

    const getOrderStatusClassName = (status) => {
        switch (status) {
            case 0:
                return "status status-pending";
            case 1:
                return "status status-in-progress";
            case 2:
                return "status status-completed";
            default:
                return "status-unknown";
        }
    };

    useEffect(() => {
        ScrollReveal().reveal('.service-block-one', {
            distance: '50px',
            origin: 'bottom',
            duration: 1000,
            interval: 200,
        });

        ScrollReveal().reveal('.sec-title', {
            distance: '50px',
            origin: 'left',
            duration: 1000,
        });

        ScrollReveal().reveal('.service-box', {
            distance: '50px',
            origin: 'right',
            duration: 1000,
            interval: 300,
        });
    }, []);

    return (
        <div>
            {apiError && (
                <div className="alert alert-danger" role="alert">
                    {apiErrorMessage}
                </div>
            )}
            <section className="services-section">
                <div className="auto-container">
                    <div className="sec-title style-two">
                        <div className="row mx-1 d-flex justify-content-between">
                            <h2>{customer.customer_first_name} {customer.customer_last_name}</h2>
                            <p className={getOrderStatusClassName(order.order_status)}>{getOrderStatus(order.orderStatus)}</p>
                        </div>
                        <div className="text">
                            Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day,
                            going forward, a new normal that has evolved from generation X is on the runway heading towards a
                            streamlined cloud solution.
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 service-block-one">
                            <div className="inner-box hvr-float-shadow">
                                <h5>Customer</h5>
                                <h2 className="mb-4">
                                    {customer.customer_first_name} {customer.customer_last_name}
                                </h2>
                                <h6>
                                    Email: <span className="fs">{customer.customer_email}</span>
                                </h6>
                                <h6>
                                    Phone number: <span className="fs">{customer.customer_phone_number}</span>
                                </h6>

                            </div>
                        </div>
                        <div className="col-lg-6 service-block-one">
                            <div className="inner-box hvr-float-shadow">
                                <h5>Vehicle</h5>
                                <h2 className="mb-4">
                                    {vehicle.vehicle_model} ({vehicle.vehicle_color})
                                </h2>
                                <h6>
                                    Vehicle tag: <span className="fs">{vehicle.vehicle_tag}</span>
                                </h6>
                                <h6>
                                    Vehicle year: <span className="fs">{vehicle.vehicle_year}</span>
                                </h6>
                                <h6>
                                    Vehicle Mileage: <span className="fs">{vehicle.vehicle_mileage}</span>
                                </h6>
                            </div>
                        </div>
                        <div className="col-lg-12 service-block-one">
                            <div className="inner-box hvr-float-shadow">
                                <h5>Services</h5>
                                <h2 className="mb-4">Requested service</h2>
                                {services.map(service => (
                                    <div key={service.service_id} className='service-box mb-2'>
                                        <h5 className='px-3'>{service.service_name}</h5>
                                        <div className='d-flex justify-content-between'>
                                            <p className='col-10 '>{service.service_description}</p>
                                            
                                        </div>
                                    </div>
                                ))}
                                <div className='service-box mb-2'>
                                    <h5 className='px-3'>Additional request</h5>
                                    <div className='d-flex justify-content-between'>
                                        <p className='col-10 '>{order.additionalRequest}</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Order;
