import { $ } from '../../utils/dom';

const generateModal = (element, child) => {
  const existingBackdrop = $(`${element.id}-backdrop`);
  const existingModalContainer = $(`${element.id}-container`);
  if (existingBackdrop) {
    existingBackdrop.remove();
  }
  if (existingModalContainer) {
    existingModalContainer.remove();
  }

  const modalBackdrop = document.createElement('div');
  const modalContainer = document.createElement('div');

  modalBackdrop.classList.add('modal-backdrop');
  modalBackdrop.id = `${element.id}-backdrop`;
  modalContainer.classList.add('modal-container');
  modalContainer.id = `${element.id}-container`;

  modalContainer.innerHTML = child;
  element.appendChild(modalBackdrop);
  element.appendChild(modalContainer);

  return element;
};

export default generateModal;
