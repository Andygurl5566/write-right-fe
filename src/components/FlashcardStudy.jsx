import { useEffect, useState } from "react";
import "./FlashcardStudy.css";

function FlashcardStudy({ mistakes }) {
  const [queue, setQueue] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [streak, setStreak] = useState(0);
  const [masteredCount, setMasteredCount] = useState(0);
  const [attempt, setAttempt] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [studyStarted, setStudyStarted] = useState(false);

  useEffect(() => {
    setQueue(mistakes ?? []);
    setShowAnswer(false);
    setStreak(0);
    setMasteredCount(0);
    setAttempt("");
    setFeedback(null);
    setStudyStarted(false);
  }, [mistakes]);

  if (!mistakes?.length) {
    return null;
  }

  if (!studyStarted) {
    return (
      <section className="flashcard-study">
        <button type="button" className="flashcard-button" onClick={() => setStudyStarted(true)}>
          ⚔️ Conquer {mistakes.length}{" "}
          {mistakes.length === 1 ? "Card" : "Cards"}
        </button>
      </section>
    );
  }

  if (queue.length === 0) {
    return (
      <section className="flashcard-study">
        <h2>All mistakes mastered!</h2>
        <p>Final streak: {streak}</p>
      </section>
    );
  }

  const currentCard = queue[0];
  const remaining = queue.length;

  function handleKnewIt() {
    setQueue((currentQueue) => currentQueue.slice(1));
    setMasteredCount((count) => count + 1);
    setStreak((currentStreak) => currentStreak + 1);
    setShowAnswer(false);
    setAttempt("");
    setFeedback(null);
  }

  function handlePracticeAgain() {
    setQueue((currentQueue) => [...currentQueue.slice(1), currentQueue[0]]);
    setStreak(0);
    setShowAnswer(false);
    setAttempt("");
    setFeedback(null);
  }

  function normalizeText(value = "") {
    return value
      .trim()
      .toLocaleLowerCase()
      .replace(/[.,!?;:]/g, "");
  }

  function handleSubmitAttempt(event) {
    event.preventDefault();

    const userAnswer = normalizeText(attempt);
    const correctedText =
      currentCard.corrected_text ?? currentCard.corrected ?? "";

    const correctAnswer = normalizeText(correctedText);

    if (userAnswer === correctAnswer) {
      setFeedback("correct");
      return;
    }

    setFeedback("incorrect");
  }

  return (
    <section className="flashcard-study">
      <div className="study-stats">
        <span>Streak: {streak}</span>
        <span>Remaining: {remaining}</span>
        <span>Mastered: {masteredCount}</span>
      </div>

      <article className="flashcard">
        {feedback === "correct" ? (
          <div className="answer-feedback correct-feedback">
            <h1>
              <strong>Correct!</strong>
            </h1>
          </div>
        ) : (
          <>
            <p className="flashcard-label">Correct this:</p>
            <h3>{currentCard.original}</h3>
          </>
        )}

        {!showAnswer ? (
          <form className="flashcard-attempt" onSubmit={handleSubmitAttempt}>
            {/* <label htmlFor="correction-attempt" className="flashcard-label">
              Type the corrected sentence
            </label> */}

            <input
              id="correction-attempt"
              value={attempt}
              onChange={(event) => {
                setAttempt(event.target.value);
                setFeedback(null);
              }}
              placeholder="Enter Correction..."
              autoComplete="off"
            />
            {feedback === "correct" ? (
              <button type="button" onClick={handleKnewIt}>
                Next card
              </button>
            ) : (
              <button type="submit" disabled={!attempt.trim()}>
                Check answer
              </button>
            )}

            {feedback === "incorrect" && (
              <div className="answer-feedback-incorrect-feedback">
                <div className="reveal-button">
                  <strong>Not quite—try again.</strong>
                  <button type="button" onClick={() => setShowAnswer(true)}>
                    Reveal answer
                  </button>
                </div>
              </div>
            )}
          </form>
        ) : (
          <div className="flashcard-answer">
            <p className="flashcard-label">Correct version:</p>
            <h3>{currentCard.corrected_text ?? currentCard.corrected}</h3>
            <p>{currentCard.explanation}</p>

            <div className="flashcard-actions">
              <button onClick={handleKnewIt}>Mark mastered</button>

              <button onClick={handlePracticeAgain}>Practice again</button>
            </div>
          </div>
        )}
      </article>
    </section>
  );
}

export default FlashcardStudy;
