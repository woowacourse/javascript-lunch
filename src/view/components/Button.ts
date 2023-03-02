import { Restaurant } from '../../type/common';
import getFormData from '../../utils/getFormData';
import { $ } from '../../utils/querySelector';

type ButtonType = 'button' | 'submit';

type ButtonProps = {
  $target: HTMLElement;
  info: {
    buttonType: ButtonType;
    buttonStyle: string;
    buttonText: string;
  };

  onClickEvent: (value: string) => void;
};

class Button {
  #target;
  #info;
  onClickEvent;

  constructor({ $target, info, onClickEvent }: ButtonProps) {
    this.#target = $target;
    this.#info = info;
    this.onClickEvent = onClickEvent;

    this.render();
    this.setEvent();
  }

  template() {
    return `
      <button
        type="${this.#info.buttonType}"
        class="button ${this.#info.buttonStyle} text-caption"
      >
        ${this.#info.buttonText}
      </button>
    `;
  }

  render() {
    this.#target.innerHTML += this.template();
  }

  modalButtonEvent(type: string) {
    if (type === 'submit') {
      this.onClickEvent('add');
    }

    if (type === 'button') {
      this.onClickEvent('cancel');
    }
  }

  setEvent() {
    this.#target.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target instanceof HTMLButtonElement) {
        this.modalButtonEvent(e.target.type);
      }
    });
  }
}

export default Button;
