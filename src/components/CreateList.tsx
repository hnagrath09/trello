import React, { useState } from "react";

import PlusIcon from "./icons/PlusIcon";
import FormList from "./FormList";

const CreateList = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [listTitle, setListTitle] = useState<string>("");

  return (
    <div>
      {isCreating ? (
        <FormList
          onChange={(event: {
            target: { value: React.SetStateAction<string> };
          }) => setListTitle(event.target.value)}
          closeForm={() => {
            setIsCreating(false);
          }}
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
    </div>
  );
};

export default CreateList;
