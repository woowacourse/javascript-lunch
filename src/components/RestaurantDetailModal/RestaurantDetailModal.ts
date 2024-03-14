import { Category, Distance } from '@/types/Restaurant';
import BaseComponent from '../BaseComponent';
import BasicModal from '../BasicModal/BasicModal';
import CategoryIconBox from '../CategoryIconBox/CategoryIconBox';
import { DISTANCE_FROM_CAMPUS } from '@/constants/Condition';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import BasicButton from '../BasicButton/BasicButton';
import { closeModal } from '@/utils/view';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { IRestaurant } from '@/types/Restaurant';

class RestaurantDetailModal extends BaseComponent {
  #id: number;
  #restaurantData: IRestaurant;

  constructor(id: number) {
    super();
    this.#id = id;

    const DBService = new RestaurantDBService();
    //TODO: id 값으로 데이터 빼오는 유틸 만들기
    const restaurantData = [...DBService.update().get()].filter(
      (restaurant) => restaurant.id === this.#id,
    )[0];
    this.#restaurantData = restaurantData;
  }

  render() {
    const $detailInfo = document.createElement('div');
    $detailInfo.classList.add('restaurant-detail');
    $detailInfo.id = String(this.#id);

    const $categoryIcon = new CategoryIconBox(this.#restaurantData.category);
    $detailInfo.append($categoryIcon);

    const $title = document.createElement('div');
    $title.textContent = this.#restaurantData.name;
    $title.classList.add('restaurant__name', 'text-subtitle');
    $title.id = 'category-title';
    $detailInfo.append($title);

    const $distance = document.createElement('div');
    $distance.textContent = DISTANCE_FROM_CAMPUS(this.#restaurantData.distance);
    $distance.classList.add('restaurant__distance', 'text-body');
    $detailInfo.append($distance);

    const $description = document.createElement('div');
    $description.textContent = this.#restaurantData.description || '';
    $description.classList.add('text-body');
    $detailInfo.append($description);

    const $link = document.createElement('a');
    $link.classList.add('restaurant__link', 'text-body');
    $link.href = this.#restaurantData.link || '';
    $link.textContent = this.#restaurantData.link || '';
    $detailInfo.append($link);

    const favoriteButton = new FavoriteButton(this.#restaurantData.isFavorite);

    $detailInfo.append(favoriteButton);

    const buttons = this.#makeButtons();
    $detailInfo.append(buttons);

    this.replaceWith(new BasicModal($detailInfo));
  }

  #makeButtons() {
    const $buttonBox = document.createElement('div');
    $buttonBox.classList.add('button-container');

    const $cancelButton = this.#makeCancelButton();
    const $addButton = this.#makeAddButton();

    $buttonBox.append($cancelButton);
    $buttonBox.append($addButton);

    return $buttonBox;
  }

  #makeCancelButton() {
    return new BasicButton({
      variant: 'secondary',
      textContent: '삭제하기',
      type: 'button',
      clickEvent: () => closeModal(this),
    });
  }

  #makeAddButton() {
    return new BasicButton({
      variant: 'primary',
      textContent: '닫기',
      type: 'button',
      clickEvent: () => closeModal(this),
    });
  }
}

export default RestaurantDetailModal;

customElements.define('detail-modal', RestaurantDetailModal);
