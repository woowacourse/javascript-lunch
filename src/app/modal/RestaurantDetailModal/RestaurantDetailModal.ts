import Modal from '../Modal';
import FavoriteButton from '../../component/FavoriteButton/FavoriteButton';
import RestaurantDetailContainer from '../../component/RestaurantDetailContainer/RestaurantDetailContainer';
import { ModalType } from '../../../type/modalTypes';
import { RestaurantDataType } from '../../../type/restaurantDataType';
import { createFormButton, createFormButtonContainer } from '../../../util/createFormElement';

type RestaurantDetailModalType = ModalType & {
  onDelete: Function;
  onFavorite: Function;
};

export default class RestaurantDetailModal extends Modal {
  private restaurantData?: RestaurantDataType;
  private deleteRestaurant: Function;
  private updateRestaurantFavorite: Function;
  private favoriteButton: FavoriteButton;
  private buttonContainer: HTMLDivElement;

  constructor({ id, onDelete, onFavorite }: RestaurantDetailModalType) {
    super({ id });
    this.deleteRestaurant = onDelete;
    this.updateRestaurantFavorite = onFavorite;
    this.favoriteButton = new FavoriteButton(false);
    this.buttonContainer = this.createButtonContainer();
    this.updateFavorite = this.updateFavorite.bind(this);
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
    this.favoriteButton.setFavorited(this.restaurantData.favorite ?? false);
    this.renderComponents(this.restaurantData);
    this.showModal();
  }

  closeModal() {
    this.clearContainer();
    this.modal.close();
  }

  private renderComponents(restaurantData: RestaurantDataType) {
    const restaurantDetailContainer = RestaurantDetailContainer(restaurantData);
    const buttonContainer = this.buttonContainer;
    const favoriteButton = this.favoriteButton.render();
    favoriteButton.addEventListener('click', this.updateFavorite);
    restaurantDetailContainer.appendChild(favoriteButton);

    this.modalContainer.append(restaurantDetailContainer, buttonContainer);
  }

  private clearContainer() {
    while (this.modalContainer.firstChild) {
      this.modalContainer.removeChild(this.modalContainer.firstChild);
    }
  }

  private updateFavorite() {
    if (this.restaurantData) {
      this.restaurantData.favorite = !this.restaurantData.favorite;
      this.favoriteButton.setFavorited(this.restaurantData.favorite);
      this.updateRestaurantFavorite(this.restaurantData.name, this.restaurantData.favorite);
      this.updateFavoriteInRestaurantList(this.restaurantData.name, this.restaurantData.favorite);
    }
  }

  private updateFavoriteInRestaurantList(name: string, isFavorited: boolean) {
    this.modal.dispatchEvent(
      new CustomEvent('updateRestaurantFavorite', {
        detail: {
          name: name,
          isFavorited: isFavorited,
        },
      }),
    );
  }

  private handleDelete() {
    if (this.restaurantData) {
      this.deleteRestaurant(this.restaurantData.name);
      this.closeModal();
    }
  }
}
