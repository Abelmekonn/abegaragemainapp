import React, { useState, useEffect } from 'react';
import bg_3 from '../../assets/images/misc/tyer.jpg';

function Contact() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }, (error) => {
        console.error("Error getting location: ", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      <section className="page-title" style={{ backgroundImage: `url(${bg_3})` }}>
        <div className="auto-container">
          <h2>Contact</h2>
          <ul className="page-breadcrumb">
            <li><a href="">home</a></li>
            <li>Contact</li>
          </ul>
        </div>
      </section>
      <section className="contact-section">
        <div className="auto-container">
          <div className="row clearfix">
            <section className="map-section col-lg-5">
              <div className="contact-map">
                {latitude && longitude ? (
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${latitude},${longitude}&zoom=14`}
                    width="600"
                    height="470"
                    style={{ border: 0, width: '100%' }}
                    allowFullScreen=""
                  ></iframe>
                ) : (
                  <p>Loading map...</p>
                )}
              </div>
            </section>
            <div className="info-column col-lg-5">
              <div className="inner-column">
                <h4>Our Address</h4>
                <div className="text">Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service.</div>
                <ul>
                  <li><i className="flaticon-pin"></i><span>Address:</span> 54B, Tailstoi Town 5238 MT, La city, IA 5224</li>
                  <li><i className="flaticon-email"></i><span>email:</span> contact@buildtruck.com</li>
                  <li><i className="flaticon-phone"></i><span>phone:</span> 1800 456 7890 / 1254 897 3654</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
