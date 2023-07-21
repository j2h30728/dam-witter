export default function Textarea({
  name,
  onChange,
  placeholder,
  title,
  value,
}: {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  title: string;
  value: string;
}) {
  return (
    <div>
      <label htmlFor={name}>{title}</label>
      <textarea id={name} name={name} onChange={onChange} placeholder={placeholder} value={value} />
    </div>
  );
}
