import React from "react";

import PencilIcon from "./icons/PencilIcon";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  card: {
    id: number;
    parentId: number;
    order: number;
    title: string;
    description: string;
  };
}

const Card: React.FC<Props> = ({ card }) => {
  return (
    <div className="px-2 py-1 mx-2 mt-2 text-sm bg-gray-100 shadow cursor-pointer group">
      <div className="flex items-center justify-between">
        {card.title}
        <PencilIcon className="hidden w-3 h-3 group-hover:block" />
      </div>
    </div>
  );
};

export default Card;
