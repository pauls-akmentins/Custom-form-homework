import styles from './Flex.module.css';

interface Props {
  children: React.ReactNode;
  centerVertically?: boolean;
  centerHorizontally?: boolean;
  directionColumn?: boolean;
  className?: string;
}

export const Flex = ({
  children,
  className,
  centerVertically,
  centerHorizontally,
  directionColumn,
}: Props) => {
  return (
    <div
      className={`${className ? className : ''} ${styles.flex} ${centerVertically ? styles.centerVertically : ''} ${centerHorizontally ? styles.centerHorizontally : ''} ${directionColumn ? styles.directionColumn : ''}`}
    >
      {children}
    </div>
  );
};
