import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {LogIn} from '../../../services/login.service';

function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [serverError, setServerError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Client-side validation
        let valid = true;

        if (!email) {
            setEmailError('Please enter your email address');
            valid = false;
        } else if (!email.includes('@')) {
            setEmailError('Invalid email format');
            valid = false;
        } else {
            const regex = /^\S+@\S+\.\S+$/;
            if (!regex.test(email)) {
                setEmailError('Invalid email format');
                valid = false;
            } else {
                setEmailError('');
            }
            
        }

        if (!password || password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (!valid) {
            return;
        }

        try {
            const formData = {
                email,
                password
            };

            const data = await LogIn(formData);

            if (data.status === 'success') {
                if (data.data.token) {
                    localStorage.setItem('employee', JSON.stringify(data.data));
                    window.location.reload();
                }
                if (location.pathname === '/login') {
                    navigate('/');
                    window.location.reload();
                } else {
                    window.location.reload();
                }
            } else {
                setServerError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error.message);
            setServerError('An error occurred while logging in. Please try again later.');
        }
    };

    return (
        <section className="contact-section">
            <div className="auto-container">
                <div className="contact-title">
                    <h2>Login to your account</h2>
                </div>
                <div className="row clearfix">
                    <div className="form-column col-lg-7">
                        <div className="inner-column">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="row clearfix">
                                        <div className="form-group col-md-12">
                                            {serverError && <div className="validation-error" role="alert">{serverError}</div>}
                                            <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
                                            {emailError && <div className="validation-error" role="alert">{emailError}</div>}
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                                            {passwordError && <div className="validation-error" role="alert">{passwordError}</div>}
                                        </div>
                                        <div className="form-group col-md-12">
                                            <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Login</span></button>
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

export default LoginForm;
