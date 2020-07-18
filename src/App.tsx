import React, { useState } from "react";
import NewList from "./components/NewList";
import CreateList from "./components/CreateList";
import List from "./components/List";

interface List {
  id: number;
  order: number;
  title: string;
}

const App = () => {
  const [newList, setNewList] = useState<boolean>(false);
  const [list, setList] = useState<List[]>([]);

  const handleNewList = () => {
    setNewList(true);
  };

  const handleCancelList = () => {
    setNewList(false);
  };

  const handleCreateList = () => {
    const id = Date.now();
    const newList = {
      id: id,
      order: list.length + 1,
      title: "Untitled Column",
    };
    console.log("new list", newList);
    setList((prevList) => [...prevList, newList]);
    setNewList(false);
  };

  console.log("list", list);

  return (
    <div className="flex-col w-screen h-screen bg-blue-600">
      <div className="w-screen h-10 mb-4 bg-blue-700"></div>
      <div className="flex">
        {list.map((column) => (
          <List key={column.id} title={column.title} />
        ))}
        {newList ? (
          <NewList
            createList={handleCreateList}
            cancelList={handleCancelList}
          />
        ) : (
          <CreateList onClick={handleNewList} />
        )}
      </div>
    </div>
  );
};

export default App;
