import React, { useState } from "react";
import NewList from "./components/NewList";
import CreateList from "./components/CreateList";

const App = () => {
  const [newList, setNewList] = useState(false);

  const handleNewList = () => {
    setNewList(true);
  };

  const handleCancelList = () => {
    setNewList(false);
  };

  return (
    <div className="flex-col w-screen h-screen bg-blue-600">
      <div className="w-screen h-10 mb-4 bg-blue-700"></div>
      <div className="flex">
        {newList ? (
          <NewList cancelList={handleCancelList} />
        ) : (
          <CreateList onClick={handleNewList} />
        )}
        <div className="w-64 py-2 bg-gray-400 rounded-sm ">
          <div className="flex items-center justify-between">
            <div className="w-full ml-3 text-sm font-semibold text-gray-800 cursor-pointer">
              Column Name
            </div>
            <div className="p-1 mr-1 rounded-sm cursor-pointer hover:bg-gray-500">
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center px-3 py-1 mx-3 mt-3 text-sm text-gray-700 rounded-sm cursor-pointer hover:bg-gray-500">
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path d="M12 4v16m8-8H4"></path>
            </svg>
            Add a card
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
