import RestaurantComponent from './Restaurant';

class RestaurantTapContainer {
  #restaurantAllTap = this.createRestaurantAllTap();
  #restaurantFavoriteTap = this.createRestaurantFavoriteTap();
  #restaurantList;

  constructor(restaurantList) {
    this.#restaurantList = restaurantList;
    this.set();
  }

  set() {
    const $restaurantTapContainer = document.querySelector('.restaurant-tap-container');

    this.#restaurantAllTap.addEventListener('click', () => this.handleRestaurantAllTap());
    this.#restaurantFavoriteTap.addEventListener('click', () => this.handleRestaurantFavoriteTap());

    $restaurantTapContainer.appendChild(this.#restaurantAllTap);
    $restaurantTapContainer.appendChild(this.#restaurantFavoriteTap);
  }

  handleRestaurantAllTap() {
    this.#restaurantAllTap.classList.add('restaurant-tap_primary');
    this.#restaurantFavoriteTap.classList.remove('restaurant-tap_primary');
  }

  handleRestaurantFavoriteTap() {
    const $restaurantList = document.querySelector('.restaurant-list');
    const $restaurantFilterContainer = document.querySelector('.restaurant-filter-container');

    this.#restaurantAllTap.classList.remove('restaurant-tap_primary');
    this.#restaurantFavoriteTap.classList.add('restaurant-tap_primary');
    this.#restaurantList.filterByFavorite();

    $restaurantFilterContainer.replaceChildren();
    $restaurantList.replaceChildren();
    RestaurantComponent.render(this.#restaurantList.restaurants);
  }

  createRestaurantAllTap() {
    const restaurantAllTap = document.createElement('div');
    const allTapHead = document.createElement('h3');

    restaurantAllTap.setAttribute('id', 'restaurant-all-tap');
    restaurantAllTap.classList.add('restaurant-tap_grey', 'restaurant-tap_primary');
    allTapHead.textContent = '모든 음식점';

    restaurantAllTap.appendChild(allTapHead);

    return restaurantAllTap;
  }

  createRestaurantFavoriteTap() {
    const restaurantFavoriteTap = document.createElement('div');
    const FavoriteTapHead = document.createElement('h3');

    restaurantFavoriteTap.setAttribute('id', 'restaurant-Favorite-tap');
    restaurantFavoriteTap.classList.add('restaurant-tap_grey');
    FavoriteTapHead.textContent = '자주 가는 음식점';

    restaurantFavoriteTap.appendChild(FavoriteTapHead);

    return restaurantFavoriteTap;
  }
}

export default RestaurantTapContainer;
