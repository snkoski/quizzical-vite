import { useEffect, useState } from "react";
import Card from "./quiz-components/Card";
import Timer from "./quiz-components/Timer";
import Loading from "./quiz-components/Loading";
import { v4 as uuid } from "uuid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import "./quiz.css";

export default function Quiz({
  playAgain,
  numberOfQuestions,
  difficulty,
  category,
  isTimed,
}) {
  const [quizData, setQuizData] = useState([]); //Holds the quiz object array
  const [showAnswers, setShowAnswers] = useState(false);
  const [timerOn, setTimerOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [answerList, setAnswerList] = useState(
    Array(numberOfQuestions).fill(false)
  );
  const { width, height } = useWindowSize();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer); //what does this do?
  }, []);

  const getQuestions = async () => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    const data = await response.json();

    setQuizData(
      data.results.map((item) => ({
        ...item,
        key: uuid(),
      }))
    );
  };

  useEffect(() => {
    getQuestions();
  }, []);

  function handleButtonClick() {
    if (showAnswers === false) {
      setShowAnswers(true);
      setTimerOn(false);
    } else {
      playAgain();
    }
  }

  //sets the score
  function handleCheckAnswer(gotCorrect, index) {
    const nextAnswerList = [...answerList];
    nextAnswerList[index] = gotCorrect;

    setAnswerList(nextAnswerList);
  }

  // renders the message at the bottom of the screen
  function renderScore() {
    const score = answerList.filter(Boolean).length;
    if (score === quizData.length) {
      return (
        <div>
          <Confetti width={width} height={height} />
          <p>
            BOO-YAH! You scored {score} out of {quizData.length}!
          </p>
        </div>
      );
    } else if (score >= quizData.length / 2) {
      return `Word up! You scored ${score} out of ${quizData.length}!`;
    } else if (score > 0) {
      return `Oh snap! You scored ${score} out of ${quizData.length}.`;
    } else {
      return `Dang, you scored ${score} out of ${quizData.length}.`;
    }
  }

  return (
    <div className="quiz-container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="quiz-heading">Quiz time! </h2>
          <h5 className="quiz-subhead">
            {numberOfQuestions === "1"
              ? `One question`
              : `${numberOfQuestions} questions total (scroll for more)`}
          </h5>
          {isTimed && <Timer timerOn={timerOn} />}
          {quizData.map((item, index) => (
            <Card
              key={item.key} // Any reason to pass this? It is not used as a prop.
              item={item}
              showAnswers={showAnswers}
              isCorrect={handleCheckAnswer}
              cardNumber={index + 1}
            />
          ))}
          <div className="button-container">
            <h4>{showAnswers ? renderScore() : ""}</h4>
            <button className="quiz-button" onClick={() => handleButtonClick()}>
              {showAnswers === false ? "Check answers" : "Play again"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
