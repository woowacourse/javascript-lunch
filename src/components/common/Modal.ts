import Component from '../Component';

class Modal extends Component {
  static get observedAttributes() {
    return ['open'];
  }

  open() {
    this.shadowRoot?.querySelector('dialog')?.showModal();
  }

  close() {
    this.shadowRoot?.querySelector('dialog')?.close();
  }

  onClose(event: CloseEvent) {
    this.dispatchEvent(new CloseEvent('close'));
  }

  override renderTemplate() {
    return `
      <style>
        dialog {
          position: fixed;
          margin-top: auto;
          width: 100vw;
          max-width: 100%;
          max-height: 100vh;
          padding: 32px 16px;

          border: none;
          border-radius: 8px 8px 0px 0px;
          background: var(--grey-100);
        }

        dialog::backdrop {
          background: rgba(0, 0, 0, 0.35);
        }

        h2 {
          margin-bottom: 36px;
        }
      </style>

      <dialog onclose="this.host.onClose(event)">
        <h2 class="text-title">${this.getAttribute('title') ?? ''}</h2>
        <slot name="content"></slot>
        <slot name="actions"></slot>
      </dialog>
    `;
  }
}

customElements.define('r-modal', Modal);

export default Modal;
