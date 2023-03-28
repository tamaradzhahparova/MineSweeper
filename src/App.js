import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Settings } from "./components/Settings/Settings";
import Board from "./components/Game/Board";
import { WinnersList } from "./components/WinnersList/WinnersList";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Settings />} />
        <Route path="game" element={<Board />} />
        <Route path="winners" element={<WinnersList />} />
      </Routes>
    </HashRouter>

  );
}

export default App;
