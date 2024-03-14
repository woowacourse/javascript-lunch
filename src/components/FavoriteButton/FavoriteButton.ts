import BaseComponent from '../BaseComponent';
import fillStar from '@/assets/favorite-icon-filled.png';
import noFillStar from '@/assets/favorite-icon-lined.png';
import RestaurantCollection from '@/domains/entities/RestaurantCollection';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { $ } from '@/utils/DOM';

class FavoriteButton extends BaseComponent {
  #isFavorite: boolean;
  #button: HTMLButtonElement;
  #isDetail: boolean;

  constructor(isFavorite: boolean, isDetail: boolean) {
    super();
    this.#isFavorite = isFavorite;
    this.#button = document.createElement('button');
    this.#isDetail = isDetail;
  }

  render() {
    console.log('aa');
    this.#button.classList.add('favorite-button');

    if (this.#isDetail) this.#button.id = 'detail-favorite-button';
    const $fillStar = document.createElement('img');
    $fillStar.id = 'fill-star';
    this.#isFavorite ? $fillStar.classList.remove('not-show') : $fillStar.classList.add('not-show');
    $fillStar.src = fillStar;

    const $noFillStar = document.createElement('img');
    $noFillStar.id = 'nofill-star';
    $noFillStar.src = noFillStar;

    this.#button.append($fillStar);
    this.#button.append($noFillStar);

    this.replaceWith(this.#button);
  }

  setEvent(): void {
    this.#button.addEventListener('click', (event) => {
      event.stopPropagation();

      const restaurantInfo = this.#button.parentNode as HTMLElement;
      const targetId = restaurantInfo.id;

      const restaurantDBService = new RestaurantDBService();
      const existedRestaurantList = [...restaurantDBService.update().restaurantList];

      //TODO: 매번 모든 별이 리렌더링 됨
      existedRestaurantList.forEach((restaurant) => {
        if (restaurant.id === Number(targetId)) {
          restaurant.isFavorite
            ? restaurant.changeIsFavoriteFalse()
            : restaurant.changeIsFavoriteTrue();
        }
      });

      const newCollection = new RestaurantCollection(existedRestaurantList);
      restaurantDBService.set(newCollection);

      if (this.#isDetail) {
        const star = $('#detail-favorite-button #fill-star');
        if (!star.classList.contains('not-show')) {
          star.classList.add('not-show');
        } else {
          star.classList.remove('not-show');
        }
      }
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
