import { Restaurant, Attribute, ModalContent } from '../types/types';
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
    const modal = $<HTMLDialogElement>(`#${this.attributes.id}-modal`);
    modal.close();

    const body = $<HTMLBodyElement>('body');
    body.classList.remove('hide-overflow');

    if (this.content === RestaurantAddForm) {
      this.content.resetForm();
    }
  };

  openModal = () => {
    const modal = $<HTMLDialogElement>(`#${this.attributes.id}-modal`);
    modal.showModal();

    const body = $<HTMLBodyElement>('body');
    body.classList.add('hide-overflow');
  };

  addBackdropClickEvent() {
    const backdrop = $<HTMLDialogElement>(`#${this.attributes.id}-modal`);

    backdrop.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLDialogElement;

      if (target === event.currentTarget) {
        this.closeModal();
      }
    });
  }

  addEvents(onSubmit?: CallableFunction) {
    this.addBackdropClickEvent();

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

  renderContent(
    information?: Restaurant,
    deleteRestaurant?: CallableFunction,
    onFavoriteIconClick?: CallableFunction
  ) {
    const element = $<HTMLDivElement>(`#${this.attributes.id}`);

    if (this.content === RestaurantInformation) {
      element.replaceChildren();
      element.insertAdjacentHTML('beforeend', this.content.create(information as Restaurant));
      this.content.addEvents(
        this.closeModal,
        deleteRestaurant as CallableFunction,
        onFavoriteIconClick as CallableFunction
      );
    }

    if (this.content === RestaurantAddForm) {
      element.insertAdjacentHTML('beforeend', this.content.create());
    }
  }
}

export default Modal;
