import React, { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import vehicleService from '../../../../services/vehicle.service';

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
    let loggedInEmployeeToken='';
    const {employee}= useAuth();
    if(employee && employee.employee_token){
        // eslint-disable-next-line no-const-assign, no-unused-vars
        loggedInEmployeeToken=employee.employee_token;
    }

    const [serverError, setServerError] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await vehicleService.createVehicle(vehicleData,loggedInEmployeeToken);
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

    const handleShowForm = () => {
        setShowForm(true);
    };
    const handleHideForm=()=>{
        setShowForm(false)
    }

    return (
        <>
            <section className={`contact-section add-vehicle ${showForm ? '' : 'd-none'}`}>
                <button type='submit' onClick={handleHideForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-x-square-fill close`} viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                    </svg>
                </button>
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
            <div className="form-group col-md-12">
                <button className={`theme-btn btn-style-one ${showForm ? 'd-none': ''}` }type="button" data-loading-text="Please wait..." onClick={handleShowForm}><span>Add employee</span></button>
            </div>
        </>
    );
}

export default AddVehicleForm;
