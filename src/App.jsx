import { useState } from "react";
import "./App.css";
import Write from "./pages/Write.jsx";
import TopNav from "./components/NavBar.jsx";
import FlashcardVault from "./components/FlashcardVault.jsx";
import { handleCorrectJournal } from "./services/api.js";
import { celebrate } from "./utils/celebrate";
import AchievementOverlay from "./components/achievements/AchievementOverlay";

function App() {
  // --------------------------------------------------------------
  // Navigation
  // --------------------------------------------------------------

  // Controls which page is currently displayed.
  // "write" = journal workflow
  // "flashcards" = Flashcard Vault
  const [currentView, setCurrentView] = useState("write");

  // --------------------------------------------------------------
  // Journal State
  // --------------------------------------------------------------

  // The user's journal text
  const [journalText, setJournalText] = useState("");

  // The analysis of the user's journal text
  const [corrections, setCorrections] = useState([]);

  // The user's current review mode
  const [reviewMode, setReviewMode] = useState(false);

  // Loading spinner
  const [loading, setLoading] = useState(false);

  // API error state to handle errors from the backend
  const [apiError, setApiError] = useState(null);

  // Win condition celebration
  const [achievement, setAchievement] = useState(null);

  // --------------------------------------------------------------
  // Helper functions
  // --------------------------------------------------------------

  // Function to handle the journal analysis.
  // Calls the backend and updates the correction state.
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
      setApiError(
        "Something went wrong while analyzing your journal."
      );
    } finally {
      setLoading(false);
    }
  }

  function returnToEditor() {
    setReviewMode(false);
  }

  // --------------------------------------------------------------
  // Render
  // --------------------------------------------------------------

  return (
    <div className="App">
   <TopNav
      onWriteClick={() => setCurrentView("write")}
      onFlashcardsClick={() => setCurrentView("flashcards")}
    />

      <AchievementOverlay achievement={achievement} />

      {currentView === "flashcards" ? (
        <FlashcardVault />
      ) : (
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
      )}
    </div>
  );
}

export default App;