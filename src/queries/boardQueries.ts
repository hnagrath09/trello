import Axios from "axios";

const client = Axios.create({
  baseURL: "https://frozen-citadel-41248.herokuapp.com/",
});

export const fetchBoards = async () => {
  const { data } = await client.get("/boards");
  return data;
};

export const createBoard = async ({
  userId,
}: {
  userId: string | undefined;
}) => {
  const { data } = await client.post("/boards", {
    title: "Untitled board",
    users: { _id: userId },
  });
  return data;
};
