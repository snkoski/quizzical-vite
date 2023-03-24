import { useState, useEffect } from "react";
import "./timer.css";

export default function Timer({ timerOn }) {
  const [time, setTime] = useState(0);

  // I stole this from stackoverflow - https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
  function msToTime(s) {
    // Pad to 2 or 3 digits, default is 2
    let pad = (n, z = 2) => ("00" + n).slice(-z);
    return pad(((s % 3.6e6) / 6e4) | 0) + ":" + pad(((s % 6e4) / 1000) | 0);
  }

  useEffect(() => {
    const startTime = new Date();
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        const currentTime = new Date();
        setTime(currentTime - startTime);
      }, 1000);
    }
    return () => clearInterval(interval); //cleanup
  }, [timerOn]);

  return (
    <div className="quiz-timer">
      <p>{msToTime(time)}</p>
    </div>
  );
}
