import { useState } from "react"
import Form from "./intro-components/Form";
import './intro.css'

export default function Intro ({ start, handleUserChoices }) {
// Need to decide where this state is being tracked and set, here or in App.jsx
  const [number, setNumber] = useState(5);
  const [difficulty, setDifficulty] = useState("")
  const [category, setCategory] = useState("")
  const [isTimed, setIsTimed] = useState(true)

  // Looks very complicated but is just a mash-up of setStates
  // Think about simplifying your functions. Do all your inputs need to use the same function? Can you just use the set functions directly?
  const handleChange = (event) => {
    const input = event.target;
    // Don't need numValue until you know that it is a number input
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
    if(input.name === "category") {
      setCategory(numValue)
    }
    if(input.name === "timed") {
      setIsTimed(!isTimed)
    }
  };

  const handleStart = function () {
    start();
    handleUserChoices(number, difficulty, category, isTimed)
  }
  // do I need event.preventDefault() ???

  // button should be part of the form
  return (
    <div className="intro">
      <h1>Totally Quizzical</h1>
      <p className="subhead">A rad way to put your knowlege to the test!</p>
      <Form
        number={number}
        handleChange={handleChange}
      />
      <button className="start-button" onClick={handleStart}>Start quiz</button>
    </div>
  )}