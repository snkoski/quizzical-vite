import { useState, useEffect } from "react";
import he from "he"; //"html entities" for decoding text
import { v4 as uuid } from "uuid";
import "./card.css";

//each Card represents just a single question and its answers, not the whole quiz
export default function Card({ item, showAnswers, isCorrect, cardNumber }) {
  console.log({ item });
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [allAnswers] = useState(
    [item.correct_answer, ...item.incorrect_answers].sort(
      () => Math.random() - 0.5
    )
  );

  useEffect(() => {
    if (selectedAnswer === item.correct_answer) {
      isCorrect(true, cardNumber - 1);
    } else {
      isCorrect(false, cardNumber - 1);
    }
  }, [selectedAnswer]);

  function gradeQuiz(answer) {
    if (answer === item.correct_answer) {
      return "correct";
    } else if (selectedAnswer === answer) {
      return "incorrect";
    }
  }

  const handleAnswerClick = function (index) {
    setSelectedAnswer(allAnswers[index]);
  };

  const renderAnswers = function () {
    return allAnswers.map((answer, index) => (
      <li
        key={index}
        className={`answer-button 
          ${selectedAnswer === answer && "clicked"}
          ${showAnswers && gradeQuiz(answer)}`}
        onClick={() => handleAnswerClick(index)}
      >
        {answer}
      </li>
    ));
  };

  return (
    <div className="card-container">
      <div className="card-subcontainer">
        <span className="card-number">{cardNumber})</span>{" "}
        <div>
          <h3 className="question">{he.decode(item.question)} </h3>
          <div>
            <ul className="answer-container">{renderAnswers()}</ul>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
