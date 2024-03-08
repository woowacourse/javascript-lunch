import { LocationData } from '../../../constants/Type';
import { ASSETS } from '../../../constants/setting';

class RestaurantItem extends HTMLElement {
  private restaurantData: LocationData;

  constructor(restaurantData: LocationData) {
    super();
    this.restaurantData = restaurantData;
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    this.innerHTML = `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src="${ASSETS.imageUrl[this.restaurantData.category]}" \
          alt="${this.restaurantData.category}" class="category-icon" />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${this.restaurantData.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${this.restaurantData.minutesWalk}분 내</span>
          <p class="restaurant__description text-body">${this.restaurantData.description}</p>
        </div>
      </li>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
export default RestaurantItem;
