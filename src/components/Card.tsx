import React, { useState } from "react";

import Modal from "./Modal";
import PencilIcon from "./icons/PencilIcon";
import MenuAlt2Icon from "./icons/MenuAlt2Icon";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  card: {
    id: number;
    parentId: number;
    order: number;
    title: string;
    description: string;
  };
}

const Card: React.FC<Props> = ({ card }) => {
  const [open, setOpen] = useState<boolean>(false);

  const showModal = (id: number) => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        className="px-2 py-1 mx-2 mt-2 text-sm bg-gray-100 shadow cursor-pointer group"
        onClick={() => {
          showModal(card.id);
        }}
      >
        <div className="flex items-center justify-between">
          {card.title}
          <PencilIcon className="hidden w-3 h-3 group-hover:block" />
          {card.description ? (
            <MenuAlt2Icon className="w-4 h-4 my-1" />
          ) : undefined}
        </div>
      </div>
      <Modal
        show={open}
        handleCancel={hideModal}
        handleSave={handleSave}
        cardInfo={card}
      />
    </>
  );
};

export default Card;
