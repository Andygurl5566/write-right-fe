import "./JournalEditor.css";
import LanguageSelectionDropdown from "./LanguageSelectionDropdown";
import { Stack } from "@mui/material";

function JournalEditor({
  text,
  setText,
  onAnalyze,
  loading,
  error,
  setTargetLanguage,
}) {
  return (
    <div className="journal-editor">
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <p className="editor-subtitle">
            Practice writing in your target language :
          </p>
          <LanguageSelectionDropdown onChange={setTargetLanguage} displayText={"Target Language"} />
        </Stack>
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
      </Stack>
    </div>
  );
}

export default JournalEditor;
