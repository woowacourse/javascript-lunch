import BaseComponent from '../BaseComponent';
import BasicModal from '../BasicModal/BasicModal';
import CategoryIconBox from '../CategoryIconBox/CategoryIconBox';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import BasicButton from '../BasicButton/BasicButton';
import { closeModal, makeDescription, makeDistance, makeTitle } from '@/utils/view';
import { IRestaurant } from '@/types/Restaurant';
import { $ } from '@/utils/DOM';

class RestaurantDetailModal extends BaseComponent {
  #restaurant: IRestaurant;
  #detailInfo;

  constructor(restaurant: IRestaurant) {
    super();
    this.#restaurant = restaurant;
    this.#detailInfo = document.createElement('div');
  }

  render() {
    if (this.#restaurant) {
      this.#detailInfo.classList.add('restaurant-detail');
      this.#detailInfo.id = String(this.#restaurant.id);

      this.makeInfoBox();
      this.replaceWith(new BasicModal(this.#detailInfo, 'bottom'));
    }
  }

  makeInfoBox() {
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

    const favoriteButton = new FavoriteButton({
      isFavorite: this.#restaurant.isFavorite,
      targetId: this.#restaurant.id,
    });
    this.#detailInfo.append(favoriteButton);
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
      variant: 'primary',
      textContent: '삭제하기',
      type: 'button',
      clickEvent: () => {
        $('#alert-modal').classList.remove('hidden');
      },
    });
  }

  #makeCloseButton() {
    return new BasicButton({
      variant: 'secondary',
      textContent: '닫기',
      type: 'button',
      clickEvent: () => closeModal(),
    });
  }
}

export default RestaurantDetailModal;

customElements.define('detail-modal', RestaurantDetailModal);
