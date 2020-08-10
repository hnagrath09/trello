import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Modal } from "antd";

// import Modal from "./Modal";
import PencilIcon from "../icons/PencilIcon";
import MenuAlt2Icon from "../icons/MenuAlt2Icon";
import CardDetails from "./CardDetails";

interface card {
  _id: string;
  order: number;
  title: string;
  description: string;
  created_at: string;
}

interface Props {
  card: card;
  column: {
    _id: string;
    order: number;
    title: string;
  };
  updateCardTit: any;
  updateCardDes: any;
  index: number;
}

const Card: React.FC<Props> = ({
  card,
  column,
  updateCardTit,
  updateCardDes,
  index,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleCardDescription = (description: string) => {
    updateCardDes(description, card._id);
  };

  const handleCardTitle = (title: string) => {
    updateCardTit(title, card._id);
  };

  return (
    <>
      <Draggable draggableId={card._id} index={index}>
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
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={720}
        centered
        bodyStyle={{
          backgroundColor: "#edf2f7",
          paddingTop: "8px",
          paddingBottom: "10px",
        }}
      >
        <CardDetails
          cardInfo={card}
          listInfo={column}
          updateCardTitle={handleCardTitle}
          updateCardDescription={handleCardDescription}
        />
      </Modal>
    </>
  );
};

export default Card;
