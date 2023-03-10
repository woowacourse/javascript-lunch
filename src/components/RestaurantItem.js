import Component from '../Component';
import { RESTAURANT_IMAGE, FAVORITE } from '../constants/images.ts';

export default class RestaurantItem extends Component {
  constructor($target, restaurant) {
    super($target, restaurant);
  }

  render() {
    return this.template(this.props);
  }

  template({ category, storeName, distance, detail, link, starShape }) {
    return `
      <li class="restaurant">
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
        </div>
      </li>`;
  }
}
