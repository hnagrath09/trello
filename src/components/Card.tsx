import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import Modal from "./Modal";
import PencilIcon from "./icons/PencilIcon";
import MenuAlt2Icon from "./icons/MenuAlt2Icon";

interface card {
  id: number;
  parentId: number;
  order: number;
  title: string;
  description: string;
}

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  card: card;
  column: {
    id: number;
    order: number;
    title: string;
  };
  updateCardTit: any;
  updateCardDes: any;
}

const Card: React.FC<Props> = ({
  card,
  column,
  updateCardTit,
  updateCardDes,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleCardDescription = (description: string) => {
    updateCardDes(description, card.id);
  };

  const handleCardTitle = (title: string) => {
    updateCardTit(title, card.id);
  };

  return (
    <>
      <Draggable draggableId={card.id.toString()} index={card.order}>
        {(provided) => (
          <div
            className="px-2 py-1 mx-2 mt-2 text-sm bg-gray-100 shadow cursor-pointer group"
            onClick={showModal}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="flex items-center justify-between">
              {card.title}
              <PencilIcon className="hidden w-3 h-3 group-hover:block" />
            </div>
            {card.description ? (
              <MenuAlt2Icon className="w-4 h-4 my-1" />
            ) : undefined}
          </div>
        )}
      </Draggable>

      <Modal
        show={open}
        handleCancel={hideModal}
        cardInfo={card}
        listInfo={column}
        updateCardDescription={handleCardDescription}
        updateCardTitle={handleCardTitle}
      />
    </>
  );
};

export default Card;
