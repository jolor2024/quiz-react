import './Start.css';

import logo from './assets/logo.svg';
import helpIcon from './assets/icon-help.svg';
import settingsIcon from './assets/icon-settings.svg';
import image from './assets/image.png';

import { useState } from 'react';
import HelpPopup from './components/HelpPopup';
import SettingsPopup from './components/SettingsPopup';


export default function Start() {
    
    const [showHelp, setShowHelp] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const [settings, setSettings] = useState({
        amount: 10,
        difficulty: 'any',
        type: 'any',
        category: 'any',
    });

    console.log({settings});

    return (
        <>
            <nav>
                <button onClick={() => setShowHelp(true)} className="help">
                    <img src={helpIcon} alt="" /> Help
                </button>
                <button onClick={() => setShowSettings(true)} className="settings">
                    <img src={settingsIcon} alt="" /> Custom settings
                </button>
                {showHelp && <HelpPopup onClose={() => setShowHelp(false)} />}
                {showSettings && 
                    <SettingsPopup 
                        onClose={() => setShowSettings(false)} 
                        onSave={(newSettings) => setSettings(newSettings)} 
                    />
                }
            </nav>
            <header>
                <img src={logo} alt="Logo" />
                <h1>QuickQuiz</h1>
                <h2>The quickest way to quiz<br />at any given time and place!</h2>
            </header>
            <main>
                <section>
                    <a 
                        className="start-btn" 
                        href={`/quiz?amount=${settings.amount}&difficulty=${settings.difficulty}&type=${settings.type}&category=${settings.category}`}
                        tabIndex="0"
                    >
                    Start Quiz
                    </a>
                </section>
                <img 
                    src={image} 
                    className="start-image" 
                    alt="Vector illustration of three people playing quiz on a mobile phone" 
                    title="Image by Icons8" 
                />
            </main>
        </>
    );

}