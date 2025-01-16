import phonebook from "../services/phonebook";
import { Person } from "../types/Types";

interface PersonsListProps {
  persons: Person[];
  filter: string;
}

export function PersonsList({ persons, filter }: PersonsListProps) {
  async function removeContact(id: Person["id"]) {
    const name = persons.find((person) => person.id === id)!.name;
    const confirmation = window.confirm(`Delete ${name}?`);
    if (!confirmation) {
      return;
    }
    try {
      await phonebook.remove(id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ul>
      {persons
        .filter((person: { name: string }) =>
          person.name.toLowerCase().includes(filter)
        )
        .map((person: Person) => (
          <li key={person.id}>
            {person.name} ∘ {person.number}
            <button
              onClick={() => removeContact(person.id)}
              style={{ marginLeft: "1rem", cursor: "pointer" }}
            >
              delete
            </button>
          </li>
        ))}
    </ul>
  );
}
