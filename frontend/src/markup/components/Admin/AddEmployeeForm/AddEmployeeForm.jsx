import React from 'react';

function AddEmployeeForm() {
    return (
        <section className="contact-section">
            <div className="auto-container">
                <div className="contact-title">
                    <h2>Add a new employee</h2>
                </div>
                <div className="row clearfix">
                    <div className="form-column col-lg-7">
                        <div className="inner-column contact-form">
                            <form>
                                <div className="row clearfix">
                                    <div className="form-group col-md-12">
                                        <input type="email" name="employee_email" placeholder="Employee email" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <input type="text" name="employee_first_name" placeholder="Employee first name" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <input type="text" name="employee_last_name" placeholder="Employee last name" required />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <input type="text" name="employee_phone" placeholder="Employee phone (555-555-5555)" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <select name="employee_role" className="custom-select-box">
                                            <option value="1">Employee</option>
                                            <option value="2">Manager</option>
                                            <option value="3">Admin</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <input type="password" name="employee_password" placeholder="Employee password" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait...">
                                            <span>Add employee</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AddEmployeeForm;
