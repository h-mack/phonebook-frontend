import { useEffect, useRef, useState } from "react";

export const useDebounce = (value: string, delay = 500): string => {
  const [debounceValue, setDebounceValue] = useState<string>("");
  const timerRef = useRef<number | undefined>();

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, [delay, value]);

  return debounceValue;
};
