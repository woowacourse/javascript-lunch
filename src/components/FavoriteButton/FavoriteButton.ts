import BaseComponent from '../BaseComponent';
import fillStar from '@/assets/favorite-icon-filled.png';
import noFillStar from '@/assets/favorite-icon-lined.png';
import RestaurantCollection from '@/domains/entities/RestaurantCollection';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { $ } from '@/utils/DOM';
import { removeAllChildren } from '@/utils/view';
import FilterContainer from '../FilterContainer/FilterContainer';

type Props = {
  isFavorite: boolean;
  targetId: number;
};

class FavoriteButton extends BaseComponent {
  #isFavorite: boolean;
  #button: HTMLButtonElement;
  #targetId: number;

  constructor({ isFavorite, targetId }: Props) {
    super();
    this.#isFavorite = isFavorite;
    this.#button = document.createElement('button');
    this.#button.classList.add('favorite-button');
    this.#targetId = targetId;
  }

  render() {
    const $img = document.createElement('img');
    $img.classList.add('star');
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

      const restaurantDBService = new RestaurantDBService();
      const existedRestaurantList = [...restaurantDBService.update().restaurantList];

      existedRestaurantList.forEach((restaurant) => {
        if (restaurant.id === this.#targetId) {
          restaurant.toggleChangeIsFavorite();
        }
      });

      const newCollection = new RestaurantCollection(existedRestaurantList);
      restaurantDBService.set(newCollection);

      this.#isFavorite = !this.#isFavorite;

      this.rerender();
      FilterContainer.rerenderByFilter();
    });
  }
}

export default FavoriteButton;

customElements.define('favorite-button', FavoriteButton);
