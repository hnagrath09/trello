import { useState, useEffect } from "react";

const useSavedState = <T extends any>(
  key: string,
  defaultValue?: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(
    defaultValue || JSON.parse(localStorage.getItem(key) || "")
  );

  useEffect(() => {
    if (state) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state, key]);

  return [state, setState];
};

export default useSavedState;
