import { Restaurant } from '../../type/common';

type HeaderProps = {
  $target: HTMLElement;
  addRestaurantButtonEvent: () => void;
};

class Header {
  #target;
  #addRestaurantButtonEvent;

  constructor({ $target, addRestaurantButtonEvent }: HeaderProps) {
    this.#target = $target;
    this.#addRestaurantButtonEvent = addRestaurantButtonEvent;

    this.#render();
    this.#setEvent();
  }

  #template() {
    return `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./add-button.png" alt="음식점 추가">
      </button>
    `;
  }

  #render() {
    this.#target.innerHTML = this.#template();
  }

  #setEvent() {
    this.#target.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLImageElement) {
        this.#addRestaurantButtonEvent();
      }
    });
  }
}

export default Header;
