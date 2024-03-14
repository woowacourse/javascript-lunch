import BaseComponent from '../BaseComponent';
import { IRestaurant } from '@/types/Restaurant';
import CategoryIconBox from '../CategoryIconBox/CategoryIconBox';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import RestaurantDetailModal from '../RestaurantDetailModal/RestaurantDetailModal';
import { $ } from '@/utils/DOM';

class RestaurantItem extends BaseComponent {
  #category;
  #distance;
  #description;
  #name;
  #isFavorite;
  #id;

  constructor({ category, name, distance, description, isFavorite, id }: IRestaurant) {
    super();
    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description;
    this.#isFavorite = isFavorite;
    this.#id = id;
  }

  render() {
    const $liElement = document.createElement('div');
    $liElement.classList.add('restaurant');

    const $categoryItemBox = new CategoryIconBox(this.#category);
    $liElement.append($categoryItemBox);

    const $restaurantInfoBox = this.#makeInfoBox();

    //infoBox를 main과 body로 분리
    $restaurantInfoBox.append(this.#makeTitle());
    $restaurantInfoBox.append(this.#makeDistance());
    $restaurantInfoBox.append(this.#makeDescription());
    $restaurantInfoBox.id = String(this.#id);

    $restaurantInfoBox.append(new FavoriteButton(this.#isFavorite));

    $liElement.append($restaurantInfoBox);
    this.append($liElement);
  }

  setEvent(): void {
    this.addEventListener('click', () => {
      const Detail = new RestaurantDetailModal({
        name: this.#name,
        distance: this.#distance,
        description: this.#description,
        category: this.#category,
      });
      $('#detail-modal').classList.add('modal--open');
      while ($('#detail-modal').firstChild) {
        $('#detail-modal').removeChild($('#detail-modal').firstChild!);
      }
      $('#detail-modal').append(Detail);
    });
  }

  #makeInfoBox() {
    const $restaurantInfoBox = document.createElement('div');
    $restaurantInfoBox.classList.add('restaurant__info');
    return $restaurantInfoBox;
  }

  #makeTitle() {
    const $title = document.createElement('div');
    $title.classList.add('restaurant__name', 'text-subtitle');
    $title.textContent = this.#name;
    return $title;
  }

  #makeDistance() {
    const $distance = document.createElement('span');
    $distance.classList.add('restaurant__distance', 'text-body');
    $distance.textContent = `캠퍼스부터 ${this.#distance}분 내`;
    return $distance;
  }

  #makeDescription() {
    const $description = document.createElement('p');
    $description.classList.add('restaurant__description', 'text-body');
    $description.textContent = `${this.#description ?? ''}`;
    return $description;
  }
}

export default RestaurantItem;

customElements.define('restaurant-item', RestaurantItem);
