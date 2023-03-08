import { $, dispatchCustomEvent } from '../utils/dom';

customElements.define(
  'restaurant-list-item',
  class RestaurantListItem extends HTMLElement {
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
      this.render();
      this.bindEvent();
    }

    render() {
      const category = this.getAttribute('category');
      const restaurantName = this.getAttribute('restaurantName');
      const distance = this.getAttribute('distance');
      const description = this.getAttribute('description');
      const favorite = this.getAttribute('favorite');

      this.innerHTML = /* html */ `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src="./category-${
            this.categories[category]
          }.png" alt="${category}" class="category-icon" />
        </div>
        <div class="restaurant__info">
          <div>
            <div>
              <h3 class="restaurant__name text-subtitle">${restaurantName}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            </div>
            <button type="button" class="favorite__button" aria-label="${
              favorite === 'true' ? '삭제' : '추가'
            }">
              <img src="./favorite-icon-${
                favorite === 'true' ? 'filled' : 'lined'
              }.png" alt="즐겨찾기 ${favorite === 'true' ? '삭제' : '추가'}" class="favorite-icon">
            </button>
          </div>
          <p class="restaurant__description text-body">${description}</p>
        </div>
      </li>`;
    }

    bindEvent() {
      this.querySelector('.favorite__button').addEventListener('click', () =>
        this.handleFavoriteClick()
      );
    }

    handleFavoriteClick() {
      this.setAttribute('favorite', this.getAttribute('favorite') === 'true' ? 'false' : 'true');
      dispatchCustomEvent($('.restaurant-list-container'), {
        eventType: 'changeRestaurantFavorite',
        data: this.getAttribute('restaurantID'),
      });
      this.render();
      this.bindEvent();
    }
  }
);
