import { useState } from "react";
import JournalEditor from "../components/JournalEditor.jsx";
import JournalText from "../components/JournalText.jsx";

// The Write component manages the written journal text and the analysis of the journal text. It also manages the review mode and the loading spinner.

function Write({
  text,
  setText,
  onAnalyze,
  loading,
  corrections,
  onBack,
  error,
  reviewMode,
}) {
  return (
    <>
      {!reviewMode ? (
        <JournalEditor
          text={text}
          setText={setText}
          onAnalyze={onAnalyze}
          loading={loading}
          error={error}
        />
      ) : (
        <JournalText text={text} corrections={corrections} onBack={onBack} />
      )}
    </>
  );
}

export default Write;
