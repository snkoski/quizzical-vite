import { useState, useEffect } from 'react'
import Intro from "./Intro"
import  Quiz from "./Quiz"
import './style.css'

function App() {
  const [start, setStart] = useState(false)
  const [userChoices, setUserChoices] = useState({
      number: 5,
      difficulty: "",
      category: "",
      isTimed: true
  })

  function handleUserChoices (number, difficulty, category, isTimed) {
    setUserChoices({
      ...userChoices,
      number: number,
      difficulty: difficulty,
      category: category,
      isTimed: isTimed
    });  
   
  }
//this is just used for testing at the moment
  useEffect(() => {
    console.log(userChoices)
  }, [userChoices])
  //isTimed currently is "undefined"???
  
  
  function startQuiz() {
    setStart(true)  
  }

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
          playAgain={playAgain} 
          number={userChoices.number}
          difficulty={userChoices.difficulty} 
          category={userChoices.category}
          isTimed={userChoices.isTimed}
        /> : 
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
