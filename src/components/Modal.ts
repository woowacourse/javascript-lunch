import { Attribute, ModalContent, Restaurant } from '../types/types';
import { $ } from '../utils/domSelectors';
import RestaurantAddForm from './RestaurantAddForm';
import RestaurantInformation from './RestaurantInformation';

class Modal {
  private attributes: Attribute;
  private content: ModalContent;

  constructor(attributes: Attribute, content: ModalContent) {
    this.attributes = attributes;
    this.content = content;
  }

  closeModal = () => {
    const modal = $(`#${this.attributes.id}-modal`) as HTMLDialogElement;
    modal.close();

    if (this.content === RestaurantAddForm) {
      this.content.resetForm();
    }
  };

  openModal = () => {
    const modal = $(`#${this.attributes.id}-modal`) as HTMLDialogElement;
    modal.showModal();
  };

  addEvents(onSubmit?: CallableFunction) {
    const backdrop = $(`#${this.attributes.id}-modal`) as HTMLDialogElement;

    backdrop.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLDialogElement;

      if (target === event.currentTarget) {
        this.closeModal();
      }
    });

    if (this.content === RestaurantAddForm) {
      this.content.addEvents(this.closeModal, onSubmit as CallableFunction);
    }
  }

  create() {
    return `
      <dialog class="modal" id="${this.attributes.id}-modal">
        <div class="modal-container" id="${this.attributes.id}">
        ${this.content === RestaurantAddForm && this.content.create()}
        </div>
      </dialog>
    `;
  }

  renderContent(information?: Restaurant) {
    const element = $(`#${this.attributes.id}`) as HTMLDivElement;

    if (this.content === RestaurantInformation) {
      element.replaceChildren();
      element.insertAdjacentHTML('beforeend', this.content.create(information as Restaurant));
      return this.content.addEvent(this.closeModal);
    }

    if (this.content === RestaurantAddForm) {
      element.insertAdjacentHTML('beforeend', this.content.create());
    }
  }
}

export default Modal;
