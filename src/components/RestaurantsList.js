import RestaurantItem from './RestaurantItem';
class RestaurantsList {
  restaurants;

  constructor(restaurants) {
    this.restaurants = restaurants;
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
      document.querySelector('main').insertAdjacentHTML('beforeend', this.template());
    }

    const $categoryFilter = document.querySelector('#category-filter');
    const $sortTypeFilter = document.querySelector('#sorting-filter');

    const category = $categoryFilter.options[$categoryFilter.selectedIndex].value;
    const sortType = $sortTypeFilter.options[$sortTypeFilter.selectedIndex].value;

    const restaurants = this.restaurants.getRestaurant(category, sortType);
    this.setRestaurantItem(restaurants);
  }

  setRestaurantItem(restaurants) {
    const $restaurantList = document.querySelector('.restaurant-list');
    $restaurantList.replaceChildren();

    const restaurantItem = new RestaurantItem(restaurants);
    restaurantItem.render($restaurantList);
  }

  addRestaurant(restaurant) {
    this.restaurants.add(restaurant);
    localStorage.setItem('restaurants', JSON.stringify(this.restaurants.restaurants));

    this.render();
  }
}

export default RestaurantsList;
