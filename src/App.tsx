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
  const [listTitle, setListTitle] = useState("");

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
          <List key={column.id} title={column.title} />
        ))}
        {newList ? (
          <NewList
            createList={handleCreateList}
            cancelList={handleCancelList}
            onChange={(event: {
              target: { value: React.SetStateAction<string> };
            }) => setListTitle(event.target.value)}
          />
        ) : (
          <CreateList onClick={handleNewList} />
        )}
      </div>
    </div>
  );
};

export default App;
