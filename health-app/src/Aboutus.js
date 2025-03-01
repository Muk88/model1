import React from "react";
import { Container } from "react-bootstrap";
import Navigation from "./components/navbar";

const About = () => {
  return (
    <Container>
      <Navigation />
      <div className="border p-4 shadow bg-white rounded">
        <h2>About Us</h2>

        {/* Who We Are Section */}
        <h4>Who We Are</h4>
        <p>
          Health Diagnosis App is a cutting-edge AI-driven platform designed to provide 
          instant preliminary health assessments. We aim to empower individuals with 
          accessible health insights before seeking professional medical advice.
        </p>

        {/* Our Mission Section */}
        <h4>Our Mission</h4>
        <p>
          Our goal is to bridge the gap between technology and healthcare by offering 
          an easy-to-use tool that analyzes symptoms and suggests possible conditions. 
          While our app is not a substitute for a doctor, it helps users make informed 
          decisions about their health.
        </p>

        {/* Why Choose Us Section */}
        <h4>Why Choose Us?</h4>
        <ul>
          <li>✅ AI-powered symptom analysis</li>
          <li>✅ Fast and user-friendly interface</li>
          <li>✅ Reliable and data-backed insights</li>
          <li>✅ 24/7 accessibility from anywhere</li>
        </ul>

        <p>
          We are committed to enhancing digital healthcare and making preliminary diagnostics 
          more accessible. Let’s take a step toward smarter health monitoring together!
        </p>
      </div>
    </Container>
  );
};

export default About;
