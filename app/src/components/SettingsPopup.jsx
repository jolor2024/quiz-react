import './Popup.css';
import styles from './SettingsPopup.module.css';
import React from 'react';

export default function SettingsPopup({ onClose }) {
  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div className="popup" id="settings" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <h2 className={styles.heading}>Custom settings</h2>
        <form action="" method="post">

          <fieldset className="form-control amount-options" id={styles.amount}>
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
                <label htmlFor={`amount-${val}`}>{val}</label>
              </React.Fragment>
            ))}
          </fieldset>

          <fieldset className="form-control difficulty-options" id={styles.difficulty}>
            <legend>Difficulty</legend>
            {[
              { level: "Any", emoji: "🤷" },
              { level: "Easy", emoji: "🤓" },
              { level: "Medium", emoji: "🤔" },
              { level: "Hard", emoji: "🤯" },
            ].map(({ level, emoji }) =>
              <React.Fragment key={level}>
                <input
                  type="radio"
                  id={`difficulty-${level}`}
                  name="trivia_difficulty"
                  value={level}
                  defaultChecked={level === "any"}
                />
                <label htmlFor={`difficulty-${level}`}>
                    {emoji ? <div className={styles.emoji}>{emoji}</div> : null}
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                </label>
              </React.Fragment>
            )}
          </fieldset>

          <fieldset className="form-control answer-options">
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
                <label htmlFor={`type-${value}`}>{label}</label>
              </React.Fragment>
            ))}
          </fieldset>

          <fieldset id={styles.cats}>
            <legend>Category</legend>

            {[
              { value: "any", label: "Any Category", emoji: "🤷" },
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
                <label htmlFor={`category-${value}`}>
                    {emoji ? <div className={styles.emoji}>{emoji}</div> : null}
                    {label}
                </label>
              </React.Fragment>
            ))}
          </fieldset>

          <input
            type="hidden"
            name="token"
            value="376aced3ae5529ba3d74ddd11aeff24f06a5a1fbcf0508ef9e294a7e640bb4b8"
          />
        </form>
      </div>
    </div>
  );
}
