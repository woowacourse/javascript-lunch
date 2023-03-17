import { useBoolean } from './useBoolean';

function useModal(initial: boolean): [boolean, VoidFunction, VoidFunction] {
  const [value, setTrue, setFalse] = useBoolean(initial);

  const openModal = () => {
    document.body.classList.add('scroll--hidden');
    setTrue();
  };

  const closeModal = () => {
    document.body.classList.remove('scroll--hidden');
    setFalse();
  };

  return [value, openModal, closeModal];
}

export { useModal };
