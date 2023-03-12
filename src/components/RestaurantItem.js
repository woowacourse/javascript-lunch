import { restaurantService } from '..';
import { CATEGORY_IMAGE_PATH, FAVORITE_ICON_PATH } from '../constants';
import { showInfo } from '../modal';

export default class RestaurantItem {
  constructor($root) {
    this.$root = $root;
  }

  render() {
    this.$root.insertAdjacentHTML('beforeend', this.template());
  }

  template() {
    const { id, category, name, distance, isFavorite, description } = this.restaurant;

    return `
      <li data-id="${id}" class="restaurant">
        <div class="restaurant__category">
          <img src="${CATEGORY_IMAGE_PATH[category]}" alt="${category}" class="category-icon">
        </div>
        <div class="restaurant__info" style="width: 100%">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <h3 class="restaurant__name text-subtitle">${name}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            </div>
            <img src="${
              isFavorite ? FAVORITE_ICON_PATH.FILLED : FAVORITE_ICON_PATH.LINED
            }" class="favorite-icon" data-isfavorite="${isFavorite}">
          </div>
          <p class="restaurant__description text-body">${description}</p>
        </div>
      </li>
    `;
  }

  bindEvents() {
    const li = this.$root.querySelector(`[data-id="${this.restaurant.id}"]`);

    li.addEventListener('click', this.handleFavoriteClick.bind(this));
    li.addEventListener('click', this.handleInfoClick.bind(this));
  }

  handleInfoClick(event) {
    if (event.target.className !== 'favorite-icon') {
      const id = event.currentTarget.getAttribute('data-id');
      const restaurant = restaurantService.getById(id);

      this.restaurantInfo.render(restaurant);
      this.restaurantInfo.bindEvents();

      showInfo();
    }
  }

  handleFavoriteClick(event) {
    if (event.target.className === 'favorite-icon') {
      if (event.target.getAttribute('data-isfavorite') === 'true') {
        event.target.src = FAVORITE_ICON_PATH.LINED;
        event.target.setAttribute('data-isfavorite', 'false');
        const id = event.currentTarget.getAttribute('data-id');
        restaurantService.updateFavorite(id, false);
      } else {
        event.target.src = FAVORITE_ICON_PATH.FILLED;
        event.target.setAttribute('data-isfavorite', 'true');
        const id = event.currentTarget.getAttribute('data-id');
        restaurantService.updateFavorite(id, true);
      }
    }
  }

  inject(restaurantInfo, restaurant) {
    this.restaurantInfo = restaurantInfo;
    this.restaurant = restaurant;

    return this;
  }

  mount() {
    this.render();
    this.bindEvents();
  }
}
