import { useState } from '../utils/core/Core';

function useBoolean(initialValue: boolean): [boolean, () => void, () => void] {
  const [value, setValue] = useState(initialValue);

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  return [value, setTrue, setFalse];
}

export default useBoolean;
