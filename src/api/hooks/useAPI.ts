import { useEffect, useState } from 'react';

import { ApiMethod, ApiStatus } from './types';

interface Api {
  url: string;
}

const API_DOMAIN = 'https://frontend-homework-mock.prod.paynt.com';

export const useFetch = <T>({ url }: Api) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<ApiStatus>(ApiStatus.DEFAULT);

  const fetchData = async () => {
    try {
      setStatus(ApiStatus.LOADING);
      const res = await fetch(`${API_DOMAIN}/${url}`);
      const data = await res.json();
      setData(data);
      setStatus(ApiStatus.SUCCESS);
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

export const usePost = <T>({ url }: Api) => {
  const [status, setStatus] = useState<ApiStatus>(ApiStatus.DEFAULT);

  const postData = async (payload: any) => {
    try {
      setStatus(ApiStatus.LOADING);
      const res = await fetch(`${API_DOMAIN}/${url}`, {
        method: ApiMethod.POST,
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: T = await res.json();
      setStatus(ApiStatus.SUCCESS);
      return data;
    } catch (error) {
      setStatus(ApiStatus.ERROR);
    }
  };

  return { status, postData };
};
