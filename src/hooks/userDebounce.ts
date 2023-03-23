import { useEffect, useState } from "react";

export default function useDebounce(value: string, dealy: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("start");
      setDebouncedValue(value);
    }, dealy);
    return () => {
      console.log("unmoute");
      clearTimeout(timer);
    };
  }, [value, dealy]);

  return debouncedValue;
}
