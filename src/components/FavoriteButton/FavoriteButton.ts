import BaseComponent from '../BaseComponent';
import fillStar from '@/assets/favorite-icon-filled.png';
import noFillStar from '@/assets/favorite-icon-lined.png';
import RestaurantCollection from '@/domains/entities/RestaurantCollection';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { $ } from '@/utils/DOM';

class FavoriteButton extends BaseComponent {
  #isFavorite: boolean;
  #button: HTMLButtonElement;

  constructor(isFavorite: boolean) {
    super();
    this.#isFavorite = isFavorite;
    this.#button = document.createElement('button');
  }

  render() {
    this.#button.classList.add('favorite-button');
    const $imgBox = document.createElement('img');
    this.#button.append($imgBox);

    const starImg = this.#isFavorite ? fillStar : noFillStar;
    $imgBox.setAttribute('src', starImg);
    this.replaceWith(this.#button);
  }

  setEvent(): void {
    this.#button.addEventListener('click', () => {
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
