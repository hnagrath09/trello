import React from "react";
import { useQuery, useMutation, queryCache } from "react-query";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import List from "./components/List";
import CreateList from "./components/CreateList";
import { fetchLists, createList, updateList } from "./queries/listQueries";

import HomeIcon from "./components/icons/HomeIcon";

interface List {
  id: number;
  order: number;
  title: string;
}

const App = () => {
  const { isLoading, data: list, error } = useQuery("lists", fetchLists);
  const [addList] = useMutation(createList, {
    onSuccess: (createdList) => {
      queryCache.setQueryData(
        "lists",
        list ? [...list, createdList] : [createdList]
      );
    },
  });
  const [editList] = useMutation(updateList, {
    onSuccess: (updatedList) => {
      queryCache.setQueryData(
        "lists",
        list?.map((column) =>
          column.id === updatedList.id ? updatedList : column
        )
      );
    },
  });

  const handleCreateList = (title: string) => {
    if (title) {
      addList({ title, order: list?.length ?? 0 });
    }
  };

  const handleListTitle = (title: string, listId: number) => {
    editList({ id: listId, title });
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
      {isLoading ? (
        <div className="w-20 mx-auto my-64 font-semibold text-white">
          Loading...
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="list"
          >
            {(provided) => (
              <div
                className="flex items-start "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list?.map((column: List) => (
                  <List
                    key={column.id}
                    list={column}
                    updateTitle={handleListTitle}
                  />
                ))}
                {provided.placeholder}
                <CreateList getTitle={handleCreateList} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {/* Board ending */}
    </div>
  );
};

export default App;
