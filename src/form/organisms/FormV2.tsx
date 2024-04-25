import { Flex } from '../../components/flex/Flex';
import { Form } from './Form';
import styles from '../Form.module.css';
import { FormVersion } from '../types';
import Tooltip from '../../components/tooltip/Tooltip';
import { InfoIcon } from '../../assets/icons/InfoIcon';

const DISCLAIMER_CONTENT_V2 = `This form v1 version does not include workaround for country selection dropdown mapping.`;

export const FormV2 = () => {
  return (
    <Flex centerHorizontally centerVertically directionColumn>
      <Flex centerVertically className={styles.titleWrapper}>
        <p className={styles.formTitle}>Paynt homework form V2</p>
        <Tooltip content={DISCLAIMER_CONTENT_V2}>
          <InfoIcon height={16} width={16} className={styles.infoIcon} />
        </Tooltip>
      </Flex>
      <Form formVersion={FormVersion.V2} />
    </Flex>
  );
};
