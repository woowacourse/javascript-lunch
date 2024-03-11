import BaseComponent from '../../BaseComponent';
import './BasicModal.css';
class BasicModal extends BaseComponent {
  #children: Node[];

  constructor(children: Node[]) {
    super();
    this.#children = children;
  }

  render() {
    const backdropElement = document.createElement('div');
    backdropElement.classList.add('modal-backdrop');
    this.append(backdropElement);

    const modalContainerElement = document.createElement('div');
    modalContainerElement.classList.add('modal-container');
    this.#children.forEach((child) => modalContainerElement.append(child));
    this.append(modalContainerElement);

    backdropElement.addEventListener('click', () => {
      document.querySelector('.modal')?.classList.remove('modal--open');
    });
  }

  closeModal() {
    this.classList.remove('modal--open');
  }
}
export default BasicModal;

customElements.define('basic-modal', BasicModal);
