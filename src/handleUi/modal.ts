import { $ } from '../utils/selector';

export const handleModalClose = (selector: string): void => {
  const modalContainer = $(selector);

  if (modalContainer) {
    modalContainer.classList.remove('modal--open');
  }
};

export const handleModalOpen = (selector: string): void => {
  const modalContainer = $(selector);

  if (modalContainer) {
    modalContainer.classList.add('modal--open');
  }
};
