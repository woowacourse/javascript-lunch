import { blockModalBodyScroll, closeModal } from '@/utils/view';
import BaseComponent from '../BaseComponent';
import { $ } from '@/utils/DOM';
import { ErrorMessage } from '@/constants/Message';

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
  }

  setEvent(): void {
    this.#backdropElement.addEventListener('click', () => {
      const $modal = $('.modal');
      if (!$modal) return console.error(ErrorMessage.NULL_SELECTOR);
      closeModal($modal);
      blockModalBodyScroll();
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
