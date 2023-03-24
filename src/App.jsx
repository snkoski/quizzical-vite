import { useState } from 'react'
import Intro from "./Intro"
import  Quiz from "./Quiz"

export default function App() {
  // const [start, setStart] = useState(false)
  const start = false
  // const [userChoices, setUserChoices] = useState({
  //     number: 5,
  //     difficulty: "",
  //     category: "",
  //     isTimed: true
  // });
  //
  // function handleUserChoices (number, difficulty, category, isTimed) {
  //   setUserChoices({
  //     ...userChoices,
  //     number: number,
  //     difficulty: difficulty,
  //     category: category,
  //     isTimed: isTimed
  //   });
  // }
  //
  // function startQuiz() {
  //   setStart(true)
  // }
  //
  // function playAgain() {
  //   setStart(false)
  //   setUserChoices({
  //     number: 5,
  //     difficulty: "",
  //     category: "",
  //     isTimed: true
  //   })
  // }
  
  return (
    <main>
      <div>
      { start ?
        <Quiz 
          playAgain={() => console.log("playAgain()")}
          number={6}
          difficulty={""}
          category={""}
          isTimed={true}
        /> : 
        <Intro 
          start={() => console.log("startQuiz()")}
          handleUserChoices={() => console.log("handleUserChoices()")}
        /> 
      }
      </div>
    </main>
  )
}


