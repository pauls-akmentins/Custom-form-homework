import { InputType } from './types';
import { InputProps } from './types';
import styles from './Input.module.css';

export const Input = <T extends InputType>({
  type,
  name,
  value,
  onChange,
  label,
  error,
}: InputProps<T>) => {
  return (
    <div className={styles.inputWrapper}>
      {label ? (
        <label className={`${styles.label} ${(error?.length || 0) > 0 && styles.labelError} `}>
          {label}
        </label>
      ) : null}
      <input
        type={type}
        name={name}
        className={`${styles.input} ${type === InputType.NUMBER ? styles.numberInput : styles.textInput} ${(error?.length || 0) > 0 && styles.inputError}`}
        value={value}
        onChange={onChange}
      />
      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  );
};
