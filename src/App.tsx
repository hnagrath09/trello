import React from "react";
import { useQuery, useMutation, queryCache } from "react-query";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import List from "./components/List";
import CreateList from "./components/CreateList";
import { fetchLists, createList } from "./queries/listQueries";

import HomeIcon from "./components/icons/HomeIcon";

interface List {
  id: number;
  order: number;
  title: string;
}

const App = () => {
  const { isLoading, data: list, error } = useQuery("lists", fetchLists);
  const [createListMutation, { isLoading: creatingList }] = useMutation(
    createList,
    {
      onSuccess: (createdList) => {
        queryCache.setQueryData(
          "lists",
          list ? [...list, createdList] : [createdList]
        );
      },
    }
  );

  const handleCreateList = (title: string) => {
    if (title) {
      createListMutation({ title, order: list?.length ?? 0 });
    }
  };

  const handleListTitle = () => {
    //TO DO:
  };

  const handleDrag = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      return;
    }
  };

  return (
    <div className="w-screen h-screen bg-blue-600 ">
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
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="all-columns" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="flex items-start "
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {isLoading ? (
                <div className="font-semibold text-white">Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                list?.map((column: List) => (
                  <List
                    key={column.id}
                    list={column}
                    updateTitle={handleListTitle}
                  />
                ))
              )}
              {provided.placeholder}
              <CreateList getTitle={handleCreateList} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* Board ending */}
    </div>
  );
};

export default App;
