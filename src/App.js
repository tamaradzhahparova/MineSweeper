import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Settings } from "./components/Settings/Settings";
import Board from "./components/Game/Board";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Settings />} />
        <Route path="game" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
