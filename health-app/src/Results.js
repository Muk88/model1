import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/results.css";

function Results({ data }) {
  if (!data) return null;

  return (
    <div className="container border p-4 shadow bg-white rounded mt-4">
      <h2 className="text-center text-primary">🩺 Prediction Results</h2>

      {/* Predicted Disease */}
      <div className="p-3 my-3 border rounded bg-light">
        <h3 className="text-success">Predicted Disease: {data.predicted_disease}</h3>
        <p><strong>Description:</strong> {data.description}</p>
      </div>

      {/* Grid Layout for Precautions, Medications, Diet, and Workout */}
      <div className="row">
        
        {/* Precautions */}
        <div className="col-md-3">
          <div className="border p-3 rounded shadow-sm bg-white">
            <h4 className="text-danger">Precautions</h4>
            <ul>
              {data.precautions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Medications */}
        <div className="col-md-3">
          <div className="border p-3 rounded shadow-sm bg-white">
            <h4 className="text-warning">Medications</h4>
            <ul>
              {data.medications ? data.medications.map((item, index) => (
                <li key={index}>{item}</li>
              )) : <li>No medications available</li>}
            </ul>
          </div>
        </div>

        {/* Diet */}
        <div className="col-md-3">
          <div className="border p-3 rounded shadow-sm bg-white">
            <h4 className="text-primary">Diet</h4>
            <ul>
              {data.diet ? data.diet.map((item, index) => (
                <li key={index}>{item}</li>
              )) : <li>No diet recommendations available</li>}
            </ul>
          </div>
        </div>

        {/* Workout */}
        <div className="col-md-3">
          <div className="border p-3 rounded shadow-sm bg-white">
            <h4 className="text-success">Workout</h4>
            <ul>
              {data.workout ? data.workout.map((item, index) => (
                <li key={index}>{item}</li>
              )) : <li>No workout recommendations available</li>}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Results;
