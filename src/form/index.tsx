import { useFormBuilder } from './hooks/useFormBuilder';
import { FormValues } from './types';
import { useForm } from './hooks/useForm';
import { defaultFormValues } from './constants';
import { Button } from '../components/button/Button';
import styles from './Form.module.css';
import { formLayoutUtil } from './utils/formLayoutUtil';
import { Loader } from '../components/loader/Loader';
import { validateUserForm } from './utils/validate';

export const Form = () => {
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
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.formTitle}>Paynt homework form</h1>
        <div className={styles.formWrapper}>
          {isLoadingFormRendering || isLoadingFormSubmit ? (
            <Loader />
          ) : mockResponse ? (
            <div className={styles.mockContainer}>
              <p className={styles.mockResponseTitle}>For submission was successful!</p>
              <div className={styles.codeContainer}>
                <pre className={styles.mockResponse}>{mockResponse}</pre>
              </div>
              <Button onClick={handleBack} type="button">
                Try again
              </Button>
            </div>
          ) : (
            <div className={styles.formAnimationWrapper}>
              <div className={styles.formFields}>
                {formLayoutWithFormContext?.map((formLayoutItem) =>
                  formLayoutUtil({ formLayoutItem, errors, formValues, handleChange }),
                )}
              </div>
              <Button type="submit">Save</Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
