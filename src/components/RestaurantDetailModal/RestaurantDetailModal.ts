import BaseComponent from '../BaseComponent';
import BasicModal from '../BasicModal/BasicModal';
import CategoryIconBox from '../CategoryIconBox/CategoryIconBox';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import BasicButton from '../BasicButton/BasicButton';
import { closeModal, makeDescription, makeDistance, makeTitle } from '@/utils/view';
import { IRestaurant } from '@/types/Restaurant';
import RestaurantUpdateService from '@/domains/services/RestaurantUpdateService';

class RestaurantDetailModal extends BaseComponent {
  #restaurant: IRestaurant;
  #detailInfo;
  #restaurantUpdateService;

  constructor(restaurant: IRestaurant) {
    super();
    this.#restaurant = restaurant;
    this.#detailInfo = document.createElement('div');
    this.#restaurantUpdateService = new RestaurantUpdateService();
  }

  render() {
    this.#detailInfo.classList.add('restaurant-detail');
    this.#detailInfo.id = String(this.#restaurant.id);

    const $categoryIcon = new CategoryIconBox(this.#restaurant.category);
    this.#detailInfo.append($categoryIcon);

    const $title = makeTitle(this.#restaurant.name);
    this.#detailInfo.append($title);

    const $distance = makeDistance(this.#restaurant.distance);
    this.#detailInfo.append($distance);

    const $description = makeDescription('full', this.#restaurant.description);
    this.#detailInfo.append($description);

    const $link = this.#makeLink();
    this.#detailInfo.append($link);

    const buttons = this.#makeButtons();
    this.#detailInfo.append(buttons);

    const favoriteButton = new FavoriteButton(this.#restaurant.isFavorite, true);
    this.#detailInfo.append(favoriteButton);

    this.replaceWith(new BasicModal(this.#detailInfo));
  }

  #makeLink() {
    const $link = document.createElement('a');
    $link.classList.add('restaurant__link', 'text-body');
    $link.href = this.#restaurant.link || '';
    $link.textContent = this.#restaurant.link || '';
    return $link;
  }

  #makeButtons() {
    const $buttonBox = document.createElement('div');
    $buttonBox.classList.add('button-container');

    const $deleteButton = this.#makeDeleteButton();
    const $closeButton = this.#makeCloseButton();

    $buttonBox.append($deleteButton);
    $buttonBox.append($closeButton);

    return $buttonBox;
  }

  #makeDeleteButton() {
    return new BasicButton({
      variant: 'secondary',
      textContent: '삭제하기',
      type: 'button',
      clickEvent: () => {
        if (confirm('정말 삭제하시겠습니까?')) {
          this.#restaurantUpdateService.deleteRestaurant(this.#restaurant.id);
        }
      },
    });
  }

  #makeCloseButton() {
    return new BasicButton({
      variant: 'primary',
      textContent: '닫기',
      type: 'button',
      clickEvent: () => closeModal(),
    });
  }
}

export default RestaurantDetailModal;

customElements.define('detail-modal', RestaurantDetailModal);
