import React, { useState } from "react";

import Card from "./Card";
import CreateCard from "./CreateCard";

import HorizontalDotsIcon from "./icons/HorizontalDotsIcon";
import useLocalStorage from "../hooks/useLocalStorage";
import useStateFromProp from "../hooks/useStateFromProp";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  list: { id: number; order: number; title: string };
  updateTitle: any;
}

interface Card {
  id: number;
  parentId: number;
  order: number;
  title: string;
  description: string;
}

const List: React.FC<Props> = ({ list, updateTitle }) => {
  const [card, setCard] = useLocalStorage("cards", []);

  const [editListTitle, setEditListTitle] = useState<boolean>(false);
  const [listTitle, setListTitle] = useStateFromProp(list.title);

  const handleCreateCard = (title: string) => {
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

  const handleCardTitle = (title: string, cardId: number) => {
    setCard((prevCard: Card[]) =>
      prevCard.map((task) => (task.id === cardId ? { ...task, title } : task))
    );
  };

  return (
    <div className="w-64 pt-2 mx-2 bg-gray-300 rounded-sm ">
      <div className="flex items-center justify-between">
        {editListTitle ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              updateTitle(listTitle, list.id);
              setEditListTitle(false);
            }}
          >
            <input
              className="pl-1 ml-3 text-sm font-semibold text-gray-700 border-2 border-blue-600 rounded-sm focus:outline-none"
              autoFocus
              onFocus={(event) => event.target.select()}
              onChange={(event: {
                target: { value: React.SetStateAction<string> };
              }) => setListTitle(event.target.value)}
              defaultValue={listTitle}
            ></input>
          </form>
        ) : (
          <div
            className="w-full ml-3 text-sm font-semibold text-gray-800 cursor-pointer"
            onClick={() => {
              setEditListTitle(true);
            }}
          >
            {list.title}
          </div>
        )}

        <div className="p-1 mr-1 rounded-sm cursor-pointer hover:bg-gray-500">
          <HorizontalDotsIcon className="w-4 h-4" />
        </div>
      </div>
      {card.map((task: Card) =>
        task.parentId === list.id ? (
          <Card
            key={task.id}
            card={task}
            column={list}
            updateCardDes={handleCardDescription}
            updateCardTit={handleCardTitle}
          />
        ) : undefined
      )}
      <CreateCard getTitle={handleCreateCard} />
    </div>
  );
};

export default List;
