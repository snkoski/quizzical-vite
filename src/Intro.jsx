// import React from "react"

export default function Intro ({ start }) {
 /* Starts the quiz. Button makes start state true. If start=true, the Quiz component is activated. */
  return (
    <div className="intro">  
        <h1>Quizzical</h1>
        <p>Test your science knowlege!</p>
        <button className="start-button" onClick={start}>Start quiz</button>
    </div>
  )}