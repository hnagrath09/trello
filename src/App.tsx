import React from "react";

import useLocalStorage from "./hooks/useLocalStorage";

import List from "./components/List";
import CreateList from "./components/CreateList";

import HomeIcon from "./components/icons/HomeIcon";

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
      {/* NavBar starting */}
      <div className="flex items-center justify-between w-screen h-10 mb-4 bg-blue-700">
        <div className="p-2 ml-2 text-white bg-blue-400 rounded cursor-pointer">
          <HomeIcon className="w-5 h-5" />
        </div>
        <span className="font-medium text-white">My Board</span>
        <span className="p-2 mr-2 text-sm font-semibold text-white bg-blue-400 rounded-full cursor-pointer">
          HN
        </span>
      </div>
      {/* NavBar ending */}

      {/* Board starting */}
      <div className="flex items-start">
        {list.map((column: List) => (
          <List key={column.id} list={column} />
        ))}
        <CreateList getTitle={handleListTitle} />
      </div>
      {/* Board ending */}
    </div>
  );
};

export default App;
