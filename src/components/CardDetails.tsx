import React, { useState } from "react";
import "antd/dist/antd.css";

import useStateFromProp from "../hooks/useStateFromProp";

import NewspaperIcon from "./icons/NewspaperIcon";
import PaperClipIcon from "./icons/PaperClipIcon";
import UserIcon from "./icons/UserIcon";
import TagIcon from "./icons/TagIcon";
import MenuAlt2Icon from "./icons/MenuAlt2Icon";
import SpeakerPhoneIcon from "./icons/SpeakerPhoneIcon";
import ShareIcon from "./icons/ShareIcon";
import ArchiveIcon from "./icons/ArchiveIcon";
import EyeIcon from "./icons/EyeIcon";
import CopyIcon from "./icons/CopyIcon";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import PhotographIcon from "./icons/PhotographIcon";
import ClockIcon from "./icons/ClockIcon";
import ClipboardCheckIcon from "./icons/ClipboardCheckIcon";

interface Props {
  cardInfo: {
    id: number;
    parentId: number;
    order: number;
    title: string;
    description: string;
  };
  listInfo: {
    id: number;
    order: number;
    title: string;
  };
  updateCardTitle: (title: string) => void;
  updateCardDescription: (description: string) => void;
}
const CardDetails: React.FC<Props> = ({
  cardInfo,
  listInfo,
  updateCardTitle,
  updateCardDescription,
}) => {
  const [editCardTitle, setEditCardTitle] = useState<boolean>(false);
  const [cardTitle, setCardTitle] = useStateFromProp(cardInfo.title);

  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [description, setDescription] = useStateFromProp(cardInfo.description);

  return (
    <>
      {/* Title Starting */}
      <div className="flex items-center mt-5 ml-5 text-lg font-semibold text-gray-700">
        <NewspaperIcon className="w-5 h-5 mr-3" />
        {editCardTitle ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              updateCardTitle(cardTitle);
              setEditCardTitle(false);
            }}
          >
            <input
              className="pl-1 -ml-1 font-semibold text-gray-700 border-2 border-blue-600 rounded-sm focus:outline-none"
              autoFocus
              onChange={(event: {
                target: { value: React.SetStateAction<string> };
              }) => setCardTitle(event.target.value)}
              defaultValue={cardTitle}
            ></input>
          </form>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => {
              setEditCardTitle(true);
            }}
          >
            {cardInfo.title}
          </div>
        )}
      </div>
      <div className="ml-2">
        <span className="ml-12 text-sm text-gray-700">in list</span>
        <span className="ml-1 text-sm text-gray-700 underline">
          {listInfo.title}
        </span>
      </div>
      {/* Title End */}

      <div className="flex">
        <div className="w-2/3 mx-5">
          {/* Card Description */}
          <div className="flex items-center mt-6">
            <MenuAlt2Icon className="w-5 h-5 mr-3" />
            <h2 className="font-semibold text-gray-600 ">Description</h2>
          </div>
          {editDescription ? (
            <form
              className="mt-4 ml-8"
              onSubmit={(event) => {
                event.preventDefault();
                updateCardDescription(description);
                setEditDescription(false);
              }}
            >
              <textarea
                className="w-full h-24 px-3 py-2 text-sm text-gray-700 border-2 border-blue-600 rounded-sm resize-none focus:outline-none"
                placeholder="Add a more detailed description..."
                autoFocus
                onFocus={(event) => event.target.select()}
                onChange={(event: {
                  target: { value: React.SetStateAction<string> };
                }) => setDescription(event.target.value)}
                defaultValue={description}
              />
              <button
                className="px-2 py-1 text-sm text-center text-white bg-green-600 rounded-sm focus:outline-none hover:bg-green-500 "
                type="submit"
              >
                Save
              </button>
              <button
                className="px-2 py-1 ml-2 text-sm text-center text-white bg-red-500 rounded-sm focus:outline-none hover:bg-red-500 "
                type="reset"
                onClick={() => {
                  setEditDescription(false);
                  setDescription(cardInfo.description);
                }}
              >
                Cancel
              </button>
            </form>
          ) : cardInfo.description ? (
            <div
              className="ml-8 text-sm text-gray-800 cursor-pointer"
              onClick={() => {
                setEditDescription(true);
              }}
            >
              {cardInfo.description}
            </div>
          ) : (
            <div
              className="h-16 px-3 py-2 mt-4 ml-8 text-sm text-gray-700 bg-gray-300 rounded cursor-pointer "
              onClick={() => {
                setEditDescription(true);
              }}
            >
              Add a more detailed description...
            </div>
          )}

          {/* Activities */}
          <div className="flex items-center justify-between mt-6 text-gray-700">
            <div className="flex items-center">
              <SpeakerPhoneIcon className="w-5 h-5 mr-3" />
              <h2 className="font-semibold text-gray-600 ">Activity</h2>
            </div>
            <div className="px-2 py-1 text-sm bg-gray-300 rounded-sm cursor-pointer">
              Hide Details
            </div>
          </div>

          {/* Enter comment */}
          <div className="flex items-center my-4">
            <span className="px-1 py-1 text-xs font-bold text-center text-gray-700 bg-gray-300 rounded-full ">
              HN
            </span>
            <div className="w-full px-3 py-1 ml-2 text-sm text-gray-700 bg-white">
              Write a comment...
            </div>
          </div>
        </div>

        {/* Right side of modal */}
        <div className="w-1/3 pt-2 ml-6">
          <div className="mx-4 mb-2 text-sm font-medium text-gray-600">
            ADD TO CARD
          </div>
          <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
            <UserIcon className="w-4 h-4 mr-1" />
            Members
          </div>
          <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
            <TagIcon className="w-4 h-4 mr-1" />
            Labels
          </div>
          <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
            <ClipboardCheckIcon className="w-4 h-4 mr-1" />
            Checklist
          </div>
          <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
            <ClockIcon className="w-4 h-4 mr-1" />
            Due Date
          </div>
          <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
            <PaperClipIcon className="w-4 h-4 mr-1" />
            Attachment
          </div>
          <div className="flex items-center px-4 py-1 mx-4 mb-8 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
            <PhotographIcon className="w-4 h-4 mr-1" />
            Cover
          </div>

          <div className="mx-4 mb-2 text-sm font-medium text-gray-600">
            ACTIONS
          </div>
          <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
            <ArrowRightIcon className="w-4 h-4 mr-1" />
            Move
          </div>
          <div className="flex items-center px-4 py-1 mx-4 mb-2 text-sm text-gray-700 bg-gray-300 rounded-sm cursor-pointer ">
            <CopyIcon className="w-4 h-4 mr-1" />
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
    </>
  );
};

export default CardDetails;
