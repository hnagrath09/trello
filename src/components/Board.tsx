import React, { useMemo, useCallback } from "react";
import arrayMove from "array-move";
import { orderBy } from "lodash-es";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useQuery, useMutation, queryCache } from "react-query";
import CreateList from "./CreateList";
import List from "./List";
import {
  fetchLists,
  createList,
  updateList,
  reorderLists,
} from "../queries/listQueries";
import { reorderCards } from "../queries/cardQueries";

interface Card {
  id: number;
  list: { id: number; title: string; order: number };
  order: number;
  title: string;
  description: string;
  created_at: string;
}

interface List {
  id: number;
  order: number;
  title: string;
  cards?: [{ id: number }];
}

const Board = () => {
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
    onMutate: ([_, updatedCardsList]) => {
      Object.keys(updatedCardsList).forEach((listId: string) => {
        queryCache.setQueryData(
          ["cards", parseInt(listId)],
          updatedCardsList[parseInt(listId)]
        );
      });
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
  const handleDrag = useCallback(
    (result: any) => {
      const { destination, source, type, draggableId } = result;

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
      }
      // For card drag drop within the same list
      else if (source.droppableId === destination.droppableId) {
        const card = queryCache.getQueryData<Card[]>([
          "cards",
          parseInt(source.droppableId),
        ]);
        const updateCards = arrayMove(
          orderBy(card, (card) => card.order),
          source.index,
          destination.index
        );

        const updatedItems = updateCards
          .map((task, index) => ({ ...task, index }))
          .filter((task) => task.order !== task.index);

        const obj: {
          [id: number]: { order: number; listId: number };
        } = {};
        updatedItems.forEach((task) => {
          obj[task.id] = {
            order: task.index,
            listId: parseInt(source.droppableId),
          };
        });
        cardReorder([
          obj,
          {
            [source.droppableId]: updateCards.map((card, index) => ({
              ...card,
              order: index,
            })),
          },
        ]);
      } else {
        // When card is dragged and dropped in different list
        const sourceCards = orderBy(
          queryCache.getQueryData<Card[]>([
            "cards",
            parseInt(source.droppableId),
          ]),
          (card) => card.order
        );

        const sourceUpdatedCards = sourceCards?.filter(
          (task) => task.id !== parseInt(draggableId.substr(5))
        );

        const draggedCard = sourceCards?.find(
          (task) => task.id === parseInt(draggableId.substr(5))
        );

        const obj: {
          [id: number]: { order: number; listId: number };
        } = {};
        // All cards in source list with order greater than dragged card order
        sourceUpdatedCards?.forEach((task, index) => {
          obj[task.id] = {
            order: index,
            listId: parseInt(source.droppableId),
          };
        });

        const destinationCards = orderBy(
          queryCache.getQueryData<Card[]>([
            "cards",
            parseInt(destination.droppableId),
          ]),
          (card) => card.order
        );

        destinationCards?.splice(destination.index, 0, draggedCard as Card);
        destinationCards?.forEach((task, index) => {
          obj[task.id] = {
            order: index,
            listId: parseInt(destination.droppableId),
          };
        });
        // Card which is dragged
        obj[draggableId.substr(5)] = {
          order: destination.index,
          listId: parseInt(destination.droppableId),
        };

        cardReorder([
          obj,
          {
            [source.droppableId]: sourceUpdatedCards.map((card, index) => ({
              ...card,
              order: index,
            })),
            [destination.droppableId]: destinationCards.map((card, index) => ({
              ...card,
              order: index,
            })),
          },
        ]);
      }
    },
    [cardReorder, list, listReorder]
  );
  const boardContents = useMemo(() => {
    return isLoading ? (
      <div className="w-screen mx-auto my-64 text-lg font-semibold text-center text-white">
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
    );
  }, [error, handleCreateList, handleDrag, handleListTitle, isLoading, list]);

  return <>{boardContents}</>;
};

export default Board;
