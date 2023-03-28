import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Settings } from "./components/Settings/Settings";
import Board from "./components/Game/Board";
import { WinnersList } from "./components/WinnersList/WinnersList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Settings />} />
        <Route path="game" element={<Board />} />
        <Route path="winners" element={<WinnersList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
