import "./Correction.css";
import CorrectionTooltip from "./CorrectionTooltip";

// returns a single correction
function Correction({ mistake }) {
  console.log("Correction:", mistake);

  return (
    <span className="correction-wrapper">
      <span className="incorrect-text">{mistake.original}</span>

      <span className="corrected-text">{mistake.corrected}</span>

      <CorrectionTooltip mistake={mistake}></CorrectionTooltip>
    </span>
  );
}

export default Correction;
