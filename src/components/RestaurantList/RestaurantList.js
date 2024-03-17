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

  #addEvents() {
    $('restaurant-list').addEventListener('click', (event) => this.#handleClickRestaurant(event));
  }

  #handleClickRestaurant(event) {
    const restaurant = this.#restaurants.getRestaurant(event.target.closest('li').id);
    const favoriteIcon = event.target.closest('button img');
    const favoriteButton = event.target.closest('.favorite-button');

    favoriteButton && favoriteIcon
      ? this.#handleClickFavoriteButton(favoriteIcon, restaurant.name)
      : this.#openRestaurantDetail(restaurant);
  }

  #handleClickFavoriteButton(favoriteIcon, restaurantName) {
    this.#restaurants.toggleFavoriteState(restaurantName);
    this.#toggleIconImg(favoriteIcon);
  }

  #openRestaurantDetail(restaurant) {
    new RestaurantDetail($('modal'), this.#restaurants, restaurant, this);
    $('modal').classList.add('modal--open');
  }

  #toggleIconImg(iconImg) {
    iconImg.src === ICON['즐겨찾기추가']
      ? (iconImg.src = ICON['즐겨찾기해제'])
      : (iconImg.src = ICON['즐겨찾기추가']);
  }
}
