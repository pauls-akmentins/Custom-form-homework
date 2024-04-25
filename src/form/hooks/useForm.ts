import { useState } from 'react';
import { usePost } from '../../api/hooks/useAPI';
import { POST_FORM_DATA } from '../../api';
import { InputType } from '../../components/input/types';
import { ApiStatus } from '../../api/hooks/types';

interface Props<T> {
  defaultValues: T;
  validate?: (formValues: T) => { errors: Partial<Record<keyof T, string>> | null };
}

export const useForm = <T>({ defaultValues, validate }: Props<T>) => {
  const [formValues, setFormValues] = useState<T>(defaultValues);
  const [mockResponse, setMockResponse] = useState<string | null>(null);
  const [formSubmitStatus, setFormSubmitStatus] = useState<ApiStatus>(ApiStatus.DEFAULT);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>> | null>(null);
  const { postData } = usePost<T>({
    url: POST_FORM_DATA,
    apiDebounceInMs: 1000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === InputType.NUMBER ? parseInt(e.target.value) : e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
    setFormSubmitStatus(ApiStatus.DEFAULT);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitStatus(ApiStatus.DEFAULT);

    if (validate) {
      const { errors } = validate(formValues);

      if (errors && Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }
    }

    try {
      setFormSubmitStatus(ApiStatus.LOADING);
      await new Promise<void>((resolve, reject) => {
        const handleResolve = (data: T) => {
          setMockResponse(JSON.stringify(data, null, 2));
          setFormValues(defaultValues);
          setFormSubmitStatus(ApiStatus.SUCCESS);
          resolve();
        };

        postData(formValues, handleResolve, reject);
      });
    } catch (e) {
      setFormSubmitStatus(ApiStatus.ERROR);
    }
  };

  const handleBack = () => {
    setMockResponse(null);
  };

  return {
    formValues,
    errors,
    handleChange,
    handleSubmit,
    handleBack,
    mockResponse,
    isFormSubmitLoading: formSubmitStatus === ApiStatus.LOADING,
    isFormSubmitError: formSubmitStatus === ApiStatus.ERROR,
  };
};
