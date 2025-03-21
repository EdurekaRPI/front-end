from flask import Flask, request, jsonify
import requests
from flask_cors import CORS  # Import the CORS extension

app = Flask(__name__)

# Allow CORS for all domains (you can restrict to localhost or production domains if needed)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# Heroku API endpoint
HEROKU_API_URL = "https://edureka-607e7cfece20.herokuapp.com/api/frontend/week-of-events"

@app.route('/get-events', methods=['GET'])
def get_events():
    # Get the 'date' parameter from the query string
    date = request.args.get('date')
    
    if not date:
        return jsonify({"error": "Date parameter is required"}), 400
    
    try:
        # Make the request to the Heroku API
        response = requests.get(HEROKU_API_URL, params={"date": date})

        # Check if the request was successful
        if response.status_code == 200:
            return jsonify(response.json())  # Return the JSON response from Heroku
        else:
            return jsonify({"error": "Failed to fetch data from Heroku API", "status_code": response.status_code}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
