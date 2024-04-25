import { useState } from 'react';
import styles from './Tooltip.module.css';

interface Props {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip = ({ content, children }: Props) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState<boolean>(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 200);
  };

  const hideTip = () => {
    clearTimeout(timeout);
    setActive(false);
  };

  return (
    <div className={styles.tooltipWrapper} onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active ? <div className={`${styles.tooltipDisclaimer} ${styles.top}`}>{content}</div> : null}
    </div>
  );
};

export default Tooltip;
