import Modal from '../Modal';
import RestaurantDetailContainer from '../../component/RestaurantDetailContainer/RestaurantDetailContainer';
import { ModalType } from '../../../type/modalTypes';
import { RestaurantDataType } from '../../../type/restaurantDataType';
import { createFormButton, createFormButtonContainer } from '../../../util/createFormElement';

type RestaurantDetailModalType = ModalType & {
  onDelete: Function;
};

export default class RestaurantDetailModal extends Modal {
  private restaurantData?: RestaurantDataType;
  private deleteRestaurant: Function;
  private buttonContainer: HTMLDivElement;

  constructor({ id, onDelete }: RestaurantDetailModalType) {
    super({ id });
    this.deleteRestaurant = onDelete;
    this.buttonContainer = this.createButtonContainer();
  }

  private createButtonContainer() {
    const buttonContainer = createFormButtonContainer();
    const deleteButton = createFormButton({
      type: 'button',
      style: 'secondary',
      id: 'restaurant-detail-delete-button',
      textContent: '삭제하기',
    });
    const closeButton = createFormButton({
      type: 'button',
      style: 'primary',
      id: 'restaurant-detail-close-button',
      textContent: '닫기',
    });
    buttonContainer.append(deleteButton, closeButton);
    deleteButton.addEventListener('click', this.handleDelete.bind(this));
    closeButton.addEventListener('click', this.closeModal.bind(this));
    return buttonContainer;
  }

  showRestaurantDetail(data: RestaurantDataType) {
    this.restaurantData = data;
    this.modalContainer.appendChild(RestaurantDetailContainer(this.restaurantData));
    this.modalContainer.appendChild(this.buttonContainer);
    this.showModal();
  }

  closeModal() {
    this.clearContainer();
    this.modal.close();
  }

  private clearContainer() {
    while (this.modalContainer.firstChild) {
      this.modalContainer.removeChild(this.modalContainer.firstChild);
    }
  }

  private handleDelete() {
    if (this.restaurantData) {
      this.deleteRestaurant(this.restaurantData.name);
      this.closeModal();
    }
  }
}
