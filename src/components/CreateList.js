import React from "react";

const CreateList = ({ onClick }) => {
  return (
    <button
      className="flex items-center w-64 h-10 px-4 py-2 mx-2 text-sm text-white bg-blue-400 rounded-sm hover:bg-blue-300 focus:outline-none"
      onClick={onClick}
    >
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
      Add a list
    </button>
  );
};

export default CreateList;
