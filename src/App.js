import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./components/Game/Board";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="one" element={<PageOne />} />
        <Route path="two" element={<PageTwo />} />
      </Routes>
    </BrowserRouter>

    // <div>
    //   <div className="heading">
    //   <h1 className="mainTitle">Сапер</h1>
    //   </div>
    //   <div className="aligned">
    //     <Board/>
    //   </div>
    // </div>
  );
}

export default App;
