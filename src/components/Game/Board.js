import React, { useState, useEffect } from "react";
import CreateBoard from "../../utils/CreateBoard";
import { revealed } from "../../utils/Reveal";
import Cell from "./Cell";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Timer } from "./Timer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWinner } from "../../store/settingsSlice";

function Board() {

  const level = useSelector(state => state.settings.level);
  const name = useSelector(state => state.settings.name);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [grid, setGrid] = useState([]);
  const [nonMinecount, setNonMinecount] = useState(level?.[2]);
  const [mineLocation, setmineLocation] = useState([]);
  const [isTimerWorking, setIsTimerWorking] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    if (!name || !level) {
      return navigate("/");
    }
    freshBoard();
  }, []);

  const style = {
    display: "flex",
    flexDirection: "row",
    width: "fit-content",
    color: "white"
  };

  // Making freshboard atstart
  const freshBoard = () => {
    const newBoard = CreateBoard(...level?.slice(0, -1));
    setmineLocation(newBoard.mineLocation);
    setGrid(newBoard.board);
    setResetTimer(false);
    setNonMinecount(level[2]);
  };

  const getWinnerTime = (time) => {
    const commonTime = level[3] * 60;
    const spentTime = time[0] * 60 + time[1];
    return commonTime - spentTime;
  };

  const updateFlag = (e, x, y) => {
    e.preventDefault();

    // deep copy of the object
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X" && newGrid[x][y].flagged === false) {
      setNonMinecount(prev => --prev);
    }
    newGrid[x][y].flagged = true;

    setGrid(newGrid);
  };

  const newfresh = () => {
    freshBoard();
    setResetTimer(true);
  };

  const winHandle = () => {
    toast.success("Wohoo!!,You won", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(newfresh, 500);
    setResetTimer(true);
    dispatch(setWinner({ name: name, time: currentTime }));
    localStorage.setItem(name, getWinnerTime(currentTime));
  };

  useEffect(() => {
    if (nonMinecount === 0) {
      winHandle();
    }
  }, [nonMinecount]);

  const lostHandle = (reason) => {
    toast.dark(
      reason === "timeIsOut"
        ? "Time Is Out ,Try Again"
        : " Clicked on Mine ,Try Again",
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }
    );
    setResetTimer(true);
    setTimeout(newfresh, 500);
  };

  const revealcell = (x, y) => {
    if (!isTimerWorking) {
      setIsTimerWorking(true);
      setResetTimer(false);
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      lostHandle();
      for (let i = 0; i < mineLocation.length; i++) {
        newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
      }
      setGrid(newGrid);
    }
    if (nonMinecount === 0) {
      winHandle();
    } else {
      let revealedboard = revealed(newGrid, x, y);
      setGrid(revealedboard.arr);
    }
  };

  return (
    <div className="parent">
      <div className="board">
        <h3 className="counter"
        >
          Мин не помечено - {nonMinecount}
        </h3>
        <ToastContainer></ToastContainer>
        {grid.map((singlerow, index1) => {
          return (
            <div style={style} key={index1}>
              {singlerow.map((singlecol, index2) => {
                return (
                  <Cell
                    details={singlecol}
                    key={index2}
                    updateFlag={updateFlag}
                    revealcell={revealcell}
                    level={level}
                  />
                );
              })}
            </div>
          );
        })}

        <Timer
          duration={level?.[3]}
          isTimerWorking={isTimerWorking}
          setIsTimerWorking={setIsTimerWorking}
          setResetTimer={setResetTimer}
          resetTimer={resetTimer}
          lostHandle={lostHandle}
          setCurrentTime={setCurrentTime}
        />
      </div>

      <button className="button" onClick={newfresh}>
        Перезапустить игру
      </button>

      <button className="button" onClick={() => navigate("/")}>
        Вернуться к настройкам
      </button>
    </div>
  );
}

export default Board;
