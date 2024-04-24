import { InputType } from '../../components/input/types';

export enum FieldType {
  NameInput = 'nameInput',
  CountrySelect = 'countrySelect',
  AgeInput = 'ageInput',
}

export enum InputKey {
  Name = 'name',
  Country = 'country',
  Age = 'age',
}

export interface FormLayoutResponse {
  key: InputKey;
  fieldType: FieldType;
}

export interface FormContextResponseInput {
  fieldType: FieldType;
  type: InputType;
  label: string;
}

export interface FormContextResponseDropdown extends FormContextResponseInput {
  options: string[];
}

export type FormContextResponse = FormContextResponseInput & FormContextResponseDropdown;
