import React, { useState } from "react";
import "./Language-Drop-Down.css";
import IndianFlag from "../../../../images/india.png"; 

const languages = [
  { label: "English - EN", value: "EN" },
  { label: "हिन्दी - HI", value: "HI" },
  { label: "தமிழ் - TA", value: "TA" },
  { label: "తెలుగు - TE", value: "TE" },
  { label: "ಕನ್ನಡ - KN", value: "KN" },
  { label: "മലയാളം - ML", value: "ML" },
  { label: "বাংলা - BN", value: "BN" },
  { label: "मराठी - MR", value: "MR" },
];

const LanguageDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const handleSelection = (value) => {
    setSelectedLanguage(value);
  };

  const toggleDropdown = (state) => {
    setShowDropdown(state);
  };

  return (
    <div
      className="flag-section-wrapper"
      onMouseEnter={() => toggleDropdown(true)}
      onMouseLeave={() => toggleDropdown(false)}
    >
      <div className="flag-section link">
        <div className="flex">
          <img src={IndianFlag} alt="Indian Flag" className="flag-icon" />
          <div className="pt-2 pl-1">
            <span className="language-text">{selectedLanguage}</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
      </div>

      {showDropdown && (
        <div className="dropdown-menu">
          <ul>
            {languages.map((language) => (
              <li
                key={language.value}
                className={`dropdown-item group ${selectedLanguage === language.value ? "selected" : ""

                  }`}
                onClick={() => handleSelection(language.value)}
              >
                <input
                  type="radio"
                  name="language"
                  value={language.value}
                  checked={selectedLanguage === language.value}
                  className="group-hover:text-red-500"
                  readOnly
                />
                <label>{language.label}</label>
              </li>
            ))}
          </ul>
          <div className="dropdown-footer">
            <p>Learn more</p>
            <p>You are shopping on Amazon.in</p>
            <p>Change country/region</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;


