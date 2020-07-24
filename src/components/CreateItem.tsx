import React from "react";
import clsx from "clsx";
import PlusIcon from "./icons/PlusIcon";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}

const CreateItem: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <button
      className={clsx(
        "flex items-center rounded-sm focus:outline-none",
        className
      )}
      onClick={onClick}
    >
      <PlusIcon className="w-4 h-4 mr-2" />
      {children}
    </button>
  );
};

export default CreateItem;
