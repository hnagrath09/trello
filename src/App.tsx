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

  return (
    <div className="w-screen h-screen bg-blue-600">
      <div className="w-screen h-10 mb-4 bg-blue-700" />
      <div className="flex items-start">
        {list.map((column: List) => (
          <List key={column.id} title={column.title} />
        ))}
        <CreateList />
      </div>
    </div>
  );
};

export default App;
