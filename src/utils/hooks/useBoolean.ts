import { useState } from '../core';

function useBoolean(initial: boolean): [boolean, VoidFunction, VoidFunction] {
  const [boolean, setBoolean] = useState(initial);

  /** @description setValue to true */
  const setTrue = () => {
    setBoolean(true);
  };

  /** @description setValue to false */
  const setFalse = () => {
    setBoolean(false);
  };

  return [boolean, setTrue, setFalse];
}

export { useBoolean };
