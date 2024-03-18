import { $ } from '../../utils/querySelector';

interface Props {
  child: HTMLElement;
}

class Modal {
  #modal = document.createElement('div');

  constructor({ child }: Props) {
    this.render(child);
  }

  render(child: HTMLElement) {
    const backdrop = document.createElement('div');
    const container = document.createElement('div');

    this.#modal.classList.add('modal');
    backdrop.classList.add('modal-backdrop');
    container.classList.add('modal-container');

    container.append(child);
    this.#modal.appendChild(backdrop);
    this.#modal.appendChild(container);

    const mainContainer = $('main');
    mainContainer.append(this.#modal);

    backdrop.addEventListener('click', () => this.toggle.bind(this)());
  }

  get element() {
    return this.#modal;
  }

  toggle() {
    if (this.#modal.classList.contains('modal--open')) {
      this.#modal.classList.remove('modal--open');
    } else this.#modal.classList.add('modal--open');
  }
}

export default Modal;
