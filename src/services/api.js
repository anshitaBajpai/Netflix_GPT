const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export const getGptResponse = async (prompt) => {
  const response = await fetch(`${API_URL}/api/gpt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response from backend");
  }

  const data = await response.json();
  return data;
};
