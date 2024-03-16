const generateModal = (targetId, child) => {
  const modalBackdrop = document.createElement('div');
  const modalContainer = document.createElement('div');

  modalBackdrop.classList.add('modal-backdrop');
  modalBackdrop.id = 'modal-backdrop';
  modalContainer.classList.add('modal-container');

  modalContainer.innerHTML = child;
  targetId.appendChild(modalBackdrop);
  targetId.appendChild(modalContainer);

  return targetId;
};

export default generateModal;
