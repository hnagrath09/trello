import Axios from "axios";

interface Card {
  id: number;
  list: { id: number; title: string; order: number };
  order: number;
  title: string;
  description: string;
  created_at: string;
}

const client = Axios.create({
  baseURL: "http://localhost:1337",
});

export const fetchCardsForList = async (queryName: string, listId: number) => {
  const { data } = await client.get<Card[]>(`/cards?list.id=${listId}`);
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

export const reorderCards = async (updatedItems: {
  [id: number]: { order: number; listId: number };
}) => {
  const { data } = await client.post("/cards/reorder", { updatedItems });
  return data;
};
