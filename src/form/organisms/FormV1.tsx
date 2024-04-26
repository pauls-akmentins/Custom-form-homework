import { Flex } from '../../components/flex/Flex';
import { Form } from './Form';
import styles from '../Form.module.css';
import { FormVersion } from '../types';
import Tooltip from '../../components/tooltip/Tooltip';
import { InfoIcon } from '../../assets/icons/InfoIcon';

const DISCLAIMER_CONTENT_V1 = (
  <>
    "Form V1" version does not include workaround for country input layout and context data mapping.
    <br />
    Because of a small typo in API response, the form layout data can not be matched with form
    context data.
  </>
);

export const FormV1 = () => {
  return (
    <Flex centerHorizontally centerVertically directionColumn>
      <Flex centerVertically className={styles.titleWrapper}>
        <p className={styles.formTitle}>Paynt homework form V1</p>
        <Tooltip content={DISCLAIMER_CONTENT_V1}>
          <InfoIcon height={16} width={16} className={styles.infoIcon} />
        </Tooltip>
      </Flex>
      <Form formVersion={FormVersion.V1} />
    </Flex>
  );
};
