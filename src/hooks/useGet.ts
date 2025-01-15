import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";

export const useGet = (url: string) => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      const data = response.data;
      setData(data);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err);
        setError(err.message);
      } else {
        console.error(err);
        setError("An error has occurred: Failed to fetch data.");
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading, error };
};
