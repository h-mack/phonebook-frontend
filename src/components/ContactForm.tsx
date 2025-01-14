import { FormEventHandler, useId } from "react";
import { Person } from "../types/Types";

type ContactFormProps = {
  persons: Person[];
  setPersons: (persons: Person[]) => void;
  newName: string;
  setNewName: (name: string) => void;
  newNumber: string;
  setNewNumber: (number: string) => void;
};

export function ContactForm({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}: ContactFormProps) {
  const nameId = useId();
  const nameHintId = useId();
  const numberId = useId();
  const numberHintId = useId();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (persons.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    if (persons.some((e) => e.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    setPersons([
      ...persons,
      {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id++,
      },
    ]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p
          id={nameHintId}
          style={{ marginBottom: ".5rem", fontStyle: "italic" }}
        >
          Enter the full name of the contact
        </p>
        <label htmlFor={nameId}>Name: </label>
        <input
          id={nameId}
          aria-describedby={nameHintId}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="John Smith"
        />
      </div>
      <div>
        <p
          id={numberHintId}
          style={{ marginBottom: ".5rem", fontStyle: "italic" }}
        >
          Enter the phone number of the contact
        </p>
        <label htmlFor={numberId}>Number: </label>
        <input
          id={numberId}
          aria-describedby={numberHintId}
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          placeholder="555-555-5555"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
