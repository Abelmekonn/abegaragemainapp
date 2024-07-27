import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import employeeService from '../../../../services/employee.service';
import { useAuth } from '../../../../contexts/AuthContext';

const UpdateEmployeeComponent = () => {
    const { employeeId } = useParams();
    const { employee } = useAuth();
    const loggedInEmployeeToken = employee?.token || '';
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState({
        employee_first_name: '',
        employee_last_name: '',
        employee_phone: '',
        company_role_id: '',
        active_employee: 1,
    });

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await employeeService.getAllEmployees(loggedInEmployeeToken);
                const data = await response;
                const employees = data ; // Adjust if the API response has a 'data' property
                const employeeToEdit = employees.find(emp => emp.employee_id === parseInt(employeeId, 10));
                if (employeeToEdit) {
                    setEmployeeData(employeeToEdit);
                }
            } catch (error) {
                console.error('Error fetching employee data:', error.message);
            }
        };
        fetchEmployeeData();
    }, [employeeId, loggedInEmployeeToken]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEmployeeData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await employeeService.updateEmployee(employeeData, loggedInEmployeeToken);
            navigate('/admin/employees');
        } catch (error) {
            console.error('Error updating employee:', error.message);
        }
    };

    return (
        <section className="contact-section">
            <div className="auto-container">
                <div className="contact-title">
                    <h2>Edit: {employeeData.employee_first_name} {employeeData.employee_last_name}</h2>
                </div>
                <div className="row clearfix">
                    <div className="form-column col-lg-7">
                        <div className="inner-column">
                            <div className="contact-form">
                                <h4>Email: {employeeData.employee_email}</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="row clearfix">
                                        <div className="form-group col-md-12">
                                            <input
                                                type="text"
                                                name="employee_first_name"
                                                value={employeeData.employee_first_name}
                                                onChange={handleChange}
                                                placeholder="Employee first name"
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input
                                                type="text"
                                                name="employee_last_name"
                                                value={employeeData.employee_last_name}
                                                onChange={handleChange}
                                                placeholder="Employee last name"
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input
                                                type="text"
                                                name="employee_phone"
                                                value={employeeData.employee_phone}
                                                onChange={handleChange}
                                                placeholder="Employee phone (555-555-5555)"
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <select
                                                name="company_role_id"
                                                value={employeeData.company_role_id}
                                                onChange={handleChange}
                                                className="custom-select-box"
                                            >
                                                <option value="1">Employee</option>
                                                <option value="2">Manager</option>
                                                <option value="3">Admin</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="active_employee"
                                                    checked={employeeData.active_employee === 1}
                                                    onChange={handleChange}
                                                />
                                                Active Employee
                                            </label>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait...">
                                                <span>Update Employee</span>
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
    );
};

export default UpdateEmployeeComponent;
