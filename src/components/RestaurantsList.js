import RestaurantItem from './RestaurantItem';
class RestaurantsList {
  restaurants;
  restaurantItems;

  constructor(restaurants, onClickRestaurantItem) {
    this.onClickRestaurantItem = onClickRestaurantItem;
    this.restaurants = restaurants;
    this.restaurantItems = [];

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

    let restaurants;
    if (document.querySelector('.favorites-filter').getAttribute('value') === 'all') {
      restaurants = this.getRestaurantsByCategoryAndSort();
    } else {
      restaurants = this.restaurants.getFavoritesRestaurant();
    }

    this.makeRestaurantItems(restaurants);
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
      this.restaurantItems.push(restaurantItem);
    });
  }
}

export default RestaurantsList;
