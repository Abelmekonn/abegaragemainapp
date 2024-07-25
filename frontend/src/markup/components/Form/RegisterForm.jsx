import React, { useState } from 'react';
import customerService from '../../../services/customer.service';

function RegisterForm() {
    const [customer_email, setCustomerEmail] = useState("");
    const [customer_phone_number, setCustomerPhone] = useState("");
    const [customer_first_name, setCustomerFirstName] = useState("");
    const [customer_last_name, setCustomerLastName] = useState("");
    const [customer_password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [active_customer_status] = useState(1);
    const [emailError, setEmailError] = useState('');
    const [serverError, setServerError] = useState('');
    const [firstNameRequired, setFirstNameRequired] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;

        if (!customer_first_name) {
            setFirstNameRequired('First name is required');
            valid = false;
        } else {
            setFirstNameRequired('');
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!customer_email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!emailRegex.test(customer_email)) {
            setEmailError('Invalid email format');
            valid = false;
        } else {
            setEmailError('');
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number
        if (!customer_password) {
            setPasswordError('Password is required');
            valid = false;
        } else if (!passwordRegex.test(customer_password)) {
            setPasswordError('Password must be at least 8 characters long and include at least one letter and one number');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (customer_password !== confirm_password) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (!valid) {
            return;
        }

        const formData = {
            customer_email,
            customer_first_name,
            customer_last_name,
            customer_phone_number,
            customer_password,
            active_customer_status,
        };

        try {
            const response = await customerService.createCustomer(formData);
            if (response.error) {
                setServerError(response.error);
            } else {
                setServerError('');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            }
        } catch (error) {
            console.error('Error creating customer:', error.message);
            setServerError('Error creating customer. Please try again.');
        }
    };

    return (
        <section className="contact-section">
            <div className="auto-container">
                <div className="contact-title">
                    <h2>Add a new customer</h2>
                </div>
                <div className="row clearfix">
                    <div className="form-column col-lg-7">
                        <div className="inner-column">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="row clearfix">
                                        <div className="form-group col-md-12">
                                            {serverError && <div className="validation-error" role="alert">{serverError}</div>}
                                            <input type="email" name="customer_email" value={customer_email} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="Customer email" />
                                            {emailError && <div className="validation-error" role="alert">{emailError}</div>}
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="customer_first_name" value={customer_first_name} onChange={(e) => setCustomerFirstName(e.target.value)} placeholder="Customer first name" />
                                            {firstNameRequired && <div className="validation-error" role="alert">{firstNameRequired}</div>}
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="customer_last_name" value={customer_last_name} onChange={(e) => setCustomerLastName(e.target.value)} placeholder="Customer last name" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="customer_phone" value={customer_phone_number} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Customer phone (555-555-5555)" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="password" name="customer_password" value={customer_password} onChange={(e) => setPassword(e.target.value)} placeholder="Customer password" />
                                            {passwordError && <div className="validation-error" role="alert">{passwordError}</div>}
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="password" name="confirm_password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" />
                                            {confirmPasswordError && <div className="validation-error" role="alert">{confirmPasswordError}</div>}
                                        </div>
                                        <div className="form-group col-md-12">
                                            <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Add customer</span></button>
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

export default RegisterForm;
