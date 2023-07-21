import { useEffect, useState } from 'react';

type Validator = (
  value: React.InputHTMLAttributes<HTMLInputElement>['value'],
  subValue?: Record<string, any>
) => Errors;
type Errors = { isValid: boolean; message: string };

function useForm<T extends Record<string, any>>(initialForm: T, validators: Record<string, Validator>) {
  const [form, setForm] = useState<Record<string, any>>(initialForm);
  const [errors, setErrors] = useState<Record<string, Errors>>(initialForm);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(prevForm => {
      const updatedForm = { ...prevForm, [name]: value };
      const newErrors: Record<string, Errors> = {};
      Object.entries(updatedForm).forEach(([fieldName, fieldValue]) => {
        if (validators[fieldName]) {
          newErrors[fieldName] = validators[fieldName](fieldValue, updatedForm);
        }
      });
      setErrors(newErrors);
      return updatedForm;
    });
  };
  const isErrors = Object.entries(errors).filter(([_, value]) => !value.isValid).length > 0;
  const reset = () => setForm(initialForm);
  return { errors, form, isErrors, onChange, reset };
}

export default useForm;
