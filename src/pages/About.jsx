import React from "react";
import "./About.css"
function About() {
  return (
    <div className="section about-page" data-aos="fade-up">
      <h2>About District Science Centre</h2>

      <p className="about-intro">
        The District Science Centre in Anantapur, Andhra Pradesh, is an 
        interactive and educational science museum designed to help students 
        explore scientific concepts through practical learning experiences.
      </p>

      <div className="about-content">
        <p>
          Located near JNTU College Road, Sharada Nagar, Anantapur, 
          the centre serves as a hub for science education and innovation. 
          It provides hands-on science models, engaging exhibits, and 
          educational charts that simplify complex scientific principles.
        </p>

        <p>
          The centre is especially aimed at fostering curiosity among 
          school students by encouraging experiential learning. 
          Visitors can participate in guided tours conducted by 
          knowledgeable staff who explain scientific concepts in 
          an interactive and understandable manner.
        </p>
      </div>

      <div className="about-details">
        <h3>Key Details for Visitors</h3>

        <ul>
          <li>
            <strong>Location:</strong> District Science Centre, JNTU College Road,
            Sharada Nagar, Anantapur, Andhra Pradesh - 515002
          </li>

          <li>
            <strong>Operating Hours:</strong> 10:00 AM – 5:00 PM 
            (Monday to Saturday)
          </li>

          <li>
            <strong>Closed:</strong> Sundays
          </li>

          <li>
            <strong>Highlights:</strong> Interactive science exhibits,
            educational displays about scientists, and guided tours.
          </li>

          <li>
            <strong>Focus:</strong> Promoting scientific awareness and 
            curiosity through hands-on learning experiences.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;