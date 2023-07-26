import { parameterToString } from '@/libs/client/utils';

export default function Textarea({
  disabled,
  errorMassage,
  name,
  onChange,
  placeholder,
  required = false,
  textareaStyle,
  value,
}: {
  disabled: boolean;
  errorMassage?: false | string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  textareaStyle: string;
  value: string;
}) {
  return (
    <div className="flex flex-col w-full gap-3">
      <textarea
        className={parameterToString(
          textareaStyle,
          errorMassage ? 'border-2 border-red-500' : 'border border-stone-500'
        )}
        disabled={disabled}
        inputMode="text"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        value={value}
      />
      <p className="h-6 mb-1 text-red-500 pl-7">{errorMassage ? errorMassage : ''}</p>
    </div>
  );
}
