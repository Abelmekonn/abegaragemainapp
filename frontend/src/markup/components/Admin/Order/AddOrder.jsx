import React from 'react'
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import CustomerSearch from './CustomerSearch';
function AddOrder() {
  return (
    <>
      <section className='contact-section container'>
        <div className='container'>
          <div className="contact-title">
            <h2>Create a new order</h2>
          </div>
          <CustomerSearch />
          
          <div className=" service-box">
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
          <div className='service-box mt-3'>
            <Table striped hover responsive >
              <thead>
                <tr>
                  <td>name</td>
                  <td>last name</td>
                  <td>email</td>
                  <td>phoneNumber</td>
                  <td>last name</td>
                  <td>email</td>
                  <td>phoneNumber</td>
                  <td>choose</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>name</td>
                  <td>last name</td>
                  <td>email</td>
                  <td>phoneNumber</td>
                  <td>last name</td>
                  <td>email</td>
                  <td>phoneNumber</td>
                  <td>
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-index-thumb" viewBox="0 0 16 16">
                        <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025" />
                      </svg>
                    </a>
                  </td>
                </tr>

              </tbody>
            </Table>
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
      </section>
    </>
  )
}

export default AddOrder;
