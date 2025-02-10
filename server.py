from flask import Flask, request, jsonify, Response 
import numpy as np
import ast
from collections import OrderedDict
import pandas as pd
import json
import joblib
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

# Load datasets
sym_des = pd.read_csv("./dataset/symptoms_df.csv")
precautions = pd.read_csv("./dataset/precautions_df.csv")
workout = pd.read_csv("./dataset/workout_df.csv")
description = pd.read_csv("./dataset/description.csv")
medications = pd.read_csv("./dataset/medications.csv")
diets = pd.read_csv("./dataset/diets.csv")

# Load model
Random_Forest = joblib.load("./models/Random_Forest.pkl")

if not hasattr(Random_Forest, "predict"):
    raise ValueError("Random_Forest model was not loaded correctly!")

# Ensure feature names are ignored (to avoid warnings)
if hasattr(Random_Forest, "feature_names_in_"):
    Random_Forest.feature_names_in_ = None


@app.route("/", methods=["POST"])
def index():
    return "Flask API is running! Use POST /predict to make a prediction."


# Helper function to get details about the disease
def helper(dis):
    desc = description[description["Disease"] == dis]["Description"]
    desc = " ".join([w for w in desc])

    pre = precautions[precautions["Disease"] == dis][["Precaution_1", "Precaution_2", "Precaution_3", "Precaution_4"]]
    pre = [col for col in pre.values]

    med = medications[medications["Disease"] == dis]["Medication"]
    med = [med for med in med.values]

    die = diets[diets["Disease"] == dis]["Diet"]
    die = [die for die in die.values]

    wrkout = workout[workout["disease"] == dis]["workout"]

    return desc, pre, med, die, wrkout

# Dictionary mappings
symptoms_dict = {0: 'itching', 1: 'skin_rash', 2: 'nodal_skin_eruptions', 3: 'continuous_sneezing', 4: 'shivering', 5: 'chills', 6: 'joint_pain', 7: 'stomach_pain', 8: 'acidity', 9: 'ulcers_on_tongue', 10: 'muscle_wasting', 11: 'vomiting', 12: 'burning_micturition', 13: 'spotting_ urination', 14: 'fatigue', 15: 'weight_gain', 16: 'anxiety', 17: 'cold_hands_and_feets', 18: 'mood_swings', 19: 'weight_loss', 20: 'restlessness', 21: 'lethargy', 22: 'patches_in_throat', 23: 'irregular_sugar_level', 24: 'cough', 25: 'high_fever', 26: 'sunken_eyes', 27: 'breathlessness', 28: 'sweating', 29: 'dehydration', 30: 'indigestion', 31: 'headache', 32: 'yellowish_skin', 33: 'dark_urine', 34: 'nausea', 35: 'loss_of_appetite', 36: 'pain_behind_the_eyes', 37: 'back_pain', 38: 'constipation', 39: 'abdominal_pain', 40: 'diarrhoea', 41: 'mild_fever', 42: 'yellow_urine', 43: 'yellowing_of_eyes', 44: 'acute_liver_failure', 45: 'fluid_overload', 46: 'swelling_of_stomach', 47: 'swelled_lymph_nodes', 48: 'malaise', 49: 'blurred_and_distorted_vision', 50: 'phlegm', 51: 'throat_irritation', 52: 'redness_of_eyes', 53: 'sinus_pressure', 54: 'runny_nose', 55: 'congestion', 56: 'chest_pain', 57: 'weakness_in_limbs', 58: 'fast_heart_rate', 59: 'pain_during_bowel_movements', 60: 'pain_in_anal_region', 61: 'bloody_stool', 62: 'irritation_in_anus', 63: 'neck_pain', 64: 'dizziness', 65: 'cramps', 66: 'bruising', 67: 'obesity', 68: 'swollen_legs', 69: 'swollen_blood_vessels', 70: 'puffy_face_and_eyes', 71: 'enlarged_thyroid', 72: 'brittle_nails', 73: 'swollen_extremeties', 74: 'excessive_hunger', 75: 'extra_marital_contacts', 76: 'drying_and_tingling_lips', 77: 'slurred_speech', 78: 'knee_pain', 79: 'hip_joint_pain', 80: 'muscle_weakness', 81: 'stiff_neck', 82: 'swelling_joints', 83: 'movement_stiffness', 84: 'spinning_movements', 85: 'loss_of_balance', 86: 'unsteadiness', 87: 'weakness_of_one_body_side', 88: 'loss_of_smell', 89: 'bladder_discomfort', 90: 'foul_smell_of urine', 91: 'continuous_feel_of_urine', 92: 'passage_of_gases', 93: 'internal_itching', 94: 'toxic_look_(typhos)', 95: 'depression', 96: 'irritability', 97: 'muscle_pain', 98: 'altered_sensorium', 99: 'red_spots_over_body', 100: 'belly_pain', 101: 'abnormal_menstruation', 102: 'dischromic _patches', 103: 'watering_from_eyes', 104: 'increased_appetite', 105: 'polyuria', 106: 'family_history', 107: 'mucoid_sputum', 108: 'rusty_sputum', 109: 'lack_of_concentration', 110: 'visual_disturbances', 111: 'receiving_blood_transfusion', 112: 'receiving_unsterile_injections', 113: 'coma', 114: 'stomach_bleeding', 115: 'distention_of_abdomen', 116: 'history_of_alcohol_consumption', 117: 'fluid_overload.1', 118: 'blood_in_sputum', 119: 'prominent_veins_on_calf', 120: 'palpitations', 121: 'painful_walking', 122: 'pus_filled_pimples', 123: 'blackheads', 124: 'scurring', 125: 'skin_peeling', 126: 'silver_like_dusting', 127: 'small_dents_in_nails', 128: 'inflammatory_nails', 129: 'blister', 130: 'red_sore_around_nose', 131: 'yellow_crust_ooze'}
disease_list = {0: '(vertigo) Paroymsal  Positional Vertigo', 1: 'AIDS', 2: 'Acne', 3: 'Alcoholic hepatitis', 4: 'Allergy', 5: 'Arthritis', 6: 'Bronchial Asthma', 7: 'Cervical spondylosis', 8: 'Chicken pox', 9: 'Chronic cholestasis', 10: 'Common Cold', 11: 'Dengue', 12: 'Diabetes ', 13: 'Dimorphic hemmorhoids(piles)', 14: 'Drug Reaction', 15: 'Fungal infection', 16: 'GERD', 17: 'Gastroenteritis', 18: 'Heart attack', 19: 'Hepatitis B', 20: 'Hepatitis C', 21: 'Hepatitis D', 22: 'Hepatitis E', 23: 'Hypertension ', 24: 'Hyperthyroidism', 25: 'Hypoglycemia', 26: 'Hypothyroidism', 27: 'Impetigo', 28: 'Jaundice', 29: 'Malaria', 30: 'Migraine', 31: 'Osteoarthristis', 32: 'Paralysis (brain hemorrhage)', 33: 'Peptic ulcer diseae', 34: 'Pneumonia', 35: 'Psoriasis', 36: 'Tuberculosis', 37: 'Typhoid', 38: 'Urinary tract infection', 39: 'Varicose veins', 40: 'hepatitis A'}

