import BaseComponent from '../BaseComponent';

class BasicModal extends BaseComponent {
  #children: Node;

  constructor(children: Node) {
    super();
    this.#children = children;
  }

  render() {
    const backdropElement = document.createElement('div');
    backdropElement.classList.add('modal-backdrop');
    this.append(backdropElement);

    const modalContainerElement = document.createElement('div');
    modalContainerElement.classList.add('modal-container');
    modalContainerElement.append(this.#children);
    this.append(modalContainerElement);
  }
}
export default BasicModal;

customElements.define('basic-modal', BasicModal);
