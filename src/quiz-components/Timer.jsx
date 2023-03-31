import { useState, useEffect } from 'react'
import './timer.css'

export default function Timer ({ timerOn }) {
  const [time, setTime] = useState(0);

  const second = 1000;
  const minute = 60000;

  useEffect(() => {
    let interval = null;
    if(timerOn) {
      interval = setInterval(()=> {
        setTime(prevTime => prevTime + second)
      }, second)
    } else {
      clearInterval(interval) //stops the timer
    }
    return () => clearInterval(interval) //cleanup
  },[timerOn]);



  return (
    <div className="quiz-timer">
      <span>{("0" + Math.floor((time / minute) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / second) % 60)).slice(-2)}</span>
    </div>
  )
};

