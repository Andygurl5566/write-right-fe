import JournalEditor from "../components/JournalEditor.jsx";
import JournalText from "../components/JournalText.jsx";
import FlashcardStudy from "../components/FlashcardStudy.jsx";

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
        <>
          <JournalText
            text={text}
            corrections={corrections}
            onBack={onBack}
          />

          <FlashcardStudy mistakes={corrections} />
        </>
      )}
    </>
  );
}

export default Write;