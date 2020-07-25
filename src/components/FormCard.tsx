import React, { useState } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  closeForm: () => void;
  saveForm?: any;
}

const FormCard: React.FC<Props> = ({ closeForm, saveForm }) => {
  const [cardTitle, setCardTitle] = useState<string>("");

  return (
    <form
      className="p-2 bg-gray-300 "
      onSubmit={(event) => {
        event.preventDefault();
        saveForm(cardTitle);
        setCardTitle("");
      }}
    >
      <textarea
        className="w-full h-16 px-2 py-1 text-sm rounded-sm shadow resize-none focus:outline-none"
        placeholder="Enter a title for this card..."
        autoFocus
        onChange={(event: {
          target: { value: React.SetStateAction<string> };
        }) => setCardTitle(event.target.value)}
      />
      <div className="flex items-center justify-between">
        <button className="px-2 py-1 text-sm text-center text-white bg-green-600 rounded-sm focus:outline-none hover:bg-green-500 ">
          Add Card
        </button>
        <button
          className="px-2 py-1 text-sm text-center text-white bg-red-500 rounded-sm focus:outline-none hover:bg-red-500 "
          type="reset"
          onClick={closeForm}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FormCard;
