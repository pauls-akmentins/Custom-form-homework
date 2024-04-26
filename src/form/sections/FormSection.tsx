import { Flex } from '../../components/flex/Flex';
import styles from '../Form.module.css';
import { Tabs } from '../../components/tabs/Tabs';
import { formConfig, tabs } from '../constants';
import { createElement } from 'react';
import { useFormSection } from '../hooks/useFormSection';
import { FormSectionContext } from '../context/FormSectionContext';

export const FormSection = () => {
  const props = useFormSection();

  return (
    <FormSectionContext.Provider value={props}>
      <Flex className={styles.formContainer} centerHorizontally centerVertically directionColumn>
        {createElement(formConfig[props.activeTab])}
        <Tabs tabsData={tabs} activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
      </Flex>
    </FormSectionContext.Provider>
  );
};
