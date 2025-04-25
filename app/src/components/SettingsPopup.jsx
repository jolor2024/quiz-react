import './Popup.css';
import styles from './SettingsPopup.module.css';
import React, { useEffect } from 'react';

export default function SettingsPopup({ onClose, onSave }) {
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const settings = {
      amount: formData.get('trivia_amount'),
      difficulty: formData.get('trivia_difficulty'),
      type: formData.get('trivia_type'),
      category: formData.get('trivia_category'),
    };
    onSave(settings);
    onClose();
  }

  useEffect(() => {
    function handleKeyDown(e) {
      const focused = document.activeElement;

      if (focused.tagName === "LABEL") {
        const fieldset = focused.closest("fieldset");
        if (!fieldset) return;

        const labels = Array.from(fieldset.querySelectorAll("label"));
        const index = labels.indexOf(focused);

        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          const next = labels[(index + 1) % labels.length];
          next.focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          const prev = labels[(index - 1 + labels.length) % labels.length];
          prev.focus();
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const inputId = focused.htmlFor;
          const input = document.getElementById(inputId);
          if (input) input.click();
        }
      } 
      
      else if (focused.tagName === "FIELDSET") {
        const fieldsets = Array.from(document.querySelectorAll("fieldset[tabindex='0']"));
        const index = fieldsets.indexOf(focused);

        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (index < fieldsets.length - 1) {
            fieldsets[index + 1].focus();
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (index > 0) {
            fieldsets[index - 1].focus();
          }
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const labels = focused.querySelectorAll("label");
          if (labels.length > 0) {
            labels[0].focus();
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div className="popup" id="settings" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <h2 className={styles.heading}>Custom settings</h2>
        <form onSubmit={handleSubmit}>

          <fieldset className="form-control amount-options" id={styles.amount} tabIndex="0">
            <legend>Number of Questions</legend>

            {[10, 20, 30, 40, 50].map((val) => (
              <React.Fragment key={val}>
                <input
                  type="radio"
                  id={`amount-${val}`}
                  name="trivia_amount"
                  value={val}
                  defaultChecked={val === 10}
                />
                <label htmlFor={`amount-${val}`} tabIndex="-1">{val}</label>
              </React.Fragment>
            ))}
          </fieldset>

          <fieldset className="form-control difficulty-options" id={styles.difficulty} tabIndex="0">
            <legend>Difficulty</legend>
            {[
              { level: "any", emoji: "🤷" },
              { level: "easy", emoji: "🤓" },
              { level: "medium", emoji: "🤔" },
              { level: "hard", emoji: "🤯" },
            ].map(({ level, emoji }) =>
              <React.Fragment key={level}>
                <input
                  type="radio"
                  id={`difficulty-${level}`}
                  name="trivia_difficulty"
                  value={level.toLowerCase()}
                  defaultChecked={level === "any"}
                />
                <label htmlFor={`difficulty-${level}`} tabIndex="-1">
                    {emoji ? <div className={styles.emoji}>{emoji}</div> : null}
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                </label>
              </React.Fragment>
            )}
          </fieldset>

          <fieldset className="form-control answer-options" tabIndex="0">
            <legend>Answer Type</legend>

            {[
              { value: "any", label: "Any" },
              { value: "multiple", label: "Multiple Choice" },
              { value: "boolean", label: "True or False" },
            ].map(({ value, label }) => (
              <React.Fragment key={value}>
                <input
                  type="radio"
                  id={`type-${value}`}
                  name="trivia_type"
                  value={value}
                  defaultChecked={value === "any"}
                />
                <label htmlFor={`type-${value}`} tabIndex="-1">{label}</label>
              </React.Fragment>
            ))}
          </fieldset>

          <fieldset id={styles.cats} tabIndex="0">
            <legend>Category</legend>

            {[
              { value: "any", label: "Any", emoji: "🤷" },
              { value: "9", label: "General Knowledge", emoji: "🎓" },
              { value: "10", label: "Books", emoji: "📚" },
              { value: "11", label: "Film", emoji: "🎬" },
              { value: "12", label: "Music", emoji: "🎵" },
              { value: "13", label: "Musicals & Theatres", emoji: "🎭" },
              { value: "14", label: "Television", emoji: "📺" },
              { value: "15", label: "Video Games", emoji: "🎮" },
              { value: "16", label: "Board Games", emoji: "🎲" },
              { value: "17", label: "Science & Nature", emoji: "🌋" },
              { value: "18", label: "Computers", emoji: "💻" },
              { value: "19", label: "Mathematics", emoji: "🧮" },
              { value: "20", label: "Mythology", emoji: "🐲" },
              { value: "21", label: "Sports", emoji: "🏓" },
              { value: "22", label: "Geography", emoji: "🌍" },
              { value: "23", label: "History", emoji: "📜" },
              { value: "24", label: "Politics", emoji: "🏛" },
              { value: "25", label: "Art", emoji: "🎨" },
              { value: "26", label: "Celebrities", emoji: "⭐️" },
              { value: "27", label: "Animals", emoji: "🐰" },
              { value: "28", label: "Vehicles", emoji: "🚗" },
              { value: "29", label: "Comics", emoji: "🦸" },
              { value: "30", label: "Gadgets", emoji: "⌚️" },
              { value: "31", label: "Anime & Manga", emoji: "🌸" },
              { value: "32", label: "Cartoon & Animations", emoji: "👀" },
            ].map(({ value, label, emoji }) => (
              <React.Fragment key={value}>
                <input
                  type="radio"
                  id={`category-${value}`}
                  name="trivia_category"
                  value={value}
                  defaultChecked={value === "any"}
                />
                <label htmlFor={`category-${value}`} tabIndex="-1">
                    {emoji ? <div className={styles.emoji}>{emoji}</div> : null}
                    {label}
                </label>
              </React.Fragment>
            ))}
          </fieldset>

          <button type="submit" className={styles.save}>Save Settings</button>
        </form>
      </div>
    </div>
  );
}
