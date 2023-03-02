import { useState } from 'react'
import Intro from "./Intro"
import  Quiz from "./Quiz"
import './style.css'

function App() {
  const [start, setStart] = useState(false)

  function startQuiz() {
    setStart(true)
  }

  function playAgain() {
    setStart(false)
  }
  
  return (
    <main>
      <div className="blog">
      { start ? 
        <Quiz playAgain={playAgain} /> : 
        <Intro start={startQuiz} /> 
      }
      </div>
    </main>
  )
}

export default App;
