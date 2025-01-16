import { useState, useEffect } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { SearchFilter } from "./components/SearchFilter";
import { ContactForm } from "./components/ContactForm";
import { PersonsList } from "./components/PersonsList";
import { Person } from "./types/Types";
import phonebook from "./services/phonebook";

export default function App() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await phonebook.getAll();
        setPersons(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const debouncedValue = useDebounce(filterInput, 350);
  const debouncedValueLowerCase = debouncedValue.toLowerCase();

  return (
    <div>
      <h1>Phonebook</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
      />
      <h2>Numbers</h2>
      <PersonsList persons={persons} filter={debouncedValueLowerCase} />
    </div>
  );
}
