import { FieldType } from '../../api/types';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { Input } from '../../components/input/Input';
import { InputType } from '../../components/input/types';
import { FormValues, InferedDropdwonComponent, InferedInputComponent } from '../types';

interface FormLayoutUtilProps {
  formLayoutItem: InferedDropdwonComponent | InferedInputComponent;
  formValues: FormValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const formLayoutUtil = ({
  formLayoutItem,
  formValues,
  handleChange,
}: FormLayoutUtilProps) => {
  const { key, type, ...rest } = formLayoutItem;

  switch (formLayoutItem.fieldType) {
    case FieldType.CountrySelect: {
      /**
       * Block scoped InferedDropdwonComponent
       * type allows Typescript understand, that this
       * data set will include "options" property.
       */
      const { key, ...rest } = formLayoutItem;

      return (
        <Dropdown
          key={key}
          name={key}
          value={formValues[key] as string}
          onChange={handleChange}
          {...rest}
        />
      );
    }
    case FieldType.NameInput: {
      return (
        <Input
          key={key}
          name={key}
          type={type as InputType.TEXT}
          value={formValues[key] as string}
          onChange={handleChange}
          {...rest}
        />
      );
    }
    case FieldType.AgeInput: {
      return (
        <Input<InputType.NUMBER>
          key={key}
          name={key}
          type={type as InputType.NUMBER}
          value={formValues[key] as number}
          onChange={handleChange}
          {...rest}
        />
      );
    }
    default:
      return null;
  }
};
