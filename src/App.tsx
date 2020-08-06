import React from "react";
import arrayMove from "array-move";
import { orderBy } from "lodash-es";
import { Dropdown, Menu } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useQuery, useMutation, queryCache } from "react-query";

import List from "./components/List";
import CreateList from "./components/CreateList";
import {
  fetchLists,
  createList,
  updateList,
  reorderLists,
} from "./queries/listQueries";

import HomeIcon from "./components/icons/HomeIcon";
import { reorderCards } from "./queries/cardQueries";

const profileOptions = (
  <Menu>
    <Menu.Item key="0">
      <div className="w-32 mx-auto">Himanshu Nagrath</div>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <div className="mr-32">Profile and Visibility</div>
    </Menu.Item>
    <Menu.Item key="2">Activity</Menu.Item>
    <Menu.Item key="3">Cards</Menu.Item>
    <Menu.Item key="4">Settings</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="5">Help</Menu.Item>
    <Menu.Item key="6">Shortcuts</Menu.Item>
    <Menu.Item key="7">Log Out</Menu.Item>
  </Menu>
);

interface List {
  id: number;
  order: number;
  title: string;
  cards?: [{ id: number }];
}

interface Card {
  id: number;
  list: { id: number; title: string; order: number };
  order: number;
  title: string;
  description: string;
  created_at: string;
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
    // data passed to editList function
    onMutate: (updatedList) => {
      queryCache.setQueryData(
        "lists",
        list?.map((column) =>
          column.id === updatedList.id ? { ...column, ...updatedList } : column
        )
      );
    },
  });

  const [listReorder] = useMutation(reorderLists, {
    onMutate: (reorderData: { [id: string]: number }) => {
      queryCache.setQueryData(
        "lists",
        list?.map((column) => ({
          ...column,
          order: reorderData[column.id] ?? column.order,
        }))
      );
    },
  });

  const [cardReorder] = useMutation(reorderCards, {
    onMutate: (reorderData: {
      [id: number]: { order: number; listId: number };
    }) => {
      const listId = reorderData[parseInt(Object.keys(reorderData)[0])].listId;
      const card = queryCache.getQueryData<Card[]>(["cards", listId]);
      queryCache.setQueryData(
        ["cards", listId],
        card?.map((task) => ({
          ...task,
          order: reorderData[task.id]?.order ?? task.order,
        }))
      );
    },
  });

  const handleCreateList = (title: string) => {
    if (title) {
      addList({ title, order: list?.length ?? 0 });
    }
  };

  const handleListTitle = (title: string, listId: number) => {
    editList({ title, id: listId });
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
    // For list drag drop
    if (type === "list" && list) {
      const list = queryCache.getQueryData<List[]>("lists");
      const updatedList = arrayMove(
        orderBy(list, (list) => list.order),
        source.index,
        destination.index
      );

      // Filtering all lists which are needed for order updation
      const updatedItems = updatedList
        .map((list, index) => ({ ...list, index }))
        .filter((list) => list.order !== list.index);

      const obj: { [id: number]: number } = {};
      updatedItems.forEach((list) => {
        obj[list.id] = list.index;
      });

      listReorder(obj);
      return;
    }
    // For card drag drop within the same list
    if (source.droppableId === destination.droppableId) {
      const card = queryCache.getQueryData<Card[]>([
        "cards",
        parseInt(source.droppableId),
      ]);
      const updatedCard = arrayMove(
        orderBy(card, (card) => card.order),
        source.index,
        destination.index
      );

      const updatedItems = updatedCard
        .map((task, index) => ({ ...task, index }))
        .filter((task) => task.order !== task.index);

      const obj: {
        [id: number]: { order: number; listId: number };
      } = {};
      updatedItems.forEach((task) => {
        obj[task.id] = { order: -1, listId: -1 };
        obj[task.id].order = task.index;
        obj[task.id].listId = parseInt(destination.droppableId);
      });
      cardReorder(obj);
      return;
    }
    // For card drag drop outside the list
  };

  return (
    <div className="w-screen h-screen bg-blue-600 ">
      {/* NavBar starting */}
      <div className="flex items-center justify-between w-screen h-10 mb-4 bg-blue-700">
        <div className="p-2 ml-2 text-white bg-blue-400 rounded cursor-pointer">
          <HomeIcon className="w-5 h-5" />
        </div>
        <span className="font-medium text-white">My Board</span>
        <Dropdown overlay={profileOptions} trigger={["click"]}>
          <span className="p-2 mr-2 text-sm font-semibold text-white bg-blue-400 rounded-full cursor-pointer">
            HN
          </span>
        </Dropdown>
      </div>
      {/* NavBar ending */}

      {/* Board starting */}
      {isLoading ? (
        <div className="max-w-xs mx-auto my-64 text-lg font-semibold text-white">
          Loading...
        </div>
      ) : error ? (
        <div>{error.message}</div>
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
                {orderBy(list, ["order"], ["asc"]).map((column: List) => (
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
