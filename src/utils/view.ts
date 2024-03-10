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

export const makeLabel = (label: string) => {};
