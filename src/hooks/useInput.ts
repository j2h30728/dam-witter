import { useCallback, useState } from 'react';

function useInputs<T extends Record<string, any>>(initialForm: T) {
  const [form, setForm] = useState(initialForm);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value }) as T);
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset] as const;
}

export default useInputs;
