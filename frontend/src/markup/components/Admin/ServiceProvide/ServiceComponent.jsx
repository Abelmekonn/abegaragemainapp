import React from 'react'
import ServiceList from './ServiceList'
import AddService from './AddService'
function ServiceComponent() {
    return (
        <section className="services-section contact-section" >
            <div className="auto-container col-11">
                <div className="contact-title">
                    <h2>Service we provide</h2>
                    <div className='text'>
                        Bring to the table win-win survival strategies to ensure proactive domination.
                        At the end of day, going forward, a new normal that has evolved from generation x is on the runway heading a streamlined cloud solution.
                    </div>
                </div>
                <ServiceList />
                <AddService />
            </div>
        </section>

    )
}

export default ServiceComponent
