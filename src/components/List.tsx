import React from "react";

import Card from "./Card";
import CreateCard from "./CreateCard";

import HorizontalDotsIcon from "./icons/HorizontalDotsIcon";
import useLocalStorage from "../hooks/useLocalStorage";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  list: { id: number; order: number; title: string };
}

interface Card {
  id: number;
  parentId: number;
  order: number;
  title: string;
  description: string;
}

const List: React.FC<Props> = ({ list }) => {
  const [card, setCard] = useLocalStorage("cards", []);

  const handleCardTitle = (title: string) => {
    if (title) {
      const newList = {
        id: Date.now(),
        parentId: list.id,
        order: card.length + 1,
        title: title,
        description: "",
      };
      setCard((prevCard: Card[]) => [...prevCard, newList]);
    }
  };

  const handleCardDescription = (description: string, cardId: number) => {
    setCard((prevCard: Card[]) =>
      prevCard.map((task) =>
        task.id === cardId ? { ...task, description } : task
      )
    );
  };

  return (
    <div className="w-64 pt-2 mx-2 bg-gray-300 rounded-sm ">
      <div className="flex items-center justify-between">
        <div className="w-full ml-3 text-sm font-semibold text-gray-800 cursor-pointer">
          {list.title}
        </div>
        <div className="p-1 mr-1 rounded-sm cursor-pointer hover:bg-gray-500">
          <HorizontalDotsIcon className="w-4 h-4" />
        </div>
      </div>
      {card.map((task: Card) =>
        task.parentId === list.id ? (
          <Card card={task} column={list} updateCard={handleCardDescription} />
        ) : undefined
      )}
      <CreateCard getTitle={handleCardTitle} />
    </div>
  );
};

export default List;
