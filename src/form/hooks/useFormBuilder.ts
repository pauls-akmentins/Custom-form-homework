import { useMemo } from 'react';
import { GET_FORM_CONTEXT, GET_FORM_LAYOUT } from '../../api';
import { useFetch } from '../../api/hooks/useAPI';
import { FormContextResponse, FormLayoutResponse } from '../../api/types';
import { FormVersion, InferedDropdwonComponent, InferedInputComponent } from '../types';
import { ApiStatus } from '../../api/hooks/types';

interface Props {
  formVersion: FormVersion;
}

export const useFormBuilder = ({ formVersion = FormVersion.V1 }: Props) => {
  const { data: formLayoutData, status: formLayoutRequestStatus } = useFetch<FormLayoutResponse[]>({
    url: GET_FORM_LAYOUT,
    apiDebouceInMs: 1000,
  });
  const { data: formContextData, status: formContextRequestStatus } = useFetch<
    FormContextResponse[]
  >({
    url: GET_FORM_CONTEXT,
    apiDebouceInMs: 1000,
  });

  const formLayoutWithFormContextV1:
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

  const formLayoutWithFormContextV2:
    | (InferedDropdwonComponent | InferedInputComponent | null)[]
    | undefined = useMemo(
    () =>
      formContextData?.map((contextItem) => {
        const layoutItem = formLayoutData?.find(
          (layoutItem) =>
            layoutItem.fieldType === contextItem.fieldType ||
            (layoutItem.fieldType === 'countryInput' && contextItem.fieldType === 'countrySelect'),
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
  const filteredFormLayoutWithContextListV1 = useMemo(
    () => formLayoutWithFormContextV1?.flatMap((item) => (item ? [item] : [])),
    [formLayoutWithFormContextV1],
  );

  const filteredFormLayoutWithContextListV2 = useMemo(
    () => formLayoutWithFormContextV2?.flatMap((item) => (item ? [item] : [])),
    [formLayoutWithFormContextV2],
  );

  const isLoadingFormRendering =
    formLayoutRequestStatus === ApiStatus.LOADING || formContextRequestStatus === ApiStatus.LOADING;

  return {
    formLayoutWithFormContext:
      formVersion === FormVersion.V1
        ? filteredFormLayoutWithContextListV1
        : filteredFormLayoutWithContextListV2,
    isLoadingFormRendering,
  };
};
