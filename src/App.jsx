import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Write from "./pages/Write.jsx";
import TopNav from "./components/NavBar.jsx";
import { handleCorrectJournal } from "./services/api.js";

function App() {
  // Seting variables in the App component so the entire application can access them.
  // This is a temporary solution until we implement a more robust state management system.

  // The users journal text
  const [journalText, setJournalText] = useState("");

  // The analysis of the users journal text
  const [corrections, setCorrections] = useState([]);

  // The users current review mode
  const [reviewMode, setReviewMode] = useState(false);

  // Loading spinner
  const [loading, setLoading] = useState(false);

  // Api error state to handle errors from the backend
  const [apiError, setApiError] = useState(null);

  // Helper functions ----------------------------------------------

  // Function to handle the journal analysis. Call the backend (handleCorrectJournal func) and sets the corrections state with the response.
  async function analyzeJournal() {
    // Prevent empty submissions
    if (!journalText.trim()) {
      setApiError("Please enter some text first.");
      return;
    }
    setLoading(true);
    setApiError("");

    try {
      const response = await handleCorrectJournal(journalText);
      console.log("Backend response:", response);

      setCorrections(response.mistakes);
      setReviewMode(true);
    } catch (err) {
      console.error(err);
      setApiError("Something went wrong while analyzing your journal.");
    } finally {
      setLoading(false);
    }
  }

  function returnToEditor() {
    setReviewMode(false);
  }

  // --------------------------------------------------------------

  return (
    <div className="App">
      <TopNav />
      <Write
        text={journalText}
        setText={setJournalText}
        onAnalyze={analyzeJournal}
        loading={loading}
        corrections={corrections}
        onBack={returnToEditor}
        error={apiError}
        reviewMode={reviewMode}
      />
    </div>
  );
}

export default App;
