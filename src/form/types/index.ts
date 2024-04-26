import {
  FieldType,
  FormContextResponseDropdown,
  FormContextResponseInput,
  FormLayoutResponse,
} from '../../api/types';

export interface GeneralInferedComponentProps<T> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  value: T;
}

export type InferedDropdwonComponent = FormContextResponseDropdown &
  FormLayoutResponse & {
    fieldType: FieldType.CountrySelect | FieldType.CountryInput;
  };

export type InferedInputComponent = FormContextResponseInput &
  FormLayoutResponse & {
    fieldType: FieldType.NameInput | FieldType.AgeInput;
  };

export enum FormKey {
  Name = 'name',
  Country = 'country',
  Age = 'age',
}

export interface FormValues {
  [FormKey.Name]: string;
  [FormKey.Country]: string;
  [FormKey.Age]: number | string;
}

export enum FormStatus {
  DEFAULT = 'DEFAULT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
}

export enum FormVersion {
  V1 = 'V1',
  V2 = 'V2',
}

export interface Tab {
  key: FormVersion;
  label: string;
}

export interface FormSectionContext {
  formLayoutWithFormContext?: (InferedDropdwonComponent | InferedInputComponent)[];
  isFormFetchError: boolean;
  isFormFetchLoading: boolean;
  activeTab: FormVersion;
  setActiveTab: (tab: FormVersion) => void;
}
