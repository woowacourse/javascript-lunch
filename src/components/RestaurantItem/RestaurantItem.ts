import BaseComponent from '../BaseComponent';
import koreanIcon from '@/assets/category-korean.png';
import asianIcon from '@/assets/category-asian.png';
import japaneseIcon from '@/assets/category-japanese.png';
import chineseIcon from '@/assets/category-chinese.png';
import westernIcon from '@/assets/category-western.png';
import etcIcon from '@/assets/category-etc.png';
import { IRestaurant } from '@/types/Restaurant';
import CategoryIconBox from '../CategoryIconBox/CategoryIconBox';

export const Icons = {
  한식: koreanIcon,
  아시안: asianIcon,
  일식: japaneseIcon,
  중식: chineseIcon,
  양식: westernIcon,
  기타: etcIcon,
};

class RestaurantItem extends BaseComponent {
  #category;
  #distance;
  #description;
  #name;

  constructor({ category, name, distance, description }: IRestaurant) {
    super();
    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description;
  }

  render() {
    const $liElement = document.createElement('div');
    $liElement.classList.add('restaurant');

    const $categoryItemBox = new CategoryIconBox(this.#category);
    $liElement.append($categoryItemBox);

    const $restaurantInfoBox = this.#makeInfoBox();
    $restaurantInfoBox.append(this.#makeTitle());
    $restaurantInfoBox.append(this.#makeDistance());
    $restaurantInfoBox.append(this.#makeDescription());

    $liElement.append($restaurantInfoBox);
    this.append($liElement);
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
