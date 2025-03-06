const MODAL_TEMPLATE = () => {
  return `<div class="modal-backdrop"></div>
          <div class="modal-container"></div>`;
};

class Modal {
  constructor() {
    return this.#createModal();
  }

  #createModal() {
    const divModal = document.createElement('div');
    divModal.classList = ['madal', 'modal--open'];
    divModal.innerHTML = MODAL_TEMPLATE;

    return divModal;
  }
}

export default Modal;
