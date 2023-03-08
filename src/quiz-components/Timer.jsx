import { useState, useEffect } from 'react'

export default function Timer ({ isTimed, stopTime }) {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(isTimed)

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

  },[timerOn])


  return (
    <div className="quiz-timer">
      <span>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
    </div>
  )



  

//   const getTimeElapsed = (event) => {
//     // const elapsed = Date.parse(new Date()) - Date.parse(event);
//     const elapsed = Date.now() - event
//     const seconds = Math.floor((elapsed / 1000) % 60);
//     const minutes = Math.floor((elapsed / 1000 / 60) % 60);
//     return {
//         minutes,
//         seconds
//     };
//   }

//   const startTimer = () => {
//     let { minutes, seconds } = getTimeElapsed(Ref.current);
//         // update the timer
//         // check if less than 10 then we need to add '0' at the beginning of the variable
//       setTimer(
//         (minutes > 9 ? minutes : '0' + minutes) + ':'
//         + (seconds > 9 ? seconds : '0' + seconds)
//       )
//     }

    
//     const clearTimer = () => {
      
//     // If you adjust it you should also need to adjust the Endtime formula we are about to code next    
//     setTimer('00:00');
//     // If you try to remove this line the updating of timer Variable will be after 1000ms or 1sec
//     if (Ref.current) clearInterval(Ref.current);
//     const id = setInterval(() => {
//       startTimer();
//     }, 1000)
//     Ref.current = Date.now()
//     // Ref.current = id;
//     console.log('Interval started:', id);
//   }
//   // what is id being used for? HOw do I clear it?

//   useEffect(() => {
//     clearTimer();
//     startTimer();
//   }, []);

//   const stopTimer = () => {
//     console.log('Stopping timer...');
//     console.log('Ref.current:', Ref.current);
//     if (Ref.current) clearInterval(Ref.current);
//     console.log("stopped!")
//   }

//   useEffect(() => {
//     stopTimer();
//   }, [stopTime])

//   return (
//     <h2 className="quiz-timer">{timer}</h2>
//   )
// }
  }

