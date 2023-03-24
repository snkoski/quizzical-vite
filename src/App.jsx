import { useState } from "react";
import Intro from "./Intro";
import Quiz from "./Quiz";

export default function App() {
  const [start, setStart] = useState(false);
  const [userChoices, setUserChoices] = useState({});

  const { category, difficulty, numberOfQuestions, timed } = userChoices;
  return (
    <main>
      <div>
        {start ? (
          <Quiz
            playAgain={() => setStart(false)}
            numberOfQuestions={numberOfQuestions}
            difficulty={difficulty}
            category={category}
            isTimed={timed}
          />
        ) : (
          <Intro
            startQuiz={() => setStart(true)}
            setUserChoices={setUserChoices}
          />
        )}
      </div>
    </main>
  );
}
