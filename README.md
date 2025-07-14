# CodeForge
online compiler Integrated with chatbot
🧠 Ollama + Django: Local LLM Integration (Phi-3 Example)
This project demonstrates how to integrate a local LLM (like Phi-3) served by Ollama into a Django backend via HTTP API.

🚀 Features

🔌 Connects Django to locally running Ollama server

🧠 Supports any Ollama-compatible LLM (e.g., phi3, llama3, mistral)

🔨 Simple API to send prompts and receive responses

📦 Easily extendable to frontend (React, Vite, etc.)

📦 Requirements

Python 3.10+

Django 4.x+

Ollama (installed locally)

Any pulled LLM model (phi3 used here)

💠 Setup Instructions

1. 🔄 Clone the Repository

git clone https://github.com/yourusername/ollama-django-llm.git
cd ollama-django-llm

2. 📦 Create & Activate Virtual Environment

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

3. 📅 Install Python Dependencies

pip install -r requirements.txt

4. 🚀 Run Django Server

python manage.py runserver

5. 🧠 Start Ollama Server (in a new terminal)

ollama serve

Then pull & run a model:

ollama pull phi3

📡 API Usage

▶️ Endpoint

GET /chat/?prompt=Your+question+here

📟 Sample Request

curl "http://localhost:8000/chat/?prompt=What+is+machine+learning"

✅ Sample Response

{
  "response": "Machine learning is a subfield of artificial intelligence..."
}

🧩 Project Structure

ollama_django/
├── ollama_api.py         # Handles API calls to Ollama
├── views.py              # Django views for interaction
├── urls.py               # Routes API endpoints
├── templates/            # (Optional) HTML templates
└── ...

📄 Sample Code — ollama_api.py

import requests

def call_phi3(prompt_text):
    url = "http://localhost:11434/api/generate"
    headers = {"Content-Type": "application/json"}
    data = {
        "model": "phi3",
        "prompt": prompt_text,
        "stream": False
    }
    response = requests.post(url, json=data, headers=headers)
    return response.json().get("response", "") if response.status_code == 200 else "Error: " + response.text

✨ Future Plans

✅ Add frontend (React + Vite)

🔄 Real-time streaming response (WebSockets)

🔐 Add auth & usage logging

💪 Unit tests for API

👨‍💻 Author

Sumit Ravindra Kokad🧠 Final Year CSE | AI/ML Enthusiast📍 Pune, India📧 sumitkokad@example.com

📜 License

This project is licensed under the MIT License.

🌐 Useful Links

Ollama Official Docs

Phi-3 Model

Django Docs

