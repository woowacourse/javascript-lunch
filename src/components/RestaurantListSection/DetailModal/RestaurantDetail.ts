import DetailModal from '.';
import { ID } from '../../../constants';
import { Category } from '../../../data/image';
import RestaurantListItem, { IRestaurant } from '../../../domain/RestaurantListItem';
import FavoriteIcon from '../FavoriteIcon';
import Restaurant from '../Restaurant';

const RestaurantDetail = {
  template(restaurant: IRestaurant) {
    return `
      <div id="${ID.SHOP_DETAIL}" data-id="${restaurant.id}">
        <div class="favorite-detail">
          ${FavoriteIcon.template(restaurant.favorite, restaurant.id)}
        </div>
        <div class="restaurant__category">
          <img src="${Category[restaurant.category]}" alt="${restaurant.category}" class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
          <p class="restaurant__description text-body">${restaurant?.description}</p>
        </div>
        <div class="button-container">
          <button type="button" id="${ID.DELETE_BUTTON}" class="button button--secondary text-caption">
            삭제하기
          </button>
          <button type="button" id="${ID.CLOSE_BUTTON}" class="button button--primary text-caption">닫기</button>
        </div>
      </div>`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    this.handleDeleteButton(RestaurantListItem);
    this.handleCloseButton();
  },
  handleDeleteButton(RestaurantListItem: RestaurantListItem) {
    const deleteButton = document.querySelector(`#${ID.DELETE_BUTTON}`) as HTMLButtonElement;
    const shopDetail = document.querySelector(`#${ID.SHOP_DETAIL}`) as HTMLDivElement;

    deleteButton?.addEventListener('click', () => {
      const id = shopDetail.dataset.id;

      if (id) {
        RestaurantListItem.remove(id);
        Restaurant.remove(id);
      }

      DetailModal.closeModal();
    });
  },
  handleCloseButton() {
    const closeButton = document.querySelector(`#${ID.CLOSE_BUTTON}`) as HTMLButtonElement;

    closeButton?.addEventListener('click', () => {
      DetailModal.closeModal();
    });
  },
};

export default RestaurantDetail;
