export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
}

interface StringInput {
  type: InputType.TEXT;
  value: string;
}

interface NumberInput {
  type: InputType.NUMBER;
  value: number | string;
}

// Define a conditional type to represent the combined input type
type CombinedInput<T extends InputType> = T extends InputType.TEXT ? StringInput : NumberInput;

// Define the InputProps type with the combined input type
export type InputProps<T extends InputType> = CombinedInput<T> & {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  label?: string;
};
