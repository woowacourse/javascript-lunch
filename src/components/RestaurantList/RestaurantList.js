import Restaurant from '../Common/Restaurant/Restaurant';
import { $ } from '../../utils/dom';
import ICON from '../../icons';
import RestaurantDetail from '../Common/RestaurantDetail/RestaurantDetail';
import { FAVORITE_ICON } from '../../constants/rules';

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

    this.#element.innerHTML = '';

    restaurantList.forEach((restaurant) => {
      this.#element.appendChild(Restaurant(restaurant));
    });
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
    // this.#toggleIconImg(favoriteIcon);
  }

  #openRestaurantDetail(restaurant) {
    new RestaurantDetail($('modal'), {
      restaurants: this.#restaurants,
      restaurant: restaurant,
      restaurantList: this,
    });
    $('modal').classList.add('modal--open');
  }

  #toggleIconImg(iconImg) {
    iconImg.src === ICON[FAVORITE_ICON.add]
      ? (iconImg.src = ICON[FAVORITE_ICON.remove])
      : (iconImg.src = ICON[FAVORITE_ICON.add]);

    iconImg.alt === FAVORITE_ICON.add
      ? (iconImg.alt = FAVORITE_ICON.remove)
      : (iconImg.alt = FAVORITE_ICON.add);
  }
}
