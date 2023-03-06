import { CATEGORY_TO_FILENAME } from '../constants/constants';

class RestaurantItem {
  constructor(restaurant) {
    this.restaurant = restaurant;
    this.render();
  }

  template() {
    const imageFile = CATEGORY_TO_FILENAME[this.restaurant.category];

    return `
      <li class="restaurant">
        <div class="restaurant__category">
            <img src="./${imageFile}.png" alt="${this.restaurant.category}" class="category-icon">
        </div>
        <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${this.restaurant.name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${this.restaurant.distance}분 내</span>
            <p class="restaurant__description text-body">${this.restaurant.description}</p>
        </div>
      </li>
      `;
  }

  render() {
    document.querySelector('.restaurant-list').insertAdjacentHTML('beforeend', this.template());
  }
}

export default RestaurantItem;
