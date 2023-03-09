import Component from '../../Component';
import { define } from '../../decorators';
import style from './index.css';

@define('r-modal')
class Modal extends Component {
  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

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
      <dialog onclose="this.host.onClose(event)">
        <slot name="header">
          <h2 class="text-title">${this.getAttribute('title') ?? ''}</h2>
        </slot>
        <slot name="content"></slot>
        <hr>
        <slot name="actions"></slot>
      </dialog>
    `;
  }
}

export default Modal;
