import React from "react";
import { Container } from "react-bootstrap";
import Navigation from "./components/navbar";

function Contact() {
  return (
    <Container>
      <Navigation />
      <div className="border p-4 shadow bg-white rounded">
        <h2>Contact Us</h2>
        <p>If you have any questions or concerns, feel free to reach out to us.</p>
        <ul>
          <li>Email: support@diseasediagnose.com</li>
          <li>Phone: +1 234 567 890</li>
        </ul>
      </div>
    </Container>
  );
}

export default Contact;
