import { useState, useEffect } from 'react'
import he from 'he' //"html entities" for decoding text
import { v4 as uuid } from 'uuid'
import './card.css'

// very complicated logic for a card component
// I would probably just pass the entire question object instead of separating it into question, incorrectAnswers, and correctAnswer
//each Card represents just a single question and its answers, not the whole quiz
export default function Card({ question, incorrectAnswers, correctAnswer, showAnswers, gotCorrect }) {

  const [selectedAnswer, setSelectedAnswer] = useState([]);
  // Looks very complicated for tracking answers, could this be simplified?
  // You can just not include setAllAnswers in useState array if you're not going to use it
  const [allAnswers, setAllAnswers] = useState([
    ...incorrectAnswers.map(answer => ({
      answer: he.decode(answer),
      isCorrect: false,
      id: uuid(),
    })),
    {
      answer: he.decode(correctAnswer),
      isCorrect: true,
      id: uuid(),
      answeredCorrectly: false
    },
  ].sort(() => Math.random() - 0.5)); // keeping this in state allows the sort to run just once. But state is never reset. Better way to do this?

  useEffect(() => {
    markCorrect(selectedAnswer);
  }, [selectedAnswer]);

//else if checks if there is a selected Answer, and if this answer equals the answer that is coming in from the list argument, and if that answer is not correct.
  function gradeQuiz(answer, state) {
    if (state===true) {
      if (answer.isCorrect===true) {
        return "correct";
      } else if (selectedAnswer && selectedAnswer.answer === answer.answer && answer.isCorrect === false) {
        return "incorrect"
      } else {
        return "unselected"
      }
    } else {
      return "";
    }
  }

  // need to mark incorrect answers incase a user clicks multiple answers
  function markCorrect(answer) {
    if (selectedAnswer.answer === answer.answer && answer.isCorrect === true) {
      gotCorrect(true); // call the callback function in Quiz with the gotCorrect value
    }
  }

  const handleAnswerClick = function (index) {
    const answer = allAnswers[index]; //returns whole object
    setSelectedAnswer(answer)
  };

  // I don't really like functions like this that just set up html to be rendered later.
  // I would either just put this right into the return code or turning it into its own component
  const renderAnswers = function() {
    return allAnswers.map((answer, index) => (
      <li
        key={answer.id}
        {/* This is very complicated for a setting classes
        I came up with this to make it a little easier to read

        className={`answer-button
          ${selectedAnswer === answer && "clicked"}
          ${showAnswers && gradeQuiz(answer)}`}

        No more ternary :)
        Moving showAnswer outside of gradeQuiz means gradeQuiz will only run when showAnswers is true instead of running on every render and checking if showAnswers is true inside of it
        */}
        className={
          `answer-button 
          ${selectedAnswer.answer === answer.answer
            ? "clicked"
            : ""
          }
          ${gradeQuiz(answer, showAnswers)}`
        }
        onClick={() => handleAnswerClick(index) }
      >
        {answer.answer}
      </li>
    ))
  };

  return (
    <div>
      <h3 className="question">{he.decode(question)} </h3>
      <div>
        <ul className="answer-container">
          {renderAnswers()}
        </ul>
      </div>
    </div>
  )
};

 