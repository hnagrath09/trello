import React, { useState } from "react";
import PlusIcon from "./icons/PlusIcon";
import FormCard from "./FormCard";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  getTitle?: any;
}

const CreateCard: React.FC<Props> = ({ getTitle }) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleSaveForm = (title: string) => {
    getTitle(title);
    setIsCreating(false);
  };

  return (
    <>
      {isCreating ? (
        <FormCard
          closeForm={() => {
            setIsCreating(false);
          }}
          saveForm={handleSaveForm}
        />
      ) : (
        <div className="px-2 mt-3 mb-2">
          <button
            className="flex items-center w-full px-3 py-1 text-sm text-gray-600 rounded-sm hover:bg-gray-400 focus:outline-none"
            onClick={() => {
              setIsCreating(true);
            }}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add a card
          </button>
        </div>
      )}
    </>
  );
};

export default CreateCard;
