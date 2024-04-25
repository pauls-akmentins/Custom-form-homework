import { InputType } from './types';
import { InputProps } from './types';
import styles from './Input.module.css';

export const Input = <T extends InputType>({
  type,
  name,
  value,
  onChange,
  label,
}: InputProps<T>) => {
  return (
    <div className={styles.inputWrapper}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <input
        type={type}
        name={name}
        className={`${styles.input} ${type === InputType.NUMBER ? styles.numberInput : styles.textInput}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
