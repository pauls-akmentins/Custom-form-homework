import { Button } from '../../components/button/Button';
import { Flex } from '../../components/flex/Flex';
import { FormValues, InferedDropdwonComponent, InferedInputComponent } from '../types';
import { formLayoutUtil } from '../utils/formLayoutUtil';
import styles from '../Form.module.css';

interface Props {
  formLayoutWithFormContext: (InferedDropdwonComponent | InferedInputComponent)[] | undefined;
  errors: Partial<Record<keyof FormValues, string>> | null;
  formValues: FormValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const FormLayout = ({
  formLayoutWithFormContext,
  errors,
  formValues,
  handleChange,
}: Props) => {
  return (
    <Flex
      directionColumn
      centerHorizontally
      centerVertically
      className={styles.formAnimationWrapper}
    >
      <Flex centerHorizontally centerVertically directionColumn className={styles.formFields}>
        {formLayoutWithFormContext?.map((formLayoutItem) =>
          formLayoutUtil({ formLayoutItem, errors, formValues, handleChange }),
        )}
      </Flex>
      <Button type="submit">Save</Button>
    </Flex>
  );
};
