import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useQuery, useMutation, queryCache } from "react-query";
import { Dropdown, Menu } from "antd";

import Card from "./Card";
import CreateCard from "./CreateCard";
import {
  fetchCardsForList,
  createCard,
  updateCard,
} from "../queries/cardQueries";

import useStateFromProp from "../hooks/useStateFromProp";
import HorizontalDotsIcon from "../icons/HorizontalDotsIcon";
import { orderBy } from "lodash-es";

const listOptions = (
  <Menu>
    <Menu.Item key="0">
      <div className="w-16 mx-auto">List Actions</div>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">Add Card...</Menu.Item>
    <Menu.Item key="2">Copy List...</Menu.Item>
    <Menu.Item key="3">Move List...</Menu.Item>
    <Menu.Item key="4">Watch</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="5">Sort By...</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="6">Move All Cards in This List...</Menu.Item>
    <Menu.Item key="7" className="mr-20">
      Archive All Cards in This List...
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="8">Archive This List</Menu.Item>
  </Menu>
);

interface Card {
  _id: string;
  list: { _id: string; title: string; order: number };
  order: number;
  title: string;
  description: string;
  created_at: string;
}

interface Props {
  list: { _id: string; order: number; title: string };
  updateTitle: (title: string, listId: string) => void;
}

const List: React.FC<Props> = ({ list, updateTitle }) => {
  const { data: card } = useQuery(["cards", list._id], fetchCardsForList);

  const [addCard] = useMutation(createCard, {
    onSuccess: (createdCard) => {
      queryCache.setQueryData(
        ["cards", list._id],
        card ? [...card, createdCard] : createdCard
      );
    },
  });

  const [editCard] = useMutation(updateCard, {
    onMutate: (updatedCard) => {
      queryCache.setQueryData(
        ["cards", list._id],
        card?.map((task) =>
          task._id === updatedCard._id ? { ...task, ...updatedCard } : task
        )
      );
    },
  });

  const [editListTitle, setEditListTitle] = useState<boolean>(false);
  const [listTitle, setListTitle] = useStateFromProp(list.title);

  const handleCreateCard = (title: string) => {
    if (title) {
      addCard({
        title,
        description: "",
        order: card?.length ?? 0,
        listId: list._id,
      });
    }
  };

  const handleCardDescription = (description: string, cardId: string) => {
    editCard({ _id: cardId, description });
  };

  const handleCardTitle = (title: string, cardId: string) => {
    editCard({ _id: cardId, title });
  };

  return (
    <Draggable draggableId={list._id} index={list.order}>
      {(provided) => (
        <div
          className="w-64 pt-2 mx-2 bg-gray-300 rounded-sm "
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className="flex items-center justify-between"
            {...provided.dragHandleProps}
          >
            {editListTitle ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  updateTitle(listTitle, list._id);
                  setEditListTitle(false);
                }}
              >
                <input
                  className="pl-1 ml-3 text-sm font-semibold text-gray-700 border-2 border-blue-600 rounded-sm focus:outline-none"
                  autoFocus
                  onFocus={(event) => event.target.select()}
                  onChange={(event: {
                    target: { value: React.SetStateAction<string> };
                  }) => setListTitle(event.target.value)}
                  defaultValue={listTitle}
                ></input>
              </form>
            ) : (
              <div
                className="w-full ml-3 text-sm font-semibold text-gray-800 cursor-pointer"
                onClick={() => {
                  setEditListTitle(true);
                }}
              >
                {list.title}
              </div>
            )}

            <Dropdown
              overlay={listOptions}
              trigger={["click"]}
              overlayStyle={{ paddingRight: "20px" }}
            >
              <div className="p-1 mr-1 rounded-sm cursor-pointer hover:bg-gray-500">
                <HorizontalDotsIcon className="w-4 h-4" />
              </div>
            </Dropdown>
          </div>
          <Droppable droppableId={list._id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {orderBy(card, (card) => card.order)?.map(
                  (task: Card, index) => (
                    <Card
                      key={task._id}
                      card={task}
                      column={list}
                      index={index}
                      updateCardDes={handleCardDescription}
                      updateCardTit={handleCardTitle}
                    />
                  )
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CreateCard getTitle={handleCreateCard} />
        </div>
      )}
    </Draggable>
  );
};

export default List;
