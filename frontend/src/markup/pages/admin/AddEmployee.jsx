import React from 'react';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'; // Ensure to import AdminMenu component
import AddEmployeeForm from '../../components/Admin/AddEmployeeForm/AddEmployeeForm';// Ensure to import AddEmployeeForm component

function AddEmployee() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <AddEmployeeForm />
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
