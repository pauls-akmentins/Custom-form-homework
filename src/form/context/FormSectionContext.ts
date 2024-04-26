import { createContext } from 'react';
import { FormVersion, FormSectionContext as IFormSectionContext } from '../types';

export const FormSectionContext = createContext<IFormSectionContext>({
  activeTab: FormVersion.V1,
  setActiveTab: () => {},
  formLayoutWithFormContext: undefined,
  isFormFetchLoading: true,
  isFormFetchError: false,
});
