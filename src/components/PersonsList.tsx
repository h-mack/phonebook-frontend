import { MouseEventHandler } from "react";
import { Person } from "../types/Types";

interface PersonsListProps {
  persons: Person[];
  filter: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function PersonsList({ persons, filter, onClick }: PersonsListProps) {
  return (
    <ul>
      {persons
        .filter((person: { name: string }) =>
          person.name.toLowerCase().includes(filter)
        )
        .map((person: Person) => (
          <div>
            <li key={person.id}>
              {person.name} ∘ {person.number}
            </li>
            <button onClick={onClick}>delete</button>
          </div>
        ))}
    </ul>
  );
}
