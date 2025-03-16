import { selectElements } from '../utils/dom.ts';
import resetForm from './resetForm.ts';

function closeModal() {
  const closeButtons = selectElements('.close-modal-button');
  const modalBackdrops = selectElements('.modal-backdrop');

  const handleCloseButtonClick = (event: Event) => {
    const target = event.target as HTMLDivElement;
    const targetModal = target.closest('.modal') as HTMLDivElement;

    resetForm();
    targetModal.classList.remove('modal--open');
  };

  const handleBackdropClick = (event: Event) => {
    const target = event.target as HTMLDivElement;
    const targetModal = target.closest('.modal') as HTMLDivElement;

    resetForm();
    targetModal.classList.remove('modal--open');
  };

  const handleEscapeKeydown = (event: KeyboardEvent) => {
    const openedModals = [...selectElements('.modal--open')];
    if (event.key === 'Escape' && openedModals.length > 0) {
      const targetModal = openedModals.pop() as HTMLDivElement;

      resetForm();
      targetModal.classList.remove('modal--open');
    }
  };

  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', handleCloseButtonClick);
  });

  modalBackdrops.forEach((modalBackdrop) => {
    modalBackdrop.addEventListener('click', handleBackdropClick);
  });

  document.addEventListener('keydown', handleEscapeKeydown);
}

export default closeModal;
