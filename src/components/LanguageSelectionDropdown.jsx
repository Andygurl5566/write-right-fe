import { languages } from "../utils/constants/languages";

function LanguageSelectionDropdown({ onChange, displayText }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <select
      id="language-selection"
      name="languages"
      defaultValue=""
      onChange={handleChange}
    >
      <option value="" disabled hidden>
        {displayText}
      </option>

      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default LanguageSelectionDropdown;