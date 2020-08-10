import Axios from "axios";

interface List {
  _id: string;
  order: number;
  title: string;
}

const client = Axios.create({
  baseURL: "http://localhost:1337",
});

export const fetchLists = async () => {
  const { data } = await client.get<List[]>("/lists");
  return data;
};

// Save new list using post request
export const createList = async ({
  title,
  order,
}: {
  title: string;
  order: number;
}) => {
  const { data } = await client.post("/lists", { title, order });
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
