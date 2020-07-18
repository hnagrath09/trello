import React from "react";
import HorizontalDotsIcon from "./icons/HorizontalDotsIcon";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  title: string;
}

const List: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="w-64 py-2 mx-2 bg-gray-400 rounded-sm ">
      <div className="flex items-center justify-between">
        <div className="w-full ml-3 text-sm font-semibold text-gray-800 cursor-pointer">
          {title}
        </div>
        <div className="p-1 mr-1 rounded-sm cursor-pointer hover:bg-gray-500">
          <HorizontalDotsIcon className="w-4 h-4" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default List;
