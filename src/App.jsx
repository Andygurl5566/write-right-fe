import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Write from "./pages/Write.jsx";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  return (
    <div>
      <Write />
    </div>
  );
}

export default App;
