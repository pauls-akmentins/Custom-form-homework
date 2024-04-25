import { ApiMethod } from './types';

interface Api {
  url: string;
  apiDebounceInMs?: number;
}

const API_DOMAIN = 'https://frontend-homework-mock.prod.paynt.com';

export const useFetch = <T>({ url, apiDebounceInMs }: Api) => {
  const fetchData = async (resolve: (data: T) => void, reject: () => void) => {
    try {
      const res = await fetch(`${API_DOMAIN}/${url}`);

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();

      if (apiDebounceInMs) {
        setTimeout(() => {
          resolve(data);
        }, apiDebounceInMs);
      } else {
        resolve(data);
      }
    } catch (error) {
      reject();
    }
  };

  return { fetchData };
};

export const usePost = <T>({ url, apiDebounceInMs }: Api) => {
  const postData = async (payload: T, resolve: (data: T) => void, reject: () => void) => {
    try {
      const res = await fetch(`${API_DOMAIN}/${url}`, {
        method: ApiMethod.POST,
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        reject();
      }

      if (apiDebounceInMs) {
        setTimeout(() => {
          resolve(payload);
        }, apiDebounceInMs);
      } else {
        resolve(payload);
      }
    } catch (error) {
      reject();
    }
  };

  return { postData };
};
