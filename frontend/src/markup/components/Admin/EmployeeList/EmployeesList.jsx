// Import the necessary components and hooks
import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { format } from 'date-fns';
import employeeService from "../../../../services/employee.service";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await employeeService.getAllEmployees(token);
        if (!response.ok) {
          setApiError(true);
          if (response.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (response.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
          return;
        }
        const data = await response.json();
        if (data.data.length > 0) {
          setEmployees(data.data);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
        setApiError(true);
        setApiErrorMessage("Error fetching employees. Please try again later.");
      }
    };

    fetchEmployees();
  }, [token]);

  const handleEditEmployee = (employeeId) => {
    // Navigate to the edit page with employeeId
    navigate(`/admin/employee/update/${employeeId}`);
  };

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
              <Table striped bordered hover>
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
                      <td>{employee.active_employee ? "Yes" : "No"}</td>
                      <td>{employee.employee_first_name}</td>
                      <td>{employee.employee_last_name}</td>
                      <td>{employee.employee_email}</td>
                      <td>{employee.employee_phone}</td>
                      <td>{format(new Date(employee.added_date), 'MM - dd - yyyy | kk:mm')}</td>
                      <td>{employee.company_role_name}</td>
                      <td>
                        <div className="edit">
                          <Button variant="info" onClick={() => handleEditEmployee(employee.employee_id)}>Edit</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default EmployeesList;
