import React, { useEffect, useState } from "react";
import styles from "./Timer.module.css";


export const Timer = ({
                        duration,
                        isTimerWorking,
                        setIsTimerWorking,
                        setResetTimer,
                        resetTimer,
                        lostHandle,
                        setCurrentTime
                      }) => {

  const handleWork = (value) => {
    setIsTimerWorking(value);
    if (value) setResetTimer(false);
  };

  return (
    <div className={styles.main}>
      <p className={styles.timerTitle}>Таймер: </p>
      <div className={styles.minutes}>
        <CountDown
          setCurrentTime={setCurrentTime}
          lostHandle={lostHandle}
          minutes={duration}
          isTimerWorking={isTimerWorking}
          resetTimer={resetTimer}
          handleStart={handleWork}
        />
      </div>
    </div>
  );
};

const CountDown = ({
                     minutes = 0,
                     seconds = 0,
                     isTimerWorking,
                     resetTimer,
                     handleStart,
                     lostHandle,
                     setCurrentTime
                   }) => {
  const [over, setOver] = useState(false);
  const [[m, s], setTime] = useState([minutes, seconds]);


  useEffect(() => {
    setTime([minutes, seconds]);
  }, [minutes]);

  const tick = () => {
    if (!isTimerWorking || over) return;

    if (m === 0 && s === 0) {
      setOver(true);
      lostHandle("timeIsOut");

    } else if (s === 0) {
      setTime([m - 1, 59]);
    } else {
      setTime([m, s - 1]);
    }
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  useEffect(() => {
    const reset = () => {
      setTime([minutes, seconds]);
      setOver(false);
      handleStart(false);
    };

    if (resetTimer) reset();
  }, [minutes, resetTimer, seconds, handleStart]);

  useEffect(() => {
    setCurrentTime([m, s])
  }, [m, s])

  return (
    <div>
      <div>{`${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`}</div>
    </div>
  );
};
