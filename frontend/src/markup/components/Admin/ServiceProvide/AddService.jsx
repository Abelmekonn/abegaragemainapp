import React, { useState } from 'react';
import serviceService from '../../../../services/service.service';
import { useAuth } from '../../../../contexts/AuthContext';

function AddService() {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    let token='';
    const {employee}= useAuth();
    if(employee && employee.employee_token){
        // eslint-disable-next-line no-const-assign
        token=employee.employee_token;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate input
        if (!serviceName || !description) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            // Get the token (replace with actual method to get the token)
            
            
            // Create service data
            const serviceData = { service_name: serviceName, service_description: description };
            
            // Make API call to create service
            await serviceService.createService(serviceData, token);
            
            setSuccess('Service added successfully!');
            location.reload();
            setServiceName('');
            setDescription('');
        } catch (error) {
            setError('Failed to add service. Please try again.');
            console.error('Error adding service:', error);
        }
    };

    return (
        <section className="contact-section service-box mt-3">
            <div className="auto-container">
                <div className="contact-title">
                    <h2>Add a new service</h2>
                </div>
                <div className="row clearfix">
                    <div className="form-column col-lg-7">
                        <div className="inner-column">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="row clearfix">
                                        <div className="form-group col-md-12">
                                            <input 
                                                type="text" 
                                                name="service_name" 
                                                placeholder="Service name" 
                                                value={serviceName} 
                                                onChange={(e) => setServiceName(e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <textarea 
                                                name="description" 
                                                placeholder="Description" 
                                                value={description} 
                                                onChange={(e) => setDescription(e.target.value)} 
                                            />
                                        </div>
                                        {error && <div className="form-group col-md-12"><span className="error">{error}</span></div>}
                                        {success && <div className="form-group col-md-12"><span className="success">{success}</span></div>}
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
    );
}

export default AddService;
