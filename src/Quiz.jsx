import { useState, useEffect, useRef} from "react"
import Card from "./components/Card"
import { v4 as uuid } from 'uuid'

export default function Quiz ({ playAgain, number, difficulty, category, isTimed }) {
//Holds the quiz object array  
 const [quizData, setQuizData] = useState([]) 
 const [showAnswers, setShowAnswers] = useState(false)
 const [score, setScore] = useState(0)
 const [timer, setTimer] = useState('00:00');
  
 const Ref = useRef(null); // We need ref in this, because we are dealing
 // with JS setInterval to keep track of it and
 // stop it when needed


 const getTimeElapsed = (event) => {
  const elapsed = Date.parse(new Date()) - Date.parse(event);
  const seconds = Math.floor((elapsed / 1000) % 60);
  const minutes = Math.floor((elapsed / 1000 / 60) % 60);
  return {
      minutes,
      seconds
  };
}


 const startTimer = () => {
  let { minutes, seconds } = getTimeElapsed();
  
      // update the timer
      // check if less than 10 then we need to 
      // add '0' at the beginning of the variable
      setTimer(
          (minutes > 9 ? minutes : '0' + minutes) + ':'
          + (seconds > 9 ? seconds : '0' + seconds)
      )

}
const clearTimer = () => {
  
  // If you adjust it you should also need to
  // adjust the Endtime formula we are about
  // to code next    
  setTimer('00:00');

  // If you try to remove this line the 
  // updating of timer Variable will be
  // after 1000ms or 1sec
  if (Ref.current) clearInterval(Ref.current);
  const id = setInterval(() => {
      startTimer();
  }, 1000)
  Ref.current = new Date()
}

function handleButtonClick () {
  if (showAnswers === false) {
    setShowAnswers(true)
    clearTimer()
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
      clearTimer();
      console.log(quizData) // shows this is running twice????
  }, []);

  useEffect(() => {
    return () => {
      if (Ref.current) clearInterval(Ref.current);
    }
  }, []);


  //sets the score
  function handleGotCorrect(gotCorrect) {
    if(gotCorrect===true) {
      setScore(score + 1)
    }
  }

  const createCards = quizData.map((item) => (
    <div className="card-container">
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
      <h5 className="quiz-subhead">5 questions total (scroll for more)</h5>
      <h2 className="quiz-timer">{timer}</h2>
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
  

