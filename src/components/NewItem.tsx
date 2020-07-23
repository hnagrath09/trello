import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  cancelItem: () => void;
  createItem: () => void;
  onChange: any;
}

const NewItem: React.FC<Props> = ({ cancelItem, createItem, onChange }) => {
  return (
    <div className="w-64 p-1 bg-gray-300">
      <input
        className="w-full h-8 px-2 text-sm border-2 border-blue-500 rounded-sm focus:outline-none"
        placeholder="Enter list title..."
        autoFocus
        onChange={onChange}
      ></input>
      <div className="flex items-center justify-between">
        <button
          className="px-2 py-1 my-1 text-sm text-center text-white bg-green-600 rounded-sm focus:outline-none hover:bg-green-500 "
          onClick={createItem}
        >
          Add List
        </button>
        <button
          className="px-2 py-1 my-1 text-sm text-center text-white bg-red-500 rounded-sm focus:outline-none hover:bg-red-500 "
          onClick={cancelItem}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewItem;
