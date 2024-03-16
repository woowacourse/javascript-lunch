import Restaurant from '../Common/Restaurant/Restaurant';
import { $ } from '../../utils/dom';
import ICON from '../../icons';
import RestaurantDetail from '../Common/RestaurantDetail/RestaurantDetail';

export default class RestaurantList {
  #element;
  #restaurants;
  #standard;

  constructor(element, { restaurants, standard }) {
    this.#element = element;
    this.#restaurants = restaurants;
    this.#standard = standard;
    this.render();
    this.#addEvents();
  }

  render() {
    const restaurantList = this.#standard
      ? this.#restaurants.standardList
      : this.#restaurants.favoriteList;

    this.#element.innerHTML = `
      ${restaurantList.reduce(
        (prevRestaurantData, currentRestaurantData) =>
          prevRestaurantData + Restaurant(currentRestaurantData),
        '',
      )}
    `;
  }

  // TODO: 이벤트 구체적 작성, 리팩토링
  #addEvents() {
    $('restaurant-list').addEventListener('click', (event) => {
      const favoriteIcon = event.target.closest('button img');
      const restaurant = this.#restaurants.getRestaurant(event.target.closest('li').id);

      if (!event.target.closest('button')) {
        new RestaurantDetail($('modal'), this.#restaurants, restaurant, this);
        $('modal').classList.add('modal--open');
      } else {
        // TODO: 이건 왜 null을 반환하는 경우가 있을까?
        if (!favoriteIcon) return;

        this.#restaurants.toggleFavoriteState(restaurant.name);

        favoriteIcon.src === ICON['즐겨찾기추가']
          ? (favoriteIcon.src = ICON['즐겨찾기해제'])
          : (favoriteIcon.src = ICON['즐겨찾기추가']);
      }
    });
  }
}
