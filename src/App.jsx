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

  return (
    <>
      {/* <Routes> */}
      {/*routes to new pages go here, example
      <Route path="/" element={<Home />} />
      <Route path="/journal" element={<Journal />} /> */}
      {/* </Routes> */}
      <h1>WriteRight</h1>
    </>
  );
}

export default App;
