import "./CorrectionTooltip.css";

function CorrectionTooltip({ mistake }) {
  console.log("mistakes:", mistake);
  return (
    <div className="tooltip-container">
      <div className="tooltip-header">
        <span className={`category-badge ${mistake.category}`}>
          {mistake.category}
        </span>
      </div>

      <div className="tooltip-body">
        <div className="tooltip-preview">
          <span className="tooltip-original">{mistake.original}</span>

          <span className="tooltip-arrow">→</span>

          <span className="tooltip-corrected">{mistake.corrected}</span>
        </div>

        <p className="tooltip-explanation">{mistake.explanation}</p>
      </div>

      <div className="tooltip-footer">
        <button className="flashcard-button">📚 Create Flashcard</button>
      </div>
    </div>
  );
}

export default CorrectionTooltip;
