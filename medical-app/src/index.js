import React, { useState } from "react";
import axios from "axios";

const DiseasePredictor = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    setError(""); 
    setResult(null);

    // Convert symptoms string to an array
    const symptomList = symptoms.split(",").map((s) => s.trim());

    try {
      const response = await axios.post(
        "/predict", // Ensure the correct API endpoint
        { symptoms: symptomList },
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Origin": "http://localhost:8000"
          }
        }
      );
      
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching prediction.");
      console.error("API Error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Disease Prediction System</h1>
      <input
        type="text"
        placeholder="Enter symptoms, separated by commas"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        style={styles.input}
      />
      <button onClick={handlePredict} style={styles.button}>Predict</button>

      {error && <p style={styles.error}>{error}</p>}

      {result && (
        <div style={styles.result}>
          <h2>Prediction Result</h2>
          <p><strong>Disease:</strong> {result.predicted_disease}</p>
          <p><strong>Description:</strong> {result.description}</p>
          <p><strong>Precautions:</strong> {Array.isArray(result.precautions) ? result.precautions.join(", ") : "No data available"}</p>
          <p><strong>Medications:</strong> {Array.isArray(result.medications) ? result.medications.join(", ") : "No data available"}</p>
          <p><strong>Diet:</strong> {Array.isArray(result.diet) ? result.diet.join(", ") : "No data available"}</p>
          <p><strong>Workout:</strong> {Array.isArray(result.workout) ? result.workout.join(", ") : "No data available"}</p>
        </div>
      )}
    </div>
  );
};

// Styles for UI
const styles = {
  container: { textAlign: "center", padding: "20px" },
  input: { padding: "10px", width: "60%", margin: "10px 0" },
  button: { padding: "10px 15px", cursor: "pointer", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px" },
  error: { color: "red", fontWeight: "bold" },
  result: { marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "10px", textAlign: "left" },
};

export default DiseasePredictor;
