// Send the text to the backend for analysis

export async function handleCorrectJournal(text) {
  const response = await fetch("http://localhost:8000/journal/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  return await response.json();
}
