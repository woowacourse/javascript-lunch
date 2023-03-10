import './RestaurantList.css';
import './RestaurantDetailModal.css';
import { $ } from '../utils/domSelectors';
import { Restaurant } from '../types/types';
import { RESTAURANT_IMAGE } from '../constants/images';

export const RestaurantDetailModal = (restaurant: Restaurant, categoryImageUrl: string) => {
  const { category, name, distance, description, link, favoriteImageUrl } = restaurant;

  return `
    <div class="modal-container">
        <div class="category-favorite-icon-container">
            <div class="restaurant__category">
                <img src="${categoryImageUrl}" alt="${category}" class="category-icon" />
            </div>
            <img src="${favoriteImageUrl}" alt="즐겨찾기 아이콘" class="favorite-icon" />
        </div>

        <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="restaurant__description text-body">${description ?? ''}</p>
            <a class="restaurant__link text-body" href="${link ?? ''}">${link ?? ''}</a>
        </div>

        <div class="button-container">
        <button type="button" id="restaurant-detail-modal-remove-button" class="button button--secondary text-caption">
          삭제하기
        </button>
        <button class="button button--primary text-caption" id="restaurant-detail-modal-close-button">닫기</button>
      </div>
    </div>`;
};

export const renderRestaurantDetailModal = (restaurant: Restaurant) => {
  const modal = $<HTMLDialogElement>('#restaurant-detail-modal');
  const categoryImageUrl = RESTAURANT_IMAGE[restaurant.category];
  const restaurantDetailModalTemplate = RestaurantDetailModal(restaurant, categoryImageUrl);

  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', restaurantDetailModalTemplate);

  addRestaurantDetailModalEventHandlers();
};

export const addRestaurantDetailModalEventHandlers = () => {
  addRestaurantDetailModalCloseButtonClickEventHandler();
  addRestaurantDetailModalBackdropClickEventHandler();
};

export const addRestaurantDetailModalCloseButtonClickEventHandler = () => {
  const modal = $<HTMLDialogElement>('#restaurant-detail-modal');

  modal.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLButtonElement)) return false;
    if (event.target.id === 'restaurant-detail-modal-close-button') modal.close();
  });
};

export const addRestaurantDetailModalBackdropClickEventHandler = () => {
  const modal = $<HTMLDialogElement>('#restaurant-detail-modal');

  modal.addEventListener('click', (event) => {
    if (event.target instanceof HTMLDialogElement && event.target.nodeName === 'DIALOG') {
      event.target.close();
    }
  });
};

export const addRestaurantRemoveButtonClickEventHandler = (
  onClickRestaurantRemoveButton: CallableFunction,
) => {
  const modal = $<HTMLDialogElement>('#restaurant-detail-modal');

  modal.addEventListener('click', (event) => {
    if (!(event.currentTarget instanceof HTMLDialogElement)) return false;
    if (!(event.target instanceof HTMLButtonElement)) return false;

    if (event.target.id === 'restaurant-detail-modal-remove-button') {
      const restaurantName = event.currentTarget.querySelector('.restaurant__name')?.textContent;
      onClickRestaurantRemoveButton(restaurantName);
    }
  });
};

export const openRestaurantDetailModal = () => {
  const modal = $<HTMLDialogElement>('#restaurant-detail-modal');

  modal.showModal();
};

export const closeRestaurantDetailModal = () => {
  const modal = $<HTMLDialogElement>('#restaurant-detail-modal');

  modal.close();
};
