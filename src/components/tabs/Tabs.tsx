import { FormVersion } from '../../form/types';
import { Flex } from '../flex/Flex';
import styles from './Tabs.module.css';

interface Props<T> {
  tabsData: { key: T; label: string }[];
  activeTab: T;
  setActiveTab: (tab: T) => void;
}

export const Tabs = <T extends string>({ tabsData, activeTab, setActiveTab }: Props<T>) => {
  const handleTabClick = (tab: T) => {
    setActiveTab(tab);
  };

  return (
    <Flex centerHorizontally centerVertically className={styles.tabsWrapper}>
      <Flex centerHorizontally centerVertically className={styles.tabsContainer}>
        <Flex className={styles.tabList}>
          {tabsData.map((tab) => (
            <div
              key={tab.key}
              className={`${styles.tab} ${tab.key === activeTab ? styles.activeTab : ''}`}
              onClick={() => handleTabClick(tab.key)}
            >
              {tab.label}
            </div>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
