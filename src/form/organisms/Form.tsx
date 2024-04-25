import { Flex } from '../../components/flex/Flex';
import { Loader } from '../../components/loader/Loader';
import { defaultFormValuesV1, defaultFormValuesV2 } from '../constants';
import { useForm } from '../hooks/useForm';
import { useFormBuilder } from '../hooks/useFormBuilder';
import { FormLayout } from '../molecules/FormLayout';
import { FormMockResponse } from '../molecules/FormMockResponse';
import { FormValues, FormVersion } from '../types';
import { validateUserForm } from '../utils/validate';
import styles from '../Form.module.css';

interface Props {
  formVersion: FormVersion;
}

export const Form = ({ formVersion }: Props) => {
  const { formLayoutWithFormContext, isFormFetchError, isFormFetchLoading } = useFormBuilder({
    formVersion,
  });
  const {
    formValues,
    mockResponse,
    isFormSubmitError,
    isFormSubmitLoading,
    errors,
    handleChange,
    handleBack,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: formVersion === FormVersion.V1 ? defaultFormValuesV1 : defaultFormValuesV2,
    validate: validateUserForm,
  });

  return (
    <Flex centerHorizontally centerVertically>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Flex directionColumn centerHorizontally centerVertically className={styles.formWrapper}>
          {isFormSubmitLoading || isFormFetchLoading ? (
            <Loader />
          ) : mockResponse ? (
            <FormMockResponse mockResponse={mockResponse} handleBack={handleBack} />
          ) : (
            <FormLayout
              formLayoutWithFormContext={formLayoutWithFormContext}
              formValues={formValues}
              errors={errors}
              handleChange={handleChange}
              isFormFetchError={isFormFetchError}
              isFormSubmitError={isFormSubmitError}
            />
          )}
        </Flex>
      </form>
    </Flex>
  );
};
