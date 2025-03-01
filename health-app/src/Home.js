import React from "react";
import { Container } from "react-bootstrap";
import Navigation from "./components/navbar";
import "./styles/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <Navigation />

      {/* Main content */}
      <div className="home-content">
        <Container className="text-center">
          <h1>Welcome to Health Diagnosis App</h1>
          
          <Container className="content-box">
            <p>
              Your trusted companion for quick and accurate health assessments. 
              Our AI-powered system helps you analyze symptoms and provides 
              potential diagnoses based on reliable medical data. Whether you're 
              feeling unwell or just curious about your health, our tool offers 
              insights to guide your next steps.
            </p>
        </Container>


          
          <Link to="/diagnose" className="btn btn-primary">
            👉 Click "Diagnose" to start your health assessment today!
          </Link>
        </Container>
      </div>
    </div>
  );
};

export default Home;
