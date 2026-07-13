import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

// CORS Test| Makes a call to the backend endpoint "/" in write-right-be/main.py
function App() {
  useEffect(() => {
    fetch("http://127.0.0.1:8000")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  async function handleCorrect() {
    console.log("Button clicked");

    const response = await fetch("http://localhost:8000/journal/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    });

    const data = await response.json();
    
    console.log("Backend response:", data);

    setResult(data);
  }

  return (
    <div>
      {/* <Routes> */}
      {/*routes to new pages go here, example
      <Route path="/" element={<Home />} />
      <Route path="/journal" element={<Journal />} /> */}
      {/* </Routes> */}

      {/* Header */}
      <h1>WriteRight</h1>

      {/* Text box */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
      />

      {/* Button */}
      <button onClick={handleCorrect}>Check for Mistakes</button>

      {/* Correction results */}
      {result && (
        <div>
          <h2>Corrected Text</h2>
          <p>{result.text}</p>

          <h2>Mistakes</h2>

          {result.mistakes.map((mistake, index) => (
            <div key={index}>
              <p>
                {mistake.original} → {mistake.corrected}
              </p>
              <p>{mistake.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
