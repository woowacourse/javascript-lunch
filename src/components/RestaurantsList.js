import RestaurantItem from './RestaurantItem';
import { $ } from '../utils/common';

class RestaurantsList {
  favoriteList = [];
  restaurantList = [];

  constructor($target, restaurants, infoModal) {
    this.$target = $target;
    this.sortRestaurantList = restaurants.getSelectedRestaurantsList.bind(restaurants);
    this.getFavoriteRestaurantList = restaurants.getFavoriteRestaurantList.bind(restaurants);
    this.setFavoriteState = restaurants.setFavoriteState.bind(restaurants);
    this.restaurantInfoRender = infoModal.render.bind(infoModal);
    this.setState(restaurants.restaurantsList);
  }

  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list"></ul>
    </section>
    `;
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  render() {
    if (!$(`.restaurant-list-container`)) {
      this.$target.insertAdjacentHTML('beforeend', this.template());
    }

    const categoryFilter = $('#category-filter');
    const sortTypeFilter = $('#sorting-filter');

    const category = categoryFilter.options[categoryFilter.selectedIndex].value;
    const sortType = sortTypeFilter.options[sortTypeFilter.selectedIndex].value;

    const sortedRestaurantList = this.sortRestaurantList(category, sortType);

    this.renderRestaurantItem(sortedRestaurantList);
  }

  renderRestaurantItem(sortedRestaurantList) {
    const $restaurantList = $('.restaurant-list');
    $restaurantList.replaceChildren();

    this.restaurantList = [];
    sortedRestaurantList.forEach(restaurant => {
      this.restaurantList.push(
        new RestaurantItem(
          $restaurantList,
          restaurant,
          this.restaurantInfoRender.bind(this),
          this.render.bind(this),
          this.setFavoriteState.bind(this)
        )
      );
    });
  }

  renderFavoriteRestaurant() {
    const $restaurantList = $('.restaurant-list');
    $restaurantList.replaceChildren();

    const favoriteList = this.getFavoriteRestaurantList();

    this.favoriteList = [];
    favoriteList.forEach(restaurant => {
      this.favoriteList.push(
        new RestaurantItem(
          $restaurantList,
          restaurant,
          this.restaurantInfoRender.bind(this),
          this.render.bind(this),
          this.setFavoriteState.bind(this)
        )
      );
    });
  }
}

export default RestaurantsList;
