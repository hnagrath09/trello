import React, { useMemo, useCallback } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useQuery, useMutation, queryCache } from "react-query";

import List from "./components/List";
import CreateList from "./components/CreateList";

import HomeIcon from "./components/icons/HomeIcon";
import { fetchLists, createList, updateList } from "./queries/listQueries";

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

  const handleCreateList = useCallback(
    (title: string) => {
      if (title) {
        addList({ title, order: list?.length ?? 0 });
      }
    },
    [addList, list]
  );

  const handleListTitle = useCallback(
    (title: string, listId: number) => {
      editList({ title, id: listId });
    },
    [editList]
  );

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
      console.log(type);
      // const newList = [...list];
      // const [item] = newList.slice(source.index, source.index + 1);
      // newList.splice(source.index, 1);
      // newList.splice(destination.index, 0, item);
      // newList.map((column, index) => (column.order = index));
      // setList(newList);
      // return;
    }
  };

  const Board = useMemo(() => {
    return isLoading ? (
      <div className="max-w-xs mx-auto my-64 text-lg font-semibold text-white">
        Loading...
      </div>
    ) : error ? (
      <div>{error.message}</div>
    ) : (
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="all-columns" direction="horizontal" type="list">
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
    );
  }, [isLoading, error, handleCreateList, handleListTitle, list]);

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
      {Board}
      {/* Board ending */}
    </div>
  );
};

export default App;
