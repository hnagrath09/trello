import React from "react";

const List = ({ title }) => {
  return (
    <div className="w-64 py-2 mx-2 bg-gray-400 rounded-sm ">
      <div className="flex items-center justify-between">
        <div className="w-full ml-3 text-sm font-semibold text-gray-800 cursor-pointer">
          {title}
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
  );
};

export default List;
