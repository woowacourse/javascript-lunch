import './RestaurantList.css';
import './RestaurantDetailModal.css';
import { $ } from '../utils/domSelectors';
import { Restaurant } from '../types/types';
import { FAVORITE_ICON_IMAGE } from '../constants/images';

export const RestaurantDetailModal = (restaurant: Restaurant) => {
  const { category, name, distance, description, link, favoriteImageUrl, categoryImageUrl } =
    restaurant;

  return `
    <div class="modal-container">
        <div class="category-favorite-icon-container">
            <div class="restaurant__category">
                <img src="${categoryImageUrl}" alt="${category}" class="category-icon" />
            </div>
        </div>

        <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="restaurant__description text-body more-detail">${description ?? ''}</p>
            <a class="restaurant__link text-body" href="${link ?? ''}">${link ?? ''}</a>

            <button type="button" class="favorite-button in-detail-modal" style="background-image: url('${favoriteImageUrl}')"></button>
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
  const restaurantDetailModalTemplate = RestaurantDetailModal(restaurant);

  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', restaurantDetailModalTemplate);
};

export const addRestaurantDetailModalFavoriteButtonClickEventHandler = (
  onClickFavoriteButton: CallableFunction,
) => {
  const modal = $('#restaurant-detail-modal');

  modal.addEventListener('click', (event) => {
    if (event.target instanceof HTMLButtonElement) {
      const name = event.target.parentNode?.querySelector('.restaurant__name')?.textContent;

      if (typeof name !== 'string') return;
      const restaurantJSON = localStorage.getItem(name);

      if (typeof restaurantJSON !== 'string') return;
      const restaurant = JSON.parse(restaurantJSON);

      restaurant.favorite = !restaurant.favorite;
      restaurant.favoriteImageUrl = restaurant.favorite
        ? FAVORITE_ICON_IMAGE.FILLED
        : FAVORITE_ICON_IMAGE.LINED;

      event.target.style.backgroundImage = `url("${restaurant.favoriteImageUrl}")`;

      localStorage.setItem(restaurant.name, JSON.stringify(restaurant));

      onClickFavoriteButton();
    }
  });
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
