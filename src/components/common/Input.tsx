import { parameterToString } from '@/libs/client/utils';

export default function Input({
  errorMassage,
  name,
  onChange,
  placeholder,
  title,
  type,
  value,
}: {
  errorMassage?: false | string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  title: string;
  type: 'email' | 'password' | 'text';
  value: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between w-full">
        <label className="w-3/5 text-lg font-semibold" htmlFor={name}>
          {title}
        </label>
        <input
          className={parameterToString(
            'w-full px-3 py-1 rounded-md ',
            errorMassage ? 'border-2 border-red-500' : 'border border-stone-500'
          )}
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required
          type={type}
          value={value}
        />
      </div>
      <p className="h-6 mb-1 text-red-500">{errorMassage ? errorMassage : ''}</p>
    </div>
  );
}
