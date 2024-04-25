import { useEffect, useMemo, useState } from 'react';
import { GET_FORM_CONTEXT, GET_FORM_LAYOUT } from '../../api';
import { useFetch } from '../../api/hooks/useAPI';
import { FormContextResponse, FormLayoutResponse } from '../../api/types';
import { FormVersion, InferedDropdwonComponent, InferedInputComponent } from '../types';
import { ApiStatus } from '../../api/hooks/types';

interface Props {
  formVersion: FormVersion;
}

export const useFormBuilder = ({ formVersion = FormVersion.V1 }: Props) => {
  const [formLayoutRequestStatus, setFormLayoutRequestStatus] = useState<ApiStatus>(
    ApiStatus.DEFAULT,
  );
  const [formContextRequestStatus, setFormContextRequestStatus] = useState<ApiStatus>(
    ApiStatus.DEFAULT,
  );
  const [formLayoutData, setFormLayoutData] = useState<FormLayoutResponse[] | null>(null);
  const [formContextData, setFormContextData] = useState<FormContextResponse[] | null>(null);
  const { fetchData: fetchFormLayoutData } = useFetch<FormLayoutResponse[]>({
    url: GET_FORM_LAYOUT,
    apiDebounceInMs: 1000,
  });
  const { fetchData: fetchFormContextData } = useFetch<FormContextResponse[]>({
    url: GET_FORM_CONTEXT,
    apiDebounceInMs: 1000,
  });

  const handleFetchFormLayoutData = async () => {
    try {
      setFormLayoutRequestStatus(ApiStatus.LOADING);
      await new Promise<void>((resolve, reject) => {
        const handleResolve = (data: FormLayoutResponse[]) => {
          setFormLayoutData(data);
          setFormLayoutRequestStatus(ApiStatus.SUCCESS);
          resolve();
        };

        fetchFormLayoutData(handleResolve, reject);
      });
    } catch (e) {
      setFormLayoutRequestStatus(ApiStatus.ERROR);
    }
  };

  const handleFetchFormContextData = async () => {
    try {
      setFormContextRequestStatus(ApiStatus.LOADING);
      await new Promise<void>((resolve, reject) => {
        const handleResolve = (data: FormContextResponse[]) => {
          setFormContextData(data);
          setFormContextRequestStatus(ApiStatus.SUCCESS);
          resolve();
        };

        fetchFormContextData(handleResolve, reject);
      });
    } catch (e) {
      setFormContextRequestStatus(ApiStatus.ERROR);
    }
  };

  useEffect(() => {
    handleFetchFormLayoutData();
    handleFetchFormContextData();
  }, []);

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

  return {
    formLayoutWithFormContext:
      formVersion === FormVersion.V1
        ? filteredFormLayoutWithContextListV1
        : filteredFormLayoutWithContextListV2,
    isFormFetchLoading:
      formLayoutRequestStatus === ApiStatus.LOADING ||
      formContextRequestStatus === ApiStatus.LOADING,
    isFormFetchError:
      formLayoutRequestStatus === ApiStatus.ERROR || formContextRequestStatus === ApiStatus.ERROR,
  };
};
