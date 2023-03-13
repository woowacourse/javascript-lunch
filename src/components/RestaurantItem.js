import { FAVORITE, RESTAURANT_IMAGE } from '../constants/images';
import { $ } from '../utils/domHelpers';
import InformationModal from './InformationModal';

export default class RestaurantItem {
  #restaurantImage;
  #restaurantManager;
  #informationModal;

  constructor(restaurantImage, restaurantManager) {
    this.#restaurantManager = restaurantManager;
    this.#restaurantImage = restaurantImage;
    this.#informationModal = new InformationModal(RESTAURANT_IMAGE, restaurantManager, this.render);
    this.componentClickedEvent();
  }

  render({ category, storeName, distance, detail, favorite }, key) {
    return `
     <li class="restaurant" id="${key}">
        <div class="restaurant__category" >
          <img src="${this.#restaurantImage[category]}" alt="${category}" class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${storeName}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description text-body">${detail}</p>
        </div>
        ${
          favorite
            ? `<img src="${FAVORITE.FILLED}" alt="채워짐" class="category-filled"/>`
            : `<img src="${FAVORITE.LINED}" alt="비워짐" class="category-lined"/>`
        }
      </li>
        `;
  }

  componentClickedEvent() {
    $('.restaurant-list').addEventListener('click', (e) => {
      if (e.target.className === 'category-filled' || e.target.className === 'category-lined') {
        const nowID = e.target.closest('li').id;
        const storeName = $(`#${nowID} .restaurant__name`).textContent;
        const renderData = this.#restaurantManager.reverseFavorite(storeName);

        document.querySelector(`#${e.target.parentElement.id}`).outerHTML = this.render(
          renderData,
          nowID
        );
      } else if (e.target.closest('li') || e.target.tagName === 'LI') {
        const restaurantName = e.target
          .closest('LI')
          .querySelector('.restaurant__name').textContent;
        const renderData = this.#restaurantManager.findRestaurantData(restaurantName);
        const modal = $('.information-modal--close');
        modal.innerHTML = this.#informationModal.render(renderData);
        modal.className = 'information-modal--open';
      }
    });
  }
}
