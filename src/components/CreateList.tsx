import React, { useState } from "react";

import PlusIcon from "../icons/PlusIcon";
import CreateListForm from "./CreateListForm";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  getTitle?: any;
}

const CreateList: React.FC<Props> = ({ getTitle }) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleSaveForm = (title: string) => {
    getTitle(title);
    setIsCreating(false);
  };

  return (
    <>
      {isCreating ? (
        <CreateListForm
          closeForm={() => {
            setIsCreating(false);
          }}
          saveForm={handleSaveForm}
        />
      ) : (
        <button
          className="flex items-center w-64 h-10 px-4 py-2 mx-2 text-sm text-white bg-blue-400 rounded-sm hover:bg-blue-300 focus:outline-none"
          onClick={() => {
            setIsCreating(true);
          }}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add a list
        </button>
      )}
    </>
  );
};

export default CreateList;
