import { useCallback, useRef, useState } from 'react';

export function useStateWithRef<T>(initialValue?: T) {
  const [value, setValue] = useState(initialValue);
  const ref = useRef(initialValue);

  const actualSetValue = useCallback((newValue?: T) => {
    setValue(newValue);
    ref.current = newValue;
  }, []);

  return [value, ref, actualSetValue] as const;
}
