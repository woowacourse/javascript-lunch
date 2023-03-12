import { showRestaurantForm } from '../modal';

export default class Header {
  constructor($root) {
    this.$root = $root;
  }

  render() {
    this.$root.insertAdjacentHTML('afterbegin', this.template());
  }

  template() {
    return `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button id="add-restaurant-button" type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./add-button.png" alt="음식점 추가">
      </button>
    `;
  }

  bindEvents() {
    this.$root
      .querySelector('#add-restaurant-button')
      .addEventListener('click', showRestaurantForm);
  }

  mount() {
    this.render();
    this.bindEvents();
  }
}
