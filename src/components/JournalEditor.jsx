import "./JournalEditor.css";

function JournalEditor({ text, setText, onAnalyze, loading, error }) {
  return (
    <div className="journal-editor">
      <p className="editor-subtitle">
        Practice writing in your target language.
      </p>

      <textarea
        className="journal-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write about your day..."
      />

      <div className="editor-footer">
        <span className="character-count">{text.length} characters</span>

        <button
          className="analyze-button"
          onClick={onAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Writing"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default JournalEditor;
