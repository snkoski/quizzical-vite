import { useState, useEffect} from "react"
import Card from "./components/Card"
import { v4 as uuid } from 'uuid'

export default function Quiz ({ playAgain }) {
//Holds the quiz object array  
 const [quizData, setQuizData] = useState([]) 
 const [showAnswers, setShowAnswers] = useState(false)
 const [score, setScore] = useState(0)

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) =>
        setQuizData(
          data.results.map((item) => ({
            ...item,
            key: uuid(),
          }))
        )
      );
      console.log(quizData) // shows this is running twice
  }, []);

  //sets the score
  function handleGotCorrect(gotCorrect) {
    if(gotCorrect===true) {
      setScore(score + 1)
    }
  }

  const createCards = quizData.map((item) => (
    <div>
      <Card
        key={item.key}
        question={item.question}
        incorrectAnswers={item.incorrect_answers}
        correctAnswer={item.correct_answer}
        showAnswers={showAnswers}
        gotCorrect={handleGotCorrect}
      />
      <hr></hr>
    </div>
  ))

  function handleButtonClick () {
    if (showAnswers === false) {
      setShowAnswers(true)
    } else {
      playAgain()
    } 
  }


  /* Maps over the data in state and passes question to Card as a prop */
  return (
    <div className="quiz-container">
      <h2 className="quiz-heading">QUIZ TIME! </h2>
      <h5 className="quiz-subhead">5 questions total (scroll for more).</h5>
      {createCards}
      <div className="button-container">
        <h4>{showAnswers ? `You scored ${score} out of ${quizData.length}` : ""}</h4>
        <button 
          className="quiz-button" 
          onClick={()=>handleButtonClick()}>
            {showAnswers===false ? "Check answers" : "Play again"}
        </button>
      </div>  
    </div>
  );
}
  

