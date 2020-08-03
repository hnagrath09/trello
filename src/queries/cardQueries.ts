import Axios from "axios";

const client = Axios.create({
  baseURL: "https://damp-coast-59968.herokuapp.com/",
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
  description,
  listId,
}: {
  id: number;
  title?: string;
  order?: number;
  description?: string;
  listId?: number;
}) => {
  if (listId) {
    const { data } = await client.put(`/cards/${id}`, {
      title,
      order,
      description,
      list: { id: listId },
    });
    return data;
  } else {
    const { data } = await client.put(`/cards/${id}`, {
      title,
      order,
      description,
    });
    return data;
  }
};
