import Button from '../../../components/button/Button';
import Modal from '../../../components/modal/Modal';
import Restaurant from '../../../../Domain/Restaurant';
import RestaurantDetail from '../../../components/restaurant/RestaurantDetail';
import { deleteRestaurant } from '../../../../Domain/services/RestaurantService';

class RestaurantDetailModal {
  #modal: Modal;
  #restaurant: Restaurant;
  #restaurantDetail!: RestaurantDetail;
  #cancelButton!: Button;
  #deleteButton!: Button;
  #onRestaurantDeleted: () => void;

  constructor(restaurant: Restaurant, onRestaurantDeleted: () => void = () => {}) {
    this.#restaurant = restaurant;
    this.#modal = new Modal();
    this.#onRestaurantDeleted = onRestaurantDeleted;
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

  handleToggleModal(): void {
    this.#modal.toggleModal();
  }

  #handleCancelButton(): void {
    this.handleToggleModal();
  }

  #handleDeleteButton(event: MouseEvent): void {
    event.preventDefault();

    try {
      deleteRestaurant(this.#restaurant);

      this.#onRestaurantDeleted();

      this.handleToggleModal();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  }

  getElement(): HTMLDivElement {
    return this.#modal.getElement();
  }
}

export default RestaurantDetailModal;
