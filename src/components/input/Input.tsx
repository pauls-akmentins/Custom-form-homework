import { InputType } from './types';
import { InputProps } from './types';
import styles from './Input.module.css';

export const Input = <T extends InputType>({ type, value, onChange, label }: InputProps<T>) => {
  return (
    <>
      {label ? <label className={styles.label}>{label}</label> : null}
      <input
        type={type}
        className={`${styles.input} ${type === InputType.NUMBER ? styles.numberInput : styles.textInput}`}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
