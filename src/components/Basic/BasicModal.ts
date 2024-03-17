import './BasicModal.css';
class BasicModal extends HTMLDivElement {
  #backdrop: HTMLDivElement;
  #modalContainer: HTMLDivElement;

  constructor() {
    super();

    this.classList.add('modal');
    const children = Array.from(this.querySelectorAll('.modal > *')!);

    this.#backdrop = this.#makeBackdrop();
    this.append(this.#backdrop);

    this.#modalContainer = this.#makeModalContainer();
    this.append(this.#modalContainer);

    this.appendAll(children);
    this.#backdrop.addEventListener('click', () => {
      document.querySelector('.modal')?.classList.remove('modal--open');
    });
  }

  #makeBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop');
    backdrop.addEventListener('click', this.closeModal.bind(this));
    return backdrop;
  }

  #makeModalContainer() {
    const modalContainer = document.createElement('div');
    if (this.getAttribute('class-container')) {
      modalContainer.className = this.getAttribute('class-container')!;
    }
    modalContainer.classList.add('modal-container');
    return modalContainer;
  }

  appendAll(children: Node[]) {
    children.forEach((child) => this.#modalContainer.append(child));
  }

  removeAll() {
    this.#modalContainer.replaceChildren();
  }

  replaceChildNodes(children: Node[]) {
    this.removeAll();
    this.appendAll(children);
  }

  closeModal() {
    this.classList.remove('modal--open');
  }

  openModal() {
    this.classList.add('modal--open');
  }
}
export default BasicModal;

customElements.define('basic-modal', BasicModal, { extends: 'div' });
