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

type CombinedInput<T extends InputType> = T extends InputType.TEXT ? StringInput : NumberInput;

export type InputProps<T extends InputType> = CombinedInput<T> & {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  label?: string;
  error?: string;
};
