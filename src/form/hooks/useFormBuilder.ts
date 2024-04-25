import { useMemo } from 'react';
import { GET_FORM_CONTEXT, GET_FORM_LAYOUT } from '../../api';
import { useFetch } from '../../api/hooks/useAPI';
import { FormContextResponse, FormLayoutResponse } from '../../api/types';
import { FormValues, InferedDropdwonComponent, InferedInputComponent } from '../types';
import { useForm } from './useForm';

export const useFormBuilder = () => {
  const { data: formLayoutData, status: formLayoutRequestStatus } = useFetch<FormLayoutResponse[]>({
    url: GET_FORM_LAYOUT,
  });
  const { data: formContextData, status: formContextRequestStatus } = useFetch<
    FormContextResponse[]
  >({
    url: GET_FORM_CONTEXT,
  });

  const formLayoutWithFormContext:
    | (InferedDropdwonComponent | InferedInputComponent | null)[]
    | undefined = useMemo(
    () =>
      formContextData?.map((contextItem) => {
        const layoutItem = formLayoutData?.find(
          (layoutItem) => layoutItem.fieldType === contextItem.fieldType,
        );

        if (!layoutItem?.key) return null;

        return {
          ...contextItem,
          ...layoutItem,
        };
      }),
    [formContextData, formLayoutData],
  );

  /**
   * This is a bit of hacky way to get the Typescript correctly infer the type of the list,
   * and not type cast it, because  using regular route with .filter()
   * it does not recognize that the type of list item can not longer be null.
   * Both approaches have the time complexity of O(n).
   */
  const filteredFormLayoutWithContextList = useMemo(
    () => formLayoutWithFormContext?.flatMap((item) => (item ? [item] : [])),
    [formLayoutWithFormContext],
  );

  return {
    formLayoutWithFormContext: filteredFormLayoutWithContextList,
    formLayoutRequestStatus,
    formContextRequestStatus,
  };
};
