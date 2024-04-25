import { Button } from '../../components/button/Button';
import { Flex } from '../../components/flex/Flex';
import { Loader } from '../../components/loader/Loader';
import { defaultFormValues } from '../constants';
import { useForm } from '../hooks/useForm';
import { useFormBuilder } from '../hooks/useFormBuilder';
import { FormLayout } from '../molecules/FormLayout';
import { FormMockResponse } from '../molecules/FormMockResponse';
import { FormValues } from '../types';
import { formLayoutUtil } from '../utils/formLayoutUtil';
import { validateUserForm } from '../utils/validate';
import styles from '../Form.module.css';

interface Props {
  formVersion: string;
}

export const Form = ({ formVersion }: Props) => {
  const { formLayoutWithFormContext, isLoadingFormRendering } = useFormBuilder();
  const {
    handleChange,
    handleBack,
    handleSubmit,
    formValues,
    isLoadingFormSubmit,
    mockResponse,
    errors,
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    validate: validateUserForm,
  });

  return (
    <Flex className={styles.formContainer} centerHorizontally centerVertically>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Flex directionColumn centerHorizontally centerVertically className={styles.formWrapper}>
          {isLoadingFormRendering || isLoadingFormSubmit ? (
            <Loader />
          ) : mockResponse ? (
            <FormMockResponse mockResponse={mockResponse} handleBack={handleBack} />
          ) : (
            <FormLayout
              formLayoutWithFormContext={formLayoutWithFormContext}
              formValues={formValues}
              errors={errors}
              handleChange={handleChange}
            />
          )}
        </Flex>
      </form>
    </Flex>
  );
};
