import { $ } from '../utils/dom';
import Component from './Component';

class CustomModalComponent extends Component {
  protected render(): string {
    return `
    <dialog>
      <div class="modal-backdrop"></div>
      <div class="modal-container">
      </div>
    </dialog>
    `;
  }

  protected setEvents() {
    this.addEvent({
      target: $('.modal-backdrop', this),
      type: 'click',
      handler: this.handleCloseModal as EventListener
    });

    this.addEvent({ target: document, type: 'openModal', handler: this.handleOpenModal as EventListener });
    this.addEvent({ target: document, type: 'closeModal', handler: this.handleCloseModal });
  }

  private handleOpenModal = (event: CustomEvent): void => {
    const component = `<${event.detail.component}></${event.detail.component}>`;
    $('.modal-container', this).innerHTML = component;
    ($('dialog') as HTMLDialogElement).showModal();
  };

  private handleCloseModal = (): void => {
    ($('dialog') as HTMLDialogElement).close();
  };
}

customElements.define('custom-modal', CustomModalComponent);
