import { IMAGE } from '../../../assets/assets';
import { ILocation } from '../../../interface/Interface';
import { $ } from '../../../utils/domSelector';

class RestaurantInfoModal extends HTMLElement {
  private restaurantData: ILocation;

  constructor() {
    super();
    this.restaurantData = {} as ILocation;
  }

  connectedCallback() {
    this.addEventListener('restaurantDataUpdated', (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent && customEvent.detail) {
        this.setRestaurantData(customEvent.detail);
      }
    });
  }

  private setRestaurantData(data: ILocation) {
    this.restaurantData = data;
    this.render();
    this.addEvent();
  }

  private addEvent() {
    const closeRestaurantInfoModal = $('#close-restaurant-info-modal');
    if (closeRestaurantInfoModal) {
      closeRestaurantInfoModal.addEventListener('click', (event: Event) => {
        const restaurantInfoModal = $<HTMLDialogElement>('#restaurant-info-modal');
        if (restaurantInfoModal) restaurantInfoModal.close();
      });
      const deleteRestaurantInfo = $('#delete-restaurant-info');
      if (deleteRestaurantInfo) {
        deleteRestaurantInfo.addEventListener('click', (event: Event) => {
          this.dispatchEvent(
            new CustomEvent('deleteRestaurantInfo', {
              detail: this.restaurantData.name,
            }),
          );
          const restaurantInfoModal = $<HTMLDialogElement>('#restaurant-info-modal');
          if (restaurantInfoModal) restaurantInfoModal.close();
        });
      }
    }

    const deleteRestaurantInfo = $('#delete-restaurant-info');
    if (deleteRestaurantInfo) {
      deleteRestaurantInfo.addEventListener('click', (event: Event) => {});
    }

    const favoriteButton = $(`#favorite-button-${this.restaurantData.name.replaceAll(' ', '')}`);
    if (favoriteButton) {
      favoriteButton.addEventListener('click', (event: Event) => {
        this.dispatchEvent(
          new CustomEvent('toggleFavorite', {
            detail: this.restaurantData.name,
          }),
        );
      });
    }
  }

  showUrl() {
    if (this.restaurantData.referenceUrl !== '') {
      return `<p>
      <a href="${this.restaurantData.referenceUrl}" class="restaurant__referenceurl text-body" target="_blank">${this.restaurantData.referenceUrl}</a>
      </p>`;
    }
    return ``;
  }

  private render() {
    this.innerHTML = `
    <dialog id="restaurant-info-modal">
    <div class="modal-container">
    <button type="button" class="favorite-icon" id="favorite-button-${this.restaurantData.name.replaceAll(' ', '')}" >
      <img src="${this.restaurantData.favorite ? IMAGE.url.버튼_즐겨찾기등록됨 : IMAGE.url.버튼_즐겨찾기해제됨}"/>
    </button>
    <div class="restaurant__category">
    <img src="${IMAGE.url[this.restaurantData.category]}" \
    alt="${this.restaurantData.category}" class="category-icon" />
  </div>
  <div class="restaurant__info">
    <h3 class="restaurant__name text-subtitle">${this.restaurantData.name}</h3>
    <span class="restaurant__distance text-body">캠퍼스부터 ${this.restaurantData.minutesWalk}분 내</span>
    <p class="restaurant__description text-body">${this.restaurantData.description}</p>
    <div>${this.showUrl()}</div>
  </div>
  <div class="button-container">
              <button type="button" class="button button--secondary text-caption" id="delete-restaurant-info">삭제하기</button>
              <button type="button" class="button button--primary text-caption" id="close-restaurant-info-modal">닫기</button>
            </div>
        </div>
      </dialog>
    `;
  }
}

export default RestaurantInfoModal;

customElements.define('restaurant-info-modal', RestaurantInfoModal);
