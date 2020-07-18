import React, { useState } from "react";
import NewList from "./components/NewList";
import CreateItem from "./components/CreateItem";
import List from "./components/List";

interface List {
  id: number;
  order: number;
  title: string;
}

const App = () => {
  const [newList, setNewList] = useState<boolean>(false);
  const [list, setList] = useState<List[]>([]);
  const [listTitle, setListTitle] = useState<string>("");
  const [newCard, setNewCard] = useState<boolean>(false);

  const handleCreateList = () => {
    if (listTitle) {
      const id = Date.now();
      const newList = {
        id: id,
        order: list.length + 1,
        title: listTitle,
      };
      setList((prevList) => [...prevList, newList]);
      setListTitle("");
      setNewList(false);
    }
  };

  return (
    <div className="flex-col w-screen h-screen bg-blue-600">
      <div className="w-screen h-10 mb-4 bg-blue-700"></div>
      <div className="flex">
        {list.map((column) => (
          <List key={column.id} title={column.title}>
            <div className="px-2 pt-3 ">
              {newCard ? undefined : (
                <CreateItem
                  className="w-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-500"
                  onClick={() => {
                    setNewCard(true);
                  }}
                >
                  Add a card
                </CreateItem>
              )}
            </div>
          </List>
        ))}
        {newList ? (
          <NewList
            createList={handleCreateList}
            cancelList={() => {
              setNewList(false);
            }}
            onChange={(event: {
              target: { value: React.SetStateAction<string> };
            }) => setListTitle(event.target.value)}
          ></NewList>
        ) : (
          <CreateItem
            className="w-64 h-10 px-4 py-2 mx-2 text-sm text-white bg-blue-400 hover:bg-blue-300"
            onClick={() => {
              setNewList(true);
            }}
          >
            {list.length ? "Add another list" : "Add a list"}
          </CreateItem>
        )}
      </div>
    </div>
  );
};

export default App;
