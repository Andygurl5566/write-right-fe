import { useState } from "react";
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
  const [flashcards, setFlashcards] = useState([]);

  function handleCreateFlashcard(mistake) {
    setFlashcards((currentCards) => {
      const alreadyExists = currentCards.some(
        (card) =>
          card.original === mistake.original &&
          card.corrected_text === mistake.corrected_text,
      );

      if (alreadyExists) {
        return currentCards;
      }

      return [...currentCards, mistake];
    });
  }

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
            onCreateFlashcard={handleCreateFlashcard}
          />

          <FlashcardStudy mistakes={flashcards} />
        </>
      )}
    </>
  );
}

export default Write;