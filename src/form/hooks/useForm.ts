import { useState } from 'react';
import { usePost } from '../../api/hooks/useAPI';
import { POST_FORM_DATA } from '../../api';
import { InputType } from '../../components/input/types';
import { FormStatus } from '../types';
import { ApiStatus } from '../../api/hooks/types';
interface Props<T> {
  defaultValues: T;
}

export const useForm = <T>({ defaultValues }: Props<T>) => {
  const [formValues, setFormValues] = useState<T>(defaultValues);
  const [mockResponse, setMockResponse] = useState<string | null>(null);
  const { postData, status: formSubmitStatus } = usePost<T>({
    url: POST_FORM_DATA,
    apiDebouceInMs: 1000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === InputType.NUMBER ? parseInt(e.target.value) : e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validation

    // show error is any and return

    try {
      const mockResponse = await postData(formValues);
      setMockResponse(JSON.stringify(mockResponse, null, 2));
    } catch (e) {
      //
    }
  };

  return {
    formValues,
    handleChange,
    handleSubmit,
    isLoadingFormSubmit: formSubmitStatus === ApiStatus.LOADING,
    mockResponse,
  };
};
