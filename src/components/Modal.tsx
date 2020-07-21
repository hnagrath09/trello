import React, { useRef } from "react";
import ReactDOM from "react-dom";

import CloseIcon from "./icons/CloseIcon";
import PaperClipIcon from "./icons/PaperClipIcon";
import UserIcon from "./icons/UserIcon";
import TagIcon from "./icons/TagIcon";
import MenuAlt2Icon from "./icons/MenuAlt2Icon";
import SpeakerPhoneIcon from "./icons/SpeakerPhoneIcon";
import ShareIcon from "./icons/ShareIcon";
import ArchiveIcon from "./icons/ArchiveIcon";
import EyeIcon from "./icons/EyeIcon";

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
                <CloseIcon
                  className="w-5 h-5 cursor-pointer"
                  onClick={handleCancel}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-2/3 mx-5 ">
                <div className="flex items-center mt-4">
                  <MenuAlt2Icon className="w-5 h-5 mr-3" />
                  <h2 className="font-semibold text-gray-600 ">Description</h2>
                </div>
                <div className="h-16 px-3 py-2 mt-4 ml-8 text-sm text-gray-700 bg-gray-300 rounded ">
                  Add a more detailed description...
                </div>
                <div className="flex items-center justify-between mt-4 text-gray-700">
                  <div className="flex items-center">
                    <SpeakerPhoneIcon className="w-5 h-5 mr-3" />
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
              <div className="w-1/4 pt-2">
                <span className="mx-4 text-sm font-medium text-gray-600">
                  ADD TO CARD
                </span>
                <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
                  <UserIcon className="w-4 h-4 mr-1" />
                  Members
                </div>
                <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
                  <TagIcon className="w-4 h-4 mr-1" />
                  Labels
                </div>
                <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                  </svg>
                  Checklist
                </div>
                <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Due Date
                </div>
                <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
                  <PaperClipIcon className="w-4 h-4 mr-1" />
                  Attachment
                </div>
                <div className="flex items-center px-4 py-1 mx-4 mb-8 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Cover
                </div>

                <span className="mx-4 text-sm font-medium text-gray-600">
                  ACTIONS
                </span>
                <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                  Move
                </div>
                <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  Copy
                </div>
                <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                  </svg>
                  Make Template
                </div>
                <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
                  <EyeIcon className="w-4 h-4 mr-1" />
                  Watch
                </div>
                <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
                  <ArchiveIcon className="w-4 h-4 mr-1" />
                  Archive
                </div>
                <div className="flex items-center px-4 py-1 mx-4 mb-6 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
                  <ShareIcon className="w-4 h-4 mr-1" />
                  Share
                </div>
              </div>
            </div>
          </div>
        </div>,
        modalContainer
      )}
    </React.Fragment>
  ) : null;
};

export default Modal;
