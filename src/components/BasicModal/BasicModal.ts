import BaseComponent from '../BaseComponent';

class BasicModal extends BaseComponent {
  #children: Node;

  constructor(children: Node) {
    super();
    this.#children = children;
  }

  render() {
    this.#addBackDrop();
    this.#addModalContainer();
  }

  #addModalContainer() {
    const modalContainerElement = document.createElement('div');
    modalContainerElement.classList.add('modal-container');
    modalContainerElement.append(this.#children);
    this.append(modalContainerElement);
  }

  #addBackDrop() {
    const backdropElement = document.createElement('div');
    backdropElement.classList.add('modal-backdrop');
    this.append(backdropElement);

    backdropElement.addEventListener('click', () => {
      document.querySelector('.modal')?.classList.remove('modal--open');
      BasicModal.blockModalBodyScroll();
    });
  }

  static blockModalBodyScroll() {
    if (document.querySelector('.modal')?.classList.contains('modal--open')) {
      document.body.style.overflow = 'hidden';
      console.log('열림');
    } else {
      document.body.style.overflow = 'auto';
      console.log('닫림');
    }
  }
}
export default BasicModal;

customElements.define('basic-modal', BasicModal);
