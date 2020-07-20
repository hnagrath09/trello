import React, { useRef } from "react";
import ReactDOM from "react-dom";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  // children: React.ReactNode;
  show?: boolean;
  title?: string;
  handleCancel: () => void;
  handleSave: () => void;
}

const modalContainer = document.createElement("div");
modalContainer.id = "modal-container";
modalContainer.style.position = "relative";
document.body.appendChild(modalContainer);

const Modal: React.FC<Props> = ({ show, title, handleCancel, handleSave }) => {
  const container = useRef<any>();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === container.current) {
      handleCancel();
    }
  };
  return show ? (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div
          className="fixed inset-0 flex items-center justify-center w-full h-full p-8"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={handleClick}
          ref={container}
        >
          <div className="w-2/5 bg-gray-200 rounded">
            <div className="flex items-center justify-between pb-4">
              <h1 className="mt-4 ml-12 text-lg font-semibold text-gray-700">
                {title}
              </h1>
              <div className="mt-3 mr-4 text-gray-700">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-5 h-5 cursor-pointer"
                  onClick={handleCancel}
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex">
              <div className="w-2/3 mx-5 ">
                <div className="flex items-center mt-4">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 mr-3"
                  >
                    <path d="M4 6h16M4 12h16M4 18h7"></path>
                  </svg>
                  <h2 className="font-semibold text-gray-600 ">Description</h2>
                </div>
                <div className="h-16 px-3 py-2 mt-4 ml-8 text-sm text-gray-700 bg-gray-300 rounded ">
                  Add a more detailed description...
                </div>
                <div className="flex items-center justify-between mt-4 text-gray-700">
                  <div className="flex items-center">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 mr-3"
                    >
                      <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                    </svg>
                    <h2 className="font-semibold text-gray-600 ">Activity</h2>
                  </div>
                  <div className="px-2 py-1 text-sm bg-gray-300 rounded-sm cursor-pointer">
                    Hide Details
                  </div>
                </div>
                <div className="flex items-center my-4">
                  <span className="px-1 py-1 text-xs font-bold text-center text-gray-700 bg-gray-300 rounded-full ">
                    HN
                  </span>
                  <div className="w-full px-3 py-1 ml-2 text-sm text-gray-700 bg-white">
                    Write a comment...
                  </div>
                </div>
              </div>
              <div className="w-1/3"></div>
            </div>
          </div>
        </div>,
        modalContainer
      )}
    </React.Fragment>
  ) : null;
};

export default Modal;
