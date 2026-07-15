import "./CorrectionTooltip.css";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';

function CorrectionTooltip({ mistake, onCreateFlashcard }) {
  return (
    <div className="tooltip-container">
      <div className="tooltip-header">
        <span className={`category-badge ${mistake.category}`}>
          {mistake.category}
        </span>
      </div>

      <div className="tooltip-body">
        <div className="tooltip-preview">
          <div className="tooltip-incorrect-container">
            <CloseOutlinedIcon className="close-icon" sx={{ color: "red" }} />
            <span className="tooltip-original">{mistake.original}</span>
          </div>
          <div className="tooltip-corrected-container">
            <CheckOutlinedIcon className="check-icon" sx={{ color: "green" }} />
            <span className="tooltip-corrected">{mistake.corrected}</span>
          </div>
        </div>

        <p className="tooltip-explanation">{mistake.explanation}</p>
      </div>

      <div className="tooltip-footer">
        <button
          type="button"
          className="flashcard-button"
          onClick={() => onCreateFlashcard(mistake)}
        >
          📚 Create Flashcard
        </button>
      </div>
    </div>
  );
}

export default CorrectionTooltip;
