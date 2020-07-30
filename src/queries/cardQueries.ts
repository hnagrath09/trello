import Axios from "axios";

const client = Axios.create({
  baseURL: "http://localhost:1337",
});

export const fetchCards = async () => {
  const { data } = await client.get("/cards");
  return data;
};

// Save new list using post request
export const createCard = async ({
  title,
  order,
  description,
  listId,
}: {
  title: string;
  order: number;
  description: string;
  listId: number;
}) => {
  const { data } = await client.post("/cards", {
    title,
    order,
    description,
    list: { id: listId },
  });
  return data;
};

export const updateCard = async ({
  id,
  title,
  order,
}: {
  id: number;
  title?: string;
  order?: number;
}) => {
  const { data } = await client.put(`/lists/${id}`, { title, order });
  return data;
};
