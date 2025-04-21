import './Quiz.css';
import logo from './assets/logo.svg';
import restartIcon from './assets/icon-restart.svg';
import { useEffect, useState } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answerSelected, setAnswerSelected] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState('any');
  const [difficulty, setDifficulty] = useState('any');
  const [type, setType] = useState('any'); // 👈 Glöm inte type

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
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.results.map((question) => {
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
      })
      .catch((error) => console.error('Error fetching quiz:', error));
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

  return (
    <>
      <nav>
        <a href="index.html">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#BA8DEC">
            <path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z"/>
          </svg>
        </a>
      </nav>
      <main>
        <section className="question">
          <div className="logo-icon">
            <img src={logo} alt="logo" />
          </div>

          {questions[index] && (
            <section className="answers">
              {quizFinished ? (
                <>
                  <h2>You got {score} out of {amount} questions correct!</h2>
                  <a 
                    href={window.location.href} // Länka till samma URL
                    className="restart-btn"
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
          )}

          {!quizFinished && (
            <small style={{ textAlign: "center" }}>Question {index + 1} of {amount}</small>
          )}

        </section>
      </main>
    </>
  );
}
