import { useState } from "react";
import { useRef, useEffect } from "react";
import Correction from "./Correction";
import CorrectionTooltip from "./CorrectionTooltip";
import "./JournalText.css";

function JournalText({ text, corrections, onBack, onCreateFlashcard }) {
  // State to track the currently selected correction for tooltip display
  const [selectedCorrection, setSelectedCorrection] = useState(null);
  // ref for the review container to handle clicks outside of the tooltip
  const reviewRef = useRef(null);

  function renderTextWithCorrections() {
    // If there are no mistakes, just display the text
    if (!corrections || corrections.length === 0) {
      return text;
    }

    const parts = [];

    // Keeps track of where we are in the original text
    let currentIndex = 0;

    corrections.forEach((mistake, index) => {
      /*
                Add the text BEFORE the mistake

                Example:

                "How are you"

                mistake:
                Hww

                This adds everything before Hww
            */
      if (mistake.start > currentIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {text.slice(currentIndex, mistake.start)}
          </span>,
        );
      }

      /*
                Add the correction component

                Example:

                Hww → How
            */
      parts.push(
        <Correction
          key={`mistake-${index}`}
          mistake={mistake}
          onCreateFlashcard={onCreateFlashcard}
          isOpen={selectedCorrection === index}
          onClick={() =>
            setSelectedCorrection(selectedCorrection === index ? null : index)
          }
        />,
      );

      /*
                Move our pointer forward

                so we don't duplicate text
            */
      currentIndex = mistake.end;
    });

    /*
            Add whatever text remains after the last mistake

            Example:

            " are you??"
        */
    if (currentIndex < text.length) {
      parts.push(<span key="remaining-text">{text.slice(currentIndex)}</span>);
    }

    return parts;
  }

  // Close the tooltip if the user clicks outside of it
  useEffect(() => {

    function handleClick(event) {

        if (
            reviewRef.current &&
            !reviewRef.current.contains(event.target)
        ) {
            setSelectedCorrection(null);
        }

    }

    document.addEventListener(
        "mousedown",
        handleClick
    );

    return () => {

        document.removeEventListener(
            "mousedown",
            handleClick
        );

    };

}, []);

  return (
    <div ref={reviewRef} className="journal-content">
      <div className="journal-review">
        <div className="review-header">
          <h2>Your Journal Review</h2>

          <button onClick={onBack} className="back-button">
            ← Back to Edit
          </button>
        </div>

        <div className="journal-content">{renderTextWithCorrections()}</div>
      </div>
    </div>
  );
}

export default JournalText;
