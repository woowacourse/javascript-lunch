import Restaurant from '../Common/Restaurant/Restaurant';
import { $ } from '../../utils/dom';
import ICON from '../../icons';
import RestaurantDetail from '../Common/RestaurantDetail/RestaurantDetail';

export default class RestaurantList {
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
    <ul id="restaurant-list" class="restaurant-list">
      ${this.#restaurants.standardList.reduce(
        (prevRestaurantData, currentRestaurantData) =>
          prevRestaurantData + Restaurant(currentRestaurantData),
        '',
      )}
    </ul>`;
  }

  // TODO: 이벤트 구체적 작성, 리팩토링
  #addEvents() {
    $('restaurant-list').addEventListener('click', (event) => {
      if (!event.target.closest('button')) {
        $('modal').classList.add('modal--open');
        $('modal-container').innerHTML = RestaurantDetail();
      } else {
        const favoriteIcon = event.target.closest('button img');

        // TODO: 이건 왜 null을 반환하는 경우가 있을까?
        if (!favoriteIcon) return;

        favoriteIcon.src === ICON['즐겨찾기추가']
          ? (favoriteIcon.src = ICON['즐겨찾기해제'])
          : (favoriteIcon.src = ICON['즐겨찾기추가']);
      }
    });
  }
}
