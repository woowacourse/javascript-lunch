import { Restaurant } from '../types/index';
import { RESTAURANT_IMAGE, getFavoriteIcon } from '../constants/images';
import { $ } from '../utils/domSelectors';
import { changeRestaurantFavoriteIcon } from './utils';

class RestaurantInformation {
  addCloseButtonClickEvent(handleCloseModal: CallableFunction) {
    const closeButton = $<HTMLButtonElement>('#restaurant-information-close-button');

    closeButton.addEventListener('click', () => {
      handleCloseModal();
    });
  }

  addDeleteButtonClickEvent(handleCloseModal: CallableFunction, handleDeleteRestaurant: CallableFunction) {
    const deleteButton = $<HTMLButtonElement>('#restaurant-information-delete-button');

    deleteButton.addEventListener('click', () => {
      const itemElement = $<HTMLDivElement>('#restaurant-information');
      handleDeleteRestaurant(Number(itemElement.dataset.id));
      handleCloseModal();
    });
  }

  addEvents(handleCloseModal: CallableFunction, handleDeleteRestaurant: CallableFunction) {
    this.addCloseButtonClickEvent(handleCloseModal);
    this.addDeleteButtonClickEvent(handleCloseModal, handleDeleteRestaurant);
  }

  addFavoriteIconClickEvent(onFavoriteIconClick: CallableFunction) {
    const favoriteIcon = $<HTMLImageElement>('#restaurant-information-star');

    favoriteIcon.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLImageElement;
      const restaurantListItemFavoriteIcon = $<HTMLImageElement>(
        `.restaurant[data-id="${target.dataset.id}"] img.restaurant-star-icon`
      );
      changeRestaurantFavoriteIcon(target);
      changeRestaurantFavoriteIcon(restaurantListItemFavoriteIcon);
      onFavoriteIconClick(Number(target.dataset.id));
    });
  }

  create() {
    return `
      <div class="restaurant-detail__info-container"></div>
      <div class="button-container">
        <button
          type="button"
          id="restaurant-information-delete-button"
          class="button button--secondary text-caption"
        >
          삭제하기
        </button>
        <button
          id="restaurant-information-close-button"
          class="button button--primary text-caption modal-close-button"
        >
          닫기
        </button>
      </div>
      `;
  }

  createRestaurantInformationContent(restaurant: Restaurant) {
    return `
      <div class="information">
        <div class="left-section">
          <div class="restaurant__category">
            <img
              src="${RESTAURANT_IMAGE[restaurant.category]}"
              alt="${restaurant.category}"
              class="category-icon"
            />
            </div>
            <div class="restaurant-detail__info-text">
              <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
              <span class="restaurant__distance text-body">
                캠퍼스부터 ${restaurant.distance}분 내
              </span>
            </div>
          </div>
          <div class="icon-container">
            <div class="restaurant__star">
              <img 
                src="${getFavoriteIcon(restaurant.favorite)}"
                alt=""
                id="restaurant-information-star"
                class="restaurant-star-icon ${restaurant.favorite && 'favorite'}"
                data-id="${restaurant.id}"
              />
            </div>
          </div>
        </div>
        <p class="restaurant-detail__description text-body">
          ${restaurant.description ?? ''}
        </p>
        ${
          restaurant.link
            ? `<a href="${restaurant.link}" class="restaurant__link" target="_blank">웹사이트 방문하기</a>`
            : ''
        }
      </div>
    `;
  }

  renderContent(restaurant: Restaurant, handleFavoriteIconClick: CallableFunction) {
    const modalContainer = $<HTMLDivElement>('#restaurant-information');
    modalContainer.dataset.id = String(restaurant.id);

    const informationContainer = $<HTMLDivElement>('.restaurant-detail__info-container');
    informationContainer.replaceChildren();
    informationContainer.insertAdjacentHTML('afterbegin', this.createRestaurantInformationContent(restaurant));
    this.addFavoriteIconClickEvent(handleFavoriteIconClick);
  }
}

export default new RestaurantInformation();
