import { useState } from 'react';

interface Props<T> {
  defaultValues: T;
}

export const useForm = <T>({ defaultValues }: Props<T>) => {
  const [formValues, setFormValues] = useState<T>(defaultValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return { formValues, handleChange };
};
