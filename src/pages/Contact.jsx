import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <h2 className="contact-title">Contact Us</h2>

      <div className="contact-card" data-aos="zoom-in">
        <h3>District Science Centre</h3>

        <div className="contact-item">
          <span className="contact-label">📍 Address:</span>
          <p>
            JNTU College Road, Sharada Nagar,<br />
            Anantapur, Andhra Pradesh - 515002
          </p>
        </div>

        <div className="contact-item">
          <span className="contact-label">📧 Email:</span>
          <p>dsc.portal.anantapur@gmail.com</p>
        </div>

        <div className="contact-item">
          <span className="contact-label">📞 Phone:</span>
          <p>+91 8985934531</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;