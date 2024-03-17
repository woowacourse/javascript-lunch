import Modal from '../Modal';
import FavoriteButton from '../../component/FavoriteButton/FavoriteButton';
import RestaurantDetailContainer from '../../component/RestaurantDetailContainer/RestaurantDetailContainer';
import { ModalType } from '../../../type/modalTypes';
import { RestaurantType } from '../../../type/restaurantTypes';
import { createFormButton, createFormButtonContainer } from '../../../util/createFormElement';

type RestaurantDetailModalType = ModalType & {
  onDelete: Function;
  onFavorite: Function;
};

export default class RestaurantDetailModal extends Modal {
  private restaurant?: RestaurantType;
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

  showRestaurantDetail(data: RestaurantType) {
    this.restaurant = data;
    this.favoriteButton.setFavorited(this.restaurant.favorite ?? false);
    this.renderComponents(this.restaurant);
    this.showModal();
  }

  closeModal() {
    this.clearContainer();
    this.modal.close();
  }

  private renderComponents(restaurant: RestaurantType) {
    const restaurantDetailContainer = RestaurantDetailContainer(restaurant);
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
    if (this.restaurant) {
      this.restaurant.favorite = !this.restaurant.favorite;
      this.favoriteButton.setFavorited(this.restaurant.favorite);
      this.updateRestaurantFavorite(this.restaurant.id, this.restaurant.favorite);
      this.updateFavoriteInRestaurantList(this.restaurant.id, this.restaurant.favorite);
    }
  }

  private updateFavoriteInRestaurantList(id: string, isFavorited: boolean) {
    this.modal.dispatchEvent(
      new CustomEvent('updateRestaurantFavorite', {
        detail: {
          id: id,
          isFavorited: isFavorited,
        },
      }),
    );
  }

  private handleDelete() {
    if (this.restaurant) {
      this.deleteRestaurant(this.restaurant.id);
      this.closeModal();
    }
  }
}
