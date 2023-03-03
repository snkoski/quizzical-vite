import { useState } from "react"
import Form from "./introComponents/Form";

export default function Intro ({ start }) {
 /* Starts the quiz. Button makes start state true. If start=true, the Quiz component is activated. */
  const [number, setNumber] = useState("");
  const [difficulty, setDifficulty] = useState("")

  const handleChange = (event) => {
    if(event.target.name === "number") {
      setNumber(event.target.value)
    } else if (event.target.name === "difficulty")  {
      setDifficulty(event.target.value)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log( { number })
    console.log (difficulty )
  };

  return (
    <div className="intro">  
        <h1>Totally Quizzical</h1>
        <p>A rad way to put your knowlege to the test!</p>
        <Form
        number={number}
        difficulty={difficulty}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
        <button className="start-button" onClick={start}>Start quiz</button>
    </div>
  )}