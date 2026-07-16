import "./CorrectionTooltip.css";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function CorrectionTooltip({ mistake, onCreateFlashcard }) {
  // Let's move this logic to BE so FE only gets clean data -------

  // Replaces all underscores with spaces
  function refineCategory(word = "") {
    const cleanWord = word.replace(/_/g, " ");

    return cleanWord;
  }

  // Helps set the badge color. If the response is one of the below options in the array, it assigns it a specific color, else it assigns it a general grey badge color
  function getBadgeCategory(word = "") {
    const relevantCategories = [
      "spelling",
      "grammar",
      "vocabulary",
      "punctuation",
      "word choice",
    ];

    let cleanWord = refineCategory(word);
    return relevantCategories.includes(cleanWord) ? cleanWord : "other";
  }
  // ---------------------------------------------------------------------

  return (
    <div className="tooltip-container">
      <div className="tooltip-header">
        <span
          className={`category-badge ${getBadgeCategory(mistake.category)}`}
        >
          {refineCategory(mistake.category)}
        </span>
      </div>

      <div className="tooltip-body">
        <div className="tooltip-preview">
          <div className="tooltip-incorrect-container">
            <CloseOutlinedIcon className="close-icon" />
            <span className="tooltip-original">{mistake.original}</span>
          </div>
          <div className="tooltip-corrected-container">
            <CheckOutlinedIcon className="check-icon" />
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
          Create Flashcard
        </button>
      </div>
    </div>
  );
}

export default CorrectionTooltip;
