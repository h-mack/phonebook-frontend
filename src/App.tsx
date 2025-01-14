import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { SearchFilter } from "./components/SearchFilter";
import { ContactForm } from "./components/ContactForm";
import { PersonsList } from "./components/PersonsList";
import { Person } from "./types/Types";

export default function App() {
  const [persons, setPersons] = useState<Person[]>([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const debouncedValue = useDebounce(filterInput, 350);

  const debouncedValueLowerCase = debouncedValue.toLowerCase();

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter
        value={filterInput}
        onChange={(e) => {
          setFilterInput(e.target.value);
        }}
      />
      <h2>Add a new contact</h2>
      <ContactForm
        persons={persons}
        setPersons={setPersons}
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
