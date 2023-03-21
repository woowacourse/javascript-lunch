import { useBoolean } from './useBoolean';

function useModal(initial: boolean): [boolean, VoidFunction, VoidFunction] {
  const [value, setTrue, setFalse] = useBoolean(initial);

  const openModal = () => {
    /** @description add overflow-y: hidden */
    document.body.classList.add('scroll--hidden');
    setTrue();
  };

  const closeModal = () => {
    /** @description remove overflow-y: hidden */
    document.body.classList.remove('scroll--hidden');
    setFalse();
  };

  return [value, openModal, closeModal];
}

export { useModal };
