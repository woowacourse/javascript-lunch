import { $ } from '../../util/querySelector';

type ModalType = {
  parentElement: HTMLElement;
  info: {
    id: string;
    innerId: string;
  };
};

class Modal {
  #parentElement;
  #info;

  constructor({ parentElement, info }: ModalType) {
    this.#parentElement = parentElement;
    this.#info = info;

    this.#render();
    this.#addListeners();
  }

  closeOrOpenModal(command: string) {
    const modalElement = $(`#${this.#info.id}`);

    if (modalElement instanceof HTMLDialogElement) {
      command === 'open'
        ? modalElement.classList.add('modal--open')
        : modalElement.classList.remove('modal--open');
    }
  }

  fillContents(template: string) {
    $(`#${this.#info.innerId}`).innerHTML = template;
  }

  #render() {
    const template = `
      <dialog class="modal" id="${this.#info.id}">
        <div class="modal-backdrop"></div>
          <div class="modal-container">
            <div id="${this.#info.innerId}"></div>
          </div>
        </div>
      </dialog>`;

    this.#parentElement.innerHTML = template;
  }

  #addListeners() {
    $(`#${this.#info.id} .modal-backdrop`).addEventListener('click', () => {
      this.closeOrOpenModal('close');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeOrOpenModal('close');
      }
    });
  }
}

export default Modal;
