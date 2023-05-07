import { useEffect, useState } from "react";

export default function useDebounce(value: string, dealy: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, dealy);
    return () => {
      clearTimeout(timer);
    };
  }, [value, dealy]);

  return debouncedValue;
}
