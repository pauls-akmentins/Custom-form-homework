import { useEffect, useState } from 'react';

import { ApiMethod, ApiStatus } from './types';

interface Api {
  url: string;
  apiDebouceInMs?: number;
}

const API_DOMAIN = 'https://frontend-homework-mock.prod.paynt.com';

export const useFetch = <T>({ url, apiDebouceInMs }: Api) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<ApiStatus>(ApiStatus.DEFAULT);

  const fetchData = async () => {
    try {
      setStatus(ApiStatus.LOADING);
      const res = await fetch(`${API_DOMAIN}/${url}`);
      const data = await res.json();
      setData(data);

      if (apiDebouceInMs) {
        setTimeout(() => {
          setStatus(ApiStatus.SUCCESS);
        }, 1000);
      } else {
        setStatus(ApiStatus.SUCCESS);
      }
    } catch (error) {
      setStatus(ApiStatus.ERROR);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, status };
};

export const usePost = <T>({ url, apiDebouceInMs }: Api) => {
  const [status, setStatus] = useState<ApiStatus>(ApiStatus.DEFAULT);

  const postData = async (payload: any) => {
    try {
      setStatus(ApiStatus.LOADING);
      await fetch(`${API_DOMAIN}/${url}`, {
        method: ApiMethod.POST,
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (apiDebouceInMs) {
        setTimeout(() => {
          setStatus(ApiStatus.SUCCESS);
        }, apiDebouceInMs);
      } else {
        setStatus(ApiStatus.SUCCESS);
      }

      return payload;
    } catch (error) {
      setStatus(ApiStatus.ERROR);
    }
  };

  return { status, postData };
};
