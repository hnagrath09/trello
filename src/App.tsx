import React, { useState } from "react";
import NewItem from "./components/NewItem";
import CreateItem from "./components/CreateItem";
import List from "./components/List";
import PencilIcon from "./components/icons/PencilIcon";

interface List {
  id: number;
  order: number;
  title: string;
}

interface Card {
  id: number;
  parentId: number;
  order: number;
  title: string;
}

const App = () => {
  const [newList, setNewList] = useState<boolean>(false);
  const [listTitle, setListTitle] = useState<string>("");
  const [list, setList] = useState<List[]>([]);

  const [newCard, setNewCard] = useState<boolean>(false);
  const [cardTitle, setCardTitle] = useState<string>("");
  const [card, setCard] = useState<Card[]>([]);

  const handleCreateCard = (listId: number) => {
    if (cardTitle) {
      const id = Date.now();
      const newCard = {
        id: id,
        parentId: listId,
        order: list.length + 1,
        title: cardTitle,
      };
      setCard((prevCard) => [...prevCard, newCard]);
      setCardTitle("");
      setNewCard(false);
    }
  };

  const handleCreateList = () => {
    if (listTitle) {
      const id = Date.now();
      const newList = {
        id: id,
        order: list.length + 1,
        title: listTitle,
      };
      setListTitle("");
      setList((prevList) => [...prevList, newList]);
      setNewList(false);
    }
  };

  return (
    <div className="flex-col w-screen h-screen bg-blue-600">
      <div className="w-screen h-10 mb-4 bg-blue-700"></div>
      <div className="flex">
        {list.map((column) => (
          <List key={column.id} title={column.title}>
            {card.map(
              (task) =>
                task.parentId === column.id && (
                  <div
                    className="flex items-center justify-between px-2 py-1 mx-2 mt-2 text-sm bg-gray-200 shadow"
                    key={task.id}
                  >
                    {task.title}
                    <PencilIcon className="w-3 h-3" />
                  </div>
                )
            )}

            {newCard ? (
              <NewItem
                createItem={() => handleCreateCard(column.id)}
                cancelItem={() => {
                  setNewCard(false);
                }}
                onChange={(event: {
                  target: { value: React.SetStateAction<string> };
                }) => setCardTitle(event.target.value)}
              />
            ) : (
              <div className="px-2 pt-3 ">
                <CreateItem
                  className="w-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-500"
                  onClick={() => {
                    setNewCard(true);
                  }}
                >
                  Add a card
                </CreateItem>
              </div>
            )}
          </List>
        ))}
        <div className="mx-2">
          {newList ? (
            <NewItem
              createItem={handleCreateList}
              cancelItem={() => {
                setNewList(false);
              }}
              onChange={(event: {
                target: { value: React.SetStateAction<string> };
              }) => setListTitle(event.target.value)}
            ></NewItem>
          ) : (
            <CreateItem
              className="w-64 h-10 px-4 py-2 text-sm text-white bg-blue-400 hover:bg-blue-300"
              onClick={() => {
                setNewList(true);
              }}
            >
              {list.length ? "Add another list" : "Add a list"}
            </CreateItem>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
