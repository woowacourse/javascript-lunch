import BaseComponent from '../BaseComponent';
import fillStar from '@/assets/favorite-icon-filled.png';
import noFillStar from '@/assets/favorite-icon-lined.png';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { IRestaurant } from '@/types/Restaurant';
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
      const existedRestaurantList = restaurantDBService.update().restaurantList;
      console.log('updata', restaurantDBService.update());

      const $restElements = [...existedRestaurantList].filter((e) => {
        return e.id !== Number(targetId);
      });

      const $targetElement = [...existedRestaurantList].filter((e) => {
        return e.id === Number(targetId);
      })[0];

      if ($targetElement.isFavorite) {
        $targetElement.changeIsFavoriteFalse();
      } else {
        $targetElement.changeIsFavoriteTrue();
      }

      restaurantDBService.set([...$restElements, $targetElement]);
      this.rerenderByFilter();
    });
  }

  toggleFavorite(restaurantId: number) {
    const restaurantDBService = new RestaurantDBService();
    const restaurantList = restaurantDBService.update().restaurantList;
    const updatedList = restaurantList.map((restaurant: IRestaurant) => {
      if (restaurant.id === restaurantId) {
        return {
          ...restaurant,
          isFavorite: !restaurant.isFavorite, // 즐겨찾기 상태 토글
        };
      }
      return restaurant;
    });
    restaurantDBService.set(updatedList);
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
