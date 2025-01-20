import { FormEventHandler, useId, useState, useRef } from "react";
import { Person } from "../types/Types";
import phonebook from "../services/phonebook";

type ContactFormProps = {
  persons: Person[];
  // setPersons: (persons: Person[]) => void;
  newName: string;
  setNewName: (name: string) => void;
  newNumber: string;
  setNewNumber: (number: string) => void;
  setAlert: (alert: string | null) => void;
};

export function ContactForm({
  persons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setAlert,
}: ContactFormProps) {
  const nameId = useId();
  const nameHintId = useId();
  const numberId = useId();
  const numberHintId = useId();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const postData = async () => {
    setLoading(true);
    try {
      await phonebook.create({
        name: newName,
        number: newNumber,
      });
      setAlert(`Added ${newName}`);
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (error) {
      setError("Failed request to send data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateNumber = async (id: number, details: Omit<Person, "id">) => {
    setLoading(true);
    try {
      await phonebook.update(id, details);
    } catch (err) {
      setError("Failed request to update contact.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!newName || !newNumber) {
      alert("Please ensure both fields are not empty.");
      return;
    }
    if (persons.some((person) => person.name === newName)) {
      const confirmation = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (!confirmation) {
        setNewName("");
        setNewNumber("");
        nameInputRef.current?.focus();
        return;
      } else {
        const id = persons.find((person) => person.name === newName)!.id;
        const details = {
          name: newName,
          number: newNumber,
        };
        updateNumber(id, details);
        setAlert(`Updated number for ${newName}`);
        setTimeout(() => {
          setAlert(null);
        }, 3000);
        return;
      }
    }
    postData();
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
          ref={nameInputRef}
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
        <button type="submit" disabled={loading}>
          add
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
