import Modal from '../components/Modal';
import RestaurantAddModalContent from '../components/modal/RestaurantAddModalContent';
import { Restaurant } from '../types/types';
import { $ } from '../util/selector';

class ModalController {
  modal;
  open;
  close;

  constructor() {
    const { modal, open, close } = Modal({});
    this.modal = modal;
    this.open = open;
    this.close = close;
  }

  openRestaurantAddModal(addRestaurantItem: (data: Restaurant) => void) {
    const modalContainer = $('.modal-container');
    if (modalContainer) {
      modalContainer?.replaceWith(RestaurantAddModalContent());
    } else {
      this.modal.appendChild(RestaurantAddModalContent());
    }

    this.attachModalEvents();
    this.attachFormSubmitEvent(addRestaurantItem);
    this.open();
  }

  openRestaurantDetailModal(content: HTMLElement) {
    const modalContainer = $('.modal-container');
    if (modalContainer) {
      modalContainer?.replaceWith(content);
    } else {
      this.modal.appendChild(content);
    }

    this.open();
  }

  attachModalEvents() {
    const closeButton = $('.button--secondary');

    closeButton?.addEventListener('click', this.close);
  }

  attachFormSubmitEvent(addRestaurantItem: (data: Restaurant) => void): void {
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
}

export default ModalController;
