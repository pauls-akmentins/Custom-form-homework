import styles from './Button.module.css';

interface Props {
  children: React.ReactNode;
  type: 'submit' | 'button';
  onClick?: () => void;
}

export const Button = ({ children, onClick, type }: Props) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
