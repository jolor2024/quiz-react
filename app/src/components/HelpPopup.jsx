import './Popup.css';

export default function HelpPopup({ onClose }) {
  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div className="popup" id="help" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Help</h2>
        <p>
          Press <strong>start</strong> to get a quiz of ten random questions, or press 
          <strong> custom settings</strong> to generate a personalized quiz.
        </p>
      </div>
    </div>
  );
}
