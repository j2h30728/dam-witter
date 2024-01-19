import { ComponentPropsWithoutRef } from 'react';

export default function Textarea({
  disabled,
  name,
  onChange,
  placeholder,
  required = false,
  value,
}: ComponentPropsWithoutRef<'textarea'>) {
  return (
    <div className="flex flex-col w-full gap-3">
      <textarea
        className="h-40 p-2 my-10 text-lg border-2 resize-none rounded-xl border-stone-200"
        disabled={disabled}
        inputMode="text"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        value={value}
      />
    </div>
  );
}
