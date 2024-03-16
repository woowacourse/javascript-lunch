import BaseComponent from '../BaseComponent';
import fillStar from '@/assets/favorite-icon-filled.png';
import noFillStar from '@/assets/favorite-icon-lined.png';
import RestaurantCollection from '@/domains/entities/RestaurantCollection';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { $ } from '@/utils/DOM';
import { removeAllChildren } from '@/utils/view';

class FavoriteButton extends BaseComponent {
  #isFavorite: boolean;
  #button: HTMLButtonElement;
  #isDetail: boolean;

  constructor(isFavorite: boolean, isDetail: boolean) {
    super();
    this.#isFavorite = isFavorite;
    this.#button = document.createElement('button');
    this.#button.classList.add('favorite-button');

    this.#isDetail = isDetail;
  }

  render() {
    const $img = document.createElement('img');
    $img.src = this.#isFavorite ? fillStar : noFillStar;

    this.#button.append($img);

    this.replaceWith(this.#button);
  }

  rerender() {
    removeAllChildren(this.#button);
    this.render();
  }

  setEvent(): void {
    this.#button.addEventListener('click', (event) => {
      event.stopPropagation();

      const restaurantInfo = this.#button.parentNode as HTMLElement;
      const targetId = restaurantInfo.id;

      const restaurantDBService = new RestaurantDBService();
      const existedRestaurantList = [...restaurantDBService.update().restaurantList];

      existedRestaurantList.forEach((restaurant) => {
        if (restaurant.id === Number(targetId)) {
          restaurant.isFavorite
            ? restaurant.changeIsFavoriteFalse()
            : restaurant.changeIsFavoriteTrue();
        }
      });

      const newCollection = new RestaurantCollection(existedRestaurantList);
      restaurantDBService.set(newCollection);

      this.#isFavorite = !this.#isFavorite;

      this.rerender();
      this.rerenderByFilter();
    });
  }

  rerenderByFilter() {
    const event = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    $('.restaurant-filter-container').dispatchEvent(event);
  }
}

export default FavoriteButton;

customElements.define('favorite-button', FavoriteButton);
