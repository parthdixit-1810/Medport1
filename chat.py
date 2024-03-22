import requests

# Medical diagnosis API URL
DIAGNOSIS_API_URL = "https://api.example.com/diagnosis"

def analyze_symptoms(symptoms):
    try:
        response = requests.post(DIAGNOSIS_API_URL, json={"symptoms": symptoms})
        if response.status_code == 200:
            diagnosis = response.json()["diagnosis"]
            return diagnosis
        else:
            return ["Failed to analyze symptoms. Please try again later."]
    except Exception as e:
        print("Error analyzing symptoms:", e)
        return ["Failed to analyze symptoms. Please try again later."]
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

DIAGNOSIS_API_URL = "https://api.example.com/diagnosis"

def analyze_symptoms(symptoms):
    try:
        response = requests.post(DIAGNOSIS_API_URL, json={"symptoms": symptoms})
        if response.status_code == 200:
            diagnosis = response.json()["diagnosis"]
            return diagnosis
        else:
            return "Failed to analyze symptoms. Please try again later."
    except Exception as e:
        print("Error analyzing symptoms:", e)
        return "Failed to analyze symptoms. Please try again later."

# Route for chatbot
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()
    user_message = data["message"]
    
    if user_message.lower() == "help":
        response = "Sure, I can help you. Please describe your symptoms."
    else:
        symptoms = user_message.lower().split(",")
        diagnosis = analyze_symptoms(symptoms)
        response = "Based on your symptoms, the possible diagnosis is: {}".format(diagnosis)
    
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
