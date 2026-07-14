import "./CorrectionToolTip.css";

// This component is used to display a tooltip with an explanation of the correction and a button to create a flashcard.
function CorrectionTooltip({ children }) {
  return (
    <div className="tooltip-container">
      <div className="tooltip-content">{children}</div>
      <button>Create Flashcard</button>
    </div>
  );
}

export default CorrectionTooltip;
