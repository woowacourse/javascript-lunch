import Button from '../../../components/button/Button';
import Modal from '../../../components/modal/Modal';
import Restaurant from '../../../../Domain/Restaurant';
import RestaurantDetail from '../../../components/restaurant/RestaurantDetail';
import { deleteRestaurant, toggleFavorite } from '../../../../Domain/services/RestaurantService';

class RestaurantDetailModal {
  #modal: Modal;
  #restaurant: Restaurant;
  #restaurantDetail!: RestaurantDetail;
  #cancelButton!: Button;
  #deleteButton!: Button;
  #onRestaurantDeleted: () => void;

  constructor(restaurant: Restaurant, onRestaurantDeleted: () => void = () => {}) {
    this.#restaurant = restaurant;
    this.#onRestaurantDeleted = onRestaurantDeleted;
    this.#modal = new Modal(() => this.close());
    this.#init();
    this.#createDetailModal();
  }

  #init(): void {
    this.#restaurantDetail = new RestaurantDetail(
      this.#restaurant.getName(),
      this.#restaurant.getDistance(),
      this.#restaurant.getCategory(),
      this.#restaurant.getDescription(),
      this.#restaurant.getLink(),
      this.#restaurant.isFavorite(),
      this.#restaurant,
      (isFavorite) => this.#handleFavoriteToggle(isFavorite),
    );
    this.#cancelButton = new Button('button', 'button--secondary', '취소하기', () => this.#handleCancelButton());
    this.#deleteButton = new Button('button', 'button--primary', '삭제하기', (event: MouseEvent) =>
      this.#handleDeleteButton(event),
    );
  }

  #createDetailModal(): void {
    const modalContent = document.createElement('div');
    modalContent.classList.add('detail-modal');
    modalContent.appendChild(this.#restaurantDetail.getElement());
    modalContent.appendChild(this.#createButtonContainer());
    this.#modal.addElementToModalContainer(modalContent);
  }

  #createButtonContainer(): HTMLDivElement {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    buttonContainer.appendChild(this.#cancelButton.getElement());
    buttonContainer.appendChild(this.#deleteButton.getElement());

    return buttonContainer;
  }

  #handleFavoriteToggle(isFavorite: boolean): void {
    toggleFavorite(this.#restaurant);
  }

  #handleCancelButton(): void {
    this.close();
  }

  #handleDeleteButton(event: MouseEvent): void {
    event.preventDefault();

    try {
      deleteRestaurant(this.#restaurant);
      this.#onRestaurantDeleted();
      this.close();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  }

  open(): void {
    this.#modal.open();
  }

  close(): void {
    this.#modal.close();
  }

  getElement(): HTMLDivElement {
    return this.#modal.getElement();
  }

  updateRestaurant(restaurant: Restaurant): void {
    this.#restaurant = restaurant;
    this.#restaurantDetail = new RestaurantDetail(
      restaurant.getName(),
      restaurant.getDistance(),
      restaurant.getCategory(),
      restaurant.getDescription(),
      restaurant.getLink(),
      restaurant.isFavorite(),
      restaurant,
      (isFavorite) => this.#handleFavoriteToggle(isFavorite),
    );

    const modalContent = document.createElement('div');
    modalContent.classList.add('detail-modal');
    modalContent.appendChild(this.#restaurantDetail.getElement());
    modalContent.appendChild(this.#createButtonContainer());

    const container = this.#modal.getElement().querySelector('.modal-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(modalContent);
    }
  }
}

export default RestaurantDetailModal;
