import Axios from "axios";

const client = Axios.create({
  baseURL: "https://frozen-citadel-41248.herokuapp.com/",
});

export const fetchCommentsForCard = async (
  querName: string,
  cardId: string
) => {
  const { data } = await client.get(`/comments?card._id=${cardId}`);
  return data;
};

export const createComment = async ({
  text,
  cardId,
  userId,
}: {
  text: string;
  cardId: string;
  userId: string | undefined;
}) => {
  const { data } = await client.post("/comments", {
    text,
    card: { _id: cardId },
    user: { _id: userId },
  });
  return data;
};
