import RestaurantItem from './RestaurantItem';
class RestaurantsList {
  restaurants;
  restaurantItems;

  constructor(restaurants, onClickListItems) {
    this.restaurants = restaurants;
    this.onClickListItems = onClickListItems;
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

    const $categoryFilter = document.querySelector('#category-filter');
    const $sortTypeFilter = document.querySelector('#sorting-filter');
    const category = $categoryFilter.options[$categoryFilter.selectedIndex].value;
    const sortType = $sortTypeFilter.options[$sortTypeFilter.selectedIndex].value;

    const restaurants = this.restaurants.getRestaurant(category, sortType);

    const $restaurantList = document.querySelector('.restaurant-list');
    $restaurantList.replaceChildren();

    this.makeRestaurantItems(restaurants);
  }

  makeRestaurantItems(restaurants) {
    restaurants.forEach(restaurant => {
      const restaurantItem = new RestaurantItem(restaurant);
      restaurantItem.setEvent(this.onClickListItems);
      this.restaurantItems.push(restaurantItem);
    });
  }

  //삭제

  //추가
}

export default RestaurantsList;
