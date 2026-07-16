import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Write from "./pages/Write.jsx";
import TopNav from "./components/NavBar.jsx";
import { handleCorrectJournal } from "./services/api.js";
import { celebrate } from "./utils/celebrate";
import AchievementOverlay from "./components/achievements/AchievementOverlay";
import AmbientBackground from "./components/background/AmbientBackground";

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

  // Win condition celebration
  const [achievement, setAchievement] = useState(null);

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

      if (response.mistakes.length === 0) {
        celebrate();

        setAchievement({
          title: "🏆 JOURNAL MASTER",
          subtitle: "Perfect Journal",
          description: "No corrections were needed!",
        });

        setTimeout(() => {
          setAchievement(null);
        }, 3500);
      }

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
      <AmbientBackground />
      <AchievementOverlay achievement={achievement} />
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
