// // ai agent ollama api call for backend
const API_BASE = 'http://localhost:8000/'; // Reverted to include 'api' prefix

export async function askAI(prompt) {
  try {
    const response = await fetch(`${API_BASE}ask-ai/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data.response;
  } catch (error) {
    return ` Error: ${error.message}`;
  }
}
