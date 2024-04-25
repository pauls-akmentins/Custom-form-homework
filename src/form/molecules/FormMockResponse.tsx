import { Button } from '../../components/button/Button';
import { Flex } from '../../components/flex/Flex';
import styles from '../Form.module.css';

interface Props {
  mockResponse: string;
  handleBack: () => void;
}

export const FormMockResponse = ({ mockResponse, handleBack }: Props) => {
  return (
    <Flex centerHorizontally centerVertically directionColumn className={styles.mockContainer}>
      <p className={styles.mockResponseTitle}>For submission was successful!</p>
      <div className={styles.codeContainer}>
        <pre className={styles.mockResponse}>{mockResponse}</pre>
      </div>
      <Button onClick={handleBack} type="button">
        Try again
      </Button>
    </Flex>
  );
};
