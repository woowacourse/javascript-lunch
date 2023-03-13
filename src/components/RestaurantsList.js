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

    this.renderSortedList();
  }

  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list"></ul>
    </section>
    `;
  }

  renderSortedList() {
    if (!$(`.restaurant-list-container`)) {
      this.$target.insertAdjacentHTML('beforeend', this.template());
    }

    const categoryFilter = $('#category-filter');
    const sortTypeFilter = $('#sorting-filter');

    const category = categoryFilter.options[categoryFilter.selectedIndex].value;
    const sortType = sortTypeFilter.options[sortTypeFilter.selectedIndex].value;

    const sortedRestaurantList = this.sortRestaurantList(category, sortType);

    this.renderList(sortedRestaurantList, this.restaurantList);
  }

  renderFavoriteItem() {
    this.renderList(this.getFavoriteRestaurantList(), this.favoriteList);
  }

  renderList(list, stateList) {
    const $restaurantList = $('.restaurant-list');
    $restaurantList.replaceChildren();

    const callbackFunction = {
      setFavorite: this.setFavoriteState.bind(this),
      infoRender: this.restaurantInfoRender.bind(this),
      listRender: this.renderSortedList.bind(this),
      favoriteRender: this.renderFavoriteItem.bind(this),
    };

    this.favoriteList = [];
    list.forEach(restaurant => {
      stateList.push(new RestaurantItem($restaurantList, restaurant, callbackFunction));
    });
  }
}

export default RestaurantsList;
