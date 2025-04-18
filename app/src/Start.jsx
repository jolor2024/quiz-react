import './Start.css';
import logo from './assets/logo.svg';
import helpIcon from './assets/icon-help.svg';
import settingsIcon from './assets/icon-settings.svg';
import image from './assets/image.png';

export default function Start() {
    return (
        <>
            <nav>
                <details className="help">
                    <summary>
                        <img src={helpIcon} alt="" /> Help
                    </summary>
                    <p>Press <strong>start</strong> to get a quiz of ten random questions, or press <strong>custom settings</strong> to generate a personalized quiz.</p>
                </details>
                <details className="settings">
                    <summary>
                        <img src={settingsIcon} alt="" /> Custom settings
                    </summary>
                    <form action="" method="post" class="form-api">
                        <label for="trivia_amount">Number of Questions:</label>
                        <input type="number" name="trivia_amount" id="trivia_amount" class="form-control" min="1" max="50" value="10"/>
                        <br />
                        <label for="trivia_category">Category: </label>
                        <select name="trivia_category" class="form-control">
                            <option value="any">Any Category</option>
                            <option value="9">General Knowledge</option><option value="10">Entertainment: Books</option><option value="11">Entertainment: Film</option><option value="12">Entertainment: Music</option><option value="13">Entertainment: Musicals &amp; Theatres</option><option value="14">Entertainment: Television</option><option value="15">Entertainment: Video Games</option><option value="16">Entertainment: Board Games</option><option value="17">Science &amp; Nature</option><option value="18">Science: Computers</option><option value="19">Science: Mathematics</option><option value="20">Mythology</option><option value="21">Sports</option><option value="22">Geography</option><option value="23">History</option><option value="24">Politics</option><option value="25">Art</option><option value="26">Celebrities</option><option value="27">Animals</option><option value="28">Vehicles</option><option value="29">Entertainment: Comics</option><option value="30">Science: Gadgets</option><option value="31">Entertainment: Japanese Anime &amp; Manga</option><option value="32">Entertainment: Cartoon &amp; Animations</option>		</select>
                
                        <br />
                
                        <label for="trivia_difficulty">Difficulty: </label>
                        <select name="trivia_difficulty" class="form-control">
                            <option value="any">Any Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                
                        <br />
                
                        <label for="trivia_type">Answer Type: </label>
                        <select name="trivia_type" class="form-control">&gt;
                            <option value="any">Any Type</option>
                            <option value="multiple">Multiple Choice</option>
                            <option value="boolean">True or False</option>
                        </select>
                
                        <input type="hidden" name="token" value="376aced3ae5529ba3d74ddd11aeff24f06a5a1fbcf0508ef9e294a7e640bb4b8"/>
                
                    </form>
                </details>
            </nav>
            <header>
                <img src={logo} alt="Logo" />
                <h1>QuickQuiz</h1>
                <h2>The quickest way to quiz<br />at any given time and place!</h2>
            </header>
            <main>
                <section>
                    <a className="start-btn" href="/quiz">Start Quiz</a>
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