# Model Prediction function
def get_predicted_value(patient_symptoms):
    input_vector = np.zeros(len(symptoms_dict))

    symptom_to_index = {v: k for k, v in symptoms_dict.items()}

    for item in patient_symptoms:
        print("Symptoms Dict Keys:", symptoms_dict.keys())
        print("Patient Symptoms:", patient_symptoms)
        if item in symptom_to_index:
            input_vector[symptom_to_index[item]] = 1
        else:
            return f"Error: Symptom '{item}' not recognized"
    return disease_list[Random_Forest.predict([input_vector])[0]]

def convert_to_list(obj):
    """Convert NumPy arrays, Pandas objects, and stringified lists to Python lists"""
    if isinstance(obj, np.ndarray):
        return obj.tolist()
    elif isinstance(obj, list):
        return [convert_to_list(item) for item in obj]
    elif hasattr(obj, "to_numpy"):  # Handle Pandas Series or DataFrame
        return obj.to_numpy().tolist()
    elif isinstance(obj, str):  
        try:
            parsed = ast.literal_eval(obj)  # Convert string list to actual list
            if isinstance(parsed, list):
                return parsed
        except (ValueError, SyntaxError):
            pass  # If conversion fails, return the string as is
    return obj

# API Route for Prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Step 1: Ensure JSON data is received
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON or missing Content-Type header"}), 400

        print("Received JSON:", data)  # Debugging

        # Step 2: Extract symptoms
        symptoms = data.get("symptoms")
        if not symptoms:
            return jsonify({"error": "No symptoms provided"}), 400

        # Step 3: Handle both list and string formats
        if isinstance(symptoms, list):
            symptoms = ", ".join(symptoms)

        user_symptoms = [s.strip() for s in symptoms.split(",")]
        user_symptoms = [symptom.strip("[]' ") for symptom in user_symptoms]

        print("Processed Symptoms:", user_symptoms)  # Debugging

        # Step 4: Validate Symptoms
        symptom_to_index = {v: k for k, v in symptoms_dict.items()}
        input_vector = np.zeros(len(symptoms_dict))

        for symptom in user_symptoms:
            if symptom in symptom_to_index:
                input_vector[symptom_to_index[symptom]] = 1
            else:
                return jsonify({"error": f"Symptom '{symptom}' not recognized"}), 400

        # Step 5: Predict Disease
        predicted_disease = get_predicted_value(user_symptoms)

        # Step 6: Get additional details
        dis_des, pre, med, diet, wrkout = helper(predicted_disease)

        # Step 7: Format response and ensure JSON-safe types


        response = OrderedDict([
            ("predicted_disease", predicted_disease),
            ("description", dis_des),
            ("precautions", convert_to_list(pre[0] if pre else [])),
            ("medications", convert_to_list(med)),
            ("diet", convert_to_list(diet)),
            ("workout", convert_to_list(wrkout) if not wrkout.empty else []),
        ])

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
