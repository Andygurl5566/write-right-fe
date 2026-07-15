import "./Correction.css";
import CorrectionTooltip from "./CorrectionTooltip";

function Correction({ mistake, onCreateFlashcard, isOpen, onClick }) {
  return (
    <span
      className="correction-wrapper"
      onClick={(e) => {
        e.stopPropagation();

        onClick();
      }}
    >
      <span className="incorrect-text">{mistake.original}</span>

      <span className="corrected-text">{mistake.corrected}</span>

      {isOpen && (
        <CorrectionTooltip
          mistake={mistake}
          onCreateFlashcard={onCreateFlashcard}
        />
      )}
    </span>
  );
}

export default Correction;
