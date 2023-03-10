import { useState, useEffect } from 'react'

export default function Timer ({ timerOn }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if(timerOn) {
      interval = setInterval(()=> {
        setTime(prevTime => prevTime + 10)
      }, 10)
    } else {
      clearInterval(interval) //stops the timer
    }
    return () => clearInterval(interval) //cleanup
  },[timerOn]);


  return (
    <div className="quiz-timer">
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
    </div>
  )
};

