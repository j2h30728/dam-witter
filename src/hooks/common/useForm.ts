import { useState } from 'react';

type Validator<T> = (
  value: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>['value'],
  entryValues?: T
) => ValidationField;
type ValidationField = { isValid: boolean; message: string };

function useForm<T extends Record<string, any>>(initialForm: T, validators: { [K in keyof T]: Validator<T> }) {
  type ValidatedResult = { [K in keyof T]: ValidationField };

  const [form, setForm] = useState<T>(initialForm);
  const [validatedResult, setValidatedResult] = useState<ValidatedResult>(
    Object.keys(initialForm).reduce(
      (acc, key) => ({
        ...acc,
        [key]: form[key]
          ? { isValid: true, message: '' }
          : { isValid: false, message: `${key}의 입력값을 채워주세요.` },
      }),
      {} as ValidatedResult
    )
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setForm(prevForm => {
      const updatedForm = { ...prevForm, [name]: value };

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
