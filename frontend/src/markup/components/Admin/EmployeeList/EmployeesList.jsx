// Import the necessary components and hooks
import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { format } from 'date-fns';
import employeeService from "../../../../services/employee.service";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ScrollReveal from 'scrollreveal'; // Import ScrollReveal

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  const navigate = useNavigate();

  let token = employee ? employee.token : null;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getAllEmployees(token);
        if (data.length > 0) {
          console.log(data);
          setEmployees(data);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
        setApiError(true);
        setApiErrorMessage(error.message || "Error fetching employees. Please try again later.");
      }
    };

    fetchEmployees();
  }, [token]);

  const handleEditEmployee = (employeeId) => {
    navigate(`/admin/employee/update/${employeeId}`);
  };

  useEffect(() => {
    // Initialize ScrollReveal
    ScrollReveal().reveal('.table-container', {
      distance: '50px',
      origin: 'bottom',
      duration: 1000,
      interval: 200,
      
    });

    ScrollReveal().reveal('.employee-td', {
      distance: '30px',
      origin: 'right',
      duration: 1000,
      interval: 100,
      
    });
  }, []);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Employees</h2>
              </div>
              <div className="table-container">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Active</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Added Date</th>
                      <th>Role</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.employee_id}>
                        <td className="employee-td">{employee.active_employee ? "Yes" : "No"}</td>
                        <td className="employee-td">{employee.employee_first_name}</td>
                        <td className="employee-td">{employee.employee_last_name}</td>
                        <td className="employee-td">{employee.employee_email}</td>
                        <td className="employee-td">{employee.employee_phone}</td>
                        <td className="employee-td">{format(new Date(employee.added_date), 'MM-dd-yyyy | kk:mm')}</td>
                        <td className="employee-td">{employee.company_role_name}</td>
                        <td>
                          <div className="edit">
                            <a onClick={() => handleEditEmployee(employee.employee_id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                              </svg>
                            </a>
                            <a href="">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                              </svg>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default EmployeesList;
