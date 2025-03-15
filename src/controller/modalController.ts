import FavoriteButton from '../components/button/FavoriteButton';
import Modal from '../components/Modal';
import RestaurantAddModalContent from '../components/modal/RestaurantAddModalContent';
import RestaurantDetailModalContent from '../components/modal/RestaurantDetailModalContent';
import Restaurants from '../domain/Restaurants';
import { Restaurant } from '../types/types';
import { $ } from '../util/selector';
import RestaurantListView from '../view/RestaurantListView';

class ModalController {
  modal;
  content?: HTMLElement;
  open;
  close;

  constructor() {
    const { modal, open, close } = Modal({});
    this.modal = modal;
    this.open = open;
    this.close = close;
  }

  renderModal() {
    const main = $('main');
    main?.appendChild(this.modal);
  }

  openRestaurantAddModal(addRestaurantItem: (data: Restaurant) => void) {
    const restaurantAddModalContent = RestaurantAddModalContent();
    this.#renderModalContent(restaurantAddModalContent);

    this.#attachCancelEvent();
    this.#attachFormSubmitEvent(addRestaurantItem);
    this.open();
  }

  openRestaurantDetailModal(restaurant: Restaurant, restaurantsModel: Restaurants) {
    const restaurantDetailModalContent = RestaurantDetailModalContent({ restaurant });
    this.#renderModalContent(restaurantDetailModalContent);

    this.#attachDetailModalEvents(restaurant, restaurantsModel);
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

  #attachCancelEvent() {
    const closeButton = $('#restaurantAddModalCancelButton');

    closeButton?.addEventListener('click', this.close);
  }

  #attachFormSubmitEvent(addRestaurantItem: (data: Restaurant) => void): void {
    const form = $('form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const formElement = form as HTMLFormElement;
      const formData = new FormData(formElement);
      const data = Object.fromEntries(formData.entries());
      addRestaurantItem(data as unknown as Restaurant);

      formElement.reset();
      this.close();
    });
  }

  #attachDetailModalEvents(restaurant: Restaurant, restaurantsModel: Restaurants) {
    this.content?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const favoriteButton = target.closest('.restaurant__favorite-button');
      const deleteButton = target.closest('.button--secondary');
      const closeButton = target.closest('.button--primary');

      if (favoriteButton) {
        restaurantsModel.toggleFavoriteRestaurant(restaurant.name);
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
        restaurantsModel.removeRestaurant(restaurant.name);
        this.close();
        RestaurantListView.removeItem(restaurant.name);
      }
    });
  }
}

export default ModalController;
