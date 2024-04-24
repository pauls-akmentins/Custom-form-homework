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
    fieldType: FieldType.CountrySelect;
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
  [FormKey.Age]: number | null;
}
