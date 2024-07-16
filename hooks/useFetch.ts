import { useCallback, useEffect, useState } from "react";

const ENDPOINT = "/api/magento";

type Data<T> = {
  data: T;
};

export function useFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
) {
  const [data, setData] = useState<Data<T> | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();

      if (json.data.errors) {
        throw new Error('Graphql Error');
      }

      setData(json.data);
    } catch (error) {
      setError(error);
    }
    setIsFetching(false);
  }, [query, variables]);

  useEffect(() => {
    if (isFetching || data || error) {
      return;
    }

    fetchData();
  }, [fetchData, isFetching, data, error]);

  return { data, error, isFetching, fetchData };
}
