import { $ } from '../utils/domSelectors';
import RestaurantAddForm from './RestaurantAddForm';

class Modal {
  private content: typeof RestaurantAddForm;

  constructor(content: typeof RestaurantAddForm) {
    this.content = content;
  }

  closeModal = () => {
    const modal = $('.modal') as HTMLDialogElement;
    modal.close();

    if (typeof this.content === typeof RestaurantAddForm) {
      this.content.resetForm();
    }
  };

  openModal() {
    const modal = $('.modal') as HTMLDialogElement;
    modal.showModal();
  }

  addEvents(onSubmit: CallableFunction) {
    const backdrop = $('.modal') as HTMLDialogElement;

    backdrop.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLDialogElement;

      if (target === event.currentTarget) {
        this.closeModal();
      }
    });

    this.content.addEvents(this.closeModal, onSubmit);
  }

  create() {
    return `
      <dialog class="modal">
        <div class="modal-container">
        ${this.content.create()}
        </div>
      </dialog>
    `;
  }
}

export default Modal;
