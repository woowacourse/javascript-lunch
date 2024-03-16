import { $ } from './dom';

export const toggleModal = (selector) => {
  const element = $(selector);
  if (element) {
    element.classList.toggle('modal--open');
  }
};
