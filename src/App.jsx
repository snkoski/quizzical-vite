import { useState, useEffect } from 'react'
import Intro from "./Intro"
import  Quiz from "./Quiz"
import './style.css'

function App() {
  const [start, setStart] = useState(false)
  const [userChoices, setUserChoices] = useState({
      number: 5,
      difficulty: "",
      category: ""
  })

  function handleUserChoices (number, difficulty, category) {
    setUserChoices({
      ...userChoices,
      number: number,
      difficulty: difficulty,
      category: category
    });  
   
  }

  useEffect(() => {
    console.log(userChoices)
  }, [userChoices])
  
  
  
  function startQuiz() {
    setStart(true)  
  }

  function playAgain() {
    setStart(false)
    setUserChoices({
      number: 5,
      difficulty: "",
      category: ""
    })
  }
  
  return (
    <main>
      <div>
      { start ? 
        <Quiz 
          playAgain={playAgain} 
          number={userChoices.number}
          difficulty={userChoices.difficulty} 
          category={userChoices.category}/> : 
        <Intro 
          start={startQuiz} 
          updateUserChoices={handleUserChoices}
        /> 
      }
      </div>
    </main>
  )
}

export default App;
