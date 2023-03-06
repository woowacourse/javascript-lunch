import { CATEGORY_TO_FILENAME } from '../constants/constants';

class RestaurantItem {
  constructor(restaurants) {
    this.restaurants = restaurants;
  }

  makeRestaurantInfoItem(restaurant) {
    const imageFile = CATEGORY_TO_FILENAME[restaurant.category];

    return `
      <li class="restaurant">
        <div class="restaurant__category">
            <img src="./${imageFile}.png" alt="${restaurant.category}" class="category-icon">
        </div>
        <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
            <p class="restaurant__description text-body">${restaurant.description}</p>
        </div>
      </li>
      `;
  }

  template() {
    return this.restaurants.reduce((result, restaurant) => result + this.makeRestaurantInfoItem(restaurant), '');
  }

  render() {
    document.querySelector('.restaurant-list').insertAdjacentHTML('beforeend', this.template());
  }
}

export default RestaurantItem;
