import axios from "axios";
import { Person } from "../types/Types";
const baseUrl = "http://localhost:3000/persons";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const create = async (newObject: Omit<Person, "id">) => {
  try {
    await axios.post(baseUrl, newObject);
  } catch (err) {
    console.error(err);
  }
};

const update = async (id: Person["id"], newObject: Omit<Person, "id">) => {
  try {
    await axios.put(`${baseUrl}/${id}`, newObject);
  } catch (err) {
    console.error(err);
  }
};

const remove = async (id: Person["id"]) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (err) {
    console.error(err);
  }
};

export default { getAll, create, update, remove };
