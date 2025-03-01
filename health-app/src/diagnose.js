import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Results from "./Results";
import { Container } from "react-bootstrap";
import Navigation from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Diagnose() {
  const [symptoms, setSymptoms] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState("Checking server...");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/")
      .then(() => setBackendStatus("✅ Backend is running"))
      .catch(() => setBackendStatus("❌ Backend not reachable"));
  }, []);

  const symptomList = [
    "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering", "chills",
    "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue", "muscle_wasting", "vomiting",
    "burning_micturition", "spotting_urination", "fatigue", "weight_gain", "anxiety",
    "cold_hands_and_feets", "mood_swings", "weight_loss", "restlessness", "lethargy",
    "patches_in_throat", "irregular_sugar_level", "cough", "high_fever", "sunken_eyes",
    "breathlessness", "sweating", "dehydration", "indigestion", "headache", "yellowish_skin",
    "dark_urine", "nausea", "loss_of_appetite", "pain_behind_the_eyes", "back_pain",
    "constipation", "abdominal_pain", "diarrhoea", "mild_fever", "yellow_urine",
    "yellowing_of_eyes", "acute_liver_failure", "fluid_overload", "swelling_of_stomach",
    "swelled_lymph_nodes", "malaise", "blurred_and_distorted_vision", "phlegm",
    "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion",
    "chest_pain", "weakness_in_limbs", "fast_heart_rate", "pain_during_bowel_movements",
    "pain_in_anal_region", "bloody_stool", "irritation_in_anus", "neck_pain", "dizziness",
    "cramps", "bruising", "obesity", "swollen_legs", "swollen_blood_vessels",
    "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties",
    "excessive_hunger", "extra_marital_contacts", "drying_and_tingling_lips", "slurred_speech",
    "knee_pain", "hip_joint_pain", "muscle_weakness", "stiff_neck", "swelling_joints",
    "movement_stiffness", "spinning_movements", "loss_of_balance", "unsteadiness",
    "weakness_of_one_body_side", "loss_of_smell", "bladder_discomfort", "foul_smell_of_urine",
    "continuous_feel_of_urine", "passage_of_gases", "internal_itching", "toxic_look_(typhos)",
    "depression", "irritability", "muscle_pain", "altered_sensorium", "red_spots_over_body",
    "belly_pain", "abnormal_menstruation", "dischromic_patches", "watering_from_eyes",
    "increased_appetite", "polyuria", "family_history", "mucoid_sputum", "rusty_sputum",
    "lack_of_concentration", "visual_disturbances", "receiving_blood_transfusion",
    "receiving_unsterile_injections", "coma", "stomach_bleeding", "distention_of_abdomen",
    "history_of_alcohol_consumption", "fluid_overload.1", "blood_in_sputum",
    "prominent_veins_on_calf", "palpitations", "painful_walking", "pus_filled_pimples",
    "blackheads", "scurring", "skin_peeling", "silver_like_dusting", "small_dents_in_nails",
    "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze"
  ];

  const symptomOptions = symptomList.map(symptom => ({
    value: symptom,
    label: symptom.replace(/_/g, " ")
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        symptoms: symptoms.map(s => s.value.replace(/ /g, "_"))
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Navigation />
      <div className="border p-4 shadow bg-white rounded">
        <h2 className="text-center">Diagnose</h2>
        <p className="text-center">{backendStatus}</p>

        <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
          <Select options={symptomOptions} isMulti placeholder="Select Symptoms..." onChange={setSymptoms} />
          <button type="submit" className="btn btn-primary w-100 mt-3">
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {loading && <div className="text-center mt-3"><div className="spinner-border text-primary"></div></div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {response && <Results data={response} />}
      </div>
    </Container>
  );
}

export default Diagnose;
