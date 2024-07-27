import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../../../contexts/AuthContext';
import vehicleService from '../../../../services/vehicle.service';

function AddVehicleForm() {
    const { customerId } = useParams();
    const [vehicle_year, setVehicleYear] = useState('');
    const [vehicle_make, setVehicleMake] = useState('');
    const [vehicle_model, setVehicleModel] = useState('');
    const [vehicle_type, setVehicleType] = useState('');
    const [vehicle_mileage, setVehicleMileage] = useState('');
    const [vehicle_tag, setVehicleTag] = useState('');
    const [vehicle_serial, setVehicleSerial] = useState('');
    const [vehicle_color, setVehicleColor] = useState('');
    const [serverError, setServerError] = useState('');
    const [showForm, setShowForm] = useState(false);

    let loggedInEmployeeToken = '';
    const { employee } = useAuth();
    if (employee && employee.token) {
        loggedInEmployeeToken = employee.token;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        const vehicleData = {
            customer_id: customerId,
            vehicle_year,
            vehicle_make,
            vehicle_model,
            vehicle_type,
            vehicle_mileage,
            vehicle_tag,
            vehicle_serial,
            vehicle_color,
        };

        try {
            await vehicleService.createVehicle(vehicleData, loggedInEmployeeToken);
            // Optionally handle success state or redirection
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (error) {
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
    };

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleHideForm = () => {
        setShowForm(false);
    };

    return (
        <>
            <section className={`contact-section add-vehicle ${showForm ? '' : 'd-none'}`}>
                <button type="button" onClick={handleHideForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square-fill close" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 1 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
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
                                                <input
                                                    type="text"
                                                    name="vehicle_year"
                                                    value={vehicle_year}
                                                    onChange={(e) => setVehicleYear(e.target.value)}
                                                    placeholder="Vehicle year"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <input
                                                    type="text"
                                                    name="vehicle_make"
                                                    value={vehicle_make}
                                                    onChange={(e) => setVehicleMake(e.target.value)}
                                                    placeholder="Vehicle make"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <input
                                                    type="text"
                                                    name="vehicle_model"
                                                    value={vehicle_model}
                                                    onChange={(e) => setVehicleModel(e.target.value)}
                                                    placeholder="Vehicle model"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <input
                                                    type="text"
                                                    name="vehicle_type"
                                                    value={vehicle_type}
                                                    onChange={(e) => setVehicleType(e.target.value)}
                                                    placeholder="Vehicle type"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <input
                                                    type="text"
                                                    name="vehicle_mileage"
                                                    value={vehicle_mileage}
                                                    onChange={(e) => setVehicleMileage(e.target.value)}
                                                    placeholder="Vehicle mileage"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <input
                                                    type="text"
                                                    name="vehicle_tag"
                                                    value={vehicle_tag}
                                                    onChange={(e) => setVehicleTag(e.target.value)}
                                                    placeholder="Vehicle tag"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <input
                                                    type="text"
                                                    name="vehicle_serial"
                                                    value={vehicle_serial}
                                                    onChange={(e) => setVehicleSerial(e.target.value)}
                                                    placeholder="Vehicle serial"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <input
                                                    type="text"
                                                    name="vehicle_color"
                                                    value={vehicle_color}
                                                    onChange={(e) => setVehicleColor(e.target.value)}
                                                    placeholder="Vehicle color"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait...">
                                                    <span>Add Vehicle</span>
                                                </button>
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
                <button className={`theme-btn btn-style-one ${showForm ? 'd-none' : ''}`} type="button" data-loading-text="Please wait..." onClick={handleShowForm}>
                    <span>Add vehicle</span>
                </button>
            </div>
        </>
    );
}

export default AddVehicleForm;
