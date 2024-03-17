const generateModal = (element, child) => {
  console.log(element.id);

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
