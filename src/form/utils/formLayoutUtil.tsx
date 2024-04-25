import { FieldType } from '../../api/types';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { Input } from '../../components/input/Input';
import { InputType } from '../../components/input/types';
import { FormValues, InferedDropdwonComponent, InferedInputComponent } from '../types';

interface FormLayoutUtilProps {
  formLayoutItem: InferedDropdwonComponent | InferedInputComponent;
  formValues: FormValues;
  errors: Partial<Record<keyof FormValues, string>> | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const formLayoutUtil = ({
  formLayoutItem,
  formValues,
  errors,
  handleChange,
}: FormLayoutUtilProps) => {
  const { key, type, ...rest } = formLayoutItem;
  const sharedProps = {
    key,
    name: key,
    onChange: handleChange,
    error: errors?.[key],
    ...rest,
  };

  switch (formLayoutItem.fieldType) {
    case FieldType.CountrySelect: {
      /**
       * Block scoped InferedDropdwonComponent
       * type allows Typescript understand, that this
       * data set will include "options" property.
       */
      const { key, ...rest } = formLayoutItem;

      return <Dropdown value={formValues[key] as string} {...sharedProps} {...rest} />;
    }
    case FieldType.NameInput: {
      return (
        <Input
          type={type as InputType.TEXT}
          value={formValues[key] as string}
          {...sharedProps}
          {...rest}
        />
      );
    }
    case FieldType.AgeInput: {
      return (
        <Input
          type={type as InputType.NUMBER}
          value={formValues[key] as number}
          {...sharedProps}
          {...rest}
        />
      );
    }
    default:
      return null;
  }
};
