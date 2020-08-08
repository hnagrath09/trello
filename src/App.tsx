import React from "react";
import Board from "./components/Board";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="w-screen h-screen bg-blue-600 ">
      <Navbar />
      <Board />
    </div>
  );
};

export default App;
