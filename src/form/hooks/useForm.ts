import { useState } from 'react';
import { usePost } from '../../api/hooks/useAPI';
import { POST_FORM_DATA } from '../../api';

interface Props<T> {
  defaultValues: T;
}

export const useForm = <T>({ defaultValues }: Props<T>) => {
  const [formValues, setFormValues] = useState<T>(defaultValues);
  const { postData, status } = usePost<T>({ url: POST_FORM_DATA });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    // validation

    // show error is any

    // postData
    try {
      const data = await postData(formValues);
      // show success message as JSON data
    } catch (e) {}
  };

  return { formValues, handleChange, status };
};
