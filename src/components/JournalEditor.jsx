import { useState, useEffect } from "react";

// The JournalEditor component is a simple text area where the user can write their journal entry. It also has a button to submit the journal entry for analysis. The component takes in the following props:
// - text: The current text of the journal entry.
// - setText: A function to update the text of the journal entry.
// - onAnalyze: A function to call when the user clicks the "Check Writing" button.
// - loading: A boolean indicating whether the analysis is currently loading.
// - error: An error message to display if there was an error with the analysis.

function JournalEditor({ text, setText, onAnalyze, loading, error }) {
  return (
    <>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
      />
      <button
        onClick={onAnalyze}
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        Check Writing
      </button>
    </>
  );
}

export default JournalEditor;
