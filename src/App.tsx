import React, { useState } from "react";

import useLocalStorage from "./hooks/useLocalStorage";
import NewItem from "./components/NewItem";
import CreateItem from "./components/CreateItem";
import List from "./components/List";
import PencilIcon from "./components/icons/PencilIcon";
import Modal from "./components/Modal";

interface List {
  id: number;
  order: number;
  title: string;
}

interface Card {
  id: number;
  parentId: number;
  order: number;
  title: string;
  description: string;
}

const App = () => {
  const [newList, setNewList] = useState<boolean>(false);
  const [listTitle, setListTitle] = useState<string>("");
  const [list, setList] = useLocalStorage("list", []);

  const [newCard, setNewCard] = useState<{ id: number; show: boolean }>({
    id: 0,
    show: false,
  });
  const [cardTitle, setCardTitle] = useState<string>("");
  const [card, setCard] = useLocalStorage("cards", []);

  const [description, setDescription] = useState<string>("");

  // To open Modal for the corresponfing card
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  // To open or close Modal
  const [open, setOpen] = useState<boolean>(false);

  const showModal = (id: number) => {
    setActiveCardId(id);
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
  };

  const handleCreateCard = (listId: number) => {
    if (cardTitle) {
      const id = Date.now();
      const newCard = {
        id: id,
        parentId: listId,
        order: list.length + 1,
        title: cardTitle,
        description: "",
      };
      setCard((prevCard: Card[]) => [...prevCard, newCard]);
      setCardTitle("");
      setNewCard({ id: 0, show: false });
    }
  };

  const handleCreateList = () => {
    if (listTitle) {
      const id = Date.now();
      const newList = {
        id: id,
        order: list.length + 1,
        title: listTitle,
      };
      setListTitle("");
      setList((prevList: List[]) => [...prevList, newList]);
      setNewList(false);
    }
  };

  const handleDescription = () => {
    setCard((prevCard: Card[]) =>
      prevCard.map((task) =>
        task.id === activeCardId ? { ...task, description } : task
      )
    );
  };

  return (
    <>
      <div className="flex-col w-screen h-screen bg-blue-600">
        <div className="w-screen h-10 mb-4 bg-blue-700"></div>
        <div className="flex items-start">
          {list.map((column: List) => (
            <List key={column.id} title={column.title}>
              {card.map(
                (task: Card) =>
                  task.parentId === column.id && (
                    <div
                      className="flex items-center justify-between px-2 py-1 mx-2 mt-2 text-sm bg-gray-200 shadow cursor-pointer group"
                      key={task.id}
                      onClick={() => {
                        showModal(task.id);
                      }}
                    >
                      {task.title}
                      <PencilIcon className="hidden w-3 h-3 group-hover:block" />
                    </div>
                  )
              )}

              {newCard.show && newCard.id === column.id ? (
                <NewItem
                  createItem={() => handleCreateCard(column.id)}
                  cancelItem={() => {
                    setNewCard({ id: 0, show: false });
                  }}
                  onChange={(event: {
                    target: { value: React.SetStateAction<string> };
                  }) => setCardTitle(event.target.value)}
                />
              ) : (
                <div className="px-2 pt-3 ">
                  <CreateItem
                    className="w-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-500"
                    onClick={() => {
                      setNewCard({ id: column.id, show: true });
                    }}
                  >
                    Add a card
                  </CreateItem>
                </div>
              )}
            </List>
          ))}
          <div className="mx-2">
            {newList ? (
              <NewItem
                createItem={handleCreateList}
                cancelItem={() => {
                  setNewList(false);
                }}
                onChange={(event: {
                  target: { value: React.SetStateAction<string> };
                }) => setListTitle(event.target.value)}
              ></NewItem>
            ) : (
              <CreateItem
                className="w-64 h-10 px-4 py-2 text-sm text-white bg-blue-400 hover:bg-blue-300"
                onClick={() => {
                  setNewList(true);
                }}
              >
                {list.length ? "Add another list" : "Add a list"}
              </CreateItem>
            )}
          </div>
        </div>
      </div>
      <Modal
        show={open}
        title={card.find((task: Card) => task.id === activeCardId)?.title}
        listTitle={
          list.find(
            (column: List) =>
              column.id ===
              card.find((task: Card) => task.id === activeCardId)?.parentId
          )?.title
        }
        cardDescription={(event: {
          target: { value: React.SetStateAction<string> };
        }) => setDescription(event.target.value)}
        description={
          card.find((task: Card) => task.id === activeCardId)?.description
        }
        updateDescription={handleDescription}
        handleCancel={hideModal}
        handleSave={handleSave}
      />
    </>
  );
};

export default App;
