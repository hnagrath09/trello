import Axios from "axios";

interface Card {
  _id: string;
  list: { _id: string; title: string; order: number };
  order: number;
  title: string;
  description: string;
  createdAt: string;
}

const client = Axios.create({
  baseURL: "https://frozen-citadel-41248.herokuapp.com/",
});

export const fetchCardsForList = async (queryName: string, listId: string) => {
  const { data } = await client.get<Card[]>(`/cards?list._id=${listId}`);
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
  listId: string;
}) => {
  const { data } = await client.post("/cards", {
    title,
    order,
    description,
    list: { _id: listId },
  });
  return data;
};

export const updateCard = async ({
  _id,
  title,
  order,
  description,
  listId,
}: {
  _id: string;
  title?: string;
  order?: number;
  description?: string;
  listId?: string;
}) => {
  if (listId) {
    const { data } = await client.put(`/cards/${_id}`, {
      title,
      order,
      description,
      list: { _id: listId },
    });
    return data;
  } else {
    const { data } = await client.put(`/cards/${_id}`, {
      title,
      order,
      description,
    });
    return data;
  }
};

export const reorderCards = async ([updatedItems]: [
  {
    [_id: string]: { order: number; listId: string };
  },
  {
    [_id: string]: Card[];
  }
]) => {
  const { data } = await client.post("/cards/reorder", { updatedItems });
  return data;
};
