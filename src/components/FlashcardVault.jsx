import { useEffect, useState } from "react";
import "./FlashcardVault.css";

function FlashcardVault() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({
  front: "",
  back: "",
  language: "",
});

  useEffect(() => {
    async function loadFlashcards() {
      try {
        const response = await fetch("http://localhost:8000/flashcards");

        if (!response.ok) {
          throw new Error("Unable to load flashcards.");
        }

        const data = await response.json();
        setFlashcards(data);
      } catch (loadError) {
        console.error(loadError);
        setError("Your flashcards could not be loaded.");
      } finally {
        setLoading(false);
      }
    }

    loadFlashcards();
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

  function handleNewFlashcardChange(event) {
  const { name, value } = event.target;

  setNewFlashcard((currentFlashcard) => ({
    ...currentFlashcard,
    [name]: value,
  }));
}

async function handleCreateFlashcard(event) {
  event.preventDefault();

  if (
    !newFlashcard.front.trim() ||
    !newFlashcard.back.trim() ||
    !newFlashcard.language.trim()
  ) {
    setError("Please complete all flashcard fields.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8000/flashcards",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlashcard),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create flashcard.");
    }

    const createdFlashcard = await response.json();

    setFlashcards((currentFlashcards) => [
      ...currentFlashcards,
      createdFlashcard,
    ]);

    setNewFlashcard({
      front: "",
      back: "",
      language: "",
    });

    setShowCreateForm(false);
    setError("");
  } catch (createError) {
    console.error(createError);
    setError("Your flashcard could not be created.");
  }
}


  return (
    <section className="flashcard-vault">
      <header className="vault-header">
        <div>
          <p className="vault-eyebrow">Your collection</p>
          <h2>Flashcard Vault</h2>
          <p className="vault-count">
            {flashcards.length}{" "}
            {flashcards.length === 1 ? "card" : "cards"}
          </p>
        </div>

        <button
        type="button"
        className="new-card-button"
        onClick={() => setShowCreateForm(true)}
        >
        + New Flashcard
        </button>
      </header>

      {showCreateForm && (
    <form
        className="create-flashcard-form"
        onSubmit={handleCreateFlashcard}
        >
    <h3>Create New Flashcard</h3>
    <div className="form-group">
      <label htmlFor="front">Front</label>
      <input
        id="front"
        name="front"
        type="text"
        value={newFlashcard.front}
        onChange={handleNewFlashcardChange}
        placeholder="Enter the prompt"
      />
    </div>

    <div className="form-group">
      <label htmlFor="back">Back</label>
      <textarea
        id="back"
        name="back"
        value={newFlashcard.back}
        onChange={handleNewFlashcardChange}
        placeholder="Enter the answer"
      />
    </div>

    <div className="form-group">
      <label htmlFor="language">Language</label>
      <input
        id="language"
        name="language"
        type="text"
        value={newFlashcard.language}
        onChange={handleNewFlashcardChange}
        placeholder="Spanish"
      />
    </div>

    <div className="create-form-actions">
      <button type="submit">Save Flashcard</button>

      <button
        type="button"
        onClick={() => setShowCreateForm(false)}
      >
        Cancel
      </button>
    </div>
  </form>
)}

      {flashcards.length === 0 ? (
        <div className="vault-empty-state">
          <div className="vault-empty-icon">📚</div>
          <h3>Your vault is empty</h3>
          <p>
            Create your first flashcard to begin building your collection.
          </p>
        </div>
      ) : (
        <div className="vault-grid">
          {flashcards.map((flashcard) => (
            <article className="vault-card" key={flashcard.id}>
              <div className="vault-card-top">
                <span className="vault-language">
                  {flashcard.language}
                </span>

                <span
                  className={
                    flashcard.mastered
                      ? "vault-status mastered"
                      : "vault-status learning"
                  }
                >
                  {flashcard.mastered ? "Mastered" : "Learning"}
                </span>
              </div>

              <div className="vault-card-content">
                <p className="vault-card-label">Front</p>
                <h3>{flashcard.front}</h3>

                <p className="vault-card-label">Back</p>
                <p className="vault-card-back">{flashcard.back}</p>
              </div>

              <div className="vault-card-actions">
                <button type="button" className="edit-card-button">
                  Edit
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