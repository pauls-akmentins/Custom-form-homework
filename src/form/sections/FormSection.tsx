import { Flex } from '../../components/flex/Flex';
import styles from '../Form.module.css';
import { Tabs } from '../../components/tabs/Tabs';
import { useTabs } from '../hooks/useTabs';
import { formConfig, tabs } from '../constants';
import { createElement } from 'react';

export const FormSection = () => {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <Flex className={styles.formContainer} centerHorizontally centerVertically directionColumn>
      {createElement(formConfig[activeTab])}
      <Tabs tabsData={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </Flex>
  );
};
