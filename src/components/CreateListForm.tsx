import React, { useState } from "react";

interface Props {
  closeForm: () => void;
  saveForm?: any;
}

const CreateListForm: React.FC<Props> = ({ closeForm, saveForm }) => {
  const [listTitle, setListTitle] = useState<string>("");

  return (
    <form
      className="w-64 p-1 mx-2 bg-gray-300"
      onSubmit={(event) => {
        event.preventDefault();
        saveForm(listTitle);
        setListTitle("");
      }}
    >
      <input
        className="w-full h-8 px-2 py-1 text-sm border-2 border-blue-500 rounded-sm focus:outline-none"
        placeholder="Enter list title..."
        autoFocus
        onChange={(event: {
          target: { value: React.SetStateAction<string> };
        }) => setListTitle(event.target.value)}
      />
      <div className="flex items-center justify-between">
        <button className="px-2 py-1 my-1 text-sm text-center text-white bg-green-600 rounded-sm focus:outline-none hover:bg-green-500 ">
          Add List
        </button>
        <button
          className="px-2 py-1 my-1 text-sm text-center text-white bg-red-500 rounded-sm focus:outline-none hover:bg-red-500 "
          type="reset"
          onClick={closeForm}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateListForm;
