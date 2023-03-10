import RestaurantItem from './RestaurantItem';
import { $ } from '../utils/common';

class RestaurantsList {
  constructor($target, restaurants, infoModal) {
    this.$target = $target;
    this.sortedCallback = restaurants.getSelectedRestaurantsList.bind(restaurants);
    this.getFavoriteCallback = restaurants.getFavoriteRestaurantList.bind(restaurants);
    this.restaurantItem = new RestaurantItem();
    this.infoRenderCallback = infoModal.render.bind(infoModal);
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

    this.renderRestaurantItem(sortedRestaurantList, this.infoRenderCallback);
  }

  renderRestaurantItem(sortedRestaurantList, infoCallback) {
    const restaurantList = $('.restaurant-list');
    restaurantList.replaceChildren();

    restaurantList.insertAdjacentHTML('beforeend', this.restaurantItem.makeItemList(sortedRestaurantList));
    this.setItemEvent(sortedRestaurantList, infoCallback);
  }

  renderFavoriteRestaurant(infoCallback) {
    const restaurantList = $('.restaurant-list');
    restaurantList.replaceChildren();

    restaurantList.insertAdjacentHTML('beforeend', this.restaurantItem.makeItemList(this.getFavoriteCallback()));
    this.setItemEvent(this.getFavoriteCallback(), infoCallback);
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

  setItemEvent(restaurantList, openInfoModal) {
    restaurantList.forEach(restaurant => {
      $(`#${restaurant.id}`).addEventListener('click', e => {
        if (e.target.id === '') {
          openInfoModal(restaurant);
        }
      });
    });
  }
}

export default RestaurantsList;
