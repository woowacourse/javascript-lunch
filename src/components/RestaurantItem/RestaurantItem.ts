import BaseComponent from '../BaseComponent';
import { IRestaurant } from '@/types/Restaurant';
import CategoryIconBox from '../CategoryIconBox/CategoryIconBox';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import RestaurantDetailModal from '../RestaurantDetailModal/RestaurantDetailModal';
import { $ } from '@/utils/DOM';
import {
  makeDescription,
  makeDistance,
  makeTitle,
  openModal,
  removeAllChildren,
} from '@/utils/view';

class RestaurantItem extends BaseComponent {
  #restaurant;

  constructor(restaurant: IRestaurant) {
    super();
    this.#restaurant = restaurant;
  }

  render() {
    const { category, id, isFavorite, name, distance, description } = this.#restaurant;
    const $liElement = document.createElement('div');
    $liElement.classList.add('restaurant');

    const $categoryItemBox = new CategoryIconBox(category);
    $liElement.append($categoryItemBox);

    const $restaurantInfoBox = this.#makeInfoBox();

    $restaurantInfoBox.append(makeTitle(name));
    $restaurantInfoBox.append(makeDistance(distance));
    $restaurantInfoBox.append(makeDescription('omit', description));
    $restaurantInfoBox.id = String(id);

    const favoriteButton = new FavoriteButton(isFavorite, false);
    $restaurantInfoBox.append(favoriteButton);

    $liElement.append($restaurantInfoBox);

    $restaurantInfoBox.addEventListener('click', () => {
      const detail = new RestaurantDetailModal(this.#restaurant);
      this.#makeDetailModal(detail);
    });

    this.append($liElement);
  }

  #makeDetailModal(detail: HTMLElement) {
    openModal('detail');
    removeAllChildren($('#detail-modal'));
    $('#detail-modal').append(detail);
  }

  #makeInfoBox() {
    const $restaurantInfoBox = document.createElement('div');
    $restaurantInfoBox.classList.add('restaurant__info');
    return $restaurantInfoBox;
  }
}

export default RestaurantItem;

customElements.define('restaurant-item', RestaurantItem);
