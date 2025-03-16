import useBoolean from './useBoolean';

function useModal(initialValue: boolean): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen, setIsClose] = useBoolean(initialValue);

  const open = () => {
    setIsOpen();
  };

  const close = () => {
    setIsClose();
  };

  return [isOpen, open, close];
}

export default useModal;
