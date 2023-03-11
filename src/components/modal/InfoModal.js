import { CATEGORY_TO_FILENAME } from '../../constants/constants';
import Modal from './Modal';
import { $ } from '../../utils/common';

class InfoModal extends Modal {
  constructor(restaurants) {
    super();
    this.container = $('.modal-container');
    this.setFavoriteState = restaurants.setFavoriteState.bind(restaurants);
    this.removeRestaurant = restaurants.remove.bind(restaurants);
    this.restaurants = restaurants;
  }

  template(restaurant) {
    const imageFile = CATEGORY_TO_FILENAME[restaurant.category];

    return `
    <div class="info-form">
      <div class="info-modal-icon">
        <div class="restaurant__category">
          <img src="./${imageFile}.png" alt="${restaurant.category}" class="category-icon" />
        </div>
        <div>
          <img id="${restaurant.id}" class="favorite-icon" src="./${
      restaurant.favorites ? 'favorite-icon-filled' : 'favorite-icon-lined'
    }.png" alt="${restaurant.id}" />
        </div>
      </div>
      <div class="info-modal-content">
        <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
        <div class="restaurant__distance text-body info-modal-distance">캠퍼스부터 ${restaurant.distance}분 내</div>
        <div class="text-body">
          ${restaurant.description}
        </div>
        <div class="link-container">
          <a href="https://${restaurant.link}">${restaurant.link}</a>
        </div>
      </div>
      <div class="button-container">
        <button type="button" class="button button--secondary text-caption">삭제하기</button>
        <button class="button button--primary text-caption">닫기</button>
      </div>
    </div>
    `;
  }

  render(restaurant, listRender, favoriteRender) {
    this.container.replaceChildren();
    this.container.innerHTML = this.template(restaurant);

    this.cancelModal(listRender, favoriteRender);
    this.setFavoriteEvent(restaurant, listRender, favoriteRender);
    this.setRemoveEvent(listRender, favoriteRender);
    this.toggleModalOpen();
  }

  cancelModal(listRender, favoriteRender) {
    const cancelButton = $('.button--primary');

    cancelButton.addEventListener('click', () => {
      if ($('.current').innerText === '모든 음식점') {
        this.toggleModalOpen();
        listRender();
        return;
      }

      this.toggleModalOpen();
      favoriteRender();
    });
  }

  setRemoveEvent(listRender, favoriteRender) {
    const removeButton = $('.button--secondary');

    removeButton.addEventListener('click', () => {
      this.removeRestaurant($('.favorite-icon').alt);

      if ($('.current').innerText === '모든 음식점') {
        this.toggleModalOpen();
        listRender();
        return;
      }

      this.toggleModalOpen();
      favoriteRender();
    });
  }

  setFavoriteEvent(restaurant, listRender, favoriteRender) {
    $('.info-form').addEventListener('click', e => {
      this.setFavoriteState(e.target.alt);
      this.container.replaceChildren();
      this.container.innerHTML = this.template(restaurant);

      this.cancelModal(listRender, favoriteRender);
      this.setFavoriteEvent(restaurant, listRender, favoriteRender);
    });
  }
}

export default InfoModal;
