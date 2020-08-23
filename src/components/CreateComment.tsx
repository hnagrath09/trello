import React, { useState, useCallback, useContext } from "react";
import { Button } from "antd";
import { useQuery, useMutation, queryCache } from "react-query";

import { fetchCommentsForCard, createComment } from "../queries/commentQueries";
import PaperClipIcon from "../icons/PaperClipIcon";
import AtSymbolIcon from "../icons/AtSymbolIcon";
import EmojiHappyIcon from "../icons/EmojiHappyIcon";
import AuthContext from "../contexts/AuthContext";

interface Props {
  cardId: string;
}

const CreateComment: React.FC<Props> = ({ cardId }) => {
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const [addNewComment, setAddNewComment] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");

  const { data: comments } = useQuery(
    ["comments", cardId],
    fetchCommentsForCard
  );

  const [addComment] = useMutation(createComment, {
    onSuccess: (createdComment) => {
      queryCache.setQueryData(
        ["comments", cardId],
        comments ? [...comments, createdComment] : [createdComment]
      );
    },
  });

  const handleCreateComment = useCallback(() => {
    if (commentText) {
      addComment({ text: commentText, cardId, userId });
    }
  }, [addComment, cardId, commentText, userId]);

  return (
    <div className="flex items-start my-4">
      <span className="p-2 -ml-1 text-xs font-bold text-center text-gray-700 bg-gray-300 rounded-full ">
        HN
      </span>
      {addNewComment ? (
        <form
          className="w-full ml-2 bg-white shadow-lg"
          onSubmit={(event) => {
            event?.preventDefault();
            handleCreateComment();
            setCommentText("");
            setAddNewComment(false);
          }}
        >
          <input
            className="w-full px-3 py-1 text-sm text-gray-700 bg-white focus:outline-none"
            autoFocus
            placeholder="Write a comment..."
            onChange={(event: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setCommentText(event.target.value);
            }}
          />
          <div className="flex items-center justify-between px-2 mt-4 mb-2">
            <Button htmlType="submit">Save</Button>
            <div className="flex items-center justify-center text-gray-700">
              <div className="p-2 mr-2 rounded-sm cursor-pointer hover:bg-gray-300">
                <PaperClipIcon className="w-4 h-4 " />
              </div>
              <div className="p-2 mr-2 rounded-sm cursor-pointer hover:bg-gray-300">
                <AtSymbolIcon className="w-4 h-4" />
              </div>
              <div className="p-2 rounded-sm cursor-pointer hover:bg-gray-300">
                <EmojiHappyIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div
          className="w-full px-3 py-1 ml-2 text-sm text-gray-700 bg-white cursor-pointer"
          onClick={() => setAddNewComment(true)}
        >
          Write a comment...
        </div>
      )}
    </div>
  );
};

export default CreateComment;
