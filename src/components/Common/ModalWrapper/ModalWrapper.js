import { $ } from '../../../utils/dom';

export default class ModalWrapper {
  #element;
  constructor(element) {
    this.#element = element;
    this.render();
    this.#AddEvents();
  }

  render() {
    this.#element.innerHTML = `
      <div id="modal-backdrop" class="modal-backdrop"></div>
      <div id="modal-container" class="modal-container"></div>
    `;
  }

  #AddEvents() {
    $('modal-backdrop').addEventListener('click', () => this.#handleModalBackdropClick());
  }

  #handleModalBackdropClick() {
    $('modal').classList.remove('modal--open');
    $('modal-container').innerHTML = '';
  }
}
