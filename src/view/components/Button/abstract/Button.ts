import { $ } from '../../../../utils/querySelector';
import { ButtonInfo } from '../type/ButtonType';

class Button {
  #target;

  constructor($target: Element) {
    this.#target = $target;
  }

  template(buttonInfo: ButtonInfo) {
    return `
      <button 
        type="${buttonInfo.buttonType}"
        class="button ${buttonInfo.buttonStyle} text-caption ${buttonInfo.func}"
      >
        ${buttonInfo.buttonText}
      </button>
    `;
  }

  render(buttonInfo: ButtonInfo) {
    this.#target.innerHTML += this.template(buttonInfo);

    return this;
  }

  addEvent(eventTarget: Element) {
    if (!eventTarget) throw new Error('[ERROR]');

    return this;
  }

  closeModal(eventTarget: Element) {
    if (eventTarget.closest('.modal-add-wrapper')) {
      $(`.modal-add-wrapper .modal`).classList.remove('modal--open');
    }

    if (eventTarget.closest('.modal-item-wrapper')) {
      $(`.modal-item-wrapper .modal`).classList.remove('modal--open');
    }
  }

  setEvent() {
    this.#target.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target instanceof HTMLButtonElement) {
        this.addEvent(e.target);
      }
    });
  }
}

export default Button;
