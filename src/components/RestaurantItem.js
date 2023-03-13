import Component from '../Component';
import { RESTAURANT_IMAGE, FAVORITE } from '../constants/images.ts';
import { qs } from '../utils/domHelpers';

export default class RestaurantItem extends Component {
  restaurantData;

  constructor($target, restaurant) {
    super($target, restaurant);
    this.restaurantData = restaurant;

    this.addEvent('click', (event) => {
      if (event.target.className === 'favorite-icon') this.switchFavorite(event);
      else this.activateDetailModal();
    });
  }

  template({ category, storeName, distance, detail, link, starShape }) {
    return `
        <div class="restaurant__category">
          <img src="${RESTAURANT_IMAGE[category]}" alt="${category}" class="category-icon">
        </div>
        <div class="restaurant__detail">
          <div class="restaurant__header">
            <div class="restaurant__info">
              <h3 class="restaurant__name text-subtitle">${storeName}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            </div>
            <div class="favorite__shape">
              <img src="${FAVORITE[starShape]}" alt="${starShape}" class="favorite-icon" />
            </div>
          </div>
          <p class="restaurant__description text-body">${detail}</p>
        </div>`;
  }

  switchFavorite() {
    if (this.starShape === 'lined') {
      this.addRestaurantList();
    } else if (this.starShape === 'filled') {
      this.removeRestaurantList();
    }
  }

  addRestaurantList() {
    this.restaurantManager.fillRestaurantStarShape(this.restaurantData.storeName);
    this.favoriteRestaurant.addRestaurant(this.restaurantData);

    this.restaurantData.starShape = 'filled';
  }

  removeRestaurantList() {
    this.restaurantManager.unfillRestaurantStarShape(this.restaurantData.storeName);
    this.favoriteRestaurant.removeRestaurant(this.restaurantData.storeName);

    this.restaurantData.starShape = 'lined';
  }

  activateDetailModal() {
    this.detailRestaurant.setRestaurantDetail(this.restaurantData);
    qs('.detail-modal').classList.add('modal--open');
  }
}
