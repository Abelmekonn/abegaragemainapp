import React from 'react';
// import images
import banner from '../../assets/images/banner/banner1.jpg';
import vban_1 from '../../assets/images/misc/vban1.jpg';
import vban_2 from '../../assets/images/misc/vban2.jpg';
import carspeed from '../../assets/images/misc/carspeed.jpg';
import car from '../../assets/images/misc/car.jpg';
import tyre from '../../assets/images/misc/tyer.jpg';

function Home() {
  return (
    <>
      <div>
        <section className="video-section">
          <div
            data-parallax='{"y": 50}'
            className="sec-bg"
            style={{ backgroundImage: `url(${banner})` }}
          ></div>
          <div className="auto-container">
            <h5>Working since 1999</h5>
            <h2>
              Tuneup Your Car <br /> to Next Level
            </h2>
            <div className="video-box">
              <div className="video-btn">
                <a
                  href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
                  className="overlay-link lightbox-image video-fancybox ripple"
                >
                  <i className="flaticon-play"></i>
                </a>
              </div>
              <div className="text">
                Watch intro video <br /> about us
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="auto-container">
            <div className="row">
              <div className="col-lg-5">
                <div className="image-box">
                  <img src={vban_1} alt="" />
                  <img src={vban_2} alt="" />
                  <div className="year-experience" data-parallax='{"y": 30}'>
                    <strong>17</strong> years <br />
                    Experience
                  </div>
                </div>
              </div>
              <div className="col-lg-7 pl-lg-5">
                <div className="sec-title">
                  <h5>Welcome to Our workshop</h5>
                  <h2>We have 24 years experience</h2>
                  <div className="text">
                    <p>
                      Bring to the table win-win survival strategies to ensure proactive domination. At the end of the
                      day, going forward, a new normal that has evolved from generation X is on the runway heading
                      towards a streamlined cloud solution. User generated content in real-time will have multiple
                      touchpoints for offshoring.
                    </p>
                    <p>
                      Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override
                      the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the
                      information highway will close the loop on focusing.
                    </p>
                  </div>
                  <div className="link-btn mt-40">
                    <a href="about.html" className="theme-btn btn-style-one style-two">
                      <span>
                        About Us <i className="flaticon-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section">
          <div className="auto-container">
            <div className="sec-title style-two">
              <h2>Our Featured Services</h2>
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
                { title: 'Tyre & Wheels', icon: 'flaticon-tire' },
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

        <section className="features-section">
          <div className="auto-container">
            <div className="row">
              <div className="col-lg-6">
                <div className="inner-container">
                  <h2>
                    Quality Service And <br /> Customer Satisfaction !!
                  </h2>
                  <div className="text">
                    We utilize the most recent symptomatic gear to ensure your vehicle is fixed or adjusted appropriately
                    and in an opportune manner. We are an individual from Professional Auto Service, a first className
                    execution arrange, where free assistance offices share shared objectives of being world-className car
                    administration focuses.
                  </div>
                </div>
              </div>
              <div className="col-lg-6" >
                  <img src={carspeed} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="why-choose-us">
          <div className="auto-container">
            <div className="row">
              <div className="col-lg-6">
                <div className="sec-title style-two">
                  <h2>Why Choose Us</h2>
                  <div className="text">
                    Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day,
                    going forward, a new normal that has evolved from generation heading towards.
                  </div>
                </div>
                <div className="icon-box">
                  <div className="icon">
                    <span className="flaticon-mechanic"></span>
                  </div>
                  <h4>Certified Expert Mechanics</h4>
                </div>
                <div className="icon-box">
                  <div className="icon">
                    <span className="flaticon-wrench"></span>
                  </div>
                  <h4>Fast And Quality Service</h4>
                </div>
                <div className="icon-box">
                  <div className="icon">
                    <span className="flaticon-price-tag-1"></span>
                  </div>
                  <h4>Best Prices in Town</h4>
                </div>
                <div className="icon-box">
                  <div className="icon">
                    <span className="flaticon-trophy"></span>
                  </div>
                  <h4>Awarded Workshop</h4>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="sec-title style-two">
                  <h2>Additional Services</h2>
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <div className="image">
                      <img src={car} alt="" />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <ul className="list">
                      {[
                        'General Auto Repair & Maintenance',
                        'Transmission Repair & Replacement',
                        'Tire Repair and Replacement',
                        'State Emissions Inspection',
                        'Break Job / Break Services',
                        'Electrical Diagnostics',
                        'Fuel System Repairs',
                        'Starting and Charging Repair',
                        'Steering and Suspension Work',
                        'Emission Repair Facility',
                        'Wheel Alignment',
                        'Computer Diagnostic Testing',
                      ].map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="video-section">
          <div
            data-parallax='{"y": 50}'
            className="sec-bg"
            style={{ backgroundImage: `url(${tyre})` }}
          ></div>
          <div className="auto-container">
            <h5>Working since 1992</h5>
            <h2>
              We are leader <br /> in Car Mechanical Work
            </h2>
            <div className="video-box">
              <div className="video-btn">
                <a
                  href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
                  className="overlay-link lightbox-image video-fancybox ripple"
                >
                  <i className="flaticon-play"></i>
                </a>
              </div>
              <div className="text">
                Watch intro video <br /> about us
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="auto-container">
            <div className="wrapper-box">
              <div className="left-column">
                <h3>Schedule Your Appointment Today</h3>
                <div className="text">Your Automotive Repair & Maintenance Service Specialist</div>
              </div>
              <div className="right-column">
                <div className="phone">1800.456.7890</div>
                <div className="btn">
                  <a href="#" className="theme-btn btn-style-one">
                    <span>
                      Appointment <i className="flaticon-right"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
