export default function Input({
  name,
  onChange,
  placeholder,
  title,
  type,
  value,
}: {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  title: string;
  type: 'email' | 'password' | 'text';
  value: string;
}) {
  return (
    <div>
      <label htmlFor={name}>{title}</label>
      <input id={name} name={name} onChange={onChange} placeholder={placeholder} type={type} value={value} />
    </div>
  );
}
