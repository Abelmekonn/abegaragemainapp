import React from 'react'

function SelectService() {
    return (
        <div>
            <div className=" service-box mb-3">
                <h4>Abel mekonn</h4>
                <div className="customer-info"><h6>Email :</h6><p className='highlight'> Abel@gmail.com</p></div>
                <div className="customer-info"><h6>Phone Number :</h6><p> 0945774931 </p></div>
                <div className="customer-info"><h6>Active Customer :</h6><p> yes </p></div>
                <div className="customer-info"><h6>Edit customer info :</h6><p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square bi-trash" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
                </p>

                </div>
            </div>
            <div className=" service-box">
                <h4>Bmw</h4>
                <div className="customer-info"><h6>Email :</h6><p className='highlight'> Abel@gmail.com</p></div>
                <div className="customer-info"><h6>Phone Number :</h6><p> 0945774931 </p></div>
                <div className="customer-info"><h6>Active Customer :</h6><p> yes </p></div>
                <div className="customer-info"><h6>Edit customer info :</h6><p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square bi-trash" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
                </p>

                </div>
            </div>
            <div className='service-box mt-3 py-4'>
                <h3>choose service</h3>
                <div className='service-box mb-2'>
                    <h6>Lorem ipsum dolor </h6>
                    <div className='d-flex justify-content-between'>
                        <p>sit nostrument culpa, necessitatibus eaque sapiente! Magnam, assumenda?</p>
                        <input type="checkbox" className='bordered' style={{ width: '25px' }} />

                    </div>
                </div>
                <div className='service-box mb-2'>
                    <h6>Lorem ipsum dolor </h6>
                    <div className='d-flex justify-content-between'>
                        <p>sit nostrument culpa, necessitatibus eaque sapiente! Magnam, assumenda?</p>
                        <input type="checkbox" className='bordered' style={{ width: '25px' }} />

                    </div>
                </div>
            </div>
            <section className="contact-section service-box mt-3">
                <div className="auto-container">
                    <div className="contact-title">
                        <h2>Additional request</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="form-column col-lg-7">
                            <div className="inner-column">
                                <div className="contact-form">
                                    <form >
                                        <div className="row clearfix">
                                            <div className="form-group col-md-12">
                                                <textarea
                                                    name="description"
                                                    placeholder="Additional request"

                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <input
                                                    type="text"
                                                    name="service_name"
                                                    placeholder="price"

                                                />
                                            </div>

                                            <div className="form-group col-md-12">
                                                <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Add service</span></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SelectService