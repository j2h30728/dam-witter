import { useState } from 'react';

type Validator = (
  value: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>['value'],
  subValue?: Record<string, any>
) => Errors;
type Errors = { isValid: boolean; message: string };
type NewError = Record<string, Errors>;

function useForm<T extends Record<string, any>>(initialForm: T, validators: Record<string, Validator>) {
  const [form, setForm] = useState<Record<string, string>>(initialForm);
  const [errors, setErrors] = useState<Record<string, Errors>>(
    Object.keys(initialForm).reduce(
      (acc, key) => ({
        ...acc,
        [key]: form[key]
          ? { isValid: true, message: '' }
          : { isValid: false, message: `${key}의 입력값을 채워주세요.` },
      }),
      {}
    )
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm(prevForm => {
      const updatedForm = { ...prevForm, [name]: value };
      const newErrors: NewError = {};
      Object.entries(updatedForm).forEach(([fieldName, fieldValue]) => {
        if (validators[fieldName]) {
          newErrors[fieldName] = validators[fieldName](fieldValue, updatedForm);
        }
      });
      setErrors(newErrors);
      return updatedForm;
    });
  };
  const reset = () => setForm(initialForm);

  const errorMessage = Object.values(errors)
    .filter(error => !error.isValid)
    .map(error => error.message)
    .filter(error => error);

  const isError = errorMessage.length > 0;

  return { errorMessage, errors, form, isError, onChange, reset };
}

export default useForm;
