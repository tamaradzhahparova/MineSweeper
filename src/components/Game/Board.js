import React, { useState, useEffect } from "react";
import CreateBoard from "../../utils/CreateBoard";
import { revealed } from "../../utils/Reveal";
import Cell from "./Cell";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { easyLevel, hardLevel, mediumLevel } from "../../utils/constants";
import { Timer } from "./Timer";

function Board() {
  const [grid, setGrid] = useState([]);
  const [nonMinecount, setNonMinecount] = useState(0);
  const [mineLocation, setmineLocation] = useState([]);
  const [isTimerWorking, setIsTimerWorking] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const [level, setLevel] = useState(easyLevel);
  const [duration, setDuration] = useState(10);

  const style = {
    display: "flex",
    flexDirection: "row",
    width: "fit-content",
    color: "white",
  };
  useEffect(() => {
    freshBoard();
  }, [level]);

  // Making freshboard atstart
  const freshBoard = () => {
    const newBoard = CreateBoard(...level);
    setNonMinecount(level[0] * level[1] - level[2]);
    setmineLocation(newBoard.mineLocation);
    setGrid(newBoard.board);
    setResetTimer(false);
  };
  const updateFlag = (e, x, y) => {
    e.preventDefault();
    // deep copy of the object
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y].flagged = true;
    setGrid(newGrid);
  };

  const newfresh = () => {
    freshBoard();
    setResetTimer(true);
  };

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
        progress: undefined,
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
    if (nonMinecount === 1) {
      toast.success("Wohoo!!,You won", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(newfresh, 500);
      setResetTimer(true);
    } else {
      let revealedboard = revealed(newGrid, x, y, nonMinecount);
      console.log(revealedboard);
      setGrid(revealedboard.arr);
      setNonMinecount(revealedboard.newNonMines);
    }
  };

  const changeLevel = (level) => {
    switch (level) {
      case "easy":
        setLevel(easyLevel);
        setDuration(10);
        break;
      case "medium":
        setLevel(mediumLevel);
        setDuration(40);
        break;
      case "hard":
        setLevel(hardLevel);
        setDuration(100);
    }
  };

  return (
    <div className="parent">
      <button className="button" onClick={newfresh}>
        Перезапустить игру
      </button>

      <div>
        <h3
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "30px",
            margin: "0px",
          }}
        >
          Ячеек без мин - {nonMinecount}
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
          duration={duration}
          isTimerWorking={isTimerWorking}
          setIsTimerWorking={setIsTimerWorking}
          setResetTimer={setResetTimer}
          resetTimer={resetTimer}
          lostHandle={lostHandle}
        />
      </div>
    </div>
  );
}

export default Board;
