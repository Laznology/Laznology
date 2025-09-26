"use client";
import { useEffect, useState, useCallback } from "react";
interface UseFetchOption {
  revalidate: number;
}

export function useFetch<T = unknown>(
  url: string,
  options: UseFetchOption = {
    revalidate: 0,
  },
) {
  const { revalidate } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const json = await response.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [url]);
  useEffect(() => {
    fetchData();
    if (revalidate) {
      const id = setInterval(fetchData, revalidate * 1000);
      return () => clearInterval(id);
    }
  }, [fetchData, revalidate]);
  return { data, loading, error, refetch: fetchData };
}
