import Axios from "axios";

interface List {
  _id: string;
  order: number;
  title: string;
}

const client = Axios.create({
  baseURL: "https://frozen-citadel-41248.herokuapp.com/",
});

export const fetchListsForBoard = async (querName: string, boardId: string) => {
  const { data } = await client.get<List[]>(`/lists?board._id=${boardId}`);
  return data;
};

// Save new list using post request
export const createList = async ({
  title,
  order,
  boardId,
}: {
  title: string;
  order: number;
  boardId: string;
}) => {
  const { data } = await client.post("/lists", {
    title,
    order,
    board: { _id: boardId },
  });
  return data;
};

export const updateList = async ({
  _id,
  title,
  order,
}: {
  _id: string;
  title?: string;
  order?: number;
}) => {
  const { data } = await client.put(`/lists/${_id}`, { title, order });
  return data;
};

export const reorderLists = async (updatedItems: { [_id: string]: number }) => {
  const { data } = await client.post<{ success: boolean }>(`/lists/reorder`, {
    updatedItems,
  });
  return data;
};
