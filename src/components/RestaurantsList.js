import RestaurantItem from './RestaurantItem';
import { $ } from '../utils/common';

class RestaurantsList {
  constructor($target, restaurants) {
    this.$target = $target;
    this.sortedCallback = restaurants.getSelectedRestaurantsList.bind(restaurants);
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
    const rastaurantList = $('.restaurant-list');
    rastaurantList.replaceChildren();

    const restaurantItem = new RestaurantItem();
    rastaurantList.insertAdjacentHTML('beforeend', restaurantItem.makeItemList(sortedRestaurantList));
  }
}

export default RestaurantsList;
