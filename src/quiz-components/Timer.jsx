import { useState, useEffect, useRef } from 'react'

export default function Timer () {
  const [timer, setTimer] = useState('00:00');
  // const [isTimed, setIsTimed] = useState(true)
  
  const Ref = useRef(null); // We need ref in this, because we are dealing
 // with JS setInterval to keep track of it and
 // stop it when needed

  const getTimeElapsed = (event) => {
    const elapsed = Date.parse(new Date()) - Date.parse(event);
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / 1000 / 60) % 60);
    return {
        minutes,
        seconds
    };
  }

  const startTimer = () => {
    let { minutes, seconds } = getTimeElapsed(Ref.current);
        // update the timer
        // check if less than 10 then we need to add '0' at the beginning of the variable
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
    const clearTimer = () => {
    // If you adjust it you should also need to adjust the Endtime formula we are about to code next    
    setTimer('00:00');
    // If you try to remove this line the updating of timer Variable will be after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer();
    }, 1000)
    Ref.current = new Date()
  }

  useEffect(() => {
    clearTimer();
    startTimer();
  }, []);

  return (
    <h2 className="quiz-timer">{timer}</h2>
  )
}
