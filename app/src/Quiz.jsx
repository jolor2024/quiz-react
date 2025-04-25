import './Quiz.css';
import logo from './assets/logo.svg';
import restartIcon from './assets/icon-restart.svg';
import arrowLeftIcon from './assets/icon-arrow-left.svg';
import { useEffect, useState } from "react";

export default function Quiz() {
  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answerSelected, setAnswerSelected] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState('any');
  const [difficulty, setDifficulty] = useState('any');
  const [type, setType] = useState('any');

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const amountFromUrl = urlParams.get('amount');
    const categoryFromUrl = urlParams.get('category');
    const difficultyFromUrl = urlParams.get('difficulty');
    const typeFromUrl = urlParams.get('type');

    if (amountFromUrl) setAmount(amountFromUrl);
    if (categoryFromUrl) setCategory(categoryFromUrl);
    if (difficultyFromUrl) setDifficulty(difficultyFromUrl);
    if (typeFromUrl) setType(typeFromUrl);

    let apiUrl = `https://opentdb.com/api.php?amount=${amountFromUrl || amount}`;
    if ((categoryFromUrl || category) !== "any") {
      apiUrl += `&category=${categoryFromUrl || category}`;
    }
    if ((difficultyFromUrl || difficulty) !== "any") {
      apiUrl += `&difficulty=${difficultyFromUrl || difficulty}`;
    }
    if ((typeFromUrl || type) !== "any") {
      apiUrl += `&type=${typeFromUrl || type}`;
    }

    fetch(apiUrl)
    .then((response) => {
      if (response.status === 429) {
        throw new Error(`Too many requests`);
      }
      if (!response.ok) {
        throw new Error(`Error fetching quiz: ${response.statusText}`);
      }
      return response.json();
    })
      .then((data) => {
        const formattedQuestions = data.results?.map((question) => {
          const allAnswers = shuffleArray([
            question.correct_answer,
            ...question.incorrect_answers,
          ]);
          return {
            ...question,
            answers: allAnswers,
          };
        });
        setQuestions(formattedQuestions);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
        setLoading(false);
      });
  }, []);

  function handleAnswerClick(answer) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    setAnswerSelected((prev) => [...prev, answer]);

    setTimeout(() => {
      if (index < questions.length - 1) {
        setIndex(index + 1);
        setSelectedAnswer(null); // återställ val för nästa fråga
      } else {
        setQuizFinished(true);
      }
    }, 1500); // 1.5 seconds, so that you have time to see and read the correct answer
  }

  function checkAnswers() {
    const correctAnswers = questions.map((q) => q.correct_answer);
    let score = 0;
  
    answerSelected.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        score++;
      }
    });
  
    setScore(score);
  }

  useEffect(() => {
    if (quizFinished) {
      checkAnswers();
    }
  }, [quizFinished]);  

  useEffect(() => {
    function handleKeyDown(event) {
      if (selectedAnswer !== null || quizFinished || loading || questions.length === 0) return;
  
      const key = event.key;
      const currentQuestion = questions[index];
      const currentAnswers = currentQuestion.answers;
  
      if (["1", "2", "3", "4"].includes(key)) {
        const answerIndex = parseInt(key, 10) - 1;
        if (currentAnswers[answerIndex]) {
          handleAnswerClick(currentAnswers[answerIndex]);
        }
      }
    }
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAnswer, quizFinished, loading, questions, index]);
  

  return (
    <>
      <nav>
        <a className="back-link" href="/" tabIndex="0">
          <img src={arrowLeftIcon} alt="Go back" />
        </a>
      </nav>
      <main>
        <section className="question">
          <div className="logo-icon">
            <img src={logo} alt="logo" />
          </div>

          {loading ? (
            <section className="answers loading-message">
              <h2>Loading quiz...</h2>
              <p>Please wait while we fetch the questions.</p>
            </section>
          ) : questions.length === 0 ? (
            <section className="answers error-message">
              <h2>Oops! Something went wrong</h2>
              <p>Scenario 1:
                No questions could be loaded. This could be due to the API receiving too many requests. Try waiting at <strong>least five seconds</strong> and then reload the page.
              </p>
              <p>Scenario 2: There aren't enough questions to be found according to your custom settings. Try going back to the start page and change the settings.</p>
              <a href="" style={{ gridColumn:"span 1" }} className="restart-btn" tabIndex="0">
                <img src={restartIcon} alt="" />
                Reload
              </a>
              <a href="/" style={{ gridColumn:"span 1" }} className="restart-btn" tabIndex="0">
                <img src={arrowLeftIcon} alt="" />
                Go Back
              </a>
            </section>
          ) : (
            <>
              <section className="answers">
                {quizFinished ? (
                  <>
                    <h2>You got {score} out of {amount} questions correct!</h2>
                    <a 
                      href={window.location.href}
                      className="restart-btn"
                      tabIndex="0"
                    >
                      <img src={restartIcon} alt="" />
                      Play again
                    </a>
                  </>
                ) : (
                  <>
                    <h2 dangerouslySetInnerHTML={{ __html: questions[index].question }} />
                    {questions[index].answers.map((answer, i) => {
                      let className = "answer-btn";

                      if (selectedAnswer !== null) {
                        if (answer === questions[index].correct_answer) {
                          className += " correct";
                        } else if (answer === selectedAnswer) {
                          className += " incorrect";
                        }
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleAnswerClick(answer)}
                          className={className}
                          dangerouslySetInnerHTML={{ __html: answer }}
                          disabled={selectedAnswer !== null}
                        />
                      );
                    })}
                  </>
                )}
              </section>

              {!quizFinished && (
                <small style={{ textAlign: "center" }}>
                  Question {index + 1} of {amount}
                </small>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}
