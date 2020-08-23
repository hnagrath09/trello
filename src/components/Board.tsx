import React, { useMemo, useCallback } from "react";
import arrayMove from "array-move";
import { orderBy, get } from "lodash-es";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useQuery, useMutation, queryCache } from "react-query";
import CreateList from "./CreateList";
import List from "./List";
import {
  fetchListsForBoard,
  createList,
  updateList,
  reorderLists,
} from "../queries/listQueries";
import { reorderCards } from "../queries/cardQueries";
import Navbar from "./Navbar";

interface Card {
  _id: string;
  list: { _id: string; title: string; order: number };
  order: number;
  title: string;
  description: string;
  created_at: string;
}

interface List {
  _id: string;
  order: number;
  title: string;
}

const Board = ({ match }: { match: any }) => {
  const boardId = get(match, "params.boardId");

  const { isLoading, data: list, error } = useQuery(
    ["lists", boardId],
    fetchListsForBoard
  );

  const [addList] = useMutation(createList, {
    onSuccess: (createdList) => {
      queryCache.setQueryData(
        ["lists", boardId],
        list ? [...list, createdList] : [createdList]
      );
    },
  });
  const [editList] = useMutation(updateList, {
    // data passed to editList function
    onMutate: (updatedList) => {
      queryCache.setQueryData(
        ["lists", boardId],
        list?.map((column) =>
          column._id === updatedList._id
            ? { ...column, ...updatedList }
            : column
        )
      );
    },
  });
  const [listReorder] = useMutation(reorderLists, {
    onMutate: (reorderData: { [_id: string]: number }) => {
      queryCache.setQueryData(
        ["lists", boardId],
        list?.map((column) => ({
          ...column,
          order: reorderData[column._id] ?? column.order,
        }))
      );
    },
  });
  const [cardReorder] = useMutation(reorderCards, {
    onMutate: ([_, updatedCardsList]) => {
      Object.keys(updatedCardsList).forEach((listId: string) => {
        queryCache.setQueryData(["cards", listId], updatedCardsList[listId]);
      });
    },
  });
  const handleCreateList = useCallback(
    (title: string) => {
      if (title) {
        addList({ title, order: list?.length ?? 0, boardId });
      }
    },
    [addList, list, boardId]
  );
  const handleListTitle = useCallback(
    (title: string, listId: string) => {
      editList({ title, _id: listId });
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
        const list = queryCache.getQueryData<List[]>(["lists", boardId]);
        const updatedList = arrayMove(
          orderBy(list, (list) => list.order),
          source.index,
          destination.index
        );

        // Filtering all lists which are needed for order updation
        const updatedItems = updatedList
          .map((list, index) => ({ ...list, index }))
          .filter((list) => list.order !== list.index);

        const obj: { [id: string]: number } = {};
        updatedItems.forEach((list) => {
          obj[list._id] = list.index;
        });

        listReorder(obj);
      }
      // For card drag drop within the same list
      else if (source.droppableId === destination.droppableId) {
        const card = queryCache.getQueryData<Card[]>([
          "cards",
          source.droppableId,
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
          [id: string]: { order: number; listId: string };
        } = {};
        updatedItems.forEach((task) => {
          obj[task._id] = {
            order: task.index,
            listId: source.droppableId,
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
          queryCache.getQueryData<Card[]>(["cards", source.droppableId]),
          (card) => card.order
        );

        const sourceUpdatedCards = sourceCards?.filter(
          (task) => task._id !== draggableId
        );

        const draggedCard = sourceCards?.find(
          (task) => task._id === draggableId
        );

        const obj: {
          [id: string]: { order: number; listId: string };
        } = {};
        // All cards in source list with order greater than dragged card order
        sourceUpdatedCards?.forEach((task, index) => {
          obj[task._id] = {
            order: index,
            listId: source.droppableId,
          };
        });

        const destinationCards = orderBy(
          queryCache.getQueryData<Card[]>(["cards", destination.droppableId]),
          (card) => card.order
        );

        destinationCards?.splice(destination.index, 0, draggedCard as Card);
        destinationCards?.forEach((task, index) => {
          obj[task._id] = {
            order: index,
            listId: destination.droppableId,
          };
        });
        // Card which is dragged
        obj[draggableId] = {
          order: destination.index,
          listId: destination.droppableId,
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
    [cardReorder, list, listReorder, boardId]
  );
  const boardContents = useMemo(() => {
    return (
      <div className="w-screen h-screen bg-blue-600 ">
        <Navbar />
        {isLoading ? (
          <div className="w-screen mx-auto my-64 text-lg font-semibold text-center text-white">
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
                      key={column._id}
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
      </div>
    );
  }, [error, handleCreateList, handleDrag, handleListTitle, isLoading, list]);

  return <>{boardContents}</>;
};

export default Board;
