import React from "react";

import useLocalStorage from "./hooks/useLocalStorage";
import List from "./components/List";
import CreateList from "./components/CreateList";

interface List {
  id: number;
  order: number;
  title: string;
}

const App = () => {
  const [list, setList] = useLocalStorage("list", []);

  const handleListTitle = (title: string) => {
    if (title) {
      const newList = {
        id: Date.now(),
        order: list.length + 1,
        title: title,
      };
      setList((prevList: List[]) => [...prevList, newList]);
    }
  };

  return (
    <div className="w-screen h-screen bg-blue-600">
      <div className="w-screen h-10 mb-4 bg-blue-700" />
      <div className="flex items-start">
        {list.map((column: List) => (
          <List key={column.id} list={column} />
        ))}
        <CreateList getTitle={handleListTitle} />
      </div>
    </div>
  );
};

export default App;
