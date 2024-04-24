import { useEffect, useState } from 'react';

import { ApiMethod, ApiStatus } from './types';

interface FetchApi {
  url: string;
}

interface PostApi extends FetchApi {
  payload: any;
}

const API_DOMAIN = 'https://frontend-homework-mock.prod.paynt.com';

export const useFetch = <T>({ url }: FetchApi) => {
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

export const usePost = <T>({ url }: PostApi) => {
  const [data, setResponse] = useState<T | null>(null);
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
      const data = await res.json();
      setResponse(data);
      setStatus(ApiStatus.SUCCESS);
    } catch (error) {
      setStatus(ApiStatus.ERROR);
    }
  };

  return { data, status, postData };
};
