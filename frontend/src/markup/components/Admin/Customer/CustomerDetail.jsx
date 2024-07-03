import React from 'react'
import AddVehicleForm from '../Vehicle/AddVehicleForm'
function CustomerDetail() {
    return (
        <section className="history-section my-3">
            <div className="auto-container">
                <div className="history-block ">
                    <div className="years">Info</div>
                    <div className="content">
                        <h4>Customer:</h4>
                        <div className="text ">
                            <div className="customer-info"><h5>Email </h5><p>: Abel@gmail.com</p></div>
                            <div className="customer-info"><h5>Phone Number</h5><p>: 0945774931 </p></div>
                            <div className="customer-info"><h5>Active Customer</h5><p>: yes </p></div>
                            <div className="customer-info"><h5>Edit customer info</h5><p>: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="history-block">
                    <div className="years">Cars</div>
                    <div className="content">
                        <h4>Vehicle of Adugna</h4>
                        <div className="">
                            <div className="text vehicle-box">
                                no vehicle found
                            </div>
                            <AddVehicleForm />
                        </div>
                    </div>
                </div>
                <div className="history-block">
                    <div className="years">Orders</div>
                    <div className="content">
                        <h4>Order of </h4>
                        <div className="text">Order will display here</div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default CustomerDetail
