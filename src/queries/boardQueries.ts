import Axios from "axios";

const client = Axios.create({
  baseURL: "https://frozen-citadel-41248.herokuapp.com/",
});

export const fetchBoards = async () => {
  const { data } = await client.get("/boards");
  return data;
};
