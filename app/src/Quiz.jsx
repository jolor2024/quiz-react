import './Quiz.css';
import logo from './assets/logo.svg';
import { useEffect, useState } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const[answerSelected, setAnswerSelected] = useState([]);
  const[score, setScore] = useState([0]);

  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState(10);
  const [difficulty, setDifficulty] = useState('easy');

  function shuffleArray(array) { //Sortera så inte korrekt svar alltid är först
    return array.sort(() => Math.random() - 0.5); 
  };

  useEffect(() => {
    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const amountFromUrl = urlParams.get('amount');
    const categoryFromUrl = urlParams.get('category');
    const difficultyFromUrl = urlParams.get('difficulty');

    if (amountFromUrl) setAmount(amountFromUrl);
    if (categoryFromUrl) setCategory(categoryFromUrl);
    if (difficultyFromUrl) setDifficulty(difficultyFromUrl);


    fetch(`https://opentdb.com/api.php?amount=${amountFromUrl || amount}&category=${categoryFromUrl || category}&difficulty=${difficultyFromUrl || difficulty}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.results.map(question => {
          const allAnswers = shuffleArray([question.correct_answer, ...question.incorrect_answers]); // Kombinera korrekta och inkorreta svaren
          return {
            ...question,
            answers: allAnswers, 
          };
        });
        setQuestions(formattedQuestions);
      })
      .catch((error) => console.error('Error', error));
  }, []); 


  useEffect(() => {
    if(quizFinished) {
      checkAnswers();
    }
  }, [quizFinished]);

  function goToNext(answer) {
    setAnswerSelected(prev => [...prev, answer]);
    if(index < questions.length - 1) {
      setIndex(index + 1)
    } else {
      setQuizFinished(true);
    }
  }

  function checkAnswers() {
    const correct = questions.map(q => q.correct_answer);
    console.log("correct: ", correct);
    console.log("Selected Answers:", answerSelected);
    let score = 0;
    for(let i = 0; i < correct.length; i++) {
      if(correct[i] == answerSelected[i]) {
        score++;
      }
    } 

    setScore(score);
  }


  return (
    <>
      <nav>
          <a href="index.html">
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#BA8DEC"><path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z"/></svg>
          </a>
      </nav>
      <main>
          <section className="question">
              <div className="logo-icon">
                <img src={logo}  alt="logo" />
              </div>
              
              {questions[index] && (
                <section className="answers">
                  {quizFinished ?
                    <>
                      <h2>You got {score} out of {amount} questions correct!</h2>
                    </> : 
                    <>
                    <h2 dangerouslySetInnerHTML={{ __html: questions[index].question }} />
                    {
                      questions[index].answers.map((answer, index) => (
                      <button key={index} onClick={() => goToNext(answer)} className="answer-btn">{answer}</button>
                    ))}
                    </>
                  }
                </section>
              )}
            {!quizFinished && (
               <small style={{ textAlign: "center" }}>Question {index+1} of {amount}</small>
            )}
          </section>
      </main>
  </>
  );
}
