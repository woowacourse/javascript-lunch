import { restaurantService } from '..';
import { CATEGORY_IMAGE_PATH, FAVORITE_ICON_PATH } from '../constants';
import { closeModal } from '../modal';

export default class RestaurantInfo {
  constructor($root) {
    this.$root = $root;
  }

  render(restaurant) {
    this.$root.innerHTML = this.template(restaurant);
  }

  template(restaurant) {
    const { id, name, category, distance, description, isFavorite, link } = restaurant;

    return `
      <div class="info-wrapper" data-id="${id}">
        <div class="restaurant__header">
          <div class="restaurant__category">
            <img src="${CATEGORY_IMAGE_PATH[category]}" alt="${category}" class="category-icon">
          </div>
          <div class="restaurant__favorite">
            <img src="${
              isFavorite ? FAVORITE_ICON_PATH.FILLED : FAVORITE_ICON_PATH.LINED
            }" class="favorite-icon" data-isfavorite="${isFavorite}">
          </div>
        </div>
        <h2 class="text-title">${name}</h2>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        ${description ? `<p class="text-body">${description}</p>` : ''}
        ${link ? `<a href=${link}>${link}</a>` : ''}
        <div class="button-container">
          <button data-id="${id}" id="delete-button" type="button" class="button button--secondary text-caption">삭제하기</button>
          <button id="cancel-button" class="button button--primary text-caption">닫기</button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.$root
      .querySelector('.info-wrapper')
      .addEventListener('click', this.handleFavoriteClick.bind(this));
    this.$root
      .querySelector('#delete-button')
      .addEventListener('click', this.handleDelete.bind(this));
    this.$root.querySelector('#cancel-button').addEventListener('click', closeModal);
  }

  handleFavoriteClick(event) {
    if (event.target.className === 'favorite-icon') {
      const id = event.currentTarget.getAttribute('data-id');
      const restaurantIcon = document
        .querySelector('.restaurant-list')
        .querySelector(`[data-id="${id}"]`)
        .querySelector('.favorite-icon');
      const favoriteIcon = document
        .querySelector('.favorite-list')
        ?.querySelector(`[data-id="${id}"]`)
        ?.querySelector('.favorite-icon');

      if (event.target.getAttribute('data-isfavorite') === 'true') {
        event.target.src = FAVORITE_ICON_PATH.LINED;
        event.target.setAttribute('data-isfavorite', 'false');
        restaurantService.updateFavorite(id, false);
        restaurantIcon.src = FAVORITE_ICON_PATH.LINED;
        if (favoriteIcon) favoriteIcon.src = FAVORITE_ICON_PATH.LINED;
      } else {
        event.target.src = FAVORITE_ICON_PATH.FILLED;
        event.target.setAttribute('data-isfavorite', 'true');
        restaurantService.updateFavorite(id, true);
        restaurantIcon.src = FAVORITE_ICON_PATH.FILLED;
        if (favoriteIcon) favoriteIcon.src = FAVORITE_ICON_PATH.FILLED;
      }
    }
  }

  handleDelete(event) {
    const id = event.target.getAttribute('data-id');

    restaurantService.deleteRestaurant(id);

    this.restaurantList.rerender();
    this.favoriteList.rerender();

    closeModal();
  }

  inject(restaurantList, favoriteList) {
    this.restaurantList = restaurantList;
    this.favoriteList = favoriteList;
  }
}
