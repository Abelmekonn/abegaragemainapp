import React, { useState } from 'react';
import vehicleService from '../../services/vehicle.service';

function AddVehicleForm() {
    const [vehicleData, setVehicleData] = useState({
        vehicle_year: '',
        vehicle_make: '',
        vehicle_model: '',
        vehicle_type: '',
        vehicle_mileage: '',
        vehicle_tag: '',
        vehicle_serial: '',
        vehicle_color: ''
    });

    const [serverError, setServerError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await vehicleService.createVehicle(vehicleData);
            // Optionally handle success state or redirection
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (error) {
            console.error('Error adding vehicle:', error.message);
            setServerError('Error adding vehicle. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <section className="contact-section">
            <div className="auto-container">
                <div className="contact-title">
                    <h2>Add a new Vehicle</h2>
                </div>
                <div className="row clearfix">
                    <div className="form-column col-lg-7">
                        <div className="inner-column">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="row clearfix">
                                        <div className="form-group col-md-12">
                                            {serverError && <div className="validation-error" role="alert">{serverError}</div>}
                                            <input type="text" name="vehicle_year" value={vehicleData.vehicle_year} onChange={handleChange} placeholder="Vehicle year" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="vehicle_make" value={vehicleData.vehicle_make} onChange={handleChange} placeholder="Vehicle make" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="vehicle_model" value={vehicleData.vehicle_model} onChange={handleChange} placeholder="Vehicle model" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="vehicle_type" value={vehicleData.vehicle_type} onChange={handleChange} placeholder="Vehicle type" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="vehicle_mileage" value={vehicleData.vehicle_mileage} onChange={handleChange} placeholder="Vehicle mileage" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="vehicle_tag" value={vehicleData.vehicle_tag} onChange={handleChange} placeholder="Vehicle tag" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="vehicle_serial" value={vehicleData.vehicle_serial} onChange={handleChange} placeholder="Vehicle serial" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="vehicle_color" value={vehicleData.vehicle_color} onChange={handleChange} placeholder="Vehicle color" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Add Vehicle</span></button>
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

export default AddVehicleForm;
