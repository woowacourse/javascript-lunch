import { Category, Distance, IRestaurant } from '@/types/Restaurant';
import BaseComponent from '../BaseComponent';
import BasicModal from '../BasicModal/BasicModal';
import CategoryIconBox from '../CategoryIconBox/CategoryIconBox';
import { DISTANCE_FROM_CAMPUS } from '@/constants/Condition';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

export type DetailModalProps = {
  name: string;
  distance: Distance;
  isFavorite: boolean;
  description?: string;
  category: Category;
  link?: string;
};

class RestaurantDetailModal extends BaseComponent {
  #name: string;
  #distance: Distance;
  #category: Category;
  #description?: string;
  #link?: string;
  #isFavorite: boolean;

  constructor({ name, distance, description, category, link, isFavorite }: DetailModalProps) {
    super();
    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description;
    this.#link = link;
    this.#isFavorite = isFavorite;
  }

  render() {
    const $detailInfo = document.createElement('div');
    $detailInfo.id = 'restaurant-detail';

    const $categoryIcon = new CategoryIconBox(this.#category);
    $detailInfo.append($categoryIcon);

    const $title = document.createElement('div');
    $title.textContent = this.#name;
    $title.classList.add('restaurant__name', 'text-subtitle');
    $title.id = 'category-title';
    $detailInfo.append($title);

    const $distance = document.createElement('div');
    $distance.textContent = DISTANCE_FROM_CAMPUS(this.#distance);
    $distance.classList.add('restaurant__distance', 'text-body');
    $detailInfo.append($distance);

    const $description = document.createElement('div');
    $description.textContent = this.#description || '';
    $description.classList.add('restaurant__description', 'text-body');
    $detailInfo.append($description);

    const $link = document.createElement('div');
    $link.classList.add('restaurant__link', 'text-body');
    $link.textContent = this.#link || '';
    $detailInfo.append($link);

    const favoriteButton = new FavoriteButton(this.#isFavorite);
    $detailInfo.append(favoriteButton);

    this.replaceWith(new BasicModal($detailInfo));
  }
}

export default RestaurantDetailModal;

customElements.define('detail-modal', RestaurantDetailModal);
