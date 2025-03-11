import RestaurantAddModal from '../components/modal/RestaurantAddModal.js';
import { $ } from '../util/selector.js';

class ModalController {
  constructor() {
    const { modal, open, close } = RestaurantAddModal();
    this.modal = modal;
    this.open = open;
    this.close = close;
  }

  attachTo(parent) {
    parent.appendChild(this.modal);
  }

  attachModalEvents() {
    const closeButton = $('.button--secondary');
    closeButton.addEventListener('click', this.close);
  }

  attachFormSubmitEvent(addRestaurantItem) {
    const form = $('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      addRestaurantItem(data);

      form.reset();
      this.close();
    });
  }
}

export default ModalController;
