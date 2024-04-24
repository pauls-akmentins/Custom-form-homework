import styles from './Dropdown.module.css';
import { DropdownProps } from './types';

export const Dropdown = ({ name, value, onChange, label, options }: DropdownProps) => {
  return (
    <>
      {label ? <label className={styles.label}>{label}</label> : null}
      <select
        name={name}
        className={`${styles.input} ${styles.selectInput}`}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
