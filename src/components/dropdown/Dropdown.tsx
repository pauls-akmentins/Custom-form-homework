import { Flex } from '../flex/Flex';
import styles from './Dropdown.module.css';
import { DropdownProps } from './types';

export const Dropdown = ({ name, value, onChange, label, options, error }: DropdownProps) => {
  return (
    <Flex directionColumn className={styles.dropdownWrapper}>
      {label ? (
        <label className={`${styles.label} ${(error?.length || 0) > 0 && styles.labelError} `}>
          {label}
        </label>
      ) : null}
      <select
        name={name}
        className={`${styles.input} ${styles.selectInput} ${(error?.length || 0) > 0 && styles.inputError}`}
        value={value}
        onChange={onChange}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className={styles.error}>{error}</span> : null}
    </Flex>
  );
};
