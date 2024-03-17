import { $ } from './dom';

const openModal = (selector) => {
  const element = $(selector);
  if (element) {
    element.classList.add('modal--open');
  }
};

const closeModal = (selector) => {
  const element = $(selector);
  if (element) {
    element.classList.remove('modal--open');
  }
};

export { openModal, closeModal };
