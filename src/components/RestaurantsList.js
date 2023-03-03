import RestaurantItem from './RestaurantItem';
class RestaurantsList {
  restaurants;

  constructor($target, restaurants) {
    this.$target = $target;
    this.restaurants = restaurants;
    this.state = restaurants.restaurants;
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
    if (!document.querySelector(`.restaurant-list-container`)) {
      this.$target.insertAdjacentHTML('beforeend', this.template());
    }

    const $categoryFilter = document.querySelector('#category-filter');
    const $sortTypeFilter = document.querySelector('#sorting-filter');

    const category = $categoryFilter.options[$categoryFilter.selectedIndex].value;
    const sortType = $sortTypeFilter.options[$sortTypeFilter.selectedIndex].value;

    const restaurants = this.restaurants.getRestaurant(category, sortType);

    this.setRestaurantItem(restaurants);
  }

  setRestaurantItem(restaurants) {
    const $rastaurantList = document.querySelector('.restaurant-list');
    $rastaurantList.replaceChildren();

    const restaurantItem = new RestaurantItem(restaurants);
    restaurantItem.render($rastaurantList);
  }
}

export default RestaurantsList;
