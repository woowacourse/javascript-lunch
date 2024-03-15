import Component from '../Component';
import { $ } from '../../utils/dom';

class Modal extends Component {
  static observedAttributes: string[] = ['open'];

  render(): void {
    this.innerHTML = this.template();
    $(this, '.modal-container').innerHTML = this.modalContent();
    this.setEvent();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    this.render();

    if (newValue) {
      this.updateModal(JSON.parse(newValue));
    }
  }

  updateModal(isOpen: boolean): void {
    if (isOpen) {
      ($(this, 'dialog') as HTMLDialogElement).showModal();
    } else {
      ($(this, 'dialog') as HTMLDialogElement).close();
    }
  }

  modalContent(): string {
    return ``;
  }

  template(): string {
    return `
        <dialog>
            <div class="modal-backdrop"></div>
            <div class="modal-container"></div>
        </dialog>
    `;
  }
}

export default Modal;
