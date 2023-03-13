import RestaurantItem from './RestaurantItem';
class RestaurantsList {
  constructor(restaurants, onClickRestaurantItem) {
    this.onClickRestaurantItem = onClickRestaurantItem;
    this.restaurants = restaurants;

    this.$target = document.querySelector('main');

    this.render();
  }

  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list"></ul>
    </section>
    `;
  }

  render() {
    if (!document.querySelector(`.restaurant-list-container`)) {
      this.$target.insertAdjacentHTML('beforeend', this.template());
    }

    const restaurantList = this.getRestaurantbyFilterValue();
    this.makeRestaurantItems(restaurantList);
  }

  getRestaurantbyFilterValue() {
    if (document.querySelector('.favorites-filter').getAttribute('value') === 'all') {
      return this.getRestaurantsByCategoryAndSort();
    }

    return this.restaurants.getFavoritesRestaurant();
  }

  getRestaurantsByCategoryAndSort() {
    const $categoryFilter = document.querySelector('#category-filter');
    const $sortTypeFilter = document.querySelector('#sorting-filter');
    const category = $categoryFilter.options[$categoryFilter.selectedIndex].value;
    const sortType = $sortTypeFilter.options[$sortTypeFilter.selectedIndex].value;

    const restaurants = this.restaurants.getRestaurant(category, sortType);

    return restaurants;
  }

  makeRestaurantItems(restaurants) {
    const $restaurantList = document.querySelector('.restaurant-list');
    $restaurantList.replaceChildren();

    restaurants.forEach(restaurant => {
      const restaurantItem = new RestaurantItem(restaurant, this.restaurants);
      restaurantItem.setClickItemEvent(this.onClickRestaurantItem);
    });
  }
}

export default RestaurantsList;
