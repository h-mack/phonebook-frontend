import { ChangeEventHandler, useId } from "react";

type SearchFilterProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export function SearchFilter({ value, onChange }: SearchFilterProps) {
  const filterId = useId();
  const filterHintId = useId();

  return (
    <>
      <p
        id={filterHintId}
        style={{ marginBottom: ".5rem", fontStyle: "italic" }}
      >
        Enter a name to filter the phonebook list
      </p>
      <label htmlFor={filterId}>Filter: </label>
      <input
        type="text"
        id={filterId}
        aria-describedby={filterHintId}
        placeholder="John Smith"
        value={value}
        onChange={onChange}
      />
    </>
  );
}
