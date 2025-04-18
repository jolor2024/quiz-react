import { useEffect, useState } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);

  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState(10);
  const [difficulty, setDifficulty] = useState('easy');

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
      .then((data) => setQuestions(data.results))
      .catch((error) => console.error('Error', error));

  }, []); 

  return (
    <div>
      <h1>Quiz</h1>
    </div>
  );
}
