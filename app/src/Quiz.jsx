import './Quiz.css';
import { useEffect, useState } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);

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


  function goToNext() {
    if(index < questions.length - 1) {
      setIndex(index + 1)
    } else {
      alert("Quiz finished")
    }
  }


  return (
    <div>
     <h1>Quiz</h1>

     {questions[index] && (
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: questions[index].question }} />
          <button onClick={goToNext}>Next</button>
          {
            questions[index].answers.map((answer, index) => (
            <h4 key={index}>{answer}</h4> 
          ))}
        </div>
      )}
    </div>
  );
}
