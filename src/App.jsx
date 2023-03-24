import { useState } from 'react'
import Intro from "./Intro"
import  Quiz from "./Quiz"

export default function App() {
  const [start, setStart] = useState(false)
  // Need to decide where this state is being tracked and set, here or in Intro.jsx
  const [userChoices, setUserChoices] = useState({
    number: 5,
    difficulty: "",
    category: "",
    isTimed: true
  });

  // All this does is call setUserChoices, so you can just pass that function instead of creating this extra one
  function handleUserChoices (number, difficulty, category, isTimed) {
    setUserChoices({
      ...userChoices,
      number: number,
      difficulty: difficulty,
      category: category,
      isTimed: isTimed
    });
  }

  // Same as above, you can just call setStart directly instead of making this extra function
  function startQuiz() {
    setStart(true)
  }

  // setUserChoices isn't doing anything in here and can be removed
  // Removing setUserChoices just leaves setStart so you can just call it directly
  function playAgain() {
    setStart(false)
    setUserChoices({
      number: 5,
      difficulty: "",
      category: "",
      isTimed: true
    })
  }

  return (
    <main>
      <div>
        { start ?
          <Quiz
            // playAgain={() => setStart(false)} // calling setStart directly
            playAgain={playAgain}
            number={userChoices.number}
            difficulty={userChoices.difficulty}
            category={userChoices.category}
            isTimed={userChoices.isTimed}
          /> :
          <Intro
            //start={() => setStart(true)} // calling setStart directly
            start={startQuiz}
            handleUserChoices={handleUserChoices}
          />
        }
      </div>
    </main>
  )
}


