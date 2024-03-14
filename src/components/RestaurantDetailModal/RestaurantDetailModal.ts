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
  #DBService;
  #detailInfo;
  // #favoriteButton;

  constructor(id: number) {
    super();
    this.#id = id;
    this.#DBService = new RestaurantDBService();

    const DBService = new RestaurantDBService();
    //TODO: id 값으로 데이터 빼오는 유틸 만들기
    const restaurantData = [...DBService.update().get()].filter(
      (restaurant) => restaurant.id === this.#id,
    )[0];
    this.#restaurantData = restaurantData;
    this.#detailInfo = document.createElement('div');
    //this.#favoriteButton = favoriteButton;
  }

  render() {
    this.#detailInfo.classList.add('restaurant-detail');
    this.#detailInfo.id = String(this.#id);

    const $categoryIcon = new CategoryIconBox(this.#restaurantData.category);
    this.#detailInfo.append($categoryIcon);

    const $title = document.createElement('div');
    $title.textContent = this.#restaurantData.name;
    $title.classList.add('restaurant__name', 'text-subtitle');
    $title.id = 'category-title';
    this.#detailInfo.append($title);

    const $distance = document.createElement('div');
    $distance.textContent = DISTANCE_FROM_CAMPUS(this.#restaurantData.distance);
    $distance.classList.add('restaurant__distance', 'text-body');
    this.#detailInfo.append($distance);

    const $description = document.createElement('div');
    $description.textContent = this.#restaurantData.description || '';
    $description.classList.add('text-body');
    this.#detailInfo.append($description);

    const $link = document.createElement('a');
    $link.classList.add('restaurant__link', 'text-body');
    $link.href = this.#restaurantData.link || '';
    $link.textContent = this.#restaurantData.link || '';
    this.#detailInfo.append($link);

    const buttons = this.#makeButtons();
    this.#detailInfo.append(buttons);

    // //const favoriteButton = new FavoriteButton(this.#restaurantData.isFavorite, true);
    // const favoriteButton = this.#favoriteButton; // // favoriteButton.addEventListener('click', this.rerender.bind(this)); // favoriteButton.addEventListener('click', this.rerender);

    // favoriteButton.classList.add('detail-favorite');
    //this.#detailInfo.append(this.#favoriteButton);
    const favoriteButton = new FavoriteButton(this.#restaurantData.isFavorite, true);
    this.#detailInfo.append(favoriteButton);
    this.replaceWith(new BasicModal(this.#detailInfo));
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

  // rerender() {
  //   console.log('리렌더링');
  //   const existedButton = document.querySelector('#detail-modal .favorite-button');
  //   const newButton = new FavoriteButton(this.#restaurantData.isFavorite, true);
  //   if (existedButton) {
  //     document.querySelector('#detail-modal')!.replaceChild(existedButton, newButton);
  //   }
  // }
}

export default RestaurantDetailModal;

customElements.define('detail-modal', RestaurantDetailModal);
