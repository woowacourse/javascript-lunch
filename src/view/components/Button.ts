import actions from '../../hooks/actions';
import getFormData from '../../utils/getFormData';
import { $ } from '../../utils/querySelector';
import RestaurantList from './RestaurantList';

type ButtonType = 'button' | 'submit';

type ButtonProps = {
  $target: Element;
  info: {
    buttonType: ButtonType;
    buttonStyle: string;
    buttonText: string;
  };
};

class Button {
  #target;
  #info;

  constructor({ $target, info }: ButtonProps) {
    this.#target = $target;
    this.#info = info;

    this.render();
    this.setEvent();
  }

  #template() {
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
    this.#target.innerHTML += this.#template();
  }

  setEvent() {
    this.#target?.addEventListener('click', (e) => {
      e.preventDefault();

      if (
        e.target instanceof HTMLButtonElement &&
        e.target.closest(`.${this.#info.buttonStyle}`)
      ) {
        if (e.target.type === 'submit') {
          const dom = $('form');

          if (dom instanceof HTMLFormElement) {
            const restaurant = getFormData(dom);
            if (!restaurant) return;
            actions.addRestaurant(restaurant);

            new RestaurantList($('.restaurant-list-wrapper')).render();
          }
        }

        $('.modal')?.classList.remove('modal--open');
      }
    });
  }
}

export default Button;
