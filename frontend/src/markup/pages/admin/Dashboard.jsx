import React from 'react'
import { useAuth } from "../../../contexts/AuthContext";
// Import the login form component 
import LoginForm from '../../components/LoginForm/LoginForm';
// Import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";


function Dashboard() {
    const { isLogged, isAdmin } = useAuth();

    if (isLogged) {
        if (isAdmin) {
            return (
                <div>
                    <div className="container-fluid admin-pages">
                        <div className="row">
                            <div className="col-md-3 admin-left-side">
                                <AdminMenu />
                            </div>
                            <div className="col-md-9 admin-right-side">
                                <section className="services-section">
                                    <div className="auto-container">
                                        <div className="sec-title style-two">
                                            <h2>Admin dashboard</h2>
                                            <div className="text">
                                                Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day,
                                                going forward, a new normal that has evolved from generation X is on the runway heading towards a
                                                streamlined cloud solution.
                                            </div>
                                        </div>
                                        <div className="row">
                                            {[
                                                { title: 'Performance Upgrade', icon: 'flaticon-power' },
                                                { title: 'Transmission Services', icon: 'flaticon-gearbox' },
                                                { title: 'Break Repair & Service', icon: 'flaticon-brake-disc' },
                                                { title: 'Engine Service & Repair', icon: 'flaticon-car-engine' },
                                                { title: 'Tyre , Wheels & accessories', icon: 'flaticon-tire' },
                                                { title: 'Denting & Painting', icon: 'flaticon-spray-gun' },
                                                { title: 'Engine Service & Repair', icon: 'flaticon-car-engine' },
                                                { title: 'Tyre , Wheels & accessories', icon: 'flaticon-tire' },
                                                { title: 'Denting & Painting', icon: 'flaticon-spray-gun' },
                                            ].map((service, index) => (
                                                <div key={index} className="col-lg-4 service-block-one">
                                                    <div className="inner-box hvr-float-shadow">
                                                        <h5>Service and Repairs</h5>
                                                        <h2>{service.title}</h2>
                                                        <a href="#" className="read-more">
                                                            read more +
                                                        </a>
                                                        <div className="icon">
                                                            <span className={service.icon}></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>You are not authorized to access this page</h1>
                </div>
            );
        }
    } else {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
}

export default Dashboard
