import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  cancelList: () => void;
  createList: () => void;
  onChange: any;
}

const NewList: React.FC<Props> = ({ cancelList, createList, onChange }) => {
  return (
    <div className="w-64 p-1 mx-2 bg-gray-200">
      <input
        className="w-full h-8 px-2 text-sm border-2 border-blue-500 rounded-sm focus:outline-none"
        placeholder="Enter list title..."
        autoFocus
        onChange={onChange}
      ></input>
      <div className="flex items-center justify-between">
        <button
          className="px-2 py-1 my-1 text-sm text-center text-white bg-green-600 rounded-sm focus:outline-none hover:bg-green-500 "
          onClick={createList}
        >
          Add List
        </button>
        <button
          className="px-2 py-1 my-1 text-sm text-center text-white bg-red-600 rounded-sm focus:outline-none hover:bg-red-500 "
          onClick={cancelList}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewList;
