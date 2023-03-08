import RestaurantItem from './RestaurantItem';
class RestaurantsList {
  restaurants;
  restaurantItems;

<<<<<<< HEAD
  constructor(restaurants) {
    this.restaurants = restaurants;
    this.restaurantItems = [];
=======
  constructor(restaurants, onClickListItems) {
    this.restaurants = restaurants;
    this.onClickListItems = onClickListItems;
    this.restaurantItems = [];

>>>>>>> step2-test
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
<<<<<<< HEAD

=======
>>>>>>> step2-test
    const category = $categoryFilter.options[$categoryFilter.selectedIndex].value;
    const sortType = $sortTypeFilter.options[$sortTypeFilter.selectedIndex].value;

    const restaurants = this.restaurants.getRestaurant(category, sortType);

<<<<<<< HEAD
=======
    const $restaurantList = document.querySelector('.restaurant-list');
    $restaurantList.replaceChildren();

>>>>>>> step2-test
    this.makeRestaurantItems(restaurants);
  }

  makeRestaurantItems(restaurants) {
<<<<<<< HEAD
    const $restaurantList = document.querySelector('.restaurant-list');
    $restaurantList.replaceChildren();

    restaurants.forEach(restaurant => {
      const restaurantItem = new RestaurantItem(restaurant);
      this.restaurantItems.push(restaurantItem);
    });
  }
=======
    restaurants.forEach(restaurant => {
      const restaurantItem = new RestaurantItem(restaurant);
      restaurantItem.setEvent(this.onClickListItems);
      this.restaurantItems.push(restaurantItem);
    });
  }

  //삭제

  //추가
>>>>>>> step2-test
}

export default RestaurantsList;
