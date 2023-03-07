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
  }

  toggleModal() {
    $(`#${this.#info.id}`).classList.toggle('modal--open');
  }

  fillContents(template: string) {
    $(`#${this.#info.innerId}`).innerHTML = template;
  }

  #render() {
    const template = `
      <div class="modal" id="${this.#info.id}">
        <div class="modal-backdrop"></div>
          <div class="modal-container">
            <div id="${this.#info.innerId}"></div>
          </div>
        </div>
      </div>`;

    this.#parentElement.innerHTML = template;
  }
}

export default Modal;
