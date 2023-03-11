import { ModalContent } from '../types/modal';
import { Attribute } from '../types/ui';
import { $ } from '../utils/domSelectors';

class Modal {
  private attributes: Attribute;
  private content: ModalContent;
  private onClose?: CallableFunction;

  constructor(attributes: Attribute, content: ModalContent, onClose?: CallableFunction) {
    this.attributes = attributes;
    this.content = content;
    this.onClose = onClose;
  }

  close = () => {
    const modal = $<HTMLDialogElement>(`#${this.attributes.id}-modal`);
    modal.close();

    document.body.classList.remove('hide-overflow');
  };

  model = () => {
    const modal = $<HTMLDialogElement>(`#${this.attributes.id}-modal`);
    modal.showModal();

    document.body.classList.add('hide-overflow');
  };

  addBackdropClickEvent() {
    const backdrop = $<HTMLDialogElement>(`#${this.attributes.id}-modal`);

    backdrop.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLDialogElement;

      if (target === event.currentTarget) this.close();

      if (this.onClose) this.onClose();
    });
  }

  addEvent() {
    this.addBackdropClickEvent();
  }

  create() {
    return `
      <dialog class="modal" id="${this.attributes.id}-modal">
        <div class="modal-container" id="${this.attributes.id}">
        ${this.content.create()}
        </div>
      </dialog>
    `;
  }

  render() {
    const main = $<HTMLElement>('main');
    main.insertAdjacentHTML('beforeend', this.create());
  }
}

export default Modal;
