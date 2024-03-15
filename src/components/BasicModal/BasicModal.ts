import { blockModalBodyScroll, closeModal, resetBodyScroll } from '@/utils/view';
import BaseComponent from '../BaseComponent';

class BasicModal extends BaseComponent {
  #children: Node;
  #backdropElement: HTMLElement = document.createElement('div');

  constructor(children: Node) {
    super();
    this.#children = children;
  }

  render() {
    this.#addBackDrop();
    this.#addModalContainer();
    blockModalBodyScroll();
  }

  setEvent(): void {
    this.#backdropElement.addEventListener('click', () => {
      closeModal();
      resetBodyScroll();
    });
  }

  #addModalContainer() {
    const modalContainerElement = document.createElement('div');
    modalContainerElement.classList.add('modal-container');
    modalContainerElement.append(this.#children);
    this.append(modalContainerElement);
  }

  #addBackDrop() {
    this.#backdropElement.classList.add('modal-backdrop');
    this.append(this.#backdropElement);
  }
}
export default BasicModal;

customElements.define('basic-modal', BasicModal);
