import { Flex } from '../../components/flex/Flex';
import { Form } from './Form';
import styles from '../Form.module.css';

export const FormV1 = () => {
  return (
    <Flex centerHorizontally centerVertically directionColumn>
      <p className={styles.formTitle}>Paynt homework form</p>
      <Form formVersion={'1'} />
    </Flex>
  );
};
