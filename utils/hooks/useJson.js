import { useEffect, useState } from 'react';
import useSWR from 'swr';

// eslint-disable-next-line import/prefer-default-export
export const useJson = (url) => {
  const [response, setResponse] = useState({});

  // eslint-disable-next-line no-shadow
  const fetcher = (url) => fetch(url)
    .then((res) => res.json())
    .catch();
  const { data, error } = useSWR(url, fetcher);

  useEffect(() => {
    setResponse(data);
  }, [data, setResponse]);

  return {
    response,
    error,
  };
};
