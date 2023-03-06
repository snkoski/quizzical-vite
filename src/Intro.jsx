import { useState } from "react"
import Form from "./introComponents/Form";

export default function Intro ({ start, updateUserChoices }) {

  const [number, setNumber] = useState(5);
  const [difficulty, setDifficulty] = useState("")
  const [category, setCategory] = useState("")
  const [isTimed, setIsTimed] = useState(true)
  

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
    if(input.name ==="timed") {
      setIsTimed(!isTimed)
    }
  };

  const handleStart = function () {
    start();
    updateUserChoices(number, difficulty, category)
    // console.log( { number })
    // console.log ({ difficulty } )
    // console.log ({ category } )
  }
  //   do I need event.preventDefault() ???


  return (
    <div className="intro">  
        <h1>Totally Quizzical</h1>
        <p>A rad way to put your knowlege to the test!</p>
        <Form
        number={number}
        handleChange={handleChange}
      />
        <button className="start-button" onClick={handleStart}>Start quiz</button>
      
    </div>
  )}