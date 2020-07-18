import React, { useState } from "react";
import NewList from "./components/NewList";
import CreateList from "./components/CreateList";
import List from "./components/List";
import PlusIcon from "./components/icons/PlusIcon";

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

  const handleNewList = () => {
    setNewList(true);
  };

  const handleCancelList = () => {
    setNewList(false);
  };

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
            <div className="flex items-center px-3 py-1 mx-2 mt-3 text-sm text-gray-700 rounded-sm cursor-pointer hover:bg-gray-500">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add a card
            </div>
          </List>
        ))}
        {newList ? (
          <NewList
            createList={handleCreateList}
            cancelList={handleCancelList}
            onChange={(event: {
              target: { value: React.SetStateAction<string> };
            }) => setListTitle(event.target.value)}
          ></NewList>
        ) : (
          <CreateList onClick={handleNewList} boardList={list} />
        )}
      </div>
    </div>
  );
};

export default App;
