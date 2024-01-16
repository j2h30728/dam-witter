import { useCallback, useState } from 'react';

function useInput(initialInput: string) {
  const [input, setInput] = useState(initialInput);
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(event.target.value);
  }, []);

  const reset = useCallback(() => setInput(initialInput), [initialInput]);
  return [input, onChange, reset] as const;
}

export default useInput;
