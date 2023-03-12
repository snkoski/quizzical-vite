import { useState, useEffect } from "react"
import Card from "./quiz-components/Card"
import Timer from "./quiz-components/Timer"
import Loading from "./quiz-components/Loading"
import { v4 as uuid } from 'uuid'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import './quiz.css'

export default function Quiz ({ playAgain, number, difficulty, category, isTimed }) {  
  const [quizData, setQuizData] = useState([]) //Holds the quiz object array
  const [showAnswers, setShowAnswers] = useState(false)
  const [score, setScore] = useState(0)
  const [timerOn, setTimerOn] = useState(false) 
  const [loading, setLoading] = useState(true)
  const { width, height } = useWindowSize()
  
  useEffect(()=> {
    const loadingTimer = setTimeout(() => {
      setLoading(false)
      setTimerOn(true)
    }, 1500);

    return () => clearTimeout(loadingTimer); //what does this do?
  }, [])

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

  /* Maps over the data in state and passes it to Card as a prop */
  const createCards = quizData.map((item, index) => (
    <div className="card-container"> 
      <div className="card-subcontainer">
        <span className="card-number">{index + 1})</span>
        <Card
          key={item.key} // Any reason to pass this? It is not used as a prop. 
          question={item.question}
          incorrectAnswers={item.incorrect_answers}
          correctAnswer={item.correct_answer}
          showAnswers={showAnswers}
          gotCorrect={handleGotCorrect}
        />
      </div>
      <hr></hr>
    </div>
  ));

  function handleButtonClick () {
    if (showAnswers === false) {
      setShowAnswers(true)
      setTimerOn(false)
    } else {
      playAgain()
    } 
  }

  //sets the score
  function handleGotCorrect(gotCorrect) {
    if(gotCorrect===true) {
      setScore(score + 1)
    }
  }

  // renders the message at the bottom of the screen
  function renderScore () {
    if (score === quizData.length) {
      return (
        <div>
          <Confetti 
            width={width}
            height={height}
          />
          <p>BOO-YAH! You scored {score} out of {quizData.length}!</p>
        </div>
      )
    } else if (score >= quizData.length / 2) {
      return `Word up! You scored ${score} out of ${quizData.length}!`
    } else if (score > 0) {
      return `Oh snap! You scored ${score} out of ${quizData.length}.`
    } else {  
      return `Dang, you scored ${score} out of ${quizData.length}.` 
    }
  }

  return (
    <div className="quiz-container">
      { loading ? 
        <Loading /> :  
        <div> 
          <h2 className="quiz-heading">Quiz time! </h2>
          <h5 className="quiz-subhead">{number} questions total (scroll for more)</h5>
          { isTimed && <Timer timerOn={timerOn}/> }
          {createCards}
          <div className="button-container">
            <h4>{showAnswers ? renderScore() : ""}</h4>
            <button 
              className="quiz-button" 
              onClick={()=>handleButtonClick()}>
                {showAnswers===false ? "Check answers" : "Play again"}
            </button>
          </div>
        </div>        
      } 
    </div>
  );
};
  

