import { FormValues } from '../types';

export const validateUserForm = (formValues: FormValues) => {
  const { name, age, country } = formValues;
  const errors: Partial<Record<keyof FormValues, string>> | null = {};

  if (!name) {
    errors.name = 'Name is required';
  } else if (name.length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }

  if (!age || typeof age === 'string') {
    errors.age = 'Age is required';
  } else if (age < 1 || age > 150) {
    errors.age = 'Age must be between 1 and 150';
  }

  if (!country) {
    errors.country = 'Country is required';
  } else if (!['LV', 'EE', 'LT'].includes(country)) {
    errors.country = 'Country must be LV, EE, or LT';
  }

  return { errors };
};
