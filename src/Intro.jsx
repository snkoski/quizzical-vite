import { useState } from "react"
import Form from "./introComponents/Form";

export default function Intro ({ start }) {
 /* Starts the quiz. Button makes start state true. If start=true, the Quiz component is activated. */
  const [number, setNumber] = useState(5);
  const [difficulty, setDifficulty] = useState("")
  const [category, setCategory] = useState("")

  const handleChange = (event) => {
    const input = event.target;
    const numValue = parseInt(input.value, 10);
    if(input.name === "number") {
      if (numValue <1 || numValue > 20) {
        input.setCustomValidity("Please enter a number between 1 and 20.");
      } else  {
        input.setCustomValidity("");
        setNumber(numValue) // logs out as an integer
      }
    } 
    if (input.name === "difficulty")  {
      setDifficulty(input.value) 
    }
    if(input.name ==="category") {
      setCategory(numValue) 
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log( { number })
    console.log ({ difficulty } )
    console.log ({ category } )
  };

  return (
    <div className="intro">  
        <h1>Totally Quizzical</h1>
        <p>A rad way to put your knowlege to the test!</p>
        <Form
        number={number}
        difficulty={difficulty}
        category={category}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
        <button className="start-button" onClick={start}>Start quiz</button>
    </div>
  )}