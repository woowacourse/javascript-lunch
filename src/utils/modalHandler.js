import { $ } from './dom';

const openModal = (selector) => {
  const element = $(selector);
  if (element) {
    element.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  }
};

const closeModal = (selector) => {
  const element = $(selector);
  if (element) {
    element.classList.remove('modal--open');
    document.body.style.overflow = 'auto';
  }
};

export { openModal, closeModal };
