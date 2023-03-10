import { $, dispatchCustomEvent } from '../../utils/dom';

customElements.define(
  'restaurant-detail',
  class RestaurantDetail extends HTMLElement {
    categories = {
      한식: 'korean',
      중식: 'chinese',
      일식: 'japanese',
      아시안: 'asian',
      양식: 'western',
      기타: 'etc',
    };

    constructor() {
      super();
      this.innerHTML = '';
    }

    render(restaurant) {
      this.restaurant = restaurant;
      this.innerHTML = /* html */ `
            <div id="restaurant__image__area">
              <div class="restaurant__category">
                <img src="./category-${this.categories[restaurant.category]}.png">
              </div>
              <button type="button" class="favorite__button" aria-label="${
                restaurant.favorite ? '삭제' : '추가'
              }">
              <img src="./favorite-icon-${
                restaurant.favorite ? 'filled' : 'lined'
              }.png" alt="즐겨찾기 ${restaurant.favorite ? '삭제' : '추가'}" class="favorite-icon">
      </button>
          </div>
          <h2 id="restaurant-detail-modal-title" class="text-title">${restaurant.name}</h2>
          <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
          <p class="text-body">${restaurant.description}</p>
          <div id="link-container">
            <a href="${restaurant.link}">${restaurant.link ?? ''}</a>
          </div>
            <div class="button-container">
              <button id="delete-button" type="button" class="button button--secondary text-caption">삭제하기</button>
              <button class="button button--primary text-caption cancel-button">닫기</button>
            </div>
`;
      this.bindEvent();
    }

    bindEvent() {
      this.querySelector('.cancel-button').addEventListener('click', () => this.closeModal());
      this.querySelector('.favorite__button').addEventListener('click', () =>
        this.handleFavoriteClick()
      );
      this.querySelector('#delete-button').addEventListener('click', () =>
        this.handleRestaurantDelete()
      );
    }

    closeModal() {
      $('.modal').close();
    }

    handleFavoriteClick() {
      dispatchCustomEvent($('.restaurant-list-container'), {
        eventType: 'changeDetailRestaurantFavorite',
        data: this.restaurant.restaurantID,
      });
    }

    handleRestaurantDelete() {
      dispatchCustomEvent($('.restaurant-list-container'), {
        eventType: 'deleteRestaurant',
        data: this.restaurant.restaurantID,
      });
      this.closeModal();
    }
  }
);
