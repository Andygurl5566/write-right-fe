import "./Correction.css";
import CorrectionTooltip from "./CorrectionTooltip";

function Correction({ mistake, onCreateFlashcard }) {
  return (
    <span className="correction-wrapper">
      <span className="incorrect-text">{mistake.original}</span>

      <span className="corrected-text">
        {mistake.corrected_text}
      </span>

      <CorrectionTooltip
        mistake={mistake}
        onCreateFlashcard={onCreateFlashcard}
      />
    </span>
  );
}

export default Correction;
