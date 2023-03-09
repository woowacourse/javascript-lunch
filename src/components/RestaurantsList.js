import RestaurantItem from './RestaurantItem';
import { $ } from '../utils/common';

class RestaurantsList {
  constructor($target, restaurants) {
    this.$target = $target;
    this.sortedCallback = restaurants.getSelectedRestaurantsList.bind(restaurants);
    this.getFavoriteCallback = restaurants.getFavoriteRestaurantList.bind(restaurants);
    this.restaurantItem = new RestaurantItem();
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

    const sortedRestaurantList = this.sortedCallback(category, sortType);

    this.renderRestaurantItem(sortedRestaurantList);
  }

  renderRestaurantItem(sortedRestaurantList) {
    const restaurantList = $('.restaurant-list');
    restaurantList.replaceChildren();

    restaurantList.insertAdjacentHTML('beforeend', this.restaurantItem.makeItemList(sortedRestaurantList));
  }

  renderFavoriteRestaurant() {
    const restaurantList = $('.restaurant-list');
    restaurantList.replaceChildren();

    restaurantList.insertAdjacentHTML('beforeend', this.restaurantItem.makeItemList(this.getFavoriteCallback()));
  }

  setEvent(callback) {
    $('.restaurant-list').addEventListener('click', e => {
      callback(e.target.alt);
      if ($('ul.tabbar-selector li.current').innerText === '자주 가는 음식점') {
        this.renderFavoriteRestaurant();
        return;
      }

      this.render();
    });
  }
}

export default RestaurantsList;
