import { parameterToString } from '@/libs/client';
import { ComponentPropsWithoutRef } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  errorMassage?: string;
  isValidated?: boolean;
  label?: string;
}

const Input = ({
  disabled,
  errorMassage,
  isValidated = false,
  label,
  name,
  onChange,
  placeholder,
  type = 'text',
  value,
  ...props
}: InputProps) => {
  return (
    <div className="flex justify-between w-full">
      {label && (
        <label
          className={parameterToString(
            'flex mr-3 font-bold text-md',
            isValidated ? 'pt-1 w-2/5' : 'w-1/5  items-center justify-center'
          )}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="w-full">
        <input
          className={parameterToString(
            'w-full px-3 h-9 rounded-md ',
            errorMassage ? 'border-2 border-red-500 text-xs' : 'border border-stone-500'
          )}
          disabled={disabled}
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required
          type={type}
          value={value}
          {...props}
        />
        {isValidated && <p className="h-6 my-1 text-sm text-red-500">{errorMassage}</p>}
      </div>
    </div>
  );
};

export default Input;
