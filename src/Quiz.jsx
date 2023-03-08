import { useState, useEffect, useRef} from "react"
import Card from "./quiz-components/Card"
import Timer from "./quiz-components/Timer"
import { v4 as uuid } from 'uuid'

export default function Quiz ({ playAgain, number, difficulty, category, isTimed }) {
//Holds the quiz object array  
 const [quizData, setQuizData] = useState([]) 
 const [showAnswers, setShowAnswers] = useState(false)
 const [score, setScore] = useState(0)
 const [chicken, setChicken] = useState(true)

function handleButtonClick () {
  if (showAnswers === false) {
    setShowAnswers(true)
    setChicken(false)
     //this will be where calling a  stop timer function  will be called
  } else {
    playAgain()
  } 
}


  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then((res) => res.json())
      .then((data) =>
        setQuizData(
          data.results.map((item) => ({
            ...item,
            key: uuid(),
          }))
        )
      );
      console.log(quizData) // shows this is running twice????
  }, []);

  //sets the score
  function handleGotCorrect(gotCorrect) {
    if(gotCorrect===true) {
      setScore(score + 1)
    }
  }

  const createCards = quizData.map((item, index) => (
    <div className="card-container">
      <span className="card-number">{index + 1}</span>
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


  /* Maps over the data in state and passes question to Card as a prop */
  return (
    <div className="quiz-container">
      <h2 className="quiz-heading">QUIZ TIME! </h2>
      <h5 className="quiz-subhead">{number} questions total (scroll for more)</h5>
      { isTimed && <Timer chicken={chicken}/> }
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
  

