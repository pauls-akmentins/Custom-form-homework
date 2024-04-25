import { useFormBuilder } from './hooks/useFormBuilder';
import { FormStatus, FormValues } from './types';
import { useForm } from './hooks/useForm';
import { defaultFormValues } from './constants';
import { Button } from '../components/button/Button';
import styles from './Form.module.css';
import { formLayoutUtil } from './utils/formLayoutUtil';
import { Loader } from '../components/loader/Loader';

export const Form = () => {
  const { formLayoutWithFormContext, isLoadingFormRendering } = useFormBuilder();
  const { handleChange, handleSubmit, formValues, isLoadingFormSubmit, mockResponse } =
    useForm<FormValues>({
      defaultValues: defaultFormValues,
    });

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.formTitle}>Paynt homework form</h1>
        <div className={styles.formWrapper}>
          {isLoadingFormRendering || isLoadingFormSubmit ? (
            <Loader />
          ) : mockResponse ? (
            <>
              <p className={styles.mockResponseTitle}>For submission was successful!</p>
              <div className={styles.codeContainer}>
                <pre className={styles.mockResponse}>{mockResponse}</pre>
              </div>
            </>
          ) : (
            <div className={styles.formAnimationWrapper}>
              <div className={styles.formFields}>
                {formLayoutWithFormContext?.map((formLayoutItem) =>
                  formLayoutUtil({ formLayoutItem, formValues, handleChange }),
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
