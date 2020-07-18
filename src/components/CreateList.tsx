import React from "react";
import PlusIcon from "./icons/PlusIcon";

interface List {
  id: number;
  order: number;
  title: string;
}

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  boardList: List[];
  onClick: () => void;
}

const CreateList: React.FC<Props> = ({ onClick, boardList }) => {
  return (
    <button
      className="flex items-center w-64 h-10 px-4 py-2 mx-2 text-sm text-white bg-blue-400 rounded-sm hover:bg-blue-300 focus:outline-none"
      onClick={onClick}
    >
      <PlusIcon className="w-4 h-4 mr-2" />
      {boardList ? "Add another list" : "Add a list"}
    </button>
  );
};

export default CreateList;
