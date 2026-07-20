import { useEffect, useState } from "react";
import "./FlashcardVault.css";

function FlashcardVault() {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFlashcardSets() {
      try {
        const response = await fetch(
          "http://localhost:8000/flashcard-sets"
        );

        if (!response.ok) {
          throw new Error("Unable to load flashcard sets.");
        }

        const data = await response.json();
        setFlashcardSets(data);
      } catch (loadError) {
        console.error(loadError);
        setError("Your flashcard sets could not be loaded.");
      } finally {
        setLoading(false);
      }
    }

    loadFlashcardSets();
  }, []);

  if (loading) {
    return (
      <section className="flashcard-vault">
        <div className="vault-message">
          <p>Loading your flashcard vault...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flashcard-vault">
        <div className="vault-message vault-error">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flashcard-vault">
      <header className="vault-header">
        <div>
          <p className="vault-eyebrow">Your collection</p>
          <h2>Flashcard Vault</h2>

          <p className="vault-count">
            {flashcardSets.length}{" "}
            {flashcardSets.length === 1 ? "set" : "sets"}
          </p>
        </div>
      </header>

      {flashcardSets.length === 0 ? (
        <div className="vault-empty-state">
          <div className="vault-empty-icon">📚</div>

          <h3>Your vault is empty</h3>

          <p>
            Complete a journal correction or Conquer Cards session to save
            your first flashcard set.
          </p>
        </div>
      ) : (
        <div className="vault-grid">
          {flashcardSets.map((flashcardSet) => (
            <article className="vault-card" key={flashcardSet.id}>
              <div className="vault-card-top">
                <span className="vault-language">
                  {flashcardSet.language}
                </span>

                <span className="vault-status learning">
                  {flashcardSet.source_type || "manual"}
                </span>
              </div>

              <div className="vault-card-content">
                <p className="vault-card-label">Flashcard Set</p>

                <h3>{flashcardSet.name}</h3>

                <p className="vault-card-back">
                  {flashcardSet.flashcards?.length ?? 0}{" "}
                  {flashcardSet.flashcards?.length === 1
                    ? "card"
                    : "cards"}
                </p>
              </div>

              <div className="vault-card-actions">
                <button type="button" className="edit-card-button">
                  Open Set
                </button>

                <button type="button" className="delete-card-button">
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default FlashcardVault;