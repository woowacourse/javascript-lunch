import { Restaurant } from '../../type/common';

type HeaderProps = {
  $target: HTMLElement;
  addRestaurantEvent: (restaurant: Restaurant) => void;
};

class Header {
  #target;

  constructor({ $target }: HeaderProps) {
    this.#target = $target;

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
        console.log(1);
      }
    });
  }
}

export default Header;
