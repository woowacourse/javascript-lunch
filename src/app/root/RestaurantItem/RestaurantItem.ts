import { $ } from '../../../utils/domSelector';
import { IMAGE } from '../../../assets/assets';
import { ILocation } from '../../../interface/LocationInterface';

class RestaurantItem extends HTMLElement {
  private restaurantData: ILocation;

  constructor(restaurantData: ILocation) {
    super();
    this.restaurantData = restaurantData;
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  private addEvent() {
    const restaurantItem = $(`#restaurant-item-${this.restaurantData.name.replaceAll(' ', '')}`);
    if (restaurantItem) {
      restaurantItem.addEventListener('click', (event: Event) => {
        this.dispatchEvent(
          new CustomEvent('showRestaurantInfoModal', {
            detail: this.restaurantData,
          }),
        );
      });
    }

    const favoriteButton = $(`#favorite-button-${this.restaurantData.name.replaceAll(' ', '')}`);
    if (favoriteButton) {
      favoriteButton.addEventListener('click', (event: Event) => {
        event.stopPropagation();
        this.dispatchEvent(
          new CustomEvent('toggleFavorite', {
            detail: this.restaurantData.name,
          }),
        );
      });
    }
  }

  private render() {
    this.innerHTML = ` 
      <li class="restaurant" id="restaurant-item-${this.restaurantData.name.replaceAll(' ', '')}">
        <div class="restaurant__category">
          <img src="${IMAGE.url[this.restaurantData.category]}" \
          alt="${this.restaurantData.category}" class="category-icon" />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${this.restaurantData.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${this.restaurantData.minutesWalk}분 내</span>
          <p class="restaurant__description text-body text-overflow">${this.restaurantData.description}</p>
          
        </div>
        <div>
          <button type="button" class="favorite-icon" id="favorite-button-${this.restaurantData.name.replaceAll(
            ' ',
            '',
          )}">
          
            <img src="${this.restaurantData.favorite ? IMAGE.url.버튼_즐겨찾기등록됨 : IMAGE.url.버튼_즐겨찾기해제됨}"/>
          </button>
          </div>
      </li>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
export default RestaurantItem;
