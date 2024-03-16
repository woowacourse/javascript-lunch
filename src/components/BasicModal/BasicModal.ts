import { blockModalBodyScroll, closeModal, resetBodyScroll } from '@/utils/view';
import BaseComponent from '../BaseComponent';

class BasicModal extends BaseComponent {
  #children: Node;
  #backdropElement: HTMLElement = document.createElement('div');
  #position;

  constructor(children: Node, position: 'bottom' | 'center') {
    super();
    this.#children = children;
    this.#position = position;
  }

  render() {
    this.#addBackDrop();
    this.#addModalContainer();
    blockModalBodyScroll();
  }

  setEvent(): void {
    this.#backdropElement.addEventListener('click', () => {
      this.#position === 'bottom' && closeModal();
      resetBodyScroll();
    });
  }

  #addModalContainer() {
    const modalContainerElement = document.createElement('div');

    if (this.#position === 'center') {
      modalContainerElement.classList.add('modal-center');
    }
    if (this.#position === 'bottom') {
      modalContainerElement.classList.add('modal-container');
    }

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
