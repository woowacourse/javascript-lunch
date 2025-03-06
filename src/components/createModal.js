import createElement from '../utils/createElement.js';

function createModal(children) {
  const modalContainer = createElement('div', 'modal');
  const modalBackdrop = createElement('div', 'modal-backdrop');
  const modalDiv = createElement('div', 'modal-container');

  modalDiv.appendChild(children);
  modalContainer.append(modalBackdrop, modalDiv);

  return modalContainer;
}

export default createModal;
