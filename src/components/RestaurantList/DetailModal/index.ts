import RestaurantList from '..';
import { CLASS } from '../../../constants';
import { Category } from '../../../data/image';
import RestaurantListItem, { IRestaurant } from '../../../domain/RestaurantListItem';
import FavoriteIcon from '../FavoriteIcon';
import Restaurant from '../Restaurant';

const DetailModal = {
  template(restaurant: IRestaurant) {
    return `
      <dialog class="${CLASS.DETAIL_MODAL}">
        <div class="modal-backdrop"></div>
          <div class="modal-container">
            <div id="shop-detail" data-id="${restaurant.id}">
              <div class="favorite favorite-detail">
                ${FavoriteIcon.template(restaurant.favorite)}
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
                <button
                  type="button"
                  id="delete-${restaurant.id}"
                  class="button button--secondary text-caption delete-button"
                >
                  삭제하기
                </button>
                <button type="button" id="close-button" class="button button--primary text-caption">닫기</button>
              </div>
            </div>
          </div>
      </dialog>`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    const deleteButton = document.querySelector('.delete-button') as HTMLButtonElement;
    const closeButton = document.querySelector('#close-button') as HTMLButtonElement;
    const shopDetail = document.querySelector('#shop-detail') as HTMLDivElement;

    deleteButton?.addEventListener('click', () => {
      const id = shopDetail.dataset.id;

      if (id) {
        RestaurantListItem.remove(id);
        Restaurant.remove(id);
      }

      DetailModal.closeModal();
    });

    closeButton?.addEventListener('click', () => {
      DetailModal.closeModal();
    });
  },
  openModal() {
    const modal = document.querySelector(`.${CLASS.DETAIL_MODAL}`) as HTMLElement;
    modal.className = CLASS.MODAL_OPEN;
  },
  closeModal() {
    const modal = document.querySelector(`.${CLASS.MODAL_OPEN}`) as HTMLElement;
    modal.className = CLASS.DETAIL_MODAL;
  },
};

export default DetailModal;
