import { useFormBuilder } from './hooks/useFormBuilder';
import { ApiStatus } from '../api/hooks/types';
import { FieldType } from '../api/types';
import { Dropdown } from '../components/dropdown/Dropdown';
import { Input } from '../components/input/Input';
import { InputType } from '../components/input/types';
import { FormValues } from './types';
import { useForm } from './hooks/useForm';
import { defaultFormValues } from './constants';

export const Form = () => {
  const { formLayoutWithFormContext, formContextRequestStatus, formLayoutRequestStatus } =
    useFormBuilder();
  const { handleChange, formValues } = useForm<FormValues>({
    defaultValues: defaultFormValues,
  });

  return formContextRequestStatus === ApiStatus.LOADING ||
    formLayoutRequestStatus === ApiStatus.LOADING ? (
    <div>Loading...</div>
  ) : (
    <form>
      {formLayoutWithFormContext?.map((formLayoutItem) => {
        switch (formLayoutItem.fieldType) {
          case FieldType.CountrySelect: {
            const { key, ...rest } = formLayoutItem;
            return (
              <Dropdown
                key={key}
                name={key}
                {...rest}
                onChange={handleChange}
                value={formValues[key] as string}
              />
            );
          }
          case FieldType.NameInput: {
            const { key, type, ...rest } = formLayoutItem;
            return (
              <Input
                key={key}
                name={key}
                type={type as InputType.TEXT}
                onChange={handleChange}
                value={formValues[key] as string}
                {...rest}
              />
            );
          }
          case FieldType.AgeInput: {
            const { key, type, ...rest } = formLayoutItem;
            return (
              <Input<InputType.NUMBER>
                key={key}
                name={key}
                type={type as InputType.NUMBER}
                {...rest}
                onChange={handleChange}
                value={formValues[key] as number}
              />
            );
          }
          default:
            return null;
        }
      })}
    </form>
  );
};
