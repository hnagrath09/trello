import Axios from "axios";

interface List {
  id: number;
  order: number;
  title: string;
}

const client = Axios.create({
  baseURL: "https://damp-coast-59968.herokuapp.com/",
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
