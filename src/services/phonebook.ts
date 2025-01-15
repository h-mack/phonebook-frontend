import axios from "axios";
const baseUrl = "http://localhost:3000/persons";

export const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update };

// useEffect(() => {
//   noteService.getAll().then((response) => {
//     setNotes(response.data);
//   });
// }, []);

// noteService
//   .update(id, changedNote)
//   .then((returnedNote) => {
//     setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
//   })
//   .catch((error) => {
//     alert(`the note '${note.content}' was already deleted from server`);
//     setNotes(notes.filter((n) => n.id !== id));
//   });

// noteService.create(noteObject).then((response) => {
//   setNotes(notes.concat(response.data));
//   setNewNote("");
// });
