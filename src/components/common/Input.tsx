import { parameterToString } from '@/libs/client/utils';

export default function Input({
  disabled,
  errorMassage,
  isEditMode = false,
  name,
  onChange,
  placeholder,
  title,
  type,
  value,
}: {
  disabled: boolean;
  errorMassage?: false | string;
  isEditMode?: boolean;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  title: string;
  type: 'email' | 'password' | 'text';
  value: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {!isEditMode ? (
        <div className="flex justify-between w-full">
          <label className="w-3/5 text-lg font-semibold" htmlFor={name}>
            {title}
          </label>
          <input
            className={parameterToString(
              'w-full px-3 h-9 rounded-md ',
              errorMassage ? 'border-2 border-red-500' : 'border border-stone-500'
            )}
            disabled={disabled}
            id={name}
            inputMode={type === 'email' ? 'email' : 'text'}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            required
            type={type}
            value={value}
          />
        </div>
      ) : (
        <input
          className="mt-2 text-3xl font-bold"
          disabled={disabled}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          title={title}
          type="text"
          value={value}
        />
      )}
      <p className="h-6 mb-1 text-red-500">{errorMassage ? errorMassage : ''}</p>
    </div>
  );
}
