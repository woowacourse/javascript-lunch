import Component from '../Component';
import { RESTAURANT_IMAGE, FAVORITE } from '../constants/images.ts';
import { qs } from '../utils/domHelpers';

export default class RestaurantItem extends Component {
  starShape;

  constructor($target, restaurant) {
    super($target, restaurant);

    this.addEvent('click', (event) => {
      this.switchFavorite(event);
    });
  }

  template({ category, storeName, distance, detail, link, starShape }) {
    this.starShape = starShape;

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
              <img src="${FAVORITE[starShape]}" alt="${starShape}" class="category-icon">
            </div>
          </div>
          <p class="restaurant__description text-body">${detail}</p>
        </div>`;
  }

  switchFavorite(event) {
    if (event.target.nodeName === 'IMG' && this.starShape === 'lined') {
      this.starShape = 'filled';
      event.target.src = FAVORITE[this.starShape];

      this.parseRestaurantList(event);
    } else if (event.target.nodeName === 'IMG' && this.starShape === 'filled') {
      this.starShape = 'lined';
      event.target.src = FAVORITE[this.starShape];
    }
  }

  parseRestaurantList(event) {
    const favoriteTexts = event.currentTarget.textContent
      .split('\n')
      .filter((text) => text.trim().length !== 0)
      .map((restaurantText) => restaurantText.trim());

    const addFavoriteData = {
      category: favoriteTexts[0],
      storeName: favoriteTexts[1],
      distance: favoriteTexts[2],
      detail: favoriteTexts[3],
      link: favoriteTexts[4] || '',
    };

    this.favoriteRestaurant.addRestaurant(addFavoriteData);
  }
}
