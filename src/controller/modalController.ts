import FavoriteButton from '../components/button/FavoriteButton';
import Modal from '../components/Modal';
import RestaurantAddModalContent from '../components/modal/RestaurantAddModalContent';
import RestaurantDetailModalContent from '../components/modal/RestaurantDetailModalContent';
import { Restaurant } from '../types/types';
import { $ } from '../util/selector';

class ModalController {
  modal;
  content?: HTMLElement;
  open;
  close;

  #onAddRestaurant;
  #onRemoveRestaurant;
  #onToggleFavorite;

  constructor(
    onAddRestaurant: (data: Restaurant) => void,
    onRemoveRestaurant: (restaurantName: string) => void,
    onToggleFavorite: (restaurantName: string) => void,
  ) {
    const { modal, open, close } = Modal({});
    this.modal = modal;
    this.open = open;
    this.close = close;

    this.#onAddRestaurant = onAddRestaurant;
    this.#onRemoveRestaurant = onRemoveRestaurant;
    this.#onToggleFavorite = onToggleFavorite;
  }

  renderModal() {
    const main = $('main');
    main?.appendChild(this.modal);
  }

  openRestaurantAddModal() {
    const restaurantAddModalContent = RestaurantAddModalContent();
    this.#renderModalContent(restaurantAddModalContent);
    this.#bindAddModalEvents();
    this.open();
  }

  openRestaurantDetailModal(restaurant: Restaurant) {
    const restaurantDetailModalContent = RestaurantDetailModalContent({ restaurant });
    this.#renderModalContent(restaurantDetailModalContent);
    this.#bindDetailModalEvents(restaurant);
    this.open();
  }

  #renderModalContent(content: HTMLElement) {
    this.content = content;
    const modalContainer = $('.modal-container');
    if (modalContainer) {
      modalContainer?.replaceWith(content);
    } else {
      this.modal.appendChild(content);
    }
  }

  #bindAddModalEvents() {
    const closeButton = $('#restaurantAddModalCancelButton');
    closeButton?.addEventListener('click', () => this.close());

    const form = $('form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const formElement = form as HTMLFormElement;
      const formData = new FormData(formElement);
      const data = Object.fromEntries(formData.entries());
      this.#onAddRestaurant(data as unknown as Restaurant);

      formElement.reset();
      this.close();
    });
  }

  #bindDetailModalEvents(restaurant: Restaurant) {
    this.content?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const favoriteButton = target.closest('.restaurant__favorite-button');
      const deleteButton = target.closest('.button--secondary');
      const closeButton = target.closest('.button--primary');

      if (favoriteButton) {
        this.#onToggleFavorite(restaurant.name);
        favoriteButton.replaceWith(FavoriteButton({ isFavorite: restaurant.isFavorite, isDetail: true }));
        const listRestaurantElement = $(`.restaurant[data-id="${restaurant.name}"]`);
        if (listRestaurantElement) {
          const listFavoriteButton = $('.restaurant__favorite-button', listRestaurantElement);
          listFavoriteButton?.replaceWith(FavoriteButton({ isFavorite: restaurant.isFavorite }));
        }
      }
      if (closeButton) {
        this.close();
      }
      if (deleteButton) {
        this.#onRemoveRestaurant(restaurant.name);
        this.close();
      }
    });
  }
}

export default ModalController;
