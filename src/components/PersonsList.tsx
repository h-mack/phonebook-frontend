import { Person } from "../types/Types";

interface PersonsListProps {
  persons: Person[];
  filter: string;
}

export function PersonsList({ persons, filter }: PersonsListProps) {
  return (
    <ul>
      {persons
        .filter((person: { name: string }) =>
          person.name.toLowerCase().includes(filter)
        )
        .map((person: Person) => (
          <li key={person.id}>
            {person.name} ∘ {person.number}
          </li>
        ))}
    </ul>
  );
}
