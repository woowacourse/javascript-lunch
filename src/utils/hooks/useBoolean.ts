import { useState } from '../core';

function useBoolean(initial: boolean): [boolean, () => void, () => void] {
  const [boolean, setBoolean] = useState(initial);

  const setTrue = () => {
    setBoolean(true);
  };
  const setFalse = () => {
    setBoolean(false);
  };

  return [boolean, setTrue, setFalse];
}

export { useBoolean };
