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

@app.route('/predict', methods=['GET'])
def predict():
    data = request.get_json()
    
    if not data or 'symptoms' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    symptoms = data['symptoms']
    # Dummy prediction (replace with your ML model)
    predicted_disease = "Flu" if "cough" in symptoms else "Unknown Disease"

    return jsonify({'prediction': predicted_disease})

if __name__ == '__main__':
    app.run(debug=True)
