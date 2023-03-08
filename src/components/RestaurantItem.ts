import { Restaurant } from '../types/types';
import { RESTAURANT_IMAGE, getFavoriteIcon } from '../constants/images';

class RestaurantItem {
  private restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
  }

  create() {
    return `
      <li class="restaurant">
        <div class="restaurant__category">
          <img
            src="${RESTAURANT_IMAGE[this.restaurant.category]}"
            alt="${this.restaurant.category}"
            class="category-icon"
          />
        </div>
        <div class="restaurant__info-container">
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${this.restaurant.name}</h3>
            <span class="restaurant__distance text-body"
              >캠퍼스부터 ${this.restaurant.distance}분 내</span
            >
            <p class="restaurant__description text-body">
              ${this.restaurant.description ?? ''}
            </p>
          </div>
          <div class="restaurant__star">
            <img 
              src="${getFavoriteIcon(this.restaurant.favorite)}"
              alt=""
              class="restaurant-star"
            />
            </div>
        </div>
      </li>`;
  }

  render(parser: DOMParser, onClick: CallableFunction) {
    const document = parser.parseFromString(this.create(), 'text/html');
    const restaurantElement = document.querySelector('.restaurant') as HTMLLIElement;
    const favoriteIcon = document.querySelector('.restaurant__star') as HTMLDivElement;

    favoriteIcon.addEventListener('click', () => {
      onClick({ ...this.restaurant });

      const icon = favoriteIcon.firstElementChild as HTMLImageElement;
      this.restaurant.favorite = !this.restaurant.favorite;
      icon.src = getFavoriteIcon(this.restaurant.favorite);
    });

    return restaurantElement;
  }
}

export default RestaurantItem;
