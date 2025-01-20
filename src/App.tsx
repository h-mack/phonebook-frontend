import { useState, useEffect } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { SearchFilter } from "./components/SearchFilter";
import { ContactForm } from "./components/ContactForm";
import { PersonsList } from "./components/PersonsList";
import { Person } from "./types/Types";
import phonebook from "./services/phonebook";
import { Alert } from "./components/Alert";
import "./App.css";

export default function App() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const data = await phonebook.getAll();
        if (!ignore) {
          setPersons(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          console.error(err);
          setError("Failed to fetch data");
        }
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [persons]);

  const debouncedValue = useDebounce(filterInput, 350);
  const debouncedValueLowerCase = debouncedValue.toLowerCase();

  return (
    <div id="app">
      <h1>Phonebook</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {alert && <Alert>{alert}</Alert>}
      <SearchFilter
        value={filterInput}
        onChange={(e) => {
          setFilterInput(e.target.value);
        }}
      />
      <h2>Add a new contact</h2>
      <ContactForm
        persons={persons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setAlert={setAlert}
      />
      <h2>Numbers</h2>
      <PersonsList persons={persons} filter={debouncedValueLowerCase} />
    </div>
  );
}
