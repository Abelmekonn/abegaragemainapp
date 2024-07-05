import React, { useState, useEffect } from 'react';
import serviceService from '../../../../services/service.service';
import { useAuth } from '../../../../contexts/AuthContext';

function ServiceList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { employee } = useAuth();
    let token = '';

    if (employee && employee.employee_token) {
        token = employee.employee_token;
    }

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceService.getAllServices(token);
                 // Log the response to see its format
                if (response.status === 'success' && Array.isArray(response.data)) {
                    setServices(response.data);
                } else {
                    setError('Unexpected response format. Please check the API response.');
                }
            } catch (error) {
                setError('Failed to fetch services. Please try again.');
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleDelete = async (serviceId) => {
        try {
            await serviceService.deleteService(serviceId, token);
            setServices(services.filter(service => service.service_id !== serviceId));
        } catch (error) {
            setError('Failed to delete service. Please try again.');
            console.error('Error deleting service:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {services.map(service => (
                <div key={service.service_id} className='service-box mb-2'>
                    <h5 className='px-3'>{service.service_name}</h5>
                    <div className='d-flex justify-content-between'>
                        <p className='col-10 '>{service.service_description}</p>
                        <div className="edit col-1 d-flex justify-content-between">
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>
                            </a>

                            <a href="#" onClick={() => handleDelete(service.service_id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ServiceList;
