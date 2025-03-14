import RestaurantAddModal from '../components/modal/RestaurantAddModal';
import { Restaurant } from '../types/types';
import { $ } from '../util/selector';

class ModalController {
  modal;
  open;
  close;

  constructor() {
    const { modal, open, close } = RestaurantAddModal();
    this.modal = modal;
    this.open = open;
    this.close = close;
  }

  attachTo(parent: Element): void {
    parent.appendChild(this.modal);
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

  switchContent(contents: HTMLElement[]) {
    const modalContainer = $('.modal-container');
    modalContainer?.replaceChildren(...contents);
  }
}

export default ModalController;
