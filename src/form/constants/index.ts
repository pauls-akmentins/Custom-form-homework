import { FormV1 } from '../organisms/FormV1';
import { FormV2 } from '../organisms/FormV2';
import { FormValues, FormVersion, Tab } from '../types';

export const defaultFormValuesV1: FormValues = {
  age: '',
  name: '',
  country: 'LV',
};

export const defaultFormValuesV2: FormValues = {
  age: '',
  name: '',
  country: '',
};

export const tabs: Tab[] = [
  {
    key: FormVersion.V1,
    label: 'Form V1',
  },
  {
    key: FormVersion.V2,
    label: 'Form V2',
  },
];

export const formConfig = {
  [FormVersion.V1]: FormV1,
  [FormVersion.V2]: FormV2,
};
