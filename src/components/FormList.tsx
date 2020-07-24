import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  onChange: any;
  closeForm: () => void;
  saveForm?: any;
}
const FormList: React.FC<Props> = ({ onChange, closeForm, saveForm }) => {
  return (
    <form className="w-64 p-1 mx-2 bg-gray-300">
      <input
        className="w-full h-8 px-2 py-1 text-sm border-2 border-blue-500 rounded-sm focus:outline-none"
        placeholder="Enter list title..."
        autoFocus
        onChange={onChange}
      />
      <div className="flex items-center justify-between">
        <button
          className="px-2 py-1 my-1 text-sm text-center text-white bg-green-600 rounded-sm focus:outline-none hover:bg-green-500 "
          // onSubmit={saveForm}
        >
          Add List
        </button>
        <button
          className="px-2 py-1 my-1 text-sm text-center text-white bg-red-500 rounded-sm focus:outline-none hover:bg-red-500 "
          onClick={closeForm}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FormList;
