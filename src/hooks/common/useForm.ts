import { ValidationField, Validator } from '@/libs/client/validators';
import { useState } from 'react';

function useForm<T extends Record<string, any>>(initialForm: T, validators: { [K in keyof T]: Validator<T> }) {
  type ValidatedResult = { [K in keyof T]: ValidationField };

  const [form, setForm] = useState<T>(initialForm);
  const [validatedResult, setValidatedResult] = useState<ValidatedResult>(
    Object.entries(initialForm).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: validators[key](value, initialForm),
      }),
      {} as ValidatedResult
    )
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setForm(prevForm => {
      const updatedForm = { ...prevForm, [name]: value } as T;
      const newValidatedResult: ValidatedResult = {
        ...validatedResult,
        [name]: validators[name](value, updatedForm),
      };
      setValidatedResult(newValidatedResult);
      return updatedForm;
    });
  };
  const reset = () => setForm(initialForm);

  const errorMessage = Object.values(validatedResult)
    .filter(error => !error.isValid)
    .map(error => error.message)
    .filter(error => error);

  const isError = errorMessage.length > 0;

  const getErrorMessage = (key: keyof typeof form) => {
    return form[key] && !validatedResult[key].isValid ? validatedResult[key].message : '';
  };
  return { errorMessage, form, getErrorMessage, isError, onChange, reset, validatedResult };
}

export default useForm;
