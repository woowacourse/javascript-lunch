import BasicModal from '@/components/BasicModal/BasicModal';

export const hideErrorMessage = () => {
  document.querySelectorAll('.error').forEach((el) => {
    el.classList.add('hidden');
  });
};

export const closeModal = (modal: HTMLElement) => {
  hideErrorMessage();
  modal.classList.remove('modal--open');
  BasicModal.blockModalBodyScroll();
};

export const makeLabel = ({ htmlFor, text }: { htmlFor: string; text: string }) => {
  const $label = document.createElement('label');
  $label.setAttribute('for', htmlFor);
  $label.textContent = text;
  return $label;
};
