import { $ } from '../../utils/dom';
import ICON from '../../icons';
import AddRestaurantModal from '../AddRestaurantModal/AddRestaurantModal';

export default class Header {
  #element;
  #restaurants;

  constructor(element, restaurants) {
    this.#element = element;
    this.#restaurants = restaurants;
    this.render();
    this.#addEvents();
  }

  render() {
    this.#element.innerHTML = `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" id="gnb__button" class="gnb__button" aria-label="음식점 추가">
        <img src="${ICON.추가버튼}" alt="음식점 추가" />
      </button>
    `;
  }

  #addEvents() {
    $('header').addEventListener('click', (event) => {
      this.#handleButtonClick(event.target);
    });
  }

  #handleButtonClick(target) {
    if (target.closest('#gnb__button')) {
      new AddRestaurantModal($('modal'), this.#restaurants);
      $('modal').classList.add('modal--open');
    }
  }
}
