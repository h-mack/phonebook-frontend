import { useCallback, useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  const getData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(url);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading };
};
