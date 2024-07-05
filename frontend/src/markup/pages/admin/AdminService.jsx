import React from 'react'
import ServiceComponent from '../../components/Admin/ServiceProvide/ServiceComponent'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
function AdminService() {
    return (
        <>
            <div className="container-fluid admin-pages ">
                <div className="row">
                    <div className="col-md-3 admin-left-side">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 admin-right-side">
                        <ServiceComponent />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminService
